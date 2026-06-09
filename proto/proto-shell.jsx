// =====================================================================
// Bloom Prototype — Shell, state, sidebar, layout
// One React app. All routes share state. No design canvas — this is THE product.
// =====================================================================
const { sprT: pT, fontDisplay: pFD, fontBody: pFB, SproutMascot: PM, SprAvatar: PA } = window;

// ─────────────────────────────────────────────────────────────────────
// SEED DATA — single copilot, jobs in various states
// ─────────────────────────────────────────────────────────────────────
const SEED_JOBS = [
// queued (waiting for review)
{ id: "j-linear", co: "Linear", role: "Sr. Product Designer", logo: "L", logoBg: "#5E6AD2", match: 96, comp: "$185–230k", loc: "Remote, US", posted: "4h", status: "queued", urgent: true, why: "Strongest craft match this week — you'd love their bar", oneTap: false, queuedAt: "8m ago" },
{ id: "j-figma", co: "Figma", role: "Staff Product Designer", logo: "F", logoBg: "#0ACF83", match: 91, comp: "$210–260k", loc: "SF / Remote", posted: "6h", status: "queued", urgent: false, why: "I drafted 2 'why us?' options — pick one in 10s", oneTap: false, queuedAt: "22m ago" },
{ id: "j-cashapp", co: "Cash App", role: "Senior Designer · Money", logo: "$", logoBg: "#00D632", match: 88, comp: "$180–220k", loc: "Remote", posted: "1d", status: "queued", urgent: false, why: "A stretch role, but I think they'd hire you", oneTap: false, queuedAt: "1h ago" },
{ id: "j-vercel", co: "Vercel", role: "Sr. Designer · DX", logo: "V", logoBg: "#000", match: 89, comp: "$190–230k", loc: "Remote", posted: "1d", status: "queued", urgent: false, why: "All 10 answers ready — just 1 tap", oneTap: true, queuedAt: "2h ago" },

// submitted — recently sent, no reply yet
{ id: "j-notion", co: "Notion", role: "Product Designer · AI", logo: "N", logoBg: "#000", match: 87, comp: "$170–210k", loc: "Remote", posted: "4d", status: "applied", appliedAt: "2 days ago", replyStatus: "viewed", replyText: "Your app was viewed by 2 people", favorited: true },
{ id: "j-airbnb", co: "Airbnb", role: "Senior Designer · Trips", logo: "A", logoBg: "#FF5A5F", match: 85, comp: "$185–225k", loc: "SF / Remote", posted: "5d", status: "applied", appliedAt: "3 days ago", replyStatus: "pending", replyText: "Awaiting response" },

// auto-applied
{ id: "j-coinbase", co: "Coinbase", role: "Sr. Product Designer", logo: "C", logoBg: "#0052FF", match: 80, comp: "$180–210k", loc: "Remote", posted: "6h", status: "auto-applied", appliedAt: "this morning", replyStatus: "pending", replyText: "Just submitted" },
{ id: "j-attentive", co: "Attentive", role: "Sr. Designer · Growth", logo: "A", logoBg: "#FF5C28", match: 78, comp: "$170–200k", loc: "Remote", posted: "8h", status: "auto-applied", appliedAt: "this morning", replyStatus: "viewed", replyText: "Hiring manager opened it" },

// applied — additional submitted-and-waiting jobs
{ id: "j-shopify", co: "Shopify", role: "Sr. Product Designer · Checkout", logo: "S", logoBg: "#96BF48", match: 84, comp: "$185–225k", loc: "Remote", posted: "5d", status: "applied", appliedAt: "4 days ago", replyStatus: "pending", replyText: "Awaiting response", favorited: true },
{ id: "j-discord", co: "Discord", role: "Sr. Designer · Social", logo: "D", logoBg: "#5865F2", match: 86, comp: "$180–215k", loc: "SF / Remote", posted: "7d", status: "applied", appliedAt: "6 days ago", replyStatus: "viewed", replyText: "Recruiter viewed twice" },

// replied — recruiter reached out
{ id: "j-stripe", co: "Stripe", role: "Sr. Product Designer · Dash", logo: "S", logoBg: "#635BFF", match: 94, comp: "$195–240k", loc: "Remote", posted: "6d", status: "applied", appliedAt: "6 days ago", replyStatus: "reply", replyText: "Phone screen requested · Tue 2pm", recruiter: "Jordan Park", repliedAt: "yesterday", favorited: true },
{ id: "j-ramp", co: "Ramp", role: "Sr. Designer · Spend", logo: "R", logoBg: "#FFCC00", match: 82, comp: "$180–220k", loc: "NYC", posted: "8d", status: "applied", appliedAt: "7 days ago", replyStatus: "reply", replyText: "Take-home invited · 7-day window", recruiter: "Mira Shah", repliedAt: "2 days ago" },
{ id: "j-amplitude", co: "Amplitude", role: "Sr. Designer · Data", logo: "A", logoBg: "#1E61F0", match: 81, comp: "$175–215k", loc: "Remote", posted: "9d", status: "applied", appliedAt: "8 days ago", replyStatus: "reply", replyText: "Recruiter wants 30 min next week", recruiter: "Devon Liu", repliedAt: "3 days ago" },

// interviewing
{ id: "j-figma-int", co: "Figma", role: "Senior PD · Editor", logo: "F", logoBg: "#0ACF83", match: 91, comp: "$210–260k", loc: "SF / Remote", posted: "14d", status: "applied", appliedAt: "2 weeks ago", replyStatus: "interviewing", replyText: "Phone screen · Thu 2pm", stage: "Phone screen", stageDate: "Thu 2pm", recruiter: "Alex Chen · Figma" },
{ id: "j-airtable", co: "Airtable", role: "Senior PD", logo: "A", logoBg: "#FCB400", match: 88, comp: "$190–230k", loc: "Remote", posted: "21d", status: "applied", appliedAt: "3 weeks ago", replyStatus: "interviewing", replyText: "Final loop · next Monday", stage: "Final round", stageDate: "Mon, 5 interviews", recruiter: "Sam Liu · Airtable" },

// offer
{ id: "j-superhuman", co: "Superhuman", role: "Senior PD · Mobile", logo: "S", logoBg: "#FF6B6B", match: 90, comp: "$220k base", loc: "Remote", posted: "30d", status: "applied", appliedAt: "a month ago", replyStatus: "offer", replyText: "Offer received · decide by Fri", offerAmount: "$220k base + 0.18% equity", deadline: "Decide by Friday" }];


// 10 questions for the Linear review — used by the review flow
const LINEAR_QUESTIONS = [
{ id: "cover", kind: "cover", q: "Cover letter lead",
  sproutNote: "I went with your Linear-knockoff side project at Headspace as the hook — it's your strongest play here.",
  draft: "Hey Linear team — I've been a power-user since 2022 and built a {{Linear-inspired triage tool at Headspace}} that cut PM grooming time in half. I'd love to push the craft bar even higher with your team…",
  actions: ["👍 Looks good", "🪶 Make it shorter", "😎 Make it warmer", "🎯 More specific", "✨ Try a different angle"] },
{ id: "project", kind: "choice", q: "Walk us through a recent project you led",
  sproutNote: "I have three strong options. Pick one and I'll write the answer.",
  needsYou: true,
  options: [
  { label: "📱 Headspace nav overhaul (most relevant)", recommended: true },
  { label: "💬 Airbnb messaging redesign" },
  { label: "🚀 Linear-knockoff side project" }]
},
{ id: "whylinear", kind: "ab", q: "Why Linear?",
  sproutNote: "I drafted two angles — pick the one that feels more you.",
  options: [
  { tag: "A · CRAFT-FORWARD", text: "The level of craft Linear ships is rare. I want to learn from a team that obsesses over micro-interactions and still ships fast.", recommended: true },
  { tag: "B · STORY-DRIVEN", text: "I built a Linear knockoff at Headspace because I couldn't find anything as fast. I want to work on the real one." }]
},
// Pre-filled from résumé or profile — user taps to confirm or correct
{ id: "experience", kind: "confirm", q: "Years of product design experience",
  sproutNote: "Pulled from your résumé. Tap to confirm — or set a different number.",
  prefilled: "6 years",
  source: "résumé",
  options: [
  { label: "✓ Yes — 6 years" },
  { label: "Actually 5" },
  { label: "Actually 7+" },
  { label: "Set exact months…" }]
},
{ id: "salary", kind: "confirm", q: "Expected salary",
  sproutNote: "Your floor is $180k. For Linear's band I'd quote $185–230k. Approve or adjust.",
  prefilled: "$185–230k",
  source: "your prefs + this role's posted band",
  options: [
  { label: "✓ Use $185–230k" },
  { label: "Aim higher · $200–250k" },
  { label: "Negotiable / open to discuss" },
  { label: "Set a custom range…" }]
},
{ id: "notice", kind: "confirm", q: "Notice period at current role",
  sproutNote: "You said 4 weeks during onboarding.",
  prefilled: "4 weeks",
  source: "profile",
  options: [
  { label: "✓ 4 weeks" },
  { label: "2 weeks" },
  { label: "6+ weeks" },
  { label: "Available immediately" }]
},
{ id: "auth", kind: "confirm", q: "Are you legally authorized to work in the United States?",
  sproutNote: "Saved from your profile. Confirm — most ATS forms ask this exact question.",
  prefilled: "Yes — US citizen",
  source: "profile",
  options: [
  { label: "✓ Yes — US citizen" },
  { label: "Yes — green card / permanent resident" },
  { label: "Yes — work visa (no sponsorship needed)" },
  { label: "No — I need sponsorship" }]
},
// JIT — Sprout never asked this during onboarding, asks now and saves for future
{ id: "visa", kind: "jit", q: "Will you now or in the future require sponsorship?",
  sproutNote: "I never asked this upfront. Tap once — I'll save it for every future app.",
  field: "Visa sponsorship",
  options: [
  { label: "❌ No — never need sponsorship", recommended: true },
  { label: "⚠ Yes — eventually (H1B transfer, etc.)" },
  { label: "✅ Yes — need it now" }]
},
// ESSAY — Linear's custom prompt. Sprout offers a starting frame, but you write the soul.
{ id: "essay", kind: "essay", q: "Linear's custom question — Tell us about a time you shipped something you're proud of (250 words)",
  sproutNote: "This one's just for Linear — I can't fake it well. Give me a few lines and I'll shape it into 250 words in your voice. Or tap a starter.",
  placeholder: "Headspace nav overhaul — 6mo project, 23% lift in onboarding completion. Was scary because…",
  starters: [
  "Use Headspace nav overhaul (23% onboarding lift)",
  "Use the Linear-clone side project",
  "Use your Notion-templates story",
  "Skip the starter — I'll write fresh"]
}];


// ─────────────────────────────────────────────────────────────────────
// STORE — single source of truth via useReducer
// ─────────────────────────────────────────────────────────────────────
const Store = React.createContext(null);
const useStore = () => React.useContext(Store);

function storeReducer(s, a) {
  switch (a.type) {
    case "GO":return { ...s, route: a.route, params: a.params || {} };
    case "SET_PLAN":return { ...s, plan: a.plan, route: "settings", params: { section: "plan", planChanged: a.plan } };
    case "LOGOUT":return { ...s, route: "login" };
    case "LOGIN":return { ...s, route: "home" };
    case "REPLAY_ONB":return { ...s, route: "onboarding", onboarded: false };
    case "SET_MODE":return { ...s, mode: a.mode };
    case "OPEN_REVIEW":return { ...s, route: "review", params: { jobId: a.jobId } };
    case "OPEN_SUBMITTED":return { ...s, route: "submitted", params: { jobId: a.jobId } };
    case "OPEN_DETAIL":return { ...s, params: { ...s.params, detailJobId: a.jobId } };
    case "CLOSE_DETAIL":return { ...s, params: { ...s.params, detailJobId: null } };
    case "APPROVE_JOB":{
        const jobs = s.jobs.map((j) => j.id === a.jobId ? { ...j, status: "applied", appliedAt: "just now", replyStatus: "pending", replyText: "Just submitted" } : j);
        return { ...s, jobs, route: "home", params: { celebrate: a.jobId } };
      }
    case "SKIP_JOB":{
        const jobs = s.jobs.filter((j) => j.id !== a.jobId);
        return { ...s, jobs, route: a.next || "applications" };
      }
    case "TOGGLE_FAV":{
        const jobs = s.jobs.map((j) => j.id === a.jobId ? { ...j, favorited: !j.favorited } : j);
        return { ...s, jobs };
      }
    case "SET_RELEVANCE":{
        // a.value: "up" | "down" — toggles off if tapped again
        let toast = null;
        const jobs = s.jobs.map((j) => {
          if (j.id !== a.jobId) return j;
          const next = j.relevance === a.value ? null : a.value;
          if (next === "down") toast = `Got it — Sprout won't auto-apply to roles like ${j.co}. This trains your matches.`;
          else if (next === "up") toast = `Noted — I'll surface more roles like ${j.co}. 👍`;
          else toast = "Feedback cleared.";
          return { ...j, relevance: next };
        });
        return { ...s, jobs, params: { ...s.params, relToast: toast, relToastAt: Date.now() } };
      }
    case "CLEAR_REL_TOAST":return { ...s, params: { ...s.params, relToast: null } };
    case "DELETE_JOB":{
        const jobs = s.jobs.filter((j) => j.id !== a.jobId);
        return { ...s, jobs };
      }
    case "MOVE_STAGE":{
        // a.stage is one of: queued | applied | replied | interviewing | offer | selected | rejected
        const stamp = "just now";
        const jobs = s.jobs.map((j) => {
          if (j.id !== a.jobId) return j;
          const next = { ...j };
          const log = (txt) => {next.history = [{ at: stamp, txt }, ...(j.history || [])];};
          if (a.stage === "queued") {next.status = "queued";next.replyStatus = undefined;next.outcome = undefined;log("Moved back to Review");} else
          if (a.stage === "applied") {next.status = "applied";next.replyStatus = "pending";next.replyText = "Awaiting response";next.appliedAt = next.appliedAt || stamp;next.outcome = undefined;log("Moved to Applied");} else
          if (a.stage === "replied") {next.status = "applied";next.replyStatus = "reply";next.replyText = next.replyText || "Recruiter wrote back";next.outcome = undefined;log("Recruiter replied");} else
          if (a.stage === "interviewing") {next.status = "applied";next.replyStatus = "interviewing";next.outcome = undefined;log("Moved to Interviewing");} else
          if (a.stage === "offer") {next.status = "applied";next.replyStatus = "offer";next.outcome = undefined;log("Offer received 🎉");} else
          if (a.stage === "selected") {next.status = "applied";next.replyStatus = "offer";next.outcome = "selected";log("Marked as Selected ✅");} else
          if (a.stage === "rejected") {next.status = "applied";next.outcome = "rejected";log("Marked as Not selected");}
          return next;
        });
        return { ...s, jobs };
      }
    case "CELEBRATED":return { ...s, params: { ...s.params, celebrate: null } };
    case "BATCH_APPLY_START":return { ...s, params: { ...s.params, batchApply: "running" } };
    case "BATCH_APPLY_DONE":{
        // Mark every queued job as applied in one sweep
        const jobs = s.jobs.map((j) => j.status === "queued" ?
        { ...j, status: "applied", appliedAt: "just now", replyStatus: "pending", replyText: "Just submitted" } :
        j);
        return { ...s, jobs, params: { ...s.params, batchApply: "done" } };
      }
    case "BATCH_APPLY_CLOSE":return { ...s, params: { ...s.params, batchApply: null }, route: "applications" };
    case "FINISH_ONB":return { ...s, onboarded: true, mode: a.mode || "review", route: "home" };
    default:return s;
  }
}

const initial = {
  route: "login", // always start at login
  params: {},
  mode: "review", // 'review' | 'auto'
  plan: "pro", // 'free' | 'pro' | 'launch'
  jobs: SEED_JOBS,
  onboarded: true,
  user: { firstName: "Vinodh", initials: "VK" }
};

function StoreProvider({ children }) {
  const [s, dispatch] = React.useReducer(storeReducer, initial);
  return <Store.Provider value={{ s, d: dispatch }}>{children}</Store.Provider>;
}

// ─────────────────────────────────────────────────────────────────────
// DESKTOP FRAME — minimal browser chrome wrapper
// ─────────────────────────────────────────────────────────────────────
function PFrame({ children, url = "bloom.app" }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      overflow: "hidden", background: pT.cream,
      display: "flex", flexDirection: "column", fontFamily: pFB, color: pT.ink
    }}>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>{children}</div>
    </div>);

}

// ─────────────────────────────────────────────────────────────────────
// APP SHELL — sidebar + main area + persistent top bar with mode toggle
// ─────────────────────────────────────────────────────────────────────
function PShell({ children }) {
  const { s, d } = useStore();
  const queuedCount = s.jobs.filter((j) => j.status === "queued").length;
  const nav = [
  { id: "home", icon: "◐", label: "Home", badge: queuedCount || null },
  { id: "applications", icon: "✓", label: "Applications", count: s.jobs.filter((j) => j.status === "applied" || j.status === "auto-applied").length },
  { id: "copilot", icon: "✦", label: "Copilot" }];


  return (
    <div style={{ flex: 1, display: "flex", minHeight: 0, background: pT.cream }}>
      {/* Sidebar */}
      <div style={{
        width: 224, flexShrink: 0, background: pT.creamSoft, borderRight: `1px solid ${pT.hairline}`,
        display: "flex", flexDirection: "column", padding: "18px 14px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, padding: "4px 6px", cursor: "pointer" }} onClick={() => d({ type: "GO", route: "home" })}>
          <img src="assets/bloom-logo.svg" alt="bloom" style={{ height: 26, width: "auto", display: "block" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map((it) => {
            const active = s.route === it.id ||
            it.id === "applications" && (s.route === "submitted" || s.route === "jobs") ||
            it.id === "home" && s.route === "review";
            return (
              <div key={it.id} onClick={() => d({ type: "GO", route: it.id })} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12,
                background: active ? pT.ink : "transparent",
                color: active ? "#fff" : pT.inkSoft,
                fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>
                <span style={{ fontSize: 15, width: 16, textAlign: "center", opacity: active ? 1 : 0.7, fontFamily: "system-ui" }}>{it.icon}</span>
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.badge && <span style={{ background: active ? pT.cyan : pT.flame, color: active ? pT.ink : "#fff", fontSize: 10.5, fontWeight: 800, padding: "2px 7px", borderRadius: 999, minWidth: 18, textAlign: "center" }}>{it.badge}</span>}
                {it.count != null && !it.badge && <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.5 }}>{it.count}</span>}
              </div>);

          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* Sprout status card — clickable: shows current mode, quick-flips on click */}
        <div style={{ background: pT.ink, color: "#fff", borderRadius: 16, padding: 12, marginTop: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 90, height: 90, borderRadius: "50%", background: pT.cyan, opacity: 0.2, filter: "blur(12px)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", marginBottom: 8 }}>
            <img src="assets/bloom-favicon.svg" alt="Sprout" style={{ width: 32, height: "auto", display: "block", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: pT.cyan, letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.mode === "auto" ? "#7CF7B9" : pT.cyan, animation: s.mode === "auto" ? "sprPulse 1.4s infinite" : "none" }} />
                {s.mode === "auto" ? "LIVE · FULL AUTO" : "SPROUT"}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>{s.mode === "auto" ? "applying for you" : "drafting · awaits you"}</div>
            </div>
            <span onClick={() => d({ type: "GO", route: "copilot" })} title="Configure Sprout" style={{ fontSize: 14, opacity: 0.5, cursor: "pointer" }}>⚙</span>
          </div>
          {/* Tiny mode toggle */}
          <div style={{ position: "relative", display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 99, padding: 2, gap: 2 }}>
            <button onClick={() => d({ type: "SET_MODE", mode: "review" })} style={{
              flex: 1, padding: "5px 6px", borderRadius: 99, fontSize: 10.5, fontWeight: 800, cursor: "pointer", border: "none", letterSpacing: "-0.005em",
              background: s.mode === "review" ? "#fff" : "transparent",
              color: s.mode === "review" ? pT.ink : "rgba(255,255,255,0.7)"
            }}>✋ Review</button>
            <button onClick={() => d({ type: "SET_MODE", mode: "auto" })} style={{
              flex: 1, padding: "5px 6px", borderRadius: 99, fontSize: 10.5, fontWeight: 800, cursor: "pointer", border: "none", letterSpacing: "-0.005em",
              background: s.mode === "auto" ? "#fff" : "transparent",
              color: s.mode === "auto" ? pT.ink : "rgba(255,255,255,0.7)"
            }}>🚀 Auto</button>
          </div>
        </div>

        <div onClick={() => d({ type: "GO", route: "settings", params: { section: "account" } })} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 6px 0", color: pT.muted, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: pT.lilac, color: pT.lilacInk, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 11, border: `1px solid ${pT.hairline}` }}>{s.user.initials}</div>
          <div style={{ flex: 1, color: pT.ink, fontSize: 13 }}>{s.user.firstName}</div>
          <span title="Settings" style={{ fontSize: 14, opacity: 0.5 }}>⚙</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {children}
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────────────────
// MODE TOGGLE — used in top bars and copilot settings
// ─────────────────────────────────────────────────────────────────────
function ModeToggle({ size = "md" }) {
  const { s, d } = useStore();
  const isAuto = s.mode === "auto";
  const padY = size === "sm" ? 5 : 7;
  return (
    <div style={{
      display: "inline-flex", background: "#fff", border: `1px solid ${pT.hairline}`,
      borderRadius: 999, padding: 3, gap: 2, position: "relative"
    }}>
      <button onClick={() => d({ type: "SET_MODE", mode: "review" })} style={{
        padding: `${padY}px 14px`, borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer", border: "none",
        background: !isAuto ? pT.ink : "transparent", color: !isAuto ? "#fff" : pT.muted,
        display: "inline-flex", alignItems: "center", gap: 6
      }}><span>✋</span> Review before send</button>
      <button onClick={() => d({ type: "SET_MODE", mode: "auto" })} style={{
        padding: `${padY}px 14px`, borderRadius: 999, fontSize: 12.5, fontWeight: 700, cursor: "pointer", border: "none",
        background: isAuto ? pT.ink : "transparent", color: isAuto ? "#fff" : pT.muted,
        display: "inline-flex", alignItems: "center", gap: 6
      }}><span>🚀</span> Auto Apply</button>
    </div>);

}

// ─────────────────────────────────────────────────────────────────────
// Top header used by Home / Jobs / Applications / Copilot pages
// Mode toggle is NOT here anymore — it's contextual to Home + Copilot only.
// ─────────────────────────────────────────────────────────────────────
function PageHeader({ title, sub, right }) {
  return (
    <div style={{
      padding: "20px 32px 16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      gap: 14, flexShrink: 0
    }}>
      <div>
        <div style={{ fontFamily: pFD, fontWeight: 700, fontSize: 30, color: pT.ink, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{title}</div>
        {sub && <div style={{ fontSize: 13.5, color: pT.muted, fontWeight: 600, marginTop: 4 }}>{sub}</div>}
      </div>
      {right && <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{right}</div>}
    </div>);

}

Object.assign(window, {
  pT, pFD, pFB, PM, PA,
  Store, useStore, StoreProvider, storeReducer, initial,
  PFrame, PShell, ModeToggle, PageHeader,
  SEED_JOBS, LINEAR_QUESTIONS
});