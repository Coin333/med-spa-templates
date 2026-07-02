# Design Notes: Atelier (us.delvaux.com, luxury leather goods)

Reference: Vue/Nuxt SPA. Stack observed: Swiper (dominant), GSAP + ScrollTrigger + SplitText, Barba page transitions, AOS, Plyr video, heavy IntersectionObserver. Commerce site: design language only, no commerce mechanics.

## Structure (reference)
1. Transparent theme-aware header over hero: split left/right nav lists around centered wordmark, inverts over light/dark imagery
2. Hero: fullscreen image slide, dark overlay, centered serif title with masked line-by-line reveal, underlined uppercase stroke-link CTAs
3. Triple-image editorial Swiper: three linked image tiles with small-caps eyebrows
4. Second fullscreen editorial slide, same treatment
5. Dual-image cards Swiper (stacked-cards style)
6. Footer: newsletter CTA beside house tagline ("Since 1829"), accordion nav columns
Rhythm: alternating full-bleed editorial slide, then contained carousel, repeat.

## Type and space (reference)
- Genath serif (weight 300, oldstyle figures, negative tracking, lh 80-133%) for ALL display, headings, eyebrows (small-caps), and body. Atlas Grotesk only for 10px uppercase micro UI labels with negative tracking (dense, not wide-tracked).
- 24-column fluid grid, everything in vw on a 1920 reference, clamp() on big headings (up to 90px hero, 60px slide titles).
- Fluid section padding ~3.1-4.2vw, tight 15-16px gutters. "Let the image breathe, keep the type dense and quiet."
- Animation tokens: reveal ease cubic-bezier(.25,1,.5,1), conceal cubic-bezier(.5,0,.75,0), duration ladder 1.5s to .2s. Masked line reveal: overflow hidden line wrappers, text translateY(100%) to 0.
- Hover: opacity .7 on links, images scale(1.02).

## TAKE
- Serif-for-everything identity incl. small-caps eyebrows; sans only for tiny uppercase UI labels
- Masked line-by-line hero title reveal, the reveal/conceal easing pair
- Fullscreen editorial slide hero with dark overlay + centered type + stroke links
- Alternating full-bleed slide / contained image-card carousel rhythm
- Theme-aware transparent header, centered wordmark, split nav
- Warm single-ink restraint: one near-black, no decorative color
- Quiet hovers (opacity .7, scale 1.02)

## DO NOT TAKE
Commerce mechanics (cart, product grids), their imagery, wordmark, exact charcoal value.

## Template 2 plan
- Palette (original): gallery white #FBFAF8 ground, warm espresso ink #211D19, bordeaux #5C2331 as rare micro-accent (stroke links, small-caps eyebrows). The quietest of the four.
- Fonts: Cormorant Garamond 300/400 (all display, body-large, small-caps eyebrows) + Archivo (10-11px uppercase micro labels). Google Fonts.
- Motion personality: ceremonial. Masked line reveals on every heading, slow crossfade hero slides, gentle image scale on hover, no parallax exuberance.
- Signature moments: (1) fullscreen hero slider with masked serif line reveals and dark overlay, (2) editorial triple-image carousel with small-caps captions, (3) theme-swapping transparent header.
- Deviation log: Barba page transitions dropped (single page); replaced with soft page-load conceal/reveal curtain using their easing pair.
