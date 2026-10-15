import type { ReactNode } from "react";
import { cn } from "./cn";

type Tone = "canvas" | "surface" | "subtle" | "blue" | "navy" | "navy-2";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  subtle: "bg-subtle",
  blue: "bg-accent-soft",
  navy: "bg-navy text-on-navy",
  "navy-2": "bg-navy-2 text-on-navy",
};

export function Section({
  id,
  tone = "canvas",
  className,
  children,
  bordered = false,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  bordered?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-[var(--spacing-section)]", tones[tone], bordered && (tone === "navy" || tone === "navy-2" ? "border-t border-navy-line" : "border-t border-line"), className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = "left",
  dark = false,
  className,
  as: Heading = "h2",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <div data-reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", dark && "text-brand-light")}>{eyebrow}</p>}
      <Heading
        id={id}
        className={cn(
          "mt-4 font-semibold text-balance",
          Heading === "h1" ? "text-h1" : "text-h2",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {lead && <p className={cn("mt-5 text-lead text-pretty", dark ? "text-on-navy-muted" : "text-muted")}>{lead}</p>}
      {children}
    </div>
  );
}
