"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "./cn";

/**
 * Sticky in-page navigation for long pages, with an active-section indicator.
 * Active state lives in React (no DOM attribute mutation), so it is hydration-safe.
 */
export function SectionNav({ items, label = "On this page" }: { items: { id: string; label: string }[]; label?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : Infinity);
        // The active section is the top-most one currently intersecting the reading band.
        let best: string | undefined;
        let bestTop = Infinity;
        for (const [id, top] of visible) if (top < bestTop) [best, bestTop] = [id, top];
        if (best) setActive(best);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  // Keep the active item scrolled into view inside the horizontal bar on small screens.
  useEffect(() => {
    // Scroll only the bar itself — never the page.
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    const left = el.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + el.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-line bg-canvas/95 backdrop-blur lg:top-[4.5rem]">
      <ul ref={listRef} className="container-page flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
        {items.map((it) => {
          const current = active === it.id;
          return (
            <li key={it.id} data-id={it.id} className="shrink-0">
              <a
                href={`#${it.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-full px-3.5 text-sm whitespace-nowrap transition-colors",
                  current ? "bg-ink font-medium text-white" : "text-muted hover:bg-subtle hover:text-ink",
                )}
              >
                {current && <span aria-hidden className="mr-2 size-1.5 rounded-full bg-lime" />}
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
