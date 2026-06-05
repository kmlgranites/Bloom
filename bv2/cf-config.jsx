// Sprout config wizard, activation/loading screen, pricing
const { cfTokens: cfT2, CFButton: CFB2, CFChip: CFCh, CFCard: CFC2, CFLogo: CFL2, CFMascot: CFM2, CFTopNav: CFTN } = window;

// ============================================================
// 2A. CONFIG WIZARD — Step 1: Location + Job types + Titles
// ============================================================
function CFConfigStep1({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT2.page, display:"flex", flexDirection:"column"}}>
      <CFTN active="sprouts" agentLabel={agentLabel + "s"}/>
      <div style={{flex:1, overflow:"auto", padding:"32px 40px 48px"}}>
        {/* Step header */}
        <div style={{maxWidth:760, margin:"0 auto"}}>
          <CFStepper current={1}/>
          <div style={{textAlign:"center", margin:"24px 0 32px"}}>
            <h1 style={{
              fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
              fontSize:30, fontWeight:700, color: cfT2.brand, marginBottom:8, letterSpacing:"-0.02em",
            }}>What kind of role are you looking for?</h1>
            <p style={{fontSize:15, color: cfT2.muted}}>
              Your {agentLabel.toLowerCase()} will only apply to jobs that match these basics.
            </p>
          </div>

          <CFC2 padding={32}>
            <CFFieldGroup label="Work Location" sub="Remote, on-site, or both?">
              <div style={{display:"flex", gap:14, marginBottom:14}}>
                <ToggleRow icon="world" label="Remote jobs" active/>
                <ToggleRow icon="building" label="On-site / Hybrid" />
              </div>
              <div style={{
                background: cfT2.input, border:`1px solid ${cfT2.border}`, borderRadius:10,
                padding:"10px 12px", display:"flex", flexWrap:"wrap", gap:8,
              }}>
                <TagPill label="Worldwide" onRemove/>
                <span style={{color: cfT2.placeholder, fontSize:14, alignSelf:"center"}}>
                  Add countries or "Worldwide"
                </span>
              </div>
            </CFFieldGroup>

            <Divider/>

            <CFFieldGroup label="Job Types" sub="Select at least one">
              <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                <CFCh active icon="briefcase">Full-time</CFCh>
                <CFCh icon="clock">Part-time</CFCh>
                <CFCh icon="user">Contract</CFCh>
                <CFCh icon="school">Internship</CFCh>
              </div>
            </CFFieldGroup>

            <Divider/>

            <CFFieldGroup label="What should we search for?" sub="Pick how your sprout finds jobs">
              <div style={{
                display:"flex", background: cfT2.input, borderRadius:9999, padding:4, gap:4, marginBottom:14,
                width:"fit-content",
              }}>
                <TabPill icon="search" active>Job title keywords</TabPill>
                <TabPill icon="heart">Favorited jobs</TabPill>
                <TabPill icon="checklist">Past applications</TabPill>
              </div>
              <div style={{fontSize:13, color: cfT2.muted, marginBottom:10}}>
                Type up to 5 job titles — your sprout will search across all of them.
              </div>
              <div style={{
                background: cfT2.input, border:`1px solid ${cfT2.border}`, borderRadius:10,
                padding:"10px 12px", display:"flex", flexWrap:"wrap", gap:8,
              }}>
                <TagPill label="Product Manager"/>
                <TagPill label="Senior PM"/>
                <TagPill label="Growth PM"/>
                <span style={{color: cfT2.placeholder, fontSize:14, alignSelf:"center"}}>
                  Add another title…
                </span>
              </div>
            </CFFieldGroup>
          </CFC2>

          <div style={{display:"flex", justifyContent:"space-between", marginTop:24}}>
            <CFB2 variant="ghost">← Back</CFB2>
            <CFB2 variant="primary" size="lg" iconRight="arrow-right">Next: Filters</CFB2>
          </div>
        </div>
      </div>
    </div>
  );
}
window.CFConfigStep1 = CFConfigStep1;

// ============================================================
// 2B. CONFIG WIZARD — Step 2: Filters, match strength, autonomy
// ============================================================
function CFConfigStep2({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT2.page, display:"flex", flexDirection:"column"}}>
      <CFTN active="sprouts" agentLabel={agentLabel + "s"}/>
      <div style={{flex:1, overflow:"auto", padding:"32px 40px 48px"}}>
        <div style={{maxWidth:760, margin:"0 auto"}}>
          <CFStepper current={2}/>
          <div style={{textAlign:"center", margin:"24px 0 32px"}}>
            <h1 style={{
              fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
              fontSize:30, fontWeight:700, color: cfT2.brand, marginBottom:8, letterSpacing:"-0.02em",
            }}>How picky should your {agentLabel.toLowerCase()} be?</h1>
            <p style={{fontSize:15, color: cfT2.muted}}>
              Narrow your search — or leave it broad to catch more jobs.
            </p>
          </div>

          <CFC2 padding={32}>
            {/* Job match */}
            <div style={{
              background: cfT2.cyanLight, borderRadius:14, padding:20, marginBottom:24,
              border:`1px solid ${cfT2.cyan}40`,
            }}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <i className="ti ti-target" style={{fontSize:20, color: cfT2.brand}}/>
                  <div style={{fontWeight:700, color: cfT2.brand, fontSize:16}}>Match Strength</div>
                </div>
                <Toggle on/>
              </div>
              <div style={{fontSize:14, color: cfT2.brand, marginBottom:18, opacity:0.85}}>
                💡 Only apply to jobs where you meet <b>more than half</b> the key requirements.
              </div>
              <div style={{position:"relative", padding:"0 4px"}}>
                <div style={{height:6, background:"#fff", borderRadius:999, position:"relative"}}>
                  <div style={{position:"absolute", left:0, top:0, height:6, width:"35%", background: cfT2.primary, borderRadius:999}}/>
                  <div style={{
                    position:"absolute", left:"35%", top:-7, width:20, height:20,
                    borderRadius:"50%", background: cfT2.brand, transform:"translateX(-50%)",
                  }}/>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:14, fontSize:13, color: cfT2.muted}}>
                  <span><b style={{color: cfT2.text}}>High</b> · 50%+ match</span>
                  <span>Higher · 70%+</span>
                  <span>Highest · 90%+</span>
                </div>
              </div>
            </div>

            <CFFieldGroup label="Seniority" sub="Optional — leave blank for all levels">
              <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                <CFCh icon="user">Entry</CFCh>
                <CFCh icon="user">Associate</CFCh>
                <CFCh active icon="check">Mid–Senior</CFCh>
                <CFCh active icon="check">Director+</CFCh>
              </div>
            </CFFieldGroup>

            <Divider/>

            <CFFieldGroup label="Industry" sub="Optional — leave blank for all">
              <div style={{
                background: cfT2.input, border:`1px solid ${cfT2.border}`, borderRadius:10,
                padding:"10px 12px", display:"flex", flexWrap:"wrap", gap:8,
              }}>
                <TagPill label="Software / IT" filled/>
                <TagPill label="Fintech" filled/>
                <TagPill label="SaaS" filled/>
                <span style={{color: cfT2.placeholder, fontSize:14, alignSelf:"center"}}>
                  Add an industry…
                </span>
              </div>
              <label style={{display:"flex", alignItems:"center", gap:8, marginTop:12, fontSize:13, color: cfT2.muted}}>
                <input type="checkbox" defaultChecked style={{width:16, height:16}}/>
                Also include jobs without industry info
              </label>
            </CFFieldGroup>

            <Divider/>

            {/* NEW Bloom-only feature: Autonomy control */}
            <CFFieldGroup
              label={<span>How autonomous should your {agentLabel.toLowerCase()} be? <span style={{
                fontSize:11, marginLeft:8, padding:"2px 8px", borderRadius:999,
                background: cfT2.orange, color:"#fff", fontWeight:700, letterSpacing:"0.04em"
              }}>BLOOM EXCLUSIVE</span></span>}
              sub="Bloom-only: balance speed vs. control"
            >
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12}}>
                <AutonomyCard
                  active
                  icon="bolt"
                  title="Full auto"
                  desc="Apply to anything matching. Fastest results."
                  meta="~40 / day"
                />
                <AutonomyCard
                  icon="eye"
                  title="Review high-stakes"
                  desc="Auto-apply to most, ask before sending to top companies."
                  meta="~25 / day"
                />
                <AutonomyCard
                  icon="hand-stop"
                  title="Approve each"
                  desc="Notify before every application. Full control."
                  meta="On-demand"
                />
              </div>
            </CFFieldGroup>
          </CFC2>

          <div style={{display:"flex", justifyContent:"space-between", marginTop:24}}>
            <CFB2 variant="ghost">← Back</CFB2>
            <CFB2 variant="primary" size="lg" iconRight="arrow-right">Next: Profile</CFB2>
          </div>
        </div>
      </div>
    </div>
  );
}
window.CFConfigStep2 = CFConfigStep2;

// ============================================================
// 2C. CONFIG WIZARD — Step 3: Resume + screening
// ============================================================
function CFConfigStep3({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT2.page, display:"flex", flexDirection:"column"}}>
      <CFTN active="sprouts" agentLabel={agentLabel + "s"}/>
      <div style={{flex:1, overflow:"auto", padding:"32px 40px 48px"}}>
        <div style={{maxWidth:760, margin:"0 auto"}}>
          <CFStepper current={3}/>
          <div style={{textAlign:"center", margin:"24px 0 32px"}}>
            <h1 style={{
              fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
              fontSize:30, fontWeight:700, color: cfT2.brand, marginBottom:8, letterSpacing:"-0.02em",
            }}>Help your {agentLabel.toLowerCase()} sound like you</h1>
            <p style={{fontSize:15, color: cfT2.muted}}>
              Upload your resume — we'll pre-fill the common questions so you don't repeat yourself.
            </p>
          </div>

          <CFC2 padding={32}>
            <CFFieldGroup label="Resume" sub="We'll tailor it per job — keep the original">
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"14px 16px", border:`1px solid ${cfT2.border}`, borderRadius:12, background: cfT2.input,
              }}>
                <div style={{display:"flex", alignItems:"center", gap:12}}>
                  <div style={{
                    width:40, height:40, borderRadius:10, background:"#FFE9DD",
                    color: cfT2.orange, display:"grid", placeItems:"center",
                  }}><i className="ti ti-file-text" style={{fontSize:20}}/></div>
                  <div>
                    <div style={{fontSize:14, fontWeight:700, color: cfT2.text}}>vinodh-resume.pdf</div>
                    <div style={{fontSize:12, color: cfT2.muted}}>2.4 MB · uploaded just now</div>
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:6}}>
                  <Badge color={cfT2.green} text="Looks great"/>
                  <button style={{
                    fontSize:13, color: cfT2.muted, background:"none", border:"none", cursor:"pointer",
                  }}>Replace</button>
                </div>
              </div>
              <div style={{display:"flex", gap:8, marginTop:10}}>
                <ScoreChip label="Length" status="good"/>
                <ScoreChip label="Content" status="good"/>
                <ScoreChip label="ATS-friendly" status="good"/>
                <ScoreChip label="Keywords" status="warn" hint="3 missing"/>
              </div>
            </CFFieldGroup>

            <Divider/>

            <CFFieldGroup label="Cover letter" sub="Required by ~30% of applications">
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
                <OptionCard
                  active
                  icon="sparkles"
                  title="Generate per job"
                  desc="Tailored to each role automatically — recommended"
                />
                <OptionCard
                  icon="file-upload"
                  title="Upload one generic"
                  desc="Use the same cover letter for every application"
                />
              </div>
            </CFFieldGroup>

            <Divider/>

            <CFFieldGroup
              label="Screening answers"
              sub="These are common ATS questions. Your sprout reuses them for every job."
            >
              <ScreenQ q="Are you legally authorized to work in India?" a="Yes" />
              <ScreenQ q="Do you require visa sponsorship?" a="No" />
              <ScreenQ q="What's your expected yearly salary (INR)?" a="₹ 24,00,000" />
              <ScreenQ q="Notice period / availability?" a="2 weeks" />
              <ScreenQ q="Years of experience in Product Management?" a="6 years" />
              <div style={{
                display:"flex", alignItems:"center", gap:8, padding:"10px 14px",
                background: cfT2.cyanLight, borderRadius:10, fontSize:13, color: cfT2.brand,
                marginTop:6, fontWeight:600,
              }}>
                <i className="ti ti-info-circle" style={{fontSize:15}}/>
                12 more questions auto-filled from your resume. Tap to review.
              </div>
            </CFFieldGroup>
          </CFC2>

          <div style={{display:"flex", justifyContent:"space-between", marginTop:24}}>
            <CFB2 variant="ghost">← Back</CFB2>
            <CFB2 variant="cta" size="lg" iconRight="sparkles">Activate my {agentLabel.toLowerCase()}</CFB2>
          </div>
        </div>
      </div>
    </div>
  );
}
window.CFConfigStep3 = CFConfigStep3;

// ============================================================
// 2D. ACTIVATION / LOADING SCREEN — Sprout coming to life
// ============================================================
function CFActivating({ agentLabel = "Sprout" }) {
  const lines = [
    { i:"check", t:"Profile saved", done:true },
    { i:"check", t:"Resume parsed — found 14 skills", done:true },
    { i:"check", t:"Screening answers locked in", done:true },
    { i:"loader-2", t:"Scanning 12,400 jobs across 50+ sources…", running:true },
    { i:"circle-dashed", t:"Tailoring resume templates", pending:true },
    { i:"circle-dashed", t:"Activating auto-apply engine", pending:true },
  ];
  return (
    <div style={{
      height:"100%", background: cfT2.brand, color:"#fff",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"40px 60px", position:"relative", overflow:"hidden",
    }}>
      {/* glow */}
      <div style={{
        position:"absolute", width:600, height:600, borderRadius:"50%",
        background:`radial-gradient(circle, ${cfT2.cyan}20 0%, transparent 70%)`,
        filter:"blur(40px)", top:"-20%", left:"50%", transform:"translateX(-50%)",
      }}/>

      <div style={{position:"relative", marginBottom:36, animation:"bv2pulse 2s ease-in-out infinite"}}>
        <CFM2 size={140} eyes="sparkle"/>
      </div>

      <div style={{
        fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
        fontSize:38, fontWeight:700, marginBottom:10, textAlign:"center", letterSpacing:"-0.02em",
      }}>
        Your {agentLabel.toLowerCase()} is coming to life…
      </div>
      <div style={{fontSize:15, opacity:0.65, marginBottom:40, textAlign:"center", maxWidth:520}}>
        This takes about 20 seconds. We're getting everything ready.
      </div>

      <div style={{
        background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)",
        borderRadius:16, padding:24, width:"100%", maxWidth:560,
      }}>
        {lines.map((l, idx) => (
          <div key={idx} style={{
            display:"flex", alignItems:"center", gap:14, padding:"10px 0",
            opacity: l.pending ? 0.4 : 1,
            color: l.done ? cfT2.cyan : "#fff",
            fontSize:15, fontWeight: l.running ? 700 : 500,
          }}>
            <i className={`ti ti-${l.i}`} style={{
              fontSize:20,
              animation: l.running ? "bv2spin 1.2s linear infinite" : "none",
            }}/>
            <span>{l.t}</span>
            {l.running && (
              <span style={{marginLeft:"auto", display:"inline-flex", gap:4}}>
                <Dot/><Dot d=".15s"/><Dot d=".3s"/>
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{marginTop:32, fontSize:13, opacity:0.5}}>
        Tip: You can name your {agentLabel.toLowerCase()} once it's active.
      </div>
    </div>
  );
}
function Dot({ d="0s" }) {
  return <span style={{
    width:6, height:6, borderRadius:"50%", background: cfT2.cyan,
    animation:`bv2pulse 1s ease-in-out ${d} infinite`,
  }}/>;
}
window.CFActivating = CFActivating;

// ============================================================
// 2E. PRICING — Choose plan to start applying
// ============================================================
function CFPricing({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT2.page, overflow:"auto"}}>
      <CFTN active="sprouts" agentLabel={agentLabel + "s"}/>
      <div style={{padding:"32px 40px 60px", maxWidth:1080, margin:"0 auto"}}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px",
          background:`${cfT2.green}1F`, color: cfT2.green, borderRadius:9999,
          fontSize:13, fontWeight:700, marginBottom:14,
        }}>
          <i className="ti ti-circle-check" style={{fontSize:15}}/>
          {agentLabel} configured · 383 matching jobs found
        </div>
        <h1 style={{
          fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
          fontSize:38, fontWeight:700, color: cfT2.brand, marginBottom:8, letterSpacing:"-0.02em",
        }}>
          Activate your {agentLabel.toLowerCase()} and start applying today
        </h1>
        <p style={{fontSize:16, color: cfT2.muted, marginBottom:24}}>
          Pick a plan to release your {agentLabel.toLowerCase()}. Cancel anytime — no commitment.
        </p>

        <div style={{
          display:"inline-flex", padding:4, background:"#fff", border:`1px solid ${cfT2.border}`,
          borderRadius:9999, marginBottom:32,
        }}>
          <PeriodPill>Weekly</PeriodPill>
          <PeriodPill active>Monthly · save 30%</PeriodPill>
          <PeriodPill>Quarterly · save 40%</PeriodPill>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20}}>
          <PlanCard
            name="Starter"
            price="₹599"
            period="/ week"
            sub="Try Bloom risk-free"
            features={["1 active "+agentLabel.toLowerCase(),"Up to 10 applies / day","Resume + cover letter builder","Application tracker"]}
            cta="Start free trial"
            ctaVariant="outline"
          />
          <PlanCard
            featured
            name="Premium"
            price="₹1,599"
            period="/ month"
            sub="Most popular · best value"
            features={[
              "2 active "+agentLabel.toLowerCase()+"s",
              "Up to 40 applies / day",
              "Tailored resume per job",
              "Daily digest emails",
              "Application tracker",
              "Hiring manager contacts",
            ]}
            cta="Activate Premium"
            ctaVariant="cta"
          />
          <PlanCard
            name="Elite"
            price="₹2,399"
            period="/ month"
            sub="For aggressive job hunts"
            features={[
              "5 active "+agentLabel.toLowerCase()+"s",
              "Up to 100 applies / day",
              "Priority job sources",
              "AI interview prep",
              "1:1 onboarding call",
            ]}
            cta="Activate Elite"
            ctaVariant="primary"
          />
        </div>

        <div style={{display:"flex", justifyContent:"center", gap:32, marginTop:32, color: cfT2.muted, fontSize:13}}>
          <span><i className="ti ti-shield-check" style={{marginRight:6}}/>No commitment</span>
          <span><i className="ti ti-credit-card" style={{marginRight:6}}/>Secure payments</span>
          <span><i className="ti ti-x-circle" style={{marginRight:6}}/>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
window.CFPricing = CFPricing;

// ============================================================
// Helpers
// ============================================================
function CFStepper({ current = 1 }) {
  return (
    <div style={{display:"flex", justifyContent:"center", gap:12, alignItems:"center"}}>
      {[1,2,3].map(n => (
        <div key={n} style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{
            width:32, height:32, borderRadius:"50%",
            background: n <= current ? cfT2.primary : cfT2.input,
            color: n <= current ? "#fff" : cfT2.muted,
            display:"grid", placeItems:"center", fontWeight:700, fontSize:14,
            border: n === current ? `2px solid ${cfT2.cyan}` : "none",
          }}>{n < current ? "✓" : n}</div>
          {n < 3 && <div style={{width:48, height:2, background: n < current ? cfT2.primary : cfT2.border}}/>}
        </div>
      ))}
    </div>
  );
}
function CFFieldGroup({ label, sub, children }) {
  return (
    <div style={{marginBottom:4}}>
      <div style={{fontSize:17, fontWeight:700, color: cfT2.text, marginBottom:4}}>{label}</div>
      {sub && <div style={{fontSize:13, color: cfT2.muted, marginBottom:14}}>{sub}</div>}
      {children}
    </div>
  );
}
function Divider() {
  return <div style={{height:1, background: cfT2.borderLight, margin:"24px 0"}}/>;
}
function ToggleRow({ icon, label, active }) {
  return (
    <div style={{
      flex:1, display:"flex", alignItems:"center", gap:12, padding:"14px 16px",
      border: active ? `2px solid ${cfT2.primary}` : `1px solid ${cfT2.border}`,
      borderRadius:12, background: active ? cfT2.cyanLight : "#fff", cursor:"pointer",
    }}>
      <div style={{
        width:34, height:34, borderRadius:8, background: active ? cfT2.primary : cfT2.input,
        color: active ? "#fff" : cfT2.muted, display:"grid", placeItems:"center",
      }}><i className={`ti ti-${icon}`} style={{fontSize:18}}/></div>
      <div style={{fontWeight:600, color: cfT2.text}}>{label}</div>
      <div style={{marginLeft:"auto"}}>
        <Toggle on={active}/>
      </div>
    </div>
  );
}
function Toggle({ on }) {
  return (
    <div style={{
      width:42, height:24, borderRadius:9999, background: on ? cfT2.primary : "#CBD3D6",
      position:"relative", transition:"background .2s",
    }}>
      <div style={{
        position:"absolute", top:2, left: on ? 20 : 2, width:20, height:20, borderRadius:"50%",
        background:"#fff", transition:"left .2s", boxShadow:"0 1px 2px rgba(0,0,0,.2)",
      }}/>
    </div>
  );
}
function TabPill({ icon, active, children }) {
  return (
    <button style={{
      padding:"8px 16px", borderRadius:9999, fontSize:14, fontWeight:600,
      background: active ? "#fff" : "transparent", color: active ? cfT2.brand : cfT2.muted,
      border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6,
      boxShadow: active ? "0 1px 2px rgba(0,0,0,.06)" : "none", fontFamily:"inherit",
    }}>
      {icon && <i className={`ti ti-${icon}`} style={{fontSize:15}}/>}
      {children}
    </button>
  );
}
function TagPill({ label, filled, onRemove }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:9999,
      background: filled ? cfT2.primary : "#fff", color: filled ? "#fff" : cfT2.text,
      border: filled ? "none" : `1px solid ${cfT2.border}`,
      fontSize:13, fontWeight:600,
    }}>
      {label}
      {onRemove && <i className="ti ti-x" style={{fontSize:13, opacity:0.7, cursor:"pointer"}}/>}
    </span>
  );
}
function AutonomyCard({ active, icon, title, desc, meta }) {
  return (
    <div style={{
      padding:18, borderRadius:14,
      border: active ? `2px solid ${cfT2.primary}` : `1px solid ${cfT2.border}`,
      background: active ? cfT2.cyanLight : "#fff", cursor:"pointer", position:"relative",
    }}>
      {active && (
        <div style={{
          position:"absolute", top:10, right:10, width:22, height:22, borderRadius:"50%",
          background: cfT2.primary, color:"#fff", display:"grid", placeItems:"center", fontSize:12,
        }}>✓</div>
      )}
      <div style={{
        width:36, height:36, borderRadius:10, background: active ? cfT2.primary : cfT2.input,
        color: active ? "#fff" : cfT2.brand, display:"grid", placeItems:"center", marginBottom:10,
      }}><i className={`ti ti-${icon}`} style={{fontSize:18}}/></div>
      <div style={{fontWeight:700, fontSize:15, color: cfT2.text, marginBottom:4}}>{title}</div>
      <div style={{fontSize:13, color: cfT2.muted, lineHeight:1.4, marginBottom:10}}>{desc}</div>
      <div style={{fontSize:12, fontWeight:700, color: cfT2.brand}}>{meta}</div>
    </div>
  );
}
function OptionCard({ active, icon, title, desc }) {
  return (
    <div style={{
      padding:18, borderRadius:14,
      border: active ? `2px solid ${cfT2.primary}` : `1px solid ${cfT2.border}`,
      background: active ? cfT2.cyanLight : "#fff", cursor:"pointer", display:"flex", gap:14, alignItems:"flex-start",
    }}>
      <div style={{
        width:36, height:36, borderRadius:10, background: active ? cfT2.primary : cfT2.input,
        color: active ? "#fff" : cfT2.brand, display:"grid", placeItems:"center", flexShrink:0,
      }}><i className={`ti ti-${icon}`} style={{fontSize:18}}/></div>
      <div>
        <div style={{fontWeight:700, fontSize:15, color: cfT2.text, marginBottom:2}}>{title}</div>
        <div style={{fontSize:13, color: cfT2.muted, lineHeight:1.4}}>{desc}</div>
      </div>
    </div>
  );
}
function Badge({ color, text }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:9999,
      background:`${color}1F`, color, fontSize:12, fontWeight:700,
    }}>
      <i className="ti ti-circle-check-filled" style={{fontSize:12}}/>{text}
    </span>
  );
}
function ScoreChip({ label, status, hint }) {
  const c = status === "good" ? cfT2.green : status === "warn" ? cfT2.orange : cfT2.muted;
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:6, padding:"6px 12px",
      background:`${c}14`, color: c, borderRadius:9999, fontSize:12, fontWeight:700,
    }}>
      <i className={`ti ti-${status === "good" ? "circle-check" : "alert-circle"}`} style={{fontSize:13}}/>
      {label} {hint && <span style={{opacity:0.7, fontWeight:500}}>· {hint}</span>}
    </div>
  );
}
function ScreenQ({ q, a }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"12px 14px", borderBottom:`1px solid ${cfT2.borderLight}`,
    }}>
      <div style={{fontSize:14, color: cfT2.text, fontWeight:500}}>{q}</div>
      <div style={{display:"flex", alignItems:"center", gap:10}}>
        <div style={{
          fontSize:13, color: cfT2.text, fontWeight:600,
          padding:"6px 12px", background: cfT2.input, borderRadius:8,
        }}>{a}</div>
        <i className="ti ti-pencil" style={{color: cfT2.muted, cursor:"pointer", fontSize:15}}/>
      </div>
    </div>
  );
}
function PeriodPill({ active, children }) {
  return (
    <div style={{
      padding:"10px 20px", borderRadius:9999, fontSize:14, fontWeight:600,
      background: active ? cfT2.brand : "transparent", color: active ? "#fff" : cfT2.muted, cursor:"pointer",
    }}>{children}</div>
  );
}
function PlanCard({ name, price, period, sub, features, cta, ctaVariant, featured }) {
  return (
    <div style={{
      position:"relative", padding:28, borderRadius:18, background:"#fff",
      border: featured ? `2px solid ${cfT2.orange}` : `1px solid ${cfT2.border}`,
      boxShadow: featured ? "0 12px 28px rgba(247,102,56,.12)" : "0 2px 4px rgba(0,0,0,.04)",
    }}>
      {featured && (
        <div style={{
          position:"absolute", top:-12, left:20, padding:"4px 12px", borderRadius:9999,
          background: cfT2.orange, color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"0.04em",
          textTransform:"uppercase",
        }}>Most popular</div>
      )}
      <div style={{fontSize:14, fontWeight:700, color: featured ? cfT2.orange : cfT2.muted, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase"}}>
        {name}
      </div>
      <div style={{display:"flex", alignItems:"baseline", gap:6, marginBottom:6}}>
        <div style={{
          fontFamily:"'Filson Soft','Proxima Soft',sans-serif",
          fontSize:36, fontWeight:700, color: cfT2.brand, letterSpacing:"-0.02em",
        }}>{price}</div>
        <div style={{fontSize:13, color: cfT2.muted}}>{period}</div>
      </div>
      <div style={{fontSize:13, color: cfT2.muted, marginBottom:18}}>{sub}</div>
      <CFB2 variant={ctaVariant} size="md" style={{width:"100%", marginBottom:18}}>{cta}</CFB2>
      <div style={{display:"flex", flexDirection:"column", gap:10}}>
        {features.map(f => (
          <div key={f} style={{display:"flex", gap:8, alignItems:"flex-start", fontSize:13.5, color: cfT2.text}}>
            <i className="ti ti-circle-check-filled" style={{color: cfT2.green, fontSize:16, flexShrink:0, marginTop:1}}/>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
