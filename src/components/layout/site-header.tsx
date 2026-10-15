"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { mainNav, site } from "@/config/site";

const isActive = (pathname: string, href: string) => {
  if (href === "/services") return pathname === "/services" || (pathname.startsWith("/services/") && !pathname.startsWith("/services/egocentric"));
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const onPartnerships = pathname.startsWith("/partnerships");
  const cta = onPartnerships
    ? { label: "Apply to Partner", href: "/partnerships#apply", track: "header_apply_partner" }
    : { label: "Discuss a Project", href: "/contact", track: "header_discuss_project" };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[border-color] duration-300",
        scrolled || open ? "border-navy-line" : "border-transparent",
      )}
    >
      {/* Blur lives on its own layer: backdrop-filter on the header itself would become the
          containing block for the fixed mobile menu and collapse it. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 transition-colors duration-300",
          open || !scrolled ? "bg-navy" : "bg-navy/90 backdrop-blur-md",
        )}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="Mvaak — home" className="shrink-0 rounded-md transition-opacity hover:opacity-80">
          <Logo tone="light" className="h-6 w-auto sm:h-7" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] transition-colors focus-visible:outline-lime",
                      active ? "text-white" : "text-on-navy-muted hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                    {item.label === "Partnerships" && (
                      <span className="ml-1.5 rounded-full bg-lime/15 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-lime uppercase">
                        New
                      </span>
                    )}
                    {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded-full bg-lime lg:-bottom-[17px]" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={cta.href} trackAs={cta.track} className="max-sm:hidden">
            {cta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-navy-line-strong text-white focus-visible:outline-lime lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-navy-line bg-navy lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-6">
          <ul className="divide-y divide-navy-line border-b border-navy-line">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between text-xl font-medium text-white aria-[current=page]:text-lime"
                >
                  {item.label}
                  <ArrowRight aria-hidden className="size-5 text-on-navy-muted" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="flex min-h-14 items-center justify-between text-xl font-medium text-white aria-[current=page]:text-lime">
                Contact
                <ArrowRight aria-hidden className="size-5 text-on-navy-muted" />
              </Link>
            </li>
          </ul>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/contact" size="lg" trackAs="mobile_menu_discuss_project">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/partnerships#apply" size="lg" variant="outline-light" trackAs="mobile_menu_apply_partner">
              Apply to Partner
            </ButtonLink>
          </div>
          <p className="mt-auto pt-10 text-sm text-on-navy-muted">
            <a href={`mailto:${site.email}`} className="text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
            <span className="mx-2 text-faint">·</span>
            <a href={site.phoneHref} className="text-white underline-offset-4 hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
