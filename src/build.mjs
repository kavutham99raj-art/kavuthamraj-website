import { framerCases } from "./framer-cases.mjs";
import { writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  profile, projects, experience, skills, education, cases,
  heroCopy, impact, strengths, featured, testimonials,
} from "./data.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const STATIC = ROOT + "static/";
const OUT = ROOT + "dist/";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ext = (on) => (on ? ` target="_blank" rel="noopener"` : "");
const hasResume = existsSync(new URL("../static/resume.pdf", import.meta.url));
const linkedin = profile.links.find((l) => l.label === "LinkedIn").href;
const behance = profile.links.find((l) => l.label === "Behance").href;

const head = ({ title, desc, depth = 0 }) => {
  const r = depth ? "../" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${profile.url}${depth ? "/work/" : "/"}">
<meta property="og:title" content="${esc(title)}"><meta property="og:image" content="${profile.url}/profile-portrait.jpg"><meta name="twitter:card" content="summary_large_image">
<meta property="og:description" content="${esc(desc)}">
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
<a class="skip" href="#work">Skip to work</a>
<div class="progress" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><span class="glow"></span><span class="lens"></span><span class="ibeam"></span><span class="orb"></span><span class="disc">View</span><span class="tip"><svg class="arrow" viewBox="0 0 24 24"><path d="M3 2L3 19.5L7.6 15.4L10.6 22L13.4 20.8L10.5 14.4L17 14.4Z" fill="#1B120B" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></span></div>`;
};

const header = (r) => `<header class="top">
  <nav class="nav" id="nav" aria-label="Main">${[["Home", ""], ["Work", "#work"], ["About", "#about"], ["Experience", "#experience"], ["Skills", "#skills"]]
    .map(([t, h], i) => `${i ? '<span class="sep">/</span>' : ""}<a href="${r}index.html${h}">${t}</a>`)
    .join("")}</nav>
  ${hasResume ? `<a class="btn line-dark resume-btn" href="${r}resume.pdf" download="Kavuthamraj-Resume.pdf">Résumé</a>` : ""}<a class="btn fill-brown magnetic" href="${r}index.html#contact">Contact</a>
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

const featuredKeys = new Set(featured.map((f) => f.key));
const conceptRank = (p) => { const c = framerCases[p.case] || {}; return /self-initiated|concept/i.test(c.client || "") || /hour/i.test(c.duration || "") ? 1 : 0; };
const more = projects.filter((p) => !featuredKeys.has(p.key)).sort((a, b) => conceptRank(a) - conceptRank(b));

const home = () => `${head({ title: `${profile.name} | ${profile.role}`, desc: profile.intro })}
<section class="s-light hero">
  ${header("")}
  <div class="wrap">
    <div class="hero-stage">
      <h1 class="disp hero-first blend"><span class="line"><span class="ln" style="--d:100ms">${esc(profile.headline[0])}</span></span></h1>
      <figure class="hero-photo rise" style="--d:200ms">
        <span class="hp-img"><img src="profile.webp" alt="Portrait of ${esc(profile.name)}" decoding="async"></span>
        <span class="sel" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
        <span class="mascot" aria-hidden="true"><svg class="m-body" viewBox="0 0 92 96"><path d="M12 2h64a10 10 0 0 1 10 10v56L64 92H12A10 10 0 0 1 2 82V12A10 10 0 0 1 12 2z" fill="#E9B872"/><path d="M86 68 64 92V77a9 9 0 0 1 9-9z" fill="#C9964F"/><g class="m-eyes"><ellipse cx="31" cy="38" rx="6" ry="8" fill="#1B120B"/><ellipse cx="57" cy="38" rx="6" ry="8" fill="#1B120B"/><circle cx="33" cy="35" r="2.2" fill="#fff"/><circle cx="59" cy="35" r="2.2" fill="#fff"/></g><ellipse cx="20" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><ellipse cx="68" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><path d="M38 52q6 6 12 0" fill="none" stroke="#1B120B" stroke-width="3" stroke-linecap="round"/></svg><svg class="m-hands" viewBox="0 0 92 18"><rect x="13" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M19 6v6M25 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/><rect x="57" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M63 6v6M69 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <span class="mp mp1" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>PM</b></span><span class="mp mp2" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>Dev</b></span>
        <figcaption>${esc(profile.role)} at AffinityX.</figcaption>
      </figure>
      <p class="disp hero-last blend"><span class="line"><span class="ln" style="--d:300ms">${esc(profile.headline[1])}</span></span></p>
      <div class="hero-copy rise" style="--d:420ms">${heroCopy.map((t) => `<p>${esc(t)}</p>`).join("")}<div class="hero-proof"><span><b>5+</b>years designing</span><span><b>50K+</b>Play installs, Sporfy apps</span><span><b>52</b>component pages in Figma</span></div><div class="hero-cta"><a class="hcta" href="#work">View case studies</a><a class="hcta alt" href="mailto:${esc(profile.email)}">Email me</a></div></div>
    </div>
    <a class="scroll-cue" href="#about">Scroll to explore</a>
  </div>
</section>

<section class="s-dark pad statement">
  <div class="wrap center">
    <p class="disp stmt" data-words>Research the problem, <img class="pill" src="work/redbus.png" alt=""> design the system, <img class="pill" src="work/titan.png" alt=""> ship the product. <img class="pill" src="work/erp-solution.png" alt=""></p>
    <p class="disp stmt acc" data-words>End to end.</p>
  </div>
</section>

<section id="work" class="s-dark pad center">
  <div class="wrap">
    ${sec("Case studies")}
    <p class="lede reveal">Selected work across ERP, B2B SaaS, restaurant ordering and consumer apps. Each one starts with the people using it.</p>
  </div>
</section>
<div class="stack">${featured.map((f) => `<section class="feat s-${f.tone}">
  <div class="wrap">
    <a class="feat-media reveal" href="${esc(f.href)}"${ext(f.ext)}><img src="work/${esc(f.cover)}" alt="${esc(f.title)}" loading="lazy" decoding="async"></a>
    <h3 class="reveal">${esc(f.title)}</h3>
    <p class="reveal">${esc(f.text)}</p>
    ${f.stats ? `<ul class="feat-stats reveal">${f.stats.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    <a class="btn feat-btn magnetic reveal" href="${esc(f.href)}"${ext(f.ext)}>Explore the case study</a>
  </div>
</section>`).join("")}</div>

<section class="s-light pad">
  <div class="wrap">
    <h2 class="disp h-sec mask"><span>More work</span></h2>
    <div class="more-grid">
      ${more.map((p, i) => {
        const href = p.case ? `work/${p.case}.html` : p.link;
        return `<a class="mw reveal" data-tilt href="${esc(href)}"${ext(!p.case)} style="--d:${(i % 3) * 90}ms">
        <div class="m"><img src="work/${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy" decoding="async"></div>
        <h3>${esc(p.title)}</h3><span>${esc(p.tags.join(" · "))}</span></a>`;
      }).join("")}
    </div>
  </div>
</section>

<section id="about" class="s-black pad center">
  <div class="wrap">
    ${sec("About me")}
    <p class="lede reveal">I bring <b>5+ years of product design</b> across B2B SaaS, ERP and consumer apps, at <span class="co">AffinityX</span>, <span class="co">Liffto Technologies</span>, <span class="co">SRM Technologies</span> and <span class="co">Sporfy</span>.</p>
    <p class="lede reveal">I work across research, information architecture, interaction design and visual systems, and I prototype in Figma, Framer and Claude so ideas get tested before they get built. ${esc(profile.location)}.</p>
    <div class="btn-row reveal">
      <a class="btn fill-cream magnetic" href="mailto:${esc(profile.email)}">Email me</a>
      <a class="btn line magnetic" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
</section>

<section class="s-dark pad center">
  <div class="wrap">
    ${sec("Design that ships", "to real users.")}
    <div class="impact-grid">
      ${impact.map((m, i) => `<article class="imp reveal" style="--d:${i * 120}ms">
        <div class="block tone-${m.tone}"><span class="num">${esc(m.value)}</span></div>
        <h3>${esc(m.label)}</h3>
        <p>${esc(m.text)}</p>
        <a class="btn imp-btn" href="${esc(m.href)}"${ext(m.ext)}>${esc(m.cta)}</a>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="s-black pad center">
  <div class="wrap">
    ${sec("Understand the problem.")}
    <h2 class="disp h-sec mask acc-line"><span>Design the system.</span></h2>
    <p class="lede reveal">Good products come from clear problems, shared patterns and decisions you can explain to the people who build them.</p>
    <div class="str-grid">
      ${strengths.map((s, i) => `<div class="str reveal" style="--d:${(i % 2) * 120}ms"><span class="n">${String(i + 1).padStart(2, "0")}</span><div><h3 class="disp">${esc(s.t)}</h3><p>${esc(s.d)}</p></div></div>`).join("")}
    </div>
  </div>
</section>

<section id="experience" class="s-dark pad xp">
  <div class="wrap xp-grid">
    <div class="xp-side">
      <h2 class="disp h-sec mask"><span>Experience</span></h2>
      <p class="xp-sum reveal"><span><b>${xpYears()}+</b>years</span><span><b>${experience.length}</b>product teams</span></p>
      <p class="xp-lede reveal">From a B2C sports app to enterprise B2B SaaS, designing end to end at every stop.</p>
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

<section id="skills" class="s-light pad">
  <div class="wrap">
    <h2 class="disp h-sec mask"><span>Skills</span></h2>
    <div class="skills">
      ${Object.entries(skills).map(([g, items], gi) => `<div class="skill-group reveal" style="--d:${gi * 110}ms"><h3 class="mono">${esc(g)}</h3><ul>${items.map((it, j) => `<li style="--d:${j * 40}ms">${esc(it)}</li>`).join("")}</ul></div>`).join("")}
    </div>
    <div class="edu reveal"><h3 class="mono">Education</h3><ul>${education.map((e, j) => `<li style="--d:${j * 90}ms"><strong>${esc(e.title)}</strong><span>${esc(e.org)}${e.dates ? ` · ${esc(e.dates)}` : ""}</span></li>`).join("")}</ul></div>
  </div>
</section>

<section class="s-white pad">
  <div class="wrap">
    <h2 class="disp h-sec mask center"><span>Always designing</span></h2>
    <div class="always">
      <div class="always-copy reveal">
        <p class="always-lead">Five years of product design, shipped every month, in Figma.</p>
        <dl class="proof">
          <div><dt>Design systems</dt><dd>Built Titan's MUI v6 library in Figma: 52 component pages on variables and auto layout.</dd></div>
          <div><dt>End to end</dt><dd>Designed Sporfy's sports ERP solo, from research to developer-ready screens.</dd></div>
          <div><dt>Real users</dt><dd>Sporfy apps I designed passed 50K+ installs on Google Play.</dd></div>
        </dl>
        <a class="u" href="#work">See the case studies</a>
      </div>
      <figure class="heat reveal">
        <div class="heat-row heat-head"><span></span>${"JFMAMJJASOND".split("").map((m) => `<span>${m}</span>`).join("")}</div>
        ${heatRows().map((r) => `<div class="heat-row"><span class="yr">${r.y}</span>${r.cells.map((n) => `<i class="${n < 0 ? "lx" : "l" + n}"></i>`).join("")}</div>`).join("")}
        <figcaption><span>Designing in Figma &amp; XD, every month since July 2021</span><span class="legend">less <i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> more</span></figcaption>
      </figure>
    </div>
  </div>
</section>

${testimonials.some((t) => !t.placeholder) ? `<section class="s-light pad">
  <div class="wrap">
    <h2 class="disp h-sec mask"><span>What people say.</span></h2>
    <div class="tst-grid">
      ${testimonials.filter((t) => !t.placeholder).map((t, i) => `<figure class="tst reveal" style="--d:${(i % 2) * 120}ms"><figcaption><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></figcaption><blockquote>“${esc(t.quote)}”</blockquote></figure>`).join("")}
    </div>
  </div>
</section>` : ""}

<section id="contact" class="s-dark pad center">
  <div class="wrap">
    <h2 class="disp h-cta mask"><span>Let's build</span></h2>
    <h2 class="disp h-cta mask"><span>what's next.</span></h2>
    <p class="lede reveal">Open to Senior Product Designer and UI/UX roles, full-time, on-site or remote.</p>
    <div class="btn-row reveal">
      <a class="btn fill-cream magnetic" href="mailto:${esc(profile.email)}">Email me</a>${hasResume ? `<a class="btn line magnetic" href="resume.pdf" download="Kavuthamraj-Resume.pdf">Download résumé</a>` : ""}
      <a class="btn line magnetic" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn line magnetic" href="${behance}" target="_blank" rel="noopener">Behance</a>
    </div>
  </div>
</section>
${footer("")}`;

const casePage = (key) => {
  const c = cases[key];
  const r = "../";
  return `${head({ title: `${c.title} | ${profile.short}`, desc: c.summary, depth: 1 })}
<div class="s-light">${header(r)}</div>
<main class="case">
  <a class="back mono rise" href="${r}index.html#work">← All work</a>
  <p class="mono eyebrow rise" style="--d:80ms">Case study</p>
  <h1 class="disp case-title rise" style="--d:160ms">${esc(c.title)}</h1>
  <p class="lead rise" style="--d:260ms">${esc(c.lead)}</p>
  <p class="lead-sub rise" style="--d:340ms">${esc(c.summary)}</p>
  <div class="case-media reveal"><img class="case-img" src="${r}work/${esc(c.cover)}" alt="${esc(c.title)}" decoding="async"></div>
  <dl class="meta">${c.meta.map(([k, v], i) => `<div class="reveal" style="--d:${i * 90}ms"><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
  <div class="case-body">${c.body.map((p) => `<p class="reveal">${esc(p)}</p>`).join("")}</div>
  ${c.link ? `<p class="reveal"><a class="btn fill-brown magnetic" href="${esc(c.link)}" target="_blank" rel="noopener">View full case study</a></p>` : ""}
</main>
${footer(r)}`;
};

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
  const keys = ["erp", "titan", "cyberdine", "payroll", "assignment", "rang-clothing", "present-onboard", "educonnect", "redbus", "sports-ecommerce", "evento", "m-music", "next-messenger", "slay"].filter((k) => framerCases[k]), nextKey = keys[(keys.indexOf(key) + 1) % keys.length], next = { title: (projects.find((p) => p.case === nextKey) || {}).title || framerCases[nextKey].title };
  const title = proj.title || c.title;
  const summary = c.summary || proj.summary || SUMMARIES[key] || "";
  const lead = summary || (c.blocks.find((b) => b.t === "p") || {}).x || "";
  const render = (b) =>
    b.t === "img" ? `<figure class="shot reveal"><img src="${r}${esc(b.src)}" width="${b.w}" height="${b.h}" alt="${esc(c.title)} screen" loading="lazy" decoding="async"></figure>`
    : b.t === "h2" ? `<h2 class="cs-h2 disp reveal">${esc(b.x)}</h2>`
    : b.t === "h3" ? `<h3 class="cs-h3 reveal">${esc(b.x)}</h3>`
    : b.t === "poster" ? `<figure class="poster reveal">${b.items.map((i) => `<img src="${r}${esc(i.src)}" width="${i.w}" height="${i.h}" alt="ERP Solution for Sports Industry, full case study" loading="lazy" decoding="async">`).join("")}</figure>`
    : b.t === "chips" ? `<ul class="cs-chips reveal">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
    : b.t === "item" ? `<div class="cs-item reveal"><strong>${esc(b.l)}</strong><p>${esc(b.x)}</p></div>`
    : `<p class="cs-p reveal">${esc(b.x)}</p>`;
  return `${head({ title: `${title} | ${profile.short}`, desc: lead.slice(0, 160) || title, depth: 1 })}
<div class="s-light">${header(r)}</div>
<main class="case">
  <a class="back mono rise" href="${r}index.html#work">← All work</a>
  <p class="mono eyebrow rise" style="--d:80ms">${isConcept(c) ? "Concept project" : "Case study"}</p>
  <h1 class="disp case-title rise" style="--d:160ms">${esc(title)}</h1>
  ${c.lead ? `<p class="lead rise" style="--d:260ms">${esc(c.lead)}</p><p class="lead-sub rise" style="--d:340ms">${esc(c.summary || "")}</p>` : summary ? `<p class="lead rise" style="--d:260ms">${esc(summary)}</p>` : ""}
  ${!c.lead && c.tags.length ? `<ul class="cs-chips rise" style="--d:320ms">${c.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
  <div class="case-media reveal"><img class="case-img" src="${r}work/${esc(proj.cover || key + ".png")}" alt="${esc(c.title)}" decoding="async"></div>
  <dl class="meta">${(c.meta || [["Role", "UI/UX designer"], ["Client", c.client], ["Duration", durText(c.duration)], ["Type", isConcept(c) ? "Concept, time-boxed" : "Client project"]]).filter(([, v]) => v).map(([k, v], i) => `<div class="reveal" style="--d:${i * 90}ms"><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
  ${c.tldr ? `<div class="tldr reveal">${c.tldr.map(([k, v]) => `<div><dt class="mono">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</div>` : ""}
  <div class="cs">${c.blocks.map(render).join("\n")}</div>
  ${(c.links || []).length ? `<div class="cs-links reveal">${c.links.map(([l, h]) => `<a class="btn line-dark magnetic" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join("")}</div>` : ""}
  <section class="cs-cta reveal">
    <p class="mono">Like what you see?</p>
    <h2 class="disp">I'd love to design for your team.</h2>
    <p>Open to Senior Product Designer and UI/UX roles, full-time, on-site or remote.</p>
    <div class="btn-row"><a class="btn fill-brown magnetic" href="mailto:${esc(profile.email)}">Email me</a><a class="btn line-dark magnetic" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
  </section>
  <a class="next-case reveal" href="${nextKey}.html"><span class="mono">Next case study</span><strong class="disp">${esc(next.title)}</strong><span aria-hidden="true">→</span></a>
</main>
${footer(r)}`;
};

const notFound = () => `${head({ title: `Page not found | ${profile.short}`, desc: "This page does not exist." })}
<div class="s-light">${header("")}</div>
<main class="case"><p class="mono eyebrow">404</p><h1 class="disp case-title">Not found</h1><p class="lead">That page doesn't exist. <a href="index.html"><u>Back home</u></a>.</p></main>
${footer("")}`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT + "work", { recursive: true });
writeFileSync(OUT + "index.html", home());
for (const k of Object.keys(cases)) writeFileSync(OUT + `work/${k}.html`, casePage(k));
for (const k of Object.keys(framerCases)) writeFileSync(OUT + `work/${k}.html`, fcPage(k));
writeFileSync(OUT + "404.html", notFound());
for (const f of ["styles.css", "main.js", "favicon.svg", "profile.webp", "profile-portrait.jpg"]) cpSync(STATIC + f, OUT + f);
if (hasResume) cpSync(STATIC + "resume.pdf", OUT + "resume.pdf");
cpSync(STATIC + "work", OUT + "work", { recursive: true });
writeFileSync(OUT + "robots.txt", `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`);
const urls = ["/", ...new Set([...Object.keys(cases), ...Object.keys(framerCases)])].map((u) => (u === "/" ? u : `/work/${u}.html`));
writeFileSync(OUT + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${profile.url}${u}</loc></url>`).join("")}</urlset>\n`);
if (testimonials.some((t) => t.placeholder)) console.warn("WARNING: placeholder testimonials are still in src/data.mjs. Replace them before going live.");
console.log(`Built ${urls.length + 1} pages → dist/`);

// Visual pattern for "Always designing": every month since Jul 2021 is filled; shades are decorative, not counts.
function heatRows() {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const now = new Date();
  return [2021, 2022, 2023, 2024, 2025, 2026].map((y) => ({
    y,
    cells: Array.from({ length: 12 }, (_, m) => {
      if (y === 2021 && m < 6) return 0;
      if (y > now.getFullYear() || (y === now.getFullYear() && m > now.getMonth())) return -1;
      return Math.min(4, 1 + Math.floor(rnd() * 3 + (y - 2021) * 0.3));
    }),
  }));
}

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
