import { framerCases } from "./framer-cases.mjs";
import { writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import {
  profile, projects, experience, skills, education, companies,
  heroCopy, proof, strengths, featured, testimonials, recommendationsUrl,
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
// 600w covers and 900w slides for small screens live beside the originals (made with sips).
const small = (src) => String(src).replace(/(\.\w+)$/, "-900$1");
const thumbSet = (file) => `work/${thumb(file).replace("covers/", "covers/600/")} 600w, work/${thumb(file)} 1200w`;
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hasResume = existsSync(new URL("../static/resume.pdf", import.meta.url));
// Content hashes on CSS and JS links, so browsers fetch the new files after every change.
const v = (file) => createHash("sha1").update(readFileSync(STATIC + file)).digest("hex").slice(0, 8);
const cssV = v("styles.css"), jsV = v("main.js");
const linkedin = profile.links.find((l) => l.label === "LinkedIn").href;
const behance = profile.links.find((l) => l.label === "Behance").href;
const resumeFile = "Kavuthamraj_Resume_UI_UX_Product_Designer.pdf"; // name the visitor's download gets
const resumeLink = (r, cls, label) => (hasResume ? `<a class="${cls}" href="${r}resume.pdf" download="${resumeFile}">${label}</a>` : "");
const mailto = `mailto:${esc(profile.email)}?subject=${encodeURIComponent("Product design role")}`;
// Section labels read like Figma frame names: number, then name.
const frame = (n, label) => `<p class="frame"><span>${n}</span> ${esc(label)}</p>`;
const newTab = `<span class="sr"> (opens in new tab)</span>`;

const head = ({ title, desc, path = "/", image = "profile-portrait.jpg", type = "website", noindex = false, extra = "" }) => {
  const r = path.startsWith("/work/") ? "../" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${profile.url}${path}">`}
<meta property="og:title" content="${esc(title)}"><meta property="og:image" content="${profile.url}/${esc(image)}"><meta name="twitter:card" content="summary_large_image">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${profile.url}${path}">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="${esc(profile.name)}"><meta property="og:image:alt" content="${esc(title)}">${extra}
<meta name="theme-color" content="#f3efe8">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Krona+One&family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}styles.css?v=${cssV}">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="you-cursor" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><i class="beam"></i><b>You</b></div>`;
};

const header = (r) => `<header class="top" id="top">
  <div class="top-in">
    <a class="brand" href="${r}index.html" aria-label="${esc(profile.name)}, home"><b>${esc(profile.short)}</b><span>${esc(profile.role)}</span></a>
    <button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Main">${[["Work", "#work"], ["How I work", "#approach"], ["Experience", "#experience"], ["About", "#about"]]
      .map(([t, h]) => `<a href="${r}index.html${h}">${t}</a>`)
      .join("")}<a class="nav-m" href="${r}index.html#contact">Contact</a>${resumeLink(r, "nav-m", "Resume (PDF)")}</nav>
    <div class="top-act">${resumeLink(r, "btn ghost", "Resume")}
      <div class="talk">
        <button class="btn solid talk-btn" type="button" aria-expanded="false" aria-controls="talk-pop">Let's talk<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="talk-pop" id="talk-pop" hidden>
          <a class="talk-row" href="${mailto}"><b>Email me</b><span>Opens your mail app, subject filled in</span><i aria-hidden="true">→</i></a>
          <button class="talk-row copy-mail" type="button" data-copy="${esc(profile.email)}"><b>Copy email address</b><span>${esc(profile.email)}</span><i aria-hidden="true">⧉</i></button>
          <a class="talk-row" href="${linkedin}" target="_blank" rel="noopener"><b>Message on LinkedIn</b><span>Connect or send a message</span><i aria-hidden="true">↗</i>${newTab}</a>
          <span class="sr copy-status" role="status" aria-live="polite"></span>
        </div>
      </div>
    </div>
  </div>
</header>`;

// Footer: the closing frame. Status and local time, two link columns, then the wordmark whose letters
// select like Figma layers on hover (main.js adds the size tag).
const footLink = (href, text, icon = "→", ext = false) =>
  `<li><a class="foot-link" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}><span>${text}</span><i aria-hidden="true">${icon}</i>${ext ? newTab : ""}</a></li>`;
const footer = (r) => `<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-id">
      <p class="foot-name">${esc(profile.name)}</p>
      <p class="foot-role">${esc(profile.role)}</p>
      <p class="foot-status"><i aria-hidden="true"></i>${esc(profile.availability)}</p>
      <p class="foot-clock"><span>Local time in Tiruppur, India</span><time class="foot-time">IST</time></p>
    </div>
    <nav class="foot-col" aria-label="Footer">
      <p class="label">Explore</p>
      <ul>${[["Work", "#work"], ["How I work", "#approach"], ["Experience", "#experience"], ["About", "#about"], ["Testimonials", "#testimonials"]].map(([t, h]) => footLink(`${r}index.html${h}`, t)).join("")}</ul>
    </nav>
    <div class="foot-col">
      <p class="label">Connect</p>
      <ul>
        ${footLink(mailto, "Email", "→")}
        ${footLink(linkedin, "LinkedIn", "↗", true)}
        ${footLink(behance, esc(profile.links.find((l) => l.label === "Behance").text), "↗", true)}
        ${hasResume ? `<li><a class="foot-link" href="${r}resume.pdf" download="${resumeFile}"><span>Resume (PDF)</span><i aria-hidden="true">↓</i></a></li>` : ""}
      </ul>
    </div>
  </div>
  <p class="foot-mark disp" aria-hidden="true">${[..."UX BY RAJ"].map((ch, i) => (ch === " " ? `<span class="sp"> </span>` : `<span style="--i:${i}">${ch}</span>`)).join("")}</p>
  <div class="wrap foot-bar">
    <span>© ${new Date().getFullYear()} ${esc(profile.name)}</span>
    <span>Designed in Figma, coded as a static site.</span>
    <a class="foot-top" href="#top" aria-label="Back to top"><span aria-hidden="true">↑</span></a>
  </div>
</footer>
<script src="${r}main.js?v=${jsV}" defer></script>
</body>
</html>`;

// Titan card: the spinner and the skeleton load side by side on a loop, so the idea lands before anyone
// opens the case. Bars only, no real data; the case page keeps the real before/after slide.
const ldPane = (after) => {
  const rows = Array.from({ length: 7 }, (_, i) =>
    `<span class="ld-row" style="--r:${i}">${[0, 1, 2, 3, 4].map((j) => `<i style="--w:${55 + ((i * 17 + j * 29) % 40)}%"></i>`).join("")}</span>`).join("");
  return `<div class="ld-pane${after ? " is-after" : ""}">
      <p class="ld-cap"><b>${after ? "After" : "Before"}</b><span>${after ? "structure instantly, page stays live" : "full-page loader locks everything"}</span></p>
      <div class="ld-win"><span class="ld-dots"><i></i><i></i><i></i></span>
        <div class="ld-app"><span class="ld-side"><i></i><i></i><i></i><i></i><i></i></span>
          <div class="ld-main"><span class="ld-tool"><i class="ld-filter">Filters</i><i>Columns</i><i>Export</i></span><span class="ld-head"><i></i><i></i><i></i><i></i><i></i></span><span class="ld-rows">${rows}</span></div>
          ${after ? "" : `<span class="ld-veil"><i class="ld-spin"></i></span>`}
          <svg class="ld-cur" viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>`;
};
const loadingDemo = (v) => `<div class="ld" role="img" aria-label="${esc(v.alt)}">${ldPane(false)}${ldPane(true)}
    <p class="ld-time"><span>Same request, same wait</span><i></i><b>Data in</b></p>
  </div>`;

// Real UI for a project card or case page: a before/after slide, or a row of phone screens.
const visual = (v, r = "") =>
  v.demo === "loading"
    ? loadingDemo(v)
    : v.phones
    ? `<div class="phones-panel">${v.phones.map((p) => `<img src="${r}${esc(p.src)}" alt="Sporfy Tracker: ${esc(p.cap)}" width="512" height="1100" loading="lazy" decoding="async">`).join("")}</div>`
    : `<img src="${r}${esc(v.src)}" srcset="${r}${esc(small(v.src))} 900w, ${r}${esc(v.src)} 1600w" sizes="(max-width:1240px) 100vw, 1180px" alt="${esc(v.alt)}" width="1600" height="1000" loading="lazy" decoding="async">`;

// How I work: a quick peek at the Titan library, rebuilt in code from its own tokens (AffinityX Design System:
// colours, chip set, radii, table spec). The theme switch shows one semantic token resolving per mode.
const dsSpecimen = () => `<figure class="ds reveal" data-mode="light" aria-labelledby="ds-cap">
      <div class="ds-bar">
        <p class="ds-title"><span class="label">Design system</span><strong>Titan component library</strong></p>
        <ul class="ds-facts"><li>MUI v6</li><li>60+ components</li><li>Light and dark</li></ul>
        <div class="ds-mode" role="group" aria-label="Specimen theme" hidden><button type="button" aria-pressed="true" data-mode="light">Light</button><button type="button" aria-pressed="false" data-mode="dark">Dark</button></div>
      </div>
      <div class="ds-body">
        <div class="ds-tokens">
          <p class="label">One decision, three tiers</p>
          <ol class="ds-tiers">
            <li><span class="ds-tier">Raw value</span><span class="ds-ramp">${["e6f3ff", "579dff", "456cd4", "0052cc", "003ea8"].map((h) => `<i class="x${h}" title="#${h}"></i>`).join("")}</span><code><span class="when-light">#0052cc</span><span class="when-dark">#579dff</span></code></li>
            <li><span class="ds-tier">Semantic</span><span class="ds-sw"></span><code>--color-primary <span class="ds-arrow">→</span> <span class="when-light">#0052cc</span><span class="when-dark">#579dff</span></code></li>
            <li><span class="ds-tier">Component</span><span class="ds-mini">Save</span><code>MuiButton, variant contained</code></li>
          </ol>
          <p class="label">Figma to code</p>
          <dl class="ds-map">
            <div><dt>Figma</dt><dd><code>Button / Contained / Medium</code></dd></div>
            <div><dt>React</dt><dd><code>&lt;Button variant="contained" size="medium"&gt;</code></dd></div>
          </dl>
        </div>
        <div class="ds-canvas" aria-hidden="true">
          <div class="ds-frame">
            <span class="ds-btns"><i class="b-con">Save</i><i class="b-out">Cancel</i><i class="b-txt">Reset</i><i class="b-con is-off">Save</i></span>
            <span class="ds-chips"><i class="c-ok">Completed</i><i class="c-warn">Processing</i><i class="c-err">Critical</i></span>
            <span class="ds-field"><small>Search orders</small><span>Order ID or business</span></span>
            <span class="ds-table">
              <span class="ds-tr th"><i>Order</i><i>Status</i><i>Total</i></span>
              <span class="ds-tr"><i>Order 1042</i><i><b class="c-ok">Completed</b></i><i>12,400</i></span>
              <span class="ds-tr"><i>Order 1043</i><i><b class="c-warn">Processing</b></i><i>3,250</i></span>
              <span class="ds-tr sk"><i></i><i></i><i></i></span>
            </span>
          </div>
        </div>
      </div>
      <figcaption id="ds-cap"><span>Rebuilt in code from Titan's own tokens: raw values feed semantic roles like <code>--color-primary</code>, roles feed MUI components, and switching the theme swaps only the semantic layer. Status chips pair colour with a label, never colour alone.</span><a class="arrow-link" href="work/titan.html#the-design-system-behind-it">The system in the Titan case <span>→</span></a></figcaption>
    </figure>`;

// Company badge for flagship work, styled like the "Worked at" logos in the proof band.
const coBadge = (name, r = "") => {
  const co = companies.find((c) => c.name === name);
  return co ? `<p class="co"><img src="${r}${esc(co.logo)}" alt="" width="90" height="90" loading="lazy" decoding="async"><span><b>${esc(co.name)}</b><small>${esc(co.years)}</small></span></p>` : "";
};

// How I work: each pillar opens on a small built-in visual of the idea. Decorative; the card's text carries it.
const pillarVisual = [
  `<div class="pv pv-sys" aria-hidden="true"><span class="pv-one"><i></i><i></i><i></i></span><span class="pv-arrow">→</span><span class="pv-all">${Array.from({ length: 9 }, (_, k) => `<span style="--k:${k}"><i></i><i></i><i></i></span>`).join("")}</span></div>`,
  `<div class="pv pv-tip" aria-hidden="true"><span class="pv-card"><small>Add a tip</small><span class="pv-chips"><i>5%</i><i class="on">10%</i><i>15%</i></span><span class="pv-live"><b></b>Tracked live</span></span></div>`,
  `<div class="pv pv-parts" aria-hidden="true"><span class="pv-layer ly3"><b></b>Table row</span><span class="pv-layer ly2"><b></b>Chip</span><span class="pv-layer ly1"><b></b>Button</span></div>`,
  `<div class="pv pv-aa" aria-hidden="true"><span class="pv-aa-mark">AA</span><span class="pv-aa-list"><i>Contrast</i><i>Focus order</i><i>Not colour alone</i></span></div>`,
];

// Testimonials: the highlighted phrase leads as a pull-quote (an exact excerpt, hence the ellipses), the full
// recommendation follows word for word. Cards 1 and 4 are dark, so the grid reads as a checkerboard.
const quoteCard = (t, i) => {
  const pull = (t.quote.match(/\*([^*]+)\*/) || [])[1];
  const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const co = companies.find((c) => c.name === t.company);
  return `<figure class="quote${i === 0 || i === 3 ? " q-dark" : ""}${t.placeholder ? " is-placeholder" : ""} reveal" style="--d:${(i % 2) * 80}ms">
        ${t.placeholder ? `<span class="ph">Placeholder</span>` : ""}<span class="q-mark" aria-hidden="true">“</span>
        ${pull ? `<p class="q-pull" aria-hidden="true">…${esc(pull)}…</p>` : ""}
        <blockquote>“${rich(t.quote)}”</blockquote>
        <figcaption><span class="q-av" aria-hidden="true">${esc(initials)}</span><span class="q-who"><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></span>${t.relation ? `<span class="quote-src">${co ? `<img src="${esc(co.logo)}" alt="${esc(co.name)}" width="90" height="90" loading="lazy" decoding="async">` : ""}${esc(t.relation)} · LinkedIn, ${esc(t.date)}</span>` : ""}</figcaption>
      </figure>`;
};

const outcomes = (list) => `<dl class="outcomes">${list.map(([n, l]) => `<div><dt>${esc(n)}</dt><dd>${esc(l)}</dd></div>`).join("")}</dl>`;

// Home: flagship work first, then other client work, then concepts as a plain list.
const featuredKeys = new Set(featured.map((f) => f.key));
const others = projects.filter((p) => !featuredKeys.has(p.key));
const clientWork = () => others.filter((p) => !isConcept(framerCases[p.case] || {}));
const concepts = () => others.filter((p) => isConcept(framerCases[p.case] || {}));

const personLd = `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.role, url: profile.url, email: `mailto:${profile.email}`, sameAs: profile.links.map((l) => l.href) })}</script>`;
// Figma activity: the grid, its streak (every active month since July 2021) and the current month's cell.
const rows = heatRows();
const streak = rows.reduce((t, r) => t + r.cells.filter((n) => n > 0).length, 0);
const nowCell = [new Date().getFullYear(), new Date().getMonth()];
const home = () => `${head({ title: `${profile.name} | ${profile.role}`, desc: profile.intro, extra: personLd })}
${header("")}
<main id="main">
<section class="hero">
  <div class="wrap">
    <p class="avail rise"><i aria-hidden="true"></i><span>${profile.availability.split(" · ").map((t, i) => (i ? esc(t) : `<b>${esc(t)}</b>`)).join('<span class="avail-sep"> · </span>')}</span></p>
    <div class="hero-stage">
      <h1 class="hero-name"><span class="disp hero-first"><span class="line"><span class="ln" style="--d:60ms">${esc(profile.headline[0])}</span></span></span><span class="disp hero-last">${esc(profile.headline[1])}</span></h1>
      <figure class="hero-photo rise" style="--d:160ms">
        <span class="hp-img"><img src="profile.webp" alt="Portrait of ${esc(profile.name)}" width="944" height="1132" decoding="async" fetchpriority="high"></span>
        <span class="sel" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
        <span class="mascot" aria-hidden="true"><svg class="m-body" viewBox="0 0 92 96"><path d="M12 2h64a10 10 0 0 1 10 10v56L64 92H12A10 10 0 0 1 2 82V12A10 10 0 0 1 12 2z" fill="#E9B872"/><path d="M86 68 64 92V77a9 9 0 0 1 9-9z" fill="#C9964F"/><g class="m-eyes"><ellipse cx="31" cy="38" rx="6" ry="8" fill="#1B120B"/><ellipse cx="57" cy="38" rx="6" ry="8" fill="#1B120B"/><circle cx="33" cy="35" r="2.2" fill="#fff"/><circle cx="59" cy="35" r="2.2" fill="#fff"/></g><ellipse cx="20" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><ellipse cx="68" cy="51" rx="6" ry="3.5" fill="#D9745E" opacity=".55"/><path d="M38 52q6 6 12 0" fill="none" stroke="#1B120B" stroke-width="3" stroke-linecap="round"/></svg><svg class="m-hands" viewBox="0 0 92 18"><rect x="13" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M19 6v6M25 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/><rect x="57" y="1" width="18" height="15" rx="7.5" fill="#E9B872" stroke="#C9964F" stroke-width="2"/><path d="M63 6v6M69 6v6" stroke="#C9964F" stroke-width="1.6" stroke-linecap="round"/></svg></span>
        <span class="mp mp1" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>PM</b></span><span class="mp mp2" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M1.5 1.5l5 12.5 2-5.4 5.5-2z" fill="currentColor" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg><b>Dev</b></span>
        <figcaption><i aria-hidden="true"></i>Now at <b>AffinityX</b> · ${esc(experience[0].role)}</figcaption>
        <button class="motion-toggle" type="button" aria-pressed="false">Pause motion</button>
      </figure>
      <div class="hero-copy rise" style="--d:220ms">
        <p class="hero-lead">${rich(heroCopy.lead)}</p>
        <p class="hero-sub">${esc(heroCopy.subhead)}</p>
        <div class="hero-cta"><a class="btn solid lg" href="#work">See the work</a><a class="chev-link" href="${mailto}">Email me <span aria-hidden="true">›</span></a></div>
      </div>
    </div>
  </div>
</section>

<section class="proof-band" aria-label="In numbers">
  <div class="wrap">
    <div class="proof-panel reveal">
      <dl class="big-proof">${proof.map((x) => `<div><dt>${esc(x.value)}</dt><dd>${esc(x.label)}</dd><dd class="proof-src">${x.href ? `<a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.src)} ↗${newTab}</a>` : esc(x.src)}</dd></div>`).join("")}</dl>
      <div class="shipped">
        <p class="label">Worked at</p>
        <ul class="logos">${companies.map((c) => `<li><img src="${esc(c.logo)}" alt="" width="90" height="90" loading="lazy" decoding="async"><span><b>${esc(c.name)}</b><small>${esc(c.years)}</small></span></li>`).join("")}</ul>
      </div>
    </div>
  </div>
</section>

<section id="work" class="sec">
  <div class="wrap">
    <div class="sec-head">
      ${frame("01", "Selected work")}
      <h2 class="krona h2 lg reveal">20+ shipped.<br> <em>Three, up close.</em></h2>
      <p class="sec-lede reveal">Three picks from 20+ products: enterprise SaaS, restaurant ordering and a sports ERP. Each case shows the problem, the decisions I made, and what changed.</p>
    </div>
    <div class="cards">
      ${featured.map((f, i) => `<article class="card reveal" aria-labelledby="c-${f.key}">
        <div class="card-visual${f.visual.phones ? " is-phones" : ""}">${visual(f.visual)}</div>
        <div class="card-copy">
          <div>
            ${coBadge(f.meta[0])}
            <p class="card-meta label"><span>0${i + 1}</span>${f.meta.slice(1).map(esc).join(" · ")}</p>
            <h3 id="c-${f.key}"><a class="card-link" href="${esc(f.href)}">${rich(f.title)}</a></h3>
            <p class="card-text">${esc(f.text)}</p>
          </div>
          <div>
            ${outcomes(f.outcomes)}
            <span class="arrow-link" aria-hidden="true">Read the case study <span>→</span></span>
          </div>
        </div>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>

<section id="more" class="sec sec-tight">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("02", "More work")}<h2 class="krona h2 reveal">Shorter <em>engagements.</em></h2></div>
      <p class="sec-lede reveal">Client work from two days to three months: payroll, data products, e-commerce and healthcare.</p>
    </div>
    <div class="tiles">
      ${clientWork().map((p, i) => {
        const c = framerCases[p.case] || {};
        return `<a class="tile reveal" href="work/${esc(p.case)}.html" style="--d:${(i % 3) * 80}ms">
        <span class="tile-img"><img src="work/${esc(thumb(p.cover))}" srcset="${esc(thumbSet(p.cover))}" sizes="(max-width:560px) 82vw, (max-width:900px) 45vw, 400px" alt="" width="1200" height="900" loading="lazy" decoding="async"></span>
        <span class="tile-meta label">${esc([c.client, durText(c.duration)].filter(Boolean).join(" · "))}</span>
        <strong>${esc(p.title)}</strong></a>`;
      }).join("")}
    </div>
    <div class="concepts reveal">
      <p class="label">Concepts and explorations <span>Self-initiated or time-boxed, kept for range</span></p>
      <ul class="concept-grid">${concepts().map((p) => {
        const c = framerCases[p.case] || {};
        return `<li><a class="concept" href="work/${esc(p.case)}.html">
          <span class="concept-img"><img src="work/${esc(thumb(p.cover)).replace("covers/", "covers/600/")}" alt="" width="600" height="600" loading="lazy" decoding="async"><span class="concept-time">${esc(durText(c.duration))}</span></span>
          <span class="concept-body"><strong>${esc(p.title)}</strong><span>${esc(p.tags.slice(0, 2).join(" · "))}</span></span>
          <i aria-hidden="true">↗</i>
        </a></li>`;
      }).join("")}</ul>
    </div>
  </div>
</section>

<section id="approach" class="sec">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("03", "How I work")}<h2 class="krona h2 reveal">Understand the problem. <em>Design the system.</em></h2></div>
      <p class="sec-lede reveal">Four habits, each one backed by work you can open.</p>
    </div>
    <ol class="principles">
      ${strengths.map((s, i) => `<li class="reveal" style="--d:${i * 80}ms">${pillarVisual[i] || ""}<span class="label">0${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><a class="arrow-link" href="${esc(s.href)}">${esc(s.cta)} <span>→</span></a></li>`).join("")}
    </ol>
    ${dsSpecimen()}
  </div>
</section>

<section id="experience" class="sec night-2 xp">
  <div class="wrap xp-grid">
    <div class="xp-side">
      ${frame("04", "Experience")}
      <h2 class="krona h2 reveal">Forged in startups. <em>Designed for&nbsp;scale.</em></h2>
      <p class="xp-sum reveal"><span><b>${xpYears()}+</b>years</span><span><b>${experience.length}</b>product teams</span></p>
      <p class="xp-lede reveal">End to end across B2B, B2C, SaaS, ERP and back-office products. I design the system. Then I build it.</p>
      ${resumeLink("", "btn ghost-light xp-cv reveal", "Download resume")}
    </div>
    <ol class="xp-list">
      ${experience.map((e, i) => `<li class="xp-item reveal" style="--d:${i * 80}ms">
        <div class="xp-top"><span>${esc(e.dates.replace(" to ", " – ").replace("present", "Present"))}</span><span class="xp-dur">${xpDuration(e.dates)}</span>${/present/i.test(e.dates) ? '<span class="xp-now">Now</span>' : ""}</div>
        <h3 class="xp-co krona">${esc(e.company)}</h3>
        <p class="xp-role">${esc(e.role)}</p>
        <details class="xp-more" open><summary>Details</summary>
          <p class="xp-note">${esc(e.note)}</p>
          <ul class="xp-tags">${(e.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </details>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section id="activity" class="sec">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("05", "Figma activity")}<h2 class="krona h2 reveal">Always <em>designing.</em></h2></div>
      <p class="sec-lede reveal">Five years of product design, shipped every month, in Figma.</p>
    </div>
    <div class="always">
      <div class="always-copy">
        <p class="streak reveal"><b class="streak-n" aria-hidden="true" data-to="${streak}">${streak}</b><span class="streak-l"><span class="sr">${streak} </span>months in a row<small>Not one skipped since July 2021</small></span></p>
        <dl class="always-proof">
          <div class="reveal"><dt class="label">In Figma</dt><dd>Variables, Auto Layout and Dev Mode for product work; FigJam for flows and workshops.</dd></div>
          <div class="reveal"><dt class="label">Systems</dt><dd>Tokens, components and light and dark modes, built once and reused across products.</dd></div>
          <div class="reveal"><dt class="label">Handoff</dt><dd>Specs, every state, and WCAG 2.1 AA notes, so developers build straight from the file.</dd></div>
        </dl>
      </div>
      <figure class="heat reveal">
        <div class="heat-grid" role="img" aria-label="Activity grid: every month designing in Figma and XD since July 2021">
          <span></span>${"JFMAMJJASOND".split("").map((m) => `<span class="heat-m">${m}</span>`).join("")}
          ${rows.map((r, y) => `<span class="heat-y">${r.y}</span>${r.cells.map((n, m) => `<i class="${n < 0 ? "lx" : "l" + n}${r.y === nowCell[0] && m === nowCell[1] ? " now" : ""}" style="--w:${y + m}"${n > 0 ? ` title="${"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[m]} ${r.y}"` : ""}></i>`).join("")}`).join("")}
        </div>
        <figcaption><span>Designing in Figma &amp; XD, every month since July 2021</span><span class="legend">less <i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i> more</span></figcaption>
      </figure>
    </div>
  </div>
</section>

<section id="about" class="sec">
  <div class="wrap">
    <div class="about">
      <div>${frame("06", "About")}<h2 class="krona h2 reveal">Designer, <em>analyst, builder.</em></h2></div>
      <div class="about-copy">${profile.about.map((t) => `<p class="reveal">${esc(t)}</p>`).join("")}</div>
    </div>
    <div class="bento" id="skills">
      <article class="tile-b b-design reveal">
        <p class="label">Design</p>
        <h3 class="krona">Research <em>to handoff.</em></h3>
        <ul class="chips">${skills.Design.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>
      <article class="tile-b b-figma dark reveal">
        <p class="label">Main tool</p>
        <h3 class="krona">Figma</h3>
        <p>Variables, Auto Layout and Dev Mode for product work. FigJam for flows and workshops.</p>
      </article>
      <article class="tile-b b-aa reveal">
        <p class="label">Accessibility</p>
        <h3 class="krona big-mark">AA</h3>
        <p>WCAG 2.1 AA notes in every handoff: focus order, ARIA labels, and status that never relies on colour alone.</p>
      </article>
      <article class="tile-b b-tools reveal">
        <p class="label">Also in the kit</p>
        <h3 class="krona">Tools</h3>
        <ul class="chips">${skills.Tools.filter((x) => x !== "Figma").map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>
      <article class="tile-b b-build reveal">
        <p class="label">Build</p>
        <h3 class="krona">I prototype <em>in code.</em></h3>
        <ul class="chips">${skills.Build.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>
      ${education.map((e, i) => `<article class="tile-b ${i ? "b-edu-sm" : "b-edu"} reveal">
        <p class="label">${i ? (e.dates ? "Degree" : "Certificate") : "Education"}</p>
        <h3${i ? "" : ' class="krona"'}>${i ? esc(e.title) : "MBA, <em>Business Analytics.</em>"}</h3>
        <p>${i ? "" : `${esc(e.title.replace(/,.*/, ""))} · `}${esc(e.org)}${e.dates ? ` · ${esc(e.dates.replace(" to ", "–"))}` : ""}</p>
      </article>`).join("")}
    </div>
  </div>
</section>

<section id="testimonials" class="sec">
  <div class="wrap">
    <div class="sec-head row">
      <div>${frame("07", "Testimonials")}<h2 class="krona h2 reveal">In their own <em>words.</em></h2></div>
      <p class="sec-lede reveal">Recommendations on LinkedIn from a design lead who managed me, a fellow designer and two engineers I built with. <a class="text-link" href="${recommendationsUrl}" target="_blank" rel="noopener">Read them on LinkedIn ↗${newTab}</a></p>
    </div>
    <div class="quotes">
      ${testimonials.map((t, i) => quoteCard(t, i)).join("")}
    </div>
  </div>
</section>

<section id="contact" class="sec night contact">
  <div class="wrap">
    ${frame("08", "Contact")}
    <h2 class="krona display reveal">Let's build <em>what's next.</em></h2>
    <p class="contact-lede reveal">Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
    <div class="contact-line reveal"><a class="contact-mail" href="${mailto}">${esc(profile.email)}<span aria-hidden="true">↗</span></a><button class="copy-mail btn ghost-light" type="button" data-copy="${esc(profile.email)}">Copy email</button><span class="sr copy-status" role="status" aria-live="polite"></span></div>
    <div class="contact-act reveal">${resumeLink("", "btn light", "Download resume")}<a class="btn ghost-light" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗${newTab}</a></div>
  </div>
</section>
</main>
<nav class="mbar" aria-label="Quick contact"><a class="btn solid" href="${mailto}">Email me</a>${resumeLink("", "btn ghost", "Resume")}</nav>
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
  const eyebrow = [concept ? "Concept" : "Case study", ...(feat ? feat.meta.slice(1) : [c.client, durText(c.duration)])].filter(Boolean);
  const chapters = c.blocks.filter((b) => b.t === "h2").map((b) => b.x);
  // Flagship pages open on the real-UI visual from their card, so the same slide is skipped further down.
  const coverSrc = feat && feat.visual.src;
  const blocks = c.blocks.filter((b) => !(b.t === "img" && b.src === coverSrc));
  // Runs of tall screenshots sit side by side in a grid instead of one very long column.
  const units = [];
  for (const b of blocks) {
    const tall = b.t === "img" && b.h > b.w * 1.3, last = units[units.length - 1];
    if (tall && last && last.t === "tall") last.items.push(b);
    else units.push(tall ? { t: "tall", items: [b] } : b);
  }
  // Alt text names the section a screen sits in; on pages without sections, screens are numbered.
  const imgCount = blocks.filter((b) => b.t === "img").length;
  let section = "", n = 0;
  const alt = () => (n++, section ? `${name}: ${section}` : `${name}: screen ${n} of ${imgCount}`);
  const shot = (b) => `<a href="${r}${esc(b.src)}" target="_blank" rel="noopener" title="Open full size"><img src="${r}${esc(b.src)}" width="${b.w}" height="${b.h}" alt="${esc(alt())}" loading="lazy" decoding="async">${newTab}</a>`;
  const render = (b) =>
    b.t === "img" ? `<figure class="shot reveal">${shot(b)}</figure>`
    : b.t === "tall" ? `<div class="shot-grid reveal">${b.items.map((i) => `<figure class="shot">${shot(i)}</figure>`).join("")}</div>`
    : b.t === "h2" ? ((section = b.x), `<h2 class="krona cs-h2 reveal" id="${slug(b.x)}">${esc(b.x)}</h2>`)
    : b.t === "h3" ? `<h3 class="cs-h3 reveal">${esc(b.x)}</h3>`
    : b.t === "phones" ? `<div class="phones-panel wide reveal" tabindex="0" role="region" aria-label="${esc(name)} screens">${b.items.map((i) => `<figure><img src="${r}${esc(i.src)}" alt="${esc(name)}: ${esc(i.cap)}" width="512" height="1100" loading="lazy" decoding="async"><figcaption class="label">${esc(i.cap)}</figcaption></figure>`).join("")}</div>`
    // a poster is one long board cut into slices: shown joined, in order, in a window you scroll inside
    : b.t === "poster" ? `<figure class="board reveal"><figcaption class="board-bar"><span class="board-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Full case-study board</span><span class="board-hint">${b.items.length} parts · scroll inside, click to open full size</span></figcaption><div class="board-scroll" tabindex="0" role="region" aria-label="${esc(name)}: full case-study board, scrollable">${b.items.map((i, k) => `<a href="${r}${esc(i.src)}" target="_blank" rel="noopener" title="Open full size"><img src="${r}${esc(i.src)}" width="${i.w}" height="${i.h}" alt="${esc(name)}: case-study board, part ${k + 1} of ${b.items.length}" loading="lazy" decoding="async">${newTab}</a>`).join("")}</div></figure>`
    : b.t === "chips" ? `<ul class="cs-chips reveal">${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
    : b.t === "item" ? `<div class="cs-item reveal"><strong>${esc(b.l)}</strong><p>${esc(b.x)}</p></div>`
    : `<p class="cs-p reveal">${esc(b.x)}</p>`;
  // With the outcome numbers shown, the TL;DR keeps only Problem and What I did.
  const tldr = c.tldr && (feat ? c.tldr.filter(([k]) => k !== "Outcome") : c.tldr);
  const meta = (c.meta || [["Role", "UI/UX designer"], ["Client", c.client], ["Duration", durText(c.duration)], ["Type", concept ? "Concept, time-boxed" : "Client project"]]).filter(([, v]) => v);
  return `${head({ title: `${title} | ${profile.short}`, desc: desc.slice(0, 160), path: `/work/${key}.html`, image: `work/${thumb(proj.cover || key + ".png")}`, type: "article" })}
${header(r)}
<main class="case" id="main">
  <div class="wrap case-head canvas-pad">
    <nav class="crumbs label" aria-label="Breadcrumb"><a href="${r}index.html#work">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(name)}</span></nav>
    <p class="frame rise"><span>${String(keys.indexOf(key) + 1).padStart(2, "0")}</span> ${eyebrow.map(esc).join(" · ")}</p>
    ${feat ? coBadge(feat.meta[0], r).replace('class="co"', 'class="co rise" style="--d:40ms"') : ""}
    <h1 class="case-h1 rise" style="--d:80ms">${rich(h1)}</h1>
    ${summary && summary !== plain(h1) ? `<p class="case-sum rise" style="--d:160ms">${esc(summary)}</p>` : ""}
    ${!c.lead && !feat && c.tags.length ? `<ul class="cs-chips rise" style="--d:200ms">${c.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
  </div>
  <div class="wrap">
    <figure class="case-cover rise" style="--d:240ms">${coverSrc
      ? `<img src="${r}${esc(coverSrc)}" srcset="${r}${esc(small(coverSrc))} 900w, ${r}${esc(coverSrc)} 1600w" sizes="(max-width:1240px) 100vw, 1180px" alt="${esc(feat.visual.alt)}" width="1600" height="1000" decoding="async" fetchpriority="high">`
      : `<img src="${r}work/${esc(thumb(proj.cover || key + ".png"))}" alt="" width="1200" height="1200" decoding="async" fetchpriority="high">`}</figure>
    <dl class="case-meta reveal">${meta.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    ${feat || tldr ? `<section class="glance reveal" aria-label="At a glance">
      ${feat ? outcomes(feat.outcomes) : ""}
      ${tldr ? `<dl class="tldr${tldr.length === 2 ? " two" : ""}">${tldr.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
    </section>` : ""}
    <div class="case-body${chapters.length > 2 ? " has-toc" : ""}">
      ${chapters.length > 2 ? `<nav class="toc" aria-label="Chapters"><p class="label">Chapters</p><ol>${chapters.map((h) => `<li><a href="#${slug(h)}">${esc(h)}</a></li>`).join("")}</ol></nav>` : ""}
      <article class="cs">${units.map(render).join("\n")}
      ${(c.links || []).length ? `<div class="cs-links">${c.links.map(([l, h]) => `<a class="btn ghost" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)} ↗${newTab}</a>`).join("")}</div>` : ""}</article>
    </div>
    <section class="cs-cta night reveal">
      ${frame("→", "Hiring a product designer?")}
      <h2 class="krona">Let's talk about <em>your product.</em></h2>
      <p>Open to Senior Product Designer, Product Designer and UI/UX roles. Immediate joiner, open to relocation or remote work.</p>
      <div class="contact-act"><a class="btn light" href="${mailto}">Email me</a>${resumeLink(r, "btn ghost-light", "Download resume")}<a class="btn ghost-light" href="${linkedin}" target="_blank" rel="noopener">LinkedIn ↗${newTab}</a></div>
    </section>
    <a class="next-case reveal" href="${nextKey}.html"><span class="label">Next case study</span><strong class="krona">${esc(nextTitle)}</strong><i aria-hidden="true">→</i></a>
  </div>
</main>
${footer(r)}`;
};

const notFound = () => `${head({ title: `Page not found | ${profile.short}`, desc: "This page does not exist.", path: "/404.html", noindex: true })}
${header("")}
<main class="case" id="main"><div class="wrap case-head canvas-pad"><p class="frame"><span>404</span> Not found</p><h1 class="case-h1">This frame <em>doesn't exist.</em></h1><p class="case-sum"><a class="arrow-link" href="index.html">Back to the portfolio <span>→</span></a></p></div></main>
${footer("")}`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT + "work", { recursive: true });
writeFileSync(OUT + "index.html", home());
for (const k of Object.keys(framerCases)) writeFileSync(OUT + `work/${k}.html`, fcPage(k));
writeFileSync(OUT + "404.html", notFound());
for (const f of ["styles.css", "main.js", "favicon.svg", "profile.webp", "profile-portrait.jpg"]) cpSync(STATIC + f, OUT + f);
if (hasResume) cpSync(STATIC + "resume.pdf", OUT + "resume.pdf");
cpSync(STATIC + "logos", OUT + "logos", { recursive: true });
cpSync(STATIC + "work", OUT + "work", { recursive: true, filter: (src) => !/[\\/]work[\\/][^\\/]+\.(png|webp)$/.test(src) });
writeFileSync(OUT + "robots.txt", `User-agent: *\nAllow: /\nSitemap: ${profile.url}/sitemap.xml\n`);
const urls = ["/", ...Object.keys(framerCases)].map((u) => (u === "/" ? u : `/work/${u}.html`));
writeFileSync(OUT + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${profile.url}${u}</loc></url>`).join("")}</urlset>\n`);
if (testimonials.some((t) => t.placeholder)) console.warn("WARNING: placeholder testimonials are still in src/data.mjs. Replace them before going live.");
console.log(`Built ${urls.length + 1} pages → dist/`);

// Figma activity grid: every month since Jul 2021 is filled; shades are decorative, not counts.
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
