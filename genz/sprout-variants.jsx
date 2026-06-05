// =====================================================================
// Variants — same momentum/home hero in three visual languages
// + Push notifications / lock-screen moment (ROI-forward "while you slept")
// =====================================================================
const { sprT: vT, fontDisplay: vFD, fontBody: vFB,
        SproutMascot: VM, SprChip: VC, SprBtn: VB, LivePill: VLP } = window;

// ─────────────────────────────────────────────────────────────────────
// VARIANT A — "Bloom Classic" — closer to current design system
// Teal heavy, refined, less playful
// ─────────────────────────────────────────────────────────────────────
function Variant_BloomClassic() {
  return (
    <div style={{height:"100%", background:"#FAFAFA", paddingTop: 50, paddingBottom: 30, color: vT.ink, fontFamily: vFB, display:"flex", flexDirection:"column"}}>
      <div style={{padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div style={{fontSize: 13, color: vT.muted, fontWeight: 500}}>Welcome back,</div>
          <div style={{fontSize: 20, fontWeight: 700, color: vT.ink, lineHeight: 1.1}}>Vinodh</div>
        </div>
        <div style={{width: 36, height: 36, borderRadius:"50%", background:"#E5E7EB"}}/>
      </div>

      <div style={{margin: "8px 18px 12px", background:"#fff", border:`1px solid ${vT.hairlineCool}`, borderRadius: 14, padding: 18, boxShadow:"0 2px 4px -2px rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0,0,0,0.06)"}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
          <div style={{fontSize: 12, fontWeight: 700, color: vT.cyanInk, textTransform:"uppercase", letterSpacing:"0.05em"}}>● Active</div>
          <div style={{fontSize: 11, color: vT.muted, fontWeight: 600}}>Last 24h</div>
        </div>
        <div style={{fontSize: 22, fontWeight: 700, color: vT.ink, lineHeight: 1.15, marginBottom: 14}}>Your Bloom AI applied to 7 jobs while you were away.</div>
        <div style={{display:"flex", gap: 8}}>
          {[{v:"7", l:"Applied"},{v:"4", l:"Review"},{v:"2", l:"Replies"}].map(s => (
            <div key={s.l} style={{flex:1, background:"#F5F6F7", borderRadius: 10, padding:"10px 12px"}}>
              <div style={{fontSize: 24, fontWeight: 700, color: vT.ink, fontFamily:'"Inter",sans-serif'}}>{s.v}</div>
              <div style={{fontSize: 11, fontWeight: 600, color: vT.muted, marginTop: 2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"4px 18px 12px"}}>
        <div style={{fontSize: 15, fontWeight: 700, marginBottom: 8}}>Needs review</div>
        {[{c:"Linear",r:"Sr. Product Designer", m:"96"},{c:"Figma",r:"Staff Product Designer", m:"91"}].map(j=>(
          <div key={j.c} style={{background:"#fff", border:`1px solid ${vT.hairlineCool}`, borderRadius: 10, padding: 12, marginBottom: 8, display:"flex", gap: 10, alignItems:"center"}}>
            <div style={{width: 36, height: 36, borderRadius: 8, background:"#5E6AD2"}}/>
            <div style={{flex:1, minWidth: 0}}>
              <div style={{fontSize: 14, fontWeight: 700}}>{j.r}</div>
              <div style={{fontSize: 12, color: vT.muted, fontWeight: 500}}>{j.c} · {j.m}% match</div>
            </div>
            <button style={{padding:"6px 12px", borderRadius: 999, background: vT.ink, color:"#fff", border:"none", fontSize: 12, fontWeight: 700}}>Review</button>
          </div>
        ))}
      </div>
      <div style={{padding:"8px 18px", color: vT.muted, fontSize: 11, fontWeight: 600, textAlign:"center"}}>SAFE · stays inside current design system</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VARIANT C — "Mushroom Land" — the weird Gen Z option
// Saturated gradient + hand-drawn underlines + sticker chips
// ─────────────────────────────────────────────────────────────────────
function Variant_MushroomLand() {
  return (
    <div style={{
      height:"100%", paddingTop: 50, paddingBottom: 30, color: vT.ink, fontFamily: vFB,
      background: `linear-gradient(160deg, #FFE7CC 0%, #FFDCEE 50%, #D7F2FF 100%)`,
      display:"flex", flexDirection:"column", overflow:"hidden",
    }}>
      {/* gradient mesh blobs */}
      <div style={{position:"absolute", top: 80, left: -50, width: 220, height: 220, borderRadius:"50%", background: vT.cyan, opacity: 0.4, filter:"blur(40px)"}}/>
      <div style={{position:"absolute", top: 200, right: -40, width: 180, height: 180, borderRadius:"50%", background: vT.flame, opacity: 0.3, filter:"blur(40px)"}}/>

      <div style={{padding:"10px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1}}>
        <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em"}}>gm vinodh ☀️</div>
        <div style={{width: 38, height: 38, borderRadius:"50%", background: vT.ink, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 12, transform:"rotate(-4deg)", border: `2px solid #fff`}}>VK</div>
      </div>

      <div style={{padding: "20px 22px", position:"relative", zIndex:1}}>
        <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 42, lineHeight: 0.95, letterSpacing:"-0.04em", color: vT.ink}}>
          you slept.<br/>
          <span style={{position:"relative", display:"inline-block"}}>
            i applied.
            <svg viewBox="0 0 200 16" style={{position:"absolute", bottom:-6, left:0, width:"100%", height:14}}>
              <path d="M5 8 C 40 2, 80 14, 120 6 S 180 12, 195 5" stroke={vT.flame} strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
        <div style={{fontSize: 16, fontWeight: 600, color: vT.inkSoft, marginTop: 14, lineHeight: 1.4}}>
          7 fresh applications. 2 already 👀ing your profile.
        </div>
      </div>

      {/* Sticker stat blobs */}
      <div style={{padding:"6px 22px", display:"flex", gap: 10, position:"relative", zIndex:1, flexWrap:"wrap"}}>
        <div style={{background:"#fff", borderRadius: 22, padding:"12px 18px", border:`2px solid ${vT.ink}`, transform:"rotate(-2deg)", boxShadow:`4px 4px 0 ${vT.ink}`, display:"flex", flexDirection:"column", gap: 2}}>
          <div style={{fontFamily: vFD, fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing:"-0.03em"}}>7</div>
          <div style={{fontSize: 11, fontWeight: 700, textTransform:"uppercase", letterSpacing:"0.05em"}}>applied</div>
        </div>
        <div style={{background: vT.cyan, borderRadius: 22, padding:"12px 18px", border:`2px solid ${vT.ink}`, transform:"rotate(2deg)", boxShadow:`4px 4px 0 ${vT.ink}`}}>
          <div style={{fontFamily: vFD, fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing:"-0.03em"}}>3h 20m</div>
          <div style={{fontSize: 11, fontWeight: 700, textTransform:"uppercase", letterSpacing:"0.05em"}}>saved</div>
        </div>
        <div style={{background: vT.flame, color:"#fff", borderRadius: 22, padding:"12px 18px", border:`2px solid ${vT.ink}`, transform:"rotate(-1deg)", boxShadow:`4px 4px 0 ${vT.ink}`}}>
          <div style={{fontFamily: vFD, fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing:"-0.03em"}}>2 👀</div>
          <div style={{fontSize: 11, fontWeight: 700, textTransform:"uppercase", letterSpacing:"0.05em"}}>new replies</div>
        </div>
      </div>

      {/* Mascot doing thing card */}
      <div style={{margin:"18px 18px 0", background:"#fff", border:`2px solid ${vT.ink}`, borderRadius: 26, padding: 18, position:"relative", zIndex:1, boxShadow:`6px 6px 0 ${vT.ink}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 12, marginBottom: 10}}>
          <VM size={48} cap={vT.cyan} mood="working"/>
          <div style={{flex:1}}>
            <div style={{fontSize: 11, fontWeight: 800, color: vT.flame, letterSpacing:"0.05em"}}>● LIVE</div>
            <div style={{fontSize: 14, fontWeight: 700}}>sprout is on it</div>
          </div>
          <div style={{fontSize: 11, color: vT.muted, fontWeight: 600}}>now</div>
        </div>
        <div style={{fontSize: 14, fontWeight: 500, lineHeight: 1.45, color: vT.ink}}>tailoring your application for <b style={{background: vT.butter, padding:"1px 5px", borderRadius: 4}}>Vercel · Senior Designer</b> — your DX work fits like a glove ✨</div>
      </div>

      <div style={{padding:"8px 18px", color: vT.muted, fontSize: 11, fontWeight: 700, textAlign:"center", letterSpacing:"0.04em"}}>BOLD · invents a Gen Z visual language</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PUSH NOTIFICATIONS — momentum reinforcement on lock screen
// ─────────────────────────────────────────────────────────────────────
function LockScreen() {
  return (
    <div style={{
      height:"100%", paddingTop: 56,
      background: `linear-gradient(180deg, #0a3640 0%, #022F36 60%, #061a1f 100%)`,
      color:"#fff", fontFamily: vFB, display:"flex", flexDirection:"column",
      position:"relative", overflow:"hidden",
    }}>
      {/* cyan glow */}
      <div style={{position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)", width: 360, height: 360, borderRadius:"50%", background: vT.cyan, opacity: 0.10, filter:"blur(50px)"}}/>

      {/* Lock screen time */}
      <div style={{textAlign:"center", marginTop: 30, marginBottom: 30, position:"relative", zIndex:1}}>
        <div style={{fontSize: 13, fontWeight: 600, opacity: 0.7, letterSpacing:"0.04em"}}>Friday, May 22</div>
        <div style={{fontFamily:'-apple-system, sans-serif', fontSize: 78, fontWeight: 300, letterSpacing:"-0.03em", lineHeight: 1, marginTop: 4}}>9:41</div>
      </div>

      {/* Stacked notifications */}
      <div style={{padding: "0 12px", display:"flex", flexDirection:"column", gap: 8, position:"relative", zIndex:1}}>
        {/* Hero notification — Sprout */}
        <div style={{
          background:"rgba(255,255,255,0.14)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.18)", borderRadius: 20, padding: "12px 14px",
          display:"flex", gap: 10, alignItems:"flex-start",
        }}>
          <div style={{width: 38, height: 38, borderRadius: 10, background: vT.cyan, display:"grid", placeItems:"center", flexShrink: 0}}>
            <VM size={32} cap={vT.cyan} mood="happy"/>
          </div>
          <div style={{flex:1, minWidth: 0}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom: 2}}>
              <div style={{fontSize: 13, fontWeight: 700}}>BLOOM · SPROUT</div>
              <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600}}>now</div>
            </div>
            <div style={{fontSize: 14, lineHeight: 1.35, fontWeight: 500}}>
              Applied to <b>7 jobs</b> overnight 🌙 — Linear is already viewing your profile. <span style={{opacity: 0.65}}>Tap to see the queue.</span>
            </div>
          </div>
        </div>

        {/* Reply notification */}
        <div style={{
          background:"rgba(255,255,255,0.12)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.14)", borderRadius: 18, padding: "10px 14px",
          display:"flex", gap: 10, alignItems:"center",
        }}>
          <div style={{width: 32, height: 32, borderRadius: 8, background:"#5E6AD2", display:"grid", placeItems:"center", color:"#fff", fontWeight: 800, fontSize: 14}}>L</div>
          <div style={{flex:1}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom: 1}}>
              <div style={{fontSize: 12, fontWeight: 700}}>LINEAR</div>
              <div style={{fontSize: 11, opacity: 0.7}}>3m ago</div>
            </div>
            <div style={{fontSize: 13, lineHeight: 1.3, fontWeight: 500}}>"Hey Vinodh — loved your portfolio. Free for 30 min next week?"</div>
          </div>
        </div>

        {/* Streak notification */}
        <div style={{
          background:"rgba(255,255,255,0.10)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "10px 14px",
          display:"flex", gap: 10, alignItems:"center", opacity: 0.85,
        }}>
          <div style={{width: 32, height: 32, borderRadius: 8, background: vT.flame, display:"grid", placeItems:"center", fontSize: 16}}>🔥</div>
          <div style={{flex:1}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom: 1}}>
              <div style={{fontSize: 12, fontWeight: 700}}>BLOOM</div>
              <div style={{fontSize: 11, opacity: 0.7}}>1h ago</div>
            </div>
            <div style={{fontSize: 13, lineHeight: 1.3, fontWeight: 500}}>14-day streak unlocked. You've sent <b>96 applications</b> this month.</div>
          </div>
        </div>
      </div>

      {/* Sprout ambient peek */}
      <div style={{flex:1, display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom: 30, position:"relative", zIndex:1}}>
        <div style={{textAlign:"center"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap: 8, background:"rgba(255,255,255,0.1)", padding:"6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: vT.cyan, backdropFilter:"blur(20px)"}}>
            <span style={{width: 6, height: 6, borderRadius:"50%", background: vT.cyan, animation:"sprPulse 1.6s infinite"}}/>
            Sprout is applying · 12 in queue
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SETTINGS / Sprout personality
// ─────────────────────────────────────────────────────────────────────
function SproutChat() {
  return (
    <div style={{height:"100%", background: vT.cream, paddingTop: 50, paddingBottom: 30, display:"flex", flexDirection:"column", color: vT.ink}}>
      <div style={{padding:"10px 18px 14px", display:"flex", alignItems:"center", gap: 12, borderBottom:`1px solid ${vT.hairline}`}}>
        <div style={{width: 42, height: 42, borderRadius:"50%", background: vT.cyan, display:"grid", placeItems:"center", border:`2px solid ${vT.ink}`}}>
          <VM size={32} cap={vT.cyan} mood="happy"/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize: 16, fontWeight: 700, fontFamily: vFD, letterSpacing:"-0.01em"}}>Sprout</div>
          <div style={{fontSize: 12, color: vT.cyanInk, fontWeight: 700}}>● actively applying · 12 in queue</div>
        </div>
        <button style={{fontSize: 18, color: vT.ink, fontWeight: 700, padding: 6}}>···</button>
      </div>

      <div style={{flex:1, padding:"16px 16px", display:"flex", flexDirection:"column", gap: 12, overflow:"auto"}}>
        <div style={{textAlign:"center", fontSize: 11, color: vT.muted, fontWeight: 700}}>TODAY · 6:42 AM</div>

        <div style={{display:"flex", gap: 8, alignItems:"flex-start"}}>
          <div style={{width: 28, height: 28, borderRadius:"50%", background: vT.cyan, display:"grid", placeItems:"center", flexShrink: 0}}>
            <VM size={22} cap={vT.cyan}/>
          </div>
          <div style={{flex: 1, display:"flex", flexDirection:"column", gap: 4}}>
            <div style={{background:"#fff", padding:"10px 14px", borderRadius:"18px 18px 18px 6px", border:`1px solid ${vT.hairline}`, fontSize: 14, lineHeight: 1.4, fontWeight: 500, maxWidth:"82%"}}>
              gm! while you slept I submitted to 7 places. 2 are 95%+ fit — Linear and Stripe ✨
            </div>
            <div style={{background:"#fff", padding:"10px 14px", borderRadius:"18px 18px 18px 6px", border:`1px solid ${vT.hairline}`, fontSize: 14, lineHeight: 1.4, fontWeight: 500, maxWidth:"82%"}}>
              Linear just opened your profile (3 min ago 👀). Want me to draft a follow-up?
            </div>
            <div style={{display:"flex", gap: 6, marginTop: 4}}>
              <VC fill={vT.ink} ink="#fff" size="sm">Yes, draft it</VC>
              <VC fill="#fff" ink={vT.ink} size="sm" style={{border:`1.5px solid ${vT.hairline}`}}>Not yet</VC>
              <VC fill="#fff" ink={vT.ink} size="sm" style={{border:`1.5px solid ${vT.hairline}`}}>Show me roles like this</VC>
            </div>
          </div>
        </div>

        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <div style={{background: vT.ink, color:"#fff", padding:"10px 14px", borderRadius:"18px 18px 6px 18px", fontSize: 14, fontWeight: 500, maxWidth:"82%"}}>
            yes please. and maybe slow down on remote-only?
          </div>
        </div>

        <div style={{display:"flex", gap: 8, alignItems:"flex-start"}}>
          <div style={{width: 28, height: 28, borderRadius:"50%", background: vT.cyan, display:"grid", placeItems:"center", flexShrink: 0}}>
            <VM size={22} cap={vT.cyan} mood="thinking"/>
          </div>
          <div style={{flex: 1}}>
            <div style={{background:"#fff", padding:"10px 14px", borderRadius:"18px 18px 18px 6px", border:`1px solid ${vT.hairline}`, fontSize: 14, lineHeight: 1.4, fontWeight: 500, maxWidth:"82%"}}>
              On it. Opening up to hybrid SF/NY too?
            </div>
            <div style={{display:"flex", gap: 6, marginTop: 6}}>
              <VC fill={vT.cyan} ink={vT.ink} size="sm">SF hybrid</VC>
              <VC fill={vT.cyan} ink={vT.ink} size="sm">NY hybrid</VC>
              <VC fill="#fff" ink={vT.ink} size="sm" style={{border:`1.5px solid ${vT.hairline}`}}>no, keep remote</VC>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:"10px 14px 16px", borderTop:`1px solid ${vT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 8, background:"#fff", borderRadius: 999, padding:"6px 6px 6px 18px", border:`1.5px solid ${vT.hairline}`}}>
          <input placeholder="message Sprout…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 14.5, fontFamily: vFB, color: vT.ink, padding:"8px 0"}}/>
          <button style={{width: 38, height: 38, borderRadius: 999, background: vT.ink, color:"#fff", border:"none", fontSize: 18, fontWeight: 700}}>↑</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Variant_BloomClassic, Variant_MushroomLand, LockScreen, SproutChat });
