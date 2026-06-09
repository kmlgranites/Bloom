// =====================================================================
// Bloom Prototype — Onboarding (chat-native, 3 chapters)
//
// Design rationale: a single continuous chat with 3 visible chapters
// (a chapter chip at the top + dots that fill as you advance). Résumé
// upload absorbs ~70% of the JobCopilot field set; the rest is collected
// just-in-time inside the review flow as pills.
//
// Chapters:
//   1 · You          — role, level, types, location, salary floor
//   2 · Résumé       — drop file OR paste LinkedIn → Sprout extracts + you confirm
//   3 · Mode         — Review vs Auto
// =====================================================================
const {
  pT: oT, pFD: oFD, pFB: oFB, PM: OM, PA: OA,
  useStore: oUseStore, SprChip: OSC, SprBubble: OSBu, SprBtn: OSBtn,
} = window;

const CHAPTERS = [
  { id:"you",      label:"You",       icon:"👋" },
  { id:"resume",   label:"Résumé",    icon:"📄" },
  { id:"mode",     label:"Mode",      icon:"🎚" },
];

function ProtoOnboarding() {
  const { d } = oUseStore();
  const [chapter, setChapter] = React.useState(0);

  // Chapter 1 state
  const [role, setRole]       = React.useState("Product Designer");
  const [level, setLevel]     = React.useState("Senior");
  const [types, setTypes]     = React.useState(["Fulltime"]);
  const [locMode, setLocMode] = React.useState("Remote");
  const [region, setRegion]   = React.useState("Remote, US");
  const [pay, setPay]         = React.useState("$180k+");

  // Chapter 2 state
  const [importMode, setImportMode] = React.useState("resume"); // "resume" | "linkedin"
  const [liUrl, setLiUrl]       = React.useState("");
  const [resumeDropped, setRD] = React.useState(false);
  const [resumeAnalyzing, setRA] = React.useState(false);
  const [resumeFacts, setRF] = React.useState({});  // confirmations / overrides

  // Chapter 3 state
  const [mode, setMode]       = React.useState("review");

  const scrollRef = React.useRef(null);

  function toggleArr(arr, setArr, v) {
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  }

  function dropResume() {
    setRA(true);
    setTimeout(() => { setRD(true); setRA(false); }, 1400);
  }

  function advance() {
    setChapter(c => Math.min(c + 1, CHAPTERS.length - 1));
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 50);
  }

  const isLastChapter = chapter === CHAPTERS.length - 1;

  return (
      <div style={{flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight: 0}}>
        {/* Header — chapter pill + dots */}
      <div style={{padding:"18px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${oT.hairline}`, background:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", gap: 10}}>
          <img src="assets/bloom-logo.svg" alt="bloom" style={{height: 24, width:"auto", display:"block"}}/>
        </div>

        {/* Chapter indicator — sits in the middle */}
        <div style={{display:"flex", alignItems:"center", gap: 14}}>
          <div style={{display:"inline-flex", alignItems:"center", gap: 8, padding:"6px 12px", borderRadius: 999, background: oT.cream, fontSize: 12.5, fontWeight: 800, color: oT.ink, letterSpacing:"-0.005em"}}>
            <span style={{fontSize: 14}}>{CHAPTERS[chapter].icon}</span>
            <span>{chapter + 1}/{CHAPTERS.length} · {CHAPTERS[chapter].label}</span>
          </div>
          <div style={{display:"flex", gap: 5}}>
            {CHAPTERS.map((c, i) => (
              <div key={c.id} style={{
                width: i === chapter ? 22 : 6, height: 6, borderRadius: 99,
                background: i < chapter ? oT.cyanInk : (i === chapter ? oT.ink : oT.hairline),
                transition:"all 0.25s",
              }}/>
            ))}
          </div>
        </div>

        <button onClick={()=>d({type:"FINISH_ONB", mode:"review"})} style={{fontSize: 13, color: oT.muted, fontWeight: 600, cursor:"pointer"}}>Skip for now</button>
      </div>

      <div style={{flex:1, display:"flex", overflow:"hidden"}}>
        {/* Left ambient rail — keeps Sprout visible + sets tone */}
        <div style={{width: 280, flexShrink: 0, background: oT.ink, color:"#fff", padding: "28px 26px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", bottom:-50, right:-50, width: 220, height: 220, borderRadius:"50%", background: oT.cyan, opacity: 0.16, filter:"blur(40px)"}}/>

          <div style={{position:"relative"}}>
            <div style={{fontSize: 11, fontWeight: 800, color: oT.cyan, letterSpacing:"0.06em", marginBottom: 8}}>● SETTING UP SPROUT</div>
            <div style={{fontFamily: oFD, fontWeight: 700, fontSize: 26, letterSpacing:"-0.025em", lineHeight: 1.1}}>
              {chapter === 0 && "Tell me about you."}
              {chapter === 1 && "Your résumé does the rest."}
              {chapter === 2 && "Last call — your style."}
            </div>
            <div style={{fontSize: 13.5, opacity: 0.7, fontWeight: 500, marginTop: 10, lineHeight: 1.45}}>
              {chapter === 0 && "Five taps. No typing."}
              {chapter === 1 && "I'll learn your story — current role, salary, notice, links — and you confirm in one tap."}
              {chapter === 2 && "Switch any time. Or per job."}
            </div>
          </div>

          <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
            <video src="assets/sprout-anim.mp4" autoPlay loop muted playsInline
                   ref={(el)=>{ if (el) { el.muted = true; const p = el.play(); if (p && p.catch) p.catch(()=>{}); } }}
                   style={{width: 200, height:"auto", display:"block", borderRadius: 16}}/>
          </div>

          <div style={{position:"relative"}}>
            <div style={{fontSize: 11, fontWeight: 800, color: oT.cyan, letterSpacing:"0.06em", marginBottom: 6}}>● ~90 SECONDS</div>
            <div style={{fontSize: 12, opacity: 0.7, fontWeight: 500, lineHeight: 1.45}}>
              I'll learn the rest from your real applications — every answer you tap teaches me.
            </div>
          </div>
        </div>

        {/* Chat column */}
        <div ref={scrollRef} style={{flex: 1, overflow:"auto", padding: "30px 0 60px"}}>
          <div style={{maxWidth: 640, margin:"0 auto", padding: "0 36px", display:"flex", flexDirection:"column", gap: 14}}>

            {/* ───────────────────────── CHAPTER 1 · YOU ──────────────────── */}
            {chapter >= 0 && <ChapterMark idx={0} active={chapter === 0}/>}
            {chapter >= 0 && (
              <>
                <OSBu>Hi Vinodh 👋 I'm <b>Sprout</b>, your job-search copilot. Quick basics first. <b>Tap, don't type.</b></OSBu>

                <Question label="What role?" answered={chapter > 0 && role}>
                  <ChipRow items={["Product Designer","Software Engineer","Product Manager","Data / ML","Marketing","Sales","Other →"]} value={role} setValue={setRole} disabled={chapter > 0}/>
                </Question>

                <Question label="What level?" answered={chapter > 0 && level}>
                  <ChipRow items={["Entry","Mid","Senior","Staff","Lead"]} value={level} setValue={setLevel} disabled={chapter > 0}/>
                </Question>

                <Question label="What kind of work?" hint="pick all that count" answered={chapter > 0 && types.join(" + ")}>
                  <ChipRow items={["Fulltime","Part-time","Contractor","Internship"]} value={types} setValue={(v)=>toggleArr(types, setTypes, v)} multi disabled={chapter > 0}/>
                </Question>

                <Question label="Where?" answered={chapter > 0 && `${locMode} · ${region}`}>
                  <ChipRow items={["Remote","Hybrid","Onsite OK"]} value={locMode} setValue={setLocMode} disabled={chapter > 0}/>
                  <div style={{marginTop: 8}}>
                    <ChipRow soft items={["🌎 Anywhere","🇺🇸 US-only","🇪🇺 Europe","🌉 SF Bay","🏙 NYC","Other →"]} value={region} setValue={setRegion} disabled={chapter > 0}/>
                  </div>
                </Question>

                <Question label="Pay floor?" hint="I won't show you anything below it" answered={chapter > 0 && pay}>
                  <ChipRow items={["$80k+","$120k+","$150k+","$180k+","$220k+","not sure yet"]} value={pay} setValue={setPay} disabled={chapter > 0}/>
                </Question>

                {chapter === 0 && (
                  <ChapterCTA onNext={advance} label="Got it — next, your résumé"/>
                )}
              </>
            )}

            {/* ─────────────────────── CHAPTER 2 · RÉSUMÉ ────────────────── */}
            {chapter >= 1 && <ChapterMark idx={1} active={chapter === 1}/>}
            {chapter >= 1 && (
              <>
                <OSBu>Now drop your résumé — or paste your LinkedIn instead. I'll learn your story from it, <b>saves you 12+ form fields</b>.</OSBu>

                {/* Source toggle — résumé file OR LinkedIn URL */}
                {!resumeDropped && !resumeAnalyzing && (
                  <div style={{display:"flex", gap: 4, background: oT.cream, padding: 4, borderRadius: 12, alignSelf:"flex-start"}}>
                    {[{id:"resume", label:"📄 Upload résumé"}, {id:"linkedin", label:"🔗 Use LinkedIn URL"}].map(opt => (
                      <button key={opt.id} onClick={()=> chapter === 1 && setImportMode(opt.id)} style={{
                        padding:"8px 14px", borderRadius: 9, border:"none", cursor: chapter === 1 ? "pointer" : "default",
                        fontSize: 13, fontWeight: 700, fontFamily: oFB,
                        background: importMode === opt.id ? "#fff" : "transparent",
                        color: importMode === opt.id ? oT.ink : oT.muted,
                        boxShadow: importMode === opt.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}>{opt.label}</button>
                    ))}
                  </div>
                )}

                {/* Résumé drop zone */}
                {importMode === "resume" ? (
                  <div onClick={()=> !resumeDropped && !resumeAnalyzing && chapter === 1 && dropResume()} style={{
                    background: resumeDropped ? oT.mint : "#fff", borderRadius: 18, padding: 16,
                    border: `2px dashed ${resumeDropped ? oT.mintInk : (resumeAnalyzing ? oT.cyanInk : oT.hairline)}`,
                    display:"flex", alignItems:"center", gap: 14,
                    cursor: chapter === 1 && !resumeDropped && !resumeAnalyzing ? "pointer" : "default",
                    transition:"all 0.2s",
                  }}>
                    <div style={{width: 48, height: 48, borderRadius: 12, background: resumeDropped ? oT.mintInk : oT.cream, color: resumeDropped ? "#fff" : oT.ink, display:"grid", placeItems:"center", fontSize: 22, fontWeight: 800}}>
                      {resumeAnalyzing ? <span className="rotate">⟳</span> : resumeDropped ? "✓" : "↑"}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize: 15, fontWeight: 700, color: oT.ink}}>
                        {resumeAnalyzing ? "Reading your résumé…" : resumeDropped ? "Vinodh_Resume_2026.pdf" : "Drop résumé or click to upload"}
                      </div>
                      <div style={{fontSize: 12.5, color: oT.muted, fontWeight: 600, marginTop: 2}}>
                        {resumeAnalyzing ? "Extracting 12 fields…" : resumeDropped ? "Read it cover to cover. Here's what I learned →" : "PDF · DOCX · I read it in ~2 seconds"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: resumeDropped ? oT.mint : "#fff", borderRadius: 18, padding: 16,
                    border: `1.5px solid ${resumeDropped ? oT.mintInk : (resumeAnalyzing ? oT.cyanInk : oT.hairline)}`,
                    display:"flex", alignItems:"center", gap: 12, transition:"all 0.2s",
                  }}>
                    <div style={{width: 48, height: 48, borderRadius: 12, background: resumeDropped ? oT.mintInk : oT.cream, color: resumeDropped ? "#fff" : oT.ink, display:"grid", placeItems:"center", fontSize: 22, fontWeight: 800, flexShrink: 0}}>
                      {resumeAnalyzing ? <span className="rotate">⟳</span> : resumeDropped ? "✓" : "🔗"}
                    </div>
                    {resumeDropped ? (
                      <div style={{flex:1}}>
                        <div style={{fontSize: 15, fontWeight: 700, color: oT.ink}}>linkedin.com/in/vinodh</div>
                        <div style={{fontSize: 12.5, color: oT.muted, fontWeight: 600, marginTop: 2}}>Read your whole profile. Here's what I learned →</div>
                      </div>
                    ) : resumeAnalyzing ? (
                      <div style={{flex:1}}>
                        <div style={{fontSize: 15, fontWeight: 700, color: oT.ink}}>Reading your LinkedIn…</div>
                        <div style={{fontSize: 12.5, color: oT.muted, fontWeight: 600, marginTop: 2}}>Extracting 12 fields…</div>
                      </div>
                    ) : (
                      <>
                        <input value={liUrl} onChange={(e)=>setLiUrl(e.target.value)} placeholder="linkedin.com/in/yourname"
                               style={{flex:1, minWidth: 0, border:"none", outline:"none", background:"transparent", fontSize: 15, fontWeight: 600, color: oT.ink, fontFamily: oFB}}/>
                        <button onClick={()=> chapter === 1 && dropResume()} style={{padding:"10px 16px", borderRadius: 999, background: oT.ink, color:"#fff", border:"none", fontSize: 13.5, fontWeight: 700, cursor:"pointer", flexShrink: 0, fontFamily: oFB}}>Extract →</button>
                      </>
                    )}
                  </div>
                )}

                {/* Sprout's extraction card — the magic moment */}
                {resumeDropped && (
                  <>
                    <OSBu>
                      {importMode === "linkedin" ? "Great profile." : "Beautiful résumé."} <b>I pulled these — confirm with one tap.</b> If anything's off, just tap the answer to swap it.
                    </OSBu>
                    <ResumeFactsCard
                      facts={[
                        { k:"Current title",    v:"Visual Design Manager", icon:"💼", confidence:"high" },
                        { k:"Years of XP",      v:"6",                     icon:"📈", confidence:"high" },
                        { k:"Current location", v:"Chennai, India",        icon:"📍", confidence:"high" },
                        { k:"Current salary",   v:"~$95k (inferred)",      icon:"💰", confidence:"medium" },
                        { k:"Notice period",    v:"4 weeks",               icon:"⏰", confidence:"medium" },
                        { k:"Authorized in",    v:"India · OPEN to relocate", icon:"🌐", confidence:"medium" },
                        { k:"LinkedIn",         v:"linkedin.com/in/vinodh", icon:"🔗", confidence:"high" },
                        { k:"Languages",        v:"English · Tamil",       icon:"🗣", confidence:"high" },
                      ]}
                      overrides={resumeFacts}
                      onOverride={(k, v) => setRF(f => ({...f, [k]: v}))}
                      disabled={chapter > 1}
                    />

                    <div style={{display:"flex", gap: 10, alignItems:"center", padding:"10px 14px", background: oT.lilac, borderRadius: 14}}>
                      <span style={{fontSize: 18}}>✨</span>
                      <div style={{flex: 1, fontSize: 13, color: oT.ink, fontWeight: 500, lineHeight: 1.4}}>
                        Don't sweat the rest — phone, visa, nationality, exact salary expectations. <b>I'll ask you per app as a pill</b>, save your answer, and reuse it. No upfront form-filling.
                      </div>
                    </div>

                    {chapter === 1 && <ChapterCTA onNext={advance} label="Looks good — last step"/>}
                  </>
                )}
              </>
            )}

            {/* ─────────────────────── CHAPTER 3 · MODE ──────────────────── */}
            {chapter >= 2 && <ChapterMark idx={2} active={chapter === 2}/>}
            {chapter >= 2 && (
              <>
                <OSBu>Last one: <b>how much do you want me to just handle it?</b></OSBu>

                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 12}}>
                  <ModeMiniCard
                    selected={mode === "review"} onClick={()=>setMode("review")}
                    tint={oT.butter} icon="✋" badge="RECOMMENDED"
                    title="Review before send"
                    flow={["Find","Fill","You ✓","Sent"]} highlight="You ✓"
                    desc="I draft, you tap approve. ~90s per app."
                  />
                  <ModeMiniCard
                    selected={mode === "auto"} onClick={()=>setMode("auto")}
                    tint={oT.cyan} icon="🚀" badge="HANDS-OFF"
                    title="Full Auto Apply"
                    flow={["Find","Fill","Send"]} highlight="Send"
                    desc="I submit while you sleep. Recap in the morning."
                  />
                </div>

                <div style={{fontSize: 12.5, color: oT.muted, fontWeight: 600, textAlign:"center", padding:"4px 0"}}>
                  You can switch any time — even per individual job.
                </div>

                <div style={{display:"flex", justifyContent:"center", marginTop: 8}}>
                  <button onClick={()=>d({type:"FINISH_ONB", mode})}
                          style={{padding:"15px 28px", borderRadius: 999, background: oT.ink, color:"#fff", fontSize: 15, fontWeight: 700, border:"none", display:"inline-flex", alignItems:"center", gap: 10, cursor:"pointer"}}>
                    <OA size={22} cap={oT.cyan} mood="happy"/>
                    <span>Start Sprout — {mode === "auto" ? "Auto Apply" : "Review mode"} →</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .rotate { animation: spin 1.1s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function ChapterMark({ idx, active }) {
  const c = CHAPTERS[idx];
  return (
    <div style={{display:"flex", alignItems:"center", gap: 12, padding:"14px 0 6px", marginTop: idx > 0 ? 4 : 0}}>
      <div style={{
        width: 26, height: 26, borderRadius: 8,
        background: active ? oT.ink : oT.cyan,
        color: active ? "#fff" : oT.ink, display:"grid", placeItems:"center",
        fontWeight: 800, fontSize: 12, fontFamily: oFD,
      }}>{idx + 1}</div>
      <div style={{fontFamily: oFD, fontWeight: 700, fontSize: 14, color: oT.ink, letterSpacing:"-0.01em"}}>{c.icon} {c.label}</div>
      <div style={{flex: 1, height: 1, background: oT.hairline}}/>
      {!active && <div style={{fontSize: 11, fontWeight: 800, color: oT.cyanInk, letterSpacing:"0.04em"}}>✓ DONE</div>}
    </div>
  );
}

function Question({ label, hint, answered, children }) {
  return (
    <div style={{display:"flex", flexDirection:"column", gap: 8}}>
      <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", gap: 10}}>
        <div style={{fontSize: 13.5, fontWeight: 700, color: oT.ink, letterSpacing:"-0.01em"}}>
          {label} {hint && <span style={{fontWeight: 500, color: oT.muted, fontSize: 12.5}}>· {hint}</span>}
        </div>
        {answered && (
          <div style={{fontSize: 11.5, fontWeight: 700, color: oT.cyanInk, opacity: 0.8}}>✓ {typeof answered === "string" ? answered : "set"}</div>
        )}
      </div>
      {children}
    </div>
  );
}

function ChipRow({ items, value, setValue, multi, soft, disabled }) {
  return (
    <div style={{display:"flex", flexWrap:"wrap", gap: 6}}>
      {items.map(it => {
        const id  = typeof it === "string" ? it : it.id;
        const lab = typeof it === "string" ? it : it.label;
        const rec = typeof it === "object" && it.recommended;
        const selected = multi ? (value || []).includes(id) : value === id;
        return (
          <OSC key={id}
               onClick={()=> !disabled && setValue(id)}
               fill={selected ? (soft ? oT.cyan : oT.ink) : "#fff"}
               ink={selected && !soft ? "#fff" : oT.ink}
               size="md"
               style={{
                 cursor: disabled ? "default" : "pointer",
                 opacity: disabled ? 0.6 : 1,
                 border: selected ? "none" : `1.5px solid ${rec ? oT.cyanInk : oT.hairline}`,
                 fontWeight: 700,
               }}>
            {selected && "✓ "}{lab}{rec && !selected && <span style={{marginLeft: 4, fontSize: 10, color: oT.cyanInk, fontWeight: 800}}>· rec</span>}
          </OSC>
        );
      })}
    </div>
  );
}

function ChapterCTA({ onNext, label }) {
  return (
    <div style={{display:"flex", justifyContent:"flex-end", marginTop: 8}}>
      <button onClick={onNext} style={{padding:"12px 22px", borderRadius: 999, background: oT.ink, color:"#fff", fontSize: 14, fontWeight: 700, border:"none", cursor:"pointer"}}>
        {label} →
      </button>
    </div>
  );
}

function ResumeFactsCard({ facts, overrides, onOverride, disabled }) {
  return (
    <div style={{background:"#fff", borderRadius: 16, padding: 14, border:`1px solid ${oT.hairline}`, display:"flex", flexDirection:"column", gap: 4}}>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2px 4px 8px"}}>
        <div style={{display:"flex", alignItems:"center", gap: 8}}>
          <div style={{display:"flex", alignItems:"center", gap: 4, fontSize: 10.5, fontWeight: 800, color: oT.mintInk, letterSpacing:"0.06em"}}>● EXTRACTED FROM YOUR PROFILE</div>
        </div>
        <div style={{fontSize: 11, color: oT.muted, fontWeight: 700}}>{facts.length} fields · {Object.keys(overrides).length} edited</div>
      </div>
      {facts.map(f => {
        const overridden = overrides[f.k];
        const value = overridden || f.v;
        return (
          <div key={f.k} style={{
            display:"flex", alignItems:"center", gap: 12, padding:"10px 12px",
            background: overridden ? oT.butter : oT.cream,
            borderRadius: 10,
            cursor: disabled ? "default" : "pointer",
          }} onClick={()=> !disabled && onOverride(f.k, prompt(`What's your actual ${f.k.toLowerCase()}?`, value) || value)}>
            <span style={{fontSize: 16, width: 22, textAlign:"center"}}>{f.icon}</span>
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 11, fontWeight: 700, color: oT.muted, letterSpacing:"0.02em"}}>{f.k}</div>
              <div style={{fontSize: 13.5, fontWeight: 700, color: oT.ink, letterSpacing:"-0.005em"}}>{value}</div>
            </div>
            {f.confidence === "medium" && !overridden && (
              <span style={{fontSize: 10, fontWeight: 800, padding:"2px 6px", borderRadius: 99, background: "#fff", color: oT.muted, border:`1px solid ${oT.hairline}`}}>~ rough</span>
            )}
            {overridden && <span style={{fontSize: 11, fontWeight: 800, color: oT.butterInk}}>✎ EDITED</span>}
            {!disabled && !overridden && <span style={{fontSize: 12, color: oT.muted, opacity: 0.5}}>tap to fix</span>}
          </div>
        );
      })}
    </div>
  );
}

function ModeMiniCard({ selected, onClick, tint, icon, badge, title, flow, highlight, desc }) {
  return (
    <div onClick={onClick} style={{
      background: selected ? tint : "#fff", borderRadius: 18, padding: "16px 16px",
      border: selected ? `2px solid ${oT.ink}` : `1.5px solid ${oT.hairline}`,
      cursor:"pointer", display:"flex", flexDirection:"column", gap: 10, position:"relative",
      transition:"all 0.15s",
    }}>
      <div style={{display:"flex", alignItems:"center", gap: 8}}>
        <div style={{fontSize: 22}}>{icon}</div>
        <div style={{padding:"2px 8px", borderRadius: 999, background: selected ? "rgba(255,255,255,0.5)" : oT.cream, fontSize: 10, fontWeight: 800, color: oT.ink, letterSpacing:"0.04em"}}>{badge}</div>
        {selected && <div style={{marginLeft:"auto", width: 22, height: 22, borderRadius:"50%", background: oT.ink, color:"#fff", display:"grid", placeItems:"center", fontSize: 12, fontWeight: 800}}>✓</div>}
      </div>
      <div style={{fontFamily: oFD, fontWeight: 700, fontSize: 19, color: oT.ink, letterSpacing:"-0.025em"}}>{title}</div>
      <div style={{display:"flex", alignItems:"center", gap: 4, fontSize: 10.5, fontWeight: 800, color: oT.ink}}>
        {flow.map((s, i) => (
          <React.Fragment key={i}>
            <span style={{padding:"3px 7px", background: s === highlight ? "#fff" : "rgba(2,47,54,0.06)", borderRadius: 6, border: s === highlight ? `1.2px solid ${oT.ink}` : "1.2px solid transparent"}}>{s}</span>
            {i < flow.length - 1 && <span style={{opacity: 0.4}}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{fontSize: 12.5, color: oT.ink, opacity: 0.7, fontWeight: 600, lineHeight: 1.4}}>{desc}</div>
    </div>
  );
}

function previewText(tones, length) {
  const t = tones[0] || "Warm";
  if (length === "punchy") {
    return `"${t === "Witty" ? "Saw the role." : "Hi Linear team."} I built a Linear knockoff at Headspace. It cut grooming time in half. I want to do that here."`;
  }
  if (length === "detailed") {
    return `"Hey Linear team — I've been a power-user since 2022 and built a Linear-inspired triage tool at Headspace that cut PM grooming time in half. The craft bar your team holds is what made me reach out. I'd love to bring my track record of shipping ${t.toLowerCase()} interfaces to a product I already love…"`;
  }
  return `"Hey Linear team — I built a Linear-inspired triage tool at Headspace that cut PM grooming time in half. I'd love to push the craft bar even higher with your team."`;
}

Object.assign(window, { ProtoOnboarding });
