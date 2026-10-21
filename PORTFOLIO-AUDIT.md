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

## 7. Multi-agent design audit (21 Oct 2026)
Four reviewers worked in parallel:
1. Visual craft and art direction.
2. Hiring manager plus cognitive load.
3. Accessibility, interaction and performance.
4. Mobile.

Each was briefed on the mission (visually unforgettable, professionally credible, compelling to hiring managers) and on the elements you chose to keep. All measured the live build at 1440px and 390px. I re-checked the key claims against the code.

**What already works:**
- A specific positioning line.
- Honest labels on self-reported figures.
- Titan and Cyberdine pass the case-study test.
- A distinctive hero photo, frame, mascot and cursors.
- A coherent warm palette with Krona One and Inter.
- Most text passes AA contrast, and the reduced-motion handling is solid.
- One h1 per page, a skip link, and correct menu ARIA.

**The numbers behind the findings:**
- Homepage length: 12,300px on desktop (about 14 screens) and 17,200px on a phone (about 20 screens).
- On a phone, Contact sits at screen 19.
- Before the first case study a visitor meets 10 links and 4 figures.
- "10 → 5" appears 4 times on the homepage, and "5+ years" 5 times.

### P0: costs credibility or the interview
| # | Issue | Flagged by | Fix |
|---|---|---|---|
| 1 | The testimonials section shows four "Placeholder: Replace with a real recommendation" cards under "From the PMs, founders and developers I've designed with." | All 4 | Keep the section, but render only real quotes. Until there are two, show one line ("Recommendations on their way from LinkedIn ↗") or hide the section. **Your call.** |
| 2 | The ERP flagship fails the case-study test: about 99 words, no problem, decision or result. Its "outcomes" (Solo, Mobile, Live) are descriptions, not results. Payroll is the same product, with 17 images and no text. | Hiring, Visual | Merge Payroll into ERP as a chapter, and write the problem, one decision and a reflection (needs your facts). Use factual outcomes such as "3 months", "Sole designer", "Live on Google Play". Order the flagships Titan → ERP → Cyberdine. |
| 3 | The homepage has no `<main>` landmark (confirmed). | A11y | Wrap the hero through Contact in `<main id="main">` and point the skip link there. |
| 4 | Mobile menu focus order: the nav comes before the Menu button in the code (confirmed), so Tab skips the open menu. | A11y | Put the button first, keep the visual order with CSS `order`, and close the menu when focus leaves it. |
| 5 | Infinite animations (mascot peek and blink, drifting PM/Dev cursors) have no pause control (WCAG 2.2.2). | A11y | Add a small Figma-style "Pause motion" chip on the photo frame, saved per visitor. Also pause the animations when the hero scrolls out of view. |
| 6 | The type scale is flat: eight section headings at 64px, "LET'S BUILD" (112px) bigger than your name (80px). | Visual | Name up to `clamp(40px,8.4vw,124px)`, secondary headings down to `clamp(28px,3vw,44px)`. Replace headings that only repeat their label ("EXPERIENCE", "ABOUT") with a claim. |

### P1: high impact on how memorable and clear the site is
| # | Issue | Flagged by | Fix |
|---|---|---|---|
| 7 | Redundant figures and choices: "10 → 5" ×4, "5+" ×5, "50K+" ×3, the résumé twice in one viewport, and the activity proof points repeat earlier claims (Hick's and Miller's laws). | Hiring | Show each figure once, in its strongest spot. Hero proof: swap "5+" for "~235 screens, sole designer". Hero buttons: "See the work" plus email only. Replace the activity proof points with Skills and Tools. |
| 8 | The activity grid's shading is random, but its "less … more" legend says it's measured. The legend cells are 1.36:1 against the card, and "shipped every month" covers job gaps. | Hiring, Visual, A11y | Use one tone for every active month and drop the legend, or derive the shades from real role and project dates. Change the line to "In Figma every month since July 2021." **Your call.** |
| 9 | Page length and reach, especially on phones. | Mobile, Visual | Mobile: a sticky bottom "Email me · Résumé" bar after the hero; More work as a swipe rail (saves about 1,900px); skills as chips (about 600px); collapse older roles. Desktop: remove the doubled padding between same-colour sections (about 288px gaps). |
| 10 | How I work (dark) runs straight into Experience (dark): about 2,400px of dark with a muddy seam. | Visual | Make How I work light, so the page runs light → dark Experience → light → dark Contact. |
| 11 | The flagship card visuals render at about 590px, so the slide text can't be read. Titan has about 130px of dead space. | Visual | Stack each card: visual full width at 16:9, copy in two columns underneath. |
| 12 | Case pages repeat the same figures three times in the first 1,500px. Long image runs (Titan's Figma page lists about 6,700px, ERP boards about 11,400px). | Visual, Hiring | Drop either the TL;DR Outcome card or the outcomes row. Put portrait screenshots in a 3-column grid, capped in height and tap to enlarge. Move Titan's "Design system behind it" chapter before "The result". |
| 13 | Claims that disagree: Cyberdine "about 1 year" vs 9 months at Liffto; "the booking app I designed" vs a 4-person team; "10 → 5" without a source; the Google certificate not on the résumé; the résumé links the old Framer site and says "Oct 2026". | Hiring | Align them (needs your confirmation). Add "self-tracked, 6 sprints" to the "10 → 5" figure. |
| 14 | Mobile problems: case slides can't be read (about 5px text), the contact email breaks mid-word, and many tap targets are under 44px (Menu is 40px; several links are 18–25px). | Mobile | Pan-able slides at 200% width, a nowrap email at 16px, and 44px minimum targets. Make each flagship card one large tap target. |
| 15 | The custom cursor removes the text I-beam, the zoom cursor and enlarged OS pointers. | A11y | Add I-beam and zoom states, and turn the custom cursor off under `forced-colors` or `prefers-contrast: more`. |
| 16 | Performance. | A11y | Stop copying 11MB of unused original PNGs into the build. Serve 800w and 1600w WebP with `srcset`. Self-host and preload both fonts. Batch scroll handlers in `requestAnimationFrame`. Cut the intro's 1.5s font wait to about 600ms. |

### P2: polish
- Frame labels read "02Selected work" to screen readers, and numbering starts at 02. Add the missing 01 on the hero, and put the dot grid across the whole page.
- Rang Clothing's copy ("conquer the digital frontier") is inflated next to the plain Titan voice. Rewrite it in that voice.
- "Designed for" lists employers, so rename it "Worked at". The Behance link opens a single gallery.
- The company names in Experience (48px Krona, "LIFFTO / TECHNOLOGIES" on two lines) dwarf the role. Bring them to about 30px.
- Five client tiles in a 3-column grid leave an empty cell. Use a 6-column span layout. The footer rule overhangs the content.
- The intro's skip listeners are never removed, the mascot's eyes track under reduced motion, and `aria-label` on the footer wordmark `<p>` is ignored.
- Add "(opens in new tab)" for screen readers, darken the "Placeholder" badge to `#8a4022`, and switch the focus ring to the accent colour on dark sections.
- SEO: `noindex` on the 404 page, `og:type` article on case pages, and JSON-LD `Person`.

### The idea that would most raise "unforgettable"
Make the end of the opening animation the hero's resting state. Let the photo span both hero rows, starting about halfway down the name, and set the oversized name over it with the same difference blend the intro already uses. The name and face become one composed artwork, the motion gets a destination, and the proof row moves back above the fold.

### Suggested order of work
- **A. Do now (no decisions needed):** #3, #4, #5, #6, #7, #9 (spacing and mobile), #10, #11, #12 (layout), #14, #15, #16 and the P2 polish.
- **B. Your call:** #1 (how testimonials show), #8 (activity grid shading), and the composed-hero idea.
- **C. Needs your facts:** #2 (the ERP and Payroll story), #13 (the dates and claims), and real testimonials.

### Batch A: done (21 Oct 2026)
- **#1 Testimonials:** resolved with your four real LinkedIn recommendations, quoted word for word. Each shows the name, role, how they worked with you and the date, with a link to your recommendations page. One phrase per quote is set in the accent colour.
- **#3, #4, #5 Accessibility:**
  - The homepage has a `<main>` landmark, and the skip link goes to it on every page.
  - The Menu button now comes before the menu in the code, its label stays "Menu", and the menu closes when focus leaves it. Checked with real Tab key presses.
  - A "Pause motion" chip on the photo frame pauses the mascot and cursors and remembers the choice. They also pause when the hero is off screen.
- **#6 Type scale:** your name now goes up to 124px. Headings use two sizes, and the contact headline stays below the name. Headings that only repeated their label now make a claim ("Shorter engagements.", "Sports app to enterprise SaaS.", "Designer, analyst, builder.").
- **#7 Repetition:**
  - Each figure appears once on the homepage. The hero proof is 50K+, 10 → 5 (over six sprints) and 3 products led.
  - The hero has one button plus your email.
  - The activity proof points describe Figma, systems and handoff instead of repeating earlier numbers.
  - Frame labels now run 01–08.
- **#9, #10, #11 Rhythm and cards:**
  - The dot grid runs under the whole page.
  - Light sections that follow each other share a hairline instead of a 288px gap.
  - How I work is light.
  - The flagship cards are stacked, with the UI full width and the argument beside the outcomes. The whole card is one link, and the ERP card shows all five screens.
- **#12 Case pages:**
  - Flagship pages open on the real-UI slide from their card.
  - The TL;DR drops the Outcome card that repeated the numbers.
  - Tall screens and the ERP boards sit in a grid; the ERP page went from about 16,000px to about 5,500px on tablet.
  - Titan's design-system chapter now comes before "The result".
- **#14 Mobile:**
  - A sticky Email / Résumé bar appears after the hero and steps aside at Contact.
  - More work and the testimonials swipe sideways.
  - Skills show as chips, and older roles open on tap.
  - Slides pan sideways at a readable size.
  - The contact email no longer breaks mid-word, and every tap target is at least 44px.
  - The homepage went from about 21 screens to about 17.6, and Contact from screen 19 to 16.
- **#15 Cursor:** an I-beam over text and the native zoom cursor over screenshots. It's off under forced colours or high contrast, and the link tag stays readable on dark sections.
- **#16 Performance:**
  - The 11MB of unused original PNGs are no longer copied into the build.
  - Tiles use 600w/1200w `srcset`, and the card and cover slides use 900w/1600w (the Titan slide is 60KB on phones instead of 211KB).
  - Phone screenshots have width and height set.
  - Scroll handlers run once per frame, and the intro's font wait is 600ms.
- **P2 polish:**
  - Figma-style frame labels with a dashed rule, and smaller company names in Experience.
  - A 6-column layout for the tiles, and the footer rule inset to the content.
  - Screen-reader text on new-tab links, the footer wordmark hidden from screen readers, and accent focus rings on dark sections.
  - SEO: `noindex` on the 404 page, `article` on case pages, site name and image alt, and JSON-LD `Person` data.
  - Alt text that names the section or numbers the screen.
  - Rang Clothing rewritten in a plain voice, with the unsupported impact claims removed.
  - "Designed for" renamed to "Worked at", and the Behance link labelled for what it opens.

**Still open:**
- B (your call): the activity grid's shading and legend (#8), and the composed-hero idea.
- C (needs your facts): the ERP/Payroll story (#2), and the dates and claims that disagree with your résumé (#13).
- Self-hosting the fonts. That needs the font files downloaded, which I haven't done.
