"use client";

import { AlertTriangle, CircleX } from "lucide-react";
import type { SubmitState } from "./use-submission";

/** Form error banner: plain wording, no internal details, never an email-app fallback. */
export function FormSubmitError({ state, noun }: { state: SubmitState; noun: "enquiry" | "application" }) {
  if (state.status !== "error") return null;
  const validation = state.kind === "validation";
  const message = validation
    ? "Some details need attention. Please review the highlighted fields and try again."
    : state.kind === "rate_limited"
      ? "Too many attempts in a short time. Please wait a few minutes and try again."
      : `We couldn’t submit your ${noun}. Please try again.`;
  const Icon = validation ? AlertTriangle : CircleX;
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-danger/25 bg-danger-soft p-4 text-[0.9375rem] leading-relaxed">
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
      <p className="font-medium text-ink">{message}</p>
    </div>
  );
}
