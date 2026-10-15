import { Check, ReceiptText } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { engagementModels } from "@/content/services";
import { cn } from "@/components/ui/cn";

/** Project type and CTA label for each model; labels stay short so they never crowd the card. */
const cta: Record<string, { type: string; label: string }> = {
  "pilot-sprint": { type: "egocentric-video", label: "Request a pilot" },
  "managed-corpus": { type: "egocentric-video", label: "Plan a programme" },
  "capture-cell": { type: "egocentric-video", label: "Set up a capture cell" },
  "annotation-rescue": { type: "annotation-rescue", label: "Discuss a rescue" },
};

export function EngagementModels({ tone = "canvas" }: { tone?: "surface" | "canvas" }) {
  return (
    <Section id="engagement-models" tone={tone} bordered labelledBy="engagement-title">
      <SectionHeader
        id="engagement-title"
        eyebrow="Work with Mvaak"
        title="Four ways to start."
        lead="Start small with a pilot, then scale on the same quality standard."
      />

      <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {engagementModels.map((m, i) => {
          const primary = i === 0;
          return (
            <li
              key={m.id}
              data-reveal
              className={cn(
                // Subgrid (md+) aligns heading, title, summary, list and CTA rows across cards in a row.
                "group relative flex min-w-0 flex-col rounded-card border p-[var(--spacing-card)] transition-[border-color,background-color,box-shadow] duration-200 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-y-0",
                primary
                  ? "border-accent-line bg-accent-soft hover:border-accent focus-within:border-accent"
                  : "border-line bg-surface hover:border-accent-line hover:shadow-[0_16px_40px_-24px_rgb(21_26_33/0.3)] focus-within:border-accent-line",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-accent uppercase">{m.cadence}</p>
                {primary && (
                  <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[0.6875rem] font-medium whitespace-nowrap text-lime">Start here</span>
                )}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance text-ink">{m.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{m.summary}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {m.points.slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <ButtonLink
                  href={`/contact?type=${cta[m.id].type}&model=${m.id}`}
                  variant={primary ? "primary" : "secondary"}
                  className="w-full"
                  arrow
                  trackAs={`engagement_${m.id}`}
                  aria-label={`${cta[m.id].label} — ${m.name}`}
                >
                  {cta[m.id].label}
                </ButtonLink>
              </div>
            </li>
          );
        })}
      </ul>

      <div data-reveal className="mt-10 flex max-w-3xl gap-4 rounded-card border border-line bg-surface p-5 sm:p-6">
        <ReceiptText aria-hidden className="mt-0.5 size-5 shrink-0 text-steel" />
        <p className="text-[0.9375rem] leading-relaxed text-muted">
          <span className="font-medium text-ink">Commercials.</span> Priced per accepted hour by rig tier and annotation depth.
          Rejected hours are not invoiced. A detailed rate card is issued on request after scoping.
        </p>
      </div>
    </Section>
  );
}
