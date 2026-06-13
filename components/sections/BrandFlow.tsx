"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  "/logos/executive-office-president.png", "/logos/lc-waikiki.png", "/logos/unhcr.png",
  "/logos/columbia-africa.png", "/logos/state-dept-culture.png", "/logos/chloride-exide.png",
  "/logos/thrive-hospitality.png", "/logos/amahoro-coalition.png", "/logos/bomas-of-kenya.png",
  "/logos/wrc-safari-rally.png", "/logos/elysium-capital.png", "/logos/medigah-london-hair.png",
  "/logos/abyan-salon-spa.png", "/logos/2nu-kollexion.png",
];

function Strip({ items, reverse, dur }: { items: string[]; reverse?: boolean; dur: number }) {
  const track = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", padding: "0.5rem 0" }}>
      <div className={reverse ? "bf-strip bf-rev" : "bf-strip"} style={{ display: "flex", width: "max-content", animationDuration: `${dur}s` }}>
        {track.map((src, i) => (
          <div key={i} className="bf-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const half = Math.ceil(logos.length / 2);

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "clamp(4.5rem,9vw,7rem)", paddingBottom: "clamp(4.5rem,9vw,7rem)", background: "linear-gradient(110deg, #5B0E14 0%, #7a1420 30%, #b8541f 55%, #e0922f 78%, #F1E194 100%)" }}>
      {/* animated colour shift */}
      <motion.div aria-hidden animate={{ opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(50% 80% at 20% 50%, rgba(241,225,148,0.25) 0%, transparent 60%), radial-gradient(50% 80% at 80% 50%, rgba(91,14,20,0.3) 0%, transparent 60%)" }} />

      <div ref={ref} style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "clamp(2.5rem,5vw,3.5rem)" }}>
        <motion.span initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff" }}>
          <span style={{ width: "24px", height: "1px", background: "#fff", opacity: 0.7 }} /> Trusted by
        </motion.span>
        <motion.h2 initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }} animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}} transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#fff", marginTop: "0.9rem", letterSpacing: "-0.01em", lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
          Governments, global brands &amp; institutions.
        </motion.h2>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <Strip items={logos.slice(0, half)} dur={32} />
        <Strip items={logos.slice(half)} reverse dur={38} />
      </div>

      <style>{`
        .bf-strip { animation-name: bf-move; animation-timing-function: linear; animation-iteration-count: infinite; }
        .bf-rev { animation-name: bf-move-rev; }
        @keyframes bf-move { to { transform: translateX(-50%); } }
        @keyframes bf-move-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .bf-strip:hover { animation-play-state: paused; }
        .bf-chip { flex-shrink:0; height:clamp(58px,7vw,80px); width:clamp(150px,16vw,200px); margin:0 0.6rem;
          display:flex; align-items:center; justify-content:center; background:#fff; border-radius:8px; padding:0.9rem 1.2rem;
          box-shadow:0 6px 20px rgba(0,0,0,0.12); transition:transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s; }
        .bf-chip img { max-width:100%; max-height:100%; object-fit:contain; filter:grayscale(100%); opacity:.7; transition:filter .35s, opacity .35s; }
        .bf-chip:hover { transform:translateY(-6px) scale(1.05); box-shadow:0 16px 36px rgba(0,0,0,0.22); }
        .bf-chip:hover img { filter:grayscale(0%); opacity:1; }
      `}</style>
    </section>
  );
}
