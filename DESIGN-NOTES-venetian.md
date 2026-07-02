# Design Notes: Venetian (venetianspa.ca)

Reference: WordPress + Elementor nail spa, Winnipeg. Stack observed live: GSAP + ScrollTrigger (2 pinned scrub sections, several scrubbed radius morphs), Lenis (duration 1.4), SplitType char/word/line reveals on nearly every heading, Swiper. Page height ~13,700px: long cinematic scroll.

## Structure (reference)
1. Sticky header: logo left (white/dark swap), horizontal menu, outlined-pill Book Now; slides down on load
2. Hero: full-bleed muted autoplay video, giant uppercase serif H1 (90px), outlined pill CTA, venetian-blind strips scrub-rotate over the video, char-by-char headline reveal
3. Arched intro panel: cream panel whose top border-radius scrubs from 1250px to 400px while scrolling into view; eyebrow + big serif statement
4. Services: nested Swiper showing 3 of 4 tall linked cards, right offset, infinite loop
5. Pinned image-drift set piece: container pins ~3000px while four tall portraits travel vertically (staggered), background glyph scales 1 to 1.75, mousemove parallax nudges images
6. Text + image feature: narrow left text block beside arched reveal image
7. Instagram grid ("GLOW WITH US")
8. Testimonials: review cards in GSAP-animated wrapper ("OVER 1,000 FIVE-STAR REVIEWS")
9. Contact CTA over photo + form
10. Dark footer
## Type and space (reference)
- Beautique Display serif, single weight, ALL HEADINGS AUTHORED UPPERCASE in HTML (no text-transform): hero 90px/1.09, sections 65/55px, negative tracking. Gold or white.
- Inter body 15px/1.33. Buttons in the display serif, 16px, 30px pill radius, 1px outline, hover fills white with gold text over 0.7s.
- Boxed 1140px content alternating with full-bleed sections. Narrow text columns (420-530px) against large imagery. Huge padding: tops 75-200px, bottoms up to 700px.

## TAKE
- Uppercase display-serif identity with gold-on-cream warmth
- Venetian-blind strip reveal over hero media (scrub)
- Morphing arch radius scrub on panel entry, arched image masks
- Pinned multi-image vertical drift set piece with mouse parallax
- SplitType-style staggered char/line reveals on headings
- Outlined pill buttons with slow fill hover
- Long cinematic scroll pacing, narrow text vs large imagery

## DO NOT TAKE
Champagne gold/ivory palette values, their copy, video, imagery, Awwwards ribbon.

## Template 3 plan
- Palette (original): lagoon teal #1F4E4A (headings/accent), warm sand #EFE7DA ground, deep umber ink #26201A, white. Water-inspired: fits the arch/venetian language without copying their gold.
- Fonts: Marcellus (uppercase-natured display serif) + Figtree (body). Google Fonts.
- Motion personality: cinematic scrub. Lenis-feel smooth scroll, blind-strip hero reveal, arch radius morph, pinned image drift with mouse parallax, staggered line reveals.
- Signature moments: (1) blind-strip scrub reveal over hero image, (2) pinned vertical image-drift gallery with mouse parallax, (3) morphing arch panel.
- Deviation log: hero uses a generated still image instead of video (asset constraint); blind strips animate over it identically. Instagram feed becomes results gallery grid.
