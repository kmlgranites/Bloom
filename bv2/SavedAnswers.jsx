/* bv2/SavedAnswers.jsx — Memory library: every answer Bloom has saved
   UX rationale:
   - Searchable, scannable list — Gen Z wants control
   - Group by topic, show "used N times" so users see reuse value
   - Inline edit; show last-used context
*/
const { C: SC, TopNav: STN, Frame: SF, Card: SCard, CoLogo: SCL, Mascot: SM } = BV2;

function SavedAnswers() {
  return (
    <SF w={1280} h={800}>
      <STN active="Saved Answers" agentState="working" />
      <div style={{flex:1, overflow:"hidden", padding:"24px 32px", display:"flex", flexDirection:"column", gap:16}}>
        <SavedHeader />
        <div style={{flex:1, overflow:"hidden", display:"grid", gridTemplateColumns:"220px 1fr", gap:16}}>
          <SavedSidebar />
          <SavedList />
        </div>
      </div>
    </SF>
  );
}

function SavedHeader() {
  return (
    <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:24}}>
      <div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:26, fontWeight:700, color:SC.brandDark, letterSpacing:"-.02em",
        }}>What I remember about you</div>
        <div style={{ fontSize:13.5, color:SC.inkSoft, marginTop:3 }}>
          47 answers saved · I reuse these across applications so you never type the same thing twice.
        </div>
      </div>
      <div style={{
        display:"flex", alignItems:"center", gap:10, padding:"8px 14px 8px 12px",
        background:"#fff", border:`1px solid ${SC.line}`, borderRadius:10, minWidth:280,
      }}>
        <i className="ti ti-search" style={{fontSize:16, color:SC.inkFaint}} />
        <input placeholder="Search answers…" style={{
          flex:1, fontSize:13.5, color:SC.brandDark,
        }} />
        <span style={{
          padding:"2px 8px", borderRadius:6, background:SC.slate100,
          fontSize:11, color:SC.inkSoft, fontWeight:700,
        }}>⌘ K</span>
      </div>
    </div>
  );
}

function SavedSidebar() {
  const groups = [
    { l:"All answers",   c:47, ico:"layout-list",      active:true },
    { l:"About you",     c:14, ico:"user-circle" },
    { l:"Compensation",  c:6,  ico:"currency-dollar" },
    { l:"Work history",  c:12, ico:"briefcase" },
    { l:"Why this co?",  c:8,  ico:"heart" },
    { l:"Logistics",     c:7,  ico:"calendar-event" },
  ];
  return (
    <div style={{display:"flex", flexDirection:"column", gap:4}}>
      {groups.map((g,i) => (
        <button key={i} style={{
          display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
          borderRadius:9,
          background: g.active ? "#fff" : "transparent",
          border: g.active ? `1px solid ${SC.line}` : "1px solid transparent",
          color: g.active ? SC.brandDark : SC.inkSoft,
          fontSize:13, fontWeight: g.active ? 700 : 500,
        }}>
          <i className={`ti ti-${g.ico}`} style={{fontSize:16}} />
          <span style={{flex:1, textAlign:"left"}}>{g.l}</span>
          <span style={{ fontSize:11.5, color:SC.inkFaint, fontWeight:600 }}>{g.c}</span>
        </button>
      ))}
    </div>
  );
}

const ANSWERS = [
  {
    q:"Why are you interested in this company?",
    a:"I'm drawn to companies building tools for product teams — the keyboard-first design philosophy and craft-meets-pragmatism mindset.",
    used: 14, group:"Why this co?",
    lastUsed:"Used today · Linear",
  },
  {
    q:"What's your salary expectation?",
    a:"$140k – $170k base, open to equity discussions.",
    used: 22, group:"Compensation",
    lastUsed:"Used 2h ago · Vercel",
    learned: true, learnedNote:"Updated from $130k–$160k after your correction on Stripe",
  },
  {
    q:"Years of experience with React",
    a:"4 years professionally; 6 including personal projects and contracting.",
    used: 18, group:"Work history",
    lastUsed:"Used yesterday · Figma",
  },
  {
    q:"Are you authorized to work in the US?",
    a:"Yes, US citizen. No sponsorship required.",
    used: 28, group:"About you",
    lastUsed:"Used today · Notion",
  },
  {
    q:"When could you start?",
    a:"4 weeks from offer acceptance (current notice period).",
    used: 9, group:"Logistics",
    lastUsed:"Used 4h ago · Webflow",
    learned: true, learnedNote:"Was '2 weeks' — updated after you noted current employer requires 4",
  },
  {
    q:"Describe a time you led a design system change",
    a:"Led the migration from Figma libraries to a code-first design tokens system at Linear-adjacent…",
    used: 5, group:"Work history",
    lastUsed:"Used 2 days ago · Plaid",
  },
];

function SavedList() {
  return (
    <SCard p={0} style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>
      <div style={{
        padding:"14px 20px", borderBottom:`1px solid ${SC.line}`,
        display:"flex", alignItems:"center", gap:10,
      }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:SC.brandDark }}>47 answers</div>
        <div style={{flex:1}} />
        <button style={{ fontSize:12.5, color:SC.inkSoft, fontWeight:600 }}>
          Sort: Most used <i className="ti ti-chevron-down" style={{fontSize:12, marginLeft:3}} />
        </button>
      </div>
      <div style={{flex:1, overflow:"hidden"}}>
        {ANSWERS.map((ans, i) => <AnswerRow key={i} ans={ans} />)}
      </div>
    </SCard>
  );
}

function AnswerRow({ ans }) {
  return (
    <div style={{
      padding:"16px 20px", borderBottom:`1px solid ${SC.lineSoft}`,
      display:"flex", gap:16, alignItems:"flex-start",
    }}>
      <div style={{flex:1, minWidth:0}}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ fontSize:11, fontWeight:700, color:SC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
            {ans.group}
          </div>
          {ans.learned && (
            <div style={{
              display:"inline-flex", alignItems:"center", gap:4,
              padding:"2px 7px", borderRadius:99, background:"#E0F4FE",
              fontSize:10.5, color:SC.brandDark, fontWeight:700,
            }}>
              <i className="ti ti-sparkles" style={{fontSize:11}} />I learned this
            </div>
          )}
        </div>
        <div style={{
          fontSize:14, fontWeight:700, color:SC.brandDark, marginTop:4, letterSpacing:"-.005em",
        }}>{ans.q}</div>
        <div style={{
          fontSize:13, color:SC.inkSoft, marginTop:5, lineHeight:1.45,
          maxWidth:660,
        }}>"{ans.a}"</div>
        {ans.learned && (
          <div style={{
            marginTop:6, fontSize:11.5, color:SC.brandDark, fontStyle:"italic",
          }}>
            {ans.learnedNote}
          </div>
        )}
        <div style={{
          display:"flex", alignItems:"center", gap:14, marginTop:9,
          fontSize:11.5, color:SC.inkFaint, fontWeight:600,
        }}>
          <span><i className="ti ti-refresh" style={{fontSize:12, marginRight:4}} />Used <strong style={{color:SC.brandDark}}>{ans.used}</strong> times</span>
          <span><i className="ti ti-clock" style={{fontSize:12, marginRight:4}} />{ans.lastUsed}</span>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:6}}>
        <button style={{
          padding:"7px 12px", borderRadius:8, background:"#fff",
          border:`1.5px solid ${SC.line}`, color:SC.brandDark,
          fontSize:12, fontWeight:700,
          display:"flex", alignItems:"center", gap:5,
        }}>
          <i className="ti ti-edit" style={{fontSize:13}} />Edit
        </button>
      </div>
    </div>
  );
}

window.BV2_SavedAnswers = SavedAnswers;
