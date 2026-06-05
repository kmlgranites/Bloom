// =====================================================================
// Mode picker — Persona-style (Cruise / Co-pilot / Manual)
// + ROI moment screen + Activation success
// =====================================================================
const { sprT: mT, fontDisplay: mFD, fontBody: mFB,
        SproutMascot: MM, SprChip: MC, SprBtn: MB, SprBubble: MBu,
        SprAvatar: MA, StatTile: MST, Sparkle: MSp, LivePill: MLP } = window;

// ─────────────────────────────────────────────────────────────────────
// 4. MODE PICKER — pick your driving style
// ─────────────────────────────────────────────────────────────────────
function ModeCard({ title, sub, badge, mood, cap, fill, ink, selected, stats }) {
  return (
    <div style={{
      background: fill, borderRadius: 28, padding: "20px 20px 18px",
      border: selected ? `2.5px solid ${mT.ink}` : `2.5px solid transparent`,
      color: ink, position:"relative", overflow:"hidden",
    }}>
      {/* mascot bobbing in corner */}
      <div style={{position:"absolute", top: 14, right: 12, opacity: 0.95}}>
        <MM size={62} cap={cap} mood={mood}/>
      </div>

      <div style={{display:"inline-flex", padding:"4px 10px", borderRadius: 999, background:"rgba(2,47,54,0.08)", fontSize: 11, fontWeight: 700, color: ink, marginBottom: 12, letterSpacing:"0.02em"}}>{badge}</div>
      <div style={{fontFamily: mFD, fontWeight: 700, fontSize: 28, lineHeight: 1.05, letterSpacing:"-0.02em", maxWidth: 220, marginBottom: 6}}>{title}</div>
      <div style={{fontSize: 14, fontWeight: 500, lineHeight: 1.4, opacity: 0.78, maxWidth: 240, marginBottom: 14}}>{sub}</div>

      <div style={{display:"flex", gap: 14, paddingTop: 12, borderTop:`1.5px solid rgba(2,47,54,0.1)`}}>
        {stats.map((s,i) => (
          <div key={i}>
            <div style={{fontSize: 18, fontWeight: 700, fontFamily: mFD, letterSpacing:"-0.02em"}}>{s.v}</div>
            <div style={{fontSize: 11, fontWeight: 600, opacity: 0.7}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OB_ModePicker() {
  return (
    <div style={{height:"100%", background: mT.cream, display:"flex", flexDirection:"column", paddingTop: 60, paddingBottom: 30}}>
      {/* Header */}
      <div style={{padding: "12px 22px 8px"}}>
        <div style={{fontSize: 12, fontWeight: 700, color: mT.muted, letterSpacing:"0.06em", textTransform:"uppercase"}}>Step 5 of 5 — almost done</div>
        <div style={{fontFamily: mFD, fontWeight: 700, fontSize: 30, lineHeight: 1.05, letterSpacing:"-0.025em", color: mT.ink, marginTop: 6}}>
          How should I work?
        </div>
        <div style={{fontSize: 14.5, color: mT.inkSoft, marginTop: 6, lineHeight: 1.4, fontWeight: 500}}>
          You can change this any time. Most folks start in <b>Co‑pilot</b>.
        </div>
      </div>

      <div style={{flex:1, padding: "16px 16px 8px", display:"flex", flexDirection:"column", gap: 12, overflowY:"auto"}}>
        <ModeCard
          badge="🚀 CRUISE CONTROL"
          title="Sprout applies for me"
          sub="I apply to every great match while you sleep. You wake up to interview invites."
          mood="sleeping" cap={mT.cyan} fill={mT.cyan} ink={mT.ink}
          stats={[{v:"~12/day", l:"applications"}, {v:"0 min", l:"your time"}]}
        />
        <ModeCard
          badge="✋ CO-PILOT"
          title="Review before send"
          sub="I draft and queue. You swipe ✅ or ❌ in 10 seconds — like Tinder for jobs."
          mood="happy" cap={mT.butter} fill={mT.butter} ink={mT.ink} selected
          stats={[{v:"~8/day", l:"in your queue"}, {v:"2 min", l:"daily check-in"}]}
        />
        <ModeCard
          badge="🧠 MANUAL"
          title="Just find me roles"
          sub="I surface the best matches. You decide what to do. No auto-anything."
          mood="thinking" cap={mT.mint} fill={mT.mint} ink={mT.ink}
          stats={[{v:"~25/day", l:"matches"}, {v:"You drive", l:""}]}
        />
      </div>

      <div style={{padding: "12px 18px 4px", borderTop: `1px solid ${mT.hairline}`, background: mT.cream}}>
        <MB variant="primary" full>Activate Sprout →</MB>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 5. ACTIVATION — celebratory loader, ROI-forward
// ─────────────────────────────────────────────────────────────────────
function OB_Activating() {
  return (
    <div style={{height:"100%", background: mT.ink, color:"#fff", paddingTop: 50, paddingBottom: 50, position:"relative", overflow:"hidden", fontFamily: mFB,
      display:"flex", flexDirection:"column",
    }}>
      {/* ambient glow */}
      <div style={{position:"absolute", top: "30%", left: "50%", transform:"translate(-50%, -50%)", width: 480, height: 480, borderRadius:"50%", background: mT.cyan, opacity: 0.18, filter:"blur(60px)"}}/>

      <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap: 32, position:"relative", zIndex:1, padding:"0 28px"}}>
        {/* big mascot with halo */}
        <div style={{position:"relative", animation:"sprBob 3s ease-in-out infinite"}}>
          <div style={{position:"absolute", inset: -30, borderRadius:"50%", border: `2px solid ${mT.cyan}`, opacity: 0.4, animation:"sprRipple 2s ease-out infinite"}}/>
          <div style={{position:"absolute", inset: -60, borderRadius:"50%", border: `1.5px solid ${mT.cyan}`, opacity: 0.25, animation:"sprRipple 2s ease-out 0.5s infinite"}}/>
          <MM size={140} cap={mT.cyan} mood="working"/>
        </div>

        <div style={{textAlign:"center"}}>
          <div style={{fontSize: 11, fontWeight: 700, color: mT.cyan, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom: 10}}>● Sprout is waking up</div>
          <div style={{fontFamily: mFD, fontWeight: 700, fontSize: 30, lineHeight: 1.1, letterSpacing:"-0.025em", marginBottom: 12}}>
            Reading 12,400 open<br/>roles for you…
          </div>
          <div style={{fontSize: 15, opacity: 0.7, fontWeight: 500, lineHeight: 1.45, maxWidth: 280, margin: "0 auto"}}>
            Filtering for senior IC roles, remote, design-led teams.
          </div>
        </div>

        {/* live ticker */}
        <div style={{width:"100%", maxWidth: 320, background:"rgba(255,255,255,0.06)", borderRadius: 18, padding: 16, display:"flex", flexDirection:"column", gap: 10, border:`1px solid rgba(255,255,255,0.08)`}}>
          {[
            {label:"Reading résumé", pct: 100, done: true},
            {label:"Scanning 12,400 roles", pct: 100, done: true},
            {label:"Ranking by fit", pct: 60, done: false},
            {label:"Tailoring first drafts", pct: 0, done: false},
          ].map((s,i) => (
            <div key={i} style={{display:"flex", alignItems:"center", gap: 10, fontSize: 13.5, fontWeight: 600, opacity: s.done ? 1 : (s.pct > 0 ? 1 : 0.45)}}>
              <div style={{width: 18, height: 18, borderRadius:"50%", background: s.done ? mT.cyan : (s.pct > 0 ? "transparent" : "transparent"),
                border: s.done ? "none" : `1.5px solid rgba(255,255,255,0.4)`,
                display:"grid", placeItems:"center", color: mT.ink, fontSize: 11, fontWeight: 800,
              }}>{s.done && "✓"}</div>
              <div style={{flex:1}}>{s.label}</div>
              {s.pct > 0 && !s.done && <span style={{fontSize: 12, fontFamily: '"Inter",monospace', color: mT.cyan, fontWeight: 700}}>{s.pct}%</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"0 28px", textAlign:"center", fontSize: 13, opacity: 0.5, fontWeight: 500}}>
        First applications will be ready in ~3 minutes
      </div>
    </div>
  );
}

Object.assign(window, { ModeCard, OB_ModePicker, OB_Activating });
