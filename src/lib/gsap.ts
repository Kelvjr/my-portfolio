import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Imported only by client behavior. Registration does not touch the DOM on SSR.
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
