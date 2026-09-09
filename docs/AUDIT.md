# Migration audit — 8 September 2026

## Original application

One Vite HTML page, 6 functional areas: navigation, pinned hero/about, three project dialogs, five services, six skill accordions, and a pointer/keyboard-controlled closing gallery. No API, authentication, backend, environment variables, or automated tests. GSAP handles scroll/timeline effects; Lenis handles smooth scrolling; Three.js renders two gradients and a portrait fluid effect. All three runtime libraries are used. Tailwind is absent and is not being introduced.

Fonts: externally hosted Quicksand, Monument Extended, and PP Neue Montreal. Metadata consisted only of the title and viewport. Social URLs point to platform homepages, not personal profiles; retain them without inventing account names. The live AEGIS URL is preserved.

## Confirmed cleanup candidates

- `dist/`: generated Vite output, not source.
- Three root `cg-*`/`codegrid-*` folders: self-contained reference demos. No imports, links, or build references from the actual site; no nested `.git` directories found. Preserve an external backup before removal.
- `js/hero-fluid.js`: unimported initializer targeting absent `#hero-fluid`; portrait effect uses `#outro-fluid` from the active entrypoint.
- Services dialog: created but no opener or handler exists. Remove unreachable dialog machinery; keep all five visible services and navigation.
- Stock `public/projects/project-*` images: fallback code only; all three active projects have explicit previews. Remove fallback code and assets together.
- Portrait alternatives `hero.jpg`, `hero-outro-img-1.jpg`, `hero-outro-img-2.jpg`, `meee.webp`: no references in active HTML, CSS, JS, case studies, or gallery.
- Kasvin `logo-black.png` and `logo-light.png`: not used in case study or active gallery.
- SHA-256-identical images: AEGIS marquee/order preview; Carpelle/order 6; Jton/order 4; Grains branding/marquee/order 3. Keep one canonical file per content and update all references.
- `.DS_Store`: filesystem metadata, not application content.

## Defects being addressed

WebGL RAF loops, observers, GPU resources, and event listeners have no teardown. GSAP/Lenis entrypoint has no unmount lifecycle. Content is injected with innerHTML after load. About anchor has no real target. Reduced-motion hero still pins and scrubs. Mobile menu lacks Escape/focus containment and leaves hidden links focusable. HTML contains a stray closing div in the footer. Several CSS rules describe obsolete service artwork and dialogs; repeated declarations depend on source ordering.

## Preservation strategy

Keep class names, authored palettes, typography, copy, media, responsive breakpoints, and desktop timeline proportions. Render content in React, retain Server Components for the page and static sections, and use small client behavior boundaries. Retain custom shader math with strict TypeScript types and explicit disposal. Use GSAP contexts/matchMedia cleanup and functional reduced-motion/no-JavaScript fallbacks. Consolidate media under `public/media`.

Original source and reference demos backed up at `C:/Users/kelvi/AppData/Local/Temp/kelvin-portfolio-before-next-20260908` before changes. This temporary backup is outside the application and should be copied elsewhere if long-term retention is desired.
