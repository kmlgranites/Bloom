// =====================================================================
// Bloom Gen Z V3 — Shared tokens, mascot, primitives
// =====================================================================

// ── Tokens ──────────────────────────────────────────────────────────
const sprT = {
  // surfaces
  cream:      "#F6F1E7",   // warm page bg
  creamSoft:  "#FBF7EE",   // card bg on cream
  paper:      "#FFFFFF",
  ink:        "#022F36",   // primary text — deep teal
  inkSoft:    "#3C5356",
  muted:      "#7B8B8E",
  hairline:   "#E8DFCD",   // warm border on cream
  hairlineCool:"#E1E5E7",

  // accents
  cyan:       "#5AEBEB",   // hit color
  cyanInk:    "#0BB3B3",   // darker cyan for text/icons
  mint:       "#C8F0D8",
  mintInk:    "#0F7A4A",
  butter:     "#FFE08A",
  butterInk:  "#7A5300",
  blush:      "#FFD2C4",
  blushInk:   "#A23A1B",
  flame:      "#F76638",   // orange — celebration
  lilac:      "#D9D2FF",
  lilacInk:   "#3F2F8F",

  // dark surface
  inkBg:      "#022F36",
  inkBgSoft:  "#0C3C44",
};

const fontDisplay = `"Filson Soft","Nunito","Proxima Soft",system-ui,sans-serif`;
const fontBody    = `"Proxima Soft",system-ui,sans-serif`;
const fontData    = `"Inter",system-ui,sans-serif`;

// ── Mushroom mascot — inline SVG so it's color-tunable ───────────────
function SproutMascot({ size = 64, cap = sprT.cyan, stem = "#FFFFFF", stroke = sprT.ink, mood = "happy", style }) {
  // mood: happy (sparkle eyes) | thinking (..) | sleeping (—__—) | working (^_^)
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-hidden="true">
      {/* cap */}
      <path d="M50 8 C24 8 8 32 8 50 C8 58 14 62 22 60 C26 60 30 58 32 56 C34 62 40 64 50 64 C60 64 66 62 68 56 C70 58 74 60 78 60 C86 62 92 58 92 50 C92 32 76 8 50 8 Z"
            fill={cap} stroke={stroke} strokeWidth="3.5" strokeLinejoin="round"/>
      {/* stem */}
      <path d="M30 60 C30 78 36 90 50 90 C64 90 70 78 70 60 Z"
            fill={stem} stroke={stroke} strokeWidth="3.5" strokeLinejoin="round"/>
      {/* base hairline shadow on stem */}
      <path d="M34 84 C40 88 60 88 66 84" stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      {/* eyes */}
      {mood === "happy" && (
        <g fill={stroke}>
          <path d="M40 72 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 z"/>
          <path d="M58 72 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 z"/>
        </g>
      )}
      {mood === "thinking" && (
        <g fill={stroke}>
          <circle cx="40" cy="74" r="2"/><circle cx="46" cy="74" r="2"/><circle cx="52" cy="74" r="2"/>
        </g>
      )}
      {mood === "working" && (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round">
          <path d="M36 74 q4 -5 8 0"/>
          <path d="M56 74 q4 -5 8 0"/>
        </g>
      )}
      {mood === "sleeping" && (
        <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round">
          <path d="M36 74 h8"/><path d="M56 74 h8"/>
        </g>
      )}
    </svg>
  );
}

// ── Wordmark ────────────────────────────────────────────────────────
function SproutWordmark({ size = 22, color = sprT.ink, mascot = true }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap: size*0.35, color, fontFamily: fontDisplay}}>
      {mascot && <SproutMascot size={size*1.55}/>}
      <span style={{fontWeight: 700, fontSize: size, letterSpacing:"-0.02em"}}>bloom</span>
    </div>
  );
}

// ── Pill / Chip ─────────────────────────────────────────────────────
function SprChip({ children, fill = sprT.cyan, ink = sprT.ink, style, size = "md", onClick }) {
  const padding = size === "sm" ? "5px 10px" : size === "lg" ? "12px 18px" : "8px 14px";
  const fs = size === "sm" ? 12 : size === "lg" ? 15 : 13;
  return (
    <button onClick={onClick} style={{
      padding, borderRadius: 999, background: fill, color: ink,
      border: "none", fontWeight: 700, fontSize: fs, fontFamily: fontBody,
      letterSpacing:"-0.01em", lineHeight: 1, cursor: "pointer",
      display:"inline-flex", alignItems:"center", gap: 6,
      ...style,
    }}>{children}</button>
  );
}

// ── Buttons ─────────────────────────────────────────────────────────
function SprBtn({ children, variant = "primary", size = "lg", style, icon, onClick, full }) {
  const sizes = {
    sm: {pad:"10px 16px", fs:14, h:38},
    md: {pad:"12px 20px", fs:15, h:46},
    lg: {pad:"16px 26px", fs:17, h:56},
  };
  const s = sizes[size];
  const variants = {
    primary:{ bg: sprT.ink, fg: "#fff", bd: "transparent"},
    secondary:{ bg: sprT.cyan, fg: sprT.ink, bd: "transparent"},
    ghost:{ bg: "transparent", fg: sprT.ink, bd: sprT.ink},
    flame:{ bg: sprT.flame, fg:"#fff", bd:"transparent"},
    paper:{ bg:"#fff", fg: sprT.ink, bd: sprT.hairline},
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} style={{
      padding: s.pad, height: s.h, width: full ? "100%" : "auto",
      borderRadius: 999, background: v.bg, color: v.fg, border: `1.5px solid ${v.bd}`,
      fontWeight: 700, fontSize: s.fs, fontFamily: fontBody, letterSpacing:"-0.01em",
      cursor: "pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:10,
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ── Chat bubble (Sprout messages) ───────────────────────────────────
function SprBubble({ children, from = "sprout", style }) {
  const isSprout = from === "sprout";
  return (
    <div style={{
      display:"flex", justifyContent: isSprout ? "flex-start" : "flex-end",
      ...style,
    }}>
      <div style={{
        maxWidth: "82%",
        background: isSprout ? "#fff" : sprT.ink,
        color: isSprout ? sprT.ink : "#fff",
        padding: "12px 16px",
        borderRadius: isSprout ? "22px 22px 22px 6px" : "22px 22px 6px 22px",
        fontSize: 15.5, lineHeight: 1.4, fontWeight: 500,
        fontFamily: fontBody, letterSpacing:"-0.005em",
        boxShadow: isSprout ? "0 1px 0 rgba(0,0,0,0.04)" : "none",
        border: isSprout ? `1px solid ${sprT.hairline}` : "none",
      }}>{children}</div>
    </div>
  );
}

// ── Avatar with mascot ──────────────────────────────────────────────
function SprAvatar({ size = 36, cap = sprT.cyan, mood, ring }) {
  return (
    <div style={{
      width: size, height: size, borderRadius:"50%",
      background: cap, display:"grid", placeItems:"center",
      border: ring ? `2px solid ${sprT.ink}` : "none",
      flexShrink: 0,
    }}>
      <SproutMascot size={size*0.78} cap={cap} mood={mood}/>
    </div>
  );
}

// ── Stat tile (used in ROI moments) ─────────────────────────────────
function StatTile({ value, label, tint = sprT.cyan, style }) {
  return (
    <div style={{
      background: tint, borderRadius: 22, padding: "16px 18px",
      display:"flex", flexDirection:"column", gap: 4, ...style,
    }}>
      <div style={{fontFamily: fontDisplay, fontWeight: 700, fontSize: 36, lineHeight: 1, letterSpacing:"-0.03em", color: sprT.ink}}>
        {value}
      </div>
      <div style={{fontSize: 13, fontWeight: 600, color: sprT.ink, opacity: 0.7, letterSpacing:"-0.01em"}}>
        {label}
      </div>
    </div>
  );
}

// ── Sparkle icon ────────────────────────────────────────────────────
function Sparkle({ size = 14, color = sprT.ink }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M12 2 l1.8 6.6 L20 10 l-6.2 1.4 L12 18 l-1.8 -6.6 L4 10 l6.2 -1.4 z"/>
      <circle cx="19" cy="5" r="1.4"/>
      <circle cx="5" cy="18" r="1"/>
    </svg>
  );
}

// ── Status pill (e.g. "Sprout is applying") ─────────────────────────
function LivePill({ children, color = sprT.mint, ink = sprT.mintInk }) {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap: 8,
      background: color, color: ink, padding: "6px 12px",
      borderRadius: 999, fontSize: 13, fontWeight: 700, fontFamily: fontBody,
    }}>
      <span style={{width: 7, height: 7, borderRadius: "50%", background: ink, animation: "sprPulse 1.6s ease-in-out infinite"}}/>
      {children}
    </div>
  );
}

// ── Phone safe area helper — gives content area inside IOSDevice ───
function PhoneScroll({ children, bg = sprT.cream, header }) {
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 40, // status + home indicator
      minHeight: "100%", background: bg, fontFamily: fontBody, color: sprT.ink,
      display:"flex", flexDirection:"column",
    }}>
      {header}
      <div style={{flex: 1, display:"flex", flexDirection:"column"}}>{children}</div>
    </div>
  );
}

// ── Export ──────────────────────────────────────────────────────────
Object.assign(window, {
  sprT, fontDisplay, fontBody, fontData,
  SproutMascot, SproutWordmark, SprChip, SprBtn, SprBubble,
  SprAvatar, StatTile, Sparkle, LivePill, PhoneScroll,
});
