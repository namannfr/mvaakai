import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

/*
 * Founder profile. Copy is limited to the name, the role and Mvaak's own published positioning:
 * the founder biography and any personal statistics await client-approved copy (docs/CONTENT-REVIEW.md §2d).
 */
const focus = ["Egocentric data for Physical AI", "Data collection", "Annotation", "Quality assurance"];

export function FounderProfile() {
  return (
    <Section id="founder" tone="navy" labelledBy="founder-name">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <figure data-reveal className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-[#1b1d21] lg:max-w-none">
          <Image
            src="/images/about/founder-shivam-pal.jpg"
            alt="Portrait of Shivam Pal, Founder and Managing Director of Mvaak, in a dark suit with arms folded."
            width={572}
            height={576}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
            className="block h-auto w-full"
          />
          <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-navy/70 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.2em] text-on-navy uppercase backdrop-blur-sm">
            Founder
          </span>
        </figure>

        <div data-reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-brand-light uppercase">Founder</p>
          <h2 id="founder-name" className="mt-4 text-h2 font-semibold tracking-tight text-white">
            Shivam Pal
          </h2>
          <p className="mt-2 text-lg text-on-navy-muted">Founder &amp; Managing Director</p>
          <p className="mt-6 max-w-xl text-lead text-pretty text-on-navy">
            Shivam leads Mvaak’s work on the data layer behind intelligent systems — collecting, annotating and validating
            real-world information into datasets that hold up under training.
          </p>
          <div className="mt-8 border-t border-navy-line pt-6">
            <p className="font-mono text-xs tracking-[0.14em] text-on-navy-muted uppercase">Company focus</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {focus.map((f) => (
                <li key={f} className="rounded-full border border-navy-line-strong px-3.5 py-1.5 text-sm text-on-navy">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg" arrow trackAs="about_founder_contact">
              Talk to the team
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
