/* Aurelle / Template 1. Renders everything from BUSINESS (js/data.js),
   then wires motion. If the Motion CDN import fails or the user prefers
   reduced motion, all content is revealed instantly: nothing ever stays
   hidden. */

const B = window.BUSINESS;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    h1: "Medical aesthetics in " + B.city,
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
    '<rect width="64" height="64" rx="14" fill="#33544a"/>' +
    '<text x="32" y="43" font-family="Georgia, serif" font-size="34" fill="#f7f2ea" text-anchor="middle">' + initial + "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title = B.name + " | Med Spa in " + B.city + " | Botox, Laser & Skin Care";
  const desc =
    B.name + " is a med spa in " + B.city + ", " + B.state + ". " +
    "Botox, fillers, laser hair removal, HydraFacial and more. Call " + B.phone + " to book.";
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
  const track = document.getElementById("svcTrack");
  track.innerHTML = B.services
    .map(
      (s) => `
    <article class="service-card">
      <div class="service-card__img"><img src="${s.image}" alt="${s.title} at ${B.name} in ${B.city}" loading="lazy" /></div>
      <h3 class="service-card__label">${s.title}</h3>
      <p class="service-card__blurb">${s.blurb}</p>
    </article>`
    )
    .join("");
}

function renderConcerns() {
  const ol = document.getElementById("concernsList");
  ol.innerHTML = B.concerns
    .map((c, i) => `<li><a href="#services"><span class="num">0${i + 1}</span>${c}</a></li>`)
    .join("");
}

function renderApproach() {
  const wrap = document.getElementById("approachSlides");
  wrap.innerHTML = B.approach
    .map(
      (a, i) => `
    <div class="approach__slide${i === 0 ? " active" : ""}">
      <img src="${a.image}" alt="" loading="lazy" />
      <div class="approach__scrim"></div>
      <div class="approach__content">
        <div class="approach__texts">
          <span class="approach__num">0${i + 1} / 0${B.approach.length}</span>
          <h3 class="approach__title">${a.title}</h3>
          <p class="approach__text">${a.text}</p>
        </div>
        <img class="approach__card" src="${a.card}" alt="" loading="lazy" />
      </div>
    </div>`
    )
    .join("");
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  grid.innerHTML = B.reviews
    .map(
      (r) => `
    <blockquote class="review reveal">
      <div class="review__stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}</div>
      <p class="review__quote">"${r.quote}"</p>
      <footer class="review__author">${r.author}</footer>
    </blockquote>`
    )
    .join("");
}

function renderHours() {
  const days = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
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
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) nav.classList.add("nav--visible");
  };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
}

/* ---------------- sliders (work without Motion) ---------------- */

function initServicesCarousel() {
  const track = document.getElementById("svcTrack");
  const step = () => (track.querySelector(".service-card")?.offsetWidth || 320) + 32;
  document.getElementById("svcPrev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
  document.getElementById("svcNext").addEventListener("click", () => track.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
}

function initApproachSlider() {
  const slides = [...document.querySelectorAll(".approach__slide")];
  if (!slides.length) return;
  let idx = 0;
  let timer = null;
  const go = (n) => {
    slides[idx].classList.remove("active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("active");
  };
  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go(idx + 1), 5200);
  };
  document.getElementById("appPrev").addEventListener("click", () => { go(idx - 1); restart(); });
  document.getElementById("appNext").addEventListener("click", () => { go(idx + 1); restart(); });
  const section = document.querySelector(".approach");
  section.addEventListener("mouseenter", () => timer && clearInterval(timer));
  section.addEventListener("mouseleave", restart);
  restart();
}

/* ---------------- motion ---------------- */

function revealAllInstant() {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
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
  const { animate, scroll, inView } = M;
  const easeReveal = [0.25, 1, 0.5, 1];

  // Curtain wipe on load, then hero settles in
  const curtain = document.getElementById("curtain");
  animate(curtain, { y: ["0%", "-101%"] }, { duration: 1.05, ease: easeReveal, delay: 0.15 })
    .finished.then(() => curtain.remove());
  animate(".hero__top", { opacity: [0, 1], y: [14, 0] }, { duration: 0.8, delay: 0.75, ease: easeReveal });
  animate(".hero__bottom", { opacity: [0, 1], y: [22, 0] }, { duration: 0.8, delay: 0.9, ease: easeReveal });

  // Scroll reveals: deterministic, never stuck hidden
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(node, { opacity: 1, y: [26, 0] }, { duration: 0.85, ease: easeReveal });
      node.classList.add("visible");
      return false;
    },
    { amount: 0.2, margin: "0px 0px -10% 0px" }
  );
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("visible");
    });
  });

  // Soft parallax on tagged media
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const target = el.closest("section, header") || el;
    scroll(animate(el, { y: [-40, 40] }, { ease: "linear" }), {
      target,
      offset: ["start end", "end start"],
    });
  });

  // Mouse-follow floating images (fine pointers only)
  if (window.matchMedia("(pointer: fine)").matches) {
    const floats = [...document.querySelectorAll(".brand__float")];
    const strengths = [22, 34, 27];
    let mx = 0, my = 0, running = false;
    const cur = floats.map(() => ({ x: 0, y: 0 }));
    const tick = () => {
      let alive = false;
      floats.forEach((el, i) => {
        const c = cur[i];
        c.x += (mx * strengths[i] - c.x) * 0.06;
        c.y += (my * strengths[i] - c.y) * 0.06;
        el.style.transform = `translate(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px)`;
        if (Math.abs(c.x - mx * strengths[i]) > 0.1) alive = true;
      });
      if (alive) requestAnimationFrame(tick);
      else running = false;
    };
    document.querySelector(".brand").addEventListener("mousemove", (e) => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
      if (!running) { running = true; requestAnimationFrame(tick); }
    });
  }
}

/* ---------------- boot ---------------- */

bindText();
renderHead();
renderServices();
renderConcerns();
renderApproach();
renderReviews();
renderHours();
initNav();
initServicesCarousel();
initApproachSlider();
initMotion();
