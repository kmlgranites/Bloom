// =====================================================================
// Home (momentum state) + Job Discovery (Tinder swipe) + App Review
// =====================================================================
const { sprT: hT, fontDisplay: hFD, fontBody: hFB,
        SproutMascot: HM, SprChip: HC, SprBtn: HB, SprBubble: HBu,
        SprAvatar: HA, StatTile: HST, Sparkle: HSp, LivePill: HLP } = window;

// ─────────────────────────────────────────────────────────────────────
// 6. HOME — Sprout is working. The momentum state.
// This is the magic moment: "AI applied 7 jobs while you slept"
// ─────────────────────────────────────────────────────────────────────
function HomeHeader({ name = "Vinodh" }) {
  return (
    <div style={{padding: "8px 22px 14px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <div>
        <div style={{fontSize: 13, color: hT.muted, fontWeight: 600}}>Good morning,</div>
        <div style={{fontSize: 22, fontWeight: 700, color: hT.ink, fontFamily: hFD, letterSpacing:"-0.02em", lineHeight: 1.1}}>{name} 👋</div>
      </div>
      <div style={{display:"flex", alignItems:"center", gap: 6}}>
        <button style={{width: 40, height: 40, borderRadius:"50%", background:"#fff", border:`1px solid ${hT.hairline}`, fontSize: 18, color: hT.ink}}>⚙</button>
        <div style={{width: 40, height: 40, borderRadius:"50%", background: hT.lilac, color: hT.lilacInk, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 14, border:`1px solid ${hT.hairline}`}}>VK</div>
      </div>
    </div>
  );
}

function Home_Momentum() {
  return (
    <div style={{height:"100%", background: hT.cream, paddingTop: 50, paddingBottom: 80, display:"flex", flexDirection:"column", overflowY:"auto"}}>
      <HomeHeader/>

      {/* HERO momentum card */}
      <div style={{margin:"0 16px 14px", background: hT.ink, borderRadius: 28, padding: "22px 22px 24px", color:"#fff", position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:-30, right:-30, width: 180, height: 180, borderRadius:"50%", background: hT.cyan, opacity: 0.15, filter:"blur(10px)"}}/>

        <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 14}}>
          <HLP color={hT.cyan} ink={hT.ink}>Sprout is applying</HLP>
        </div>

        <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 32, lineHeight: 1.0, letterSpacing:"-0.03em"}}>
          You slept,<br/>I applied to <span style={{color: hT.cyan}}>7 jobs.</span>
        </div>
        <div style={{fontSize: 14, opacity: 0.7, fontWeight: 500, marginTop: 10, lineHeight: 1.45}}>
          Saved you ~3h 20m of form-filling overnight. Two are 95%+ matches — check them first.
        </div>

        <div style={{display:"flex", gap: 10, marginTop: 18}}>
          <div style={{flex:1, background:"rgba(255,255,255,0.08)", padding:"10px 12px", borderRadius: 14, border:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 22, color: hT.cyan, letterSpacing:"-0.02em", lineHeight: 1}}>7</div>
            <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600, marginTop: 4}}>applied</div>
          </div>
          <div style={{flex:1, background:"rgba(255,255,255,0.08)", padding:"10px 12px", borderRadius: 14, border:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 22, color:"#fff", letterSpacing:"-0.02em", lineHeight: 1}}>4</div>
            <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600, marginTop: 4}}>need review</div>
          </div>
          <div style={{flex:1, background:"rgba(255,255,255,0.08)", padding:"10px 12px", borderRadius: 14, border:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 22, color: hT.cyan, letterSpacing:"-0.02em", lineHeight: 1}}>2<span style={{fontSize: 13, color:"#fff", opacity: 0.6}}>/12</span></div>
            <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600, marginTop: 4}}>replies</div>
          </div>
        </div>
      </div>

      {/* Streak / momentum chip */}
      <div style={{padding: "0 18px 12px", display:"flex", gap: 8, alignItems:"center"}}>
        <div style={{display:"inline-flex", alignItems:"center", gap: 6, padding:"6px 12px", borderRadius: 999, background: hT.flame, color:"#fff", fontSize: 13, fontWeight: 700}}>🔥 14-day streak</div>
        <div style={{fontSize: 13, color: hT.muted, fontWeight: 600}}>Keep it up — beats <b style={{color: hT.ink}}>89%</b> of users</div>
      </div>

      {/* "Needs your call" — small queue of decisions */}
      <div style={{padding: "4px 18px 14px"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 10}}>
          <div style={{fontSize: 17, fontWeight: 700, color: hT.ink, fontFamily: hFD, letterSpacing:"-0.015em"}}>Your call ({"3"})</div>
          <span style={{fontSize: 13, color: hT.cyanInk, fontWeight: 700}}>See all →</span>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap: 8}}>
          {[
            {co:"Linear", role:"Sr. Product Designer", logo:"L", logoBg:"#5E6AD2", match:96, why:"Design-led, Series C, you'd love their craft bar", queue:"Review my draft"},
            {co:"Figma", role:"Staff Product Designer", logo:"F", logoBg:"#0ACF83", match:91, why:"Loves your design systems work", queue:"1 question for you"},
            {co:"Cash App", role:"Senior Designer · Money", logo:"$", logoBg:"#00D632", match:88, why:"Asked: \"why us?\" — I drafted 2 options", queue:"Review my draft"},
          ].map(j => (
            <div key={j.co} style={{background:"#fff", borderRadius: 20, padding: "14px 14px 14px 12px", border: `1px solid ${hT.hairline}`, display:"flex", gap: 12, alignItems:"flex-start"}}>
              <div style={{width: 42, height: 42, borderRadius: 12, background: j.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 17, flexShrink: 0, fontFamily: hFD}}>{j.logo}</div>
              <div style={{flex:1, minWidth: 0}}>
                <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 2}}>
                  <div style={{fontSize: 14.5, fontWeight: 700, color: hT.ink, lineHeight: 1.2}}>{j.role}</div>
                </div>
                <div style={{fontSize: 13, color: hT.inkSoft, fontWeight: 500, marginBottom: 6}}>{j.co}</div>
                <div style={{display:"flex", gap: 6, marginBottom: 8, flexWrap:"wrap"}}>
                  <span style={{fontSize: 11, fontWeight: 700, padding:"3px 8px", borderRadius: 999, background: hT.mint, color: hT.mintInk}}>{j.match}% fit</span>
                  <span style={{fontSize: 11, fontWeight: 700, padding:"3px 8px", borderRadius: 999, background: hT.butter, color: hT.butterInk}}>📝 {j.queue}</span>
                </div>
                <div style={{fontSize: 12.5, color: hT.muted, fontWeight: 500, lineHeight: 1.35, display:"flex", gap: 6}}>
                  <span style={{flexShrink:0, opacity: 0.7}}>Sprout:</span>
                  <span>"{j.why}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Sprout is doing right now */}
      <div style={{padding: "4px 18px 18px"}}>
        <div style={{fontSize: 17, fontWeight: 700, color: hT.ink, fontFamily: hFD, letterSpacing:"-0.015em", marginBottom: 10}}>Live feed</div>
        <div style={{background:"#fff", borderRadius: 20, border: `1px solid ${hT.hairline}`, padding: "6px 0"}}>
          {[
            {t:"2m ago", text:"Tailored your cover for Stripe · Staff Product Designer", icon:"✏️"},
            {t:"18m ago", text:"Submitted to Vercel — 'Senior Designer, Marketing'", icon:"✅", color: hT.mintInk},
            {t:"34m ago", text:"Saw a new role at Notion — let me know if it fits", icon:"👀"},
            {t:"1h ago", text:"You got a recruiter reply from Linear", icon:"💌", color: hT.flame},
          ].map((e,i,arr) => (
            <div key={i} style={{padding: "10px 14px", display:"flex", gap: 12, alignItems:"center", borderBottom: i < arr.length-1 ? `1px solid ${hT.hairline}` : "none"}}>
              <div style={{width: 28, height: 28, borderRadius: 10, background: hT.cream, display:"grid", placeItems:"center", fontSize: 14}}>{e.icon}</div>
              <div style={{flex:1, fontSize: 13.5, color: e.color || hT.ink, fontWeight: 600, lineHeight: 1.3}}>{e.text}</div>
              <div style={{fontSize: 11, color: hT.muted, fontWeight: 600, flexShrink: 0}}>{e.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home"/>
    </div>
  );
}

function BottomNav({ active = "home" }) {
  const items = [
    {id:"home", icon:"🏠", label:"Home"},
    {id:"queue", icon:"📥", label:"Queue", badge: 4},
    {id:"swipe", icon:"💚", label:"Discover"},
    {id:"chat", icon:"💬", label:"Sprout"},
  ];
  return (
    <div style={{
      position:"absolute", bottom: 0, left: 0, right: 0,
      background:"rgba(255,255,255,0.92)", backdropFilter:"blur(20px)",
      borderTop:`1px solid ${hT.hairline}`,
      padding: "10px 8px 28px", display:"flex", justifyContent:"space-around",
    }}>
      {items.map(it => (
        <div key={it.id} style={{
          display:"flex", flexDirection:"column", alignItems:"center", gap: 2, padding:"4px 10px",
          borderRadius: 14, background: active === it.id ? hT.ink : "transparent",
          color: active === it.id ? "#fff" : hT.inkSoft, position:"relative", minWidth: 56,
        }}>
          <span style={{fontSize: 18}}>{it.icon}</span>
          <span style={{fontSize: 10.5, fontWeight: 700}}>{it.label}</span>
          {it.badge && <div style={{position:"absolute", top: 0, right: 4, background: hT.flame, color:"#fff", borderRadius: 999, fontSize: 9.5, fontWeight: 800, padding: "1px 5px", minWidth: 15, textAlign:"center"}}>{it.badge}</div>}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 7. JOB DISCOVERY — Tinder-style swipe
// ─────────────────────────────────────────────────────────────────────
function JobCard({ job, rotate = 0, offset = 0, scale = 1, opacity = 1 }) {
  return (
    <div style={{
      position:"absolute", inset: 0,
      transform: `translateY(${offset}px) rotate(${rotate}deg) scale(${scale})`,
      opacity, background:"#fff", borderRadius: 28, overflow:"hidden",
      border:`1px solid ${hT.hairline}`,
      boxShadow:"0 30px 60px -20px rgba(2,47,54,0.18), 0 12px 30px -10px rgba(2,47,54,0.08)",
      display:"flex", flexDirection:"column",
    }}>
      {/* top color band */}
      <div style={{height: 140, background: job.bg, padding: 20, display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap: 6, padding:"5px 10px", borderRadius: 999, background:"rgba(255,255,255,0.7)", color: hT.ink, fontSize: 11, fontWeight: 700}}>
            <span style={{width: 6, height: 6, borderRadius:"50%", background: hT.flame}}/>
            HOT — 4h ago
          </div>
          <div style={{fontSize: 13, fontWeight: 700, color: hT.ink, padding:"5px 10px", borderRadius: 999, background:"rgba(255,255,255,0.7)"}}>{job.match}% fit</div>
        </div>
        <div>
          <div style={{width: 56, height: 56, borderRadius: 16, background:"#fff", color: hT.ink, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 24, fontFamily: hFD, boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}>{job.logo}</div>
        </div>
      </div>

      <div style={{padding: 22, flex: 1, display:"flex", flexDirection:"column", gap: 12, overflow:"hidden"}}>
        <div>
          <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 24, color: hT.ink, lineHeight: 1.1, letterSpacing:"-0.02em"}}>{job.role}</div>
          <div style={{fontSize: 15, color: hT.inkSoft, fontWeight: 600, marginTop: 4}}>{job.co} · {job.loc}</div>
        </div>

        <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
          {job.tags.map(t => (
            <span key={t} style={{fontSize: 12, fontWeight: 700, padding:"5px 10px", borderRadius: 999, background: hT.cream, color: hT.ink, border: `1px solid ${hT.hairline}`}}>{t}</span>
          ))}
        </div>

        {/* Sprout's take */}
        <div style={{background: hT.creamSoft, borderRadius: 16, padding: 14, display:"flex", gap: 10, marginTop: 4}}>
          <HA size={26} cap={hT.cyan} mood="happy"/>
          <div style={{flex:1}}>
            <div style={{fontSize: 11, fontWeight: 700, color: hT.cyanInk, marginBottom: 2}}>SPROUT'S TAKE</div>
            <div style={{fontSize: 13.5, color: hT.ink, fontWeight: 500, lineHeight: 1.4}}>{job.take}</div>
          </div>
        </div>

        <div style={{marginTop:"auto", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize: 13, color: hT.inkSoft, fontWeight: 600}}>
          <span>{job.salary}</span>
          <span>{job.size}</span>
        </div>
      </div>
    </div>
  );
}

function Home_Discovery() {
  const jobs = [
    {co:"Linear", role:"Sr. Product Designer", logo:"L", bg: "#E6E8FA", loc:"Remote · US", match: 96,
     tags:["Design-led","Series C","Remote-first","Equity 0.05%"],
     take:"This is your dream stack. Their craft bar matches your taste — I drafted a cover lead that calls out your Linear knockoff side project.",
     salary:"$185–230k + equity", size:"~80 people"},
    {co:"Notion", role:"Staff Designer · AI", logo:"N", bg: hT.butter, loc:"Remote · Hybrid", match: 92,
     tags:["AI products","Hybrid SF/NY","Series E"], take:"Stretch role — they'd hire you. AI focus matches your Headspace work.",
     salary:"$210–260k", size:"~600 people"},
    {co:"Vercel", role:"Senior Product Designer", logo:"V", bg: hT.mint, loc:"Remote", match: 89,
     tags:["DevTools","Remote","Pre-IPO"], take:"Developer audience — but you can frame your design systems work for this.",
     salary:"$180–220k", size:"~400 people"},
  ];

  return (
    <div style={{height:"100%", background: hT.cream, paddingTop: 50, paddingBottom: 80, display:"flex", flexDirection:"column", position:"relative"}}>
      {/* Header */}
      <div style={{padding: "10px 22px 14px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily: hFD, fontWeight: 700, fontSize: 24, color: hT.ink, letterSpacing:"-0.02em", lineHeight: 1.0}}>Discover</div>
          <div style={{fontSize: 13, color: hT.muted, fontWeight: 600, marginTop: 4}}>42 fresh matches today · Swipe → save, ← skip</div>
        </div>
        <button style={{width: 40, height: 40, borderRadius:"50%", background:"#fff", border:`1px solid ${hT.hairline}`, fontSize: 16}}>⚙</button>
      </div>

      {/* Card stack */}
      <div style={{flex:1, padding: "8px 24px 20px", position:"relative", display:"flex", flexDirection:"column"}}>
        <div style={{position:"relative", flex: 1, minHeight: 480}}>
          {/* back cards */}
          <JobCard job={jobs[2]} offset={20} scale={0.92} opacity={0.6}/>
          <JobCard job={jobs[1]} offset={10} scale={0.96} opacity={0.85}/>
          {/* front card, tilted */}
          <JobCard job={jobs[0]} rotate={-3}/>

          {/* swipe stamps */}
          <div style={{position:"absolute", top: 30, left: 24, padding:"6px 14px", borderRadius: 10, border:`3px solid ${hT.flame}`, color: hT.flame, fontFamily: hFD, fontWeight: 800, fontSize: 22, transform:"rotate(-15deg)", opacity: 0.85, letterSpacing: "0.04em"}}>SKIP</div>
        </div>

        {/* Action buttons */}
        <div style={{display:"flex", justifyContent:"center", gap: 16, paddingTop: 18}}>
          <button style={{width: 60, height: 60, borderRadius:"50%", background:"#fff", border:`2px solid ${hT.hairline}`, fontSize: 24, color: hT.flame, fontWeight: 800}}>✕</button>
          <button style={{width: 60, height: 60, borderRadius:"50%", background: hT.butter, border:"none", fontSize: 22, color: hT.butterInk}}>↩</button>
          <button style={{width: 70, height: 70, borderRadius:"50%", background: hT.ink, border:"none", fontSize: 26, color: hT.cyan, fontWeight: 700, boxShadow:"0 10px 24px -8px rgba(2,47,54,0.4)"}}>♥</button>
          <button style={{width: 60, height: 60, borderRadius:"50%", background: hT.cyan, border:"none", fontSize: 22, color: hT.ink, fontWeight: 800}}>⚡</button>
        </div>
        <div style={{display:"flex", justifyContent:"center", gap: 36, paddingTop: 8, fontSize: 10.5, color: hT.muted, fontWeight: 700, letterSpacing:"0.04em", textTransform:"uppercase"}}>
          <span>Skip</span>
          <span style={{paddingLeft: 6}}>Undo</span>
          <span style={{paddingLeft: 12}}>Apply</span>
          <span style={{paddingLeft: 18}}>Auto</span>
        </div>
      </div>

      <BottomNav active="swipe"/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 8. APPLICATION REVIEW — Sprout drafted; you review
// Conversational, with inline edits
// ─────────────────────────────────────────────────────────────────────
function Home_Review() {
  return (
    <div style={{height:"100%", background: hT.cream, paddingTop: 50, paddingBottom: 50, display:"flex", flexDirection:"column"}}>
      {/* Header */}
      <div style={{padding: "8px 18px 12px", display:"flex", alignItems:"center", gap: 12, borderBottom: `1px solid ${hT.hairline}`, background: hT.cream}}>
        <button style={{fontSize: 22, color: hT.ink, padding: 4, fontWeight: 700}}>←</button>
        <div style={{flex:1, minWidth: 0}}>
          <div style={{fontSize: 16, fontWeight: 700, color: hT.ink, lineHeight: 1.1, fontFamily: hFD, letterSpacing:"-0.01em"}}>Linear · Sr. Product Designer</div>
          <div style={{fontSize: 12, color: hT.muted, fontWeight: 600, marginTop: 2}}>Draft ready · 96% fit</div>
        </div>
        <div style={{fontSize: 11, fontWeight: 800, color: hT.mintInk, background: hT.mint, padding: "4px 10px", borderRadius: 999}}>2 of 12</div>
      </div>

      <div style={{flex:1, overflowY:"auto", padding: "14px 16px 16px", display:"flex", flexDirection:"column", gap: 12}}>
        {/* Sprout summary */}
        <div style={{display:"flex", gap: 10, alignItems:"flex-start"}}>
          <HA size={32} mood="happy" cap={hT.cyan}/>
          <div style={{flex:1, background:"#fff", borderRadius: "18px 18px 18px 6px", padding: "12px 14px", border:`1px solid ${hT.hairline}`, fontSize: 14.5, color: hT.ink, fontWeight: 500, lineHeight: 1.4}}>
            Done! I matched <b>9 of 11</b> screening questions from your past answers. Two need your call — they're tagged <span style={{color: hT.flame, fontWeight: 700}}>orange</span> below.
          </div>
        </div>

        {/* Cover letter card */}
        <div style={{background:"#fff", borderRadius: 22, border:`1px solid ${hT.hairline}`, padding: 16}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
            <div style={{fontSize: 12, fontWeight: 800, color: hT.muted, letterSpacing:"0.06em", textTransform:"uppercase"}}>Cover · Sprout drafted</div>
            <button style={{fontSize: 12, color: hT.cyanInk, fontWeight: 700, background: hT.cyan, padding:"4px 10px", borderRadius: 999, border:"none"}}>✨ Rewrite</button>
          </div>
          <div style={{fontSize: 14, color: hT.ink, lineHeight: 1.55, fontWeight: 500}}>
            Hey Linear team —<br/><br/>
            I've been a Linear power-user since 2022 and built a <span style={{background: hT.butter, padding:"1px 4px", borderRadius: 4}}>Linear-inspired triage tool at Headspace</span> that cut PM grooming time in half. I'd love to push the craft bar even higher with your design team…
          </div>
          <div style={{display:"flex", gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${hT.hairline}`}}>
            <button style={{fontSize: 12, color: hT.ink, fontWeight: 700, background: hT.cream, padding:"6px 12px", borderRadius: 999, border:"none"}}>🎯 More specific</button>
            <button style={{fontSize: 12, color: hT.ink, fontWeight: 700, background: hT.cream, padding:"6px 12px", borderRadius: 999, border:"none"}}>🪶 Shorter</button>
            <button style={{fontSize: 12, color: hT.ink, fontWeight: 700, background: hT.cream, padding:"6px 12px", borderRadius: 999, border:"none"}}>😎 Warmer</button>
          </div>
        </div>

        {/* Screening Qs — needs attention */}
        <div style={{background:"#fff", borderRadius: 22, border:`1.5px solid ${hT.flame}`, padding: 16}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
            <div style={{fontSize: 12, fontWeight: 800, color: hT.flame, letterSpacing:"0.06em", textTransform:"uppercase"}}>Needs your call</div>
            <div style={{fontSize: 11, color: hT.muted, fontWeight: 700}}>2 questions</div>
          </div>
          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 13.5, fontWeight: 700, color: hT.ink, marginBottom: 8, lineHeight: 1.35}}>Why specifically Linear?</div>
            <div style={{fontSize: 13, color: hT.inkSoft, marginBottom: 10, fontWeight: 500, lineHeight: 1.4}}>
              <span style={{opacity: 0.7}}>Sprout drafted 2 options:</span>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap: 8}}>
              <div style={{background: hT.cream, borderRadius: 14, padding: 12, border: `1.5px solid ${hT.ink}`}}>
                <div style={{fontSize: 11, fontWeight: 800, color: hT.cyanInk, marginBottom: 4}}>OPTION A · CRAFT-FORWARD</div>
                <div style={{fontSize: 13, color: hT.ink, lineHeight: 1.4, fontWeight: 500}}>"The level of craft you ship is rare. I want to learn from a team that obsesses over micro-interactions and ships fast."</div>
              </div>
              <div style={{background: hT.cream, borderRadius: 14, padding: 12, border:`1px solid ${hT.hairline}`}}>
                <div style={{fontSize: 11, fontWeight: 800, color: hT.muted, marginBottom: 4}}>OPTION B · STORY-DRIVEN</div>
                <div style={{fontSize: 13, color: hT.ink, lineHeight: 1.4, fontWeight: 500}}>"I built a Linear knockoff at Headspace because I couldn't find anything as fast. I want to work on the real one."</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex", gap: 6}}>
            <HC fill={hT.ink} ink="#fff" size="sm">✓ Use A</HC>
            <HC fill="#fff" ink={hT.ink} size="sm" style={{border:`1.5px solid ${hT.hairline}`}}>Use B</HC>
            <HC fill="#fff" ink={hT.ink} size="sm" style={{border:`1.5px solid ${hT.hairline}`}}>✏️ Edit</HC>
          </div>
        </div>

        {/* Auto-filled summary */}
        <div style={{background:"#fff", borderRadius: 22, border:`1px solid ${hT.hairline}`, padding: 16}}>
          <div style={{fontSize: 12, fontWeight: 800, color: hT.mintInk, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 10}}>✓ Sprout auto-filled (9)</div>
          <div style={{display:"flex", flexDirection:"column", gap: 6}}>
            {[
              "Years of experience: 6",
              "Authorized to work in US: Yes",
              "Visa sponsorship needed: No",
              "Preferred salary range: $185–230k",
              "Notice period: 4 weeks",
            ].map(q => (
              <div key={q} style={{display:"flex", alignItems:"center", gap: 8, fontSize: 13, color: hT.ink, fontWeight: 500}}>
                <span style={{color: hT.mintInk}}>✓</span>{q}
              </div>
            ))}
            <div style={{fontSize: 12, color: hT.muted, fontWeight: 700, marginTop: 4}}>+ 4 more</div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{padding: "12px 16px 18px", background:"#fff", borderTop: `1px solid ${hT.hairline}`, display:"flex", gap: 10}}>
        <HB variant="paper" size="md" style={{flex: 1}}>Skip this one</HB>
        <HB variant="primary" size="md" style={{flex: 1.6}}>Send it →</HB>
      </div>
    </div>
  );
}

Object.assign(window, { Home_Momentum, Home_Discovery, Home_Review, BottomNav, JobCard });
