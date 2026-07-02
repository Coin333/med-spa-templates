# Design Notes: Drop (dropedition.com, streetwear commerce)

Reference: Next.js + Tailwind v4. Stack observed: GSAP + ScrollTrigger (pinning/scrub), Lenis (lerp 0.1), custom cursor layer, minimal CSS keyframes. Live scroll confirmed: hero logo-mask scales 80% to 110% with white overlay wiping in during first ~13% of scroll. Commerce site: design language only, no drop/cart mechanics.

## Structure (reference)
1. Fixed header, full-screen menu overlay with 72px serif links
2. Hero: 300vh scroller, sticky viewport panel; photo revealed through logo-shaped mask that scales as you scroll (scrubbed), white overlay wipe
3. Sticky full-screen lookbook slider: absolutely positioned 1/3-width panels translating on X, custom cursor, click to advance
4. Curated pieces: full-height side-by-side panels, hover scale-105 over 700ms
5. Editorial manifesto: oversized type moment, 160px display over photography, muted sage, mix-blend-multiply fusing type into image
6. Dense gallery: strict 4-col grid, gap 6px, aspect 7/10 tiles, hover scale
7. Drop feature: giant 208px serif numeral + paragraph + button
8. Newsletter: 800px-tall block
9. Footer: glassmorphic panel (bg-black/47, backdrop-blur-2xl) floating over looping video
## Type and space (reference)
- Mirtha Display (serif display) for headings/numerals: 140px h1, 208px numerals, lh 0.76-1. ABC Whyte Mono for body (17px/1.4): the mono supplies technical texture against the elegant serif.
- Uppercase eyebrows (22px). Content capped 1920px but leans full-bleed h-screen blocks; large irregular padding (60-160px); one deliberately dense 4-col gap-6px gallery as counterpoint.
- One-idea-per-viewport pacing. Muted sage #889E9E as the only color voice on white + warm near-black.

## TAKE
- Scrubbed mask-reveal hero (wordmark-shaped mask over photo, sticky in a tall scroller)
- Serif-display + mono-body pairing, oversized numerals, leading below 0.8
- One-idea-per-viewport pacing; dense tight-gap gallery as rhythm break
- mix-blend-multiply type over photography
- Glassmorphic footer panel over media
- Custom cursor on the slider, hover scale over long durations
- Full-screen menu overlay with giant serif links

## DO NOT TAKE
Sage/mint/red palette, streetwear imagery, drop countdowns, cart, lookbook commerce framing.

## Template 4 plan
- Palette (original): bone #FAFAF8 ground, carbon #191919 ink, muted orchid #9C7FB8 as the single color voice (lasers/light theme fits med spa tech). No other hue.
- Fonts: Fraunces (display serif, opsz axis) + Space Mono (body/labels). Google Fonts.
- Motion personality: precise scrub. Sticky 300vh hero with monogram mask scale scrub, sticky horizontal treatment panel slider, oversized numerals for treatment steps, dense results grid.
- Signature moments: (1) scrubbed monogram-mask hero reveal, (2) sticky click-to-advance horizontal panels with custom cursor, (3) 200px serif numeral treatment-count moment with mix-blend type over photo.
- Deviation log: footer video replaced with generated ambience still under the glass panel (asset constraint); newsletter block becomes booking CTA block.
