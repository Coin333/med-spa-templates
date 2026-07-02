/* Cove Aesthetics / Template 3. Renders everything from BUSINESS
   (js/data.js), then wires the cinematic motion: Lenis smooth scroll,
   a top-transparent nav that fills in on scroll, the blind-strip hero
   unfurl, arch radius morph, pinned image drift, one signature
   "developing light" text load-in for headings + lead paragraphs, a
   chronological curtain reveal for images, a smooth custom cursor on
   the services menu, and a rotating "In their words" spotlight. If the
   Motion CDN fails or reduced motion is preferred, everything shows. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const telHref = "tel:+1" + B.phone.replace(/\D/g, "");
let lenis = null;

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
    "Every appointment at " +
    B.name +
    " starts with ten quiet minutes: a warm towel, a skin scan, and a plan. " +
    "Then the treatment, with the ocean two blocks away and nowhere else you need to be.";
  document.getElementById("driftGlyph").textContent = B.name
    .trim()
    .charAt(0)
    .toUpperCase();
}

function renderHead() {
  const initial = B.name.trim().charAt(0).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="32" fill="#1f4e4a"/>' +
    '<text x="32" y="43" font-family="Georgia, serif" font-size="32" fill="#efe7da" text-anchor="middle">' +
    initial +
    "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title =
    B.name + " | Med Spa in " + B.city + " | Botox, Laser & Facials";
  const desc =
    B.name +
    " is a med spa in " +
    B.city +
    ", " +
    B.state +
    ". " +
    "Botox, fillers, laser hair removal, HydraFacial, body contouring and IV therapy. Call " +
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

function renderServices() {
  document.getElementById("svcTrack").innerHTML = B.services
    .map(
      (s) => `
    <article class="service-card">
      <div class="service-card__img img-reveal"><img src="${s.image}" alt="${s.title} at ${B.name} in ${B.city}" loading="lazy" /></div>
      <h3>${s.title}</h3>
      <p>${s.blurb}</p>
    </article>`,
    )
    .join("");
}

function renderGallery() {
  const imgs = [
    "assets/service-filler.webp",
    "assets/service-microneedling.webp",
    "assets/service-contouring.webp",
    "assets/service-iv.webp",
  ];
  document.getElementById("galleryGrid").innerHTML = imgs
    .map(
      (src, i) =>
        `<div class="gallery__item img-reveal"><img src="${src}" alt="Treatment results at ${B.name}, photo ${i + 1}" loading="lazy" /></div>`,
    )
    .join("");
}

function renderReviews() {
  const total = B.reviews.length;
  document.getElementById("reviewSpotlight").innerHTML = B.reviews
    .map(
      (r, i) => `
    <div class="reviews__slide${i === 0 ? " is-active" : ""}" id="review-panel-${i}" role="tabpanel" aria-roledescription="review" aria-label="Review ${i + 1} of ${total}" aria-labelledby="review-tab-${i}"${i === 0 ? "" : ' aria-hidden="true"'}>
      <div class="reviews__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>
      <p class="reviews__quote">${r.quote}</p>
      <div class="reviews__author">${r.author}</div>
    </div>`,
    )
    .join("");
  document.getElementById("revDots").innerHTML = B.reviews
    .map(
      (_, i) =>
        `<button class="reviews__dot${i === 0 ? " is-active" : ""}" id="review-tab-${i}" role="tab" aria-controls="review-panel-${i}" aria-label="Show review ${i + 1}" aria-selected="${i === 0 ? "true" : "false"}"></button>`,
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
  const setScrolled = () =>
    nav.classList.toggle("nav--scrolled", window.scrollY > 40);
  addEventListener("scroll", setScrolled, { passive: true });
  setScrolled();

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

function initServicesCarousel() {
  const track = document.getElementById("svcTrack");
  const step = () =>
    (track.querySelector(".service-card")?.offsetWidth || 320) + 22;
  document.getElementById("svcPrev").addEventListener("click", () =>
    track.scrollBy({
      left: -step(),
      behavior: reduceMotion ? "auto" : "smooth",
    }),
  );
  document.getElementById("svcNext").addEventListener("click", () =>
    track.scrollBy({
      left: step(),
      behavior: reduceMotion ? "auto" : "smooth",
    }),
  );
}

/* ---------------- reviews spotlight ---------------- */

function initReviews() {
  const slides = [...document.querySelectorAll(".reviews__slide")];
  const dots = [...document.querySelectorAll(".reviews__dot")];
  const count = document.getElementById("revCount");
  if (!slides.length) return;
  const total = slides.length;
  let idx = 0,
    timer = 0;

  const go = (n) => {
    idx = (n + total) % total;
    slides.forEach((s, i) => {
      const on = i === idx;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach((d, i) => {
      const on = i === idx;
      d.classList.toggle("is-active", on);
      d.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (count)
      count.textContent =
        String(idx + 1).padStart(2, "0") +
        " / " +
        String(total).padStart(2, "0");
  };
  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = 0;
    }
  };
  const start = () => {
    stop();
    if (!reduceMotion && total > 1)
      timer = setInterval(() => go(idx + 1), 6000);
  };

  document.getElementById("revNext").addEventListener("click", () => {
    go(idx + 1);
    start();
  });
  document.getElementById("revPrev").addEventListener("click", () => {
    go(idx - 1);
    start();
  });
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      go(i);
      start();
    }),
  );

  const region = document.querySelector(".reviews");
  region.addEventListener("mouseenter", stop);
  region.addEventListener("mouseleave", start);
  region.addEventListener("focusin", stop);
  region.addEventListener("focusout", start);

  go(0);
  start();
}

/* ---------------- services (menu) drag-to-scroll ---------------- */

function initServicesDrag() {
  const track = document.getElementById("svcTrack");
  if (!track || !window.matchMedia("(pointer: fine)").matches) return;

  // click-and-drag to scan the carousel horizontally (native cursor kept)
  let down = false,
    moved = false,
    startX = 0,
    startScroll = 0;
  track.addEventListener("pointerdown", (e) => {
    if (e.button && e.button !== 0) return;
    down = true;
    moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("is-dragging");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    track.scrollLeft = startScroll - dx;
  });
  const endDrag = () => {
    if (!down) return;
    down = false;
    track.classList.remove("is-dragging");
  };
  addEventListener("pointerup", endDrag);
  addEventListener("pointercancel", endDrag);
  // suppress the click that follows a drag so cards don't feel jumpy
  track.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
}

/* ---------------- line splitting for the text load-in ---------------- */

function splitLines(el) {
  const text = el.textContent.replace(/\s+/g, " ").trim();
  el.textContent = "";
  const frag = document.createDocumentFragment();
  const words = text.split(" ").map((w) => {
    const s = document.createElement("span");
    s.style.display = "inline-block";
    s.textContent = w + " ";
    frag.appendChild(s);
    return s;
  });
  el.appendChild(frag);
  el.classList.add("split-done");
  const lines = [];
  let top = null,
    cur = [];
  words.forEach((s) => {
    if (s.offsetTop !== top) {
      if (cur.length) lines.push(cur);
      cur = [];
      top = s.offsetTop;
    }
    cur.push(s);
  });
  if (cur.length) lines.push(cur);
  el.textContent = "";
  return lines.map((ws) => {
    const line = document.createElement("span");
    line.className = "lux-line";
    line.textContent = ws
      .map((x) => x.textContent)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    el.appendChild(line);
    el.appendChild(document.createTextNode(" "));
    return line;
  });
}

/* ---------------- smooth scroll (Lenis) ---------------- */

async function initSmoothScroll() {
  if (reduceMotion) return;
  let Lenis;
  try {
    ({ default: Lenis } =
      await import("https://cdn.jsdelivr.net/npm/lenis@1.1.20/+esm"));
  } catch (err) {
    return; // native scrolling
  }
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -76 });
    });
  });
}

/* ---------------- entrances: text + images (native, CDN-independent) ---------------- */

function imgReady(imgEl) {
  return new Promise((res) => {
    if (!imgEl || (imgEl.complete && imgEl.naturalWidth > 0)) return res();
    imgEl.addEventListener("load", () => res(), { once: true });
    imgEl.addEventListener("error", () => res(), { once: true });
  });
}

async function revealSequential(nodes, stagger) {
  for (const node of nodes) {
    if (node.classList.contains("is-in")) continue;
    const img = node.tagName === "IMG" ? node : node.querySelector("img");
    await imgReady(img);
    node.classList.add("is-in");
    if (stagger) await new Promise((r) => setTimeout(r, stagger));
  }
}

function initEntrances() {
  if (reduceMotion) return; // CSS shows everything
  if (!("IntersectionObserver" in window)) {
    document
      .querySelectorAll(".lux-text, .img-reveal, .drift__img")
      .forEach((el) => el.classList.add("is-in"));
    return;
  }

  // lead paragraphs: the signature blur-rise, one at a time as they enter
  const textIO = new IntersectionObserver(
    (entries, ob) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          ob.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll(".lux-text").forEach((el) => textIO.observe(el));

  // images: reveal each group chronologically (in DOM order, as they decode)
  const groups = [
    { sel: "#svcTrack .img-reveal", stagger: 130 },
    { sel: "#galleryGrid .img-reveal", stagger: 150 },
    { sel: ".escape__media.img-reveal", stagger: 0 },
    { sel: ".drift__img", stagger: 120 },
  ];
  groups.forEach((g) => {
    const nodes = [...document.querySelectorAll(g.sel)];
    if (!nodes.length) return;
    let started = false;
    const trigger = () => {
      if (started) return;
      started = true;
      revealSequential(nodes, g.stagger);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          trigger();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
  });
}

/* ---------------- motion (Motion CDN) ---------------- */

function revealAllInstant() {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
  document
    .querySelectorAll("[data-split]")
    .forEach((el) => el.classList.add("split-done"));
  const blinds = document.getElementById("blinds");
  if (blinds) blinds.remove();
}

function primeLines(lines) {
  lines.forEach((l) => {
    l.style.opacity = "0";
    l.style.transform = "translateY(0.5em)";
    l.style.filter = "blur(14px)";
  });
}

async function initMotion() {
  if (reduceMotion) {
    revealAllInstant();
    return;
  }
  let M;
  try {
    M = await import("https://cdn.jsdelivr.net/npm/motion@12/+esm");
  } catch (err) {
    revealAllInstant();
    return;
  }
  const { animate, inView, stagger } = M;
  const easeReveal = [0.25, 1, 0.5, 1];
  const lineTo = {
    opacity: [0, 1],
    y: ["0.5em", "0em"],
    filter: ["blur(14px)", "blur(0px)"],
  };

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
    {
      duration: 1.1,
      delay: stagger(0.07, { startDelay: 0.2 }),
      ease: easeReveal,
    },
  ).finished.then(() => blinds.remove());
  animate(
    "#heroImg",
    { scale: [1.12, 1] },
    { duration: 1.8, ease: easeReveal },
  );

  // Wait for fonts before splitting titles
  if (document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 1500)),
      ]);
    } catch (_) {}
  }
  const heroTitle = document.querySelector(".hero__title");
  const heroLines = splitLines(heroTitle);
  primeLines(heroLines);
  animate(heroLines, lineTo, {
    duration: 1.0,
    delay: stagger(0.1, { startDelay: 0.55 }),
    ease: easeReveal,
  });
  animate(
    ".hero__eyebrow, .hero__content .pill, .hero__scroll-cue",
    { opacity: [0, 1] },
    { duration: 1.0, delay: 1.1, ease: easeReveal },
  );

  document.querySelectorAll("[data-split]").forEach((el) => {
    if (el === heroTitle) return;
    const lines = splitLines(el);
    primeLines(lines);
    inView(
      el,
      () => {
        animate(lines, lineTo, {
          duration: 0.95,
          delay: stagger(0.09),
          ease: easeReveal,
        });
        return false;
      },
      { amount: 0.4 },
    );
  });

  // Scroll reveals for wrapper blocks
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(
        node,
        { opacity: 1, y: [30, 0] },
        { duration: 0.9, ease: easeReveal },
      );
      node.classList.add("visible");
      return false;
    },
    { amount: 0.15, margin: "0px 0px -8% 0px" },
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
      const ap = Math.min(
        1,
        Math.max(0, (innerHeight - pr.top) / (innerHeight * 0.55)),
      );
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
  if (lenis) lenis.on("scroll", onScrub);
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
initReviews();
initServicesDrag();
initSmoothScroll();
initEntrances();
initMotion();

// nav reveals once the hero has settled (or immediately if motion is off)
const navEl = document.getElementById("nav");
if (reduceMotion) navEl.classList.add("nav--ready");
else setTimeout(() => navEl.classList.add("nav--ready"), 1100);
