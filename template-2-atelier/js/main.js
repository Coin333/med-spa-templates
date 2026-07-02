/* Maison Vera / Template 2. Renders everything from BUSINESS (js/data.js),
   then wires motion: espresso load curtain, masked line-by-line title
   reveals, crossfading fullscreen hero slides, quiet fades. If the Motion
   CDN import fails or reduced motion is preferred, everything is shown
   instantly. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const telHref = "tel:+1" + B.phone.replace(/\D/g, "");

const HERO_SLIDES = [
  { eyebrow: B.tagline, title: "Medical aesthetics in " + B.city, image: "assets/hero-1.webp", h1: true },
  { eyebrow: "Injectables, laser, and skin rituals", title: "Treatments in the house manner", image: "assets/hero-2.webp" },
  { eyebrow: "Unhurried, physician-directed", title: "Skin, considered at length", image: "assets/hero-3.webp" },
];

/* ---------------- rendering ---------------- */

function bindText() {
  const values = {
    name: B.name, tagline: B.tagline, phone: B.phone, address: B.address,
    city: B.city, about: B.about, email: B.email, instagram: B.instagram,
    mapNote: B.mapNote, year: String(new Date().getFullYear()),
  };
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = values[el.dataset.bind];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const kind = el.dataset.bindHref;
    if (kind === "tel") el.href = telHref;
    if (kind === "email") el.href = "mailto:" + B.email;
  });
}

function renderHead() {
  const initial = B.name.trim().charAt(0).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="0" fill="#211d19"/>' +
    '<text x="32" y="44" font-family="Georgia, serif" font-size="36" fill="#fbfaf8" text-anchor="middle">' + initial + "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title = B.name + " | Med Spa in " + B.city + " | Injectables, Laser & Skin Care";
  const desc =
    B.name + " is a med spa in " + B.city + ", " + B.state + ". " +
    "Botox, dermal fillers, laser treatments, HydraFacial and medical skin care. Call " + B.phone + " to book.";
  document.querySelector('meta[name="description"]').content = desc;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = desc;

  const days = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
  const spec = Object.entries(B.hours)
    .filter(([, v]) => !/closed/i.test(v))
    .map(([d, v]) => {
      const m = v.match(/(\d+)(am|pm)\s*-\s*(\d+)(am|pm)/i);
      if (!m) return null;
      const to24 = (h, ap) => String((+h % 12) + (ap.toLowerCase() === "pm" ? 12 : 0)).padStart(2, "0") + ":00";
      return { "@type": "OpeningHoursSpecification", dayOfWeek: days[d], opens: to24(m[1], m[2]), closes: to24(m[3], m[4]) };
    })
    .filter(Boolean);
  const [street, cityPart, stateZip] = B.address.split(",").map((s) => s.trim());
  const ld = {
    "@context": "https://schema.org",
    "@type": "MedicalSpa",
    name: B.name,
    description: desc,
    telephone: B.phone,
    email: B.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: cityPart || B.city,
      addressRegion: B.state,
      postalCode: (stateZip || "").replace(/\D/g, ""),
      addressCountry: "US",
    },
    openingHoursSpecification: spec,
    image: "assets/hero-1.webp",
    priceRange: "$$$",
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

function renderHero() {
  const wrap = document.getElementById("heroSlides");
  wrap.innerHTML = HERO_SLIDES.map(
    (s, i) => `
    <div class="hero__slide${i === 0 ? " active" : ""}" data-slide="${i}">
      <img src="${s.image}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <span class="hero__eyebrow">${s.eyebrow}</span>
        ${s.h1 ? `<h1 class="hero__title" data-split>${s.title}</h1>` : `<h2 class="hero__title" data-split>${s.title}</h2>`}
        <div class="hero__ctas">
          <a class="stroke-link" href="${telHref}">Book an appointment</a>
          <a class="stroke-link" href="#treatments">Discover treatments</a>
        </div>
      </div>
    </div>`
  ).join("");
  const dots = document.getElementById("heroDots");
  dots.innerHTML = HERO_SLIDES.map(
    (_, i) => `<button class="hero__dot${i === 0 ? " active" : ""}" data-dot="${i}" role="tab" aria-label="Slide ${i + 1}"></button>`
  ).join("");
}

function renderMenu() {
  document.getElementById("menuRows").innerHTML = B.services.map(
    (s) => `
    <div class="menu-row reveal">
      <h3 class="menu-row__name">${s.title}</h3>
      <p class="menu-row__blurb">${s.blurb}</p>
    </div>`
  ).join("");
}

function renderReviews() {
  document.getElementById("reviewsWrap").innerHTML = B.reviews.map(
    (r, i) => `
    <blockquote class="review${i === 0 ? " active" : ""}" data-review="${i}">
      <p class="review__quote">"${r.quote}"</p>
      <div class="review__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>
      <footer class="review__author">${r.author}</footer>
    </blockquote>`
  ).join("");
  document.getElementById("reviewsDots").innerHTML = B.reviews.map(
    (_, i) => `<button class="reviews__dot${i === 0 ? " active" : ""}" data-rdot="${i}" role="tab" aria-label="Review ${i + 1}"></button>`
  ).join("");
}

function renderHours() {
  const days = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
  document.getElementById("hoursTable").innerHTML = Object.entries(B.hours)
    .map(([d, v]) => `<tr><td>${days[d]}</td><td>${v}</td></tr>`)
    .join("");
}

/* ---------------- nav + menu ---------------- */

function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => {
    const nearBottom = window.scrollY + innerHeight >= document.documentElement.scrollHeight - 200;
    nav.classList.toggle("nav--visible", window.scrollY > 80 && !nearBottom);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const toggle = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    if (open) nav.classList.add("nav--visible");
  };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
}

/* ---------------- line splitting ---------------- */

function splitLines(el) {
  const text = el.textContent.trim();
  el.textContent = "";
  const frag = document.createDocumentFragment();
  const words = text.split(/\s+/).map((w) => {
    const s = document.createElement("span");
    s.style.display = "inline-block";
    s.textContent = w + " ";
    frag.appendChild(s);
    return s;
  });
  el.appendChild(frag);
  el.classList.add("split-done");
  const lines = [];
  let top = null, cur = [];
  words.forEach((s) => {
    if (s.offsetTop !== top) { if (cur.length) lines.push(cur); cur = []; top = s.offsetTop; }
    cur.push(s);
  });
  if (cur.length) lines.push(cur);
  el.textContent = "";
  return lines.map((ws) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    const inner = document.createElement("span");
    inner.className = "line-inner";
    inner.textContent = ws.map((x) => x.textContent).join("").trim();
    mask.appendChild(inner);
    el.appendChild(mask);
    el.appendChild(document.createTextNode(" "));
    return inner;
  });
}

/* ---------------- sliders ---------------- */

let animateLines = null; // set by initMotion; slider uses it when available

function initHeroSlider() {
  const slides = [...document.querySelectorAll(".hero__slide")];
  const dots = [...document.querySelectorAll(".hero__dot")];
  if (!slides.length) return;
  let idx = 0, timer = null;
  const go = (n) => {
    slides[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
    if (animateLines) animateLines(slides[idx]);
  };
  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(idx + 1), 6200);
  };
  dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.dot); restart(); }));
  restart();
}

function initReviewsSlider() {
  const items = [...document.querySelectorAll(".review")];
  const dots = [...document.querySelectorAll(".reviews__dot")];
  if (!items.length) return;
  let idx = 0, timer = null;
  const go = (n) => {
    items[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (n + items.length) % items.length;
    items[idx].classList.add("active");
    dots[idx].classList.add("active");
  };
  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(idx + 1), 7000);
  };
  dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.rdot); restart(); }));
  restart();
}

/* ---------------- motion ---------------- */

function revealAllInstant() {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  document.querySelectorAll("[data-split]").forEach((el) => el.classList.add("split-done"));
  const curtain = document.getElementById("curtain");
  if (curtain) curtain.remove();
}

async function initMotion() {
  if (reduceMotion) { revealAllInstant(); return; }
  let M;
  try {
    M = await import("https://cdn.jsdelivr.net/npm/motion@12/+esm");
  } catch (err) {
    revealAllInstant();
    return;
  }
  const { animate, inView, stagger } = M;
  const easeReveal = [0.25, 1, 0.5, 1];
  const easeConceal = [0.5, 0, 0.75, 0];

  // Split all titles once fonts are ready so line breaks are correct
  const splitMap = new Map();
  const doSplit = () => {
    document.querySelectorAll("[data-split]").forEach((el) => {
      if (!splitMap.has(el)) splitMap.set(el, splitLines(el));
    });
  };
  if (document.fonts && document.fonts.ready) {
    try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch (_) {}
  }
  doSplit();

  animateLines = (root) => {
    root.querySelectorAll(".line-inner").forEach((inner) => { inner.style.transform = "translateY(110%)"; });
    animate(
      root.querySelectorAll(".line-inner"),
      { y: ["110%", "0%"] },
      { duration: 1.0, delay: stagger(0.12), ease: easeReveal }
    );
  };

  // Load: curtain conceals upward, then hero slide 1 lines reveal
  const curtain = document.getElementById("curtain");
  animate(curtain, { y: ["0%", "-101%"] }, { duration: 0.9, ease: easeConceal, delay: 0.1 })
    .finished.then(() => curtain.remove());
  setTimeout(() => {
    const active = document.querySelector(".hero__slide.active");
    if (active) animateLines(active);
    animate(".hero__eyebrow, .hero__ctas, .hero__wordmark-top, .hero__dots", { opacity: [0, 1] }, { duration: 1.1, delay: 0.75, ease: easeReveal });
  }, 500);

  // Scroll reveals
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(node, { opacity: 1, y: [24, 0] }, { duration: 1.0, ease: easeReveal });
      node.classList.add("visible");
      return false;
    },
    { amount: 0.2, margin: "0px 0px -8% 0px" }
  );
  // Split titles below the hero reveal on view
  document.querySelectorAll("main [data-split], footer [data-split]").forEach((el) => {
    if (el.closest(".hero")) return;
    el.querySelectorAll(".line-inner").forEach((inner) => { inner.style.transform = "translateY(110%)"; });
    inView(
      el,
      () => {
        animateLines(el);
        return false;
      },
      { amount: 0.4 }
    );
  });
  // Never leave content stuck hidden
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("visible");
    });
  });
}

/* ---------------- boot ---------------- */

bindText();
renderHead();
renderHero();
renderMenu();
renderReviews();
renderHours();
initNav();
initReviewsSlider();
initMotion().then(() => initHeroSlider());
