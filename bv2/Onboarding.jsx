/* bv2/Onboarding.jsx — first-time Auto-Apply setup
   UX rationale:
   - Gen Z: one clear moment, big number, casual voice ("I'll apply for you").
   - Trust: show the rules before turning it on; users see exactly what'll happen.
   - Safety: 1-click pause is everywhere; this screen establishes that.
*/
const { C, Mascot, PrimaryBtn, GhostBtn, Frame, Card } = BV2;

function OnboardingAutoApply() {
  const [step, setStep] = React.useState(1);
  const [threshold, setThreshold] = React.useState(82);
  const [autoApply, setAutoApply] = React.useState(true);

  return (
    <Frame w={1280} h={800}>
      {/* tinted backdrop with a soft cyan glow behind the dialog */}
      <div style={{
        position:"absolute", inset:0,
        background:`radial-gradient(circle at 50% 30%, ${C.cyanGhost} 0%, transparent 60%), ${C.bg}`,
      }} />

      {/* Skip / progress */}
      <div style={{
        position:"absolute", top:24, left:24, right:24, zIndex:2,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div style={{display:"flex", gap:6}}>
          {[1,2,3].map(n => (
            <div key={n} style={{
              width: n === step ? 28 : 8, height:8, borderRadius:99,
              background: n <= step ? C.brandDark : "#D5DCE2",
              transition:"width .3s ease",
            }} />
          ))}
        </div>
        <button style={{
          fontSize:13, color:C.inkSoft, fontWeight:600, padding:8,
        }}>Skip for now</button>
      </div>

      {/* Center dialog */}
      <div style={{
        position:"relative", zIndex:1, margin:"auto",
        width: 560, background:"#fff", borderRadius:24,
        padding:"40px 44px 32px",
        border:`1px solid ${C.line}`,
        boxShadow:"0 30px 80px -20px rgba(2,47,54,.25), 0 8px 24px -8px rgba(2,47,54,.12)",
        textAlign:"center",
      }}>
        {step === 1 && <Step1 onNext={() => setStep(2)} />}
        {step === 2 && <Step2 threshold={threshold} setThreshold={setThreshold} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Step3 threshold={threshold} autoApply={autoApply} setAutoApply={setAutoApply} onBack={() => setStep(2)} />}
      </div>
    </Frame>
  );
}

function Step1({ onNext }) {
  return (
    <>
      <div style={{display:"flex", justifyContent:"center", marginBottom:14}}>
        <Mascot size={104} state="celebrate" />
      </div>
      <div style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:30, fontWeight:700, color:C.brandDark, letterSpacing:"-.02em",
        lineHeight:1.15,
      }}>
        Hey — I can apply<br />to jobs for you
      </div>
      <div style={{ fontSize:15, color:C.inkSoft, marginTop:10, lineHeight:1.5, maxWidth:420, marginLeft:"auto", marginRight:"auto" }}>
        Turn on Auto-Apply and I'll send out applications while you sleep, work, or live your life. You stay in control.
      </div>

      {/* 3 quick value chips */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10,
        marginTop:26, textAlign:"left",
      }}>
        {[
          { i:"bolt",          h:"Fast",     s:"Out within minutes of posting" },
          { i:"shield-check",  h:"Honest",   s:"I never lie about your experience" },
          { i:"hand-stop",     h:"Yours",    s:"Pause anytime, 1 click" },
        ].map(v => (
          <div key={v.h} style={{
            background:C.lineSoft, borderRadius:12, padding:"12px 14px",
          }}>
            <i className={`ti ti-${v.i}`} style={{fontSize:18, color:C.brandDark}} />
            <div style={{ fontSize:13, fontWeight:700, color:C.brandDark, marginTop:6 }}>{v.h}</div>
            <div style={{ fontSize:11.5, color:C.inkSoft, marginTop:1, lineHeight:1.3 }}>{v.s}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop:28 }}>
        <PrimaryBtn icon="arrow-right" size="lg" full onClick={onNext}>Show me how this works</PrimaryBtn>
      </div>
    </>
  );
}

function Step2({ threshold, setThreshold, onNext, onBack }) {
  return (
    <>
      <div style={{display:"flex", justifyContent:"center", marginBottom:8}}>
        <Mascot size={72} state="thinking" />
      </div>
      <div style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:24, fontWeight:700, color:C.brandDark, letterSpacing:"-.02em",
      }}>
        Pick my picky-ness
      </div>
      <div style={{ fontSize:14, color:C.inkSoft, marginTop:6 }}>
        I'll only apply to jobs that match you above this score.
      </div>

      {/* Big number + slider */}
      <div style={{
        marginTop:22, padding:"28px 24px 22px",
        background: C.lineSoft, borderRadius:16, textAlign:"left",
      }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, justifyContent:"center" }}>
          <div className="num" style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:72, fontWeight:700, color:C.brandDark, letterSpacing:"-.04em", lineHeight:1,
          }}>{threshold}</div>
          <div style={{ fontSize:24, fontWeight:700, color:C.brandDark }}>%</div>
          <div style={{ fontSize:13, color:C.inkSoft, marginLeft:6 }}>match or better</div>
        </div>

        <input type="range" min={60} max={100} value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
          style={{ width:"100%", marginTop:18 }} />
        <div style={{
          display:"flex", justifyContent:"space-between",
          fontSize:11, color:C.inkFaint, fontWeight:600, marginTop:6,
        }}>
          <span>60% · cast a wide net</span>
          <span>100% · only perfect fits</span>
        </div>

        <div style={{
          marginTop:18, padding:"10px 12px",
          background:"#fff", borderRadius:10, border:`1px solid ${C.line}`,
          display:"flex", alignItems:"center", gap:10,
        }}>
          <i className="ti ti-info-circle" style={{fontSize:16, color:C.inkSoft}} />
          <div style={{ fontSize:12.5, color:C.brandDark, fontWeight:500, lineHeight:1.4 }}>
            At <strong>{threshold}%</strong>, I'd apply to about <strong>{
              threshold >= 90 ? "3–5" : threshold >= 80 ? "6–10" : threshold >= 70 ? "12–18" : "20+"
            } jobs/week</strong> for someone like you.
          </div>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, marginTop:24 }}>
        <GhostBtn icon="arrow-left" size="lg" onClick={onBack}>Back</GhostBtn>
        <div style={{flex:1}}><PrimaryBtn icon="arrow-right" size="lg" full onClick={onNext}>Continue</PrimaryBtn></div>
      </div>
    </>
  );
}

function Step3({ threshold, autoApply, setAutoApply }) {
  return (
    <>
      <div style={{display:"flex", justifyContent:"center", marginBottom:8}}>
        <Mascot size={72} state="working" />
      </div>
      <div style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:24, fontWeight:700, color:C.brandDark, letterSpacing:"-.02em",
      }}>
        Here's the deal
      </div>
      <div style={{ fontSize:14, color:C.inkSoft, marginTop:6, lineHeight:1.5, maxWidth:440, marginLeft:"auto", marginRight:"auto" }}>
        Three kinds of fields, three different rules. I'll always tell you what I did.
      </div>

      <div style={{ marginTop:22, display:"flex", flexDirection:"column", gap:10, textAlign:"left" }}>
        <DealRow
          dot={C.green}
          h="The easy stuff → I just send it"
          s="Name, email, skills, experience, education, visa status. ~80% of fields."
        />
        <DealRow
          dot={C.amber}
          h="My best guess → I send it, you confirm later"
          s="Salary range, relocation, start date. I learn from your corrections. ~15% of fields."
        />
        <DealRow
          dot={C.orange}
          h="The personal stuff → I'll ask you"
          s='Essays, "why this company", custom questions. I save your answers for next time. ~5% of fields.'
        />
      </div>

      {/* Big toggle */}
      <div style={{
        marginTop:22, padding:"14px 18px",
        background: autoApply ? "#E6F8EF" : C.slate100,
        border:`1.5px solid ${autoApply ? "#A6D8BB" : C.line}`,
        borderRadius:14,
        display:"flex", alignItems:"center", gap:14,
      }}>
        <div style={{
          width:44, height:24, borderRadius:99, background: autoApply ? "#0F7D4F" : "#94A3B8",
          position:"relative", flexShrink:0, cursor:"pointer",
          transition:"background .2s ease",
        }} onClick={() => setAutoApply(!autoApply)}>
          <div style={{
            position:"absolute", top:3, left: autoApply ? 23 : 3,
            width:18, height:18, borderRadius:"50%", background:"#fff",
            boxShadow:"0 1px 3px rgba(0,0,0,.2)",
            transition:"left .2s ease",
          }} />
        </div>
        <div style={{ flex:1, textAlign:"left" }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.brandDark }}>
            Auto-Apply is {autoApply ? "ON" : "OFF"}
          </div>
          <div style={{ fontSize:12, color:C.inkSoft, marginTop:1 }}>
            {autoApply ? `Applying to ${threshold}%+ matches starting tomorrow morning` : "I'll wait for you to flip me on"}
          </div>
        </div>
      </div>

      <div style={{ marginTop:18 }}>
        <PrimaryBtn size="lg" full icon={autoApply ? "rocket" : "check"}>
          {autoApply ? "Let's go" : "Got it, I'll turn it on later"}
        </PrimaryBtn>
      </div>
    </>
  );
}

function DealRow({ dot, h, s }) {
  return (
    <div style={{
      display:"flex", gap:12, padding:"12px 14px",
      background:"#fff", border:`1px solid ${C.line}`, borderRadius:12,
    }}>
      <div style={{
        width:8, height:8, borderRadius:"50%", background:dot,
        marginTop:7, flexShrink:0,
      }} />
      <div style={{minWidth:0}}>
        <div style={{ fontSize:13.5, fontWeight:700, color:C.brandDark }}>{h}</div>
        <div style={{ fontSize:12.5, color:C.inkSoft, marginTop:2, lineHeight:1.4 }}>{s}</div>
      </div>
    </div>
  );
}

window.BV2_Onboarding = OnboardingAutoApply;
