"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { skills } from "@/data/skills";

export function Skills() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const section = root.current!;
    const rows = [...section.querySelectorAll<HTMLElement>(".skill-row")];
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
        () => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: section.querySelector(".skills-intro"),
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        },
      );
    }, section);
    let transition: gsap.core.Timeline | undefined;
    const toggle = (index: number) => {
      transition?.kill();
      const closing =
        rows[index].querySelector("button")!.getAttribute("aria-expanded") ===
        "true";
      transition = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() });
      rows.forEach((row, i) => {
        const open = i === index && !closing;
        const panel = row.querySelector<HTMLElement>(".skill-panel")!;
        // Leave already closed panels alone; animate an interrupted close if visible.
        if (!open && panel.hidden) return;
        row
          .querySelector("button")!
          .setAttribute("aria-expanded", String(open));
        row.querySelector(".skill-icon")!.textContent = open ? "−" : "+";
        gsap.killTweensOf(panel);
        if (open) panel.hidden = false;
        transition!.to(panel, {
          height: open ? panel.scrollHeight : 0,
          opacity: open ? 1 : 0,
          duration: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? 0
            : 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            panel.hidden = !open;
            if (open) panel.style.height = "auto";
          },
        }, 0);
      });
    };
    const handlers = rows.map((row, index) => {
      const button = row.querySelector("button")!;
      const click = () => toggle(index);
      const key = (event: KeyboardEvent) => {
        const next =
          event.key === "ArrowDown"
            ? (index + 1) % rows.length
            : event.key === "ArrowUp"
              ? (index + rows.length - 1) % rows.length
              : event.key === "Home"
                ? 0
                : event.key === "End"
                  ? rows.length - 1
                  : undefined;
        if (next !== undefined) {
          event.preventDefault();
          rows[next].querySelector("button")!.focus();
        }
      };
      button.addEventListener("click", click);
      button.addEventListener("keydown", key);
      return () => {
        button.removeEventListener("click", click);
        button.removeEventListener("keydown", key);
        gsap.killTweensOf(row.querySelector(".skill-panel"));
      };
    });
    return () => {
      handlers.forEach((cleanup) => cleanup());
      transition?.kill();
      ctx.revert();
    };
  }, []);
  return (
    <section
      ref={root}
      className="skills"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-intro">
        <h2 id="skills-title">My Skills</h2>
        <p>The tools I reach for when turning ideas into something real.</p>
      </div>
      <div className="skills-accordion" aria-label="Skill categories">
        {skills.map((skill, i) => (
          <article className="skill-row" key={skill.title}>
            <h3>
              <button
                type="button"
                id={`skill-button-${i}`}
                aria-expanded={i === 0}
                aria-controls={`skill-panel-${i}`}
              >
                <span>{skill.title}</span>
                <span className="skill-icon" aria-hidden="true">
                  {i === 0 ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              className="skill-panel"
              id={`skill-panel-${i}`}
              role="region"
              aria-labelledby={`skill-button-${i}`}
              hidden={i !== 0}
              style={i === 0 ? undefined : { height: 0 }}
            >
              <ul>
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
