"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const BLUE = "#d98038";

const stats = [
  { value: 15, suffix: "+", label: "Years shaping reputation" },
  { value: 250, suffix: "+", label: "Campaigns delivered" },
  { value: 80, suffix: "+", label: "Brands & institutions" },
  { value: 12, suffix: "+", label: "African markets" },
];

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{n}{suffix}</>;
}

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(4.5rem,9vw,8rem)", paddingBottom: "clamp(4.5rem,9vw,8rem)", borderTop: "1px solid rgba(38,0,0,0.1)", borderBottom: "1px solid rgba(38,0,0,0.1)" }}>
      <div
        ref={ref}
        style={{
          maxWidth: "1320px", margin: "0 auto",
          paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)",
          textAlign: "center",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: BLUE, marginBottom: "0.9rem" }}
        >
          The measure of our work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05 }}
          style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 800, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1c1c1c", textTransform: "uppercase", margin: "0 auto clamp(2.6rem,5vw,4rem)", maxWidth: "20ch" }}
        >
          A decade and a half of measurable impact.
        </motion.h2>

        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(1.5rem,3vw,2.5rem)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}
            >
              <span style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 800, fontSize: "clamp(3rem,7vw,5.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#750006" }}>
                <Counter value={s.value} suffix={s.suffix} run={inView} />
              </span>
              <span aria-hidden style={{ width: "34px", height: "3px", background: BLUE, borderRadius: "2px" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.78rem,1vw,0.92rem)", fontWeight: 500, letterSpacing: "0.04em", color: "rgba(28,28,28,0.66)", maxWidth: "16ch" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 2.6rem !important; }
        }
      `}</style>
    </section>
  );
}
