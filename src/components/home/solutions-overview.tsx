import Link from "next/link";
import { ArrowRight, AudioLines, Bot, FileText, ScanEye, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { solutionLinks } from "@/config/site";

/** Homepage Solutions — the same four categories (and pages) as the header's Solutions menu. */
const icons: Record<string, LucideIcon> = {
  "/solutions/physical-ai": Bot,
  "/services/video-annotated-data": ScanEye,
  "/services/audio-annotated-data": AudioLines,
  "/services/text-annotated-data": FileText,
};

export function SolutionsOverview() {
  return (
    <Section id="solutions" tone="canvas" labelledBy="solutions-title">
      <SectionHeader id="solutions-title" eyebrow="Solutions" title="Data for the systems you are building." />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {solutionLinks.map((s) => {
          const Icon = icons[s.href] ?? Bot;
          return (
            <li key={s.href} data-reveal>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[0_18px_40px_-24px_rgb(49_91_234/0.45)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="mt-5 text-lg font-semibold text-ink">{s.label}</span>
                <span className="mt-1.5 text-[0.9375rem] text-muted">{s.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
                  Explore
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
