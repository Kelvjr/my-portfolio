import { gsap } from "@/lib/gsap";
import { createGradient } from "@/lib/webgl/gradient";
import { FluidSimulation } from "@/lib/webgl/FluidSimulation";
import { Color } from "three";

export function mountHeroVisuals(hero: HTMLElement) {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanGradient = createGradient(
      hero.querySelector<HTMLElement>(".gradient-canvas")!,
      hero,
    );
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    const container = hero.querySelector<HTMLElement>(".hero-outro-img")!;
    container.prepend(canvas);
    let fluid: FluidSimulation | undefined;
    try {
      fluid = new FluidSimulation(canvas, {
        isActive: () => hero.dataset.gradientActive === "false",
        simResolution: 128,
        dyeResolution: matchMedia("(pointer: coarse)").matches ? 128 : 256,
        curl: 30,
        pressureIterations: 10,
        velocityDissipation: 0.97,
        dyeDissipation: 0.97,
        splatRadius: 0.3,
        forceStrength: 8,
        pressureDecay: 0.75,
        threshold: 1,
        edgeSoftness: 0,
        inkColor: new Color(1, 1, 1),
      });
    } catch (error) {
      console.warn("Portrait fluid effect is unavailable:", error);
    }
    return () => {
      fluid?.dispose();
      canvas.remove();
      cleanGradient();
    };
  });
  return () => media.revert();
}
