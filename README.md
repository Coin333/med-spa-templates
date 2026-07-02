# Med Spa Templates

Four production-quality, single-page med spa website templates for CS Web Studio sales demos. Each is a self-contained static site (plain HTML + CSS + vanilla JS, no build step) designed for a med spa that has no website yet.

## The four templates

| Folder | Demo brand | Design language | Type pairing | Signature motion |
| --- | --- | --- | --- | --- |
| `template-1-marsea` | Aurelle Aesthetics (Pasadena) | Airy porcelain editorial, juniper accent | Zalando Sans Expanded + Hanken Grotesk | Curtain-wipe hero, image parallax, mouse-follow floats, auto-advancing approach slider |
| `template-2-atelier` | Maison Vera (Beverly Hills) | Heritage gallery white, espresso ink, bordeaux micro-accent | Cormorant Garamond + Archivo | Masked line-by-line serif reveals, crossfading fullscreen hero slides |
| `template-3-venetian` | Cove Aesthetics (Manhattan Beach) | Sun-washed sand and lagoon teal, arched geometry | Marcellus + Figtree | Blind-strip hero unfurl, scrubbed arch morph, pinned image-drift with mouse parallax |
| `template-4-drop` | Studio Lumen (West Hollywood) | Bone, carbon, muted orchid, fashion-clinical | Fraunces + Space Mono | 300vh monogram-mask scrub hero, sticky horizontal panels, count-up numeral, glass footer |

## Swapping in a real client

Every business-specific value renders from the `BUSINESS` object at the top of `js/data.js` in each template: name, tagline, phone, address, city, hours, services, reviews, and map note. To rebrand:

1. Edit `js/data.js` with the client's Yelp/Google info. The reviews shipped here are placeholders; replace them with the client's real quotes.
2. Replace the images in `assets/` (same filenames) with client photos, or regenerate with a consistent art direction.
3. Done. Title, meta description, Open Graph tags, MedicalSpa JSON-LD, the tel: links, the monogram favicon, and every visible string update from that one object.

No business-specific string is hardcoded in any `index.html`.

## Running

Serve any template folder from a static server (ES modules require http, not file://):

```
cd template-1-marsea && python3 -m http.server 8000
```

## What is inside each template

- `index.html`: semantic structure, one h1 (service + city pattern), skip link, ARIA labels
- `css/styles.css`: the full design system for that template
- `js/data.js`: the BUSINESS data contract
- `js/main.js`: rendering from BUSINESS, then motion (Motion via CDN ESM, pinned to v12)
- `assets/`: optimized WebP images (generated, art-directed per template)

All motion respects `prefers-reduced-motion` with full non-animated fallbacks, and every scroll reveal has a deterministic in-view fallback so content can never stay hidden. Verified at 390px, 768px, and 1440px with zero console errors.

Built with D1 Vibe Coding
