// Steadfast: an AI service-delivery platform designed at Liffto Technologies (2025).
// Sources: the requirements (SRS) written by a business analyst, its Status sheet, the Figma wireframes and final UI,
// and the official resume line. No outcome metrics exist, so none are shown. Numbers inside the screens are mock data,
// and the client names in them are placeholders. The old project name is not used anywhere.
// The page follows the agency case-study spine (brief, challenge, discover, define, wireframes, design, conclusion),
// kept short: one line of copy per idea, and screens or interactive pieces doing the rest.
const S = "work/steadfast/";
const img = (f, w, h, cap) => ({ t: "img", src: S + f, w, h, cap });
const two = (a, b) => ({ t: "pair", items: [a, b] });
const at = (f, w, h, cap) => ({ src: S + f, w, h, cap });

export default {
  title: "Steadfast: AI service-delivery platform",
  lead: "AI does the work. People stay in charge.",
  summary: "One platform where AI agents and people take a software deal from the first sales lead to delivered code, with a clear signal wherever the AI needs a human.",
  meta: [
    ["Role", "Lead product designer, the only designer"],
    ["Company", "Liffto Technologies"],
    ["Industry", "IT services, AI SaaS"],
    ["Platform", "Web app, desktop"],
    ["Services", "IA, UX, UI, design system"],
  ],
  client: "Liffto Technologies",
  theme: "sf",
  hero: {
    layers: [
      { src: S + "vortex-leads.png", w: 2000, h: 1400, alt: "Steadfast Vortex: the lead list with stat cards and AI winning scores" },
      { src: S + "turing-sync.png", w: 1366, h: 887, alt: "Steadfast Turing Sync: the AI asks a person which database to use" },
    ],
    // status lines the product itself shows, used as floating chips
    chips: [["AI filled 6 fields", "ai"], ["1 task needs a human", "human"], ["AI winning score 90%", "ai"], ["Sprint planned with AI", "ok"]],
  },
  duration: "",
  tags: ["AI product", "B2B SaaS", "Design system"],
  tldr: [
    ["Problem", "Five stages in separate tools. Context lost at every handoff, and AI agents with nobody to ask."],
    ["What I did", "Designed all five modules alone, from founder sessions to handoff: IA, wireframes, UI and the design system. It shipped."],
  ],
  blocks: [
    { t: "h2", x: "Brief" },
    { t: "p", x: "One platform for a software services business, from the first lead to delivered code. AI does the heavy lifting; people review and sign off. I was the only designer, from founder sessions to handoff." },

    { t: "h2", x: "Challenge" },
    { t: "cards", tone: "pain", items: [
      ["keyboard", "Leads typed by hand", "Copied from RFPs, emails and calls."],
      ["fileGap", "Drafts full of gaps", "Incomplete, duplicated requirements."],
      ["sheet", "Estimates in spreadsheets", "Rebuilt per deal, logic hidden in cells."],
      ["bot", "AI with no one to ask", "Stuck agents nobody could see."],
    ] },

    { t: "statement", kicker: "The idea", x: "One platform where AI does the work, and every AI step is *visible, editable and signed off by a person.*" },

    { t: "h2", x: "Discover" },
    { t: "process", items: [
      ["search", "Understand", "Founders, SRS, competitors"],
      ["map", "Define", "Journey, goals, IA"],
      ["pen", "Design", "Wireframes to final UI"],
      ["layers", "Systemise", "One shell, one system"],
    ] },
    { t: "personas", cap: "Proto-personas from founder sessions and the requirements.", items: [
      { r: "Sales lead", m: "Vortex", c: "#605BFF", goal: "Log leads fast", pain: "Retyping RFPs and notes", ai: "Autofills and scores leads" },
      { r: "Business analyst", m: "Axiom", c: "#B16FF3", goal: "A complete SRS, first time", pain: "Gappy, duplicate drafts", ai: "Maps drafts, flags gaps" },
      { r: "Delivery manager", m: "Cadence", c: "#FB8050", goal: "Plan and track delivery", pain: "Blocked AI work is invisible", ai: "Drafts plans, flags human tasks" },
    ] },
    { t: "journey", title: "Journey map: one deal, before and with Steadfast", items: [
      { m: "Vortex", c: "#605BFF", s: "Lead", before: "Typed by hand from RFPs and calls", now: "AI fills it from what sales already has" },
      { m: "Axiom", c: "#B16FF3", s: "Requirements", before: "Drafts with gaps and duplicates", now: "AI maps to a template and flags gaps" },
      { m: "Prism", c: "#26C0E2", s: "Estimate", before: "Rebuilt in a spreadsheet per deal", now: "A readable model, line by line" },
      { m: "Cadence", c: "#FB8050", s: "Delivery", before: "Sprints planned by hand", now: "AI drafts the plan, the manager adjusts" },
      { m: "Turing", c: "#86C270", s: "Build", before: "AI stalls go unseen", now: "Questions surface, counted, in one place" },
    ] },

    { t: "h2", x: "Define" },
    { t: "cards", tone: "goal", items: [
      ["flow", "No retyping", "Each step reuses the last."],
      ["eye", "AI you can check", "Visible, editable, signed off."],
      ["bell", "No hidden waiting", "Every wait is seen and counted."],
    ] },
    { t: "switcher", kicker: "The shell", title: "Eight apps. *One place to switch.*", x: "Each app gets a letter tile and a colour, and the colour follows it through the product. Pick a tile.", apps: [
      { n: "Vortex", c: "#605BFF", designed: true, x: "AI-assisted sales: capture leads, assign them, track stages and score the chance of winning." },
      { n: "Axiom", c: "#B16FF3", designed: true, x: "Turns draft requirements into a structured SRS, with AI checks for gaps and duplicates." },
      { n: "Prism", c: "#26C0E2", designed: true, x: "Sizes, prices and writes the proposal, with a readable estimation model." },
      { n: "Probe", c: "#FFC227", designed: false, x: "Planned in the switcher; not part of the five specified modules." },
      { n: "Cadence", c: "#FB8050", designed: true, x: "Project management by AI agents and people: team, sprints, tracking and reporting." },
      { n: "Turing", c: "#86C270", designed: true, x: "AI software engineering: repo setup, code generation, testing and quality reports." },
      { n: "Action Hub", c: "#F15E5E", designed: false, x: "Planned in the switcher; not part of the five specified modules." },
      { n: "Alerts", c: "#4263EB", designed: false, x: "Planned in the switcher; not part of the five specified modules." },
    ] },
    { t: "sitemap", root: "Steadfast shell", rootx: "Google sign-in · app switcher · notifications · profile", cap: "Information architecture. One shell, then a short menu per module; each opens on a list of deals or projects.", cols: [
      { m: "Vortex", c: "#605BFF", items: ["Spark list and board", "Add a lead with AI", "Spark detail and AI score", "Firms, peers, insights"] },
      { m: "Axiom", c: "#B16FF3", items: ["Sparks and SRS status", "Template library", "Map a draft", "Studio and AI review"] },
      { m: "Prism", c: "#26C0E2", items: ["Summary", "Studio and dev sizing", "Estimation and pricing", "Proposal studio"] },
      { m: "Cadence", c: "#FB8050", items: ["Projects with RAG", "Team: AI and people", "Sprints and tasks", "Gantt, P&L, risk"] },
      { m: "Turing", c: "#86C270", items: ["Setup and boilerplate", "UI listing", "Turing Sync", "Docs and vault"] },
    ] },
    { t: "flows", items: [
      { tab: "Add a lead", title: "Add a lead with AI", cap: "The AI does the typing; a person checks and submits.", nodes: [
        { k: "start", x: "Opens Add Lead" },
        { k: "human", x: "Adds a prompt, voice note or RFP" },
        { k: "ai", x: "Fills the lead details" },
        { k: "decision", x: "All fields right?", no: "Edit the wrong one" },
        { k: "human", x: "Submits the lead" },
        { k: "ai", x: "Scores it and explains why" },
        { k: "end", x: "Lead joins the list" },
      ] },
      { tab: "AI needs a person", title: "The AI needs a person", cap: "Waiting on a person is a visible, counted state.", nodes: [
        { k: "start", x: "AI hits a hard call" },
        { k: "ai", x: "Flags it: needs a human" },
        { k: "ai", x: "Asks in Turing Sync" },
        { k: "human", x: "Answers in place" },
        { k: "decision", x: "Answer enough?", no: "AI follows up" },
        { k: "end", x: "AI resumes, logged" },
      ] },
      { tab: "Plan a sprint", title: "Plan a sprint with AI", cap: "The AI drafts the plan in the open; the manager can step in.", nodes: [
        { k: "start", x: "Opens Sprints" },
        { k: "human", x: "Sets length, team and dates" },
        { k: "ai", x: "Plans by priority and effort" },
        { k: "decision", x: "Plan looks right?", no: "Adjust, AI re-plans" },
        { k: "end", x: "Sprint starts" },
      ] },
    ] },

    { t: "h2", x: "From spreadsheet to screen" },
    { t: "p", x: "Every screen started as a row in the requirements spreadsheet. Follow one feature through." },
    { t: "srs2ui", items: [
      { tab: "Prism Sparks list", module: "Prism", rows: [
        ["Overview", "Estimation, P&L, planning and proposal tool", "P1"],
        ["Landing", "Sparks in a Kanban or list view; a click opens the spark", "P1", true],
        ["Summary", "Every detail of the selected proposal", "P1"],
      ], wf: { src: S + "wf-sparks.png", w: 1440, h: 850 }, ui: { src: S + "prism-sparks.png", w: 1366, h: 886 },
        notes: ["It starts as one row in the requirements spreadsheet.", "The wireframe agrees the columns and actions in greyscale.", "The final design adds status pills, AI scores and Prism's colour."] },
      { tab: "Cadence sprint board", module: "Cadence", rows: [
        ["Kanban", "Backlog, Sprint 1, Sprint 2… as columns", "P1", true],
        ["Plan with AI", "AI spreads tasks by priority and effort", "P1"],
        ["Kanban", "Each sprint column shows its ticket count", "P1"],
      ], wf: { src: S + "wf-sprints.png", w: 1440, h: 820 }, ui: { src: S + "cadence-sprints.png", w: 1366, h: 893 },
        notes: ["It starts as three rows in the requirements spreadsheet.", "The wireframe places the columns, counts and Plan with AI.", "The final design adds priority rules, tags and owners."] },
    ] },

    { t: "h2", x: "Design" },
    { t: "module", n: "01", m: "Vortex", c: "#605BFF", title: "A lead in seconds", x: "Sales drops in whatever they have; AI fills the form and scores the deal.", items: [
      { t: "leadDemo", prompt: "RFP from Northwind Pay, a fintech company: a payments app for small shops, about 1.5M. Contact Priya Raman, Head of Product. Proposal due 30 May.", file: "northwind-rfp.pdf",
        fields: [["Client name", "Northwind Pay"], ["Vertical", "Fintech"], ["Deal size", "1.5M"], ["Contact person", "Priya Raman"], ["Lead source", "RFP"], ["Due date", "30 May"]],
        cap: "Rebuilt in code with made-up example data. Fields the AI fills are marked; edit one and it becomes yours. Nothing counts until a person submits." },
      img("vortex-ai-scoring.png", 2000, 1818, "The AI score explains itself: strengths, weaknesses, next best actions and the factors behind the number"),
    ] },

    { t: "module", n: "02", m: "Axiom", c: "#B16FF3", title: "Drafts into a real SRS", x: "AI maps the draft to a template; the analyst accepts or rejects every suggestion.", items: [
      two(at("axiom-pick-template.png", 1366, 886, "Pick a template for the AI to map the draft onto"), at("axiom-editor.png", 1366, 886, "Edit the SRS with an AI assistant beside it")),
    ] },

    { t: "module", n: "03", m: "Prism", c: "#26C0E2", title: "Estimates you can read", x: "The spreadsheet becomes a model anyone can follow, line by line.", items: [
      { t: "estimate", cap: "Example numbers, not a real deal. Buffers and overheads are a share of engineering effort, ceremonies scale with sprints, and any line can be switched off.",
        base: [["Design", 100], ["Front end", 400], ["Back end", 400], ["Testing", 100]],
        groups: [
          { g: "Buffers", rows: [["Contingency", 10, true], ["Review and rework", 5, false]] },
          { g: "SDLC overheads", rows: [["Project management", 7, true], ["Requirements analysis", 2, true], ["Architecture and design", 2, true], ["DevOps", 2, true], ["SIT and UAT", 4, true], ["Hyper-care", 7, true], ["Warranty", 6, false]] },
        ],
        agile: { sprints: 5, rows: [["Sprint planning", 2], ["Sprint demo", 2], ["Retrospective", 2]] } },
      two(at("prism-studio-sizing.png", 1366, 938, "Studio sizing: design effort by screen type and complexity"), at("prism-proposal.png", 1366, 929, "Proposal studio: AI drafts, people edit")),
    ] },

    { t: "module", n: "04", m: "Turing", c: "#86C270", title: "The AI asks, a person answers", x: "Questions arrive grouped by stage, with the right input right beside them.", items: [
      img("turing-sync.png", 1366, 887, "Turing Sync: messages grouped by stage with health dots, and the AI's question answered in place"),
    ] },

    { t: "module", n: "05", m: "Cadence", c: "#FB8050", title: "AI agents on the team", x: "Agents and people share one board, and every state says who owns the task.", items: [
      { t: "taskFlow", task: { id: "PLTX-12", t: "As a user I need to share dashboards with clients", tags: ["UI Screens", "API"] }, cap: "The task flow from the requirements, rebuilt in code. Each state names who owns the task.", states: [
        { n: "Unassigned", who: "wait", owner: "Nobody yet: AI assigns it by default", x: "New from the backlog. Unless a person steps in, the AI picks the owner, human or agent." },
        { n: "In progress · AI", who: "ai", owner: "AI agent AG PM 001", x: "An AI agent works the task and logs every step." },
        { n: "Pending · human", who: "human", owner: "Bonnie Barstow, product manager", x: "The AI needs a person. The card is highlighted and jumps to the top of its column." },
        { n: "Approved", who: "human", owner: "Bonnie Barstow, product manager", x: "A person signed off the AI's work." },
        { n: "Escalated", who: "human", owner: "Delivery manager", x: "Raised to a person with more authority to decide." },
        { n: "In progress · human", who: "human", owner: "Templeton Peck, front-end developer", x: "A person takes over, with the AI's notes in the thread." },
        { n: "Blocked", who: "wait", owner: "Waiting on another task", x: "Waiting for input or a dependent task, like testing or approval." },
        { n: "Done", who: "done", owner: "Closed", x: "Finished. Leftovers return to the backlog when the sprint ends." },
      ] },
      two(at("cadence-team.png", 1366, 948, "AI agents and people on one team"), at("cadence-sprints.png", 1366, 893, "One sprint board for both")),
    ] },

    { t: "h2", x: "Design system" },
    { t: "palette", items: [
      ["#605BFF", "Primary"], ["#3D38E3", "Pressed"], ["#151338", "Ink"], ["#ECEBFF", "Primary tint"], ["#F5F7FA", "App background"],
      ["#B16FF3", "Axiom"], ["#26C0E2", "Prism"], ["#FB8050", "Cadence"], ["#86C270", "Turing"], ["#F15E5E", "Error, high priority"],
    ] },
    { t: "type", family: "Poppins", sample: "AI winning score 90%", rows: [[32, 600, "Page titles"], [20, 400, "Section titles"], [16, 500, "Body and table text"], [14, 500, "Labels and buttons"], [12, 600, "Tags and captions"]] },
    { t: "components" },

    { t: "h2", x: "When the AI is wrong" },
    { t: "p", x: "AI will get things wrong. Every mistake is easy to spot, cheap to fix and never final without a person." },
    { t: "cards", tone: "guard", items: [
      ["pen", "It fills a field wrong", "Fields stay editable until submit."],
      ["xCircle", "It suggests a bad change", "Add or Cancel. No silent edits."],
      ["chart", "Its score looks arbitrary", "Reasons and factors are shown."],
      ["msg", "It hits a call it shouldn't make", "It asks, then waits for review."],
      ["arrowUp", "The work is too risky", "Escalated to a person."],
      ["history", "Who changed what?", "Every action is logged."],
    ] },
    { t: "p", x: "Next: a confidence level per field, linked to the sentence it came from." },

    { t: "h2", x: "Key decisions" },
    { t: "cards", items: [
      ["layout", "One shell, colour-coded apps", "Always know which tool you're in."],
      ["activity", "AI shown as a process", "Progress and logs, never a frozen screen."],
      ["hand", "“Needs a human” is a state", "Highlighted, counted, sorted to the top."],
      ["bot", "AI agents with names", "Clear owners on a shared board."],
    ] },

    { t: "h2", x: "Conclusion" },
    { t: "wrap",
      did: [
        "IA and key flows for five modules",
        "Wireframes and final UI with every state",
        "One design system for every module",
        "A shipped product, built from my designs",
      ],
      learnt: [
        ["Design the waiting", "Progress matters as much as the answer."],
        ["Give the AI a face", "Named agents read as teammates."],
        ["Test with users early", "Next time, sales and delivery staff before handoff."],
        ["Check colour as text", "Cyan and green need darker text tones."],
      ] },
    { t: "note", x: "Client names and figures in the screens are placeholder data, not real clients or results." },
  ],
};
