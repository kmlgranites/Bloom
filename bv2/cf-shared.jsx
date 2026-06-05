// Shared primitives for Bloom V2 — Sprout Flow
// Tokens, mascot SVG, sidebar nav, buttons.

const cfTokens = {
  brand: "#022F36",
  brandDark: "#011E22",
  primary: "#1D484F",
  primaryHover: "#022F36",
  cyan: "#5AEBEB",
  cyanLight: "#E0FAFA",
  orange: "#F76638",
  green: "#00B16B",
  page: "#FAFAFA",
  card: "#FFFFFF",
  border: "#E5E7EB",
  borderLight: "#EEF0F2",
  input: "#F5F6F7",
  text: "#022F36",
  body: "#23262E",
  muted: "#4A5464",
  placeholder: "#A5A5A5",
  divider: "#E6E8EB",
};
window.cfTokens = cfTokens;

// --- Mascot SVG (Bloom mushroom — simplified, friendly) -------
function CFMascot({ size = 64, eyes = "happy", style }) {
  // eyes: "happy" | "wink" | "sparkle" | "thinking"
  const sparkle = eyes === "sparkle";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-hidden="true">
      {/* shadow */}
      <ellipse cx="50" cy="92" rx="22" ry="3" fill="#000" opacity="0.08" />
      {/* stem */}
      <path d="M34 60 L34 82 Q34 90 50 90 Q66 90 66 82 L66 60 Z" fill="#F5F1E6" stroke="#022F36" strokeWidth="2.5"/>
      {/* cap */}
      <path d="M14 56 Q14 22 50 22 Q86 22 86 56 Q86 60 82 60 L18 60 Q14 60 14 56 Z" fill={cfTokens.primary}/>
      {/* cap highlights */}
      <ellipse cx="38" cy="36" rx="9" ry="6" fill={cfTokens.cyan} opacity="0.95"/>
      <ellipse cx="64" cy="42" rx="6" ry="4" fill={cfTokens.cyan} opacity="0.95"/>
      <ellipse cx="72" cy="30" rx="4" ry="3" fill={cfTokens.cyan} opacity="0.8"/>
      {/* eyes */}
      {sparkle ? (
        <>
          <path d="M42 70 L44 67 L46 70 L49 72 L46 74 L44 77 L42 74 L39 72 Z" fill={cfTokens.cyan}/>
          <path d="M58 70 L60 67 L62 70 L65 72 L62 74 L60 77 L58 74 L55 72 Z" fill={cfTokens.cyan}/>
        </>
      ) : eyes === "wink" ? (
        <>
          <circle cx="42" cy="72" r="2.5" fill="#022F36"/>
          <path d="M55 72 Q60 70 65 72" stroke="#022F36" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </>
      ) : eyes === "thinking" ? (
        <>
          <circle cx="42" cy="72" r="2" fill="#022F36"/>
          <circle cx="60" cy="72" r="2" fill="#022F36"/>
          <path d="M45 80 Q50 78 55 80" stroke="#022F36" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </>
      ) : (
        <>
          <circle cx="42" cy="72" r="2.5" fill="#022F36"/>
          <circle cx="60" cy="72" r="2.5" fill="#022F36"/>
          <circle cx="43" cy="71" r="0.8" fill="#FFFFFF"/>
          <circle cx="61" cy="71" r="0.8" fill="#FFFFFF"/>
        </>
      )}
      {/* cheek blush */}
      <circle cx="36" cy="78" r="2.5" fill={cfTokens.orange} opacity="0.3"/>
      <circle cx="66" cy="78" r="2.5" fill={cfTokens.orange} opacity="0.3"/>
    </svg>
  );
}
window.CFMascot = CFMascot;

// --- Logo lockup --------------------------------------------
function CFLogo({ dark = false, size = 22 }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:8}}>
      <CFMascot size={size + 6}/>
      <span style={{
        fontFamily:"'Filson Soft','Proxima Soft',system-ui,sans-serif",
        fontWeight:700, fontSize:size,
        color: dark ? "#FFFFFF" : cfTokens.brand,
        letterSpacing:"-0.01em",
      }}>bloom</span>
    </div>
  );
}
window.CFLogo = CFLogo;

// --- Pill button --------------------------------------------
function CFButton({ variant="primary", size="md", icon, iconRight, children, style, ...rest }) {
  const sizes = {
    sm: { padding:"8px 16px", fontSize:13, height:34 },
    md: { padding:"12px 22px", fontSize:15, height:44 },
    lg: { padding:"14px 28px", fontSize:16, height:52 },
  };
  const variants = {
    primary: { background: cfTokens.primary, color:"#fff", border:"none" },
    dark:    { background: cfTokens.brand, color:"#fff", border:"none" },
    cta:     { background: cfTokens.orange, color:"#fff", border:"none" },
    outline: { background:"#fff", color: cfTokens.text, border:`1px solid ${cfTokens.border}` },
    ghost:   { background:"transparent", color: cfTokens.text, border:"none" },
    light:   { background: cfTokens.cyanLight, color: cfTokens.brand, border:"none" },
  };
  return (
    <button
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        borderRadius:9999, fontWeight:700, lineHeight:1, cursor:"pointer",
        whiteSpace:"nowrap", transition:"transform .12s ease, filter .12s ease",
        ...sizes[size], ...variants[variant], ...style,
      }}
      {...rest}
    >
      {icon ? <i className={`ti ti-${icon}`} style={{fontSize:size==="sm"?15:17}}/> : null}
      {children}
      {iconRight ? <i className={`ti ti-${iconRight}`} style={{fontSize:size==="sm"?15:17}}/> : null}
    </button>
  );
}
window.CFButton = CFButton;

// --- Pill / chip --------------------------------------------
function CFChip({ active, icon, children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      display:"inline-flex", alignItems:"center", gap:8,
      padding:"10px 18px", borderRadius:9999,
      border: active ? "none" : `1px solid ${cfTokens.border}`,
      background: active ? cfTokens.primary : "#fff",
      color: active ? "#fff" : cfTokens.text,
      fontWeight:600, fontSize:14, fontFamily:"inherit", cursor:"pointer",
      ...style,
    }}>
      {icon ? <i className={`ti ti-${icon}`} style={{fontSize:15, opacity: active ? 1 : 0.5}}/> : null}
      {children}
    </button>
  );
}
window.CFChip = CFChip;

// --- Sidebar nav (main app) ---------------------------------
function CFAppNav({ active = "sprouts", agentLabel = "Sprouts" }) {
  const items = [
    { id:"sprouts", label: agentLabel, icon:"plant-2" },
    { id:"apps",    label:"Applications", icon:"checklist" },
    { id:"tools",   label:"Tools", icon:"wand" },
    { id:"settings",label:"Settings", icon:"settings" },
  ];
  return (
    <div style={{
      width: 220, background:"#FFFFFF", borderRight:`1px solid ${cfTokens.borderLight}`,
      padding:"24px 16px", display:"flex", flexDirection:"column", gap:6, height:"100%",
    }}>
      <div style={{padding:"4px 8px 24px"}}>
        <CFLogo size={20}/>
      </div>
      {items.map(it => (
        <div key={it.id} style={{
          display:"flex", alignItems:"center", gap:12,
          padding:"11px 14px", borderRadius:10,
          background: active === it.id ? cfTokens.cyanLight : "transparent",
          color: active === it.id ? cfTokens.brand : cfTokens.muted,
          fontWeight: active === it.id ? 700 : 500, fontSize:14, cursor:"pointer",
        }}>
          <i className={`ti ti-${it.icon}`} style={{fontSize:18}}/>
          {it.label}
        </div>
      ))}
      <div style={{flex:1}}/>
      <div style={{
        display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10,
        background: cfTokens.input,
      }}>
        <div style={{
          width:32, height:32, borderRadius:"50%", background: cfTokens.primary,
          color:"#fff", display:"grid", placeItems:"center", fontWeight:700, fontSize:13,
        }}>VK</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:13, fontWeight:600, color: cfTokens.text}}>Vinodh K.</div>
          <div style={{fontSize:11, color: cfTokens.muted}}>Premium plan</div>
        </div>
      </div>
    </div>
  );
}
window.CFAppNav = CFAppNav;

// --- Top tab nav (alt — matches JobCopilot center bar) -------
function CFTopNav({ active="sprouts", agentLabel="Sprout" }) {
  const items = [
    { id:"sprouts", label: agentLabel, icon:"plant-2" },
    { id:"apps",    label:"Applications", icon:"checklist" },
    { id:"contacts",label:"Contacts", icon:"users" },
    { id:"tools",   label:"Tools", icon:"wand" },
    { id:"settings",label:"Settings", icon:"settings" },
  ];
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"18px 36px", background:"#fff", borderBottom:`1px solid ${cfTokens.borderLight}`,
    }}>
      <CFLogo size={22}/>
      <div style={{display:"flex", gap:6}}>
        {items.map(it => (
          <div key={it.id} style={{
            display:"flex", alignItems:"center", gap:8, padding:"10px 18px",
            color: active === it.id ? cfTokens.brand : cfTokens.muted,
            fontWeight: active === it.id ? 700 : 500, fontSize:15,
            borderBottom: active === it.id ? `3px solid ${cfTokens.primary}` : "3px solid transparent",
            cursor:"pointer",
          }}>
            <i className={`ti ti-${it.icon}`} style={{fontSize:18}}/>
            {it.label}
          </div>
        ))}
      </div>
      <div style={{
        width:36, height:36, borderRadius:"50%", background: cfTokens.primary,
        color:"#fff", display:"grid", placeItems:"center", fontWeight:700, fontSize:13,
      }}>VK</div>
    </div>
  );
}
window.CFTopNav = CFTopNav;

// --- Section card -------------------------------------------
function CFCard({ children, style, padding=24 }) {
  return (
    <div style={{
      background:"#fff", borderRadius:16, border:`1px solid ${cfTokens.borderLight}`,
      boxShadow:"0 2px 4px -2px rgba(0,0,0,.06), 0 4px 6px -1px rgba(0,0,0,.04)",
      padding, ...style,
    }}>{children}</div>
  );
}
window.CFCard = CFCard;
