"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerScroll } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        anchors: false,
        autoToggle: true,
        prevent: (node) => node.closest("dialog, .hero-outro-about") !== null,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      const unregister = registerScroll(lenis);
      // Lenis needs elapsed time, including slow frames, to stay with the input.
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      let anchorFrame = 0;
      const navigate = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = link?.getAttribute("href");
        if (!hash || hash.length < 2) return;
        const target = document.getElementById(hash.slice(1));
        if (!target) return;
        event.preventDefault();
        history.pushState(null, "", hash);
        // A pinned element's current rect is not its original document position.
        const trigger = ScrollTrigger.getAll().find(item => item.trigger === target && item.pin === target);
        cancelAnimationFrame(anchorFrame);
        anchorFrame = requestAnimationFrame(() => lenis.scrollTo(trigger?.start ?? target, { duration: .8 }));
      };
      document.addEventListener("click", navigate);
      return () => {
        cancelAnimationFrame(anchorFrame);
        document.removeEventListener("click", navigate);
        gsap.ticker.remove(tick);
        unregister();
        lenis.destroy();
      };
    });
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      active = false;
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, []);
  return null;
}
