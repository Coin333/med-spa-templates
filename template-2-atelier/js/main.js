/* Maison Vera / Template 2. Renders everything from BUSINESS (js/data.js),
   then wires motion:
     - Lenis smooth scrolling site-wide
     - a pinned, scroll-scrubbed header (fullscreen media zoom -> nav theme
       swap -> venetian-blind gold wipe -> rising cream arch panel -> an
       arch-topped image with eyebrow / glyph / statement)
     - images that expand from the top-left with a speed ramp
     - headings whose letters rise up one at a time
   If the Motion CDN import fails or reduced motion is preferred, the header
   collapses to a plain hero and everything is shown instantly. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const telHref = "tel:+1" + B.phone.replace(/\D/g, "");

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
/* map p from [a,b] into [c,d], clamped to the output range */
const mapRange = (p, a, b, c, d) =>
  c + clamp((p - a) / (b - a), 0, 1) * (d - c);

const GLYPH =
  '<svg viewBox="0 0 48 26" fill="none" stroke="currentColor" stroke-width="1.1" ' +
  'stroke-linecap="round" aria-hidden="true">' +
  '<path d="M24 13C18 4 4 4 4 13c0 6 14 6 20-4 6 10 20 10 20 4 0-9-14-9-20 0z"/>' +
  '<circle cx="24" cy="13" r="1.5" fill="currentColor" stroke="none"/></svg>';

/* ---------------- rendering ---------------- */

function bindText() {
  const values = {
    name: B.name,
    tagline: B.tagline,
    phone: B.phone,
    address: B.address,
    city: B.city,
    about: B.about,
    email: B.email,
    instagram: B.instagram,
    mapNote: B.mapNote,
    year: String(new Date().getFullYear()),
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
    '<text x="32" y="44" font-family="Georgia, serif" font-size="36" fill="#fbfaf8" text-anchor="middle">' +
    initial +
    "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title =
    B.name + " | Med Spa in " + B.city + " | Injectables, Laser & Skin Care";
  const desc =
    B.name +
    " is a med spa in " +
    B.city +
    ", " +
    B.state +
    ". " +
    "Botox, dermal fillers, laser treatments, HydraFacial and medical skin care. Call " +
    B.phone +
    " to book.";
  document.querySelector('meta[name="description"]').content = desc;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = desc;

  const days = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };
  const spec = Object.entries(B.hours)
    .filter(([, v]) => !/closed/i.test(v))
    .map(([d, v]) => {
      const m = v.match(/(\d+)(am|pm)\s*-\s*(\d+)(am|pm)/i);
      if (!m) return null;
      const to24 = (h, ap) =>
        String((+h % 12) + (ap.toLowerCase() === "pm" ? 12 : 0)).padStart(
          2,
          "0",
        ) + ":00";
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days[d],
        opens: to24(m[1], m[2]),
        closes: to24(m[3], m[4]),
      };
    })
    .filter(Boolean);
  const [street, cityPart, stateZip] = B.address
    .split(",")
    .map((s) => s.trim());
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

/* The pinned scroll-stage that replaces the old hero slider. Built from
   BUSINESS so a rebrand still only touches js/data.js + /assets. */
function renderHeroStage() {
  const stage = document.getElementById("top");
  if (!stage) return;
  const blinds = Array.from(
    { length: 12 },
    () => '<span class="blind"></span>',
  ).join("");
  stage.innerHTML = `
    <div class="stage__pin">
      <div class="stage__media" id="stageMedia">
        <img src="assets/hero-1.webp" alt="" fetchpriority="high" />
        <div class="stage__scrim"></div>
      </div>
      <div class="stage__blinds" id="stageBlinds" aria-hidden="true">${blinds}</div>
      <div class="stage__copy" id="stageCopy">
        <h1 class="stage__title" data-split>A more considered kind of beautiful</h1>
        <a class="pill" href="${telHref}">Book your consult</a>
      </div>
      <div class="stage__badge" aria-hidden="true">
        <span>By appointment</span><span>${B.city}</span>
      </div>
      <div class="arch" id="stageArch">
        <div class="arch__wash" aria-hidden="true"></div>
        <div class="arch__inner">
          <span class="eyebrow arch__eyebrow">${B.city}&rsquo;s considered med spa</span>
          <span class="arch__glyph" aria-hidden="true">${GLYPH}</span>
          <figure class="arch__figure arch-top">
            <img src="assets/hero-2.webp" alt="Inside ${B.name}" loading="lazy" />
          </figure>
          <h2 class="arch__statement">Beauty is built slowly</h2>
        </div>
      </div>
    </div>`;
}

function renderMenu() {
  document.getElementById("menuRows").innerHTML = B.services
    .map(
      (s) => `
    <div class="menu-row reveal">
      <h3 class="menu-row__name">${s.title}</h3>
      <p class="menu-row__blurb">${s.blurb}</p>
    </div>`,
    )
    .join("");
}

function renderReviews() {
  document.getElementById("reviewsWrap").innerHTML = B.reviews
    .map(
      (r, i) => `
    <blockquote class="review${i === 0 ? " active" : ""}" data-review="${i}">
      <p class="review__quote">"${r.quote}"</p>
      <div class="review__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>
      <footer class="review__author">${r.author}</footer>
    </blockquote>`,
    )
    .join("");
  document.getElementById("reviewsDots").innerHTML = B.reviews
    .map(
      (_, i) =>
        `<button class="reviews__dot${i === 0 ? " active" : ""}" data-rdot="${i}" role="tab" aria-selected="${i === 0 ? "true" : "false"}" aria-label="Review ${i + 1}"></button>`,
    )
    .join("");
}

function renderHours() {
  const days = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };
  document.getElementById("hoursTable").innerHTML = Object.entries(B.hours)
    .map(([d, v]) => `<tr><td>${days[d]}</td><td>${v}</td></tr>`)
    .join("");
}

/* ---------------- lenis smooth scroll ---------------- */

let lenis = null;
function initLenis() {
  if (reduceMotion || !window.Lenis) return;
  lenis = new window.Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
  });
  window.lenis = lenis;
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* In-page anchors go through Lenis so nav jumps stay smooth. */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -72 });
      else
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
}

/* ---------------- nav + mobile menu ---------------- */

function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => {
    // transparent + light while sitting over the hero media
    nav.classList.toggle("nav--over", window.scrollY < innerHeight * 0.3);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const toggle = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  burger.addEventListener("click", () =>
    toggle(!menu.classList.contains("open")),
  );
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => toggle(false)));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });
}

/* ---------------- character splitting ---------------- */

/* Wrap every character of a heading in a masked, inline-block span so the
   letters can rise up one at a time from behind their own baseline. */
function splitChars(el) {
  const text = el.textContent.trim();
  el.textContent = "";
  const inners = [];
  const words = text.split(/\s+/);
  words.forEach((word, wi) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";
    wordSpan.style.whiteSpace = "nowrap";
    [...word].forEach((ch) => {
      const mask = document.createElement("span");
      mask.className = "char-mask";
      const inner = document.createElement("span");
      inner.className = "char-inner";
      inner.textContent = ch;
      mask.appendChild(inner);
      wordSpan.appendChild(mask);
      inners.push(inner);
    });
    el.appendChild(wordSpan);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.classList.add("split-done");
  return inners;
}

/* ---------------- reviews slider ---------------- */

function initReviewsSlider() {
  const items = [...document.querySelectorAll(".review")];
  const dots = [...document.querySelectorAll(".reviews__dot")];
  if (!items.length) return;
  let idx = 0,
    timer = null;
  const go = (n) => {
    items[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    dots[idx].setAttribute("aria-selected", "false");
    idx = (n + items.length) % items.length;
    items[idx].classList.add("active");
    dots[idx].classList.add("active");
    dots[idx].setAttribute("aria-selected", "true");
  };
  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(idx + 1), 7000);
  };
  dots.forEach((d) =>
    d.addEventListener("click", () => {
      go(+d.dataset.rdot);
      restart();
    }),
  );
  restart();
}

/* ---------------- image reveal (expand from top-left) ---------------- */

/* Runs independently of the Motion CDN so images always appear even if the
   import fails. CSS drives the clip-path expand + speed-ramp easing; JS only
   toggles the .shown class when the image scrolls into view. */
function initImageReveal() {
  const imgs = [...document.querySelectorAll(".img-reveal")];
  if (!imgs.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    imgs.forEach((el) => el.classList.add("shown"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("shown");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );
  imgs.forEach((el) => io.observe(el));
}

/* ---------------- scroll-scrubbed header stage ---------------- */

function initStageScroll(M) {
  const stage = document.getElementById("top");
  const media = document.getElementById("stageMedia");
  const blinds = [...document.querySelectorAll("#stageBlinds .blind")];
  const copy = document.getElementById("stageCopy");
  const badge = stage.querySelector(".stage__badge");
  const arch = document.getElementById("stageArch");
  const eyebrow = stage.querySelector(".arch__eyebrow");
  const glyph = stage.querySelector(".arch__glyph");
  const figure = stage.querySelector(".arch__figure");
  const statement = stage.querySelector(".arch__statement");
  const N = blinds.length || 1;

  const apply = (p) => {
    // 1. fullscreen media zooms in
    media.style.transform = `scale(${mapRange(p, 0, 0.55, 1, 1.16)})`;
    // 2. hero copy lifts and fades away
    const copyP = mapRange(p, 0.04, 0.24, 0, 1);
    copy.style.transform = `translateY(${copyP * -70}px)`;
    copy.style.opacity = `${1 - copyP}`;
    badge.style.opacity = `${1 - mapRange(p, 0.12, 0.3, 0, 1)}`;
    // 3. venetian blinds close over the media (staggered)
    blinds.forEach((b, i) => {
      const start = 0.14 + (i / N) * 0.12;
      b.style.transform = `scaleX(${mapRange(p, start, start + 0.16, 0, 1)})`;
    });
    // 4. cream arch panel rises up over the gold field
    arch.style.transform = `translateY(${mapRange(p, 0.3, 0.74, 100, 0)}%)`;
    // 5. eyebrow + glyph fade and rise inside the arch
    const eP = mapRange(p, 0.5, 0.66, 0, 1);
    eyebrow.style.opacity = `${eP}`;
    eyebrow.style.transform = `translateY(${(1 - eP) * 26}px)`;
    glyph.style.opacity = `${mapRange(p, 0.56, 0.7, 0, 1)}`;
    // 6. arch-topped image rises + scales in
    const fP = mapRange(p, 0.6, 0.88, 0, 1);
    figure.style.opacity = `${mapRange(p, 0.6, 0.72, 0, 1)}`;
    figure.style.transform = `translateY(${(1 - fP) * 60}%) scale(${0.92 + fP * 0.08})`;
    // 7. statement rises in, finishing before the pin releases so the
    //    fully composed arch holds a settled beat instead of still moving
    //    as the stage un-pins (that mid-motion handoff read as a jolt)
    statement.style.transform = `translateY(${mapRange(p, 0.78, 0.9, 92, 6)}%)`;
  };

  apply(0);
  M.scroll(apply, { target: stage, offset: ["start start", "end end"] });
}

/* ---------------- motion boot ---------------- */

function staticFallback() {
  const stage = document.getElementById("top");
  if (stage) stage.classList.add("is-static");
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
  document
    .querySelectorAll("[data-split]")
    .forEach((el) => el.classList.add("split-done"));
  document
    .querySelectorAll(".img-reveal")
    .forEach((el) => el.classList.add("shown"));
  const curtain = document.getElementById("curtain");
  if (curtain) curtain.remove();
}

async function initMotion() {
  if (reduceMotion) {
    staticFallback();
    return;
  }
  let M;
  try {
    M = await import("https://cdn.jsdelivr.net/npm/motion@12/+esm");
  } catch (err) {
    staticFallback();
    return;
  }
  const { animate, inView, stagger } = M;
  const easeReveal = [0.25, 1, 0.5, 1];
  const easeConceal = [0.5, 0, 0.75, 0];

  // Split headings once fonts are ready so line breaks + char widths are right
  if (document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 1500)),
      ]);
    } catch (_) {}
  }
  const splitMap = new Map();
  document
    .querySelectorAll("[data-split]")
    .forEach((el) => splitMap.set(el, splitChars(el)));

  // letters rise up one at a time, at a semi-soft pace
  const riseChars = (chars) => {
    chars.forEach((c) => {
      c.style.transform = "translateY(110%)";
    });
    animate(
      chars,
      { y: ["110%", "0%"] },
      { duration: 0.55, delay: stagger(0.022), ease: easeReveal },
    );
  };

  // load: espresso curtain conceals upward
  const curtain = document.getElementById("curtain");
  if (curtain) {
    animate(
      curtain,
      { y: ["0%", "-101%"] },
      { duration: 0.9, ease: easeConceal, delay: 0.1 },
    ).finished.then(() => curtain.remove());
  }

  // hero headline letters rise, then the pill + badge fade in
  const heroTitle = document.querySelector(".stage__title");
  if (heroTitle && splitMap.has(heroTitle))
    setTimeout(() => riseChars(splitMap.get(heroTitle)), 480);
  animate(
    ".stage__copy .pill, .stage__badge",
    { opacity: [0, 1] },
    { duration: 1, delay: 0.8, ease: easeReveal },
  );

  // scroll-scrubbed header sequence
  initStageScroll(M);

  // section headings: letters rise when scrolled into view (skip the stage ones)
  splitMap.forEach((chars, el) => {
    if (el.closest(".stage")) return;
    chars.forEach((c) => {
      c.style.transform = "translateY(110%)";
    });
    inView(
      el,
      () => {
        riseChars(chars);
        return false;
      },
      { amount: 0.35 },
    );
  });

  // generic fade/rise reveals
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(
        node,
        { opacity: 1, y: [24, 0] },
        { duration: 1.0, ease: easeReveal },
      );
      node.classList.add("visible");
      return false;
    },
    { amount: 0.2, margin: "0px 0px -8% 0px" },
  );

  // never leave content stuck hidden
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
renderHeroStage();
renderMenu();
renderReviews();
renderHours();
initLenis();
initNav();
initAnchors();
initReviewsSlider();
initImageReveal();
initMotion();
