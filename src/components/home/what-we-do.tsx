import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import Image from "next/image";

/** Small, purpose-built visuals that show each capability rather than describe it. */
function EgoVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-lg bg-navy">
      <Image src="/images/egocentric/ego-screwdriver.jpg" alt="" fill sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw" className="object-cover" />
    </div>
  );
}

function CollectionVisual() {
  const envs = [
    { name: "Household", dots: 5 },
    { name: "Commercial", dots: 4 },
    { name: "Agricultural", dots: 3 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 rounded-lg bg-subtle p-4">
      {envs.map((e) => (
        <div key={e.name} className="flex items-center gap-3">
          <span className="w-24 text-xs text-muted">{e.name}</span>
          <span className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`size-2.5 rounded-sm ${i < e.dots ? "bg-accent" : "bg-sunken"}`} />
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function AnnotationVisual() {
  const segs = [
    { l: "reach", w: 28 },
    { l: "grasp", w: 24 },
    { l: "lift", w: 22 },
    { l: "place", w: 26 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-lg bg-subtle p-4">
      <div className="relative h-12 rounded-md border border-line bg-surface">
        <span className="absolute top-2 left-[38%] h-7 w-[26%] rounded-sm border-2 border-dashed border-accent" />
        <span className="absolute -top-2 left-[38%] rounded bg-ink px-1 font-mono text-[0.625rem] text-brand-light">obj_01</span>
      </div>
      <div className="flex h-5 gap-0.5 overflow-hidden rounded">
        {segs.map((s, i) => (
          <span key={s.l} style={{ flexBasis: `${s.w}%` }} className={`flex items-center justify-center font-mono text-[0.625rem] ${i === 1 ? "bg-navy text-white" : "bg-accent-soft text-accent"}`}>
            {s.l}
          </span>
        ))}
      </div>
    </div>
  );
}

function QualityVisual() {
  return (
    <ul className="flex h-full flex-col justify-center gap-2 rounded-lg bg-subtle p-4">
      {["Frame integrity", "Timestamp sync", "Annotation complete"].map((t) => (
        <li key={t} className="flex items-center gap-2 text-xs text-ink-2">
          <span className="flex size-4 items-center justify-center rounded-full bg-success text-white">
            <Check aria-hidden className="size-2.5" strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

const cards = [
  { title: "Egocentric Data", body: "First-person video of real human tasks, captured for Physical AI.", href: "/services/egocentric-video-data", visual: <EgoVisual /> },
  { title: "Data Collection", body: "Planned capture across real environments, people and conditions.", href: "/services#data-collection", visual: <CollectionVisual /> },
  { title: "Data Annotation", body: "Video, audio and text labelled to a written guideline.", href: "/services#annotation", visual: <AnnotationVisual /> },
  { title: "Quality Assurance", body: "Every batch checked and reviewed before it reaches you.", href: "/services#quality-assurance", visual: <QualityVisual /> },
];

export function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="canvas" bordered labelledBy="wwd-title">
      <SectionHeader id="wwd-title" eyebrow="What we do" title="From real-world activity to training-ready data." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <li key={c.title} data-reveal>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-3 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[0_18px_40px_-24px_rgb(21_26_33/0.35)] focus-visible:border-accent"
            >
              <div className="aspect-[16/10]" aria-hidden>
                {c.visual}
              </div>
              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent">
                  Learn more
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="sr-only">about {c.title}</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
