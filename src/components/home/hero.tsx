import { ButtonLink } from "@/components/ui/button";
import Image from "next/image";

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
          </div>
          <p className="mt-8 text-sm text-on-navy-muted">
            For robotics &amp; Physical AI · computer vision · speech &amp; voice AI · NLP &amp; LLM data
          </p>
        </div>

        <div className="relative">
          <figure className="overflow-hidden rounded-[1.25rem] border border-navy-line-strong bg-navy-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            <Image
              src="/images/egocentric/ego-cup.jpg"
              alt="First-person view of two hands picking up a ceramic cup on a stone kitchen counter, annotated with the time span 00:04.2 to 00:05.8, the object, the action Reach, Grasp, Lift, and a Reviewed status."
              width={879}
              height={476}
              preload
              sizes="(min-width: 1280px) 40rem, (min-width: 1024px) 52vw, 100vw"
              className="block h-auto w-full"
            />
          </figure>
          <p className="mt-3 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-on-navy-muted uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-light" />
            Illustrative egocentric frame · hand–object interaction
          </p>
        </div>
      </div>
    </section>
  );
}
