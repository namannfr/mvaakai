import { MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Institutions } from "@/components/shared/institutions";
import { ContactCta } from "@/components/shared/contact-cta";
import { capacity, credentials, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Mvaak",
  description:
    "Mvaak is an AI data services company building the data layer behind intelligent systems — specification, collection, annotation, validation and governance of real-world training data.",
  path: "/about",
});

const beliefs = [
  { title: "Quality is a definitions problem", body: "Most bad datasets come from labels two people read two ways — fixed before collection, not after." },
  { title: "Coverage beats volume", body: "The cases a model gets wrong matter more than the row count." },
  { title: "The guideline is part of the deliverable", body: "Data arrives with the written rules it was built to, so it can be audited and extended." },
];

const principles = [
  { title: "Quality", body: "Built into every stage, not inspected at the end." },
  { title: "Reliability", body: "The same standard on the last batch as the first." },
  { title: "Scalability", body: "Workflows that hold their standard as volume grows." },
  { title: "Technical understanding", body: "Scoped around how models are trained and evaluated." },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-16 sm:pt-12 lg:pt-14 lg:pb-24">
          <Breadcrumbs items={[{ label: "About" }]} />
          <p className="eyebrow">About Mvaak</p>
          <h1 id="about-title" className="mt-5 max-w-4xl text-display font-semibold text-balance text-ink">
            Building the data layer behind intelligent systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-pretty text-muted">
            Models are judged on their outputs, but they are shaped by their inputs. Mvaak works on the inputs — collecting,
            annotating, validating and structuring real-world information into datasets that hold up under training.
          </p>
        </div>
      </section>

      <Section labelledBy="who-we-are">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeader id="who-we-are" eyebrow="Who we are" title="An AI data services company, not a labelling vendor." />
          <div data-reveal className="space-y-5 text-lead text-muted">
            <p>
              A labelling vendor applies a schema. We help decide what the schema should be, what counts as correct, and which
              cases the model will get wrong — then collect, annotate and validate to that standard.
            </p>
            <p>
              We work across egocentric video, audio, video and text under one operating standard. Our most specialised work is
              first-person human demonstration data for Physical AI.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" bordered labelledBy="beliefs-title">
        <SectionHeader id="beliefs-title" eyebrow="Why we focus on AI data" title="AI quality begins with data quality."  />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {beliefs.map((b, i) => (
            <li key={b.title} data-reveal className="rounded-card border border-line bg-canvas p-6 sm:p-7">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-h3 font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{b.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="capabilities-title">
        <SectionHeader
          id="capabilities-title"
          eyebrow="Technical and operational capabilities"
          title="An execution company that runs distributed operations."
          lead="Real-world data collection is an operations problem as much as a technical one. Mvaak combines both."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {credentials.map((c) => (
            <li key={c.title} data-reveal className="rounded-card border border-line bg-surface p-6 sm:p-7">
              <h3 className="text-h3 font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {capacity.showOnSite && (
        <Section tone="navy" labelledBy="network-title">
          <SectionHeader
            dark
            id="network-title"
            eyebrow="Distributed collection operations"
            title="The network behind the hours."
            lead="An owned operations core plus a vetted agency network across India — capacity that can grow without a long ramp."
          />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-navy-line bg-navy-line sm:grid-cols-2 lg:grid-cols-4">
            {capacity.figures.map((f) => (
              <div key={f.label} data-reveal className="bg-navy-2 p-6 sm:p-7">
                <dt className="font-mono text-xs tracking-[0.12em] text-on-navy-muted uppercase">{f.label}</dt>
                <dd className="mt-3 text-4xl font-semibold tracking-tight text-white">{f.value}</dd>
                <dd className="mt-2 text-sm leading-relaxed text-on-navy-muted">{f.note}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-on-navy-muted">
            Capacity position as of {capacity.asOf}. Detailed ramp plan, rig inventory and coverage map available under NDA.
          </p>
        </Section>
      )}

      <Section labelledBy="principles-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeader id="principles-title" eyebrow="Quality and governance philosophy" title="Four things we hold to." />
            <p data-reveal className="mt-6 leading-relaxed text-muted">
              Governance is a design choice, not a retrofit: worker-level consent, a fair-wage policy and machine-readable
              provenance are part of how collection is run.
            </p>
            <div className="mt-6">
              <TextLink href="/#quality" trackAs="about_quality">
                How quality and governance work
              </TextLink>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} data-reveal className="rounded-card border border-line bg-surface p-6">
                <h3 className="font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="subtle" bordered labelledBy="presence-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
          <div>
            <SectionHeader
              id="presence-title"
              eyebrow="Where we are"
              title="Based in New Delhi. Working with AI teams anywhere."
              lead="Headquartered in India, with a presence in the UAE and Singapore."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {site.offices.map((o) => (
                <li key={o.city} data-reveal className="rounded-card border border-line bg-surface p-5">
                  <MapPin aria-hidden className="size-5 text-accent" />
                  <p className="mt-3 font-semibold text-ink">{o.city}</p>
                  <p className="text-sm text-muted">{o.country}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" arrow trackAs="about_discuss">
                Discuss a Project
              </ButtonLink>
              <ButtonLink href="/partnerships" variant="secondary" trackAs="about_partnerships">
                Partner with Mvaak
              </ButtonLink>
            </div>
          </div>
          <Institutions className="self-start" />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
