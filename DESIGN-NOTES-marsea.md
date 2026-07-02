# Design Notes: Marsea (centremarsea.com)

Reference: Webflow med spa, Bastia, Corse. Stack observed: GSAP + ScrollTrigger, Lenis (duration 1.2), Swiper (autoplay 2s, pause on hover), simpleParallax on every hero image, jQuery. Live scroll confirmed continuous image parallax on nearly every image, one fixed full-viewport panel, Swiper carousel.

## Structure (reference)

1. Fixed nav: logo left, centered links, "book" pill right
2. Hero: full-bleed portrait photo with parallax, content pinned bottom-left, stacked uppercase eyebrows top-left, narrow tagline top-right, cream curtain wipe on load
3. Statement: single narrow centered column (390px), one large sentence, one CTA, 17rem vertical padding
4. Solutions: Swiper of tall image cards (400x520), category captions, circular arrows
5. Image band + concerns: 90vh, hairline borders, 50/50 split, right side is large uppercase link list with numbered prefixes and weight-shift hover (300 to 500)
6. Brand statement: 120vh, centered 580px text block with three small floating images (~130px) that follow the mouse, curtain wipes
7. Approach: 100vh auto-advancing slider, full-bleed photo + floating 450x600 card + numbered uppercase title
8. Footer: single dark saturated color block, hairline grid, big square image + contact form + link columns

## Type and space (reference)

- Zalando Sans Expanded everywhere (wide sans does the luxury work, no letter-spacing needed). All-sans identity, no serif.
- Uppercase for labels, buttons, list links, slide titles. Light weights (300/400) even at large sizes. Largest display only 2.3rem: restraint.
- No max-width container: full width + 2rem side padding (3rem at 1440). Flexbox, not grid. 0.5px hairline borders. Pills at 30px radius, circular 50px arrows.
- Very airy: 90-120vh sections, 17rem statement padding.

## TAKE

- All-wide-sans identity, uppercase eyebrows, light weights, restrained display sizes
- Corner-pinned hero composition (content bottom-left, eyebrows top-left, tagline top-right)
- Curtain-wipe image reveals, continuous soft image parallax
- Narrow centered statement section with huge breathing room
- 50/50 image + uppercase service link list with weight-shift hover
- Floating mouse-follow images around a centered text block
- Auto-advancing full-bleed "approach" slider with floating card
- Hairline borders, pill buttons, circular arrows, single saturated footer block

## DO NOT TAKE

Cream/oxblood palette, French copy, their imagery, logo.

## Template 1 plan

- Palette (original): porcelain `#F7F2EA` ground, ink `#191512`, deep juniper green `#33544A` accent, muted blush `#D8B9AD` secondary. Footer block: juniper.
- Fonts: Zalando Sans Expanded (display + labels) + Hanken Grotesk (body). Google Fonts.
- Motion personality: slow drift. Lenis-feel smooth scroll (lightweight lerp), simple parallax on images, cream curtain wipes, mouse-follow floating images, autoplay approach slider.
- Signature moments: (1) curtain-wipe hero with parallax portrait and corner-pinned composition, (2) mouse-follow floating images around statement, (3) auto-advancing approach slider.
- Deviation log: replacing their pinned horizontal image track (template carryover in their JS, not visible on page) with the approach slider as second set piece.
