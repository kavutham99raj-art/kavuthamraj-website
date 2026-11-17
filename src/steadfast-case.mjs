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
      { src: S + "vortex-leads.png", w: 1366, h: 956, alt: "Steadfast Vortex: the lead list with stat cards and AI winning scores" },
      { src: S + "turing-sync.png", w: 1366, h: 887, alt: "Steadfast Turing Sync: the AI asks a person which database to use" },
    ],
    // status lines the product itself shows, used as floating chips
    chips: [["AI filled 6 fields", "ai"], ["1 task needs a human", "human"], ["AI winning score 90%", "ai"], ["Sprint planned with AI", "ok"]],
  },
  duration: "",
  tags: ["AI product", "B2B SaaS", "Design system"],
  tldr: [
    ["Problem", "Leads, requirements, estimates, sprints and code lived in separate tools. Every handoff lost context, and AI agents had no place to ask a person for help."],
    ["What I did", "As the only designer, took five modules from founder sessions to developer handoff: IA, wireframes, final UI and a shared design system, with human-in-the-loop states in every flow. It was built and used."],
  ],
  blocks: [
    { t: "h2", x: "Brief" },
    { t: "p", x: "A software services business wanted one platform for its whole delivery chain, from the first sales lead to delivered code. AI agents do the heavy lifting; people review, decide and sign off. A business analyst wrote the requirements for five modules. As the only designer, I took it from founder sessions to developer handoff, and it was built and used." },

    { t: "h2", x: "Challenge" },
    { t: "cards", tone: "pain", items: [
      ["Leads typed by hand", "Sales copied details out of RFPs, emails and calls before any real work began."],
      ["Drafts full of gaps", "Requirements arrived incomplete or duplicated. Garbage in, garbage out."],
      ["Estimates in spreadsheets", "Sizing and pricing were rebuilt for every deal, the method hidden in cells."],
      ["AI with no one to ask", "Nobody could see where an AI agent was stuck waiting for a person."],
    ] },

    { t: "statement", kicker: "The idea", x: "One platform where AI does the work, and every AI step is *visible, editable and signed off by a person.*" },

    { t: "h2", x: "Discover" },
    { t: "process", items: [
      ["Understand", "Founder and stakeholder sessions, the SRS module by module, and a competitor review."],
      ["Define", "Mapped one deal end to end, set design goals and drew the IA."],
      ["Design", "Greyscale wireframes, then final UI with every state."],
      ["Systemise", "One shell and design system for all five modules."],
    ] },
    { t: "personas", cap: "Proto-personas from founder and stakeholder sessions and the requirements. Solution architects (Prism) and engineers (Turing) complete the chain.", items: [
      { r: "Sales lead", m: "Vortex", c: "#605BFF", goal: "Log leads fast and chase the right ones.", pain: "Retypes RFPs, emails and call notes into forms.", ai: "Fills the lead from a prompt, voice note or file, and scores it with reasons." },
      { r: "Business analyst", m: "Axiom", c: "#B16FF3", goal: "A complete SRS the first time.", pain: "Drafts arrive with gaps and duplicates.", ai: "Maps the draft to a template and flags gaps; the analyst accepts or rejects each one." },
      { r: "Delivery manager", m: "Cadence", c: "#FB8050", goal: "Plan, staff and track delivery.", pain: "Can't see where AI work is waiting on a person.", ai: "Drafts the sprint plan, and surfaces every task that needs a human." },
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
      ["No retyping", "Every module starts from what the last one produced."],
      ["AI you can check", "Every AI output is visible, editable, and needs a person's yes to count."],
      ["No hidden waiting", "Wherever AI needs a person is a state you can see, count and act on."],
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
      { tab: "Add a lead", title: "Flow: add a lead with AI", cap: "The AI does the typing; a person checks and submits.", nodes: [
        { k: "start", x: "Sales opens Add Lead" },
        { k: "human", x: "Types a prompt, records a voice note or drops in the RFP" },
        { k: "ai", x: "Reads the input and fills client and lead details" },
        { k: "decision", x: "Is every field right?", no: "the person edits it; the rest stay filled" },
        { k: "human", x: "Submits the lead" },
        { k: "ai", x: "Scores the chance of winning and explains why" },
        { k: "end", x: "The lead joins the list with its score" },
      ] },
      { tab: "AI needs a person", title: "Flow: the AI needs a person", cap: "Waiting on a person is a visible, counted state, never a silent stall.", nodes: [
        { k: "start", x: "An AI agent reaches a decision it should not make alone" },
        { k: "ai", x: "Moves the task to Pending human review; the menu counter goes up" },
        { k: "ai", x: "Asks in Turing Sync with the right input: a choice, text or dropdown" },
        { k: "human", x: "Answers in place" },
        { k: "decision", x: "Is the answer enough?", no: "the AI follows up in the task's comments" },
        { k: "end", x: "The AI resumes, with the decision on record" },
      ] },
      { tab: "Plan a sprint", title: "Flow: plan a sprint with AI", cap: "The AI drafts the plan in the open; the manager can step in at any point.", nodes: [
        { k: "start", x: "The manager opens Sprints" },
        { k: "human", x: "Sets sprint length, team size and dates, or asks AI to" },
        { k: "ai", x: "Spreads tasks across sprints by priority, dependencies and effort, with a live log" },
        { k: "decision", x: "Does the plan look right?", no: "the manager adds input and the AI re-plans" },
        { k: "end", x: "The first sprint starts" },
      ] },
    ] },

    { t: "h2", x: "Wireframes" },
    { t: "compare", ratio: "1366/886", cap: "Drag to compare the Prism Sparks list. The wireframe's columns carried straight into the final, which adds colour-coded status and AI score pills.",
      before: { src: S + "wf-sparks.png", w: 1440, h: 850, alt: "Wireframe of the Sparks list in greyscale" },
      after: { src: S + "prism-sparks.png", w: 1366, h: 886, alt: "Final UI of the Sparks list in Prism, with status pills and AI winning score pills" } },

    { t: "h2", x: "Design" },
    { t: "module", n: "01", m: "Vortex", c: "#605BFF", title: "A lead in seconds", x: "Sales drops in whatever they have; AI fills the form and scores the deal.", items: [
      { t: "leadDemo", prompt: "RFP from Northwind Pay, a fintech company: a payments app for small shops, about 1.5M. Contact Priya Raman, Head of Product. Proposal due 30 May.", file: "northwind-rfp.pdf",
        fields: [["Client name", "Northwind Pay"], ["Vertical", "Fintech"], ["Deal size", "1.5M"], ["Contact person", "Priya Raman"], ["Lead source", "RFP"], ["Due date", "30 May"]],
        cap: "Rebuilt in code with made-up example data. Fields the AI fills are marked; edit one and it becomes yours. Nothing counts until a person submits." },
      img("vortex-ai-scoring.png", 1366, 1242, "The AI score explains itself: strengths, weaknesses, next best actions and the factors behind the number"),
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
      { t: "taskFlow", task: { id: "PLTX-12", t: "As a user I need to share dashboards with clients" }, cap: "The task flow from the requirements, rebuilt in code. Each state names who owns the task.", states: [
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
    two(at("ds-buttons.png", 2698, 1582, "Buttons with default, pressed, hover and disabled states"), at("ds-text-field.png", 3120, 1772, "48 px filled fields: default, hover, focus, filled and error")),

    { t: "h2", x: "When the AI is wrong" },
    { t: "p", x: "AI will get things wrong. Every module was designed so a mistake is easy to spot, cheap to fix and never final without a person." },
    { t: "cards", tone: "guard", items: [
      ["If it fills a field wrong", "Every AI-filled field stays open and editable, and nothing is saved until a person submits."],
      ["If it suggests a bad change", "Recommendations need an explicit Add or Cancel. Nothing edits the SRS or proposal silently."],
      ["If its score looks arbitrary", "The winning score shows strengths, weaknesses and the factors behind it, so sales can disagree with reasons."],
      ["If it reaches a call it shouldn't make", "It asks in Turing Sync or the task thread, and the task waits in Pending human review."],
      ["If the work is too risky for AI", "Escalated hands the task to a person with the authority to decide."],
      ["If someone asks who changed what", "Turing Sync logs and each task's activity thread record what the AI and each person did."],
    ] },
    { t: "p", x: "Next, I would add a confidence level to each AI-filled field and a link back to the sentence it came from, so checking takes one glance." },

    { t: "h2", x: "Key decisions" },
    { t: "cards", items: [
      ["One shell, colour-coded apps", "Same sidebar, top bar and app switcher everywhere; each module keeps its colour, so people always know where they are."],
      ["AI shown as a process", "Progress cards, logs and planning states show what the AI is doing, so waiting never looks frozen."],
      ["“Needs a human” is a state", "Pending human review is highlighted, counted and sorted to the top, so blocked AI work is never hidden."],
      ["AI agents with names", "Agents get a name, a role and tasks of their own, so ownership on a shared board is never a guess."],
    ] },

    { t: "h2", x: "Conclusion" },
    { t: "wrap",
      did: [
        "Information architecture and key flows for five modules on one shell",
        "Wireframes, then final UI with empty, loading, AI-working and needs-a-person states",
        "One design system of tokens, components and states shared by every module",
        "A shipped product: developers built it from my designs, and the business used it",
      ],
      learnt: [
        ["Design the waiting", "AI takes time. Progress and partial results mattered as much as the final answer."],
        ["Give the AI a face", "With names and a way to ask, agents read as teammates, not a black box."],
        ["Test with users, not just founders", "My input came from founder and stakeholder sessions. Next time I'd test the key flows with sales and delivery staff before handoff."],
        ["Check colour as text", "Cyan and green work as module fills but fail as small text on white. I'd add darker text tones to the palette."],
      ] },
    { t: "note", x: "Client names and figures in the screens are placeholder data, not real clients or results." },
  ],
};
