import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionNav } from "@/components/ui/section-nav";
import { Process } from "@/components/home/process";
import { DataExample } from "@/components/home/data-example";
import { QualityThatMatters } from "@/components/home/quality-that-matters";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { ContactCta } from "@/components/shared/contact-cta";
import { TrackView } from "@/components/analytics/track-view";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Robotics & Physical AI Data",
  description:
    "How Mvaak turns real-world human activity into training data for robotics and Physical AI — the data pipeline, annotated examples and quality checks.",
  path: "/solutions/physical-ai",
});

/*
 * Solutions → Robotics & Physical AI. Holds the detailed, interactive explanations that
 * previously sat on the homepage: the five-stage pipeline, the raw / annotated / structured
 * data example, and the quality checks.
 */
export default function PhysicalAIPage() {
  return (
    <>
      <TrackView event="service_page_viewed" props={{ page: "solutions-physical-ai" }} />
      <section aria-labelledby="pai-title" className="relative overflow-hidden border-b border-line bg-canvas">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative pt-10 pb-14 sm:pt-12 lg:pt-14 lg:pb-16">
          <Breadcrumbs items={[{ label: "Solutions" }, { label: "Robotics & Physical AI" }]} />
          <p className="eyebrow">Solutions · Robotics & Physical AI</p>
          <h1 id="pai-title" className="mt-5 max-w-3xl text-h1 font-semibold text-balance text-ink">
            From real-world action to AI data.
          </h1>
          <p className="mt-5 max-w-2xl text-lead text-muted">
            How first-person demonstrations become structured, quality-checked training data for systems that act in the physical
            world.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact?type=egocentric-video#inquiry" size="lg" arrow trackAs="pai_hero_discuss">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/services/egocentric-video-data" size="lg" variant="secondary" trackAs="pai_hero_ego">
              Egocentric Data Collection
            </ButtonLink>
          </div>
        </div>
      </section>
      <SectionNav
        items={[
          { id: "pipeline", label: "Data pipeline" },
          { id: "data-example", label: "Data example" },
          { id: "quality", label: "Quality" },
          { id: "who-we-serve", label: "Who it’s for" },
        ]}
      />
      <Process />
      <DataExample />
      <QualityThatMatters />
      <WhoWeServe />
      <ContactCta />
    </>
  );
}
