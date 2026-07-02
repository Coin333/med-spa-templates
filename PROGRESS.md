# PROGRESS

Build root: ~/Desktop/code/med-spa-templates/
Prompt: ~/Desktop/med-spa-templates/PROMPT.md (execute fully; four templates; gate each before next)

## Done
- Phase 0 complete (2026-07-01): four capture analyses (parallel subagents) + live scroll inspection of all four URLs (Playwright)
- DESIGN-NOTES-marsea.md, DESIGN-NOTES-atelier.md, DESIGN-NOTES-venetian.md, DESIGN-NOTES-drop.md written (each contains the reference distillation AND the template plan: palette, fonts, motion, signature moments)
- Output scaffold created (4 template folders with css/js/assets)

## Key decisions
- Palettes: T1 porcelain/ink/juniper/blush; T2 gallery-white/espresso/bordeaux; T3 sand/lagoon-teal/umber; T4 bone/carbon/orchid
- Fonts: T1 Zalando Sans Expanded+Hanken Grotesk; T2 Cormorant Garamond+Archivo; T3 Marcellus+Figtree; T4 Fraunces+Space Mono
- BUSINESS object in js/data.js gets realistic fictional demo values (sales demos must not show {{braces}}); comment marks every field as swap-me. Placeholder reviews clearly commented as demo-only.
- Stack: plain HTML/CSS/vanilla JS, no external animation libs; motion hand-rolled per motion-web patterns (rAF lerp smooth-feel, IntersectionObserver reveals, scroll-scrub via rAF)

## DONE (2026-07-01)
All four templates gated and pushed: https://github.com/Coin333/med-spa-templates

## Template 4 (Drop): GATE PASSED (2026-07-01)
- Demo business "Studio Lumen" (West Hollywood); 11 WebP images (12-115KB), high-key bone/lilac art direction
- Gate: monogram mask scrubs 65% -> ~7000% -> removed across 300vh, panels translate -165px -> -1208px, all reveals fire, count-up hits 08, 0 console errors, no braces, JSON-LD, mobile menu works, 0px overflow, reduced-motion fallback collapses scrollers and shows all
- Fixes during gate: hero veil opacity lowered (was washing out mask), cue labels un-blended, panels head offset below fixed nav

## Template 3 (Venetian): GATE PASSED (2026-07-01)
- Demo business "Cove Aesthetics" (Manhattan Beach); 10 WebP images (43-188KB), sun-washed coastal art direction
- Gate: 0 unrevealed, blind-strip hero unfurls, arch morphs 320->110px on scrub, pinned drift travels +56vh -> -33vh, 0 console errors, no braces, JSON-LD, mobile menu works, 0px overflow, reduced-motion verified
- LEARNING: Motion v12 scroll(callback,{target,offset}) did NOT update reliably; use manual scroll math (getBoundingClientRect + rAF-throttled passive scroll listener) for scrub effects. Don't put .reveal on horizontally-scrolled carousel cards (offscreen cards never intersect); reveal the track instead. html{scroll-behavior:smooth} pollutes instant-scroll test reads; set scrollBehavior='auto' in test scripts.

## Template 2 (Atelier): GATE PASSED (2026-07-01)
- Demo business "Maison Vera" (Beverly Hills); 7 WebP images (38-133KB), chiaroscuro heritage art direction
- Gate: 0 unrevealed, all line-splits done, 7 menu rows, no braces, JSON-LD, 0 broken imgs, 0 console errors, mobile menu opens/closes, 0px overflow at 390, reduced-motion verified (all visible, titles visible, curtain gone)
- NOTE: Playwright MCP browser kept dying mid-gate; switched to chrome-devtools MCP (new_page/evaluate_script/take_screenshot/resize_page) for gates. Use initScript matchMedia stub for reduced-motion checks.

## Template 1 (Marsea): GATE PASSED (2026-07-01)
- All files built, 12 WebP images generated (41-378KB), demo business "Aurelle Aesthetics" (Pasadena)
- Gate results: 10/10 reveals fire, 0 console errors, all BUSINESS fields render, no {{braces}}, JSON-LD present, 8 tel: links, mobile nav works, 0px horizontal overflow at 390, reduced-motion verified via matchMedia stub (all visible, curtain removed)
- LEARNING for T2-T4: Motion v12 inView callback receives the ELEMENT, not {target}. Use (entry) => entry instanceof Element ? entry : entry.target. Also: add scroll-padding matching track padding on scroll-snap carousels; hero needs top+bottom scrim for corner text legibility; add dynamic monogram favicon from BUSINESS in JS.
- Local server for gates: python3 -m http.server 8907 from build root (running)

## Next exact step
1. Build template-3-venetian files (Marcellus + Figtree, sand/lagoon-teal/umber, blind-strip hero, arch radius morph scrub, pinned 300vh image-drift with mouse parallax)
2. Generate T3 images (sun-washed coastal, sand/teal, warm natural light), gate T3
3. Then T4 Drop (Fraunces + Space Mono, bone/carbon/orchid, 300vh monogram-mask scrub hero, sticky horizontal panels, 200px numerals), gate T4
4. git init + push to GitHub repo med-spa-templates
5. git init + push to new GitHub repo med-spa-templates (per rules/git.md: no Co-Authored-By, stage by filename)

## Verification gate (per template)
Open via local static server with Playwright; scroll full page; confirm reveals fire; screenshot 1440 and 390; zero console errors; all BUSINESS fields render; mobile nav works; prefers-reduced-motion fallback verified.
