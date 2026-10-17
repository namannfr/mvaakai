"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CaptureFrame } from "@/components/visuals/capture-frame";
import { cn } from "@/components/ui/cn";

/**
 * One recording, three views: raw footage → annotated footage → structured task data.
 * Illustrative example only; the values are not from an actual Mvaak dataset.
 */
const views = [
  { id: "raw", label: "Raw footage" },
  { id: "annotated", label: "Annotated" },
  { id: "structured", label: "Structured data" },
] as const;

type View = (typeof views)[number]["id"];

const structured = `{
  "task": "pick_up_cup",
  "environment": "household / kitchen",
  "segments": [
    { "action": "reach", "t": [4.2, 4.9] },
    { "action": "grasp", "t": [4.9, 5.3] },
    { "action": "lift",  "t": [5.3, 5.8] }
  ],
  "objects": [{ "id": "obj_01", "class": "ceramic_cup" }],
  "hand_pose": "21 keypoints × 2 hands, per frame",
  "review": "passed"
}`;

export function AnnotationCompare({ dark = true }: { dark?: boolean }) {
  const [view, setView] = useState<View>("annotated");
  const annotated = view !== "raw";
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent) => {
    const i = views.findIndex((v) => v.id === view);
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + views.length) % views.length;
    setView(views[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Choose a view of the same recording"
        onKeyDown={onKeyDown}
        className={cn("inline-flex w-full rounded-full border p-1 sm:w-auto", dark ? "border-navy-line-strong bg-navy-2" : "border-line bg-subtle")}
      >
        {views.map((v, i) => (
          <button
            key={v.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            tabIndex={view === v.id ? 0 : -1}
            type="button"
            role="radio"
            aria-checked={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "min-h-10 flex-1 rounded-full px-3 text-[0.8125rem] font-medium transition-colors sm:flex-none sm:px-4",
              view === v.id
                ? "bg-accent text-white"
                : dark
                  ? "text-on-navy-muted hover:text-white focus-visible:outline-white"
                  : "text-muted hover:text-ink",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-navy-line bg-navy-3">
        <CaptureFrame
          scene="cup"
          uid="compare"
          layers={{ hands: annotated, objects: annotated, labels: annotated }}
          className="absolute inset-0 h-full w-full"
          title="The same first-person recording of picking up a cup, shown raw or with annotations."
        />
        <div
          aria-hidden={view !== "structured"}
          className={cn(
            "absolute inset-0 overflow-auto bg-navy-2/95 p-4 transition-opacity duration-500 sm:p-6",
            view === "structured" ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <pre className="font-mono text-[0.6875rem] leading-relaxed text-on-navy sm:text-[0.8125rem]">{structured}</pre>
        </div>
      </div>
      <p className={cn("mt-3 text-xs", dark ? "text-on-navy-muted" : "text-faint")} aria-live="polite">
        {view === "raw" && "Raw: video alone — no labels a model can learn from."}
        {view === "annotated" && "Annotated: hand keypoints, the object and the current action are marked."}
        {view === "structured" && "Structured: the same moment as machine-readable task data."} · Illustrative example
      </p>
    </div>
  );
}
