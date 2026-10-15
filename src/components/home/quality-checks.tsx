"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/components/ui/cn";

/**
 * Clickable data-quality indicators. Statuses are an illustrative example of one
 * reviewed batch — not live or reported operational figures.
 */
const checks = [
  {
    id: "frames",
    name: "Frame integrity",
    status: "pass" as const,
    what: "Dropped frames, motion blur and exposure are scored automatically for every episode.",
    result: "No dropped frames; exposure within range.",
    onFail: "Episodes that fail never reach a human reviewer and are re-captured.",
  },
  {
    id: "sync",
    name: "Timestamp sync",
    status: "pass" as const,
    what: "Video, motion and hand data must share one clock, with drift measured per session.",
    result: "Streams aligned; drift check attached to the episode.",
    onFail: "Out-of-sync sessions are flagged and excluded until corrected.",
  },
  {
    id: "complete",
    name: "Annotation completeness",
    status: "flag" as const,
    what: "Every required segment, object and keypoint in the guideline must be present.",
    result: "One segment missing an outcome marker.",
    onFail: "Returned to the annotator with the guideline reference, then re-reviewed.",
  },
  {
    id: "consistency",
    name: "Task consistency",
    status: "pass" as const,
    what: "The recording must match its brief — the right task, environment and objects.",
    result: "Task and environment match the capture brief.",
    onFail: "Mismatched episodes are rejected and not invoiced.",
  },
];

export function QualityChecks() {
  const [active, setActive] = useState(2);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = checks[active];

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: checks.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + checks.length) % checks.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="rounded-[1.25rem] border border-navy-line bg-navy p-4 text-on-navy sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs tracking-[0.12em] text-on-navy-muted uppercase">Batch review · ep_0142</p>
        <p className="text-xs text-on-navy-muted">Illustrative example</p>
      </div>
      <div role="tablist" aria-label="Quality checks" aria-orientation="vertical" className="mt-4 grid gap-2">
        {checks.map((ch, i) => {
          const selected = i === active;
          return (
            <button
              key={ch.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-t-${ch.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-p`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-white",
                selected ? "border-brand-light/60 bg-navy-3" : "border-navy-line bg-navy-2 hover:border-navy-line-strong",
              )}
            >
              {ch.status === "pass" ? (
                <CheckCircle2 aria-hidden className="size-5 shrink-0 text-[#7fd1a8]" />
              ) : (
                <AlertTriangle aria-hidden className="size-5 shrink-0 text-[#f2c46d]" />
              )}
              <span className="flex-1 text-[0.9375rem] font-medium text-white">{ch.name}</span>
              <span className={cn("text-xs font-medium", ch.status === "pass" ? "text-[#7fd1a8]" : "text-[#f2c46d]")}>
                {ch.status === "pass" ? "Pass" : "Flagged"}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-p`}
        aria-labelledby={`${uid}-t-${c.id}`}
        key={c.id}
        className="mt-4 animate-reveal rounded-xl border border-navy-line bg-navy-2 p-4"
      >
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-mono text-[0.6875rem] tracking-[0.1em] text-brand-light uppercase">What is checked</dt>
            <dd className="mt-1 text-on-navy">{c.what}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] tracking-[0.1em] text-brand-light uppercase">Example result</dt>
            <dd className="mt-1 text-on-navy">{c.result}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] tracking-[0.1em] text-brand-light uppercase">If it fails</dt>
            <dd className="mt-1 text-on-navy-muted">{c.onFail}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
