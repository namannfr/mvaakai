import { Check, FileText, Folder, FileJson, FileVideo, Activity, CircleDashed } from "lucide-react";
import { CaptureFrame } from "./capture-frame";
import { cn } from "@/components/ui/cn";

/**
 * Schematic visuals for each pipeline stage. Conceptual illustrations of the
 * artefacts produced at each step — not product screenshots or live data.
 */

const panel = "rounded-xl border border-navy-line bg-navy-3 p-4 sm:p-5";
const mono = "font-mono text-[0.75rem]";

export function DemonstrationVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-navy-line bg-navy-3">
      <CaptureFrame
        scene="cup"
        uid="pipeline-demo"
        layers={{ hands: false, objects: false, labels: false }}
        className="block h-auto w-full"
        title="Raw first-person recording of a person reaching for a cup on a kitchen table."
      />
      <dl className={cn(mono, "grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 p-4")}>
        {[
          ["brief", "pick_up_cup · household kitchen"],
          ["include", "one mis-grasp and recovery"],
          ["consent", "worker-level · signed"],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-on-navy-muted">{k}</dt>
            <dd className="text-on-navy">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ValidateVisual() {
  const gates = [
    { t: "Field check", s: "pass" },
    { t: "Automated integrity", s: "pass", note: "sync · drift · blur · exposure" },
    { t: "Human review", s: "pass", note: "graded against the rubric" },
    { t: "Diversity scoring", s: "gap", note: "gap → next capture brief" },
    { t: "Acceptance sampling", s: "pending", note: "blind re-grade of a random sample" },
  ];
  return (
    <div className={panel}>
      <p className={cn(mono, "tracking-[0.1em] text-on-navy uppercase")}>Batch QA · five gates</p>
      <ol className="mt-4 space-y-2">
        {gates.map((g, i) => (
          <li key={g.t} className="flex items-center gap-3 rounded-lg border border-navy-line bg-navy-2 px-3 py-2.5">
            <span className={cn(mono, "w-5 text-on-navy-muted")}>{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.875rem] text-on-navy">{g.t}</span>
              {g.note && <span className="block truncate text-xs text-on-navy-muted">{g.note}</span>}
            </span>
            {g.s === "pass" && (
              <span className="flex items-center gap-1 text-xs text-[#7fd1a8]">
                <Check aria-hidden className="size-3.5" /> pass
              </span>
            )}
            {g.s === "gap" && <span className="text-xs text-[#f2c46d]">gap found</span>}
            {g.s === "pending" && (
              <span className="flex items-center gap-1 text-xs text-on-navy-muted">
                <CircleDashed aria-hidden className="size-3.5" /> sampling
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DeliverVisual() {
  const tree: { depth: number; name: string; icon: typeof Folder; note?: string }[] = [
    { depth: 0, name: "corpus_batch_03/", icon: Folder },
    { depth: 1, name: "episode_0142/", icon: Folder },
    { depth: 2, name: "video/", icon: FileVideo, note: "rgb · stereo" },
    { depth: 2, name: "imu/", icon: Activity, note: "clock-aligned" },
    { depth: 2, name: "annotations/", icon: Folder, note: "sub-actions · hand pose" },
    { depth: 2, name: "manifest.json", icon: FileJson, note: "provenance · consent · licence" },
    { depth: 1, name: "diversity_report", icon: FileText },
    { depth: 1, name: "annotation_guideline", icon: FileText },
  ];
  return (
    <div className={panel}>
      <ul className={cn(mono, "space-y-1.5")}>
        {tree.map((n) => (
          <li key={n.name} className="flex items-center gap-2" style={{ paddingLeft: `${n.depth * 1.1}rem` }}>
            <n.icon aria-hidden className="size-3.5 shrink-0 text-brand-light" />
            <span className="text-on-navy">{n.name}</span>
            {n.note && <span className="hidden truncate text-on-navy-muted sm:inline">— {n.note}</span>}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-navy-line pt-4">
        {["LeRobot", "RLDS", "MCAP", "raw + manifest"].map((f) => (
          <span key={f} className={cn(mono, "rounded-full bg-brand/20 px-2.5 py-1 text-brand-light")}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AnnotatedVisual() {
  const segs = [
    { l: "reach", t: "4.2–4.9" },
    { l: "grasp", t: "4.9–5.3" },
    { l: "lift", t: "5.3–5.8" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-navy-line bg-navy-3">
      <CaptureFrame
        scene="cup"
        uid="pipeline-annotated"
        className="block h-auto w-full"
        title="The cup recording with hand keypoints, the cup bounding box and the current action labelled."
      />
      <div className="grid grid-cols-3 gap-1 p-3">
        {segs.map((s, i) => (
          <div key={s.l} className={cn("rounded-md px-2 py-1.5 text-center", i === 1 ? "bg-lime text-ink" : "bg-navy-2 text-on-navy")}>
            <span className={cn(mono, "block font-medium")}>{s.l}</span>
            <span className={cn(mono, "block opacity-80")}>{s.t}s</span>
          </div>
        ))}
      </div>
    </div>
  );
}
