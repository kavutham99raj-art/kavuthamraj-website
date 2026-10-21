// All content for the site lives here.
// Sources: kavuthamraj.framer.website (live site), LinkedIn profile, Naukri profile, static/resume.pdf.
// Public checks: Sporfy shows 50K+ downloads on Google Play; Sporfy Tracker is live there.
// Self-reported figures are labelled as such on the page (PM estimates, "by my own figures").
// Screen count: 7,000+ across the whole career, from Kavuthamraj (Oct 2026); the résumé's 5,000+ is Sporfy alone.
// Left out on purpose: phone number and "30,000+ booked" (no public source yet).

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
  // Apple-style hero: one headline, one supporting line. The detail lives in the proof band and the work.
  subhead: "Senior UI/UX & Product Designer. 5+ years turning ERP, SaaS and consumer workflows into fast, accessible products.",
  lead: "I make complex B2B software *feel obvious.*",
  sub: "5+ years from research to design systems and developer handoff. Now co-owning UX for Titan, a back-office product used by operations teams in the US, the Philippines and India.",
};

// Hero proof: one public figure, one self-reported figure with its source, one scope fact.
// Each figure appears once on the home page; the flagship cards carry the others.
// `src` says where each figure comes from; a link makes it checkable.
export const proof = [
  { value: "7,000+", label: "screens designed across 20+ apps and 8+ websites", src: "My own count, 2021 – now" },
  { value: "50K+", label: "downloads of Sporfy, a booking app I designed end to end", src: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sporfy.customer" },
  { value: "10 → 5", label: "handoff bugs per sprint after I built Titan's design system", src: "Self-tracked, 6 sprints" },
];

// Companies, in the order worked at, newest first.
// Companies, newest first, with the logo cropped from the résumé (static/logos).
export const companies = [
  { name: "AffinityX", logo: "logos/affinityx.png", years: "2025 – now" },
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
    outcomes: [["~235", "screens across two apps, sole designer"], ["6 → 4", "taps to a sent order, counted on the design files"], ["~600", "orders a day at peak, my own figures"]],
    visual: { src: "work/cyberdine/06.jpg", alt: "Cyberdine before and after: a shortlist that waits for a captain, then an order sent from the table with status on every dish" },
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

