// =====================================================================
// Bloom Prototype — Auth (Login / Create account)
// Matches PDF: "Step 1 of 2 · Account → Copilot setup next"
// =====================================================================
const {
  pT: aT, pFD: aFD, pFB: aFB, PM: AM, PA: AA,
  useStore: aUseStore,
} = window;

function PageLogin() {
  const { d } = aUseStore();
  const [mode, setMode] = React.useState("signin"); // signin | signup

  return (
    <div style={{flex:1, display:"flex", overflow:"hidden", minHeight: 0}}>
      {/* Left brand panel */}
      <div style={{width: 380, flexShrink: 0, background: aT.ink, color:"#fff", padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", bottom:-60, right:-40, width: 260, height: 260, borderRadius:"50%", background: aT.cyan, opacity: 0.16, filter:"blur(50px)"}}/>
        <div style={{display:"flex", alignItems:"center", gap: 10, position:"relative"}}>
          <img src="assets/bloom-favicon.svg" alt="" style={{height: 34, width:"auto", display:"block"}}/>
          <div style={{fontFamily: aFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em", color:"#fff"}}>bloom</div>
        </div>

        <div style={{position:"relative"}}>
          <div style={{display:"flex", justifyContent:"center", marginBottom: 24}}>
            <img src="assets/bloom-mascot.svg" alt="Sprout" style={{width: 180, height:"auto", display:"block"}}/>
          </div>
          <div style={{fontFamily: aFD, fontWeight: 700, fontSize: 30, letterSpacing:"-0.03em", lineHeight: 1.1, textAlign:"center"}}>
            Apply to jobs<br/>without the busywork.
          </div>
          <div style={{fontSize: 14, opacity: 0.72, fontWeight: 500, marginTop: 14, lineHeight: 1.5, textAlign:"center", maxWidth: 280, margin:"14px auto 0"}}>
            Sprout fills every application in your voice. You just tap approve.
          </div>
        </div>

        <div style={{position:"relative", display:"flex", gap: 18, fontSize: 12, opacity: 0.7, fontWeight: 600}}>
          <span>★★★★★ 4.9</span>
          <span>·</span>
          <span>12,000+ offers landed</span>
        </div>
      </div>

      {/* Right form */}
      <div style={{flex: 1, display:"flex", alignItems:"center", justifyContent:"center", padding: 32, overflow:"auto"}}>
        <div style={{width:"100%", maxWidth: 380}}>
          {mode === "signup" && (
            <div style={{fontSize: 12, fontWeight: 800, color: aT.cyanInk, letterSpacing:"0.06em", marginBottom: 8}}>STEP 1 OF 2 · ACCOUNT</div>
          )}
          <div style={{fontFamily: aFD, fontWeight: 700, fontSize: 30, color: aT.ink, letterSpacing:"-0.03em", lineHeight: 1.05}}>
            {mode === "signin" ? "Welcome back" : "Let's create your account"}
          </div>
          <div style={{fontSize: 13.5, color: aT.muted, fontWeight: 600, marginTop: 6, lineHeight: 1.45}}>
            {mode === "signin" ? "Pick up right where Sprout left off." : "Takes under 2 minutes. We'll set up Sprout on the next screen."}
          </div>

          {/* SSO buttons */}
          <div style={{display:"flex", flexDirection:"column", gap: 10, marginTop: 24}}>
            <button onClick={()=>d({type:"LOGIN"})} style={ssoStyle("#0A66C2", "#fff")}>
              <span style={{fontSize: 16, fontWeight: 800}}>in</span> Continue with LinkedIn
            </button>
            <button onClick={()=>d({type:"LOGIN"})} style={ssoStyle("#fff", aT.ink, aT.hairline)}>
              <span style={{fontSize: 15}}>G</span> Continue with Google
            </button>
          </div>

          <div style={{display:"flex", alignItems:"center", gap: 12, margin:"20px 0"}}>
            <div style={{flex:1, height: 1, background: aT.hairline}}/>
            <span style={{fontSize: 11.5, color: aT.muted, fontWeight: 700}}>OR</span>
            <div style={{flex:1, height: 1, background: aT.hairline}}/>
          </div>

          {/* Email form */}
          <div style={{display:"flex", flexDirection:"column", gap: 10}}>
            {mode === "signup" && <AuthInput label="Full name" placeholder="Vinodh Kumar"/>}
            <AuthInput label="Email" placeholder="you@email.com" type="email"/>
            <AuthInput label="Password" placeholder="••••••••" type="password"/>
          </div>

          <button onClick={()=>d({type: mode === "signup" ? "REPLAY_ONB" : "LOGIN"})} style={{
            width:"100%", marginTop: 18, padding:"13px", borderRadius: 12, background: aT.ink, color:"#fff",
            border:"none", fontSize: 14.5, fontWeight: 700, cursor:"pointer", fontFamily: aFB,
          }}>
            {mode === "signin" ? "Sign in →" : "Create account → set up Sprout"}
          </button>

          <div style={{textAlign:"center", marginTop: 18, fontSize: 13, color: aT.muted, fontWeight: 600}}>
            {mode === "signin" ? "New to Bloom? " : "Already have an account? "}
            <span onClick={()=>setMode(mode === "signin" ? "signup" : "signin")} style={{color: aT.cyanInk, fontWeight: 700, cursor:"pointer"}}>
              {mode === "signin" ? "Create an account" : "Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ssoStyle(bg, color, border) {
  return {
    width:"100%", padding:"12px", borderRadius: 12, background: bg, color,
    border: border ? `1.5px solid ${border}` : "none", fontSize: 14, fontWeight: 700, cursor:"pointer",
    fontFamily: aFB, display:"inline-flex", alignItems:"center", justifyContent:"center", gap: 10,
  };
}

function AuthInput({ label, placeholder, type="text" }) {
  return (
    <label style={{display:"flex", flexDirection:"column", gap: 5}}>
      <span style={{fontSize: 12, fontWeight: 700, color: aT.muted}}>{label}</span>
      <input type={type} placeholder={placeholder} style={{
        padding:"11px 14px", borderRadius: 11, border:`1.5px solid ${aT.hairline}`, background:"#fff",
        fontSize: 14, fontFamily: aFB, color: aT.ink, outline:"none",
      }}/>
    </label>
  );
}

Object.assign(window, { PageLogin });
