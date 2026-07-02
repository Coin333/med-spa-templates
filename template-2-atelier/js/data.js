// ============================================================
// BUSINESS DATA CONTRACT
// Every business-specific value on this site renders from this
// one object. To rebrand for a real client, edit ONLY this file
// (and swap the images in /assets). Nothing else.
// The values below are fictional demo content for sales demos.
// Reviews are placeholders: replace with the client's real
// Yelp/Google quotes (names and star counts) before launch.
// ============================================================
const BUSINESS = {
  name: "Maison Vera",
  tagline: "The house of considered aesthetics",
  phone: "(310) 555-0162",
  address: "417 N Canon Drive, Beverly Hills, CA 90210",
  city: "Beverly Hills",
  state: "CA",
  mapNote: "Between Brighton and Dayton Way, valet on Canon",
  email: "appointments@maisonvera.com",
  instagram: "@maisonvera",
  hours: {
    mon: "10am - 6pm",
    tue: "10am - 6pm",
    wed: "10am - 6pm",
    thu: "10am - 8pm",
    fri: "10am - 6pm",
    sat: "10am - 5pm",
    sun: "Closed",
  },
  about:
    "Maison Vera treats medical aesthetics as a craft. Every treatment is planned in a private consult, performed without hurry, and reviewed until the result sits quietly in your face.",
  services: [
    {
      title: "Botox & Dysport",
      blurb: "Expression-preserving wrinkle relaxation, dosed by the unit and reviewed at two weeks.",
      image: "assets/tile-injectables.webp",
    },
    {
      title: "Dermal Fillers",
      blurb: "Cheek, lip, and jawline structure with reversible hyaluronic fillers.",
      image: "assets/tile-injectables.webp",
    },
    {
      title: "Laser Hair Removal",
      blurb: "Diode laser sessions safe for most skin tones, planned as a six-visit course.",
      image: "assets/tile-laser.webp",
    },
    {
      title: "Laser Skin Resurfacing",
      blurb: "Fractional resurfacing for texture, tone, and sun history.",
      image: "assets/tile-laser.webp",
    },
    {
      title: "HydraFacial",
      blurb: "A forty-minute cleanse, extraction, and hydration ritual with no downtime.",
      image: "assets/tile-rituals.webp",
    },
    {
      title: "Microneedling",
      blurb: "Collagen induction for scarring and pore refinement, with medical-grade serums.",
      image: "assets/tile-rituals.webp",
    },
    {
      title: "Chemical Peels",
      blurb: "Medical-depth peels matched to your skin's tolerance and calendar.",
      image: "assets/tile-rituals.webp",
    },
  ],
  reviews: [
    {
      quote: "It felt closer to a private atelier than a clinic. Nothing was rushed, and the result is invisible in the best way.",
      author: "Placeholder Review A",
      stars: 5,
    },
    {
      quote: "They planned my treatments across six months instead of selling me everything at once. That restraint won me over.",
      author: "Placeholder Review B",
      stars: 5,
    },
    {
      quote: "The most beautiful medical space I have been in, and the steadiest hands.",
      author: "Placeholder Review C",
      stars: 5,
    },
  ],
};
window.BUSINESS = BUSINESS;
