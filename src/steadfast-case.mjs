// Steadfast: an AI service-delivery platform designed at Liffto Technologies (2025).
// Sources: the requirements (SRS) written by a business analyst, its Status sheet, the Figma wireframes and final UI,
// and the official resume line. No outcome metrics exist, so none are shown. Numbers inside the screens are mock data,
// and the client names in them are placeholders. The old project name is not used anywhere.
const S = "work/steadfast/";
const img = (f, w, h, cap) => ({ t: "img", src: S + f, w, h, cap });
const two = (a, b) => ({ t: "pair", items: [a, b] });
const at = (f, w, h, cap) => ({ src: S + f, w, h, cap });

export default {
  title: "Steadfast: AI service-delivery platform",
  lead: "AI does the work. People stay in charge.",
  summary: "One platform where AI agents and people take a software deal from the first sales lead to delivered code, with a clear signal wherever the AI needs a human.",
  meta: [
    ["Role", "Product designer, wireframes to final UI"],
    ["Company", "Liffto Technologies"],
    ["Year", "2025"],
    ["Platform", "Web app, desktop"],
    ["Scope", "5 modules, the shared shell and a design system"],
  ],
  client: "Liffto Technologies",
  duration: "",
  tags: ["AI product", "B2B SaaS", "Design system"],
  tldr: [
    ["Problem", "Leads, requirements, estimates, proposals, sprints and code lived in separate tools. Every handoff lost context, and AI agents had no place to ask a person for help."],
    ["What I did", "Designed five modules on one shell, from a business analyst's requirements: wireframes, final UI and a shared design system, with human-in-the-loop states built into every flow."],
  ],
  blocks: [
    { t: "h2", x: "The brief" },
    { t: "p", x: "A software services business wanted one platform for its whole delivery chain, from the first sales lead to delivered code. AI agents would do the heavy lifting: filling forms, drafting documents, sizing work, planning sprints and writing code. People would review, decide and sign off." },
    { t: "p", x: "A business analyst wrote the requirements as an SRS covering five modules. I designed the product from it: the information architecture, wireframes, final UI and the design system every module shares." },

    { t: "h2", x: "The problem" },
    { t: "p", x: "The requirements describe a chain where every step starts by re-typing the last one. These are the pain points they set out to remove." },
    { t: "item", l: "Leads typed in by hand", x: "Sales copied client details out of RFPs, emails and calls into forms before any real work began." },
    { t: "item", l: "Drafts full of gaps", x: "Requirement drafts arrived incomplete or duplicated. The SRS puts it plainly: garbage in, garbage out." },
    { t: "item", l: "Estimates in spreadsheets", x: "Sizing and pricing were rebuilt for every deal, with the method hidden inside spreadsheet cells." },
    { t: "item", l: "AI with no one to ask", x: "Once AI agents did real work, nobody could see where an agent was stuck waiting for a person's answer." },

    { t: "h2", x: "One deal, five modules" },
    { t: "p", x: "I mapped the SRS into one journey before drawing any screens. Each module owns one stage, and the same deal (a “Spark”) flows through all five." },
    { t: "journey", items: [
      { m: "Vortex", c: "#605BFF", x: "A lead arrives. AI fills it in from a prompt, voice note or file, and scores the chance of winning." },
      { m: "Axiom", c: "#B16FF3", x: "Draft requirements become a structured SRS, with AI checks for gaps and duplicates." },
      { m: "Prism", c: "#26C0E2", x: "The work is sized, priced and written up as a proposal." },
      { m: "Cadence", c: "#FB8050", x: "The won deal becomes a project, planned in sprints by AI agents and people." },
      { m: "Turing", c: "#86C270", x: "Code is set up, generated and tested, and quality is reported back." },
    ] },
    { t: "p", x: "Each module got its own letter tile and colour in the app switcher, and that colour follows it through the product, so people always know which tool they are in." },

    { t: "h2", x: "Who it's for" },
    { t: "p", x: "The roles below come from the requirements. Each one works mainly in one module, and AI helps each in a different way." },
    { t: "item", l: "Sales (Vortex)", x: "Log leads fast and know which to chase. AI fills the lead and gives it a winning score." },
    { t: "item", l: "Business analyst (Axiom)", x: "Turn messy drafts into a complete SRS. AI maps the draft to a template and flags gaps and duplicates." },
    { t: "item", l: "Solution architect (Prism)", x: "Estimate, price and write a winning proposal. AI drafts it and checks it against the RFP." },
    { t: "item", l: "Delivery manager (Cadence)", x: "Staff the team and plan sprints. An AI project manager proposes the plan." },
    { t: "item", l: "Engineer (Turing)", x: "Set up repos, follow the AI's work and answer its questions." },
    { t: "item", l: "AI agents", x: "Treated as team members: a name, a picture, tasks of their own, and a way to ask for help." },

    { t: "h2", x: "Wireframes first" },
    { t: "p", x: "I wireframed the lead list and the sprint board in greyscale to agree the structure before any colour. The final screens kept that structure and added the priority rule, the AI score pill and the module colours." },
    two(at("wf-sparks.png", 1440, 850, "Wireframe: the Sparks list"), at("vortex-leads.png", 1366, 956, "Final UI: the Sparks list, here in Vortex")),
    two(at("wf-sprints.png", 1440, 820, "Wireframe: the sprint board"), at("cadence-sprints.png", 1366, 893, "Final UI: the sprint board in Cadence")),

    { t: "h2", x: "Vortex: a lead in seconds" },
    { t: "p", x: "Adding a lead starts with whatever sales already has. Type a prompt, record a voice note or drop in the RFP. AI reads it and fills the form, and the person reviews every field before submitting." },
    img("vortex-ai-processing.png", 1366, 886, "AI at work, shown as a process: attached files, a progress card, and the form waiting to be filled"),
    two(at("vortex-add-lead.png", 1366, 886, "Before: an empty form and three ways in"), at("vortex-ai-filled.png", 1366, 884, "After: the AI's answers, still editable")),
    { t: "p", x: "Every lead then gets an AI winning score with its reasons: strengths, weaknesses, next best actions and the factors behind the number. Sales can see why the AI thinks a deal is worth chasing, not just a percentage." },
    img("vortex-ai-scoring.png", 1366, 1242, "AI scoring explains itself: strengths, weaknesses, next best actions and a factor chart"),

    { t: "h2", x: "Axiom: drafts into a real SRS" },
    { t: "p", x: "The analyst picks a template, and AI maps the draft onto it. AI suggestions arrive as recommendations to add or cancel, never as silent edits, so the analyst stays in charge of the document." },
    two(at("axiom-templates.png", 1366, 916, "Template library: pre-built and custom"), at("axiom-pick-template.png", 1366, 886, "Pick a template for the AI to map the draft onto")),
    two(at("axiom-modules.png", 1366, 886, "Choose the modules to keep before drilling into features"), at("axiom-editor.png", 1366, 886, "The SRS editor with an AI assistant beside the document")),

    { t: "h2", x: "Prism: estimates you can read" },
    { t: "p", x: "Estimates used to be spreadsheets nobody else could follow. I turned the estimation framework into a readable model: design and dev sizing, buffers, overheads and agile ceremonies in labelled groups, each with its own total and an on/off switch per line." },
    two(at("prism-studio-sizing.png", 1366, 938, "Studio sizing: design effort by screen type and complexity"), at("prism-pricing.png", 1366, 937, "Pricing: three rate cases and payment milestones")),
    img("prism-estimation.png", 1366, 1536, "The estimation model: four labelled groups, each with its own total, adding up to one grand total"),
    img("prism-proposal.png", 1366, 929, "Proposal studio: AI drafts the proposal from the SRS and the deal, and people edit it"),

    { t: "h2", x: "Turing: the AI asks, a person answers" },
    { t: "p", x: "Turing generates and tests code, so it often needs a decision only a person can make. Turing Sync groups the AI's messages by stage, marks each stage as all good, at risk or critical, and opens the question with the right input (here, a choice of database) right beside it." },
    img("turing-sync.png", 1366, 887, "Turing Sync: messages by stage with status dots, and the AI's question answered in place"),
    two(at("turing-setup.png", 1366, 1493, "Setup: connect a repo, pick the stack, link designs, choose SDLC steps"), at("turing-quality.png", 1366, 1027, "Quality dashboard: code quality, coverage, security and build health")),

    { t: "h2", x: "Cadence: AI agents on the team" },
    { t: "p", x: "AI agents are listed on the team next to people, with a name, a role and a share of the work. On the sprint board, the task flow names who is acting: in progress by AI, pending human review, escalated, in progress by a person. Ownership on a shared board is never a guess." },
    two(at("cadence-team.png", 1366, 948, "Team: AI agents and human contributors side by side"), at("cadence-dashboard.png", 1366, 1318, "Project dashboard: health by area, phase progress and tickets by state")),

    { t: "h2", x: "Design decisions" },
    { t: "item", l: "One shell, many tools", x: "The same sidebar, top bar and colour-coded app switcher in every module, so people move between tools without losing their place." },
    { t: "item", l: "AI as a process, not magic", x: "Progress cards, logs and planning states show what the AI is doing while it works, so waiting never looks like a frozen screen." },
    { t: "item", l: "AI output stays editable", x: "Autofilled forms stay open for review, and recommendations need an explicit Add or Cancel before they count." },
    { t: "item", l: "A human needed here", x: "Waiting on a person is a state of its own in the task flow, highlighted and counted, so blocked AI work is never hidden." },
    { t: "item", l: "Priority you can scan", x: "A red rule marks high-priority rows, and the AI score is a purple pill in its own column, so a long table reads at a glance." },
    { t: "item", l: "Calm long forms", x: "Filled-grey fields and collapsible sections keep enterprise forms with dozens of fields quiet and easy to scan." },

    { t: "h2", x: "Design system" },
    { t: "p", x: "One system covers all five modules. Poppins in a short type scale (12, 14, 16, 20, 32), a single primary purple-blue with defined hover, pressed and disabled states, a deep ink for text, and one accent colour per module, each with a 10% tint for backgrounds." },
    { t: "palette", items: [
      ["#605BFF", "Primary"], ["#3D38E3", "Pressed"], ["#151338", "Ink"], ["#ECEBFF", "Primary tint"], ["#F5F7FA", "App background"],
      ["#B16FF3", "Axiom"], ["#26C0E2", "Prism"], ["#FB8050", "Cadence"], ["#86C270", "Turing"], ["#F15E5E", "Error, high priority"],
    ] },
    { t: "item", l: "Shape", x: "10 px corners on buttons, cards and search, 8 px on text fields, pills for tags and scores." },
    { t: "item", l: "Fields", x: "48 px high with a filled-grey surface that deepens on hover and focus, and a red fill and stroke for errors." },
    { t: "item", l: "Navigation", x: "A rail that collapses from 186 to 108 px, tabs with a 2 px primary underline, and breadcrumbs in the primary colour." },
    two(at("ds-buttons.png", 2698, 1582, "Buttons: primary, secondary and text, each with default, pressed, hover and disabled states"), at("ds-text-field.png", 3120, 1772, "Text fields: default, hover, focus, filled and error")),
    two(at("ds-tabs.png", 2290, 1668, "Tabs, with an optional count badge"), at("ds-tag.png", 4128, 2980, "Tags and status pills")),

    { t: "h2", x: "What I delivered" },
    { t: "p", x: "Wireframes and final UI for the shared shell, sign-in, Vortex, Axiom and Prism were marked done in the project's status sheet. Turing and Cadence followed in the same system, and the design system tied all five together for development." },
    { t: "note", x: "Client names and figures in the screens are placeholder data, not real clients or results." },

    { t: "h2", x: "What I learned" },
    { t: "item", l: "Design the waiting", x: "AI takes time. Showing progress, logs and partial results mattered as much as designing the final answer." },
    { t: "item", l: "Give the AI a face and a queue", x: "Once agents had names, tasks and a way to ask, people could treat them like teammates instead of a black box." },
    { t: "item", l: "Next time, test earlier", x: "The flows came from the requirements. I would put the add-lead and sprint flows in front of sales and delivery staff much earlier." },
  ],
};
