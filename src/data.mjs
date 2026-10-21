// All content for the site lives here.
// Sources: kavuthamraj.framer.website (live site), LinkedIn profile, Naukri profile.
// Left out on purpose: phone number, personal email, and any figure not yet verified
// (app/website/screen counts beyond the employment record, award claims, client logos, downloads, percentages).

export const profile = {
  name: "Kavuthamraj Geetha Senthilkumar",
  short: "Kavuthamraj",
  role: "Senior UI/UX & Product Designer",
  location: "From Tiruppur, Tamil Nadu",
  url: "https://www.kavuthamraj.com",
  email: "kavutham99raj@gmail.com",
  availability: "Available for new opportunities",
  headline: ["Kavuthamraj", "Geetha Senthilkumar"],
  intro:
    "I design end-to-end digital products (B2B, B2C, SaaS, ERP and back-office systems) that are clear to use and hard to forget.",
  about: [
    "I'm a senior UI/UX and product designer with 5+ years of experience turning messy, real-world workflows into calm, usable interfaces.",
    "My work spans research, information architecture, interaction design, visual systems and hand-off. I care about the details that make a product feel inevitable: spacing, states, edge cases, and the words on the button.",
    "I've worked on enterprise dashboards, B2C booking and ordering apps, and full product design for startups. I build accessible design systems (WCAG 2.1 AA), design AI products, and prototype in Figma, Framer and Claude.",
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
    note: "Co-owns UX and UI for Titan, a B2B SaaS back-office and ERP product. Redesigning high-volume order screens for the product.",
  },
  {
    role: "Founding Member and Design Lead",
    company: "Liffto Technologies",
    tags: ["Founding team", "Hospitality", "AI SaaS", "E-commerce"],
    dates: "Nov 2024 to Jul 2025",
    note: "Led design for hospitality, retail and logistics software, including a B2B e-commerce website, an AI-powered client management SaaS, and the Cyberdine restaurant ordering product.",
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
    note: "Designed Sporfy, a B2C turf and event booking app on Google Play, end to end with user research. Also worked on Sporfy Tracker, the sports ERP and payroll system, and other product work.",
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
  { title: "MBA, Business Administration and Management (online)", org: "SRM University, Kattankulathur", dates: "Feb 2023 to Jan 2025" },
  { title: "Bachelor's degree in Visual Communication", org: "PSG College of Arts & Science", dates: "2018 to 2021" },
  { title: "User Experience (UX) Design certificate", org: "Google", dates: "" },
];

// Long-form case studies (text from the live Framer pages, or written from the owner's own notes).
export const cases = {
  titan: {
    title: "Titan: Skeleton Loading for B2B SaaS",
    lead: "Stop the spinner. Keep the work moving.",
    summary: "How I replaced Titan's full-page loaders with skeleton states, so operations teams kept working while their data loaded.",
    meta: [
      ["Role", "Senior UI/UX Designer, 1 of 2 designers"],
      ["Team", "Product manager, stakeholders and developers"],
      ["Timeline", "2 weeks, wireframe to release"],
      ["Scope", "Loading audit, research, wireframes, UI, handoff"],
      ["Tools", "Figma, MUI v6 design system"],
    ],
    body: [
      "It started with a message from the PM. Every time a table loaded in Titan, users saw a full-page loader and couldn't touch anything else until it finished. One slow table, and the whole product was frozen.",
      "That sounded bigger than one screen. So I went through the tables, dashboards and data panels, and the same loader was waiting everywhere. The question changed from \"how do I fix this table?\" to \"how should Titan load, everywhere?\"",
      "I studied how Jira handles loading in its data-heavy views, compared the patterns side by side, and proposed skeleton loaders.",
    ],
    cover: "titan.png",
  },
  cyberdine: {
    title: "Cyberdine: QR dine-in ordering",
    lead: "Don't wait for the captain. Order from the table.",
    summary: "How I turned Cyberdine's shortlist-only menu into QR ordering that diners complete on their own, with staff still checking each dish.",
    meta: [
      ["Role", "UI/UX and product designer, the only designer on Cyberdine"],
      ["Team", "Design by me; developers built it from my handoff"],
      ["Timeline", "About 1 year, design through developer handoff"],
      ["Scope", "Customer app (35 screens), restaurant app (about 200), flows, UI, states, handoff"],
    ],
    body: [
      "QR dine-in ordering for Indian restaurants, a product of Liffto Technologies.",
      "Diners could browse and shortlist dishes, but they couldn't order. After that, diners waited for a captain (the waiter who takes orders) to come and take the order.",
      "The dish sheet only asked for quantity. Portion, spice and notes were settled outside the app.",
    ],
    cover: "cyberdine.png",
  },
  erp: {
    title: "ERP Solution for Sports Industry",
    lead: "Run the whole game.",
    summary: "An end-to-end ERP for the sports industry, designed mobile-first for Sporfy, with payroll built into the Sporfy Tracker app.",
    meta: [
      ["Role", "Planned and designed end to end, on my own"],
      ["Team", "Worked under the CEO and CTO"],
      ["Client", "Sporfy"],
      ["Focus", "ERP, payroll, mobile"],
    ],
    body: [
      "Bring an ERP for the sports industry into a mobile-first app. The work started from the users' vision and goals, then looked at where the product stood as an ERP, and then carried those needs into the app's screens.",
      "I planned and designed the project end to end on my own, working under the CEO and CTO.",
      "Payroll is part of the Sporfy Tracker app, alongside the attendance, schedules and fee tracking the app already covers.",
    ],
    cover: "erp-solution.png",
    link: "https://www.behance.net/gallery/224132329/ERP-Solutionfor-Sports-Industry",
  },
};

// ---------- sections for the editorial home page ----------
export const heroCopy = [
  "I design end-to-end products for B2B SaaS, ERP and consumer apps, so they are clear to use and hard to forget.",
  "Now Senior UI/UX Designer at AffinityX, working on Titan, a B2B SaaS back-office product.",
];

// Only figures with a public or published source.
export const impact = [
  { value: "50K+", label: "Sporfy installs", text: "Designed Sporfy, a B2C turf and event booking app, end to end with user research. 50K+ installs on Google Play.", cta: "See the app", href: "https://play.google.com/store/apps/details?id=com.sporfy.customer", tone: "mocha", ext: true },
  { value: "~235", label: "Cyberdine screens", text: "Sole designer on Cyberdine, QR dine-in ordering for Indian restaurants: a 35-screen customer app and a ~200-screen restaurant app.", cta: "See case study", href: "work/cyberdine.html", tone: "clay" },
  { value: "2 wks", label: "Titan, wireframe to release", text: "Replaced Titan's full-page loaders with skeleton states, so operations teams kept working while data loaded.", cta: "See case study", href: "work/titan.html", tone: "sage" },
];

export const strengths = [
  { t: "Product design", d: "End-to-end products for B2B SaaS, ERP and consumer apps, from first sketch to production-ready screens and handoff." },
  { t: "Design systems", d: "Accessible systems and component libraries (WCAG 2.1 AA, MUI v6) that keep product teams fast and consistent." },
  { t: "UX research", d: "Interviews, audits, flows and competitor studies, so the team designs the right thing first." },
  { t: "AI prototyping", d: "Working prototypes in Figma, Framer and Claude, so stakeholders try ideas before development starts." },
];

export const featured = [
  { key: "erp", stats: ["2 years, end to end", "Solo, under the CEO and CTO", "Live on Google Play"], title: "Bringing a sports ERP into a mobile-first app.", text: "Planned and designed end to end under the CEO and CTO: organisation, accounts and payroll, resources, classes, and slots and lockers.", href: "work/erp.html", cover: "erp-solution.png", tone: "dark" },
  { key: "titan", stats: ["Wireframe to release in 2 weeks", "~40% faster-feeling (PM estimate)", "Now a product-wide standard"], title: "Stop the spinner. Keep the work moving.", text: "How I replaced Titan's full-page loaders with skeleton states, so operations teams kept working while their data loaded.", href: "work/titan.html", cover: "titan.png", tone: "sage" },
  { key: "cyberdine", stats: ["Sole designer, ~235 screens", "6–15 restaurants at peak", "~600 orders a day at peak"], title: "Don't wait for the captain. Order from the table.", text: "QR ordering that diners complete on their own, with restaurant staff still checking each dish.", href: "work/cyberdine.html", cover: "cyberdine.png", tone: "mocha" },
  { key: "redbus", stats: ["Concept, 1 week", "New-feature research"], title: "A daily pass for regular bus commuters.", text: "A UX case study for RedBus: one subscription for fixed routes, with one-tap booking and live tracking.", href: "work/redbus.html", cover: "redbus.png", tone: "black" },
];

// PLACEHOLDERS: replace each with a real LinkedIn recommendation before going live.
export const testimonials = [
  { name: "Product Manager", role: "Titan, AffinityX", quote: "Replace with a real recommendation about working together on Titan: the loading audit, the skeleton states and the handoff.", placeholder: true },
  { name: "CEO or CTO", role: "Sporfy", quote: "Replace with a real recommendation about the sports ERP and payroll work, and what it was like to work with you.", placeholder: true },
  { name: "Developer", role: "Cyberdine, Liffto Technologies", quote: "Replace with a real recommendation about your handoff quality and how easy your designs were to build.", placeholder: true },
  { name: "Design Lead", role: "SRM Technologies", quote: "Replace with a real recommendation about your work on enterprise apps and the design system.", placeholder: true },
];

