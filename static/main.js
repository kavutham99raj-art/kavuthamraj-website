const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Scroll work runs at most once per frame.
const onScroll = (fn) => {
  let queued = 0;
  addEventListener("scroll", () => { queued ||= requestAnimationFrame(() => { queued = 0; fn(); }); }, { passive: true });
  fn();
};

(() => {
  /* reveal elements as they enter the viewport */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
  );
  document.querySelectorAll(".reveal, .foot-mark").forEach((el) => io.observe(el));

  /* mobile menu: toggles, closes on a link, on Escape, on a tap outside, and when focus leaves it.
     The label stays "Menu"; aria-expanded carries the state. */
  const menu = document.querySelector(".menu");
  const nav = document.getElementById("nav");
  if (menu && nav) {
    const set = (open) => {
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", String(open));
    };
    menu.addEventListener("click", () => set(!nav.classList.contains("open")));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); menu.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !menu.contains(e.target)) set(false);
    });
    nav.addEventListener("focusout", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.relatedTarget) && e.relatedTarget !== menu) set(false);
    });
  }
})();

/* intro: the hero name opens small on dark, cuts to paper and grows, the photo slides in as a strip
   (letters invert over it), then the name and photo settle into the hero. Once per session;
   skipped for reduced motion, when the page opens scrolled, or when a link points into the page. */
(() => {
  if (reduceMotion || scrollY > 40 || location.hash) return;
  const stage = document.querySelector(".hero-stage");
  const first = document.querySelector(".hero-first"), last = document.querySelector(".hero-last"), photo = document.querySelector(".hero-photo");
  if (!stage || !first || !last || !photo) return;
  try {
    if (sessionStorage.getItem("introSeen")) return;
    sessionStorage.setItem("introSeen", "1");
  } catch (e) { /* storage blocked: play anyway */ }
  const root = document.documentElement;
  root.classList.add("intro-run");
  const bg = document.createElement("div");
  bg.className = "intro-bg";
  stage.prepend(bg);

  const start = () => {
    const vw = innerWidth, cy = innerHeight / 2, ease = "cubic-bezier(.76,0,.24,1)";
    const paper = getComputedStyle(document.body).backgroundColor;
    const pc = paper.match(/\d+/g).map(Number);
    // with mix-blend-mode:difference over paper, colour |paper - c| renders exactly as c
    const diff = (el) => { const c = getComputedStyle(el).color.match(/\d+/g).map(Number); return `rgb(${c.slice(0, 3).map((v, i) => Math.abs(pc[i] - v)).join(",")})`; };
    const fit = (el, dir) => {
      const r = (el.querySelector(".ln") || el).getBoundingClientRect(), box = el.getBoundingClientRect();
      const ox = r.left + r.width / 2, oy = r.top + r.height / 2;
      el.style.transformOrigin = `${ox - box.left}px ${oy - box.top}px`;
      return (s) => `translate(${vw / 2 - ox}px, ${cy + dir * s * (r.height / 2 + 6) - oy}px) scale(${s})`;
    };
    const tA = fit(first, -1), tB = fit(last, 1);
    first.style.color = diff(first);
    last.style.color = diff(last);
    const o = { duration: 3400, fill: "both" };
    const name = (t) => [
      { transform: t(0.32), opacity: 1 },
      { transform: t(0.32), opacity: 1, offset: 0.24, easing: ease },
      { transform: t(1), opacity: 1, offset: 0.5 },
      { transform: t(1), opacity: 1, offset: 0.6, easing: ease },
      { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
    ];
    const anims = [
      bg.animate([
        { background: "#0c0b0a", opacity: 1 },
        { background: "#0c0b0a", opacity: 1, offset: 0.24 },
        { background: paper, opacity: 1, offset: 0.26 },
        { background: paper, opacity: 1, offset: 0.82 },
        { background: paper, opacity: 0 },
      ], o),
      first.animate(name(tA), o),
      last.animate(name(tB), o),
      photo.animate([
        { clipPath: "inset(0 0 0 100%)", opacity: 1 },
        { clipPath: "inset(0 0 0 100%)", opacity: 1, offset: 0.44, easing: ease },
        { clipPath: "inset(0 0 0 72%)", opacity: 1, offset: 0.6, easing: ease },
        { clipPath: "inset(0 0 0 0%)", opacity: 1 },
      ], o),
      ...[...document.querySelectorAll(".top, .hero .avail, .hero .hero-copy, .hero .shipped")].map((el) =>
        el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.8 }, { opacity: 1 }], o)
      ),
    ];
    // any click or key skips straight to the end
    const skip = () => anims.forEach((a) => a.finish());
    const end = () => {
      removeEventListener("pointerdown", skip);
      removeEventListener("keydown", skip);
      anims.forEach((a) => a.cancel());
      bg.remove();
      first.style.color = last.style.color = first.style.transformOrigin = last.style.transformOrigin = "";
      root.classList.remove("intro-run");
    };
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
    addEventListener("pointerdown", skip, { once: true });
    addEventListener("keydown", skip, { once: true });
  };
  const fonts = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]) : Promise.resolve();
  fonts.then(() => requestAnimationFrame(start));
})();

/* photo motion: the mascot and collaborator cursors loop forever, so visitors can pause them (WCAG 2.2.2).
   The choice is remembered, and they also rest while the hero is off screen. */
(() => {
  const btn = document.querySelector(".motion-toggle");
  const hero = document.querySelector(".hero");
  if (!btn || !hero || reduceMotion) return;
  const root = document.documentElement;
  let paused = false, offscreen = false;
  try { paused = localStorage.getItem("motion") === "paused"; } catch (e) { /* storage blocked */ }
  const apply = () => {
    root.classList.toggle("still", paused || offscreen);
    btn.setAttribute("aria-pressed", String(paused));
    btn.textContent = paused ? "Play motion" : "Pause motion";
  };
  btn.addEventListener("click", () => {
    paused = !paused;
    try { localStorage.setItem("motion", paused ? "paused" : "on"); } catch (e) { /* storage blocked */ }
    apply();
  });
  new IntersectionObserver(([e]) => { offscreen = !e.isIntersecting; apply(); }).observe(hero);
  apply();
})();

/* mascot: eyes look toward the pointer */
(() => {
  const buddies = [...document.querySelectorAll(".mascot")];
  if (!buddies.length || reduceMotion || !matchMedia("(pointer: fine)").matches) return;
  const root = document.documentElement;
  addEventListener("pointermove", (e) => {
    if (root.classList.contains("still")) return;
    buddies.forEach((b) => {
      const r = b.getBoundingClientRect();
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      b.style.setProperty("--ex", (Math.cos(a) * 2.6).toFixed(2) + "px");
      b.style.setProperty("--ey", (Math.sin(a) * 3.4).toFixed(2) + "px");
    });
  }, { passive: true });
})();

/* visitor cursor: on a mouse or trackpad, the pointer becomes a Figma-style multiplayer cursor tagged "You".
   It tracks the pointer exactly (no easing), turns into an I-beam over text, hands over to the native zoom
   cursor on screenshots, and stays off for forced colours or high contrast so OS pointer settings still apply. */
(() => {
  const cur = document.querySelector(".you-cursor");
  if (!cur || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(forced-colors: active), (prefers-contrast: more)").matches) return;
  const root = document.documentElement;
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    cur.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    root.classList.add("you-on");
    if (!cur.classList.contains("zoom")) cur.classList.remove("off");
  }, { passive: true });
  addEventListener("pointerover", (e) => {
    const t = e.target;
    const link = !!t.closest("a, button, summary, [role=button], [tabindex]");
    const zoom = !!t.closest(".shot a");
    cur.classList.toggle("link", link && !zoom);
    cur.classList.toggle("zoom", zoom);
    cur.classList.toggle("off", zoom);
    cur.classList.toggle("text", !link && !!t.closest("p, li, dd, dt, blockquote, h1, h2, h3, figcaption"));
    cur.classList.toggle("dark", !!t.closest(".night, .night-2, .foot"));
  }, { passive: true });
  document.addEventListener("pointerleave", () => cur.classList.add("off"));
  addEventListener("pointerdown", () => cur.classList.add("down"));
  addEventListener("pointerup", () => cur.classList.remove("down"));
})();

/* phones: a contact bar in thumb reach once the hero has scrolled away; it steps aside at Contact */
(() => {
  const bar = document.querySelector(".mbar");
  const hero = document.querySelector(".hero"), contact = document.getElementById("contact");
  if (!bar || !hero || !contact) return;
  let pastHero = false, atContact = false;
  const apply = () => bar.classList.toggle("show", pastHero && !atContact);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; apply(); }).observe(hero);
  new IntersectionObserver(([e]) => { atContact = e.isIntersecting; apply(); }).observe(contact);
})();

/* experience on phones: the current role stays open, older roles open on tap */
(() => {
  if (!matchMedia("(max-width: 560px)").matches) return;
  document.querySelectorAll(".xp-item .xp-more").forEach((d, i) => { if (i > 0) d.open = false; });
})();

/* footer: live local time in Tiruppur */
(() => {
  const el = document.querySelector(".foot-time");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
  const tick = () => { el.textContent = fmt.format(new Date()) + " IST"; };
  tick();
  setInterval(tick, 30000);
})();

/* experience: the rail fills as you scroll and each role's dot lights up when it reaches the middle */
(() => {
  const list = document.querySelector(".xp-list");
  if (!list) return;
  const items = [...list.querySelectorAll(".xp-item")];
  onScroll(() => {
    const r = list.getBoundingClientRect(), mid = innerHeight * 0.6;
    if (r.bottom < -innerHeight || r.top > innerHeight * 2) return;
    const tops = items.map((li) => li.getBoundingClientRect().top);
    list.style.setProperty("--p", Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
    items.forEach((li, i) => li.classList.toggle("on", tops[i] < mid));
  });
})();

/* case pages: the chapter list marks the section being read */
(() => {
  const links = [...document.querySelectorAll(".toc a")];
  if (!links.length) return;
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const heads = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  onScroll(() => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < innerHeight * 0.35) cur = h;
    links.forEach((a) => a.classList.toggle("on", a === byId.get(cur.id)));
  });
})();
