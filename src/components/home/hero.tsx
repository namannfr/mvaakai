import { ButtonLink } from "@/components/ui/button";
import { CaptureFrame } from "@/components/visuals/capture-frame";
import { DemoRecord } from "@/components/visuals/demo-record";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy text-on-navy">
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_40%,black,transparent_75%)]" />
      <div className="container-page relative grid items-center gap-12 pt-14 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-20 lg:pb-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.14em] text-brand-light uppercase">Egocentric data · Physical AI</p>
          <h1 id="hero-title" className="mt-5 text-display font-semibold text-balance text-white">
            Real-World Data for the Next Generation of AI.
          </h1>
          <p className="mt-6 max-w-lg text-lead text-pretty text-on-navy-muted">
            Human demonstrations, structured data, and quality-controlled datasets for teams building intelligent systems.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" size="lg" arrow trackAs="hero_discuss_project">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="#data-example" size="lg" variant="outline-light" trackAs="hero_explore_data">
              Explore Our Data
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <figure className="overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3">
            <CaptureFrame
              scene="cup"
              uid="hero"
              episode="ep_0142"
              className="block h-auto w-full"
              title="First-person view of a hand reaching to pick up a ceramic cup, with hand keypoints and the cup marked by a labelled bounding box."
            />
            <figcaption className="sr-only">Illustrative first-person demonstration frame.</figcaption>
          </figure>
          <DemoRecord className="relative mt-4 sm:ml-auto sm:w-[22rem] lg:-mt-10 lg:mr-[-1.5rem]" />
        </div>
      </div>
    </section>
  );
}
