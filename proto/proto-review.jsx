// =====================================================================
// Bloom Prototype — Conversational Review (the core interaction)
// Pill-driven. Each answer resolves to "approved" via tap. No text fields
// unless the user explicitly asks for one. Submitted mode = same UI in
// "edit your past answers via chat" mode.
// =====================================================================
const {
  pT: rT, pFD: rFD, pFB: rFB, PM: RM, PA: RA,
  useStore: rUseStore, SprChip: RSC, SprBubble: RSBu, LINEAR_QUESTIONS,
} = window;

// ─────────────────────────────────────────────────────────────────────
// JOB DESCRIPTION — structured content derived from the job record.
// Lets the user confirm they're applying to the right role, right here.
// ─────────────────────────────────────────────────────────────────────
function jobJD(job) {
  const senior = job.match >= 90;
  const remote = (job.loc || "").toLowerCase().includes("remote");
  return {
    overview:
      `${job.co} is hiring a ${job.role} to ${senior ? "lead" : "help shape"} product direction across their core surface. ` +
      `You'll own design end-to-end — research through ship — partnering closely with PM and engineering on a small, high-trust team. ` +
      (remote ? "This role is fully remote within the US." : `Based in ${job.loc}, hybrid.`),
    responsibilities: [
      "Own the full design lifecycle for your area — discovery, prototyping, hi-fi, and shipped UI.",
      "Partner daily with PM and engineering to scope, sequence, and ship in tight loops.",
      "Raise the craft bar: interaction detail, motion, and a coherent component system.",
      "Run lightweight research and turn insight into clear product decisions.",
      senior ? "Mentor designers and help define how the team works." : "Contribute to design-system and process improvements.",
    ],
    requirements: [
      `${senior ? "6+" : "4+"} years designing complex, production software (B2B or consumer SaaS).`,
      "A portfolio showing shipped work and the thinking behind it.",
      "Fluency in Figma and modern prototyping; comfort working close to code.",
      "Strong systems thinking — you design for scale, not one-off screens.",
    ],
    niceToHaves: [
      "Experience in a design-led, fast-shipping startup environment.",
      "Familiarity with the tools/space " + job.co + " operates in.",
    ],
    matchReasons: [
      { label: `${job.match}% overall fit`, detail: "Top of your search feed this week.", score: job.match },
      { label: "Tools & craft overlap", detail: "Figma + your design-systems work map directly to the ask.", score: 92 },
      { label: "Comp clears your floor", detail: `Posted band ${job.comp} is above your $180k minimum.`, score: 88 },
      { label: "Location fits", detail: remote ? "Fully remote — matches your preference." : `${job.loc} — within your set range.`, score: remote ? 96 : 74 },
    ],
    gaps: senior ? [] : ["Role leans slightly junior to your target seniority — Sprout flagged it as still worth a shot."],
    timeline: (() => {
      const base = [
        { ic:"🌱", txt:"Saved to your queue", sub:`Posted ${job.posted || "recently"} by ${job.co}`, color: rT.muted },
        { ic:"🎯", txt:`Matched ${job.match}% to your profile`, sub:"Found in your search feed", color: rT.cyanInk },
        { ic:"✏️", txt:"Sprout drafted your answers", sub:`10 questions auto-filled from your profile`, color: rT.ink },
      ];
      const sent = job.status && job.status !== "queued";
      const events = [...base];
      if (sent) {
        events.push({ ic:"📨", txt:`Application sent to ${job.co}`, sub: job.appliedAt ? `${job.appliedAt}` : "Submitted", color: rT.ink });
        if (job.replyStatus || job.replyText) events.push({ ic:"💬", txt:"Recruiter replied", sub: job.recruiter ? `via ${job.recruiter}` : "Awaiting your response", color: rT.lilacInk });
      }
      // newest last → mark the final event as "now"
      events[events.length - 1].now = true;
      return events.reverse();
    })(),
  };
}

// Deterministic per-job sub-scores for the match breakdown
function matchDims(job) {
  const h = [...(job.id || job.co)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const clamp = (n) => Math.max(20, Math.min(100, Math.round(n)));
  const exp    = clamp(job.match + 6 + (h % 7));            // seniority fit — usually strong
  const domain = clamp(job.match - 3 + (h % 13));           // industry/domain overlap
  const skill  = clamp(job.match - 16 + (h % 22) - 6);      // required-skill overlap — the variable one
  return { overall: job.match, exp, skill, domain };
}

// A single progress ring (SVG). Two-tone arc on a faint track.
function MatchRing({ pct, size, stroke, color, track, children }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - pct / 100);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
                style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.22,1,.36,1)" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

// The full match-criteria card — overall ring + status + 3 dimensions + guidance.
function MatchScoreCard({ job }) {
  const { overall, exp, skill, domain } = matchDims(job);
  const dims = [
    { k: "Exp. Level", v: exp,    hint: "Seniority & years vs. the role's ask" },
    { k: "Skill",      v: skill,  hint: "Overlap with required skills" },
    { k: "Domain",     v: domain, hint: "Industry & problem-space fit" },
  ];
  const weakest = dims.reduce((a, b) => b.v < a.v ? b : a);
  const gap = weakest.v < 55;
  const label = overall >= 90 ? "Strong match" : overall >= 78 ? "Good match" : overall >= 65 ? "Fair match" : "Stretch role";
  const aligned = exp >= 70 && domain >= 70;

  const cyan = "#5AEBEB", track = "rgba(255,255,255,0.13)";
  const ringColor = (v) => v < 55 ? "#FFC34D" : v < 75 ? cyan : cyan;

  return (
    <div style={{ background: rT.inkBg, borderRadius: 18, padding: "20px 20px 0", color: "#fff", overflow: "hidden" }}>
      {/* Status badge */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 999,
          fontSize: 11, fontWeight: 800, letterSpacing: "0.06em",
          background: gap ? "rgba(255,195,77,0.16)" : "rgba(90,235,235,0.16)",
          color: gap ? "#FFC34D" : cyan,
          border: `1px solid ${gap ? "rgba(255,195,77,0.4)" : "rgba(90,235,235,0.4)"}`,
        }}>{gap ? `${weakest.k.toUpperCase()} GAP` : "WELL ALIGNED"}</span>
      </div>

      {/* Overall ring */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <MatchRing pct={overall} size={124} stroke={8} color={cyan} track={track}>
          <div style={{ fontFamily: rFD, fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1 }}>{overall}%</div>
        </MatchRing>
      </div>
      <div style={{ textAlign: "center", fontFamily: rFD, fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em" }}>{label}</div>
      <div style={{ textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: 5, lineHeight: 1.45, maxWidth: 250, marginLeft: "auto", marginRight: "auto" }}>
        {gap ? `Overall score is held back by the ${weakest.k.toLowerCase()} fit for this role.` : "Your profile lines up well across the dimensions that matter for this role."}
      </div>

      {/* Three dimension rings */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginTop: 22, justifyItems: "center" }}>
        {dims.map((dm) => (
          <div key={dm.k} title={dm.hint} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
            <MatchRing pct={dm.v} size={66} stroke={5} color={ringColor(dm.v)} track={track}>
              <div style={{ fontFamily: rFD, fontWeight: 800, fontSize: 15, lineHeight: 1 }}>{dm.v}%</div>
            </MatchRing>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(255,255,255,0.82)", textAlign: "center", whiteSpace: "nowrap" }}>{dm.k}</div>
          </div>
        ))}
      </div>

      {/* Guidance */}
      <div style={{ fontStyle: "italic", fontSize: 12.5, color: "rgba(255,255,255,0.6)", fontWeight: 500, textAlign: "center", lineHeight: 1.5, margin: "18px 6px 0" }}>
        {gap
          ? "Focus on roles where your core skills overlap more strongly — or let Sprout tailor your pitch to bridge the gap."
          : "A confident fit. Sprout will lead your application with these strengths."}
      </div>

      {/* Footer — career alignment */}
      <div style={{ marginTop: 16, marginLeft: -20, marginRight: -20, padding: "13px 20px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
        <span style={{ width: 18, height: 18, borderRadius: "50%", background: aligned ? cyan : "rgba(255,255,255,0.25)", color: rT.inkBg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </span>
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>Career Alignment{aligned ? "" : " · review fit"}</span>
      </div>
    </div>
  );
}

// Relevance feedback — informed thumbs up/down with full JD + match context.
function RelevanceFeedback({ job, variant = "panel" }) {
  const { d } = rUseStore();
  const rel = job.relevance;
  const Btn = ({ value, label, icon, color }) => {
    const active = rel === value;
    return (
      <button onClick={() => d({ type: "SET_RELEVANCE", jobId: job.id, value })} style={{
        flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        padding: "10px 12px", borderRadius: 11, cursor: "pointer", fontFamily: rFB,
        fontSize: 13, fontWeight: 700,
        background: active ? color : "#fff",
        color: active ? "#fff" : rT.ink,
        border: `1.5px solid ${active ? color : rT.hairline}`,
        transition: "all 0.14s",
      }}>{icon} {label}</button>
    );
  };
  return (
    <div>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap: 8, marginBottom: 9 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: rT.ink }}>Is this a good match for you?</div>
        <div style={{ fontSize: 10.5, color: rT.muted, fontWeight: 600 }}>trains Sprout</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Btn value="up" label="Good match" icon={<RFThumb up filled={rel === "up"}/>} color={rT.mintInk}/>
        <Btn value="down" label="Not relevant" icon={<RFThumb filled={rel === "down"}/>} color={rT.flame}/>
      </div>
      {rel === "down" && <div style={{ marginTop: 10, fontSize: 12, color: rT.blushInk, fontWeight: 600 }}>✓ Sprout won't auto-apply to roles like {job.co} anymore.</div>}
      {rel === "up" && <div style={{ marginTop: 10, fontSize: 12, color: rT.mintInk, fontWeight: 600 }}>✓ Sprout will prioritize more roles like this.</div>}
    </div>
  );
}
function RFThumb({ up, filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: up ? "none" : "rotate(180deg)" }}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  );
}

// Left panel on the review screen — tabbed Job Description viewer
function JDPanel({ job, showFeedback = true }) {
  const [tab, setTab] = React.useState("overview");
  const jd = jobJD(job);
  const TABS = [["overview","Overview"],["description","Description"],["match","Match"],["timeline","Timeline"]];

  const SectionLabel = ({ children }) => (
    <div style={{fontSize: 10.5, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 9}}>{children}</div>
  );
  const Bullets = ({ items, mark="•", markColor }) => (
    <div style={{display:"flex", flexDirection:"column", gap: 9}}>
      {items.map((t, i) => (
        <div key={i} style={{display:"flex", gap: 9, fontSize: 13, color: rT.ink, fontWeight: 500, lineHeight: 1.5}}>
          <span style={{color: markColor || rT.cyanInk, flexShrink: 0, fontWeight: 800}}>{mark}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{width: 384, flexShrink: 0, background:"#fff", borderRight:`1px solid ${rT.hairline}`, display:"flex", flexDirection:"column", minHeight: 0}}>
      {/* Always-visible role header */}
      <div style={{padding:"22px 24px 16px", borderBottom:`1px solid ${rT.hairline}`}}>
        <div style={{fontSize: 10.5, color: rT.muted, fontWeight: 700, marginBottom: 8, display:"inline-flex", alignItems:"center", gap: 6}}>
          🌱 Drafted by Sprout · matched to your <b style={{color: rT.cyanInk}}>{job.role}</b> search
        </div>
        <div style={{fontFamily: rFD, fontWeight: 700, fontSize: 22, color: rT.ink, letterSpacing:"-0.02em", lineHeight: 1.12}}>{job.role}</div>
        <div style={{fontSize: 13, color: rT.muted, fontWeight: 600, marginTop: 4}}>{job.co} · {job.loc}</div>
        <div style={{display:"flex", gap: 7, marginTop: 12, flexWrap:"wrap"}}>
          <span style={{padding:"4px 10px", borderRadius: 999, background: rT.cyan, color: rT.ink, fontSize: 11.5, fontWeight: 800}}>{job.match}% match</span>
          <span style={{padding:"4px 10px", borderRadius: 999, background: rT.cream, color: rT.ink, fontSize: 11.5, fontWeight: 700}}>{job.comp}</span>
          <span style={{padding:"4px 10px", borderRadius: 999, background: rT.cream, color: rT.ink, fontSize: 11.5, fontWeight: 700}}>Posted {job.posted}</span>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{display:"flex", gap: 2, padding:"8px 14px 0", borderBottom:`1px solid ${rT.hairline}`, flexShrink: 0}}>
        {TABS.map(([id,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            padding:"9px 12px", border:"none", cursor:"pointer", background:"transparent",
            fontSize: 13, fontWeight: 700, fontFamily: rFB,
            color: tab === id ? rT.ink : rT.muted,
            borderBottom: tab === id ? `2px solid ${rT.ink}` : "2px solid transparent",
          }}>{label}</button>
        ))}
      </div>

      {/* Tab body */}
      <div style={{flex: 1, overflow:"auto", padding:"20px 24px 28px"}}>
        {tab === "overview" && (
          <div style={{display:"flex", flexDirection:"column", gap: 20}}>
            <div>
              <SectionLabel>About the role</SectionLabel>
              <div style={{fontSize: 13.5, color: rT.ink, fontWeight: 500, lineHeight: 1.6}}>{jd.overview}</div>
            </div>
            <div>
              <SectionLabel>At a glance</SectionLabel>
              <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                {[["🏢","Company", job.co],["💼","Type","Full-time"],["📍","Location", job.loc],["💰","Comp band", job.comp],["🎯","Match", job.match + "% fit"]].map(([ic,k,v]) => (
                  <div key={k} style={{display:"flex", alignItems:"center", gap: 10, fontSize: 13}}>
                    <span style={{width: 16, textAlign:"center", flexShrink: 0}}>{ic}</span>
                    <span style={{color: rT.muted, fontWeight: 600, width: 88, flexShrink: 0}}>{k}</span>
                    <span style={{fontWeight: 700, color: rT.ink}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={()=>setTab("description")} style={{alignSelf:"flex-start", fontSize: 12.5, color: rT.cyanInk, fontWeight: 700, cursor:"pointer", background:"none", border:"none", padding: 0}}>Read full description →</button>
          </div>
        )}

        {tab === "description" && (
          <div style={{display:"flex", flexDirection:"column", gap: 20}}>
            <div>
              <SectionLabel>About the role</SectionLabel>
              <div style={{fontSize: 13.5, color: rT.ink, fontWeight: 500, lineHeight: 1.6}}>{jd.overview}</div>
            </div>
            <div><SectionLabel>What you'll do</SectionLabel><Bullets items={jd.responsibilities}/></div>
            <div><SectionLabel>What we're looking for</SectionLabel><Bullets items={jd.requirements} mark="✓" markColor={rT.mintInk}/></div>
            <div><SectionLabel>Nice to have</SectionLabel><Bullets items={jd.niceToHaves} mark="+" markColor={rT.muted}/></div>
          </div>
        )}

        {tab === "match" && (
          <div style={{display:"flex", flexDirection:"column", gap: 18}}>
            <MatchScoreCard job={job}/>
          </div>
        )}

        {tab === "timeline" && (
          <div>
            <SectionLabel>Application timeline</SectionLabel>
            {jd.timeline.map((e, i) => (
              <div key={i} style={{display:"flex", gap: 12}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <div style={{width: 28, height: 28, borderRadius:"50%", background: e.now ? rT.ink : rT.cream, color: e.now ? "#fff" : rT.ink, display:"grid", placeItems:"center", fontSize: 13, flexShrink: 0, border: e.now ? "none" : `1px solid ${rT.hairline}`}}>{e.ic}</div>
                  {i < jd.timeline.length - 1 && <div style={{width: 2, flex: 1, minHeight: 18, background: rT.hairline}}/>}
                </div>
                <div style={{paddingBottom: 18, flex: 1}}>
                  <div style={{fontSize: 13.5, fontWeight: 700, color: e.color || rT.ink, lineHeight: 1.3}}>{e.txt}</div>
                  {e.sub && <div style={{fontSize: 12, color: rT.muted, fontWeight: 600, marginTop: 2, lineHeight: 1.4}}>{e.sub}</div>}
                </div>
              </div>
            ))}
            <div style={{marginTop: 4, fontSize: 12, color: rT.muted, fontWeight: 500, lineHeight: 1.5, background: rT.cream, borderRadius: 10, padding:"11px 13px"}}>
              {job.status && job.status !== "queued"
                ? "Sprout is tracking this application — you'll see recruiter replies, interviews, and offers appear here."
                : "After you approve, Sprout sends the application and tracks every recruiter reply, interview, and offer right here."}
            </div>
          </div>
        )}
      </div>

      {/* Persistent relevance feedback — always visible, not buried in a tab */}
      {showFeedback && (
        <div style={{borderTop:`1px solid ${rT.hairline}`, padding:"14px 20px 16px", background: rT.creamSoft, flexShrink: 0}}>
          <RelevanceFeedback job={job}/>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Adaptive answer editor — option-based questions (salary, authorization,
// notice, visa, project) render their preset choices as tappable pills plus
// a custom field; free-text questions (cover letter, essay, angle) get a textarea.
// ─────────────────────────────────────────────────────────────────────
function AnswerEditor({ q, draft, setDraft }) {
  const [busy, setBusy] = React.useState(null);  // which AI assist is running
  const optionKind = q && (q.kind === "confirm" || q.kind === "jit" || q.kind === "choice") && Array.isArray(q.options);
  const inputStyle = {
    width:"100%", padding:"11px 14px", borderRadius: 12,
    border:`1.5px solid ${rT.hairline}`, background:"#fff",
    fontSize: 14, fontFamily: rFB, color: rT.ink, outline:"none", fontWeight: 600,
  };
  if (optionKind) {
    const clean = (lab) => lab.replace(/^[^A-Za-z0-9$]+\s*/, "").trim();
    const isCustomOpt = (lab) => /…|custom|exact|set\s/i.test(lab);
    return (
      <div style={{display:"flex", flexDirection:"column", gap: 10}}>
        <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
          {q.options.map((o, i) => {
            const custom = isCustomOpt(o.label);
            const val = clean(o.label);
            const sel = !custom && draft === val;
            return (
              <button key={i} onClick={()=> setDraft(custom ? "" : val)} style={{
                padding:"9px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                cursor:"pointer", fontFamily: rFB,
                background: sel ? rT.ink : "#fff", color: sel ? "#fff" : rT.ink,
                border: `1.5px solid ${sel ? rT.ink : rT.hairline}`,
              }}>{sel ? "✓ " : (custom ? "✎ " : "")}{custom ? "Type my own" : val}</button>
            );
          })}
        </div>
        <input value={draft} onChange={(e)=>setDraft(e.target.value)}
               placeholder="Or type a custom answer…" style={inputStyle}/>
      </div>
    );
  }
  // Free-text (cover letter, essay, angle) — textarea + Sprout AI assist
  function aiRewrite(action) {
    setBusy(action);
    setTimeout(() => { setDraft(d => assistRewrite(d, action)); setBusy(null); }, 900);
  }
  const assists = ["✨ Improve", "🪶 Shorter", "😎 Warmer", "🎯 More specific", "💪 Stronger"];
  return (
    <div style={{display:"flex", flexDirection:"column", gap: 10}}>
      <div style={{display:"flex", alignItems:"center", gap: 7, flexWrap:"wrap", background: rT.lilac, borderRadius: 12, padding:"8px 10px"}}>
        <span style={{display:"inline-flex", alignItems:"center", gap: 5, fontSize: 10.5, fontWeight: 800, color: rT.lilacInk, letterSpacing:"0.05em"}}>
          <RA size={18} cap={rT.cyan} mood="happy"/> SPROUT ASSIST
        </span>
        {assists.map(a => (
          <button key={a} disabled={!!busy} onClick={()=>aiRewrite(a)} style={{
            padding:"6px 11px", borderRadius: 999, fontSize: 12, fontWeight: 700, fontFamily: rFB,
            cursor: busy ? "default" : "pointer", background:"#fff", color: rT.ink,
            border:`1px solid ${rT.hairline}`, opacity: (busy && busy !== a) ? 0.5 : 1,
          }}>{busy === a ? "✨ rewriting…" : a}</button>
        ))}
      </div>
      <textarea value={draft} onChange={(e)=>setDraft(e.target.value)} autoFocus disabled={!!busy}
        style={{...inputStyle, minHeight: 120, resize:"vertical", lineHeight: 1.5, border:`1.5px solid ${rT.cyanInk}`, opacity: busy ? 0.55 : 1}}/>
      <div style={{fontSize: 11.5, color: rT.muted, fontWeight: 600}}>Tap an assist to rewrite · you can still edit the text yourself.</div>
    </div>
  );
}

// Prototype stand-in for a model call — plausible in-place rewrites of the draft.
function assistRewrite(text, action) {
  const t = (text || "").trim();
  if (/Shorter/.test(action)) {
    const parts = t.split(/(?<=[.!?…])\s+/).filter(Boolean);
    if (parts.length >= 2) return parts.slice(0, Math.max(1, Math.floor(parts.length / 2))).join(" ");
    const cut = Math.max(40, Math.floor(t.length * 0.6));
    return t.slice(0, cut).replace(/[\s,;:—-]+$/, "") + "…";
  }
  if (/Warmer/.test(action)) {
    const body = t.replace(/^\s*(hi|hey|hello)[^—.-]*[—.-]\s*/i, "");
    return "Hi there — I'm genuinely excited about this one. " + body;
  }
  if (/More specific/.test(action)) {
    return t.replace(/\s*$/, "") + " Concretely: I cut PM grooming time ~50% and lifted activation 12% in two quarters.";
  }
  if (/Stronger/.test(action)) {
    return t.replace(/I'd love to|I would love to|I'd really like to/gi, "I want to")
            .replace(/\bI think\b\s*|\bI believe\b\s*/gi, "");
  }
  // ✨ Improve — general polish
  return t.replace(/\s+/g, " ").replace(/\.\s*$/, "") + ". I'd bring that same craft bar to your team from day one.";
}

// ─────────────────────────────────────────────────────────────────────
// Review (queued job) — one calm list of every answer Sprout drafted.
// Edit any inline; a couple need your eyes; one Approve & send.
// ─────────────────────────────────────────────────────────────────────
function PageReview() {
  const { s, d } = rUseStore();
  const job = s.jobs.find(j => j.id === s.params.jobId);
  if (!job) {
    React.useEffect(()=> d({type:"GO", route:"home"}), []);
    return null;
  }

  const questions = LINEAR_QUESTIONS;
  const [showSkip, setShowSkip] = React.useState(false);
  const [editingId, setEditing] = React.useState(null);
  const [draft, setDraft]       = React.useState("");
  const [edited, setEdited]     = React.useState({}); // {qId: newValue}
  const [resolved, setResolved] = React.useState({}); // {qId: true} once you've looked

  // Sprout's drafted answer for each question — same content, shown as one calm list.
  function draftFor(q) {
    if (q.kind === "cover")   return q.draft.replace(/\{\{|\}\}/g, "");
    if (q.kind === "choice")  return (q.options.find(o => o.recommended) || q.options[0]).label.replace(/^[^A-Za-z]+/, "").replace(/\s*\(.*\)\s*$/, "");
    if (q.kind === "ab")      return (q.options.find(o => o.recommended) || q.options[0]).text;
    if (q.kind === "confirm") return q.prefilled;
    if (q.kind === "jit")     return (q.options.find(o => o.recommended) || q.options[0]).label.replace(/^[^A-Za-z]+/, "");
    if (q.kind === "essay")   return "Headspace nav overhaul — 6-month project, 23% lift in onboarding completion. The hardest part was making the case for cutting features the team had championed for a year. I learned that shipping less, but tighter, beats a bigger surface every time.";
    return "—";
  }
  const list = questions.map(q => ({ q, value: draftFor(q) }));

  // Two answers genuinely need your eyes; the rest Sprout already has handled.
  const NEEDS_YOU = ["project", "essay"];
  function statusOf(id) {
    if (edited[id]) return "edited";
    if (NEEDS_YOU.includes(id) && !resolved[id]) return "needs";
    return "ready";
  }
  const needCount = list.filter(it => statusOf(it.q.id) === "needs").length;

  function startEdit(item) { setEditing(item.q.id); setDraft((edited[item.q.id] || item.value).toString()); }
  function saveEdit(id) {
    setEdited(m => ({...m, [id]: draft.trim() || m[id] || ""}));
    setResolved(m => ({...m, [id]: true}));
    setEditing(null);
  }

  return (
    <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight: 0}}>
      {/* Header */}
      <div style={{padding:"14px 28px", display:"flex", alignItems:"center", gap: 14, borderBottom:`1px solid ${rT.hairline}`, flexShrink: 0, background:"#fff"}}>
        <button onClick={()=>d({type:"GO", route:"home"})} style={{display:"inline-flex", alignItems:"center", gap: 6, fontSize: 13.5, color: rT.ink, fontWeight: 700, cursor:"pointer", whiteSpace:"nowrap"}}>← Back to tracker</button>
        <div style={{width: 1, height: 22, background: rT.hairline}}/>
        <div style={{width: 36, height: 36, borderRadius: 10, background: job.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 16, fontFamily: rFD, flexShrink: 0}}>{job.logo}</div>
        <div style={{flex:1, minWidth: 0}}>
          <div style={{fontSize: 15, fontWeight: 700, color: rT.ink, lineHeight: 1.1, fontFamily: rFD, letterSpacing:"-0.01em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{job.co} · {job.role}</div>
          <div style={{fontSize: 12, color: rT.muted, fontWeight: 600, marginTop: 2}}>Review application · edit any answer before it sends</div>
        </div>
        <button onClick={()=>d({type:"APPROVE_JOB", jobId: job.id})} style={{padding:"9px 18px", borderRadius: 999, background: rT.ink, color:"#fff", fontSize: 13.5, fontWeight: 700, border:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0}}>Approve &amp; send →</button>
      </div>

      {/* Skip confirmation */}
      {showSkip && (
        <div onClick={()=>setShowSkip(false)} style={{position:"absolute", inset: 0, zIndex: 60, background:"rgba(20,18,16,0.4)", display:"flex", alignItems:"center", justifyContent:"center", padding: 24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff", borderRadius: 20, padding: 24, width: 380, maxWidth:"100%", boxShadow:"0 24px 60px rgba(0,0,0,0.25)", animation:"sprFadeUp 0.2s ease-out"}}>
            <div style={{display:"flex", gap: 12, alignItems:"flex-start", marginBottom: 14}}>
              <RA size={40} cap={rT.cyan} mood="curious"/>
              <div>
                <div style={{fontFamily: rFD, fontWeight: 700, fontSize: 19, color: rT.ink, letterSpacing:"-0.02em"}}>Skip {job.co}?</div>
                <div style={{fontSize: 13, color: rT.muted, fontWeight: 600, marginTop: 4, lineHeight: 1.45}}>
                  I'll pull it from your queue and won't apply. It stays a {job.match}% match — you can restart it anytime from Applications.
                </div>
              </div>
            </div>
            <div style={{display:"flex", gap: 8}}>
              <button onClick={()=>setShowSkip(false)} style={{flex: 1, padding:"11px", borderRadius: 12, background:"#fff", border:`1.5px solid ${rT.hairline}`, fontSize: 13.5, fontWeight: 700, color: rT.ink, cursor:"pointer"}}>Keep reviewing</button>
              <button onClick={()=>d({type:"SKIP_JOB", jobId: job.id, next:"home"})} style={{flex: 1, padding:"11px", borderRadius: 12, background: rT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer"}}>Skip it</button>
            </div>
          </div>
        </div>
      )}

      <div style={{flex:1, display:"flex", minHeight: 0, background: rT.cream}}>
        {/* Left — Job Description (confirm you're applying to the right role) */}
        <JDPanel job={job}/>

        {/* Main single list — every answer, edit any inline */}
        <div style={{flex:1, overflow:"auto", padding:"28px 0", display:"flex", justifyContent:"center"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", flexDirection:"column", gap: 12, padding:"0 36px"}}>

            <div style={{background: rT.lilac, borderRadius: 16, padding:"16px 18px", display:"flex", alignItems:"center", gap: 14}}>
              <img src="assets/bloom-favicon.svg" alt="Sprout" style={{width: 40, height:"auto", display:"block", flexShrink: 0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize: 14.5, fontWeight: 700, color: rT.ink, letterSpacing:"-0.01em"}}>Sprout drafted every answer for {job.co}.</div>
                <div style={{fontSize: 12.5, color: rT.inkSoft, fontWeight: 500, marginTop: 2, lineHeight: 1.45}}>Edit anything before it sends — your changes train Sprout for next time.</div>
              </div>
            </div>

            {needCount > 0 && (
              <div style={{fontSize: 12.5, fontWeight: 700, color: rT.butterInk, display:"flex", alignItems:"center", gap: 7, padding:"2px 4px"}}>
                <span style={{width: 7, height: 7, borderRadius:"50%", background: rT.butterInk, flexShrink: 0}}/>
                {needCount} {needCount > 1 ? "answers" : "answer"} need your eyes — the rest are ready to send.
              </div>
            )}

            {list.map((item, i) => {
              const st = statusOf(item.q.id);
              const isEditing = editingId === item.q.id;
              const value = (edited[item.q.id] || item.value).toString();
              const chip = {
                ready:  { bg: rT.mint,   fg: rT.mintInk,   label:"✓ Drafted" },
                needs:  { bg: rT.butter, fg: rT.butterInk, label:"Needs your eyes" },
                edited: { bg: rT.mint,   fg: rT.mintInk,   label:"✓ Edited" },
              }[st];
              return (
                <div key={item.q.id} style={{background:"#fff", borderRadius: 16, padding:"16px 18px", border:`1px solid ${st === "needs" ? rT.butter : rT.hairline}`}}>
                  <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap: 12, marginBottom: 12}}>
                    <div style={{fontSize: 14.5, fontWeight: 700, color: rT.ink, lineHeight: 1.3, letterSpacing:"-0.01em"}}>{i + 1}. {item.q.q}</div>
                    <div style={{flexShrink: 0, padding:"4px 10px", borderRadius: 999, background: chip.bg, color: chip.fg, fontSize: 11, fontWeight: 800, letterSpacing:"0.02em", whiteSpace:"nowrap"}}>{chip.label}</div>
                  </div>

                  {isEditing ? (
                    <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                      <AnswerEditor q={item.q} draft={draft} setDraft={setDraft}/>
                      <div style={{display:"flex", gap: 8}}>
                        <button onClick={()=>saveEdit(item.q.id)} style={{padding:"10px 18px", borderRadius: 999, background: rT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer"}}>Save answer</button>
                        <button onClick={()=>setEditing(null)} style={{padding:"10px 14px", borderRadius: 999, background:"#fff", color: rT.muted, border:`1px solid ${rT.hairline}`, fontSize: 13.5, fontWeight: 600, cursor:"pointer"}}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{fontSize: 10.5, fontWeight: 800, color: rT.muted, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom: 6}}>{st === "needs" ? "Sprout's suggestion" : "Answer"}</div>
                      <div style={{background: rT.cream, borderRadius: 12, padding:"12px 14px", fontSize: 14, color: rT.ink, lineHeight: 1.5, fontWeight: 500}}>{value}</div>
                      <button onClick={()=>startEdit(item)} style={{marginTop: 10, fontSize: 13, color: rT.cyanInk, fontWeight: 700, cursor:"pointer", display:"inline-flex", alignItems:"center", gap: 5}}>✎ Edit answer</button>
                    </>
                  )}
                </div>
              );
            })}

            {/* Single primary action */}
            <div style={{display:"flex", alignItems:"center", gap: 8, marginTop: 6, fontSize: 12, color: rT.muted, fontWeight: 600}}>
              <span style={{display:"inline-flex", alignItems:"center", gap: 7, padding:"7px 11px", borderRadius: 10, background:"#fff", border:`1px solid ${rT.hairline}`, color: rT.ink, fontWeight: 700}}>📄 Vinodh_Resume_2026.pdf</span>
              <span>attached · sent in your voice</span>
            </div>
            <button onClick={()=>d({type:"APPROVE_JOB", jobId: job.id})} style={{marginTop: 2, padding:"15px 24px", borderRadius: 14, background: rT.ink, color:"#fff", fontSize: 15, fontWeight: 700, border:"none", cursor:"pointer", width:"100%"}}>
              Approve &amp; send to {job.co} →
            </button>
            <button onClick={()=>setShowSkip(true)} style={{fontSize: 12.5, color: rT.muted, fontWeight: 600, cursor:"pointer", textAlign:"center", padding:"2px 0 6px", background:"none", border:"none"}}>Not a fit? Skip this job</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CARD COMPONENTS — each question kind
// ─────────────────────────────────────────────────────────────────────

function CoverCard({ q, answered, refined, isCurrent, onApprove, onRefine }) {
  const showRefinedNote = refined && isCurrent;
  return (
    <ProposalCard
      tone={answered ? "approved" : "pending"}
      title={answered ? "✓ Looks good" : (refined ? `✏️ Refined: ${refined.refinedBy} — approve or keep tweaking` : "Looks good?")}
    >
      {showRefinedNote && (
        <div style={{background: rT.cyan + "22", borderRadius: 10, padding:"8px 12px", marginBottom: 10, fontSize: 12.5, color: rT.cyanInk, fontWeight: 700, display:"flex", alignItems:"center", gap: 6}}>
          <span>✨</span> I rewrote it — {refined.refinedBy.toLowerCase()}. Happy with it now?
        </div>
      )}
      <div style={{background: answered ? "rgba(255,255,255,0.6)" : rT.cream, borderRadius: 12, padding:"12px 14px", fontSize: 14, color: rT.ink, lineHeight: 1.5, fontWeight: 500}}>
        {q.draft.split("{{").map((p, i) => {
          if (i === 0) return <span key={i}>{p}</span>;
          const [hl, rest] = p.split("}}");
          return <React.Fragment key={i}><span style={{background: rT.butter, padding:"1px 5px", borderRadius: 4, fontWeight: 700}}>{hl}</span>{rest}</React.Fragment>;
        })}
        <span style={{color: rT.muted, fontWeight: 600}}> [3 more paragraphs]</span>
      </div>
      {isCurrent && (
        <div style={{display:"flex", flexWrap:"wrap", gap: 6, marginTop: 12}}>
          <RSC onClick={onApprove} fill={rT.ink} ink="#fff" size="sm">{refined ? "👍 Perfect, next" : "👍 Looks good"}</RSC>
          {q.actions.slice(1).map((a, i) => (
            <RSC key={i} onClick={()=>onRefine(a)} fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>{a}</RSC>
          ))}
        </div>
      )}
    </ProposalCard>
  );
}

function ChoiceCard({ q, answered, isCurrent, onPick }) {
  return (
    <ProposalCard
      tone={answered ? "approved" : "needs"}
      title={answered ? `✓ Using: ${answered.value}` : "Which one should I lead with?"}
      label={!answered && "NEEDS YOU"}
    >
      {!answered && <div style={{fontSize: 13.5, color: rT.ink, fontWeight: 500, lineHeight: 1.45, marginBottom: 12}}>I have three strong options. <b>No typing — just pick one.</b></div>}
      {isCurrent && (
        <div style={{display:"flex", flexDirection:"column", gap: 6}}>
          {q.options.map((o, i) => (
            <RSC key={i} onClick={()=>onPick(o)}
                 fill={o.recommended ? rT.ink : "#fff"} ink={o.recommended ? "#fff" : rT.ink} size="lg"
                 style={{justifyContent:"flex-start", width:"100%", ...(o.recommended ? {} : {border:`1px solid ${rT.hairline}`})}}>
              {o.label}
            </RSC>
          ))}
        </div>
      )}
    </ProposalCard>
  );
}

function ABCard({ q, answered, isCurrent, onPick }) {
  return (
    <ProposalCard
      tone={answered ? "approved" : "pending"}
      title={answered ? `✓ Using ${answered.value}` : "Pick the angle that feels more you"}
    >
      {isCurrent && (
        <>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10}}>
            {q.options.map((o, i) => (
              <div key={i} onClick={()=>onPick(o)} style={{
                background:"#fff", borderRadius: 14, padding: 12,
                border: o.recommended ? `1.5px solid ${rT.ink}` : `1px solid ${rT.hairline}`,
                cursor:"pointer", position:"relative", transition:"all 0.15s",
              }} onMouseEnter={(e)=> e.currentTarget.style.borderColor = rT.ink}
                 onMouseLeave={(e)=> e.currentTarget.style.borderColor = o.recommended ? rT.ink : rT.hairline}>
                <div style={{fontSize: 10, fontWeight: 800, color: o.recommended ? rT.cyanInk : rT.muted, marginBottom: 6, letterSpacing:"0.05em"}}>{o.tag}</div>
                <div style={{fontSize: 13, color: rT.ink, lineHeight: 1.45, fontWeight: 500}}>{o.text}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex", gap: 6, flexWrap:"wrap", marginTop: 10}}>
            <RSC onClick={()=>onPick(q.options[0])} fill={rT.ink} ink="#fff" size="sm">Use A</RSC>
            <RSC onClick={()=>onPick(q.options[1])} fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Use B</RSC>
            <RSC onClick={()=>onPick({tag:"Blended"})} fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Blend them</RSC>
            <RSC onClick={()=>onPick({tag:"Custom"})} fill={rT.cyan} size="sm">✨ Write a 3rd</RSC>
          </div>
        </>
      )}
    </ProposalCard>
  );
}

function FactsCard({ q, answered, isCurrent, onApprove }) {
  return (
    <ProposalCard
      tone={answered ? "approved" : "pending"}
      title={answered ? "✓ All correct" : "All set — I pulled these from your résumé."}
      label={!answered && "AUTO-FILLED"}
    >
      <div style={{background: answered ? "rgba(255,255,255,0.6)" : rT.cream, borderRadius: 12, padding:"12px 14px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 18px", fontSize: 13}}>
          {q.rows.map(([k,v]) => (
            <div key={k} style={{display:"flex", justifyContent:"space-between", gap: 10}}>
              <span style={{color: rT.inkSoft, fontWeight: 600}}>{k}</span>
              <span style={{fontWeight: 700, color: rT.ink}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {isCurrent && (
        <div style={{display:"flex", gap: 6, marginTop: 12, flexWrap:"wrap"}}>
          <RSC onClick={onApprove} fill={rT.ink} ink="#fff" size="sm">👍 All correct</RSC>
          <RSC fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Fix one…</RSC>
        </div>
      )}
    </ProposalCard>
  );
}

// CONFIRM — pre-filled from résumé/profile; user taps to confirm or correct
function ConfirmCard({ q, answered, isCurrent, onPick }) {
  return (
    <div style={{
      background: answered ? rT.mint : "#fff",
      borderRadius: 18, padding:"16px 18px",
      border: `1.5px solid ${answered ? rT.mint : rT.hairline}`,
      position:"relative",
    }}>
      <div style={{position:"absolute", top:-10, left: 18, padding:"3px 10px", borderRadius: 99,
                    background: answered ? rT.mintInk : rT.cyanInk, color:"#fff",
                    fontSize: 10.5, fontWeight: 800, letterSpacing:"0.06em",
                    display:"inline-flex", alignItems:"center", gap: 4, textTransform:"uppercase"}}>
        {answered ? "✓ saved" : `from ${q.source}`}
      </div>

      <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.04em", textTransform:"uppercase", marginTop: 4, marginBottom: 8}}>
        {q.q}
      </div>

      <div style={{display:"flex", alignItems:"baseline", gap: 10, marginBottom: 12}}>
        <span style={{fontFamily: rFD, fontWeight: 700, fontSize: 22, color: rT.ink, letterSpacing:"-0.02em", lineHeight: 1.1}}>
          {answered ? answered.value : q.prefilled}
        </span>
        {!answered && (
          <span style={{fontSize: 11.5, color: rT.muted, fontWeight: 600}}>pre-filled · just confirm</span>
        )}
      </div>

      {isCurrent && (
        <div style={{display:"flex", flexDirection:"column", gap: 6}}>
          {q.options.map((o, i) => (
            <RSC key={i} onClick={()=>onPick(o)}
                 fill={i === 0 ? rT.ink : "#fff"} ink={i === 0 ? "#fff" : rT.ink} size="lg"
                 style={{justifyContent:"flex-start", width:"100%", ...(i === 0 ? {} : {border:`1px solid ${rT.hairline}`})}}>
              {o.label}
            </RSC>
          ))}
        </div>
      )}
    </div>
  );
}

// JIT (Just-In-Time) — Sprout asks a deferred field inline, saves for future
function JITCard({ q, answered, isCurrent, onPick }) {
  const [remember, setRemember] = React.useState(true);
  return (
    <div style={{
      background: answered ? rT.mint : rT.lilac, borderRadius: 18, padding:"16px 18px",
      border: `1.5px solid ${answered ? rT.mint : rT.lilacInk}`, position:"relative",
    }}>
      <div style={{position:"absolute", top: -10, left: 18, padding:"3px 10px", borderRadius: 99, background: answered ? rT.mintInk : rT.lilacInk, color:"#fff", fontSize: 10.5, fontWeight: 800, letterSpacing:"0.06em", display:"inline-flex", alignItems:"center", gap: 4}}>
        ✨ {answered ? "SAVED FOR FUTURE APPS" : "ONE-TIME QUESTION"}
      </div>
      <div style={{fontSize: 11, fontWeight: 800, color: rT.inkSoft, letterSpacing:"0.04em", textTransform:"uppercase", marginTop: 4, marginBottom: 6}}>{q.field}</div>
      <div style={{fontSize: 15, fontWeight: 700, color: rT.ink, lineHeight: 1.35, marginBottom: 10, letterSpacing:"-0.005em"}}>
        {answered ? `✓ ${answered.value}` : "Tap once — you'll never see this again."}
      </div>
      {isCurrent && (
        <>
          <div style={{display:"flex", flexDirection:"column", gap: 6}}>
            {q.options.map((o, i) => (
              <RSC key={i} onClick={()=>onPick(o)}
                   fill={o.recommended ? rT.ink : "#fff"} ink={o.recommended ? "#fff" : rT.ink} size="lg"
                   style={{justifyContent:"flex-start", width:"100%", ...(o.recommended ? {} : {border:`1px solid ${rT.hairline}`})}}>
                {o.label}
              </RSC>
            ))}
          </div>
          <label style={{display:"flex", alignItems:"center", gap: 8, marginTop: 12, cursor:"pointer", fontSize: 12.5, fontWeight: 600, color: rT.inkSoft}}>
            <div onClick={(e)=>{ e.preventDefault(); setRemember(!remember); }} style={{
              width: 32, height: 18, borderRadius: 99, background: remember ? rT.cyanInk : rT.hairline, position:"relative", flexShrink: 0,
            }}>
              <div style={{position:"absolute", top: 2, left: remember ? 16 : 2, width: 14, height: 14, borderRadius:"50%", background:"#fff", transition:"left 0.15s"}}/>
            </div>
            <span>Save my answer — Sprout will reuse it for every future app</span>
          </label>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SHARED PROPOSAL CARD
// ─────────────────────────────────────────────────────────────────────
function ProposalCard({ tone="pending", title, label, children }) {
  const styles = {
    pending:  { bg:"#fff",   bd: rT.hairline,  labelBg: null },
    approved: { bg: rT.mint, bd: rT.mint,      labelBg: rT.mintInk },
    needs:    { bg:"#fff",   bd: rT.flame,     labelBg: rT.flame },
  }[tone];
  return (
    <div style={{background: styles.bg, borderRadius: 18, padding:"16px 18px", border: `1.5px solid ${styles.bd}`, position:"relative", transition:"all 0.25s"}}>
      {label && (
        <div style={{position:"absolute", top: -10, left: 18, padding:"3px 10px", borderRadius: 99, background: styles.labelBg, color:"#fff", fontSize: 10.5, fontWeight: 800, letterSpacing:"0.06em"}}>{label}</div>
      )}
      {title && (
        <div style={{fontSize: 15, fontWeight: 700, color: rT.ink, lineHeight: 1.35, marginBottom: 10, letterSpacing:"-0.005em"}}>{title}</div>
      )}
      {children}
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap: 12, padding:"6px 0 2px", marginTop: 4}}>
      <div style={{fontSize: 10.5, fontWeight: 800, color: rT.muted, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap"}}>{label}</div>
      <div style={{flex:1, height: 1, background: rT.hairline}}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RIGHT RAIL — job context + Sprout's confidence + ambient chat
// ─────────────────────────────────────────────────────────────────────
function ReviewRail({ job, questions, answers, step, onApplyTweak }) {
  questions = questions || LINEAR_QUESTIONS;
  answers   = answers   || {};
  step      = step      ?? 0;

  // Build checklist: each question = Pending (decision needed) or Auto (auto-filled)
  const checklist = questions.map((q, i) => {
    const ans = answers[q.id];
    const isAuto = q.kind === "confirm" || q.kind === "facts" || q.kind === "jit";
    let status;
    if (ans)                   status = ans.state === "approved" ? "approved" : "edited";
    else if (i === step)       status = "current";
    else if (isAuto)           status = "auto";
    else                       status = "pending";
    return { q, status, isAuto };
  });

  const decisionsNeeded = checklist.filter(c => c.status === "pending" || c.status === "current").length;

  // Auto-filled fields visible at all times — Figma's "Bloom handled the rest"
  const autoFilled = questions.filter(q => q.kind === "confirm" || q.kind === "jit").map(q => ({
    label: q.q.replace(/\?$/,""),
    value: q.prefilled || (q.options && q.options[0] && q.options[0].label) || "—",
    source: q.source || "profile",
  }));

  return (
    <div style={{width: 320, flexShrink: 0, background:"#fff", borderLeft:`1px solid ${rT.hairline}`, display:"flex", flexDirection:"column", overflow:"auto"}}>

      {/* Confidence at top — Figma puts this first */}
      <div style={{padding: 18, borderBottom:`1px solid ${rT.hairline}`}}>
        <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 8}}>My confidence</div>
        <div style={{display:"flex", alignItems:"flex-end", gap: 8, marginBottom: 8}}>
          <div style={{fontFamily: rFD, fontWeight: 700, fontSize: 36, color: rT.ink, lineHeight: 1, letterSpacing:"-0.03em"}}>{job.match}%</div>
          <div style={{fontSize: 11.5, color: rT.muted, fontWeight: 600, paddingBottom: 4}}>fit · top 3% of applicants</div>
        </div>
        <div style={{height: 6, background: rT.cream, borderRadius: 99, overflow:"hidden"}}>
          <div style={{width:`${job.match}%`, height:"100%", background:`linear-gradient(90deg, ${rT.cyan}, ${rT.cyanInk})`, borderRadius: 99}}/>
        </div>
      </div>

      {/* The role */}
      <div style={{padding: 18, borderBottom:`1px solid ${rT.hairline}`}}>
        <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 10}}>The role</div>
        <div style={{display:"flex", flexDirection:"column", gap: 6, fontSize: 12.5, color: rT.ink}}>
          {[["Comp", job.comp],["Posted","4 hours ago"],["Stage","Series C"],["Location", job.loc]].map(([k,v]) => (
            <div key={k} style={{display:"flex", justifyContent:"space-between"}}>
              <span style={{color: rT.muted, fontWeight: 600}}>{k}</span>
              <span style={{fontWeight: 700}}>{v}</span>
            </div>
          ))}
        </div>
        <button style={{marginTop: 10, fontSize: 12, color: rT.cyanInk, fontWeight: 700, cursor:"pointer"}}>See full description →</button>
      </div>

      {/* Review checklist — the headline Figma element */}
      <div style={{padding: 18, borderBottom:`1px solid ${rT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 4}}>
          <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase"}}>Review checklist</div>
        </div>
        <div style={{fontSize: 12.5, color: decisionsNeeded === 0 ? rT.mintInk : rT.flame, fontWeight: 700, marginBottom: 10}}>
          {decisionsNeeded === 0 ? "✓ All set — ready to send" : `${decisionsNeeded} decision${decisionsNeeded === 1 ? "" : "s"} needed before sending`}
        </div>
        <div style={{display:"flex", flexDirection:"column", gap: 2}}>
          {checklist.map((it, i) => (
            <ChecklistRow key={it.q.id} idx={i + 1} label={it.q.q} status={it.status}/>
          ))}
        </div>
      </div>

      {/* Bloom handled the rest — visible auto-filled fields, Figma section */}
      <div style={{padding: 18, borderBottom:`1px solid ${rT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 10}}>
          <RA size={22} cap={rT.cyan} mood="happy"/>
          <div>
            <div style={{fontSize: 11, fontWeight: 800, color: rT.cyanInk, letterSpacing:"0.06em"}}>● BLOOM HANDLED THE REST</div>
            <div style={{fontSize: 11, color: rT.muted, fontWeight: 600, marginTop: 1}}>{autoFilled.length} fields from your résumé &amp; profile</div>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap: 1, fontSize: 12.5}}>
          {autoFilled.map((f,i) => (
            <div key={i} style={{padding:"8px 10px", borderRadius: 10, background: rT.cream, display:"flex", justifyContent:"space-between", alignItems:"center", gap: 8}}>
              <div style={{display:"flex", flexDirection:"column", minWidth: 0, flex: 1}}>
                <span style={{color: rT.muted, fontWeight: 600, fontSize: 10.5, textTransform:"uppercase", letterSpacing:"0.04em"}}>{f.source}</span>
                <span style={{fontWeight: 700, color: rT.ink, fontSize: 12.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{f.value}</span>
              </div>
              <button style={{fontSize: 11, color: rT.cyanInk, fontWeight: 800, cursor:"pointer", flexShrink: 0}}>Fix</button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat lives in a floating bubble (bottom-right) — keeps the rail focused on the checklist */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RAIL CHAT — functional, scoped chat assistant
// Three jobs only:
//  1. Answer questions about the role / fit / process
//  2. Apply a tweak to current question Sprout already drafted
//  3. Gracefully decline anything off-scope ("I can help with: X, Y, Z")
// ─────────────────────────────────────────────────────────────────────
function RailChat({ job, questions, step, onApplyTweak }) {
  const [open, setOpen] = React.useState(false);
  const [thread, setThread] = React.useState([
    { role:"sprout", text:"Hey — ask me about the role, or tell me how to tweak an answer (e.g. \"make it warmer\"). I'll keep it focused." },
  ]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [unread, setUnread] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread, thinking]);

  function ask(text) {
    if (!text || !text.trim()) return;
    const userMsg = { role:"user", text };
    setThread(t => [...t, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = sproutReply(text, { job, questions, step, onApplyTweak });
      setThinking(false);
      setThread(t => [...t, reply]);
    }, 700);
  }

  const suggestions = [
    "Who's the hiring manager?",
    "How does my fit break down?",
    "Make the cover less corporate",
    "What's their interview process?",
  ];

  return (
    <>
      {/* Floating bubble launcher */}
      <button onClick={()=>{ setOpen(o=>!o); setUnread(false); }} style={{
        position:"absolute", bottom: 22, right: 22, zIndex: 40,
        width: 58, height: 58, borderRadius:"50%", border:"none", cursor:"pointer",
        background: rT.ink, boxShadow:"0 10px 30px rgba(0,0,0,0.25)",
        display:"grid", placeItems:"center",
        transition:"transform 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <RA size={36} cap={rT.cyan} mood={open ? "happy" : "curious"}/>
        {!open && (
          <span style={{position:"absolute", top: -2, right: -2, background: rT.cyan, color: rT.ink, fontSize: 9, fontWeight: 800, padding:"2px 6px", borderRadius: 99, letterSpacing:"0.02em", border:"2px solid #fff"}}>ASK</span>
        )}
      </button>

      {/* Popover panel */}
      {open && (
        <div style={{
          position:"absolute", bottom: 90, right: 22, zIndex: 41,
          width: 360, maxWidth:"calc(100% - 44px)", maxHeight:"min(560px, calc(100% - 130px))",
          background:"#fff", borderRadius: 20, border:`1px solid ${rT.hairline}`,
          boxShadow:"0 24px 60px rgba(0,0,0,0.22)",
          display:"flex", flexDirection:"column", overflow:"hidden",
          animation:"sprFadeUp 0.2s ease-out",
        }}>
          {/* Header */}
          <div style={{padding:"14px 16px", borderBottom:`1px solid ${rT.hairline}`, display:"flex", alignItems:"center", gap: 10, background: rT.cream}}>
            <RA size={30} cap={rT.cyan} mood="happy"/>
            <div style={{flex: 1}}>
              <div style={{fontSize: 13.5, fontWeight: 700, color: rT.ink, fontFamily: rFD, letterSpacing:"-0.01em"}}>Talk to Sprout</div>
              <div style={{fontSize: 11, color: rT.muted, fontWeight: 600}}>Role questions · answer tweaks · skip</div>
            </div>
            <button onClick={()=>setOpen(false)} style={{fontSize: 18, color: rT.muted, fontWeight: 700, cursor:"pointer", padding:"2px 6px"}}>✕</button>
          </div>

          {/* Thread */}
          <div ref={scrollRef} style={{flex: 1, minHeight: 160, overflow:"auto", display:"flex", flexDirection:"column", gap: 8, padding: 14}}>
            {thread.map((m, i) => (
              m.role === "user" ? (
                <div key={i} style={{alignSelf:"flex-end", maxWidth:"86%", background: rT.ink, color:"#fff", padding:"8px 12px", borderRadius:"14px 14px 4px 14px", fontSize: 13, fontWeight: 500, lineHeight: 1.4}}>{m.text}</div>
              ) : (
                <div key={i} style={{alignSelf:"flex-start", maxWidth:"92%", background: rT.cream, padding:"9px 13px", borderRadius:"14px 14px 14px 4px", fontSize: 13, color: rT.ink, fontWeight: 500, lineHeight: 1.45}}>
                  {m.text}
                  {m.actions && (
                    <div style={{display:"flex", flexWrap:"wrap", gap: 4, marginTop: 8}}>
                      {m.actions.map((a, j) => (
                        <button key={j} onClick={()=>{ if (a.onClick) a.onClick(); ask(a.label); }}
                                style={{padding:"4px 9px", borderRadius: 99, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 11.5, color: rT.ink, fontWeight: 700, cursor:"pointer", fontFamily: rFB}}>{a.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
            {thinking && (
              <div style={{alignSelf:"flex-start", background: rT.cream, padding:"9px 13px", borderRadius: 14, display:"inline-flex", gap: 3}}>
                {[0,1,2].map(i => <span key={i} style={{width: 5, height: 5, borderRadius:"50%", background: rT.cyanInk, animation:`sprPulse 1.4s ${i*0.2}s infinite`}}/>)}
              </div>
            )}
          </div>

          {/* Quick prompts */}
          {thread.length < 3 && (
            <div style={{display:"flex", flexWrap:"wrap", gap: 4, padding:"0 14px 10px"}}>
              {suggestions.map(sg => (
                <button key={sg} onClick={()=>ask(sg)} style={{padding:"5px 10px", borderRadius: 99, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 11.5, color: rT.muted, fontWeight: 600, cursor:"pointer", fontFamily: rFB}}>{sg}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e)=>{ e.preventDefault(); ask(input); }} style={{display:"flex", gap: 6, background: rT.cream, borderRadius: 99, padding:"4px 4px 4px 14px", border:`1px solid ${rT.hairline}`, margin: 14, marginTop: 0}}>
            <input value={input} onChange={(e)=>setInput(e.target.value)} autoFocus
                   placeholder="Ask about the role, or request a tweak…"
                   style={{flex: 1, border:"none", outline:"none", background:"transparent", fontSize: 13, color: rT.ink, fontFamily: rFB, padding:"7px 0"}}/>
            <button type="submit" disabled={!input.trim()} style={{width: 34, height: 34, borderRadius:"50%", background: input.trim() ? rT.ink : rT.hairline, color:"#fff", border:"none", fontSize: 15, fontWeight: 800, cursor: input.trim() ? "pointer" : "not-allowed", flexShrink: 0}}>↑</button>
          </form>
        </div>
      )}
    </>
  );
}

// Intent matcher — handles 3 scopes, otherwise graceful fallback
function sproutReply(text, ctx) {
  const t = text.toLowerCase();
  const { job } = ctx;

  // Role/fit/process questions
  if (/hiring manager|recruiter|who.*reviews|who.*hires/.test(t)) {
    return { role:"sprout", text: `For ${job.co} it's likely Karri Saarinen's design org — Linear is small, design reports up to the founder. I can dig up the recruiter's name if you want.`, actions:[{label:"Find their LinkedIn"},{label:"Skip"}] };
  }
  if (/fit|match|breakdown|why.*\d+|score/.test(t)) {
    return { role:"sprout", text: `${job.match}% breakdown: years of exp (97%), tools overlap (94% — Figma + Linear daily), domain (89% — productivity SaaS), company stage (83% — Series C matches your last role). Weakest signal: no public design-systems writing.`, actions:[{label:"How to strengthen?"}] };
  }
  if (/interview|process|loop|rounds|how many/.test(t)) {
    return { role:"sprout", text: `Linear's process: 30min recruiter → portfolio review (45min) → take-home (4-day, ~6 hours) → onsite (4×45min: craft, system, collab, exec). Median 3 weeks start to offer.` };
  }
  if (/salary|comp|negotiate|pay/.test(t)) {
    return { role:"sprout", text: `Posted band: ${job.comp}. Your floor is $180k. I'd quote $200-230k base — Linear pays at the 75th percentile and you have leverage with 6 yrs.`, actions:[{label:"Set my ask to $215k"}] };
  }
  if (/skip|pass|not a fit|don't apply/.test(t)) {
    return { role:"sprout", text: `Cool — want me to skip just this one, or block Linear from future searches?`, actions:[{label:"Skip just this"},{label:"Never show Linear"}] };
  }

  // Tweak intents — applies to current cover-letter answer
  if (/warmer|friendly|less corporate|less formal|chill|relax/.test(t)) {
    if (ctx.onApplyTweak) ctx.onApplyTweak("😎 Warmer");
    return { role:"sprout", text:"Done — rewrote the cover letter with warmer tone. Check the card." };
  }
  if (/shorter|tighter|cut|trim|brief|concise/.test(t)) {
    if (ctx.onApplyTweak) ctx.onApplyTweak("🪶 Shorter");
    return { role:"sprout", text:"Tightened it up. Look at the cover card." };
  }
  if (/stronger|punchier|bolder|bold|impact/.test(t)) {
    if (ctx.onApplyTweak) ctx.onApplyTweak("💪 Stronger");
    return { role:"sprout", text:"Made it punchier. Refresh the card to see." };
  }
  if (/specific|details|more.*details|sharper|concrete/.test(t)) {
    if (ctx.onApplyTweak) ctx.onApplyTweak("🎯 More specific");
    return { role:"sprout", text:"Added specifics — added the Headspace metric. Card updated." };
  }

  // Off-scope — graceful fallback
  return {
    role:"sprout",
    text: "I'm best at three things: telling you about the role, tweaking an answer I drafted, or helping you skip. For other stuff, edit the answer directly above 👆 — taps train me faster than typing.",
    actions: [
      { label:"Tell me about Linear" },
      { label:"How's my fit?" },
      { label:"Tweak the cover" },
    ],
  };
}

function ChecklistRow({ idx, label, status }) {
  const cfg = {
    approved: { ic:"✓",  ink: rT.mintInk,    bg: rT.mint,         tag:"Done"    },
    edited:   { ic:"✎",  ink: rT.flame, bg: "#FFE8DC", tag:"Edited"  },
    current:  { ic:"●",  ink: rT.cyanInk,    bg: "#E0F4F8",       tag:"Now"     },
    pending:  { ic:"○",  ink: rT.ink,        bg: rT.cream,        tag:"Pending" },
    auto:     { ic:"✨", ink: rT.muted,      bg: "transparent",   tag:"Auto"    },
  }[status] || { ic:"○", ink: rT.muted, bg:"transparent", tag:"—" };
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap: 8, padding:"6px 8px", borderRadius: 8, background: cfg.bg}}>
      <div style={{display:"flex", alignItems:"center", gap: 8, minWidth: 0, flex: 1}}>
        <span style={{
          width: 18, height: 18, borderRadius:"50%",
          background: status === "approved" ? rT.mintInk : (status === "current" ? rT.cyanInk : "transparent"),
          color: (status === "approved" || status === "current") ? "#fff" : cfg.ink,
          border: status === "pending" ? `1.5px solid ${rT.ink}` : "none",
          display:"grid", placeItems:"center", fontSize: 10, fontWeight: 800, flexShrink: 0,
        }}>{cfg.ic}</span>
        <span style={{fontSize: 12.5, color: rT.ink, fontWeight: 600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{label}</span>
      </div>
      <span style={{fontSize: 10, fontWeight: 800, color: cfg.ink, letterSpacing:"0.05em", textTransform:"uppercase", flexShrink: 0}}>{cfg.tag}</span>
    </div>
  );
}

// ESSAY — Custom question only the user can answer. Sprout offers starters + polishes
function EssayCard({ q, answered, isCurrent, onSubmit }) {
  const [text, setText] = React.useState("");
  const [phase, setPhase] = React.useState("starters"); // starters → typing → polished
  const [polished, setPolished] = React.useState(null);

  function pickStarter(s) {
    if (s.startsWith("Skip")) {
      setPhase("typing");
      setText("");
      return;
    }
    setPhase("typing");
    // Pre-fill a skeleton based on the chosen starter
    if (s.includes("Headspace")) setText("Headspace nav overhaul — 6mo project, lifted onboarding completion 23%. The hardest part was…");
    else if (s.includes("Linear-clone")) setText("Built a Linear-inspired triage tool at Headspace to cut PM grooming time in half. What made me proud was…");
    else if (s.includes("Notion")) setText("Shipped a Notion-templates marketplace prototype that 800+ teams use. The win was…");
  }

  function handleSubmit() {
    if (!text.trim() || text.length < 40) return;
    // Sprout "polishes" — in real product this would be an API call
    const polishedText = text.length < 100
      ? text + " The win was watching the metric move within two weeks of ship. What I learned: shipping less, but tighter, beats a bigger surface every time."
      : text;
    setPolished(polishedText);
    setPhase("polished");
  }

  if (answered) {
    return (
      <ProposalCard tone="approved" title={`✓ Submitted (${answered.value.length || "polished"} chars)`}>
        <div style={{background:"rgba(255,255,255,0.6)", borderRadius: 12, padding:"12px 14px", fontSize: 13.5, color: rT.ink, lineHeight: 1.5, fontWeight: 500}}>
          {answered.essay || polished || text || answered.value}
        </div>
      </ProposalCard>
    );
  }

  return (
    <ProposalCard tone="needs" label="ONLY YOU CAN ANSWER" title="Pick a starter — or just type. I'll polish it to 250 words.">
      {phase === "starters" && isCurrent && (
        <div style={{display:"flex", flexDirection:"column", gap: 6}}>
          {q.starters.map((s, i) => (
            <RSC key={i} onClick={()=>pickStarter(s)}
                 fill={i === 0 ? rT.ink : "#fff"} ink={i === 0 ? "#fff" : rT.ink} size="lg"
                 style={{justifyContent:"flex-start", width:"100%", ...(i === 0 ? {} : {border:`1px solid ${rT.hairline}`})}}>
              {s}
            </RSC>
          ))}
        </div>
      )}

      {phase === "typing" && (
        <div style={{display:"flex", flexDirection:"column", gap: 10}}>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} autoFocus
                    placeholder={q.placeholder}
                    style={{width:"100%", minHeight: 120, padding: 12, borderRadius: 12,
                            border:`1.5px solid ${rT.cyanInk}`, background:"#fff",
                            fontSize: 13.5, fontFamily: rFB, color: rT.ink, outline:"none",
                            resize:"vertical", lineHeight: 1.5, fontWeight: 500}}/>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize: 11, color: text.length < 40 ? rT.muted : rT.mintInk, fontWeight: 700}}>
              {text.length} chars · {text.length < 40 ? "give me a few more words to work with" : "ready to polish"}
            </div>
            <div style={{display:"flex", gap: 6}}>
              <button onClick={()=>setPhase("starters")} style={{padding:"7px 12px", borderRadius: 99, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 12.5, color: rT.muted, fontWeight: 600, cursor:"pointer", fontFamily: rFB}}>← Starters</button>
              <button onClick={handleSubmit} disabled={text.length < 40}
                      style={{padding:"8px 14px", borderRadius: 99, background: text.length >= 40 ? rT.ink : rT.hairline, color:"#fff", border:"none", fontSize: 12.5, fontWeight: 700, cursor: text.length >= 40 ? "pointer" : "not-allowed", fontFamily: rFB}}>
                ✨ Polish to 250w
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === "polished" && (
        <div style={{display:"flex", flexDirection:"column", gap: 10}}>
          <div style={{background: rT.cream, borderRadius: 12, padding:"12px 14px", fontSize: 13.5, color: rT.ink, lineHeight: 1.5, fontWeight: 500, border:`1px solid ${rT.hairline}`}}>
            {polished}
          </div>
          <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
            <RSC onClick={()=>onSubmit(polished, "Polished essay (250 words)")} fill={rT.ink} ink="#fff" size="sm">👍 Use this</RSC>
            <RSC onClick={()=>setPhase("typing")} fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>✎ Keep editing</RSC>
            <RSC onClick={()=>{ setText(""); setPhase("starters"); }} fill="#fff" ink={rT.muted} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Try a different starter</RSC>
          </div>
        </div>
      )}
    </ProposalCard>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CHAT DOCK — persistent input
// ─────────────────────────────────────────────────────────────────────
function ChatDock({ onWrite }) {
  return (
    <div style={{
      position:"absolute", bottom: 16, left: 32, right: 332,
      display:"flex", justifyContent:"center", pointerEvents:"none",
    }}>
      <div style={{
        background:"#fff", borderRadius: 999, padding: "6px 6px 6px 18px",
        border:`1.5px solid ${rT.hairline}`, boxShadow:"0 8px 24px rgba(2,47,54,0.10)",
        display:"flex", alignItems:"center", gap: 10, width:"min(560px, 100%)",
        pointerEvents:"auto",
      }}>
        <input placeholder="message Sprout — or just tap pills above…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 14, color: rT.ink, fontFamily: rFB, padding:"10px 0"}}/>
        <button onClick={onWrite} style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 12.5, fontWeight: 700, color: rT.ink, cursor:"pointer"}}>✎ Write my own</button>
        <button style={{width: 38, height: 38, borderRadius: 999, background: rT.ink, color:"#fff", border:"none", fontSize: 16, fontWeight: 700, cursor:"pointer"}}>↑</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SUBMITTED VIEW — same chat-style UI, but for editing past answers.
// Mirrors LINEAR_QUESTIONS exactly so every question in the review flow
// is also visible (and editable) here for future apps.
// ─────────────────────────────────────────────────────────────────────
function PageSubmitted() {
  const { s, d } = rUseStore();
  const job = s.jobs.find(j => j.id === s.params.jobId);
  if (!job) {
    React.useEffect(()=> d({type:"GO", route:"applications"}), []);
    return null;
  }

  // Derive the submitted answer for each question in the linear flow.
  // For confirm-style questions, the saved value is the prefilled default.
  function answerFor(q) {
    if (q.kind === "cover")   return { label:"Cover letter", value:`Hey ${job.co} team — I've been building ${job.co}-adjacent tools for 4 years…`, source:"Sprout drafted" };
    if (q.kind === "choice")  return { label:q.q, value:q.options[0].label.replace(/^[^a-zA-Z]+/, "").replace(/ \(.*/, ""), source:"you picked" };
    if (q.kind === "ab")      return { label:q.q, value: q.options[0].text, source:"you picked angle A" };
    if (q.kind === "confirm") return { label:q.q, value: q.prefilled, source:`auto-filled from ${q.source}` };
    if (q.kind === "jit")     return { label:q.q, value: q.options.find(o=>o.recommended)?.label || q.options[0].label, source:"saved for future apps" };
    if (q.kind === "essay")   return { label:q.q, value:"Headspace nav overhaul — 6mo project, 23% lift in onboarding completion. The hardest part was making the case for cutting features the PM team had championed for a year. I learned that shipping less, but tighter, beats a bigger surface every time.", source:"your custom essay" };
    return { label:q.q, value:"—", source:"unknown" };
  }

  const submitted = LINEAR_QUESTIONS.map(q => ({ q, ...answerFor(q) }));

  const [editingId, setEditing] = React.useState(null);
  const [draft, setDraft]       = React.useState("");
  const [improved, setImproved] = React.useState({}); // {qId: newValue}

  // A few fields Sprout is less sure about surface as "needs your review" — so
  // the single list covers both clean submissions AND ones worth a second look.
  const NEEDS_REVIEW = ["salary", "visa"];
  function statusOf(id) {
    if (improved[id]) return "updated";
    if (NEEDS_REVIEW.includes(id)) return "review";
    return "submitted";
  }
  const reviewCount = submitted.filter(it => statusOf(it.q.id) === "review").length;

  function startEdit(item) {
    setEditing(item.q.id);
    setDraft((improved[item.q.id] || item.value).toString());
  }
  function saveEdit(id) {
    setImproved(m => ({...m, [id]: draft.trim() || m[id] || ""}));
    setEditing(null);
  }

  return (
    <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"14px 28px", display:"flex", alignItems:"center", gap: 14, borderBottom:`1px solid ${rT.hairline}`, flexShrink: 0, background:"#fff"}}>
        <button onClick={()=>d({type:"GO", route:"applications"})} style={{display:"inline-flex", alignItems:"center", gap: 6, fontSize: 13.5, color: rT.ink, fontWeight: 700, cursor:"pointer", whiteSpace:"nowrap"}}>← Back to tracker</button>
        <div style={{width: 1, height: 22, background: rT.hairline}}/>
        <div style={{width: 36, height: 36, borderRadius: 10, background: job.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 16, fontFamily: rFD, flexShrink: 0}}>{job.logo}</div>
        <div style={{flex:1, minWidth: 0}}>
          <div style={{fontSize: 15, fontWeight: 700, color: rT.ink, lineHeight: 1.1, fontFamily: rFD, letterSpacing:"-0.01em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{job.co} · {job.role}</div>
          <div style={{fontSize: 12, color: rT.muted, fontWeight: 600, marginTop: 2}}>Review submitted application · edit answers to teach Sprout</div>
        </div>
        <div style={{padding:"6px 12px", borderRadius: 999, background: rT.mint, color: rT.mintInk, fontSize: 12, fontWeight: 800, letterSpacing:"0.04em", flexShrink: 0}}>✓ SUBMITTED</div>
      </div>

      <div style={{flex:1, display:"flex", minHeight: 0, background: rT.cream}}>
        {/* Left — same Job Description detail as the review screen */}
        <JDPanel job={job}/>

        {/* Main answer list — one list, every answer, fix any inline */}
        <div style={{flex:1, overflow:"auto", padding:"28px 0", display:"flex", justifyContent:"center"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", flexDirection:"column", gap: 12, padding:"0 36px"}}>

            {/* One calm callout — the whole mental model in two lines */}
            <div style={{background: rT.lilac, borderRadius: 16, padding:"16px 18px", display:"flex", alignItems:"center", gap: 14}}>
              <img src="assets/bloom-favicon.svg" alt="Sprout" style={{width: 40, height:"auto", display:"block", flexShrink: 0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize: 14.5, fontWeight: 700, color: rT.ink, letterSpacing:"-0.01em"}}>Edit any answer to update Sprout's memory.</div>
                <div style={{fontSize: 12.5, color: rT.inkSoft, fontWeight: 500, marginTop: 2, lineHeight: 1.45}}>It reuses your new answer on every future application — you only fix it once.</div>
              </div>
            </div>

            {/* Needs-review nudge — only before any edits */}
            {reviewCount > 0 && Object.keys(improved).length === 0 && (
              <div style={{fontSize: 12.5, fontWeight: 700, color: rT.butterInk, display:"flex", alignItems:"center", gap: 7, padding:"2px 4px"}}>
                <span style={{width: 7, height: 7, borderRadius:"50%", background: rT.butterInk, flexShrink: 0}}/>
                {reviewCount} answer{reviewCount > 1 ? "s" : ""} worth a quick look — the rest are good to go.
              </div>
            )}

            {/* The single list — covers every status */}
            {submitted.map((item, i) => {
              const st = statusOf(item.q.id);
              const isEditing = editingId === item.q.id;
              const value = (improved[item.q.id] || item.value).toString();
              const chip = {
                submitted: { bg: rT.mint,   fg: rT.mintInk,   label:"✓ Submitted" },
                review:    { bg: rT.butter, fg: rT.butterInk, label:"Needs your review" },
                updated:   { bg: rT.mint,   fg: rT.mintInk,   label:"✓ Memory updated" },
              }[st];
              return (
                <div key={item.q.id} style={{background:"#fff", borderRadius: 16, padding:"16px 18px", border:`1px solid ${st === "review" ? rT.butter : rT.hairline}`, transition:"border-color 0.2s"}}>
                  <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap: 12, marginBottom: 12}}>
                    <div style={{fontSize: 14.5, fontWeight: 700, color: rT.ink, lineHeight: 1.3, letterSpacing:"-0.01em"}}>{i + 1}. {item.q.q}</div>
                    <div style={{flexShrink: 0, padding:"4px 10px", borderRadius: 999, background: chip.bg, color: chip.fg, fontSize: 11, fontWeight: 800, letterSpacing:"0.02em", whiteSpace:"nowrap"}}>{chip.label}</div>
                  </div>

                  {isEditing ? (
                    <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                      <AnswerEditor q={item.q} draft={draft} setDraft={setDraft}/>
                      <div style={{display:"flex", gap: 8}}>
                        <button onClick={()=>saveEdit(item.q.id)} style={{padding:"10px 18px", borderRadius: 999, background: rT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer"}}>Save for future applications</button>
                        <button onClick={()=>setEditing(null)} style={{padding:"10px 14px", borderRadius: 999, background:"#fff", color: rT.muted, border:`1px solid ${rT.hairline}`, fontSize: 13.5, fontWeight: 600, cursor:"pointer"}}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{fontSize: 10.5, fontWeight: 800, color: rT.muted, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom: 6}}>Submitted answer</div>
                      <div style={{background: rT.cream, borderRadius: 12, padding:"12px 14px", fontSize: 14, color: rT.ink, lineHeight: 1.5, fontWeight: 500}}>{value}</div>
                      <button onClick={()=>startEdit(item)} style={{marginTop: 10, fontSize: 13, color: rT.cyanInk, fontWeight: 700, cursor:"pointer", display:"inline-flex", alignItems:"center", gap: 5}}>✎ Edit answer</button>
                    </>
                  )}
                </div>
              );
            })}

            {/* One quiet footer line */}
            <div style={{fontSize: 12.5, color: rT.muted, fontWeight: 600, textAlign:"center", padding:"8px 0 4px"}}>
              {Object.keys(improved).length > 0
                ? `Sprout saved ${Object.keys(improved).length} update${Object.keys(improved).length > 1 ? "s" : ""} for future applications.`
                : "Sprout reuses these answers on similar roles. Edit any time."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PageReview, PageSubmitted,
  CoverCard, ChoiceCard, ABCard, FactsCard, JITCard, ConfirmCard, EssayCard, ProposalCard, SectionDivider,
  ReviewRail, RailChat, ChatDock,
});
