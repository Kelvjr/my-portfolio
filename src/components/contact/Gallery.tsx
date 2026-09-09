"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/galleryImages";
import { gsap } from "@/lib/gsap";

export function Gallery() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = stage.current!;
    const root = element.closest<HTMLElement>(".image-ribbon")!;
    const media = gsap.matchMedia();
    let active = true;
    let destroyGradient: (() => void) | undefined;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let mounted = true;
      import("@/lib/webgl/gradient").then((module) => {
        if (mounted && active)
          destroyGradient = module.createGradient(
            root.querySelector<HTMLElement>(".image-ribbon-gradient")!,
            root,
          );
      });
      const originals = [...element.querySelectorAll<HTMLElement>("figure")];
      // Clones belong to the effect, never React; only original images are announced.
      const clones = Array.from({ length: Math.ceil(originals.length * 1.5) }, (_, i) => {
        const clone = originals[i % originals.length].cloneNode(
          true,
        ) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        const img = clone.querySelector("img")!;
        img.alt = "";
        element.append(clone);
        return clone;
      });
      const figures = [...originals, ...clones];
      root.classList.add("ribbon-animated");
      root.style.setProperty("--ribbon-will-change", "transform");
      let width = root.clientWidth;
      let cardWidth = Math.min(360, Math.max(width < 760 ? 270 : 190, width * 0.235));
      let gap = Math.max(20, width * 0.035);
      let offset = 0,
        mouseX = 0,
        mouseY = 0,
        targetX = 0,
        targetY = 0,
        impulse = 0;
      let visible = false,
        paused = false,
        hovering = false;
      let direction = 1,
        speed = 45;
      let pointerStart: number | null = null;
      const resize = new ResizeObserver(() => {
        width = root.clientWidth;
        cardWidth = Math.min(360, Math.max(width < 760 ? 270 : 190, width * 0.235));
        gap = Math.max(20, width * 0.035);
        root.style.setProperty("--ribbon-card-width", `${cardWidth}px`);
      });
      resize.observe(root);
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "100px" },
      );
      observer.observe(root);
      const events = new AbortController();
      root.addEventListener(
        "pointermove",
        (event) => {
          hovering = true;
          const rect = root.getBoundingClientRect();
          targetX = gsap.utils.clamp(
            -1,
            1,
            ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          );
          targetY = gsap.utils.clamp(
            -1,
            1,
            ((event.clientY - rect.top) / rect.height - 0.5) * 2,
          );
          if (pointerStart !== null) {
            offset -= event.clientX - pointerStart;
            pointerStart = event.clientX;
          }
        },
        { signal: events.signal },
      );
      root.addEventListener(
        "pointerleave",
        () => {
          hovering = false;
          targetX = 0;
          targetY = 0;
          pointerStart = null;
        },
        { signal: events.signal },
      );
      root.addEventListener(
        "pointerdown",
        (event) => {
          if ((event.target as Element).closest("a, button")) return;
          if (event.isPrimary && event.button === 0) {
            pointerStart = event.clientX;
            root.setPointerCapture(event.pointerId);
          }
        },
        { signal: events.signal },
      );
      const up = () => {
        pointerStart = null;
      };
      root.addEventListener("pointerup", up, { signal: events.signal });
      root.addEventListener("pointercancel", up, { signal: events.signal });
      root.addEventListener(
        "wheel",
        (event) => {
          impulse = gsap.utils.clamp(
            -25,
            25,
            impulse + (event.deltaY + event.deltaX) * 0.05,
          );
        },
        { passive: true, signal: events.signal },
      );
      root.addEventListener(
        "keydown",
        (event) => {
          if (event.target !== root) return;
          if (event.key === " ") {
            event.preventDefault();
            paused = !paused;
          }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            offset += (event.key === "ArrowRight" ? 1 : -1) * (cardWidth + gap);
          }
        },
        { signal: events.signal },
      );
      const render = (_: number, delta: number) => {
        if (!visible || document.hidden) return;
        const dt = Math.min(delta / 1000, 0.05),
          damping = 1 - Math.exp(-dt * 5);
        mouseX += (targetX - mouseX) * damping;
        mouseY += (targetY - mouseY) * damping;
        if (hovering && Math.abs(targetX) > 0.08)
          direction = targetX < 0 ? 1 : -1;
        speed +=
          (direction * (45 + (hovering ? Math.abs(mouseX) * 230 : 0)) - speed) *
          damping;
        if (!paused && pointerStart === null)
          offset += (speed + impulse * 8) * dt;
        impulse *= Math.exp(-dt * 5);
        const step = cardWidth + gap,
          length = figures.length * step;
        offset = ((offset % length) + length) % length;
        const mx = mouseX * 40,
          my = mouseY * 35,
          ry = mouseX * 14,
          rx = mouseY * -12,
          ix = mouseX * 12,
          iy = mouseY * 10;
        figures.forEach((figure, index) => {
          const x =
            gsap.utils.wrap(
              -2 * step,
              length - 2 * step,
              index * step - offset,
            ) + mx;
          figure.style.transform = `translate3d(${x}px,${my}px,0) perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`;
          figure.querySelector("img")!.style.transform =
            `translate3d(${ix}px,${iy}px,0) scale(1.15)`;
        });
      };
      gsap.ticker.add(render);
      return () => {
        mounted = false;
        destroyGradient?.();
        destroyGradient = undefined;
        gsap.ticker.remove(render);
        events.abort();
        resize.disconnect();
        observer.disconnect();
        clones.forEach((clone) => clone.remove());
        originals.forEach((figure) => {
          figure.style.removeProperty("transform");
          figure.querySelector("img")!.style.removeProperty("transform");
        });
        root.classList.remove("ribbon-animated");
        root.style.removeProperty("--ribbon-card-width");
      };
    });
    return () => {
      active = false;
      media.revert();
    };
  }, []);
  return (
    <div ref={stage} className="image-ribbon-stage">
      {galleryImages.map((image) => (
        <figure key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={500}
            sizes="(max-width: 760px) 300px, 360px"
            draggable={false}
          />
        </figure>
      ))}
    </div>
  );
}
