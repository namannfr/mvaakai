"use client";

import { useId, useState } from "react";
import { Camera, ChevronDown, Clock, Eye, ListChecks, MapPin, Users, Info } from "lucide-react";
import { captureCategories, SCOPING_NOTE, type CaptureCategory } from "@/content/egocentric-collection";
import { cn } from "@/components/ui/cn";

const icons: Record<CaptureCategory["icon"], typeof Eye> = {
  eye: Eye,
  camera: Camera,
  list: ListChecks,
  map: MapPin,
  clock: Clock,
  users: Users,
};

/** Six scoping categories; one card expands at a time (disclosure pattern). */
export function CaptureExplorer() {
  const [open, setOpen] = useState<string | null>(captureCategories[0].id);
  const uid = useId();

  return (
    <ul className="grid items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
      {captureCategories.map((c) => {
        const Icon = icons[c.icon];
        const expanded = open === c.id;
        const panelId = `${uid}-${c.id}`;
        return (
          <li
            key={c.id}
            className={cn(
              "rounded-card border bg-surface transition-[border-color,box-shadow] duration-200",
              expanded ? "border-ink shadow-[0_18px_40px_-26px_rgb(21_26_33/0.45)]" : "border-line hover:border-line-strong",
            )}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-lg transition-colors",
                    expanded ? "bg-ink text-lime" : "bg-subtle text-ink",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{c.summary}</p>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : c.id)}
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong"
              >
                {expanded ? "Hide details" : "Explore details"}
                <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")} />
                <span className="sr-only">: {c.title}</span>
              </button>
            </div>
            <div id={panelId} hidden={!expanded} className="animate-reveal border-t border-line px-5 py-4 sm:px-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase">Considerations</p>
              <ul className="mt-2 space-y-2">
                {c.details.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              {c.fromMaterials?.map((m) => (
                <p key={m} className="mt-3 text-sm text-muted">
                  {m}
                </p>
              ))}
              <p className="mt-3 flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2 text-sm text-ink-2">
                <Info aria-hidden className="size-4 shrink-0 text-accent" />
                {SCOPING_NOTE}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
