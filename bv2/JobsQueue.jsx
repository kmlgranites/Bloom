/* bv2/JobsQueue.jsx — The new Jobs page in V2
   UX rationale:
   - Jobs is no longer a board to click "Apply" — that's the agent's job.
   - This screen is TRANSPARENCY + CONTROL: see what's about to go out, override anything.
   - Three modes coexist: Queue (auto), Borderline (one-tap), Discover (exploration).
   - Each row shows WHY it matched. Each row has Skip / Boost / Note actions.
*/
const { C: JC, TopNav: JTN, Frame: JF, Card: JCard, CoLogo: JCL, Mascot: JM } = BV2;

function JobsQueue() {
  const [tab, setTab] = React.useState("queue");
  return (
    <JF w={1280} h={800}>
      <JTN active="Jobs" agentState="working" />
      <div style={{flex:1, overflow:"hidden", display:"flex", flexDirection:"column"}}>
        <JobsHero />
        <JobsTabs tab={tab} setTab={setTab} />
        <div style={{flex:1, overflow:"hidden", padding:"0 32px 24px", display:"grid", gridTemplateColumns:"1fr 300px", gap:18}}>
          <JobsBody tab={tab} />
          <JobsSide />
        </div>
      </div>
    </JF>
  );
}

function JobsHero() {
  return (
    <div style={{
      padding:"22px 32px 16px",
      display:"flex", alignItems:"center", gap:18,
    }}>
      <JM size={56} state="working" />
      <div style={{flex:1}}>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, color:JC.brandDark, letterSpacing:"-.02em",
        }}>
          I'll apply to <span className="num" style={{color:JC.orange}}>8</span> jobs today
        </div>
        <div style={{ fontSize:13, color:JC.inkSoft, marginTop:3 }}>
          Next batch goes out at <strong>2:00 PM</strong>. Skip, boost, or add notes — you've got time.
        </div>
      </div>
      <button style={{
        padding:"9px 14px", borderRadius:10, background:"#fff", border:`1.5px solid ${JC.line}`,
        color:JC.brandDark, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6,
      }}>
        <i className="ti ti-adjustments" style={{fontSize:15}} />Tune my agent
      </button>
    </div>
  );
}

function JobsTabs({ tab, setTab }) {
  const tabs = [
    { k:"queue",      l:"Up next",          c:8,  ico:"player-play" },
    { k:"borderline", l:"Worth a look?",    c:5,  ico:"help" },
    { k:"discover",   l:"Off-pattern",      c:12, ico:"compass" },
    { k:"applied",    l:"Already applied",  c:24, ico:"check" },
  ];
  return (
    <div style={{
      padding:"0 32px 14px",
      display:"flex", gap:6, borderBottom:`1px solid ${JC.line}`,
    }}>
      {tabs.map(t => {
        const active = t.k === tab;
        return (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding:"10px 16px", borderRadius:"10px 10px 0 0",
            background: active ? "#fff" : "transparent",
            borderBottom: active ? `3px solid ${JC.brandDark}` : "3px solid transparent",
            marginBottom:-1,
            display:"flex", alignItems:"center", gap:8,
            fontSize:13, fontWeight: active ? 700 : 500,
            color: active ? JC.brandDark : JC.inkSoft,
          }}>
            <i className={`ti ti-${t.ico}`} style={{fontSize:15}} />
            {t.l}
            <span style={{
              padding:"1px 7px", borderRadius:99,
              background: active ? JC.lineSoft : JC.slate100,
              fontSize:11, fontWeight:700,
            }}>{t.c}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Queue rows ─── */
const QUEUE = [
  { co:"Linear",   bg:"#5E6AD2", txt:"L", role:"Senior Product Designer", loc:"Remote",
    m:96, when:"2:00 PM today", reasons:["Design systems", "Tools for product teams", "Series C"],
    confidence:"high" },
  { co:"Vercel",   bg:"#000",    txt:"▲", role:"Design Engineer", loc:"SF · Remote",
    m:94, when:"2:00 PM today", reasons:["React + Design", "Developer tools", "Salary fits"],
    confidence:"high" },
  { co:"Notion",   bg:"#000",    txt:"N", role:"Growth Designer", loc:"NYC",
    m:91, when:"2:30 PM today", reasons:["Growth experience", "B2B SaaS"],
    note:"Mentioning my onboarding redesign at Acme",
    confidence:"high" },
  { co:"Figma",    bg:"#0ACF83", txt:"F", role:"Design Engineer", loc:"SF",
    m:88, when:"Tomorrow 9 AM", reasons:["React + Design", "Design tools"],
    confidence:"med" },
  { co:"Airbnb",   bg:"#FF385C", txt:"A", role:"Sr. Product Designer", loc:"SF",
    m:87, when:"Tomorrow 9 AM", reasons:["Marketplace experience"],
    confidence:"med", needsConfirm:"Salary inferred at $160k" },
];

function JobsBody({ tab }) {
  if (tab === "borderline") return <BorderlineList />;
  if (tab === "discover") return <DiscoverList />;
  if (tab === "applied") return <AppliedList />;
  return <QueueList />;
}

function QueueList() {
  return (
    <JCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      {/* Bulk action bar */}
      <div style={{
        padding:"12px 18px", borderBottom:`1px solid ${JC.line}`,
        display:"flex", alignItems:"center", gap:10,
      }}>
        <i className="ti ti-square" style={{fontSize:18, color:JC.inkFaint}} />
        <div style={{ fontSize:13, color:JC.inkSoft, fontWeight:500 }}>
          8 selected · sort by match %
        </div>
        <div style={{flex:1}} />
        <button style={{ fontSize:12.5, color:JC.inkSoft, fontWeight:600, padding:"4px 8px" }}>
          <i className="ti ti-filter" style={{fontSize:13, marginRight:4}} />Filter
        </button>
        <button style={{ fontSize:12.5, color:JC.brandDark, fontWeight:700, padding:"4px 8px" }}>
          <i className="ti ti-rocket" style={{fontSize:14, marginRight:4}} />Send all now
        </button>
      </div>

      <div style={{flex:1, overflow:"hidden"}}>
        {QUEUE.map((j, i) => <QueueRow key={i} j={j} first={i === 0} />)}
      </div>
    </JCard>
  );
}

function QueueRow({ j, first }) {
  return (
    <div style={{
      display:"flex", gap:14, padding:"16px 18px",
      borderBottom:`1px solid ${JC.lineSoft}`,
      background: first ? "#F7FBFC" : "transparent",
      alignItems:"flex-start",
    }}>
      <JCL co={j.txt} bg={j.bg} color="#fff" size={44} />

      <div style={{flex:1, minWidth:0}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{ fontSize:15, fontWeight:700, color:JC.brandDark, letterSpacing:"-.01em" }}>{j.role}</div>
          <div style={{ fontSize:13, color:JC.inkSoft }}>· {j.co}</div>
          <div style={{ fontSize:12, color:JC.inkFaint }}>· {j.loc}</div>
        </div>

        {/* Match reasons */}
        <div style={{display:"flex", gap:6, marginTop:7, flexWrap:"wrap"}}>
          {j.reasons.map((r, k) => (
            <div key={k} style={{
              padding:"3px 9px", borderRadius:99, background:JC.cyanGhost,
              fontSize:11.5, color:JC.brandDark, fontWeight:600,
              display:"flex", alignItems:"center", gap:4,
            }}>
              <i className="ti ti-check" style={{fontSize:11}} />{r}
            </div>
          ))}
        </div>

        {/* User note inline */}
        {j.note && (
          <div style={{
            marginTop:8, padding:"7px 11px",
            background:"#FFF8E5", border:"1px solid #F0D080", borderRadius:8,
            display:"flex", alignItems:"center", gap:8,
            fontSize:12, color:"#7A5500",
          }}>
            <i className="ti ti-quote" style={{fontSize:13}} />
            <span><strong>Your note:</strong> {j.note}</span>
            <button style={{marginLeft:"auto", color:"#7A5500", fontWeight:600}}>Edit</button>
          </div>
        )}

        {/* Confirm-needed */}
        {j.needsConfirm && (
          <div style={{
            marginTop:8, padding:"7px 11px",
            background:"#FFEDE2", border:"1px solid #FFCBA8", borderRadius:8,
            display:"flex", alignItems:"center", gap:8,
            fontSize:12, color:"#C2410C",
          }}>
            <i className="ti ti-bulb" style={{fontSize:13}} />
            <span><strong>I guessed:</strong> {j.needsConfirm}</span>
            <button style={{marginLeft:"auto", color:"#C2410C", fontWeight:700, fontSize:11.5}}>Confirm</button>
          </div>
        )}

        <div style={{
          display:"flex", alignItems:"center", gap:14, marginTop:9,
          fontSize:11.5, color:JC.inkFaint, fontWeight:600,
        }}>
          <span><i className="ti ti-clock" style={{fontSize:12, marginRight:3}} />Sending {j.when}</span>
          <span style={{
            color: j.confidence === "high" ? "#0F7D4F" : "#7A5500",
          }}>
            <i className={`ti ti-${j.confidence === "high" ? "circle-check" : "circle-half"}`}
              style={{fontSize:12, marginRight:3}} />
            {j.confidence === "high" ? "High confidence" : "Best-guess fields"}
          </span>
        </div>
      </div>

      <div style={{
        display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6,
        minWidth:140,
      }}>
        <div className="num" style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, color:JC.brandDark, letterSpacing:"-.02em", lineHeight:1,
        }}>{j.m}%</div>
        <div style={{ fontSize:11, color:JC.inkFaint, fontWeight:600 }}>match</div>

        <div style={{display:"flex", gap:4, marginTop:6}}>
          <IconBtn icon="x" tip="Skip" />
          <IconBtn icon="rocket" tip="Boost · send first" />
          <IconBtn icon="message-2" tip="Add note for agent" />
          <IconBtn icon="eye" tip="Preview" primary />
        </div>
      </div>
    </div>
  );
}

function IconBtn({ icon, primary }) {
  return (
    <button style={{
      width:30, height:30, borderRadius:7,
      background: primary ? JC.brandDark : "#fff",
      border: primary ? "none" : `1px solid ${JC.line}`,
      color: primary ? "#fff" : JC.brandDark,
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <i className={`ti ti-${icon}`} style={{fontSize:14}} />
    </button>
  );
}

/* ─── Borderline tab ─── */
function BorderlineList() {
  const items = [
    { co:"Plaid",   bg:"#000",    txt:"P", role:"Sr. Product Designer", m:72, miss:"Salary $145k (your floor $150k)" },
    { co:"Discord", bg:"#5865F2", txt:"D", role:"Product Designer",     m:69, miss:"Wants 5 yrs, you have 4" },
    { co:"Lyft",    bg:"#FF00BF", txt:"L", role:"Sr. Product Designer", m:66, miss:"On-site SF only · you marked remote" },
  ];
  return (
    <JCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${JC.line}` }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:JC.brandDark }}>Close, but not quite — your call</div>
        <div style={{ fontSize:12, color:JC.inkSoft, marginTop:2 }}>
          These almost match. I didn't apply because of one thing. You might disagree.
        </div>
      </div>
      {items.map((b, i) => (
        <div key={i} style={{
          display:"flex", gap:14, padding:"14px 18px",
          borderBottom: i < items.length-1 ? `1px solid ${JC.lineSoft}` : "none",
          alignItems:"center",
        }}>
          <JCL co={b.txt} bg={b.bg} color="#fff" size={36} />
          <div style={{flex:1, minWidth:0}}>
            <div style={{ fontSize:14, fontWeight:700, color:JC.brandDark }}>{b.role}</div>
            <div style={{ fontSize:12.5, color:JC.inkSoft }}>{b.co} · {b.m}% match</div>
            <div style={{
              marginTop:5, display:"inline-flex", alignItems:"center", gap:5,
              padding:"3px 8px", borderRadius:6, background:"#FEF5C7",
              fontSize:11.5, color:"#7A5500", fontWeight:600,
            }}>
              <i className="ti ti-alert-triangle" style={{fontSize:12}} />Hold-up: {b.miss}
            </div>
          </div>
          <button style={{
            padding:"8px 14px", borderRadius:8, background:"#fff", border:`1.5px solid ${JC.line}`,
            fontSize:12.5, fontWeight:600, color:JC.inkSoft,
          }}>Not interested</button>
          <button style={{
            padding:"8px 14px", borderRadius:8, background:JC.brandDark, color:"#fff",
            fontSize:12.5, fontWeight:700,
          }}>Apply anyway →</button>
        </div>
      ))}
    </JCard>
  );
}

/* ─── Discover tab ─── */
function DiscoverList() {
  return (
    <JCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${JC.line}` }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:JC.brandDark }}>Outside your usual patterns — but interesting</div>
        <div style={{ fontSize:12, color:JC.inkSoft, marginTop:2 }}>
          Roles that don't fit your filters, but designers like you applied to recently.
        </div>
      </div>
      <div style={{padding:18, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, overflow:"auto", flex:1}}>
        {[
          { co:"Anthropic", bg:"#D97757", txt:"A", role:"Design Engineer",      reason:"Hiring 5 PDs at once" },
          { co:"Arc",       bg:"#000",    txt:"⌘", role:"Product Designer",     reason:"Designers like you applied" },
          { co:"Raycast",   bg:"#FF6363", txt:"R", role:"Sr. Design Engineer",  reason:"Matches your tools-for-makers history" },
          { co:"Linear",    bg:"#5E6AD2", txt:"L", role:"Marketing Designer",   reason:"Same co, adjacent role" },
        ].map((d, i) => (
          <div key={i} style={{
            padding:14, background:"#fff", border:`1px solid ${JC.line}`, borderRadius:12,
            display:"flex", flexDirection:"column", gap:8,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <JCL co={d.txt} bg={d.bg} color="#fff" size={32} />
              <div style={{flex:1, minWidth:0}}>
                <div style={{ fontSize:13, fontWeight:700, color:JC.brandDark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.role}</div>
                <div style={{ fontSize:11.5, color:JC.inkSoft }}>{d.co}</div>
              </div>
            </div>
            <div style={{
              fontSize:11.5, color:JC.brandDark, fontWeight:500, lineHeight:1.4,
            }}>
              <i className="ti ti-sparkles" style={{fontSize:12, color:JC.amber, marginRight:4}} />
              {d.reason}
            </div>
            <div style={{display:"flex", gap:6, marginTop:2}}>
              <button style={{flex:1, padding:"6px", borderRadius:7, background:JC.lineSoft, fontSize:11.5, fontWeight:600, color:JC.inkSoft}}>Skip</button>
              <button style={{flex:1, padding:"6px", borderRadius:7, background:JC.brandDark, color:"#fff", fontSize:11.5, fontWeight:700}}>Apply →</button>
            </div>
          </div>
        ))}
      </div>
    </JCard>
  );
}

function AppliedList() {
  return (
    <JCard p={24} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{textAlign:"center", color:JC.inkSoft, fontSize:13}}>
        ← View applied jobs in the Applications tab
      </div>
    </JCard>
  );
}

/* ─── Side: agent missions ─── */
function JobsSide() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:14}}>
      <JCard p={18}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <i className="ti ti-target-arrow" style={{fontSize:15, color:JC.brandDark}} />
          <div style={{ fontSize:13.5, fontWeight:700, color:JC.brandDark }}>Agent missions</div>
          <div style={{flex:1}} />
          <button style={{ color:JC.inkSoft }}>
            <i className="ti ti-plus" style={{fontSize:15}} />
          </button>
        </div>
        <div style={{ fontSize:11.5, color:JC.inkFaint, marginBottom:10, lineHeight:1.4 }}>
          Standing instructions for what to hunt.
        </div>
        {[
          { l:"Staff PD at Series B–C SaaS", c:34, active:true },
          { l:"Design Engineer at AI startups", c:12, active:true },
          { l:"Remote-first product roles", c:18, active:false },
        ].map((m, i) => (
          <div key={i} style={{
            padding:"10px 12px", marginBottom:6, borderRadius:9,
            background: m.active ? JC.cyanGhost : JC.lineSoft,
            border: `1px solid ${m.active ? JC.cyanSoft : JC.line}`,
          }}>
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <span style={{
                width:6, height:6, borderRadius:"50%",
                background: m.active ? JC.green : JC.slate500,
              }} />
              <div style={{ fontSize:12.5, fontWeight:700, color:JC.brandDark, flex:1 }}>{m.l}</div>
            </div>
            <div style={{ fontSize:11, color:JC.inkSoft, marginTop:3, paddingLeft:14 }}>
              {m.active ? `${m.c} matches this week` : "Paused"}
            </div>
          </div>
        ))}
      </JCard>

      <JCard p={18}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <i className="ti ti-ban" style={{fontSize:15, color:JC.inkSoft}} />
          <div style={{ fontSize:13.5, fontWeight:700, color:JC.brandDark }}>Excluded</div>
        </div>
        <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
          {["MetaCo","Old Employer Inc.","BigTech"].map((c, i) => (
            <div key={i} style={{
              padding:"4px 10px", borderRadius:99, background:JC.slate100,
              fontSize:11.5, color:JC.brandDark, fontWeight:600,
              display:"flex", alignItems:"center", gap:5,
            }}>
              {c}
              <i className="ti ti-x" style={{fontSize:12, color:JC.inkFaint}} />
            </div>
          ))}
        </div>
      </JCard>
    </div>
  );
}

window.BV2_JobsQueue = JobsQueue;
