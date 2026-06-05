/* bv2/shared.jsx — shared palette, mascot helper, top nav, and status badges for Bloom V2 */

window.BV2 = (() => {
  const C = {
    brandDark:"#022F36", brandMid:"#1D484F", brandDeep:"#01161A",
    cyan:"#5AEBEB", cyanSoft:"#9FE2EA", cyanGhost:"rgba(90,235,235,.15)",
    ink:"#022F36", inkSoft:"#4A5464", inkFaint:"#7B8794", inkMute:"#94A3B8",
    bg:"#F0F3F7", paper:"#FFFFFF", line:"#E6E5E1", lineSoft:"#EFF1F4",
    amber:"#F6B100", amberSoft:"#FFE3A6", amberBg:"#FEF5C7",
    orange:"#F76638", green:"#00B16B", greenSoft:"#C8F0D8",
    blue50:"#EFF6FF", blue700:"#1D4ED8",
    rose50:"#FFF1F2", rose700:"#BE123C",
    slate50:"#F8FAFC", slate100:"#F1F5F9", slate200:"#E2E8F0",
    slate500:"#64748B", slate700:"#334155",
  };

  /* Mascot — uses the existing bobbing GIF, with optional state badge overlay */
  function Mascot({ size = 56, state = "default", className = "" }) {
    // states: default | working | thinking | asking | celebrate | sleeping | paused
    const badges = {
      working:   { ico:"loader-2", bg: C.cyan,  fg: C.brandDark, spin:true },
      thinking:  { ico:"bulb",     bg: C.amber, fg:"#fff" },
      asking:    { ico:"help",     bg:"#FFB300",fg:"#fff" },
      celebrate: { ico:"sparkles", bg: C.green, fg:"#fff" },
      sleeping:  { ico:"zzz",      bg: C.slate500, fg:"#fff" },
      paused:    { ico:"player-pause-filled", bg: C.slate500, fg:"#fff" },
    };
    const b = badges[state];
    return (
      <div className={className} style={{
        position:"relative", width:size, height:size, flexShrink:0,
        display:"inline-flex", alignItems:"center", justifyContent:"center",
      }}>
        <img src="assets/mushroom-loader.gif" alt=""
          style={{ width:"100%", height:"100%", objectFit:"contain" }} />
        {b && (
          <div style={{
            position:"absolute", right:-2, bottom:-2,
            width: size*0.4, height: size*0.4, minWidth:18, minHeight:18,
            borderRadius:"50%", background:b.bg, color:b.fg,
            display:"flex", alignItems:"center", justifyContent:"center",
            border:"2px solid #fff",
            boxShadow:"0 2px 6px rgba(2,47,54,.18)",
          }}>
            <i className={`ti ti-${b.ico}`}
              style={{
                fontSize: Math.max(11, size*0.22),
                animation: b.spin ? "bv2spin 1.2s linear infinite" : undefined,
              }} />
          </div>
        )}
      </div>
    );
  }

  /* Compact top nav — same pattern as Applications page but trimmed for the canvas frame */
  function TopNav({ active = "Dashboard", showAgentPill = true, agentState = "working" }) {
    const items = ["Dashboard","Jobs","Applications","Saved Answers","Settings"];
    return (
      <div style={{
        height:60, background:"#fff", borderBottom:`1px solid ${C.line}`,
        display:"flex", alignItems:"center", padding:"0 24px", gap:24, flexShrink:0,
      }}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{
            width:32, height:32, borderRadius:"50%", background:C.brandDark, position:"relative",
            display:"flex", alignItems:"flex-end", justifyContent:"center", paddingBottom:5,
          }}>
            <div style={{position:"absolute", top:-3, left:5, width:6, height:6, borderRadius:"50%", background:C.cyan}} />
            <div style={{position:"absolute", top:-3, right:5, width:6, height:6, borderRadius:"50%", background:C.cyan}} />
            <div style={{width:11, height:6, borderRadius:"0 0 11px 11px", background:"#fff"}} />
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontWeight:700, fontSize:20, color:C.brandDark, letterSpacing:"-.02em",
          }}>bloom</div>
        </div>
        <div style={{display:"flex", gap:4, flex:1}}>
          {items.map(label => {
            const isActive = label === active;
            return (
              <div key={label} style={{
                padding:"8px 14px", borderRadius:8,
                fontSize:13, fontWeight: isActive ? 700 : 500,
                color: isActive ? C.brandDark : C.inkSoft,
                background: isActive ? C.lineSoft : "transparent",
              }}>{label}</div>
            );
          })}
        </div>
        {showAgentPill && <AgentPill state={agentState} />}
        <i className="ti ti-bell" style={{fontSize:18, color:C.brandDark}} />
        <div style={{
          width:30, height:30, borderRadius:"50%", background:"#D8E2EE",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <i className="ti ti-user" style={{fontSize:15, color:"#475569"}} />
        </div>
      </div>
    );
  }

  /* Persistent "agent on/off" status pill in the nav — 1-click pause for trust */
  function AgentPill({ state = "working" }) {
    const cfg = {
      working: { dot:C.green, text:"Bloom is working", action:"Pause" },
      paused:  { dot:C.slate500, text:"Bloom is paused", action:"Resume" },
      asking:  { dot:C.amber, text:"Bloom needs you", action:"Open" },
    }[state];
    return (
      <div style={{
        display:"flex", alignItems:"center", gap:10,
        padding:"6px 6px 6px 12px", borderRadius:99,
        background:"#fff", border:`1px solid ${C.line}`,
      }}>
        <span style={{
          width:7, height:7, borderRadius:"50%", background: cfg.dot,
          boxShadow: state === "working" ? `0 0 0 0 ${cfg.dot}` : "none",
          animation: state === "working" ? "bv2pulse 1.6s ease-out infinite" : undefined,
        }} />
        <span style={{ fontSize:12.5, fontWeight:600, color:C.brandDark }}>{cfg.text}</span>
        <button style={{
          padding:"3px 10px", borderRadius:99,
          background: state === "asking" ? C.brandDark : C.slate100,
          color: state === "asking" ? "#fff" : C.brandDark,
          fontSize:11.5, fontWeight:700,
        }}>{cfg.action}</button>
      </div>
    );
  }

  /* Status badges — extended set for V2 */
  function StatusBadge({ status, size = "md" }) {
    const map = {
      auto_applied:    { bg:C.greenSoft,  color:"#0F7D4F", ico:"sparkles",     text:"Auto-applied" },
      submitted:       { bg:"#E6F8EF",    color:"#0F7D4F", ico:"clipboard-check", text:"Submitted" },
      applying:        { bg:"#E0F4FE",    color:C.brandDark, ico:"player-play-filled", text:"Applying now" },
      confirm:         { bg:"#FFEDE2",    color:"#C2410C", ico:"alert-circle", text:"Confirm assumption" },
      needs_answer:    { bg:C.amberBg,    color:"#7A5500", ico:"message-question", text:"Needs your answer" },
      interview:       { bg:"#EFE4FE",    color:"#6B21A8", ico:"calendar-event", text:"Interview" },
      rejected:        { bg:C.rose50,     color:C.rose700, ico:"x",             text:"Not a fit" },
      processing:      { bg:"#FEF5C7",    color:"#7A5500", ico:"clock",         text:"Processing" },
      paused:          { bg:C.slate100,   color:C.slate700, ico:"player-pause-filled", text:"Paused" },
    };
    const s = map[status];
    if (!s) return null;
    const pad = size === "sm" ? "3px 8px" : "5px 11px";
    const fs  = size === "sm" ? 11.5 : 12.5;
    return (
      <span style={{
        display:"inline-flex", alignItems:"center", gap:6, padding:pad,
        borderRadius:6, background:s.bg, color:s.color, fontSize:fs, fontWeight:600,
        whiteSpace:"nowrap",
      }}>
        <i className={`ti ti-${s.ico}`} style={{fontSize:13}} />
        {s.text}
      </span>
    );
  }

  /* Standard buttons */
  function PrimaryBtn({ children, icon, onClick, full, size="md" }) {
    return (
      <button onClick={onClick} style={{
        padding: size==="lg" ? "14px 22px" : "10px 16px",
        borderRadius: 10, background: C.brandDark, color:"#fff",
        fontSize: size==="lg" ? 15 : 13.5, fontWeight: 700,
        display:"inline-flex", alignItems:"center", gap:7, justifyContent:"center",
        width: full ? "100%" : "auto",
      }}>
        {icon && <i className={`ti ti-${icon}`} style={{fontSize:16}} />}
        {children}
      </button>
    );
  }
  function GhostBtn({ children, icon, full, size="md" }) {
    return (
      <button style={{
        padding: size==="lg" ? "13px 22px" : "9px 16px",
        borderRadius: 10, background:"#fff", color:C.brandDark,
        border:`1.5px solid ${C.line}`,
        fontSize: size==="lg" ? 15 : 13.5, fontWeight: 600,
        display:"inline-flex", alignItems:"center", gap:7, justifyContent:"center",
        width: full ? "100%" : "auto",
      }}>
        {icon && <i className={`ti ti-${icon}`} style={{fontSize:16}} />}
        {children}
      </button>
    );
  }

  /* Card surface */
  function Card({ children, p = 24, style = {} }) {
    return (
      <div style={{
        background: C.paper, border:`1px solid ${C.line}`, borderRadius:14,
        padding:p, ...style,
      }}>{children}</div>
    );
  }

  /* Company logo block (matches Applications page) */
  function CoLogo({ co, bg, color, size = 40 }) {
    return (
      <div style={{
        width:size, height:size, borderRadius:10, background:bg, color,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif', fontWeight:700,
        fontSize: size*0.42,
      }}>{co}</div>
    );
  }

  /* Frame — gives each canvas screen a consistent app-window feel */
  function Frame({ children, w = 1280, h = 800, label }) {
    return (
      <div style={{
        width:w, height:h, background:C.bg, borderRadius:14, overflow:"hidden",
        border:`1px solid ${C.line}`, boxShadow:"0 4px 20px rgba(2,47,54,.08)",
        display:"flex", flexDirection:"column", position:"relative",
        fontFamily:'"Proxima Soft", system-ui, sans-serif',
      }}>{children}</div>
    );
  }

  return { C, Mascot, TopNav, AgentPill, StatusBadge, PrimaryBtn, GhostBtn, Card, CoLogo, Frame };
})();

/* Destructure to scope for sibling files */
window.BV2C        = BV2.C;
window.BV2Mascot   = BV2.Mascot;
window.BV2TopNav   = BV2.TopNav;
window.BV2Pill     = BV2.AgentPill;
window.BV2Badge    = BV2.StatusBadge;
window.BV2Primary  = BV2.PrimaryBtn;
window.BV2Ghost    = BV2.GhostBtn;
window.BV2Card     = BV2.Card;
window.BV2CoLogo   = BV2.CoLogo;
window.BV2Frame    = BV2.Frame;
