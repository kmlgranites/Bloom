// LoaderScreen.jsx — Bloom progressive loader for the resume → jobs handoff
const { useState, useEffect, useRef } = React;

const L = {
  brandDark:"#022F36", brandMid:"#1D484F", brandDeep:"#01161A",
  cyan:"#5AEBEB", cyanSoft:"#9FE2EA", cyanGhost:"rgba(90,235,235,.15)",
  ink:"#022F36", inkSoft:"#4A5464", inkFaint:"#7B8794",
  bg:"#F0F3F7", line:"#E6E5E1", paper:"#FFFFFF",
  amber:"#F6B100", orange:"#F76638", green:"#00B16B",
};

// 8 messages × 3s = 24s. Index 8 ("Ready!") shows once we hit 100%.
const MESSAGES = [
  { h: "Parsing your resume",          s: "Reading your experience, education, and skills" },
  { h: "Got it. Analyzing your profile", s: "Identifying your strengths and career signals" },
  { h: "Searching open roles",         s: "Scanning thousands of fresh listings for you" },
  { h: "Matching your skills",         s: "Comparing your experience against job requirements" },
  { h: "Ranking the best fits",        s: "Prioritizing roles you're most likely to love" },
  { h: "Personalizing your feed",      s: "Tailoring recommendations to your goals" },
  { h: "Almost there",                 s: "Polishing the final picks before we show you" },
  { h: "Just a moment",                s: "Loading your matches — this takes a second" },
];
const READY = { h: "All set!", s: "Opening your personalized matches…" };

// 4 high-level stages that tick off — gives users a sense of real, structured progress.
const STAGES = [
  { label: "Parsing resume",      endsAt: 0.25 },
  { label: "Analyzing profile",   endsAt: 0.50 },
  { label: "Matching open roles", endsAt: 0.80 },
  { label: "Ranking your fits",   endsAt: 1.00 },
];

// Rotating tips — converts dead wait into product-value education. Swaps every 4s.
const TIPS = [
  {
    i: "moon",
    h: "Bloom hunts 24/7, you sleep",
    t: "We scan 150+ job boards, career pages, and insider networks for fresh, vetted roles matching your profile.",
  },
  {
    i: "target-arrow",
    h: "Smart matches only",
    t: "AI ranks roles by real fit — not keywords — so you only see openings where you’re a 90%+ match.",
  },
  {
    i: "bolt",
    h: "Apply better, in seconds",
    t: "Your resume and cover letter auto-tailor to each role, get ATS-checked, and go out within minutes of posting.",
  },
  {
    i: "brain",
    h: "Gets smarter every day",
    t: "Each detail you add sharpens future matches and lifts your automation readiness, so applications go out faster.",
  },
  {
    i: "layout-dashboard",
    h: "Track everything in one place",
    t: "One dashboard shows every application, its live status, and what to do next — no spreadsheets, no black box.",
  },
];

/* ─────────────── The loader card ─────────────── */
function LoaderCard({ duration = 24, onDone, dense = false }) {
  const [elapsed, setElapsed] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const startRef = useRef(null);

  // Animation tick
  useEffect(() => {
    startRef.current = performance.now();
    let raf;
    const tick = () => {
      const t = (performance.now() - startRef.current) / 1000;
      setElapsed(t);
      if (t < duration + 1.2) raf = requestAnimationFrame(tick);
      else if (onDone) onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onDone]);

  // Tip rotation — independent 5s cadence so users have time to read heading + body
  useEffect(() => {
    const id = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const progress = Math.min(elapsed / duration, 1);          // 0..1
  const pct = Math.round(progress * 100);
  const msgIdx = Math.min(Math.floor(elapsed / 3), MESSAGES.length - 1);
  const msg = progress >= 1 ? READY : MESSAGES[msgIdx];

  // Remaining seconds (rounded up to nearest 5 for less jitter)
  const remaining = Math.max(0, Math.ceil((duration - elapsed) / 5) * 5);

  return (
    <div style={{
      width: dense ? 460 : 540,
      background: L.paper,
      borderRadius: 24,
      padding: dense ? "36px 36px 28px" : "44px 48px 34px",
      boxShadow: "0 30px 80px -20px rgba(2,47,54,.25), 0 8px 24px -8px rgba(2,47,54,.12)",
      border: `1px solid ${L.line}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* faint cyan glow halo behind mascot */}
      <div aria-hidden style={{
        position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)",
        width:340, height:340, borderRadius:"50%",
        background:`radial-gradient(circle, ${L.cyanGhost} 0%, rgba(90,235,235,0) 70%)`,
        pointerEvents:"none",
      }} />

      {/* Mascot */}
      <div style={{
        position:"relative", display:"flex", justifyContent:"center",
        marginBottom: dense ? 14 : 18,
      }}>
        <div style={{
          width: dense ? 96 : 112, height: dense ? 96 : 112,
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"loaderBob 2.4s ease-in-out infinite",
        }}>
          <img
            src="assets/mushroom-loader.gif"
            alt=""
            style={{ width:"100%", height:"100%", objectFit:"contain" }}
          />
        </div>
        {/* soft shadow under mascot that pulses with bob */}
        <div aria-hidden style={{
          position:"absolute", bottom:-4, left:"50%", transform:"translateX(-50%)",
          width: 70, height: 8, borderRadius:"50%",
          background:"rgba(2,47,54,.12)", filter:"blur(4px)",
          animation:"loaderShadow 2.4s ease-in-out infinite",
        }} />
      </div>

      {/* Rotating headline + sub */}
      <div key={msgIdx + (progress >= 1 ? "-ready" : "")} style={{
        animation:"loaderFade .55s ease-out both",
        minHeight: dense ? 60 : 70,
      }}>
        <div style={{
          fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
          fontSize: dense ? 22 : 26, fontWeight: 700,
          color: L.brandDark, letterSpacing:"-.02em",
          display:"inline-flex", alignItems:"baseline", gap: 2,
        }}>
          {msg.h}
          {progress < 1 && <Dots />}
        </div>
        <div style={{
          fontSize: dense ? 13 : 14.5, color: L.inkSoft, marginTop: 6,
          fontWeight: 500, letterSpacing:"-.005em",
        }}>
          {msg.s}
        </div>
      </div>

      {/* Progress bar + % */}
      <div style={{ marginTop: dense ? 18 : 24 }}>
        <div style={{
          height: 8, borderRadius: 99, background:"#EAF1F4", overflow:"hidden",
          position:"relative",
        }}>
          <div style={{
            position:"absolute", inset:0, width:`${pct}%`,
            background:`linear-gradient(90deg, ${L.cyanSoft} 0%, ${L.cyan} 50%, ${L.cyanSoft} 100%)`,
            backgroundSize:"200% 100%",
            animation:"loaderShimmer 1.8s linear infinite",
            borderRadius: 99,
            transition:"width .35s ease-out",
          }} />
        </div>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          marginTop: 10, fontSize: 12.5, color: L.inkFaint, fontWeight: 600,
        }}>
          <span className="num" style={{ color: L.brandDark, fontWeight: 700 }}>{pct}%</span>
          <span>
            {progress >= 1 ? "Done" : remaining <= 5
              ? "Just a few seconds left"
              : `~${remaining}s remaining`}
          </span>
        </div>
      </div>

      {/* Stage checklist */}
      <div style={{
        marginTop: dense ? 20 : 26,
        display:"grid", gridTemplateColumns:"1fr 1fr", gap: "10px 14px",
        textAlign:"left",
      }}>
        {STAGES.map((stage, i) => {
          const prevEnd = i === 0 ? 0 : STAGES[i-1].endsAt;
          const done   = progress >= stage.endsAt;
          const active = !done && progress >= prevEnd;
          return (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap: 10,
              fontSize: 13.5, fontWeight: 600,
              color: done ? L.brandDark : active ? L.brandDark : L.inkFaint,
              opacity: !done && !active ? .6 : 1,
              transition:"opacity .3s ease, color .3s ease",
            }}>
              <span style={{
                width: 20, height: 20, borderRadius:"50%", flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background: done ? L.brandDark : active ? "#fff" : "#F1F4F7",
                border: done ? `2px solid ${L.brandDark}` :
                        active ? `2px solid ${L.cyan}` : `2px solid #E2E8F0`,
                transition:"all .3s ease",
              }}>
                {done && <i className="ti ti-check" style={{fontSize:13, color:"#fff", fontWeight:900}} />}
                {active && (
                  <span style={{
                    width:8, height:8, borderRadius:"50%", background: L.cyan,
                    animation:"loaderPulse 1.2s ease-in-out infinite",
                  }} />
                )}
              </span>
              {stage.label}
            </div>
          );
        })}
      </div>

      {/* Tip strip — product-value education while waiting */}
      <div style={{
        marginTop: dense ? 22 : 28,
        padding: "14px 16px",
        background: "#F6F9FB",
        borderRadius: 14,
        display:"flex", alignItems:"flex-start", gap: 13,
        textAlign:"left",
        border:`1px solid ${L.line}`,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink:0,
          background: L.brandDark,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow: `0 0 0 4px ${L.cyanGhost}`,
        }}>
          <i className={`ti ti-${TIPS[tipIdx].i}`} style={{fontSize:20, color:L.cyan}} />
        </div>
        <div key={tipIdx} style={{ animation:"loaderFade .5s ease-out both", minWidth:0, flex:1 }}>
          <div style={{
            display:"flex", alignItems:"center", gap:8, marginBottom: 4,
          }}>
            <div style={{ fontSize: 10.5, fontWeight:700, color:L.inkFaint, letterSpacing:".09em", textTransform:"uppercase" }}>
              Why Bloom
            </div>
            <div style={{
              display:"flex", gap:3, marginLeft:"auto",
            }}>
              {TIPS.map((_, i) => (
                <span key={i} style={{
                  width: i === tipIdx ? 14 : 4, height: 4, borderRadius: 99,
                  background: i === tipIdx ? L.brandDark : "#D5DCE2",
                  transition: "all .35s ease",
                }} />
              ))}
            </div>
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize: 15, color:L.brandDark, fontWeight:700, letterSpacing:"-.01em", lineHeight:1.25,
          }}>
            {TIPS[tipIdx].h}
          </div>
          <div style={{ fontSize: 12.5, color:L.inkSoft, fontWeight:500, marginTop:3, lineHeight:1.4 }}>
            {TIPS[tipIdx].t}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Error card (resume parse failed) ─────────────── */
function ErrorCard({ onRetry, onUseLinkedIn, onBack, dense = false }) {
  const fileInputRef = useRef(null);
  const [mode, setMode] = useState("error"); // "error" | "linkedin"
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    // In real app, this would re-trigger upload + loader. Demo: just call onRetry.
    onRetry && onRetry(file);
  };

  return (
    <div style={{
      width: dense ? 460 : 540,
      background: L.paper,
      borderRadius: 24,
      padding: dense ? "36px 36px 28px" : "44px 48px 34px",
      boxShadow: "0 30px 80px -20px rgba(2,47,54,.25), 0 8px 24px -8px rgba(2,47,54,.12)",
      border: `1px solid ${L.line}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* warm amber halo instead of cyan — softer than red for a recoverable error */}
      <div aria-hidden style={{
        position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)",
        width:340, height:340, borderRadius:"50%",
        background:`radial-gradient(circle, rgba(246,177,0,.16) 0%, rgba(246,177,0,0) 70%)`,
        pointerEvents:"none",
      }} />

      {/* Mascot — same character but with a small overlay glyph signaling the issue */}
      <div style={{
        position:"relative", display:"flex", justifyContent:"center",
        marginBottom: dense ? 14 : 18,
      }}>
        <div style={{
          width: dense ? 96 : 112, height: dense ? 96 : 112,
          display:"flex", alignItems:"center", justifyContent:"center",
          position:"relative",
          // freeze the bob — gentle stillness reads as "paused", not "broken"
        }}>
          <img
            src="assets/mushroom-loader.gif"
            alt=""
            style={{ width:"100%", height:"100%", objectFit:"contain", filter:"grayscale(.15) saturate(.9)" }}
          />
          {/* file + question badge */}
          <div style={{
            position:"absolute", right:-2, bottom:-2,
            width:38, height:38, borderRadius:"50%",
            background:"#fff", border:`2px solid ${L.line}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 10px rgba(2,47,54,.12)",
          }}>
            <i className="ti ti-help" style={{fontSize:20, color:"#B27300"}} />
          </div>
        </div>
      </div>

      {mode === "error" ? (
        <>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize: dense ? 22 : 26, fontWeight: 700,
            color: L.brandDark, letterSpacing:"-.02em",
          }}>
            We couldn’t read that resume
          </div>
          <div style={{
            fontSize: dense ? 13 : 14.5, color: L.inkSoft, marginTop: 8,
            fontWeight: 500, lineHeight:1.45,
            maxWidth: 420, marginLeft:"auto", marginRight:"auto",
          }}>
            The file may be scanned, image-based, or password-protected.
            Try a text-based PDF or DOCX — or use your LinkedIn instead.
          </div>

          {/* Primary + Secondary CTAs */}
          <div style={{
            marginTop: dense ? 20 : 26,
            display:"flex", flexDirection:"column", gap: 10,
          }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display:"none" }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding:"14px 18px", borderRadius: 12,
                background: L.brandDark, color:"#fff",
                fontSize: 15, fontWeight: 700, letterSpacing:"-.01em",
                display:"flex", alignItems:"center", justifyContent:"center", gap: 8,
                transition:"transform .15s ease, box-shadow .15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(2,47,54,.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <i className="ti ti-upload" style={{fontSize:18}} />
              Try another file
            </button>

            <button
              onClick={() => setMode("linkedin")}
              style={{
                padding:"12px 16px", borderRadius: 12,
                background:"#fff", border:`1.5px solid ${L.line}`, color: L.brandDark,
                fontSize: 14, fontWeight: 600,
                display:"flex", alignItems:"center", justifyContent:"center", gap: 8,
              }}
            >
              <i className="ti ti-brand-linkedin" style={{fontSize:17, color:"#0A66C2"}} />
              Or import from LinkedIn instead
            </button>
          </div>

          {/* Helper line — file requirements + privacy */}
          <div style={{
            marginTop: 18, padding: "12px 14px",
            background:"#F6F9FB", borderRadius: 10, border:`1px solid ${L.line}`,
            display:"flex", alignItems:"flex-start", gap: 10, textAlign:"left",
          }}>
            <i className="ti ti-info-circle" style={{fontSize:16, color:L.inkFaint, marginTop:1, flexShrink:0}} />
            <div style={{ fontSize: 12.5, color: L.inkSoft, fontWeight:500, lineHeight:1.5 }}>
              <strong style={{color:L.brandDark, fontWeight:700}}>What works best:</strong>{" "}
              Text-based PDF or DOCX, under 5MB. Avoid scanned images and password-protected files.
            </div>
          </div>

          {/* Quiet escape hatch */}
          <button
            onClick={onBack}
            style={{
              marginTop: 18, fontSize: 13, color: L.inkSoft, fontWeight: 600,
              display:"inline-flex", alignItems:"center", gap: 4,
              padding: 6,
            }}
          >
            <i className="ti ti-arrow-left" style={{fontSize:15}} />
            Back to import options
          </button>
        </>
      ) : (
        /* LinkedIn URL mode — inline, doesn't navigate away */
        <div style={{ animation:"loaderFade .35s ease-out both" }}>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize: dense ? 22 : 26, fontWeight: 700,
            color: L.brandDark, letterSpacing:"-.02em",
          }}>
            Paste your LinkedIn URL
          </div>
          <div style={{
            fontSize: dense ? 13 : 14.5, color: L.inkSoft, marginTop: 8,
            fontWeight: 500, lineHeight:1.45,
          }}>
            We’ll pull your experience and skills from your public profile.
          </div>

          <div style={{
            marginTop: 22,
            display:"flex", alignItems:"center", gap: 10,
            padding: "4px 4px 4px 14px",
            background:"#fff", border:`1.5px solid ${L.line}`, borderRadius: 12,
            textAlign:"left",
          }}>
            <i className="ti ti-brand-linkedin" style={{fontSize:18, color:"#0A66C2", flexShrink:0}} />
            <input
              autoFocus
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="linkedin.com/in/your-handle"
              style={{
                flex:1, fontSize: 14, color: L.brandDark, fontWeight: 500,
                padding: "10px 0", background:"transparent", outline:"none", border:"none",
              }}
            />
            <button
              onClick={() => onUseLinkedIn && onUseLinkedIn(linkedinUrl)}
              disabled={!linkedinUrl.trim()}
              style={{
                padding:"8px 14px", borderRadius: 8,
                background: linkedinUrl.trim() ? L.brandDark : "#CBD5E1",
                color:"#fff", fontSize: 13, fontWeight: 700,
                cursor: linkedinUrl.trim() ? "pointer" : "not-allowed",
              }}
            >
              Continue
            </button>
          </div>

          <button
            onClick={() => setMode("error")}
            style={{
              marginTop: 18, fontSize: 13, color: L.inkSoft, fontWeight: 600,
              display:"inline-flex", alignItems:"center", gap: 4, padding: 6,
            }}
          >
            <i className="ti ti-arrow-left" style={{fontSize:15}} />
            Upload a file instead
          </button>
        </div>
      )}
    </div>
  );
}

/* Animated three-dot trailing ellipsis */
function Dots() {
  return (
    <span style={{ display:"inline-flex", marginLeft: 2 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          display:"inline-block",
          animation:`loaderDot 1.4s ease-in-out ${i*0.18}s infinite`,
        }}>.</span>
      ))}
    </span>
  );
}

/* ─────────────── Blurred app backdrop (mock) ─────────────── */
function BlurredBackdrop() {
  // a lightweight skeleton resembling the Applications page — kept simple so the
  // loader stays the focal point and there's no flash of un-blurred content.
  return (
    <div aria-hidden style={{
      position:"absolute", inset:0, overflow:"hidden",
      filter:"blur(8px) saturate(.85)", opacity:.55, pointerEvents:"none",
    }}>
      {/* nav strip */}
      <div style={{ height:67, background:"#fff", borderBottom:`1px solid ${L.line}` }} />
      {/* page body */}
      <div style={{ padding:"28px 80px", display:"grid", gridTemplateColumns:"3fr 1fr", gap:24 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              background:"#fff", borderRadius:14, height: 96,
              border:`1px solid ${L.line}`,
              boxShadow:"0 2px 6px rgba(2,47,54,.04)",
              padding:"18px 22px",
              display:"flex", gap:16, alignItems:"center",
            }}>
              <div style={{width:44, height:44, borderRadius:10, background:"#E2E8F0"}} />
              <div style={{flex:1, display:"flex", flexDirection:"column", gap:8}}>
                <div style={{height:12, width:"45%", background:"#E2E8F0", borderRadius:4}} />
                <div style={{height:10, width:"30%", background:"#EEF2F6", borderRadius:4}} />
              </div>
              <div style={{width:90, height:24, borderRadius:6, background:"#EEF2F6"}} />
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {[140, 120].map((h,i) => (
            <div key={i} style={{
              background:"#fff", borderRadius:14, height: h,
              border:`1px solid ${L.line}`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Tweaks-controlled stage ─────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "duration": 24,
  "showBackdrop": true,
  "density": "comfortable",
  "accent": "cyan",
  "state": "loading"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = {
  cyan:    { cyan:"#5AEBEB", cyanSoft:"#9FE2EA", cyanGhost:"rgba(90,235,235,.15)" },
  orange:  { cyan:"#F76638", cyanSoft:"#FFC4A8", cyanGhost:"rgba(247,102,56,.14)" },
  green:   { cyan:"#00B16B", cyanSoft:"#9FE2BF", cyanGhost:"rgba(0,177,107,.14)" },
  amber:   { cyan:"#F6B100", cyanSoft:"#FFE3A6", cyanGhost:"rgba(246,177,0,.14)" },
};

function App() {
  const [t, setT] = useState(TWEAK_DEFAULTS);
  const [key, setKey] = useState(0); // for restart
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Apply accent dynamically by mutating L
  const accent = ACCENT_OPTIONS[t.accent] || ACCENT_OPTIONS.cyan;
  L.cyan = accent.cyan;
  L.cyanSoft = accent.cyanSoft;
  L.cyanGhost = accent.cyanGhost;

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const updateTweak = (patch) => {
    setT(prev => ({ ...prev, ...patch }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  return (
    <div style={{
      minHeight:"100vh", background: L.bg,
      position:"relative", overflow:"hidden",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding: 24,
    }}>
      {t.showBackdrop && <BlurredBackdrop />}

      {/* subtle dim overlay so the card pops */}
      {t.showBackdrop && (
        <div aria-hidden style={{
          position:"absolute", inset:0,
          background:"linear-gradient(180deg, rgba(240,243,247,.4) 0%, rgba(240,243,247,.75) 100%)",
          pointerEvents:"none",
        }} />
      )}

      <div style={{ position:"relative", zIndex: 2 }}>
        {t.state === "error" ? (
          <ErrorCard
            key={key}
            dense={t.density === "dense"}
            onRetry={() => updateTweak({ state: "loading" })}
            onUseLinkedIn={() => updateTweak({ state: "loading" })}
            onBack={() => updateTweak({ state: "loading" })}
          />
        ) : (
          <LoaderCard
            key={key}
            duration={t.duration}
            dense={t.density === "dense"}
            onDone={() => {/* keep on "All set!" briefly */}}
          />
        )}
      </div>

      {tweaksOpen && (
        <TweaksPanel
          tweaks={t}
          onChange={updateTweak}
          onRestart={() => setKey(k => k + 1)}
          onClose={() => {
            setTweaksOpen(false);
            window.parent.postMessage({ type:"__edit_mode_dismissed" }, "*");
          }}
        />
      )}
    </div>
  );
}

function TweaksPanel({ tweaks, onChange, onRestart, onClose }) {
  return (
    <div style={{
      position:"fixed", right: 20, bottom: 20, zIndex: 50,
      width: 280, background:"#fff", borderRadius: 14,
      border:`1px solid ${L.line}`,
      boxShadow:"0 20px 50px -10px rgba(2,47,54,.25)",
      fontFamily:'"Proxima Soft",sans-serif',
      overflow:"hidden",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 14px", borderBottom:`1px solid ${L.line}`,
        background: L.brandDark, color:"#fff",
      }}>
        <div style={{fontWeight:700, fontSize:13, letterSpacing:".02em"}}>Tweaks</div>
        <button onClick={onClose} style={{color:"#fff", padding:4, lineHeight:0}}>
          <i className="ti ti-x" style={{fontSize:16}} />
        </button>
      </div>
      <div style={{ padding:14, display:"flex", flexDirection:"column", gap:14 }}>
        <Row label="Screen state">
          <Seg
            value={tweaks.state || "loading"}
            options={[["loading","Loading"],["error","Error"]]}
            onChange={v => onChange({ state: v })}
          />
        </Row>
        <Row label={`Total duration: ${tweaks.duration}s`}>
          <input type="range" min={10} max={45} step={1}
            value={tweaks.duration}
            onChange={e => onChange({ duration: Number(e.target.value) })}
            style={{ width:"100%" }} />
        </Row>
        <Row label="Density">
          <Seg
            value={tweaks.density}
            options={[["comfortable","Comfort"],["dense","Dense"]]}
            onChange={v => onChange({ density: v })}
          />
        </Row>
        <Row label="Show blurred app behind">
          <Seg
            value={tweaks.showBackdrop ? "on" : "off"}
            options={[["on","On"],["off","Off"]]}
            onChange={v => onChange({ showBackdrop: v === "on" })}
          />
        </Row>
        <Row label="Accent">
          <div style={{display:"flex", gap:8}}>
            {Object.entries(ACCENT_OPTIONS).map(([k, c]) => (
              <button key={k} onClick={() => onChange({ accent: k })}
                style={{
                  width:28, height:28, borderRadius:"50%",
                  background:c.cyan, cursor:"pointer",
                  border: tweaks.accent === k ? `2px solid ${L.brandDark}` : "2px solid transparent",
                  outline: tweaks.accent === k ? `2px solid ${c.cyan}` : "none",
                  outlineOffset: 1,
                }}
                aria-label={k}
              />
            ))}
          </div>
        </Row>
        <button onClick={onRestart} style={{
          marginTop:4, padding:"9px 12px", borderRadius:8,
          background: L.brandDark, color:"#fff", fontWeight:700, fontSize:13,
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
        }}>
          <i className="ti ti-refresh" style={{fontSize:15}} /> Restart loader
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div>
      <div style={{ fontSize:11.5, fontWeight:700, color:L.inkSoft, marginBottom:7, letterSpacing:".04em", textTransform:"uppercase" }}>{label}</div>
      {children}
    </div>
  );
}
function Seg({ value, options, onChange }) {
  return (
    <div style={{
      display:"flex", padding:3, background:"#F1F4F7", borderRadius:8,
    }}>
      {options.map(([v, label]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          flex:1, padding:"6px 8px", borderRadius:6, fontSize:12, fontWeight:600,
          background: value === v ? "#fff" : "transparent",
          color: value === v ? L.brandDark : L.inkSoft,
          boxShadow: value === v ? "0 1px 2px rgba(0,0,0,.08)" : "none",
        }}>{label}</button>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
