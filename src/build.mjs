import { framerCases } from "./framer-cases.mjs";
import { writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  profile, projects, experience, skills, education, companies,
  heroCopy, proof, strengths, featured, testimonials,
} from "./data.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const STATIC = ROOT + "static/";
const OUT = ROOT + "dist/";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Headlines: *asterisks* mark the phrase set in the accent colour (an <em>, styled upright).
const rich = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
const plain = (s) => String(s ?? "").replace(/\*/g, "");
// Cards and case-page headers use the 1200px JPEG copies in static/work/covers (made with sips from the originals).
const thumb = (file) => `covers/${String(file).replace(/\.\w+$/, ".jpg")}`;
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hasResume = existsSync(new URL("../static/resume.pdf", import.meta.url));
const linkedin = profile.links.find((l) => l.label === "LinkedIn").href;
const behance = profile.links.find((l) => l.label === "Behance").href;
const resumeLink = (r, cls, label) => (hasResume ? `<a class="${cls}" href="${r}resume.pdf" download="Kavuthamraj-Resume.pdf">${label}</a>` : "");
const mailto = `mailto:${esc(profile.email)}?subject=${encodeURIComponent("Product design role")}`;
// Section labels read like Figma frame names: number, then name.
const frame = (n, label) => `<p class="frame"><span>${n}</span>${esc(label)}</p>`;

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
<meta name="theme-color" content="#f3efe8">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Krona+One&family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}styles.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip" href="${path === "/" ? "#work" : "#main"}">Skip to ${path === "/" ? "work" : "content"}</a>
<div class="you-cursor" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>You</b></div>`;
};

const header = (r) => `<header class="top">
  <div class="top-in">
    <a class="brand" href="${r}index.html" aria-label="${esc(profile.name)}, home"><b>${esc(profile.short)}</b><span>${esc(profile.role)}</span></a>
    <nav class="nav" id="nav" aria-label="Main">${[["Work", "#work"], ["How I work", "#approach"], ["Experience", "#experience"], ["About", "#about"]]
      .map(([t, h]) => `<a href="${r}index.html${h}">${t}</a>`)
      .join("")}<a class="nav-m" href="${r}index.html#contact">Contact</a>${resumeLink(r, "nav-m", "Résumé (PDF)")}</nav>
    <div class="top-act">${resumeLink(r, "btn ghost", "Résumé")}<a class="btn solid" href="${r}index.html#contact">Contact</a></div>
    <button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
  </div>
</header>`;

const footer = (r) => `<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <p class="foot-name">${esc(profile.name)}</p>
      <p class="foot-role">${esc(profile.role)} · Tiruppur, India · <time class="foot-time">IST</time></p>
    </div>
    <ul>
      <li><a href="${r}index.html#work">Work</a></li>
      <li><a href="${r}index.html#experience">Experience</a></li>
      <li><a href="${r}index.html#about">About</a></li>
    </ul>
    <ul>
      <li><a href="${mailto}">Email</a></li>
      <li><a href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></li>
      <li><a href="${behance}" target="_blank" rel="noopener">Behance ↗</a></li>
    </ul>
  </div>
  <p class="foot-mark disp" aria-label="UX by Raj">${[..."UX BY RAJ"].map((ch, i) => (ch === " " ? `<span class="sp" aria-hidden="true"> </span>` : `<span aria-hidden="true" style="--i:${i}">${ch}</span>`)).join("")}</p>
  <div class="wrap foot-bar">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)}</span>
    <span>Designed in Figma, coded as a static site.</span>
    <a href="#">Back to top ↑</a>
  </div>
</footer>
<script src="${r}main.js" defer></script>
</body>
</html>`;

// Real UI for a project card or case page: a before/after slide, or a row of phone screens.
const visual = (v, r = "") =>
  v.phones
    ? `<div class="phones-panel">${v.phones.map((p) => `<img src="${r}${esc(p.src)}" alt="Sporfy Tracker: ${esc(p.cap)}" loading="lazy" decoding="async">`).join("")}</div>`
    : `<img src="${r}${esc(v.src)}" alt="${esc(v.alt)}" width="1600" height="1000" loading="lazy" decoding="async">`;

const outcomes = (list) => `<dl class="outcomes">${list.map(([n, l]) => `<div><dt>${esc(n)}</dt><dd>${esc(l)}</dd></div>`).join("")}</dl>`;

// Home: flagship work first, then other client work, then concepts as a plain list.
const featuredKeys = new Set(featured.map((f) => f.key));
const others = projects.filter((p) => !featuredKeys.has(p.key));
const clientWork = () => others.filter((p) => !isConcept(framerCases[p.case] || {}));
const concepts = () => others.filter((p) => isConcept(framerCases[p.case] || {}));

const home = () => `${head({ title: `${profile.name} | ${profile.role}`, desc: profile.intro })}
${header("")}
<section class="hero canvas">
  <div class="wrap">
    <p class="avail rise"><i aria-hidden="true"></i>${esc(profile.availability)}</p>
    <div class="hero-stage">
      <h1 class="hero-name"><span class="disp hero-first"><span class="line"><span class="ln" style="--d:60ms">${esc(profile.headline[0])}</span></span></span><span class="disp hero-last">${esc(profile.headline[1])}</span></h1>
      <figure class="hero-photo rise" style="--d:160ms">
        <span class="hp-img"><img src="profile.webp" alt="Portrait of ${esc(profile.name)}" width="944" height="1132" decoding="async" fetchpriority="high"></span>
        <span class="sel" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
        <span class="mascot" aria-hidden="true"><svg class="m-body" viewBox="0 0 92 96"><path d="M12 2h64a10 10 0 0 1 10 10v56L64 92H12A10 10 0 0 1 2 82V12A10 10 0 0 1 12 2z" fill="#E9B872"/><path d="M86 68 64 92V77a9 9 0 0 1 9-9z" fill="#C9964F"/><g class="m-eyes"><ellipse cx="31" cy="38" rx="6" ry="8" fill="#1B120B"/><ellipse cx="57" cy="38" rx="6" ry="8" fill="#1B120B"/><circle cx="33" cy="35" r="2.2" fill="#fff"/><circle cx="59" cy="35" r="2.2" fill="#fff"/></g><ellipse cx="20" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><ellipse cx="68" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><path d="M38 52q6 6 12 0" fill="none" stroke="#1B120B" stroke-width="3" stroke-linecap="round"/></svg><svg class="m-hands" viewBox="0 0 92 18"><rect x="13" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M19 6v6M25 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/><rect x="57" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M63 6v6M69 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <span class="mp mp1" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>PM</b></span><span class="mp mp2" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>Dev</b></span>
        <figcaption>Now at AffinityX</figcaption>
      </figure>
      <div class="hero-copy rise" style="--d:220ms">
        <p class="hero-eyebrow label">${esc(heroCopy.eyebrow)}</p>
        <p class="hero-lead">${rich(heroCopy.lead)}</p>
        <p class="hero-sub">${esc(heroCopy.sub)}</p>
        <div class="hero-cta"><a class="btn solid lg" href="#work">See the work</a>${resumeLink("", "btn ghost lg", "Résumé (PDF)")}<a class="text-link" href="${mailto}">${esc(profile.email)}</a></div>
        <dl class="hero-proof">${proof.map((x) => `<div><dt>${esc(x.value)}</dt><dd>${esc(x.label)}</dd></div>`).join("")}</dl>
      </div>
    </div>
    <div class="shipped"><p class="label">Designed for</p><ul>${companies.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
  </div>
</section>

<section id="work" class="sec">
  <div class="wrap">
    <div class="sec-head">
      ${frame("02", "Selected work")}
      <h2 class="krona h2 reveal">Three products, <em>shipped.</em></h2>
      <p class="sec-lede reveal">Enterprise SaaS, restaurant ordering and a sports ERP. Each case shows the problem, the decisions I made, and what changed.</p>
    </div>
    <div class="cards">
      ${featured.map((f, i) => `<article class="card${i % 2 ? " flip" : ""} reveal" aria-labelledby="c-${f.key}">
        <a class="card-visual${f.visual.phones ? " is-phones" : ""}" href="${esc(f.href)}" tabindex="-1" aria-hidden="true">${visual(f.visual)}</a>
        <div class="card-copy">
          <p class="card-meta label"><span>0${i + 1}</span>${f.meta.map(esc).join(" · ")}</p>
          <h3 id="c-${f.key}"><a href="${esc(f.href)}">${rich(f.title)}</a></h3>
          <p class="card-text">${esc(f.text)}</p>
          ${outcomes(f.outcomes)}
          <a class="arrow-link" href="${esc(f.href)}" aria-hidden="true" tabindex="-1">Read the case study <span>→</span></a>
        </div>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

<section id="more" class="sec sec-tight">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("03", "More work")}<h2 class="krona h2 reveal">More client work</h2></div>
      <p class="sec-lede reveal">Shorter engagements: payroll, data products, e-commerce and healthcare.</p>
    </div>
    <div class="tiles">
      ${clientWork().map((p, i) => {
        const c = framerCases[p.case] || {};
        return `<a class="tile reveal" href="work/${esc(p.case)}.html" style="--d:${(i % 3) * 80}ms">
        <span class="tile-img"><img src="work/${esc(thumb(p.cover))}" alt="" loading="lazy" decoding="async"></span>
        <span class="tile-meta label">${esc([c.client, durText(c.duration)].filter(Boolean).join(" · "))}</span>
        <strong>${esc(p.title)}</strong></a>`;
      }).join("")}
    </div>
    <div class="concepts reveal">
      <p class="label">Concepts and explorations <span>Self-initiated or time-boxed, kept for range</span></p>
      <ul>${concepts().map((p) => { const c = framerCases[p.case] || {}; return `<li><a href="work/${esc(p.case)}.html"><strong>${esc(p.title)}</strong><span>${esc([durText(c.duration), ...p.tags.slice(0, 2)].filter(Boolean).join(" · "))}</span><i aria-hidden="true">→</i></a></li>`; }).join("")}</ul>
    </div>
  </div>
</section>

<section id="approach" class="sec night">
  <div class="wrap">
    <div class="sec-head">
      ${frame("04", "How I work")}
      <h2 class="krona h2 reveal">Understand the problem. <em>Design the system.</em></h2>
    </div>
    <ol class="principles">
      ${strengths.map((s, i) => `<li class="reveal" style="--d:${i * 80}ms"><span class="label">0${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><a class="arrow-link" href="${esc(s.href)}">${esc(s.cta)} <span>→</span></a></li>`).join("")}
    </ol>
  </div>
</section>

<section id="experience" class="sec">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("05", "Experience")}<h2 class="krona h2 reveal">${xpYears()}+ years, <em>${experience.length} product teams.</em></h2></div>
      ${resumeLink("", "btn ghost", "Download résumé")}
    </div>
    <ol class="xp">
      ${experience.map((e) => `<li class="reveal">
        <p class="xp-when label">${esc(e.dates.replace(" to ", " – ").replace("present", "Present"))}<span>${xpDuration(e.dates)}</span></p>
        <div class="xp-who"><h3>${esc(e.company)}${/present/i.test(e.dates) ? ' <span class="now">Now</span>' : ""}</h3><p>${esc(e.role)}</p></div>
        <div class="xp-what"><p>${esc(e.note)}</p><ul class="tags">${(e.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section id="about" class="sec canvas">
  <div class="wrap">
    <div class="about">
      <div>${frame("06", "About")}<h2 class="krona h2 reveal">About</h2></div>
      <div class="about-copy">${profile.about.map((t) => `<p class="reveal">${esc(t)}</p>`).join("")}</div>
    </div>
    <div class="facts" id="skills">
      ${Object.entries(skills).map(([g, items]) => `<div class="reveal"><h3 class="label">${esc(g)}</h3><ul>${items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul></div>`).join("")}
      <div class="reveal"><h3 class="label">Education</h3><ul class="edu">${education.map((e) => `<li><strong>${esc(e.title)}</strong><span>${esc(e.org)}${e.dates ? ` · ${esc(e.dates.replace(" to ", "–"))}` : ""}</span></li>`).join("")}</ul></div>
    </div>
  </div>
</section>

${testimonials.some((t) => !t.placeholder) ? `<section class="sec">
  <div class="wrap">
    <div class="sec-head">${frame("07", "References")}<h2 class="krona h2">What people say</h2></div>
    <div class="quotes">
      ${testimonials.filter((t) => !t.placeholder).map((t) => `<figure class="reveal"><blockquote>“${esc(t.quote)}”</blockquote><figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption></figure>`).join("")}
    </div>
  </div>
</section>` : ""}

<section id="contact" class="sec night contact">
  <div class="wrap">
    ${frame(testimonials.some((t) => !t.placeholder) ? "08" : "07", "Contact")}
    <h2 class="krona display reveal">Let's build <em>what's next.</em></h2>
    <p class="contact-lede reveal">Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
    <a class="contact-mail reveal" href="${mailto}">${esc(profile.email)}<span aria-hidden="true">↗</span></a>
    <div class="contact-act reveal">${resumeLink("", "btn light", "Download résumé")}<a class="btn ghost-light" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></div>
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
const ORDER = ["titan", "cyberdine", "erp", "payroll", "assignment", "rang-clothing", "present-onboard", "sports-ecommerce", "redbus", "educonnect", "m-music", "evento", "next-messenger", "slay"];

const fcPage = (key) => {
  const c = framerCases[key], r = "../";
  const proj = projects.find((p) => p.case === key) || {};
  const feat = featured.find((f) => f.key === key);
  const keys = ORDER.filter((k) => framerCases[k]), nextKey = keys[(keys.indexOf(key) + 1) % keys.length];
  const nextTitle = (projects.find((p) => p.case === nextKey) || {}).title || framerCases[nextKey].title;
  const title = proj.title || c.title;
  const name = title.split(":")[0];
  const summary = c.summary || proj.summary || SUMMARIES[key] || "";
  const desc = summary || (c.blocks.find((b) => b.t === "p") || {}).x || title;
  const h1 = feat ? feat.title : c.lead || title;
  const concept = isConcept(c);
  const eyebrow = [concept ? "Concept" : "Case study", ...(feat ? feat.meta : [c.client, durText(c.duration)])].filter(Boolean);
  const chapters = c.blocks.filter((b) => b.t === "h2").map((b) => b.x);
  // Screens take the name of the section they sit in, so the alt text says what each one shows.
  let section = "";
  const render = (b) =>
    b.t === "img" ? `<figure class="shot reveal"><a href="${r}${esc(b.src)}" target="_blank" rel="noopener" title="Open full size"><img src="${r}${esc(b.src)}" width="${b.w}" height="${b.h}" alt="${esc(name)}${section ? `: ${esc(section)}` : ", screen"}" loading="lazy" decoding="async"></a></figure>`
    : b.t === "h2" ? ((section = b.x), `<h2 class="krona cs-h2 reveal" id="${slug(b.x)}">${esc(b.x)}</h2>`)
    : b.t === "h3" ? `<h3 class="cs-h3 reveal">${esc(b.x)}</h3>`
    : b.t === "phones" ? `<div class="phones-panel wide reveal">${b.items.map((i) => `<figure><img src="${r}${esc(i.src)}" alt="${esc(name)}: ${esc(i.cap)}" loading="lazy" decoding="async"><figcaption class="label">${esc(i.cap)}</figcaption></figure>`).join("")}</div>`
    : b.t === "poster" ? `<figure class="poster reveal">${b.items.map((i) => `<img src="${r}${esc(i.src)}" width="${i.w}" height="${i.h}" alt="${esc(title)}, case-study board" loading="lazy" decoding="async">`).join("")}</figure>`
    : b.t === "chips" ? `<ul class="cs-chips reveal">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
    : b.t === "item" ? `<div class="cs-item reveal"><strong>${esc(b.l)}</strong><p>${esc(b.x)}</p></div>`
    : `<p class="cs-p reveal">${esc(b.x)}</p>`;
  const meta = (c.meta || [["Role", "UI/UX designer"], ["Client", c.client], ["Duration", durText(c.duration)], ["Type", concept ? "Concept, time-boxed" : "Client project"]]).filter(([, v]) => v);
  return `${head({ title: `${title} | ${profile.short}`, desc: desc.slice(0, 160), path: `/work/${key}.html`, image: `work/${thumb(proj.cover || key + ".png")}` })}
${header(r)}
<main class="case" id="main">
  <div class="wrap case-head canvas-pad">
    <nav class="crumbs label" aria-label="Breadcrumb"><a href="${r}index.html#work">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>
    <p class="frame rise"><span>${concept ? "C" : "CS"}</span>${eyebrow.map(esc).join(" · ")}</p>
    <h1 class="case-h1 rise" style="--d:80ms">${rich(h1)}</h1>
    ${summary && summary !== plain(h1) ? `<p class="case-sum rise" style="--d:160ms">${esc(summary)}</p>` : ""}
    ${!c.lead && !feat && c.tags.length ? `<ul class="cs-chips rise" style="--d:200ms">${c.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
  </div>
  <div class="wrap">
    <figure class="case-cover rise" style="--d:240ms"><img src="${r}work/${esc(thumb(proj.cover || key + ".png"))}" alt="" decoding="async" fetchpriority="high"></figure>
    <dl class="case-meta reveal">${meta.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    ${feat || c.tldr ? `<section class="glance reveal" aria-label="At a glance">
      ${feat ? outcomes(feat.outcomes) : ""}
      ${c.tldr ? `<dl class="tldr">${c.tldr.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    </section>` : ""}
    <div class="case-body${chapters.length > 2 ? " has-toc" : ""}">
      ${chapters.length > 2 ? `<nav class="toc" aria-label="Chapters"><p class="label">Chapters</p><ol>${chapters.map((h) => `<li><a href="#${slug(h)}">${esc(h)}</a></li>`).join("")}</ol></nav>` : ""}
      <article class="cs">${c.blocks.map(render).join("\n")}
      ${(c.links || []).length ? `<div class="cs-links">${c.links.map(([l, h]) => `<a class="btn ghost" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>` : ""}</article>
    </div>
    <section class="cs-cta night reveal">
      ${frame("→", "Hiring a product designer?")}
      <h2 class="krona">Let's talk about <em>your product.</em></h2>
      <p>Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
      <div class="contact-act"><a class="btn light" href="${mailto}">Email me</a>${resumeLink(r, "btn ghost-light", "Download résumé")}<a class="btn ghost-light" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></div>
    </section>
    <a class="next-case reveal" href="${nextKey}.html"><span class="label">Next case study</span><strong class="krona">${esc(nextTitle)}</strong><i aria-hidden="true">→</i></a>
  </div>
</main>
${footer(r)}`;
};

const notFound = () => `${head({ title: `Page not found | ${profile.short}`, desc: "This page does not exist.", path: "/404.html" })}
${header("")}
<main class="case" id="main"><div class="wrap case-head canvas-pad"><p class="frame"><span>404</span>Not found</p><h1 class="case-h1">This frame <em>doesn't exist.</em></h1><p class="case-sum"><a class="arrow-link" href="index.html">Back to the portfolio <span>→</span></a></p></div></main>
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
