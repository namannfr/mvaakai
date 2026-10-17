import {
  Users,
  Clock,
  MessageSquare,
  ListChecks,
  ShieldCheck,
  Package,
  Mail,
  Info,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqList, faqJsonLd } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { CaptureFrame } from "@/components/visuals/capture-frame";
import { PartnerModel } from "@/components/visuals/partner-model";
import { PartnershipForm } from "@/components/forms/partnership-form";
import { StickyApplyBar } from "@/components/partnerships/sticky-apply-bar";
import { TrackView } from "@/components/analytics/track-view";
import { PENDING_TERM_LABEL, partnershipTerms } from "@/config/partnership";
import { pageMetadata } from "@/lib/metadata";
import { gains, profiles, steps } from "@/content/partnership-program";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Partnerships — Build With Mvaak",
  description:
    "A selective, project-based collaboration programme for small startups, technical teams and data collection operators who can execute real-world AI data projects with Mvaak.",
  path: "/partnerships",
});

const term = (key: string) => partnershipTerms.find((t) => t.key === key)?.value ?? null;

const responsibilities = [
  { icon: Users, text: "A committed team with defined roles" },
  { icon: Clock, text: "Agreed working hours for the project" },
  { icon: ListChecks, text: "Following protocols and quality standards" },
  { icon: ShieldCheck, text: "Respect for consent, privacy and safety" },
  { icon: MessageSquare, text: "Reliable communication and accurate reporting" },
  { icon: Package, text: "Care and return of equipment, where provided" },
];

const agreementItems = [
  "Project scope and deliverables",
  "Required working hours and duration",
  "Equipment ownership, usage and return",
  "Training and onboarding arrangements",
  "Any initial fee — and exactly what it covers",
  "Compensation, revenue share or other commercial terms",
  "Data ownership and permitted usage",
  "Confidentiality and intellectual property",
  "Quality acceptance criteria",
  "Termination and dispute-handling procedures",
];

const faqs = [
  {
    q: "Who can apply?",
    a: "Small startups, technical teams, data collection operators and founding teams that can commit time, follow written specifications and deliver measurable output. Eligibility is assessed against the requirements of each project, so teams with different backgrounds are welcome to apply.",
  },
  {
    q: "Can a team of three or four people apply?",
    a: "Yes. Small teams can be a good fit for many real-world data projects, provided responsibilities are clearly defined and the team can commit the time a project needs.",
  },
  {
    q: "Does Mvaak provide equipment?",
    a:
      term("equipment") ??
      "For some approved projects, relevant capture devices may be provided. Whether equipment is provided — and the terms for its use, care and return — depends on the project and on availability, and is set out in the written agreement.",
  },
  {
    q: "Is training provided?",
    a:
      term("training") ??
      "Approved partners receive the onboarding and technical instructions needed for the agreed workflow. The format and duration depend on the project and are confirmed before work begins.",
  },
  {
    q: "How many hours must a team commit?",
    a:
      term("hours") ??
      "There is no single published requirement. Working hours depend on each project’s scope and timeline, and are agreed and documented before any work begins.",
  },
  {
    q: "Is there an initial fee?",
    a:
      term("fee") ??
      "Some collaborations may involve an initial project or onboarding fee. If one applies, its exact amount and what it covers are disclosed to you in writing before you decide and before any payment. Applying is free, and no payment is collected through this website.",
  },
  {
    q: "How are commercial terms decided?",
    a:
      term("commercial") ??
      "With shortlisted applicants, during evaluation. Scope, deliverables, compensation or other commercial structure, and any costs are discussed openly and documented in a written agreement before work begins.",
  },
  {
    q: "Does submitting an application guarantee a project?",
    a: "No. Applications are reviewed against current and upcoming project requirements. Submitting does not guarantee acceptance, a project assignment, equipment access or income.",
  },
  {
    q: "How is data quality evaluated?",
    a: "Against acceptance criteria agreed before work starts, using Mvaak’s specifications, capture protocols and quality review. You will know how your work is evaluated before execution begins.",
  },
  {
    q: "How do partners protect participant consent and privacy?",
    a: "By following Mvaak’s consent and data-handling protocols for each project — for example, obtaining consent from the people being recorded, respecting no-record zones and requests to stop recording, and handling data only as instructed. Specific requirements are covered in training and the project agreement.",
  },
  {
    q: "What happens after the application is submitted?",
    a: "Our team reviews it. If your capabilities align with a current or upcoming requirement, we contact you to discuss the project, the terms and the next steps.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <TrackView event="service_page_viewed" props={{ page: "partnerships" }} />

      {/* 6.1 Hero */}
      <section id="partnership-hero" aria-labelledby="partnership-title" className="relative overflow-hidden bg-navy text-on-navy">
        <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_40%,black,transparent_75%)]" />
        <div className="container-page relative pt-10 pb-16 sm:pt-12 lg:pt-14 lg:pb-24">
          <Breadcrumbs dark items={[{ label: "Partnerships" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="max-w-xl">
              <p className="font-mono text-xs tracking-[0.32em] text-brand-light uppercase">Mvaak Partnerships</p>
              <h1 id="partnership-title" className="mt-5 text-display font-semibold text-balance text-white">
                Your team. Our infrastructure. Real-world AI data.
              </h1>
              <p className="mt-6 text-lead text-pretty text-on-navy-muted">
                Partner with Mvaak to execute structured real-world data projects. Eligible teams can explore equipment support,
                practical training, defined project workflows, and opportunities to contribute to the data behind intelligent systems.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="#apply" size="lg" arrow trackAs="partnerships_hero_apply">
                  Apply to Partner
                </ButtonLink>
                <ButtonLink href="#how-it-works" size="lg" variant="outline-light" trackAs="partnerships_hero_how">
                  How It Works
                </ButtonLink>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-navy-line pt-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Application", "Free"],
                  ["Selection", "Project-based"],
                  ["Terms", "Agreed in writing"],
                  ["Payments online", "Never"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.6875rem] tracking-[0.1em] text-on-navy-muted uppercase">{k}</dt>
                    <dd className="mt-1 text-sm font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-4">
              <figure className="relative overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3">
                <CaptureFrame
                  scene="agricultural"
                  episode="field_team_03"
                  className="block h-auto w-full"
                  title="First-person capture of a seedling being transplanted in a field, with hand keypoints and a labelled bounding box — the kind of work a partner field team executes."
                />
                <figcaption className="absolute right-3 bottom-3 left-3 flex flex-wrap gap-1.5 sm:right-auto">
                  {["Field team · 3 members", "Capture protocol v1", "QA: field check ✓"].map((t) => (
                    <span key={t} className="rounded-full bg-navy/80 px-2.5 py-1 font-mono text-[0.6875rem] text-on-navy ring-1 ring-white/15 backdrop-blur">
                      {t}
                    </span>
                  ))}
                </figcaption>
              </figure>
              <PartnerModel dark />
            </div>
          </div>
        </div>
      </section>

      {/* 6.2 Who can apply */}
      <Section labelledBy="who-title">
        <SectionHeader
          id="who-title"
          eyebrow="Who can apply"
          title="Built for teams that can execute."
          lead="Different backgrounds are welcome. Eligibility depends on each project’s requirements."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((p) => (
            <article key={p.letter} data-reveal className="rounded-card border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent">
                  <p.icon aria-hidden className="size-5" />
                </span>
                <span className="font-mono text-sm text-faint">{p.letter}</span>
              </div>
              <h3 className="mt-6 text-h3 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 6.3 How it works */}
      <Section id="how-it-works" tone="surface" bordered labelledBy="how-title">
        <div className="relative">
          <SectionHeader
            id="how-title"
            eyebrow="The partnership model"
            title="From application to delivery, in six steps."
            lead="Selective and project-based, with every decision made explicit."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal className="relative bg-surface p-6 transition-colors hover:bg-canvas sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-accent">Step {String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="flex gap-1">
                    {steps.map((_, j) => (
                      <span key={j} className={`h-1 w-3 rounded-full ${j <= i ? "bg-accent" : "bg-sunken"}`} />
                    ))}
                  </span>
                </div>
                <h3 className="mt-4 text-h3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-6 flex gap-3 rounded-xl border border-accent-line bg-accent-soft p-4 text-[0.9375rem] leading-relaxed text-ink-2">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
          Submitting an application does not guarantee acceptance or a project assignment. Participation begins only after
          evaluation and a signed written agreement.
          </p>
        </div>
      </Section>

      {/* 6.4 + 6.5 Gains and responsibilities */}
      <Section labelledBy="gains-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <SectionHeader
              id="gains-title"
              eyebrow="What Mvaak may provide"
              title="What Mvaak may provide."
              lead="Subject to approval and the written agreement."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {gains.map((g) => (
                <li key={g.title} data-reveal className="rounded-card border border-line bg-surface p-5">
                  <g.icon aria-hidden className="size-5 text-accent" />
                  <h3 className="mt-3 font-semibold text-ink">{g.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              eyebrow="What Mvaak expects"
              title="What we expect."
              lead="These apply to every approved collaboration."
            />
            <ul data-reveal className="mt-10 divide-y divide-line rounded-card border border-line bg-surface">
              {responsibilities.map((r) => (
                <li key={r.text} className="flex items-start gap-4 px-5 py-4">
                  <r.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-steel" />
                  <span className="leading-relaxed text-ink-2">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 6.6 Commercial arrangement */}
      <Section tone="navy" labelledBy="agreement-title">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <SectionHeader
              dark
              id="agreement-title"
              eyebrow="Commercial transparency"
              title="A clear agreement before work begins."
              lead="Everything is documented before work starts. Nothing is payable through this website."
            />
            <ul data-reveal className="mt-10 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {agreementItems.map((a) => (
                <li key={a} className="flex gap-3 text-on-navy">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div data-reveal className="rounded-card border border-navy-line bg-navy-2 p-6 sm:p-7">
              <h3 className="font-semibold text-white">If an initial fee applies</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-on-navy-muted">
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-light" /> The exact amount and its purpose are disclosed in writing before any payment.
                </li>
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-light" /> It relates to a defined project and states exactly what it covers. It is never charged simply to apply.
                </li>
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-light" /> You can ask questions and decline before committing to anything.
                </li>
                <li className="flex gap-3">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-light" /> No payment is collected through this website.
                </li>
              </ul>
            </div>
            <div data-reveal className="overflow-hidden rounded-card border border-navy-line">
              <table className="w-full text-left text-[0.9375rem]">
                <caption className="bg-navy-2 px-5 pt-5 pb-2 text-left font-mono text-xs tracking-[0.12em] text-on-navy-muted uppercase">
                  Programme terms — current status
                </caption>
                <tbody className="divide-y divide-navy-line bg-navy-2">
                  {partnershipTerms.map((t) => (
                    <tr key={t.key}>
                      <th scope="row" className="px-5 py-3 font-normal text-on-navy">
                        {t.label}
                      </th>
                      <td className={t.value ? "px-5 py-3 text-right text-on-navy" : "px-5 py-3 text-right text-sm text-on-navy-muted sm:whitespace-nowrap"}>
                        {t.value ?? PENDING_TERM_LABEL}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* 6.7 Application */}
      <Section id="apply" tone="subtle" labelledBy="apply-title" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            id="apply-title"
            eyebrow="Partnership application"
            title="Apply to Partner"
            lead="Share your details to connect with Mvaak. We review every application and get in touch if there is a fit. Applying is free and does not guarantee acceptance or work."
          />
          <div className="mt-10">
            <PartnershipForm />
          </div>
        </div>
      </Section>

      {/* 6.10 FAQ */}
      <Section id="faq" tone="surface" bordered labelledBy="partner-faq-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            id="partner-faq-title"
            eyebrow="FAQ"
            title="Partnership questions."
            lead={
              <>
                Something not covered?{" "}
                <a href={`mailto:${site.email}?subject=Partnership%20question`} className="text-accent underline underline-offset-2">
                  Ask a partnership question
                </a>
                .
              </>
            }
          />
          <FaqList items={faqs} />
        </div>
      </Section>

      {/* 6.11 Final CTA */}
      <section aria-labelledby="partner-cta-title" className="relative overflow-hidden bg-navy pb-24 text-on-navy lg:pb-0">
        <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container-page relative py-[clamp(4.5rem,3rem+6vw,8rem)] text-center">
          <h2 id="partner-cta-title" data-reveal className="mx-auto max-w-3xl text-h2 font-semibold text-balance text-white">
            Have a team ready to build with us?
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-lead text-pretty text-on-navy-muted">
            Tell us what your team can execute, the environments you can access and the commitment you can make. We’ll review your
            capabilities against our partnership requirements.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#apply" variant="light" size="lg" arrow trackAs="partnerships_final_apply">
              Submit Your Partnership Application
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}?subject=Partnership%20question`} variant="outline-light" size="lg" trackAs="partnerships_final_email">
              <Mail aria-hidden className="size-4" /> {site.email}
            </ButtonLink>
          </div>
        </div>
      </section>

      <StickyApplyBar />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
