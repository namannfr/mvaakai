import Image from "next/image";
import { Award } from "lucide-react";
import { TextLink } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";

/**
 * Recognition from client-supplied photographs. Captions state only what the photos show:
 * the IndiaAI Innovation Challenge (IndiaAI Application Development Pillar) award to
 * Narottam Innovations Pvt Ltd, with the "mvaak AI" name on the ceremony slide.
 * The Mvaak ↔ Narottam relationship is pending confirmation (docs/CONTENT-REVIEW.md).
 */
const photos = [
  {
    src: "/images/recognition/award-ceremony.jpg",
    alt: "Award ceremony on stage at the IndiaAI Innovation Challenge, in front of a slide titled IndiaAI Application Development Pillar showing the mvaak AI name.",
    caption: "Ceremony — IndiaAI Application Development Pillar",
  },
  {
    src: "/images/recognition/award-cheque.jpg",
    alt: "Representative holding the IndiaAI Innovation Challenge award cheque made out to Narottam Innovations Pvt Ltd.",
    caption: "IndiaAI Innovation Challenge award",
  },
];

export function Recognition({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14", className)}>
      <div>
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Award aria-hidden className="size-5" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">IndiaAI Innovation Challenge</h3>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">
          Recognised under the IndiaAI Application Development Pillar — awarded to Narottam Innovations Pvt Ltd, presented with the
          mvaak AI name.
        </p>
        {compact && (
          <div className="mt-6">
            <TextLink href="/about#recognition" trackAs="home_recognition_more">
              More about Mvaak
            </TextLink>
          </div>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4">
        {photos.map((p) => (
          <li key={p.src}>
            <figure className="overflow-hidden rounded-card border border-line bg-surface">
              <div className="relative aspect-[4/7]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
              </div>
              <figcaption className="min-h-[3.75rem] px-3 py-2.5 text-xs text-muted sm:text-sm">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
