/* bv2/JobDetail.jsx — Slide-over panel: full job + "What I'll send" preview
   UX rationale:
   - The radical-transparency moment: show the EXACT cover letter + resume that will go out
   - Edit it in place if user wants to tweak before send
   - Add a note that re-tailors automatically
   - Apply now or schedule
*/
const { C: JdC, TopNav: JdTN, Frame: JdF, Card: JdCard, CoLogo: JdCL, Mascot: JdM } = BV2;

function JobDetail() {
  return (
    <JdF w={1280} h={800}>
      <JdTN active="Jobs" agentState="working" />
      <div style={{flex:1, position:"relative", overflow:"hidden", background:JdC.bg}}>
        {/* faint jobs list behind */}
        <div aria-hidden style={{position:"absolute", inset:0, padding:"22px 32px", opacity:.4, filter:"blur(3px)"}}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{background:"#fff", border:`1px solid ${JdC.line}`, borderRadius:14, height:88, marginBottom:14}} />
          ))}
        </div>
        <div style={{position:"absolute", inset:0, background:"rgba(2,47,54,.25)"}} />

        {/* Slide-over */}
        <div style={{
          position:"absolute", top:0, right:0, bottom:0, width:760,
          background:"#fff", borderLeft:`1px solid ${JdC.line}`,
          boxShadow:"-12px 0 50px rgba(2,47,54,.18)",
          display:"flex", flexDirection:"column",
        }}>
          <DetailHeader />
          <DetailScrollBody />
          <DetailFooter />
        </div>
      </div>
    </JdF>
  );
}

function DetailHeader() {
  return (
    <div style={{
      padding:"20px 28px 18px", borderBottom:`1px solid ${JdC.line}`,
      display:"flex", alignItems:"center", gap:14,
    }}>
      <JdCL co="L" bg="#5E6AD2" color="#fff" size={48} />
      <div style={{flex:1, minWidth:0}}>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:20, fontWeight:700, color:JdC.brandDark, letterSpacing:"-.02em",
        }}>Senior Product Designer</div>
        <div style={{ fontSize:13, color:JdC.inkSoft, marginTop:2 }}>
          Linear · Remote · $140k–$180k
        </div>
      </div>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"flex-end",
      }}>
        <div className="num" style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:24, fontWeight:700, color:JdC.brandDark, letterSpacing:"-.02em", lineHeight:1,
        }}>96%</div>
        <div style={{ fontSize:11, color:JdC.inkFaint, fontWeight:600, marginTop:2 }}>match</div>
      </div>
      <button style={{padding:6}}>
        <i className="ti ti-x" style={{fontSize:18, color:JdC.inkSoft}} />
      </button>
    </div>
  );
}

function DetailScrollBody() {
  return (
    <div style={{flex:1, overflow:"auto", padding:"22px 28px"}}>
      {/* Match breakdown */}
      <div style={{
        padding:"16px 18px", background:`linear-gradient(135deg, ${JdC.cyanGhost} 0%, transparent 100%)`,
        border:`1px solid ${JdC.cyanSoft}`, borderRadius:12, marginBottom:18,
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:JdC.brandDark, letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>
          <i className="ti ti-target-arrow" style={{fontSize:13, marginRight:5}} />Why I think this fits
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
          {[
            { ico:"check",   t:"4 yrs product design", positive:true },
            { ico:"check",   t:"Design systems experience", positive:true },
            { ico:"check",   t:"Tools-for-product-teams focus", positive:true },
            { ico:"check",   t:"Salary fits your $150k+ floor", positive:true },
            { ico:"alert-triangle", t:"Wants ex-startup; you're at agency now", positive:false },
            { ico:"check",   t:"Remote · your top preference", positive:true },
          ].map((r, i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:7,
              fontSize:12, color: r.positive ? JdC.brandDark : "#7A5500",
            }}>
              <i className={`ti ti-${r.ico}`} style={{fontSize:13}} />
              {r.t}
            </div>
          ))}
        </div>
      </div>

      {/* What I'll send section — THE transparency moment */}
      <div style={{ marginBottom:18 }}>
        <div style={{
          display:"flex", alignItems:"center", gap:10, marginBottom:10,
        }}>
          <JdM size={32} state="thinking" />
          <div>
            <div style={{
              fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
              fontSize:16, fontWeight:700, color:JdC.brandDark, letterSpacing:"-.01em",
            }}>What I'll send</div>
            <div style={{ fontSize:11.5, color:JdC.inkSoft }}>Tailored from your profile · Edit anything before it goes out</div>
          </div>
        </div>

        {/* Resume preview */}
        <div style={{
          background:"#fff", border:`1px solid ${JdC.line}`, borderRadius:10,
          padding:"12px 14px", marginBottom:8,
          display:"flex", alignItems:"center", gap:10,
        }}>
          <i className="ti ti-file-text" style={{fontSize:18, color:JdC.brandDark}} />
          <div style={{flex:1}}>
            <div style={{ fontSize:13, fontWeight:700, color:JdC.brandDark }}>Resume_AlexJones_Linear.pdf</div>
            <div style={{ fontSize:11.5, color:JdC.inkSoft }}>Highlighted design systems work · ATS-checked</div>
          </div>
          <button style={{ fontSize:12, color:JdC.brandDark, fontWeight:700 }}>Preview</button>
        </div>

        {/* Cover letter — editable */}
        <div style={{
          background:"#fff", border:`1px solid ${JdC.line}`, borderRadius:10, overflow:"hidden",
        }}>
          <div style={{
            padding:"10px 14px", borderBottom:`1px solid ${JdC.line}`, background:JdC.lineSoft,
            display:"flex", alignItems:"center", gap:8,
          }}>
            <i className="ti ti-mail" style={{fontSize:15, color:JdC.brandDark}} />
            <div style={{ fontSize:12.5, fontWeight:700, color:JdC.brandDark }}>Cover letter</div>
            <div style={{flex:1}} />
            <button style={{ fontSize:11.5, color:JdC.inkSoft, fontWeight:600 }}>
              <i className="ti ti-refresh" style={{fontSize:12, marginRight:3}} />Rewrite
            </button>
            <button style={{ fontSize:11.5, color:JdC.brandDark, fontWeight:700 }}>
              <i className="ti ti-edit" style={{fontSize:12, marginRight:3}} />Edit
            </button>
          </div>
          <div style={{
            padding:"14px 16px", fontSize:13, color:JdC.brandDark, lineHeight:1.55,
          }}>
            Hi Linear team,<br /><br />
            I've been designing internal tools for product teams for the last 4 years — the keyboard-first, speed-obsessed kind. Your work on cycles and project planning is the clearest articulation of "tools that respect the maker" I've seen.<br /><br />
            <span style={{background:"#FFF8E5", padding:"1px 3px", borderRadius:3, boxShadow:"inset 0 -1px 0 #F0D080"}}>
              At Acme, I led the migration to a code-first design tokens system — cut design–dev cycle time by 38%.
            </span> I think this kind of systems thinking is exactly what scaling Linear's design surface will need.<br /><br />
            Would love to chat.<br />
            — Alex
          </div>
        </div>

        {/* Note for agent */}
        <div style={{
          marginTop:12, padding:"12px 14px", borderRadius:10,
          background:"#FFF8E5", border:"1px solid #F0D080",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
            <i className="ti ti-message-2" style={{fontSize:14, color:"#7A5500"}} />
            <div style={{ fontSize:11.5, fontWeight:700, color:"#7A5500", letterSpacing:".06em", textTransform:"uppercase" }}>
              Add a note · I'll re-tailor
            </div>
          </div>
          <input placeholder='e.g. "Emphasize my e-commerce work" or "Mention I admire their public RFC process"'
            style={{ width:"100%", fontSize:13, color:JdC.brandDark, padding:"6px 0" }} />
        </div>
      </div>

      {/* Job description */}
      <div>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize:16, fontWeight:700, color:JdC.brandDark, letterSpacing:"-.01em",
        }}>About the role</div>
        <div style={{ fontSize:13, color:JdC.inkSoft, marginTop:8, lineHeight:1.55 }}>
          We're hiring a Senior Product Designer to help shape the next chapter of Linear — focused on the issue, project, and roadmap surfaces. You'll work closely with engineers and design peers to ship considered, keyboard-first UI at a pace most teams can't match.
        </div>
        <div style={{
          marginTop:12, display:"flex", flexWrap:"wrap", gap:6,
        }}>
          {["Full-time","Remote (US)","$140–180k","Equity","Series C"].map((c, i) => (
            <span key={i} style={{
              padding:"4px 10px", borderRadius:99, background:JdC.lineSoft,
              fontSize:11.5, color:JdC.brandDark, fontWeight:600,
            }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailFooter() {
  return (
    <div style={{
      padding:"14px 28px", borderTop:`1px solid ${JdC.line}`,
      background:JdC.lineSoft, display:"flex", alignItems:"center", gap:12,
    }}>
      <button style={{
        padding:"10px 14px", borderRadius:9, background:"#fff", border:`1.5px solid ${JdC.line}`,
        color:JdC.brandDark, fontSize:13, fontWeight:600,
      }}>
        <i className="ti ti-x" style={{fontSize:14, marginRight:5}} />Skip this job
      </button>
      <div style={{flex:1, fontSize:12, color:JdC.inkSoft, textAlign:"center"}}>
        Scheduled to send <strong style={{color:JdC.brandDark}}>at 2:00 PM today</strong>
      </div>
      <button style={{
        padding:"10px 14px", borderRadius:9, background:"#fff", border:`1.5px solid ${JdC.line}`,
        color:JdC.brandDark, fontSize:13, fontWeight:600,
      }}>
        <i className="ti ti-clock" style={{fontSize:14, marginRight:5}} />Reschedule
      </button>
      <button style={{
        padding:"10px 18px", borderRadius:9, background:JdC.brandDark, color:"#fff",
        fontSize:13.5, fontWeight:700, display:"flex", alignItems:"center", gap:6,
      }}>
        <i className="ti ti-send" style={{fontSize:15}} />Send now
      </button>
    </div>
  );
}

window.BV2_JobDetail = JobDetail;
