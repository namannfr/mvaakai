import { ClipboardList, GraduationCap, Glasses, ShieldCheck, Users, MapPin, ArrowLeftRight } from "lucide-react";
import { cn } from "@/components/ui/cn";

/** Diagram of the partnership model: partner team ↔ Mvaak specification, training, equipment and QA. */
export function PartnerModel({ className, dark = false }: { className?: string; dark?: boolean }) {
  const card = dark ? "border-navy-line bg-navy-2" : "border-line bg-surface";
  const label = dark ? "text-on-navy-muted" : "text-faint";
  const text = dark ? "text-white" : "text-ink";
  const chip = dark ? "border-navy-line bg-navy-3 text-on-navy" : "border-line bg-subtle text-ink-2";

  return (
    <div className={cn("grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]", className)} role="img" aria-label="Partnership model: your team brings people, capacity and access to environments; Mvaak provides specifications, training, equipment where agreed, and quality review.">
      <div className={cn("rounded-card border p-5", card)}>
        <p className={cn("font-mono text-[0.6875rem] tracking-[0.12em] uppercase", label)}>Your team</p>
        <div className="mt-4 grid gap-2">
          {["Capture lead", "Field operator", "QA reviewer", "Coordinator"].map((r) => (
            <div key={r} className={cn("flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.8125rem]", chip)}>
              <Users aria-hidden className="size-3.5 shrink-0 opacity-70" />
              <span>{r}</span>
            </div>
          ))}
        </div>
        <div className={cn("mt-3 flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.8125rem]", chip)}>
          <MapPin aria-hidden className="size-3.5 shrink-0 opacity-70" />
          Access to real environments
        </div>
      </div>

      <div className="flex items-center justify-center py-1 sm:px-1">
        <span className={cn("flex size-10 items-center justify-center rounded-full border", dark ? "border-navy-line bg-navy text-brand-light" : "border-accent-line bg-accent-soft text-accent")}>
          <ArrowLeftRight aria-hidden className="size-4 rotate-90 sm:rotate-0" />
        </span>
      </div>

      <div className={cn("rounded-card border p-5", card)}>
        <p className={cn("font-mono text-[0.6875rem] tracking-[0.12em] uppercase", label)}>Mvaak</p>
        <ul className="mt-4 space-y-2.5">
          {[
            { icon: ClipboardList, t: "Specifications & capture protocols" },
            { icon: GraduationCap, t: "Training & onboarding" },
            { icon: Glasses, t: "Equipment, where agreed" },
            { icon: ShieldCheck, t: "QA & acceptance criteria" },
          ].map(({ icon: Icon, t }) => (
            <li key={t} className={cn("flex items-center gap-2.5 text-[0.9375rem]", text)}>
              <Icon aria-hidden className={cn("size-4 shrink-0", dark ? "text-brand-light" : "text-accent")} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
