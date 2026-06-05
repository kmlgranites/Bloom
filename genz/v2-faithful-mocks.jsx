// =====================================================================
// V2 BEFORE mocks — faithful recreations of the current Bloom V2
// Built from the BloomVersion2.pdf so we can compare directly to V3.
// These intentionally look enterprise/dashboard-y — that's the point.
// =====================================================================
const { sprT: bT, fontDisplay: bFD, fontBody: bFB, fontData: bFData,
        DesktopFrame: BFrame } = window;

// ── V2 tokens (truer to current product) ────────────────────────────
const v2 = {
  brandDark: "#022F36",
  brand:     "#1D484F",
  cyan:      "#5AEBEB",
  page:      "#FAFAFA",
  card:      "#FFFFFF",
  border:    "#E5E7EB",
  inputBg:   "#F5F6F7",
  text:      "#23262E",
  muted:     "#4A5464",
  placeholder:"#A5A5A5",
  green:     "#00B16B",
  orange:    "#F76638",
};

// V2 top nav strip (Copilots / Applications / Tools / Settings)
function V2TopNav({ active = "Copilots", showUpgrade = false }) {
  return (
    <div style={{background: v2.brandDark, color:"#fff", padding:"0 24px", display:"flex", alignItems:"center", height: 48, gap: 24, flexShrink: 0}}>
      <div style={{display:"flex", alignItems:"center", gap: 10, fontWeight: 700, fontSize: 16, fontFamily: bFD, letterSpacing:"-0.01em"}}>
        <div style={{width: 22, height: 22, borderRadius: 5, background: v2.cyan}}/>
        bloom
      </div>
      <div style={{display:"flex", gap: 4, fontSize: 13, fontWeight: 600}}>
        {["Copilots","Applications","Tools","Settings"].map(t => (
          <div key={t} style={{padding:"6px 12px", borderRadius: 6, background: active === t ? "rgba(90,235,235,0.16)" : "transparent", color: active === t ? v2.cyan : "rgba(255,255,255,0.7)"}}>{t}</div>
        ))}
      </div>
      <div style={{flex:1}}/>
      {showUpgrade && (
        <div style={{display:"flex", alignItems:"center", gap: 12, background:"rgba(247,102,56,0.16)", border:`1px solid rgba(247,102,56,0.3)`, padding:"5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: v2.orange}}>
          Get 100+ Job Auto Applies at Just $9 <span style={{color:"#fff", fontWeight: 700, background: v2.orange, padding:"3px 8px", borderRadius: 4}}>Upgrade Now</span>
        </div>
      )}
      <div style={{width: 28, height: 28, borderRadius:"50%", background:"#3C5356", color:"#fff", display:"grid", placeItems:"center", fontWeight: 700, fontSize: 11}}>V</div>
    </div>
  );
}

// V2 wizard step header (1 — 2 — 3)
function V2StepHeader({ step }) {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap: 12, padding:"20px 0", borderBottom:`1px solid ${v2.border}`, flexShrink: 0}}>
      {[1,2,3].map((n,i) => (
        <React.Fragment key={n}>
          <div style={{width: 32, height: 32, borderRadius:"50%", background: n === step ? v2.brand : n < step ? v2.brand : v2.inputBg, color: n <= step ? "#fff" : v2.placeholder, display:"grid", placeItems:"center", fontWeight: 700, fontSize: 13, fontFamily:'"Inter",sans-serif', border: n === step ? `2px solid ${v2.cyan}` : "none"}}>{n}</div>
          {i < 2 && <div style={{width: 60, height: 2, background: n < step ? v2.brand : v2.border}}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 SIGNUP — split panel (dark testimonials + form)
// ─────────────────────────────────────────────────────────────────────
function V2_Signup() {
  return (
    <BFrame url="bloom.app/signup">
      <div style={{flex:1, display:"flex", background:"#fff", overflow:"hidden", fontFamily: bFB, color: v2.text}}>
        {/* Left dark panel */}
        <div style={{width:"42%", background: v2.brandDark, color:"#fff", padding:"32px 40px", display:"flex", flexDirection:"column"}}>
          <div style={{display:"flex", alignItems:"center", gap: 10, fontWeight: 700, fontSize: 18, fontFamily: bFD, letterSpacing:"-0.01em"}}>
            <div style={{width: 22, height: 22, borderRadius: 5, background: v2.cyan}}/>
            bloom
          </div>
          <div style={{flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap: 22}}>
            <div style={{fontFamily: bFD, fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing:"-0.01em"}}>
              Stop applying.<br/>Start interviewing.
            </div>
            <div style={{fontSize: 13, opacity: 0.7, marginBottom: 4}}>Trusted by over 500K Job Seekers!</div>
            {/* Testimonial */}
            <div style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: 18, maxWidth: 360}}>
              <div style={{fontSize: 13, lineHeight: 1.5, opacity: 0.9, marginBottom: 14, fontStyle:"italic"}}>
                "Bloom cut my job search time in half. More applications, more callbacks. Simple."
              </div>
              <div style={{display:"flex", alignItems:"center", gap: 10}}>
                <div style={{width: 36, height: 36, borderRadius:"50%", background: v2.cyan, color: v2.brandDark, display:"grid", placeItems:"center", fontWeight: 700, fontSize: 12}}>G</div>
                <div>
                  <div style={{fontSize: 13, fontWeight: 600}}>Grace · APM</div>
                  <div style={{fontSize: 11, opacity: 0.6}}>I'm Hired · Grace joined Google</div>
                </div>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: 18, maxWidth: 360, opacity: 0.7}}>
              <div style={{fontSize: 13, lineHeight: 1.5, fontStyle:"italic"}}>
                "Bloom gave me momentum after a layoff. Within two weeks, I had multiple interviews lined up."
              </div>
              <div style={{fontSize: 11, opacity: 0.6, marginTop: 10}}>Harshit · Principal TPM · joined Meta</div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div style={{flex:1, padding:"48px 56px", display:"flex", flexDirection:"column", justifyContent:"center", maxWidth: 540}}>
          <div style={{fontSize: 12, color: v2.muted, marginBottom: 8, fontWeight: 600}}>Step 1 of 2 · Account</div>
          <div style={{fontFamily: bFD, fontSize: 28, fontWeight: 700, color: v2.brandDark, marginBottom: 8, letterSpacing:"-0.01em"}}>Let's create your account</div>
          <div style={{fontSize: 14, color: v2.muted, marginBottom: 28, lineHeight: 1.5}}>Takes under 2 minutes. We'll set up your Copilot on the next screen.</div>

          <button style={{padding: 12, borderRadius: 8, border: `1px solid ${v2.border}`, background:"#fff", fontSize: 14, fontWeight: 600, color: v2.text, marginBottom: 20, display:"flex", alignItems:"center", justifyContent:"center", gap: 10}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><rect width="24" height="24" rx="4"/><text x="12" y="17" fontSize="14" fontWeight="700" fill="#fff" textAnchor="middle">in</text></svg>
            Continue with LinkedIn
          </button>
          <div style={{display:"flex", alignItems:"center", gap: 12, marginBottom: 16, color: v2.muted, fontSize: 12}}>
            <div style={{flex:1, height: 1, background: v2.border}}/>or with email<div style={{flex:1, height: 1, background: v2.border}}/>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12, marginBottom: 12}}>
            <V2Input label="First name" value="Vinodh"/>
            <V2Input label="Last name" value="Kumar"/>
          </div>
          <V2Input label="Work email" value="Name@example.com" placeholder/>
          <V2Input label="Country" value="🇮🇳 India"/>
          <button style={{padding: 12, borderRadius: 999, background: v2.brand, color:"#fff", fontSize: 14, fontWeight: 700, border:"none", marginTop: 18}}>Create account & continue</button>
          <div style={{fontSize: 11, color: v2.muted, textAlign:"center", marginTop: 14, lineHeight: 1.4}}>By signing up, you agree to our terms & Privacy Policy. Your data is used only for job matching - never shared.</div>
        </div>
      </div>
    </BFrame>
  );
}

function V2Input({ label, value, placeholder }) {
  return (
    <label style={{display:"flex", flexDirection:"column", gap: 4, marginBottom: 12}}>
      <span style={{fontSize: 12, fontWeight: 600, color: v2.text}}>{label}</span>
      <div style={{padding:"10px 12px", borderRadius: 8, background: v2.inputBg, border:`1px solid ${v2.border}`, fontSize: 14, color: placeholder ? v2.placeholder : v2.text}}>{value}</div>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — "One last step" — multi-copilot framing
// ─────────────────────────────────────────────────────────────────────
function V2_CreateFirstCopilot() {
  return (
    <BFrame url="bloom.app/copilots/new">
      <V2TopNav/>
      <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding: 40, background: v2.page, fontFamily: bFB, color: v2.text}}>
        <div style={{fontSize: 13, color: v2.muted, fontWeight: 600, marginBottom: 8}}>One Last Step</div>
        <div style={{fontFamily: bFD, fontSize: 36, fontWeight: 700, color: v2.brandDark, marginBottom: 10, letterSpacing:"-0.02em"}}>Create your <u style={{textDecorationColor: v2.cyan, textDecorationThickness: 4}}>first copilot</u></div>
        <div style={{fontSize: 16, color: v2.muted, marginBottom: 6, maxWidth: 560, textAlign:"center", lineHeight: 1.5}}>👋 Welcome, Vinodh</div>
        <div style={{fontSize: 15, color: v2.muted, marginBottom: 28, maxWidth: 560, textAlign:"center", lineHeight: 1.55}}>
          <b style={{color: v2.text}}>We'll apply for you.</b><br/>
          Tell your copilot what you're looking for once. It'll find matching jobs and auto-apply daily — while your focus on interviews.
        </div>
        <button style={{padding:"14px 30px", borderRadius: 999, background: v2.brand, color:"#fff", fontSize: 15, fontWeight: 700, border:"none", marginBottom: 24}}>Set up your copilot (~ 3 mins)</button>
        <div style={{display:"flex", gap: 24, fontSize: 13, color: v2.muted, fontWeight: 600}}>
          <div>✓ No Credit card</div>
          <div>✓ Try free for 7 days</div>
          <div>✓ Set up in 3 min</div>
          <div>✓ Works while you sleep</div>
          <div>✓ You stay in control</div>
        </div>
        <div style={{fontSize: 12, color: v2.muted, marginTop: 14}}>Pause or edit anytime</div>
      </div>
    </BFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — Config Step 1: Role basics (FORM-HEAVY)
// ─────────────────────────────────────────────────────────────────────
function V2_Config1() {
  return (
    <BFrame url="bloom.app/copilots/new/role">
      <V2TopNav/>
      <V2StepHeader step={1}/>
      <div style={{flex:1, overflow:"auto", padding:"30px 60px", background: v2.page, fontFamily: bFB, color: v2.text}}>
        <div style={{maxWidth: 760, margin:"0 auto"}}>
          <div style={{fontFamily: bFD, fontSize: 26, fontWeight: 700, color: v2.brandDark, marginBottom: 6, letterSpacing:"-0.015em"}}>What kind of role are looking for?</div>
          <div style={{fontSize: 14, color: v2.muted, marginBottom: 24}}>Your copilot will only apply to jobs that match these basics.</div>

          <V2Section title="Work Location" sub="Remote, on-site or both?">
            <div style={{display:"flex", gap: 10, marginBottom: 12}}>
              <V2Pill on>Remote Jobs</V2Pill>
              <V2Pill>On-site / Hybrid</V2Pill>
            </div>
            <V2Input label="Add countries or 'worldwide'" value="worldwide"/>
          </V2Section>

          <V2Section title="Job Types" sub="Select at least one">
            <div style={{display:"flex", gap: 10}}>
              <V2Pill on>Full-time</V2Pill>
              <V2Pill>Part-time</V2Pill>
              <V2Pill>Contract</V2Pill>
              <V2Pill>Internship</V2Pill>
            </div>
          </V2Section>

          <V2Section title="What should we search for?" sub="Pick how your sprout finds jobs">
            <div style={{display:"flex", gap: 10, marginBottom: 12}}>
              <V2Pill on>Job title Keywords</V2Pill>
              <V2Pill>Favorited Jobs</V2Pill>
              <V2Pill>Past applications</V2Pill>
            </div>
            <div style={{fontSize: 13, color: v2.muted, marginBottom: 8}}>Type up to 5 job titles — your sprout will search across all them.</div>
            <div style={{display:"flex", gap: 8, padding: 8, background: v2.inputBg, borderRadius: 8, border:`1px solid ${v2.border}`, flexWrap:"wrap", alignItems:"center"}}>
              <V2Tag>Product Manager ×</V2Tag>
              <V2Tag>Senior OM ×</V2Tag>
              <V2Tag>Growth PM ×</V2Tag>
              <span style={{fontSize: 13, color: v2.placeholder, padding:"4px 8px"}}>Add another title...</span>
            </div>
          </V2Section>

          <div style={{display:"flex", justifyContent:"space-between", marginTop: 32}}>
            <button style={{padding:"10px 22px", borderRadius: 8, background:"#fff", border:`1px solid ${v2.border}`, fontSize: 14, fontWeight: 600, color: v2.text}}>Back</button>
            <button style={{padding:"10px 22px", borderRadius: 8, background: v2.brand, color:"#fff", fontSize: 14, fontWeight: 700, border:"none"}}>Next: Filters</button>
          </div>
        </div>
      </div>
    </BFrame>
  );
}

function V2Section({ title, sub, children }) {
  return (
    <div style={{background:"#fff", border:`1px solid ${v2.border}`, borderRadius: 10, padding: 20, marginBottom: 16, boxShadow:"0 2px 4px -2px rgba(0,0,0,0.05)"}}>
      <div style={{fontSize: 16, fontWeight: 700, color: v2.text, marginBottom: 2}}>{title}</div>
      {sub && <div style={{fontSize: 13, color: v2.muted, marginBottom: 14}}>{sub}</div>}
      {children}
    </div>
  );
}
function V2Pill({ children, on }) {
  return (
    <span style={{padding:"7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
      background: on ? v2.brandDark : v2.inputBg, color: on ? "#fff" : v2.text, border: `1px solid ${on ? v2.brandDark : v2.border}`}}>{children}</span>
  );
}
function V2Tag({ children }) {
  return (
    <span style={{padding:"4px 10px", borderRadius: 6, background: v2.inputBg, border:`1px solid ${v2.border}`, fontSize: 13, fontWeight: 600, color: v2.text}}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — Config Step 2: Match strength + 3-mode autonomy (BURIED)
// ─────────────────────────────────────────────────────────────────────
function V2_Config2() {
  return (
    <BFrame url="bloom.app/copilots/new/filters">
      <V2TopNav/>
      <V2StepHeader step={2}/>
      <div style={{flex:1, overflow:"auto", padding:"30px 60px", background: v2.page, fontFamily: bFB, color: v2.text}}>
        <div style={{maxWidth: 760, margin:"0 auto"}}>
          <div style={{fontFamily: bFD, fontSize: 26, fontWeight: 700, color: v2.brandDark, marginBottom: 6}}>How picky should your copilot be?</div>
          <div style={{fontSize: 14, color: v2.muted, marginBottom: 16}}>Narrow your search — or leave it broad to catch more jobs.</div>
          <div style={{padding:"10px 14px", background:"#FFF9E5", border:`1px solid #FFE08A`, borderRadius: 8, fontSize: 13, color: "#7A5300", marginBottom: 20}}>💡 Only apply to jobs where you meet more than half the key requirements.</div>

          <V2Section title="Match Strength">
            <div style={{display:"flex", gap: 10}}>
              <V2Pill on>High · 50%+ match</V2Pill>
              <V2Pill>Higher · 70%+</V2Pill>
              <V2Pill>Highest · 90%+</V2Pill>
            </div>
          </V2Section>

          <V2Section title="Seniority" sub="Optional — leave blank for all levels">
            <div style={{display:"flex", gap: 10}}>
              <V2Pill>Entry</V2Pill><V2Pill>Associate</V2Pill><V2Pill on>Mid-Senior</V2Pill><V2Pill>Director+</V2Pill>
            </div>
          </V2Section>

          <V2Section title="Industry" sub="Optional — leave blank for all">
            <div style={{display:"flex", gap: 10, marginBottom: 12}}>
              <V2Pill on>Software / IT</V2Pill><V2Pill>Fintech</V2Pill><V2Pill>SaaS</V2Pill><V2Pill>Add an industry...</V2Pill>
            </div>
            <label style={{display:"flex", gap: 8, fontSize: 13, color: v2.text, alignItems:"center"}}>
              <input type="checkbox" defaultChecked/> Also include jobs without industry info
            </label>
          </V2Section>

          {/* AUTONOMY — 3 modes, buried as Section in Step 2 */}
          <V2Section title="How autonomous should your copilot be?" sub="Bloom-only: balance speed vs. control">
            <div style={{fontSize: 11, fontWeight: 700, color: v2.orange, marginBottom: 12, letterSpacing:"0.04em"}}>BLOOM EXCLUSIVE</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 12}}>
              {[
                {h:"Full auto", sub:"Apply to anything matching. Fastest results.", rate:"~40 / day", on: true},
                {h:"Review high-stakes", sub:"Auto-apply to most, ask before sending to top companies.", rate:"~25 / day"},
                {h:"Approve each", sub:"Notify before every application. Full control.", rate:"On-demand"},
              ].map(m => (
                <div key={m.h} style={{padding: 14, borderRadius: 10, background: m.on ? "#F0FCFF" : "#fff", border: m.on ? `2px solid ${v2.brand}` : `1px solid ${v2.border}`}}>
                  <div style={{fontSize: 14, fontWeight: 700, color: v2.text, marginBottom: 6}}>{m.h}</div>
                  <div style={{fontSize: 12, color: v2.muted, lineHeight: 1.45, marginBottom: 10}}>{m.sub}</div>
                  <div style={{fontSize: 12, color: v2.brand, fontWeight: 700}}>{m.rate}</div>
                </div>
              ))}
            </div>
          </V2Section>

          <div style={{display:"flex", justifyContent:"space-between", marginTop: 24}}>
            <button style={{padding:"10px 22px", borderRadius: 8, background:"#fff", border:`1px solid ${v2.border}`, fontSize: 14, fontWeight: 600, color: v2.text}}>Back</button>
            <button style={{padding:"10px 22px", borderRadius: 8, background: v2.brand, color:"#fff", fontSize: 14, fontWeight: 700, border:"none"}}>Next: Profile</button>
          </div>
        </div>
      </div>
    </BFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — Config Step 3: Resume + Screening (HEAVY FORMS)
// ─────────────────────────────────────────────────────────────────────
function V2_Config3() {
  return (
    <BFrame url="bloom.app/copilots/new/profile">
      <V2TopNav/>
      <V2StepHeader step={3}/>
      <div style={{flex:1, overflow:"auto", padding:"30px 60px", background: v2.page, fontFamily: bFB, color: v2.text}}>
        <div style={{maxWidth: 760, margin:"0 auto"}}>
          <div style={{fontFamily: bFD, fontSize: 26, fontWeight: 700, color: v2.brandDark, marginBottom: 6}}>Help your copilot sound like you</div>
          <div style={{fontSize: 14, color: v2.muted, marginBottom: 24}}>Upload your resume — we'll pre-fill the common questions so you don't repeat yourself.</div>

          <V2Section title="Resume" sub="We'll tailor it per job — keep the original">
            <div style={{padding: 16, border:`1px dashed ${v2.border}`, borderRadius: 10, display:"flex", gap: 14, alignItems:"center", background: v2.inputBg}}>
              <div style={{width: 40, height: 50, borderRadius: 4, background:"#fff", border:`1px solid ${v2.border}`, display:"grid", placeItems:"center", fontSize: 10, fontWeight: 800, color: v2.brand}}>PDF</div>
              <div style={{flex:1}}>
                <div style={{fontSize: 14, fontWeight: 700, color: v2.text}}>Richardresume.pdf <span style={{color: v2.green, fontWeight: 600, fontSize: 12, marginLeft: 6}}>Looks great</span></div>
                <div style={{fontSize: 12, color: v2.muted}}>2.4 MB · uploaded just now</div>
                <div style={{display:"flex", gap: 14, marginTop: 6, fontSize: 11, color: v2.muted}}>
                  <span>Length: ✓</span><span>Content: ✓</span><span>ATS-friendly: ✓</span><span style={{color: v2.orange}}>Keywords · 3 missing</span>
                </div>
              </div>
              <button style={{fontSize: 12, fontWeight: 700, color: v2.brand, padding:"6px 10px"}}>Replace</button>
            </div>
          </V2Section>

          <V2Section title="Cover Letter" sub="Required by ~30% of applications">
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
              <div style={{padding: 14, borderRadius: 10, border:`2px solid ${v2.brand}`, background:"#F0FCFF"}}>
                <div style={{fontSize: 14, fontWeight: 700}}>Generate per job</div>
                <div style={{fontSize: 12, color: v2.muted, marginTop: 4, lineHeight: 1.4}}>Tailored to each role automatically — recommended</div>
              </div>
              <div style={{padding: 14, borderRadius: 10, border:`1px solid ${v2.border}`, background:"#fff"}}>
                <div style={{fontSize: 14, fontWeight: 700}}>Upload one generic</div>
                <div style={{fontSize: 12, color: v2.muted, marginTop: 4, lineHeight: 1.4}}>Use the same cover letter for every application</div>
              </div>
            </div>
          </V2Section>

          <V2Section title="Screening answers" sub="These are common ATS questions. Your sprout reuses them for every job.">
            <div style={{display:"flex", flexDirection:"column", gap: 10}}>
              {[
                ["Are you legally authorized to work in India?", "Yes"],
                ["Do you require visa sponsorship?", "No"],
                ["What's your expected yearly salary (INR)?", "₹ 24,00,000"],
                ["Notice period / availability?", "2 weeks"],
                ["Years of experience in Product Management?", "6 years"],
              ].map(([q,a]) => (
                <div key={q} style={{display:"flex", gap: 14, alignItems:"center", padding:"8px 12px", background: v2.inputBg, borderRadius: 8, border:`1px solid ${v2.border}`}}>
                  <div style={{flex:1, fontSize: 13, color: v2.text, fontWeight: 500}}>{q}</div>
                  <div style={{width: 200, padding:"6px 10px", background:"#fff", borderRadius: 6, border:`1px solid ${v2.border}`, fontSize: 13, color: v2.text}}>{a}</div>
                </div>
              ))}
              <div style={{fontSize: 12, color: v2.brand, fontWeight: 700, padding:"4px 0", cursor:"pointer"}}>12 more questions auto-filled from your resume. Tap to review.</div>
            </div>
          </V2Section>

          <div style={{display:"flex", justifyContent:"space-between", marginTop: 24}}>
            <button style={{padding:"10px 22px", borderRadius: 8, background:"#fff", border:`1px solid ${v2.border}`, fontSize: 14, fontWeight: 600, color: v2.text}}>Back</button>
            <button style={{padding:"10px 28px", borderRadius: 8, background: v2.brand, color:"#fff", fontSize: 14, fontWeight: 700, border:"none"}}>Activate my Copilot</button>
          </div>
        </div>
      </div>
    </BFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — Dashboard with MULTIPLE COPILOTS (the cardinal sin)
// ─────────────────────────────────────────────────────────────────────
function V2_Dashboard() {
  return (
    <BFrame url="bloom.app/copilots">
      <V2TopNav active="Copilots" showUpgrade/>
      <div style={{flex:1, overflow:"auto", padding:"24px 32px", background: v2.page, fontFamily: bFB, color: v2.text}}>
        {/* Welcome strip */}
        <div style={{marginBottom: 18}}>
          <div style={{fontFamily: bFD, fontSize: 26, fontWeight: 700, color: v2.brandDark, letterSpacing:"-0.015em"}}>👋 Welcome back, Vinodh</div>
          <div style={{fontSize: 14, color: v2.muted, marginTop: 6}}>While you were away, your copilots applied to <b style={{color: v2.green}}>47 jobs</b> and got <b style={{color: v2.green}}>3 replies</b>. <span style={{color: v2.brand, fontWeight: 700, marginLeft: 8}}>+ New copilot</span></div>
        </div>

        {/* Stat strip */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12, marginBottom: 20}}>
          {[
            {v:"+47", l:"Applied this week"},
            {v:"+3", l:"Replies"},
            {v:"266", l:"Replies (all time)"},
            {v:"12", l:"Interview Scheduled"},
          ].map(s => (
            <div key={s.l} style={{background:"#fff", border:`1px solid ${v2.border}`, borderRadius: 10, padding: 14}}>
              <div style={{fontSize: 22, fontWeight: 700, color: v2.brandDark, fontFamily:'"Inter",sans-serif', letterSpacing:"-0.02em"}}>{s.v}</div>
              <div style={{fontSize: 12, color: v2.muted, fontWeight: 600, marginTop: 4}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Active Sprouts header */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 12}}>
          <div style={{fontSize: 16, fontWeight: 700, color: v2.text}}>Your copilots <span style={{color: v2.muted, fontWeight: 600}}>(2 of 2 active sprouts)</span></div>
          <button style={{padding:"6px 12px", borderRadius: 6, background: v2.brand, color:"#fff", fontSize: 12, fontWeight: 700}}>+ New copilot</button>
        </div>

        {/* Copilot cards — multi-copilot grid */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 14, marginBottom: 24}}>
          {[
            {n:"Product roles · Remote", loc:"Worldwide · Remote", titles:"Product Manager · Senior PM · Growth PM", level:"Mid–Senior", state:"Live · Full auto", color: v2.green, applied:"24 / 40", matched: 383, replies: 3},
            {n:"Director+ · India only", loc:"India · Remote / Hybrid", titles:"Director of Product · VP Product", level:"Director+", state:"Paused · Review high-stakes", color: "#A5A5A5", applied:"0 / 20", matched: 48, replies: 0},
          ].map(c => (
            <div key={c.n} style={{background:"#fff", border:`1px solid ${v2.border}`, borderRadius: 10, padding: 18}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
                <div style={{fontSize: 15, fontWeight: 700, color: v2.text}}>{c.n}</div>
                <button style={{padding:"4px 10px", borderRadius: 6, background: v2.inputBg, fontSize: 12, fontWeight: 600, color: v2.text, border:`1px solid ${v2.border}`}}>{c.state.includes("Paused") ? "Resume" : "Pause"}</button>
              </div>
              <div style={{fontSize: 12, fontWeight: 600, color: c.color, marginBottom: 12}}>● {c.state}</div>
              <div style={{display:"flex", flexDirection:"column", gap: 4, fontSize: 12, color: v2.muted, marginBottom: 14}}>
                <div>{c.loc}</div>
                <div style={{color: v2.text, fontWeight: 600}}>{c.titles}</div>
                <div>{c.level}</div>
              </div>
              <div style={{display:"flex", gap: 12, fontSize: 12, paddingTop: 12, borderTop:`1px solid ${v2.border}`}}>
                <div style={{flex:1}}><div style={{fontSize: 18, fontWeight: 700, color: v2.brandDark}}>{c.matched}</div><div style={{color: v2.muted}}>Matched today</div></div>
                <div style={{flex:1}}><div style={{fontSize: 18, fontWeight: 700, color: v2.brandDark}}>{c.applied}</div><div style={{color: v2.muted}}>Applied today</div></div>
                <div style={{flex:1}}><div style={{fontSize: 18, fontWeight: 700, color: v2.green}}>{c.replies}</div><div style={{color: v2.muted}}>Replies</div></div>
              </div>
              <div style={{fontSize: 12, fontWeight: 700, color: v2.brand, marginTop: 12, paddingTop: 12, borderTop:`1px solid ${v2.border}`}}>Edit Configuration</div>
            </div>
          ))}
        </div>

        {/* Today's activity table */}
        <div style={{background:"#fff", border:`1px solid ${v2.border}`, borderRadius: 10, padding: 16}}>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom: 12}}>
            <div style={{fontSize: 15, fontWeight: 700}}>Today's activity</div>
            <button style={{fontSize: 12, color: v2.brand, fontWeight: 700}}>View all</button>
          </div>
          {[
            {t:"Sprout applied to 5 jobs", sub:"Confluent, Plaid, Notion, Linear, Figma · 12 min ago", act:"Auto"},
            {t:"Plaid replied to your application", sub:"Senior PM, Growth · 2 hours ago", act:"Reply"},
            {t:"2 applications need your input", sub:"Custom questions your sprout couldn't answer · today", act:"Review now"},
            {t:"Interview booked with Stripe", sub:"Friday, 3pm IST · Senior PM Growth", act:"Interview"},
          ].map(r => (
            <div key={r.t} style={{display:"flex", gap: 14, padding:"10px 0", borderBottom:`1px solid ${v2.border}`, fontSize: 13, alignItems:"center"}}>
              <div style={{width: 28, height: 28, borderRadius:"50%", background: v2.inputBg}}/>
              <div style={{flex:1}}>
                <div style={{color: v2.text, fontWeight: 600}}>{r.t}</div>
                <div style={{color: v2.muted, fontSize: 12}}>{r.sub}</div>
              </div>
              <span style={{fontSize: 11, fontWeight: 700, color: v2.brand, padding:"3px 8px", background: v2.inputBg, borderRadius: 4}}>{r.act}</span>
            </div>
          ))}
        </div>
      </div>
    </BFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────
// V2 — Application Tracker (the table)
// ─────────────────────────────────────────────────────────────────────
function V2_Tracker() {
  return (
    <BFrame url="bloom.app/applications">
      <V2TopNav active="Applications" showUpgrade/>
      <div style={{flex:1, overflow:"auto", padding:"24px 32px", background: v2.page, fontFamily: bFB, color: v2.text}}>
        <div style={{fontFamily: bFD, fontSize: 24, fontWeight: 700, color: v2.brandDark, marginBottom: 6}}>Application Tracker</div>
        <div style={{fontSize: 14, color: v2.muted, marginBottom: 20}}>Everything your copilots have submitted — keep what you like, delete the rest to train them.</div>

        {/* Filter tabs (more multi-copilot bleed) */}
        <div style={{display:"flex", gap: 8, marginBottom: 16}}>
          {["All sprouts","Product · Remote","Director · India","External applications"].map((f,i) => (
            <div key={f} style={{padding:"6px 12px", borderRadius: 6, background: i === 0 ? v2.brandDark : "#fff", color: i === 0 ? "#fff" : v2.text, fontSize: 12, fontWeight: 600, border:`1px solid ${i === 0 ? v2.brandDark : v2.border}`}}>{f}</div>
          ))}
        </div>

        {/* Status tabs */}
        <div style={{display:"flex", gap: 0, marginBottom: 0, borderBottom:`1px solid ${v2.border}`}}>
          {[["Applied", 302, true],["Replied", 12],["Interviewing", 2],["Offer", 0]].map(([l,n,on]) => (
            <div key={l} style={{padding:"10px 16px", fontSize: 13, fontWeight: 600, color: on ? v2.brand : v2.muted, borderBottom: on ? `2px solid ${v2.brand}` : "none", marginBottom: -1, display:"flex", gap: 6}}>
              {l} <span style={{color: v2.placeholder, fontFamily:'"Inter",sans-serif'}}>{n}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{background:"#fff", border:`1px solid ${v2.border}`, borderTop:"none", borderRadius:"0 0 10px 10px", overflow:"hidden"}}>
          <div style={{display:"grid", gridTemplateColumns:"32px 1.5fr 1fr 1fr 100px 120px 100px", padding:"10px 16px", background: v2.inputBg, fontSize: 11, fontWeight: 700, color: v2.muted, textTransform:"uppercase", letterSpacing:"0.04em", gap: 12}}>
            <input type="checkbox"/><div>Company / Role</div><div>Copilot</div><div>Submitted</div><div>Match</div><div>Status</div><div>Actions</div>
          </div>
          {[
            ["Linear","Sr. Product Manager","Product · Remote","12 min ago","96%","Submitted"],
            ["Notion","Sr. PM, AI","Product · Remote","18 min ago","92%","Submitted"],
            ["Figma","Staff PM","Product · Remote","34 min ago","91%","Submitted"],
            ["Plaid","Senior PM, Growth","Product · Remote","2 hr ago","89%","Replied"],
            ["Confluent","Sr. PM","Product · Remote","3 hr ago","87%","Submitted"],
            ["Cash App","Sr. PM, Money","Product · Remote","4 hr ago","86%","Submitted"],
            ["Stripe","Senior PM Growth","Product · Remote","5 hr ago","85%","Interview"],
            ["Ramp","Sr. PM","Product · Remote","6 hr ago","84%","Submitted"],
          ].map((r,i) => (
            <div key={i} style={{display:"grid", gridTemplateColumns:"32px 1.5fr 1fr 1fr 100px 120px 100px", padding:"12px 16px", borderBottom:`1px solid ${v2.border}`, fontSize: 13, alignItems:"center", gap: 12}}>
              <input type="checkbox"/>
              <div><div style={{fontWeight: 700, color: v2.text}}>{r[0]}</div><div style={{fontSize: 12, color: v2.muted}}>{r[1]}</div></div>
              <div style={{fontSize: 12, color: v2.muted}}>{r[2]}</div>
              <div style={{fontSize: 12, color: v2.muted}}>{r[3]}</div>
              <div style={{fontSize: 12, fontWeight: 700, color: v2.green}}>{r[4]}</div>
              <div><span style={{padding:"2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: r[5] === "Replied" ? "#E0F7E9" : r[5] === "Interview" ? "#FFE08A" : v2.inputBg, color: r[5] === "Replied" ? v2.green : r[5] === "Interview" ? "#7A5300" : v2.muted}}>{r[5]}</span></div>
              <div style={{fontSize: 12, color: v2.brand, fontWeight: 700}}>View</div>
            </div>
          ))}
        </div>
      </div>
    </BFrame>
  );
}

Object.assign(window, { V2_Signup, V2_CreateFirstCopilot, V2_Config1, V2_Config2, V2_Config3, V2_Dashboard, V2_Tracker });
