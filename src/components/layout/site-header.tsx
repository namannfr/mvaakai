"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { isNavGroup, mainNav, site, type NavGroup, type NavLink } from "@/config/site";

const pathOf = (href: string) => href.split("#")[0];
const groupActive = (pathname: string, g: NavGroup) =>
  g.items.some((it) => pathOf(it.href) !== "/" && (pathname === pathOf(it.href) || pathname.startsWith(`${pathOf(it.href)}/`)));

const linkActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

/** Desktop top-level link (Home, About Us, Partner Us). */
function TopLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const active = linkActive(pathname, link.href);
  return (
    <li>
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] transition-colors",
          active ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        {link.label}
        {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-accent" />}
      </Link>
    </li>
  );
}

/** Desktop dropdown: opens on hover or click, stays open while the pointer moves into the panel. */
function NavDropdown({
  group,
  open,
  onOpen,
  onClose,
  active,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  active: boolean;
}) {
  const closeTimer = useRef<number | null>(null);
  // When hover just opened the menu, the click that follows must not toggle it shut again.
  const hoverOpenedAt = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = `nav-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 160);
  };
  useEffect(() => cancelClose, []);

  const focusItem = (dir: 1 | -1 | "first" | "last") => {
    const links = [...(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = dir === "first" ? 0 : dir === "last" ? links.length - 1 : (i + dir + links.length) % links.length;
    links[next].focus();
  };

  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onOpen();
      requestAnimationFrame(() => focusItem("first"));
    }
  };
  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem("first");
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem("last");
    }
  };

  const wide = group.items.length > 4;

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        if (!open) hoverOpenedAt.current = Date.now();
        onOpen();
      }}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open && Date.now() - hoverOpenedAt.current > 600 ? onClose() : onOpen())}
        onKeyDown={onTriggerKey}
        className={cn(
          "relative inline-flex min-h-10 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] transition-colors",
          active || open ? "text-ink" : "text-muted hover:text-ink",
          open && "bg-subtle",
        )}
      >
        {group.label}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-accent" />}
      </button>
      {/* pt-3 bridges the gap between trigger and panel, so moving the pointer down never closes the menu */}
      <div id={id} ref={panelRef} hidden={!open} onKeyDown={onPanelKey} className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
        <div
          className={cn(
            "animate-[reveal_0.18s_ease-out_both] rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgb(21_26_33/0.35)]",
            wide ? "w-[36rem]" : "w-[20rem]",
          )}
        >
          <ul className={cn("grid gap-0.5", wide && "grid-cols-2")}>
            {group.items.map((it) => (
              <li key={it.href + it.label}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className="group flex flex-col rounded-xl px-3.5 py-2.5 transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
                >
                  <span className="text-[0.9375rem] font-medium text-ink group-hover:text-accent-strong">{it.label}</span>
                  {it.description && <span className="mt-0.5 text-[0.8125rem] text-faint">{it.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {group.footer && (
            <Link
              href={group.footer.href}
              onClick={onClose}
              className="mt-1 flex items-center justify-between rounded-xl border-t border-line px-3.5 py-2.5 text-sm font-medium text-accent hover:bg-subtle"
            >
              {group.footer.label}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openGroup]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          (el): el is HTMLElement => !!el && el.offsetParent !== null,
        );
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
  }, [menuOpen]);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-[border-color] duration-300", scrolled || menuOpen ? "border-line" : "border-line/70")}>
      {/* Blur lives on its own layer so the fixed mobile menu isn't contained by the header. */}
      <div aria-hidden className={cn("absolute inset-0 -z-10 transition-colors duration-300", menuOpen || !scrolled ? "bg-surface" : "bg-surface/90 backdrop-blur-md")} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="Mvaak — home" className="shrink-0 rounded-md transition-opacity hover:opacity-80">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <TopLink link={{ label: "Home", href: "/" }} pathname={pathname} />
            {mainNav.map((e) =>
              isNavGroup(e) ? (
                <NavDropdown
                  key={e.label}
                  group={e}
                  open={openGroup === e.label}
                  onOpen={() => setOpenGroup(e.label)}
                  onClose={() => setOpenGroup((cur) => (cur === e.label ? null : cur))}
                  active={groupActive(pathname, e)}
                />
              ) : (
                <TopLink key={e.href} link={e} pathname={pathname} />
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" trackAs="header_contact" className="max-sm:hidden">
            Contact Us
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} hidden={!menuOpen} className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-surface lg:hidden">
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col py-4">
          <ul className="divide-y divide-line border-b border-line">
            <li>
              <Link href="/" className="flex min-h-14 items-center text-lg font-medium text-ink">
                Home
              </Link>
            </li>
            {mainNav.map((g) => {
              if (!isNavGroup(g)) {
                return (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      aria-current={linkActive(pathname, g.href) ? "page" : undefined}
                      className="flex min-h-14 items-center text-lg font-medium text-ink"
                    >
                      {g.label}
                    </Link>
                  </li>
                );
              }
              const expanded = mobileGroup === g.label;
              const sid = `m-${g.label.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <li key={g.label}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={sid}
                    onClick={() => setMobileGroup(expanded ? null : g.label)}
                    className="flex min-h-14 w-full items-center justify-between text-left text-lg font-medium text-ink"
                  >
                    {g.label}
                    <ChevronDown aria-hidden className={cn("size-5 text-faint transition-transform duration-200", expanded && "rotate-180")} />
                  </button>
                  <ul id={sid} hidden={!expanded} className="pb-3">
                    {[...g.items, ...(g.footer ? [g.footer] : [])].map((it) => (
                      <li key={it.href + it.label}>
                        <Link
                          href={it.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-11 items-center justify-between rounded-lg px-3 text-[0.9375rem] text-ink-2 hover:bg-subtle"
                        >
                          {it.label}
                          <ArrowRight aria-hidden className="size-4 text-faint" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/contact" size="lg" trackAs="mobile_menu_contact">
              Contact Us
            </ButtonLink>
          </div>
          <p className="mt-auto pt-10 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
