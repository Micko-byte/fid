"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: "15+", label: "Years" },
  { value: "10+", label: "Industries" },
  { value: "8+", label: "Markets" },
  { value: "100+", label: "Campaigns" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#D98038" }}>
          Who we are
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading leading-tight mb-24 max-w-4xl"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            color: "#260000",
            letterSpacing: "-0.02em",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          We treat communication as influence — not a function.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="pt-8 pb-4 pr-8"
            >
              <p
                className="font-heading leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#750006", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </p>
              <p className="font-body text-xs uppercase tracking-[0.15em]" style={{ color: "rgba(38,0,0,0.4)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
