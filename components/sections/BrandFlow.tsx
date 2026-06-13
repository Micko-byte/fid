"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollVelocity from "@/components/ui/ScrollVelocity";

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
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "clamp(4.5rem,9vw,7rem)", paddingBottom: "clamp(4.5rem,9vw,7rem)", backgroundColor: "#f7ecc4" }}>
      {/* subtle wine wash to match the site */}
      <motion.div aria-hidden animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(50% 80% at 15% 50%, rgba(91,14,20,0.10) 0%, transparent 60%), radial-gradient(50% 80% at 85% 50%, rgba(91,14,20,0.08) 0%, transparent 60%)" }} />

      <div ref={ref} style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem", marginBottom: "clamp(2.5rem,5vw,3.5rem)" }}>
        <motion.span initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14" }}>
          <span style={{ width: "24px", height: "1px", background: "#5B0E14", opacity: 0.7 }} /> Trusted by
        </motion.span>
        <motion.h2 initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }} animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}} transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(2.4rem,5.5vw,4.2rem)", color: "#1a1a1a", marginTop: "0.9rem", letterSpacing: "-0.02em", lineHeight: 1.0, textTransform: "uppercase" }}>
          Governments, global brands &amp; institutions.
        </motion.h2>
      </div>

      {/* scroll-velocity ribbon */}
      <div style={{ position: "relative", zIndex: 2, color: "rgba(91,14,20,0.16)", marginBottom: "clamp(2rem,4vw,3rem)" }}>
        <ScrollVelocity texts={["Government · Retail · Hospitality · Healthcare · Finance · Culture · Sport ·"]} velocity={45} numCopies={3} className="bf-vel" />
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <Strip items={logos.slice(0, half)} dur={32} />
        <Strip items={logos.slice(half)} reverse dur={38} />
      </div>

      <style>{`
        .bf-vel { font-family: var(--font-heading,'Oswald'); font-weight: 700; text-transform: uppercase; font-size: clamp(2rem,5vw,4rem); letter-spacing: -0.01em; }
        .bf-strip { animation-name: bf-move; animation-timing-function: linear; animation-iteration-count: infinite; }
        .bf-rev { animation-name: bf-move-rev; }
        @keyframes bf-move { to { transform: translateX(-50%); } }
        @keyframes bf-move-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .bf-strip:hover { animation-play-state: paused; }
        .bf-chip { flex-shrink:0; height:clamp(64px,7.5vw,88px); width:clamp(160px,17vw,210px); margin:0 0.6rem;
          display:flex; align-items:center; justify-content:center; background:#fff; border-radius:8px; padding:0.9rem 1.3rem;
          box-shadow:0 6px 20px rgba(91,14,20,0.12); border:1px solid rgba(91,14,20,0.06); transition:transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s; }
        .bf-chip img { max-width:100%; max-height:100%; object-fit:contain; opacity:1; image-rendering:auto; }
        .bf-chip:hover { transform:translateY(-6px) scale(1.05); box-shadow:0 16px 36px rgba(91,14,20,0.2); }
      `}</style>
    </section>
  );
}
