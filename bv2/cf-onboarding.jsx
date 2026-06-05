// Onboarding screens: signup → Setup landing
const { cfTokens: cfT, CFButton: CFB1, CFLogo: CFL1, CFMascot: CFM1, CFCard: CFC1 } = window;

// ============================================================
// 1A. SIGNUP — split-panel (dark testimonials left, form right)
// ============================================================
function CFOnboardSignup({ agentLabel = "Sprout" }) {
  return (
    <div style={{display:"flex", height:"100%", background:"#fff"}}>
      {/* Left: dark testimonial panel */}
      <div style={{
        width:"42%", background: cfT.brand, color:"#fff",
        padding:"40px 44px", position:"relative", overflow:"hidden",
        display:"flex", flexDirection:"column",
      }}>
        <CFL1 dark size={22}/>
        <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap:32, marginTop:48}}>
          <div style={{
            fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
            fontSize:38, fontWeight:700, lineHeight:1.15, letterSpacing:"-0.01em",
          }}>
            Stop applying.<br/>
            Start interviewing.
          </div>
          <div style={{fontSize:15, opacity:0.75, lineHeight:1.55, maxWidth:380}}>
            Set up your {agentLabel} once. It searches, tailors, and applies — so you spend
            your time talking to recruiters, not filling forms.
          </div>

          {/* Testimonial card */}
          <div style={{
            background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)",
            borderRadius:16, padding:20, marginTop:16, maxWidth:420,
          }}>
            <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:10}}>
              <div style={{
                width:40, height:40, borderRadius:"50%", background: cfT.cyan,
                color: cfT.brand, fontWeight:700, display:"grid", placeItems:"center", fontSize:14,
              }}>PR</div>
              <div>
                <div style={{fontWeight:600, fontSize:14}}>Priya R.</div>
                <div style={{fontSize:12, opacity:0.6}}>Senior PM · hired at Stripe</div>
              </div>
            </div>
            <div style={{fontSize:14, lineHeight:1.5, opacity:0.92}}>
              "Bloom sent 187 applications while I prepped for interviews.
              4 callbacks in week one. Offer in 19 days."
            </div>
          </div>

          <div style={{display:"flex", gap:24, marginTop:8, fontSize:13, opacity:0.65}}>
            <div>⭐ 4.8 on Trustpilot</div>
            <div>👥 500k+ job seekers</div>
          </div>
        </div>
      </div>

      {/* Right: signup form */}
      <div style={{
        flex:1, padding:"56px 64px", display:"flex", flexDirection:"column",
        justifyContent:"center", maxWidth:560, margin:"0 auto",
      }}>
        <div style={{fontSize:13, color: cfT.muted, marginBottom:8}}>Step 1 of 2 · Account</div>
        <div style={{
          fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
          fontSize:32, fontWeight:700, color: cfT.brand, marginBottom:8, letterSpacing:"-0.02em",
        }}>
          Let's create your account
        </div>
        <div style={{fontSize:15, color: cfT.muted, marginBottom:36, lineHeight:1.5}}>
          Takes under 2 minutes. We'll set up your {agentLabel} on the next screen.
        </div>

        <button style={{
          display:"flex", alignItems:"center", justifyContent:"center", gap:12,
          padding:"14px", borderRadius:12, border:`1px solid ${cfT.border}`, background:"#fff",
          fontSize:15, fontWeight:600, color: cfT.text, marginBottom:24, cursor:"pointer",
          fontFamily:"inherit",
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.6-2.2 3.4v2.8h3.6c2.1-1.9 3.2-4.7 3.2-8.2z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H2.2v2.8C4 20.9 7.7 23 12 23z"/><path fill="#FBBC04" d="M5.9 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7H2.2C1.4 8.5 1 10.2 1 12s.4 3.5 1.2 5l3.7-2.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .5 4.1 1.6L19.3 4c-1.9-1.8-4.4-2.9-7.3-2.9C7.7 1.1 4 3.1 2.2 7l3.7 2.8C6.8 7.2 9.2 5.4 12 5.4z"/></svg>
          Continue with Google
        </button>

        <div style={{
          display:"flex", alignItems:"center", gap:12, margin:"4px 0 20px",
          color: cfT.muted, fontSize:13,
        }}>
          <div style={{flex:1, height:1, background: cfT.border}}/>
          or with email
          <div style={{flex:1, height:1, background: cfT.border}}/>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14}}>
          {[
            { label:"First name", value:"Vinodh" },
            { label:"Last name",  value:"Kumar"  },
          ].map(f => (
            <label key={f.label} style={{display:"flex", flexDirection:"column", gap:6}}>
              <span style={{fontSize:13, fontWeight:600, color: cfT.text}}>{f.label}</span>
              <div style={{
                padding:"12px 14px", borderRadius:10, background: cfT.input,
                border:`1px solid ${cfT.border}`, fontSize:15, color: cfT.text,
              }}>{f.value}</div>
            </label>
          ))}
        </div>

        <label style={{display:"flex", flexDirection:"column", gap:6, marginBottom:14}}>
          <span style={{fontSize:13, fontWeight:600, color: cfT.text}}>Work email</span>
          <div style={{
            padding:"12px 14px", borderRadius:10, background: cfT.input,
            border:`1px solid ${cfT.border}`, fontSize:15, color: cfT.text,
          }}>vinodh@example.com</div>
        </label>

        <label style={{display:"flex", flexDirection:"column", gap:6, marginBottom:24}}>
          <span style={{fontSize:13, fontWeight:600, color: cfT.text}}>Country</span>
          <div style={{
            padding:"12px 14px", borderRadius:10, background: cfT.input,
            border:`1px solid ${cfT.border}`, fontSize:15, color: cfT.text,
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <span>🇮🇳 India</span>
            <i className="ti ti-chevron-down" style={{color: cfT.muted}}/>
          </div>
        </label>

        <CFB1 variant="primary" size="lg" style={{width:"100%"}}>
          Create account & continue
        </CFB1>

        <div style={{fontSize:12, color: cfT.muted, marginTop:20, lineHeight:1.5, textAlign:"center"}}>
          By signing up, you agree to our Terms & Privacy Policy. Your data is used only
          for job matching — never shared.
        </div>
      </div>
    </div>
  );
}
window.CFOnboardSignup = CFOnboardSignup;

// ============================================================
// 1B. SETUP LANDING — "Create your first Sprout"
// ============================================================
function CFOnboardLanding({ agentLabel = "Sprout" }) {
  return (
    <div style={{
      height:"100%", background:"linear-gradient(180deg, #FAFAFA 0%, #EFF7F8 100%)",
      display:"flex", flexDirection:"column",
    }}>
      <div style={{
        padding:"20px 36px", display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:`1px solid ${cfT.borderLight}`, background:"#fff",
      }}>
        <CFL1 size={22}/>
        <div style={{display:"flex", alignItems:"center", gap:10, color: cfT.muted, fontSize:13}}>
          <span>👋 Welcome, Vinodh</span>
          <div style={{
            width:34, height:34, borderRadius:"50%", background: cfT.primary,
            color:"#fff", display:"grid", placeItems:"center", fontWeight:700, fontSize:13,
          }}>VK</div>
        </div>
      </div>

      <div style={{
        flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"40px 60px", textAlign:"center",
      }}>
        <CFM1 size={120} eyes="sparkle" style={{marginBottom:24}}/>
        <div style={{fontSize:13, color: cfT.muted, marginBottom:8, fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase"}}>
          One last step
        </div>
        <h1 style={{
          fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
          fontSize:46, fontWeight:700, color: cfT.brand,
          marginBottom:16, letterSpacing:"-0.02em", lineHeight:1.05, maxWidth:720,
        }}>
          Create your first {agentLabel.toLowerCase()}.<br/>
          We'll apply for you.
        </h1>
        <p style={{
          fontSize:17, color: cfT.muted, marginBottom:36, maxWidth:560, lineHeight:1.5,
        }}>
          Tell your {agentLabel.toLowerCase()} what you're looking for once. It'll
          find matching jobs and auto-apply daily — while you focus on interviews.
        </p>

        <CFB1 variant="primary" size="lg" iconRight="arrow-right" style={{fontSize:17, padding:"16px 32px", height:56}}>
          Set up your {agentLabel.toLowerCase()} (~ 3 mins)
        </CFB1>

        {/* trust strip */}
        <div style={{
          display:"flex", gap:48, marginTop:64, color: cfT.muted, fontSize:13,
        }}>
          <Stat icon="check-circle" label="No credit card" sub="Try free for 7 days"/>
          <Stat icon="bolt" label="Set up in 3 min" sub="Works while you sleep"/>
          <Stat icon="shield-check" label="You stay in control" sub="Pause or edit anytime"/>
        </div>
      </div>
    </div>
  );
}
function Stat({ icon, label, sub }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:12}}>
      <div style={{
        width:38, height:38, borderRadius:10, background: cfT.cyanLight,
        color: cfT.primary, display:"grid", placeItems:"center",
      }}>
        <i className={`ti ti-${icon}`} style={{fontSize:18}}/>
      </div>
      <div style={{textAlign:"left"}}>
        <div style={{fontSize:14, fontWeight:700, color: cfT.text}}>{label}</div>
        <div style={{fontSize:12, color: cfT.muted}}>{sub}</div>
      </div>
    </div>
  );
}
window.CFOnboardLanding = CFOnboardLanding;
