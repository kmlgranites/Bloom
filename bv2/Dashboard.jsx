/* bv2/Dashboard.jsx — Home / agent status hub
   UX rationale:
   - Big "what Bloom did today" hero moment (Gen Z dopamine)
   - 1-3 inline actions surfaced (assumptions, blocking questions)
   - Activity preview, momentum stat — invites without overwhelming
*/
const { C: DC, Mascot: DM, TopNav: DTN, StatusBadge: DSB, PrimaryBtn: DPB, GhostBtn: DGB,
  Frame: DF, Card: DCard, CoLogo: DCL } = BV2;

function Dashboard() {
  return (
    <DF w={1280} h={800}>
      <DTN active="Dashboard" agentState="working" />
      <div style={{ flex:1, overflow:"hidden", padding:"24px 32px", display:"flex", flexDirection:"column", gap:20 }}>
        <DashHero />
        <DashActions />
        <DashLowerGrid />
      </div>
    </DF>
  );
}

function DashHero() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${DC.brandDark} 0%, ${DC.brandMid} 100%)`,
      borderRadius:18, padding:"24px 28px", color:"#fff",
      display:"flex", alignItems:"center", gap:24,
      position:"relative", overflow:"hidden",
    }}>
      {/* decorative cyan glow */}
      <div style={{
        position:"absolute", right:-80, top:-80, width:280, height:280, borderRadius:"50%",
        background:`radial-gradient(circle, ${DC.cyanGhost} 0%, transparent 70%)`,
      }} />
      <DM size={88} state="working" />
      <div style={{flex:1, position:"relative"}}>
        <div style={{ fontSize:13, fontWeight:600, color:DC.cyan, letterSpacing:".06em", textTransform:"uppercase" }}>
          This week
        </div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:30, fontWeight:700, letterSpacing:"-.02em", marginTop:6, lineHeight:1.15,
        }}>
          I applied to <span className="num" style={{color:DC.cyan}}>7</span> jobs for you — and you got <span className="num" style={{color:DC.cyan}}>2</span> interview invites
        </div>
        <div style={{ fontSize:13.5, color:"rgba(255,255,255,.7)", marginTop:6 }}>
          Up 40% vs last week. Your auto-apply momentum is building.
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        <button style={{
          padding:"10px 16px", borderRadius:10,
          background: DC.cyan, color: DC.brandDark,
          fontSize: 13.5, fontWeight: 700, display:"flex", alignItems:"center", gap:6,
        }}>
          <i className="ti ti-eye" style={{fontSize:15}} /> See what I did
        </button>
        <button style={{
          padding:"8px 12px", borderRadius:10,
          background:"transparent", color:"#fff",
          fontSize:12.5, fontWeight:600, border:"1px solid rgba(255,255,255,.25)",
        }}>
          <i className="ti ti-player-pause" style={{fontSize:13, marginRight:5}} /> Pause Bloom
        </button>
      </div>
    </div>
  );
}

function DashActions() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
      {/* Blocking question card */}
      <div style={{
        background:"#fff", borderRadius:14, padding:"18px 20px",
        border:`1.5px solid ${DC.amberSoft}`, display:"flex", gap:14, alignItems:"flex-start",
      }}>
        <div style={{
          width:40, height:40, borderRadius:10, background:DC.amberBg,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          <i className="ti ti-message-question" style={{fontSize:20, color:"#7A5500"}} />
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{ fontSize:11, fontWeight:700, color:"#7A5500", letterSpacing:".08em", textTransform:"uppercase" }}>
            Heads up · 1 question
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:DC.brandDark, marginTop:4, letterSpacing:"-.01em" }}>
            I need your answer to apply to Linear
          </div>
          <div style={{ fontSize:12.5, color:DC.inkSoft, marginTop:3 }}>
            One short essay. Takes ~2 minutes.
          </div>
        </div>
        <DPB size="md" icon="arrow-right">Answer</DPB>
      </div>

      {/* Assumption confirmation card */}
      <div style={{
        background:"#fff", borderRadius:14, padding:"18px 20px",
        border:`1.5px solid ${DC.line}`, display:"flex", gap:14, alignItems:"flex-start",
      }}>
        <div style={{
          width:40, height:40, borderRadius:10, background:"#FFEDE2",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          <i className="ti ti-bulb" style={{fontSize:20, color:"#C2410C"}} />
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{ fontSize:11, fontWeight:700, color:DC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
            FYI · 3 assumptions
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:DC.brandDark, marginTop:4, letterSpacing:"-.01em" }}>
            I guessed at a few things — confirm when you can
          </div>
          <div style={{ fontSize:12.5, color:DC.inkSoft, marginTop:3 }}>
            Salary, relocation, start date.
          </div>
        </div>
        <DGB icon="arrow-right">Review</DGB>
      </div>
    </div>
  );
}

function DashLowerGrid() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:14, flex:1, minHeight:0 }}>
      <DashActivity />
      <DashStats />
    </div>
  );
}

function DashActivity() {
  const items = [
    { co:"Linear",   bg:"#5E6AD2", txt:"L", role:"Product Designer",      action:"Auto-applied", time:"2h ago",  status:"auto_applied" },
    { co:"Vercel",   bg:"#000",    txt:"▲", role:"Senior Frontend Eng",   action:"Auto-applied", time:"4h ago",  status:"auto_applied" },
    { co:"Notion",   bg:"#000",    txt:"N", role:"Growth Designer",       action:"Asked you a question", time:"5h ago", status:"needs_answer" },
    { co:"Figma",    bg:"#0ACF83", txt:"F", role:"Design Engineer",       action:"Auto-applied", time:"7h ago",  status:"auto_applied" },
    { co:"Stripe",   bg:"#635BFF", txt:"S", role:"Product Designer II",   action:"Got an interview!", time:"Yesterday", status:"interview" },
  ];
  return (
    <DCard p={0} style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{
        padding:"14px 18px", borderBottom:`1px solid ${DC.line}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{ fontSize:14, fontWeight:700, color:DC.brandDark, letterSpacing:"-.01em" }}>
          Today's activity
        </div>
        <button style={{ fontSize:12, fontWeight:600, color:DC.inkSoft }}>See all →</button>
      </div>
      <div style={{ flex:1, overflow:"hidden", padding:"6px 0" }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:12, padding:"10px 18px",
            borderBottom: i < items.length-1 ? `1px solid ${DC.lineSoft}` : "none",
          }}>
            <DCL co={it.txt} bg={it.bg} color="#fff" size={32} />
            <div style={{flex:1, minWidth:0}}>
              <div style={{ fontSize:13.5, fontWeight:700, color:DC.brandDark }}>{it.role}</div>
              <div style={{ fontSize:12, color:DC.inkSoft, marginTop:1 }}>
                {it.co} · {it.action}
              </div>
            </div>
            <div style={{ fontSize:11.5, color:DC.inkFaint, fontWeight:500 }}>{it.time}</div>
            <DSB status={it.status} size="sm" />
          </div>
        ))}
      </div>
    </DCard>
  );
}

function DashStats() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:14, minHeight:0}}>
      <DCard p={18}>
        <div style={{ fontSize:11.5, fontWeight:700, color:DC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
          Momentum
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:8, marginTop:6 }}>
          <div className="num" style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:42, fontWeight:700, color:DC.brandDark, letterSpacing:"-.03em", lineHeight:1,
          }}>+40%</div>
          <div style={{ fontSize:12, color:DC.green, fontWeight:700, marginBottom:6 }}>
            <i className="ti ti-trending-up" style={{fontSize:14, marginRight:2}} />vs last week
          </div>
        </div>
        {/* tiny bars */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, marginTop:14, height:38 }}>
          {[20,28,22,34,30,42,52].map((h,i) => (
            <div key={i} style={{
              flex:1, height:`${h*0.7}px`,
              background: i === 6 ? DC.cyan : DC.slate200,
              borderRadius:"3px 3px 0 0",
            }} />
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:DC.inkFaint, marginTop:4 }}>
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </DCard>

      <DCard p={18} style={{flex:1}}>
        <div style={{ fontSize:11.5, fontWeight:700, color:DC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
          This month
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:10 }}>
          <Stat n="28" l="Applications" />
          <Stat n="6"  l="Interviews" />
          <Stat n="92%" l="Auto-fill rate" />
          <Stat n="14h" l="Time saved" />
        </div>
      </DCard>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="num" style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:24, fontWeight:700, color:DC.brandDark, letterSpacing:"-.02em", lineHeight:1,
      }}>{n}</div>
      <div style={{ fontSize:12, color:DC.inkSoft, marginTop:3 }}>{l}</div>
    </div>
  );
}

window.BV2_Dashboard = Dashboard;
