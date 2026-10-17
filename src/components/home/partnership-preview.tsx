import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { gains, profiles, steps } from "@/content/partnership-program";

/** Homepage partnerships preview — copy is drawn from the /partnerships programme content. */
export function PartnershipPreview() {
  return (
    <Section tone="subtle" bordered labelledBy="partner-preview-title">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">Mvaak Partnerships</p>
          <h2 id="partner-preview-title" className="mt-4 text-h2 font-semibold text-balance text-ink">
            Build With Mvaak.
          </h2>
          <p className="mt-5 max-w-xl text-lead text-pretty text-ink-2">
            Partner with us to execute real-world data projects through structured workflows, training, and equipment support
            where applicable.
          </p>

          <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">Who can apply</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {profiles.map((p) => (
              <li key={p.title} className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm text-ink-2">
                {p.title}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">What Mvaak may provide</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {gains.map((g) => (
              <li key={g.title} className="flex gap-3 rounded-card border border-line bg-surface p-4">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <g.icon aria-hidden className="size-[1.125rem]" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{g.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{g.body}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/partnerships" size="lg" arrow trackAs="home_partnerships_explore">
              Explore Partnerships
            </ButtonLink>
            <ButtonLink href="/partnerships#apply" size="lg" variant="secondary" trackAs="home_partnerships_apply">
              Apply to Partner
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-ink-2">Applying is free. Every collaboration is agreed in writing first.</p>
        </div>

        <div data-reveal className="lg:sticky lg:top-28">
          <figure className="overflow-hidden rounded-[1.25rem] border border-line bg-navy shadow-[0_24px_48px_-32px_rgb(21_26_33/0.45)]">
            <Image
              src="/images/egocentric/ego-screwdriver.jpg"
              alt="First-person view of gloved hands tightening a screw on an industrial machine panel, with the tool marked by a labelled bounding box — the kind of real-world capture task a partner team executes."
              width={765}
              height={476}
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="block h-auto w-full"
            />
            <figcaption className="bg-surface px-4 py-2.5 text-xs text-muted">
              Illustrative: first-person capture of the kind of task partner teams execute.
            </figcaption>
          </figure>

          <div className="mt-4 rounded-card border border-line bg-surface p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint uppercase">How it works</p>
            <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-2.5">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-snug font-medium text-ink">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
