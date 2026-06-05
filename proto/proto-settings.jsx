// =====================================================================
// Bloom Prototype — Settings (Account · Plan · Referrals · Logout)
// Single Sprout product — pricing is about how much you apply, not seats.
// =====================================================================
const {
  pT: sT, pFD: sFD, pFB: sFB, PM: SM, PA: SA,
  useStore: sUseStore,
} = window;

function PageSettings() {
  const { s, d } = sUseStore();
  const section = s.params.section || "account";

  const tabs = [
    { id:"account",   icon:"👤", label:"Account" },
    { id:"plan",      icon:"✦",  label:"Plan & billing" },
    { id:"referrals", icon:"🎁", label:"Refer friends" },
    { id:"about",     icon:"ⓘ",  label:"About & help" },
  ];

  return (
    <div style={{flex: 1, overflow:"auto"}}>
      {/* Header */}
      <div style={{padding:"20px 32px 14px", display:"flex", alignItems:"center", gap: 14}}>
        <button onClick={()=>d({type:"GO", route:"home"})} style={{fontSize: 18, color: sT.ink, fontWeight: 700, cursor:"pointer"}}>←</button>
        <div>
          <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 30, color: sT.ink, letterSpacing:"-0.03em", lineHeight: 1.05}}>Settings</div>
          <div style={{fontSize: 13.5, color: sT.muted, fontWeight: 600, marginTop: 2}}>Your account, your plan, and how Sprout works for you.</div>
        </div>
      </div>

      <div style={{padding:"0 32px 40px", display:"grid", gridTemplateColumns:"200px 1fr", gap: 22, alignItems:"start"}}>
        {/* Left tabs */}
        <div style={{display:"flex", flexDirection:"column", gap: 3, position:"sticky", top: 0}}>
          {tabs.map(t => {
            const active = section === t.id;
            return (
              <div key={t.id} onClick={()=>d({type:"GO", route:"settings", params:{ section: t.id }})} style={{
                display:"flex", alignItems:"center", gap: 10, padding:"10px 12px", borderRadius: 12,
                background: active ? sT.ink : "transparent", color: active ? "#fff" : sT.inkSoft,
                fontSize: 13.5, fontWeight: 600, cursor:"pointer",
              }}>
                <span style={{width: 18, textAlign:"center", opacity: active ? 1 : 0.7}}>{t.icon}</span>
                <span>{t.label}</span>
              </div>
            );
          })}
          <div style={{height: 1, background: sT.hairline, margin:"8px 4px"}}/>
          <div onClick={()=>d({type:"LOGOUT"})} style={{
            display:"flex", alignItems:"center", gap: 10, padding:"10px 12px", borderRadius: 12,
            color: "#C9603E", fontSize: 13.5, fontWeight: 700, cursor:"pointer",
          }}>
            <span style={{width: 18, textAlign:"center"}}>⏻</span>
            <span>Log out</span>
          </div>
        </div>

        {/* Right content */}
        <div style={{minWidth: 0}}>
          {section === "account"   && <SettingsAccount/>}
          {section === "plan"      && <SettingsPlan/>}
          {section === "referrals" && <SettingsReferrals/>}
          {section === "about"     && <SettingsAbout/>}
        </div>
      </div>
    </div>
  );
}

// ── Reusable card ─────────────────────────────────────────────────────
function SCard({ title, sub, children, right }) {
  return (
    <div style={{background:"#fff", borderRadius: 18, border:`1px solid ${sT.hairline}`, padding: 22, marginBottom: 16}}>
      {(title || right) && (
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap: 12, marginBottom: sub ? 4 : 14}}>
          <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 18, color: sT.ink, letterSpacing:"-0.02em"}}>{title}</div>
          {right}
        </div>
      )}
      {sub && <div style={{fontSize: 13, color: sT.muted, fontWeight: 600, marginBottom: 16, lineHeight: 1.45}}>{sub}</div>}
      {children}
    </div>
  );
}

function SRow({ label, value, action, last }) {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap: 12, padding:"12px 0", borderBottom: last ? "none" : `1px solid ${sT.hairline}`}}>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: 12, color: sT.muted, fontWeight: 700, letterSpacing:"0.02em"}}>{label}</div>
        <div style={{fontSize: 14, color: sT.ink, fontWeight: 600, marginTop: 2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{value}</div>
      </div>
      {action && <button style={{fontSize: 13, color: sT.cyanInk, fontWeight: 700, cursor:"pointer", flexShrink: 0}}>{action}</button>}
    </div>
  );
}

// ── ACCOUNT ───────────────────────────────────────────────────────────
function SettingsAccount() {
  const { s, d } = sUseStore();
  return (
    <>
      <SCard title="Profile">
        <div style={{display:"flex", alignItems:"center", gap: 16, marginBottom: 18}}>
          <div style={{width: 64, height: 64, borderRadius:"50%", background: sT.lilac, color: sT.lilacInk, display:"grid", placeItems:"center", fontFamily: sFD, fontWeight: 800, fontSize: 26}}>{s.user.initials}</div>
          <div>
            <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 20, color: sT.ink, letterSpacing:"-0.01em"}}>{s.user.firstName} Kumar</div>
            <div style={{fontSize: 13, color: sT.muted, fontWeight: 600}}>vinodh@gmail.com · joined May 2026</div>
          </div>
          <button style={{marginLeft:"auto", padding:"9px 16px", borderRadius: 999, background:"#fff", border:`1.5px solid ${sT.ink}`, fontSize: 13, fontWeight: 700, color: sT.ink, cursor:"pointer"}}>Change photo</button>
        </div>
        <SRow label="FULL NAME" value="Vinodh Kumar" action="Edit"/>
        <SRow label="EMAIL" value="vinodh@gmail.com" action="Edit"/>
        <SRow label="PHONE" value="+91 98••• ••210" action="Edit"/>
        <SRow label="PASSWORD" value="Last changed 2 weeks ago" action="Change" last/>
      </SCard>

      <SCard title="Connected accounts" sub="Sprout applies on your behalf through these.">
        <SRow label="LINKEDIN" value="✓ Connected · linkedin.com/in/vinodh" action="Disconnect"/>
        <SRow label="RÉSUMÉ" value="Vinodh_Resume_2026.pdf · synced" action="Replace"/>
        <SRow label="GOOGLE" value="Not connected" action="Connect" last/>
      </SCard>

      <SCard title="Sprout setup" sub="Re-run the guided setup any time to retrain Sprout from scratch.">
        <div style={{display:"flex", gap: 10, flexWrap:"wrap"}}>
          <button onClick={()=>d({type:"GO", route:"copilot"})} style={{padding:"11px 18px", borderRadius: 999, background: sT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer"}}>Open Copilot config</button>
          <button onClick={()=>d({type:"REPLAY_ONB"})} style={{padding:"11px 18px", borderRadius: 999, background:"#fff", border:`1.5px solid ${sT.hairline}`, fontSize: 13.5, fontWeight: 700, color: sT.ink, cursor:"pointer"}}>↻ Replay guided setup</button>
        </div>
      </SCard>

      <SCard title="Danger zone">
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap: 12}}>
          <div style={{fontSize: 13.5, color: sT.muted, fontWeight: 600, lineHeight: 1.45}}>Delete your account and all application history. This can't be undone.</div>
          <button style={{padding:"9px 16px", borderRadius: 999, background:"#FFF0EC", border:`1px solid #E8B4A4`, fontSize: 13, fontWeight: 700, color:"#C9603E", cursor:"pointer", flexShrink: 0}}>Delete account</button>
        </div>
      </SCard>
    </>
  );
}

// ── PLAN & BILLING ──────────────────────────────────────────────────────
// Single Sprout. Tiers = how many applications/month + auto-apply access.
function SettingsPlan() {
  const { s, d } = sUseStore();
  const current = s.plan || "free";

  const plans = [
    {
      id:"free", name:"Free", price:"$0", per:"forever",
      tagline:"Try Sprout on a handful of roles.",
      feats:["5 applications / month","Review-before-send","Résumé auto-fill","Email support"],
      cta: current === "free" ? "Current plan" : "Downgrade",
    },
    {
      id:"pro", name:"Pro", price:"$19", per:"/ month",
      tagline:"For an active search. Most people pick this.",
      badge:"POPULAR",
      feats:["Unlimited applications","Auto Apply (hands-free)","Smart matching & guardrails","Priority drafts · 1-tap send","Reply tracking"],
      cta: current === "pro" ? "Current plan" : "Upgrade to Pro",
    },
    {
      id:"launch", name:"Launch", price:"$49", per:"one-time",
      tagline:"2-month sprint to land the job, then cancel.",
      feats:["Everything in Pro · 60 days","Recruiter-reply coaching","Salary negotiation scripts","Priority human support"],
      cta: current === "launch" ? "Current plan" : "Get Launch",
    },
  ];

  return (
    <>
      {/* Current status strip */}
      <div style={{background: sT.ink, color:"#fff", borderRadius: 18, padding:"18px 22px", marginBottom: 16, display:"flex", alignItems:"center", gap: 16, position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:-40, right:-20, width: 160, height: 160, borderRadius:"50%", background: sT.cyan, opacity: 0.18, filter:"blur(30px)"}}/>
        <SM size={48} cap={sT.cyan} mood="happy"/>
        <div style={{flex: 1, position:"relative"}}>
          <div style={{fontSize: 11, fontWeight: 800, color: sT.cyan, letterSpacing:"0.06em"}}>YOUR PLAN</div>
          <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 22, letterSpacing:"-0.02em", marginTop: 2}}>{current === "free" ? "Free" : current === "pro" ? "Pro · $19/mo" : "Launch · 60 days"}</div>
          <div style={{fontSize: 12.5, opacity: 0.75, fontWeight: 600, marginTop: 2}}>
            {current === "free" ? "3 of 5 applications used this month" : "Unlimited applications · renews Jun 29"}
          </div>
        </div>
        {current === "free" && <div style={{position:"relative", padding:"6px 12px", borderRadius: 999, background: sT.cyan, color: sT.ink, fontSize: 12, fontWeight: 800}}>2 left</div>}
      </div>

      {/* Plan cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginBottom: 16}}>
        {plans.map(p => {
          const isCurrent = current === p.id;
          const featured = p.id === "pro";
          return (
            <div key={p.id} style={{
              background: featured ? sT.ink : "#fff", color: featured ? "#fff" : sT.ink,
              borderRadius: 18, padding: 20, border: featured ? "none" : `1px solid ${sT.hairline}`,
              position:"relative", display:"flex", flexDirection:"column", minWidth: 0,
              boxShadow: featured ? "0 16px 40px rgba(0,0,0,0.18)" : "none",
            }}>
              {p.badge && <div style={{position:"absolute", top:-9, left: 20, padding:"3px 10px", borderRadius: 99, background: sT.cyan, color: sT.ink, fontSize: 10, fontWeight: 800, letterSpacing:"0.06em"}}>{p.badge}</div>}
              <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 17, letterSpacing:"-0.01em"}}>{p.name}</div>
              <div style={{display:"flex", alignItems:"baseline", gap: 5, marginTop: 8}}>
                <span style={{fontFamily: sFD, fontWeight: 700, fontSize: 32, letterSpacing:"-0.03em"}}>{p.price}</span>
                <span style={{fontSize: 12.5, opacity: 0.6, fontWeight: 600}}>{p.per}</span>
              </div>
              <div style={{fontSize: 12.5, opacity: featured ? 0.8 : 0.7, fontWeight: 600, marginTop: 6, lineHeight: 1.4, minHeight: 34}}>{p.tagline}</div>
              <div style={{height: 1, background: featured ? "rgba(255,255,255,0.15)" : sT.hairline, margin:"14px 0"}}/>
              <div style={{display:"flex", flexDirection:"column", gap: 8, flex: 1}}>
                {p.feats.map((f,i) => (
                  <div key={i} style={{display:"flex", gap: 8, fontSize: 12.5, fontWeight: 600, lineHeight: 1.35}}>
                    <span style={{color: featured ? sT.cyan : sT.mintInk, flexShrink: 0}}>✓</span>
                    <span style={{opacity: featured ? 0.92 : 1}}>{f}</span>
                  </div>
                ))}
              </div>
              <button disabled={isCurrent} onClick={()=>d({type:"SET_PLAN", plan: p.id})} style={{
                marginTop: 16, padding:"11px 14px", borderRadius: 999, border:"none", cursor: isCurrent ? "default" : "pointer",
                fontSize: 13.5, fontWeight: 800, fontFamily: sFB,
                background: isCurrent ? (featured ? "rgba(255,255,255,0.15)" : sT.cream) : (featured ? sT.cyan : sT.ink),
                color: isCurrent ? (featured ? "#fff" : sT.muted) : (featured ? sT.ink : "#fff"),
                opacity: isCurrent ? 0.8 : 1,
              }}>{isCurrent ? "✓ Current plan" : p.cta}</button>
            </div>
          );
        })}
      </div>

      <SCard title="Billing" sub={current === "free" ? "No payment method on file — you're on the free plan." : "Visa ending 4242 · next charge Jun 29, 2026"}>
        {current !== "free" && (
          <>
            <SRow label="PAYMENT METHOD" value="Visa •••• 4242" action="Update"/>
            <SRow label="BILLING EMAIL" value="vinodh@gmail.com" action="Edit"/>
            <SRow label="INVOICES" value="3 receipts available" action="Download" last/>
          </>
        )}
        {current === "free" && (
          <button onClick={()=>d({type:"SET_PLAN", plan:"pro"})} style={{padding:"11px 18px", borderRadius: 999, background: sT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer"}}>Add payment & upgrade</button>
        )}
      </SCard>
    </>
  );
}

// ── REFERRALS ───────────────────────────────────────────────────────────
function SettingsReferrals() {
  const [copied, setCopied] = React.useState(false);
  const code = "VINODH-BLOOM";
  return (
    <>
      <div style={{background:`linear-gradient(135deg, ${sT.lilac}, ${sT.cream})`, borderRadius: 20, padding:"26px 24px", marginBottom: 16, position:"relative", overflow:"hidden"}}>
        <div style={{position:"absolute", top:-30, right:-10, fontSize: 120, opacity: 0.12}}>🎁</div>
        <div style={{fontSize: 11, fontWeight: 800, color: sT.lilacInk, letterSpacing:"0.06em"}}>GIVE A MONTH, GET A MONTH</div>
        <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 26, color: sT.ink, letterSpacing:"-0.025em", marginTop: 8, lineHeight: 1.1, maxWidth: 420}}>
          Know someone job hunting? Send them Sprout.
        </div>
        <div style={{fontSize: 13.5, color: sT.ink, opacity: 0.75, fontWeight: 600, marginTop: 8, maxWidth: 440, lineHeight: 1.45}}>
          They get <b>1 month of Pro free</b>. When they apply to their first job, <b>you get a free month too.</b>
        </div>
      </div>

      <SCard title="Your invite link">
        <div style={{display:"flex", gap: 8, alignItems:"center"}}>
          <div style={{flex: 1, padding:"12px 16px", borderRadius: 12, background: sT.cream, border:`1px solid ${sT.hairline}`, fontSize: 14, fontWeight: 700, color: sT.ink, fontFamily: sFB}}>
            bloom.app/r/{code}
          </div>
          <button onClick={()=>{ setCopied(true); setTimeout(()=>setCopied(false), 1800); }} style={{padding:"12px 18px", borderRadius: 12, background: copied ? sT.mintInk : sT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer", whiteSpace:"nowrap"}}>
            {copied ? "✓ Copied" : "Copy link"}
          </button>
        </div>
        <div style={{display:"flex", gap: 8, marginTop: 12}}>
          {["Share on WhatsApp","Email it","Copy for LinkedIn"].map(x => (
            <button key={x} style={{flex: 1, padding:"9px 10px", borderRadius: 999, background:"#fff", border:`1px solid ${sT.hairline}`, fontSize: 12.5, fontWeight: 600, color: sT.ink, cursor:"pointer"}}>{x}</button>
          ))}
        </div>
      </SCard>

      <SCard title="Your rewards">
        <div style={{display:"flex", gap: 12}}>
          <div style={{flex: 1, background: sT.cream, borderRadius: 14, padding:"16px", textAlign:"center"}}>
            <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 28, color: sT.ink}}>4</div>
            <div style={{fontSize: 12, color: sT.muted, fontWeight: 700, marginTop: 2}}>friends invited</div>
          </div>
          <div style={{flex: 1, background: sT.mint, borderRadius: 14, padding:"16px", textAlign:"center"}}>
            <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 28, color: sT.mintInk}}>2</div>
            <div style={{fontSize: 12, color: sT.mintInk, fontWeight: 700, marginTop: 2}}>free months earned</div>
          </div>
          <div style={{flex: 1, background: sT.cream, borderRadius: 14, padding:"16px", textAlign:"center"}}>
            <div style={{fontFamily: sFD, fontWeight: 700, fontSize: 28, color: sT.ink}}>2</div>
            <div style={{fontSize: 12, color: sT.muted, fontWeight: 700, marginTop: 2}}>pending</div>
          </div>
        </div>
      </SCard>
    </>
  );
}

// ── ABOUT & HELP ─────────────────────────────────────────────────────────
function SettingsAbout() {
  return (
    <>
      <SCard title="Help & support">
        <SRow label="HELP CENTER" value="Guides, FAQs, troubleshooting" action="Open"/>
        <SRow label="CONTACT US" value="hello@bloom.app · replies in ~4h" action="Email"/>
        <SRow label="FEATURE REQUESTS" value="Tell us what to build next" action="Share" last/>
      </SCard>
      <SCard title="Legal">
        <SRow label="TERMS OF SERVICE" value="Last updated Apr 2026" action="View"/>
        <SRow label="PRIVACY POLICY" value="How we handle your data" action="View"/>
        <SRow label="DATA EXPORT" value="Download everything Sprout knows" action="Export" last/>
      </SCard>
      <div style={{textAlign:"center", padding:"12px 0", fontSize: 12, color: sT.muted, fontWeight: 600}}>
        Bloom · v1.0.0 · Made for job seekers, not recruiters 🌱
      </div>
    </>
  );
}

Object.assign(window, { PageSettings });
