// =====================================================================
// Bloom Gen Z V3 — DESKTOP screens
// One copilot ("Sprout"), chat-first, momentum-first.
// Reuses tokens + mascot from sprout-shared.jsx
// =====================================================================
const { sprT: dT, fontDisplay: dFD, fontBody: dFB, fontData: dFData,
        SproutMascot: DM, SprChip: DC, SprBtn: DB, SprBubble: DBu,
        SprAvatar: DA, StatTile: DST, Sparkle: DSp, LivePill: DLP } = window;

// ─────────────────────────────────────────────────────────────────────
// Desktop window chrome — traffic lights + url-ish bar. No forced sidebar.
// ─────────────────────────────────────────────────────────────────────
function DesktopFrame({ children, url = "bloom.app", bg = dT.cream }) {
  return (
    <div style={{
      width:"100%", height:"100%", borderRadius: 18, overflow:"hidden",
      background: bg, position:"relative", display:"flex", flexDirection:"column",
      boxShadow:"0 0 0 1px rgba(0,0,0,0.10), 0 30px 60px rgba(0,0,0,0.18)",
      fontFamily: dFB, color: dT.ink,
    }}>
      {/* Chrome */}
      <div style={{
        height: 40, background:"rgba(255,255,255,0.7)", backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${dT.hairline}`, display:"flex", alignItems:"center",
        padding:"0 14px", flexShrink: 0, gap: 14,
      }}>
        <div style={{display:"flex", gap: 7}}>
          <div style={{width: 12, height: 12, borderRadius:"50%", background:"#FF5F57"}}/>
          <div style={{width: 12, height: 12, borderRadius:"50%", background:"#FEBC2E"}}/>
          <div style={{width: 12, height: 12, borderRadius:"50%", background:"#28C840"}}/>
        </div>
        <div style={{flex:1, display:"flex", justifyContent:"center"}}>
          <div style={{
            background:"rgba(0,0,0,0.05)", borderRadius: 999, padding:"4px 14px",
            fontSize: 12, color: dT.inkSoft, fontWeight: 600, display:"flex", alignItems:"center", gap: 6,
          }}>
            <span style={{fontSize: 11}}>🔒</span> {url}
          </div>
        </div>
        <div style={{width: 60}}/>{/* spacer */}
      </div>

      {/* Content */}
      <div style={{flex: 1, overflow:"hidden", display:"flex", flexDirection:"column"}}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Persistent app shell — left rail + main + Sprout dock (right)
// ─────────────────────────────────────────────────────────────────────
function AppShell({ children, active = "home", sproutOpen = false, sproutPanel }) {
  const nav = [
    {id:"home",     icon:"◐", label:"Home"},
    {id:"queue",    icon:"☷", label:"Queue", badge: 4},
    {id:"discover", icon:"♡", label:"Discover"},
    {id:"applied",  icon:"✓", label:"Applied", count: 96},
    {id:"replies",  icon:"✶", label:"Replies", badge: 2},
  ];
  return (
    <div style={{flex:1, display:"flex", minHeight: 0, background: dT.cream}}>
      {/* Left rail */}
      <div style={{
        width: 220, flexShrink: 0, background: dT.creamSoft, borderRight: `1px solid ${dT.hairline}`,
        display:"flex", flexDirection:"column", padding: "18px 14px",
      }}>
        <div style={{display:"flex", alignItems:"center", gap: 10, marginBottom: 24, padding:"4px 6px"}}>
          <DM size={34}/>
          <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 19, letterSpacing:"-0.02em", color: dT.ink}}>bloom</div>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap: 2, flex: 1}}>
          {nav.map(it => (
            <div key={it.id} style={{
              display:"flex", alignItems:"center", gap: 10, padding:"9px 12px", borderRadius: 12,
              background: active === it.id ? dT.ink : "transparent",
              color: active === it.id ? "#fff" : dT.inkSoft,
              fontSize: 14, fontWeight: 600, cursor:"pointer", position:"relative",
            }}>
              <span style={{fontSize: 15, width: 16, textAlign:"center", opacity: active === it.id ? 1 : 0.7}}>{it.icon}</span>
              <span style={{flex:1}}>{it.label}</span>
              {it.badge && <span style={{
                background: active === it.id ? dT.cyan : dT.flame, color: dT.ink,
                fontSize: 10.5, fontWeight: 800, padding:"2px 7px", borderRadius: 999, minWidth: 18, textAlign:"center",
              }}>{it.badge}</span>}
              {it.count && !it.badge && <span style={{fontSize: 11, fontWeight: 700, opacity: 0.5}}>{it.count}</span>}
            </div>
          ))}
        </div>

        {/* Sprout status card at bottom */}
        <div style={{background: dT.ink, color:"#fff", borderRadius: 16, padding: 12, marginTop: 12, position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", top:-30, right:-30, width: 90, height: 90, borderRadius:"50%", background: dT.cyan, opacity: 0.2, filter:"blur(12px)"}}/>
          <div style={{display:"flex", alignItems:"center", gap: 8, position:"relative"}}>
            <DA size={32} mood="working" cap={dT.cyan}/>
            <div style={{flex:1, minWidth: 0}}>
              <div style={{fontSize: 12, fontWeight: 700, color: dT.cyan, letterSpacing:"0.04em"}}>● APPLYING</div>
              <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600}}>12 in queue</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap: 10, padding:"10px 6px 0", color: dT.muted, fontSize: 11, fontWeight: 700}}>
          <div style={{width: 26, height: 26, borderRadius:"50%", background: dT.lilac, color: dT.lilacInk, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 11, border:`1px solid ${dT.hairline}`}}>VK</div>
          <div style={{flex:1, color: dT.ink, fontSize: 13}}>Vinodh</div>
          <span style={{fontSize: 14, opacity: 0.5}}>⚙</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{flex: 1, minWidth: 0, display:"flex", flexDirection:"column", overflow:"hidden"}}>
        {children}
      </div>

      {/* Sprout dock (right) */}
      {sproutOpen && (
        <div style={{
          width: 360, flexShrink: 0, background:"#fff", borderLeft: `1px solid ${dT.hairline}`,
          display:"flex", flexDirection:"column",
        }}>{sproutPanel}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 1 — Welcome / signup splash (desktop)
// Single column, generous whitespace, mascot stage left
// ─────────────────────────────────────────────────────────────────────
function D_Welcome() {
  return (
    <DesktopFrame url="bloom.app/start" bg={dT.cream}>
      <div style={{flex:1, display:"flex", overflow:"hidden", position:"relative"}}>
        {/* Ambient blobs */}
        <div style={{position:"absolute", top: -60, left: 200, width: 320, height: 320, borderRadius:"50%", background: dT.cyan, opacity: 0.35, filter:"blur(60px)"}}/>
        <div style={{position:"absolute", bottom: 60, right: 100, width: 280, height: 280, borderRadius:"50%", background: dT.butter, opacity: 0.4, filter:"blur(60px)"}}/>

        {/* Left: hero */}
        <div style={{flex: 1.1, padding: "60px 0 60px 80px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", zIndex: 1}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <DM size={36}/>
            <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em"}}>bloom</div>
          </div>

          <div style={{maxWidth: 540}}>
            <div style={{display:"inline-flex", alignItems:"center", gap: 8, padding:"6px 12px", borderRadius: 999, background:"rgba(255,255,255,0.7)", border:`1px solid ${dT.hairline}`, fontSize: 12, fontWeight: 700, color: dT.ink, marginBottom: 22}}>
              <span style={{width: 6, height: 6, borderRadius:"50%", background: dT.flame}}/>
              500k+ job seekers · 4.8 ★
            </div>
            <div style={{fontFamily: dFD, fontSize: 80, fontWeight: 700, lineHeight: 0.95, letterSpacing:"-0.04em", color: dT.ink, marginBottom: 20}}>
              Apply to <span style={{position:"relative", display:"inline-block"}}>
                100+
                <svg viewBox="0 0 200 14" style={{position:"absolute", left: 0, right: 0, bottom: -2, width:"100%", height: 12}}>
                  <path d="M5 8 C 50 2, 100 12, 140 6 S 195 10, 195 5" stroke={dT.cyanInk} strokeWidth="5" fill="none" strokeLinecap="round"/>
                </svg>
              </span> jobs<br/>
              while you sleep.
            </div>
            <div style={{fontSize: 19, lineHeight: 1.5, color: dT.inkSoft, fontWeight: 500, marginBottom: 32, maxWidth: 480}}>
              Meet <b style={{color: dT.ink}}>Sprout</b> — your AI job-hunt copilot. It tailors every application, applies overnight, and surfaces only the roles you'd actually love.
            </div>
            <div style={{display:"flex", gap: 12, alignItems:"center"}}>
              <DB variant="primary" size="lg" style={{padding:"18px 32px", fontSize: 18}}>Start growing →</DB>
              <DB variant="ghost" size="lg" style={{padding:"18px 24px", fontSize: 16, border:"none"}}>Watch 60s tour</DB>
            </div>
            <div style={{display:"flex", gap: 24, marginTop: 32, fontSize: 13, color: dT.muted, fontWeight: 600}}>
              <div>⚡ 90-sec setup</div>
              <div>🌙 Applies while you sleep</div>
              <div>🎯 Only roles that fit</div>
            </div>
          </div>

          <div style={{fontSize: 12, color: dT.muted, fontWeight: 600}}>Free to start · no credit card required</div>
        </div>

        {/* Right: mascot + testimonial */}
        <div style={{flex: 0.95, padding: "60px 80px 60px 40px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap: 30, position:"relative", zIndex: 1}}>
          <div style={{position:"relative"}}>
            {/* Floating sparkles */}
            <div style={{position:"absolute", top: -20, right: -20, animation:"sprBob 3s ease-in-out infinite"}}><DSp size={36} color={dT.flame}/></div>
            <div style={{position:"absolute", bottom: 20, left: -40, animation:"sprBob 3.4s -0.7s ease-in-out infinite"}}><DSp size={26} color={dT.cyanInk}/></div>
            <div style={{position:"absolute", top: 80, right: -50, animation:"sprBob 4s -1.3s ease-in-out infinite"}}><DSp size={22} color={dT.butterInk}/></div>
            <DM size={260}/>
          </div>

          {/* Floating chat bubble */}
          <div style={{
            background:"#fff", borderRadius: 22, padding: "14px 18px", border: `1px solid ${dT.hairline}`,
            boxShadow:"0 12px 30px rgba(2,47,54,0.10)", maxWidth: 320,
            position:"relative", marginTop: -20,
          }}>
            <div style={{fontSize: 11, fontWeight: 800, color: dT.cyanInk, letterSpacing:"0.06em", marginBottom: 4}}>SPROUT, 4 MINUTES AGO</div>
            <div style={{fontSize: 14.5, color: dT.ink, lineHeight: 1.4, fontWeight: 500}}>
              "gm! I queued <b>7 applications</b> overnight. Linear is already viewing your profile 👀"
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 2 — Chat onboarding (desktop)
// Centered chat in a paper card, generous whitespace
// ─────────────────────────────────────────────────────────────────────
function D_Onboarding() {
  return (
    <DesktopFrame url="bloom.app/setup" bg={dT.cream}>
      <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
        {/* Top */}
        <div style={{padding:"22px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${dT.hairline}`}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <DM size={28}/>
            <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 18, letterSpacing:"-0.02em"}}>bloom</div>
          </div>
          <div style={{flex:1, maxWidth: 360, margin:"0 auto", display:"flex", alignItems:"center", gap: 12}}>
            <span style={{fontSize: 12, color: dT.muted, fontWeight: 700}}>STEP 1 OF 3</span>
            <div style={{flex:1, height: 6, background: dT.hairline, borderRadius: 99}}>
              <div style={{width:"34%", height:"100%", background: dT.ink, borderRadius: 99}}/>
            </div>
          </div>
          <button style={{fontSize: 13, color: dT.muted, fontWeight: 600}}>Save & exit</button>
        </div>

        {/* Chat area centered */}
        <div style={{flex:1, display:"flex", justifyContent:"center", overflowY:"auto", padding:"40px 32px"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", flexDirection:"column", gap: 16}}>
            {/* Sprout avatar header */}
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 12, marginBottom: 10}}>
              <DA size={64} cap={dT.cyan} mood="happy" ring/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize: 12, fontWeight: 800, color: dT.cyanInk, letterSpacing:"0.06em"}}>● SPROUT IS HERE</div>
                <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 26, color: dT.ink, letterSpacing:"-0.02em", marginTop: 4}}>Let's set you up</div>
              </div>
            </div>

            <DBu>Hey Vinodh! 👋 I'm Sprout. I'll handle the boring stuff — finding jobs, tailoring covers, filling forms — so you can focus on prep.</DBu>
            <DBu>I just need 90 seconds. <b>What kind of role are you hunting for?</b></DBu>

            <div style={{display:"flex", flexWrap:"wrap", gap: 8, marginTop: 4}}>
              {["Product Designer","Software Engineer","Product Manager","Data / ML","Marketing","Customer Success","Operations","Sales","Other →"].map((r,i)=>(
                <DC key={r} fill={i===0 ? dT.ink : "#fff"} ink={i===0 ? "#fff" : dT.ink} size="lg"
                    style={i===0 ? {} : {border: `1.5px solid ${dT.hairline}`}}>
                  {i===0 && "✓ "}{r}
                </DC>
              ))}
            </div>

            <DBu from="user" style={{marginTop: 4}}>Product Designer · Senior</DBu>

            <DBu>Nice. Where do you want to work from?</DBu>
            <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
              {["🌎 Anywhere remote","🇺🇸 Remote, US-only","🌉 SF Bay","🏙 NYC","🌆 LA","✈️ Hybrid OK","Other →"].map((l,i)=>(
                <DC key={l} fill={i===1 ? dT.cyan : "#fff"} ink={dT.ink} size="lg"
                    style={i===1 ? {} : {border: `1.5px solid ${dT.hairline}`}}>{l}</DC>
              ))}
            </div>

            <DBu from="user" style={{marginTop: 4}}>Remote, US-only</DBu>

            <DBu>Got it 📝 What about pay? Tap a range or type your own — I won't show you anything below it.</DBu>
            <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
              {["$120k+","$150k+","$180k+","$220k+","not sure yet"].map((l,i)=>(
                <DC key={l} fill={i===2 ? dT.cyan : "#fff"} ink={dT.ink} size="lg"
                    style={i===2 ? {} : {border: `1.5px solid ${dT.hairline}`}}>{l}</DC>
              ))}
            </div>
          </div>
        </div>

        {/* Composer */}
        <div style={{padding:"16px 32px 22px", borderTop: `1px solid ${dT.hairline}`, display:"flex", justifyContent:"center"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", gap: 10}}>
            <div style={{flex:1, display:"flex", alignItems:"center", gap: 8, background:"#fff", borderRadius: 999, padding:"6px 6px 6px 22px", border:`1.5px solid ${dT.hairline}`}}>
              <input placeholder="message Sprout, or tap a chip above…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 15, color: dT.ink, padding:"10px 0", fontFamily: dFB}}/>
              <button style={{width: 40, height: 40, borderRadius: 999, background: dT.ink, color:"#fff", border:"none", fontWeight: 700, fontSize: 18}}>↑</button>
            </div>
            <DB variant="paper" size="md">Next →</DB>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 3 — Résumé + AI summary (desktop)
// Split: drop area on left, Sprout's parsed understanding on right
// ─────────────────────────────────────────────────────────────────────
function D_Resume() {
  return (
    <DesktopFrame url="bloom.app/setup" bg={dT.cream}>
      <div style={{padding:"22px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${dT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 10}}>
          <DM size={28}/>
          <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 18, letterSpacing:"-0.02em"}}>bloom</div>
        </div>
        <div style={{flex:1, maxWidth: 360, margin:"0 auto", display:"flex", alignItems:"center", gap: 12}}>
          <span style={{fontSize: 12, color: dT.muted, fontWeight: 700}}>STEP 2 OF 3</span>
          <div style={{flex:1, height: 6, background: dT.hairline, borderRadius: 99}}>
            <div style={{width:"68%", height:"100%", background: dT.ink, borderRadius: 99}}/>
          </div>
        </div>
        <button style={{fontSize: 13, color: dT.muted, fontWeight: 600}}>Save & exit</button>
      </div>

      <div style={{flex: 1, display:"flex", padding: "32px", gap: 24, overflow:"hidden"}}>
        {/* Left — résumé upload */}
        <div style={{flex: 1, display:"flex", flexDirection:"column", gap: 18}}>
          <div>
            <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 32, letterSpacing:"-0.025em", color: dT.ink, marginBottom: 8}}>Show me your story.</div>
            <div style={{fontSize: 16, color: dT.inkSoft, fontWeight: 500, lineHeight: 1.5}}>Drop your résumé — I'll memorize it so every application I send sounds like you. <b>No forms</b>, I promise.</div>
          </div>

          {/* Drop area */}
          <div style={{flex:1, background:"#fff", border:`2px dashed ${dT.cyanInk}`, borderRadius: 24, padding: 32, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap: 14, minHeight: 280}}>
            <div style={{width: 64, height: 64, borderRadius: 18, background: dT.cyan, display:"grid", placeItems:"center", fontSize: 28}}>📄</div>
            <div>
              <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em", color: dT.ink}}>Drop your résumé</div>
              <div style={{fontSize: 14, color: dT.muted, fontWeight: 500, marginTop: 4}}>PDF or DOCX · or paste your LinkedIn</div>
            </div>
            <div style={{display:"flex", gap: 10, marginTop: 6}}>
              <DC fill={dT.cyan} size="lg">📎 Choose file</DC>
              <DC fill="#fff" ink={dT.ink} size="lg" style={{border:`1.5px solid ${dT.hairline}`}}>🔗 LinkedIn URL</DC>
            </div>
            <div style={{fontSize: 12, color: dT.muted, fontWeight: 600, marginTop: 4}}>or skip — Sprout can ask you 5 questions instead</div>
          </div>

          {/* Uploaded file (after) */}
          <div style={{background:"#fff", borderRadius: 16, padding: 14, border:`1px solid ${dT.hairline}`, display:"flex", alignItems:"center", gap: 12}}>
            <div style={{width: 36, height: 44, borderRadius: 6, background: dT.ink, color: dT.cyan, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 11}}>PDF</div>
            <div style={{flex:1, minWidth: 0}}>
              <div style={{fontSize: 14, fontWeight: 700, color: dT.ink}}>Vinodh_Resume_2026.pdf</div>
              <div style={{fontSize: 12, color: dT.muted, fontWeight: 600}}>342 KB · uploaded just now</div>
            </div>
            <div style={{fontSize: 12, color: dT.mintInk, fontWeight: 700, padding:"4px 10px", background: dT.mint, borderRadius: 999}}>✓ Read</div>
          </div>
        </div>

        {/* Right — Sprout's understanding */}
        <div style={{flex: 1.1, background:"#fff", borderRadius: 24, border:`1px solid ${dT.hairline}`, padding: 28, display:"flex", flexDirection:"column", gap: 18, overflow:"auto"}}>
          <div style={{display:"flex", alignItems:"center", gap: 12}}>
            <DA size={44} mood="happy" cap={dT.cyan}/>
            <div>
              <div style={{fontSize: 12, fontWeight: 800, color: dT.cyanInk, letterSpacing:"0.06em"}}>● SPROUT'S NOTES</div>
              <div style={{fontFamily: dFD, fontWeight: 700, fontSize: 20, color: dT.ink, letterSpacing:"-0.02em"}}>Here's what I learned. Fix anything wrong.</div>
            </div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap: 14, fontSize: 14}}>
            <SummaryRow label="You are" value="Senior Product Designer · 6 yrs · ex-Airbnb, Headspace"/>
            <SummaryRow label="Best at" chips={["Mobile design","Design systems","0→1 product","Workshop facilitation","User research","Figma"]} chipColor={dT.cyan}/>
            <SummaryRow label="Hunting for" chips={["Senior Product Designer","Remote · US","$180k+","Mid-stage startup"]} chipColor={dT.mint} chipInk={dT.mintInk}/>
            <SummaryRow label="Vibe" value={<>You like <b>shipping fast</b>, design-led teams, Series B–D. Big-co bureaucracy ≠ your thing.</>}/>
            <SummaryRow label="Avoid" chips={["Contract-only","On-site Bay Area","Agency","Series A pre-PMF"]} chipColor={dT.blush} chipInk={dT.blushInk}/>
          </div>

          <div style={{marginTop:"auto", padding: 14, background: dT.cream, borderRadius: 14, fontSize: 13, color: dT.inkSoft, fontWeight: 500, lineHeight: 1.5, border:`1px dashed ${dT.hairline}`}}>
            <b>🔒 Privacy:</b> Sprout only uses this to match jobs and tailor your applications. Never shared. Delete any time.
          </div>

          <DB variant="primary" size="lg" full>Looks right — show me jobs →</DB>
        </div>
      </div>
    </DesktopFrame>
  );
}

function SummaryRow({ label, value, chips, chipColor = dT.cyan, chipInk = dT.ink }) {
  return (
    <div>
      <div style={{fontSize: 11, fontWeight: 800, color: dT.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom: 6}}>{label}</div>
      {value && <div style={{fontSize: 15, color: dT.ink, fontWeight: 500, lineHeight: 1.45}}>{value}</div>}
      {chips && (
        <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
          {chips.map(c => (
            <span key={c} style={{padding:"5px 10px", borderRadius: 999, background: chipColor, color: chipInk, fontSize: 12, fontWeight: 700}}>{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DesktopFrame, AppShell, D_Welcome, D_Onboarding, D_Resume, SummaryRow });
