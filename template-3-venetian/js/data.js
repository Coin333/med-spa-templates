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
  name: "Cove Aesthetics",
  tagline: "A refined glow, the coastal way",
  phone: "(310) 555-0189",
  address: "1148 Highland Avenue, Manhattan Beach, CA 90266",
  city: "Manhattan Beach",
  state: "CA",
  mapNote: "Two blocks up from the pier, street parking on Highland",
  email: "hello@coveaesthetics.com",
  instagram: "@coveaesthetics",
  hours: {
    mon: "9am - 6pm",
    tue: "9am - 6pm",
    wed: "9am - 6pm",
    thu: "9am - 8pm",
    fri: "9am - 6pm",
    sat: "9am - 5pm",
    sun: "10am - 4pm",
  },
  about:
    "Cove is a nurse-led med spa two blocks from the sand. Treatments are planned around real life: no overdone looks, no downtime surprises, and honest advice about what your skin actually needs.",
  services: [
    {
      title: "Botox & Dysport",
      blurb: "Soft, even wrinkle smoothing that keeps your face moving naturally.",
      image: "assets/service-botox.webp",
    },
    {
      title: "Dermal Fillers",
      blurb: "Balanced volume for lips, cheeks, and jawline, built up gradually.",
      image: "assets/service-filler.webp",
    },
    {
      title: "Laser Hair Removal",
      blurb: "Six-session plans with medical-grade lasers, safe for most skin tones.",
      image: "assets/service-laser.webp",
    },
    {
      title: "HydraFacial",
      blurb: "Deep cleanse, extraction, and hydration with instant glow and zero downtime.",
      image: "assets/service-hydrafacial.webp",
    },
    {
      title: "Microneedling",
      blurb: "Texture, pores, and acne scarring treated with collagen induction.",
      image: "assets/service-microneedling.webp",
    },
    {
      title: "Body Contouring",
      blurb: "Non-surgical sculpting sessions that fit into a lunch hour.",
      image: "assets/service-contouring.webp",
    },
    {
      title: "Chemical Peels",
      blurb: "From gentle brightening to medical-depth resurfacing, matched to your skin.",
      image: "assets/service-peel.webp",
    },
    {
      title: "IV Therapy",
      blurb: "RN-administered hydration and vitamin drips in a quiet ocean-lit room.",
      image: "assets/service-iv.webp",
    },
  ],
  reviews: [
    {
      quote: "The pinned-down honesty is rare. They told me exactly what I did not need, and the results from what I did get are stunning.",
      author: "Placeholder Review A",
      stars: 5,
    },
    {
      quote: "Laser packages were priced clearly and worked exactly as promised. Six visits, done.",
      author: "Placeholder Review B",
      stars: 5,
    },
    {
      quote: "It feels like a beach house that happens to have medical-grade skin care. I look forward to every visit.",
      author: "Placeholder Review C",
      stars: 5,
    },
    {
      quote: "Booked a HydraFacial on my lunch break and walked back to work glowing.",
      author: "Placeholder Review D",
      stars: 5,
    },
  ],
};
window.BUSINESS = BUSINESS;
