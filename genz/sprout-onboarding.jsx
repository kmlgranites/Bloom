// =====================================================================
// Onboarding — Chat-based "teach Sprout about you" flow
// Each screen is a moment in the conversation, designed for an iPhone frame.
// =====================================================================

const { sprT: oT, fontDisplay: oFD, fontBody: oFB,
        SproutMascot: OM, SproutWordmark: OW, SprChip: OC, SprBtn: OB, SprBubble: OBu,
        SprAvatar: OA, StatTile: OST, Sparkle: OSp, LivePill: OLP } = window;

// ─────────────────────────────────────────────────────────────────────
// 0. WELCOME — the very first screen after signup
// Big mascot, single CTA, no form. Sets the tone immediately.
// ─────────────────────────────────────────────────────────────────────
function OB_Welcome() {
  return (
    <div style={{
      height:"100%", background: oT.cream, color: oT.ink, fontFamily: oFB,
      display:"flex", flexDirection:"column", padding:"72px 28px 40px",
      position:"relative", overflow:"hidden",
    }}>
      {/* ambient blob */}
      <div style={{
        position:"absolute", top: -80, right: -60, width: 260, height: 260,
        borderRadius:"50%", background: oT.cyan, opacity: 0.4, filter:"blur(8px)",
      }}/>
      <div style={{
        position:"absolute", bottom: 120, left: -40, width: 200, height: 200,
        borderRadius:"50%", background: oT.butter, opacity: 0.5, filter:"blur(20px)",
      }}/>

      <div style={{display:"flex", justifyContent:"center"}}>
        <OW size={20}/>
      </div>

      <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap: 28, position:"relative", zIndex:1}}>
        {/* Mascot with floating sparkles */}
        <div style={{position:"relative"}}>
          <OM size={140}/>
          <div style={{position:"absolute", top: -8, right: -16, transform:"rotate(15deg)"}}><OSp size={28} color={oT.flame}/></div>
          <div style={{position:"absolute", bottom: 10, left: -22}}><OSp size={18} color={oT.cyanInk}/></div>
        </div>

        <div style={{textAlign:"center", maxWidth: 320}}>
          <div style={{fontFamily: oFD, fontWeight: 700, fontSize: 38, lineHeight: 1.05, letterSpacing:"-0.03em", color: oT.ink, marginBottom: 14}}>
            Meet Sprout.<br/>Your AI job‑hunt buddy.
          </div>
          <div style={{fontSize: 16, lineHeight: 1.45, color: oT.inkSoft, fontWeight: 500}}>
            Sprout finds jobs you'd actually love, tailors every application, and submits while you sleep.
          </div>
        </div>

        <div style={{display:"flex", gap: 8, flexWrap:"wrap", justifyContent:"center"}}>
          <OC fill={oT.cyan} size="sm">⚡ 2‑min setup</OC>
          <OC fill={oT.mint} size="sm">🌙 Applies overnight</OC>
          <OC fill={oT.butter} size="sm">🎯 Only roles that fit</OC>
        </div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap: 12, position:"relative", zIndex:1}}>
        <OB variant="primary" full>Let's get growing →</OB>
        <div style={{textAlign:"center", fontSize: 13, color: oT.muted, fontWeight: 500}}>
          Already have an account? <span style={{color: oT.ink, fontWeight: 700}}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 1. CHAT — Sprout asking about you, with tap chips
// "Teach your copilot about you" — feels like texting a friend
// ─────────────────────────────────────────────────────────────────────
function ChatHeader({ step = 1, total = 5 }) {
  const pct = (step / total) * 100;
  return (
    <div style={{padding: "12px 20px 8px", background: oT.cream, borderBottom: `1px solid ${oT.hairline}`}}>
      <div style={{display:"flex", alignItems:"center", gap: 12}}>
        <OA size={36} cap={oT.cyan} mood="happy" ring/>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize: 15, fontWeight: 700, color: oT.ink, lineHeight: 1.1}}>Sprout</div>
          <div style={{fontSize: 12, color: oT.cyanInk, fontWeight: 600, display:"flex", alignItems:"center", gap: 4}}>
            <span style={{width: 6, height: 6, borderRadius:"50%", background: oT.cyanInk}}/>
            getting to know you
          </div>
        </div>
        <div style={{fontSize: 12, color: oT.muted, fontWeight: 600}}>{step}/{total}</div>
      </div>
      <div style={{height: 4, background: oT.hairline, borderRadius: 99, marginTop: 12, overflow:"hidden"}}>
        <div style={{height:"100%", width: `${pct}%`, background: oT.ink, borderRadius: 99, transition:"width .3s"}}/>
      </div>
    </div>
  );
}

function OB_Chat1_Role() {
  return (
    <div style={{height:"100%", background: oT.cream, display:"flex", flexDirection:"column", paddingTop: 50}}>
      <ChatHeader step={1} total={5}/>

      <div style={{flex:1, padding: "20px 18px", display:"flex", flexDirection:"column", gap: 14, overflow:"hidden"}}>
        <OBu>Hey Vinodh! 👋 I'm Sprout. I'll handle the boring stuff so you can focus on prep.</OBu>
        <OBu>Quick q to get started — <b>what kind of role are you hunting for?</b></OBu>

        {/* Chip grid as "tap to reply" */}
        <div style={{display:"flex", flexWrap:"wrap", gap: 8, marginTop: 8}}>
          {["Product Designer","Software Engineer","Product Manager","Data Scientist","Marketing","Designer","UX Researcher","Other"].map((r,i)=>(
            <OC key={r} fill={i===0 ? oT.ink : "#fff"} ink={i===0 ? "#fff" : oT.ink}
                style={i===0 ? {} : {border: `1.5px solid ${oT.hairline}`}}>
              {i===0 && "✓ "}{r}
            </OC>
          ))}
        </div>

        {/* user reply preview */}
        <OBu from="user" style={{marginTop: 8}}>Product Designer</OBu>

        <OBu>Nice. Any specific flavour? Mid/Senior?</OBu>

        <div style={{display:"flex", gap: 8, flexWrap:"wrap"}}>
          {["Mid (3–5 yrs)","Senior (5–8)","Staff+","Open to anything"].map(l=>(
            <OC key={l} fill={l==="Senior (5–8)" ? oT.cyan : "#fff"} ink={oT.ink}
                style={l==="Senior (5–8)" ? {} : {border:`1.5px solid ${oT.hairline}`}}>{l}</OC>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div style={{padding: "10px 14px 16px", background: oT.cream, borderTop:`1px solid ${oT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 8, background:"#fff", borderRadius: 999, padding:"6px 6px 6px 18px", border: `1.5px solid ${oT.hairline}`}}>
          <input placeholder="type, or just tap a chip…" style={{
            flex:1, border:"none", outline:"none", background:"transparent",
            fontSize: 14.5, fontFamily: oFB, color: oT.ink, padding:"8px 0",
          }} defaultValue=""/>
          <button style={{
            width: 38, height: 38, borderRadius: 999, background: oT.ink, color:"#fff",
            border:"none", fontWeight: 700, fontSize: 18, cursor:"pointer",
          }}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 2. CHAT — resume drop (no form, just drag a file at Sprout)
// ─────────────────────────────────────────────────────────────────────
function OB_Chat2_Resume() {
  return (
    <div style={{height:"100%", background: oT.cream, display:"flex", flexDirection:"column", paddingTop: 50}}>
      <ChatHeader step={3} total={5}/>

      <div style={{flex:1, padding: "20px 18px", display:"flex", flexDirection:"column", gap: 14}}>
        <OBu>Cool — Senior Product Designer, remote, US-based. Got it 📝</OBu>
        <OBu><b>Now drop your résumé</b> and I'll memorize your story. PDF, DOCX, even LinkedIn — whatever you have.</OBu>

        {/* Drag-drop card styled like a chat attachment */}
        <div style={{
          background: "#fff", border: `2px dashed ${oT.cyanInk}`, borderRadius: 24,
          padding: "22px 20px", textAlign:"center", marginTop: 6,
        }}>
          <div style={{fontSize: 34, marginBottom: 6}}>📄</div>
          <div style={{fontSize: 15, fontWeight: 700, color: oT.ink, marginBottom: 4}}>Drop your résumé here</div>
          <div style={{fontSize: 13, color: oT.muted, fontWeight: 500, marginBottom: 14}}>or tap to browse</div>
          <div style={{display:"flex", gap: 8, justifyContent:"center"}}>
            <OC fill={oT.cyan} size="sm">📎 Upload file</OC>
            <OC fill="#fff" ink={oT.ink} size="sm" style={{border:`1.5px solid ${oT.hairline}`}}>🔗 LinkedIn URL</OC>
          </div>
        </div>

        <OBu from="user" style={{marginTop: 4}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <div style={{
              width: 32, height: 40, borderRadius: 6, background: "#fff", color: oT.ink,
              display:"grid", placeItems:"center", fontSize: 10, fontWeight: 800,
            }}>PDF</div>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize: 14, fontWeight: 700, lineHeight: 1.1}}>Vinodh_Resume_2026.pdf</div>
              <div style={{fontSize: 12, opacity: 0.7}}>342 KB</div>
            </div>
          </div>
        </OBu>

        {/* Sprout typing / thinking */}
        <div style={{display:"flex", alignItems:"flex-end", gap: 8}}>
          <OA size={28} mood="thinking"/>
          <div style={{
            background:"#fff", padding:"10px 14px", borderRadius: "18px 18px 18px 6px",
            border: `1px solid ${oT.hairline}`, display:"flex", gap: 4,
          }}>
            <span style={{width: 7, height: 7, borderRadius:"50%", background: oT.muted, animation:"sprPulse 1.4s -0.2s infinite"}}/>
            <span style={{width: 7, height: 7, borderRadius:"50%", background: oT.muted, animation:"sprPulse 1.4s 0s infinite"}}/>
            <span style={{width: 7, height: 7, borderRadius:"50%", background: oT.muted, animation:"sprPulse 1.4s 0.2s infinite"}}/>
          </div>
        </div>
      </div>

      <div style={{padding: "10px 14px 16px", background: oT.cream, borderTop:`1px solid ${oT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 8, background:"#fff", borderRadius: 999, padding:"6px 6px 6px 18px", border: `1.5px solid ${oT.hairline}`}}>
          <span style={{flex:1, fontSize: 14.5, color: oT.muted, fontWeight: 500}}>Sprout is reading…</span>
          <div style={{width: 38, height: 38, borderRadius: 999, background: oT.hairline}}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 3. CHAT — Sprout summarises what it learned (AI personality moment)
// ─────────────────────────────────────────────────────────────────────
function OB_Chat3_Summary() {
  return (
    <div style={{height:"100%", background: oT.cream, display:"flex", flexDirection:"column", paddingTop: 50}}>
      <ChatHeader step={4} total={5}/>

      <div style={{flex:1, padding: "20px 18px", display:"flex", flexDirection:"column", gap: 14, overflow:"auto"}}>
        <OBu>Okay — done reading. Here's what I'm taking away. <b>Tap anything to fix.</b></OBu>

        {/* Summary card */}
        <div style={{
          background:"#fff", border: `1px solid ${oT.hairline}`, borderRadius: 22, padding: 18,
          display:"flex", flexDirection:"column", gap: 14,
        }}>
          <div>
            <div style={{fontSize: 11, fontWeight: 700, color: oT.muted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom: 4}}>You are</div>
            <div style={{fontSize: 17, fontWeight: 700, color: oT.ink, fontFamily: oFD, letterSpacing:"-0.01em"}}>Senior Product Designer · 6 yrs · ex-Airbnb, Headspace</div>
          </div>

          <div>
            <div style={{fontSize: 11, fontWeight: 700, color: oT.muted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom: 6}}>Your superpowers</div>
            <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
              {["Mobile design","Design systems","0→1 product","Workshop facilitation","Figma","User research"].map(s =>(
                <span key={s} style={{padding:"5px 10px", borderRadius: 999, background: oT.cyan, color: oT.ink, fontSize: 12, fontWeight: 700}}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontSize: 11, fontWeight: 700, color: oT.muted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom: 6}}>Searching for</div>
            <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
              <span style={{padding:"5px 10px", borderRadius: 999, background: oT.mint, color: oT.mintInk, fontSize: 12, fontWeight: 700}}>Senior Product Designer</span>
              <span style={{padding:"5px 10px", borderRadius: 999, background: oT.mint, color: oT.mintInk, fontSize: 12, fontWeight: 700}}>Remote · US</span>
              <span style={{padding:"5px 10px", borderRadius: 999, background: oT.mint, color: oT.mintInk, fontSize: 12, fontWeight: 700}}>$160k+</span>
            </div>
          </div>

          <div>
            <div style={{fontSize: 11, fontWeight: 700, color: oT.muted, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom: 6}}>Vibe</div>
            <div style={{fontSize: 14, color: oT.inkSoft, lineHeight: 1.45, fontWeight: 500}}>
              You like <b>shipping fast</b>, design-led teams, and mid-stage startups (Series B–D). Big-co policy heavy ≠ your thing.
            </div>
          </div>
        </div>

        <OBu>Look right? I can already see <b style={{color: oT.flame}}>42 matches</b> on the other side of this screen 👀</OBu>
      </div>

      <div style={{padding: "14px 18px 18px", background: oT.cream, borderTop:`1px solid ${oT.hairline}`, display:"flex", gap: 10}}>
        <OB variant="paper" size="md" style={{flex: 1}}>Edit something</OB>
        <OB variant="primary" size="md" style={{flex: 1.4}}>Looks good — show me jobs →</OB>
      </div>
    </div>
  );
}

Object.assign(window, { OB_Welcome, OB_Chat1_Role, OB_Chat2_Resume, OB_Chat3_Summary });
