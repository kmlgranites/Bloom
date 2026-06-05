// Main app screens: Sprout dashboard, Applications tracker, Application review
const { cfTokens: cfT3, CFButton: CFB3, CFCard: CFC3, CFLogo: CFL3, CFMascot: CFM3, CFTopNav: CFTN3, CFChip: CFCh3 } = window;

// ============================================================
// 3A. SPROUT DASHBOARD — landing after activation
// ============================================================
function CFSproutDashboard({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT3.page, display:"flex", flexDirection:"column"}}>
      <CFTN3 active="sprouts" agentLabel={agentLabel + "s"}/>
      <div style={{flex:1, overflow:"auto", padding:"28px 40px 40px"}}>
        {/* Greeting + summary */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
          <div>
            <h1 style={{
              fontFamily:"'Filson Soft','Proxima Soft',sans-serif", fontSize:28, fontWeight:700,
              color: cfT3.brand, letterSpacing:"-0.02em", marginBottom:4,
            }}>
              👋 Welcome back, Vinodh
            </h1>
            <p style={{fontSize:14, color: cfT3.muted}}>
              While you were away, your {agentLabel.toLowerCase()}s applied to <b style={{color: cfT3.text}}>47 jobs</b> and
              got <b style={{color: cfT3.green}}>3 replies</b>.
            </p>
          </div>
          <CFB3 variant="primary" icon="plus">New {agentLabel.toLowerCase()}</CFB3>
        </div>

        {/* Stats strip */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28}}>
          <StatCard label="Applied this week" value="266" icon="send" trend="+47" color={cfT3.primary}/>
          <StatCard label="Replies" value="12" icon="mail-opened" trend="+3" color={cfT3.green}/>
          <StatCard label="Interviews scheduled" value="2" icon="calendar" color={cfT3.orange}/>
          <StatCard label="Active sprouts" value="2 of 2" icon="plant-2" color={cfT3.brand}/>
        </div>

        {/* Sprout cards */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
          <h2 style={{fontSize:18, fontWeight:700, color: cfT3.text}}>Your {agentLabel.toLowerCase()}s</h2>
          <span style={{fontSize:13, color: cfT3.muted}}>2 active · Premium plan</span>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:32}}>
          <SproutCard
            agentLabel={agentLabel}
            name="Product roles · Remote"
            mascotEyes="happy"
            status="active"
            mode="Full auto"
            matched={383}
            todayApplied={24}
            quota={40}
            location="Worldwide · Remote"
            titles={["Product Manager","Senior PM","Growth PM"]}
            seniority="Mid–Senior"
          />
          <SproutCard
            agentLabel={agentLabel}
            name="Director+ · India only"
            mascotEyes="thinking"
            status="paused"
            mode="Review high-stakes"
            matched={48}
            todayApplied={0}
            quota={20}
            location="India · Remote / Hybrid"
            titles={["Director of Product","VP Product"]}
            seniority="Director+"
          />
        </div>

        {/* Recent activity */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
          <h2 style={{fontSize:18, fontWeight:700, color: cfT3.text}}>Today's activity</h2>
          <a style={{fontSize:13, fontWeight:600, color: cfT3.primary}}>View all →</a>
        </div>
        <CFC3 padding={0}>
          <ActivityRow
            icon="send" iconBg={cfT3.primary}
            title="Sprout applied to 5 jobs"
            sub="Confluent, Plaid, Notion, Linear, Figma · 12 min ago"
            badge="Auto"/>
          <ActivityRow
            icon="mail" iconBg={cfT3.green}
            title="Plaid replied to your application"
            sub="Senior PM, Growth · 2 hours ago"
            badge="Reply" badgeColor={cfT3.green}/>
          <ActivityRow
            icon="alert-circle" iconBg={cfT3.orange}
            title="2 applications need your input"
            sub="Custom questions your sprout couldn't answer · today"
            cta="Review now"/>
          <ActivityRow last
            icon="calendar" iconBg={cfT3.brand}
            title="Interview booked with Stripe"
            sub="Friday, 3pm IST · Senior PM Growth"
            badge="Interview" badgeColor={cfT3.brand}/>
        </CFC3>
      </div>
    </div>
  );
}
window.CFSproutDashboard = CFSproutDashboard;

// ============================================================
// 3B. APPLICATIONS TRACKER — Kanban columns
// ============================================================
function CFApplicationsTracker({ agentLabel = "Sprout", showSaved = false }) {
  const columns = [
    showSaved && { id:"saved", title:"Saved", icon:"bookmark", color: cfT3.muted, count:11, items:[
      { title:"Head of Product Led Growth", company:"Confluent", logo:"C", color:"#3D7CE3", action:"Finish application" },
      { title:"Growth Marketing Director", company:"Bluzinc", logo:"B", color:"#22A06B", action:"Finish application" },
      { title:"Talent Acquisition Lead", company:"Forager", logo:"F", color:"#F46036" },
    ]},
    { id:"applied", title:"Applied", icon:"send", color: cfT3.primary, count:302, items:[
      { title:"Head of Product Led Growth", company:"Confluent", logo:"C", color:"#3D7CE3", date:"Today", auto:true },
      { title:"Content & Growth Strategist", company:"Pod Network", logo:"P", color:"#22A06B", date:"Today", auto:true },
      { title:"Growth Marketer", company:"Tellos", logo:"T", color:"#8B5CF6", date:"Yesterday", auto:true },
      { title:"Head of Growth", company:"Flux", logo:"F", color:"#0EA5E9", date:"Yesterday", auto:true },
    ]},
    { id:"replied", title:"Replied", icon:"mail-opened", color: cfT3.green, count:12, items:[
      { title:"Senior PM Growth", company:"Plaid", logo:"P", color:"#1A1A1A", date:"2h ago", badge:"New" },
      { title:"Product Lead", company:"Notion", logo:"N", color:"#000", date:"Yesterday" },
    ]},
    { id:"interview", title:"Interviewing", icon:"calendar", color: cfT3.orange, count:2, items:[
      { title:"Senior PM Growth", company:"Stripe", logo:"S", color:"#635BFF", date:"Fri 3pm", badge:"Scheduled" },
      { title:"Director Product", company:"Atlassian", logo:"A", color:"#2684FF", date:"Next Tue" },
    ]},
    { id:"offer", title:"Offer", icon:"award", color: cfT3.brand, count:0, items:[] },
  ].filter(Boolean);

  return (
    <div style={{height:"100%", background: cfT3.page, display:"flex", flexDirection:"column"}}>
      <CFTN3 active="apps" agentLabel={agentLabel + "s"}/>
      <div style={{padding:"24px 32px 16px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
          <div>
            <h1 style={{
              fontFamily:"'Filson Soft','Proxima Soft',sans-serif", fontSize:26, fontWeight:700,
              color: cfT3.brand, letterSpacing:"-0.02em",
            }}>Application Tracker</h1>
            <p style={{fontSize:13, color: cfT3.muted, marginTop:2}}>
              Everything your {agentLabel.toLowerCase()}s have submitted — keep what you like, delete the rest to train them.
            </p>
          </div>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <div style={{
              display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:10,
              background:"#fff", border:`1px solid ${cfT3.border}`, fontSize:13, color: cfT3.placeholder,
              minWidth:280,
            }}>
              <i className="ti ti-search"/>
              Search by company or role…
            </div>
            <CFB3 variant="outline" icon="filter" size="md">Filter</CFB3>
          </div>
        </div>

        {/* Sprout source filter chips */}
        <div style={{display:"flex", gap:8, marginBottom:8}}>
          <CFCh3 active>All sprouts</CFCh3>
          <CFCh3>🌱 Product · Remote</CFCh3>
          <CFCh3>🌱 Director · India</CFCh3>
          <CFCh3 icon="upload">External applications</CFCh3>
        </div>
      </div>

      {/* Kanban */}
      <div style={{
        flex:1, overflow:"auto", padding:"8px 32px 32px",
        display:"grid", gridTemplateColumns: `repeat(${columns.length}, minmax(260px, 1fr))`, gap:16,
      }}>
        {columns.map(col => (
          <KColumn key={col.id} col={col}/>
        ))}
      </div>
    </div>
  );
}
window.CFApplicationsTracker = CFApplicationsTracker;

// ============================================================
// 3C. APPLICATION REVIEW — train your sprout
// ============================================================
function CFApplicationReview({ agentLabel = "Sprout" }) {
  return (
    <div style={{height:"100%", background: cfT3.page, display:"flex", flexDirection:"column"}}>
      <CFTN3 active="apps" agentLabel={agentLabel + "s"}/>
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"16px 32px", background:"#fff", borderBottom:`1px solid ${cfT3.borderLight}`,
      }}>
        <CFB3 variant="ghost" icon="arrow-left" size="sm">Back to Tracker</CFB3>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{fontSize:13, color: cfT3.muted}}>Review submitted application · edit answers to teach your {agentLabel.toLowerCase()}</div>
        </div>
        <div style={{display:"flex", gap:8}}>
          <CFB3 variant="outline" size="sm">← Previous</CFB3>
          <CFB3 variant="primary" size="sm" iconRight="arrow-right">Next</CFB3>
        </div>
      </div>

      <div style={{flex:1, overflow:"hidden", display:"grid", gridTemplateColumns:"380px 1fr"}}>
        {/* Left: job context */}
        <div style={{
          padding:"24px 24px", background: cfT3.cyanLight + "55", overflow:"auto",
          borderRight:`1px solid ${cfT3.borderLight}`,
        }}>
          <div style={{fontSize:12, color: cfT3.muted, marginBottom:6, display:"flex", alignItems:"center", gap:6}}>
            <i className="ti ti-clock"/> Submitted May 20, 2026 · 11:42am
          </div>
          <div style={{
            fontSize:12, marginBottom:14, color: cfT3.brand, fontWeight:600,
            display:"flex", alignItems:"center", gap:6,
          }}>
            <i className="ti ti-plant-2" style={{color: cfT3.primary}}/>
            Selected by <a style={{color: cfT3.primary, textDecoration:"underline"}}>{agentLabel} · Product Roles</a>
          </div>

          <h2 style={{fontSize:13, fontWeight:600, color: cfT3.primary, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase"}}>Job Title</h2>
          <div style={{
            fontFamily:"'Filson Soft','Proxima Soft',sans-serif", fontSize:22, fontWeight:700,
            color: cfT3.brand, lineHeight:1.2, marginBottom:18, letterSpacing:"-0.01em",
          }}>Head of Product Led Growth Marketing</div>

          <MetaRow icon="building-skyscraper" label="Company" value="Confluent"/>
          <MetaRow icon="briefcase" label="Type" value="Full-time"/>
          <MetaRow icon="map-pin" label="Location" value="Remote"/>
          <MetaRow icon="trophy" label="Seniority" value="Director Level"/>
          <MetaRow icon="tag" label="Sector" value="Information Technology"/>

          <div style={{marginTop:24, marginBottom:8, fontSize:13, fontWeight:700, color: cfT3.text}}>About the role</div>
          <div style={{fontSize:13, color: cfT3.body, lineHeight:1.55, paddingBottom:24}}>
            We're rewriting how data moves and what the world can do with it. With Confluent,
            data doesn't sit still. Our platform puts information in motion, streaming in
            near real-time so companies can react faster, build smarter…
          </div>
        </div>

        {/* Right: answers form */}
        <div style={{padding:"24px 36px 32px", overflow:"auto"}}>
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            marginBottom:18, padding:"14px 16px", background: cfT3.cyanLight, borderRadius:12,
          }}>
            <div style={{display:"flex", gap:12, alignItems:"center"}}>
              <CFM3 size={36} eyes="happy"/>
              <div style={{fontSize:14, color: cfT3.brand, lineHeight:1.4}}>
                <b>Edit any answer to update your {agentLabel.toLowerCase()}'s memory.</b><br/>
                <span style={{opacity:0.75, fontSize:13}}>It'll use the new answer for all future applications.</span>
              </div>
            </div>
            <Badge text="Resume: Your_ideal_candidate.pdf" color={cfT3.primary}/>
          </div>

          <Answer q="What's your current company?" a="Bloom" />
          <Answer q="Are you legally authorized to work in the United States?" a="No" memoryUpdated/>
          <Answer q="Will you require visa sponsorship?" a="Yes" />
          <Answer q="Your expected yearly salary (USD)?" a="$ 145,000" memoryUpdated/>
          <Answer q="Years of PM experience?" a="6 years" />
          <Answer q="Notice period / availability?" a="2 weeks" />
          <AnswerFreeform
            q="Describe your experience leading product-led growth"
            currentA="6 years in PM. Built growth loops at 2 startups, scaled MAU from 12k → 240k in 14 months at Bloom. Owned activation, retention, monetization."
          />
        </div>
      </div>
    </div>
  );
}
window.CFApplicationReview = CFApplicationReview;

// ============================================================
// Helpers
// ============================================================
function StatCard({ label, value, icon, color, trend }) {
  return (
    <div style={{
      background:"#fff", padding:18, borderRadius:14,
      border:`1px solid ${cfT3.borderLight}`,
    }}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12}}>
        <div style={{
          width:36, height:36, borderRadius:10, background:`${color}1A`,
          color, display:"grid", placeItems:"center",
        }}><i className={`ti ti-${icon}`} style={{fontSize:18}}/></div>
        {trend && (
          <div style={{
            fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:9999,
            background: cfT3.green + "1A", color: cfT3.green,
          }}>{trend}</div>
        )}
      </div>
      <div style={{
        fontFamily:"'Inter',system-ui,sans-serif", fontSize:24, fontWeight:700,
        color: cfT3.text, marginBottom:2, lineHeight:1,
      }}>{value}</div>
      <div style={{fontSize:12, color: cfT3.muted}}>{label}</div>
    </div>
  );
}

function SproutCard({ agentLabel, name, mascotEyes, status, mode, matched, todayApplied, quota, location, titles, seniority }) {
  const isActive = status === "active";
  const pct = Math.min(100, (todayApplied / quota) * 100);
  return (
    <div style={{
      background:"#fff", borderRadius:18, border:`1px solid ${cfT3.borderLight}`,
      overflow:"hidden", boxShadow:"0 2px 4px rgba(0,0,0,.04)",
    }}>
      {/* Header */}
      <div style={{
        background: isActive ? cfT3.brand : "#F2F4F5", color: isActive ? "#fff" : cfT3.muted,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:14,
        borderBottom:`1px solid ${cfT3.borderLight}`,
      }}>
        <div style={{position:"relative"}}>
          <CFM3 size={42} eyes={mascotEyes}/>
          {isActive && (
            <div style={{
              position:"absolute", bottom:-2, right:-2, width:12, height:12,
              borderRadius:"50%", background: cfT3.green, border:"2px solid #fff",
            }}/>
          )}
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>{name}</div>
          <div style={{fontSize:12, opacity:0.7, display:"flex", alignItems:"center", gap:6}}>
            <i className={`ti ti-${isActive ? "bolt" : "player-pause"}`} style={{fontSize:13}}/>
            {isActive ? `Live · ${mode}` : `Paused · ${mode}`}
          </div>
        </div>
        <button style={{
          padding:"6px 12px", borderRadius:9999, fontSize:12, fontWeight:700,
          background: isActive ? "rgba(255,255,255,.15)" : cfT3.brand, color:"#fff",
          border:"none", cursor:"pointer", fontFamily:"inherit",
        }}>{isActive ? "Pause" : "Resume"}</button>
      </div>

      {/* Body */}
      <div style={{padding:"18px 20px"}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:14}}>
          <Mini label="Matched today" value={matched}/>
          <Mini label="Applied today" value={`${todayApplied} / ${quota}`}/>
          <Mini label="Replies" value={isActive ? 3 : 0} accent/>
        </div>

        {/* Progress bar */}
        <div style={{
          height:6, background: cfT3.input, borderRadius:999, overflow:"hidden", marginBottom:18,
        }}>
          <div style={{height:"100%", width:`${pct}%`, background: cfT3.primary, borderRadius:999}}/>
        </div>

        {/* Config summary */}
        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:18}}>
          <ConfigLine icon="map-pin" label={location}/>
          <ConfigLine icon="briefcase" label={titles.join(" · ")}/>
          <ConfigLine icon="trophy" label={seniority}/>
        </div>

        <div style={{display:"flex", gap:8}}>
          <CFB3 variant="outline" size="sm" icon="pencil" style={{flex:1}}>Edit config</CFB3>
          <CFB3 variant="light" size="sm" icon="sparkles">Optimize</CFB3>
        </div>
      </div>
    </div>
  );
}
function Mini({ label, value, accent }) {
  return (
    <div>
      <div style={{
        fontFamily:"'Inter',system-ui,sans-serif", fontSize:18, fontWeight:700,
        color: accent ? cfT3.green : cfT3.text, lineHeight:1,
      }}>{value}</div>
      <div style={{fontSize:11, color: cfT3.muted, marginTop:4}}>{label}</div>
    </div>
  );
}
function ConfigLine({ icon, label }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:8, fontSize:13, color: cfT3.body}}>
      <i className={`ti ti-${icon}`} style={{fontSize:14, color: cfT3.muted, width:16, textAlign:"center"}}/>
      {label}
    </div>
  );
}

function ActivityRow({ icon, iconBg, title, sub, badge, badgeColor, cta, last }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:14, padding:"16px 20px",
      borderBottom: last ? "none" : `1px solid ${cfT3.borderLight}`,
    }}>
      <div style={{
        width:36, height:36, borderRadius:10, background:`${iconBg}1F`, color: iconBg,
        display:"grid", placeItems:"center",
      }}><i className={`ti ti-${icon}`} style={{fontSize:18}}/></div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600, fontSize:14, color: cfT3.text}}>{title}</div>
        <div style={{fontSize:12, color: cfT3.muted, marginTop:2}}>{sub}</div>
      </div>
      {badge && (
        <span style={{
          fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:9999,
          background: (badgeColor || cfT3.primary) + "1A", color: badgeColor || cfT3.primary,
          letterSpacing:"0.04em", textTransform:"uppercase",
        }}>{badge}</span>
      )}
      {cta && (
        <CFB3 variant="primary" size="sm">{cta}</CFB3>
      )}
    </div>
  );
}

function KColumn({ col }) {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:10}}>
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"8px 4px",
      }}>
        <div style={{display:"flex", alignItems:"center", gap:8, color: col.color, fontWeight:700, fontSize:14}}>
          <i className={`ti ti-${col.icon}`} style={{fontSize:16}}/>
          {col.title}
          <span style={{
            fontSize:12, fontWeight:600, padding:"2px 8px", borderRadius:9999,
            background: `${col.color}1A`, color: col.color,
          }}>{col.count}</span>
        </div>
        <i className="ti ti-dots" style={{color: cfT3.muted, cursor:"pointer"}}/>
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        {col.items.length === 0 ? (
          <div style={{
            padding:"24px 14px", borderRadius:12, background:"#fff",
            border:`1px dashed ${cfT3.border}`, textAlign:"center",
            color: cfT3.placeholder, fontSize:13,
          }}>Nothing here yet</div>
        ) : col.items.map((it, idx) => (
          <KCard key={idx} item={it}/>
        ))}
      </div>
    </div>
  );
}
function KCard({ item }) {
  return (
    <div style={{
      background:"#fff", borderRadius:12, border:`1px solid ${cfT3.borderLight}`,
      padding:"12px 14px", boxShadow:"0 1px 2px rgba(0,0,0,.03)", cursor:"pointer",
    }}>
      <div style={{display:"flex", gap:10, alignItems:"flex-start", marginBottom:8}}>
        <div style={{
          width:34, height:34, borderRadius:8, background: item.color || cfT3.muted,
          color:"#fff", display:"grid", placeItems:"center", fontWeight:700, fontSize:14, flexShrink:0,
        }}>{item.logo}</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{
            fontWeight:700, fontSize:13.5, color: cfT3.text, lineHeight:1.3, marginBottom:2,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
          }}>{item.title}</div>
          <div style={{fontSize:12, color: cfT3.muted}}>{item.company}</div>
        </div>
      </div>
      {item.action ? (
        <button style={{
          width:"100%", padding:"6px 10px", borderRadius:9999, fontSize:12, fontWeight:700,
          background: cfT3.primary, color:"#fff", border:"none", cursor:"pointer", marginTop:4,
          fontFamily:"inherit",
        }}>{item.action}</button>
      ) : (
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6,
          fontSize:11, color: cfT3.muted,
        }}>
          <span style={{display:"flex", alignItems:"center", gap:4}}>
            {item.auto && <i className="ti ti-plant-2" style={{fontSize:12, color: cfT3.primary}}/>}
            {item.date}
          </span>
          {item.badge && (
            <span style={{
              fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:9999,
              background: cfT3.green + "1F", color: cfT3.green, letterSpacing:"0.04em",
              textTransform:"uppercase",
            }}>{item.badge}</span>
          )}
        </div>
      )}
    </div>
  );
}

function MetaRow({ icon, label, value }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8, fontSize:13}}>
      <i className={`ti ti-${icon}`} style={{color: cfT3.primary, fontSize:15, width:18, textAlign:"center"}}/>
      <span style={{color: cfT3.primary, fontWeight:600}}>{label}:</span>
      <span style={{color: cfT3.text, fontWeight:500}}>{value}</span>
    </div>
  );
}

function Answer({ q, a, memoryUpdated }) {
  return (
    <div style={{paddingBottom:18, marginBottom:18, borderBottom:`1px solid ${cfT3.borderLight}`}}>
      <div style={{fontSize:14, fontWeight:700, color: cfT3.text, marginBottom:8}}>{q}</div>
      <div style={{fontSize:12, color: cfT3.muted, marginBottom:6}}>Submitted answer:</div>
      <div style={{
        padding:"10px 14px", borderRadius:10, background: cfT3.input,
        border:`1px solid ${cfT3.border}`, fontSize:14, color: cfT3.text, marginBottom:8,
      }}>{a}</div>
      <div style={{display:"flex", gap:14, alignItems:"center"}}>
        <button style={{
          fontSize:13, color: cfT3.primary, background:"none", border:"none", cursor:"pointer",
          fontWeight:600, padding:0, fontFamily:"inherit", display:"flex", alignItems:"center", gap:4,
        }}><i className="ti ti-pencil" style={{fontSize:14}}/>Edit answer</button>
        {memoryUpdated && (
          <span style={{
            display:"inline-flex", alignItems:"center", gap:5, fontSize:12,
            color: cfT3.green, fontWeight:700,
          }}>
            <i className="ti ti-circle-check-filled" style={{fontSize:14}}/>
            {agentLabelMemoryText()}
          </span>
        )}
      </div>
    </div>
  );
}
function agentLabelMemoryText() {
  return "Sprout memory updated";
}
function AnswerFreeform({ q, currentA }) {
  return (
    <div style={{paddingBottom:18, marginBottom:18}}>
      <div style={{fontSize:14, fontWeight:700, color: cfT3.text, marginBottom:8}}>{q}</div>
      <div style={{fontSize:12, color: cfT3.muted, marginBottom:6}}>Submitted answer:</div>
      <div style={{
        padding:"12px 14px", borderRadius:10, background: cfT3.input,
        border:`1px solid ${cfT3.border}`, fontSize:14, color: cfT3.body,
        lineHeight:1.55, marginBottom:14,
      }}>{currentA}</div>

      <div style={{fontSize:12, color: cfT3.muted, marginBottom:6}}>Update for future applications:</div>
      <div style={{
        padding:"12px 14px", borderRadius:10, background:"#fff",
        border:`1.5px solid ${cfT3.primary}`, fontSize:14, color: cfT3.body,
        lineHeight:1.55, marginBottom:10, minHeight:80,
      }}>{currentA}</div>
      <button style={{
        display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px",
        borderRadius:9999, background: cfT3.primary, color:"#fff", border:"none",
        fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
      }}><i className="ti ti-device-floppy" style={{fontSize:15}}/>Save for future applications</button>
    </div>
  );
}

function Badge({ color, text }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:9999,
      background:`${color}1F`, color, fontSize:12, fontWeight:700,
    }}>
      <i className="ti ti-file-text" style={{fontSize:13}}/>{text}
    </span>
  );
}
