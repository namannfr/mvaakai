import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { WhatWeDo } from "@/components/home/what-we-do";
import { EgocentricHighlight } from "@/components/home/egocentric-highlight";
import { VideoSection } from "@/components/home/video-section";
import { PartnershipPreview } from "@/components/home/partnership-preview";
import { ContactCta } from "@/components/shared/contact-cta";
import { BackedBy } from "@/components/shared/backed-by";
import { Recognition } from "@/components/shared/recognition";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: { absolute: "Mvaak — Real-World Data for the Next Generation of AI" },
  description:
    "Human demonstrations, structured data and quality-controlled datasets for teams building intelligent systems — egocentric video for Physical AI, data collection, annotation and quality assurance.",
  alternates: { canonical: "/" },
};

/*
 * Homepage — the essentials, with detail one click away via the header menus:
 * hero → institutional backing → services → egocentric data → video → recognition →
 * partnerships → contact. The pipeline, data example and quality detail live on
 * /solutions/physical-ai; engagement models on /services.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <section aria-label="Institutional support" className="border-b border-line bg-surface">
        <div className="container-page py-10">
          <BackedBy />
        </div>
      </section>
      <WhatWeDo />
      <EgocentricHighlight />
      <VideoSection />
      <Section id="recognition" labelledBy="recognition-title" tone="canvas">
        <p id="recognition-title" className="eyebrow">
          Recognition
        </p>
        <Recognition compact className="mt-6" />
      </Section>
      <PartnershipPreview />
      <ContactCta />
    </>
  );
}
