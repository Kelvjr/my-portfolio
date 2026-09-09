# Validation — 9 September 2026

## Automated checks

- Dependency installation succeeded; npm audit reported zero vulnerabilities.
- `npm run build`: passed; `/` and the Next.js not-found page prerender successfully.
- `npm run typecheck`: passed with strict TypeScript.
- `npm run lint`: passed with zero warnings.
- Five integration tests passed against the production server, covering server-rendered content and metadata, section targets, every canonical media URL, missing/unreferenced/duplicate assets, direct PDF bytes and MIME type, the legacy CV redirect, Next image optimization, and 404 responses.

The original application had no automated tests. The new integration tests require a running server; see the README for `TEST_BASE_URL`.

## Browser checks performed

- Inspected the original Vite hero and about section before migration and compared them with the Next.js version. The original gradient, typography, portrait composition, colors, and desktop layout were preserved.
- Production desktop page: hero pin/reveal, section anchor navigation, project scale/scrub, service pinning and timeline navigation.
- Opened all three project dialogs and checked their correct titles; inspected AEGIS and Kasvin content/images while scrolling. Escape closes dialogs and returns focus. Only one dialog remained open at a time.
- Mobile 390 × 844: hero, about reveal, menu open/close, services navigation, stacked service layout, skill accordion expansion, arrow-key focus movement, and contact layout. Menu navigation restored page scrolling. No horizontal document overflow was observed.
- Gallery: 18 animated frames (six originals plus effect-owned duplicates); Space paused movement and two separate reads confirmed the transform stayed fixed; ArrowRight advanced the paused gallery by one card.
- Tablet 768 × 1024 and desktop viewport inspection; breakpoint changes recreated the appropriate pin layout. Desktop had three pin spacers and mobile had five, matching hero/services/skills ownership rather than duplicate mounts.
- Production browser console had no errors or warnings during the checked interactions. No broken loaded case-study images were observed. Every underlying media file was also checked by HTTP.
- Opened `/media/documents/cv.pdf` in the browser PDF viewer and visually confirmed the original one-page CV rendered. The final mobile menu was rechecked after its wrapping fix; all five social links fit and background content was inert while open.

## Limits and retained external behavior

Reduced-motion behavior is implemented using GSAP matchMedia and CSS, with non-pinned readable sections, static gallery, and no WebGL effects. The available browser control did not expose operating-system media preference emulation, so that preference was reviewed in code rather than toggled in this browser session. This is not a claim of exhaustive device or GPU coverage.

The original font services and generic social platform URLs remain external dependencies. No personal social handles, favicon, canonical domain, or social-preview artwork were present, so none were invented. Link destinations were preserved; external service uptime is outside this application's control.

The Next.js application has been built and tested locally. No remote deployment or Git repository was created. The pre-migration source and unused reference demos remain in the external temporary backup described in `AUDIT.md`.
