// All content for the site lives here.
// Sources: kavuthamraj.framer.website (live site), LinkedIn profile, Naukri profile, static/resume.pdf.
// Public checks: Sporfy shows 50K+ downloads on Google Play; Sporfy Tracker is live there.
// Self-reported figures are labelled as such on the page (PM estimates, "by my own figures").
// Left out on purpose: phone number, screen and app counts (5,000+ vs 7,000+ disagree between
// the résumé and the Framer site), and "30,000+ booked" (no public source yet).

export const profile = {
  name: "Kavuthamraj Geetha Senthilkumar",
  short: "Kavuthamraj",
  role: "Senior UI/UX & Product Designer",
  location: "From Tiruppur, Tamil Nadu",
  url: "https://www.kavuthamraj.com",
  email: "kavutham99raj@gmail.com",
  availability: "Open to new roles · Immediate joiner · Open to relocation",
  headline: ["Kavuthamraj", "Geetha Senthilkumar"],
  intro:
    "Senior Product Designer with 5+ years in B2B SaaS, ERP and consumer apps. I turn complex, data-heavy workflows into clear, accessible products.",
  about: [
    "Most of my work lives in the hard, unglamorous parts of software: dense tables, approval flows, payroll and billing. Over 5+ years at AffinityX, Liffto Technologies, SRM Technologies and Sporfy, I've been the sole designer on a product more than once, and I've worked alongside PMs and developers in India, the US and the Philippines.",
    "My work runs from research and audits through information architecture, interaction design, design systems and handoff. I write handoff notes for accessibility (WCAG 2.1 AA) so it survives into code, and an MBA in Business Analytics keeps me asking what a design change does to the numbers.",
    "I prototype in Figma, Framer and Claude. Recently I designed and coded a live QR-code SaaS with Claude Code and React.",
  ],
  industries: ["Sports", "Retail", "E-commerce", "Healthcare", "AI", "Accounts & Finance"],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kavuthamraj/" },
    { label: "Behance", href: "https://www.behance.net/gallery/224132329/ERP-Solutionfor-Sports-Industry" },
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
    key: "assignment",
    title: "Assignment: First Party Data",
    tags: ["Web App Design", "Branding", "Marketing"],
    cover: "assignment.png",
    case: "assignment",
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
    tags: ["B2B SaaS", "ERP", "Order management"],
    dates: "Sep 2025 to present",
    note: "Co-owns UX and UI for Titan, a B2B SaaS back-office and ERP product used by operations teams in the US, the Philippines and India. Built its tokenized MUI v6 library in Figma (60+ components, light and dark), which cut handoff bugs from about 10 to 5 per sprint. Persuaded the PM and engineering to replace mobile tables with cards; it shipped as designed.",
  },
  {
    role: "Founding Member and Design Lead",
    company: "Liffto Technologies",
    tags: ["Founding team", "Hospitality", "AI SaaS", "E-commerce"],
    dates: "Nov 2024 to Jul 2025",
    note: "Led UI/UX from idea to launch for 3 products on one shared Figma design system. Sole designer on Cyberdine, QR ordering and billing for restaurants. On Steadfast, an AI client-management app, designed how staff review and correct the AI's output.",
  },
  {
    role: "UI/UX Designer",
    company: "SRM Technologies",
    tags: ["Enterprise apps", "Agile teams", "Design system"],
    dates: "Nov 2023 to Sep 2024",
    note: "Designed enterprise application and website UI/UX in Figma within Agile teams, and built and maintained design system components.",
  },
  {
    role: "Visual and UI/UX Designer",
    company: "Sporfy",
    tags: ["B2C app", "Sports ERP", "User research", "Google Play"],
    dates: "Jul 2021 to Oct 2023",
    note: "Designed Sporfy, a B2C turf and event booking app (50K+ downloads on Google Play), end to end with user research. Sole designer on Sporfy Tracker, a mobile-first sports ERP for payroll, accounts, attendance and fees. Employee of the Year 2022.",
  },
];

export const skills = {
  Design: [
    "Product design", "UX research", "Interaction design", "Information architecture",
    "Wireframing and prototyping", "Usability testing", "Visual design", "Design systems",
    "Accessibility (WCAG 2.1 AA)", "AI product design",
  ],
  Tools: ["Figma", "Framer", "Adobe XD", "After Effects", "Figma AI", "Claude", "Jira", "Slack"],
  Build: ["HTML", "CSS", "JavaScript", "React", "MUI v6"],
};

export const education = [
  { title: "Online MBA, Business Analytics", org: "SRM Institute of Science and Technology", dates: "2023 to 2025" },
  { title: "B.Sc., Design & Visual Communication", org: "PSG College of Arts and Science, Coimbatore", dates: "2018 to 2021" },
  { title: "User Experience (UX) Design certificate", org: "Google", dates: "" },
];

// ---------- sections for the home page ----------
// *asterisks* mark the phrase set in the accent colour.
export const heroCopy = {
  eyebrow: "Senior UI/UX & Product Designer · B2B SaaS, ERP & consumer apps",
  lead: "I turn complex, data-heavy workflows into *clear, accessible* products.",
  sub: "5+ years from research to design systems and developer handoff. Now co-owning UX for Titan, a back-office product used by operations teams in the US, the Philippines and India.",
};

// Hero proof: one public figure, one self-reported figure with its source, one scope fact.
export const proof = [
  { value: "5+", label: "years designing B2B and consumer products" },
  { value: "50K+", label: "downloads of Sporfy on Google Play" },
  { value: "10 → 5", label: "handoff bugs per sprint after the Titan design system" },
];

// Companies, in the order worked at, newest first.
export const companies = ["AffinityX", "Liffto Technologies", "SRM Technologies", "Sporfy"];

// "How I work": each claim points at the project that shows it.
export const strengths = [
  { t: "Find the system behind the ticket", d: "One complaint about one slow table in Titan became a loading standard for the whole product.", href: "work/titan.html", cta: "Titan" },
  { t: "Design for the people who run it", d: "Cyberdine's captains told us UPI tips were getting lost in the bill, so I designed a separate tip step that restaurants track live.", href: "work/cyberdine.html#tips-payment-and-menus", cta: "Cyberdine" },
  { t: "Systems that cut rework", d: "A tokenized MUI v6 library in Figma (60+ components, light and dark) took handoff bugs from about 10 to 5 per sprint across six sprints.", href: "work/titan.html#the-design-system-behind-it", cta: "Design system" },
  { t: "Accessible by default", d: "WCAG 2.1 AA notes in every handoff: focus order, ARIA labels, and status that never relies on colour alone.", href: "work/cyberdine.html#looking-back", cta: "Contrast audit" },
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
    text: "One slow table froze the whole back office. I audited every table and dashboard, made the case with side-by-side wireframes, and shipped skeleton states as reusable MUI v6 components.",
    outcomes: [["2 wks", "wireframe to release"], ["~40%", "shorter perceived waits, PM estimate"], ["10 → 5", "handoff bugs per sprint, design system"]],
    visual: { src: "work/titan-story/05.jpg", alt: "Titan Orders table before and after: a full-page loader that locks everything, then skeleton rows with the toolbar still live" },
    href: "work/titan.html", cover: "titan.png",
  },
  {
    key: "cyberdine", meta: ["Liffto Technologies", "Restaurant SaaS", "2024–25"],
    title: "Don't wait for the captain. *Order from the table.*",
    text: "Diners could shortlist but not order. I redesigned ordering so the table sends the order and staff still approve every dish, then designed tips, payment and a ~200-screen restaurant app.",
    outcomes: [["~235", "screens across two apps, sole designer"], ["6 → 4", "taps to a sent order, counted on the design files"], ["~600", "orders a day at peak, my own figures"]],
    visual: { src: "work/cyberdine/06.jpg", alt: "Cyberdine before and after: a shortlist that waits for a captain, then an order sent from the table with status on every dish" },
    href: "work/cyberdine.html", cover: "cyberdine.png",
  },
  {
    key: "erp", meta: ["Sporfy", "Sports ERP", "Mobile"],
    title: "A sports ERP, *rebuilt for the phone.*",
    text: "Sporfy Tracker puts organisation, payroll, attendance, fees, classes and slots into one mobile-first app. I planned and designed it end to end as the only designer, under the CEO and CTO.",
    outcomes: [["Solo", "designer, from brief to developer handoff"], ["Mobile", "first: payroll, accounts, attendance and fees"], ["Live", "on Google Play as Sporfy Tracker"]],
    visual: { phones: erpScreens.slice(0, 3) },
    href: "work/erp.html", cover: "erp-solution.png",
  },
];
export { erpScreens };

// PLACEHOLDERS: replace each with a real LinkedIn recommendation before going live.
export const testimonials = [
  { name: "Product Manager", role: "Titan, AffinityX", quote: "Replace with a real recommendation about working together on Titan: the loading audit, the skeleton states and the handoff.", placeholder: true },
  { name: "CEO or CTO", role: "Sporfy", quote: "Replace with a real recommendation about the sports ERP and payroll work, and what it was like to work with you.", placeholder: true },
  { name: "Developer", role: "Cyberdine, Liffto Technologies", quote: "Replace with a real recommendation about your handoff quality and how easy your designs were to build.", placeholder: true },
  { name: "Design Lead", role: "SRM Technologies", quote: "Replace with a real recommendation about your work on enterprise apps and the design system.", placeholder: true },
];

