// ============================================================
// BUSINESS DATA CONTRACT
// Every business-specific value on this site renders from this
// one object. To rebrand for a real client, edit ONLY this file
// (and swap the images in /assets).
//
// Populated for: Skin Care by Kat (Arcadia, CA).
// Source: the studio's public Yelp listing (name, address, phone,
// hours, services) and its real 5-star Yelp reviews (lightly
// condensed, meaning intact).
//
// TO CONFIRM before launch:
//  - email: placeholder below. Kat books by phone/text and Instagram;
//    swap in her real inbox or point the form there.
//  - images: current /assets photos are art-directed placeholders.
//    Replace with Kat's own photos (same filenames), keeping the warm,
//    calm look.
// ============================================================
const BUSINESS = {
  name: "Skin Care by Kat",
  tagline:
    "Warm, one-on-one skin care in the heart of Arcadia. Real results, and never any rush.",
  phone: "(626) 760-2952",
  address: "21 S 1st Ave, Arcadia, CA 91006",
  city: "Arcadia",
  state: "CA",
  mapNote:
    "Downtown Arcadia on S 1st Ave. By appointment only, wheelchair accessible.",
  email: "hello@skincarebykat.com", // PLACEHOLDER — confirm Kat's real email
  instagram: "@skin_by_kat",
  bookingUrl: "#book",
  hours: {
    mon: "Closed",
    tue: "10am - 7pm",
    wed: "10am - 7pm",
    thu: "10am - 7pm",
    fri: "10am - 8pm",
    sat: "11am - 8pm",
    sun: "10:30am - 6pm",
  },
  about:
    "Skin Care by Kat is a small, by-appointment studio in downtown Arcadia. It's just Kat: trained at Paul Mitchell and Dermalogica, hands-on from your first hello, and genuinely happy you came in.",
  services: [
    {
      title: "Signature Facial",
      blurb:
        "A deep cleanse, exfoliation, and mask matched to your skin, finished with a neck and shoulder massage. You leave calmer, and glowing.",
      image: "assets/service-peel.webp",
    },
    {
      title: "Acne Treatment",
      blurb:
        "Gentle extractions and pore-clearing for congested, breakout-prone skin, plus honest advice on how to care for it at home.",
      image: "assets/service-hydrafacial.webp",
    },
    {
      title: "Microneedling",
      blurb:
        "Collagen-building treatment for acne scarring, dark spots, and texture. Kept comfortable, with a follow-up to see how you healed.",
      image: "assets/service-microneedling.webp",
    },
    {
      title: "Body Scrub & Polish",
      blurb:
        "A full-body exfoliation that leaves skin soft, smooth, and glowing, often finished with a relaxing massage.",
      image: "assets/service-contouring.webp",
    },
    {
      title: "Waxing",
      blurb:
        "From brows to full body, done cleanly and made as easy as waxing can be. First-timers get walked through every step.",
      image: "assets/service-laser.webp",
    },
    {
      title: "Lip Filler",
      blurb:
        "Natural, symmetrical lip enhancement placed slowly and gently, with a check-in after to make sure you're happy.",
      image: "assets/service-botox.webp",
    },
    {
      title: "Skin Brightening & Glow",
      blurb:
        "Treatments that even out tone and bring back the light in dull, tired, or sun-marked skin.",
      image: "assets/service-filler.webp",
    },
  ],
  concerns: [
    { label: "Acne & breakouts", image: "assets/service-hydrafacial.webp" },
    { label: "Dull, tired skin", image: "assets/service-filler.webp" },
    {
      label: "Fine lines & wrinkles",
      image: "assets/service-microneedling.webp",
    },
    { label: "Unwanted hair", image: "assets/service-laser.webp" },
    { label: "Skin tags & texture", image: "assets/service-peel.webp" },
    { label: "Rough, dry skin", image: "assets/service-contouring.webp" },
  ],
  approach: [
    {
      title: "Personal, never rushed",
      text: "You get Kat's full attention, start to finish. She explains each step and checks in the whole way through, so you always know what's happening to your skin.",
      image: "assets/ambience-room.webp",
      card: "assets/service-peel.webp",
    },
    {
      title: "Trained hands",
      text: "Educated at Paul Mitchell and Dermalogica, Kat reads your skin first and builds the treatment around it, not around a menu.",
      image: "assets/ambience-detail.webp",
      card: "assets/service-microneedling.webp",
    },
    {
      title: "You'll leave glowing",
      text: "Facials, scrubs, waxing, or a little filler: the goal is skin that looks and feels like the best version of yours.",
      image: "assets/hero.webp",
      card: "assets/service-filler.webp",
    },
  ],
  // Real Yelp reviews (5 stars), lightly condensed. Names as shown publicly.
  reviews: [
    {
      quote:
        "I love the way my skin looks and feels after each treatment. Kat is super knowledgeable and takes great care of her clients, which is why I keep coming back.",
      author: "Sarah S.",
      stars: 5,
    },
    {
      quote:
        "I came in for a body scrub and it was amazing. Kat made me feel comfortable and was very professional. My skin is glowing and feels so soft.",
      author: "Daysi A.",
      stars: 5,
    },
    {
      quote:
        "My first experience with lip fillers, and I felt lucky. My lips look natural and symmetrical, and Kat was so gentle and caring.",
      author: "Amelia S.",
      stars: 5,
    },
  ],
};
window.BUSINESS = BUSINESS;
