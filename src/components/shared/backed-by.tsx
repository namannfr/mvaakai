import Image from "next/image";
import { cn } from "@/components/ui/cn";

/**
 * Institutional logos supplied by Mvaak ("We are backed by"). Cropped from the client-supplied
 * screenshot and shown ~1.25× native (`display` = rendered height in rem, balanced by visual weight) —
 * replace with original logo files when available.
 * The exact relationship with each institution is pending confirmation (docs/CONTENT-REVIEW.md).
 */
export const backers = [
  { src: "/images/recognition/logo-iitk.png", alt: "Indian Institute of Technology Kanpur", w: 84, h: 84, display: 6.5 },
  { src: "/images/recognition/logo-iitk-incubation.png", alt: "Incubation and Innovation, IIT Kanpur", w: 86, h: 72, display: 5.5 },
  { src: "/images/recognition/logo-startup-india.png", alt: "Startup India", w: 142, h: 38, display: 3 },
  { src: "/images/recognition/logo-indiaai.png", alt: "IndiaAI — a MeitY initiative", w: 116, h: 58, display: 4.5 },
  {
    src: "/images/recognition/logo-meity.png",
    alt: "Ministry of Electronics and Information Technology, Government of India",
    w: 142,
    h: 54,
    display: 4.25,
  },
];

export function BackedBy({ className, title = "We are backed by" }: { className?: string; title?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12", className)}>
      <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-faint uppercase">{title}</p>
      <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-10">
        {backers.map((b) => (
          <li key={b.src} className="flex items-center justify-center [--logo-scale:0.78] sm:[--logo-scale:1]">
            <Image
              src={b.src}
              alt={b.alt}
              width={b.w}
              height={b.h}
              style={{ height: `calc(${b.display}rem * var(--logo-scale))` }}
              className="w-auto max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
