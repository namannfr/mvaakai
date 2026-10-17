import Image from "next/image";
import { cn } from "@/components/ui/cn";

/**
 * Institutional logos supplied by Mvaak ("We are backed by"). Cropped from the client-supplied
 * screenshot and shown at native size — replace with original logo files when available.
 * The exact relationship with each institution is pending confirmation (docs/CONTENT-REVIEW.md).
 */
export const backers = [
  { src: "/images/recognition/logo-iitk.png", alt: "Indian Institute of Technology Kanpur", w: 84, h: 84 },
  { src: "/images/recognition/logo-iitk-incubation.png", alt: "Incubation and Innovation, IIT Kanpur", w: 86, h: 72 },
  { src: "/images/recognition/logo-startup-india.png", alt: "Startup India", w: 142, h: 38 },
  { src: "/images/recognition/logo-indiaai.png", alt: "IndiaAI — a MeitY initiative", w: 116, h: 58 },
  { src: "/images/recognition/logo-meity.png", alt: "Ministry of Electronics and Information Technology, Government of India", w: 142, h: 54 },
  { src: "/images/recognition/logo-jss.png", alt: "JSS Academy of Higher Education & Research, Mysuru", w: 146, h: 66 },
];

export function BackedBy({ className, title = "We are backed by" }: { className?: string; title?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12", className)}>
      <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-faint uppercase">{title}</p>
      <ul className="grid flex-1 grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {backers.map((b) => (
          <li key={b.src} className="flex h-16 items-center justify-center">
            <Image src={b.src} alt={b.alt} width={b.w} height={b.h} className="h-auto max-h-16 w-auto max-w-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}
