"use client";
import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToPosition } from "@/lib/scroll";

export function ServicesMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".expertise")!;
    const stage = root.querySelector<HTMLElement>(".expertise-stage")!;
    const panels = [
      ...stage.querySelectorAll<HTMLElement>(".expertise-service"),
    ];
    const buttons = [
      ...root.querySelectorAll<HTMLButtonElement>(".expertise-nav button"),
    ];
    let furthest = 0;
    const media = gsap.matchMedia();
    media.add(
      {
        all: "all",
        motion:
          "(prefers-reduced-motion: no-preference) and (min-width: 761px)",
        mobile:
          "(max-width: 760px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        let timeline: gsap.core.Timeline | undefined;
        if (context.conditions?.motion) {
          root.classList.add("expertise-pinned");
          const state = (index: number, active: number) => {
            const distance = index - active;
            const left =
              distance <= 0
                ? 0
                : distance === 1
                  ? 80
                  : distance === 2
                    ? 95
                    : 100;
            return {
              clip: `inset(0% 0% 0% ${left}%)`,
              x: root.clientWidth * (distance <= 0 ? 0.47 : left / 100),
              scale: distance <= 0 ? 1 : distance === 1 ? 0.45 : 0.16,
            };
          };
          let activeIndex = -1;
          const setActive = (index: number) => {
            if (index === activeIndex) return;
            activeIndex = index;
            furthest = Math.max(furthest, index);
            panels.forEach((panel, i) => {
              panel.inert = i !== index;
              panel.setAttribute("aria-hidden", String(i !== index));
              buttons[i].setAttribute("aria-current", String(i === index));
              buttons[i].classList.toggle("is-visited", i <= furthest);
            });
          };
          panels.forEach((panel, i) => {
            const initial = state(i, 0);
            gsap.set(panel, { clipPath: initial.clip });
            gsap.set(panel.querySelector(".expertise-image-0"), {
              x: initial.x,
              scale: initial.scale,
            });
          });
          setActive(0);
          timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${innerHeight * (panels.length - 0.8)}`,
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                setActive(
                  Math.min(
                    panels.length - 1,
                    Math.floor((self.progress * panels.length * 2 + 0.15) / 2),
                  ),
                ),
            },
          });
          for (let active = 1; active < panels.length; active++) {
            const at = active * 2 - 1.1;
            panels.forEach((panel, i) => {
              timeline!
                .to(
                  panel,
                  { clipPath: () => state(i, active).clip, duration: 1.8 },
                  at,
                )
                .to(
                  panel.querySelector(".expertise-image-0"),
                  {
                    x: () => state(i, active).x,
                    scale: () => state(i, active).scale,
                    duration: 1.8,
                  },
                  at,
                );
            });
          }
          timeline.to({}, { duration: 1.3 });
          timeline.fromTo(
            root.querySelector(".expertise-track div"),
            { scaleX: 0 },
            { scaleX: 1, duration: panels.length * 2 },
            0,
          );
        }
        if (context.conditions?.mobile) {
          root.classList.add("expertise-mobile-pinned");
          panels.forEach((panel, i) => {
            gsap.set(panel, { zIndex: i + 1 });
            if (i === panels.length - 1) return;
            ScrollTrigger.create({
              trigger: panel,
              start: () =>
                panel.offsetHeight > innerHeight ? "bottom bottom" : "top top",
              endTrigger: stage,
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
          });
        }
        if (!timeline)
          buttons.forEach((button) => button.classList.add("is-visited"));
        const handlers = buttons.map((button, i) => {
          const handler = () => {
            const trigger = timeline?.scrollTrigger;
            const top =
              trigger && timeline
                ? trigger.start +
                  (trigger.end - trigger.start) *
                    ((i * 2 + 1) / timeline.duration())
                : panels[i].getBoundingClientRect().top + scrollY;
            scrollToPosition(top);
          };
          button.addEventListener("click", handler);
          return handler;
        });
        return () => {
          root.classList.remove("expertise-pinned", "expertise-mobile-pinned");
          panels.forEach((panel) => {
            panel.inert = false;
            panel.removeAttribute("aria-hidden");
          });
          buttons.forEach((button, i) => {
            button.removeEventListener("click", handlers[i]);
            button.removeAttribute("aria-current");
            button.classList.remove("is-visited");
          });
        };
      },
      root,
    );
    return () => media.revert();
  }, []);
  return null;
}
