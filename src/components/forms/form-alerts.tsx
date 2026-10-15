"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CircleX, Copy, Check, Mail, ArrowLeft } from "lucide-react";
import type { SubmitState } from "./use-submission";
import { site } from "@/config/site";
import { buttonClass } from "@/components/ui/button";

export function SubmitError({ state, mailto }: { state: SubmitState; mailto: string }) {
  if (state.status !== "error") return null;
  const messages: Record<string, { title: string; body: string }> = {
    validation: { title: "Some details need attention.", body: "Please review the highlighted fields and try again." },
    not_configured: {
      title: "Your submission was not sent.",
      body: "Online delivery isn’t available right now, so nothing was stored or delivered.",
    },
    rate_limited: { title: "Too many attempts.", body: "Please wait a few minutes before trying again." },
    delivery_failed: {
      title: "Your submission was not delivered.",
      body: "Something went wrong on our side and nothing was recorded. Please try again shortly.",
    },
    network: {
      title: "We couldn’t reach the server.",
      body: "Check your connection and try again. Your answers are still here.",
    },
  };
  const m = messages[state.kind];
  const Icon = state.kind === "validation" ? AlertTriangle : CircleX;
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-danger/25 bg-danger-soft p-4 text-[0.9375rem] leading-relaxed">
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
      <div>
        <p className="font-medium text-ink">{m.title}</p>
        <p className="text-ink-2">
          {m.body}
          {state.kind !== "validation" && (
            <>
              {" "}
              You can{" "}
              <a href={mailto} className="font-medium text-accent underline underline-offset-2">
                email {site.email}
              </a>{" "}
              instead — your details are pre-filled.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * Shown after the visitor chose to continue by email (used when online delivery is
 * not configured). Honest by design: nothing has been delivered until they send it.
 */
export function EmailHandoff({
  title,
  mailto,
  summary,
  truncated,
  onBack,
}: {
  title: string;
  mailto: string;
  summary: string;
  truncated: boolean;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "center" });
    ref.current?.focus({ preventScroll: true });
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\n\n${summary}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div ref={ref} tabIndex={-1} role="status" className="scroll-mt-28 rounded-card border border-line bg-surface p-6 outline-none sm:p-10">
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Mail aria-hidden className="size-6" />
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">
        Your email app should have opened a message to <span className="font-medium text-ink">{site.email}</span> with your
        details filled in. <strong className="font-medium text-ink">It reaches us once you press send.</strong>
        {truncated && " Your answers were long, so the email was shortened — paste the full copy below into it."}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={mailto} className={buttonClass("primary")}>
          <Mail aria-hidden className="size-4" /> Open the email again
        </a>
        <button type="button" onClick={copy} className={buttonClass("secondary")}>
          {copied ? <Check aria-hidden className="size-4 text-success" /> : <Copy aria-hidden className="size-4" />}
          {copied ? "Details copied" : "Copy details"}
        </button>
        <button type="button" onClick={onBack} className={buttonClass("ghost")}>
          <ArrowLeft aria-hidden className="size-4" /> Edit my answers
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Details copied to clipboard" : ""}
      </p>
      <details className="mt-8 rounded-xl border border-line bg-subtle p-4">
        <summary className="cursor-pointer text-sm font-medium text-ink-2">Preview what you’re sending</summary>
        <pre className="mt-3 max-h-72 overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-ink-2">{summary}</pre>
      </details>
    </div>
  );
}
