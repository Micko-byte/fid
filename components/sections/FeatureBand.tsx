"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import VariableProximity from "@/components/ui/VariableProximity";
import { Lightbulb, Compass, Target } from "@phosphor-icons/react";

const PILLARS = [
  { Icon: Lightbulb, label: "Insight", note: "We start by understanding." },
  { Icon: Compass, label: "Strategy", note: "We shape the direction." },
  { Icon: Target, label: "Impact", note: "We deliver measurable results." },
];

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  // On load, start the hero video at 1.4s and loop it (1.4s → end → 1.4s).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const LOOP_START = 1.4;

    const start = () => {
      el.currentTime = LOOP_START;
      el.play().catch(() => {});
    };
    const onEnded = () => {
      el.currentTime = LOOP_START;
      el.play().catch(() => {});
    };
    const onTimeUpdate = () => {
      if (el.currentTime < LOOP_START) el.currentTime = LOOP_START;
    };

    if (el.readyState >= 1) start();
    else el.addEventListener("loadedmetadata", start, { once: true });
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(9rem, 14vw, 13rem)",
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
              style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#742F14", marginBottom: "1rem", fontWeight: 500 }}
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
                <line x1="0" y1="3" x2="52" y2="3" stroke="#742F14" strokeWidth="1.5" />
                <circle cx="60" cy="3" r="2.5" fill="none" stroke="#742F14" strokeWidth="1" />
                <line x1="64" y1="3" x2="80" y2="3" stroke="#742F14" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
            </motion.div>

            <h2 style={{ maxWidth: "20ch", margin: 0 }}>
              <VariableProximity
                label="We treat communication as influence — not a function."
                containerRef={ref as import("react").MutableRefObject<HTMLElement | null>}
                radius={140}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', textTransform: "uppercase", color: "#1a1a1a", fontSize: "clamp(2.1rem,4.2vw,4rem)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
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

            {/* Insight · Strategy · Impact — icon pillars */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.2rem,3vw,2.4rem)", marginBottom: "clamp(1.8rem,3.5vw,2.6rem)" }}
            >
              {PILLARS.map(({ Icon, label, note }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "16ch" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "14px", border: "1px solid rgba(90,132,172,0.32)", background: "rgba(90,132,172,0.1)", color: "#5A84AC" }}>
                    <Icon size={22} weight="light" />
                  </span>
                  <span style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.02em", textTransform: "uppercase", color: "#1a1a1a" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.45, color: "rgba(26,26,26,0.55)" }}>{note}</span>
                </div>
              ))}
            </motion.div>

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

          {/* RIGHT: animation slot (awaiting new Canva animation) + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(1.4rem,3vw,2.2rem)", justifyContent: "center" }}
          >
            {/* Hero animation — loops 1.4s → end */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", width: "100%" }}
            >
              <video
                ref={videoRef}
                src="/illustrations/hero-influence-animated.mp4"
                muted
                autoPlay
                playsInline
                preload="auto"
                aria-label="Influence through strategic communication — animated"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </motion.div>

            {/* CTA — orange, matches the header / footer accent */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "#FC9C44",
                borderRadius: "22px",
                padding: "clamp(2rem,3.5vw,3rem)",
                color: "#3a1f10",
                boxShadow: "0 26px 70px rgba(252,156,68,0.35)",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700, opacity: 0.8, marginBottom: "0.9rem" }}>
                Ready when you are
              </p>
              <h3 style={{ fontFamily: '"Nohemi", var(--font-heading, "Oswald")', fontWeight: 800, fontSize: "clamp(1.9rem,3.2vw,2.8rem)", lineHeight: 1.0, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
                Let&apos;s build something meaningful.
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2rem", marginTop: "1.8rem" }}>
                <Link
                  href="/#contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#3a1f10", color: "#FC9C44", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.95rem 1.8rem", borderRadius: "999px", textDecoration: "none", transition: "transform 0.2s" }}
                  onPointerDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                  onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Book us
                </Link>
                <a href="mailto:info@fidco.africa" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.92rem", color: "#3a1f10", textDecoration: "none", borderBottom: "1px solid rgba(58,31,16,0.4)" }}>
                  info@fidco.africa
                </a>
              </div>
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
