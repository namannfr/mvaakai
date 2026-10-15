import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { site } from "@/config/site";

export function Breadcrumbs({ items, dark = false }: { items: { label: string; href?: string }[]; dark?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${dark ? "text-on-navy-muted" : "text-faint"}`}>
          {all.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
              {item.href && i < all.length - 1 ? (
                <Link href={item.href} className={dark ? "hover:text-white" : "hover:text-ink"}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={i === all.length - 1 ? "page" : undefined} className={dark ? "text-on-navy" : "text-ink-2"}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${site.url}${item.href === "/" ? "" : item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
