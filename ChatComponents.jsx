// Bloom Workflow — Chat UI Components
// Exported to window: C, AgentBubble, UserBubble, TypingIndicator, ActionChips,
// InlineJobCard, ActivityItem, ResumeUpload, ProfilePanelInline,
// PrefChips, StatsGrid, ModeBadge, WarningCard, ContextCard,
// AppTrackerPanel, JOBS

const C = {
  brandDark:"#022F36", brandMid:"#1D484F",
  cyan:"#5AEBEB", orange:"#F76638", green:"#00B16B",
  bgPage:"#FAFAFA", bgCard:"#FEFEFE",
  border:"#E5E7EB", text1:"#022F36", text2:"#23262E",
  text3:"#4A5464", muted:"#A5A5A5", navActive:"#F0FCFF",
};

const JOBS = [
  { id:1, title:"Software Engineer", company:"Miro", location:"Remote", salary:"$140k–$180k", tags:["React","TypeScript","Node.js"], logo:"M", logoColor:"#000", logoBg:"#FFD02F", match:95 },
  { id:2, title:"Frontend Engineer", company:"Notion", location:"San Francisco", salary:"$130k–$160k", tags:["React","CSS","JS"], logo:"N", logoColor:"#fff", logoBg:"#000", match:88 },
  { id:3, title:"Full Stack Dev", company:"Linear", location:"Remote", salary:"$120k–$150k", tags:["Next.js","GraphQL"], logo:"L", logoColor:"#fff", logoBg:"#5E6AD2", match:82 },
  { id:4, title:"Senior SWE", company:"Figma", location:"New York", salary:"$150k–$190k", tags:["C++","WebGL"], logo:"F", logoColor:"#fff", logoBg:"#1ABCFE", match:79 },
];

/* ─── Agent bubble ─── */
function AgentBubble({ children, noAvatar }) {
  return (
    <div style={{display:"flex",gap:10,alignItems:"flex-start",maxWidth:580,marginBottom:10}}>
      {!noAvatar
        ? <img src="assets/favicon.png" style={{width:28,height:28,borderRadius:"50%",flexShrink:0,marginTop:2,border:"2px solid #D8F8F8"}} alt="" />
        : <div style={{width:28,flexShrink:0}} />}
      <div style={{
        background:"#F2F5F8",borderRadius:"4px 16px 16px 16px",
        padding:"12px 16px",fontSize:14,lineHeight:1.65,
        color:C.text2,fontWeight:500,
        boxShadow:"0 1px 4px rgba(0,0,0,0.05)",
        minWidth:0,flex:1,
      }}>{children}</div>
    </div>
  );
}

/* ─── User bubble ─── */
function UserBubble({ text }) {
  return (
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}>
      <div style={{
        background:C.brandMid,color:"#fff",
        borderRadius:"16px 4px 16px 16px",
        padding:"11px 16px",fontSize:14,
        lineHeight:1.5,fontWeight:500,maxWidth:400,
      }}>{text}</div>
    </div>
  );
}

/* ─── Typing indicator ─── */
function TypingIndicator() {
  return (
    <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
      <img src="assets/favicon.png" style={{width:28,height:28,borderRadius:"50%",flexShrink:0,border:"2px solid #D8F8F8"}} alt="" />
      <div style={{background:"#F2F5F8",borderRadius:"4px 16px 16px 16px",padding:"14px 18px",display:"flex",gap:5,alignItems:"center"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{
            width:7,height:7,borderRadius:"50%",background:"#BCC4CE",
            animation:`bloom-bounce 1.3s ease ${i*0.18}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Action chips ─── */
function ActionChips({ chips, onChip, disabled }) {
  const [hov, setHov] = React.useState(null);
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:8,paddingLeft:38,paddingTop:6,paddingBottom:4}}>
      {chips.map((chip,i) => (
        <button key={i}
          onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
          onClick={()=>!disabled&&onChip(chip)}
          style={{
            background: chip.primary
              ? (hov===i?"#022F36":C.brandMid)
              : (hov===i?"#F5F7FA":"#fff"),
            color: chip.primary?"#fff":C.text2,
            border:`1.5px solid ${chip.primary?C.brandMid:C.border}`,
            borderRadius:9999,padding:"8px 18px",
            fontSize:13,fontWeight:600,cursor:disabled?"default":"pointer",
            fontFamily:"Proxima Soft,sans-serif",
            transition:"background 0.15s",
            opacity:disabled?0.5:1,
          }}>{chip.label}</button>
      ))}
    </div>
  );
}

/* ─── Inline job card ─── */
function InlineJobCard({ job, mode }) {
  const [applied, setApplied] = React.useState(false);
  const mc = job.match>=90?C.green:job.match>=80?C.brandMid:C.text3;
  return (
    <div style={{background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:12,
      padding:"13px 15px",marginBottom:8,boxShadow:"0 2px 6px rgba(0,0,0,0.05)",maxWidth:380}}>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <div style={{width:34,height:34,borderRadius:8,background:job.logoBg,display:"flex",
          alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,
          color:job.logoColor,flexShrink:0}}>{job.logo}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text1}}>{job.title}</div>
          <div style={{fontSize:11,color:C.text3,marginTop:1}}>{job.company} · {job.location}</div>
        </div>
        <span style={{background:mc+"18",color:mc,borderRadius:9999,padding:"3px 9px",fontSize:11,fontWeight:700}}>{job.match}%</span>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:9}}>
        {job.tags.map(t=>(
          <span key={t} style={{background:"#F5F6F7",border:`1px solid ${C.border}`,
            borderRadius:5,padding:"3px 8px",fontSize:11,fontWeight:600,color:"#354252"}}>{t}</span>
        ))}
        <span style={{background:"#F5F6F7",borderRadius:5,padding:"3px 8px",
          fontSize:11,fontWeight:600,color:C.text3}}>{job.salary}</span>
      </div>
      {mode==="copilot" && (
        <div style={{display:"flex",gap:6,marginTop:10}}>
          {!applied ? (
            <>
              <button onClick={()=>setApplied(true)} style={{flex:1,background:C.brandMid,color:"#fff",border:"none",
                borderRadius:9999,padding:"7px 0",fontSize:12,fontWeight:700,cursor:"pointer",
                fontFamily:"Proxima Soft,sans-serif"}}>Apply Now</button>
              <button style={{padding:"7px 14px",background:"transparent",border:`1.5px solid ${C.border}`,
                borderRadius:9999,fontSize:12,fontWeight:600,color:C.text3,cursor:"pointer",
                fontFamily:"Proxima Soft,sans-serif"}}>Skip</button>
            </>
          ) : (
            <div style={{flex:1,background:"#E6F9F1",borderRadius:9999,padding:"7px 12px",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <i className="lucide lucide-check-circle" style={{fontSize:13,color:C.green}} />
              <span style={{fontSize:12,fontWeight:700,color:C.green}}>Applied — tracking this role</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Autopilot activity item ─── */
function ActivityItem({ icon, text, status, time }) {
  const col = {done:C.green,pending:C.orange,queued:C.muted,error:"#E53E3E"}[status]||C.muted;
  return (
    <div style={{display:"flex",gap:9,alignItems:"center",padding:"8px 10px",
      background:"#F9FAFB",borderRadius:8,marginBottom:5}}>
      <div style={{width:24,height:24,borderRadius:"50%",background:col+"22",
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <i className={`lucide lucide-${icon}`} style={{fontSize:11,color:col}} />
      </div>
      <span style={{flex:1,fontSize:12,color:C.text2,lineHeight:1.4}}>{text}</span>
      <span style={{background:col+"22",color:col,borderRadius:9999,
        padding:"2px 8px",fontSize:10,fontWeight:700,textTransform:"capitalize",flexShrink:0}}>{status}</span>
    </div>
  );
}

/* ─── Resume upload widget ─── */
function ResumeUpload() {
  const [state, setState] = React.useState("idle"); // idle | uploading | done
  const handleClick = () => {
    setState("uploading");
    setTimeout(() => setState("done"), 1400);
  };
  if (state==="done") return (
    <div style={{background:"#E6F9F1",borderRadius:12,padding:"12px 16px",
      display:"flex",alignItems:"center",gap:10,maxWidth:340}}>
      <i className="lucide lucide-check-circle-2" style={{fontSize:16,color:C.green,flexShrink:0}} />
      <div>
        <div style={{fontSize:13,fontWeight:700,color:C.green}}>resume_alex_chen.pdf uploaded</div>
        <div style={{fontSize:11,color:C.text3,marginTop:1}}>Extracted 8 yrs exp · React · TypeScript · Node.js</div>
      </div>
    </div>
  );
  if (state==="uploading") return (
    <div style={{background:"#F0FCFF",borderRadius:12,padding:"12px 16px",
      display:"flex",alignItems:"center",gap:10,maxWidth:340,border:`1px solid ${C.cyan}44`}}>
      <i className="lucide lucide-loader" style={{fontSize:16,color:C.brandMid,flexShrink:0}} />
      <div style={{fontSize:13,fontWeight:600,color:C.brandMid}}>Analyzing resume...</div>
    </div>
  );
  return (
    <div onClick={handleClick} style={{border:"2px dashed #CBD5E1",borderRadius:12,
      padding:"18px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,
      background:"#F8FAFC",maxWidth:340,transition:"border-color 0.2s"}}>
      <div style={{width:36,height:36,borderRadius:8,background:C.cyan+"28",
        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <i className="lucide lucide-upload" style={{fontSize:16,color:C.brandMid}} />
      </div>
      <div>
        <div style={{fontSize:13,fontWeight:700,color:C.text1}}>Upload resume</div>
        <div style={{fontSize:11,color:C.text3,marginTop:2}}>PDF or DOCX · I'll extract everything</div>
      </div>
    </div>
  );
}

/* ─── Profile progress (inline in chat) ─── */
function ProfilePanelInline({ pct, fields }) {
  return (
    <div style={{maxWidth:320}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{flex:1,height:5,background:C.border,borderRadius:9999,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,height:"100%",background:C.cyan,borderRadius:9999,transition:"width 0.8s"}} />
        </div>
        <span style={{fontSize:12,fontWeight:700,color:C.brandMid,flexShrink:0}}>{pct}% complete</span>
      </div>
      {fields.map(f=>(
        <div key={f.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <i className={`lucide lucide-${f.done?"check-circle":"circle"}`}
            style={{fontSize:13,color:f.done?C.green:"#D1D5DB",flexShrink:0}} />
          <span style={{fontSize:12,color:f.done?C.text2:"#9CA3AF",fontWeight:f.done?600:400}}>{f.label}</span>
          {f.extracted && (
            <span style={{marginLeft:"auto",fontSize:9,color:"#fff",fontWeight:700,
              background:C.brandMid,borderRadius:9999,padding:"1px 7px"}}>AI</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Pref chips (inline in chat) ─── */
function PrefChips({ prefs }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
      {prefs.map(p=>(
        <span key={p} style={{background:"#EEF9F9",border:`1px solid ${C.cyan}66`,
          color:C.brandMid,borderRadius:9999,padding:"5px 13px",fontSize:12,fontWeight:600}}>{p}</span>
      ))}
    </div>
  );
}

/* ─── Stats grid (inline in chat) ─── */
function StatsGrid({ stats }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxWidth:260}}>
      {stats.map(s=>(
        <div key={s.label} style={{background:"#fff",border:`1px solid ${C.border}`,
          borderRadius:10,padding:"12px 14px",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <div style={{fontSize:24,fontWeight:700,color:C.brandMid,lineHeight:1,fontFamily:"Inter,sans-serif"}}>{s.value}</div>
          <div style={{fontSize:11,color:C.text3,marginTop:3}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Mode badge ─── */
function ModeBadge({ mode }) {
  const cop = mode==="copilot";
  return (
    <div style={{display:"flex",justifyContent:"center",margin:"4px 0 10px"}}>
      <div style={{background:cop?"#E0EFFF":"#FFF3E0",color:cop?C.brandMid:"#B45309",
        borderRadius:9999,padding:"6px 18px",fontSize:12,fontWeight:700,
        display:"flex",alignItems:"center",gap:6}}>
        <i className={`lucide lucide-${cop?"hand-metal":"zap"}`} style={{fontSize:12}} />
        {cop?"Copilot mode — you approve every action":"Autopilot mode — I'll apply on your behalf"}
      </div>
    </div>
  );
}

/* ─── Warning / tip card ─── */
function WarningCard({ text, options, onOption }) {
  return (
    <div style={{background:"#FFFBEB",border:"1.5px solid #FCD34D",borderRadius:12,
      padding:"13px 15px",maxWidth:360,marginBottom:4}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-start",
        marginBottom:options?.length?10:0}}>
        <i className="lucide lucide-lightbulb" style={{fontSize:13,color:"#D97706",marginTop:1,flexShrink:0}} />
        <span style={{fontSize:13,fontWeight:500,color:"#78350F",lineHeight:1.5}}>{text}</span>
      </div>
      {options && (
        <div style={{display:"flex",gap:6}}>
          {options.map((o,i)=>(
            <button key={i} onClick={()=>onOption&&onOption(o)} style={{
              background:i===0?"#D97706":"transparent",
              color:i===0?"#fff":"#D97706",
              border:"1.5px solid #D97706",borderRadius:9999,
              padding:"5px 14px",fontSize:12,fontWeight:600,
              cursor:"pointer",fontFamily:"Proxima Soft,sans-serif",
            }}>{o}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Context card wrapper ─── */
function ContextCard({ title, icon, children, accent }) {
  return (
    <div style={{background:"#fff",border:`1px solid ${accent||C.border}`,borderRadius:12,
      padding:"14px 15px",boxShadow:"0 2px 4px rgba(0,0,0,0.04)",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:11}}>
        <i className={`lucide lucide-${icon}`} style={{fontSize:13,color:C.brandMid}} />
        <span style={{fontSize:12,fontWeight:700,color:C.text1}}>{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ─── App tracker panel ─── */
function AppTrackerPanel({ apps }) {
  const badge = {Applied:"#E0EFFF",Viewed:"#FFF3E0",Interview:"#E6F9F1",Rejected:"#FFE8E8",Queued:"#F5F5F5"};
  const badgeTxt = {Applied:C.brandMid,Viewed:"#B45309",Interview:C.green,Rejected:"#C53030",Queued:C.muted};
  return (
    <ContextCard title="Applications" icon="check-square">
      {apps.map((a,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",
          borderBottom:i<apps.length-1?`1px solid ${C.border}`:"none"}}>
          <div style={{width:26,height:26,borderRadius:6,background:a.logoBg,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:11,fontWeight:700,color:a.logoColor,flexShrink:0}}>{a.logo}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:600,color:C.text2}}>{a.company}</div>
            <div style={{fontSize:10,color:C.text3}}>{a.date}</div>
          </div>
          <span style={{background:badge[a.status],color:badgeTxt[a.status],
            borderRadius:9999,padding:"2px 8px",fontSize:10,fontWeight:700}}>{a.status}</span>
        </div>
      ))}
    </ContextCard>
  );
}

Object.assign(window, {
  C, JOBS,
  AgentBubble, UserBubble, TypingIndicator, ActionChips,
  InlineJobCard, ActivityItem, ResumeUpload, ProfilePanelInline,
  PrefChips, StatsGrid, ModeBadge, WarningCard,
  ContextCard, AppTrackerPanel,
});
