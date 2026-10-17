import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "@/components/ui/section-nav";
import { EngagementModels } from "@/components/home/engagement-models";
import { Bullets } from "@/components/ui/bullets";
import { ContactCta } from "@/components/shared/contact-cta";
import { TrackView } from "@/components/analytics/track-view";
import { services } from "@/content/services";
import { qualityGates } from "@/content/data-types";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Training Data Services",
  description:
    "Egocentric video data, custom data collection, audio, video and text annotation, dataset quality assurance and dataset rescue — scoped to what your model has to learn.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <TrackView event="service_page_viewed" props={{ page: "services" }} />
      <section aria-labelledby="services-title" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-14 sm:pt-12 lg:pt-14 lg:pb-20">
          <Breadcrumbs items={[{ label: "Services" }]} />
          <SectionHeader
            as="h1"
            id="services-title"
            eyebrow="Services"
            title="The data your AI needs — specified, collected, labelled and validated."
            lead="From first-person human demonstrations to annotated audio, video and text, every service runs on the same operating standard: a written specification, trained people, human review and structured delivery."
          />
        </div>
      </section>

      <Section tone="navy" labelledBy="standard-title">
        <SectionHeader
          dark
          id="standard-title"
          eyebrow="One operating standard"
          title="The same six gates, whichever data type you buy."
          lead="One quality process for every service, so mixed corpora stay consistent."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-navy-line bg-navy-line sm:grid-cols-2 lg:grid-cols-3">
          {qualityGates.map((g, i) => (
            <li key={g.title} data-reveal className="bg-navy-3 p-6 transition-colors hover:bg-navy-4">
              <span className="font-mono text-sm text-brand-light">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-semibold text-white">{g.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-on-navy-muted">{g.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <SectionNav label="Services" items={services.map((s) => ({ id: s.id, label: s.title }))} />

      <div className="bg-canvas">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={i % 2 === 1 ? "border-t border-line bg-surface" : "border-t border-line"}
          >
            {/* Shared anchor for "Data Annotation" links (audio, video and text follow in order). */}
            {s.id === "audio-annotation" && <span id="annotation" aria-hidden className="block scroll-mt-24" />}
            <div className="container-page py-16 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                      <s.icon aria-hidden className="size-5" />
                    </span>
                    <span className="font-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 id={`${s.id}-title`} className="mt-5 text-h2 font-semibold text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lead text-muted">{s.short}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <ButtonLink href={`/contact?type=${s.id}`} arrow trackAs={`services_discuss_${s.id}`}>
                      Discuss this service
                    </ButtonLink>
                    {s.hasDetailPage && (
                      <ButtonLink href={s.href} variant="secondary" trackAs={`services_details_${s.id}`}>
                        View details
                      </ButtonLink>
                    )}
                  </div>
                </div>

                <div>
                  <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                    <div data-reveal className="bg-surface p-6">
                      <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">What you receive</h3>
                      <Bullets items={s.deliverables} check className="mt-3 text-[0.9375rem]" />
                    </div>
                    <div data-reveal className="bg-surface p-6">
                      <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">Useful to share with us</h3>
                      <Bullets items={s.provide} className="mt-3 text-[0.9375rem]" />
                    </div>
                  </div>
                  <details className="group mt-3 rounded-card border border-line bg-surface">
                    <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 px-6 py-3 text-[0.9375rem] font-medium text-ink hover:text-accent">
                      Why it matters and how we work
                      <span aria-hidden className="text-accent transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <div className="grid gap-6 border-t border-line px-6 py-5 sm:grid-cols-2">
                      <div>
                        <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">The problem</h3>
                        <p className="mt-2 leading-relaxed text-ink-2">{s.problem}</p>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">What Mvaak does</h3>
                        <p className="mt-2 leading-relaxed text-ink-2">{s.whatWeDo}</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>


      <EngagementModels />

      <ContactCta
        title="Need a custom dataset?"
        body="If your requirement does not map cleanly onto one service, it is usually a combination. Describe the model and what it gets wrong — we’ll tell you what the data would have to look like."
        cta="Discuss a Project"
        trackAs="services_final_cta"
      />
    </>
  );
}
