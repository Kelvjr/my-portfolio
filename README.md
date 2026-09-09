# Kelvin Kyere portfolio

Next.js App Router application preserving the original portfolio design, GSAP scroll choreography, WebGL gradients, portrait fluid effect, project case studies, and responsive service panels.

## Development

Use Node.js 20.9 or newer (validated with Node 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or external backend are required.

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

Run `npm test` with a development or production server running on port 3000. To use another server, set `TEST_BASE_URL` (for example `http://127.0.0.1:3001`). Tests check server-rendered content, metadata, anchors, every media URL, duplicate and unreferenced media, CV bytes and redirect, image optimization, and 404 behavior.

## Where to make changes

- `src/app/page.tsx`: page composition. The page and layout are Server Components.
- `src/data/projects.ts`: project cards. Add a project object to add a card. For an authored case study, add its Server Component to the registry in `Projects.tsx`.
- `src/data/services.ts`, `skills.ts`, `galleryImages.ts`: service content, skills, and closing gallery.
- `src/data/navigation.ts`: menu destinations and social URLs. Existing social URLs are platform homepages; replace with personal profile URLs when available.
- `src/data/*-case.ts`: repeated case-study copy. `CaseSections.tsx` supplies shared editorial sections, metadata, callouts, and tags. Unique visual compositions remain in each case-study component.
- `src/components/hero/Hero.tsx`: introduction and about copy.
- `src/styles/`: plain CSS split by section, preserving the original cascade and breakpoints. No Tailwind or UI framework is required.

## Media

All public assets are part of this same project:

```text
public/media/
  images/       # 26 canonical images, including project subfolders
  videos/       # ready for future videos
  documents/
    cv.pdf
```

The CV is served directly at `/media/documents/cv.pdf`. The previous `/Kelvin%20Kwasi%20Kyere.pdf` URL permanently redirects there. Images use `next/image`; case-study images include measured intrinsic dimensions. Do not create separate media repositories.

## Animation ownership

Behavior components initialize inside React effects, scope GSAP selectors, and revert contexts/matchMedia on unmount. Each owns its own listeners and observers. The single `SmoothScroll` component owns the page Lenis instance and ticker callback. Native project dialogs own independent Lenis instances only while open. All modal tweens and ticker callbacks are removed on close/unmount.

`HeroMotion`, `ProjectsMotion`, and `ServicesMotion` preserve the original timeline structure. Service pinning changes at 760px and 620px height. Reduced motion removes pinning/scrubbing and WebGL, retaining readable sections and a static gallery. Three.js is loaded in separate dynamic chunks; gradients pause rendering outside the viewport and all GPU resources are disposed on teardown. Coarse pointers use a smaller portrait dye texture.

## Dependency choices

Next 16.3.4, React 19.2.8, GSAP 3.15.0, Lenis 1.3.26, and Three.js 0.185.1 were verified against npm on 8 September 2026. TypeScript 6.0.3 is the latest compatible compiler for the current lint parser; TypeScript 7.0.2 is not yet supported by it. ESLint 9.39.5 is pinned because the current React lint plugin's peer range does not support ESLint 10. Keep the lockfile and upgrade the toolchain together when compatibility changes.

Fonts retain the original external providers (Google Fonts, Fontshare, CDNFonts). This preserves the original faces without assuming redistribution rights for proprietary fonts. The site needs network access to those providers for the exact typography; system sans-serif fallbacks remain available.

## Deployment

Deploy as a normal Next.js Node application or on a platform with native Next.js support. Run `npm run build` then `npm start`. Keep the Next image optimizer available; this is not configured as a static export. No domain or deployment account was present in the original project, and none has been invented.

See `docs/AUDIT.md` for the original audit and cleanup rationale and `docs/VALIDATION.md` for validation results.
