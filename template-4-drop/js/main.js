/* Studio Lumen / Template 4. Renders everything from BUSINESS
   (js/data.js), then wires the scrub motion: 300vh monogram-mask
   hero reveal, sticky horizontal treatment panels, count-up numeral,
   custom cursor, dense gallery reveals. All scrub math is manual
   (rAF-throttled scroll listener). If the Motion CDN import fails
   or reduced motion is preferred, everything renders fully visible. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const telHref = "tel:+1" + B.phone.replace(/\D/g, "");

/* ---------------- rendering ---------------- */

function bindText() {
  const values = {
    name: B.name,
    tagline: B.tagline,
    phone: B.phone,
    address: B.address,
    city: B.city,
    cityState: B.city + ", " + B.state,
    about: B.about,
    email: B.email,
    instagram: B.instagram,
    mapNote: B.mapNote,
    year: String(new Date().getFullYear()),
    h1: "Laser, skin & injectables in " + B.city,
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
  document.querySelectorAll("[data-bind-alt]").forEach((el) => {
    el.alt = "Portrait at " + B.name + ", a med spa in " + B.city;
  });
}

function renderHead() {
  const initial = B.name.trim().charAt(0).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" fill="#191919"/>' +
    '<text x="32" y="45" font-family="Georgia, serif" font-size="38" font-weight="600" fill="#fafaf8" text-anchor="middle">' +
    initial +
    "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title =
    B.name + " | Med Spa in " + B.city + " | Laser, Botox & Skin";
  const desc =
    B.name +
    " is a device-led med spa in " +
    B.city +
    ", " +
    B.state +
    ". " +
    "Laser treatments, Botox, fillers, HydraFacial and body contouring. Call " +
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
    image: "assets/hero.webp",
    priceRange: "$$",
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

function renderPanels() {
  // one panel per treatment family, titled by the family, listing its services
  const families = [];
  const byImage = new Map();
  B.services.forEach((s) => {
    if (!byImage.has(s.image)) {
      const m = s.image.match(/panel-([a-z]+)/);
      const label = m ? m[1].charAt(0).toUpperCase() + m[1].slice(1) : s.title;
      const fam = { label, image: s.image, items: [] };
      byImage.set(s.image, fam);
      families.push(fam);
    }
    byImage.get(s.image).items.push(s.title);
  });
  document.getElementById("panelsRow").innerHTML = families
    .map(
      (f, i) => `
    <div class="panel">
      <img src="${f.image}" alt="${f.label} treatments at ${B.name} in ${B.city}" loading="lazy" />
      <div class="panel__meta">
        <span class="panel__num">0${i + 1} / 0${families.length}</span>
        <h3 class="panel__name">${f.label}</h3>
        <p class="panel__blurb">${f.items.join(" / ")}</p>
      </div>
    </div>`,
    )
    .join("");
}

function renderMenuList() {
  document.getElementById("menuList").innerHTML = B.services
    .map((s, i) => `<li><span>0${i + 1}</span>${s.title}</li>`)
    .join("");
  const count = document.getElementById("countUp");
  count.textContent = "0" + B.services.length;
}

function renderGallery() {
  const imgs = [
    "assets/gallery-1.webp",
    "assets/gallery-2.webp",
    "assets/gallery-3.webp",
    "assets/gallery-4.webp",
    "assets/panel-laser.webp",
    "assets/panel-facials.webp",
    "assets/panel-injectables.webp",
    "assets/panel-body.webp",
  ];
  document.getElementById("galleryGrid").innerHTML = imgs
    .map(
      (src, i) =>
        `<div class="gallery__item reveal-media" style="--i:${i % 4}"><img src="${src}" alt="Studio archive photo ${i + 1} at ${B.name}" loading="lazy" /></div>`,
    )
    .join("");
}

function renderReviews() {
  document.getElementById("reviewsWrap").innerHTML = B.reviews
    .map(
      (r, i) => `
    <blockquote class="review reveal" style="--i:${i}">
      <span class="review__idx">0${i + 1}</span>
      <p class="review__quote">"${r.quote}"</p>
      <div class="review__meta">
        <span class="review__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</span>
        <span class="review__author">${r.author}</span>
      </div>
    </blockquote>`,
    )
    .join("");
}

function renderHours() {
  const days = {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  };
  document.getElementById("hoursTable").innerHTML = Object.entries(B.hours)
    .map(([d, v]) => `<tr><td>${days[d]}</td><td>${v}</td></tr>`)
    .join("");
}

/* ---------------- nav ---------------- */

function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const toggle = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    if (open) nav.classList.add("nav--solid");
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

/* ---------------- smooth scroll (Lenis) ---------------- */

async function initLenis() {
  if (reduceMotion) return null;
  let Lenis;
  try {
    const mod = await import("https://cdn.jsdelivr.net/npm/lenis@1/+esm");
    Lenis = mod.default || mod.Lenis || mod;
  } catch (err) {
    return null; // native scroll is a perfectly good fallback
  }
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  window.lenis = lenis;
  return lenis;
}

/* ---------------- scrub motion (manual math) ---------------- */

// Front layer mask: the studio wordmark, sized to fill the width.
function wordmarkMaskUrl() {
  const name = B.name.trim().toUpperCase();
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 240'>" +
    "<text x='500' y='186' text-anchor='middle' textLength='940' lengthAdjust='spacingAndGlyphs' " +
    "font-family='Georgia, \"Times New Roman\", serif' font-weight='700' font-size='190' fill='black'>" +
    name +
    "</text></svg>";
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}

function applyWordmark(el) {
  const url = wordmarkMaskUrl();
  el.style.webkitMaskImage = url;
  el.style.maskImage = url;
  el.style.webkitMaskRepeat = "no-repeat";
  el.style.maskRepeat = "no-repeat";
  el.style.webkitMaskSize = "min(92vw, 1500px) auto";
  el.style.maskSize = "min(92vw, 1500px) auto";
}

function initScrub() {
  const hero = document.querySelector(".hero");
  const heroType = document.getElementById("heroType");
  const veil = document.getElementById("heroVeil");
  const cue = document.getElementById("heroCue");
  const nav = document.getElementById("nav");
  const panels = document.querySelector(".panels");
  const row = document.getElementById("panelsRow");

  applyWordmark(heroType);

  let ticking = false;
  const update = () => {
    ticking = false;
    // hero scrub across the tall sticky scroller
    const hr = hero.getBoundingClientRect();
    const hTotal = hr.height - innerHeight;
    const hp = Math.min(1, Math.max(0, -hr.top / hTotal));

    // the masked wordmark travels up and out; the base washes toward bone as the veil grows
    const yTop = innerHeight * (1.0 - hp * 1.35);
    heroType.style.webkitMaskPosition = "center " + yTop.toFixed(1) + "px";
    heroType.style.maskPosition = "center " + yTop.toFixed(1) + "px";
    heroType.style.opacity =
      hp > 0.86 ? String(Math.max(0, 1 - (hp - 0.86) / 0.14)) : "";
    veil.style.opacity = String(Math.min(0.9, hp * 1.15));
    cue.style.opacity = String(Math.max(0, 1 - hp * 4));

    // once the hero has washed toward bone, the nav goes solid (and stays legible over content below)
    nav.classList.toggle("nav--solid", hp > 0.55);

    // horizontal panels scrub
    const pr = panels.getBoundingClientRect();
    const pTotal = pr.height - innerHeight;
    const pp = Math.min(1, Math.max(0, -pr.top / pTotal));
    const maxX = Math.max(
      0,
      row.scrollWidth -
        innerWidth +
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 4,
    );
    row.style.transform = "translateX(" + (-pp * maxX).toFixed(1) + "px)";
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  if (window.lenis) window.lenis.on("scroll", onScroll);
  update();

  // custom cursor over the panels section
  const dot = document.getElementById("cursorDot");
  if (window.matchMedia("(pointer: fine)").matches) {
    panels.addEventListener("mousemove", (e) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.classList.add("on");
    });
    panels.addEventListener("mouseleave", () => dot.classList.remove("on"));
  }
}

function disableScrubFallback() {
  const hero = document.querySelector(".hero");
  const heroType = document.getElementById("heroType");
  const veil = document.getElementById("heroVeil");
  const nav = document.getElementById("nav");
  // static, legible hero: wordmark centered, faint veil, no tall scroller
  applyWordmark(heroType);
  heroType.style.webkitMaskPosition = "center center";
  heroType.style.maskPosition = "center center";
  hero.style.height = "100vh";
  veil.style.opacity = "0.12";
  nav.classList.add("nav--solid");

  const panels = document.querySelector(".panels");
  panels.style.height = "auto";
  const stage = panels.querySelector(".panels__stage");
  stage.style.position = "static";
  stage.style.height = "auto";
  stage.style.padding = "6rem 0";
  const row = document.getElementById("panelsRow");
  row.style.transform = "none";
  row.style.width = "auto";
  row.style.overflowX = "auto";
}

/* ---------------- reveals + count-up (vanilla, no deps) ---------------- */

function revealAllInstant() {
  document
    .querySelectorAll(".reveal, .reveal-media")
    .forEach((el) => el.classList.add("visible"));
}

function initReveals() {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealAllInstant();
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  document
    .querySelectorAll(".reveal, .reveal-media")
    .forEach((el) => io.observe(el));
  // reveal anything already on-screen at load
  requestAnimationFrame(() => {
    document
      .querySelectorAll(".reveal:not(.visible), .reveal-media:not(.visible)")
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add("visible");
      });
  });
  // failsafe: never leave anything stuck hidden if the observer misses it
  setTimeout(() => {
    document
      .querySelectorAll(".reveal:not(.visible), .reveal-media:not(.visible)")
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 1.25 && r.bottom > -innerHeight * 0.25) {
          el.classList.add("visible");
        }
      });
  }, 2500);
}

function initCountUp() {
  const count = document.getElementById("countUp");
  if (!count) return;
  const to = B.services.length;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    count.textContent = "0" + to;
    return;
  }
  const run = () => {
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      count.textContent = "0" + Math.max(1, Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.6 },
  ).observe(count);
}

/* ---------------- boot ---------------- */

async function boot() {
  bindText();
  renderHead();
  renderPanels();
  renderMenuList();
  renderGallery();
  renderReviews();
  renderHours();
  initNav();
  initReveals();
  initCountUp();

  if (reduceMotion) {
    disableScrubFallback();
  } else {
    await initLenis();
    initScrub();
  }

  // entrance: hero image settles out of a slight zoom, nav fades in
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.documentElement.classList.add("is-loaded"),
    ),
  );
}

boot();
