"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; kind: "validation" | "not_configured" | "rate_limited" | "delivery_failed" | "network"; fieldErrors?: Record<string, string> };

/** Whether the server has a delivery channel configured (null while checking). */
export function useDeliveryStatus() {
  const [live, setLive] = useState<boolean | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/forms/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { live: boolean }) => !cancelled && setLive(!!d.live))
      .catch(() => !cancelled && setLive(null));
    return () => {
      cancelled = true;
    };
  }, []);
  return live;
}

/**
 * Posts JSON to a form endpoint. A single submission id is reused across retries so
 * the server can de-duplicate, and concurrent submits are ignored.
 */
export function useSubmission(endpoint: string) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const idRef = useRef<string | null>(null);
  const inFlight = useRef(false);

  const submit = useCallback(
    async (payload: Record<string, unknown>) => {
      if (inFlight.current) return state;
      inFlight.current = true;
      idRef.current ??= crypto.randomUUID();
      setState({ status: "submitting" });
      let next: SubmitState;
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, submissionId: idRef.current }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          reference?: string;
          error?: string;
          fieldErrors?: Record<string, string>;
        };
        if (res.ok && data.ok && data.reference) {
          next = { status: "success", reference: data.reference };
        } else if (data.error === "validation") {
          next = { status: "error", kind: "validation", fieldErrors: data.fieldErrors };
        } else if (data.error === "not_configured" || data.error === "rate_limited" || data.error === "delivery_failed") {
          next = { status: "error", kind: data.error };
        } else {
          next = { status: "error", kind: "delivery_failed" };
        }
      } catch {
        next = { status: "error", kind: "network" };
      }
      inFlight.current = false;
      setState(next);
      return next;
    },
    [endpoint, state],
  );

  return { state, submit };
}

/** Plain-text summary of the entered details (used for the email hand-off and the copy button). */
export function summaryText(lines: [string, string][]) {
  return lines
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

// Mail clients reliably accept roughly 2,000 characters in a mailto: URL.
const MAILTO_BODY_LIMIT = 1800;

export const isTruncated = (lines: [string, string][]) => summaryText(lines).length > MAILTO_BODY_LIMIT;

export function mailtoHref(email: string, subject: string, lines: [string, string][]) {
  const full = summaryText(lines);
  const body =
    full.length > MAILTO_BODY_LIMIT
      ? `${full.slice(0, MAILTO_BODY_LIMIT)}\n\n[Shortened — please paste the full details copied from the website.]`
      : full;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Hands the visitor's details to their mail client. */
export function openEmail(href: string) {
  window.location.assign(href);
}
