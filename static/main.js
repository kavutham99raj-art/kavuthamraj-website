(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches && !reduce;

  /* scroll progress bar + hero parallax */
  const bar = document.querySelector(".progress");
  const display = document.querySelector(".hero .display");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    if (display && !reduce) display.style.transform = `translateY(${Math.min(scrollY, innerHeight) * 0.12}px)`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal, .mask, .timeline li, .skill-group, .edu, .foot-mark").forEach((el) => io.observe(el));

  if (fine) {
    /* custom cursor: exact arrow that tilts with motion, trailing glow, lens on buttons and links,
       a "View" disc over work, an inverting orb over display type, a ripple on click */
    const cur = document.querySelector(".cursor");
    const part = (c) => cur.querySelector(c);
    const glow = part(".glow"), tip = part(".tip"), lens = part(".lens"), ibeam = part(".ibeam"), disc = part(".disc"), orb = part(".orb");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, tilt = 0, target = null;
    addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      cur.classList.add("active");
    }, { passive: true });
    document.addEventListener("pointerleave", () => { cur.classList.remove("active"); cur.dataset.state = ""; target = null; });
    addEventListener("pointerover", (e) => {
      const t = e.target;
      const field = t.closest("input, textarea, [contenteditable]");
      const work = t.closest("[data-tilt], .feat-media, .card");
      const ctl = t.closest("a, button");
      target = !field && !work && ctl ? ctl : null;
      cur.dataset.state = field ? "text" : work ? "view" : ctl ? (ctl.matches("a") ? "link" : "hover") : t.closest(".disp") ? "invert" : "";
      cur.classList.toggle("on-dark", !!t.closest(".s-dark, .s-black"));
    }, { passive: true });
    const ripple = (px, py) => {
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.left = px + "px"; r.style.top = py + "px";
      cur.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };
    addEventListener("pointerdown", (e) => { cur.classList.add("down"); ripple(e.clientX, e.clientY); });
    addEventListener("pointerup", () => cur.classList.remove("down"));
    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      const dx = x - cx, dy = y - cy;
      tilt += (Math.max(-20, Math.min(20, dx * 0.35)) - tilt) * 0.2;
      tip.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
      ibeam.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      disc.style.translate = orb.style.translate = `${cx}px ${cy}px`;
      const s = 1 + Math.min(Math.hypot(dx, dy), 140) / 260;
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${ang}deg) scale(${s}, ${1 / s})`;
      if (target) {
        const r = target.getBoundingClientRect();
        lens.style.width = r.width + 16 + "px";
        lens.style.height = r.height + 16 + "px";
        lens.style.transform = `translate(${r.left - 8}px, ${r.top - 8}px)`;
      }
      requestAnimationFrame(loop);
    };
    loop();

    /* 3D tilt on work cards */
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });

    /* magnetic buttons and links */
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* mobile menu */
  const menu = document.querySelector(".menu");
  const nav = document.getElementById("nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      })
    );
  }
})();

/* statement: words light up as the section scrolls through the viewport */
(() => {
  const blocks = [...document.querySelectorAll("[data-words]")];
  if (!blocks.length) return;
  const words = [];
  blocks.forEach((b) => {
    [...b.childNodes].forEach((n) => {
      if (n.nodeType !== 3) { if (n.nodeType === 1) { n.classList.add("w"); words.push(n); } return; }
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) { frag.appendChild(document.createTextNode(t)); return; }
        const s = document.createElement("span"); s.className = "w"; s.textContent = t; frag.appendChild(s); words.push(s);
      });
      b.replaceChild(frag, n);
    });
  });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { words.forEach((w) => w.classList.add("on")); return; }
  const sec = blocks[0].closest("section");
  const tick = () => {
    const r = sec.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height * 0.9)));
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < n));
  };
  addEventListener("scroll", tick, { passive: true });
  tick();
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
      const r = (el.querySelector(".line") || el).getBoundingClientRect(), box = el.getBoundingClientRect();
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
      ...[...document.querySelectorAll(".hero header, .hero .hero-copy, .hero .scroll-cue")].map((el) =>
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
    addEventListener("pointerdown", () => anims.forEach((a) => a.finish()), { once: true });
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

/* experience: the rail fills as you scroll and each role's dot lights up when it reaches the middle */
(() => {
  const list = document.querySelector(".xp-list");
  if (!list) return;
  const items = [...list.querySelectorAll(".xp-item")];
  const tick = () => {
    const r = list.getBoundingClientRect(), mid = innerHeight * 0.6;
    list.style.setProperty("--p", Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
    items.forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < mid));
  };
  addEventListener("scroll", tick, { passive: true });
  tick();
})();
