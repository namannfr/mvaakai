"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "./cn";

/**
 * Accessible accordion (WAI-ARIA disclosure pattern): each question is a button in a
 * heading with aria-expanded/aria-controls; answers are labelled regions. Answers stay
 * in the DOM (hidden when collapsed) so in-page search and assistive tech can reach them.
 */
export function FaqAccordion({ items, dark = false }: { items: { q: string; a: ReactNode }[]; dark?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("border-t", dark ? "border-navy-line" : "border-line")}>
      {items.map((item, i) => {
        const expanded = open.has(i);
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={item.q} className={cn("border-b", dark ? "border-navy-line" : "border-line")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={cn(
                  "group flex w-full min-h-11 items-start justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium transition-colors",
                  dark ? "text-white hover:text-brand-light focus-visible:outline-white" : "text-ink hover:text-accent",
                )}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 shrink-0 rounded-full border p-1 transition-[transform,background-color,color] duration-300",
                    expanded && "rotate-45",
                    dark
                      ? "border-navy-line-strong text-brand-light"
                      : cn("border-line-strong text-accent", expanded && "border-accent bg-accent text-white"),
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className={cn("max-w-3xl animate-reveal pr-10 pb-6 leading-relaxed", dark ? "text-on-navy-muted" : "text-muted")}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
