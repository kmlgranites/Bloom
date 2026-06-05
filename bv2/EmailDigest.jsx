/* bv2/EmailDigest.jsx — daily email mocked inside a mail-client frame
   UX rationale:
   - Conversational, agent-voiced ("Here's what I did for you yesterday")
   - Big number first, then action items, then activity summary
   - Mobile-first proportions (640px content width)
*/
const { C: EC } = BV2;

function EmailDigest() {
  return (
    <div style={{
      width:720, height:880, background:"#F0F0F0",
      borderRadius:14, overflow:"hidden",
      border:`1px solid ${EC.line}`, boxShadow:"0 4px 20px rgba(2,47,54,.08)",
      display:"flex", flexDirection:"column",
      fontFamily:'"Proxima Soft", system-ui, sans-serif',
    }}>
      {/* Mail client chrome */}
      <MailChrome />
      <div style={{flex:1, overflow:"hidden auto", background:"#F0F0F0", padding:"16px 0"}}>
        <div style={{
          width:640, margin:"0 auto", background:"#fff", borderRadius:12, overflow:"hidden",
          boxShadow:"0 1px 4px rgba(0,0,0,.06)",
        }}>
          <EmailHeader />
          <EmailHero />
          <EmailActions />
          <EmailWeekSummary />
          <EmailMomentum />
          <EmailFooter />
        </div>
      </div>
    </div>
  );
}

function MailChrome() {
  return (
    <div style={{
      background:"#fff", borderBottom:`1px solid ${EC.line}`,
    }}>
      {/* traffic lights */}
      <div style={{ height:32, display:"flex", alignItems:"center", gap:6, padding:"0 12px" }}>
        <div style={{width:11, height:11, borderRadius:"50%", background:"#FF5F57"}} />
        <div style={{width:11, height:11, borderRadius:"50%", background:"#FEBC2E"}} />
        <div style={{width:11, height:11, borderRadius:"50%", background:"#28C840"}} />
      </div>
      {/* subject row */}
      <div style={{padding:"10px 18px 12px", borderTop:`1px solid ${EC.lineSoft}`}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{
            width:28, height:28, borderRadius:"50%", background:EC.brandDark,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{width:9, height:5, borderRadius:"0 0 9px 9px", background:"#fff", marginTop:6}} />
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{ fontSize:12, color:EC.inkSoft }}>
              <strong style={{color:EC.brandDark}}>Bloom</strong> &lt;hello@bloomhq.ai&gt;
            </div>
            <div style={{ fontSize:13.5, fontWeight:700, color:EC.brandDark, marginTop:1, letterSpacing:"-.01em" }}>
              Your morning brief · 7 applications, 2 interviews
            </div>
          </div>
          <div style={{ fontSize:11.5, color:EC.inkFaint }}>8:01 AM</div>
        </div>
      </div>
    </div>
  );
}

function EmailHeader() {
  return (
    <div style={{
      padding:"24px 28px 12px", borderBottom:`1px solid ${EC.lineSoft}`,
      display:"flex", alignItems:"center", gap:14,
    }}>
      <img src="assets/mushroom-loader.gif" alt=""
        style={{ width:56, height:56, objectFit:"contain" }} />
      <div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:22, fontWeight:700, color:EC.brandDark, letterSpacing:"-.02em",
        }}>Morning, Alex 👋</div>
        <div style={{ fontSize:12.5, color:EC.inkSoft, marginTop:2 }}>
          Tuesday, May 19 · Here's what happened while you slept.
        </div>
      </div>
    </div>
  );
}

function EmailHero() {
  return (
    <div style={{ padding:"22px 28px" }}>
      <div style={{
        background:EC.brandDark, color:"#fff",
        borderRadius:14, padding:"24px 24px 22px", position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", right:-50, top:-50, width:180, height:180, borderRadius:"50%",
          background:`radial-gradient(circle, ${EC.cyanGhost} 0%, transparent 70%)`,
        }} />
        <div style={{ fontSize:11.5, fontWeight:700, color:EC.cyan, letterSpacing:".1em", textTransform:"uppercase" }}>
          Yesterday
        </div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, marginTop:8, lineHeight:1.2, letterSpacing:"-.02em", position:"relative",
        }}>
          I applied to <span className="num" style={{color:EC.cyan}}>4 new jobs</span>, and Stripe wants to interview you 🎉
        </div>
        <div style={{ marginTop:14, display:"flex", gap:18 }}>
          <Pill n="4" l="applied" />
          <Pill n="2" l="interviews pending" />
          <Pill n="92%" l="auto-fill rate" />
        </div>
      </div>
    </div>
  );
}

function Pill({ n, l }) {
  return (
    <div>
      <div className="num" style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:24, fontWeight:700, color:"#fff", letterSpacing:"-.02em", lineHeight:1,
      }}>{n}</div>
      <div style={{ fontSize:11.5, color:"rgba(255,255,255,.7)", marginTop:3 }}>{l}</div>
    </div>
  );
}

function EmailActions() {
  return (
    <div style={{ padding:"0 28px 18px", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ fontSize:11, fontWeight:700, color:EC.inkFaint, letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>
        Need you today
      </div>
      <EmailAction
        tone="urgent" icon="message-question"
        title="Linear needs a 'why us' answer"
        body="One short essay. Takes ~2 minutes."
        cta="Answer the question"
      />
      <EmailAction
        tone="info" icon="calendar-event"
        title="Confirm Thursday's Stripe interview"
        body="11:00 AM PT · 30-min call with Maria from the design team."
        cta="Confirm interview"
      />
    </div>
  );
}

function EmailAction({ tone, icon, title, body, cta }) {
  const t = {
    urgent: { bg:"#FFEDE2", border:"#FFCBA8", ico:"#C2410C" },
    info:   { bg:"#E0F4FE", border:"#BFE3F5", ico:"#1D4ED8" },
  }[tone];
  return (
    <div style={{
      background:t.bg, border:`1px solid ${t.border}`, borderRadius:12,
      padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start",
    }}>
      <div style={{
        width:34, height:34, borderRadius:9, background:"#fff", border:`1px solid ${t.border}`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      }}>
        <i className={`ti ti-${icon}`} style={{fontSize:18, color:t.ico}} />
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{ fontSize:14, fontWeight:700, color:EC.brandDark }}>{title}</div>
        <div style={{ fontSize:12.5, color:EC.inkSoft, marginTop:2, lineHeight:1.4 }}>{body}</div>
        <button style={{
          marginTop:9, padding:"7px 14px", borderRadius:8,
          background:EC.brandDark, color:"#fff", fontSize:12.5, fontWeight:700,
          display:"inline-flex", alignItems:"center", gap:5,
        }}>{cta} <i className="ti ti-arrow-right" style={{fontSize:13}} /></button>
      </div>
    </div>
  );
}

function EmailWeekSummary() {
  const rows = [
    { co:"Linear",  bg:"#5E6AD2", txt:"L", role:"Product Designer",      status:"Auto-applied · 94% match" },
    { co:"Vercel",  bg:"#000",    txt:"▲", role:"Senior Frontend Eng",   status:"Auto-applied · 91% match" },
    { co:"Figma",   bg:"#0ACF83", txt:"F", role:"Design Engineer",       status:"Auto-applied · 88% match" },
    { co:"Webflow", bg:"#146EF5", txt:"W", role:"Sr. Product Designer",  status:"Auto-applied · guessed salary" },
  ];
  return (
    <div style={{ padding:"6px 28px 18px" }}>
      <div style={{ fontSize:11, fontWeight:700, color:EC.inkFaint, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>
        What I sent out
      </div>
      <div style={{
        background:"#FAFBFD", borderRadius:12, border:`1px solid ${EC.lineSoft}`,
        overflow:"hidden",
      }}>
        {rows.map((r,i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:12, padding:"11px 14px",
            borderBottom: i < rows.length-1 ? `1px solid ${EC.lineSoft}` : "none",
          }}>
            <div style={{
              width:28, height:28, borderRadius:8, background:r.bg, color:"#fff",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:'"Filson Soft","Proxima Soft",sans-serif', fontWeight:700, fontSize:12, flexShrink:0,
            }}>{r.txt}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{ fontSize:13, fontWeight:700, color:EC.brandDark }}>{r.role}</div>
              <div style={{ fontSize:11.5, color:EC.inkSoft, marginTop:1 }}>{r.co} · {r.status}</div>
            </div>
            <i className="ti ti-check" style={{fontSize:14, color:"#0F7D4F"}} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailMomentum() {
  return (
    <div style={{ padding:"0 28px 22px" }}>
      <div style={{
        padding:"16px 18px", borderRadius:12,
        background:`linear-gradient(135deg, ${EC.lineSoft} 0%, #fff 100%)`,
        border:`1px solid ${EC.line}`,
        display:"flex", alignItems:"center", gap:14,
      }}>
        <i className="ti ti-trending-up" style={{fontSize:32, color:EC.green}} />
        <div style={{flex:1}}>
          <div style={{ fontSize:13.5, fontWeight:700, color:EC.brandDark }}>
            +40% career momentum this week
          </div>
          <div style={{ fontSize:12, color:EC.inkSoft, marginTop:2 }}>
            You're outpacing 78% of designers job-hunting right now.
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailFooter() {
  return (
    <div style={{
      padding:"18px 28px 22px", borderTop:`1px solid ${EC.lineSoft}`,
      textAlign:"center",
    }}>
      <div style={{ fontSize:12, color:EC.inkSoft }}>
        Sent every morning at 8:00 AM ET · <a style={{color:EC.brandDark, fontWeight:600, textDecoration:"underline"}}>Adjust settings</a>
      </div>
      <div style={{ fontSize:11, color:EC.inkFaint, marginTop:12, lineHeight:1.5 }}>
        Bloom · 1 Mushroom Lane, Internet · <a style={{color:EC.inkFaint, textDecoration:"underline"}}>Unsubscribe</a>
      </div>
    </div>
  );
}

window.BV2_EmailDigest = EmailDigest;
