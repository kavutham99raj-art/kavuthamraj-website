// All content for the site lives here.
// Sources: kavuthamraj.framer.website (live site), LinkedIn profile, Naukri profile, static/resume.pdf.
// Public checks: Sporfy shows 50K+ downloads on Google Play; Sporfy Tracker is live there.
// Self-reported figures are labelled as such on the page (PM estimates, "by my own figures").
// App count: 25+ apps and 8+ websites across the whole career, from Kavuthamraj (Oct 2026; matches the résumé).
// Left out on purpose: phone number and "30,000+ booked" (no public source yet).

// Domains. www.kavuthamraj.com is the canonical origin: it serves this site over HTTPS, with the apex domain
// redirecting to it. The Vercel production URL redirects here too (vercel.json), so it is no longer canonical.
// SITE_URL can still override the origin for a one-off test build, for example a preview or staging copy.
export const site = {
  live: "https://www.kavuthamraj.com",
  previous: "https://kavuthamraj-website-red.vercel.app",
  // Search Console / Bing Webmaster Tools HTML-tag verification: paste only the content="" value.
  verify: { google: "", bing: "" },
};

export const profile = {
  name: "Kavuthamraj Geetha Senthilkumar",
  short: "Kavuthamraj",
  brand: "Kavuthamraj GS",
  role: "Senior UI/UX & Product Designer",
  location: "From Tiruppur, Tamil Nadu",
  email: "kavutham99raj@gmail.com",
  availability: "Open to new roles · Immediate joiner · Open to relocation",
  headline: ["Kavuthamraj", "Geetha Senthilkumar"],
  intro:
    "Senior Product Designer with 5+ years in B2B SaaS, ERP and consumer apps. I turn complex, data-heavy workflows into clear, accessible products.",
  about: [
    "Most of my work lives in the hard, unglamorous parts of software: dense tables, approval flows, payroll and billing. Over 5+ years at AffinityX, Liffto Technologies, SRM Technologies and Sporfy, I've been the sole designer on a product more than once, and I've worked alongside PMs and developers in India, the US and the Philippines.",
    "My work runs from research and audits through information architecture, interaction design, design systems and handoff. I write handoff notes for accessibility (WCAG 2.1 AA) so it survives into code, and an MBA in Business Analytics keeps me asking what a design change does to the numbers.",
    "I prototype in Figma, Framer and Claude, and I take designs to code myself. Recently I designed and vibe-coded a live QR-code SaaS with Claude Code and React, from first screen to production.",
  ],
  industries: ["Sports", "Retail", "E-commerce", "Healthcare", "AI", "Accounts & Finance"],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kavuthamraj/" },
    { label: "Behance", text: "ERP case on Behance", href: "https://www.behance.net/gallery/224132329/ERP-Solutionfor-Sports-Industry" },
  ],
  oldSite: "https://kavuthamraj.framer.website/",
};

// Every project from the live Framer "Work" list (14), plus the ERP case study.
// `case` = internal case page (slug). Otherwise the card links to the Framer case study.
export const projects = [
  {
    key: "cyberdine",
    title: "Cyberdine: QR dine-in ordering",
    tags: ["UX Case Study", "B2B SaaS"],
    cover: "cyberdine.png",
    summary: "Don't wait for the captain. Order from the table. Cyberdine's shortlist-only menu became QR ordering that diners complete on their own.",
    case: "cyberdine",
  },
  {
    key: "payroll",
    title: "Payroll Module for Sports ERP",
    tags: ["Case study", "Payroll", "Accounts"],
    cover: "payroll.png",
    summary: "Payroll built into a mobile-first sports ERP, for organisations and their staff.",
    case: "payroll",
  },
  {
    key: "erp",
    title: "ERP Solution for Sports Industry",
    tags: ["ERP", "Payroll", "Mobile"],
    cover: "erp-solution.png",
    summary: "An end-to-end ERP for the sports industry, designed mobile-first for Sporfy.",
    case: "erp",
  },
  {
    key: "titan",
    title: "Titan: Skeleton Loading for B2B SaaS",
    tags: ["UX Case Study", "B2B SaaS", "Design System"],
    cover: "titan.png",
    summary: "Stop the spinner. Keep the work moving. How full-page loaders became skeleton states across Titan.",
    case: "titan",
  },
  {
    key: "educonnect",
    title: "Educonnect: Tuition and Online Education",
    tags: ["App Design", "UI/UX Design", "Research"],
    cover: "educonnect.png",
    summary: "A tuition and online-education platform connecting students, tutors and parents in one place.",
    case: "educonnect",
  },
  {
    key: "m-music",
    title: "M: Music",
    tags: ["Web Design", "UI Design", "Research"],
    cover: "m-music.png",
    summary: "A music platform designed around discovery and listening flow, from research to web UI.",
    case: "m-music",
  },
  {
    key: "redbus",
    title: "RedBus: Daily Rider Pass",
    tags: ["UX Case Study", "New Feature", "Research"],
    cover: "redbus.png",
    summary: "A UX case study exploring a daily rider pass for regular bus commuters.",
    case: "redbus",
  },
  {
    key: "rang",
    title: "Rang Clothing: E-commerce Transformation",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "rang-clothing.png",
    summary: "Turning an established apparel manufacturer into a digital brand, with a new e-commerce presence.",
    case: "rang-clothing",
  },
  {
    key: "present-onboard",
    title: "Present Onboard",
    tags: ["Healthcare", "Login"],
    cover: "present-onboard.png",
    summary: "A clean, trustworthy login and onboarding interface for a healthcare product.",
    case: "present-onboard",
  },
  {
    key: "evento",
    title: "Evento: Event Booking App",
    tags: ["Web Design", "Booking App", "Event"],
    cover: "evento.png",
    case: "evento",
  },
  {
    key: "sports-ecommerce",
    title: "Sports E-Commerce",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "sports-ecommerce.png",
    case: "sports-ecommerce",
  },
  {
    key: "next-messenger",
    title: "Next Messenger",
    tags: ["Chatting App", "Communication"],
    cover: "next-messenger.png",
    case: "next-messenger",
  },
  {
    key: "slay",
    title: "Slay: Simplify Financial Transactions",
    tags: ["Web Design", "Branding", "Marketing"],
    cover: "slay.webp",
    summary: "A modern digital payment concept for individuals, teams and enterprises. Clean layouts, clear flows and a calm visual hierarchy.",
    case: "slay",
  },
];

export const experience = [
  {
    role: "Senior UI/UX Designer",
    company: "AffinityX",
    team: "1 of 2 designers · US-based PM · developers in the Philippines and India · remote, across time zones",
    tags: ["B2B SaaS", "ERP", "Order management"],
    dates: "Sep 2025 to Oct 2026",
    note: "Co-owned UX and UI for Titan, a B2B SaaS back-office and ERP product used by operations teams in the US, the Philippines and India. Built its tokenized MUI v6 library in Figma (60+ components, light and dark), which cut handoff bugs from about 10 to 5 per sprint. Persuaded the PM and engineering to replace mobile tables with cards; it shipped as designed.",
  },
  {
    role: "Founding Member and Design Lead",
    company: "Liffto Technologies",
    team: "Founding team · design lead for 3 products on one shared design system · sole designer on Cyberdine",
    tags: ["Founding team", "Hospitality", "AI SaaS", "E-commerce"],
    dates: "Nov 2024 to Jul 2025",
    note: "Led UI/UX from idea to launch for 3 products on one shared Figma design system. Sole designer on Cyberdine, QR ordering and billing for restaurants. On Steadfast, an AI client-management app, designed how staff review and correct the AI's output.",
  },
  {
    role: "UI/UX Designer",
    company: "SRM Technologies",
    team: "Designer in Agile delivery teams · design systems for 3+ apps and websites",
    tags: ["Enterprise apps", "Agile teams", "Design system"],
    dates: "Nov 2023 to Sep 2024",
    note: "Designed enterprise application and website UI/UX in Figma within Agile teams, and built and maintained design system components.",
  },
  {
    role: "Visual and UI/UX Designer",
    company: "Sporfy",
    team: "4-person design team · 80+ developers on one design system · mentored junior designers",
    tags: ["B2C app", "Sports ERP", "User research", "Google Play"],
    dates: "Jul 2021 to Oct 2023",
    note: "Designed Sporfy, a B2C turf and event booking app (50K+ downloads on Google Play), end to end with user research. Sole designer on Sporfy Tracker, a mobile-first sports ERP for payroll, accounts, attendance and fees. Employee of the Year 2022.",
  },
];

// Skills, grouped the way hiring teams scan for them. Backed by the résumé (page 2) and the case studies; JTBD,
// design QA, product KPIs, funnel analysis, experimentation and A/B testing confirmed by Kavuthamraj (Oct 2026).
export const skills = [
  { key: "product", label: "Product design", title: "Discovery to *delivery.*", items: [
    "Product design", "Product discovery", "JTBD", "User research", "UX audits", "Journey mapping", "Information architecture",
    "Interaction design", "Wireframing and prototyping", "Usability testing", "Visual design",
  ] },
  { key: "enterprise", label: "Enterprise and product thinking", title: "Complex, made *simple.*", items: [
    "B2B SaaS", "ERP and back-office UX", "Complex workflows", "Data-dense tables and dashboards", "Role-based access",
    "Loading, empty and error states", "Responsive and mobile UI",
  ] },
  { key: "systems", label: "Design systems", title: "Consistency at *scale.*", items: [
    "Design tokens", "Figma Variables", "Component variants", "Light and dark modes", "MUI v6", "Developer handoff", "Design QA",
  ] },
  { key: "build", label: "AI and development", title: "Design. Prototype. *Build.*", items: [
    "AI product design", "Human-in-the-loop flows", "AI-assisted prototyping", "Claude Code", "Figma AI", "Framer",
    "React", "HTML", "CSS", "JavaScript", "Lottie",
  ] },
  { key: "data", label: "Data and analytics", title: "Design with *evidence.*", items: [
    "Product KPIs", "Funnel analysis", "Experimentation", "A/B testing", "Data visualization", "Excel", "Google Sheets",
    "Power BI", "SQL", "Google Analytics",
  ] },
  { key: "team", label: "Collaboration", title: "In the *room.*", items: [
    "Stakeholder management", "Workshop facilitation", "Cross-functional teams", "Agile", "Jira", "Slack",
  ] },
];

export const education = [
  { title: "Online MBA, Business Analytics", org: "SRM Institute of Science and Technology", dates: "2023 to 2025" },
  { title: "B.Sc., Design & Visual Communication", org: "PSG College of Arts and Science, Coimbatore", dates: "2018 to 2021" },
  { title: "User Experience (UX) Design certificate", org: "Google", dates: "" },
];

// ---------- sections for the home page ----------
// *asterisks* mark the phrase set in the accent colour.
export const heroCopy = {
  eyebrow: "Senior UI/UX & Product Designer · B2B SaaS, ERP & consumer apps",
  // Apple-style hero: one headline, one supporting line. The detail lives in the proof band and the work.
  subhead: "Senior UI/UX & Product Designer. 5+ years turning ERP, SaaS and consumer workflows into fast, accessible products.",
  lead: "I make complex B2B software *feel obvious.*",
  sub: "5+ years from research to design systems and developer handoff. Most recently co-owned UX for Titan, a back-office product used by operations teams in the US, the Philippines and India.",
};

// Hero proof: one public figure, one self-reported figure with its source, one scope fact.
// Each figure appears once on the home page; the flagship cards carry the others.
// `src` says where each figure comes from; a link makes it checkable.
export const proof = [
  { value: "25+", label: "apps designed across B2B and B2C, plus 8+ websites", src: "2021 – Now" },
  { value: "50K+", label: "downloads of Sporfy, a booking app I designed end to end", src: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sporfy.customer" },
  { value: "3", flags: ["us", "ph", "in"], label: "countries, one roadmap at AffinityX. Reporting to a US‑based PM, shipping with developers in the Philippines and India.", src: "Sep 2025 – Oct 2026" },
];

// Companies, in the order worked at, newest first.
// Companies, newest first, with the logo cropped from the résumé (static/logos).
export const companies = [
  { name: "AffinityX", logo: "logos/affinityx.png", years: "2025 – 26" },
  { name: "Liffto Technologies", logo: "logos/liffto.png", years: "2024 – 25" },
  { name: "SRM Technologies", logo: "logos/srm.png", years: "2023 – 24" },
  { name: "Sporfy", logo: "logos/sporfy.png", years: "2021 – 23" },
];

// "How I work": each claim points at the project that shows it.
export const strengths = [
  { t: "Fix the system, not the ticket", d: "One complaint about one slow table became Titan's loading standard for every table and dashboard.", href: "work/titan.html", cta: "Titan" },
  { t: "Design for the person on shift", d: "Captains said UPI tips were getting lost in the bill. A separate tip step now lets restaurants track them live.", href: "work/cyberdine.html#tips-payment-and-menus", cta: "Cyberdine" },
  { t: "Ship parts, not pictures", d: "A tokenized MUI v6 library, light and dark, that designers and developers both build from. The PM estimates it sped up delivery by ~25%.", href: "work/titan.html#the-design-system-behind-it", cta: "Design system" },
  { t: "Accessible before anyone asks", d: "WCAG 2.1 AA notes in every handoff: focus order, ARIA labels, and status that never relies on colour alone.", href: "work/cyberdine.html#looking-back", cta: "Contrast audit" },
];

// Flagship work, strongest evidence first. `outcomes` also head each case page.
// `visual` is real UI: a before/after slide, or a row of phone screens.
const erpScreens = [
  { src: "work/erp/manage-organization-home.jpg", cap: "Manage organisation" },
  { src: "work/erp/accounts-dashboard.jpg", cap: "Accounts dashboard" },
  { src: "work/erp/class-dashboard.jpg", cap: "Class dashboard" },
  { src: "work/erp/resource-apply-leave.jpg", cap: "Resources: apply for leave" },
  { src: "work/erp/slots-locker.jpg", cap: "Slots and lockers" },
];
export const featured = [
  {
    key: "titan", meta: ["AffinityX", "Enterprise B2B SaaS", "2025"],
    title: "Stop the spinner. *Keep the work moving.*",
    text: "One slow table froze the whole back office. I audited every table and dashboard, won the PM over with side-by-side wireframes, and shipped skeleton states as reusable MUI v6 components. “App is stuck” reports dropped to zero.",
    outcomes: [["2 wks", "wireframe to release"], ["~40%", "shorter perceived waits, PM estimate"], ["1 → all", "one table's fix, now the product-wide standard"]],
    visual: { demo: "loading", src: "work/titan-story/05.jpg", alt:"Titan Orders table before and after: a full-page loader that locks everything, then skeleton rows with the toolbar still live" },
    href: "work/titan.html", cover: "titan.png",
  },
  {
    key: "cyberdine", meta: ["Liffto Technologies", "Restaurant SaaS", "2024–25"],
    title: "Don't wait for the captain. *Order from the table.*",
    text: "Diners could build a shortlist but not send it: every order waited for a captain. I redesigned ordering so the table sends it and staff still approve each dish, then added a tip step restaurants track live, plus payment and the full restaurant app.",
    outcomes: [["~235", "screens across two apps, sole designer"], ["15", "restaurants live at peak"], ["~600", "orders a day at peak"]],
    visual: { src: "work/cyberdine/08.jpg", alt: "Cyberdine design rules across both apps: order from the table, status on every dish, tip the person, pay the exact total, and the right menu at the right time" },
    href: "work/cyberdine.html", cover: "cyberdine.png",
  },
  {
    key: "erp", meta: ["Sporfy", "Sports ERP", "Mobile"],
    title: "Off the desktop. *Into the pocket.*",
    text: "Payroll, attendance, fees, classes and slots were desk-bound ERP work. I rebuilt them as one mobile-first app for admins, trainers and staff, working under the CEO and CTO.",
    outcomes: [["Solo", "designer, from brief to developer handoff"], ["5", "ERP modules moved to mobile, payroll to lockers"], ["Live", "on Google Play as Sporfy Tracker"]],
    visual: { phones: erpScreens },
    href: "work/erp.html", cover: "erp-solution.png",
  },
];
export { erpScreens };

// LinkedIn recommendations, quoted word for word (Oct 2026). *asterisks* mark the phrase highlighted in the accent colour.
// Anything with placeholder: true renders as a marked draft card.
export const recommendationsUrl = "https://www.linkedin.com/in/kavuthamraj/details/recommendations/";
export const testimonials = [
  {
    name: "Ivan Živković", company: "AffinityX", role: "Senior Lead UI Engineer, AffinityX", relation: "Worked on the same team", date: "Oct 2026",
    quote: "I had the pleasure of working with Kavuthamraj at AffinityX, where he was our senior UI/UX designer. Kavuthamraj has *a real gift for turning complex problems into clean, intuitive experiences*, always backed by thoughtful research and clear reasoning. He is also a fantastic collaborator: reliable, open to feedback, and calm under pressure. Any team would be lucky to have him.",
  },
  {
    name: "Manoj Krishnamoorthy", company: "Sporfy", role: "Lead UX Designer", relation: "Managed Kavuthamraj directly at Sporfy", date: "Oct 2026",
    quote: "I had the pleasure of mentoring and working with Kavuthamraj GS at Sporfy for three years. During this time, he demonstrated a strong passion for UI/UX design, creativity, and a commitment to continuous learning. He was receptive to feedback, *developed his design skills consistently*, and showed a good understanding of user-centered design principles. I highly recommend him for UI/UX design opportunities and am confident he will be a valuable addition to any design team.",
  },
  {
    name: "Gukanesh Chidambaram", company: "Sporfy", role: "Product Designer", relation: "Worked on the same team at Sporfy", date: "Oct 2026",
    quote: "I had the pleasure of working with Kavuthamraj at Sporfy. He is a talented designer with a strong understanding of UI/UX, *a user-first mindset, and great attention to detail*. He works well with cross-functional teams and consistently brings thoughtful design solutions to the table. I'd highly recommend him for Senior UI/UX and Product Design roles.",
  },
  {
    name: "Novak Stankovic", company: "AffinityX", role: "Frontend Engineer, AffinityX", relation: "Worked together on different teams", date: "Oct 2026",
    quote: "Recommending Kavuthamraj, a talented designer and a colleague I truly enjoyed working with. They bring creativity, attention to detail, and *a thoughtful approach to every project*. They are collaborative, open to feedback, and always willing to support the team.",
  },
];


// Visual design: posters and social creatives, shown in the home page's "Visual design" section.
// w and h are the pixel size of the file in static/work/visual (variants are listed in static/img.json).
export const designWork = [
  {
    company: "SRM Technologies", logo: "logos/srm.png",
    note: "Event posters and social creatives.",
    items: [
      { src: "work/visual/srm-womens-day-workshop.webp", w: 1333, h: 2000, cap: "Women's Day workshop", alt: "SRMTech poster for a Women's Day meditation and sound bath workshop, with an illustration of a woman meditating beside a singing bowl" },
      { src: "work/visual/srm-ideathon-launch.webp", w: 2000, h: 2000, cap: "Ideathon 2024 launch", alt: "SRMTech Ideathon 2024 poster: a lightbulb rising from an open box under the line Where ideas ignite impact, innovation and growth" },
      { src: "work/visual/srm-ideathon-prizes.webp", w: 2000, h: 2000, cap: "Ideathon 2024 prizes", alt: "SRMTech poster announcing the Ideathon 2024 prizes: 1st prize INR 1,00,000 and 2nd prize INR 50,000, with two winners holding medals" },
      { src: "work/visual/srm-artwork-contest.webp", w: 1477, h: 2000, cap: "Women's Day artwork contest", alt: "SRMTech poster for a Women's Day artwork contest with the theme A day in the life of a woman, showing a woman running across a clock" },
      { src: "work/visual/srm-salesforce-einstein.webp", w: 2000, h: 2000, cap: "Salesforce Einstein post", alt: "SRMTech social post: Boost your manufacturing efficiency and innovation with Salesforce Einstein, with the Einstein mascot" },
    ],
  },
  {
    company: "Sporfy", logo: "logos/sporfy.png",
    note: "Promotion creatives for the booking app.",
    items: [
      { src: "work/visual/sporfy-giveaway.webp", w: 1780, h: 1780, cap: "Giveaway, Coimbatore", alt: "Sporfy giveaway poster for Coimbatore: 35 lucky people receive free bookings, with swimming, virtual cricket, water roller and ladder climbing" },
      { src: "work/visual/sporfy-activities-badminton.webp", w: 1780, h: 1780, cap: "Activities offer", alt: "Sporfy Activities poster: join badminton doubles at 60 rupees per person, with a group of smiling people" },
      { src: "work/visual/sporfy-activities-scan.webp", w: 1780, h: 1780, cap: "Activities, scan to join", alt: "Sporfy Activities poster with a QR code to join badminton doubles at 59 rupees per person, with a surprised character" },
    ],
  },
  {
    company: "Liffto Technologies", logo: "logos/liffto.png",
    note: "Social posts for Cyberdine, the restaurant ordering app.",
    items: [
      { video: "work/visual/cyberdine-video.mp4", src: "work/visual/cyberdine-video-frame.jpg", poster: "work/visual/cyberdine-video-frame-720.webp", w: 720, h: 720, cap: "Cyberdine motion video, 28 seconds", alt: "Cyberdine motion video: no need for costly computers or bulky CPU" },
      { src: "work/visual/cyberdine-coming-together.webp", w: 1440, h: 1440, cap: "Good things come together", alt: "Cyberdine post: Good things have a way of coming together, showing a pizza mascot plus a QR code plus a smiling face" },
      { src: "work/visual/cyberdine-transform.webp", w: 1440, h: 1440, cap: "Transform or be left behind", alt: "Cyberdine post: Transform or be left behind, with three hands holding phones that show a burger, a pizza and noodles" },
      { src: "work/visual/cyberdine-refer.webp", w: 1440, h: 1440, cap: "Refer a restaurant", alt: "Cyberdine post: Refer a restaurant and get 1 month free once they sign up, with three phones showing the restaurant app" },
      { src: "work/visual/cyberdine-upsell.webp", w: 1440, h: 1440, cap: "Upsell and increase sales", alt: "Cyberdine post: Upsell and increase sales in restaurants with the Cyberdine digital menu, with a phone showing the Our Special list" },
      { src: "work/visual/cyberdine-save-time.webp", w: 1440, h: 1440, cap: "Save time, get your digital menu", alt: "Cyberdine post: Save time, get your digital menu now, with a winged alarm clock and a smiling waiter carrying two plates" },
      { src: "work/visual/cyberdine-dont-interrupt.webp", w: 1440, h: 1440, cap: "Don't interrupt your customers", alt: "Cyberdine post: Don't interrupt your customers, with iMenu they reach out when they need you, showing a Request Waiter button on a phone beside an illustrated couple eating" },
    ],
  },
];
