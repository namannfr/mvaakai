"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { FileVideo, Folder, FileJson, CheckCircle2, CircleDashed } from "lucide-react";
import { deliveryFormats } from "@/content/egocentric-collection";
import { cn } from "@/components/ui/cn";

/* Every example below is illustrative — not a real Mvaak delivery. */

const mono = "font-mono text-[0.75rem] sm:text-[0.8125rem]";

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-navy-line bg-navy-3 p-4 text-on-navy sm:p-5">{children}</div>;
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className={cn(mono, "grid grid-cols-[minmax(7rem,auto)_1fr] gap-x-4 gap-y-1.5")}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-on-navy-muted">{k}</dt>
          <dd className="break-words">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const tabs: { id: string; label: string; text: string; example: ReactNode }[] = [
  {
    id: "video",
    label: "Video Files",
    text: "Recorded video, included according to the agreed collection scope — one file per episode or session.",
    example: (
      <Card>
        <ul className={cn(mono, "space-y-1.5")}>
          {["session_0031/", "  ep_0142_rgb.mp4", "  ep_0142_imu.csv", "  ep_0143_rgb.mp4", "  ep_0143_imu.csv"].map((f) => (
            <li key={f} className="flex items-center gap-2 whitespace-pre">
              {f.endsWith("/") ? <Folder aria-hidden className="size-3.5 text-brand-light" /> : <FileVideo aria-hidden className="size-3.5 text-brand-light" />}
              {f}
            </li>
          ))}
        </ul>
      </Card>
    ),
  },
  {
    id: "ids",
    label: "Timestamps and IDs",
    text: "Task, session and episode identifiers with timestamps keep every recorded moment findable and traceable.",
    example: (
      <Card>
        <Rows rows={[["session_id", "session_0031"], ["episode_id", "ep_0142"], ["task_id", "pick_up_cup"], ["segment", "grasp"], ["t_start", "00:04.9"], ["t_end", "00:05.3"]]} />
      </Card>
    ),
  },
  {
    id: "metadata",
    label: "Metadata",
    text: "A structured record per episode describing what was captured, where, and its review state.",
    example: (
      <Card>
        <Rows rows={[["episode_id", "ep_0142"], ["task_id", "pick_up_cup"], ["environment", "household / kitchen"], ["recording_date", "2026-09-18"], ["duration", "00:00:12.4"], ["review_status", "reviewed"]]} />
      </Card>
    ),
  },
  {
    id: "annotation",
    label: "Annotation Layers",
    text: "Possible layers, chosen per task. Not every layer is included by default — depth is agreed in scoping.",
    example: (
      <Card>
        <ul className="space-y-2 text-sm">
          {["Action labels", "Sub-action labels", "Object references", "Task segmentation", "Other agreed annotation fields"].map((l) => (
            <li key={l} className="flex items-center justify-between gap-3 rounded-lg border border-navy-line bg-navy-2 px-3 py-2">
              <span>{l}</span>
              <span className="text-xs text-on-navy-muted">Per scope</span>
            </li>
          ))}
        </ul>
      </Card>
    ),
  },
  {
    id: "quality",
    label: "Quality Reports",
    text: "The agreed checks and their outcomes are documented with each delivery, so you can see what was reviewed.",
    example: (
      <Card>
        <ul className="space-y-2 text-sm">
          {[
            ["File integrity", true],
            ["Timestamp consistency", true],
            ["Metadata completeness", true],
            ["Annotation completeness", false],
          ].map(([l, ok]) => (
            <li key={l as string} className="flex items-center justify-between gap-3 rounded-lg border border-navy-line bg-navy-2 px-3 py-2">
              <span>{l as string}</span>
              {ok ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#7fd1a8]">
                  <CheckCircle2 aria-hidden className="size-3.5" /> Reviewed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#f2c46d]">
                  <CircleDashed aria-hidden className="size-3.5" /> Returned for fix
                </span>
              )}
            </li>
          ))}
        </ul>
      </Card>
    ),
  },
  {
    id: "formats",
    label: "Delivery Formats",
    text: "File formats, directory structure, schema and transfer arrangements are agreed before delivery.",
    example: (
      <Card>
        <p className="text-sm text-on-navy-muted">Formats described in Mvaak’s materials:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {deliveryFormats.map((f) => (
            <li key={f} className="rounded-full bg-brand-light/15 px-3 py-1 font-mono text-xs text-brand-light">
              {f}
            </li>
          ))}
        </ul>
        <div className={cn(mono, "mt-4 flex items-center gap-2 text-on-navy-muted")}>
          <FileJson aria-hidden className="size-3.5 text-brand-light" /> manifest.json travels with every episode
        </div>
      </Card>
    ),
  },
];

export function DeliverablesExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = tabs[active];

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div role="tablist" aria-label="Deliverables" aria-orientation="vertical" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-t-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-p`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-3 rounded-xl border px-4 text-left text-[0.9375rem] font-medium whitespace-nowrap transition-colors lg:whitespace-normal",
                selected ? "border-accent bg-accent text-white" : "border-line bg-surface text-ink-2 hover:border-line-strong",
              )}
            >
              <span aria-hidden className={cn("hidden h-5 w-1 rounded-full lg:block", selected ? "bg-brand-light" : "bg-transparent")} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${uid}-p`}
        aria-labelledby={`${uid}-t-${t.id}`}
        key={t.id}
        className="grid animate-reveal gap-5 rounded-[1.25rem] border border-line bg-surface p-5 sm:p-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start"
      >
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-ink">{t.label}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
        </div>
        <figure>
          {t.example}
          <figcaption className="mt-2 text-xs text-faint">Illustrative example</figcaption>
        </figure>
      </div>
    </div>
  );
}
