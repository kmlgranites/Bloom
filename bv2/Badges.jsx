/* bv2/Badges.jsx — Application status badge system, displayed as a reference sheet */
const { C: BgC, StatusBadge: BgB } = BV2;

function BadgeSystem() {
  const rows = [
    {
      group:"Bloom is doing something",
      items:[
        { s:"applying",     desc:"Live — Bloom is filling out a form right now" },
        { s:"processing",   desc:"Submitted; waiting on employer to acknowledge" },
      ],
    },
    {
      group:"Done, no action from you",
      items:[
        { s:"auto_applied", desc:"Bloom submitted with full confidence" },
        { s:"submitted",    desc:"You manually submitted" },
      ],
    },
    {
      group:"Bloom needs you",
      items:[
        { s:"needs_answer", desc:"Tier 3 — blocking question (custom essay, etc.)" },
        { s:"confirm",      desc:"Tier 2 — agent inferred, please confirm" },
      ],
    },
    {
      group:"Outcomes",
      items:[
        { s:"interview", desc:"You've been invited to interview" },
        { s:"rejected",  desc:"Employer declined" },
        { s:"paused",    desc:"You paused this application" },
      ],
    },
  ];

  return (
    <div style={{
      width:780, height:900, background:BgC.bg, borderRadius:14,
      border:`1px solid ${BgC.line}`, padding:"24px 28px", overflow:"auto",
      fontFamily:'"Proxima Soft", system-ui, sans-serif',
    }}>
      <div style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:22, fontWeight:700, color:BgC.brandDark, letterSpacing:"-.02em",
      }}>Status badge system</div>
      <div style={{ fontSize:13, color:BgC.inkSoft, marginTop:4 }}>
        Plain-language statuses replace tier jargon. Color = urgency, icon = type.
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:18, marginTop:22 }}>
        {rows.map((r, i) => (
          <div key={i}>
            <div style={{
              fontSize:11, fontWeight:700, color:BgC.inkFaint, letterSpacing:".08em", textTransform:"uppercase",
              marginBottom:10,
            }}>{r.group}</div>
            <div style={{
              background:"#fff", border:`1px solid ${BgC.line}`, borderRadius:12, padding:"4px 0",
            }}>
              {r.items.map((it, j) => (
                <div key={j} style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"12px 16px",
                  borderBottom: j < r.items.length-1 ? `1px solid ${BgC.lineSoft}` : "none",
                }}>
                  <div style={{ width:180 }}><BgB status={it.s} /></div>
                  <div style={{ flex:1, fontSize:12.5, color:BgC.inkSoft, lineHeight:1.4 }}>
                    {it.desc}
                  </div>
                  <div style={{
                    fontSize:11, color:BgC.inkFaint, fontFamily:"monospace",
                    padding:"2px 6px", borderRadius:5, background:BgC.lineSoft,
                  }}>{it.s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.BV2_BadgeSystem = BadgeSystem;
