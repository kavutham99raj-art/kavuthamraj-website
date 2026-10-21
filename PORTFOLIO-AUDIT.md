# Portfolio audit — 21 Oct 2026

Reviewed: the live site (kavuthamraj.framer.website), this repo as found, `static/resume.pdf`, and Google Play (Sporfy: 50K+ downloads; Sporfy Tracker: live, 100+ downloads).
Not tested: real screen readers, Safari and Firefox, Lighthouse scores, a production deploy.

## 1. Original scorecard (the live Framer site, which is what recruiters see today)

| Area | Score | Why |
|---|---|---|
| First impression | 4 | Dark bento template with a "Made in Framer" badge on a framer.website subdomain. The headline is a slogan ("Precision in Every Pixel. Purpose in Every Flow."), not a position. |
| Role clarity and positioning | 6 | The title is clear, but there's no specialism: B2B, B2C, SaaS, ERP, back office and six industries are all listed at the same weight. |
| Visual design craft | 5 | The site itself looks like a template. The case-study slides are strong (8/10), but the site doesn't let them lead. |
| UX and product thinking | 5 | Titan and Cyberdine show real thinking, but they sit next to a 2-day concept (M-Music) and a personal concept (RedBus). |
| Case-study storytelling | 5 | Two good stories. The ERP case has 76 words and a poster. 9 of 14 case pages are images with no text. |
| Business impact | 4 | Headline numbers are output counts ("7,000+ screens", "20+ apps"). The real outcomes (handoff bugs halved, ~40% shorter perceived waits) appear nowhere on the home page. |
| Credibility and differentiation | 4 | The screen counts disagree with the résumé (7,000+ vs 5,000+). A 30-item skill list ("Critical Thinking", "Storytelling") reads as filler. |
| Seniority and ownership | 5 | Sole-designer ownership exists (Cyberdine, Sporfy Tracker) but isn't stated up front. |
| Accessibility and responsiveness | 5 | WCAG is claimed, but the site doesn't show it. Not fully tested on Framer. |
| Recruiter conversion | 4 | No résumé on the home page and only one "Let's Talk" button. No availability or notice period, though the résumé says "Immediate joiner". |

**Overall: about 4.7/10.**

The repo version, as I found it, had better content but its own problems:
- **Effects that got in the way:** a custom cursor that hid the system cursor, a 3.4-second intro animation, a mascot, fake "PM" and "Dev" cursors, film grain and scroll-lit text.
- **A fabricated-looking chart:** an "Always designing" heatmap drawn from a seeded random generator, which looks like real activity data.
- **Weak ordering:** the thinnest case (ERP) led the flagship list, and a 1-week concept (RedBus) was one of the four flagships.
- **Facts that disagreed with the résumé:** the MBA title, and "2 years" vs "3 months" for Sporfy Tracker.
- **SEO:** every case page shared one canonical URL, so search engines would treat them as duplicates.
- **Page weight:** 2–3 MB PNG covers.

### Direct answers
1. **Would I shortlist you today?** Not for Senior Product Designer, from the live site. A screener sees a template and output counts, and has to dig to find Titan and Cyberdine. For mid-level UI/UX roles, maybe.
2. **Three biggest reasons to reject:**
   - Vanity numbers that don't agree with the résumé.
   - The strongest work is buried among quick concepts.
   - Outcomes are estimates or self-reported, with no research artifacts shown.
3. **Three strongest reasons to interview:**
   - Shipped, complex B2B work with explicit decisions and trade-offs: the Cyberdine running-total call, and the tip step that came from research.
   - Design-system and accessibility work tied to a delivery metric (handoff bugs from ~10 to 5 per sprint).
   - Honest "Looking back" sections that name your own mistakes, such as the contrast failures. That's a senior habit.
4. **What level the site communicates:** solid mid-level to early senior. Ownership is real, but there's no evidence yet of influencing roadmap, strategy or other designers. Mentoring and the "80+ developers" claim are only on the résumé.
5. **What's missing compared with an outstanding portfolio:**
   - Research artifacts: interview notes, journey maps, before-and-after measurements.
   - A deeper Titan story, such as the mobile tables-to-cards decision.
   - An AI-product case (Steadfast, or the live QR-code SaaS).
   - Real testimonials.
   - A custom domain.
6. **The single biggest change:** lead with Titan and Cyberdine as decision-driven case studies, and remove anything that is decoration or an unsupported number. That's done in this repo.

## 2. Prioritised changes

### P0 — critical (done)
| Where | Problem | Change |
|---|---|---|
| Home hero | The giant name with no position; a 3.4-second intro animation before anything is readable | Added a role eyebrow, a one-line position ("I turn complex, data-heavy workflows into clear, accessible products."), current scope (Titan, ops teams in 3 countries), 3 proof points, and Résumé (PDF), Email and Work buttons above the fold. Removed the intro. |
| Home proof | "52 component pages", plus impact tiles that repeated the same facts | Proof is now 5+ years · 50K+ downloads (checked on Google Play) · 10 → 5 handoff bugs per sprint (from the résumé, labelled). |
| Home "Always designing" | A heatmap made of random data, which reads as fake activity | Removed. |
| Flagship order | ERP first, and a concept among the four flagships | Titan → Cyberdine → Sporfy ERP. Each shows company, domain, year, your role and outcomes. RedBus moved to Concepts. |
| Concepts | Six 4-hour to 2-week concepts given equal weight with client work | "More client work" grid (5 projects), then a labelled "Concepts and explorations" list. Every page still exists. |
| Effects | A custom cursor that hid the system cursor, magnetic buttons, 3D tilt, mascot, fake collaborator cursors, film grain, scroll progress bar, Ken Burns zoom on covers, scroll-lit statement | All removed. Kept: short fade-ins (off under reduced motion), the Figma-style selection frame on the photo, the experience timeline and the footer wordmark. |
| Facts | MBA title, "2 years" for the ERP, and outcomes on the résumé missing from the site | Aligned to the résumé: Online MBA, Business Analytics; "2 years" dropped. Added the self-reported outcomes with their source (PM estimate, "by my own figures"). |
| SEO | All 14 case pages had the same canonical URL | Each page now has its own canonical, og:url and og:image. |

### P1 — high impact (done)
| Where | Change |
|---|---|
| Titan case | Added a Context section (product, users in the US, Philippines and India, team) and a design-system section with numbers: 60+ components, handoff bugs ~10 → 5 per sprint over six sprints, ~25% faster delivery (PM estimate), WCAG handoff notes. Added Users to the meta. |
| Cyberdine case | Rebuilt the order. Each slide now follows the text it illustrates (Problem → Real blocker → Decision → Customer app → Restaurant app → Tips/payment → Shipped → Impact → Looking back) instead of 9 slides stacked above the text. Removed a stray scraped title and a broken chip ("How it shipped" was listed as an edge state). Impact figures are labelled as your own. |
| How I work | Replaced four generic strengths with four claims, each linked to the project that proves it. |
| Experience | Added specifics from the résumé: users in 3 countries, the design system and its outcome, tables → cards, Steadfast (AI), Sporfy 50K+, sole designer on Tracker, Employee of the Year 2022. Added a résumé download. |
| About | Rewritten around what you work on, how you work, the MBA as a differentiator, and AI prototyping (the live QR-code SaaS). |
| Contact | Lists target roles, "Immediate joiner" and "open to relocation". Email (pre-filled subject), Résumé and LinkedIn. Case pages have the same call to action plus a résumé link. |
| Navigation | Name and role in the header on every page. Work / How I work / Experience / About on desktop, plus Résumé and Contact. The mobile menu includes Contact and Résumé, closes on Escape and on a tap outside, and the button label switches between "Menu" and "Close". |

### P2 — refinement (done)
- Cover images: 14 resized JPEG copies in `static/work/covers` (2.8 MB total, down from about 11 MB of PNGs). Only the portrait and the first cover load eagerly.
- Case-study slides open full size when tapped, which matters on phones.
- Screens get alt text from their section ("Cyberdine: The decision…"). Decorative cover images use empty alt. Card links have hidden text for screen readers.
- Anchor ids on case-study headings (for example `#the-design-system-behind-it`).
- `dt`/`dd` now sit inside a `dl` in the TL;DR. Skip link on every page goes to `#work` or `#main`.
- Fixed the 404 skip link.
- Stylesheet merged from 483 lines of stacked overrides into one ordered file.
- Contrast checked (all AA): muted text 5.35:1, cream on mocha 7.42:1 (the mocha background is darker now), ink on sage 7.12:1, muted cream on dark 8.57:1.

### Recommended next (not done; needs you)
| Priority | What | Why |
|---|---|---|
| P0 | **Deploy this repo** to kavuthamraj.com (Netlify, Vercel or GitHub Pages) and point the résumé's portfolio link at it. Retire or redirect the Framer site. | Recruiters still see the old site, and the canonical URLs point at a domain that may not be live. |
| P0 | Confirm the facts listed under Unresolved. | Every number you publish has to survive an interview question. |
| P1 | Write a second Titan story: the mobile tables-to-cards decision you persuaded the PM and engineering to make. | It's your strongest seniority signal (influence plus shipped), and it isn't on the site. |
| P1 | Add an AI case: Steadfast (how staff review and correct the AI's output) or the QR-code SaaS you designed and coded. | You claim AI product design, but nothing on the site shows it yet. |
| P1 | Add text to Payroll (17 screens, no words) or fold it into the ERP case. | Image-only client work reads as a Dribbble shot, not a case study. |
| P1 | Get 2–3 real LinkedIn recommendations: the Titan PM, a Cyberdine developer, the Sporfy CEO. | The testimonial section is built and stays hidden until there are real quotes. |
| P2 | Add a short text summary to each concept page, or remove the weakest (Next Messenger, 4 hours). | |
| P2 | Remove unused originals in `static/work` (41 MB). | Smaller repo; no effect on visitors. |

## 3. Files changed
- `src/data.mjs`: positioning, proof, flagship order and copy, How I work, experience, education, about. Removed dead `cases`, `impact` and the heatmap data.
- `src/framer-cases.mjs`: Titan (context, design-system outcomes, users), Cyberdine (restructured, cleaned up), ERP (removed the unsupported duration, added product).
- `src/build.mjs`: new home layout, header and nav, per-page canonical and OG tags, client vs concept split, case-page heading ids, alt text, slide links, CTA. Removed the unused case template and heatmap.
- `static/styles.css`: rewritten as one ordered stylesheet.
- `static/main.js`: reduced to reveal-on-scroll, the accessible mobile menu, the footer clock and the experience rail.
- `static/work/covers/*.jpg`: new optimised covers.
- `.claude/launch.json`: local preview config.

## 4. Unresolved: please confirm
1. **AffinityX end date.** The résumé says Sep 2025 – Oct 2026; the site says "Present". If you've left or are leaving, update `experience` and the hero line "Now co-owning UX for Titan".
2. **Sporfy Tracker duration.** The old ERP case said "2 years"; the résumé says "designed over 3 months". I removed "2 years".
3. **Cyberdine "about 1 year"** vs your Liffto tenure of Nov 2024 – Jul 2025 (9 months).
4. **Design system size.** The résumé says 60+ components; the Figma screenshots show 52 pages. The site says "60+ components across 52 pages".
5. **Self-reported outcomes:** handoff bugs 10 → 5 per sprint, ~25% faster delivery, ~40% shorter perceived waits, ~600 orders a day. All are labelled. Have the sprint reports or PM messages ready for interviews.
6. **MBA title.** The site now matches the résumé ("Business Analytics"). The old site data cited LinkedIn ("Business Administration and Management"). Make LinkedIn match.
7. **Google UX certificate** is on the site but not on the résumé. Keep it only if you can link the credential.
8. **"30,000+ booked"** and the screen and app counts are left off the site: there's no public source, and the résumé and Framer site disagree.
9. **No lint or test setup** in this repo. Verification was the build, a link, anchor and canonical check across all 16 pages, contrast maths, and browser checks at 1440, 768 and 375px.

## 5. Hiring-manager verdict (this repo, after the changes)
**Now compelling:**
- In 10 seconds a screener sees the role, the specialism (complex, data-heavy B2B workflows), current scope, availability and a résumé button.
- In 60 seconds they reach three shipped products with role, decisions and labelled outcomes.
- Titan and Cyberdine each pass the case-study test: problem, constraint, options, a decision you made, what shipped, and what you'd do differently.

**Still weak:**
- Outcomes are estimates or self-reported, with no baselines.
- There are no research artifacts.
- Nothing shows AI product work.
- Only two flagships are deep.
- Payroll and the concepts are image-only.

**Ready for serious applications?** Yes for Product Designer and UI/UX roles, and for Senior roles at mid-size product companies, once it's deployed and the facts above are confirmed. For top-tier companies (Google, Stripe, Linear), add the tables-to-cards story and one AI case first.

## 6. Second pass: art direction (later the same day)
**Why the first pass still felt ordinary:**
- Every heading was all-caps Krona One, so they all shouted at the same volume.
- The page was a stack of full-bleed coloured bands, a common template rhythm.
- The flagship visuals were title slides about the work rather than the UI itself.
- Case pages had no navigation or headline numbers.
- Five real Sporfy Tracker screens sat unused in `static/work/erp`.

**New direction: the portfolio as a design file.**
- A warm dot-grid canvas, with sections labelled like Figma frames (`02 Selected work`).
- The original fonts, by your choice: Krona One for display headings and numbers, Inter for everything else. Each headline has one phrase in the rust accent colour.
- One dark colour, used twice (How I work, and Contact plus the footer), instead of five coloured bands.

**What was rebuilt:**
- **Home:**
  - The hero leads with the positioning statement, three proof numbers and a "Designed for" line naming your four employers.
  - Flagship work is three surface cards, each with real UI: Titan's before/after, Cyberdine's before/after, and three live Sporfy Tracker screens. Each card also has meta, a headline, the argument and three outcome numbers.
  - Client work is a tile grid; concepts are a list.
  - How I work is four principles, each linked to the project that proves it.
  - Experience is a ruled table; About is followed by a Skills and Education row; Contact has a large email link.
- **Case pages:**
  - Breadcrumb, a frame label with company, domain and year, and a large headline.
  - Then the cover, a meta row, and an "at a glance" band with large outcome numbers and the Problem / What I did / Outcome cards.
  - A sticky chapter list tracks the section you're reading.
  - The ERP case now has chapters and a gallery of the five real screens.
- **Kept, because you asked for them:** the opening animation (now also fading in the sticky header and the "Designed for" line), the photo frame, mascot and PM/Dev cursors, and the "You" cursor.

**Verified:**
- Build passes; all links, anchors and ids resolve across 16 pages, and each page has one h1.
- No horizontal overflow at 375, 768 or 1440px.
- Mobile menu works; the opening animation plays; no console errors.
- Contrast: rust 4.9:1 on the canvas, muted text 5.1:1, accent on dark 7.2:1.

**Still falls short:**
- Two flagships have real depth; the ERP case is still thin on decisions.
- Outcomes are estimates or self-reported.
- There's no AI case study.
- 9 case pages have no written story.
- The Titan and Cyberdine visuals are presentation slides with UI inside, not raw product screens.
- Both fonts load from Google Fonts. Self-host them before launch for speed and privacy.
