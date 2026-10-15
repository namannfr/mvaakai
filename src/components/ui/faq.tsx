import type { ReactNode } from "react";
import { FaqAccordion } from "./faq-accordion";

/** FAQ list — renders the accessible client accordion. */
export function FaqList({ items, dark = false }: { items: { q: string; a: ReactNode }[]; dark?: boolean }) {
  return <FaqAccordion items={items} dark={dark} />;
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
