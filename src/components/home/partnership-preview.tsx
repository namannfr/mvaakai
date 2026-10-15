import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { TeamKit } from "@/components/visuals/team-kit";

export function PartnershipPreview() {
  return (
    <Section tone="subtle" bordered labelledBy="partner-preview-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">Mvaak Partnerships</p>
          <h2 id="partner-preview-title" className="mt-4 text-h2 font-semibold text-balance text-ink">
            Build With Mvaak.
          </h2>
          <p className="mt-5 max-w-lg text-lead text-pretty text-ink-2">
            Partner with us to execute real-world data projects through structured workflows, training, and equipment support
            where applicable.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/partnerships" size="lg" arrow trackAs="home_partnerships_explore">
              Explore Partnerships
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-ink-2">Applying is free. Every collaboration is agreed in writing first.</p>
        </div>
        <figure data-reveal className="rounded-[1.25rem] border border-accent-line bg-surface p-2 shadow-[0_24px_48px_-32px_rgb(21_26_33/0.4)]">
          <TeamKit className="block h-auto w-full" />
          <figcaption className="px-3 pt-2 pb-1 text-xs text-muted">Illustration: a partner field team and its capture kit.</figcaption>
        </figure>
      </div>
    </Section>
  );
}
