"use client";

import { useCallback, useRef, useState } from "react";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; kind: "validation" | "not_configured" | "rate_limited" | "delivery_failed" | "network"; fieldErrors?: Record<string, string> };

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
