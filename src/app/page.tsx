import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { SolutionsOverview } from "@/components/home/solutions-overview";
import { EgocentricHighlight } from "@/components/home/egocentric-highlight";
import { AwardsRecognition } from "@/components/home/awards-recognition";
import { PartnershipPreview } from "@/components/home/partnership-preview";
import { ContactCta } from "@/components/shared/contact-cta";
import { BackedBy } from "@/components/shared/backed-by";

export const metadata: Metadata = {
  title: { absolute: "Mvaak — Real-World Data for the Next Generation of AI" },
  description:
    "Human demonstrations, structured data and quality-controlled datasets for teams building intelligent systems — egocentric video for Physical AI, data collection, annotation and quality assurance.",
  alternates: { canonical: "/" },
};

/*
 * Homepage — the essentials, with detail one click away via the header menus:
 * hero → institutional backing → solutions → egocentric data → awards & recognitions
 * (video + award photos) → partnerships → contact. The pipeline, data example and
 * quality detail live on /solutions/physical-ai; engagement models on /services.
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
      <SolutionsOverview />
      <EgocentricHighlight />
      <AwardsRecognition />
      <PartnershipPreview />
      <ContactCta />
    </>
  );
}
