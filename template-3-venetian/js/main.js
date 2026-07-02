/* Cove Aesthetics / Template 3. Renders everything from BUSINESS
   (js/data.js), then wires the cinematic scrub motion: blind-strip
   hero unfurl, arch radius morph, pinned image drift with mouse
   parallax, masked line reveals. If the Motion CDN import fails or
   reduced motion is preferred, everything is shown instantly. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const telHref = "tel:+1" + B.phone.replace(/\D/g, "");

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
  document.querySelectorAll("[data-bind-inline]").forEach((el) => {
    const v = values[el.dataset.bindInline];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const kind = el.dataset.bindHref;
    if (kind === "tel") el.href = telHref;
    if (kind === "email") el.href = "mailto:" + B.email;
  });
  document.querySelectorAll("[data-bind-alt]").forEach((el) => {
    el.alt = "The studio at " + B.name + ", a med spa in " + B.city;
  });
  document.getElementById("escapeBody").textContent =
    "Every appointment at " + B.name + " starts with ten quiet minutes: a warm towel, a skin scan, and a plan. " +
    "Then the treatment, with the ocean two blocks away and nowhere else you need to be.";
  document.getElementById("driftGlyph").textContent = B.name.trim().charAt(0).toUpperCase();
}

function renderHead() {
  const initial = B.name.trim().charAt(0).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="32" fill="#1f4e4a"/>' +
    '<text x="32" y="43" font-family="Georgia, serif" font-size="32" fill="#efe7da" text-anchor="middle">' + initial + "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title = B.name + " | Med Spa in " + B.city + " | Botox, Laser & Facials";
  const desc =
    B.name + " is a med spa in " + B.city + ", " + B.state + ". " +
    "Botox, fillers, laser hair removal, HydraFacial, body contouring and IV therapy. Call " + B.phone + " to book.";
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
    image: "assets/hero.webp",
    priceRange: "$$",
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
}

function renderServices() {
  document.getElementById("svcTrack").classList.add("reveal");
  document.getElementById("svcTrack").innerHTML = B.services.map(
    (s) => `
    <article class="service-card">
      <div class="service-card__img"><img src="${s.image}" alt="${s.title} at ${B.name} in ${B.city}" loading="lazy" /></div>
      <h3>${s.title}</h3>
      <p>${s.blurb}</p>
    </article>`
  ).join("");
}

function renderGallery() {
  const imgs = [
    "assets/service-filler.webp", "assets/service-microneedling.webp",
    "assets/service-contouring.webp", "assets/service-iv.webp",
  ];
  document.getElementById("galleryGrid").innerHTML = imgs.map(
    (src, i) => `<div class="gallery__item reveal"><img src="${src}" alt="Treatment results at ${B.name}, photo ${i + 1}" loading="lazy" /></div>`
  ).join("");
}

function renderReviews() {
  document.getElementById("reviewsGrid").innerHTML = B.reviews.map(
    (r) => `
    <blockquote class="review reveal">
      <div class="review__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>
      <p class="review__quote">"${r.quote}"</p>
      <footer class="review__author">${r.author}</footer>
    </blockquote>`
  ).join("");
}

function renderHours() {
  const days = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
  document.getElementById("hoursTable").innerHTML = Object.entries(B.hours)
    .map(([d, v]) => `<tr><td>${days[d]}</td><td>${v}</td></tr>`)
    .join("");
}

/* ---------------- nav ---------------- */

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

function initServicesCarousel() {
  const track = document.getElementById("svcTrack");
  const step = () => (track.querySelector(".service-card")?.offsetWidth || 320) + 22;
  document.getElementById("svcPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
  document.getElementById("svcNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
}

/* ---------------- line splitting (shared pattern) ---------------- */

function splitLines(el) {
  const text = el.textContent.replace(/\s+/g, " ").trim();
  el.textContent = "";
  const frag = document.createDocumentFragment();
  const words = text.split(" ").map((w) => {
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
    inner.textContent = ws.map((x) => x.textContent).join("").replace(/ /g, " ").trim();
    mask.appendChild(inner);
    el.appendChild(mask);
    el.appendChild(document.createTextNode(" "));
    return inner;
  });
}

/* ---------------- motion ---------------- */

function revealAllInstant() {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  document.querySelectorAll("[data-split]").forEach((el) => el.classList.add("split-done"));
  const blinds = document.getElementById("blinds");
  if (blinds) blinds.remove();
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

  // Blind strips: build 9 strips, unfurl on load, staggered
  const blinds = document.getElementById("blinds");
  for (let i = 0; i < 9; i++) {
    const strip = document.createElement("span");
    strip.className = "blind";
    blinds.appendChild(strip);
  }
  animate(
    blinds.children,
    { scaleX: [1, 0] },
    { duration: 1.1, delay: stagger(0.07, { startDelay: 0.2 }), ease: easeReveal }
  ).finished.then(() => blinds.remove());
  animate("#heroImg", { scale: [1.12, 1] }, { duration: 1.8, ease: easeReveal });

  // Wait for fonts before splitting titles
  if (document.fonts && document.fonts.ready) {
    try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch (_) {}
  }
  const heroTitle = document.querySelector(".hero__title");
  const heroLines = splitLines(heroTitle);
  heroLines.forEach((l) => (l.style.transform = "translateY(110%)"));
  animate(heroLines, { y: ["110%", "0%"] }, { duration: 1.0, delay: stagger(0.12, { startDelay: 0.55 }), ease: easeReveal });
  animate(".hero__eyebrow, .hero__content .pill, .hero__scroll-cue", { opacity: [0, 1] }, { duration: 1.0, delay: 1.1, ease: easeReveal });

  document.querySelectorAll("[data-split]").forEach((el) => {
    if (el === heroTitle) return;
    const lines = splitLines(el);
    lines.forEach((l) => (l.style.transform = "translateY(110%)"));
    inView(el, () => {
      animate(lines, { y: ["110%", "0%"] }, { duration: 0.95, delay: stagger(0.1), ease: easeReveal });
      return false;
    }, { amount: 0.4 });
  });

  // Scroll reveals
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(node, { opacity: 1, y: [30, 0] }, { duration: 0.9, ease: easeReveal });
      node.classList.add("visible");
      return false;
    },
    { amount: 0.15, margin: "0px 0px -8% 0px" }
  );
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("visible");
    });
  });

  // Scrubbed effects (arch morph + pinned drift), manual scroll math
  const panel = document.getElementById("aboutPanel");
  const drift = document.querySelector(".drift");
  const glyph = document.getElementById("driftGlyph");
  const imgs = [
    { el: document.getElementById("drift1"), speed: 130 },
    { el: document.getElementById("drift2"), speed: 190 },
    { el: document.getElementById("drift3"), speed: 160 },
    { el: document.getElementById("drift4"), speed: 220 },
  ];
  const mouse = { x: 0, y: 0 };
  let scrollP = 0;
  const applyDrift = () => {
    imgs.forEach((it, i) => {
      const y = (0.5 - scrollP) * it.speed;
      const mx = mouse.x * (10 + i * 6);
      const my = mouse.y * (8 + i * 5);
      it.el.style.transform = `translate(${mx.toFixed(1)}px, calc(${y.toFixed(2)}vh + ${my.toFixed(1)}px))`;
    });
    glyph.style.transform = `scale(${(1 + scrollP * 0.75).toFixed(3)})`;
    glyph.style.opacity = String(1 - scrollP * 0.5);
  };
  let ticking = false;
  const onScrub = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      // arch morph: 0 when panel top at viewport bottom, 1 when it reaches 45% height
      const pr = panel.getBoundingClientRect();
      const ap = Math.min(1, Math.max(0, (innerHeight - pr.top) / (innerHeight * 0.55)));
      const max = innerWidth < 700 ? 120 : 320;
      const min = innerWidth < 700 ? 48 : 110;
      const r = Math.round(max - (max - min) * ap);
      panel.style.borderRadius = r + "px " + r + "px 0 0";
      // drift progress across its 300vh height
      const dr = drift.getBoundingClientRect();
      const total = dr.height - innerHeight;
      scrollP = Math.min(1, Math.max(0, -dr.top / total));
      applyDrift();
    });
  };
  addEventListener("scroll", onScrub, { passive: true });
  addEventListener("resize", onScrub, { passive: true });
  onScrub();
  if (window.matchMedia("(pointer: fine)").matches) {
    drift.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / innerHeight - 0.5) * 2;
      applyDrift();
    });
  }
}

/* ---------------- boot ---------------- */

bindText();
renderHead();
renderServices();
renderGallery();
renderReviews();
renderHours();
initNav();
initServicesCarousel();
initMotion();
