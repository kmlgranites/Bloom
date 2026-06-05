// =====================================================================
// Bloom V4 — Conversational Review + refreshed Home
// The review screen is no longer "doc on left, chat on right". It is a
// single Sprout-led stream of review cards, with pills for every action.
// =====================================================================
const {
  sprT: rvT, fontDisplay: rvFD, fontBody: rvFB,
  SproutMascot: RVM, SprChip: RVC, SprBubble: RVBu,
  SprAvatar: RVA, Sparkle: RVSp, LivePill: RVLP,
  DesktopFrame: RVFrame, AppShell: RVShell, MainHeader: RVHead,
} = window;

// ─────────────────────────────────────────────────────────────────────
// SCREEN — Conversational Review (V4)
// One Sprout-led stream. Each "card" is a small review widget the user
// approves with a tap, swaps with a pill, or chats to refine.
// ─────────────────────────────────────────────────────────────────────

function ReviewProgress({ done, total }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap: 10}}>
      <span style={{fontSize: 12, color: rvT.muted, fontWeight: 800, letterSpacing:"0.04em"}}>{done} OF {total} REVIEWED</span>
      <div style={{display:"flex", gap: 4}}>
        {Array.from({length: total}).map((_, i) => (
          <div key={i} style={{
            width: 18, height: 5, borderRadius: 99,
            background: i < done ? rvT.cyanInk : (i === done ? rvT.butter : rvT.hairline),
          }}/>
        ))}
      </div>
    </div>
  );
}

// A "Sprout proposed something — confirm it" card
function ProposalCard({ kind, headline, body, pills, status, footer }) {
  const tone = {
    pending: { bg:"#fff", bd: rvT.hairline, label: null, labelBg: null },
    approved:{ bg: rvT.mint, bd: rvT.mint, label:"✓ APPROVED", labelBg: rvT.mintInk },
    needs:   { bg:"#fff", bd: rvT.flame, label:"NEEDS YOU", labelBg: rvT.flame },
  }[status || "pending"];
  return (
    <div style={{
      background: tone.bg, borderRadius: 18, padding:"16px 18px",
      border: `1.5px solid ${tone.bd}`, position:"relative",
    }}>
      {tone.label && (
        <div style={{
          position:"absolute", top: -10, left: 18,
          padding:"3px 10px", borderRadius: 99,
          background: tone.labelBg, color: status === "approved" ? "#fff" : "#fff",
          fontSize: 10.5, fontWeight: 800, letterSpacing:"0.06em",
        }}>{tone.label}</div>
      )}
      <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap: 12, marginBottom: body ? 8 : 0}}>
        <div style={{fontSize: 11, fontWeight: 800, color: rvT.muted, letterSpacing:"0.06em", textTransform:"uppercase"}}>{kind}</div>
      </div>
      <div style={{fontSize: 15.5, fontWeight: 600, color: rvT.ink, lineHeight: 1.4, marginBottom: body ? 10 : 0, letterSpacing:"-0.005em"}}>{headline}</div>
      {body && (
        <div style={{background: status === "approved" ? "rgba(255,255,255,0.5)" : rvT.cream, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: rvT.ink, lineHeight: 1.5, fontWeight: 500, marginBottom: pills ? 12 : 0}}>
          {body}
        </div>
      )}
      {pills && (
        <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
          {pills.map((p,i) => (
            <RVC key={i} fill={p.primary ? rvT.ink : (p.warm ? rvT.cyan : "#fff")}
                 ink={p.primary ? "#fff" : rvT.ink} size="sm"
                 style={(!p.primary && !p.warm) ? {border:`1px solid ${rvT.hairline}`} : {}}>
              {p.label}
            </RVC>
          ))}
        </div>
      )}
      {footer && (
        <div style={{fontSize: 12, color: rvT.muted, fontWeight: 600, marginTop: 10, display:"flex", alignItems:"center", gap: 6}}>
          {footer}
        </div>
      )}
    </div>
  );
}

function D_Review_v4() {
  return (
    <RVFrame url="bloom.app/review/linear">
      <RVShell active="queue">
        <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight: 0}}>
          {/* Sub-header */}
          <div style={{padding:"14px 32px", display:"flex", alignItems:"center", gap: 14, borderBottom:`1px solid ${rvT.hairline}`, flexShrink: 0, background:"#fff"}}>
            <button style={{fontSize: 18, color: rvT.ink, fontWeight: 700}}>←</button>
            <div style={{width: 38, height: 38, borderRadius: 10, background:"#5E6AD2", color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 17, fontFamily: rvFD}}>L</div>
            <div style={{flex:1, minWidth: 0}}>
              <div style={{fontSize: 15, fontWeight: 700, color: rvT.ink, lineHeight: 1.1, fontFamily: rvFD, letterSpacing:"-0.01em"}}>Linear · Sr. Product Designer</div>
              <div style={{fontSize: 12, color: rvT.muted, fontWeight: 600, marginTop: 2}}>$185–230k · Remote · 96% fit · 2 of 12 in queue</div>
            </div>
            <ReviewProgress done={7} total={10}/>
            <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rvT.hairline}`, fontSize: 13, fontWeight: 600, color: rvT.muted}}>Skip job</button>
            <button style={{padding:"10px 22px", borderRadius: 999, background: rvT.ink, color:"#fff", fontSize: 14, fontWeight: 700, border:"none", display:"inline-flex", alignItems:"center", gap: 8, opacity: 0.55}}>
              <span>Approve &amp; send</span>
            </button>
          </div>

          <div style={{flex:1, display:"flex", minHeight: 0, background: rvT.cream}}>
            {/* Main conversational column */}
            <div style={{flex:1, overflow:"auto", padding:"28px 0", display:"flex", justifyContent:"center"}}>
              <div style={{width:"100%", maxWidth: 680, display:"flex", flexDirection:"column", gap: 14, padding:"0 32px"}}>

                {/* Sprout's opening summary */}
                <div style={{display:"flex", alignItems:"center", gap: 12, marginBottom: 4}}>
                  <RVA size={36} mood="happy" cap={rvT.cyan} ring/>
                  <div>
                    <div style={{fontSize: 11, fontWeight: 800, color: rvT.cyanInk, letterSpacing:"0.06em"}}>● SPROUT, JUST NOW</div>
                    <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 22, color: rvT.ink, letterSpacing:"-0.02em"}}>Quick review — I'll walk you through it.</div>
                  </div>
                </div>

                <RVBu>
                  I drafted your Linear app. <b>9 of 10 answers are ready to send</b> — just one needs your call. The whole review takes ~90 seconds.
                </RVBu>

                {/* Summary stat row */}
                <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 10}}>
                  <SummaryStat tint={rvT.mint} v="9" l="auto-filled correctly"/>
                  <SummaryStat tint={rvT.butter} v="1" l="needs your call"/>
                  <SummaryStat tint={rvT.cyan} v="~90s" l="estimated review"/>
                </div>

                <SectionDivider label="1 · The cover letter"/>

                <RVBu>
                  Here's the cover lead. I went with your <b>Linear-knockoff side project at Headspace</b> as the hook — it's your strongest play here.
                </RVBu>

                <ProposalCard
                  kind="COVER LEAD · DRAFT BY SPROUT"
                  headline="Looks good?"
                  body={
                    <>
                      Hey Linear team — I've been a power-user since 2022 and built a <span style={{background: rvT.butter, padding:"1px 5px", borderRadius: 4}}>Linear-inspired triage tool at Headspace</span> that cut PM grooming time in half. I'd love to push the craft bar even higher with your team…
                      <span style={{color: rvT.muted, fontWeight: 600}}> [3 more paragraphs]</span>
                    </>
                  }
                  pills={[
                    {label:"👍 Looks good", primary:true},
                    {label:"🪶 Make it shorter"},
                    {label:"😎 Make it warmer"},
                    {label:"🎯 More specific"},
                    {label:"✨ Try a different angle", warm:true},
                  ]}
                  footer={<><RVA size={16} cap={rvT.cyan}/> Sprout drafted in 2.3s · learns from your edits</>}
                />

                <SectionDivider label="2 · One question needs you"/>

                <ProposalCard
                  status="needs"
                  kind="Q · WALK US THROUGH A RECENT PROJECT"
                  headline="Which project should I lead with?"
                  body={<>I have three strong options for you — I'll write the answer once you pick one. <b>No typing needed.</b></>}
                  pills={[
                    {label:"📱 Headspace nav overhaul (most relevant)", primary:true},
                    {label:"💬 Airbnb messaging redesign"},
                    {label:"🚀 Linear-knockoff side project"},
                    {label:"💬 Tell me something different", warm:true},
                  ]}
                  footer={<>This is the only one that needs you. Tap once and I'll handle the rest.</>}
                />

                <SectionDivider label="3 · 'Why Linear?' — I drafted two takes"/>

                <RVBu>This one I felt two ways about. Pick the angle that feels more <i>you</i> — I'll polish whichever you choose.</RVBu>

                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10}}>
                  <AnswerOption
                    tag="A · CRAFT-FORWARD"
                    text="The level of craft Linear ships is rare. I want to learn from a team that obsesses over micro-interactions and still ships fast."
                    selected
                  />
                  <AnswerOption
                    tag="B · STORY-DRIVEN"
                    text="I built a Linear knockoff at Headspace because I couldn't find anything as fast. I want to work on the real one."
                  />
                </div>
                <div style={{display:"flex", gap: 6, flexWrap:"wrap"}}>
                  <RVC fill={rvT.ink} ink="#fff" size="sm">Use A</RVC>
                  <RVC fill="#fff" ink={rvT.ink} size="sm" style={{border:`1px solid ${rvT.hairline}`}}>Use B</RVC>
                  <RVC fill="#fff" ink={rvT.ink} size="sm" style={{border:`1px solid ${rvT.hairline}`}}>Blend them</RVC>
                  <RVC fill={rvT.cyan} size="sm">✨ Write a 3rd</RVC>
                </div>

                <SectionDivider label="4 · The 7 quick facts I filled in"/>

                <ProposalCard
                  status="approved"
                  kind="AUTO-FILLED · TAP IF ANYTHING'S OFF"
                  headline="All set — I pulled these from your résumé."
                  body={
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 18px", fontSize: 13.5}}>
                      {[
                        ["Years of experience","6"],
                        ["Authorized in US","Yes"],
                        ["Salary range","$185–230k"],
                        ["Notice period","4 weeks"],
                        ["Available start","June 30"],
                        ["Portfolio","vinodh.design"],
                        ["How did you hear?","Twitter"],
                      ].map(([k,v]) => (
                        <div key={k} style={{display:"flex", justifyContent:"space-between", gap: 10}}>
                          <span style={{color: rvT.inkSoft, fontWeight: 600}}>{k}</span>
                          <span style={{fontWeight: 700, color: rvT.ink}}>{v}</span>
                        </div>
                      ))}
                    </div>
                  }
                  pills={[
                    {label:"👍 All correct", primary:true},
                    {label:"Fix something…"},
                  ]}
                />

                <SectionDivider label="When you're ready"/>

                {/* Final approve card */}
                <div style={{background: rvT.ink, color:"#fff", borderRadius: 22, padding: 24, position:"relative", overflow:"hidden"}}>
                  <div style={{position:"absolute", top:-40, right:-40, width: 200, height: 200, borderRadius:"50%", background: rvT.cyan, opacity: 0.18, filter:"blur(30px)"}}/>
                  <div style={{position:"relative", display:"flex", alignItems:"center", gap: 18}}>
                    <RVM size={64} cap={rvT.cyan} mood="happy"/>
                    <div style={{flex:1}}>
                      <div style={{fontSize: 11, fontWeight: 800, color: rvT.cyan, letterSpacing:"0.06em", marginBottom: 4}}>● ALMOST THERE</div>
                      <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em", lineHeight: 1.15}}>Approve everything I drafted and I'll send it.</div>
                      <div style={{fontSize: 13, opacity: 0.7, fontWeight: 500, marginTop: 4}}>I learn from anything you change so the next one drafts itself.</div>
                    </div>
                    <button style={{padding:"14px 24px", borderRadius: 999, background: rvT.cyan, color: rvT.ink, fontSize: 15, fontWeight: 700, border:"none", whiteSpace:"nowrap"}}>Approve &amp; send →</button>
                  </div>
                </div>

                <div style={{display:"flex", justifyContent:"center", gap: 8, marginTop: 4, fontSize: 12, color: rvT.muted, fontWeight: 600}}>
                  <span>Or:</span>
                  <button style={{color: rvT.cyanInk, fontWeight: 700}}>Send + queue next →</button>
                  <span>·</span>
                  <button style={{color: rvT.muted, fontWeight: 700}}>Save as draft</button>
                </div>
              </div>
            </div>

            {/* Right rail — job context + ambient chat */}
            <div style={{width: 320, flexShrink: 0, background:"#fff", borderLeft:`1px solid ${rvT.hairline}`, display:"flex", flexDirection:"column"}}>
              <div style={{padding: 18, borderBottom:`1px solid ${rvT.hairline}`}}>
                <div style={{fontSize: 11, fontWeight: 800, color: rvT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 10}}>The role</div>
                <div style={{display:"flex", gap: 12, alignItems:"flex-start", marginBottom: 14}}>
                  <div style={{width: 44, height: 44, borderRadius: 12, background:"#5E6AD2", color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 20, fontFamily: rvFD, flexShrink: 0}}>L</div>
                  <div style={{flex:1, minWidth: 0}}>
                    <div style={{fontSize: 14, fontWeight: 700, color: rvT.ink, lineHeight: 1.2}}>Sr. Product Designer</div>
                    <div style={{fontSize: 12, color: rvT.muted, fontWeight: 600, marginTop: 2}}>Linear · Remote, US</div>
                  </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap: 6, fontSize: 12.5, color: rvT.ink}}>
                  {[
                    ["Comp","$185–230k"],
                    ["Stage","Series C"],
                    ["Team","~16 designers"],
                    ["Posted","4 hours ago"],
                  ].map(([k,v]) => (
                    <div key={k} style={{display:"flex", justifyContent:"space-between"}}>
                      <span style={{color: rvT.muted, fontWeight: 600}}>{k}</span>
                      <span style={{fontWeight: 700}}>{v}</span>
                    </div>
                  ))}
                </div>
                <button style={{marginTop: 12, fontSize: 12, color: rvT.cyanInk, fontWeight: 700}}>See full description →</button>
              </div>

              <div style={{padding: 18, borderBottom:`1px solid ${rvT.hairline}`}}>
                <div style={{fontSize: 11, fontWeight: 800, color: rvT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 8}}>Sprout's confidence</div>
                <div style={{display:"flex", alignItems:"flex-end", gap: 8, marginBottom: 8}}>
                  <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 38, color: rvT.ink, lineHeight: 1, letterSpacing:"-0.03em"}}>96%</div>
                  <div style={{fontSize: 12, color: rvT.muted, fontWeight: 600, paddingBottom: 5}}>fit · top 3% of openings</div>
                </div>
                <div style={{height: 6, background: rvT.cream, borderRadius: 99, overflow:"hidden"}}>
                  <div style={{width:"96%", height:"100%", background:`linear-gradient(90deg, ${rvT.cyan}, ${rvT.cyanInk})`, borderRadius: 99}}/>
                </div>
              </div>

              {/* Ambient mini chat with Sprout */}
              <div style={{flex:1, display:"flex", flexDirection:"column", padding: 18, overflow:"hidden", minHeight: 0}}>
                <div style={{fontSize: 11, fontWeight: 800, color: rvT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 12}}>Or just talk to me</div>

                <div style={{flex:1, display:"flex", flexDirection:"column", gap: 8, overflow:"auto"}}>
                  <RVBu>
                    Anything weird? You can also just type — "make it warmer", "skip this one", "what's the team like?"
                  </RVBu>
                  <div style={{display:"flex", flexDirection:"column", gap: 6, alignItems:"flex-start", marginTop: 4}}>
                    <RVC fill="#fff" ink={rvT.ink} size="sm" style={{border:`1px solid ${rvT.hairline}`}}>Who's the hiring manager?</RVC>
                    <RVC fill="#fff" ink={rvT.ink} size="sm" style={{border:`1px solid ${rvT.hairline}`}}>How does my fit break down?</RVC>
                    <RVC fill="#fff" ink={rvT.ink} size="sm" style={{border:`1px solid ${rvT.hairline}`}}>Show me my last Linear-style answer</RVC>
                  </div>
                </div>

                <div style={{marginTop: 10, display:"flex", alignItems:"center", gap: 8, background: rvT.cream, borderRadius: 999, padding:"4px 4px 4px 14px", border:`1.5px solid ${rvT.hairline}`}}>
                  <input placeholder="message Sprout…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 13, color: rvT.ink, padding:"8px 0", fontFamily: rvFB}}/>
                  <button style={{width: 30, height: 30, borderRadius: 999, background: rvT.ink, color:"#fff", border:"none", fontSize: 14, fontWeight: 700}}>↑</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RVShell>
    </RVFrame>
  );
}

function SummaryStat({ v, l, tint }) {
  return (
    <div style={{background: tint, borderRadius: 14, padding:"12px 14px"}}>
      <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 28, color: rvT.ink, lineHeight: 1, letterSpacing:"-0.025em"}}>{v}</div>
      <div style={{fontSize: 11, color: rvT.ink, fontWeight: 700, opacity: 0.7, marginTop: 4, lineHeight: 1.3}}>{l}</div>
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap: 12, padding:"10px 0 6px"}}>
      <div style={{fontSize: 11, fontWeight: 800, color: rvT.muted, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap"}}>{label}</div>
      <div style={{flex:1, height: 1, background: rvT.hairline}}/>
    </div>
  );
}

function AnswerOption({ tag, text, selected }) {
  return (
    <div style={{background:"#fff", borderRadius: 14, padding: 12, border: selected ? `1.5px solid ${rvT.ink}` : `1px solid ${rvT.hairline}`, position:"relative"}}>
      <div style={{fontSize: 10, fontWeight: 800, color: selected ? rvT.cyanInk : rvT.muted, marginBottom: 6, letterSpacing:"0.05em"}}>{tag}</div>
      <div style={{fontSize: 13, color: rvT.ink, lineHeight: 1.45, fontWeight: 500}}>{text}</div>
      {selected && (
        <div style={{position:"absolute", top: 8, right: 8, width: 18, height: 18, borderRadius:"50%", background: rvT.ink, color:"#fff", display:"grid", placeItems:"center", fontSize: 10, fontWeight: 800}}>✓</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN — Home V4 (refreshed copy + queue-forward layout)
// ─────────────────────────────────────────────────────────────────────
function D_Home_v4() {
  return (
    <RVFrame url="bloom.app">
      <RVShell active="home">
        <div style={{flex: 1, overflow:"auto"}}>
          <RVHead
            title="Good morning, Vinodh"
            sub="Day 14 · Sprout's been busy while you slept."
            actions={
              <>
                <div style={{display:"inline-flex", alignItems:"center", gap: 6, padding:"6px 12px", borderRadius: 999, background: rvT.flame, color:"#fff", fontSize: 13, fontWeight: 700}}>🔥 14-day streak</div>
                <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rvT.hairline}`, fontSize: 13, fontWeight: 600, color: rvT.ink, display:"inline-flex", gap: 6, alignItems:"center"}}>⌘K Ask Sprout</button>
              </>
            }
          />

          {/* HERO momentum card — copy refreshed for B2C feel */}
          <div style={{margin:"0 32px 18px", background: rvT.ink, borderRadius: 28, padding:"28px 32px", color:"#fff", position:"relative", overflow:"hidden", display:"flex", gap: 32, alignItems:"center"}}>
            <div style={{position:"absolute", top:-60, right:-30, width: 280, height: 280, borderRadius:"50%", background: rvT.cyan, opacity: 0.18, filter:"blur(40px)"}}/>
            <div style={{flex: 1.6, position:"relative", zIndex: 1}}>
              <RVLP color={rvT.butter} ink={rvT.butterInk}>4 drafts waiting · Review Before Submit mode</RVLP>
              <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 50, lineHeight: 1, letterSpacing:"-0.035em", marginTop: 16}}>
                4 applications<br/>
                are <span style={{color: rvT.cyan}}>ready when you are.</span>
              </div>
              <div style={{fontSize: 16, opacity: 0.78, fontWeight: 500, marginTop: 14, lineHeight: 1.45, maxWidth: 540}}>
                I drafted 4 great matches overnight — saved you ~<b style={{color:"#fff"}}>3h 20m</b> of form-filling. Each one takes ~90s to review and approve.
              </div>
              <div style={{display:"flex", gap: 10, marginTop: 22, alignItems:"center"}}>
                <button style={{padding:"14px 22px", borderRadius: 999, background: rvT.cyan, color: rvT.ink, fontSize: 15, fontWeight: 700, border:"none"}}>Start reviewing →</button>
                <button style={{padding:"14px 18px", borderRadius: 999, background:"transparent", color:"#fff", fontSize: 14, fontWeight: 600, border:`1.5px solid rgba(255,255,255,0.25)`}}>Switch to Auto Apply</button>
              </div>
              <div style={{display:"flex", gap: 10, marginTop: 22}}>
                <DarkStat_v4 v="4" l="ready to review" accent={rvT.cyan}/>
                <DarkStat_v4 v="2" l="recruiter replies 🎉" accent={rvT.flame}/>
                <DarkStat_v4 v="3h 20m" l="time saved today"/>
                <DarkStat_v4 v="42" l="this week"/>
              </div>
            </div>
            <div style={{flex: 0.7, display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex: 1}}>
              <div style={{position:"relative"}}>
                <div style={{position:"absolute", inset: -12, borderRadius:"50%", border: `1.5px solid ${rvT.cyan}`, opacity: 0.4, animation:"sprRipple 2.4s ease-out infinite"}}/>
                <RVM size={150} cap={rvT.cyan} mood="happy"/>
              </div>
            </div>
          </div>

          {/* Two-up: review queue (left, bigger) + live feed */}
          <div style={{padding:"0 32px 24px", display:"grid", gridTemplateColumns:"1.5fr 1fr", gap: 18}}>
            <div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
                <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 20, color: rvT.ink, letterSpacing:"-0.02em"}}>Your review queue <span style={{color: rvT.muted}}>(4)</span></div>
                <button style={{fontSize: 13, color: rvT.cyanInk, fontWeight: 700}}>See all →</button>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                {[
                  {co:"Linear", role:"Sr. Product Designer", logo:"L", logoBg:"#5E6AD2", match:96, why:"You'd love their craft bar — strongest match this week", time:"queued 8m ago", urgent: true},
                  {co:"Figma", role:"Staff Product Designer", logo:"F", logoBg:"#0ACF83", match:91, why:"I drafted 2 'why us?' options — pick one in 10s", time:"queued 22m ago"},
                  {co:"Cash App", role:"Senior Designer · Money", logo:"$", logoBg:"#00D632", match:88, why:"Stretch role but I think they'd hire you", time:"queued 1h ago"},
                  {co:"Vercel", role:"Sr Designer · DX", logo:"V", logoBg:"#000", match:89, why:"All 10 answers ready — just 1 tap", time:"queued 2h ago", oneClick: true},
                ].map(j => (
                  <div key={j.co} style={{background:"#fff", borderRadius: 16, padding: 14, border: `1px solid ${rvT.hairline}`, display:"flex", gap: 14, alignItems:"center"}}>
                    <div style={{width: 44, height: 44, borderRadius: 11, background: j.logoBg, color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 18, flexShrink: 0, fontFamily: rvFD}}>{j.logo}</div>
                    <div style={{flex:1, minWidth: 0}}>
                      <div style={{display:"flex", alignItems:"center", gap: 8, marginBottom: 2, flexWrap:"wrap"}}>
                        <div style={{fontSize: 15, fontWeight: 700, color: rvT.ink, lineHeight: 1.2}}>{j.role}</div>
                        <span style={{fontSize: 11, fontWeight: 700, padding:"2px 8px", borderRadius: 999, background: rvT.mint, color: rvT.mintInk}}>{j.match}% fit</span>
                        {j.urgent && <span style={{fontSize: 11, fontWeight: 800, padding:"2px 8px", borderRadius: 999, background: rvT.flame, color:"#fff", letterSpacing:"0.04em"}}>HOT</span>}
                        {j.oneClick && <span style={{fontSize: 11, fontWeight: 800, padding:"2px 8px", borderRadius: 999, background: rvT.butter, color: rvT.butterInk, letterSpacing:"0.04em"}}>1-TAP</span>}
                      </div>
                      <div style={{fontSize: 12.5, color: rvT.inkSoft, fontWeight: 500, marginBottom: 4}}>{j.co} · {j.time}</div>
                      <div style={{fontSize: 12.5, color: rvT.muted, fontWeight: 500, lineHeight: 1.4, display:"flex", gap: 6}}>
                        <span style={{flexShrink:0, opacity: 0.7}}>Sprout:</span>
                        <span>"{j.why}"</span>
                      </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", gap: 6, alignItems:"flex-end"}}>
                      <button style={{padding:"8px 16px", borderRadius: 999, background: rvT.ink, color:"#fff", fontSize: 13, fontWeight: 700, border:"none", whiteSpace:"nowrap"}}>Review →</button>
                      {j.oneClick && <button style={{padding:"6px 12px", borderRadius: 999, background: rvT.cyan, color: rvT.ink, fontSize: 12, fontWeight: 700, border:"none"}}>Approve &amp; send</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live feed */}
            <div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
                <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 20, color: rvT.ink, letterSpacing:"-0.02em"}}>What Sprout did</div>
                <button style={{fontSize: 13, color: rvT.cyanInk, fontWeight: 700}}>All →</button>
              </div>
              <div style={{background:"#fff", borderRadius: 16, border:`1px solid ${rvT.hairline}`, overflow:"hidden"}}>
                {[
                  {t:"now", text:<>Drafting <b>Vercel · DX</b> for your queue</>, icon:"✏️", live: true},
                  {t:"22m", text:<>Drafted <b>Figma · Staff PD</b></>, icon:"📝"},
                  {t:"38m", text:<><b>Recruiter reply</b> from Linear 🎉</>, icon:"💌", color: rvT.flame},
                  {t:"1h", text:<>Found <b>Notion · AI</b> — adding to queue</>, icon:"👀"},
                  {t:"3h", text:<>Skipped 4 roles below your $180k floor</>, icon:"⏭"},
                  {t:"8h", text:<>Started overnight shift</>, icon:"🌙"},
                ].map((e,i,arr) => (
                  <div key={i} style={{padding:"12px 14px", display:"flex", gap: 10, alignItems:"center", borderBottom: i < arr.length-1 ? `1px solid ${rvT.hairline}` : "none"}}>
                    <div style={{width: 28, height: 28, borderRadius: 9, background: rvT.cream, display:"grid", placeItems:"center", fontSize: 13, position:"relative", flexShrink: 0}}>
                      {e.icon}
                      {e.live && <span style={{position:"absolute", top:-2, right:-2, width: 8, height: 8, borderRadius:"50%", background: rvT.flame, border:"2px solid #fff", animation:"sprPulse 1.6s infinite"}}/>}
                    </div>
                    <div style={{flex:1, fontSize: 13, color: e.color || rvT.ink, fontWeight: 500, lineHeight: 1.3}}>{e.text}</div>
                    <div style={{fontSize: 11, color: rvT.muted, fontWeight: 700, flexShrink: 0}}>{e.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* This week — emotional ROI framing */}
          <div style={{padding: "0 32px 40px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 12}}>
              <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 20, color: rvT.ink, letterSpacing:"-0.02em"}}>The picture this week</div>
              <button style={{fontSize: 13, color: rvT.cyanInk, fontWeight: 700}}>Breakdown →</button>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12}}>
              <BigStat_v4 tint={rvT.cyan} v="11h" l="time I saved you" sub="vs filling forms yourself"/>
              <BigStat_v4 tint={rvT.butter} v="42" l="applications sent" sub="↑ 18 vs last week"/>
              <BigStat_v4 tint={rvT.mint} v="6" l="recruiters replied" sub="14% reply rate · top 12%"/>
              <BigStat_v4 tint={rvT.lilac} v="2" l="screening calls 🎉" sub="Linear · Tue · Stripe · Fri"/>
            </div>
          </div>
        </div>
      </RVShell>
    </RVFrame>
  );
}

function DarkStat_v4({ v, l, accent }) {
  return (
    <div style={{flex:1, background:"rgba(255,255,255,0.08)", padding:"12px 14px", borderRadius: 14, border:`1px solid rgba(255,255,255,0.08)`}}>
      <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 26, color: accent || "#fff", letterSpacing:"-0.025em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 11, opacity: 0.7, fontWeight: 600, marginTop: 6}}>{l}</div>
    </div>
  );
}
function BigStat_v4({ v, l, sub, tint }) {
  return (
    <div style={{background: tint, borderRadius: 18, padding: "16px 18px"}}>
      <div style={{fontFamily: rvFD, fontWeight: 700, fontSize: 36, color: rvT.ink, letterSpacing:"-0.03em", lineHeight: 1}}>{v}</div>
      <div style={{fontSize: 13.5, color: rvT.ink, fontWeight: 700, marginTop: 8, letterSpacing:"-0.01em"}}>{l}</div>
      <div style={{fontSize: 11.5, color: rvT.ink, opacity: 0.7, fontWeight: 600, marginTop: 2}}>{sub}</div>
    </div>
  );
}

Object.assign(window, {
  D_Review_v4, D_Home_v4,
  ProposalCard, AnswerOption, SectionDivider, ReviewProgress, SummaryStat,
});
