import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-h1 font-semibold text-ink">This page isn’t here.</h1>
      <p className="mt-4 max-w-lg text-lead text-muted">
        The link may be outdated. Try one of these instead, or{" "}
        <Link href="/contact" className="text-accent underline underline-offset-2">
          contact the team
        </Link>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Services
        </ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          Insights
        </ButtonLink>
      </div>
    </div>
  );
}
