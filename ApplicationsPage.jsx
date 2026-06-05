// ApplicationsPage.jsx — Bloom Applications page with closed-jobs treatment variants
const { useState: useStateA } = React;

const PALETTE = {
  brandDark:"#022F36", brandMid:"#1D484F", cyan:"#5AEBEB", cyanBg:"#9FE2EA",
  orange:"#F76638", green:"#00B16B", bgPage:"#F0F3F7", border:"#E6E5E1",
  amber:"#FEEAAE", amberBorder:"#F0D080", amberText:"#7A5500",
  slate50:"#F8FAFC", slate100:"#F1F5F9", slate200:"#E2E8F0", slate300:"#CBD5E1",
  slate500:"#64748B", slate700:"#334155", slate900:"#0F172A",
  rose50:"#FFF1F2", rose200:"#FECDD3", rose700:"#BE123C",
  blue50:"#EFF6FF", blue100:"#DBEAFE", blue200:"#BFDBFE", blue700:"#1D4ED8",
};

/* ──── Apps data (matches reference) ──── */
const JOBS = [
  {id:1, role:"Full Stack Engineer", co:"Okta", loc:"Portland, United States · Remote",
   logo:"O", logoBg:"#000", logoColor:"#fff", status:"submitted", when:"Applied 1 hour ago"},
  {id:2, role:"DevOps Engineer", co:"ChargeBee", loc:"Houston, United States · Remote",
   logo:"C", logoBg:"#FF4D00", logoColor:"#fff", status:"processing", when:"Applied 1 hour ago"},
  {id:3, role:"Backend Engineer", co:"ShutterTech", loc:"Columbus, United States · Fulltime",
   logo:"S", logoBg:"#16213E", logoColor:"#fff", status:"processing", when:"Applied 1 hour ago"},
  {id:4, role:"Software Engineer", co:"Miro", loc:"Atlanta, United States, GA · Fulltime",
   logo:"M", logoBg:"#FFD02F", logoColor:"#000", status:"info_needed", when:"Sep 17"},
  {id:5, role:"Cloud Architect", co:"Compass Real Estate", loc:"Houston, United States · Fulltime",
   logo:null, logoBg:"#F1F5F9", logoColor:"#475569", status:"closed", when:"Closed Sep 16", closedReason:"Position filled"},
  {id:6, role:"Full Stack Developer", co:"Exness", loc:"Atlanta, United States, GA · Fulltime",
   logo:"ex", logoBg:"#F7C600", logoColor:"#000", status:"info_needed", when:"Sep 17"},
  {id:7, role:"Senior Product Designer", co:"Stripe", loc:"San Francisco, United States · Remote",
   logo:"S", logoBg:"#635BFF", logoColor:"#fff", status:"closed", when:"Expired Sep 14", closedReason:"Listing expired"},
];

/* ──── Top nav ──── */
function TopNav() {
  return (
    <div style={{
      height:67, background:"#fff", borderBottom:"1px solid #E6E5E1",
      display:"flex", alignItems:"center", padding:"0 34px", flexShrink:0
    }}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginRight:48}}>
        <div style={{
          width:38,height:38,borderRadius:"50%",background:PALETTE.brandDark,
          display:"flex",alignItems:"center",justifyContent:"center",position:"relative"
        }}>
          <div style={{position:"absolute",top:-4,left:6,width:8,height:8,borderRadius:"50%",background:PALETTE.cyan}} />
          <div style={{position:"absolute",top:-4,right:6,width:8,height:8,borderRadius:"50%",background:PALETTE.cyan}} />
          <div style={{width:14,height:7,borderRadius:"0 0 14px 14px",background:"#fff"}} />
        </div>
        <div style={{fontFamily:'"Filson Soft","Proxima Soft",sans-serif',fontWeight:700,fontSize:26,color:PALETTE.brandDark,letterSpacing:"-.02em"}}>bloom</div>
      </div>
      <div style={{display:"flex",gap:8,flex:1}}>
        {[
          {l:"Jobs",i:"briefcase"},
          {l:"Applications",i:"clipboard-text",active:true},
          {l:"Conversation",i:"message-circle"},
          {l:"Profile",i:"user"},
          {l:"Settings",i:"settings"},
        ].map((it,i)=>(
          <div key={i} style={{
            padding:"10px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,
            borderBottom:it.active?`2px solid ${PALETTE.brandDark}`:"none",
            marginBottom:it.active?-1:0
          }}>
            <i className={`ti ti-${it.i}`} style={{fontSize:22,color:it.active?PALETTE.brandDark:"#4A5464"}} />
            <div style={{fontSize:13,fontWeight:it.active?700:500,color:it.active?PALETTE.brandDark:"#4A5464",letterSpacing:"-.01em"}}>{it.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{
          padding:"6px 12px",borderRadius:24,background:"#fff",border:"1.5px solid #DDD",
          display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700,color:"#061D21"
        }}>
          <i className="ti ti-sparkles" style={{fontSize:14,color:PALETTE.orange}} />
          Get Hired Faster with Pro – Freshers Discount Available
          <div style={{padding:"3px 10px",borderRadius:99,background:"#fff",border:"1px solid #ddd",fontSize:11}}>Upgrade Now</div>
        </div>
        <div style={{
          padding:"6px 12px",borderRadius:20,background:"#FFEDE2",border:"1px solid #FFBA90",
          display:"flex",alignItems:"center",gap:6
        }}>
          <span style={{fontSize:14}}>🔥</span>
          <span style={{fontFamily:"Inter",fontSize:14,fontWeight:700,color:"#7D0F0F"}}>3</span>
        </div>
        <i className="ti ti-bell" style={{fontSize:20,color:"#222"}} />
        <div style={{width:34,height:34,borderRadius:"50%",background:"#D8E2EE",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <i className="ti ti-user" style={{fontSize:18,color:"#475569"}} />
        </div>
      </div>
    </div>
  );
}

/* ──── Stat tile ──── */
function StatTile({ icon, label, value, tone, active, withSubtle, onClick }) {
  const tones = {
    amber:   {bg:PALETTE.amber, border:PALETTE.amberBorder, text:PALETTE.brandDark, num:"#fff", numBg:"#fff", numColor:PALETTE.brandDark},
    blue:    {bg:"#E3F2FF", border:"#A8CFF2", text:PALETTE.brandDark},
    neutral: {bg:"#F1F2F4", border:"#D9DCE1", text:PALETTE.brandDark},
    green:   {bg:"#E6F8EF", border:"#A6D8BB", text:PALETTE.brandDark},
    slate:   {bg:"#F1F5F9", border:"#CBD5E1", text:"#334155"},
  };
  const t = tones[tone] || tones.neutral;
  return (
    <button onClick={onClick} style={{
      padding:"16px 20px",borderRadius:14,background:t.bg,border:`1.5px solid ${t.border}`,
      display:"flex",alignItems:"center",gap:16,textAlign:"left",cursor:onClick?"pointer":"default",
      boxShadow: active?"0 0 0 3px rgba(2,47,54,.12)":"none",flex:1,minWidth:0
    }}>
      <div style={{
        width:50,height:50,borderRadius:"50%",background:"#fff",
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
        fontFamily:"Inter",fontWeight:700,fontSize:24,color:t.text
      }}>
        {typeof value === "number" ? value : <i className={`ti ti-${icon}`} style={{fontSize:22,color:t.text}} />}
      </div>
      <div style={{minWidth:0}}>
        <div style={{fontSize:15,fontWeight:700,color:t.text,lineHeight:1.2,letterSpacing:"-.01em"}}>{label}</div>
        {withSubtle && <div style={{fontSize:12,color:"#334155",marginTop:4,opacity:.75}}>{withSubtle}</div>}
      </div>
    </button>
  );
}

/* ──── Status pill (right side of each row) ──── */
function StatusPill({ status }) {
  const s = {
    submitted:   {bg:"#E6F8EF", color:"#0F7D4F", icon:"clipboard-check", text:"Submitted"},
    processing:  {bg:"#FEF5C7", color:"#7A5500", icon:"clock", text:"Processing"},
    info_needed: {bg:"#FFEDE2", color:"#C2410C", icon:"alert-triangle", text:"Info Needed Sep 17"},
  }[status];
  if (!s) return null;
  return (
    <div style={{
      display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",
      borderRadius:6,background:s.bg,color:s.color,fontSize:13,fontWeight:600
    }}>
      <i className={`ti ti-${s.icon}`} style={{fontSize:15}} />
      {s.text}
    </div>
  );
}

/* ──── Closed-job pill variants ──── */
function ClosedPill({ variant, reason, when, onFindSimilar }) {
  // A: subtle slate, no CTA
  if (variant === "A") {
    return (
      <div style={{
        display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",
        borderRadius:6,background:PALETTE.slate100,color:PALETTE.slate700,
        border:`1px solid ${PALETTE.slate200}`,fontSize:13,fontWeight:600
      }}>
        <i className="ti ti-lock" style={{fontSize:14}} />
        No longer available
      </div>
    );
  }
  // B: action-oriented with Find similar
  if (variant === "B") {
    return (
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",
          borderRadius:6,background:PALETTE.slate100,color:PALETTE.slate700,
          border:`1px solid ${PALETTE.slate200}`,fontSize:13,fontWeight:600
        }}>
          <i className="ti ti-lock" style={{fontSize:14}} />
          {reason}
        </div>
        <button onClick={onFindSimilar} style={{
          padding:"7px 13px",borderRadius:8,
          background:PALETTE.brandDark,color:"#fff",fontSize:13,fontWeight:700,
          display:"inline-flex",alignItems:"center",gap:6
        }}>
          <i className="ti ti-sparkles" style={{fontSize:14}} />
          Find similar
        </button>
      </div>
    );
  }
  // C: closed badge with date for tab
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
      <div style={{
        display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",
        borderRadius:6,background:PALETTE.slate100,color:PALETTE.slate700,
        border:`1px solid ${PALETTE.slate200}`,fontSize:13,fontWeight:600
      }}>
        <i className="ti ti-lock" style={{fontSize:14}} />
        {when}
      </div>
    </div>
  );
}

/* ──── Job row ──── */
function JobRow({ job, variant, dim, showClosedAsBottomGroup }) {
  const isClosed = job.status === "closed";
  return (
    <div style={{
      background:"#fff",borderRadius:12,padding:"22px 26px",
      display:"flex",alignItems:"center",gap:16,
      opacity:dim?0.7:1,
      border: isClosed && variant==="B" ? `1px solid ${PALETTE.slate200}` : "1px solid transparent",
      background: isClosed && (variant==="A"||variant==="C") ? "#FAFBFC" : "#fff",
    }}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:18,fontWeight:700,color:PALETTE.brandDark,marginBottom:8,letterSpacing:"-.01em"}}>{job.role}</div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          {job.logo ? (
            <div style={{
              width:44,height:44,borderRadius:10,background:job.logoBg,color:job.logoColor,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontFamily:'"Filson Soft","Proxima Soft",sans-serif',fontWeight:700,fontSize:18,flexShrink:0
            }}>{job.logo}</div>
          ) : (
            <div style={{
              width:44,height:44,borderRadius:10,background:PALETTE.slate100,
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0
            }}>
              <i className="ti ti-building" style={{fontSize:22,color:PALETTE.slate500}} />
            </div>
          )}
          <div>
            <div style={{fontSize:15,fontWeight:700,color:PALETTE.brandDark}}>{job.co}</div>
            <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
              <i className="ti ti-map-pin" style={{fontSize:13,color:"#94A3B8"}} />
              <span style={{fontSize:13,color:"#64748B"}}>{job.loc}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        {isClosed ? (
          <ClosedPill variant={variant} reason={job.closedReason} when={job.when} />
        ) : (
          <>
            <StatusPill status={job.status} />
            {job.status !== "info_needed" && (
              <div style={{
                display:"inline-flex",alignItems:"center",gap:6,padding:"6px 12px",
                borderRadius:6,background:"#E0F4FE",color:PALETTE.brandDark,fontSize:13,fontWeight:600
              }}>
                <i className="ti ti-file-text" style={{fontSize:14}} />
                {job.when}
              </div>
            )}
            {job.status === "info_needed" && (
              <button style={{
                padding:"6px 14px",borderRadius:6,background:"#fff",border:"1px solid #CBD5E1",
                fontSize:13,fontWeight:700,color:PALETTE.brandDark,display:"inline-flex",alignItems:"center",gap:6
              }}>
                Fill Form <i className="ti ti-edit" style={{fontSize:14}} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ──── Filter bar ──── */
function FilterBar({ variant, statusFilter, setStatusFilter }) {
  const [open, setOpen] = useStateA(false);
  const opts = ["All", "Info Needed", "Processing", "Submitted", "Manual Apply"];
  if (variant !== "C") opts.push("Closed / Expired");

  return (
    <div style={{display:"flex",gap:12,alignItems:"center",position:"relative"}}>
      <div style={{
        flex:1,height:42,borderRadius:8,background:"#fff",border:"1px solid #E2E8F0",
        display:"flex",alignItems:"center",padding:"0 14px",gap:10,minWidth:280
      }}>
        <i className="ti ti-search" style={{fontSize:17,color:"#94A3B8"}} />
        <span style={{fontSize:14,color:"#94A3B8"}}>Search for Jobs or Companies</span>
      </div>
      <div style={{
        height:42,borderRadius:8,background:"#fff",border:"1px solid #E2E8F0",
        display:"flex",alignItems:"center",padding:"0 14px",gap:10,minWidth:230
      }}>
        <span style={{fontSize:14,color:"#94A3B8"}}>Applied from</span>
        <i className="ti ti-arrows-horizontal" style={{fontSize:14,color:"#94A3B8"}} />
        <span style={{fontSize:14,color:"#94A3B8"}}>Applied Until</span>
        <i className="ti ti-chevron-down" style={{fontSize:15,color:"#94A3B8",marginLeft:"auto"}} />
      </div>
      <div style={{
        height:42,borderRadius:8,background:"#fff",border:"1px solid #E2E8F0",
        display:"flex",alignItems:"center",padding:"0 14px",gap:10,minWidth:140
      }}>
        <span style={{fontSize:14,color:"#94A3B8"}}>Job Type</span>
        <i className="ti ti-chevron-down" style={{fontSize:15,color:"#94A3B8",marginLeft:"auto"}} />
      </div>
      <button onClick={()=>setOpen(!open)} style={{
        height:42,borderRadius:8,background:"#fff",
        border:`1.5px solid ${statusFilter==="Closed / Expired"?PALETTE.slate500:"#E2E8F0"}`,
        display:"flex",alignItems:"center",padding:"0 14px",gap:10,minWidth:170,position:"relative"
      }}>
        <span style={{fontSize:14,fontWeight:statusFilter!=="All"?700:400,color:statusFilter!=="All"?PALETTE.brandDark:"#94A3B8"}}>
          {statusFilter === "All" ? "Status" : statusFilter}
        </span>
        <i className="ti ti-chevron-down" style={{fontSize:15,color:"#94A3B8",marginLeft:"auto"}} />
      </button>
      {open && (
        <div style={{
          position:"absolute",right:46,top:46,minWidth:200,background:"#fff",
          borderRadius:10,boxShadow:"0 8px 28px rgba(0,0,0,.14)",border:"1px solid #E2E8F0",
          padding:6,zIndex:50
        }}>
          {opts.map(o=>{
            const isClosed = o.includes("Closed");
            return (
              <button key={o} onClick={()=>{setStatusFilter(o);setOpen(false);}} style={{
                width:"100%",padding:"10px 12px",borderRadius:6,textAlign:"left",
                background:statusFilter===o?"#E0F4FE":"transparent",
                display:"flex",alignItems:"center",gap:8,
                fontSize:14,fontWeight:isClosed?700:500,
                color:isClosed?PALETTE.slate900:PALETTE.brandDark
              }}>
                {isClosed && <i className="ti ti-lock" style={{fontSize:14,color:PALETTE.slate500}} />}
                {o}
                {isClosed && <span style={{
                  marginLeft:"auto",padding:"2px 7px",borderRadius:99,
                  background:PALETTE.slate200,color:PALETTE.slate700,fontSize:11,fontFamily:"Inter",fontWeight:700
                }}>2</span>}
              </button>
            );
          })}
        </div>
      )}
      <button style={{
        width:42,height:42,borderRadius:10,background:PALETTE.cyan,
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        <i className="ti ti-filter-x" style={{fontSize:18,color:PALETTE.brandDark}} />
      </button>
    </div>
  );
}

/* ──── B: Recovery banner ──── */
function RecoveryBanner() {
  return (
    <div style={{
      padding:"18px 24px",borderRadius:14,background:"#fff",
      border:`1.5px solid ${PALETTE.slate200}`,
      display:"flex",alignItems:"center",gap:18,
      boxShadow:"0 1px 2px rgba(15,23,42,.04)"
    }}>
      <div style={{
        width:46,height:46,borderRadius:12,
        background:`linear-gradient(135deg, ${PALETTE.slate100} 0%, ${PALETTE.blue50} 100%)`,
        border:`1px solid ${PALETTE.slate200}`,
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0
      }}>
        <i className="ti ti-lock" style={{fontSize:22,color:PALETTE.slate700}} />
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:15,fontWeight:700,color:PALETTE.brandDark,marginBottom:3,letterSpacing:"-.01em"}}>
          2 roles closed before you could apply
        </div>
        <div style={{fontSize:13,color:PALETTE.slate700}}>
          <strong>Compass Real Estate</strong> filled the position · <strong>Stripe</strong> listing expired.
          Bloom found <strong style={{color:PALETTE.brandDark}}>7 similar matches</strong> across both roles.
        </div>
      </div>
      <button style={{
        padding:"10px 18px",borderRadius:10,background:PALETTE.brandDark,color:"#fff",
        fontSize:14,fontWeight:700,display:"inline-flex",alignItems:"center",gap:6,whiteSpace:"nowrap"
      }}>
        <i className="ti ti-sparkles" style={{fontSize:16,color:PALETTE.cyan}} />
        See similar matches
      </button>
      <button style={{
        padding:"10px 14px",borderRadius:10,background:"transparent",
        fontSize:14,fontWeight:600,color:PALETTE.slate700,
        display:"inline-flex",alignItems:"center",gap:6
      }}>
        Archive all
      </button>
      <button style={{padding:6,color:PALETTE.slate500}}>
        <i className="ti ti-x" style={{fontSize:18}} />
      </button>
    </div>
  );
}

/* ──── Hero dashboard (cyan banner) ──── */
function Dashboard({ variant }) {
  const [active] = useStateA("attention");
  return (
    <div style={{
      background: variant==="C" ? "linear-gradient(180deg, #4FC4D2 0%, #5AD0DE 100%)" : "linear-gradient(180deg, #4FC4D2 0%, #5AD0DE 100%)",
      padding:"30px 38px 40px"
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h1 style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',fontSize:26,fontWeight:700,
          color:"#fff",letterSpacing:"-.02em"
        }}>Overall Application Progress</h1>
      </div>
      <div style={{background:"#fff",borderRadius:18,padding:"26px 30px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:11}}>
            <div style={{
              width:38,height:38,borderRadius:10,background:"#FFEDE2",
              display:"flex",alignItems:"center",justifyContent:"center"
            }}>
              <span style={{fontSize:20}}>🔥</span>
            </div>
            <div style={{fontFamily:'"Filson Soft","Proxima Soft",sans-serif',fontSize:24,fontWeight:700,color:PALETTE.brandDark,letterSpacing:"-.02em"}}>3 Day Streak</div>
          </div>
          <button style={{
            padding:"12px 22px",borderRadius:10,background:PALETTE.brandDark,color:"#fff",
            fontSize:15,fontWeight:700
          }}>View Job Matches</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns: variant==="A" ? "1.3fr 1fr 1fr 1fr 1fr" : "1.3fr 1fr 1fr 1fr",gap:14}}>
          <StatTile tone="amber" value={3} label="Applications Need Your Attention" active={active==="attention"} />
          <StatTile tone="blue" icon="edit" value={1} label="Manual Apply Required" />
          <StatTile tone="neutral" icon="hourglass" value={2} label="Processing" />
          <StatTile tone="green" icon="clipboard-check" value={1} label="Submitted" />
          {variant === "A" && (
            <StatTile tone="slate" icon="lock" value={2} label="No Longer Available" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ──── Tab bar (Active/Archive/Saved or +Closed) ──── */
function TabBar({ variant, tab, setTab }) {
  const tabs = [
    {id:"active", label:"Active"},
    {id:"archive", label:"Archive"},
    {id:"saved", label:"Saved"},
  ];
  if (variant === "C") tabs.splice(1, 0, {id:"closed", label:"Closed", count:2});

  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:38,paddingBottom:0,borderBottom:"1px solid #E2E8F0"}}>
      <div style={{fontSize:24,fontWeight:700,color:PALETTE.brandDark,marginRight:10,letterSpacing:"-.01em",paddingBottom:10}}>
        {variant==="C" && tab==="closed" ? "2 Closed Jobs" : "14 Total Jobs"}
      </div>
      {tabs.map(t=>{
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            paddingBottom:10,
            borderBottom:active?`3px solid ${PALETTE.brandDark}`:"3px solid transparent",
            marginBottom:-1,
            fontSize:16,fontWeight:active?700:500,
            color:active?PALETTE.brandDark:"#64748B",
            display:"inline-flex",alignItems:"center",gap:8
          }}>
            {t.label}
            {t.count != null && (
              <span style={{
                padding:"2px 9px",borderRadius:99,
                background:active?PALETTE.brandDark:PALETTE.slate200,
                color:active?"#fff":PALETTE.slate700,
                fontSize:12,fontFamily:"Inter",fontWeight:700
              }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ──── B-only: bottom group divider for closed jobs ──── */
function ClosedGroupDivider() {
  return (
    <div style={{
      display:"flex",alignItems:"center",gap:14,padding:"4px 4px",marginTop:8
    }}>
      <div style={{flex:1,height:1,background:PALETTE.slate200}} />
      <div style={{
        display:"inline-flex",alignItems:"center",gap:7,padding:"5px 12px",borderRadius:99,
        background:PALETTE.slate100,border:`1px solid ${PALETTE.slate200}`,
        fontSize:12,fontWeight:700,color:PALETTE.slate700,letterSpacing:"-.01em"
      }}>
        <i className="ti ti-lock" style={{fontSize:13}} />
        No longer available · 2
      </div>
      <div style={{flex:1,height:1,background:PALETTE.slate200}} />
    </div>
  );
}

/* ──── C-only: bulk-action bar inside Closed tab ──── */
function ClosedTabBulkBar() {
  return (
    <div style={{
      padding:"16px 22px",borderRadius:12,background:PALETTE.slate50,
      border:`1px solid ${PALETTE.slate200}`,
      display:"flex",alignItems:"center",gap:16
    }}>
      <div style={{
        width:38,height:38,borderRadius:10,background:"#fff",border:`1px solid ${PALETTE.slate200}`,
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        <i className="ti ti-info-circle" style={{fontSize:18,color:PALETTE.slate700}} />
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:14,fontWeight:700,color:PALETTE.brandDark,marginBottom:2}}>
          These roles closed before Bloom could submit
        </div>
        <div style={{fontSize:13,color:PALETTE.slate700}}>
          Find similar matches to keep momentum, or archive to clear your queue.
        </div>
      </div>
      <button style={{
        padding:"9px 16px",borderRadius:8,background:PALETTE.brandDark,color:"#fff",
        fontSize:13,fontWeight:700,display:"inline-flex",alignItems:"center",gap:6
      }}>
        <i className="ti ti-sparkles" style={{fontSize:15,color:PALETTE.cyan}} />
        Find similar for all
      </button>
      <button style={{
        padding:"9px 14px",borderRadius:8,background:"#fff",border:`1px solid ${PALETTE.slate300}`,
        fontSize:13,fontWeight:700,color:PALETTE.slate700,display:"inline-flex",alignItems:"center",gap:6
      }}>
        <i className="ti ti-archive" style={{fontSize:15}} />
        Archive all
      </button>
    </div>
  );
}

/* ──── Variant callout (top-right annotation) ──── */
function VariantCallout({ variant }) {
  const data = {
    A: {
      title: "Treatment A — Inline & Subtle",
      tag: "LOWEST FRICTION",
      tagBg: "#E2E8F0", tagColor: "#334155",
      pts: [
        "New <b>5th stat tile</b> · slate-gray to read as informational, not actionable",
        "<b>Closed/Expired</b> added to Status filter dropdown",
        "Per-card pill: <b>“No longer available”</b> · neutral slate so it visually recedes",
        "Closed jobs sorted to bottom with a subtle group divider",
      ],
      tradeoff: "Pro: zero new chrome. Con: easy to miss; user keeps stumbling on dead listings.",
    },
    B: {
      title: "Treatment B — Recovery Banner",
      tag: "RECOMMENDED",
      tagBg: PALETTE.brandDark, tagColor: PALETTE.cyan,
      pts: [
        "Dedicated banner above the list: <b>turns dead-ends into momentum recovery</b>",
        "Banner is dismissible — appears only when closed jobs exist",
        "Per-card pill includes inline <b>“Find similar”</b> CTA",
        "Same filter addition + soft group divider",
      ],
      tradeoff: "Pro: high recovery rate, friendly tone. Con: more chrome until dismissed.",
    },
    C: {
      title: "Treatment C — Dedicated Tab",
      tag: "CLEANEST ACTIVE LIST",
      tagBg: "#022F36", tagColor: "#5AEBEB",
      pts: [
        "New tab <b>Closed</b> · sits next to Active/Archive/Saved with a count badge",
        "Active list stays purely actionable — no dead-end cards mixed in",
        "Inside Closed tab: <b>bulk actions</b> (Find similar for all, Archive all)",
        "Trade-off: another tab to learn; users may not discover it",
      ],
      tradeoff: "Pro: cleanest separation. Con: out of sight, out of mind.",
    },
  }[variant];

  return (
    <div data-callout="variant" style={{
      position:"absolute",top:18,right:24,zIndex:30,
      width:330,padding:"18px 20px",borderRadius:14,
      background:"#fff",border:"1.5px solid #E6E5E1",
      boxShadow:"0 6px 24px rgba(2,47,54,.10)"
    }}>
      <div style={{
        display:"inline-block",padding:"3px 9px",borderRadius:5,
        background:data.tagBg,color:data.tagColor,fontSize:10,fontWeight:700,letterSpacing:".08em",
        marginBottom:10
      }}>{data.tag}</div>
      <div style={{fontSize:15,fontWeight:700,color:PALETTE.brandDark,marginBottom:10,letterSpacing:"-.01em"}}>{data.title}</div>
      <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:5,marginBottom:11}}>
        {data.pts.map((p,i)=>(
          <li key={i} style={{fontSize:12.5,color:"#334155",lineHeight:1.45,display:"flex",gap:7}}>
            <span style={{color:PALETTE.green,fontWeight:700,flexShrink:0}}>•</span>
            <span dangerouslySetInnerHTML={{__html:p}} />
          </li>
        ))}
      </ul>
      <div style={{fontSize:11.5,color:"#64748B",lineHeight:1.5,padding:"8px 10px",background:"#F8FAFC",borderRadius:7,borderLeft:`3px solid ${PALETTE.slate300}`}}>
        {data.tradeoff}
      </div>
    </div>
  );
}

/* ──── Page composer ──── */
function ApplicationsPage({ variant, tab: initialTab = "active" }) {
  const [tab, setTab] = useStateA(initialTab);
  const [statusFilter, setStatusFilter] = useStateA("All");

  // sort: closed to bottom for A/B, hidden in active for C
  const visible = (() => {
    if (variant === "C") {
      if (tab === "closed") return JOBS.filter(j => j.status === "closed");
      return JOBS.filter(j => j.status !== "closed");
    }
    const openJobs = JOBS.filter(j => j.status !== "closed");
    const closedJobs = JOBS.filter(j => j.status === "closed");
    return [...openJobs, ...closedJobs];
  })();

  const closedIdx = visible.findIndex(j => j.status === "closed");

  return (
    <div style={{background:PALETTE.bgPage,height:"100%",overflow:"hidden",position:"relative",display:"flex",flexDirection:"column"}}>
      <TopNav />
      <VariantCallout variant={variant} />
      {variant !== "C" || tab !== "closed" ? <Dashboard variant={variant} /> : null}

      <div style={{padding:"24px 38px 30px",flex:1,overflow:"auto"}}>
        <TabBar variant={variant} tab={tab} setTab={setTab} />

        {/* B's recovery banner */}
        {variant === "B" && tab === "active" && (
          <div style={{marginTop:18}}>
            <RecoveryBanner />
          </div>
        )}

        {/* C's bulk bar inside Closed tab */}
        {variant === "C" && tab === "closed" && (
          <div style={{marginTop:18}}>
            <ClosedTabBulkBar />
          </div>
        )}

        <div style={{marginTop:18}}>
          <FilterBar variant={variant} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        </div>

        <div style={{marginTop:18,display:"flex",flexDirection:"column",gap:14}}>
          {visible.map((j, i) => (
            <React.Fragment key={j.id}>
              {/* Divider before first closed job for A and B */}
              {(variant === "A" || variant === "B") && i === closedIdx && closedIdx > 0 && <ClosedGroupDivider />}
              <JobRow
                job={j}
                variant={variant}
                dim={variant === "A" && j.status === "closed"}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

window.ApplicationsPage = ApplicationsPage;
