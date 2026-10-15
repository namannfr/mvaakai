"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";

/** Mobile-only bottom bar that keeps "Apply" reachable, hidden while the form is on screen. */
export function StickyApplyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("apply");
    const hero = document.getElementById("partnership-hero");
    if (!target || !hero || !("IntersectionObserver" in window)) return;
    let formInView = false;
    let heroInView = true;
    const update = () => setVisible(!formInView && !heroInView);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === target) formInView = e.isIntersecting;
        if (e.target === hero) heroInView = e.isIntersecting;
      }
      update();
    });
    io.observe(target);
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ButtonLink href="#apply" size="lg" className="w-full" arrow trackAs="partnerships_sticky_apply">
        Apply to Partner
      </ButtonLink>
    </div>
  );
}
