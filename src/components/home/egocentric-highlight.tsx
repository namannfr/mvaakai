import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";

/** Homepage introduction to Egocentric Video Data Collection; the detail lives on the dedicated page. */
export function EgocentricHighlight() {
  return (
    <Section id="egocentric" tone="surface" bordered labelledBy="ego-highlight-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <figure data-reveal className="relative sm:pb-16 lg:pb-20">
          <div className="overflow-hidden rounded-[1.25rem] border border-line bg-navy shadow-[0_24px_60px_-30px_rgb(21_26_33/0.45)] sm:w-[88%]">
            <Image
              src="/images/egocentric/ego-drawer.jpg"
              alt="First-person view of two hands opening a kitchen drawer of cutlery in a home, annotated with the task Open drawer, the environment Household, a session ID and a timestamp."
              width={879}
              height={439}
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 80vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <div className="mt-3 overflow-hidden rounded-[1rem] border-4 border-surface bg-navy shadow-[0_24px_50px_-24px_rgb(21_26_33/0.55)] sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:w-[52%]">
            <Image
              src="/images/egocentric/ego-package.jpg"
              alt="Overhead first-person view of two hands sealing a cardboard box on a desk, with the box marked by a labelled bounding box and the action Place, Seal."
              width={765}
              height={439}
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 48vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-faint uppercase sm:absolute sm:bottom-0 sm:left-0 sm:mt-0 sm:w-[44%] sm:pb-1">
            Illustrative egocentric frames
          </figcaption>
        </figure>
        <div data-reveal>
          <p className="eyebrow">Egocentric video data collection</p>
          <h2 id="ego-highlight-title" className="mt-4 text-h2 font-semibold text-balance text-ink">
            First-person demonstrations for robots and Physical AI.
          </h2>
          <p className="mt-5 max-w-lg text-lead text-pretty text-muted">
            Real human tasks captured on calibrated rigs, labelled to the sub-action and delivered with consent and provenance.
          </p>
          <ul className="mt-6 space-y-2.5">
            {["Household, commercial and agricultural tasks", "Synchronised video, motion and hand data", "Delivered in LeRobot, RLDS or MCAP"].map((t) => (
              <li key={t} className="flex gap-2.5 text-ink-2">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/services/egocentric-video-data" size="lg" arrow trackAs="home_ego_explore">
              Explore Egocentric Data
            </ButtonLink>
            <ButtonLink href="/contact?type=egocentric-video&intent=sample#inquiry" size="lg" variant="secondary" trackAs="home_ego_sample">
              Request a Sample
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
