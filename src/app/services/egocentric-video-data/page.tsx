import { Lightbulb, Mail, PackageCheck, PackagePlus, Info } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "@/components/ui/section-nav";
import { FaqList, faqJsonLd } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { CaptureFrame } from "@/components/visuals/capture-frame";
import { DemoRecord } from "@/components/visuals/demo-record";
import { CaptureExplorer } from "@/components/egocentric/capture-explorer";
import { EnvironmentExplorer } from "@/components/egocentric/environment-explorer";
import { DeliverablesExplorer } from "@/components/egocentric/deliverables-explorer";
import { StepExplorer } from "@/components/egocentric/step-explorer";
import { CheckExplorer } from "@/components/egocentric/check-explorer";
import { TrackView } from "@/components/analytics/track-view";
import {
  egocentricFaqs,
  governanceItems,
  optionalExtras,
  standardDeliverables,
  workflowSteps,
} from "@/content/egocentric-collection";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Egocentric Data Collection for Robotics & Physical AI",
  description:
    "First-person video and structured human demonstrations for AI systems learning real-world tasks — scoped capture, annotation, quality checks and agreed deliverables.",
  path: "/services/egocentric-video-data",
});

const SAMPLE = "/contact?type=egocentric-video&intent=sample#inquiry";
const SCOPE = "/contact?type=egocentric-video&intent=project#inquiry";

const sections = [
  { id: "what-we-capture", label: "What we capture" },
  { id: "environments", label: "Environments" },
  { id: "deliverables", label: "Deliverables" },
  { id: "workflow", label: "Workflow" },
  { id: "quality", label: "Quality" },
  { id: "scope", label: "Scope a project" },
  { id: "faq", label: "FAQ" },
];

export default function EgocentricDataCollectionPage() {
  return (
    <>
      <TrackView event="service_page_viewed" props={{ page: "egocentric-data-collection" }} />

      {/* 1 — Hero */}
      <section aria-labelledby="ego-title" className="relative overflow-hidden bg-navy text-on-navy">
        <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_40%,black,transparent_75%)]" />
        <div className="container-page relative pt-10 pb-16 sm:pt-12 lg:pt-14 lg:pb-24">
          <Breadcrumbs dark items={[{ label: "Services", href: "/services" }, { label: "Egocentric Data Collection" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="max-w-xl">
              <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">Egocentric Data Collection</p>
              <h1 id="ego-title" className="mt-5 text-h1 font-semibold text-balance text-white">
                First-person human demonstrations for robots that need to operate in the real world.
              </h1>
              <p className="mt-6 text-lead text-pretty text-on-navy-muted">
                Explore first-person video data and structured human demonstrations for AI systems learning to interpret and
                perform real-world tasks.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={SAMPLE} size="lg" arrow trackAs="ego_hero_sample">
                  Request a Sample
                </ButtonLink>
                <ButtonLink href="#scope" size="lg" variant="outline-light" trackAs="ego_hero_scope">
                  Scope a Collection Project
                </ButtonLink>
              </div>
            </div>
            <figure className="relative">
              <div className="overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3">
                <CaptureFrame
                  scene="cup"
                  uid="ego-hero"
                  className="block h-auto w-full"
                  title="First-person view of a hand reaching to pick up a ceramic cup, with hand keypoints and a labelled bounding box."
                />
              </div>
              <DemoRecord status="Review example" className="relative mt-4 sm:ml-auto sm:w-[22rem] lg:-mt-10 lg:mr-[-1.5rem]" />
              <figcaption className="mt-3 text-xs text-on-navy-muted">Illustrative example — not footage collected by Mvaak.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SectionNav items={sections} />

      {/* 2 — What we capture */}
      <Section id="what-we-capture" labelledBy="capture-title">
        <SectionHeader
          id="capture-title"
          eyebrow="What we capture"
          title="Capture the details that matter."
          lead="Collection requirements are defined around the task, environment, recording setup, and intended use of the data."
        />
        <div className="mt-10">
          <CaptureExplorer />
        </div>
      </Section>

      {/* 3 — Environments and tasks */}
      <Section id="environments" tone="surface" bordered labelledBy="env-title">
        <SectionHeader
          id="env-title"
          eyebrow="Environments and tasks"
          title="Data grounded in real-world activity."
          lead="Choose an environment to see example tasks. Examples are illustrative, not completed projects."
        />
        <div className="mt-10">
          <EnvironmentExplorer />
        </div>
      </Section>

      {/* 4 — What the buyer receives */}
      <Section id="deliverables" labelledBy="deliv-title">
        <SectionHeader
          id="deliv-title"
          eyebrow="What you receive"
          title="From recorded activity to structured data."
          lead="Define the expected files, metadata, annotation requirements, and quality documentation before collection begins."
        />
        <div className="mt-10">
          <DeliverablesExplorer />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div data-reveal className="rounded-[1.25rem] border border-ink bg-surface p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-ink text-lime">
                <PackageCheck aria-hidden className="size-5" />
              </span>
              <h3 className="text-lg font-semibold text-ink">Standard deliverables</h3>
            </div>
            <p className="mt-2 text-sm text-muted">Listed as standard per episode in Mvaak’s service materials. Confirmed for each project during scoping.</p>
            <ul className="mt-4 space-y-2">
              {standardDeliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-[1.25rem] border border-dashed border-line-strong bg-canvas p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-subtle text-ink">
                <PackagePlus aria-hidden className="size-5" />
              </span>
              <h3 className="text-lg font-semibold text-ink">Optional extras</h3>
            </div>
            <p className="mt-2 text-sm text-muted">Not included in the base offering. Available depending on project requirements and agreement.</p>
            <ul className="mt-4 space-y-2">
              {optionalExtras.map((d) => (
                <li key={d} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full border border-steel" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5 — How the data is processed */}
      <Section id="workflow" tone="navy" labelledBy="workflow-title">
        <SectionHeader
          dark
          id="workflow-title"
          eyebrow="How the data is processed"
          title="Six steps from task to delivery."
          lead="Select a step to see what happens, what’s needed, and what follows. Details vary by project."
        />
        <div className="mt-12">
          <StepExplorer steps={workflowSteps} label="Collection workflow" />
        </div>
      </Section>

      {/* 6 — Quality and traceability */}
      <Section id="quality" tone="surface" labelledBy="qt-title">
        <SectionHeader
          id="qt-title"
          eyebrow="Quality and traceability"
          title="Make every delivery easier to review."
          lead="Select a check to see what is reviewed and how issues are handled."
        />
        <div className="mt-10">
          <CheckExplorer />
        </div>
        <div className="mt-12 border-t border-line pt-10">
          <h3 className="text-xl font-semibold tracking-tight text-ink">Data governance</h3>
          <p className="mt-1 text-muted">Considerations agreed and documented for each project.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {governanceItems.map((g) => (
              <li key={g.title} data-reveal className="rounded-card border border-line bg-canvas p-5">
                <h4 className="font-semibold text-ink">{g.title}</h4>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 7 — Scope a collection project */}
      <Section id="scope" labelledBy="scope-title">
        <div className="grid gap-8 overflow-hidden rounded-[1.5rem] bg-ink p-6 text-on-navy sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:p-14">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-lime uppercase">Scope a collection project</p>
            <h2 id="scope-title" className="mt-4 text-h2 font-semibold text-balance text-white">
              Start with the task you need your AI to learn.
            </h2>
            <p className="mt-5 flex gap-3 rounded-xl border border-navy-line bg-navy-3 p-4 text-on-navy">
              <Lightbulb aria-hidden className="mt-0.5 size-5 shrink-0 text-lime" />
              Not sure about the technical details? Describe the task and we can identify the requirements to discuss.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={SCOPE} size="lg" arrow trackAs="ego_scope_project">
                Scope a Collection Project
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}?subject=Egocentric%20data%20collection`} size="lg" variant="outline-light" trackAs="ego_scope_email">
                <Mail aria-hidden className="size-4" /> {site.email}
              </ButtonLink>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-on-navy-muted uppercase">What the form asks</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "Name and work email",
                "Organisation",
                "Intended AI application",
                "Task or activity to capture",
                "Required environment",
                "Estimated volume or duration",
                "Desired annotation layers",
                "Expected delivery format",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 rounded-lg border border-navy-line bg-navy-3 px-3 py-2.5 text-sm text-on-navy">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm text-on-navy-muted">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              Only your contact details and a short description are required — leave the rest blank if unknown.
            </p>
          </div>
        </div>
      </Section>

      {/* 8 — FAQ */}
      <Section id="faq" tone="surface" bordered labelledBy="ego-faq-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader id="ego-faq-title" eyebrow="FAQ" title="Egocentric data questions." />
          <FaqList items={egocentricFaqs} />
        </div>
      </Section>

      {/* 9 — Final CTA */}
      <section aria-labelledby="ego-final-title" className="relative overflow-hidden bg-navy text-on-navy">
        <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="container-page relative py-[var(--spacing-section)] text-center">
          <span aria-hidden className="mx-auto block h-1 w-12 rounded-full bg-lime" />
          <h2 id="ego-final-title" className="mx-auto mt-6 max-w-3xl text-h2 font-semibold text-balance text-white">
            Have a real-world task in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-pretty text-on-navy-muted">
            Tell us what your AI needs to learn, and define a suitable collection scope with Mvaak.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={SAMPLE} size="lg" arrow trackAs="ego_final_sample">
              Request a Sample
            </ButtonLink>
            <ButtonLink href="/contact?type=egocentric-video#inquiry" size="lg" variant="outline-light" trackAs="ego_final_discuss">
              Discuss a Project
            </ButtonLink>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm text-on-navy-muted">
            Sample availability depends on the data and your requirements, and is confirmed when you get in touch.
          </p>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Egocentric Data Collection",
          serviceType: "AI training data — egocentric human-demonstration video",
          provider: { "@type": "Organization", name: site.name, url: site.url },
          description: "First-person video data and structured human demonstrations for AI systems learning real-world tasks.",
        }}
      />
      <JsonLd data={faqJsonLd(egocentricFaqs)} />
    </>
  );
}
