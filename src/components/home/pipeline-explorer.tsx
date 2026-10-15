"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/components/ui/cn";
import { AnnotatedVisual, DeliverVisual, DemonstrationVisual, ValidateVisual } from "@/components/visuals/pipeline-visuals";
import { StreamPanel } from "@/components/visuals/stream-panel";

type Step = { id: string; title: string; summary: string; outputs: string[]; visual: ReactNode };

const steps: Step[] = [
  {
    id: "demonstration",
    title: "Human Demonstration",
    summary: "A trained, consented person performs the task in a real environment, following a written brief.",
    outputs: ["Capture brief", "Task catalogue", "Consent record"],
    visual: <DemonstrationVisual />,
  },
  {
    id: "capture",
    title: "Capture",
    summary: "A calibrated first-person rig records video, motion and hand data on one clock.",
    outputs: ["Video", "IMU / motion", "Calibration"],
    visual: <StreamPanel compact />,
  },
  {
    id: "annotation",
    title: "Annotation",
    summary: "Each episode is labelled to a written guideline — actions, objects and hand pose.",
    outputs: ["Action segments", "Object labels", "Hand keypoints"],
    visual: <AnnotatedVisual />,
  },
  {
    id: "qa",
    title: "Quality Assurance",
    summary: "Automated checks and human review catch problems before anything is delivered.",
    outputs: ["QA results", "Review notes", "Diversity report"],
    visual: <ValidateVisual />,
  },
  {
    id: "dataset",
    title: "Training-Ready Dataset",
    summary: "Structured data in your format, with provenance attached to every episode.",
    outputs: ["LeRobot · RLDS · MCAP", "Episode manifests", "Guideline"],
    visual: <DeliverVisual />,
  },
];

export function PipelineExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const select = (i: number, focus = false) => {
    const next = (i + steps.length) % steps.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: steps.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <div>
      {/* Step rail */}
      <div className="relative">
        <div aria-hidden className="absolute top-[1.375rem] right-[10%] left-[10%] hidden h-px bg-navy-line-strong sm:block" />
        <div
          aria-hidden
          className="absolute top-[1.375rem] left-[10%] hidden h-px bg-brand-light transition-[width] duration-500 ease-out sm:block"
          style={{ width: `${(active / (steps.length - 1)) * 80}%` }}
        />
        <div role="tablist" aria-label="From real-world action to AI data" className="relative grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((s, i) => {
            const selected = i === active;
            const done = i < active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                aria-label={s.title}
                id={`${uid}-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex min-h-11 flex-col items-center gap-2 rounded-xl px-1 pb-2 text-center focus-visible:outline-white"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-11 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-300",
                    selected
                      ? "border-lime bg-lime text-ink"
                      : done
                        ? "border-brand-light/60 bg-navy-3 text-brand-light"
                        : "border-navy-line-strong bg-navy-2 text-on-navy-muted group-hover:border-brand-light/60 group-hover:text-white",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "hidden text-[0.8125rem] leading-snug font-medium text-balance transition-colors sm:block lg:text-[0.9375rem]",
                    selected ? "text-white" : "text-on-navy-muted group-hover:text-white",
                  )}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels: all in the DOM for assistive tech; only the active one is shown. */}
      <div className="mt-10 rounded-[1.25rem] border border-navy-line bg-navy-2 p-5 sm:p-8">
        {steps.map((s, i) => (
          <div
            key={s.id}
            role="tabpanel"
            id={`${uid}-panel-${s.id}`}
            aria-labelledby={`${uid}-tab-${s.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="grid gap-8 focus-visible:outline-white lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
          >
            <div className="flex animate-reveal flex-col">
              <p className="font-mono text-xs tracking-[0.14em] text-brand-light uppercase">
                Stage {String(i + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-lead text-on-navy">{s.summary}</p>
              <div className="mt-6 border-t border-navy-line pt-5">
                <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-on-navy-muted uppercase">Outputs</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <li key={o} className="rounded-full border border-navy-line-strong px-3 py-1 text-sm text-on-navy">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto hidden gap-2 pt-8 lg:flex">
                <button
                  type="button"
                  onClick={() => select(i - 1)}
                  aria-label={`Previous stage: ${steps[(i - 1 + steps.length) % steps.length].title}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-line-strong px-4 text-sm text-on-navy hover:border-white/60 focus-visible:outline-white"
                >
                  <ArrowLeft aria-hidden className="size-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => select(i + 1)}
                  aria-label={`Next stage: ${steps[(i + 1) % steps.length].title}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-line-strong px-4 text-sm text-on-navy hover:border-white/60 focus-visible:outline-white"
                >
                  Next <ArrowRight aria-hidden className="size-4" />
                </button>
              </div>
            </div>
            <figure className="animate-reveal self-start">
              {s.visual}
              <figcaption className="mt-3 text-xs text-on-navy-muted">Illustrative example of the {s.title.toLowerCase()} stage.</figcaption>
            </figure>
            <div className="flex gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => select(i - 1)}
                aria-label={`Previous stage: ${steps[(i - 1 + steps.length) % steps.length].title}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-line-strong px-4 text-sm text-on-navy hover:border-white/60 focus-visible:outline-white"
              >
                <ArrowLeft aria-hidden className="size-4" /> Previous
              </button>
              <button
                type="button"
                onClick={() => select(i + 1)}
                aria-label={`Next stage: ${steps[(i + 1) % steps.length].title}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy-line-strong px-4 text-sm text-on-navy hover:border-white/60 focus-visible:outline-white"
              >
                Next <ArrowRight aria-hidden className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
