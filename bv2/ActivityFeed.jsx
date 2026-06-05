/* bv2/ActivityFeed.jsx — what the agent is doing right now + history */
const { C: AC, TopNav: ATN, StatusBadge: ASB, CoLogo: ACL, Frame: AF, Card: ACard, Mascot: AM } = BV2;

function ActivityFeed() {
  const [tab, setTab] = React.useState("today");
  return (
    <AF w={1280} h={800}>
      <ATN active="Applications" agentState="working" />
      <div style={{flex:1, overflow:"hidden", display:"flex", flexDirection:"column"}}>
        <FeedHeader tab={tab} setTab={setTab} />
        <div style={{flex:1, overflow:"hidden", padding:"0 32px 24px", display:"grid", gridTemplateColumns:"1fr 320px", gap:20}}>
          <FeedTimeline />
          <FeedSide />
        </div>
      </div>
    </AF>
  );
}

function FeedHeader({ tab, setTab }) {
  return (
    <div style={{
      padding:"22px 32px 14px",
      display:"flex", alignItems:"flex-end", justifyContent:"space-between",
      borderBottom:`1px solid ${AC.line}`, marginBottom:14,
    }}>
      <div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, color:AC.brandDark, letterSpacing:"-.02em",
        }}>Applications</div>
        <div style={{ fontSize:13, color:AC.inkSoft, marginTop:3 }}>
          Live feed of what Bloom is doing for you.
        </div>
      </div>
      <div style={{ display:"flex", gap:4 }}>
        {[
          { k:"today",  l:"Today",      count:"7" },
          { k:"week",   l:"This week",  count:"28" },
          { k:"all",    l:"All",        count:"156" },
        ].map(t => {
          const active = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding:"8px 14px", borderRadius:8,
              background: active ? "#fff" : "transparent",
              border: active ? `1px solid ${AC.line}` : "1px solid transparent",
              fontSize:13, fontWeight: active ? 700 : 500,
              color: active ? AC.brandDark : AC.inkSoft,
              display:"flex", alignItems:"center", gap:7,
            }}>
              {t.l}
              <span style={{
                padding:"1px 7px", borderRadius:99,
                background: active ? AC.lineSoft : AC.slate100,
                fontSize:11, fontWeight:700,
              }}>{t.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeedTimeline() {
  const items = [
    { state:"live",        time:"NOW",       co:"Linear",  txt:"L", bg:"#5E6AD2", role:"Product Designer",
      msg:"I'm reading the application form…", status:"applying" },
    { state:"asked",       time:"10:14 AM",  co:"Notion",  txt:"N", bg:"#000",    role:"Growth Designer",
      msg:'Stuck on "Why Notion?" — need your answer', status:"needs_answer" },
    { state:"done",        time:"9:32 AM",   co:"Vercel",  txt:"▲", bg:"#000",    role:"Senior Frontend Engineer",
      msg:"Auto-applied with 24 fields filled · 96% confidence", status:"auto_applied" },
    { state:"done",        time:"8:48 AM",   co:"Figma",   txt:"F", bg:"#0ACF83", role:"Design Engineer",
      msg:"Auto-applied · used your portfolio link", status:"auto_applied" },
    { state:"guessed",     time:"8:22 AM",   co:"Webflow", txt:"W", bg:"#146EF5", role:"Sr. Product Designer",
      msg:"Applied with my best guess on salary — confirm later", status:"confirm" },
    { state:"done",        time:"Yesterday", co:"Stripe",  txt:"S", bg:"#635BFF", role:"Product Designer II",
      msg:"Got an interview invite 🎉", status:"interview" },
  ];

  return (
    <ACard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{
        padding:"14px 20px", borderBottom:`1px solid ${AC.line}`,
        display:"flex", alignItems:"center", gap:10,
      }}>
        <span style={{
          width:8, height:8, borderRadius:"50%", background: AC.green,
          animation:"bv2pulse 1.6s ease-out infinite",
        }} />
        <div style={{ fontSize:14, fontWeight:700, color:AC.brandDark }}>Bloom is working on 1 application</div>
        <div style={{flex:1}} />
        <button style={{ fontSize:12, color:AC.inkSoft, fontWeight:600 }}>
          <i className="ti ti-filter" style={{fontSize:13, marginRight:4}} />Filter
        </button>
      </div>

      <div style={{flex:1, overflow:"hidden"}}>
        {items.map((it, i) => (
          <FeedRow key={i} it={it} last={i === items.length-1} />
        ))}
      </div>
    </ACard>
  );
}

function FeedRow({ it, last }) {
  const live = it.state === "live";
  return (
    <div style={{
      display:"flex", gap:14, padding:"16px 20px",
      borderBottom: last ? "none" : `1px solid ${AC.lineSoft}`,
      background: live ? "#F7FBFC" : "transparent",
      position:"relative",
    }}>
      {/* time gutter */}
      <div style={{ width:70, flexShrink:0, paddingTop:3 }}>
        <div style={{
          fontSize:11.5, fontWeight:700, color: live ? AC.brandDark : AC.inkFaint,
          letterSpacing: live ? ".08em" : "0", textTransform: live ? "uppercase" : "none",
        }}>{it.time}</div>
      </div>

      {/* spine + dot */}
      <div style={{ position:"relative", width:24, flexShrink:0 }}>
        <div style={{
          position:"absolute", left:11, top:0, bottom: last ? "50%" : "-16px",
          width:2, background:`linear-gradient(to bottom, ${AC.line}, ${AC.line})`,
        }} />
        <div style={{
          position:"absolute", left:7, top:6, width:10, height:10, borderRadius:"50%",
          background: live ? AC.cyan : "#fff",
          border:`2px solid ${live ? AC.cyan : AC.line}`,
          boxShadow: live ? `0 0 0 4px ${AC.cyanGhost}` : "none",
        }} />
      </div>

      <ACL co={it.txt} bg={it.bg} color="#fff" size={36} />

      <div style={{flex:1, minWidth:0}}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:14.5, fontWeight:700, color:AC.brandDark, letterSpacing:"-.01em" }}>{it.role}</div>
          <div style={{ fontSize:13, color:AC.inkSoft }}>· {it.co}</div>
        </div>
        <div style={{
          fontSize:13, color: live ? AC.brandDark : AC.inkSoft, marginTop:3,
          fontWeight: live ? 600 : 500, display:"flex", alignItems:"center", gap:6,
        }}>
          {live && <i className="ti ti-loader-2" style={{fontSize:13, animation:"bv2spin 1.2s linear infinite", color: AC.cyan}} />}
          {it.msg}
        </div>
      </div>

      <div style={{display:"flex", alignItems:"center", gap:10}}>
        <ASB status={it.status} size="sm" />
        {it.state === "asked" && <button style={{
          padding:"7px 14px", borderRadius:8, background:AC.brandDark, color:"#fff",
          fontSize:12.5, fontWeight:700,
        }}>Answer →</button>}
      </div>
    </div>
  );
}

function FeedSide() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:14}}>
      {/* Working now card */}
      <ACard p={18}>
        <div style={{ fontSize:11, fontWeight:700, color:AC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
          Working now
        </div>
        <div style={{display:"flex", alignItems:"center", gap:12, marginTop:12}}>
          <AM size={48} state="working" />
          <div>
            <div style={{ fontSize:13.5, fontWeight:700, color:AC.brandDark }}>Reading Linear's form</div>
            <div style={{ fontSize:11.5, color:AC.inkSoft }}>14 of 22 fields ready · ~30s left</div>
          </div>
        </div>
        <div style={{height:6, background:AC.lineSoft, borderRadius:99, overflow:"hidden", marginTop:14}}>
          <div style={{width:"64%", height:"100%", background:AC.cyan, borderRadius:99}} />
        </div>
      </ACard>

      {/* Up next queue */}
      <ACard p={0} style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden"}}>
        <div style={{ padding:"14px 18px 10px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:AC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
            Up next · 4 jobs
          </div>
        </div>
        {[
          { co:"Airbnb", bg:"#FF385C", txt:"A", role:"Product Designer",   m:94 },
          { co:"Spotify",bg:"#1DB954", txt:"S", role:"Senior UX Designer",  m:91 },
          { co:"Discord",bg:"#5865F2", txt:"D", role:"Design Engineer",     m:88 },
          { co:"Plaid",  bg:"#000",    txt:"P", role:"Product Designer",    m:85 },
        ].map((q,i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:10, padding:"9px 18px",
            borderTop:`1px solid ${AC.lineSoft}`,
          }}>
            <ACL co={q.txt} bg={q.bg} color="#fff" size={26} />
            <div style={{flex:1, minWidth:0}}>
              <div style={{ fontSize:12.5, fontWeight:700, color:AC.brandDark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{q.role}</div>
              <div style={{ fontSize:11, color:AC.inkSoft }}>{q.co}</div>
            </div>
            <div className="num" style={{
              fontSize:12.5, fontWeight:700, color:AC.brandDark,
              padding:"2px 7px", borderRadius:6, background:AC.cyanGhost,
            }}>{q.m}%</div>
          </div>
        ))}
      </ACard>
    </div>
  );
}

window.BV2_ActivityFeed = ActivityFeed;
