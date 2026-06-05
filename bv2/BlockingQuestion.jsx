/* bv2/BlockingQuestion.jsx — Tier 3 modal: agent stuck, needs the user
   UX rationale:
   - Center modal w/ frosted blur backdrop: total focus, low friction
   - Single question (or 2-3 batched), JUST that question, with job context
   - Suggested answer drafted from work history — one tap to use it
   - Time estimate so user knows commitment
   - Saves the answer to memory automatically; gentle "I'll remember this" note
*/
const { C: BC, Mascot: BM, TopNav: BTN, Frame: BF, CoLogo: BCL, PrimaryBtn: BPB, GhostBtn: BGB } = BV2;

function BlockingQuestion() {
  const [answer, setAnswer] = React.useState(SUGGESTED_DRAFT);
  const [useDraft, setUseDraft] = React.useState(true);

  return (
    <BF w={1280} h={800}>
      {/* dimmed app shell behind */}
      <BTN active="Applications" agentState="asking" />
      <div style={{
        flex:1, padding:"24px 32px", background:BC.bg,
        position:"relative", overflow:"hidden",
      }}>
        {/* faint sketch of the apps page */}
        <div aria-hidden style={{
          position:"absolute", inset:0, padding:"24px 32px",
          filter:"blur(4px)", opacity:.5,
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              background:"#fff", border:`1px solid ${BC.line}`, borderRadius:14,
              height:80, marginBottom:14,
            }} />
          ))}
        </div>
        <div style={{
          position:"absolute", inset:0, background:"rgba(2,47,54,.35)",
          backdropFilter:"blur(4px)",
        }} />

        {/* Modal */}
        <div style={{
          position:"relative", margin:"40px auto 0", width:640, maxWidth:"94%",
          background:"#fff", borderRadius:20, overflow:"hidden",
          boxShadow:"0 30px 80px -20px rgba(0,0,0,.4)",
          border:`1px solid ${BC.line}`,
        }}>
          <ModalHeader />
          <ModalBody answer={answer} setAnswer={setAnswer} useDraft={useDraft} setUseDraft={setUseDraft} />
          <ModalFooter />
        </div>
      </div>
    </BF>
  );
}

function ModalHeader() {
  return (
    <div style={{
      padding:"22px 26px 18px", borderBottom:`1px solid ${BC.line}`,
      background:`linear-gradient(180deg, #FFF8E5 0%, #fff 100%)`,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <BM size={44} state="asking" />
        <div style={{flex:1}}>
          <div style={{ fontSize:11, fontWeight:700, color:"#7A5500", letterSpacing:".1em", textTransform:"uppercase" }}>
            Bloom is stuck · 1 question
          </div>
          <div style={{
            fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
            fontSize:20, fontWeight:700, color:BC.brandDark, letterSpacing:"-.02em", marginTop:2,
          }}>
            Quick — help me finish this application
          </div>
        </div>
        <div style={{
          display:"flex", alignItems:"center", gap:6,
          padding:"5px 10px", borderRadius:99, background:BC.lineSoft,
          fontSize:11.5, color:BC.inkSoft, fontWeight:600,
        }}>
          <i className="ti ti-clock" style={{fontSize:13}} />
          ~2 min
        </div>
      </div>

      {/* Job context strip */}
      <div style={{
        marginTop:16, padding:"10px 12px", background:"#fff", borderRadius:10,
        border:`1px solid ${BC.line}`, display:"flex", alignItems:"center", gap:12,
      }}>
        <BCL co="L" bg="#5E6AD2" color="#fff" size={36} />
        <div style={{flex:1, minWidth:0}}>
          <div style={{ fontSize:13.5, fontWeight:700, color:BC.brandDark, letterSpacing:"-.01em" }}>Product Designer</div>
          <div style={{ fontSize:12, color:BC.inkSoft }}>Linear · Remote · 94% match</div>
        </div>
        <div style={{
          fontSize:11.5, color:BC.inkFaint, fontWeight:600, textAlign:"right",
        }}>
          <div>22 fields filled</div>
          <div>1 left to go</div>
        </div>
      </div>
    </div>
  );
}

const SUGGESTED_DRAFT = "I'm drawn to Linear because of how thoughtfully you've built tools for product teams — the keyboard-first design, the speed, the clarity. I've spent the last 4 years designing internal tools at scale and I love working on products where craft and pragmatism meet. I'd bring strong systems thinking and a track record of shipping ambitious UI changes carefully.";

function ModalBody({ answer, setAnswer, useDraft, setUseDraft }) {
  return (
    <div style={{ padding:"22px 26px" }}>
      <div style={{
        fontSize:11, fontWeight:700, color:BC.inkFaint, letterSpacing:".08em", textTransform:"uppercase",
        display:"flex", alignItems:"center", gap:6,
      }}>
        <i className="ti ti-corner-down-right" style={{fontSize:13}} /> Question 1 of 1
      </div>
      <div style={{
        fontFamily:'"Filson Soft","Proxima Soft",sans-serif',
        fontSize:19, fontWeight:700, color:BC.brandDark, letterSpacing:"-.01em", marginTop:6, lineHeight:1.35,
      }}>
        Why Linear, specifically?
      </div>
      <div style={{ fontSize:12.5, color:BC.inkSoft, marginTop:4, fontStyle:"italic" }}>
        Linear's question · 50–500 characters
      </div>

      {/* Draft suggestion */}
      <div style={{
        marginTop:16, padding:"14px 16px", borderRadius:12,
        background:"#F6F9FB", border:`1px solid ${BC.line}`,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <i className="ti ti-sparkles" style={{fontSize:14, color:BC.brandDark}} />
          <div style={{ fontSize:11.5, fontWeight:700, color:BC.brandDark, letterSpacing:".06em", textTransform:"uppercase" }}>
            I drafted this from your work history
          </div>
        </div>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          rows={6}
          style={{
            width:"100%", padding:"12px 14px", borderRadius:8,
            border:`1px solid ${BC.line}`, fontFamily:"inherit",
            fontSize:13.5, color:BC.brandDark, lineHeight:1.5, resize:"vertical",
            background:"#fff",
          }}
        />
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginTop:8,
        }}>
          <div style={{ fontSize:11.5, color:BC.inkFaint }}>
            <span className="num" style={{fontWeight:600, color: answer.length >= 50 ? BC.green : BC.orange}}>
              {answer.length}
            </span> / 500 characters
          </div>
          <div style={{display:"flex", gap:8}}>
            <button style={{ fontSize:12, color:BC.inkSoft, fontWeight:600, padding:"4px 8px" }}>
              <i className="ti ti-refresh" style={{fontSize:13, marginRight:4}} />Rewrite
            </button>
            <button style={{ fontSize:12, color:BC.inkSoft, fontWeight:600, padding:"4px 8px" }}>
              <i className="ti ti-mood-smile" style={{fontSize:13, marginRight:4}} />Make it warmer
            </button>
          </div>
        </div>
      </div>

      {/* Memory note */}
      <div style={{
        marginTop:14, padding:"10px 12px",
        background:"#E0F4FE", border:"1px solid #BFE3F5", borderRadius:10,
        display:"flex", alignItems:"flex-start", gap:10,
      }}>
        <i className="ti ti-brain" style={{fontSize:16, color:BC.brandDark, marginTop:1}} />
        <div style={{ fontSize:12.5, color:BC.brandDark, fontWeight:500, lineHeight:1.45 }}>
          <strong>I'll remember this.</strong> Next time a company asks "why us", I'll adapt this answer instead of bothering you.
        </div>
      </div>
    </div>
  );
}

function ModalFooter() {
  return (
    <div style={{
      padding:"16px 26px", borderTop:`1px solid ${BC.line}`,
      background:BC.lineSoft, display:"flex", alignItems:"center", gap:12,
    }}>
      <button style={{
        fontSize:12.5, color:BC.inkSoft, fontWeight:600, padding:"8px 10px",
      }}>
        <i className="ti ti-x" style={{fontSize:14, marginRight:5}} />
        Skip this job
      </button>
      <div style={{flex:1}} />
      <BGB icon="bookmark">Save & finish later</BGB>
      <BPB icon="send" size="lg">Send application</BPB>
    </div>
  );
}

window.BV2_BlockingQuestion = BlockingQuestion;
