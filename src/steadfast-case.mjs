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
  summary: "Software companies juggle five tools to win a client and deliver an app. Steadfast puts all five steps in one place: AI does the typing and the maths, and a person checks every step.",
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
    role: ["Only designer", "Founder talks to handoff", "Shipped"],
    chips: [["AI filled 6 fields", "ai"], ["1 task needs a human", "human"], ["AI winning score 90%", "ai"], ["Sprint planned with AI", "ok"]],
  },
  duration: "",
  tags: ["AI product", "B2B SaaS", "Design system"],
  blocks: [
    { t: "explain", kicker: "The story in 30 seconds",
      title: "Think of a company that builds apps for other businesses.",
      x: "To win one client and deliver one app, its team goes through five steps:",
      steps: [
        ["target", "Win the client", "Vortex", "#605BFF"],
        ["layers", "Write down what to build", "Axiom", "#B16FF3"],
        ["chart", "Put a price on it", "Prism", "#26C0E2"],
        ["activity", "Plan the work", "Cadence", "#FB8050"],
        ["flow", "Build the app", "Turing", "#86C270"],
      ],
      before: ["Five separate tools", "The same details typed again at every step", "Nobody noticed when the AI got stuck"],
      after: ["One place for all five steps", "AI does the typing and the maths", "A person checks and approves every AI step"],
    },

    { t: "h2", x: "Four decisions, in 90 seconds" },
    { t: "raw", html: '<div class="sx-dec">  <a class="sx-tile is-wide" href="#the-five-steps-screen-by-screen">    <div class="sx-viz sx-shell" aria-hidden="true"><nav><i style="--c:#605BFF" class=on>V</i><i style="--c:#B16FF3">A</i><i style="--c:#26C0E2">P</i><i style="--c:#FB8050">C</i><i style="--c:#86C270">T</i></nav><div><p><b style="--c:#605BFF">Vortex</b><span>Leads</span></p><em></em><em></em><em class="s"></em></div></div>    <div class="sx-txt"><small>01</small><h3>One shell, colour-coded apps</h3><p>Always know which tool you’re in.</p><span class="sx-go">See it →</span></div>  </a>  <a class="sx-tile" href="#mod-vortex">    <div class="sx-viz sx-proc" aria-hidden="true"><p><span>AI is working</span><b>72%</b></p><i><u></u></i><ol><li class="ok">Read the brief</li><li class="ok">Filled 6 fields</li><li class="run">Scoring the deal</li></ol></div>    <div class="sx-txt"><small>02</small><h3>AI shown as a process</h3><p>Progress and logs, never a frozen screen.</p><span class="sx-go">See it →</span></div>  </a>  <a class="sx-tile" href="#what-if-the-ai-gets-it-wrong">    <div class="sx-viz sx-human" aria-hidden="true"><p class="hot"><span>Choose a database</span><b>Needs a human</b></p><p><span>Build the login</span><em>Done</em></p><p><span>Write the API</span><em>Done</em></p></div>    <div class="sx-txt"><small>03</small><h3>“Needs a human” is a state</h3><p>Highlighted, counted, sorted to the top.</p><span class="sx-go">See it →</span></div>  </a>  <a class="sx-tile is-wide" href="#mod-cadence">    <div class="sx-viz sx-board" aria-hidden="true"><div><small>To do</small><p><i class="ai">AI</i>Frontend agent</p><p><i class="pp">You</i>Reviewer</p></div><div><small>Doing</small><p><i class="ai">AI</i>Backend agent</p></div><div><small>Done</small><p><i class="ai">AI</i>QA agent</p></div></div>    <div class="sx-txt"><small>04</small><h3>AI agents with names</h3><p>Clear owners on a shared board.</p><span class="sx-go">See it →</span></div>  </a></div>' },

    { t: "h2", x: "What was going wrong" },
    { t: "raw", html: '<div class="sx-chaos">  <p class="sx-big">Same client. <em>Typed five times.</em></p>  <ol class="sx-wins"><li style="--k:0"><p class="sx-wbar"><i></i><i></i><i></i><span>Email</span></p><p class="sx-wbody"><small>Client</small><b>Northwind Pay<em></em></b><small>Contact</small><b>Priya Raman</b></p><span class="sx-count">Typed 1×</span></li><li style="--k:1"><p class="sx-wbar"><i></i><i></i><i></i><span>RFP PDF</span></p><p class="sx-wbody"><small>Client</small><b>Northwind Pay<em></em></b><small>Contact</small><b>Priya Raman</b></p><span class="sx-count">Typed 2×</span></li><li style="--k:2"><p class="sx-wbar"><i></i><i></i><i></i><span>Requirements doc</span></p><p class="sx-wbody"><small>Client</small><b>Northwind Pay<em></em></b><small>Contact</small><b>Priya Raman</b></p><span class="sx-count">Typed 3×</span></li><li style="--k:3"><p class="sx-wbar"><i></i><i></i><i></i><span>Pricing sheet</span></p><p class="sx-wbody"><small>Client</small><b>Northwind Pay<em></em></b><small>Contact</small><b>Priya Raman</b></p><span class="sx-count">Typed 4×</span></li><li style="--k:4"><p class="sx-wbar"><i></i><i></i><i></i><span>Project board</span></p><p class="sx-wbody"><small>Client</small><b>Northwind Pay<em></em></b><small>Contact</small><b>Priya Raman</b></p><span class="sx-count">Typed 5×</span></li></ol>  <ul class="sx-pains"><li><b>Typing everything by hand</b><span>Client details copied from emails, PDFs and calls.</span></li><li><b>Plans full of holes</b><span>Missing and repeated requirements.</span></li><li><b>Prices hidden in spreadsheets</b><span>Rebuilt for every client. One person understood the maths.</span></li><li><b>AI stuck, nobody knew</b><span>The AI waited for answers no one could see.</span></li></ul></div>' },

    { t: "statement", kicker: "The idea", x: "Let AI do the boring work, and let a person *see, fix and approve* every step." },

    { t: "h2", x: "The five steps, screen by screen" },
    { t: "p", x: "One app per step, all in one place. Each shows what changed for the person using it." },
    { t: "module", n: "01", ba: ["Typed by hand from emails and calls", "AI fills it from what sales already has"], m: "Vortex", c: "#605BFF", title: "Win the client: a new lead in seconds", x: "Sales pastes an email or a PDF. The AI fills in the form and says how likely the deal is to win.", items: [
      { t: "leadDemo", prompt: "Brief from Northwind Pay, a fintech company: a payments app for small shops, about 1.5M. Contact Priya Raman, Head of Product. Proposal due 30 May.", file: "northwind-rfp.pdf",
        fields: [["Client name", "Northwind Pay"], ["Vertical", "Fintech"], ["Deal size", "1.5M"], ["Contact person", "Priya Raman"], ["Lead source", "RFP"], ["Due date", "30 May"]],
        cap: "Rebuilt in code with made-up example data. Fields the AI fills are marked; edit one and it becomes yours. Nothing counts until a person submits." },
      img("vortex-ai-scoring.png", 2000, 1818, "The AI score explains itself: strengths, weaknesses, next best actions and the factors behind the number"),
    ] },

    { t: "module", n: "02", ba: ["Drafts with gaps and duplicates", "AI tidies them and points out what's missing"], m: "Axiom", c: "#B16FF3", title: "Write down what to build", x: "The AI turns rough notes into a proper plan. The analyst approves or rejects every change.", items: [
      two(at("axiom-pick-template.png", 1366, 886, "Pick a template, and the AI sorts the notes into it"), at("axiom-editor.png", 1366, 886, "Edit the plan with an AI assistant beside it")),
    ] },

    { t: "module", n: "03", ba: ["Rebuilt in a spreadsheet for every client", "A clear price list anyone can read"], m: "Prism", c: "#26C0E2", title: "Put a price on it", x: "No more hidden spreadsheet maths. Every hour and every cost is a line anyone can read.", items: [
      { t: "estimate", cap: "Example numbers, not a real deal. Buffers and overheads are a share of engineering effort, ceremonies scale with sprints, and any line can be switched off.",
        base: [["Design", 100], ["Front end", 400], ["Back end", 400], ["Testing", 100]],
        groups: [
          { g: "Buffers", rows: [["Contingency", 10, true], ["Review and rework", 5, false]] },
          { g: "Project overheads", rows: [["Project management", 7, true], ["Requirements analysis", 2, true], ["Architecture and design", 2, true], ["DevOps", 2, true], ["SIT and UAT", 4, true], ["Hyper-care", 7, true], ["Warranty", 6, false]] },
        ],
        agile: { sprints: 5, rows: [["Sprint planning", 2], ["Sprint demo", 2], ["Retrospective", 2]] } },
      two(at("prism-studio-sizing.png", 1366, 938, "Studio sizing: design effort by screen type and complexity"), at("prism-proposal.png", 1366, 929, "Proposal studio: AI drafts, people edit")),
    ] },

    { t: "module", n: "04", ba: ["Work planned by hand", "AI drafts the plan, the manager adjusts it"], m: "Cadence", c: "#FB8050", title: "Plan the work with AI teammates", x: "AI helpers and people share one task board. Every task shows who owns it right now.", items: [
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

    { t: "module", n: "05", ba: ["Nobody sees when the AI is stuck", "The AI asks, and a person answers in one place"], m: "Turing", c: "#86C270", title: "Build it, and ask when stuck", x: "When the AI writing the code can't decide, it asks a person, and the answer box is right there.", items: [
      img("turing-sync.png", 1366, 887, "Turing Sync: messages grouped by stage with health dots, and the AI's question answered in place"),
    ] },

    { t: "h2", x: "From a spreadsheet row to a real screen" },
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

    { t: "h2", x: "What if the AI gets it wrong?" },
    { t: "p", x: "It will, sometimes. So every mistake is easy to spot, cheap to fix and never final without a person." },
    { t: "raw", html: '<div class="sg"><div class="sg-stage"><div class="sg-ph"><div class="sg-scr" aria-hidden="true">      <p class="sg-top"><i style="--c:#605BFF">V</i><b>New lead</b><span class="sg-ai">✦ AI filled 6 fields</span></p>      <div class="sg-row"><label>Client name<span>Northwind Pay <em>AI</em></span></label><label>Deal size<span>1.5M <em>AI</em></span></label></div>      <div class="sg-diff"><p><s>Due 30 Apr</s><ins>Due 30 May</ins></p><span><u>Add</u><u class="no">Cancel</u></span></div>      <p class="sg-score"><b>90%</b><span>likely to win</span><em>Why? 3 factors</em></p>      <p class="sg-ask"><span>Which database should we use?</span><b>Needs a human</b></p>      <p class="sg-esc"><span>Payments module</span><b>Escalated</b></p>      <p class="sg-log">10:42 · You edited Deal size · 10:40 · AI filled 6 fields</p>    </div><i class="sg-pin" style="--x:12%;--y:22%">1</i><i class="sg-pin" style="--x:12%;--y:37%">2</i><i class="sg-pin" style="--x:12%;--y:53%">3</i><i class="sg-pin" style="--x:12%;--y:67%">4</i><i class="sg-pin" style="--x:12%;--y:80%">5</i><i class="sg-pin" style="--x:12%;--y:92%">6</i></div><ul class="sg-calls"><li class="sg-c l" style="--y:22%"><b>1</b><div><h4>It fills a field wrong</h4><p>Fields stay editable until submit.</p></div></li><li class="sg-c l" style="--y:50%"><b>2</b><div><h4>It suggests a bad change</h4><p>Add or Cancel. No silent edits.</p></div></li><li class="sg-c l" style="--y:78%"><b>3</b><div><h4>Its score looks arbitrary</h4><p>Reasons and factors are shown.</p></div></li><li class="sg-c r" style="--y:22%"><b>4</b><div><h4>It hits a call it shouldn’t make</h4><p>It asks, then waits for review.</p></div></li><li class="sg-c r" style="--y:50%"><b>5</b><div><h4>The work is too risky</h4><p>Escalated to a person.</p></div></li><li class="sg-c r" style="--y:78%"><b>6</b><div><h4>Who changed what?</h4><p>Every action is logged.</p></div></li></ul></div><p class="sg-cap">One screen, rebuilt in code with made-up example data.</p></div>' },

    { t: "fold", id: "full-process", title: "See the full process", x: "Research, personas, structure, flows and the design system.", blocks: [
      { t: "h3", x: "How I worked" },
      { t: "process", items: [
        ["search", "Understand", "Founders, requirements, competitors"],
        ["map", "Define", "Journey, goals, IA"],
        ["pen", "Design", "Wireframes to final UI"],
        ["layers", "Systemise", "One shell, one system"],
      ] },
      { t: "personas", cap: "Proto-personas from founder sessions and the requirements.", items: [
        { r: "Sales lead", m: "Vortex", c: "#605BFF", goal: "Log leads fast", pain: "Retyping RFPs and notes", ai: "Autofills and scores leads" },
        { r: "Business analyst", m: "Axiom", c: "#B16FF3", goal: "A complete SRS, first time", pain: "Gappy, duplicate drafts", ai: "Maps drafts, flags gaps" },
        { r: "Delivery manager", m: "Cadence", c: "#FB8050", goal: "Plan and track delivery", pain: "Blocked AI work is invisible", ai: "Drafts plans, flags human tasks" },
      ] },
      { t: "h3", x: "What it had to do" },
      { t: "cards", tone: "goal", items: [
        ["flow", "No retyping", "Each step reuses the last."],
        ["eye", "AI you can check", "Visible, editable, signed off."],
        ["bell", "No hidden waiting", "Every wait is seen and counted."],
      ] },
      { t: "switcher", kicker: "The shell", title: "Five apps, plus three shared tools. *One place to switch.*", x: "Each app gets a letter tile and a colour, and the colour follows it through the product. Pick a tile.", apps: [
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

      { t: "h3", x: "Design system" },
      { t: "palette", items: [
        ["#605BFF", "Primary"], ["#3D38E3", "Pressed"], ["#151338", "Ink"], ["#ECEBFF", "Primary tint"], ["#F5F7FA", "App background"],
        ["#B16FF3", "Axiom"], ["#26C0E2", "Prism"], ["#FB8050", "Cadence"], ["#86C270", "Turing"], ["#F15E5E", "Error, high priority"],
      ] },
      { t: "type", family: "Poppins", sample: "AI winning score 90%", rows: [[32, 600, "Page titles"], [20, 400, "Section titles"], [16, 500, "Body and table text"], [14, 500, "Labels and buttons"], [12, 600, "Tags and captions"]] },
      { t: "components" },
    ] },

    { t: "h2", x: "What I delivered and learned" },
    { t: "p", x: "What I handed over, and what I'd do differently next time." },
    { t: "raw", html: '<div class="sw2"><ul class="sw2-did"><li><b>5<small>apps</small></b><span>Structure and key flows</span></li><li><b>Every<small>state</small></b><span>Wireframes to final UI</span></li><li><b>1<small>design system</small></b><span>For every app</span></li><li><b>Shipped<small></small></b><span>Built from my designs</span></li></ul><h3 class="sw2-k">What I learned</h3><ol class="sw2-learn"><li><small>01</small><div><h4>Design the waiting</h4><p>Progress matters as much as the answer.</p></div></li><li><small>02</small><div><h4>Give the AI a face</h4><p>Named agents read as teammates.</p></div></li><li><small>03</small><div><h4>Test with users early</h4><p>Next time, sales and delivery staff before handoff.</p></div></li><li><small>04</small><div><h4>Check colour as text</h4><p>Cyan and green need darker text tones.</p></div></li><li><small>05</small><div><h4>What I’d build next</h4><p>A confidence level per field, linked to the sentence it came from.</p></div></li></ol></div>' },
    { t: "note", x: "Client names and figures in the screens are placeholder data, not real clients or results." },
  ],
};
