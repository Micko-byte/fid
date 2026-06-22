"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";

const ITEMS = [
  { num: "01", label: "Strategic Communications" },
  { num: "02", label: "Media Strategy" },
  { num: "03", label: "Digital & Influencer" },
  { num: "04", label: "Experiential Marketing" },
  { num: "05", label: "Brand Activations" },
  { num: "06", label: "Public Relations" },
  { num: "07", label: "Owned Platforms" },
  { num: "08", label: "Cultural Relevance" },
];

const BG = "#260000";

/** Velocity-reactive marquee: base auto-scroll, accelerates + skews with scroll speed. */
export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothV = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const vFactor = useTransform(smoothV, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smoothV, [-1500, 0, 1500], [-6, 0, 6], { clamp: true });

  const dirRef = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dirRef.current * (delta / 1000) * 2.2; // % per frame base
    const v = vFactor.get();
    if (v < 0) dirRef.current = -1; else if (v > 0) dirRef.current = 1;
    move += dirRef.current * Math.abs(v) * (delta / 1000) * 6;
    let next = baseX.get() - move;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className="marquee-strip" style={{ overflow: "hidden", backgroundColor: BG, borderTop: "1px solid rgba(217,128,56,0.16)", borderBottom: "1px solid rgba(217,128,56,0.16)", padding: "1.35rem 0", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "14%", zIndex: 2, pointerEvents: "none", background: `linear-gradient(90deg, ${BG}, transparent)` }} />
      <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "14%", zIndex: 2, pointerEvents: "none", background: `linear-gradient(270deg, ${BG}, transparent)` }} />

      <motion.div style={{ display: "flex", width: "max-content", alignItems: "center", x: reduce ? 0 : x, skewX: reduce ? 0 : skew, willChange: "transform" }}>
        {track.map((item, i) => (
          <span key={i} className="marquee-item" style={{ display: "inline-flex", alignItems: "center", gap: "0.95rem", padding: "0 2.4rem" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", color: "#d98038", fontVariantNumeric: "tabular-nums", opacity: 0.85 }}>{item.num}</span>
            <span className="mq-txt" style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(0.95rem,1.5vw,1.25rem)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#FFFFFF", whiteSpace: "nowrap", transition: "color 0.4s" }}>{item.label}</span>
            <span aria-hidden style={{ width: "6px", height: "6px", flexShrink: 0, transform: "rotate(45deg)", border: "1px solid #d9ab88", opacity: 0.5 }} />
          </span>
        ))}
      </motion.div>

      <style>{`.marquee-item:hover .mq-txt { color: #d98038 !important; }`}</style>
    </div>
  );
}
