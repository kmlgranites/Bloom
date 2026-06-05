/* bv2/Settings.jsx — Auto-Apply controls
   UX rationale:
   - Pause/Resume at the very top, big & honest
   - Threshold slider matches onboarding (familiarity)
   - Rules per tier are reviewable here, not just at onboarding
*/
const { C: SeC, TopNav: SeTN, Frame: SeF, Card: SeCard, Mascot: SeM } = BV2;

function Settings() {
  const [autoApply, setAutoApply] = React.useState(true);
  const [threshold, setThreshold] = React.useState(82);
  return (
    <SeF w={1280} h={800}>
      <SeTN active="Settings" agentState={autoApply ? "working" : "paused"} />
      <div style={{flex:1, overflow:"hidden", padding:"24px 32px", display:"flex", flexDirection:"column", gap:18}}>
        <div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:26, fontWeight:700, color:SeC.brandDark, letterSpacing:"-.02em",
          }}>Auto-Apply</div>
          <div style={{ fontSize:13.5, color:SeC.inkSoft, marginTop:3 }}>
            Control what I do automatically — and how careful I should be.
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:18, flex:1, minHeight:0, overflow:"hidden"}}>
          <div style={{display:"flex", flexDirection:"column", gap:16, overflow:"hidden"}}>
            <BigToggle autoApply={autoApply} setAutoApply={setAutoApply} />
            <ThresholdCard threshold={threshold} setThreshold={setThreshold} />
            <RulesCard />
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:14}}>
            <SafetyCard />
            <PrefsCard />
          </div>
        </div>
      </div>
    </SeF>
  );
}

function BigToggle({ autoApply, setAutoApply }) {
  return (
    <SeCard p={22} style={{
      background: autoApply ? `linear-gradient(135deg, #F2FAF5 0%, #fff 100%)` : "#fff",
      border: autoApply ? `1.5px solid #C8F0D8` : `1.5px solid ${SeC.line}`,
    }}>
      <div style={{display:"flex", alignItems:"center", gap:18}}>
        <SeM size={56} state={autoApply ? "working" : "paused"} />
        <div style={{flex:1}}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            padding:"3px 10px", borderRadius:99,
            background: autoApply ? "#E6F8EF" : SeC.slate100,
            color: autoApply ? "#0F7D4F" : SeC.slate700,
            fontSize:11, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase",
          }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background: autoApply ? "#0F7D4F" : SeC.slate500 }} />
            {autoApply ? "Active" : "Paused"}
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:22, fontWeight:700, color:SeC.brandDark, letterSpacing:"-.02em", marginTop:4,
          }}>
            {autoApply ? "I'm applying to jobs for you" : "I've stopped — you're in manual mode"}
          </div>
          <div style={{ fontSize:13, color:SeC.inkSoft, marginTop:3 }}>
            {autoApply
              ? "I check for new matches every hour and send out applications that meet your rules."
              : "Flip me back on whenever you're ready. Your settings are saved."}
          </div>
        </div>
        <Toggle on={autoApply} onClick={() => setAutoApply(!autoApply)} />
      </div>
    </SeCard>
  );
}

function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{
      width:56, height:30, borderRadius:99, background: on ? "#0F7D4F" : "#94A3B8",
      position:"relative", cursor:"pointer", flexShrink:0,
      transition:"background .2s ease",
    }}>
      <div style={{
        position:"absolute", top:3, left: on ? 29 : 3,
        width:24, height:24, borderRadius:"50%", background:"#fff",
        boxShadow:"0 1px 3px rgba(0,0,0,.25)",
        transition:"left .2s ease",
      }} />
    </div>
  );
}

function ThresholdCard({ threshold, setThreshold }) {
  return (
    <SeCard p={22}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:24 }}>
        <div style={{flex:1}}>
          <div style={{ fontSize:11, fontWeight:700, color:SeC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
            Match threshold
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:18, fontWeight:700, color:SeC.brandDark, letterSpacing:"-.01em", marginTop:4,
          }}>How picky should I be?</div>
          <div style={{ fontSize:13, color:SeC.inkSoft, marginTop:3 }}>
            I'll only apply to jobs at <strong>{threshold}%</strong> match or higher.
          </div>
        </div>
        <div className="num" style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:52, fontWeight:700, color:SeC.brandDark, letterSpacing:"-.04em", lineHeight:1,
        }}>{threshold}<span style={{fontSize:24}}>%</span></div>
      </div>
      <input type="range" min={60} max={100} value={threshold}
        onChange={e => setThreshold(Number(e.target.value))}
        style={{ width:"100%", marginTop:18 }} />
      <div style={{
        display:"flex", justifyContent:"space-between",
        fontSize:11.5, color:SeC.inkFaint, fontWeight:600, marginTop:6,
      }}>
        <span>60% · wide net (~20+/wk)</span>
        <span>80% · balanced (~8/wk)</span>
        <span>100% · perfect fits only</span>
      </div>
    </SeCard>
  );
}

function RulesCard() {
  const rules = [
    { dot:SeC.green,  h:"The easy stuff",      s:"~80% of fields. I send these without asking — name, email, skills, experience, education.", count:"23 fields" },
    { dot:SeC.amber,  h:"My best guess",       s:"~15%. I send + ask you to confirm later — salary, relocation, start date.", count:"5 fields" },
    { dot:SeC.orange, h:"The personal stuff",  s:"~5%. I always ask you first — essays, custom questions, motivational answers.", count:"2 fields avg" },
  ];
  return (
    <SeCard p={22} style={{flex:1, overflow:"hidden", display:"flex", flexDirection:"column"}}>
      <div style={{ fontSize:11, fontWeight:700, color:SeC.inkFaint, letterSpacing:".08em", textTransform:"uppercase" }}>
        Decision rules
      </div>
      <div style={{ fontSize:13, color:SeC.inkSoft, marginTop:4, marginBottom:14 }}>
        Here's how I handle each kind of form field. Customize per category below.
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:10, flex:1, minHeight:0, overflowY:"auto"}}>
        {rules.map((r,i) => (
          <div key={i} style={{
            display:"flex", gap:12, padding:"12px 14px",
            background:SeC.lineSoft, borderRadius:10,
          }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:r.dot, marginTop:7, flexShrink:0 }} />
            <div style={{flex:1, minWidth:0}}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ fontSize:13.5, fontWeight:700, color:SeC.brandDark }}>{r.h}</div>
                <div style={{ fontSize:11, color:SeC.inkFaint, fontWeight:600 }}>· {r.count}</div>
              </div>
              <div style={{ fontSize:12, color:SeC.inkSoft, marginTop:2, lineHeight:1.4 }}>{r.s}</div>
            </div>
            <button style={{ fontSize:12, color:SeC.brandDark, fontWeight:700 }}>Customize</button>
          </div>
        ))}
      </div>
    </SeCard>
  );
}

function SafetyCard() {
  return (
    <SeCard p={20}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <i className="ti ti-shield-check" style={{fontSize:16, color:SeC.green}} />
        <div style={{ fontSize:13.5, fontWeight:700, color:SeC.brandDark }}>Safety guarantees</div>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {[
          "I never lie about your experience",
          "I never apply to companies you've blocked",
          "I never apply to roles below your salary floor",
          "1-click pause kills new applications instantly",
        ].map((s,i) => (
          <div key={i} style={{display:"flex", alignItems:"flex-start", gap:8, fontSize:12.5, color:SeC.brandDark, lineHeight:1.4}}>
            <i className="ti ti-check" style={{fontSize:13, color:SeC.green, marginTop:3}} />
            {s}
          </div>
        ))}
      </div>
    </SeCard>
  );
}

function PrefsCard() {
  return (
    <SeCard p={20}>
      <div style={{ fontSize:13.5, fontWeight:700, color:SeC.brandDark, marginBottom:10 }}>Preferences</div>
      <PrefRow l="Daily email digest"        v="8:00 AM ET" />
      <PrefRow l="Salary floor"              v="$130k" />
      <PrefRow l="Excluded companies"        v="3 added" />
      <PrefRow l="Notification frequency"    v="Max 2/day" last />
    </SeCard>
  );
}
function PrefRow({ l, v, last }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"10px 0", borderBottom: last ? "none" : `1px solid ${SeC.lineSoft}`,
    }}>
      <div style={{ fontSize:12.5, color:SeC.brandDark }}>{l}</div>
      <button style={{ fontSize:12.5, color:SeC.inkSoft, fontWeight:600 }}>{v} <i className="ti ti-chevron-right" style={{fontSize:13, marginLeft:2}} /></button>
    </div>
  );
}

window.BV2_Settings = Settings;
