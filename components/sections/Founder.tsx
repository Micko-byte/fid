"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      id="founder"
      style={{
        backgroundColor: "#1d0202",
        color: "#F5F2EC",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* F.I. Watermark */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", top: "50%", right: "-2%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 500,
          fontSize: "clamp(14rem, 34vw, 28rem)",
          color: "rgba(117,0,6,0.10)", lineHeight: 0.8,
          pointerEvents: "none", userSelect: "none", zIndex: 0,
          y: watermarkY,
        }}
      >
        F.I.
      </motion.div>

      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1320px", margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.7rem",
            fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038",
          }}
        >
          <span style={{ width: "26px", height: "1px", background: "#D98038", opacity: 0.7, flexShrink: 0 }} />
          Founder
        </motion.span>

        {/* Two-column grid */}
        <div className="founder-grid">
          {/* Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <div
              style={{
                height: "clamp(360px, 46vw, 560px)",
                backgroundColor: "#260000",
                backgroundImage: "repeating-linear-gradient(135deg, rgba(217,171,136,0.07) 0 2px, transparent 2px 11px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: "0.7rem", border: "1px solid rgba(217,171,136,0.22)" }} />
              <span style={{ position: "absolute", left: "1rem", bottom: "0.9rem", fontFamily: "ui-monospace,monospace", fontSize: "0.64rem", letterSpacing: "0.05em", color: "rgba(217,171,136,0.7)", textTransform: "uppercase" }}>
                portrait — farida idris
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.14 }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')", fontWeight: 600,
                color: "#F5F2EC",
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.0, letterSpacing: "-0.005em",
                marginTop: "1.4rem", textTransform: "uppercase",
              }}
            >
              Farida Idris
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22 }}
              style={{
                fontSize: "0.74rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#D98038", marginTop: "1rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Founder &amp; Lead Strategist
            </motion.div>

            <motion.blockquote
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                fontStyle: "italic", color: "#F5F2EC",
                fontSize: "clamp(1.4rem, 2.7vw, 2.2rem)",
                lineHeight: 1.32, letterSpacing: "-0.01em",
                marginTop: "2.4rem", maxWidth: "30ch",
              }}
            >
              <span style={{ color: "#750006", fontStyle: "normal" }}>&ldquo;</span>
              Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve.
              <span style={{ color: "#750006", fontStyle: "normal" }}>&rdquo;</span>
            </motion.blockquote>
          </div>
        </div>
      </div>

      <style>{`
        .founder-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: center;
          margin-top: 1.4rem;
        }
        @media (max-width: 1024px) {
          .founder-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
