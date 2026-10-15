import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Egocentric Video Data", href: "/services/egocentric-video-data" },
      { label: "Audio Data", href: "/services/audio-annotated-data" },
      { label: "Video Annotation", href: "/services/video-annotated-data" },
      { label: "Text Annotation", href: "/services/text-annotated-data" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/blog" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Privacy notice", href: "/privacy" },
    ],
  },
  {
    title: "Start here",
    links: [
      { label: "Discuss a project", href: "/contact" },
      { label: "Request a pilot discussion", href: "/contact?type=egocentric-video&model=pilot-sprint" },
      { label: "Apply to partner", href: "/partnerships#apply" },
      { label: "Ask a partnership question", href: `mailto:${site.email}?subject=Partnership%20question` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-2 text-on-navy">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label="Mvaak — home" className="inline-block">
              <Logo tone="light" className="h-7 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-on-navy-muted">
              Real-world data operations for teams building intelligent systems — egocentric demonstrations, annotation and
              quality assurance.
            </p>
            <ul className="mt-8 space-y-3 text-[0.9375rem]">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-white">
                  <Mail aria-hidden className="size-4 text-brand-light" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-white">
                  <Phone aria-hidden className="size-4 text-brand-light" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-on-navy-muted">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brand-light" />
                <span>
                  {site.address.line}
                  <br />
                  {site.offices.map((o) => o.city).join(" · ")}
                </span>
              </li>
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs tracking-[0.14em] text-on-navy-muted uppercase">{col.title}</h2>
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
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-navy-line pt-8 text-sm text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} Mvaak. All rights reserved.
          </p>
          <p>AI data services · Egocentric data for Physical AI</p>
        </div>
      </div>
    </footer>
  );
}
