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
  document.querySelectorAll(".reveal, .mask, .skill-group, .edu, .foot-mark").forEach((el) => io.observe(el));

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
  const tick = () => {
    const r = list.getBoundingClientRect(), mid = innerHeight * 0.6;
    list.style.setProperty("--p", Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(3));
    items.forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < mid));
  };
  addEventListener("scroll", tick, { passive: true });
  tick();
})();
