import { institutions, site } from "@/config/site";
import { cn } from "@/components/ui/cn";

/**
 * Lists institutions by name only (no logos — brand-mark use is not authorised).
 * Relationship wording is configurable in config/site.ts once confirmed.
 */
export function Institutions({ className }: { className?: string }) {
  const visible = institutions.filter((i) => i.show);
  if (visible.length === 0) return null;
  return (
    <div className={cn("rounded-card border border-line bg-surface p-6", className)}>
      <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">Institutional support & associations</h3>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {visible.map((i) => (
          <li key={i.name} className="text-[0.9375rem] text-ink-2">
            {i.relationship && <span className="block text-xs text-faint">{i.relationship}</span>}
            {i.name}
          </li>
        ))}
      </ul>
      <h3 className="mt-7 font-mono text-xs tracking-[0.14em] text-faint uppercase">Presence</h3>
      <ul className="mt-4 space-y-1.5">
        {site.offices.map((o) => (
          <li key={o.city} className="text-[0.9375rem] text-ink-2">
            {o.city}, {o.country}
            {"note" in o && o.note && <span className="text-faint"> · {o.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
