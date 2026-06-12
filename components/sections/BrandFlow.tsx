"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BrandMark from "@/components/graphics/BrandMark";

const logos = [
  { src: "/logos/executive-office-president.png", alt: "Executive Office of the President" },
  { src: "/logos/lc-waikiki.png", alt: "LC Waikiki" },
  { src: "/logos/unhcr.png", alt: "UNHCR" },
  { src: "/logos/columbia-africa.png", alt: "Columbia Africa" },
  { src: "/logos/state-dept-culture.png", alt: "State Dept for Culture" },
  { src: "/logos/chloride-exide.png", alt: "Chloride Exide" },
  { src: "/logos/thrive-hospitality.png", alt: "Thrive Hospitality" },
  { src: "/logos/amahoro-coalition.png", alt: "Amahoro Coalition" },
  { src: "/logos/bomas-of-kenya.png", alt: "Bomas of Kenya" },
  { src: "/logos/wrc-safari-rally.png", alt: "WRC Safari Rally" },
  { src: "/logos/elysium-capital.png", alt: "Elysium Capital" },
  { src: "/logos/medigah-london-hair.png", alt: "Medigah London Hair" },
];

function LogoCell({ l, i, inView }: { l: typeof logos[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="bf-cell"
    >
      {/* corner accents */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <span key={c} className={`bf-corner bf-${c}`} />
      ))}
      <div className="bf-chip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.src} alt={l.alt} loading="lazy" />
      </div>
    </motion.div>
  );
}

export default function BrandFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(120% 90% at 50% 0%, #4a0b12 0%, #2a0508 45%, #1a0306 100%)",
        paddingTop: "clamp(5rem,10vw,8rem)",
        paddingBottom: "clamp(6rem,12vw,10rem)",
      }}
    >
      {/* ambience sparkles */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <span className="bf-spark" style={{ top: "14%", left: "18%" }} />
        <span className="bf-spark" style={{ top: "26%", right: "22%", animationDelay: "1s" }} />
        <span className="bf-spark" style={{ bottom: "30%", left: "30%", animationDelay: "2s" }} />
      </div>

      {/* header */}
      <div ref={ref} style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "640px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "clamp(3rem,6vw,5rem)" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#F1E194" }}
        >
          <span style={{ width: "24px", height: "1px", background: "#F1E194", opacity: 0.6 }} /> Trusted partners
        </motion.span>
        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#F5F2EC", marginTop: "1rem", letterSpacing: "-0.01em", lineHeight: 1.05 }}
        >
          Governments, global brands &amp; institutions.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, color: "rgba(245,242,236,0.55)", marginTop: "1.2rem" }}
        >
          Every brief converges on one standard — communications that are credible, culturally fluent and built to endure.
        </motion.p>
      </div>

      {/* grid + flow */}
      <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem", zIndex: 2 }}>
        {/* flow schema */}
        <svg className="bf-flow" preserveAspectRatio="none" viewBox="0 0 1000 820" aria-hidden>
          <defs>
            <linearGradient id="bfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1E194" stopOpacity="0" />
              <stop offset="100%" stopColor="#F1E194" stopOpacity="0.7" />
            </linearGradient>
            <filter id="bfGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {[125, 375, 625, 875].map((x, i) => (
            <g key={i}>
              <path d={`M ${x},300 C ${x},560 ${480 + i * 14},520 500,720`} fill="none" stroke="rgba(241,225,148,0.06)" strokeWidth="1" />
              <path className="bf-line" d={`M ${x},300 C ${x},560 ${480 + i * 14},520 500,720`} fill="none" stroke="url(#bfGrad)" strokeWidth="2" strokeDasharray="20 600" style={{ animationDuration: `${4 + i}s` }} />
              <path className="bf-line" d={`M ${x},300 C ${x},560 ${480 + i * 14},520 500,720`} fill="none" stroke="#F1E194" strokeWidth="3" strokeDasharray="14 640" strokeLinecap="round" filter="url(#bfGlow)" style={{ animationDuration: `${5 + i}s`, animationDelay: `${i * 0.4}s` }} />
            </g>
          ))}
        </svg>

        {/* logo grid */}
        <div className="bf-grid">
          {logos.map((l, i) => (
            <LogoCell key={i} l={l} i={i} inView={inView} />
          ))}
        </div>

        {/* convergence hub */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(3rem,6vw,5rem)", position: "relative", zIndex: 3 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="bf-beam" />
            <div className="bf-hub">
              <span className="bf-ring bf-ring1" />
              <span className="bf-ring bf-ring2" />
              <span className="bf-hub-glow" />
              <BrandMark size={56} color="#F1E194" accent="#F5F2EC" spin />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bf-spark { position:absolute; width:3px; height:3px; border-radius:50%; background:#F1E194; opacity:.3; animation:bf-pulse 3s ease-in-out infinite; }
        @keyframes bf-pulse { 0%,100%{opacity:.15;transform:scale(1);} 50%{opacity:.6;transform:scale(1.6);} }

        .bf-flow { position:absolute; inset:-10px 0 0 0; height:860px; width:100%; pointer-events:none; z-index:0; overflow:visible; display:none; }
        @media (min-width:768px){ .bf-flow{ display:block; } }
        .bf-line { animation: bf-flow-move linear infinite; }
        @keyframes bf-flow-move { to { stroke-dashoffset:-1000; } }

        .bf-grid { position:relative; z-index:1; display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        @media (max-width:860px){ .bf-grid{ grid-template-columns:repeat(3,1fr); } }
        @media (max-width:520px){ .bf-grid{ grid-template-columns:repeat(2,1fr); } }

        .bf-cell { position:relative; height:6rem; display:flex; align-items:center; justify-content:center;
          background:rgba(241,225,148,0.03); border:1px solid rgba(241,225,148,0.08);
          transition:background .3s, border-color .3s, box-shadow .3s; overflow:hidden; }
        .bf-cell:hover { background:rgba(241,225,148,0.06); border-color:rgba(241,225,148,0.4); box-shadow:0 0 26px rgba(241,225,148,0.12); }
        .bf-chip { width:78%; height:54%; display:flex; align-items:center; justify-content:center;
          background:rgba(245,242,236,0.92); border-radius:3px; padding:7px; }
        .bf-chip img { max-width:100%; max-height:100%; object-fit:contain; filter:grayscale(100%); opacity:.8; transition:filter .35s, opacity .35s; }
        .bf-cell:hover .bf-chip img { filter:grayscale(0%); opacity:1; }

        .bf-corner { position:absolute; width:7px; height:7px; border-color:rgba(241,225,148,0.4); transition:all .3s; }
        .bf-cell:hover .bf-corner { width:11px; height:11px; border-color:#F1E194; }
        .bf-tl{top:0;left:0;border-top:1px solid;border-left:1px solid;}
        .bf-tr{top:0;right:0;border-top:1px solid;border-right:1px solid;}
        .bf-bl{bottom:0;left:0;border-bottom:1px solid;border-left:1px solid;}
        .bf-br{bottom:0;right:0;border-bottom:1px solid;border-right:1px solid;}

        .bf-beam { position:absolute; top:-128px; height:128px; width:2px;
          background:linear-gradient(to bottom, transparent, rgba(241,225,148,0.5), #F1E194);
          box-shadow:0 0 20px #F1E194; }
        .bf-hub { position:relative; width:96px; height:96px; border-radius:50%; display:flex; align-items:center; justify-content:center;
          background:#1a0306; border:1px solid rgba(241,225,148,0.3); box-shadow:0 0 50px rgba(241,225,148,0.28); }
        .bf-ring { position:absolute; border-radius:50%; }
        .bf-ring1 { inset:-10px; border:1px dashed rgba(241,225,148,0.25); animation:bf-spin 10s linear infinite; }
        .bf-ring2 { inset:-4px; border:1px dotted rgba(241,225,148,0.35); animation:bf-spin 15s linear infinite reverse; }
        .bf-hub-glow { position:absolute; inset:0; border-radius:50%; background:rgba(241,225,148,0.12); filter:blur(14px); animation:bf-pulse 3s ease-in-out infinite; }
        @keyframes bf-spin { to { transform:rotate(360deg); } }
      `}</style>
    </section>
  );
}
