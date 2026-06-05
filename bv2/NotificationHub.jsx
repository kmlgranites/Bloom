/* bv2/NotificationHub.jsx — Right-side sheet with high-priority items only
   UX rationale:
   - Three tiers visible: Urgent (red), FYI (amber), Done (green)
   - Strict: PRD says max 2 in-app notifications/day, so we earn each one
*/
const { C: NC, TopNav: NTN, Frame: NF, Card: NCard, CoLogo: NCL, Mascot: NM } = BV2;

function NotificationHub() {
  return (
    <NF w={1280} h={800}>
      <NTN active="Dashboard" agentState="asking" />
      <div style={{flex:1, position:"relative", overflow:"hidden", background:NC.bg}}>
        {/* faint app behind */}
        <div aria-hidden style={{ position:"absolute", inset:0, padding:"24px 32px", opacity:.35, filter:"blur(2px)" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background:"#fff", border:`1px solid ${NC.line}`, borderRadius:14, height:72, marginBottom:14 }} />
          ))}
        </div>
        <div style={{ position:"absolute", inset:0, background:"rgba(2,47,54,.15)" }} />

        {/* Sheet on right */}
        <div style={{
          position:"absolute", top:0, right:0, bottom:0, width:420,
          background:"#fff", borderLeft:`1px solid ${NC.line}`,
          boxShadow:"-10px 0 40px rgba(2,47,54,.18)",
          display:"flex", flexDirection:"column",
        }}>
          <NotifHeader />
          <div style={{flex:1, overflow:"hidden", display:"flex", flexDirection:"column"}}>
            <NotifSection title="Needs you" tone="urgent">
              <NotifCard
                tone="urgent" icon="message-question" title="Linear needs a 'why us' answer"
                body="I'm waiting for your answer to finish applying." cta="Answer · 2 min"
              />
            </NotifSection>

            <NotifSection title="Heads up" tone="info">
              <NotifCard
                tone="info" icon="calendar-event" title="Interview with Stripe on Thursday"
                body="11:00 AM PT · 30-min call with the design hiring manager." cta="Open invite"
              />
              <NotifCard
                tone="info" icon="bulb" title="3 assumptions to confirm"
                body="Salary, relocation, start date — quick review when you have a moment." cta="Review"
              />
            </NotifSection>

            <NotifSection title="Quiet wins" tone="done">
              <NotifCard
                tone="done" icon="sparkles" title="Auto-applied to 4 more jobs"
                body="Vercel, Figma, Webflow, Airbnb · all 90%+ matches." cta="See activity"
              />
            </NotifSection>
          </div>
          <NotifFooter />
        </div>
      </div>
    </NF>
  );
}

function NotifHeader() {
  return (
    <div style={{
      padding:"18px 22px 16px", borderBottom:`1px solid ${NC.line}`,
      display:"flex", alignItems:"center", gap:12,
    }}>
      <NM size={36} state="asking" />
      <div style={{flex:1}}>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:18, fontWeight:700, color:NC.brandDark, letterSpacing:"-.02em",
        }}>
          Today, from Bloom
        </div>
        <div style={{ fontSize:12, color:NC.inkSoft, marginTop:1 }}>
          May 19 · Tuesday
        </div>
      </div>
      <button style={{ padding:6 }}>
        <i className="ti ti-x" style={{fontSize:18, color:NC.inkSoft}} />
      </button>
    </div>
  );
}

function NotifSection({ title, tone, children }) {
  const tones = {
    urgent: { dot: NC.orange, label: "1" },
    info:   { dot: NC.amber,  label: "2" },
    done:   { dot: NC.green,  label: "1" },
  }[tone];
  return (
    <div>
      <div style={{
        padding:"14px 22px 6px",
        display:"flex", alignItems:"center", gap:8,
      }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:tones.dot }} />
        <div style={{
          fontSize:11, fontWeight:700, color:NC.inkSoft, letterSpacing:".1em", textTransform:"uppercase",
        }}>{title}</div>
        <span style={{
          fontSize:10.5, color:NC.inkFaint, fontWeight:700,
          padding:"1px 6px", borderRadius:99, background:NC.lineSoft,
        }}>{tones.label}</span>
      </div>
      <div style={{padding:"0 18px 6px", display:"flex", flexDirection:"column", gap:8}}>{children}</div>
    </div>
  );
}

function NotifCard({ tone, icon, title, body, cta }) {
  const tones = {
    urgent: { bg:"#FFEDE2", border:"#FFCBA8", icoBg:NC.orange, icoFg:"#fff" },
    info:   { bg:"#FFF8E5", border:"#F0D080", icoBg:NC.amber, icoFg:"#fff" },
    done:   { bg:"#F2FAF5", border:"#C8F0D8", icoBg:NC.green, icoFg:"#fff" },
  }[tone];

  return (
    <div style={{
      padding:"12px 14px", background:tones.bg, border:`1px solid ${tones.border}`,
      borderRadius:12, display:"flex", gap:12,
    }}>
      <div style={{
        width:32, height:32, borderRadius:8, background:tones.icoBg, color:tones.icoFg,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      }}>
        <i className={`ti ti-${icon}`} style={{fontSize:17}} />
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{ fontSize:13.5, fontWeight:700, color:NC.brandDark, letterSpacing:"-.005em" }}>{title}</div>
        <div style={{ fontSize:12, color:NC.inkSoft, marginTop:2, lineHeight:1.4 }}>{body}</div>
        <button style={{
          marginTop:8, padding:"6px 11px", borderRadius:7,
          background: tone === "urgent" ? NC.brandDark : "#fff",
          color: tone === "urgent" ? "#fff" : NC.brandDark,
          border: tone === "urgent" ? "none" : `1px solid ${tones.border}`,
          fontSize:12, fontWeight:700,
          display:"inline-flex", alignItems:"center", gap:5,
        }}>{cta} <i className="ti ti-arrow-right" style={{fontSize:13}} /></button>
      </div>
    </div>
  );
}

function NotifFooter() {
  return (
    <div style={{
      padding:"12px 18px", borderTop:`1px solid ${NC.line}`, background:NC.lineSoft,
      display:"flex", alignItems:"center", gap:10, justifyContent:"space-between",
    }}>
      <button style={{ fontSize:12, color:NC.inkSoft, fontWeight:600 }}>
        <i className="ti ti-bell-off" style={{fontSize:13, marginRight:4}} />Notification settings
      </button>
      <button style={{ fontSize:12, color:NC.brandDark, fontWeight:700 }}>
        Mark all as read
      </button>
    </div>
  );
}

window.BV2_NotificationHub = NotificationHub;
