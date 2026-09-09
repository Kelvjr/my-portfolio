"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Lenis from "lenis";

export function ProjectInteraction({
  id,
  title,
  children,
  detail,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  detail?: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const controls = useRef<{ open: () => void; close: () => void } | null>(null);
  useEffect(() => {
    const element = dialog.current!;
    let scroll: Lenis | undefined;
    let closing = false;
    let overflow = "";
    const reduced = () =>
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (time: number) => scroll?.raf(time * 1000);
    const finish = () => {
      gsap.ticker.remove(tick);
      scroll?.destroy();
      scroll = undefined;
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
    const close = () => {
      if (!element.open || closing) return;
      closing = true;
      scroll?.stop();
      gsap.to(element, {
        yPercent: 100,
        duration: reduced() ? 0 : 0.45,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          element.close();
          gsap.set(element, { clearProps: "transform" });
          closing = false;
        },
      });
    };
    const cancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    element.addEventListener("cancel", cancel);
    element.addEventListener("close", finish);
    controls.current = {
      close,
      open() {
        if (element.open) return;
        closing = false;
        overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        element.showModal();
        element.scrollTop = 0;
        scroll = new Lenis({
          wrapper: element,
          content: content.current!,
          eventsTarget: element,
          lerp: 0.12,
          smoothWheel: !reduced(),
        });
        gsap.ticker.add(tick);
        gsap.fromTo(
          element,
          { yPercent: reduced() ? 0 : 100 },
          {
            yPercent: 0,
            duration: reduced() ? 0 : 0.65,
            ease: "power3.out",
            overwrite: true,
            onComplete: () => {
              gsap.set(element, { clearProps: "transform" });
            },
          },
        );
      },
    };
    return () => {
      controls.current = null;
      gsap.killTweensOf(element);
      gsap.ticker.remove(tick);
      scroll?.destroy();
      element.removeEventListener("cancel", cancel);
      element.removeEventListener("close", finish);
      if (element.open) {
        element.close();
        document.body.style.overflow = overflow;
      }
    };
  }, []);
  return (
    <>
      <a
        ref={opener}
        className="project project-aegis"
        href={`#${id}-case-title`}
        role="button"
        aria-haspopup="dialog"
        aria-label={`View ${title} project`}
        onClick={(event) => {
          event.preventDefault();
          controls.current?.open();
        }}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            controls.current?.open();
          }
        }}
      >
        {children}
      </a>
      <dialog
        ref={dialog}
        className={`project-modal is-${id}`}
        aria-labelledby={`${id}-case-title`}
        aria-describedby={`${id}-case-description`}
      >
        <div ref={content} className="detail-scroll-content">
          <button
            className="project-modal-close"
            type="button"
            autoFocus
            aria-label={`Close ${title} project details`}
            onClick={() => controls.current?.close()}
          >
            Close ×
          </button>
          {detail ?? (
            <article>
              <h2 id={`${id}-case-title`}>{title}</h2>
              <p id={`${id}-case-description`}>{title} project details.</p>
            </article>
          )}
        </div>
      </dialog>
    </>
  );
}
