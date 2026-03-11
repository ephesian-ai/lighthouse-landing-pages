import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#080b0f", bg2: "#0d1117", surface: "rgba(255,255,255,0.04)",
  accent: "#F5A100", accent2: "#d97706",
  accentBg: "rgba(245,158,11,0.07)", accentBorder: "rgba(245,158,11,0.18)",
  text: "#f8fafc", text2: "#94a3b8", muted: "#475569",
  border: "rgba(255,255,255,0.08)", borderHi: "rgba(255,255,255,0.12)",
  red: "#ef4444", redBg: "rgba(239,68,68,0.1)", redBd: "rgba(239,68,68,0.25)",
  amberBg: "rgba(245,158,11,0.1)", amberBd: "rgba(245,158,11,0.25)",
  green: "#22c55e", greenBg: "rgba(34,197,94,0.1)", greenBd: "rgba(34,197,94,0.25)",
};
const F = { d: "'Syne',sans-serif", b: "'DM Sans',sans-serif", m: "'JetBrains Mono',monospace" };
const W = { maxWidth: 980, margin: "0 auto", padding: "0 40px" };

function Reveal({ children, delay = 0, style: s = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <div ref={ref} style={{ ...s, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}

function PBadge({ level }) {
  const m = { high: { l: "HIGH", bg: C.redBg, bd: C.redBd, c: C.red }, med: { l: "MEDIUM", bg: C.amberBg, bd: C.amberBd, c: C.accent }, low: { l: "LOW", bg: C.greenBg, bd: C.greenBd, c: C.green } };
  const x = m[level];
  return <span style={{ fontFamily: F.m, fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 4, color: x.c, background: x.bg, border: `1px solid ${x.bd}`, flexShrink: 0, whiteSpace: "nowrap" }}>{x.l}</span>;
}

function Btn({ children, outline, full, style: sx = {} }) {
  const [h, setH] = useState(false);
  const base = outline ? { border: `1px solid ${C.accentBorder}`, color: C.accent, background: h ? C.accentBg : "transparent" } : { background: "linear-gradient(135deg,#F5A100 0%,#C98700 50%,#A494FC 100%)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite", color: "#120D38", fontWeight: 700, boxShadow: h ? "0 0 32px rgba(245,158,11,0.35)" : "none", transform: h ? "translateY(-2px)" : "none" };
  return <a href="#cta" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "inline-flex", alignItems: "center", justifyContent: full ? "center" : undefined, gap: 8, fontFamily: F.d, fontSize: 15, fontWeight: 600, padding: outline ? "12px 22px" : "15px 32px", borderRadius: 9, textDecoration: "none", cursor: "pointer", transition: "all 0.2s", width: full ? "100%" : undefined, ...base, ...sx }}>{children}</a>;
}

function Lbl({ children }) { return <div style={{ fontFamily: F.m, fontSize: 11, fontWeight: 500, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>{children}</div>; }
function H2({ children, style: s = {} }) { return <h2 style={{ fontFamily: F.d, fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.15, color: C.text, marginBottom: 14, ...s }}>{children}</h2>; }
function Logo({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill={C.accent}/><circle cx="12" cy="12" r="6" stroke={C.accent} strokeWidth="1.5" strokeOpacity="0.4" fill="none"/><circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1" strokeOpacity="0.2" fill="none"/></svg>; }

function FAQ({ q, a }) {
  const [o, setO] = useState(false);
  return <div onClick={() => setO(!o)} style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 0", cursor: "pointer" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: F.b, fontSize: 15, fontWeight: 500, color: C.text }}>{q}<span style={{ color: C.muted, fontSize: 18, transition: "transform 0.3s", transform: o ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 16 }}>+</span></div>
    <div style={{ maxHeight: o ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}><p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: C.text2, fontFamily: F.b }}>{a}</p></div>
  </div>;
}

const signals = [
  { level: "high", title: "Rival Co repriced hero SKU — 15% cheaper, free shipping added", desc: "Price dropped from $34 to $28.90 on their Shopify store. Free shipping threshold removed entirely. Likely clearing inventory or testing aggressive acquisition pricing." },
  { level: "high", title: "Competitor X launched 4 new products in your category", desc: "New arrivals added to their Shopify store Thursday. Men's beard oil, styling balm, face wash, and a grooming kit bundle. All priced 10% below your equivalent SKUs." },
  { level: "med", title: "Rival Co shifted Meta ad creative from UGC to studio", desc: "3 new ads detected in Meta Ad Library. Moving away from influencer UGC toward polished studio product shots. Testing premium positioning." },
  { level: "med", title: "New DTC brand entered your category via TikTok Shop", desc: "Launched 5 days ago with 2 videos already past 500K views. Price point is aggressive ($19.99 hero product). Watch for market share impact." },
  { level: "low", title: "Competitor Y updated About page — new sustainability messaging", desc: "Added B-Corp certification badge and 'carbon neutral shipping' claim. Positioning shift toward eco-conscious buyer segment." },
  { level: "low", title: "Category trending: #mensgrooming up 340% on TikTok this week", desc: "Driven by a viral 'morning routine' trend. Potential organic content opportunity if you act within the next 5–7 days." },
];

export default function LighthouseDTC() {
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);

  return <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: F.b, overflowX: "hidden" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:${C.accent};color:#000}
      @keyframes drift1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-25px) scale(1.06)}66%{transform:translate(-25px,35px) scale(0.94)}}
      @keyframes drift2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-45px,20px) scale(1.08)}66%{transform:translate(25px,-35px) scale(0.92)}}
      @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}
      @keyframes sigIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
      @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
      @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.10);border-radius:4px}
      @media(max-width:768px){.hide-m{display:none!important}.g1{grid-template-columns:1fr!important}}
    `}</style>

    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E")` }} />
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: `radial-gradient(ellipse 80% 55% at 50% -10%,rgba(245,161,0,0.09) 0%,transparent 65%),radial-gradient(ellipse 60% 50% at 100% 110%,rgba(245,161,0,0.12) 0%,transparent 55%)` }} />

    {/* NAV */}
    <nav style={{ position: "sticky", top: 0, zIndex: 1000, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: scrolled ? "rgba(8,11,15,0.88)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`, transition: "all 0.3s" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: C.accentBg, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo /></div>
        <span style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.3px" }}>light<span style={{ color: C.accent }}>house</span></span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {["How It Works", "Reports", "Pricing"].map(t => <a key={t} href={`#${t.toLowerCase().replace(/ /g, "-")}`} className="hide-m" style={{ fontSize: 14, fontWeight: 500, color: C.text2, textDecoration: "none", padding: "8px 14px" }}>{t}</a>)}
        <Btn style={{ padding: "9px 20px", fontSize: 14 }}>Get Competitor Briefing</Btn>
      </div>
    </nav>

    {/* HERO */}
    <section style={{ position: "relative", overflow: "hidden", padding: "100px 0 60px" }}>
      <div style={{ position: "absolute", width: 600, height: 600, top: -100, left: -100, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", background: "rgba(245,158,11,0.09)", animation: "drift1 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 500, height: 500, bottom: -80, right: -80, borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", background: "rgba(59,130,246,0.07)", animation: "drift2 22s ease-in-out infinite" }} />

      <div style={{ ...W, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 24, background: C.accentBg, border: `1px solid ${C.accentBorder}`, fontFamily: F.m, fontSize: 11, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", animation: "fadeInUp 0.5s ease both" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, boxShadow: `0 0 6px ${C.accent}`, animation: "pulseDot 2s ease-in-out infinite" }} />
            All Signal. No Noise.
          </div>
        </div>
        <div style={{ textAlign: "center", maxWidth: 740, margin: "0 auto" }}>
          <h1 style={{ fontFamily: F.d, fontSize: "clamp(42px,6vw,68px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-1.5px", color: C.text, marginBottom: 22, animation: "fadeInUp 0.6s ease both 0.2s", opacity: 0 }}>
            Your competitor dropped<br />prices 15% last week.<br />
            <em style={{ fontStyle: "normal", color: C.accent }}>You found out from a DM.</em>
          </h1>
          <p style={{ fontSize: "clamp(17px,2.2vw,20px)", color: C.text2, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 20px", animation: "fadeInUp 0.6s ease both 0.4s", opacity: 0 }}>
            Lighthouse monitors your competitors' websites, pricing, product launches, and ad creative — then delivers a structured weekly briefing. Know what they did. React before it hurts.
          </p>
          <p style={{ fontFamily: F.m, fontSize: 13, color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 36, animation: "fadeInUp 0.6s ease both 0.5s", opacity: 0 }}>All signal. No noise.</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", animation: "fadeInUp 0.6s ease both 0.6s", opacity: 0 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="competitor-url.com" style={{ padding: "15px 20px", width: 280, borderRadius: 9, border: `1px solid ${C.border}`, background: C.bg2, color: C.text, fontSize: 15, fontFamily: F.b, outline: "none" }} onFocus={e => (e.target.style.borderColor = C.accentBorder)} onBlur={e => (e.target.style.borderColor = C.border)} />
            <Btn>Get Free Competitor Briefing →</Btn>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: C.muted, animation: "fadeInUp 0.6s ease both 0.7s", opacity: 0 }}>Enter your competitor's URL · Get an intelligence report within 24 hours · Free</p>
        </div>
      </div>
    </section>

    {/* SOURCE STRIP */}
    <Reveal><div style={{ padding: "16px 40px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.015)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
      <span style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>We monitor →</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {["Shopify stores", "Amazon listings", "Meta Ad Library", "TikTok Creative Center", "Instagram", "Industry newsletters", "+more"].map(s => <span key={s} style={{ padding: "4px 11px", borderRadius: 20, fontSize: 12, fontWeight: 500, color: C.text2, background: C.surface, border: `1px solid ${C.border}` }}>{s}</span>)}
      </div>
    </div></Reveal>

    {/* BRIEFING DEMO */}
    <section style={{ padding: "100px 0 80px", position: "relative", zIndex: 1 }}>
      <div style={W}>
        <Reveal><Lbl>This Week's Briefing</Lbl></Reveal>
        <Reveal delay={0.1}><H2>This is what Monday<br />morning looks like.</H2></Reveal>
        <Reveal delay={0.15}><p style={{ fontSize: 17, color: C.text2, lineHeight: 1.65, maxWidth: 540, marginBottom: 48 }}>Real-format output from a Competitor Watch run. Every signal ranked, analysed, and action-ready. 10 minutes to read.</p></Reveal>

        <Reveal delay={0.25}>
          <div style={{ background: "rgba(13,17,23,0.9)", backdropFilter: "blur(16px)", border: `1px solid ${C.borderHi}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 48px 100px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.03),inset 0 1px 0 rgba(255,255,255,0.06)", maxWidth: 720 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, background: C.accentBg, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo size={12} /></div>
                <span style={{ fontFamily: F.m, fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: "0.04em" }}>Competitor Watch</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: F.m, fontSize: 11, color: C.muted }}>Mon 10 Mar 2026</span>
                <span style={{ fontFamily: F.m, fontSize: 10, fontWeight: 600, color: C.accent, background: C.accentBg, border: `1px solid ${C.accentBorder}`, padding: "3px 10px", borderRadius: 20 }}>6 signals</span>
              </div>
            </div>
            <div style={{ padding: "24px 24px 0" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: F.m, fontSize: 11, color: C.accent, background: C.accentBg, border: `1px solid ${C.accentBorder}`, padding: "4px 12px", borderRadius: 20, marginBottom: 16, letterSpacing: "0.02em" }}>🔍 3 competitors · 6 sources · Men's Grooming</div>
              <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.3px", lineHeight: 1.35, marginBottom: 24 }}>Rival Co undercuts pricing by 15% — new entrant launches on TikTok Shop with viral traction</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {signals.map((sig, i) => <div key={i} style={{ display: "flex", gap: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 9, padding: "14px 16px", alignItems: "flex-start", animation: `sigIn 0.4s ease both`, animationDelay: `${i * 0.12}s` }}>
                  <PBadge level={sig.level} />
                  <div><div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 4, lineHeight: 1.4 }}>{sig.title}</div><div style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{sig.desc}</div></div>
                </div>)}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: "16px -24px 0", padding: "14px 24px 18px", background: C.accentBg, borderTop: `1px solid ${C.accentBorder}` }}>
                <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>⚡</span>
                <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}><strong style={{ fontWeight: 600, color: C.accent, marginRight: 4 }}>Recommended:</strong>Review pricing against Rival Co's new price point · Monitor TikTok entrant's first 30 days · Test studio creative alongside your UGC</div>
              </div>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.muted, fontStyle: "italic" }}>↑ Real format. Your competitor names. Your category. Every week.</p>
        </Reveal>
      </div>
    </section>

    {/* PROBLEM */}
    <section style={{ padding: "80px 0 100px", position: "relative", zIndex: 1 }}>
      <div style={W}>
        <Reveal><Lbl>The Problem</Lbl></Reveal>
        <Reveal delay={0.1}><H2>You're competing blind.<br /><span style={{ color: C.muted }}>And they might be watching you.</span></H2></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 17, color: C.text2, lineHeight: 1.65, maxWidth: 620, marginBottom: 20 }}>You check their Instagram when you remember. You spot pricing changes weeks late — sometimes from customers, sometimes never. You opened three competitor tabs last Sunday and fell down a 90-minute rabbit hole. You still missed the product they launched on Thursday.</p></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 48, background: C.border, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }} className="g1">
          {[{ s: "5.6M", d: "live Shopify stores — growing 18% year-over-year. Your category gets more crowded every week.", c: C.accent }, { s: "120%", d: "TikTok Shop US sales growth YoY — new channels, new competitors, new threats you're not tracking", c: C.red }, { s: "+38%", d: "increase in customer acquisition costs since 2023. Competing blind costs you real money.", c: C.red }].map((x, i) => (
            <Reveal key={i} delay={0.1*(i+1)}><div style={{ background: C.bg, padding: "32px 28px" }}>
              <div style={{ fontFamily: F.d, fontSize: 48, fontWeight: 800, color: "rgba(245,158,11,0.06)", lineHeight: 1, marginBottom: 16, userSelect: "none" }}>0{i+1}</div>
              <div style={{ fontFamily: F.d, fontSize: 28, fontWeight: 700, color: x.c, marginBottom: 8 }}>{x.s}</div>
              <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.7 }}>{x.d}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
      <div style={W}>
        <Reveal><Lbl>How it works</Lbl></Reveal>
        <Reveal delay={0.1}><H2>Tell us who to watch.<br />We handle the rest.</H2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 56, background: C.border, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }} className="g1">
          {[{ n: "01", i: "🎯", t: "Add your competitors", d: "Paste their Shopify URL, Amazon listing, or Instagram handle. Add up to 5 competitors. Takes 2 minutes." }, { n: "02", i: "📡", t: "Lighthouse monitors everything", d: "Every week — websites, pricing pages, new products, Meta Ad Library, TikTok Creative Center, social profiles. Change detection filters out noise." }, { n: "03", i: "📄", t: "Your briefing arrives", d: "Monday 7 AM. Competitor-by-competitor breakdown. What changed, what it means, what to do. 10 minutes to read." }].map((s, i) => (
            <Reveal key={i} delay={0.1*(i+1)}><div style={{ background: C.bg, padding: "32px 28px" }}>
              <div style={{ fontFamily: F.d, fontSize: 52, fontWeight: 800, color: "rgba(245,158,11,0.06)", lineHeight: 1, marginBottom: 20, userSelect: "none" }}>{s.n}</div>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: C.accentBg, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 20 }}>{s.i}</div>
              <h3 style={{ fontFamily: F.d, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.2px", marginBottom: 10 }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.7 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* REPORTS */}
    <section id="reports" style={{ padding: "100px 0", position: "relative", zIndex: 1 }}>
      <div style={W}>
        <Reveal><Lbl>Intelligence Reports</Lbl></Reveal>
        <Reveal delay={0.1}><H2>Two reports. Total competitive awareness.</H2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginTop: 56 }} className="g1">
          {[{ e: "🔍", n: "Competitor Watch", sc: "Weekly · Monday 7 AM · 8–10 min", d: "Monitor up to 5 competitors. Pricing changes, new products, ad creative shifts, social strategy moves. Structured as: What Changed → What It Means → What To Do.", r: "Sunday night Instagram stalking and the Google Alerts you never read.", f: true }, { e: "📡", n: "DTC Trend Radar", sc: "Weekly · Wednesday 7 AM · 7–10 min", d: "Trending products, platform changes (Shopify, Meta, TikTok Shop), emerging brands to watch, category spotlights. Structured as: Trends → Platform Updates → Emerging Threats.", r: "Scrolling TikTok 'for research' and skimming 6 newsletters you never finish.", f: false }].map((rp, i) => (
            <Reveal key={i} delay={0.1*(i+1)}><div style={{ background: rp.f ? C.accentBg : C.surface, border: `1px solid ${rp.f ? "rgba(245,158,11,0.3)" : C.border}`, borderRadius: 12, padding: "32px 28px", height: "100%" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{rp.e}</div>
              <h3 style={{ fontFamily: F.d, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{rp.n}</h3>
              <p style={{ fontFamily: F.m, fontSize: 11, color: C.muted, letterSpacing: "0.04em", marginBottom: 20 }}>{rp.sc}</p>
              <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.7, marginBottom: 20 }}>{rp.d}</p>
              <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", borderTop: `1px solid ${C.border}`, paddingTop: 16 }}><span style={{ color: C.accent, fontWeight: 500, fontStyle: "normal" }}>Replaces:</span> {rp.r}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* QUOTE */}
    <section style={{ padding: "60px 0 100px", position: "relative", zIndex: 1 }}>
      <div style={{ ...W, maxWidth: 700, textAlign: "center" }}>
        <Reveal>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "40px 36px" }}>
            <div style={{ fontSize: 48, lineHeight: 1, color: "rgba(245,158,11,0.15)", fontFamily: F.d, marginBottom: 16 }}>"</div>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: C.text, fontStyle: "italic", marginBottom: 20 }}>A competitor launched 4 products in my category and I had no idea until Lighthouse flagged it. I adjusted my pricing and launched a counter-campaign the same week. That's never happened before.</p>
            <div style={{ fontFamily: F.m, fontSize: 12, color: C.muted, letterSpacing: "0.04em" }}>— DTC Brand Founder · $2.8M Revenue · Austin, TX</div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* PRICING */}
    <section id="pricing" style={{ padding: "80px 0 100px", position: "relative", zIndex: 1 }}>
      <div style={W}>
        <div style={{ textAlign: "center" }}>
          <Reveal><Lbl>Pricing</Lbl></Reveal>
          <Reveal delay={0.1}><H2 style={{ textAlign: "center" }}>Less than one Shopify app.</H2></Reveal>
        </div>
        <Reveal delay={0.2}>
          {/* Two-tier pricing */}
          <div style={{ marginTop: 56, maxWidth: 680, margin: "56px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="g1">
            {/* Competitor Watch */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "32px 28px", position: "relative" }}>
              <div style={{ fontFamily: F.m, fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Competitor Watch</div>
              <div style={{ fontFamily: F.d, fontSize: 42, fontWeight: 800, color: C.text, letterSpacing: "-1px", lineHeight: 1 }}>$49<span style={{ fontSize: 15, fontWeight: 400, color: C.muted }}>/mo</span></div>
              <div style={{ fontSize: 13, color: C.text2, marginBottom: 24, marginTop: 4 }}>Monitor up to 5 competitors</div>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {["Weekly competitor briefing", "Pricing change detection", "New product alerts", "Ad creative monitoring", "Cancel anytime"].map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.text2, marginBottom: 10 }}><span style={{ color: C.green, fontWeight: 700 }}>✓</span>{f}</li>)}
              </ul>
              <Btn outline full>Start Watching →</Btn>
            </div>

            {/* Full Intelligence */}
            <div style={{ background: C.accentBg, border: "1px solid rgba(245,158,11,0.3)", borderRadius: 14, padding: "32px 28px", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", fontFamily: F.m, fontSize: 10, fontWeight: 600, color: "#000", background: C.accent, padding: "4px 14px", borderRadius: 20, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Most Popular</div>
              <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.accent},${C.accent2})`, borderRadius: "14px 14px 0 0" }} />
              <div style={{ fontFamily: F.m, fontSize: 10, fontWeight: 600, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Full Intelligence</div>
              <div style={{ fontFamily: F.d, fontSize: 42, fontWeight: 800, color: C.text, letterSpacing: "-1px", lineHeight: 1 }}>$79<span style={{ fontSize: 15, fontWeight: 400, color: C.muted }}>/mo</span></div>
              <div style={{ fontSize: 13, color: C.text2, marginBottom: 24, marginTop: 4 }}>Everything in Competitor Watch, plus:</div>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {["DTC Trend Radar report", "TikTok + platform trend alerts", "Emerging brand early warnings", "Category trend spotting", "Priority email support"].map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.text2, marginBottom: 10 }}><span style={{ color: C.green, fontWeight: 700 }}>✓</span>{f}</li>)}
              </ul>
              <Btn full>Get Full Intelligence →</Btn>
            </div>
          </div>

          {/* Comparison note */}
          <div style={{ textAlign: "center", marginTop: 32, maxWidth: 520, margin: "32px auto 0" }}>
            <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6, marginBottom: 8 }}>
              Enterprise CI tools like Crayon and Klue cost <span style={{ color: C.red, fontWeight: 600 }}>$20,000+/year</span> and are built for sales teams, not DTC founders. Lighthouse gives you the intelligence that matters for <span style={{ color: C.accent, fontWeight: 600 }}>less than a Shopify app</span>.
            </p>
            <p style={{ fontSize: 13, color: C.muted }}>No credit card required to start · Cancel anytime</p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* FAQ */}
    <section style={{ padding: "80px 0 100px", position: "relative", zIndex: 1 }}>
      <div style={{ ...W, maxWidth: 700 }}>
        <Reveal><Lbl>Questions</Lbl></Reveal>
        <Reveal delay={0.1}><H2>You're probably wondering</H2></Reveal>
        <Reveal delay={0.2}><div style={{ marginTop: 40 }}>
          <FAQ q={`"Is this just ChatGPT summarising their homepage?"`} a="No. Lighthouse uses content hashing to detect what CHANGED on competitor sites — not what exists. We compare this week's content to last week's and surface only the differences. That's real change detection, not summarisation." />
          <FAQ q={`"Does it track social media and ads?"`} a="Yes. We monitor Meta Ad Library and TikTok Creative Center for ad creative changes, plus social profiles for content strategy shifts. It's not just websites." />
          <FAQ q={`"I need this for MY competitors, not generic news."`} a="That's exactly how it works. During onboarding, you paste your competitors' URLs — their Shopify store, Amazon listing, Instagram. The briefing is about YOUR competitive landscape." />
          <FAQ q={`"$49/month is another subscription."`} a="If it catches one pricing change or product launch before your customers tell you about it, it pays for itself instantly. How much did that last price undercut cost you?" />
          <FAQ q={`"What if my competitors don't change much?"`} a="You'll still get a briefing confirming nothing material happened. Knowing your competitors are quiet is intelligence too — it means you have room to make moves." />
        </div></Reveal>
      </div>
    </section>

    {/* FINAL CTA */}
    <section id="cta" style={{ padding: "100px 0 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, background: "radial-gradient(ellipse,rgba(245,158,11,0.07) 0%,transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
        <Reveal><p style={{ fontFamily: F.m, fontSize: 13, color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>All signal. No noise.</p></Reveal>
        <Reveal delay={0.1}><H2 style={{ fontSize: "clamp(36px,5vw,52px)", textAlign: "center" }}>Stop finding out<br /><em style={{ fontStyle: "normal", color: C.accent }}>last.</em></H2></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: 18, color: C.text2, lineHeight: 1.65, marginBottom: 40 }}>Enter your competitor's URL. Get a real intelligence briefing within 24 hours. See what you've been missing — for free.</p></Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <input type="text" placeholder="competitor-url.com" style={{ padding: "15px 20px", width: 280, borderRadius: 9, border: `1px solid ${C.border}`, background: C.bg2, color: C.text, fontSize: 15, fontFamily: F.b, outline: "none" }} />
            <Btn>Send Me the Briefing →</Btn>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: C.muted }}>Free competitor intelligence report. No credit card. No sales calls.</p>
        </Reveal>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{ padding: "28px 40px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <a href="/" style={{ fontFamily: F.d, fontSize: 15, fontWeight: 700, color: C.text2, letterSpacing: "-0.2px", textDecoration: "none" }}>light<span style={{ color: C.accent }}>house</span></a>
        <span style={{ fontSize: 12, color: C.muted }}>© 2026 Lighthouse</span>
        <div style={{ display: "flex", gap: 16 }}>{["Privacy", "Terms"].map(t => <a key={t} href={`/${t.toLowerCase()}`} style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}>{t}</a>)}</div>
      </div>
      <div style={{ fontFamily: F.m, fontSize: 11, color: C.muted, letterSpacing: "0.06em" }}>All signal. No noise.</div>
    </footer>
  </div>;
}
