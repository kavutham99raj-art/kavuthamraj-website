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

  /* mobile menu: toggles, closes on a link, on Escape and on a tap outside */
  const menu = document.querySelector(".menu");
  const nav = document.getElementById("nav");
  if (menu && nav) {
    const set = (open) => {
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "Close" : "Menu";
    };
    menu.addEventListener("click", () => set(!nav.classList.contains("open")));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); menu.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !menu.contains(e.target)) set(false);
    });
  }
})();

/* intro: the hero name opens small on dark, cuts to paper and grows, the photo slides in as a strip
   (letters invert over it), then the name and photo settle into the hero. Once per session;
   skipped for reduced motion or when the page opens scrolled. */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || scrollY > 40) return;
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
    const paper = getComputedStyle(document.querySelector(".hero")).backgroundColor;
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
    const end = () => {
      anims.forEach((a) => a.cancel());
      bg.remove();
      first.style.color = last.style.color = first.style.transformOrigin = last.style.transformOrigin = "";
      root.classList.remove("intro-run");
    };
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
    // any click or key skips straight to the end
    const skip = () => anims.forEach((a) => a.finish());
    addEventListener("pointerdown", skip, { once: true });
    addEventListener("keydown", skip, { once: true });
  };
  const fonts = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  fonts.then(() => requestAnimationFrame(start));
})();

/* mascot: eyes look toward the pointer */
(() => {
  const buddies = [...document.querySelectorAll(".mascot")];
  if (!buddies.length || !matchMedia("(pointer: fine)").matches) return;
  addEventListener("pointermove", (e) => {
    buddies.forEach((b) => {
      const r = b.getBoundingClientRect();
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      b.style.setProperty("--ex", (Math.cos(a) * 2.6).toFixed(2) + "px");
      b.style.setProperty("--ey", (Math.sin(a) * 3.4).toFixed(2) + "px");
    });
  }, { passive: true });
})();

/* visitor cursor: on a mouse or trackpad, the pointer becomes a Figma-style multiplayer cursor tagged "You".
   It tracks the pointer exactly (no easing), and the system cursor only hides once it has a position. */
(() => {
  const cur = document.querySelector(".you-cursor");
  if (!cur || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const root = document.documentElement;
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    cur.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    root.classList.add("you-on");
    cur.classList.remove("off");
  }, { passive: true });
  addEventListener("pointerover", (e) => {
    cur.classList.toggle("link", !!e.target.closest("a, button, [role=button]"));
  }, { passive: true });
  document.addEventListener("pointerleave", () => cur.classList.add("off"));
  addEventListener("pointerdown", () => cur.classList.add("down"));
  addEventListener("pointerup", () => cur.classList.remove("down"));
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

/* case pages: the chapter list marks the section being read */
(() => {
  const links = [...document.querySelectorAll(".toc a")];
  if (!links.length) return;
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const heads = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const tick = () => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < innerHeight * 0.35) cur = h;
    links.forEach((a) => a.classList.toggle("on", a === byId.get(cur.id)));
  };
  addEventListener("scroll", tick, { passive: true });
  tick();
})();
