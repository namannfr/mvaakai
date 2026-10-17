import { Suspense } from "react";
import Link from "next/link";
import { Mail, Users } from "lucide-react";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Discuss a Project",
  description:
    "Start a conversation about AI training data with Mvaak — egocentric video, data collection, audio, video and text annotation, or dataset quality assurance.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read it properly", body: "A member of the team reviews your requirements — not an auto-responder." },
  { title: "We reply with questions or a proposal", body: "Usually clarifying questions about the task, environments and acceptance criteria, or a suggested first step." },
  { title: "We scope a first engagement", body: "Often a fixed-scope pilot, so you can judge the data before committing to volume." },
];

function FormSkeleton() {
  return (
    <div aria-hidden className="h-[64rem] animate-pulse rounded-card border border-line bg-surface" />
  );
}

export default function ContactPage() {
  return (
    <div className="bg-canvas">
      <div className="container-page py-10 sm:py-14 lg:py-16">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Start a project</p>
            <h1 className="mt-4 text-h1 font-semibold text-balance text-ink">Tell us what your AI needs to learn.</h1>
            <p className="mt-5 max-w-xl text-lead text-pretty text-muted">
              Share the task, environment or model-training challenge you are working on. We’ll use the details to understand your
              data requirements and identify a suitable next step.
            </p>

            <div className="mt-10 rounded-card border border-navy-line bg-navy p-6 text-on-navy">
              <p className="font-mono text-xs tracking-[0.14em] text-brand-light uppercase">Send us one task</p>
              <p className="mt-3 leading-relaxed text-on-navy">
                Name a single skill your policies keep failing on. We’ll return a written capture brief, an environment and object
                matrix, an acceptance rubric and a costed 30-day pilot — before you commit to anything.
              </p>
            </div>

            <h2 className="mt-10 font-mono text-xs tracking-[0.14em] text-faint uppercase">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink-2">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-mono text-xs tracking-[0.14em] text-faint uppercase">Email us</h2>
              <a
                href={`mailto:${site.email}`}
                className="group mt-4 flex items-center gap-4 rounded-card border border-accent-line bg-accent-soft p-5 transition-colors hover:border-accent"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Mail aria-hidden className="size-5" />
                </span>
                <span className="min-w-0 text-lg font-semibold break-words text-ink group-hover:text-accent-strong sm:text-xl">
                  {site.email}
                </span>
              </a>
            </div>

            <div className="mt-8 flex gap-3 rounded-card border border-line bg-surface p-5">
              <Users aria-hidden className="mt-0.5 size-5 shrink-0 text-steel" />
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                <span className="font-medium text-ink">Applying as a partner team?</span> Use the{" "}
                <Link href="/partnerships#apply" className="text-accent underline underline-offset-2">
                  partnership application
                </Link>{" "}
                instead.
              </p>
            </div>
          </div>

          <div id="inquiry" className="scroll-mt-24">
            <h2 className="sr-only">Project inquiry form</h2>
            <Suspense fallback={<FormSkeleton />}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
