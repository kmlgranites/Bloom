/* bv2/ConfirmAssumptions.jsx — Tier 2: agent applied with inferences, user confirms async
   UX rationale:
   - Lives inside Applications as a dedicated section, not a separate page
   - Each assumption is a card: what agent guessed, why, applied to which job
   - One-tap "Looks good" vs "Fix this" — minimal friction
   - Completion state when all reviewed: charming, mascot celebrates
*/
const { C: CC, Mascot: CM, TopNav: CTN, Frame: CF, CoLogo: CCL, PrimaryBtn: CPB, GhostBtn: CGB, Card: CCard } = BV2;

function ConfirmAssumptions() {
  return (
    <CF w={1280} h={800}>
      <CTN active="Applications" agentState="working" />
      <div style={{flex:1, overflow:"hidden", padding:"24px 32px", display:"flex", flexDirection:"column", gap:16}}>
        <ConfirmHeader />
        <div style={{flex:1, overflow:"hidden", display:"grid", gridTemplateColumns:"1.4fr 320px", gap:16}}>
          <ConfirmList />
          <ConfirmSide />
        </div>
      </div>
    </CF>
  );
}

function ConfirmHeader() {
  return (
    <div style={{display:"flex", alignItems:"center", gap:18}}>
      <div style={{flex:1}}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button style={{ fontSize:13, color:CC.inkSoft, fontWeight:600 }}>
            <i className="ti ti-arrow-left" style={{fontSize:14, marginRight:4}} />Applications
          </button>
        </div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:26, fontWeight:700, color:CC.brandDark, letterSpacing:"-.02em", marginTop:4,
        }}>
          I made a few guesses — looking right?
        </div>
        <div style={{ fontSize:13.5, color:CC.inkSoft, marginTop:3 }}>
          For these 3 fields, I inferred from your profile. Confirm and I'll remember; correct and I'll learn.
        </div>
      </div>
      <CM size={68} state="thinking" />
    </div>
  );
}

const ASSUMPTIONS = [
  {
    field: "Salary expectations",
    guess: "$140k – $170k base",
    why: "Based on your 4 yrs as a Senior Designer at NYC startups + market data for the role.",
    co:"Linear", coBg:"#5E6AD2", role:"Product Designer",
    appliedAt:"2h ago",
    icon:"currency-dollar",
  },
  {
    field: "Willing to relocate?",
    guess: "Yes, for NYC and SF only",
    why: 'You set "Open to relocation" in your profile, but flagged NYC + SF as your top cities.',
    co:"Vercel", coBg:"#000", role:"Senior Frontend Engineer",
    appliedAt:"4h ago",
    icon:"map-pin",
  },
  {
    field: "Earliest start date",
    guess: "4 weeks from offer",
    why: 'You\'re currently employed; 4 weeks is the standard notice you\'d expect to give.',
    co:"Figma", coBg:"#0ACF83", role:"Design Engineer",
    appliedAt:"7h ago",
    icon:"calendar-event",
  },
];

function ConfirmList() {
  return (
    <CCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{
        padding:"14px 20px", borderBottom:`1px solid ${CC.line}`,
        display:"flex", alignItems:"center", gap:10,
      }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:CC.brandDark }}>3 assumptions to review</div>
        <div style={{flex:1}} />
        <button style={{
          padding:"6px 12px", borderRadius:99, background:"#E6F8EF", color:"#0F7D4F",
          fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:5,
        }}>
          <i className="ti ti-checks" style={{fontSize:14}} />Confirm all
        </button>
      </div>
      <div style={{flex:1, overflow:"hidden", padding:"6px 0"}}>
        {ASSUMPTIONS.map((a, i) => <AssumptionRow key={i} a={a} />)}
      </div>
    </CCard>
  );
}

function AssumptionRow({ a }) {
  const [state, setState] = React.useState("pending"); // pending | confirmed | editing
  return (
    <div style={{
      padding:"16px 20px",
      borderBottom:`1px solid ${CC.lineSoft}`,
      background: state === "confirmed" ? "#FAFEFB" : "transparent",
      transition:"background .25s ease",
    }}>
      <div style={{display:"flex", alignItems:"flex-start", gap:14}}>
        <div style={{
          width:36, height:36, borderRadius:10, background: state === "confirmed" ? "#C8F0D8" : CC.amberBg,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          <i className={`ti ti-${state === "confirmed" ? "check" : a.icon}`}
            style={{fontSize:18, color: state === "confirmed" ? "#0F7D4F" : "#7A5500"}} />
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{ fontSize:12, fontWeight:700, color:CC.inkFaint, letterSpacing:".06em", textTransform:"uppercase" }}>
            {a.field}
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:18, fontWeight:700, color:CC.brandDark, letterSpacing:"-.01em", marginTop:3,
          }}>
            {a.guess}
          </div>
          <div style={{ fontSize:12.5, color:CC.inkSoft, marginTop:4, lineHeight:1.45 }}>{a.why}</div>

          {/* Applied to chip */}
          <div style={{
            marginTop:10, padding:"6px 10px 6px 6px", display:"inline-flex", alignItems:"center", gap:8,
            background:CC.lineSoft, borderRadius:99,
          }}>
            <CCL co={a.co[0]} bg={a.coBg} color="#fff" size={22} />
            <div style={{ fontSize:12, color:CC.brandDark, fontWeight:600 }}>
              Applied to <strong>{a.co}</strong> — {a.role} · {a.appliedAt}
            </div>
          </div>
        </div>

        {state === "confirmed" ? (
          <div style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"6px 12px", borderRadius:99,
            background:"#E6F8EF", color:"#0F7D4F", fontSize:12.5, fontWeight:700,
          }}>
            <i className="ti ti-check" style={{fontSize:14}} />Confirmed
          </div>
        ) : (
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <button onClick={() => setState("editing")} style={{
              padding:"8px 14px", borderRadius:8, background:"#fff",
              border:`1.5px solid ${CC.line}`, color:CC.brandDark,
              fontSize:12.5, fontWeight:600,
            }}>Fix this</button>
            <button onClick={() => setState("confirmed")} style={{
              padding:"8px 14px", borderRadius:8, background:CC.brandDark,
              color:"#fff", fontSize:12.5, fontWeight:700,
            }}>Looks good</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfirmSide() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:14}}>
      <CCard p={20}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <CM size={56} state="thinking" />
        </div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:16, fontWeight:700, color:CC.brandDark, letterSpacing:"-.01em", textAlign:"center",
        }}>
          Why this matters
        </div>
        <div style={{
          fontSize:12.5, color:CC.inkSoft, marginTop:8, lineHeight:1.5, textAlign:"center",
        }}>
          When you fix a guess, I update your profile <strong>and</strong> avoid the same mistake on future applications. Every correction makes me sharper.
        </div>
      </CCard>

      <CCard p={20}>
        <div style={{ fontSize:11, fontWeight:700, color:CC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
          What if employers see it?
        </div>
        <div style={{ fontSize:12.5, color:CC.brandDark, marginTop:8, lineHeight:1.5, fontWeight:500 }}>
          Most fields can be updated by you with a follow-up email — I'll draft one if you correct an assumption an employer already saw.
        </div>
      </CCard>
    </div>
  );
}

window.BV2_ConfirmAssumptions = ConfirmAssumptions;
