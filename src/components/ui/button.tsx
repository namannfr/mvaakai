"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

// Labels wrap (balanced) instead of overflowing: buttons grow in height, never past their container.
const base =
  "group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center leading-snug font-medium text-balance transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-[3px] active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_2px_rgb(21_26_33/0.18)] hover:bg-accent-strong",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink/40 hover:bg-subtle",
  ghost: "text-accent hover:text-accent-strong",
  light: "bg-white text-navy hover:bg-accent-soft focus-visible:outline-white",
  "outline-light": "border border-navy-line-strong text-white hover:border-white/60 hover:bg-white/5 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
  lg: "min-h-12 px-6 py-3 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant === "ghost" ? "min-h-11 text-[0.9375rem]" : sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  /** Analytics label for the cta_clicked event. */
  trackAs?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  arrow,
  trackAs,
  children,
  onClick,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={buttonClass(variant, size, className)}
      onClick={(e) => {
        if (trackAs) track("cta_clicked", { cta: trackAs, href: String(props.href) });
        onClick?.(e);
      }}
    >
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function TextLink({
  className,
  children,
  trackAs,
  ...props
}: Omit<ButtonLinkProps, "variant" | "size" | "arrow">) {
  return (
    <Link
      {...props}
      className={cn("group inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-strong", className)}
      onClick={() => {
        if (trackAs) track("cta_clicked", { cta: trackAs, href: String(props.href) });
      }}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
