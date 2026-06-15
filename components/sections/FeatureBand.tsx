"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import VariableProximity from "@/components/ui/VariableProximity";

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#f7ecc4",
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}
      >
        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

          {/* LEFT: editorial text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#5B0E14", marginBottom: "1rem", fontWeight: 500 }}
            >
              The FID approach
            </motion.p>

            {/* Decorative SVG line divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", marginBottom: "clamp(1.2rem,2.5vw,2rem)" }}
            >
              <svg width="80" height="6" viewBox="0 0 80 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="3" x2="52" y2="3" stroke="#5B0E14" strokeWidth="1.5" />
                <circle cx="60" cy="3" r="2.5" fill="none" stroke="#5B0E14" strokeWidth="1" />
                <line x1="64" y1="3" x2="80" y2="3" stroke="#5B0E14" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
            </motion.div>

            <h2 style={{ maxWidth: "14ch", margin: 0 }}>
              <VariableProximity
                label="We treat communication as influence — not a function."
                containerRef={ref as import("react").MutableRefObject<HTMLElement | null>}
                radius={140}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 400, 'opsz' 12"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                style={{ fontFamily: "'Roboto Flex', var(--font-heading,'Oswald')", textTransform: "uppercase", color: "#1a1a1a", fontSize: "clamp(2.8rem,6vw,5.6rem)", lineHeight: 0.96, letterSpacing: "-0.03em" }}
              />
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(26,26,26,0.15)", marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: "rgba(26,26,26,0.62)", fontSize: "clamp(0.95rem,1.3vw,1.15rem)", lineHeight: 1.65, fontFamily: "var(--font-body)", maxWidth: "48ch", marginBottom: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              Every engagement begins with insight, is guided by strategy, executed with precision and evaluated for impact. We build reputation, credibility and cultural relevance for the organisations shaping Africa&apos;s future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <Button href="/#services" variant="primary" magnetic cursor="Expertise">Explore our expertise</Button>
              <Button href="/#work" variant="outline">See our work</Button>
            </motion.div>
          </div>

          {/* RIGHT: decorative illustration */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Floating burgundy gradient blob */}
            <div
              style={{
                position: "absolute",
                width: "80%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(91,14,20,0.18) 0%, rgba(91,14,20,0.04) 60%, transparent 80%)",
                filter: "blur(40px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
            {/* Illustration with rotation + float */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", width: "90%", maxWidth: "480px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/illustrations/hero-cta-rings.png"
                alt="Abstract decorative rings"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  animation: "fb-spin 40s linear infinite",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes fb-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .fb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
