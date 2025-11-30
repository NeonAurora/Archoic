# Astro Portfolio Performance & Styling Guidelines

## Why Astro
- Zero-JS-by-default keeps payload small; hydrate only the islands that need interactivity.
- Simple asset pipeline, good CSS/MDX story, and granular `client:*` directives fit marketing/animation pages.
- Guard against heavy visuals/JS that could erase the performance gains.

## Targets / Performance Budget
- Aim for <150KB shipped JS, sub-1s LCP on mid-range mobile, CLS near 0.
- Audit early/often with Lighthouse/WebPageTest; track hero LCP element specifically.

## Page & Component Model
- Keep most content static Astro/MDX; isolate interactivity into islands (`client:idle`/`client:visible`).
- Avoid hydrating global layout; progressively enhance static markup instead of defaulting to SPA patterns.
- Code-split per route; prerender all pages unless SSR is required.

## CSS & Tokens
- Use scoped component styles plus a small global tokens layer (colors, spacing, typography, radii, shadows).
- Prefer CSS variables for theming and animation tuning; avoid ad-hoc overrides.
- Keep global CSS lean; prevent style leakage across islands.

## Typography & Assets
- Limit font families/weights; use `font-display: swap` or a system stack fallback.
- Optimize images (AVIF/WebP with fallbacks), responsive `srcset`, and lazy-load below the fold.
- Inline critical SVG icons; compress Lottie/SVG assets.

## Animations & Motion
- Prefer CSS transforms/opacity; avoid layout-thrashing properties.
- Limit concurrent animations; consider FLIP patterns for moving elements.
- Honor `prefers-reduced-motion`; provide graceful fallbacks.
- Lazy-load heavy animation libs; avoid global scroll listeners in favor of `IntersectionObserver`.

## Layout & CLS
- Establish a fluid type scale and spacing ramp; use container queries where useful.
- Reserve space for hero media to prevent layout shift; pin nav heights early.
- Use consistent gutters and a clear grid to reduce ad-hoc adjustments.

## JavaScript Hygiene
- Keep dependency count minimal; tree-shake and code-split.
- Debounce scroll/resize handlers; avoid global listeners unless necessary.
- Ship islands with `client:visible`/`client:idle` to defer hydration; avoid shipping JS to static sections.

## Build & Hosting
- Enable Astro image optimizations; ensure minification/treeshaking is on.
- Serve static assets via CDN/edge; set proper cache headers for images/fonts.
- Prerender pages; only opt into SSR for genuine dynamic needs.

## Accessibility
- Semantic HTML, visible focus states, and sufficient contrast.
- Keyboard test interactive pieces; ensure motion-heavy sections remain usable with reduced motion.

## Tooling & QA
- Add ESLint/Stylelint +    ier; enforce import/no-unused rules to keep JS trim.
- Consider visual regression snapshots (Playwright/Loki) for animation-heavy areas.
- Monitor bundle sizes and LCP media with CI checks where possible.
