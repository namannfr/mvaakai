import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/brand/social-links";
import { site, solutionLinks } from "@/config/site";

const linkColumns = [
  { title: "Solutions", links: solutionLinks.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/blog" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Start Here",
    links: [
      { label: "Discuss a project", href: "/contact" },
      { label: "Request a sample", href: "/contact?type=egocentric-video&intent=sample#inquiry" },
      { label: "Apply to partner", href: "/partnerships#apply" },
    ],
  },
];

const heading = "font-mono text-xs tracking-[0.14em] text-on-navy-muted uppercase";

export function SiteFooter() {
  return (
    <footer className="bg-navy-2 text-on-navy">
      <div className="container-page py-16 lg:py-20">
        <Link href="/" aria-label="Mvaak — home" className="inline-block">
          <Logo tone="light" className="h-7 w-auto" />
        </Link>

        <div className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* 1 — Contact & social */}
          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-white">
                  <Mail aria-hidden className="size-4 text-brand-light" />
                  {site.email}
                </a>
              </li>
              {site.footerAddresses.map((a) => (
                <li key={a} className="flex items-start gap-3 text-on-navy-muted">
                  <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brand-light" />
                  <address className="not-italic">{a}</address>
                </li>
              ))}
            </ul>
            <SocialLinks className="mt-6" />
          </div>

          {/* 2–4 — Solutions, Company, Start Here */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h2 className={heading}>{col.title}</h2>
              <ul className="mt-5 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.9375rem] text-on-navy hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-navy-line pt-8 text-sm text-on-navy-muted">
          <p className="text-pretty">
            © {site.copyrightYear} Mvaak | All rights reserved | {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
