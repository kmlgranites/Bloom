/* bv2/Timeline.jsx — Per-job application story: from "matched" → "interview" or done
   UX rationale:
   - Tells the agent's story for one job; great for trust + post-hoc review
   - Shows exactly which fields were auto-filled, which were guessed, what user added
*/
const { C: TC, TopNav: TTN, Frame: TF, Card: TCard, CoLogo: TCL, StatusBadge: TSB, Mascot: TM } = BV2;

function Timeline() {
  return (
    <TF w={1280} h={800}>
      <TTN active="Applications" agentState="working" />
      <div style={{flex:1, overflow:"hidden", padding:"24px 32px", display:"flex", flexDirection:"column", gap:16}}>
        <TimelineHead />
        <div style={{flex:1, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 320px", gap:20}}>
          <TimelineStream />
          <TimelineSide />
        </div>
      </div>
    </TF>
  );
}

function TimelineHead() {
  return (
    <div style={{display:"flex", alignItems:"center", gap:18}}>
      <button style={{ fontSize:13, color:TC.inkSoft, fontWeight:600 }}>
        <i className="ti ti-arrow-left" style={{fontSize:14, marginRight:4}} />
      </button>
      <TCL co="S" bg="#635BFF" color="#fff" size={52} />
      <div style={{flex:1}}>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, color:TC.brandDark, letterSpacing:"-.02em",
        }}>Product Designer II</div>
        <div style={{ fontSize:13, color:TC.inkSoft, marginTop:2 }}>
          Stripe · San Francisco, Remote · Full-time · <strong>96% match</strong>
        </div>
      </div>
      <TSB status="interview" />
      <button style={{
        padding:"10px 16px", borderRadius:10, background:"#fff",
        border:`1.5px solid ${TC.line}`, color:TC.brandDark,
        fontSize:13, fontWeight:700, display:"inline-flex", alignItems:"center", gap:6,
      }}>
        <i className="ti ti-external-link" style={{fontSize:15}} />View job
      </button>
    </div>
  );
}

const EVENTS = [
  { t:"3 days ago", h:"Stripe invited you to interview",
    body:"Maria from the design team wants 30 min Thursday at 11 AM PT.",
    who:"stripe", icon:"calendar-event", tone:"interview" },
  { t:"3 days ago", h:"Stripe started reviewing your application",
    body:"Recruiter opened your portfolio link 2 minutes after submission.",
    who:"stripe", icon:"eye", tone:"event" },
  { t:"4 days ago", h:"Application sent",
    body:"22 fields auto-filled · 1 assumption made · ~3 minutes total time.",
    who:"bloom", icon:"send", tone:"success" },
  { t:"4 days ago", h:"I guessed at your salary expectation",
    body:"$145k–$175k base. Confirmed by you the next morning.",
    who:"bloom", icon:"currency-dollar", tone:"event" },
  { t:"4 days ago", h:"I drafted a 'why Stripe' answer",
    body:'Reused your saved answer about "tools for product teams", lightly tailored.',
    who:"bloom", icon:"sparkles", tone:"event" },
  { t:"4 days ago", h:"Matched to your profile",
    body:"96% match · Skills, level, and location all aligned.",
    who:"bloom", icon:"target-arrow", tone:"start" },
];

function TimelineStream() {
  return (
    <TCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{ padding:"14px 20px", borderBottom:`1px solid ${TC.line}` }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:TC.brandDark }}>Application story</div>
      </div>
      <div style={{flex:1, overflow:"hidden", padding:"6px 0"}}>
        {EVENTS.map((e, i) => <Event key={i} e={e} last={i === EVENTS.length-1} />)}
      </div>
    </TCard>
  );
}

function Event({ e, last }) {
  const tones = {
    interview: { dotBg: "#EFE4FE", dotColor:"#6B21A8" },
    success:   { dotBg: "#E6F8EF", dotColor: "#0F7D4F" },
    event:     { dotBg: "#fff",    dotColor: TC.brandDark, border:TC.line },
    start:     { dotBg: TC.brandDark, dotColor: "#fff" },
  }[e.tone];
  return (
    <div style={{display:"flex", gap:14, padding:"14px 20px", position:"relative"}}>
      <div style={{ width:74, flexShrink:0, paddingTop:4 }}>
        <div style={{ fontSize:11.5, color:TC.inkFaint, fontWeight:600 }}>{e.t}</div>
      </div>
      <div style={{position:"relative", width:32, flexShrink:0}}>
        {!last && <div style={{position:"absolute", left:15, top:30, bottom:-18, width:2, background:TC.line}} />}
        <div style={{
          width:32, height:32, borderRadius:"50%",
          background: tones.dotBg, color: tones.dotColor,
          border: tones.border ? `2px solid ${tones.border}` : "none",
          display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1,
        }}>
          <i className={`ti ti-${e.icon}`} style={{fontSize:16}} />
        </div>
      </div>
      <div style={{flex:1, minWidth:0, paddingTop:2}}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ fontSize:14, fontWeight:700, color:TC.brandDark, letterSpacing:"-.005em" }}>{e.h}</div>
          {e.who === "bloom" && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:4,
              padding:"2px 7px", borderRadius:99, background:TC.cyanGhost,
              fontSize:10.5, color:TC.brandDark, fontWeight:700,
            }}>
              <i className="ti ti-circle-filled" style={{fontSize:9, color:TC.cyan}} />Bloom
            </div>
          )}
        </div>
        <div style={{ fontSize:12.5, color:TC.inkSoft, marginTop:3, lineHeight:1.45 }}>{e.body}</div>
      </div>
    </div>
  );
}

function TimelineSide() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:14}}>
      <TCard p={20}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
          <TM size={56} state="celebrate" />
        </div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:17, fontWeight:700, color:TC.brandDark, letterSpacing:"-.01em", textAlign:"center",
        }}>You got the interview! 🎉</div>
        <div style={{ fontSize:12.5, color:TC.inkSoft, marginTop:6, lineHeight:1.45, textAlign:"center" }}>
          Average response time for Stripe is <strong>5 days</strong>. You heard back in <strong>2</strong>.
        </div>
        <button style={{
          marginTop:12, padding:"10px", borderRadius:10,
          background:TC.brandDark, color:"#fff",
          fontSize:13, fontWeight:700, width:"100%",
          display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
        }}>
          <i className="ti ti-sparkles" style={{fontSize:15}} />Prep me for the interview
        </button>
      </TCard>

      <TCard p={20}>
        <div style={{ fontSize:11, fontWeight:700, color:TC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
          Form intelligence
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:10 }}>
          {[
            { i:"check",      l:"Auto-filled fields",  v:"22 / 23" },
            { i:"bulb",       l:"Assumptions made",    v:"1 (salary)" },
            { i:"message",    l:"Custom answers used", v:"2 (saved)" },
            { i:"clock",      l:"Time agent spent",    v:"3 min" },
            { i:"clock",      l:"Time you spent",      v:"0 min" },
          ].map((r,i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:8, fontSize:12.5,
            }}>
              <i className={`ti ti-${r.i}`} style={{fontSize:14, color:TC.inkSoft}} />
              <span style={{flex:1, color:TC.inkSoft}}>{r.l}</span>
              <span style={{ fontWeight:700, color:TC.brandDark }}>{r.v}</span>
            </div>
          ))}
        </div>
      </TCard>
    </div>
  );
}

window.BV2_Timeline = Timeline;
