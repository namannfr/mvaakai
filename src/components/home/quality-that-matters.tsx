import { ClipboardList, Tags, ShieldCheck, FileSignature } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";
import { QualityChecks } from "./quality-checks";

const pillars = [
  { icon: ClipboardList, title: "Structured collection", body: "Every hour traces to a written brief and acceptance rubric." },
  { icon: Tags, title: "Annotation", body: "Labelled to a written guideline, with ambiguity escalated." },
  { icon: ShieldCheck, title: "Validation", body: "Automated checks, human review and blind sampling." },
  { icon: FileSignature, title: "Consent & provenance", body: "Worker-level consent and a manifest with every episode." },
];

export function QualityThatMatters() {
  return (
    <Section id="quality" tone="surface" bordered labelledBy="quality-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeader
            id="quality-title"
            eyebrow="Quality that matters"
            title="Problems are caught before delivery."
            lead="Quality is built into every stage — and documented, so you can see exactly what was checked."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.title} data-reveal className="rounded-card border border-line bg-canvas p-5 transition-colors hover:border-accent-line">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <p.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href="/services/egocentric-video-data#ego-quality-title" trackAs="home_quality_more">
              How quality and consent work
            </TextLink>
          </div>
        </div>
        <div className="lg:pt-16">
          <QualityChecks />
        </div>
      </div>
    </Section>
  );
}
