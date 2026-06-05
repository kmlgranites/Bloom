// =====================================================================
// Desktop — Discovery, Application Review, Sprout panel overlay
// =====================================================================
const { sprT: rT, fontDisplay: rFD, fontBody: rFB,
        SproutMascot: RM, SprChip: RC, SprBtn: RB, SprBubble: RBu,
        SprAvatar: RA, Sparkle: RSp, LivePill: RLP,
        DesktopFrame: RFrame, AppShell: RShell, MainHeader: RHead } = window;

// ─────────────────────────────────────────────────────────────────────
// SCREEN 7 — Discovery (desktop)
// Single focused card center, queue strip below, Sprout's take rail right
// ─────────────────────────────────────────────────────────────────────
function D_Discovery() {
  const job = {
    co:"Linear", role:"Sr. Product Designer", logo:"L", logoBg:"#5E6AD2",
    loc:"Remote · US", salary:"$185–230k + 0.05% equity", size:"~80 people",
    posted:"4 hours ago", applicants:"12 applicants so far",
    tags:["Design-led","Series C","Remote-first","Equity 0.05%","Strong craft bar"],
  };
  return (
    <RFrame url="bloom.app/discover">
      <RShell active="discover">
        <RHead title="Discover" sub="42 fresh matches today · Swipe or tap to decide"
          actions={
            <>
              <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 13, fontWeight: 600, color: rT.ink}}>Filters</button>
              <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 13, fontWeight: 600, color: rT.ink}}>↺ Undo skip</button>
            </>
          }
        />

        <div style={{flex:1, display:"grid", gridTemplateColumns:"1fr 360px", gap: 24, padding:"4px 32px 24px", overflow:"hidden", minHeight: 0}}>
          {/* Center — focused job card */}
          <div style={{display:"flex", flexDirection:"column", gap: 14, overflow:"hidden"}}>
            <div style={{background:"#fff", borderRadius: 24, border:`1px solid ${rT.hairline}`, overflow:"hidden", flex: 1, display:"flex", flexDirection:"column"}}>
              {/* color band */}
              <div style={{background: rT.cyan, padding: "20px 26px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink: 0}}>
                <div style={{display:"flex", alignItems:"center", gap: 14}}>
                  <div style={{width: 64, height: 64, borderRadius: 16, background:"#fff", color: job.logoBg, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 28, fontFamily: rFD, boxShadow:"0 4px 12px rgba(0,0,0,0.08)"}}>{job.logo}</div>
                  <div>
                    <div style={{fontFamily: rFD, fontWeight: 700, fontSize: 30, color: rT.ink, letterSpacing:"-0.025em", lineHeight: 1.05}}>{job.role}</div>
                    <div style={{fontSize: 15, color: rT.ink, fontWeight: 600, opacity: 0.75, marginTop: 4}}>{job.co} · {job.loc}</div>
                  </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap: 6}}>
                  <div style={{padding:"4px 12px", borderRadius: 999, background: rT.ink, color: rT.cyan, fontSize: 12, fontWeight: 800, letterSpacing:"0.04em"}}>● 96% FIT</div>
                  <div style={{fontSize: 11, color: rT.ink, opacity: 0.7, fontWeight: 600}}>posted {job.posted}</div>
                </div>
              </div>

              <div style={{padding: 26, flex: 1, overflow:"auto", display:"flex", flexDirection:"column", gap: 20}}>
                <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
                  {job.tags.map(t => <span key={t} style={{padding:"5px 10px", borderRadius: 999, background: rT.cream, color: rT.ink, fontSize: 12, fontWeight: 700, border:`1px solid ${rT.hairline}`}}>{t}</span>)}
                </div>

                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 12, fontSize: 14}}>
                  <DetailRow label="Comp" value={job.salary}/>
                  <DetailRow label="Team" value={job.size}/>
                  <DetailRow label="Activity" value={job.applicants}/>
                </div>

                <div>
                  <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 8}}>The role</div>
                  <div style={{fontSize: 14.5, color: rT.ink, lineHeight: 1.55, fontWeight: 500}}>
                    Linear is hiring a Senior Product Designer to shape the next era of our issue tracker and project tools. You'll work cross-functionally with engineering and PM, owning end-to-end features from spec through ship. We care deeply about <b>craft, taste, and speed</b> — most projects ship within 2 weeks.
                  </div>
                </div>

                <div>
                  <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 8}}>What they want</div>
                  <div style={{display:"flex", flexDirection:"column", gap: 6}}>
                    {[
                      {match: true, text:"5+ yrs designing complex SaaS products"},
                      {match: true, text:"Strong systems thinking + craft"},
                      {match: true, text:"Comfort shipping weekly"},
                      {match: "partial", text:"Experience with developer tools (you have adjacent — Headspace had ICs)"},
                      {match: false, text:"On-site SF preferred (Sprout can negotiate)"},
                    ].map((r,i) => (
                      <div key={i} style={{display:"flex", gap: 10, fontSize: 13.5, color: rT.ink, fontWeight: 500, lineHeight: 1.4}}>
                        <span style={{flexShrink:0, fontSize: 14, color: r.match === true ? rT.mintInk : r.match === "partial" ? rT.butterInk : rT.muted}}>
                          {r.match === true ? "✓" : r.match === "partial" ? "△" : "—"}
                        </span>
                        <span style={{opacity: r.match === false ? 0.6 : 1}}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div style={{padding: "16px 26px", borderTop:`1px solid ${rT.hairline}`, background: rT.creamSoft, display:"flex", gap: 12, alignItems:"center"}}>
                <button style={{width: 52, height: 52, borderRadius:"50%", background:"#fff", border:`2px solid ${rT.hairline}`, fontSize: 22, color: rT.flame, fontWeight: 800}}>✕</button>
                <button style={{width: 52, height: 52, borderRadius:"50%", background: rT.butter, border:"none", fontSize: 20, color: rT.butterInk}}>↩</button>
                <div style={{flex:1}}/>
                <button style={{padding:"14px 28px", borderRadius: 999, background:"#fff", color: rT.ink, border:`1.5px solid ${rT.ink}`, fontSize: 15, fontWeight: 700}}>Save for later</button>
                <button style={{padding:"14px 28px", borderRadius: 999, background: rT.ink, color: rT.cyan, border:"none", fontSize: 15, fontWeight: 700, display:"inline-flex", alignItems:"center", gap: 8}}>♥ Apply with Sprout →</button>
              </div>
            </div>

            {/* Up-next strip */}
            <div style={{flexShrink: 0, display:"flex", gap: 10, alignItems:"center"}}>
              <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginRight: 4}}>Up next</div>
              {[
                {co:"Notion", role:"Staff Designer · AI", logo:"N", logoBg:rT.butter, m:92},
                {co:"Vercel", role:"Sr Designer · DX", logo:"V", logoBg:rT.mint, m:89},
                {co:"Stripe", role:"Staff PD", logo:"$", logoBg:rT.lilac, m:88},
                {co:"Plaid", role:"Sr PD · Fintech", logo:"P", logoBg:rT.blush, m:85},
              ].map(j => (
                <div key={j.co} style={{flex:1, background:"#fff", borderRadius: 12, padding: 10, border:`1px solid ${rT.hairline}`, display:"flex", gap: 10, alignItems:"center", minWidth: 0}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: j.logoBg, color: rT.ink, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 14, flexShrink: 0}}>{j.logo}</div>
                  <div style={{flex:1, minWidth: 0}}>
                    <div style={{fontSize: 12.5, fontWeight: 700, color: rT.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{j.role}</div>
                    <div style={{fontSize: 11, color: rT.muted, fontWeight: 600}}>{j.co} · {j.m}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right rail — Sprout's take */}
          <div style={{display:"flex", flexDirection:"column", gap: 14, overflow:"auto", minHeight: 0}}>
            <div style={{background: rT.ink, color:"#fff", borderRadius: 22, padding: 22, position:"relative", overflow:"hidden"}}>
              <div style={{position:"absolute", top:-30, right:-30, width: 140, height: 140, borderRadius:"50%", background: rT.cyan, opacity: 0.18, filter:"blur(16px)"}}/>
              <div style={{display:"flex", alignItems:"center", gap: 10, marginBottom: 14, position:"relative"}}>
                <RA size={36} mood="happy" cap={rT.cyan}/>
                <div>
                  <div style={{fontSize: 11, fontWeight: 800, color: rT.cyan, letterSpacing:"0.06em"}}>● SPROUT'S TAKE</div>
                  <div style={{fontSize: 14, fontWeight: 700, opacity: 0.9}}>You should go for this one</div>
                </div>
              </div>
              <div style={{fontSize: 14, lineHeight: 1.5, fontWeight: 500, opacity: 0.92, position:"relative"}}>
                "This is your dream stack. Their <span style={{color: rT.cyan, fontWeight: 700}}>craft bar</span> matches your taste — I drafted a cover lead that calls out your <b>Linear-knockoff side project at Headspace</b>. The remote question is the only friction; I'll soften that in the cover."
              </div>
            </div>

            <div style={{background:"#fff", borderRadius: 18, padding: 18, border:`1px solid ${rT.hairline}`}}>
              <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 10}}>Why this matched</div>
              <div style={{display:"flex", flexDirection:"column", gap: 8, fontSize: 13, color: rT.ink, fontWeight: 500}}>
                {[
                  ["Role title", "Senior Product Designer ✓"],
                  ["Comp", "$185–230k matches your $180k floor"],
                  ["Stage", "Series C ✓ (you prefer B–D)"],
                  ["Remote", "Mostly — Sprout can negotiate"],
                  ["Vibe", "Design-led, fast shipping ✓"],
                ].map(([k,v],i) => (
                  <div key={i} style={{display:"flex", justifyContent:"space-between", gap: 12}}>
                    <span style={{color: rT.muted, fontWeight: 600}}>{k}</span>
                    <span style={{textAlign:"right"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:"#fff", borderRadius: 18, padding: 18, border:`1px solid ${rT.hairline}`}}>
              <div style={{fontSize: 11, fontWeight: 800, color: rT.muted, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom: 10}}>People you'd work with</div>
              <div style={{display:"flex", gap: 6, marginBottom: 10}}>
                {["KH","MR","AP","SL","+12"].map((i,k) => (
                  <div key={k} style={{width: 34, height: 34, borderRadius:"50%", background: k % 2 ? rT.cyan : rT.butter, color: rT.ink, display:"grid", placeItems:"center", fontWeight: 800, fontSize: 11, border:"2px solid #fff", marginLeft: k === 0 ? 0 : -8}}>{i}</div>
                ))}
              </div>
              <div style={{fontSize: 12.5, color: rT.inkSoft, fontWeight: 500, lineHeight: 1.4}}>
                <b style={{color: rT.ink}}>Karri Saarinen</b> (Co-founder/Design) — you follow him. Their design team is 16 strong.
              </div>
            </div>
          </div>
        </div>
      </RShell>
    </RFrame>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{background: rT.cream, borderRadius: 12, padding:"10px 14px"}}>
      <div style={{fontSize: 10.5, color: rT.muted, fontWeight: 800, textTransform:"uppercase", letterSpacing:"0.05em"}}>{label}</div>
      <div style={{fontSize: 14, fontWeight: 700, color: rT.ink, marginTop: 3}}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 8 — Application review (Cursor-style split)
// Left: the application as a document. Right: chat with Sprout to edit it.
// ─────────────────────────────────────────────────────────────────────
function D_Review() {
  return (
    <RFrame url="bloom.app/review/linear-spd">
      <RShell active="queue">
        <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight: 0}}>
          {/* Sub-header */}
          <div style={{padding:"14px 32px", display:"flex", alignItems:"center", gap: 14, borderBottom:`1px solid ${rT.hairline}`, flexShrink: 0}}>
            <button style={{fontSize: 18, color: rT.ink, fontWeight: 700}}>←</button>
            <div style={{width: 36, height: 36, borderRadius: 10, background:"#5E6AD2", color:"#fff", display:"grid", placeItems:"center", fontWeight: 800, fontSize: 16, fontFamily: rFD}}>L</div>
            <div style={{flex:1}}>
              <div style={{fontSize: 15, fontWeight: 700, color: rT.ink, lineHeight: 1.1, fontFamily: rFD, letterSpacing:"-0.01em"}}>Linear · Sr. Product Designer</div>
              <div style={{fontSize: 12, color: rT.muted, fontWeight: 600, marginTop: 2}}>96% fit · queued 8m ago · ready to send</div>
            </div>
            <div style={{display:"flex", gap: 8, alignItems:"center"}}>
              <span style={{fontSize: 12, color: rT.muted, fontWeight: 700}}>2 of 12 in queue</span>
              <button style={{padding:"8px 14px", borderRadius: 999, background:"#fff", border:`1px solid ${rT.hairline}`, fontSize: 13, fontWeight: 600, color: rT.ink}}>Skip</button>
              <button style={{padding:"8px 18px", borderRadius: 999, background: rT.ink, color:"#fff", fontSize: 13, fontWeight: 700, border:"none"}}>Send it →</button>
            </div>
          </div>

          <div style={{flex:1, display:"flex", minHeight: 0}}>
            {/* Document */}
            <div style={{flex: 1.4, padding:"28px 32px", overflow:"auto", background: rT.cream}}>
              <div style={{maxWidth: 680, margin:"0 auto", display:"flex", flexDirection:"column", gap: 16}}>
                <div style={{display:"flex", alignItems:"center", gap: 10, fontSize: 12, fontWeight: 800, color: rT.cyanInk, letterSpacing:"0.06em"}}>
                  <RA size={24} cap={rT.cyan} mood="happy"/>
                  SPROUT DRAFTED THIS · YOU'RE THE EDITOR
                </div>

                {/* Cover letter */}
                <DocBlock title="Cover letter" status="✓ Drafted by Sprout" badge={<button style={{fontSize: 12, color: rT.cyanInk, fontWeight: 700, background: rT.cyan, padding:"4px 10px", borderRadius: 999, border:"none"}}>✨ Rewrite</button>}>
                  <div style={{fontSize: 15, color: rT.ink, lineHeight: 1.6, fontWeight: 400}}>
                    Hey Linear team —<br/><br/>
                    I've been a power-user since 2022 and built a <span style={{background: rT.butter, padding:"1px 5px", borderRadius: 4, fontWeight: 600}}>Linear-inspired triage tool at Headspace</span> that cut PM grooming time in half. I'd love to push the craft bar even higher with your design team.<br/><br/>
                    My last six years have been mobile-heavy (Headspace, Airbnb messaging) but I've shipped systems work — the Headspace tokens project is still in production. I think that translates well to a tool like Linear where consistency compounds.<br/><br/>
                    A few of the things at Linear I want to learn from: the discipline of <span style={{background: rT.cyan, padding:"1px 5px", borderRadius: 4, fontWeight: 600}}>shipping every 2 weeks</span>, the level of motion polish, and how a small team holds the craft line as it scales.<br/><br/>
                    Excited to chat,<br/>Vinodh
                  </div>
                  <div style={{display:"flex", gap: 8, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${rT.hairline}`}}>
                    <RC fill={rT.cream} ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>🎯 More specific</RC>
                    <RC fill={rT.cream} ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>🪶 Shorter</RC>
                    <RC fill={rT.cream} ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>😎 Warmer</RC>
                    <RC fill={rT.cream} ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>📊 With metrics</RC>
                  </div>
                </DocBlock>

                {/* Screening — orange flagged */}
                <DocBlock title="Screening questions · 2 of 11 need you" border={`1.5px solid ${rT.flame}`} accent={rT.flame}>
                  <div style={{display:"flex", flexDirection:"column", gap: 18}}>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: rT.ink, marginBottom: 10}}>1. Why specifically Linear?</div>
                      <div style={{fontSize: 12, color: rT.inkSoft, marginBottom: 10, fontWeight: 500}}>Sprout drafted two options — pick one or write your own.</div>
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10}}>
                        <DraftCard tag="OPTION A · CRAFT-FORWARD" selected text={"The level of craft Linear ships is rare. I want to learn from a team that obsesses over micro-interactions and still ships fast."}/>
                        <DraftCard tag="OPTION B · STORY-DRIVEN" text={"I built a Linear knockoff at Headspace because I couldn't find anything as fast. I want to work on the real one."}/>
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: 13, fontWeight: 700, color: rT.ink, marginBottom: 10}}>2. Walk us through a recent project you'd ship publicly.</div>
                      <div style={{padding: 12, background: rT.cream, borderRadius: 12, fontSize: 13, color: rT.ink, fontWeight: 500, lineHeight: 1.5, border:`1.5px dashed ${rT.flame}`}}>
                        <div style={{fontSize: 11, color: rT.flame, fontWeight: 800, marginBottom: 6, letterSpacing:"0.04em"}}>SPROUT NEEDS YOU</div>
                        I'm not sure which project you'd want to lead with. Want to use the <b>Headspace navigation overhaul</b>, the <b>Airbnb messaging redesign</b>, or your <b>personal Linear-knockoff</b>?
                        <div style={{display:"flex", gap: 6, marginTop: 10}}>
                          <RC fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Headspace nav</RC>
                          <RC fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Airbnb messaging</RC>
                          <RC fill="#fff" ink={rT.ink} size="sm" style={{border:`1px solid ${rT.hairline}`}}>Side project</RC>
                          <RC fill={rT.ink} ink="#fff" size="sm">Other → tell me</RC>
                        </div>
                      </div>
                    </div>
                  </div>
                </DocBlock>

                {/* Auto-filled */}
                <DocBlock title="Auto-filled by Sprout · 9 of 11" status="✓ Done">
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8}}>
                    {[
                      ["Years of experience", "6"],
                      ["Authorized in US", "Yes"],
                      ["Visa sponsorship", "No"],
                      ["Salary range", "$185–230k"],
                      ["Notice period", "4 weeks"],
                      ["Available start", "June 30"],
                      ["Portfolio URL", "vinodh.design"],
                      ["LinkedIn", "linkedin.com/in/vinodhk"],
                      ["How did you hear?", "Twitter"],
                    ].map(([k,v]) => (
                      <div key={k} style={{display:"flex", justifyContent:"space-between", gap: 10, padding:"6px 0", fontSize: 13, color: rT.ink}}>
                        <span style={{color: rT.muted, fontWeight: 600}}>{k}</span>
                        <span style={{fontWeight: 700, display:"flex", alignItems:"center", gap: 6}}>
                          <span style={{color: rT.mintInk}}>✓</span>{v}
                        </span>
                      </div>
                    ))}
                  </div>
                </DocBlock>
              </div>
            </div>

            {/* Sprout chat panel */}
            <div style={{width: 380, flexShrink: 0, background:"#fff", borderLeft:`1px solid ${rT.hairline}`, display:"flex", flexDirection:"column"}}>
              <div style={{padding:"14px 18px", borderBottom:`1px solid ${rT.hairline}`, display:"flex", alignItems:"center", gap: 10}}>
                <RA size={32} mood="happy" cap={rT.cyan}/>
                <div style={{flex:1}}>
                  <div style={{fontSize: 14, fontWeight: 700, color: rT.ink}}>Sprout · editing this app</div>
                  <div style={{fontSize: 11.5, color: rT.cyanInk, fontWeight: 700}}>● 9 answers ready, 2 need you</div>
                </div>
              </div>

              <div style={{flex:1, padding:"18px", overflow:"auto", display:"flex", flexDirection:"column", gap: 12}}>
                <RBu>Hey — I matched 9 of 11 screening questions from your past answers. Two need your call (tagged orange in the doc).</RBu>
                <RBu>The cover I drafted leads with your <b>Linear-knockoff side project</b> — that's the strongest hook for them. Want me to tighten anything?</RBu>

                <div style={{display:"flex", flexDirection:"column", gap: 6, marginLeft: 0}}>
                  <RC fill={rT.ink} ink="#fff" size="sm" style={{alignSelf:"flex-start"}}>Make cover shorter</RC>
                  <RC fill="#fff" ink={rT.ink} size="sm" style={{alignSelf:"flex-start", border:`1.5px solid ${rT.hairline}`}}>Add a Headspace metric</RC>
                  <RC fill="#fff" ink={rT.ink} size="sm" style={{alignSelf:"flex-start", border:`1.5px solid ${rT.hairline}`}}>Mention I'd visit SF</RC>
                </div>

                <RBu from="user" style={{marginTop: 6}}>can you make it warmer? feels a bit formal</RBu>

                <div style={{display:"flex", gap: 8, alignItems:"flex-end"}}>
                  <RA size={24} mood="thinking" cap={rT.cyan}/>
                  <div style={{background:"#fff", padding:"10px 14px", borderRadius:"16px 16px 16px 6px", border:`1px solid ${rT.hairline}`, display:"flex", gap: 4}}>
                    <span style={{width: 6, height: 6, borderRadius:"50%", background: rT.muted, animation:"sprPulse 1.4s -0.2s infinite"}}/>
                    <span style={{width: 6, height: 6, borderRadius:"50%", background: rT.muted, animation:"sprPulse 1.4s 0s infinite"}}/>
                    <span style={{width: 6, height: 6, borderRadius:"50%", background: rT.muted, animation:"sprPulse 1.4s 0.2s infinite"}}/>
                  </div>
                </div>
              </div>

              <div style={{padding:"12px 14px 14px", borderTop:`1px solid ${rT.hairline}`}}>
                <div style={{display:"flex", alignItems:"center", gap: 8, background: rT.cream, borderRadius: 999, padding:"4px 4px 4px 16px", border:`1.5px solid ${rT.hairline}`}}>
                  <input placeholder="ask Sprout to edit anything…" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 13.5, color: rT.ink, padding:"8px 0", fontFamily: rFB}}/>
                  <button style={{width: 32, height: 32, borderRadius: 999, background: rT.ink, color:"#fff", border:"none", fontSize: 15, fontWeight: 700}}>↑</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RShell>
    </RFrame>
  );
}

function DocBlock({ title, status, badge, border, accent, children }) {
  return (
    <div style={{background:"#fff", borderRadius: 18, border: border || `1px solid ${rT.hairline}`, padding: 20, position:"relative"}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 14}}>
        <div style={{fontSize: 12, fontWeight: 800, color: accent || rT.muted, letterSpacing:"0.06em", textTransform:"uppercase"}}>{title}</div>
        <div style={{display:"flex", alignItems:"center", gap: 8}}>
          {status && <div style={{fontSize: 11, fontWeight: 700, color: rT.mintInk, padding:"3px 8px", borderRadius: 999, background: rT.mint}}>{status}</div>}
          {badge}
        </div>
      </div>
      {children}
    </div>
  );
}
function DraftCard({ tag, text, selected }) {
  return (
    <div style={{background: rT.cream, borderRadius: 12, padding: 12, border: selected ? `1.5px solid ${rT.ink}` : `1px solid ${rT.hairline}`, position:"relative"}}>
      <div style={{fontSize: 10, fontWeight: 800, color: selected ? rT.cyanInk : rT.muted, marginBottom: 6, letterSpacing:"0.04em"}}>{tag}</div>
      <div style={{fontSize: 13, color: rT.ink, lineHeight: 1.4, fontWeight: 500}}>{text}</div>
      {selected && (
        <div style={{position:"absolute", top: 8, right: 8, width: 18, height: 18, borderRadius:"50%", background: rT.ink, color:"#fff", display:"grid", placeItems:"center", fontSize: 10, fontWeight: 800}}>✓</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 9 — Cmd-K Sprout overlay (ambient, summons from any screen)
// ─────────────────────────────────────────────────────────────────────
function D_SproutPanel() {
  return (
    <RFrame url="bloom.app">
      <RShell active="home">
        {/* dimmed home behind */}
        <div style={{flex:1, position:"relative", overflow:"hidden", background: rT.cream}}>
          {/* Faux background — just a few hints */}
          <div style={{padding:"22px 32px 14px"}}>
            <div style={{fontFamily: rFD, fontWeight: 700, fontSize: 28, color: rT.ink, opacity: 0.4}}>Good morning, Vinodh 👋</div>
          </div>
          <div style={{margin:"0 32px", height: 200, borderRadius: 28, background: rT.ink, opacity: 0.25}}/>

          {/* dim overlay */}
          <div style={{position:"absolute", inset: 0, background:"rgba(2,47,54,0.4)", backdropFilter:"blur(8px)"}}/>

          {/* Sprout palette */}
          <div style={{position:"absolute", top: 80, left:"50%", transform:"translateX(-50%)", width: 640, background:"#fff", borderRadius: 22, boxShadow:"0 30px 80px rgba(0,0,0,0.3)", overflow:"hidden", border:`1px solid ${rT.hairline}`}}>
            <div style={{padding:"14px 18px", borderBottom:`1px solid ${rT.hairline}`, display:"flex", alignItems:"center", gap: 12}}>
              <RA size={32} mood="happy" cap={rT.cyan}/>
              <input placeholder="ask Sprout anything… or pick a quick action below" style={{flex:1, border:"none", outline:"none", background:"transparent", fontSize: 16, color: rT.ink, fontFamily: rFB, fontWeight: 500}}/>
              <div style={{fontSize: 11, color: rT.muted, fontWeight: 700, padding:"3px 8px", background: rT.cream, borderRadius: 6, border:`1px solid ${rT.hairline}`}}>ESC</div>
            </div>

            <div style={{padding:"8px 0"}}>
              <PaletteSection title="Quick actions">
                <PaletteItem icon="✨" label="Tailor my résumé for a specific job" shortcut="⌘R"/>
                <PaletteItem icon="📨" label="Apply to the top 5 matches now" shortcut="⌘5"/>
                <PaletteItem icon="🛌" label="Pause Sprout (I'm on vacation)" shortcut="⌘."/>
                <PaletteItem icon="🎚" label="Switch to Cruise Control mode"/>
              </PaletteSection>

              <PaletteSection title="Sprout suggests" highlight>
                <PaletteItem icon="💌" label="Draft a follow-up to Linear — they opened your profile 3m ago" badge="HOT" highlight/>
                <PaletteItem icon="📝" label="Review the 4 drafts waiting in your queue" badge="4"/>
                <PaletteItem icon="🎯" label="Loosen filters to include hybrid SF/NY (you'd see ~40 more roles)"/>
              </PaletteSection>

              <PaletteSection title="Ask anything">
                <PaletteItem icon="💬" label={<>"How am I doing this week?"</>}/>
                <PaletteItem icon="💬" label={<>"Show me only senior IC roles"</>}/>
                <PaletteItem icon="💬" label={<>"What's my reply rate?"</>}/>
              </PaletteSection>
            </div>

            <div style={{padding:"10px 18px", borderTop:`1px solid ${rT.hairline}`, display:"flex", justifyContent:"space-between", fontSize: 11, color: rT.muted, fontWeight: 700, background: rT.creamSoft}}>
              <div>↑↓ navigate · ↵ select · ⌘K toggle</div>
              <div>Sprout is on Co-pilot mode</div>
            </div>
          </div>

          <div style={{position:"absolute", bottom: 30, left:"50%", transform:"translateX(-50%)", fontSize: 12, color:"#fff", opacity: 0.7, fontWeight: 600, textShadow:"0 1px 4px rgba(0,0,0,0.3)"}}>
            Press <b>⌘K</b> from anywhere to summon Sprout
          </div>
        </div>
      </RShell>
    </RFrame>
  );
}

function PaletteSection({ title, children, highlight }) {
  return (
    <div style={{padding:"8px 0"}}>
      <div style={{padding:"4px 18px 6px", fontSize: 10.5, fontWeight: 800, color: highlight ? rT.cyanInk : rT.muted, letterSpacing:"0.08em", textTransform:"uppercase"}}>{title}</div>
      {children}
    </div>
  );
}
function PaletteItem({ icon, label, shortcut, badge, highlight }) {
  return (
    <div style={{padding:"10px 18px", display:"flex", alignItems:"center", gap: 12, cursor:"pointer", background: highlight ? rT.creamSoft : "transparent"}}>
      <div style={{width: 28, height: 28, borderRadius: 8, background: highlight ? rT.cyan : rT.cream, display:"grid", placeItems:"center", fontSize: 14}}>{icon}</div>
      <div style={{flex:1, fontSize: 14, color: rT.ink, fontWeight: 500, lineHeight: 1.3}}>{label}</div>
      {badge && <div style={{padding:"2px 8px", borderRadius: 999, background: rT.flame, color:"#fff", fontSize: 10.5, fontWeight: 800, letterSpacing:"0.04em"}}>{badge}</div>}
      {shortcut && <div style={{fontSize: 11, color: rT.muted, fontWeight: 700, padding:"2px 7px", background: rT.cream, borderRadius: 6, border:`1px solid ${rT.hairline}`}}>{shortcut}</div>}
    </div>
  );
}

Object.assign(window, { D_Discovery, D_Review, D_SproutPanel });
