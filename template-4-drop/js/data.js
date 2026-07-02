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
  name: "Studio Lumen",
  tagline: "Skin, engineered for light",
  phone: "(323) 555-0174",
  address: "8265 Santa Monica Blvd, West Hollywood, CA 90046",
  city: "West Hollywood",
  state: "CA",
  mapNote: "Corner of Santa Monica and Harper, lot behind the studio",
  email: "book@studiolumen.la",
  instagram: "@studiolumen.la",
  hours: {
    mon: "10am - 7pm",
    tue: "10am - 7pm",
    wed: "10am - 7pm",
    thu: "10am - 9pm",
    fri: "10am - 7pm",
    sat: "10am - 6pm",
    sun: "Closed",
  },
  about:
    "Studio Lumen is a device-led med spa on Santa Monica Blvd. Lasers, injectables, and clinical facials run on protocols, not guesswork: every plan is measured, photographed, and reviewed.",
  services: [
    {
      title: "Botox & Dysport",
      image: "assets/panel-injectables.webp",
    },
    {
      title: "Dermal Fillers",
      image: "assets/panel-injectables.webp",
    },
    {
      title: "Laser Hair Removal",
      image: "assets/panel-laser.webp",
    },
    {
      title: "Laser Resurfacing",
      image: "assets/panel-laser.webp",
    },
    {
      title: "HydraFacial",
      image: "assets/panel-facials.webp",
    },
    {
      title: "Microneedling",
      image: "assets/panel-facials.webp",
    },
    {
      title: "Chemical Peels",
      image: "assets/panel-facials.webp",
    },
    {
      title: "Body Contouring",
      image: "assets/panel-body.webp",
    },
  ],
  reviews: [
    {
      quote:
        "They photograph everything and show you the delta. First place that treated my skin like data.",
      author: "Placeholder Review A",
      stars: 5,
    },
    {
      quote: "In and out on my lunch break, and the glow lasted two weeks.",
      author: "Placeholder Review B",
      stars: 5,
    },
    {
      quote:
        "The most considered laser work in the city. Zero burns, real results, honest pricing.",
      author: "Placeholder Review C",
      stars: 5,
    },
  ],
};
window.BUSINESS = BUSINESS;
