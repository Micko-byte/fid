"use client";

/**
 * Footer sign-off animation (ported + refined from the FID Brand Motion Kit).
 * Little climbers carry F·I·D·&·C·O up a sunrise ridge, then merge into the
 * assembled logo mark with a flash bloom. Seamless loop.
 */

const LOGO_PATHS = (
  <g fill="currentColor">
    <path d="M322.86,311.32c-9.7-4.24-19.29-2.71-28.71-2.94c-7.09-0.17-14.19-0.03-21.81-0.03c0-5.52,0-10.6,0-17.2c19.24,1.59,38.98-3.37,58.03,4.44c17.02,6.98,26.45,21.17,26.45,39.99c0,19.43-8.16,33.85-25.24,42.13c-6.71,3.25-13.81,5.24-21.34,5.19c-12.62-0.08-25.24-0.02-38.14-0.02c0-18.55,0-36.43,0-54.59c5.72-1.34,11.46-0.45,17.89-0.6c0,12.01,0,23.72,0,35.96c10.05,0.74,19.45,1.23,28.66-1.04c10.92-2.69,18.59-11.57,19.8-21.99C339.94,327.92,334.82,317.96,322.86,311.32z" />
    <path d="M166.73,330.52c6.99-3.52,13.9-2.85,20.73-2.87c13.43-0.04,26.85-0.01,40.64-0.01c1.74,5.96,0.3,11.88,0.97,18.54c-15.83,0-31.03-0.01-46.24,0c-9.76,0.01-11.21,1.56-11.27,12.09c-0.04,7.94-0.01,15.89-0.01,24.23c-6.27,0-11.96,0-18.06,0c0-10.88-0.76-21.88,0.25-32.69C154.49,341.74,158.66,334.74,166.73,330.52z" />
    <path d="M258.75,321.3c0,20.93,0,41.03,0,61.26c-5.75,0-10.94,0-16.43,0c0-30.37,0-60.35,0-90.79c5.38,0,10.5,0,16.43,0C258.75,301.32,258.75,310.9,258.75,321.3z" />
    <path d="M153.42,301.27c0-3.46,0-6.18,0-9.41c25.27,0,50.05,0,75.16,0c0,5.25,0,10.36,0,16.47c-10.95,0-21.89,0-32.82,0c-12.09,0-24.19-0.24-36.27,0.12C154.63,308.6,152.59,307.13,153.42,301.27z" />
    <path d="M448.16,380.66c-19.21,7.25-36.6-1.7-39.02-19.51c-1.44-10.64,3.45-21.03,12.4-26.33c9.95-5.9,21.79-4.59,31.85,3.79c-1.46,3.2-4.15,5.23-6.55,7.42c-10.55-5.08-19.52-4.41-24.02,1.67c-3.59,4.84-2.85,14.89,1.48,20.11c5.08,6.12,12.62,6.45,22.26,0.92c2.88,1.44,4.72,4.13,6.77,6.53C453.26,378.49,450.4,378.86,448.16,380.66z" />
    <path d="M463.25,349.47c14.02-7.26,27.8-1.71,29.91,11.52c1.51,9.49-3.04,18.19-11.18,21.35c-8.54,3.32-18.42,0.22-23.21-7.31C453.69,367.09,455.13,357.94,463.25,349.47z" />
    <path d="M392.45,372.08c-1.07,5.51,4.79,6.08,5.85,11c-7.97-0.81-15.7-0.76-23.46,0.26c-4.47,0.59-8.79-1.75-10.79-6.75c-1.97-4.94-0.75-9.36,2.92-12.69c2.22-2.02,2.22-3.57,1.36-6.27c-1.27-4.01-0.13-7.78,3.53-9.98c4.1-2.47,8.62-2.38,12.81-0.41c3.31,1.55,3.39,5.21,1.76,7.69c-1.57,2.38-4.07,1.55-5.78-0.99c-0.49-0.73-1.69-0.93-3.69-1.94c-1.04,8.28,5.64,10.16,8.98,15.51c2.46-7.01,5.76-4.11,8.93-2.32C395.45,368.11,393.43,369.6,392.45,372.08z" />
    <path d="M508.05,371.73c2.81,4.61,2.43,8.37-1.64,10.99c-2.71,1.75-5.66,1.2-7.83-1.26c-2.4-2.71-2.71-6.05-0.55-8.97C500.68,368.92,504.08,368.57,508.05,371.73z" />
    <path d="M467.36,363.17c1.55-5.74,4.9-7.75,9.62-6.27c4.48,1.41,5.71,5.25,4.96,9.76c-0.67,4.01-3.14,6.24-7.05,6.2C469.28,372.8,467.13,369.32,467.36,363.17z" />
    <path d="M373.33,367.93c5.07-0.88,5.49,4.28,9.11,5.35c-2.99,3.87-6.07,3.53-8.82,1.91C370.86,373.56,370.98,370.88,373.33,367.93z" />
  </g>
);

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
        <div style={{ animation: "fMarkHue calc(6.5s*var(--spd)) linear infinite" }}>
          <svg viewBox="150 286 362 102" style={{ width: "100%", height: "auto", display: "block" }}>{LOGO_PATHS}</svg>
        </div>
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
