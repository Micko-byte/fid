"use client";

import FidLogo from "@/components/ui/FidLogo";

/**
 * Footer sign-off animation (ported + refined from the FID Brand Motion Kit).
 * Little climbers carry F·I·D·&·C·O up a sunrise ridge, then merge into the
 * assembled logo mark with a flash bloom. Seamless loop.
 */

const Climber = ({ ch, sx, amber, s1, s2 }: { ch: string; sx: number; amber?: boolean; s1: number; s2: number }) => (
  <div style={{ ["--sx" as string]: `${sx}px`, position: "relative", width: 32, animation: "fRise calc(13s*var(--spd)) cubic-bezier(.4,0,.2,1) infinite" }}>
    <div style={{ textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: amber ? 30 : 36, lineHeight: 1, color: amber ? "#e59248" : "#f5f2ec", marginBottom: amber ? 6 : 2, animation: "fLettersOut calc(13s*var(--spd)) linear infinite" }}>{ch}</div>
    <div style={{ animation: "fBody calc(13s*var(--spd)) linear infinite" }}>
      <div style={{ position: "relative", width: 32, height: 52, margin: "0 auto" }}>
        <div style={{ position: "absolute", top: 0, left: 10, width: 12, height: 12, borderRadius: "50%", background: "#d9ab88" }} />
        <div style={{ position: "absolute", top: 11, left: 8, width: 16, height: 22, borderRadius: 6, background: "#d9ab88" }} />
        <div style={{ position: "absolute", top: 2, left: 1, width: 11, height: 5, borderRadius: 3, background: "#d9ab88", transformOrigin: "right", transform: "rotate(-52deg)" }} />
        <div style={{ position: "absolute", top: 2, left: 20, width: 11, height: 5, borderRadius: 3, background: "#d9ab88", transformOrigin: "left", transform: "rotate(52deg)" }} />
        <div style={{ position: "absolute", top: 31, left: 9, width: 5, height: 20, borderRadius: 3, background: "#d9ab88", transformOrigin: "top", animation: `step calc(${s1}s*var(--spd)) ease-in-out infinite` }} />
        <div style={{ position: "absolute", top: 31, left: 17, width: 5, height: 20, borderRadius: 3, background: "#d9ab88", transformOrigin: "top", animation: `stepB calc(${s2}s*var(--spd)) ease-in-out infinite` }} />
      </div>
    </div>
  </div>
);

const LETTERS = [
  { ch: "F", sx: -150, s1: 0.5, s2: 0.5 },
  { ch: "I", sx: -90, s1: 0.55, s2: 0.55 },
  { ch: "D", sx: -30, s1: 0.48, s2: 0.48 },
  { ch: "&", sx: 30, amber: true, s1: 0.52, s2: 0.52 },
  { ch: "C", sx: 90, s1: 0.53, s2: 0.53 },
  { ch: "O", sx: 150, s1: 0.5, s2: 0.5 },
];

const STARS = [
  { l: "12%", t: "14%", s: 3, d: 3.2, delay: 0, c: "#f5f2ec" },
  { l: "24%", t: "22%", s: 2, d: 2.6, delay: 0.5, c: "#f5f2ec" },
  { l: "70%", t: "12%", s: 3, d: 3.6, delay: 1.1, c: "#f5f2ec" },
  { l: "84%", t: "20%", s: 2, d: 2.9, delay: 0.8, c: "#d9ab88" },
  { l: "58%", t: "9%", s: 2, d: 3.1, delay: 1.6, c: "#f5f2ec" },
  { l: "40%", t: "16%", s: 2, d: 2.4, delay: 2, c: "#f5f2ec" },
];

export default function FooterClimb({ tagline = "Insight · Strategy · Impact" }: { tagline?: string }) {
  return (
    <div style={{ ["--spd" as string]: "1", position: "relative", width: "100%", height: "clamp(320px, 42vw, 440px)", overflow: "hidden", background: "linear-gradient(180deg,#0c0202 0%,#1c0405 38%,#3a0608 72%,#5a0709 100%)" }}>
      {/* dawn bloom */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 120% at 50% 78%,rgba(217,128,56,.55),rgba(194,90,26,.22) 42%,transparent 68%)", animation: "fDawn calc(13s*var(--spd)) ease-in-out infinite" }} />
      {/* grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(217,171,136,.6) 1px,transparent 1.4px)", backgroundSize: "20px 20px", opacity: 0.1, animation: "driftDots2 calc(46s*var(--spd)) linear infinite" }} />
      {/* stars */}
      {STARS.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: s.l, top: s.t, width: s.s, height: s.s, borderRadius: "50%", background: s.c, animation: `twinkle calc(${s.d}s*var(--spd)) ease-in-out infinite ${s.delay}s` }} />
      ))}
      {/* distant ridge */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <polygon points="0,400 0,300 220,240 470,290 700,220 940,280 1200,230 1200,400" fill="#3a0608" opacity=".7" />
      </svg>
      {/* rising sun */}
      <div style={{ position: "absolute", left: "50%", top: "34%", width: 170, height: 170, borderRadius: "50%", backgroundColor: "#e59248", boxShadow: "0 0 90px 26px rgba(229,146,72,.5)", animation: "fSun calc(13s*var(--spd)) ease-in-out infinite, fSunHue calc(13s*var(--spd)) linear infinite" }} />
      {/* foreground ridge */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <polygon points="0,400 0,330 300,238 560,300 820,214 1060,286 1200,250 1200,400" fill="#160303" />
        <polyline points="0,330 300,238 560,300 820,214 1060,286 1200,250" fill="none" stroke="#d9ab88" strokeWidth="2" strokeDasharray="4 9" opacity=".65" style={{ animation: "flowline calc(14s*var(--spd)) linear infinite" }} />
      </svg>
      {/* climbers */}
      <div style={{ position: "absolute", left: "50%", top: "26%", transform: "translateX(-50%)", display: "flex", alignItems: "flex-end", gap: 14 }}>
        {LETTERS.map((l) => <Climber key={l.ch} {...l} />)}
      </div>
      {/* flash */}
      <div style={{ position: "absolute", left: "50%", top: "30%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,244,230,.95),rgba(229,146,72,.5) 40%,transparent 72%)", animation: "fFlash calc(13s*var(--spd)) ease-out infinite", pointerEvents: "none" }} />
      {/* assembled logo + tagline */}
      <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translate(-50%,-50%)", width: "min(300px, 62vw)", animation: "fMarkReveal calc(13s*var(--spd)) ease-out infinite" }}>
        <FidLogo variant="light" style={{ width: "100%", height: "auto", display: "block" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: "#d9ab88", fontFamily: "var(--font-body)" }}>{tagline}</div>
      </div>

      <style>{`
        @keyframes driftDots2{to{background-position:-200px 200px}}
        @keyframes step{0%,100%{transform:rotate(22deg)}50%{transform:rotate(-22deg)}}
        @keyframes stepB{0%,100%{transform:rotate(-22deg)}50%{transform:rotate(22deg)}}
        @keyframes flowline{to{stroke-dashoffset:-1200}}
        @keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}
        @keyframes fRise{0%{transform:translate(var(--sx,0),190px);opacity:0}6%{opacity:1}40%{transform:translate(0,0);opacity:1}88%{transform:translate(0,0);opacity:1}95%{opacity:0}100%{transform:translate(var(--sx,0),190px);opacity:0}}
        @keyframes fBody{0%,38%{opacity:1}48%{opacity:0}100%{opacity:0}}
        @keyframes fLettersOut{0%,44%{opacity:1}55%{opacity:0}100%{opacity:0}}
        @keyframes fMarkReveal{0%,46%{opacity:0;transform:translate(-50%,-50%) scale(.82)}57%{opacity:1;transform:translate(-50%,-50%) scale(1)}88%{opacity:1;transform:translate(-50%,-50%) scale(1)}96%{opacity:0}100%{opacity:0}}
        @keyframes fMarkHue{0%{color:#f5f2ec}25%{color:#d98038}50%{color:#e59248}75%{color:#d9ab88}100%{color:#f5f2ec}}
        @keyframes fSun{0%,44%{transform:translate(-50%,130px) scale(.65);opacity:0}60%{transform:translate(-50%,0) scale(1);opacity:.92}90%{transform:translate(-50%,0) scale(1);opacity:.92}100%{transform:translate(-50%,130px) scale(.65);opacity:0}}
        @keyframes fSunHue{0%{background-color:#e59248}25%{background-color:#c25a1a}50%{background-color:#d98038}75%{background-color:#750006}100%{background-color:#e59248}}
        @keyframes fFlash{0%,42%{opacity:0;transform:translate(-50%,-50%) scale(.3)}49%{opacity:.95;transform:translate(-50%,-50%) scale(1.1)}58%{opacity:0;transform:translate(-50%,-50%) scale(1.6)}100%{opacity:0}}
        @keyframes fDawn{0%,40%{opacity:0}62%{opacity:1}90%{opacity:1}100%{opacity:0}}
      `}</style>
    </div>
  );
}
