"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/components/ui/cn";

type Step = { title: string; what: string; needs: string; output: string };

/**
 * Selectable workflow: a connected row of steps with a blue progress line, and a
 * detail panel (what happens / what's required / what follows) for the active step.
 */
export function StepExplorer({ steps, label }: { steps: Step[]; label: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = steps[active];

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: steps.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + steps.length) % steps.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const pct = (active / (steps.length - 1)) * 100;

  return (
    <div>
      <div className="relative">
        {/* connecting line + animated progress */}
        <div aria-hidden className="absolute top-5 right-[calc(100%/var(--n)/2)] left-[calc(100%/var(--n)/2)] h-px bg-navy-line-strong" style={{ ["--n" as string]: steps.length }}>
          <div className="h-full bg-brand-light transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <div role="tablist" aria-label={label} className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, i) => {
            const selected = i === active;
            const done = i < active;
            return (
              <button
                key={step.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-t${i}`}
                aria-label={step.title}
                aria-selected={selected}
                aria-controls={`${uid}-p`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex flex-col items-center gap-2 rounded-xl px-1 pb-1 text-center focus-visible:outline-accent"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-300",
                    selected
                      ? "border-brand-light bg-accent text-white"
                      : done
                        ? "border-brand-light/60 bg-navy-3 text-brand-light"
                        : "border-navy-line-strong bg-navy-2 text-on-navy-muted group-hover:text-white",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("hidden text-[0.8125rem] leading-snug font-medium text-balance sm:block", selected ? "text-white" : "text-on-navy-muted group-hover:text-white")}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-p`}
        aria-labelledby={`${uid}-t${active}`}
        key={active}
        className="mt-8 animate-reveal rounded-[1.25rem] border border-navy-line bg-navy-2 p-5 sm:p-8"
      >
        <p className="font-mono text-xs tracking-[0.14em] text-brand-light uppercase">
          Step {active + 1} of {steps.length}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["What happens", s.what],
            ["What’s required", s.needs],
            ["What follows", s.output],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-navy-line bg-navy-3 p-4">
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-on-navy-muted uppercase">{k}</dt>
              <dd className="mt-2 leading-relaxed text-on-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
