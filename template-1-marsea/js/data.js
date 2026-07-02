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
  name: "Aurelle Aesthetics",
  tagline: "Quiet, considered medical aesthetics. Results that read as rest, not work.",
  phone: "(626) 555-0148",
  address: "512 Mission Street, Pasadena, CA 91105",
  city: "Pasadena",
  state: "CA",
  mapNote: "Corner of Mission and Meridian, free lot behind the building",
  email: "hello@aurelleaesthetics.com",
  instagram: "@aurelleaesthetics",
  bookingUrl: "#book",
  hours: {
    mon: "9am - 6pm",
    tue: "9am - 6pm",
    wed: "9am - 7pm",
    thu: "9am - 7pm",
    fri: "9am - 6pm",
    sat: "10am - 4pm",
    sun: "Closed",
  },
  about:
    "Aurelle is a physician-directed studio in Old Pasadena. One patient at a time, unhurried consults, and a treatment plan built around your face, not a trend.",
  services: [
    {
      title: "Botox & Dysport",
      blurb: "Softens lines while your expressions stay yours. Dosed conservatively, reviewed at two weeks.",
      image: "assets/service-botox.webp",
    },
    {
      title: "Dermal Fillers",
      blurb: "Structure and balance for lips, cheeks, and jawline. Reversible, placed slowly.",
      image: "assets/service-filler.webp",
    },
    {
      title: "Laser Hair Removal",
      blurb: "Medical-grade diode laser, safe for most skin tones. Six sessions, lasting results.",
      image: "assets/service-laser.webp",
    },
    {
      title: "HydraFacial",
      blurb: "Cleanse, extract, and hydrate in forty minutes. No downtime, immediate glow.",
      image: "assets/service-hydrafacial.webp",
    },
    {
      title: "Microneedling",
      blurb: "Collagen induction for texture, scarring, and pores. Visible change by week four.",
      image: "assets/service-microneedling.webp",
    },
    {
      title: "Body Contouring",
      blurb: "Non-surgical sculpting for stubborn areas diet does not reach. No anesthesia, no recovery days.",
      image: "assets/service-contouring.webp",
    },
    {
      title: "Chemical Peels",
      blurb: "Medical-depth peels matched to your skin, from lunchtime glow to full resurfacing.",
      image: "assets/service-peel.webp",
    },
    {
      title: "IV Therapy",
      blurb: "Hydration and vitamin drips administered by an RN. Twenty minutes in a quiet room.",
      image: "assets/service-iv.webp",
    },
  ],
  concerns: [
    "Fine lines",
    "Volume loss",
    "Acne & texture",
    "Sun damage",
    "Unwanted hair",
    "Dull skin",
  ],
  approach: [
    {
      title: "Natural results",
      text: "The goal is you on your best week. If a treatment would announce itself, we do not do it.",
      image: "assets/ambience-room.webp",
      card: "assets/service-hydrafacial.webp",
    },
    {
      title: "Medical first",
      text: "Physician-directed, nurse-injected. Every plan starts with skin health, not a syringe.",
      image: "assets/ambience-detail.webp",
      card: "assets/service-botox.webp",
    },
    {
      title: "One face at a time",
      text: "One patient in the studio at a time. Your consult is a conversation, never a queue.",
      image: "assets/hero.webp",
      card: "assets/service-microneedling.webp",
    },
  ],
  reviews: [
    {
      quote: "Nobody could tell I had anything done. Three people asked if I changed my sleep.",
      author: "Placeholder Review A",
      stars: 5,
    },
    {
      quote: "First med spa that talked me out of a treatment. I trust them completely now.",
      author: "Placeholder Review B",
      stars: 5,
    },
    {
      quote: "The laser packages actually worked. Done in six visits, exactly as quoted.",
      author: "Placeholder Review C",
      stars: 5,
    },
  ],
};
window.BUSINESS = BUSINESS;
