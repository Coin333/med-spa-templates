/* Skin Care by Kat / Template 1 (Marsea language). Renders everything from BUSINESS (js/data.js),
   then wires motion. If the Motion CDN import fails or the user prefers
   reduced motion, all content is revealed instantly: nothing ever stays
   hidden. */

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
    h1: "Skin care & facials in " + B.city,
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
    el.alt =
      "A calm treatment at " + B.name + ", a skin care studio in " + B.city;
  });
}

function renderHead() {
  const initial = B.name.trim().charAt(0).toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="14" fill="#33544a"/>' +
    '<text x="32" y="43" font-family="Georgia, serif" font-size="34" fill="#f7f2ea" text-anchor="middle">' +
    initial +
    "</text></svg>";
  const fav = document.createElement("link");
  fav.rel = "icon";
  fav.href = "data:image/svg+xml," + encodeURIComponent(svg);
  document.head.appendChild(fav);

  document.title =
    B.name + " | Skin Care & Facials in " + B.city + ", " + B.state;
  const desc =
    B.name +
    " is a by-appointment skin care studio in " +
    B.city +
    ", " +
    B.state +
    ". " +
    "Facials, waxing, body scrubs, microneedling, and lip filler with Kat. Call " +
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
      const m = v.match(
        /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
      );
      if (!m) return null;
      const to24 = (h, min, ap) =>
        String((+h % 12) + (ap.toLowerCase() === "pm" ? 12 : 0)).padStart(
          2,
          "0",
        ) +
        ":" +
        (min || "00");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days[d],
        opens: to24(m[1], m[2], m[3]),
        closes: to24(m[4], m[5], m[6]),
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
  const track = document.getElementById("svcTrack");
  track.innerHTML = B.services
    .map(
      (s) => `
    <article class="service-card">
      <div class="service-card__img"><img src="${s.image}" alt="${s.title} at ${B.name} in ${B.city}" loading="lazy" /></div>
      <h3 class="service-card__label">${s.title}</h3>
      <p class="service-card__blurb">${s.blurb}</p>
    </article>`,
    )
    .join("");
}

function renderConcerns() {
  const ol = document.getElementById("concernsList");
  ol.innerHTML = B.concerns
    .map(
      (c, i) =>
        `<li><a href="#services" data-concern="${i}">${c.label}</a></li>`,
    )
    .join("");

  // Stack a fade-in image layer per concern over the base media image.
  const media = document.querySelector(".concerns__media");
  if (media) {
    B.concerns.forEach((c, i) => {
      const layer = document.createElement("img");
      layer.className = "concerns__media-layer";
      layer.src = c.image;
      layer.alt = c.label + " treatment at " + B.name;
      layer.loading = "lazy";
      layer.dataset.concern = String(i);
      media.appendChild(layer);
    });
  }

  // Hovering (or focusing) a concern fades in its image. Nothing resets on
  // mouseleave, so the last one hovered stays on screen.
  const layers = [...document.querySelectorAll(".concerns__media-layer")];
  ol.querySelectorAll("a[data-concern]").forEach((a) => {
    const show = () => {
      const idx = a.dataset.concern;
      layers.forEach((l) =>
        l.classList.toggle("is-active", l.dataset.concern === idx),
      );
    };
    a.addEventListener("mouseenter", show);
    a.addEventListener("focus", show);
  });
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
    </div>`,
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

/* ---------------- nav + menu ---------------- */

function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => {
    const nearBottom =
      window.scrollY + innerHeight >=
      document.documentElement.scrollHeight - 200;
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

/* ---------------- sliders (work without Motion) ---------------- */

function initServicesCarousel() {
  const track = document.getElementById("svcTrack");
  const step = () =>
    (track.querySelector(".service-card")?.offsetWidth || 320) + 32;
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

function initApproachSlider() {
  const slides = [...document.querySelectorAll(".approach__slide")];
  if (!slides.length) return;
  let idx = slides.findIndex((s) => s.classList.contains("active"));
  if (idx < 0) {
    idx = 0;
    slides[0].classList.add("active");
  }
  let timer = null;
  const go = (n) => {
    const next = (n + slides.length) % slides.length;
    if (next === idx) return;
    const outgoing = slides[idx];
    const incoming = slides[next];
    // outgoing eases out to the left on the shared speed ramp
    outgoing.classList.remove("active");
    outgoing.classList.add("leaving");
    // ensure the incoming slide always enters from the right, whatever its
    // previous position was: snap it to the right with transitions off first
    incoming.classList.add("no-transition");
    incoming.classList.remove("leaving");
    void incoming.offsetWidth; // force reflow while transition is disabled
    incoming.classList.remove("no-transition");
    incoming.classList.add("active");
    idx = next;
  };
  const restart = () => {
    if (timer) clearInterval(timer);
    // interval clears the full ramp (slide + delayed card) before advancing
    if (!reduceMotion) timer = setInterval(() => go(idx + 1), 5600);
  };
  document.getElementById("appPrev").addEventListener("click", () => {
    go(idx - 1);
    restart();
  });
  document.getElementById("appNext").addEventListener("click", () => {
    go(idx + 1);
    restart();
  });
  const section = document.querySelector(".approach");
  section.addEventListener("mouseenter", () => timer && clearInterval(timer));
  section.addEventListener("mouseleave", restart);
  restart();
}

/* ---------------- motion ---------------- */

function revealAllInstant() {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
  const curtain = document.getElementById("curtain");
  if (curtain) curtain.remove();
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
  const { animate, scroll, inView } = M;
  const easeReveal = [0.25, 1, 0.5, 1];

  // Curtain wipe on load, then hero settles in
  const curtain = document.getElementById("curtain");
  animate(
    curtain,
    { y: ["0%", "-101%"] },
    { duration: 1.05, ease: easeReveal, delay: 0.15 },
  ).finished.then(() => curtain.remove());
  animate(
    ".hero__top",
    { opacity: [0, 1], y: [14, 0] },
    { duration: 0.8, delay: 0.75, ease: easeReveal },
  );
  animate(
    ".hero__bottom",
    { opacity: [0, 1], y: [22, 0] },
    { duration: 0.8, delay: 0.9, ease: easeReveal },
  );

  // Scroll reveals: deterministic, never stuck hidden
  inView(
    ".reveal",
    (entry) => {
      const node = entry instanceof Element ? entry : entry.target;
      animate(
        node,
        { opacity: 1, y: [26, 0] },
        { duration: 0.85, ease: easeReveal },
      );
      node.classList.add("visible");
      return false;
    },
    { amount: 0.2, margin: "0px 0px -10% 0px" },
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
    let mx = 0,
      my = 0,
      running = false;
    const cur = floats.map(() => ({ x: 0, y: 0 }));
    const tick = () => {
      let alive = false;
      floats.forEach((el, i) => {
        const c = cur[i];
        c.x += (mx * strengths[i] - c.x) * 0.06;
        c.y += (my * strengths[i] - c.y) * 0.06;
        el.style.setProperty("--mx", c.x.toFixed(2) + "px");
        el.style.setProperty("--my", c.y.toFixed(2) + "px");
        if (Math.abs(c.x - mx * strengths[i]) > 0.1) alive = true;
      });
      if (alive) requestAnimationFrame(tick);
      else running = false;
    };
    document.querySelector(".brand").addEventListener("mousemove", (e) => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    });
  }
}

/* ---------------- booking form ---------------- */

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  const select = form.querySelector("#bf-service");
  if (select) {
    B.services.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.title;
      opt.textContent = s.title;
      select.appendChild(opt);
    });
    const other = document.createElement("option");
    other.value = "Not sure yet";
    other.textContent = "Not sure yet";
    select.appendChild(other);
  }
  const status = document.getElementById("bookingStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const first =
      form.querySelector("#bf-name").value.trim().split(/\s+/)[0] || "there";
    if (status) {
      status.textContent =
        "Thank you, " +
        first +
        ". We'll call to confirm your appointment within one business day.";
    }
    form.reset();
  });
}

/* ---------------- "Our promise" scroll-lag parallax ---------------- */

function initPromiseParallax() {
  if (reduceMotion) return;
  const section = document.querySelector(".brand");
  const floats = [...document.querySelectorAll(".brand__float")];
  if (!section || !floats.length) return;
  const depths = [0.06, 0.1, 0.08]; // fraction of viewport each image lags
  const update = () => {
    const rect = section.getBoundingClientRect();
    const range = innerHeight + rect.height;
    const progress = Math.min(Math.max((innerHeight - rect.top) / range, 0), 1);
    const shift = (progress - 0.5) * 2; // -1 (entering) .. 1 (leaving)
    floats.forEach((el, i) => {
      const sy = shift * (depths[i] ?? 0.08) * innerHeight;
      el.style.setProperty("--sy", sy.toFixed(1) + "px");
    });
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

/* ---------------- Lenis smooth scroll ---------------- */

async function initSmoothScroll() {
  if (reduceMotion) return;
  try {
    const mod = await import("https://cdn.jsdelivr.net/npm/lenis@1/+esm");
    const Lenis = mod.default || mod.Lenis;
    const lenis = new Lenis({
      duration: 1.4, // weighty, slowed feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  } catch (err) {
    /* CDN blocked / offline: native scroll (with CSS smooth) stays in place */
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
initBookingForm();
initPromiseParallax();
initSmoothScroll();
