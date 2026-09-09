"use client";
import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

export function ProjectsMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector(".projects")!;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        root.querySelectorAll<HTMLElement>(".project").forEach((item) => {
          const info = item.querySelector(".project-info");
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(item, { scale: 0.72 }, { scale: 1, duration: 0.4 }, 0)
            .fromTo(info, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
            .to(item, { scale: 1, duration: 0.2 }, 0.4)
            .to(info, { opacity: 1, duration: 0.2 }, 0.4)
            .to(item, { scale: 0.72, duration: 0.4 }, 0.6)
            .to(info, { opacity: 0, duration: 0.4 }, 0.6);
        });
      },
      root,
    );
    return () => media.revert();
  }, []);
  return null;
}
