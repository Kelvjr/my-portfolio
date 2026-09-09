import type Lenis from "lenis";

let activeScroll: Lenis | undefined;

export function registerScroll(instance: Lenis) {
  activeScroll = instance;
  return () => {
    if (activeScroll === instance) activeScroll = undefined;
  };
}

/** Keep programmatic navigation on the same clock as wheel scrolling. */
export function scrollToPosition(top: number) {
  if (activeScroll) {
    activeScroll.scrollTo(top, { duration: 0.8 });
  } else {
    window.scrollTo({ top, behavior: "instant" });
  }
}
