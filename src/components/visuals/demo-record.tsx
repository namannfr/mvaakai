import { CheckCircle2 } from "lucide-react";
import { cn } from "@/components/ui/cn";

/**
 * The structured record that corresponds to the "pick up a cup" demonstration frame.
 * Clearly labelled as an illustrative example — not an actual Mvaak dataset.
 */
export const DEMO_ACTIONS = ["Reach", "Grasp", "Lift"] as const;

export function DemoRecord({
  className,
  activeAction = 1,
  status = "Reviewed",
}: {
  className?: string;
  activeAction?: number;
  /** Status shown in the record, e.g. "Reviewed" or "Review example". */
  status?: string;
}) {
  const rows: [string, React.ReactNode][] = [
    ["Task", "Pick up a cup"],
    [
      "Action",
      <span key="a" className="flex flex-wrap items-center gap-1">
        {DEMO_ACTIONS.map((a, i) => (
          <span key={a} className="flex items-center gap-1">
            <span
              className={cn(
                "rounded px-1.5 py-0.5",
                i === activeAction ? "bg-ink text-lime" : "bg-accent-soft text-accent",
              )}
            >
              {a}
            </span>
            {i < DEMO_ACTIONS.length - 1 && <span aria-hidden className="text-faint">→</span>}
          </span>
        ))}
      </span>,
    ],
    ["Timestamp", "00:04.2 – 00:05.8"],
    ["Object", "Ceramic cup"],
    [
      "Status",
      <span key="s" className="inline-flex items-center gap-1 font-medium text-success">
        <CheckCircle2 aria-hidden className="size-3.5" /> {status}
      </span>,
    ],
  ];
  return (
    <figure className={cn("rounded-card border border-line bg-surface p-4 shadow-[0_24px_48px_-28px_rgb(21_26_33/0.55)] sm:p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink uppercase">Episode record</p>
        <p className="font-mono text-[0.6875rem] text-faint">ep_0142 · seg 03</p>
      </div>
      <dl className="mt-3 divide-y divide-line text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 py-2">
            <dt className="text-faint">{k}</dt>
            <dd className="font-mono text-[0.8125rem] text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-2 text-xs text-faint">Illustrative example — not an actual Mvaak dataset.</figcaption>
    </figure>
  );
}
