"use client";
import { scrollToPosition } from "@/lib/scroll";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function HeroMotion() {
  useLayoutEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero")!;
    const header = document.querySelector<HTMLElement>(".site-header")!;
    const about = hero.querySelector<HTMLElement>("#about")!;
    const ribbon = document.querySelector<HTMLElement>(".image-ribbon")!;
    const media = gsap.matchMedia();
    let disposeVisuals: (() => void) | undefined;
    let active = true;
    media.add(
      { motion: "(prefers-reduced-motion: no-preference)", all: "all" },
      (context) => {
        let progress = 1;
        let timeline: gsap.core.Timeline | undefined;
        if (context.conditions?.motion) {
          hero.classList.add("hero-animated");
          about.inert = true;
          const paragraphs = gsap.utils.toArray<HTMLElement>(
            ".about-copy-reveal p",
            hero,
          );
          const links = gsap.utils.toArray<HTMLElement>(
            ".about-reveal-links a",
            hero,
          );
          gsap.set([".about-reveal", ...paragraphs, ...links], {
            y: 24,
            autoAlpha: 0,
          });
          progress = 0;
          timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "hero",
              trigger: hero,
              start: "top top",
              end: () => `+=${innerHeight * 3.8}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: 10,
              onUpdate: (self) => {
                progress = self.progress;
                hero.dataset.gradientActive = String(progress < 0.6);
                about.inert = progress < 0.65;
              },
            },
          });
          timeline
            .to(
              ".hero-fg-content",
              {
                clipPath: "polygon(48% 0%,52% 0%,52% 100%,48% 100%)",
                duration: 0.25,
              },
              0,
            )
            .to(".hero-fg-overlay-dark", { opacity: 1, duration: 0.25 }, 0)
            .to(".hero-fg-content", { rotation: 65, duration: 0.2 }, 0.25)
            .to(".hero-fg-content", { scale: 0, duration: 0.2 }, 0.45)
            .to(".hero-fg-overlay", { opacity: 1, duration: 0.05 }, 0.45)
            .to(
              ".hero-bg-content-col:first-child .hero-bg-content-copy",
              { xPercent: 100, duration: 0.2 },
              0.45,
            )
            .to(
              ".hero-bg-content-col:last-child .hero-bg-content-copy",
              { xPercent: -100, duration: 0.2 },
              0.45,
            )
            .to(
              ".hero-outro-img, .hero-outro-about",
              {
                clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
                duration: 0.15,
              },
              0.65,
            )
            .to(".about-reveal", { y: 0, autoAlpha: 1, duration: 0.045 }, 0.8)
            .to(
              paragraphs,
              { y: 0, autoAlpha: 1, duration: 0.055, stagger: 0.022 },
              0.85,
            )
            .to(
              links,
              { y: 0, autoAlpha: 1, duration: 0.05, stagger: 0.018 },
              0.96,
            )
            .to({}, { duration: 0.06 });
        }
        const update = () => {
          const bounds = ribbon.getBoundingClientRect();
          const show =
            (!timeline || progress >= 0.65 / timeline.duration()) &&
            !(bounds.top < innerHeight * 0.5 && bounds.bottom > 0);
          header.classList.toggle("is-visible", show);
          header.inert = !show;
        };
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: update,
          onRefresh: update,
        });
        update();
        const goAbout = (event: MouseEvent) => {
          if (!timeline?.scrollTrigger) return;
          event.preventDefault();
          const trigger = timeline.scrollTrigger;
          scrollToPosition(trigger.start + (trigger.end - trigger.start) * 0.98);
          history.replaceState(null, "", "#about");
        };
        const links = [
          ...document.querySelectorAll<HTMLAnchorElement>('a[href="#about"]'),
        ];
        links.forEach((link) => link.addEventListener("click", goAbout));
        const hash = () => {
          if (location.hash === "#about" && timeline?.scrollTrigger) {
            const t = timeline.scrollTrigger;
            window.scrollTo(0, t.start + (t.end - t.start) * 0.98);
          }
        };
        const frame = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          hash();
        });
        return () => {
          cancelAnimationFrame(frame);
          links.forEach((link) => link.removeEventListener("click", goAbout));
          hero.classList.remove("hero-animated");
          about.inert = false;
          delete hero.dataset.gradientActive;
        };
      },
      hero,
    );
    // Keep Three.js and shaders out of the initial page bundle.
    import("./visuals").then((module) => {
      if (active) disposeVisuals = module.mountHeroVisuals(hero);
    });
    return () => {
      active = false;
      disposeVisuals?.();
      media.revert();
      header.inert = false;
      header.classList.remove("is-visible");
    };
  }, []);
  return null;
}
