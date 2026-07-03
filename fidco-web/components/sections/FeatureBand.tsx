"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Lightbulb, Compass, Target } from "@phosphor-icons/react";

const HeroOrb = dynamic(() => import("@/components/3d/HeroOrb"), { ssr: false });

const PILLARS = [
  { Icon: Lightbulb, label: "Insight", note: "We start by understanding." },
  { Icon: Compass, label: "Strategy", note: "We shape the direction." },
  { Icon: Target, label: "Impact", note: "We deliver measurable results." },
];

export default function FeatureBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);
  const dy = isMobile ? 18 : 36;

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
      className="section-light"
      style={{
        backgroundColor: "#f5f2ec",
        color: "#1c1c1c",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--section-y-hero)",
        paddingBottom: "var(--section-y)",
      }}
    >
      {/* Brand background overlays */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 88% 20%, rgba(217,128,56,0.12) 0%, transparent 58%), radial-gradient(ellipse 50% 50% at 10% 85%, rgba(117,0,6,0.07) 0%, transparent 55%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(135deg, rgba(117,0,6,0.025) 0 1px, transparent 1px 72px)", zIndex: 0 }} />
      {/* 3D floating orb — background decoration */}
      <HeroOrb />
      <div
        ref={ref}
        className="section-shell"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,7rem)", alignItems: "center" }}>

          {/* LEFT: editorial text — slide-up-fade-in on mount */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: dy * 0.6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="type-eyebrow"
              style={{ color: "#750006", marginBottom: "1rem" }}
            >
              The FID approach
            </motion.p>

            {/* Decorative SVG line divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", marginBottom: "clamp(1.2rem,2.5vw,2rem)" }}
            >
              <svg width="80" height="6" viewBox="0 0 80 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="3" x2="52" y2="3" stroke="#750006" strokeWidth="1.5" />
                <circle cx="60" cy="3" r="2.5" fill="none" stroke="#750006" strokeWidth="1" />
                <line x1="64" y1="3" x2="80" y2="3" stroke="#750006" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
            </motion.div>

            <motion.h2
              data-skew
              initial={{ opacity: 0, y: dy }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="type-h2"
              style={{ maxWidth: "20ch", margin: 0, color: "#1c1c1c" }}
            >
              We treat communication as influence, not a function.
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "1px", background: "rgba(28,28,28,0.15)", marginTop: "clamp(2rem,5vw,4rem)", marginBottom: "clamp(2rem,5vw,4rem)" }}
            />

            <motion.p
              initial={{ opacity: 0, y: dy * 0.6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="type-body"
              style={{ color: "rgba(28,28,28,0.62)", maxWidth: "48ch", marginBottom: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              Every engagement begins with insight, is guided by strategy, executed with precision and evaluated for impact. We build reputation, credibility and cultural relevance for the organisations shaping Africa&apos;s future.
            </motion.p>

            {/* Insight · Strategy · Impact — icon pillars */}
            <motion.div
              initial={{ opacity: 0, y: dy * 0.5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.2rem,3vw,2.4rem)", marginBottom: "clamp(1.8rem,3.5vw,2.6rem)" }}
            >
              {PILLARS.map(({ Icon, label, note }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "16ch" }}>
                  <Icon size={28} weight="light" color="#750006" />
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.02em", textTransform: "uppercase", color: "#1c1c1c" }}>{label}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.45, color: "rgba(28,28,28,0.55)" }}>{note}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: dy * 0.4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              <Button href="/#services" variant="primary" magnetic cursor="Expertise">Explore our expertise</Button>
              <Button href="/#work" variant="primary">See our work</Button>
            </motion.div>
          </div>

          {/* RIGHT: animation slot + CTA */}
          <motion.div
            initial={{ opacity: 0, y: dy * 0.5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(1.4rem,3vw,2.2rem)", justifyContent: "center" }}
          >
            {/* Hero animation — loops 1.4s → end */}
            <div className="fb-video" style={{ position: "relative", width: "100%" }}>
              <video
                ref={videoRef}
                src="/illustrations/hero-influence-animated.mp4"
                muted
                autoPlay
                playsInline
                preload="auto"
                aria-label="Influence through strategic communication — animated"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "14px" }}
              />
            </div>

            {/* CTA — orange, matches the header / footer accent */}
            <div
              style={{
                background: "#d98038",
                borderRadius: "14px",
                padding: "clamp(2rem,3.5vw,3rem)",
                color: "#260000",
                boxShadow: "0 20px 55px rgba(38,0,0,0.15)",
              }}
            >
              <p className="type-eyebrow" style={{ opacity: 0.8, marginBottom: "0.9rem" }}>
                Next step
              </p>
              <h3 className="type-h3" style={{ margin: 0 }}>
                Let&apos;s build something meaningful.
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.5, color: "#260000", opacity: 0.85, marginTop: "0.9rem" }}>
                Share your brief and we&apos;ll shape the route.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2rem", marginTop: "1.8rem" }}>
                <Button href="/#contact" variant="primary" magnetic={false} cursor="Let's talk">Book us</Button>
                <a href="mailto:info@fidco.africa" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.92rem", color: "#260000", textDecoration: "none", borderBottom: "1px solid rgba(38,0,0,0.4)" }}>
                  info@fidco.africa
                </a>
              </div>
            </div>
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
