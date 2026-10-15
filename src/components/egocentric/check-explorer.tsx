"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { qualityChecks } from "@/content/egocentric-collection";
import { cn } from "@/components/ui/cn";

/** Quality and traceability checks: select a check to see what is reviewed, an example issue and how it is handled. */
export function CheckExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = qualityChecks[active];

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: qualityChecks.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + qualityChecks.length) % qualityChecks.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div role="tablist" aria-label="Quality checks" aria-orientation="vertical" className="grid gap-2">
        {qualityChecks.map((q, i) => {
          const selected = i === active;
          return (
            <button
              key={q.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-t${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-p`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[0.9375rem] font-medium transition-colors",
                selected ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-line-strong",
              )}
            >
              <ShieldCheck aria-hidden className={cn("size-4 shrink-0", selected ? "text-lime" : "text-steel")} />
              {q.title}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-p`}
        aria-labelledby={`${uid}-t${active}`}
        key={active}
        className="animate-reveal rounded-[1.25rem] border border-line bg-surface p-5 sm:p-7"
      >
        <h3 className="text-xl font-semibold tracking-tight text-ink">{c.title}</h3>
        <dl className="mt-5 space-y-4">
          {[
            ["1 · What is reviewed", c.reviewed],
            ["2 · What an issue looks like", c.issue],
            ["3 · How it is handled", c.handling],
          ].map(([k, v]) => (
            <div key={k} className="border-l-2 border-accent-line pl-4">
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-accent uppercase">{k}</dt>
              <dd className="mt-1 leading-relaxed text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-faint">Illustrative example. Handling follows the process agreed for each project.</p>
      </div>
    </div>
  );
}
