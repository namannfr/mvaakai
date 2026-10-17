import { cn } from "@/components/ui/cn";

/**
 * Schematic of the synchronised streams in one egocentric episode — frames, IMU,
 * hand pose and sub-action segmentation on a shared clock. Illustrative only.
 */

const W = 360;

function wave(seed: number, amp: number, freq: number, h: number) {
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 4) {
    const t = x / W;
    const y =
      h / 2 +
      amp * Math.sin(t * freq * Math.PI * 2 + seed) * 0.6 +
      amp * 0.4 * Math.sin(t * freq * 5.3 + seed * 2.1) +
      amp * 0.25 * Math.sin(t * 31 + seed * 0.7);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export const SEGMENTS = [
  { label: "reach", w: 0.16 },
  { label: "grasp", w: 0.14 },
  { label: "lift", w: 0.12 },
  { label: "flip", w: 0.2 },
  { label: "recover", w: 0.14, failure: true },
  { label: "place", w: 0.24 },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4.75rem_1fr] items-center gap-3 sm:grid-cols-[5.5rem_1fr]">
      <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-faint uppercase">{label}</span>
      <div className="relative h-9 min-w-0">{children}</div>
    </div>
  );
}

export function StreamPanel({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("rounded-card border border-line bg-surface p-4 shadow-[0_1px_2px_rgb(21_26_33/0.04),0_12px_32px_-12px_rgb(21_26_33/0.18)] sm:p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-2 uppercase">Synchronised at source</p>
        <p className="font-mono text-[0.6875rem] text-faint max-sm:hidden">one clock · drift checked</p>
      </div>
      <div className="relative mt-4 space-y-2.5">
        <Row label="RGB">
          <div className="flex h-full gap-1">
            {Array.from({ length: compact ? 7 : 9 }).map((_, i) => (
              <div key={i} className="relative flex-1 overflow-hidden rounded-[3px] bg-navy-3">
                <div className="absolute inset-x-1 bottom-1 h-1/3 rounded-sm border-t border-white/20" />
                <div
                  className="absolute size-2 rounded-full bg-brand/80"
                  style={{ left: `${18 + ((i * 37) % 60)}%`, top: `${30 + ((i * 23) % 30)}%` }}
                />
              </div>
            ))}
          </div>
        </Row>
        <Row label="IMU">
          <svg viewBox={`0 0 ${W} 36`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            <polyline points={wave(0.4, 9, 2.2, 36)} fill="none" stroke="#315bea" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <polyline points={wave(2.1, 7, 3.1, 36)} fill="none" stroke="#5f7290" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            <polyline points={wave(4.2, 5, 1.6, 36)} fill="none" stroke="#8fa8ff" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </svg>
        </Row>
        <Row label="Hand pose">
          <svg viewBox={`0 0 ${W} 36`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            {Array.from({ length: 40 }).map((_, i) => {
              const x = 4 + i * 9;
              const y1 = 12 + 7 * Math.sin(i * 0.45);
              const y2 = 24 + 6 * Math.sin(i * 0.38 + 1.4);
              return (
                <g key={i}>
                  <circle cx={x} cy={y1.toFixed(1)} r="1.6" fill="#315bea" />
                  <circle cx={x} cy={y2.toFixed(1)} r="1.6" fill="#5f7290" opacity="0.8" />
                </g>
              );
            })}
          </svg>
        </Row>
        <Row label="Sub-action">
          <div className="flex h-full gap-0.5 overflow-hidden rounded-md">
            {SEGMENTS.map((s) => (
              <div
                key={s.label}
                style={{ flexBasis: `${s.w * 100}%` }}
                className={cn(
                  "flex min-w-0 items-center justify-center px-1 font-mono text-[0.625rem] sm:text-[0.6875rem]",
                  s.failure ? "border border-dashed border-warning/60 bg-warning-soft text-warning" : "bg-accent-soft text-accent",
                )}
              >
                <span className="truncate">{s.label}</span>
              </div>
            ))}
          </div>
        </Row>
        {/* shared playhead */}
        <div aria-hidden className="pointer-events-none absolute inset-y-[-6px] right-0 left-[5.5rem] sm:left-[6.25rem]">
          <div className="relative h-full w-full [--playhead-distance:calc(100cqw)] [container-type:inline-size]">
            <div className="absolute inset-y-0 left-0 w-px animate-playhead bg-ink/70">
              <span className="absolute -top-1 -left-[3px] size-[7px] rounded-full bg-ink" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
        {["consent_id ✓", "licence flags ✓", "provenance ✓", "LeRobot · RLDS · MCAP"].map((t) => (
          <span key={t} className="rounded-full border border-line bg-subtle px-2.5 py-1 font-mono text-[0.6875rem] text-ink-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
