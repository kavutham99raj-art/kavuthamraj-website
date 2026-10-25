// Reduced motion (Windows "Animation effects" off, macOS "Reduce motion") keeps the site still by default;
// the hero's "Play motion" button lets those visitors opt in, and the choice is remembered.
const prefersReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let motionOptIn = false;
try { motionOptIn = localStorage.getItem("motionOptIn") === "1"; } catch (e) { /* storage blocked */ }
if (prefersReduce && motionOptIn) document.documentElement.classList.add("motion-ok");
const reduceMotion = prefersReduce && !motionOptIn;
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
   (letters invert over it), then the name and photo settle into the hero. It plays on every visit that starts
   at the top, reloads included. With reduced motion on (for example Windows "Animation effects" off) it becomes a
   plain fade; it is skipped for a link into the page, back/forward, coming back from another page of this site,
   or a reload of a page that was scrolled. */
(() => {
  const nav = (performance.getEntriesByType("navigation")[0] || {}).type;
  let fromSite = false;
  try { fromSite = new URL(document.referrer).origin === location.origin; } catch (e) { /* no referrer */ }
  let leftAt = 0;
  try { leftAt = Number(sessionStorage.getItem("homeY")) || 0; } catch (e) { /* storage blocked */ }
  addEventListener("pagehide", () => { try { sessionStorage.setItem("homeY", String(Math.round(scrollY))); } catch (e) { /* storage blocked */ } });
  if (scrollY > 40 || location.hash || nav === "back_forward") return;
  if (nav === "reload" ? leftAt > 40 : fromSite) return;
  // Reduced motion: no sliding, zooming or colour swap, just a gentle fade of the hero, so the opening still shows.
  if (reduceMotion) {
    const fade = [".hero-first", ".hero-last", ".hero-photo", ".hero-copy", ".avail", ".top"];
    fade.forEach((sel, i) => {
      const el = document.querySelector(sel);
      if (el) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay: 120 * i, easing: "ease-out", fill: "backwards" });
    });
    return;
  }
  const stage = document.querySelector(".hero-stage");
  const first = document.querySelector(".hero-first"), last = document.querySelector(".hero-last"), photo = document.querySelector(".hero-photo");
  if (!stage || !first || !last || !photo) return;
  const root = document.documentElement;
  root.classList.add("intro-run");
  const bg = document.createElement("div");
  bg.className = "intro-bg";
  stage.prepend(bg);
  const hint = document.createElement("p");
  hint.className = "intro-hint";
  hint.textContent = "Click or press any key to skip";
  document.body.append(hint);

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
      hint.remove();
      first.style.color = last.style.color = first.style.transformOrigin = last.style.transformOrigin = "";
      root.classList.remove("intro-run");
    };
    Promise.all(anims.map((a) => a.finished)).then(end, () => {});
    addEventListener("pointerdown", skip, { once: true });
    addEventListener("keydown", skip, { once: true });
  };
  // wait only for the hero's two (preloaded) fonts, not document.fonts.ready, which also waits for
  // fonts needed further down the page
  const fonts = document.fonts ? Promise.race([Promise.all(['1em "Krona One"', "1em Inter"].map((f) => document.fonts.load(f))).catch(() => {}), new Promise((r) => setTimeout(r, 600))]) : Promise.resolve();
  fonts.then(() => requestAnimationFrame(start));
})();

/* photo motion: the mascot and collaborator cursors loop forever, so visitors can pause them (WCAG 2.2.2).
   The choice is remembered, and they also rest while the hero is off screen. */
(() => {
  const btn = document.querySelector(".motion-toggle");
  const hero = document.querySelector(".hero");
  if (!btn || !hero) return;
  if (reduceMotion) {
    btn.setAttribute("aria-pressed", "true");
    btn.textContent = "Play motion";
    btn.addEventListener("click", () => {
      try { localStorage.setItem("motionOptIn", "1"); localStorage.setItem("motion", "on"); } catch (e) { /* storage blocked */ }
      location.reload();
    });
    return;
  }
  const root = document.documentElement;
  let paused = false, offscreen = false;
  try { paused = localStorage.getItem("motion") === "paused"; } catch (e) { /* storage blocked */ }
  const apply = () => {
    root.classList.toggle("still", paused || offscreen);
    root.classList.toggle("motion-off", paused);
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
   It trails the pointer slightly with eased motion (the "You" tag tilts with the lag) and springs in scale on
   hover and click; with reduced motion it tracks exactly. It turns into an I-beam over text, hands over to the
   native zoom cursor on screenshots, and stays off for forced colours or high contrast so OS pointer settings
   still apply. */
(() => {
  const cur = document.querySelector(".you-cursor");
  if (!cur || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(forced-colors: active), (prefers-contrast: more)").matches) return;
  const root = document.documentElement;
  let tx = 0, ty = 0, x = 0, y = 0, last = 0, raf = 0, started = false;
  const tick = (now) => {
    // frame-rate independent ease: covers ~35% of the gap every 16ms
    const k = reduceMotion ? 1 : 1 - Math.pow(0.65, Math.min(now - last, 64) / 16.7);
    last = now;
    x += (tx - x) * k;
    y += (ty - y) * k;
    const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1;
    if (settled) { x = tx; y = ty; }
    cur.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
    cur.style.setProperty("--tilt", `${Math.max(-9, Math.min(9, (tx - x) * 0.35)).toFixed(2)}deg`);
    raf = settled ? 0 : requestAnimationFrame(tick);
  };
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    tx = e.clientX; ty = e.clientY;
    if (!started) { x = tx; y = ty; started = true; }
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    root.classList.add("you-on");
    if (!cur.classList.contains("zoom")) cur.classList.remove("off");
  }, { passive: true });
  addEventListener("pointerover", (e) => {
    const t = e.target;
    const link = !!t.closest("a, button, summary, [role=button], [tabindex]");
    const zoom = !!t.closest(".shot a, .board a, .vd-grid a");
    cur.classList.toggle("link", link && !zoom);
    cur.classList.toggle("zoom", zoom);
    cur.classList.toggle("off", zoom);
    cur.classList.toggle("text", !link && !!t.closest("p, li, dd, dt, blockquote, h1, h2, h3, figcaption"));
    cur.classList.toggle("dark", !!t.closest(".night, .night-2, .foot, .q-dark, .ld"));
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

/* home: the header marks the section on screen (visibility of system status) */
(() => {
  const links = [...document.querySelectorAll(".nav a[href*='#']")].filter((a) => a.pathname === location.pathname || a.getAttribute("href").startsWith("index.html#") && /\/(index\.html)?$/.test(location.pathname));
  const map = links.map((a) => [a, document.getElementById(a.hash.slice(1))]).filter(([, el]) => el);
  if (!map.length) return;
  onScroll(() => {
    let cur = null;
    for (const [a, el] of map) if (el.getBoundingClientRect().top < innerHeight * 0.4) cur = a;
    map.forEach(([a]) => (a === cur ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  });
})();

/* contact: copy the email address for people without a mail app (error prevention) */
(() => {
  document.querySelectorAll(".copy-mail").forEach((btn) => {
    if (!navigator.clipboard) { btn.hidden = true; return; }
    const label = btn.querySelector("b") || btn;
    const text = label.textContent;
    const status = btn.parentElement.querySelector(".copy-status");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = "Copied ✓";
        status.textContent = "Email address copied";
      } catch (e) {
        label.textContent = "Couldn't copy, select it instead";
      }
      setTimeout(() => { label.textContent = text; status.textContent = ""; }, 2400);
    });
  });
})();

/* "Let's talk": three ways to reach me in one menu, so a recruiter without a mail app isn't stuck */
(() => {
  const btn = document.querySelector(".talk-btn");
  const pop = document.getElementById("talk-pop");
  if (!btn || !pop) return;
  const set = (open) => { btn.setAttribute("aria-expanded", String(open)); pop.hidden = !open; };
  btn.addEventListener("click", (e) => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    set(open);
    if (open && e.detail === 0) pop.querySelector(".talk-row").focus(); // keyboard users land inside the menu
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) { set(false); btn.focus(); } });
  addEventListener("click", (e) => { if (!pop.hidden && !e.target.closest(".talk")) set(false); });
  btn.parentElement.addEventListener("focusout", (e) => { if (!btn.parentElement.contains(e.relatedTarget)) set(false); });
})();

/* Titan card: the loading demo only runs while it is on screen */
(() => {
  const demos = document.querySelectorAll(".ld");
  if (!demos.length || reduceMotion) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("play", e.isIntersecting)), { threshold: 0.25 });
  demos.forEach((d) => io.observe(d));
})();

/* design-system specimen: switch the theme to watch one semantic token resolve differently */
(() => {
  const ds = document.querySelector(".ds");
  const group = ds && ds.querySelector(".ds-mode");
  if (!group) return;
  group.hidden = false;
  group.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    ds.dataset.mode = b.dataset.mode;
    group.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  });
})();

/* footer wordmark: hovering a letter selects it like a Figma layer, with its size underneath */
(() => {
  const letters = document.querySelectorAll(".foot-mark span:not(.sp)");
  letters.forEach((l) => l.addEventListener("pointerenter", () => {
    const r = l.getBoundingClientRect();
    l.dataset.size = `${Math.round(r.width)} × ${Math.round(r.height)}`;
  }));
})();

/* Figma activity: the streak counts up once, when it scrolls into view */
(() => {
  const el = document.querySelector(".streak-n");
  if (!el || reduceMotion) return;
  const to = Number(el.dataset.to);
  el.textContent = "0";
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
  io.observe(el);
})();

/* Cyberdine tap flow: both rows step together, so "After" is sent while "Before" is still waiting for a captain.
   Plays once when it scrolls into view; Replay runs it again. Reduced motion shows every step at once. */
(() => {
  document.querySelectorAll(".flow").forEach((flow) => {
    const btn = flow.querySelector(".flow-play");
    if (reduceMotion) { btn.hidden = true; return; }
    const steps = [...flow.querySelectorAll("li[data-step]")];
    const last = Math.max(...steps.map((s) => Number(s.dataset.step)));
    let timer = 0;
    const play = () => {
      clearInterval(timer);
      flow.classList.add("is-playing");
      steps.forEach((s) => s.classList.remove("on", "hit"));
      let n = 0;
      timer = setInterval(() => {
        n += 1;
        steps.filter((s) => Number(s.dataset.step) === n).forEach((s) => {
          s.classList.add("on", "hit");
          setTimeout(() => s.classList.remove("hit"), 320);
        });
        if (n >= last) { clearInterval(timer); flow.classList.remove("is-playing"); }
      }, 520);
    };
    btn.addEventListener("click", play);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (!document.documentElement.classList.contains("motion-off")) play();
    }, { threshold: 0.5 });
    io.observe(flow);
  });
})();

/* private interview assignment: the blurred card in Concepts opens a password dialog. The case is an encrypted file
   (AES-GCM, key from the password with PBKDF2), fetched, decrypted here and shown in a full-screen dialog.
   There is no page or link for it. */
(() => {
  const card = document.querySelector("[data-private]");
  if (!card || !window.crypto || !crypto.subtle) return;
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const make = (cls, html) => {
    const d = document.createElement("dialog");
    d.className = cls; d.innerHTML = html; document.body.append(d);
    d.addEventListener("close", () => { d.remove(); if (!document.querySelector("dialog[open]")) document.documentElement.style.overflow = ""; });
    return d;
  };
  const show = (d) => { document.documentElement.style.overflow = "hidden"; d.showModal(); };
  const decrypt = async (file, password) => {
    const f = await (await fetch(file)).json();
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(f.salt), iterations: f.iter, hash: "SHA-256" },
      await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]),
      { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(f.iv) }, key, b64(f.data)));
  };
  card.addEventListener("click", () => {
    const d = make("pw-dialog", `<form class="pw-form" autocomplete="off"><h2 class="krona">Interview assignment</h2><p>This is private. Enter the password you were given.</p><label class="label" for="pw-in">Password</label><div class="pw-row"><input id="pw-in" type="password" required autocomplete="off"><button class="btn solid" type="submit">Unlock</button></div><p class="pw-msg" role="status" aria-live="polite"></p><button class="pw-x" type="button" aria-label="Close">×</button></form>`);
    const form = d.querySelector("form"), msg = d.querySelector(".pw-msg"), btn = d.querySelector(".btn");
    d.querySelector(".pw-x").addEventListener("click", () => d.close());
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "Unlocking…"; btn.disabled = true;
      try {
        const html = await decrypt(card.dataset.private, d.querySelector("#pw-in").value);
        const v = make("private-view", `<button class="pv-x" type="button" aria-label="Close">×</button><div class="pv-body">${html}</div>`);
        v.querySelector(".pv-x").addEventListener("click", () => v.close());
        show(v); d.close();
        v.querySelector(".pv-body").scrollTop = 0;
      } catch { msg.textContent = "That password didn't work. Please try again."; btn.disabled = false; }
    });
    show(d);
  });
})();

/* visual design: the banner opens every poster in a full-screen dialog (markup is in the page, images load when it opens) */
(() => {
  const btn = document.querySelector("[data-vd]"), dlg = document.querySelector(".vd-dialog");
  if (!btn || !dlg || !dlg.showModal) return;
  btn.addEventListener("click", () => { document.documentElement.style.overflow = "hidden"; dlg.showModal(); dlg.querySelector(".pv-body").scrollTop = 0; });
  dlg.querySelector(".pv-x").addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => { if (!document.querySelector("dialog[open]")) document.documentElement.style.overflow = ""; });
})();

/* visual design: a poster or the video opens in a popup viewer (previous, next, arrow keys, swipe) instead of a new tab.
   The links stay real, so a modified click (new tab) and no-JS still work. */
(() => {
  const dlg = document.querySelector(".vd-dialog");
  if (!dlg || !dlg.showModal) return;
  const items = [...dlg.querySelectorAll(".vd-grid figure")].map((fig) => {
    const a = fig.querySelector("a"), img = fig.querySelector("img");
    return { a, video: a.dataset.video, poster: a.dataset.poster, href: a.href, alt: (img && img.alt) || "", cap: fig.querySelector("figcaption").textContent };
  });
  let lb, stage, cap, idx = 0;
  const build = () => {
    lb = document.createElement("dialog"); lb.className = "vd-lb"; lb.setAttribute("aria-label", "Poster viewer");
    lb.innerHTML = `<button class="vd-lb-x" type="button" aria-label="Close">×</button><button class="vd-lb-prev" type="button" aria-label="Previous">‹</button><button class="vd-lb-next" type="button" aria-label="Next">›</button><figure class="vd-lb-stage"></figure><p class="vd-lb-cap" aria-live="polite"></p>`;
    document.body.append(lb);
    stage = lb.querySelector(".vd-lb-stage"); cap = lb.querySelector(".vd-lb-cap");
    lb.querySelector(".vd-lb-x").addEventListener("click", () => lb.close());
    lb.querySelector(".vd-lb-prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".vd-lb-next").addEventListener("click", () => show(idx + 1));
    stage.addEventListener("click", (e) => { if (e.target === stage) lb.close(); });
    lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1); });
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
    lb.addEventListener("close", () => {
      stage.textContent = "";
      if (!document.querySelector("dialog[open]")) document.documentElement.style.overflow = "";
    });
  };
  const show = (i) => {
    idx = (i + items.length) % items.length;
    const it = items[idx];
    stage.textContent = "";
    let el;
    if (it.video) { el = document.createElement("video"); el.controls = true; el.autoplay = true; el.playsInline = true; el.poster = it.poster; el.src = it.video; }
    else { el = document.createElement("img"); el.src = it.href; el.alt = it.alt; }
    stage.append(el);
    cap.textContent = `${it.cap}  ·  ${idx + 1} / ${items.length}`;
  };
  items.forEach((it, k) => it.a.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    e.preventDefault();
    if (!lb) build();
    show(k);
    document.documentElement.style.overflow = "hidden";
    if (!lb.open) lb.showModal();
    lb.querySelector(".vd-lb-x").focus({ preventScroll: true });
  }));
})();
