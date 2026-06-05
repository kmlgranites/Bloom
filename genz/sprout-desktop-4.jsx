// =====================================================================
// Bloom V4 — Refined per product feedback
// • Two modes only (Auto Apply / Review Before Submit)
// • Conversational review replaces doc-style form editing
// • B2C copy refresh — time / stress / interviews / control / AI heavy lifting
// • Reinforces single copilot framing
// =====================================================================
const {
  sprT: vT, fontDisplay: vFD, fontBody: vFB, fontData: vFData,
  SproutMascot: VM, SprChip: VC, SprBtn: VB, SprBubble: VBu,
  SprAvatar: VA, Sparkle: VSp, LivePill: VLP,
  DesktopFrame: VFrame, AppShell: VShell, MainHeader: VHead,
} = window;

// ─────────────────────────────────────────────────────────────────────
// SCREEN — Welcome (V4)
// Refreshed messaging around the 5 emotional pillars.
// ─────────────────────────────────────────────────────────────────────
function D_Welcome_v4() {
  return (
    <VFrame url="bloom.app" bg={vT.cream}>
      <div style={{flex:1, display:"flex", overflow:"hidden", position:"relative"}}>
        <div style={{position:"absolute", top: -60, left: 180, width: 340, height: 340, borderRadius:"50%", background: vT.cyan, opacity: 0.32, filter:"blur(60px)"}}/>
        <div style={{position:"absolute", bottom: 40, right: 80, width: 300, height: 300, borderRadius:"50%", background: vT.butter, opacity: 0.4, filter:"blur(60px)"}}/>

        <div style={{flex: 1.1, padding: "56px 0 56px 80px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", zIndex: 1}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <VM size={36}/>
            <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em"}}>bloom</div>
          </div>

          <div style={{maxWidth: 560}}>
            <div style={{display:"inline-flex", alignItems:"center", gap: 8, padding:"6px 12px", borderRadius: 999, background:"rgba(255,255,255,0.7)", border:`1px solid ${vT.hairline}`, fontSize: 12, fontWeight: 700, color: vT.ink, marginBottom: 22}}>
              <span style={{width: 6, height: 6, borderRadius:"50%", background: vT.flame}}/>
              500k+ job seekers · 4.8 ★ · 3.4× more interviews
            </div>
            <div style={{fontFamily: vFD, fontSize: 78, fontWeight: 700, lineHeight: 0.95, letterSpacing:"-0.04em", color: vT.ink, marginBottom: 22}}>
              The job search<br/>
              <span style={{position:"relative", display:"inline-block"}}>
                shouldn't
                <svg viewBox="0 0 240 14" style={{position:"absolute", left: 0, right: 0, bottom: -2, width:"100%", height: 12}}>
                  <path d="M5 8 C 60 2, 120 12, 170 6 S 235 10, 235 5" stroke={vT.cyanInk} strokeWidth="5" fill="none" strokeLinecap="round"/>
                </svg>
              </span> wreck you.
            </div>
            <div style={{fontSize: 19, lineHeight: 1.5, color: vT.inkSoft, fontWeight: 500, marginBottom: 28, maxWidth: 500}}>
              Meet <b style={{color: vT.ink}}>Sprout</b> — one AI that runs your whole job hunt. It finds the roles, writes the applications, and gets you more interviews. You stay in control of what goes out.
            </div>

            {/* Five-pillar strip — replaces the cliched feature list */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 8, marginBottom: 28, maxWidth: 560}}>
              {[
                {ic:"⏱", h:"3h saved /day"},
                {ic:"💆", h:"Less stress"},
                {ic:"📈", h:"3.4× interviews"},
                {ic:"🎚", h:"You're in control"},
                {ic:"🧠", h:"AI does the work"},
              ].map(p => (
                <div key={p.h} style={{background:"rgba(255,255,255,0.7)", border:`1px solid ${vT.hairline}`, borderRadius: 14, padding:"10px 8px", textAlign:"center"}}>
                  <div style={{fontSize: 22, marginBottom: 4}}>{p.ic}</div>
                  <div style={{fontSize: 11.5, fontWeight: 700, color: vT.ink, letterSpacing:"-0.01em"}}>{p.h}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex", gap: 12, alignItems:"center"}}>
              <VB variant="primary" size="lg" style={{padding:"18px 32px", fontSize: 18}}>Start with Sprout →</VB>
              <VB variant="ghost" size="lg" style={{padding:"18px 24px", fontSize: 16, border:"none"}}>Watch 60s tour</VB>
            </div>
            <div style={{fontSize: 13, color: vT.muted, fontWeight: 600, marginTop: 18}}>90-second setup · Free to start · No credit card</div>
          </div>

          <div style={{fontSize: 12, color: vT.muted, fontWeight: 600}}>One copilot. Every application. Less grind.</div>
        </div>

        <div style={{flex: 0.95, padding: "56px 80px 56px 40px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap: 28, position:"relative", zIndex: 1}}>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute", top: -20, right: -20, animation:"sprBob 3s ease-in-out infinite"}}><VSp size={36} color={vT.flame}/></div>
            <div style={{position:"absolute", bottom: 20, left: -40, animation:"sprBob 3.4s -0.7s ease-in-out infinite"}}><VSp size={26} color={vT.cyanInk}/></div>
            <div style={{position:"absolute", top: 80, right: -50, animation:"sprBob 4s -1.3s ease-in-out infinite"}}><VSp size={22} color={vT.butterInk}/></div>
            <VM size={250}/>
          </div>

          <div style={{background:"#fff", borderRadius: 22, padding: "14px 18px", border: `1px solid ${vT.hairline}`, boxShadow:"0 12px 30px rgba(2,47,54,0.10)", maxWidth: 340, marginTop: -10}}>
            <div style={{fontSize: 11, fontWeight: 800, color: vT.cyanInk, letterSpacing:"0.06em", marginBottom: 4}}>SPROUT · 4 MIN AGO</div>
            <div style={{fontSize: 14.5, color: vT.ink, lineHeight: 1.4, fontWeight: 500}}>
              "Drafted <b>7 applications</b> overnight. They're ready when you are — want to look?"
            </div>
            <div style={{display:"flex", gap: 6, marginTop: 10}}>
              <VC fill={vT.cyan} size="sm">Review the 7 →</VC>
              <VC fill="#fff" ink={vT.ink} size="sm" style={{border:`1px solid ${vT.hairline}`}}>Later</VC>
            </div>
          </div>
        </div>
      </div>
    </VFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN — Mode picker V4 (TWO modes, per spec)
// ─────────────────────────────────────────────────────────────────────
function ModeCard_v4({ kind, badge, badgeBg, title, tagline, mood, cap, fill, ink, selected, bullets, stats, footer, cta }) {
  return (
    <div style={{
      flex: 1, background: fill, borderRadius: 28, padding: "30px 30px 26px",
      border: selected ? `2.5px solid ${vT.ink}` : `2.5px solid transparent`,
      color: ink, position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column",
      transform: selected ? "translateY(-6px)" : "translateY(0)",
      boxShadow: selected ? "0 28px 60px -22px rgba(2,47,54,0.28)" : "none",
    }}>
      {selected && (
        <div style={{position:"absolute", top: 16, right: 16, padding:"5px 12px", borderRadius: 999, background: vT.ink, color:"#fff", fontSize: 11, fontWeight: 800, letterSpacing:"0.05em"}}>RECOMMENDED</div>
      )}

      <div style={{display:"flex", alignItems:"flex-start", gap: 18, marginBottom: 18}}>
        <div style={{width: 96, height: 96, borderRadius: 24, background:"rgba(2,47,54,0.08)", display:"grid", placeItems:"center", flexShrink: 0}}>
          <VM size={76} cap={cap} mood={mood}/>
        </div>
        <div style={{flex:1, paddingTop: 6}}>
          <div style={{display:"inline-flex", padding:"5px 11px", borderRadius: 999, background: badgeBg, fontSize: 11, fontWeight: 800, color: ink, marginBottom: 8, letterSpacing:"0.04em"}}>{badge}</div>
          <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 30, lineHeight: 1.04, letterSpacing:"-0.03em"}}>{title}</div>
          <div style={{fontSize: 14, opacity: 0.7, fontWeight: 600, marginTop: 6, lineHeight: 1.35}}>{tagline}</div>
        </div>
      </div>

      {/* Flow diagram — visual differentiator between modes */}
      <div style={{display:"flex", alignItems:"center", gap: 6, background:"rgba(2,47,54,0.06)", borderRadius: 14, padding:"12px 14px", marginBottom: 20}}>
        {kind === "auto" ? (
          <>
            <FlowStep label="Sprout finds"/>
            <FlowArrow/>
            <FlowStep label="Sprout fills"/>
            <FlowArrow/>
            <FlowStep label="Sprout sends" highlight/>
          </>
        ) : (
          <>
            <FlowStep label="Sprout finds"/>
            <FlowArrow/>
            <FlowStep label="Sprout fills"/>
            <FlowArrow/>
            <FlowStep label="You approve" highlight/>
            <FlowArrow/>
            <FlowStep label="Sent"/>
          </>
        )}
      </div>

      <div style={{flex:1, display:"flex", flexDirection:"column", gap: 11, marginBottom: 22}}>
        {bullets.map((b,i) => (
          <div key={i} style={{display:"flex", gap: 12, fontSize: 14.5, color: ink, fontWeight: 500, opacity: 0.92, lineHeight: 1.4}}>
            <span style={{flexShrink:0, fontSize: 16}}>{b.icon}</span>
            <span>{b.text}</span>
          </div>
        ))}
      </div>

      <div style={{display:"flex", gap: 12, padding:"14px 0", borderTop:`1.5px solid rgba(2,47,54,0.12)`, marginBottom: 18}}>
        {stats.map((s,i) => (
          <div key={i} style={{flex: 1}}>
            <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 24, letterSpacing:"-0.025em", lineHeight: 1}}>{s.v}</div>
            <div style={{fontSize: 11, fontWeight: 700, opacity: 0.7, marginTop: 4}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{fontSize: 12.5, fontWeight: 600, opacity: 0.6, marginBottom: 14, fontStyle:"italic", lineHeight: 1.4}}>{footer}</div>

      <button style={{
        width:"100%", padding:"15px 16px", borderRadius: 999,
        background: selected ? vT.ink : "transparent",
        color: selected ? "#fff" : ink,
        border: selected ? "none" : `1.5px solid ${ink}`,
        fontWeight: 700, fontSize: 15.5, letterSpacing:"-0.01em",
      }}>{cta}</button>
    </div>
  );
}
function FlowStep({ label, highlight }) {
  return (
    <div style={{
      flex: 1, textAlign:"center", padding:"6px 8px", borderRadius: 8,
      background: highlight ? "#fff" : "transparent",
      fontSize: 11.5, fontWeight: 800, color: vT.ink,
      whiteSpace:"nowrap", letterSpacing:"-0.01em",
      border: highlight ? `1.5px solid ${vT.ink}` : "1.5px solid transparent",
    }}>{label}</div>
  );
}
function FlowArrow() {
  return <span style={{color: vT.ink, opacity: 0.4, fontSize: 14, fontWeight: 800}}>→</span>;
}

function D_ModePicker_v4() {
  return (
    <VFrame url="bloom.app/setup" bg={vT.cream}>
      <div style={{padding:"22px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${vT.hairline}`}}>
        <div style={{display:"flex", alignItems:"center", gap: 10}}>
          <VM size={28}/>
          <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 18, letterSpacing:"-0.02em"}}>bloom</div>
        </div>
        <div style={{flex:1, maxWidth: 360, margin:"0 auto", display:"flex", alignItems:"center", gap: 12}}>
          <span style={{fontSize: 12, color: vT.muted, fontWeight: 700}}>STEP 3 OF 3</span>
          <div style={{flex:1, height: 6, background: vT.hairline, borderRadius: 99}}>
            <div style={{width:"100%", height:"100%", background: vT.ink, borderRadius: 99}}/>
          </div>
        </div>
        <button style={{fontSize: 13, color: vT.muted, fontWeight: 600}}>Save & exit</button>
      </div>

      <div style={{flex:1, padding:"36px 56px 32px", overflow:"auto", display:"flex", flexDirection:"column"}}>
        <div style={{textAlign:"center", marginBottom: 32}}>
          <div style={{fontSize: 12, fontWeight: 800, color: vT.cyanInk, letterSpacing:"0.08em", marginBottom: 10}}>● ONE LAST CHOICE</div>
          <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 46, letterSpacing:"-0.03em", color: vT.ink, lineHeight: 1.05, marginBottom: 10}}>
            How much do you want me to <span style={{color: vT.cyanInk}}>just handle it</span>?
          </div>
          <div style={{fontSize: 17, color: vT.inkSoft, fontWeight: 500, lineHeight: 1.45, maxWidth: 620, margin:"0 auto"}}>
            Two ways to run Sprout. Both find roles and write your applications — the difference is whether I press <b>Send</b> or you do. You can switch any time.
          </div>
        </div>

        <div style={{display:"flex", gap: 22, alignItems:"stretch", flex: 1, maxWidth: 1080, margin:"0 auto", width:"100%"}}>
          <ModeCard_v4
            kind="auto"
            badge="🚀 AUTO APPLY"
            badgeBg="rgba(255,255,255,0.55)"
            title={<>Sprout handles<br/>the whole thing</>}
            tagline="Maximum velocity. Best for active searches when you trust me on the boring stuff."
            mood="sleeping" cap={vT.cyan} fill={vT.cyan} ink={vT.ink}
            bullets={[
              {icon:"🔎", text:<>I <b>find</b> roles that fit your criteria all day</>},
              {icon:"✍️", text:<>I <b>fill</b> every application in your voice</>},
              {icon:"📤", text:<>I <b>submit</b> automatically, day and night</>},
              {icon:"☕", text:<>You wake up to a recap of what I did</>},
              {icon:"✋", text:<>I pause and ping you if I hit a question I'm not sure about</>},
            ]}
            stats={[{v:"~12/day", l:"applications"}, {v:"0 min", l:"your time"}, {v:"3.4×", l:"more interviews"}]}
            footer="Best for: high-volume seekers, after you've used Sprout for a week and trust the output."
            cta="Set Sprout free →"
          />
          <ModeCard_v4
            kind="review"
            badge="✋ REVIEW BEFORE SUBMIT"
            badgeBg="rgba(255,255,255,0.65)"
            title={<>Sprout drafts,<br/>you press send</>}
            tagline="The right amount of control. I do the heavy lifting; you spend 30 seconds saying yes."
            mood="happy" cap={vT.butter} fill={vT.butter} ink={vT.ink} selected
            bullets={[
              {icon:"🔎", text:<>I <b>find</b> roles that fit your criteria all day</>},
              {icon:"✍️", text:<>I <b>pre-fill</b> every application — they sit in your queue</>},
              {icon:"👀", text:<>You <b>review</b> the 2–3 things that matter, skim the rest</>},
              {icon:"⚡", text:<>One tap to approve. I send it.</>},
              {icon:"🧠", text:<>I learn from every edit — fewer questions over time</>},
            ]}
            stats={[{v:"~8/day", l:"in your queue"}, {v:"~2 min", l:"daily check-in"}, {v:"2.4×", l:"more interviews"}]}
            footer="Best for: most people, most of the time. Keeps you in the loop without the grind."
            cta="Review before send →"
          />
        </div>

        <div style={{textAlign:"center", marginTop: 28, fontSize: 13, color: vT.muted, fontWeight: 600}}>
          Either way, you can <b style={{color: vT.ink}}>flip a single job</b> to the other mode any time. Sprout is one assistant — these are just driving styles.
        </div>
      </div>
    </VFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN — Onboarding chat V4 (subtle copy tightening — less form-y feel)
// ─────────────────────────────────────────────────────────────────────
function D_Onboarding_v4() {
  return (
    <VFrame url="bloom.app/setup" bg={vT.cream}>
      <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
        <div style={{padding:"22px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${vT.hairline}`}}>
          <div style={{display:"flex", alignItems:"center", gap: 10}}>
            <VM size={28}/>
            <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 18, letterSpacing:"-0.02em"}}>bloom</div>
          </div>
          <div style={{flex:1, maxWidth: 360, margin:"0 auto", display:"flex", alignItems:"center", gap: 12}}>
            <span style={{fontSize: 12, color: vT.muted, fontWeight: 700}}>STEP 1 OF 3 · TEACHING SPROUT</span>
            <div style={{flex:1, height: 6, background: vT.hairline, borderRadius: 99}}>
              <div style={{width:"34%", height:"100%", background: vT.ink, borderRadius: 99}}/>
            </div>
          </div>
          <button style={{fontSize: 13, color: vT.muted, fontWeight: 600}}>Save & exit</button>
        </div>

        <div style={{flex:1, display:"flex", justifyContent:"center", overflowY:"auto", padding:"32px 32px 8px"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", flexDirection:"column", gap: 14}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: 12, marginBottom: 6}}>
              <VA size={64} cap={vT.cyan} mood="happy" ring/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize: 12, fontWeight: 800, color: vT.cyanInk, letterSpacing:"0.06em"}}>● MEET SPROUT, YOUR COPILOT</div>
                <div style={{fontFamily: vFD, fontWeight: 700, fontSize: 24, color: vT.ink, letterSpacing:"-0.02em", marginTop: 4}}>Teach me about you · 60 seconds</div>
              </div>
            </div>

            <VBu>Hi Vinodh 👋 I'm <b>Sprout</b> — the one assistant that's going to run your whole job hunt. No forms today. Just tap or talk.</VBu>
            <VBu>Quick one: <b>what kind of role?</b></VBu>

            <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
              {["Product Designer","Software Engineer","Product Manager","Data / ML","Marketing","Customer Success","Operations","Sales","Other →"].map((r,i)=>(
                <VC key={r} fill={i===0 ? vT.ink : "#fff"} ink={i===0 ? "#fff" : vT.ink} size="lg"
                    style={i===0 ? {} : {border: `1.5px solid ${vT.hairline}`}}>
                  {i===0 && "✓ "}{r}
                </VC>
              ))}
            </div>

            <VBu from="user" style={{marginTop: 4}}>Product Designer · Senior</VBu>

            <VBu>Cool. <b>Where do you want to work?</b></VBu>
            <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
              {["🌎 Anywhere remote","🇺🇸 Remote, US-only","🌉 SF Bay","🏙 NYC","🌆 LA","✈️ Hybrid OK","Other →"].map((l,i)=>(
                <VC key={l} fill={i===1 ? vT.cyan : "#fff"} ink={vT.ink} size="lg"
                    style={i===1 ? {} : {border: `1.5px solid ${vT.hairline}`}}>{l}</VC>
              ))}
            </div>

            <VBu from="user" style={{marginTop: 4}}>Remote, US-only</VBu>

            <VBu><b>Pay floor?</b> I won't show you anything below it.</VBu>
            <div style={{display:"flex", flexWrap:"wrap", gap: 8}}>
              {["$120k+","$150k+","$180k+","$220k+","not sure yet"].map((l,i)=>(
                <VC key={l} fill={i===2 ? vT.cyan : "#fff"} ink={vT.ink} size="lg"
                    style={i===2 ? {} : {border: `1.5px solid ${vT.hairline}`}}>{l}</VC>
              ))}
            </div>

            <VBu from="user" style={{marginTop: 4}}>$180k+</VBu>

            <VBu>Perfect. Next I'll learn your story from your résumé — 30 seconds, then we're done. 🌱</VBu>
          </div>
        </div>

        <div style={{padding:"14px 32px 22px", borderTop: `1px solid ${vT.hairline}`, display:"flex", justifyContent:"center"}}>
          <div style={{width:"100%", maxWidth: 720, display:"flex", gap: 10}}>
            <div style={{flex:1, display:"flex", alignItems:"center", gap: 8, background:"#fff", borderRadius: 999, padding:"6px 6px 6px 22px", border:`1.5px solid ${vT.hairline}`}}>
              <input placeholder="message Sprout, or tap a chip above…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 15, color: vT.ink, padding:"10px 0", fontFamily: vFB}}/>
              <button style={{width: 40, height: 40, borderRadius: 999, background: vT.ink, color:"#fff", border:"none", fontWeight: 700, fontSize: 18}}>↑</button>
            </div>
            <VB variant="paper" size="md">Next →</VB>
          </div>
        </div>
      </div>
    </VFrame>
  );
}

Object.assign(window, {
  D_Welcome_v4, D_ModePicker_v4, D_Onboarding_v4,
  ModeCard_v4, FlowStep, FlowArrow,
});
