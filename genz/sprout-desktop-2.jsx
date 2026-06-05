// =====================================================================
// Desktop — Mode picker, Activation, Home, Discovery, Review, Sprout panel
// =====================================================================
const { sprT: eT, fontDisplay: eFD, fontBody: eFB, fontData: eFData,
        SproutMascot: EM, SprChip: EC, SprBtn: EB, SprBubble: EBu,
        SprAvatar: EA, StatTile: EST, Sparkle: ESp, LivePill: ELP,
        DesktopFrame: EFrame, AppShell: EShell } = window;

// ─────────────────────────────────────────────────────────────────────
// SCREEN 4 — Mode picker (Cruise / Co-pilot / Manual)
// 3-up cards, full-width comparison, single CTA at bottom
// ─────────────────────────────────────────────────────────────────────
function ModeColumn({ badge, badgeColor, title, sub, mood, cap, fill, ink, selected, stats, bullets, cta }) {
  return (
    <div style={{
      flex: 1, background: fill, borderRadius: 28, padding: "26px 26px 22px",
      border: selected ? `2.5px solid ${eT.ink}` : `2.5px solid transparent`,
      color: ink, position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      transform: selected ? "translateY(-4px)" : "translateY(0)",
      boxShadow: selected ? "0 24px 60px -20px rgba(2,47,54,0.22)" : "none",
    }}>
      {selected && (
        <div style={{position:"absolute", top: 14, right: 14, padding:"4px 10px", borderRadius: 999, background: eT.ink, color:"#fff", fontSize: 11, fontWeight: 800, letterSpacing:"0.04em"}}>RECOMMENDED</div>
      )}
      <div style={{display:"flex", alignItems:"flex-start", gap: 16, marginBottom: 16}}>
        <div style={{width: 88, height: 88, borderRadius: 22, background: "rgba(2,47,54,0.08)", display:"grid", placeItems:"center", flexShrink: 0}}>
          <EM size={70} cap={cap} mood={mood}/>
        </div>
        <div style={{flex: 1, paddingTop: 4}}>
          <div style={{display:"inline-flex", padding:"4px 10px", borderRadius: 999, background: badgeColor, fontSize: 11, fontWeight: 800, color: ink, marginBottom: 8, letterSpacing:"0.03em"}}>{badge}</div>
          <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 26, lineHeight: 1.05, letterSpacing:"-0.025em"}}>{title}</div>
        </div>
      </div>
      <div style={{fontSize: 15, fontWeight: 500, lineHeight: 1.45, opacity: 0.78, marginBottom: 20}}>{sub}</div>

      <div style={{display:"flex", gap: 14, padding:"14px 0", borderTop:`1.5px solid rgba(2,47,54,0.1)`, borderBottom:`1.5px solid rgba(2,47,54,0.1)`, marginBottom: 16}}>
        {stats.map((s,i) => (
          <div key={i} style={{flex: 1}}>
            <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.025em", lineHeight: 1}}>{s.v}</div>
            <div style={{fontSize: 11, fontWeight: 700, opacity: 0.7, marginTop: 4}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{flex: 1, display:"flex", flexDirection:"column", gap: 8, marginBottom: 18}}>
        {bullets.map((b,i) => (
          <div key={i} style={{display:"flex", gap: 8, fontSize: 13.5, color: ink, fontWeight: 500, opacity: 0.85, lineHeight: 1.4}}>
            <span style={{flexShrink:0, opacity: 0.6}}>{b.icon}</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>

      <button style={{
        width:"100%", padding:"14px 16px", borderRadius: 999,
        background: selected ? eT.ink : "transparent",
        color: selected ? "#fff" : ink,
        border: selected ? "none" : `1.5px solid ${ink}`,
        fontWeight: 700, fontSize: 15, letterSpacing:"-0.01em",
      }}>{cta}</button>
    </div>
  );
}

function D_ModePicker() {
  return (
    <DesktopFrame url="bloom.app/setup" bg={eT.cream}>
      <div style={{padding:"22px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${eT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 10}}>
          <EM size={28}/>
          <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 18, letterSpacing:"-0.02em"}}>bloom</div>
        </div>
        <div style={{flex:1, maxWidth: 360, margin:"0 auto", display:"flex", alignItems:"center", gap: 12}}>
          <span style={{fontSize: 12, color: eT.muted, fontWeight: 700}}>STEP 3 OF 3</span>
          <div style={{flex:1, height: 6, background: eT.hairline, borderRadius: 99}}>
            <div style={{width:"100%", height:"100%", background: eT.ink, borderRadius: 99}}/>
          </div>
        </div>
        <button style={{fontSize: 13, color: eT.muted, fontWeight: 600}}>Save & exit</button>
      </div>

      <div style={{flex:1, padding:"40px 48px 32px", overflow:"auto", display:"flex", flexDirection:"column"}}>
        <div style={{textAlign:"center", marginBottom: 36}}>
          <div style={{fontSize: 12, fontWeight: 800, color: eT.cyanInk, letterSpacing:"0.08em", marginBottom: 10}}>● ONE LAST QUESTION</div>
          <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 44, letterSpacing:"-0.03em", color: eT.ink, lineHeight: 1.05, marginBottom: 10}}>How should I work?</div>
          <div style={{fontSize: 17, color: eT.inkSoft, fontWeight: 500, lineHeight: 1.45, maxWidth: 580, margin:"0 auto"}}>
            You can change this any time. Most folks start in <b>Co‑pilot</b> for a week, then promote me to Cruise.
          </div>
        </div>

        <div style={{display:"flex", gap: 18, alignItems:"stretch", flex: 1}}>
          <ModeColumn
            badge="🚀 CRUISE CONTROL" badgeColor="rgba(255,255,255,0.5)"
            title="Sprout applies for me"
            sub="Maximum velocity. I apply to every great match, day and night. You wake up to interview invites."
            mood="sleeping" cap={eT.cyan} fill={eT.cyan} ink={eT.ink}
            stats={[{v:"~12/day", l:"applications"}, {v:"0 min", l:"your time"}, {v:"3.4×", l:"more replies"}]}
            bullets={[
              {icon:"🌙", text:"Applies overnight while you sleep"},
              {icon:"🎯", text:"Only ≥85% fit roles — I skip the rest"},
              {icon:"✋", text:"I'll pause if a question's outside what I know"},
              {icon:"📊", text:"Daily morning recap of everything I did"},
            ]}
            cta="Set me free →"
          />
          <ModeColumn
            badge="✋ CO-PILOT" badgeColor="rgba(255,255,255,0.6)"
            title="Review before I send"
            sub="I draft and queue. You swipe ✅ or ❌ in ~10 seconds each. The right amount of control."
            mood="happy" cap={eT.butter} fill={eT.butter} ink={eT.ink} selected
            stats={[{v:"~8/day", l:"in your queue"}, {v:"2 min", l:"daily check-in"}, {v:"2.1×", l:"more replies"}]}
            bullets={[
              {icon:"📝", text:"Sprout drafts the full application"},
              {icon:"👀", text:"You review the cover + 2–3 key answers"},
              {icon:"⚡", text:"Bulk-approve in one swipe session"},
              {icon:"🪶", text:"Best balance of speed + control"},
            ]}
            cta="Let's co-pilot →"
          />
          <ModeColumn
            badge="🧠 MANUAL" badgeColor="rgba(255,255,255,0.5)"
            title="Just find me roles"
            sub="No auto-anything. I surface the best matches every day and stay out of your way otherwise."
            mood="thinking" cap={eT.mint} fill={eT.mint} ink={eT.ink}
            stats={[{v:"~25/day", l:"matches"}, {v:"You drive", l:"everything"}, {v:"1×", l:"baseline"}]}
            bullets={[
              {icon:"🔍", text:"Daily curated job feed"},
              {icon:"🧰", text:"On-demand cover letter help"},
              {icon:"💬", text:"Ask me anything, anytime"},
              {icon:"📭", text:"No emails, no auto-apply"},
            ]}
            cta="I'll drive →"
          />
        </div>

        <div style={{textAlign:"center", marginTop: 32, fontSize: 13, color: eT.muted, fontWeight: 600}}>
          You can switch modes any time — even per job. <span style={{color: eT.cyanInk, fontWeight: 700}}>Learn how Sprout decides what's a match →</span>
        </div>
      </div>
    </DesktopFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 5 — Activation (the magic moment)
// ─────────────────────────────────────────────────────────────────────
function D_Activation() {
  return (
    <DesktopFrame url="bloom.app" bg={eT.ink}>
      <div style={{flex:1, color:"#fff", display:"flex", position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:"40%", left:"40%", transform:"translate(-50%,-50%)", width: 600, height: 600, borderRadius:"50%", background: eT.cyan, opacity: 0.16, filter:"blur(80px)"}}/>

        <div style={{flex: 1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", padding:"60px 80px", position:"relative", zIndex: 1, gap: 24}}>
          <div style={{display:"inline-flex", alignItems:"center", gap: 8, padding:"6px 12px", borderRadius: 999, background:"rgba(90,235,235,0.16)", border:"1px solid rgba(90,235,235,0.3)", fontSize: 12, fontWeight: 800, color: eT.cyan, letterSpacing:"0.06em"}}>
            <span style={{width: 6, height: 6, borderRadius:"50%", background: eT.cyan, animation:"sprPulse 1.6s infinite"}}/>
            SPROUT IS WAKING UP
          </div>
          <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 72, lineHeight: 0.95, letterSpacing:"-0.035em"}}>
            Reading <span style={{color: eT.cyan}}>12,400</span><br/>open roles<br/>for you…
          </div>
          <div style={{fontSize: 17, opacity: 0.7, fontWeight: 500, lineHeight: 1.5, maxWidth: 460}}>
            Filtering for senior IC roles, US remote, design-led teams, $180k+. First applications will be ready in <b style={{color: eT.cyan}}>~3 minutes</b>.
          </div>

          <div style={{width:"100%", maxWidth: 500, marginTop: 8, display:"flex", flexDirection:"column", gap: 12}}>
            {[
              {label:"Reading your résumé", done: true},
              {label:"Scanning 12,400 open roles", done: true},
              {label:"Ranking by fit", pct: 60},
              {label:"Tailoring first 5 drafts", pct: 0},
            ].map((s,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap: 14}}>
                <div style={{width: 22, height: 22, borderRadius:"50%", background: s.done ? eT.cyan : "transparent", border: s.done ? "none" : `1.5px solid rgba(255,255,255,0.3)`, color: eT.ink, display:"grid", placeItems:"center", fontSize: 13, fontWeight: 800, flexShrink: 0}}>{s.done && "✓"}</div>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 14.5, fontWeight: 600, opacity: s.done ? 1 : (s.pct > 0 ? 1 : 0.5)}}>{s.label}</div>
                  {s.pct > 0 && !s.done && (
                    <div style={{height: 4, background:"rgba(255,255,255,0.1)", borderRadius: 99, marginTop: 6, overflow:"hidden"}}>
                      <div style={{height:"100%", width: `${s.pct}%`, background: eT.cyan, borderRadius: 99}}/>
                    </div>
                  )}
                </div>
                {s.pct > 0 && !s.done && <div style={{fontSize: 12, fontFamily: eFData, color: eT.cyan, fontWeight: 700}}>{s.pct}%</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right — mascot */}
        <div style={{flex: 0.9, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative", zIndex: 1, padding: 60}}>
          <div style={{position:"relative", animation:"sprBob 3s ease-in-out infinite"}}>
            <div style={{position:"absolute", inset: -40, borderRadius:"50%", border: `2px solid ${eT.cyan}`, opacity: 0.4, animation:"sprRipple 2s ease-out infinite"}}/>
            <div style={{position:"absolute", inset: -90, borderRadius:"50%", border: `1.5px solid ${eT.cyan}`, opacity: 0.25, animation:"sprRipple 2s ease-out 0.5s infinite"}}/>
            <div style={{position:"absolute", inset: -150, borderRadius:"50%", border: `1px solid ${eT.cyan}`, opacity: 0.15, animation:"sprRipple 2s ease-out 1s infinite"}}/>
            <EM size={220} cap={eT.cyan} mood="working"/>
          </div>
          <div style={{textAlign:"center", marginTop: 40, fontSize: 13, opacity: 0.5, fontWeight: 500, fontStyle:"italic"}}>"the boring stuff is on me from here ✨"</div>
        </div>
      </div>
    </DesktopFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SHARED — Top action bar (used inside app shell screens)
// ─────────────────────────────────────────────────────────────────────
function MainHeader({ title, sub, actions }) {
  return (
    <div style={{padding:"22px 32px 14px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap: 24}}>
      <div>
        <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 28, color: eT.ink, letterSpacing:"-0.025em", lineHeight: 1.1}}>{title}</div>
        {sub && <div style={{fontSize: 14, color: eT.muted, fontWeight: 500, marginTop: 4}}>{sub}</div>}
      </div>
      <div style={{display:"flex", gap: 8, alignItems:"center"}}>
        {actions}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 6 — Home (momentum)
// Hero card + needs-your-call queue + live feed
// ─────────────────────────────────────────────────────────────────────
function D_Home() {
  return (
    <DesktopFrame url="bloom.app">
      <EShell active="home">
        <div style={{flex: 1, overflow:"auto"}}>
          <MainHeader
            title="Good morning, Vinodh 👋"
            sub="Day 14 of your search · Sprout has been busy."
            actions={
              <>
                <div style={{display:"inline-flex", alignItems:"center", gap: 6, padding:"6px 12px", borderRadius: 999, background: eT.flame, color:"#fff", fontSize: 13, fontWeight: 700}}>🔥 14-day streak</div>
                <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${eT.hairline}`, fontSize: 13, fontWeight: 600, color: eT.ink, display:"inline-flex", gap: 6, alignItems:"center"}}>⌘K Ask Sprout</button>
              </>
            }
          />

          {/* HERO momentum card */}
          <div style={{margin:"0 32px 20px", background: eT.ink, borderRadius: 28, padding:"28px 32px", color:"#fff", position:"relative", overflow:"hidden", display:"flex", gap: 32, alignItems:"center"}}>
            <div style={{position:"absolute", top:-60, right:-30, width: 280, height: 280, borderRadius:"50%", background: eT.cyan, opacity: 0.18, filter:"blur(40px)"}}/>
            <div style={{flex: 1.5, position:"relative", zIndex: 1}}>
              <ELP color={eT.cyan} ink={eT.ink}>Sprout is applying · 12 in queue</ELP>
              <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 52, lineHeight: 0.98, letterSpacing:"-0.035em", marginTop: 16}}>
                You slept,<br/>
                I applied to <span style={{color: eT.cyan}}>7 jobs.</span>
              </div>
              <div style={{fontSize: 16, opacity: 0.72, fontWeight: 500, marginTop: 14, lineHeight: 1.45, maxWidth: 540}}>
                Saved you ~3h 20m of form-filling overnight. <b style={{color:"#fff"}}>2 are 95%+ matches</b> — review them first. Linear already opened your profile (3 min ago 👀).
              </div>
              <div style={{display:"flex", gap: 10, marginTop: 22}}>
                <DarkStat v="7" l="applied · last 24h" accent={eT.cyan}/>
                <DarkStat v="4" l="need your review"/>
                <DarkStat v="2" l="recruiter replies" accent={eT.cyan}/>
                <DarkStat v="3h 20m" l="time saved today"/>
              </div>
            </div>
            <div style={{flex: 0.7, display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex: 1}}>
              <div style={{position:"relative"}}>
                <div style={{position:"absolute", inset: -12, borderRadius:"50%", border: `1.5px solid ${eT.cyan}`, opacity: 0.4, animation:"sprRipple 2.4s ease-out infinite"}}/>
                <EM size={160} cap={eT.cyan} mood="working"/>
              </div>
            </div>
          </div>

          {/* Two-up: Needs your call + Live feed */}
          <div style={{padding:"0 32px 32px", display:"grid", gridTemplateColumns:"1.4fr 1fr", gap: 20}}>
            {/* Needs your call */}
            <div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
                <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 20, color: eT.ink, letterSpacing:"-0.02em"}}>Your call <span style={{color: eT.muted}}>(3)</span></div>
                <button style={{fontSize: 13, color: eT.cyanInk, fontWeight: 700}}>Open queue →</button>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                {[
                  {co:"Linear", role:"Sr. Product Designer", logo:"L", logoBg:"#5E6AD2", match:96, why:"Design-led, Series C, you'd love their craft bar", queue:"Review my draft", time:"queued 8m ago"},
                  {co:"Figma", role:"Staff Product Designer", logo:"F", logoBg:"#0ACF83", match:91, why:"They asked: 'why us?' — I drafted 2 options", queue:"1 question for you", time:"queued 22m ago"},
                  {co:"Cash App", role:"Senior Designer · Money", logo:"$", logoBg:"#00D632", match:88, why:"Stretch role but they'd hire you", queue:"Review my draft", time:"queued 1h ago"},
                ].map(j => (
                  <div key={j.co} style={{background:"#fff", borderRadius: 18, padding: 16, border: `1px solid ${eT.hairline}`, display:"flex", gap: 14, alignItems:"flex-start"}}>
                    <div style={{width: 48, height: 48, borderRadius: 12, background: j.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 20, flexShrink: 0, fontFamily: eFD}}>{j.logo}</div>
                    <div style={{flex:1, minWidth: 0}}>
                      <div style={{display:"flex", alignItems:"center", gap: 10, marginBottom: 2}}>
                        <div style={{fontSize: 15.5, fontWeight: 700, color: eT.ink, lineHeight: 1.2}}>{j.role}</div>
                        <span style={{fontSize: 11, fontWeight: 700, padding:"2px 8px", borderRadius: 999, background: eT.mint, color: eT.mintInk}}>{j.match}% fit</span>
                      </div>
                      <div style={{fontSize: 13, color: eT.inkSoft, fontWeight: 500, marginBottom: 6}}>{j.co} · {j.time}</div>
                      <div style={{fontSize: 13, color: eT.muted, fontWeight: 500, lineHeight: 1.4, display:"flex", gap: 6}}>
                        <span style={{flexShrink:0, opacity: 0.7}}>Sprout:</span>
                        <span>"{j.why}"</span>
                      </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", gap: 6, alignItems:"flex-end"}}>
                      <button style={{padding:"7px 14px", borderRadius: 999, background: eT.ink, color:"#fff", fontSize: 13, fontWeight: 700, border:"none"}}>{j.queue} →</button>
                      <button style={{padding:"6px 12px", borderRadius: 999, background:"transparent", color: eT.muted, fontSize: 12, fontWeight: 600}}>Skip</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live feed */}
            <div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
                <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 20, color: eT.ink, letterSpacing:"-0.02em"}}>Live feed</div>
                <button style={{fontSize: 13, color: eT.cyanInk, fontWeight: 700}}>Full activity →</button>
              </div>
              <div style={{background:"#fff", borderRadius: 18, border:`1px solid ${eT.hairline}`, overflow:"hidden"}}>
                {[
                  {t:"now", text:<>Applying to <b>Vercel</b> — 'Senior Designer, Marketing'</>, icon:"📨", live: true},
                  {t:"2m", text:<>Tailored your cover for <b>Stripe · Staff Product Designer</b></>, icon:"✏️"},
                  {t:"18m", text:<><b>Recruiter reply</b> from Linear came in</>, icon:"💌", color: eT.flame},
                  {t:"34m", text:<>Saw a new role at <b>Notion · AI</b> — added to your queue</>, icon:"👀"},
                  {t:"1h", text:<>Submitted to <b>Plaid</b> — 'Sr. Product Designer'</>, icon:"✅", color: eT.mintInk},
                  {t:"3h", text:<>Skipped 4 roles below your $180k floor</>, icon:"⏭"},
                ].map((e,i,arr) => (
                  <div key={i} style={{padding:"12px 16px", display:"flex", gap: 12, alignItems:"center", borderBottom: i < arr.length-1 ? `1px solid ${eT.hairline}` : "none"}}>
                    <div style={{width: 30, height: 30, borderRadius: 10, background: eT.cream, display:"grid", placeItems:"center", fontSize: 14, position:"relative"}}>
                      {e.icon}
                      {e.live && <span style={{position:"absolute", top:-2, right:-2, width: 8, height: 8, borderRadius:"50%", background: eT.flame, border:"2px solid #fff"}}/>}
                    </div>
                    <div style={{flex:1, fontSize: 13.5, color: e.color || eT.ink, fontWeight: 500, lineHeight: 1.3}}>{e.text}</div>
                    <div style={{fontSize: 11, color: eT.muted, fontWeight: 700, flexShrink: 0}}>{e.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* This week summary */}
          <div style={{padding: "0 32px 40px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
              <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 20, color: eT.ink, letterSpacing:"-0.02em"}}>This week so far</div>
              <button style={{fontSize: 13, color: eT.cyanInk, fontWeight: 700}}>See breakdown →</button>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
              <BigStat tint={eT.cyan} v="42" l="applications sent" sub="↑ 18 vs last week"/>
              <BigStat tint={eT.butter} v="11h" l="time saved" sub="vs filling forms yourself"/>
              <BigStat tint={eT.mint} v="6" l="recruiter replies" sub="14% reply rate · top 12%"/>
              <BigStat tint={eT.lilac} v="2" l="screening calls booked" sub="Linear · Tue · Stripe · Fri"/>
            </div>
          </div>
        </div>
      </EShell>
    </DesktopFrame>
  );
}

function DarkStat({ v, l, accent }) {
  return (
    <div style={{flex:1, background:"rgba(255,255,255,0.07)", padding:"12px 14px", borderRadius: 14, border:`1px solid rgba(255,255,255,0.08)`}}>
      <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 26, color: accent || "#fff", letterSpacing:"-0.025em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600, marginTop: 6}}>{l}</div>
    </div>
  );
}
function BigStat({ v, l, sub, tint }) {
  return (
    <div style={{background: tint, borderRadius: 18, padding: "16px 18px"}}>
      <div style={{fontFamily: eFD, fontWeight: 700, fontSize: 36, color: eT.ink, letterSpacing:"-0.03em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 13.5, color: eT.ink, fontWeight: 700, marginTop: 8, letterSpacing:"-0.01em"}}>{l}</div>
      <div style={{fontSize: 11.5, color: eT.ink, opacity: 0.7, fontWeight: 600, marginTop: 2}}>{sub}</div>
    </div>
  );
}

Object.assign(window, { D_ModePicker, D_Activation, D_Home, ModeColumn, MainHeader, DarkStat, BigStat });
