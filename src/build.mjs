import { framerCases } from "./framer-cases.mjs";
import { writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  profile, projects, experience, skills, education,
  heroCopy, proof, strengths, featured, testimonials,
} from "./data.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const STATIC = ROOT + "static/";
const OUT = ROOT + "dist/";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Cards and case-page headers use the 1200px JPEG copies in static/work/covers (made with sips from the originals).
const thumb = (file) => `covers/${String(file).replace(/\.\w+$/, ".jpg")}`;
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hasResume = existsSync(new URL("../static/resume.pdf", import.meta.url));
const linkedin = profile.links.find((l) => l.label === "LinkedIn").href;
const behance = profile.links.find((l) => l.label === "Behance").href;

const head = ({ title, desc, path = "/", image = "profile-portrait.jpg" }) => {
  const r = path.startsWith("/work/") ? "../" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${profile.url}${path}">
<meta property="og:title" content="${esc(title)}"><meta property="og:image" content="${profile.url}/${esc(image)}"><meta name="twitter:card" content="summary_large_image">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${profile.url}${path}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#f6f4f0">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Krona+One&family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}styles.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip" href="${path === "/" ? "#work" : "#main"}">Skip to ${path === "/" ? "work" : "content"}</a>`;
};

const header = (r) => `<header class="top">
  <a class="brand" href="${r}index.html" aria-label="${esc(profile.name)}, home"><b>${esc(profile.short)}</b><span>${esc(profile.role)}</span></a>
  <nav class="nav" id="nav" aria-label="Main">${[["Work", "#work"], ["How I work", "#approach"], ["Experience", "#experience"], ["About", "#about"]]
    .map(([t, h]) => `<a href="${r}index.html${h}">${t}</a>`)
    .join("")}<a class="nav-m" href="${r}index.html#contact">Contact</a>${hasResume ? `<a class="nav-m" href="${r}resume.pdf" download="Kavuthamraj-Resume.pdf">Résumé (PDF)</a>` : ""}</nav>
  ${hasResume ? `<a class="btn line-dark resume-btn" href="${r}resume.pdf" download="Kavuthamraj-Resume.pdf">Résumé</a>` : ""}<a class="btn fill-brown" href="${r}index.html#contact">Contact</a>
  <button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
</header>`;

const footer = (r) => `<footer class="foot">
  <div class="wrap foot-cta">
    <p class="foot-kicker">Got a product that needs a designer?</p>
    <a class="foot-mail" href="mailto:${esc(profile.email)}">${esc(profile.email)}<span aria-hidden="true">↗</span></a>
  </div>
  <div class="wrap foot-grid">
    <div>
      <p class="foot-name">${esc(profile.name)}</p>
      <p class="foot-role mono">${esc(profile.role)}</p>
    </div>
    <ul>
      <li><a href="${r}index.html#work">Case studies</a></li>
      <li><a href="${r}index.html#experience">Experience</a></li>
      <li><a href="${r}index.html#skills">Skills</a></li>
    </ul>
    <ul>
      <li><a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="${behance}" target="_blank" rel="noopener">Behance</a></li>
      <li><a href="mailto:${esc(profile.email)}">Email</a></li>
    </ul>
  </div>
  <p class="foot-mark disp" aria-label="UX by Raj">${[..."UX BY RAJ"].map((ch, i) => (ch === " " ? `<span class="sp" aria-hidden="true"> </span>` : `<span aria-hidden="true" style="--i:${i}">${ch}</span>`)).join("")}</p>
  <div class="wrap foot-bar">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)}</span>
    <span>Tiruppur, India · <time class="foot-time">IST</time></span>
    <a class="foot-top" href="#">Back to top ↑</a>
  </div>
</footer>
<script src="${r}main.js" defer></script>
</body>
</html>`;

const sec = (title, accentTail = "") =>
  `<h2 class="disp h-sec mask"><span>${esc(title)}${accentTail ? ` <em class="acc">${esc(accentTail)}</em>` : ""}</span></h2>`;

// Home: flagship work first, then other client work, then concepts as a plain list.
const featuredKeys = new Set(featured.map((f) => f.key));
const others = projects.filter((p) => !featuredKeys.has(p.key));
const clientWork = () => others.filter((p) => !isConcept(framerCases[p.case] || {}));
const concepts = () => others.filter((p) => isConcept(framerCases[p.case] || {}));

const home = () => `${head({ title: `${profile.name} | ${profile.role}`, desc: profile.intro })}
<section class="s-light hero">
  ${header("")}
  <div class="wrap">
    <p class="avail rise"><i aria-hidden="true"></i>${esc(profile.availability)}</p>
    <div class="hero-stage">
      <h1 class="hero-name"><span class="disp hero-first"><span class="line"><span class="ln" style="--d:60ms">${esc(profile.headline[0])}</span></span></span><span class="disp hero-last">${esc(profile.headline[1])}</span></h1>
      <figure class="hero-photo rise" style="--d:160ms">
        <span class="hp-img"><img src="profile.webp" alt="Portrait of ${esc(profile.name)}" width="944" height="1132" decoding="async" fetchpriority="high"></span>
        <span class="sel" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
        <figcaption>Now at AffinityX</figcaption>
      </figure>
      <div class="hero-copy rise" style="--d:220ms">
        <p class="hero-eyebrow mono">${esc(heroCopy.eyebrow)}</p>
        <p class="hero-lead">${esc(heroCopy.lead)}</p>
        <p class="hero-sub">${esc(heroCopy.sub)}</p>
        <ul class="hero-proof">${proof.map((x) => `<li><b>${esc(x.value)}</b>${esc(x.label)}</li>`).join("")}</ul>
        <div class="hero-cta"><a class="hcta" href="#work">See flagship work</a>${hasResume ? `<a class="hcta alt" href="resume.pdf" download="Kavuthamraj-Resume.pdf">Résumé (PDF)</a>` : ""}<a class="hcta link" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></div>
      </div>
    </div>
  </div>
</section>

<section id="work" class="s-dark work-intro">
  <div class="wrap">
    <p class="mono kicker">Selected work</p>
    ${sec("Three products,", "shipped.")}
    <p class="lede reveal">Enterprise SaaS, restaurant ordering and a sports ERP. Each one shows the problem, the decisions I made, and what changed.</p>
  </div>
</section>
<div class="stack">${featured.map((f, i) => `<section class="feat s-${f.tone}" aria-labelledby="feat-${f.key}">
  <div class="wrap feat-grid">
    <a class="feat-media reveal" href="${esc(f.href)}" tabindex="-1" aria-hidden="true"><img src="work/${esc(thumb(f.cover))}" alt="" loading="${i ? "lazy" : "eager"}" decoding="async"></a>
    <div class="feat-copy">
      <p class="mono feat-meta reveal"><span>0${i + 1}</span>${esc(f.meta)}</p>
      <h3 id="feat-${f.key}" class="reveal">${esc(f.title)}</h3>
      <p class="reveal">${esc(f.text)}</p>
      <ul class="feat-stats reveal">${f.stats.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn feat-btn reveal" href="${esc(f.href)}">Read the case study<span class="sr"> about ${esc(f.title)}</span></a>
    </div>
  </div>
</section>`).join("")}</div>

<section class="s-light pad">
  <div class="wrap">
    <h2 class="disp h-sec mask"><span>More client work</span></h2>
    <div class="more-grid">
      ${clientWork().map((p, i) => {
        const c = framerCases[p.case] || {};
        return `<a class="mw reveal" href="work/${esc(p.case)}.html" style="--d:${(i % 3) * 90}ms">
        <div class="m"><img src="work/${esc(thumb(p.cover))}" alt="" loading="lazy" decoding="async"></div>
        <h3>${esc(p.title)}</h3><span>${esc([c.client, durText(c.duration), ...p.tags.slice(0, 2)].filter(Boolean).join(" · "))}</span></a>`;
      }).join("")}
    </div>
    <div class="concepts reveal">
      <h3 class="mono">Concepts and explorations</h3>
      <p>Self-initiated or time-boxed studies, kept for range.</p>
      <ul>${concepts().map((p) => { const c = framerCases[p.case] || {}; return `<li><a href="work/${esc(p.case)}.html"><strong>${esc(p.title)}</strong><span>${esc([durText(c.duration), ...p.tags.slice(0, 2)].filter(Boolean).join(" · "))}</span><i aria-hidden="true">→</i></a></li>`; }).join("")}</ul>
    </div>
  </div>
</section>

<section id="approach" class="s-black pad">
  <div class="wrap">
    <p class="mono kicker">How I work</p>
    <h2 class="disp h-sec h-two"><span class="mask"><span>Understand the problem.</span></span> <span class="mask acc-line"><span>Design the system.</span></span></h2>
    <div class="str-grid">
      ${strengths.map((s, i) => `<div class="str reveal" style="--d:${(i % 2) * 120}ms"><span class="n">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><a class="str-link" href="${esc(s.href)}">${esc(s.cta)} →</a></div></div>`).join("")}
    </div>
  </div>
</section>

<section id="experience" class="s-dark pad xp">
  <div class="wrap xp-grid">
    <div class="xp-side">
      <h2 class="disp h-sec mask"><span>Experience</span></h2>
      <p class="xp-sum reveal"><span><b>${xpYears()}+</b>years</span><span><b>${experience.length}</b>product teams</span></p>
      <p class="xp-lede reveal">From a B2C sports app to enterprise B2B SaaS, and the sole designer more than once.</p>
      ${hasResume ? `<a class="btn line xp-cv reveal" href="resume.pdf" download="Kavuthamraj-Resume.pdf">Download résumé</a>` : ""}
    </div>
    <ol class="xp-list">
      ${experience.map((e, i) => `<li class="xp-item reveal" style="--d:${i * 80}ms">
        <div class="xp-top"><span>${esc(e.dates.replace(" to ", " – ").replace("present", "Present"))}</span><span class="xp-dur">${xpDuration(e.dates)}</span>${/present/i.test(e.dates) ? '<span class="xp-now">Now</span>' : ""}</div>
        <h3 class="xp-co disp">${esc(e.company)}</h3>
        <p class="xp-role">${esc(e.role)}</p>
        <p class="xp-note">${esc(e.note)}</p>
        <ul class="xp-tags">${(e.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section id="about" class="s-light pad about">
  <div class="wrap about-grid">
    <h2 class="disp h-sec mask"><span>About</span></h2>
    <div class="about-copy">
      ${profile.about.map((t) => `<p class="reveal">${esc(t)}</p>`).join("")}
    </div>
  </div>
  <div class="wrap" id="skills">
    <div class="skills">
      ${Object.entries(skills).map(([g, items], gi) => `<div class="skill-group reveal" style="--d:${gi * 110}ms"><h3 class="mono">${esc(g)}</h3><ul>${items.map((it, j) => `<li style="--d:${j * 40}ms">${esc(it)}</li>`).join("")}</ul></div>`).join("")}
    </div>
    <div class="edu reveal"><h3 class="mono">Education</h3><ul>${education.map((e, j) => `<li style="--d:${j * 90}ms"><strong>${esc(e.title)}</strong><span>${esc(e.org)}${e.dates ? ` · ${esc(e.dates.replace(" to ", "–"))}` : ""}</span></li>`).join("")}</ul></div>
  </div>
</section>

${testimonials.some((t) => !t.placeholder) ? `<section class="s-white pad">
  <div class="wrap">
    <h2 class="disp h-sec mask"><span>What people say.</span></h2>
    <div class="tst-grid">
      ${testimonials.filter((t) => !t.placeholder).map((t, i) => `<figure class="tst reveal" style="--d:${(i % 2) * 120}ms"><figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption><blockquote>“${esc(t.quote)}”</blockquote></figure>`).join("")}
    </div>
  </div>
</section>` : ""}

<section id="contact" class="s-dark pad center">
  <div class="wrap">
    <h2 class="disp h-cta h-two"><span class="mask"><span>Let's build</span></span> <span class="mask"><span>what's next.</span></span></h2>
    <p class="lede reveal">Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
    <div class="btn-row reveal">
      <a class="btn fill-cream" href="mailto:${esc(profile.email)}?subject=${encodeURIComponent("Product design role")}">Email me</a>${hasResume ? `<a class="btn line" href="resume.pdf" download="Kavuthamraj-Resume.pdf">Download résumé</a>` : ""}
      <a class="btn line" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
    </div>
  </div>
</section>
${footer("")}`;

// Case studies moved over from the Framer site: meta, text blocks and screens, all local.
// Case-page helpers: tidy durations, tell client work from time-boxed concepts, fill missing summaries.
const durText = (d) => {
  const m = String(d || "").trim().match(/^(\d+)\s*(hour|day|week|month|year)s?$/i);
  if (!m) return d || "";
  const n = Number(m[1]), u = m[2].toLowerCase();
  return `${n} ${u}${n > 1 ? "s" : ""}`;
};
const isConcept = (c) => /self-initiated|concept/i.test(c.client || "") || /hour/i.test(c.duration || "") || /^[12] days?$/i.test(String(c.duration || "").trim()) && !/assignment/i.test(c.client || "");
const SUMMARIES = {
  assignment: "Web app design for Assignment' first-party data product, delivered in two days.",
  evento: "A concept for an event booking app: search, browse and pick concerts, sports and other events with less effort.",
  "sports-ecommerce": "A sports and fitness e-commerce storefront, designed in one week.",
  "next-messenger": "A concept for a cross-platform chat app for text, image, video and audio messages and stories.",
};

const fcPage = (key) => {
  const c = framerCases[key], r = "../";
  const proj = projects.find((p) => p.case === key) || {};
  const keys = ["titan", "cyberdine", "erp", "payroll", "assignment", "rang-clothing", "present-onboard", "sports-ecommerce", "redbus", "educonnect", "m-music", "evento", "next-messenger", "slay"].filter((k) => framerCases[k]), nextKey = keys[(keys.indexOf(key) + 1) % keys.length], next = { title: (projects.find((p) => p.case === nextKey) || {}).title || framerCases[nextKey].title };
  const title = proj.title || c.title;
  const summary = c.summary || proj.summary || SUMMARIES[key] || "";
  const lead = summary || (c.blocks.find((b) => b.t === "p") || {}).x || "";
  // Screens take the name of the section they sit in, so the alt text says what each one shows.
  let section = "";
  const render = (b) =>
    b.t === "img" ? `<figure class="shot reveal"><a href="${r}${esc(b.src)}" target="_blank" rel="noopener" title="Open full size"><img src="${r}${esc(b.src)}" width="${b.w}" height="${b.h}" alt="${esc(title)}${section ? `: ${esc(section)}` : ", screen"}" loading="lazy" decoding="async"></a></figure>`
    : b.t === "h2" ? ((section = b.x), `<h2 class="cs-h2 disp reveal" id="${slug(b.x)}">${esc(b.x)}</h2>`)
    : b.t === "h3" ? `<h3 class="cs-h3 reveal">${esc(b.x)}</h3>`
    : b.t === "poster" ? `<figure class="poster reveal">${b.items.map((i) => `<img src="${r}${esc(i.src)}" width="${i.w}" height="${i.h}" alt="ERP Solution for Sports Industry, full case study" loading="lazy" decoding="async">`).join("")}</figure>`
    : b.t === "chips" ? `<ul class="cs-chips reveal">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
    : b.t === "item" ? `<div class="cs-item reveal"><strong>${esc(b.l)}</strong><p>${esc(b.x)}</p></div>`
    : `<p class="cs-p reveal">${esc(b.x)}</p>`;
  return `${head({ title: `${title} | ${profile.short}`, desc: lead.slice(0, 160) || title, path: `/work/${key}.html`, image: `work/${thumb(proj.cover || key + ".png")}` })}
<div class="s-light">${header(r)}</div>
<main class="case" id="main">
  <a class="back mono rise" href="${r}index.html#work">← All work</a>
  <p class="mono eyebrow rise" style="--d:80ms">${isConcept(c) ? "Concept project · self-initiated or time-boxed" : "Case study"}</p>
  <h1 class="disp case-title rise" style="--d:160ms">${esc(title)}</h1>
  ${c.lead ? `<p class="lead rise" style="--d:260ms">${esc(c.lead)}</p><p class="lead-sub rise" style="--d:340ms">${esc(c.summary || "")}</p>` : summary ? `<p class="lead rise" style="--d:260ms">${esc(summary)}</p>` : ""}
  ${!c.lead && c.tags.length ? `<ul class="cs-chips rise" style="--d:320ms">${c.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
  <div class="case-media reveal"><img class="case-img" src="${r}work/${esc(thumb(proj.cover || key + ".png"))}" alt="" decoding="async" fetchpriority="high"></div>
  <dl class="meta">${(c.meta || [["Role", "UI/UX designer"], ["Client", c.client], ["Duration", durText(c.duration)], ["Type", isConcept(c) ? "Concept, time-boxed" : "Client project"]]).filter(([, v]) => v).map(([k, v], i) => `<div class="reveal" style="--d:${i * 90}ms"><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
  ${c.tldr ? `<dl class="tldr reveal">${c.tldr.map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
  <div class="cs">${c.blocks.map(render).join("\n")}</div>
  ${(c.links || []).length ? `<div class="cs-links reveal">${c.links.map(([l, h]) => `<a class="btn line-dark" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>` : ""}
  <section class="cs-cta reveal">
    <p class="mono">Hiring a product designer?</p>
    <h2 class="disp">Let's talk about your product.</h2>
    <p>Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
    <div class="btn-row"><a class="btn fill-brown" href="mailto:${esc(profile.email)}?subject=${encodeURIComponent("Product design role")}">Email me</a>${hasResume ? `<a class="btn line-dark" href="${r}resume.pdf" download="Kavuthamraj-Resume.pdf">Download résumé</a>` : ""}<a class="btn line-dark" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></div>
  </section>
  <a class="next-case reveal" href="${nextKey}.html"><span class="mono">Next case study</span><strong class="disp">${esc(next.title)}</strong><span aria-hidden="true">→</span></a>
</main>
${footer(r)}`;
};

const notFound = () => `${head({ title: `Page not found | ${profile.short}`, desc: "This page does not exist.", path: "/404.html" })}
<div class="s-light">${header("")}</div>
<main class="case" id="main"><p class="mono eyebrow">404</p><h1 class="disp case-title">Not found</h1><p class="lead">That page doesn't exist. <a href="index.html"><u>Back home</u></a>.</p></main>
${footer("")}`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT + "work", { recursive: true });
writeFileSync(OUT + "index.html", home());
for (const k of Object.keys(framerCases)) writeFileSync(OUT + `work/${k}.html`, fcPage(k));
writeFileSync(OUT + "404.html", notFound());
for (const f of ["styles.css", "main.js", "favicon.svg", "profile.webp", "profile-portrait.jpg"]) cpSync(STATIC + f, OUT + f);
if (hasResume) cpSync(STATIC + "resume.pdf", OUT + "resume.pdf");
cpSync(STATIC + "work", OUT + "work", { recursive: true });
writeFileSync(OUT + "robots.txt", `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`);
const urls = ["/", ...Object.keys(framerCases)].map((u) => (u === "/" ? u : `/work/${u}.html`));
writeFileSync(OUT + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${profile.url}${u}</loc></url>`).join("")}</urlset>\n`);
if (testimonials.some((t) => t.placeholder)) console.warn("WARNING: placeholder testimonials are still in src/data.mjs. Replace them before going live.");
console.log(`Built ${urls.length + 1} pages → dist/`);

// Experience helpers: "Sep 2025 to present" -> "1 yr 2 mos"; total years since the first role.
function xpParse(t) {
  if (/present/i.test(t)) { const n = new Date(); return n.getFullYear() * 12 + n.getMonth(); }
  const [m, y] = t.trim().split(" ");
  return Number(y) * 12 + "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(m) / 3;
}
function xpDuration(dates) {
  const [a, b] = dates.split(" to ");
  const n = xpParse(b) - xpParse(a) + 1, y = Math.floor(n / 12), m = n % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}
function xpYears() {
  const first = Math.min(...experience.map((e) => xpParse(e.dates.split(" to ")[0])));
  return Math.floor((xpParse("present") - first) / 12);
}
