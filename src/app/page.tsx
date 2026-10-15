import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { WhatWeDo } from "@/components/home/what-we-do";
import { Process } from "@/components/home/process";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { DataExample } from "@/components/home/data-example";
import { QualityThatMatters } from "@/components/home/quality-that-matters";
import { EngagementModels } from "@/components/home/engagement-models";
import { PartnershipPreview } from "@/components/home/partnership-preview";
import { ContactCta } from "@/components/shared/contact-cta";

export const metadata: Metadata = {
  title: { absolute: "Mvaak — Real-World Data for the Next Generation of AI" },
  description:
    "Human demonstrations, structured data and quality-controlled datasets for teams building intelligent systems — egocentric video for Physical AI, data collection, annotation and quality assurance.",
  alternates: { canonical: "/" },
};

/*
 * Homepage — organised around the five buyer questions:
 * what Mvaak does (hero, services), who it serves, what data it delivers (workflow,
 * data example), why to trust it (quality), and how to start (engagement, CTA).
 * Midnight slate: hero, workflow, final CTA. Everything else stays off-white / white.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <WhatWeDo />
      <Process />
      <DataExample />
      <QualityThatMatters />
      <EngagementModels />
      <PartnershipPreview />
      <ContactCta />
    </>
  );
}
