// =====================================================================
// Bloom Prototype — Pages: Home, Jobs, Applications, Copilot config
// =====================================================================
const {
  pT: gT, pFD: gFD, pFB: gFB, PM: GM, PA: GA,
  useStore: gUseStore, PageHeader: GHead, ModeToggle: GModeToggle,
  SprChip: GSC, SprBubble: GSBu, SprBtn: GSBtn, LivePill: GLP,
} = window;

// ─────────────────────────────────────────────────────────────────────
// HOME — adapts to mode
// ─────────────────────────────────────────────────────────────────────
function PageHome() {
  const { s, d } = gUseStore();
  const isAuto = s.mode === "auto";
  const queued = s.jobs.filter(j => j.status === "queued");
  const submittedToday = s.jobs.filter(j => j.status === "auto-applied").length;
  const submittedThisWeek = s.jobs.filter(j => j.status === "applied" || j.status === "auto-applied").length;

  // Celebrate banner — shows briefly when a job is approved
  const celebrate = s.params.celebrate ? s.jobs.find(j => j.id === s.params.celebrate) : null;
  React.useEffect(() => {
    if (celebrate) {
      const t = setTimeout(() => d({type:"CELEBRATED"}), 4500);
      return () => clearTimeout(t);
    }
  }, [s.params.celebrate]);

  return (
    <div style={{flex: 1, overflow:"auto"}}>
      <GHead
        title={`Good morning, ${s.user.firstName}`}
        sub={isAuto ? "Sprout's been busy. Here's what landed in your inbox." : "Sprout's been busy. A few are ready when you are."}
      />

      {celebrate && (
        <div style={{margin:"0 32px 14px", background: gT.mint, color: gT.mintInk, borderRadius: 16, padding:"14px 18px", display:"flex", alignItems:"center", gap: 12, animation:"sprBob 1s"}}>
          <div style={{width: 32, height: 32, borderRadius:"50%", background: gT.mintInk, color:"#fff", display:"grid", placeItems:"center", fontSize: 16, fontWeight: 800}}>✓</div>
          <div style={{flex: 1, fontSize: 14, fontWeight: 700}}>
            <b>{celebrate.co}</b> · application sent. I'll let you know when they reply.
          </div>
          <button onClick={()=>d({type:"CELEBRATED"})} style={{color: gT.mintInk, opacity: 0.6, fontSize: 18, cursor:"pointer"}}>×</button>
        </div>
      )}

      {/* HERO — changes by mode */}
      <div style={{margin:"0 32px 18px", background: gT.ink, borderRadius: 26, padding:"26px 30px", color:"#fff", position:"relative", overflow:"hidden", display:"flex", gap: 28, alignItems:"center"}}>
        <div style={{position:"absolute", top:-60, right:-30, width: 280, height: 280, borderRadius:"50%", background: isAuto ? gT.flame : gT.cyan, opacity: 0.16, filter:"blur(40px)"}}/>

        <div style={{flex: 1.6, position:"relative", zIndex: 1}}>
          {isAuto ? (
            <>
              <GLP color={gT.flame} ink="#fff"><b>{submittedToday} sent today</b> · Auto Apply running</GLP>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing:"-0.035em", marginTop: 14}}>
                Sprout sent <span style={{color: gT.cyan}}>{submittedToday} applications</span><br/>while you slept.
              </div>
              <div style={{fontSize: 15.5, opacity: 0.78, fontWeight: 500, marginTop: 12, lineHeight: 1.45, maxWidth: 540}}>
                That's ~<b style={{color:"#fff"}}>{submittedToday * 25}m</b> you didn't have to spend filling forms. I'll keep going.
              </div>
              <div style={{display:"flex", gap: 10, marginTop: 18, alignItems:"center"}}>
                <button onClick={()=>d({type:"GO", route:"applications"})} style={{padding:"13px 20px", borderRadius: 999, background: gT.cyan, color: gT.ink, fontSize: 14.5, fontWeight: 700, border:"none", cursor:"pointer"}}>See what I sent →</button>
                <button onClick={()=>d({type:"SET_MODE", mode:"review"})} style={{padding:"13px 18px", borderRadius: 999, background:"transparent", color:"#fff", fontSize: 13.5, fontWeight: 600, border:`1.5px solid rgba(255,255,255,0.25)`, cursor:"pointer"}}>Switch to review mode</button>
              </div>
            </>
          ) : (
            <>
              <GLP color={gT.butter} ink={gT.butterInk}>{queued.length} drafts waiting · Review Before Submit</GLP>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing:"-0.035em", marginTop: 14}}>
                {queued.length} applications<br/>are <span style={{color: gT.cyan}}>ready when you are.</span>
              </div>
              <div style={{fontSize: 15.5, opacity: 0.78, fontWeight: 500, marginTop: 12, lineHeight: 1.45, maxWidth: 540}}>
                I drafted {queued.length} great matches — that's ~<b style={{color:"#fff"}}>3h 20m</b> of form-filling I did for you. Each takes ~90s to review.
              </div>
              <div style={{display:"flex", gap: 10, marginTop: 18, alignItems:"center"}}>
                <button onClick={()=>queued[0] && d({type:"OPEN_REVIEW", jobId: queued[0].id})} style={{padding:"13px 22px", borderRadius: 999, background: gT.cyan, color: gT.ink, fontSize: 14.5, fontWeight: 700, border:"none", cursor:"pointer"}}>Start reviewing →</button>
                <button onClick={()=>d({type:"SET_MODE", mode:"auto"})} style={{padding:"13px 18px", borderRadius: 999, background:"transparent", color:"#fff", fontSize: 13.5, fontWeight: 600, border:`1.5px solid rgba(255,255,255,0.25)`, cursor:"pointer"}}>Switch to Auto Apply</button>
              </div>
            </>
          )}

          <div style={{display:"flex", gap: 10, marginTop: 22}}>
            <Stat dark v={isAuto ? submittedToday : queued.length} l={isAuto ? "sent today" : "ready to review"} accent={gT.cyan}/>
            <Stat dark v="2" l="recruiter replies 🎉" accent={gT.flame}/>
            <Stat dark v={isAuto ? "0 min" : "~13 min"} l={isAuto ? "your time" : "to clear queue"}/>
            <Stat dark v={submittedThisWeek + 32} l="this week"/>
          </div>
        </div>

        <div style={{flex: 0.6, display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex: 1}}>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute", inset: -10, borderRadius:"50%", border: `1.5px solid ${gT.cyan}`, opacity: 0.4, animation:"sprRipple 2.4s ease-out infinite"}}/>
            <img src="assets/bloom-home-mascot.svg" alt="Sprout" style={{width: 140, height:"auto", display:"block"}}/>
          </div>
        </div>
      </div>

      <div style={{padding:"0 32px 24px", display:"grid", gridTemplateColumns:"1.5fr 1fr", gap: 18}}>
        {/* Queue / Recent */}
        <div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 19, color: gT.ink, letterSpacing:"-0.02em"}}>
              {isAuto ? "Just sent" : `Your review queue (${queued.length})`}
            </div>
            <button onClick={()=>d({type:"GO", route:"applications"})} style={{fontSize: 13, color: gT.cyanInk, fontWeight: 700, cursor:"pointer"}}>See all →</button>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap: 10}}>
            {(isAuto
              ? s.jobs.filter(j=>j.status==="auto-applied" || j.status==="applied").slice(0, 4)
              : queued
            ).map(j => (
              <JobRow key={j.id} job={j} mode={s.mode}/>
            ))}
            {!isAuto && queued.length === 0 && (
              <div style={{background:"#fff", borderRadius: 16, padding: 28, border: `1px solid ${gT.hairline}`, textAlign:"center"}}>
                <GA size={48} cap={gT.cyan} mood="happy"/>
                <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 17, marginTop: 12}}>You're all caught up! 🎉</div>
                <div style={{fontSize: 13, color: gT.muted, fontWeight: 600, marginTop: 4}}>I'll draft new ones as roles come in.</div>
              </div>
            )}
          </div>
        </div>

        {/* Live feed */}
        <div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 19, color: gT.ink, letterSpacing:"-0.02em"}}>What Sprout did</div>
            <button style={{fontSize: 13, color: gT.cyanInk, fontWeight: 700, cursor:"pointer"}}>All →</button>
          </div>
          <div style={{background:"#fff", borderRadius: 16, border:`1px solid ${gT.hairline}`, overflow:"hidden"}}>
            {[
              {t:"now", text: isAuto ? <>Submitting <b>Vercel · DX</b></> : <>Drafting <b>Vercel · DX</b> for your queue</>, icon: isAuto ? "📤" : "✏️", live: true},
              {t:"38m", text:<><b>Recruiter reply</b> from Ramp 🎉</>, icon:"💌", color: gT.flame},
              {t:"1h",  text:<>Found <b>Notion · AI</b> — adding</>, icon:"👀"},
              {t:"3h",  text:<>Skipped 4 roles below your $180k floor</>, icon:"⏭"},
            ].map((e,i,arr) => (
              <div key={i} style={{padding:"12px 14px", display:"flex", gap: 10, alignItems:"center", borderBottom: i < arr.length-1 ? `1px solid ${gT.hairline}` : "none"}}>
                <div style={{width: 28, height: 28, borderRadius: 9, background: gT.cream, display:"grid", placeItems:"center", fontSize: 13, position:"relative", flexShrink: 0}}>
                  {e.icon}
                  {e.live && <span style={{position:"absolute", top:-2, right:-2, width: 8, height: 8, borderRadius:"50%", background: gT.flame, border:"2px solid #fff", animation:"sprPulse 1.6s infinite"}}/>}
                </div>
                <div style={{flex:1, fontSize: 13, color: e.color || gT.ink, fontWeight: 500, lineHeight: 1.3}}>{e.text}</div>
                <div style={{fontSize: 11, color: gT.muted, fontWeight: 700, flexShrink: 0}}>{e.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* This week */}
      <div style={{padding: "0 32px 40px"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
          <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 19, color: gT.ink, letterSpacing:"-0.02em"}}>The picture this week</div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
          <BigStat tint={gT.cyan}   v="11h" l="time I saved you"      sub="vs filling forms yourself"/>
          <BigStat tint={gT.butter} v={submittedThisWeek + 32}        l="applications sent" sub="↑ 18 vs last week"/>
          <BigStat tint={gT.mint}   v="6"   l="recruiters replied"    sub="14% reply rate · top 12%"/>
          <BigStat tint={gT.lilac}  v="2"   l="screening calls 🎉"     sub="Linear Tue · Stripe Fri"/>
        </div>
      </div>
    </div>
  );
}

function JobRow({ job, mode }) {
  const { d } = gUseStore();
  const isAuto = mode === "auto";
  const isApplied = job.status === "applied" || job.status === "auto-applied";
  return (
    <div onClick={()=> isApplied ? d({type:"OPEN_SUBMITTED", jobId: job.id}) : d({type:"OPEN_REVIEW", jobId: job.id})}
         style={{background:"#fff", borderRadius: 16, padding: 14, border: `1px solid ${gT.hairline}`, display:"flex", gap: 14, alignItems:"center", cursor:"pointer", transition:"all 0.15s"}}
         onMouseEnter={(e)=>{ e.currentTarget.style.borderColor = gT.ink; e.currentTarget.style.transform = "translateY(-1px)"; }}
         onMouseLeave={(e)=>{ e.currentTarget.style.borderColor = gT.hairline; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{width: 44, height: 44, borderRadius: 11, background: job.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 18, flexShrink: 0, fontFamily: gFD}}>{job.logo}</div>
      <div style={{flex:1, minWidth: 0}}>
        <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 2, flexWrap:"wrap"}}>
          <div style={{fontSize: 14.5, fontWeight: 700, color: gT.ink, lineHeight: 1.2}}>{job.role}</div>
          <span style={{fontSize: 11, fontWeight: 700, padding:"2px 8px", borderRadius: 999, background: gT.mint, color: gT.mintInk}}>{job.match}% fit</span>
          {job.urgent && <span style={{fontSize: 11, fontWeight: 800, padding:"2px 8px", borderRadius: 999, background: gT.flame, color:"#fff", letterSpacing:"0.04em"}}>HOT</span>}
          {job.oneTap && <span style={{fontSize: 11, fontWeight: 800, padding:"2px 8px", borderRadius: 999, background: gT.butter, color: gT.butterInk, letterSpacing:"0.04em"}}>1-TAP</span>}
        </div>
        <div style={{fontSize: 12.5, color: gT.inkSoft, fontWeight: 500, marginBottom: 4}}>{job.co} · {job.comp} · {isApplied ? `sent ${job.appliedAt}` : `queued ${job.queuedAt}`}</div>
        {job.why && (
          <div style={{fontSize: 12.5, color: gT.muted, fontWeight: 500, lineHeight: 1.4, display:"flex", gap: 6}}>
            <span style={{flexShrink:0, opacity: 0.7}}>Sprout:</span>
            <span>"{job.why}"</span>
          </div>
        )}
        {isApplied && job.replyText && (
          <div style={{fontSize: 12.5, color: job.replyStatus==="reply" ? gT.flame : gT.muted, fontWeight: 600, lineHeight: 1.4, display:"flex", gap: 6}}>
            <span>{job.replyStatus==="reply" ? "💌" : job.replyStatus==="viewed" ? "👀" : "⏳"}</span>
            <span>{job.replyText}</span>
          </div>
        )}
      </div>
      <div style={{display:"flex", flexDirection:"column", gap: 6, alignItems:"flex-end"}}>
        {isApplied ? (
          <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", color: gT.ink, fontSize: 12.5, fontWeight: 700, border:`1px solid ${gT.hairline}`, whiteSpace:"nowrap", cursor:"pointer"}}>View →</button>
        ) : (
          <>
            <button style={{padding:"8px 16px", borderRadius: 999, background: gT.ink, color:"#fff", fontSize: 12.5, fontWeight: 700, border:"none", whiteSpace:"nowrap", cursor:"pointer"}}>Review →</button>
            {job.oneTap && (
              <button onClick={(e)=>{ e.stopPropagation(); d({type:"APPROVE_JOB", jobId: job.id}); }}
                      style={{padding:"6px 12px", borderRadius: 999, background: gT.cyan, color: gT.ink, fontSize: 11.5, fontWeight: 700, border:"none", cursor:"pointer"}}>
                Approve & send
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ v, l, accent, dark }) {
  return (
    <div style={{flex:1, background: dark ? "rgba(255,255,255,0.08)" : "#fff", padding:"12px 14px", borderRadius: 14, border: dark ? `1px solid rgba(255,255,255,0.08)` : `1px solid ${gT.hairline}`}}>
      <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, color: accent || (dark ? "#fff" : gT.ink), letterSpacing:"-0.025em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 11, opacity: dark ? 0.7 : 1, color: dark ? "#fff" : gT.muted, fontWeight: 600, marginTop: 6}}>{l}</div>
    </div>
  );
}

function BigStat({ v, l, sub, tint }) {
  return (
    <div style={{background: tint, borderRadius: 18, padding: "16px 18px"}}>
      <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 34, color: gT.ink, letterSpacing:"-0.03em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 13, color: gT.ink, fontWeight: 700, marginTop: 8, letterSpacing:"-0.01em"}}>{l}</div>
      <div style={{fontSize: 11.5, color: gT.ink, opacity: 0.7, fontWeight: 600, marginTop: 2}}>{sub}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// JOBS — list of all queued (or all auto-applied) jobs
// ─────────────────────────────────────────────────────────────────────
function PageJobs() {
  const { s } = gUseStore();
  const isAuto = s.mode === "auto";
  const queued = s.jobs.filter(j => j.status === "queued");
  const list = isAuto ? s.jobs.filter(j => j.status !== "queued") : queued;

  return (
    <div style={{flex: 1, overflow:"auto"}}>
      <GHead
        title={isAuto ? "Jobs Sprout's working on" : "Your review queue"}
        sub={isAuto ? "I auto-apply to these as they come in." : `${queued.length} drafts ready · ~${queued.length * 90}s to clear`}
        right={
          !isAuto && queued.length > 0 && (
            <button style={{padding:"10px 18px", borderRadius: 999, background: gT.cyan, color: gT.ink, fontSize: 13, fontWeight: 700, border:"none", cursor:"pointer"}}>
              Approve all (3 are 1-tap)
            </button>
          )
        }
      />

      <div style={{padding:"0 32px 16px", display:"flex", gap: 8}}>
        {["All","HOT","1-tap ready","Needs you","$200k+","Remote"].map((f,i) => (
          <GSC key={f} fill={i===0 ? gT.ink : "#fff"} ink={i===0 ? "#fff" : gT.ink} style={i===0 ? {} : {border:`1px solid ${gT.hairline}`}}>{f}</GSC>
        ))}
      </div>

      <div style={{padding:"0 32px 40px", display:"flex", flexDirection:"column", gap: 10}}>
        {list.map(j => <JobRow key={j.id} job={j} mode={s.mode}/>)}
        {list.length === 0 && (
          <div style={{background:"#fff", borderRadius: 18, padding: 40, border: `1px solid ${gT.hairline}`, textAlign:"center"}}>
            <GA size={56} cap={gT.cyan} mood="happy"/>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 20, marginTop: 14}}>Queue's empty 🎉</div>
            <div style={{fontSize: 13.5, color: gT.muted, fontWeight: 600, marginTop: 4}}>I'll draft new ones as roles come in. Go enjoy your day.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// APPLICATIONS — Kanban tracker (Saved → Applied → Replied → Interviewing → Offer)
// Inspired by Remote100K's tracker, refined: hover-revealed actions,
// bulk select, Sprout-voiced empty states, warm cream surfaces.
// ─────────────────────────────────────────────────────────────────────

// Pill-shaped icon button used for quick row actions on each card
function QuickAction({ title, onClick, active, activeColor, iconActive, danger, children }) {
  const [hover, setHover] = React.useState(false);
  const ac = activeColor || gT.flame;
  const base = {
    width: 28, height: 28, borderRadius: 8,
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    background: (active && !iconActive) ? ac : (hover ? (danger ? "rgba(247,102,56,0.12)" : "rgba(2,47,54,0.07)") : "transparent"),
    color: active ? (iconActive ? ac : "#fff") : (danger && hover ? gT.flame : gT.muted),
    transition: "all 0.12s", cursor:"pointer", border:"none", padding: 0,
  };
  return (
    <button
      title={title}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      onClick={(e)=>{ e.stopPropagation(); onClick && onClick(e); }}
      style={base}
    >
      {children}
    </button>
  );
}

// Inline 16px stroke icons — match Bloom's outline-icon style
const IcoHeart = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IcoEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcoThumbUp = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);
const IcoThumbDown = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
);
const IcoTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IcoUserPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IcoMove = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);
const IcoSparkle = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/></svg>
);
const IcoOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
);

// Pipeline stages — Contacted removed (no Contacts feature in v1)
// Flow: Saved → Applied → Replied → Interviewing → Offer
const STAGES = [
  { id:"saved",        label:"Review",       icon:"🌱",  tint:"#FFF1DC", hdr:"#FFE0AC", ink: "ink",      sub:"Sprout pre-fills · finish in chat",  next:"applied" },
  { id:"applied",      label:"Applied",      icon:"✓",   tint:"#F1F5F2", hdr:"#D8EBE3", ink: "ink",      sub:"Sent · awaiting their move",          next:"replied" },
  { id:"replied",      label:"Replied",      icon:"💬",  tint:"#FFE8DC", hdr:"#FFC8AE", ink: "flame",    sub:"Recruiter wrote back",                next:"interviewing" },
  { id:"interviewing", label:"Interviewing", icon:"🎙",  tint:"#F0EDFF", hdr:"#D9D2FF", ink: "lilac",    sub:"Active loops",                         next:"offer" },
  { id:"offer",        label:"Offer 🎉",     icon:"✦",   tint:"#E6F6EC", hdr:"#C8F0D8", ink: "mint",     sub:"The good ones",                        next:null },
];

function relTime(s) {
  return s || "—";
}

function PageApplications() {
  const { s, d } = gUseStore();
  const [selected, setSelected] = React.useState(new Set()); // job ids
  const [favOnly, setFavOnly] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Map every job → a stage id
  function stageOf(j) {
    if (j.status === "queued") return "saved";
    if (j.replyStatus === "offer") return "offer";
    if (j.replyStatus === "interviewing") return "interviewing";
    if (j.replyStatus === "reply") return "replied";       // recruiter responded
    return "applied";
  }

  // Apply filters
  const visible = s.jobs.filter(j => {
    if (favOnly && !j.favorited) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!(j.co + " " + j.role).toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const byStage = {};
  STAGES.forEach(st => byStage[st.id] = []);
  visible.forEach(j => byStage[stageOf(j)].push(j));

  // Synthetic "+ N more sent" ghost for the Applied column — shows pipeline scale
  const ghost = { applied: 296 };

  const counts = {
    saved:        byStage.saved.length,
    applied:      byStage.applied.length + ghost.applied,
    replied:      byStage.replied.length,
    interviewing: byStage.interviewing.length,
    offer:        byStage.offer.length,
  };

  // Selection helpers
  const toggleSelect = (id) => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const toggleSelectColumn = (stageId) => {
    const ids = byStage[stageId].map(j => j.id);
    setSelected(prev => {
      const allOn = ids.length > 0 && ids.every(id => prev.has(id));
      const n = new Set(prev);
      ids.forEach(id => allOn ? n.delete(id) : n.add(id));
      return n;
    });
  };
  const clearSelection = () => setSelected(new Set());
  const selectMode = selected.size > 0;

  return (
    <div style={{flex: 1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative"}}>

      {/* Sticky header — title + search + filters */}
      <div style={{padding:"18px 28px 12px", display:"flex", alignItems:"center", gap: 14, flexShrink: 0, flexWrap:"nowrap"}}>
        <div style={{flexShrink: 0, minWidth: 0}}>
          <div style={{display:"flex", alignItems:"center", gap: 8}}>
            <h1 style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, letterSpacing:"-0.025em", color: gT.ink, lineHeight: 1.05, whiteSpace:"nowrap"}}>
              Application Tracker
            </h1>
            <button title="How does this work?" style={{
              width: 20, height: 20, borderRadius:"50%",
              border:`1.5px solid ${gT.hairline}`, background:"#fff",
              fontSize: 10.5, fontWeight: 800, color: gT.muted, cursor:"pointer",
              display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink: 0,
            }}>?</button>
          </div>
          <div style={{fontSize: 12, color: gT.muted, fontWeight: 600, marginTop: 3, whiteSpace:"nowrap"}}>
            <b style={{color: gT.ink}}>{counts.saved}</b> ready ·{" "}
            <b style={{color: gT.ink}}>{counts.applied}</b> applied ·{" "}
            <b style={{color: gT.flame}}>{counts.replied}</b> replied ·{" "}
            <b style={{color: gT.lilacInk}}>{counts.interviewing}</b> interviewing
            {counts.offer > 0 && <> · <b style={{color: gT.mintInk}}>{counts.offer} offer{counts.offer>1?"s":""} 🎉</b></>}
          </div>
        </div>

        <div style={{flex: 1}}/>

        {/* Search */}
        <div style={{position:"relative", flexShrink: 0}}>
          <span style={{position:"absolute", left: 12, top:"50%", transform:"translateY(-50%)", color: gT.muted, display:"inline-flex"}}><IcoSearch/></span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search role or company"
            style={{
              width: 220, padding:"9px 12px 9px 34px", borderRadius: 999,
              border: `1px solid ${gT.hairline}`, background:"#fff",
              fontSize: 13, color: gT.ink, fontFamily: gFB,
            }}/>
        </div>

        {/* Fav filter */}
        <button
          title={favOnly ? "Show all" : "Show favorites only"}
          onClick={()=>setFavOnly(v => !v)}
          style={{
            width: 36, height: 36, borderRadius: 999, flexShrink: 0,
            border:`1px solid ${gT.hairline}`,
            background: favOnly ? gT.flame : "#fff", color: favOnly ? "#fff" : gT.muted,
            display:"inline-flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
          }}><IcoHeart filled={favOnly}/></button>

        {/* Archive */}
        <button title="Archived"
          style={{
            width: 36, height: 36, borderRadius: 999, flexShrink: 0,
            border:`1px solid ${gT.hairline}`, background:"#fff", color: gT.muted,
            display:"inline-flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
        </button>
      </div>

      {/* Bulk-action bar — appears when items are selected */}
      {selectMode && (
        <div style={{
          margin:"0 32px 10px",
          padding:"10px 14px",
          background: gT.ink, color:"#fff", borderRadius: 14,
          display:"flex", alignItems:"center", gap: 12, fontSize: 13.5, fontWeight: 600,
          animation:"sprBob 0.25s ease-out",
        }}>
          <span style={{
            background: gT.cyan, color: gT.ink, padding:"2px 10px", borderRadius: 99,
            fontWeight: 800, fontSize: 12.5,
          }}>{selected.size} selected</span>
          <span style={{opacity: 0.7}}>Bulk actions:</span>
          <button style={bulkBtn}>Move to →</button>
          <button style={bulkBtn}><IcoSparkle/> Ask Sprout</button>
          <button style={{...bulkBtn, background:"transparent", color:"#fff"}}>Mark favorite</button>
          <button style={{...bulkBtn, background:"transparent", color: gT.flame}}>Delete</button>
          <div style={{flex:1}}/>
          <button onClick={clearSelection} style={{
            color:"#fff", opacity: 0.75, fontSize: 13, fontWeight: 600, cursor:"pointer", padding: "4px 8px",
          }}>Clear</button>
        </div>
      )}

      {/* Chat-based submission rail — explains the model unique to this product */}
      <div style={{padding:"0 28px 10px", flexShrink: 0}}>
        <div style={{
          background:"#fff", borderRadius: 14, padding:"10px 14px",
          border:`1px solid ${gT.hairline}`,
          display:"flex", alignItems:"center", gap: 14, flexWrap:"wrap",
        }}>
          <img src="assets/bloom-favicon.svg" alt="Sprout" style={{width: 34, height:"auto", display:"block", flexShrink: 0}}/>
          <div style={{flex: 1, minWidth: 220}}>
            <div style={{fontSize: 13, fontWeight: 700, color: gT.ink, fontFamily: gFB, letterSpacing:"-0.005em"}}>
              Every application sent through chat, not forms.
            </div>
            <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 600, marginTop: 2}}>
              Sprout asks you ATS questions one at a time — cover letter, salary, visa, custom essays. You tap or type. We map answers to whatever the company's form requires.
            </div>
          </div>
          <div style={{display:"flex", gap: 14, paddingLeft: 8, borderLeft:`1px solid ${gT.hairline}`}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 18, color: gT.ink}}>{74 + 32}</div>
              <div style={{fontSize: 10, color: gT.muted, fontWeight: 700, letterSpacing:"0.04em"}}>ANSWERED IN CHAT</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 18, color: gT.mintInk}}>0</div>
              <div style={{fontSize: 10, color: gT.muted, fontWeight: 700, letterSpacing:"0.04em"}}>FORMS FILLED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban */}
      <div style={{flex: 1, overflowX:"auto", overflowY:"hidden", padding:"0 28px 24px"}}>
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(5, minmax(256px, 1fr))",
          gap: 16, height:"100%", minWidth: 1360,
        }}>
          {STAGES.map(st => (
            <KanbanColumn
              key={st.id}
              stage={st}
              count={counts[st.id]}
              ghost={ghost[st.id]}
              jobs={byStage[st.id]}
              selected={selected}
              onSelect={toggleSelect}
              onSelectAll={()=>toggleSelectColumn(st.id)}
              selectMode={selectMode}
            />
          ))}
        </div>
      </div>

      {/* One-Click Apply batch flow overlay */}
      {s.params.batchApply && <BatchApplyOverlay/>}

      {/* Relevance feedback toast */}
      <RelevanceToast/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// BATCH APPLY — "One-Click Apply to all" progress + summary overlay
// ─────────────────────────────────────────────────────────────────────
function BatchApplyOverlay() {
  const { s, d } = gUseStore();
  const queued = s.jobs.filter(j => j.status === "queued");
  const phase = s.params.batchApply; // "running" | "done"
  const [sentIdx, setSentIdx] = React.useState(0);

  React.useEffect(() => {
    if (phase !== "running") return;
    if (sentIdx >= queued.length) {
      const t = setTimeout(() => d({type:"BATCH_APPLY_DONE"}), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSentIdx(i => i + 1), 700);
    return () => clearTimeout(t);
  }, [phase, sentIdx, queued.length]);

  const done = phase === "done";
  const total = queued.length;

  return (
    <div style={{position:"fixed", inset: 0, zIndex: 90, background:"rgba(20,18,16,0.55)", display:"flex", alignItems:"center", justifyContent:"center", padding: 24, animation:"sprFadeUp 0.2s ease-out"}}>
      <div style={{background:"#fff", borderRadius: 24, width: 460, maxWidth:"100%", maxHeight:"88vh", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 30px 80px rgba(0,0,0,0.3)"}}>
        {/* Header */}
        <div style={{background: gT.ink, color:"#fff", padding:"22px 24px", position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", top:-40, right:-30, width: 180, height: 180, borderRadius:"50%", background: done ? gT.cyan : gT.flame, opacity: 0.2, filter:"blur(30px)"}}/>
          <div style={{position:"relative", display:"flex", alignItems:"center", gap: 14}}>
            <GM size={52} cap={gT.cyan} mood={done ? "happy" : "working"}/>
            <div>
              <div style={{fontSize: 11, fontWeight: 800, color: gT.cyan, letterSpacing:"0.06em"}}>{done ? "● ALL SENT" : "● APPLYING…"}</div>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em", lineHeight: 1.1, marginTop: 2}}>
                {done ? `${total} applications sent 🎉` : `Sprout is applying to ${total} roles`}
              </div>
              <div style={{fontSize: 12.5, opacity: 0.75, fontWeight: 600, marginTop: 3}}>
                {done ? `~${total * 25} minutes of form-filling, skipped.` : "Filling each form in your voice — no tabs, no typing."}
              </div>
            </div>
          </div>
          {!done && (
            <div style={{position:"relative", height: 6, background:"rgba(255,255,255,0.15)", borderRadius: 99, marginTop: 16, overflow:"hidden"}}>
              <div style={{height:"100%", width:`${Math.round((Math.min(sentIdx, total) / Math.max(total,1)) * 100)}%`, background: gT.cyan, borderRadius: 99, transition:"width 0.5s ease"}}/>
            </div>
          )}
        </div>

        {/* Job list with checkmarks */}
        <div style={{flex: 1, overflow:"auto", padding: 16, display:"flex", flexDirection:"column", gap: 6}}>
          {queued.map((j, i) => {
            const sent = done || i < sentIdx;
            const active = !done && i === sentIdx;
            return (
              <div key={j.id} style={{
                display:"flex", alignItems:"center", gap: 12, padding:"10px 12px", borderRadius: 12,
                background: sent ? gT.mint : (active ? gT.cream : "#fff"),
                border:`1px solid ${sent ? gT.mint : gT.hairline}`,
                transition:"all 0.3s",
              }}>
                <div style={{width: 34, height: 34, borderRadius: 9, background: j.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 14, fontFamily: gFD, flexShrink: 0}}>{j.logo}</div>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{fontSize: 13.5, fontWeight: 700, color: gT.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{j.co} · {j.role}</div>
                  <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 600}}>{j.match}% fit · {j.comp}</div>
                </div>
                {sent ? (
                  <span style={{width: 22, height: 22, borderRadius:"50%", background: gT.mintInk, color:"#fff", display:"grid", placeItems:"center", fontSize: 12, fontWeight: 800, flexShrink: 0}}>✓</span>
                ) : active ? (
                  <span style={{display:"inline-flex", gap: 3, flexShrink: 0}}>
                    {[0,1,2].map(k => <span key={k} style={{width: 5, height: 5, borderRadius:"50%", background: gT.flame, animation:`sprPulse 1.4s ${k*0.2}s infinite`}}/>)}
                  </span>
                ) : (
                  <span style={{fontSize: 11, color: gT.muted, fontWeight: 700, flexShrink: 0}}>queued</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{padding: 16, borderTop:`1px solid ${gT.hairline}`}}>
          {done ? (
            <div style={{display:"flex", gap: 8}}>
              <button onClick={()=>d({type:"BATCH_APPLY_CLOSE"})} style={{flex: 1, padding:"13px", borderRadius: 12, background: gT.ink, color:"#fff", border:"none", fontSize: 14, fontWeight: 700, cursor:"pointer", fontFamily: gFB}}>
                See them in Applied →
              </button>
            </div>
          ) : (
            <div style={{fontSize: 12.5, color: gT.muted, fontWeight: 600, textAlign:"center"}}>
              Sit tight — sending {Math.min(sentIdx + 1, total)} of {total}…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const bulkBtn = {
  background: gT.cyan, color: gT.ink, border:"none", borderRadius: 999,
  padding:"6px 12px", fontSize: 12.5, fontWeight: 700, cursor:"pointer",
  display:"inline-flex", alignItems:"center", gap: 6,
};

function KanbanColumn({ stage, count, ghost, jobs, selected, onSelect, onSelectAll, selectMode }) {
  const { s, d } = gUseStore();
  const allChecked = jobs.length > 0 && jobs.every(j => selected.has(j.id));
  const isAuto = s.mode === "auto";

  // Saved column re-labels itself based on mode
  // Review mode = "Up next" (you review & approve each). Auto = "Ready to send" (Sprout fires them).
  const colLabel = stage.id === "saved" ? (isAuto ? "Ready to send" : "Up next") : stage.label;
  const colSub   = stage.id === "saved" ? (isAuto ? "Sprout sends these automatically" : "Review & approve each before it sends") : stage.sub;
  const colIcon  = stage.id === "saved" ? (isAuto ? "🚀" : "✋") : stage.icon;

  return (
    <div style={{
      background: stage.tint, borderRadius: 18, padding: 12,
      display:"flex", flexDirection:"column", minHeight: 0,
      border: `1px solid ${gT.hairline}`,
    }}>
      {/* Column header */}
      <div style={{padding:"7px 8px 14px", display:"flex", alignItems:"center", gap: 10, flexShrink: 0}}>
        <div style={{
          display:"inline-flex", alignItems:"center", justifyContent:"center",
          width: 28, height: 28, borderRadius: 8, background: stage.hdr,
          fontSize: 13.5, flexShrink: 0,
        }}>{colIcon}</div>
        <div style={{flex: 1, minWidth: 0}}>
          <div style={{display:"flex", alignItems:"baseline", gap: 8}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 15, color: gT.ink, letterSpacing:"-0.01em"}}>{colLabel}</div>
            <div style={{fontSize: 12, color: gT.muted, fontWeight: 700}}>({count})</div>
          </div>
          <div style={{fontSize: 11, color: gT.muted, fontWeight: 600, marginTop: 1, lineHeight: 1.3}}>{colSub}</div>
        </div>
        {/* Column select-all checkbox */}
        <button
          title="Select all in column"
          onClick={onSelectAll}
          style={{
            width: 18, height: 18, borderRadius: 5,
            border: `1.5px solid ${allChecked ? gT.ink : "rgba(2,47,54,0.25)"}`,
            background: allChecked ? gT.ink : "rgba(255,255,255,0.5)",
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", color:"#fff", padding: 0, flexShrink: 0,
          }}>
          {allChecked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </button>
      </div>

      {/* Saved column CTA — One-Click Apply lives in AUTO mode; review mode reviews each card individually */}
      {stage.id === "saved" && jobs.length > 0 && (
        <div style={{margin:"0 4px 10px", display:"flex", flexDirection:"column", gap: 6}}>
          {isAuto ? (
            <>
              <button onClick={()=>d({type:"BATCH_APPLY_START"})} style={{
                background: gT.ink, color:"#fff", border:"none",
                padding:"11px 14px", borderRadius: 12, cursor:"pointer",
                fontSize: 13.5, fontWeight: 700, fontFamily: gFB,
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 7,
                boxShadow:"0 1px 0 rgba(0,0,0,0.05)",
              }}>
                <IcoSparkle/> One-Click Apply to all {jobs.length}
              </button>
              <div style={{fontSize: 10.5, color: gT.muted, fontWeight: 600, textAlign:"center", lineHeight: 1.3}}>
                Or let Sprout send them on schedule
              </div>
            </>
          ) : (
            <>
              <button onClick={()=>d({type:"OPEN_REVIEW", jobId: jobs[0].id})} style={{
                background:"#fff", color: gT.ink, border:`1.5px solid ${gT.ink}`,
                padding:"10px 14px", borderRadius: 12, cursor:"pointer",
                fontSize: 13, fontWeight: 700, fontFamily: gFB,
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 7,
              }}>
                ✋ Review next ({jobs.length})
              </button>
              <div style={{fontSize: 10.5, color: gT.muted, fontWeight: 600, textAlign:"center", lineHeight: 1.3}}>
                Switch to Auto to send all at once
              </div>
            </>
          )}
        </div>
      )}

      {/* Card list */}
      <div style={{flex: 1, overflowY:"auto", display:"flex", flexDirection:"column", gap: 10, padding:"2px 4px 4px"}}>
        {jobs.length === 0 ? (
          <EmptyColState stage={stage}/>
        ) : (
          jobs.map(j => (
            <ApplicationCard
              key={j.id}
              job={j}
              stage={stage}
              isSelected={selected.has(j.id)}
              onSelect={()=>onSelect(j.id)}
              selectMode={selectMode}
            />
          ))
        )}

        {/* Ghost pipeline tail (Applied column only) */}
        {ghost > 0 && jobs.length > 0 && (
          <div style={{
            background:"rgba(255,255,255,0.6)", borderRadius: 12, padding: "12px 14px",
            border:`1px dashed ${gT.hairline}`, textAlign:"center",
            fontSize: 12.5, color: gT.muted, fontWeight: 700,
          }}>
            + {ghost} more sent ·{" "}
            <button style={{color: gT.cyanInk, fontWeight: 800, cursor:"pointer"}}>view all</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ApplicationCard({ job, stage, isSelected, onSelect, selectMode }) {
  const { s, d } = gUseStore();
  const [hover, setHover] = React.useState(false);
  const [moveAnchor, setMoveAnchor] = React.useState(null);
  const isAuto = s.mode === "auto";

  // Decide the contextual status strip per stage
  const strip = (() => {
    if (stage.id === "offer") {
      return { lead: "💰 " + (job.offerAmount || "Offer received"), sub: job.deadline || "Pending decision", color: gT.mintInk };
    }
    if (stage.id === "interviewing") {
      return { lead: `🎙 ${job.stage || "Active loop"}`, sub: job.stageDate || "TBD", color: gT.lilacInk };
    }
    if (stage.id === "replied") {
      return { lead: `💬 ${job.replyText || "Recruiter wrote back"}`, sub: job.recruiter ? `via ${job.recruiter}` : `Replied ${job.repliedAt || "recently"}`, color: gT.flame };
    }
    if (stage.id === "saved") {
      return null; // saved cards have their own action treatment
    }
    return { lead: job.replyStatus === "viewed" ? "👀 Hiring manager viewed it" : "⏳ Awaiting response", sub: `Sent ${job.appliedAt || "recently"}`, color: gT.inkSoft };
  })();

  const showFav = hover || job.favorited || selectMode;
  const showActions = hover && !selectMode;
  const showCheckbox = hover || selectMode || isSelected;

  return (
    <div
      onClick={()=> stage.id === "saved" ? d({type:"OPEN_REVIEW", jobId: job.id}) : d({type:"OPEN_SUBMITTED", jobId: job.id})}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        background:"#fff", borderRadius: 14, padding: 14,
        border:`1px solid ${isSelected ? gT.ink : gT.hairline}`,
        boxShadow: isSelected ? "0 0 0 2px rgba(2,47,54,0.08)" : (hover ? "0 6px 14px -10px rgba(2,47,54,0.25)" : "none"),
        cursor:"pointer", position:"relative",
        opacity: job.relevance === "down" ? 0.6 : 1,
        display:"flex", flexDirection:"column", gap: 11,
        transition:"all 0.15s",
      }}
    >
      {/* Top row: checkbox + logo + role/company + AUTO badge */}
      <div style={{display:"flex", gap: 10, alignItems:"flex-start"}}>
        {/* Reveal-on-hover checkbox */}
        <button
          onClick={(e)=>{ e.stopPropagation(); onSelect(); }}
          title="Select"
          style={{
            width: 18, height: 18, borderRadius: 5, marginTop: 7,
            border: `1.5px solid ${isSelected ? gT.ink : "rgba(2,47,54,0.25)"}`,
            background: isSelected ? gT.ink : "#fff",
            opacity: showCheckbox ? 1 : 0, transition:"opacity 0.12s",
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", color:"#fff", padding: 0, flexShrink: 0,
          }}>
          {isSelected && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </button>

        <div style={{width: 34, height: 34, borderRadius: 8, background: job.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 14, flexShrink: 0, fontFamily: gFD}}>{job.logo}</div>

        <div style={{flex:1, minWidth: 0, paddingTop: 1}}>
          <div style={{fontSize: 13.5, fontWeight: 700, color: gT.ink, lineHeight: 1.25, display:"-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>{job.role}</div>
          <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 600, lineHeight: 1.25, marginTop: 1, display:"flex", gap: 6, alignItems:"center"}}>
            <span>{job.co}</span>
            {job.match >= 90 && <span style={{background: gT.cyan, color: gT.ink, fontWeight: 800, padding:"1px 5px", borderRadius: 99, fontSize: 9.5, letterSpacing:"0.04em"}}>{job.match}%</span>}
          </div>
        </div>

        {job.status === "auto-applied" && !job.outcome && (
          <span title="Sprout auto-applied" style={{fontSize: 9.5, fontWeight: 800, padding:"2px 6px", borderRadius: 99, background: gT.flame, color:"#fff", letterSpacing:"0.04em", flexShrink: 0, marginTop: 4}}>AUTO</span>
        )}
        {job.outcome === "selected" && (
          <span title="You were selected" style={{fontSize: 9.5, fontWeight: 800, padding:"2px 7px", borderRadius: 99, background: gT.mintInk, color:"#fff", letterSpacing:"0.04em", flexShrink: 0, marginTop: 4}}>✓ SELECTED</span>
        )}
        {job.outcome === "rejected" && (
          <span title="Not selected" style={{fontSize: 9.5, fontWeight: 800, padding:"2px 7px", borderRadius: 99, background: "rgba(2,47,54,0.12)", color: gT.muted, letterSpacing:"0.04em", flexShrink: 0, marginTop: 4}}>NOT SELECTED</span>
        )}
      </div>

      {/* Relevance feedback badge — trains the auto-apply agent */}
      {job.relevance === "down" && (
        <div style={{display:"flex", alignItems:"center", gap: 6, fontSize: 10.5, fontWeight: 700, color: gT.muted, background:"rgba(2,47,54,0.05)", borderRadius: 8, padding:"5px 9px"}}>
          <IcoThumbDown filled={true}/> Marked not relevant · won't auto-apply to these
        </div>
      )}
      {job.relevance === "up" && (
        <div style={{display:"flex", alignItems:"center", gap: 6, fontSize: 10.5, fontWeight: 700, color: gT.mintInk, background:"rgba(46,160,103,0.10)", borderRadius: 8, padding:"5px 9px"}}>
          <IcoThumbUp filled={true}/> More roles like this
        </div>
      )}

      {/* Saved column: finish-application primary action (review mode) or scheduled badge (auto mode) */}
      {stage.id === "saved" ? (
        <div style={{display:"flex", flexDirection:"column", gap: 6}}>
          {isAuto ? (
            <div style={{
              background: gT.cream, color: gT.ink, fontWeight: 700, fontSize: 12.5,
              border:`1px dashed ${gT.flame}`, padding:"7px 12px",
              borderRadius: 999,
              display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6, fontFamily: gFB,
            }}>
              <span style={{width: 6, height: 6, borderRadius:"50%", background: gT.flame, animation:"sprPulse 1.6s infinite"}}/>
              Sending in ~{Math.max(1, Math.round(Math.random()*9))}m
            </div>
          ) : (
            <button
              onClick={(e)=>{ e.stopPropagation(); d({type:"OPEN_REVIEW", jobId: job.id}); }}
              style={{
                background: gT.ink, color:"#fff", fontWeight: 700, fontSize: 12.5,
                border:"none", padding:"8px 12px",
                borderRadius: 999, cursor:"pointer",
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6, fontFamily: gFB,
              }}>
              {job.oneTap ? <>⚡ Send in 1 tap</> : <>Review &amp; approve →</>}
            </button>
          )}
          <div style={{fontSize: 10.5, color: gT.muted, fontWeight: 600, display:"flex", justifyContent:"space-between"}}>
            <span>{isAuto ? `Drafted ${job.queuedAt || "recently"}` : `Sprout drafted ${job.queuedAt || "recently"}`}</span>
            <span style={{color: isAuto ? gT.muted : gT.flame, fontWeight: 700}}>{isAuto ? "Auto" : (job.oneTap ? "Ready" : "10 Qs")}</span>
          </div>
        </div>
      ) : (
        /* Status strip */
        <div style={{padding:"7px 10px", borderRadius: 9, background: gT.cream}}>
          <div style={{fontSize: 12.5, color: strip.color, fontWeight: 700, lineHeight: 1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{strip.lead}</div>
          {strip.sub && <div style={{fontSize: 11, color: gT.muted, fontWeight: 600, marginTop: 2, lineHeight: 1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{strip.sub}</div>}
        </div>
      )}

      {/* Footer: thumbs on the left · move/delete/heart on the right (reveal on hover) */}
      <div style={{display:"flex", alignItems:"center", gap: 4, minHeight: 26, marginTop: -2}}>
        {/* Relevance thumbs — ALWAYS visible (quick triage trains auto-apply) */}
        <div style={{display:"flex", gap: 2, alignItems:"center"}}>
          <QuickAction title="Relevant — show me more like this" active={job.relevance==="up"} activeColor={gT.mintInk} onClick={()=>d({type:"SET_RELEVANCE", jobId: job.id, value:"up"})}><IcoThumbUp filled={job.relevance==="up"}/></QuickAction>
          <QuickAction title="Not relevant — don't auto-apply to roles like this" active={job.relevance==="down"} onClick={()=>d({type:"SET_RELEVANCE", jobId: job.id, value:"down"})}><IcoThumbDown filled={job.relevance==="down"}/></QuickAction>
        </div>

        <div style={{flex: 1}}/>

        {/* Other actions — reveal on hover */}
        <div style={{display:"flex", gap: 2, alignItems:"center", opacity: showActions || moveAnchor ? 1 : 0, transition:"opacity 0.12s", pointerEvents: (showActions || moveAnchor) ? "auto" : "none"}}>
          <QuickAction title="Move / update status" active={!!moveAnchor} onClick={(e)=>{ const r = e.currentTarget.getBoundingClientRect(); setMoveAnchor(a => a ? null : r); }}><IcoMove/></QuickAction>
          {moveAnchor && (
            <MoveMenu job={job} stage={stage} anchor={moveAnchor} onClose={()=>setMoveAnchor(null)} onMove={(st)=>{ d({type:"MOVE_STAGE", jobId: job.id, stage: st}); setMoveAnchor(null); }}/>
          )}
          <QuickAction title="Delete" danger onClick={()=>d({type:"DELETE_JOB", jobId: job.id})}><IcoTrash/></QuickAction>
        </div>

        {/* Heart — always visible if favorited; reveal on hover otherwise */}
        <QuickAction
          title={job.favorited ? "Unfavorite" : "Favorite"}
          active={job.favorited}
          iconActive
          activeColor={gT.flame}
          onClick={()=>d({type:"TOGGLE_FAV", jobId: job.id})}
        >
          <span style={{opacity: showFav ? 1 : 0, transition:"opacity 0.12s"}}><IcoHeart filled={job.favorited}/></span>
        </QuickAction>
      </div>
    </div>
  );
}

function EmptyColState({ stage }) {
  const messages = {
    saved: { ic:"🌱", t:"Nothing saved right now", s:"Sprout will drop fresh drafts here as they come in." },
    applied: { ic:"📤", t:"Nothing's been sent yet", s:"Approve a draft from the home tab to send your first." },
    replied: { ic:"💬", t:"No replies yet", s:"Sprout pings you the second a recruiter writes back." },
    interviewing: { ic:"🎙", t:"No active loops", s:"Soon. Your reply rate is up this week." },
    offer: { ic:"✨", t:"No offers yet", s:"When you get one, I'll help you negotiate." },
  };
  const m = messages[stage.id];
  return (
    <div style={{
      background:"rgba(255,255,255,0.55)", borderRadius: 12, padding: "22px 14px",
      border:`1px dashed ${gT.hairline}`, textAlign:"center",
    }}>
      <div style={{fontSize: 22, marginBottom: 6}}>{m.ic}</div>
      <div style={{fontSize: 12.5, fontWeight: 700, color: gT.ink}}>{m.t}</div>
      <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 600, marginTop: 3, lineHeight: 1.4}}>{m.s}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MOVE MENU — dropdown from the move arrow to update an application's status
// ─────────────────────────────────────────────────────────────────────
function MoveMenu({ job, stage, anchor, onClose, onMove }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", onDoc);
    const onScroll = () => onClose();
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", onDoc); window.removeEventListener("scroll", onScroll, true); };
  }, [onClose]);

  const items = [
    { st:"replied",      ic:"💬", label:"Replied",      tint: gT.flame },
    { st:"interviewing", ic:"🎙", label:"Interviewing",  tint: gT.lilacInk },
    { st:"offer",        ic:"✦",  label:"Offer",         tint: gT.mintInk },
    { divider:true },
    { st:"selected",     ic:"✅", label:"Selected",      tint: gT.mintInk },
    { st:"rejected",     ic:"🚫", label:"Not selected",  tint: gT.muted },
  ];

  // Position fixed off the trigger rect so it escapes the column's overflow clipping
  const MENU_W = 188, MENU_H = 252, GAP = 6;
  const a = anchor || { left: 0, right: 0, top: 0, bottom: 0 };
  let left = Math.max(8, Math.min(a.right - MENU_W, window.innerWidth - MENU_W - 8));
  const flipUp = a.bottom + GAP + MENU_H > window.innerHeight;
  const top = flipUp ? Math.max(8, a.top - GAP - MENU_H) : a.bottom + GAP;

  const menu = (
    <div ref={ref} onClick={(e)=>e.stopPropagation()} style={{
      position:"fixed", top, left, zIndex: 9999,
      width: MENU_W, background:"#fff", borderRadius: 12,
      border:`1px solid ${gT.hairline}`, boxShadow:"0 16px 40px rgba(2,47,54,0.18)",
      padding: 6, animation:"sprFadeUp 0.16s ease-out",
    }}>
      <div style={{fontSize: 10, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", padding:"4px 8px 6px"}}>MOVE TO</div>
      {items.map((it, i) => it.divider ? (
        <div key={i} style={{height: 1, background: gT.hairline, margin:"5px 4px"}}/>
      ) : (
        <button key={it.st} onClick={()=>onMove(it.st)} disabled={stage.id === it.st}
          style={{
            display:"flex", alignItems:"center", gap: 9, width:"100%",
            padding:"8px 8px", borderRadius: 8, cursor: stage.id === it.st ? "default" : "pointer",
            background:"transparent", border:"none", textAlign:"left",
            fontSize: 13, fontWeight: 600, color: stage.id === it.st ? gT.muted : gT.ink,
            opacity: stage.id === it.st ? 0.5 : 1, fontFamily: gFB,
          }}
          onMouseEnter={e=>{ if (stage.id !== it.st) e.currentTarget.style.background = gT.cream; }}
          onMouseLeave={e=>e.currentTarget.style.background = "transparent"}>
          <span style={{width: 18, textAlign:"center"}}>{it.ic}</span>
          <span style={{flex: 1}}>{it.label}</span>
          {stage.id === it.st && <span style={{fontSize: 10, color: gT.muted, fontWeight: 700}}>now</span>}
        </button>
      ))}
    </div>
  );
  return ReactDOM.createPortal(menu, document.body);
}

// ─────────────────────────────────────────────────────────────────────
// RELEVANCE TOAST — confirms thumbs up/down fed back to the agent
// ─────────────────────────────────────────────────────────────────────
function RelevanceToast() {
  const { s, d } = gUseStore();
  const msg = s.params.relToast;
  React.useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => d({type:"CLEAR_REL_TOAST"}), 3400);
    return () => clearTimeout(t);
  }, [s.params.relToastAt]);
  if (!msg) return null;
  const positive = /more roles|Noted/i.test(msg);
  return (
    <div style={{
      position:"absolute", bottom: 22, left:"50%", transform:"translateX(-50%)", zIndex: 80,
      background: gT.ink, color:"#fff", borderRadius: 14, padding:"12px 18px",
      display:"flex", alignItems:"center", gap: 11, maxWidth: 460,
      boxShadow:"0 16px 40px rgba(2,47,54,0.28)", animation:"sprBob 0.25s ease-out",
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: positive ? gT.mintInk : gT.flame, color:"#fff",
        display:"inline-flex", alignItems:"center", justifyContent:"center",
      }}>{positive ? <IcoThumbUp filled={true}/> : <IcoThumbDown filled={true}/>}</span>
      <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.35}}>{msg}</div>
      <button onClick={()=>d({type:"CLEAR_REL_TOAST"})} style={{color:"#fff", opacity: 0.6, fontSize: 16, fontWeight: 700, cursor:"pointer", padding:"0 2px", background:"none", border:"none", flexShrink: 0}}>✕</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// JOB DETAIL MODAL — opens on "View"; shows the role, match, how it was
// applied, and a full status history timeline.
// ─────────────────────────────────────────────────────────────────────
function JobDetailModal() {
  const { s, d } = gUseStore();
  const job = s.jobs.find(j => j.id === s.params.detailJobId);
  const [tab, setTab] = React.useState("overview");
  if (!job) return null;

  // Build a timeline: real history entries + derived defaults from job state
  const baseTimeline = (() => {
    const t = [];
    if (job.outcome === "selected") t.push({ ic:"✅", txt:"You were selected", sub:"Congrats — Sprout can help you negotiate", color: gT.mintInk });
    if (job.outcome === "rejected") t.push({ ic:"🚫", txt:"Not selected this time", sub:"Sprout will find more like this", color: gT.muted });
    if (job.replyStatus === "offer" && job.outcome !== "selected") t.push({ ic:"💰", txt: job.offerAmount || "Offer received", sub: job.deadline || "Awaiting your decision", color: gT.mintInk });
    if (job.replyStatus === "interviewing") t.push({ ic:"🎙", txt: job.stage || "Interview scheduled", sub: job.stageDate || "Active loop", color: gT.lilacInk });
    if (job.replyStatus === "reply") t.push({ ic:"💬", txt: job.replyText || "Recruiter replied", sub: job.recruiter ? `via ${job.recruiter}` : "Check your inbox", color: gT.flame });
    if (job.replyStatus === "viewed") t.push({ ic:"👀", txt:"Hiring manager viewed your application", sub:"Good sign", color: gT.inkSoft });
    t.push({ ic:"📤", txt:"Application submitted", sub: `${job.appliedAt || "recently"} · Sprout sent it in your voice`, color: gT.ink });
    t.push({ ic:"✏️", txt:"Sprout drafted answers", sub:"10 questions · auto-filled from your profile", color: gT.muted });
    t.push({ ic:"🎯", txt:`Matched ${job.match}% to your profile`, sub:"Found in your search feed", color: gT.cyanInk });
    return t;
  })();
  const timeline = [...(job.history || []).map(h => ({ ic:"•", txt: h.txt, sub: h.at, color: gT.ink })), ...baseTimeline];

  return (
    <div onClick={()=>d({type:"CLOSE_DETAIL"})} style={{position:"fixed", inset: 0, zIndex: 95, background:"rgba(20,18,16,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding: 24, animation:"sprFadeUp 0.2s ease-out"}}>
      <div onClick={(e)=>e.stopPropagation()} style={{background:"#fff", borderRadius: 22, width: 540, maxWidth:"100%", maxHeight:"88vh", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 30px 80px rgba(0,0,0,0.3)"}}>
        {/* Header */}
        <div style={{padding:"20px 24px", borderBottom:`1px solid ${gT.hairline}`, display:"flex", alignItems:"flex-start", gap: 14}}>
          <div style={{width: 48, height: 48, borderRadius: 12, background: job.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 20, fontFamily: gFD, flexShrink: 0}}>{job.logo}</div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 20, color: gT.ink, letterSpacing:"-0.02em", lineHeight: 1.15}}>{job.role}</div>
            <div style={{fontSize: 13, color: gT.muted, fontWeight: 600, marginTop: 2}}>{job.co} · {job.loc} · {job.comp}</div>
          </div>
          <button onClick={()=>d({type:"CLOSE_DETAIL"})} style={{fontSize: 20, color: gT.muted, fontWeight: 700, cursor:"pointer", padding:"0 4px"}}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{display:"flex", gap: 4, padding:"10px 16px 0", borderBottom:`1px solid ${gT.hairline}`}}>
          {[["overview","Overview"],["history","History"],["answers","Your answers"]].map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)} style={{
              padding:"8px 14px", border:"none", cursor:"pointer", background:"transparent",
              fontSize: 13.5, fontWeight: 700, fontFamily: gFB,
              color: tab === id ? gT.ink : gT.muted,
              borderBottom: tab === id ? `2px solid ${gT.ink}` : "2px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{flex: 1, overflow:"auto", padding: 22}}>
          {tab === "overview" && (
            <div style={{display:"flex", flexDirection:"column", gap: 16}}>
              <div style={{display:"flex", gap: 10}}>
                <div style={{flex: 1, background: gT.cream, borderRadius: 12, padding:"12px 14px"}}>
                  <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, color: gT.ink}}>{job.match}%</div>
                  <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 700}}>profile match</div>
                </div>
                <div style={{flex: 1, background: gT.cream, borderRadius: 12, padding:"12px 14px"}}>
                  <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, color: gT.ink}}>{job.comp?.split("–")[0] || "—"}</div>
                  <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 700}}>comp range</div>
                </div>
                <div style={{flex: 1, background: gT.cream, borderRadius: 12, padding:"12px 14px"}}>
                  <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, color: gT.ink}}>{job.posted || "—"}</div>
                  <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 700}}>posted</div>
                </div>
              </div>
              <div>
                <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 8}}>ABOUT THE ROLE</div>
                <div style={{fontSize: 13.5, color: gT.ink, fontWeight: 500, lineHeight: 1.55}}>
                  {job.co} is hiring a {job.role} to {job.match >= 90 ? "lead" : "support"} product direction across their core surface. You'd own end-to-end design — research through ship — partnering closely with PM and eng. {job.loc.includes("Remote") ? "Fully remote." : "Hybrid in " + job.loc + "."}
                </div>
              </div>
              <div>
                <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 8}}>WHY SPROUT MATCHED YOU</div>
                <div style={{display:"flex", flexDirection:"column", gap: 6}}>
                  {[
                    `${job.match}% overall fit — top of your feed`,
                    "Tools overlap: Figma + your design-systems work",
                    `Comp ${job.comp} clears your $180k floor`,
                  ].map((r,i) => (
                    <div key={i} style={{display:"flex", gap: 8, fontSize: 13, fontWeight: 600, color: gT.ink, alignItems:"center"}}>
                      <span style={{color: gT.mintInk}}>✓</span> {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div style={{display:"flex", flexDirection:"column"}}>
              <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 14}}>APPLICATION TIMELINE</div>
              {timeline.map((e, i) => (
                <div key={i} style={{display:"flex", gap: 12}}>
                  {/* rail */}
                  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <div style={{width: 28, height: 28, borderRadius:"50%", background: i === 0 ? gT.ink : gT.cream, color: i === 0 ? "#fff" : gT.ink, display:"grid", placeItems:"center", fontSize: 13, flexShrink: 0, border: i === 0 ? "none" : `1px solid ${gT.hairline}`}}>{e.ic}</div>
                    {i < timeline.length - 1 && <div style={{width: 2, flex: 1, minHeight: 18, background: gT.hairline}}/>}
                  </div>
                  {/* content */}
                  <div style={{paddingBottom: 16, flex: 1}}>
                    <div style={{fontSize: 13.5, fontWeight: 700, color: e.color || gT.ink, lineHeight: 1.3}}>{e.txt}</div>
                    {e.sub && <div style={{fontSize: 12, color: gT.muted, fontWeight: 600, marginTop: 2}}>{e.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "answers" && (
            <div style={{display:"flex", flexDirection:"column", gap: 12}}>
              <div style={{fontSize: 13.5, color: gT.muted, fontWeight: 600, lineHeight: 1.5}}>
                See and edit every answer Sprout submitted — changes train Sprout for future apps.
              </div>
              <button onClick={()=>{ d({type:"CLOSE_DETAIL"}); d({type:"OPEN_SUBMITTED", jobId: job.id}); }} style={{
                padding:"12px 18px", borderRadius: 12, background: gT.ink, color:"#fff", border:"none",
                fontSize: 14, fontWeight: 700, cursor:"pointer", fontFamily: gFB, alignSelf:"flex-start",
              }}>
                Open all answers →
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{padding: 16, borderTop:`1px solid ${gT.hairline}`, display:"flex", gap: 8}}>
          <button onClick={()=>d({type:"CLOSE_DETAIL"})} style={{flex: 1, padding:"11px", borderRadius: 12, background:"#fff", border:`1.5px solid ${gT.hairline}`, fontSize: 13.5, fontWeight: 700, color: gT.ink, cursor:"pointer", fontFamily: gFB}}>Close</button>
          <button style={{flex: 1, padding:"11px", borderRadius: 12, background: gT.cream, border:"none", fontSize: 13.5, fontWeight: 700, color: gT.ink, cursor:"pointer", fontFamily: gFB, display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 6}}>
            <IcoOut/> View job posting
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// COPILOT — single agent configuration (always one Sprout)
// Kept deliberately simple: edit the basics inline, set targets + guardrails,
// pick a mode. Edits collect as drafts; one sticky Save bar commits them all.
// ─────────────────────────────────────────────────────────────────────
const COPILOT_INITIAL = {
  mode_role: "Senior Product Designer",
  mode_salary: "$180k+",
  mode_loc: "Remote, US",
  mode_yrs: "6",
  mode_notice: "4 weeks",
  mode_auth: "Yes",
  mode_start: "June 30",
  mode_portfolio: "vinodh.design",
  targets: ["Series A–C","Design-led","≤500 people","B2C OK","Consumer SaaS"],
  guardrails: { match: true, salary: true, onsite: true, manyq: false, essay: true },
};

function PageCopilot() {
  const { s, d } = gUseStore();
  const [draft, setDraft]   = React.useState(COPILOT_INITIAL);
  const [saved, setSaved]   = React.useState(COPILOT_INITIAL);
  const [editing, setEditing] = React.useState(null);   // facts field-id being edited
  const [toast, setToast]     = React.useState("");

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  function set(k, v){ setDraft(p => ({...p, [k]: v})); }
  function save(){
    setSaved(draft); setEditing(null);
    setToast("✓ Sprout updated. I'll use these for the next batch.");
    setTimeout(()=>setToast(""), 2600);
  }
  function discard(){ setDraft(saved); setEditing(null); }

  return (
    <div style={{flex: 1, overflow:"auto", position:"relative"}}>
      <GHead title="Sprout" sub="Your job-search copilot. Update what I know and how much I do." />

      <div style={{padding:"0 32px 120px", display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 18}}>
        {/* LEFT column */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          {/* Mode card */}
          <div style={{background:"#fff", borderRadius: 18, padding: 22, border:`1px solid ${gT.hairline}`}}>
            <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 6}}>APPLICATION MODE</div>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 22, color: gT.ink, letterSpacing:"-0.02em", marginBottom: 6}}>
              How much do you want me to handle?
            </div>
            <div style={{fontSize: 13.5, color: gT.muted, fontWeight: 600, marginBottom: 16, lineHeight: 1.45}}>
              Mode changes save immediately — it's a switch, not a setting.
            </div>
            <div style={{display:"flex", gap: 12}}>
              <ModeBigPick selected={s.mode === "review"} onClick={()=>d({type:"SET_MODE", mode:"review"})}
                tint={gT.butter} icon="✋" title="Review before send" desc="I draft, you approve. ~90s per app."/>
              <ModeBigPick selected={s.mode === "auto"} onClick={()=>d({type:"SET_MODE", mode:"auto"})}
                tint={gT.cyan} icon="🚀" title="Full Auto Apply" desc="I find, fill, and submit. You get a recap."/>
            </div>
          </div>

          {/* What I know */}
          <div style={{background:"#fff", borderRadius: 18, padding: 22, border:`1px solid ${gT.hairline}`, flex: 1, display:"flex", flexDirection:"column"}}>
            <div style={{marginBottom: 14}}>
              <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em"}}>WHAT I KNOW ABOUT YOU</div>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 20, color: gT.ink, letterSpacing:"-0.02em", marginTop: 4}}>The basics</div>
              <div style={{fontSize: 12, color: gT.muted, fontWeight: 600, marginTop: 4, lineHeight: 1.4}}>Click any value to edit · changes are queued until you save</div>
            </div>
            <div style={{flex: 1, display:"grid", gridTemplateColumns:"1fr", alignContent:"space-between", gap: "2px 0"}}>
              {[
                ["mode_role","Role","Senior Product Designer"],
                ["mode_salary","Salary floor","$180k+"],
                ["mode_loc","Location","Remote, US"],
                ["mode_yrs","Years experience","6"],
                ["mode_notice","Notice","4 weeks"],
                ["mode_auth","Authorized in US","Yes"],
                ["mode_start","Available start","June 30"],
                ["mode_portfolio","Portfolio","vinodh.design"],
              ].map(([k,label]) => (
                <InlineFact key={k} fieldKey={k} label={label}
                  value={draft[k]} savedValue={saved[k]}
                  editing={editing === k}
                  onStart={()=>setEditing(k)}
                  onCancel={()=>{ set(k, saved[k]); setEditing(null); }}
                  onCommit={(v)=>{ set(k, v); setEditing(null); }}/>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT column */}
        <div style={{display:"flex", flexDirection:"column", gap: 16}}>
          {/* Sprout card — singular by design, no "+ New" affordance */}
          <div style={{background: gT.ink, color:"#fff", borderRadius: 22, padding: 22, position:"relative", overflow:"hidden", textAlign:"center"}}>
            <div style={{position:"absolute", top:-40, right:-40, width: 200, height: 200, borderRadius:"50%", background: gT.cyan, opacity: 0.18, filter:"blur(30px)"}}/>
            <div style={{position:"relative"}}>
              <div style={{display:"flex", justifyContent:"center", padding:"4px 0 12px"}}>
                <img src="assets/bloom-mascot-sm.svg" alt="Sprout" style={{width: 120, height:"auto", display:"block"}}/>
              </div>
              <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 24, letterSpacing:"-0.02em"}}>Sprout</div>
              <div style={{fontSize: 12, opacity: 0.6, fontWeight: 600, marginTop: 2}}>Trained on your story · active since day 1</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 8, marginTop: 18}}>
                <Stat dark v="74" l="apps sent" accent={gT.cyan}/>
                <Stat dark v="11" l="replies"   accent={gT.flame}/>
                <Stat dark v="42h" l="saved"/>
              </div>
            </div>
          </div>

          {/* Targets */}
          <div style={{background:"#fff", borderRadius: 18, padding: 22, border:`1px solid ${gT.hairline}`}}>
            <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 4}}>WHAT TO LOOK FOR</div>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 18, color: gT.ink, letterSpacing:"-0.02em", marginBottom: 4}}>Targets</div>
            <div style={{fontSize: 12, color: gT.muted, fontWeight: 600, marginBottom: 12}}>Tap to toggle</div>
            <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
              {["Series A–C","Design-led","≤500 people","B2C OK","Consumer SaaS","No agencies","No finance"].map(v => {
                const on = draft.targets.includes(v);
                return (
                  <GSC key={v} fill={on ? gT.cyan : "#fff"} ink={gT.ink} size="sm"
                    style={on ? {cursor:"pointer"} : {border:`1px solid ${gT.hairline}`, cursor:"pointer"}}
                    onClick={()=>{
                      const next = on ? draft.targets.filter(x=>x!==v) : [...draft.targets, v];
                      set("targets", next);
                    }}>{v}</GSC>
                );
              })}
            </div>
          </div>

          {/* Guardrails */}
          <div style={{background:"#fff", borderRadius: 18, padding: 22, border:`1px solid ${gT.hairline}`}}>
            <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em", marginBottom: 4}}>GUARDRAILS</div>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 18, color: gT.ink, letterSpacing:"-0.02em", marginBottom: 12}}>When to ping you</div>
            {[
              ["match","Match below 75%"],
              ["salary","Salary below $180k"],
              ["onsite","Onsite required"],
              ["manyq","More than 10 questions"],
              ["essay","Custom essay required"],
            ].map(([k,label],i,arr) => {
              const on = draft.guardrails[k];
              return (
                <div key={k} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${gT.hairline}` : "none"}}>
                  <span style={{fontSize: 13.5, color: gT.ink, fontWeight: 500}}>{label}</span>
                  <div onClick={()=>set("guardrails", {...draft.guardrails, [k]: !on})}
                       style={{width: 36, height: 20, borderRadius: 999, background: on ? gT.cyanInk : gT.hairline, position:"relative", cursor:"pointer", transition:"background 0.15s"}}>
                    <div style={{position:"absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius:"50%", background:"#fff", transition:"left 0.15s"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Save Bar — appears only when there are unsaved edits */}
      {dirty && (
        <div style={{
          position:"sticky", bottom: 16, marginLeft: 32, marginRight: 32,
          background: gT.ink, color:"#fff",
          borderRadius: 16, padding:"14px 18px",
          display:"flex", alignItems:"center", gap: 14,
          boxShadow:"0 12px 36px rgba(0,0,0,0.18)",
          animation:"sprFadeUp 0.25s ease-out",
        }}>
          <GM size={36} cap={gT.cyan} mood="curious"/>
          <div style={{flex: 1}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 15, letterSpacing:"-0.01em"}}>You have unsaved changes</div>
            <div style={{fontSize: 12, opacity: 0.7, fontWeight: 600, marginTop: 2}}>I'll start using these on your next application.</div>
          </div>
          <button onClick={discard} style={{
            background:"transparent", color:"#fff", border:"1px solid rgba(255,255,255,0.3)",
            padding:"9px 14px", borderRadius: 999, cursor:"pointer",
            fontSize: 13, fontWeight: 700, fontFamily: gFB,
          }}>Discard</button>
          <button onClick={save} style={{
            background: gT.cyan, color: gT.ink, border:"none",
            padding:"10px 18px", borderRadius: 999, cursor:"pointer",
            fontSize: 13.5, fontWeight: 800, fontFamily: gFB,
          }}>Save changes</button>
        </div>
      )}

      {/* Toast confirmation */}
      {toast && (
        <div style={{
          position:"fixed", bottom: 100, left:"50%", transform:"translateX(-50%)",
          background: gT.mintInk, color:"#fff",
          padding:"10px 18px", borderRadius: 999,
          fontSize: 13, fontWeight: 700, fontFamily: gFB,
          boxShadow:"0 8px 24px rgba(0,0,0,0.15)", zIndex: 50,
        }}>{toast}</div>
      )}

      <style>{`
        @keyframes sprFadeUp { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}

// Inline-editable fact row. Read mode = label + value + pencil; edit mode = input + check/x.
function InlineFact({ fieldKey, label, value, savedValue, editing, onStart, onCancel, onCommit }) {
  const [v, setV] = React.useState(value);
  React.useEffect(()=>setV(value), [value, editing]);
  const isDirty = value !== savedValue;
  if (editing) {
    return (
      <div style={{display:"flex", alignItems:"center", gap: 6, padding:"6px 0", borderBottom: `1.5px solid ${gT.cyanInk}`}}>
        <span style={{fontSize: 12.5, color: gT.muted, fontWeight: 600, flex:"0 0 110px"}}>{label}</span>
        <input autoFocus value={v} onChange={e=>setV(e.target.value)}
          onKeyDown={e=>{ if (e.key === "Enter") onCommit(v); if (e.key === "Escape") onCancel(); }}
          style={{flex: 1, border:"none", outline:"none", background:"transparent", fontSize: 13, fontWeight: 700, color: gT.ink, fontFamily: gFB}}/>
        <button onClick={()=>onCommit(v)} style={{padding:"2px 8px", background: gT.ink, color:"#fff", borderRadius: 6, fontSize: 11, fontWeight: 800, cursor:"pointer"}}>OK</button>
        <button onClick={onCancel} style={{padding:"2px 6px", color: gT.muted, fontSize: 13, fontWeight: 700, cursor:"pointer"}}>✕</button>
      </div>
    );
  }
  return (
    <div onClick={onStart} style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"12px 0", borderBottom: `1px solid ${gT.hairline}`, cursor:"pointer",
    }}>
      <span style={{fontSize: 13, color: gT.muted, fontWeight: 600}}>{label}</span>
      <span style={{fontSize: 14, fontWeight: 700, color: gT.ink, display:"flex", alignItems:"center", gap: 6}}>
        {value}
        {isDirty
          ? <span style={{fontSize: 10, color: gT.flame, fontWeight: 800, padding:"1px 6px", background:`${gT.flame}22`, borderRadius: 999}}>EDITED</span>
          : <span style={{opacity: 0.35, fontSize: 11}}>✎</span>}
      </span>
    </div>
  );
}

// Teach-me-more — natural-language way to add NEW facts Sprout didn't ask about
function TeachPanel({ onClose, onTaught }) {
  const [draft, setDraft] = React.useState("");
  const prompts = [
    "I prefer roles with a 4-day work week",
    "I won't work for companies in defense",
    "My dream company is Linear, Vercel, or Anthropic",
    "I have a non-compete that expires Aug 1",
    "I speak Spanish and Telugu",
  ];
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset: 0, background:"rgba(0,0,0,0.42)",
      display:"flex", justifyContent:"flex-end", zIndex: 80, animation:"sprFadeUp 0.2s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width: 460, maxWidth:"100%", background: gT.cream, height:"100%",
        display:"flex", flexDirection:"column",
        boxShadow:"-12px 0 40px rgba(0,0,0,0.18)",
      }}>
        {/* Header */}
        <div style={{padding:"18px 22px", borderBottom:`1px solid ${gT.hairline}`, display:"flex", alignItems:"center", gap: 12, background:"#fff"}}>
          <GM size={44} cap={gT.cyan} mood="curious"/>
          <div style={{flex: 1}}>
            <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 18, color: gT.ink, letterSpacing:"-0.02em"}}>Teach me about you</div>
            <div style={{fontSize: 12, color: gT.muted, fontWeight: 600}}>Tell me anything — preferences, deal-breakers, stories.</div>
          </div>
          <button onClick={onClose} style={{fontSize: 20, color: gT.muted, fontWeight: 700, cursor:"pointer"}}>✕</button>
        </div>

        {/* Body */}
        <div style={{flex: 1, overflow:"auto", padding: 22, display:"flex", flexDirection:"column", gap: 14}}>
          <div style={{background:"#fff", borderRadius: 14, padding: 14, border:`1px solid ${gT.hairline}`}}>
            <div style={{fontSize: 13, color: gT.ink, fontWeight: 500, lineHeight: 1.45}}>
              The basics card covers the questions every ATS asks. Use this for things I'd never know to ask — your dealbreakers, dream companies, side context.
            </div>
          </div>

          <div style={{fontSize: 11, fontWeight: 800, color: gT.muted, letterSpacing:"0.06em"}}>TRY ONE OF THESE</div>
          <div style={{display:"flex", flexDirection:"column", gap: 6}}>
            {prompts.map(p => (
              <button key={p} onClick={()=>setDraft(p)} style={{
                background:"#fff", border:`1px solid ${gT.hairline}`,
                padding:"10px 14px", borderRadius: 12, cursor:"pointer",
                textAlign:"left", fontSize: 13, fontWeight: 600, color: gT.ink,
                fontFamily: gFB,
              }}>+ {p}</button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div style={{padding: 16, background:"#fff", borderTop:`1px solid ${gT.hairline}`}}>
          <textarea value={draft} onChange={e=>setDraft(e.target.value)}
            placeholder="Tell Sprout something new about you…"
            style={{width:"100%", minHeight: 80, padding: 12, borderRadius: 12, border:`1.5px solid ${gT.hairline}`,
                    fontSize: 13.5, fontFamily: gFB, color: gT.ink, outline:"none", resize:"none"}}/>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop: 10}}>
            <div style={{fontSize: 11.5, color: gT.muted, fontWeight: 600}}>Saves the moment you tap Teach — no separate save.</div>
            <button onClick={()=>draft && onTaught(draft)}
              disabled={!draft}
              style={{
                background: draft ? gT.ink : gT.hairline, color: draft ? "#fff" : gT.muted,
                border:"none", padding:"10px 18px", borderRadius: 999,
                cursor: draft ? "pointer" : "not-allowed",
                fontSize: 13.5, fontWeight: 800, fontFamily: gFB,
              }}>Teach Sprout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModeBigPick({ selected, onClick, tint, icon, title, desc }) {
  return (
    <div onClick={onClick} style={{
      flex: 1, background: selected ? tint : "#fff", borderRadius: 14, padding: 14,
      border: selected ? `2px solid ${gT.ink}` : `1.5px solid ${gT.hairline}`,
      cursor:"pointer", position:"relative",
    }}>
      <div style={{fontSize: 20, marginBottom: 6}}>{icon}</div>
      <div style={{fontFamily: gFD, fontWeight: 700, fontSize: 15, color: gT.ink, letterSpacing:"-0.01em"}}>{title}</div>
      <div style={{fontSize: 12, color: gT.muted, fontWeight: 600, marginTop: 4, lineHeight: 1.35}}>{desc}</div>
      {selected && <div style={{position:"absolute", top: 10, right: 10, width: 18, height: 18, borderRadius:"50%", background: gT.ink, color:"#fff", display:"grid", placeItems:"center", fontSize: 11, fontWeight: 800}}>✓</div>}
    </div>
  );
}

Object.assign(window, { PageHome, PageJobs, PageApplications, PageCopilot, JobRow, Stat, BigStat, ModeBigPick, KanbanColumn, ApplicationCard, EmptyColState, InlineFact, TeachPanel, BatchApplyOverlay, MoveMenu, JobDetailModal });
