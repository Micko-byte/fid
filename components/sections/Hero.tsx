"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const rawX = useMotionValue(0.72);
  const rawY = useMotionValue(0.28);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 22, restDelta: 0.0005 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 22, restDelta: 0.0005 });

  const spotlight = useTransform([smoothX, smoothY], ([x, y]) => {
    const px = Math.round((x as number) * 100);
    const py = Math.round((y as number) * 100);
    return [
      `radial-gradient(circle 420px at ${px}% ${py}%, rgba(217,171,136,0.18) 0%, transparent 62%)`,
      `radial-gradient(circle 620px at 82% 18%, rgba(217,128,56,0.16) 0%, transparent 54%)`,
      `radial-gradient(circle 780px at 20% 86%, rgba(117,0,6,0.18) 0%, transparent 50%)`,
      "linear-gradient(180deg, rgba(29,2,2,0.2) 0%, rgba(29,2,2,0.55) 100%)",
    ].join(", ");
  });

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((event.clientX - rect.left) / rect.width);
      rawY.set((event.clientY - rect.top) / rect.height);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    const introState = document.documentElement.dataset.intro;
    setIntroDone(introState === "done");

    const onIntroDone = () => setIntroDone(true);
    window.addEventListener("fid:intro-done", onIntroDone);

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    const section = sectionRef.current;
    if (!prefersReducedMotion && !mobile && section) {
      section.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      window.removeEventListener("fid:intro-done", onIntroDone);
      section?.removeEventListener("pointermove", onPointerMove);
    };
  }, [onPointerMove, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1d0202",
        overflow: "hidden",
        color: "#F5F2EC",
      }}
    >
      {/* ── Full-bleed background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hero-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: 0,
          opacity: 0.55,
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <style>{`
        @media (max-width: 767px) {
          .hero-video {
            object-fit: contain !important;
            background-color: #1d0202;
          }
        }
      `}</style>

      {/* ── Cursor-reactive spotlight — rides on top of video ── */}
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          mixBlendMode: "multiply",
          background: prefersReducedMotion
            ? "linear-gradient(180deg, rgba(29,2,2,0.55) 0%, rgba(29,2,2,0.85) 100%)"
            : spotlight,
        }}
      />

      {/* Ambient warm glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 90% at 72% 24%, rgba(255,138,61,0.10) 0%, transparent 44%), radial-gradient(120% 92% at 16% 84%, rgba(117,0,6,0.14) 0%, transparent 44%)",
        }}
      />

      {/* Scrim — gradient vignette for legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(29,2,2,0.35) 0%, rgba(29,2,2,0.04) 35%, rgba(29,2,2,0.65) 100%)",
        }}
      />

      {/* Pulsing orb */}
      {!prefersReducedMotion && !isMobile && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "18%",
            transform: "translateX(-50%)",
            width: "34vw",
            height: "34vw",
            maxWidth: "520px",
            maxHeight: "520px",
            borderRadius: "9999px",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 3,
            background:
              "radial-gradient(circle, rgba(217,128,56,0.22) 0%, rgba(117,0,6,0.10) 35%, transparent 72%)",
          }}
          animate={{ opacity: [0.35, 0.58, 0.35], scale: [0.94, 1.04, 0.94] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── All content fades in after intro ── */}
      <motion.div
        style={{ display: "contents" }}
        initial={{ opacity: 0, y: 18 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* ── hero-top: kicker row ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1320px",
            width: "100%",
            margin: "0 auto",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            paddingTop: "clamp(7rem, 16vh, 10rem)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              flexWrap: "wrap",
            }}
          >
            {/* "Insight. Strategy. Impact." eyebrow */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#D9AB88",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "22px",
                  height: "1px",
                  background: "#D9AB88",
                  opacity: 0.7,
                }}
              />
              Insight. Strategy. Impact.
            </span>

            {/* "Nairobi · Africa" */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(217,171,136,0.6)",
              }}
            >
              Nairobi · Africa
            </span>
          </motion.div>
        </div>

        {/* ── hero-body: headline + meta + scroll cue ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            maxWidth: "1320px",
            width: "100%",
            margin: "0 auto",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            paddingBottom: "clamp(2rem, 5vh, 4rem)",
          }}
        >
          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
              fontWeight: 300,
              textTransform: "uppercase",
              color: "rgba(245,242,236,0.90)",
              fontSize: "clamp(1.7rem, 3.7vw, 3.5rem)",
              lineHeight: 1.12,
              letterSpacing: 0,
              marginTop: "clamp(1.2rem, 3.5vh, 2rem)",
              textWrap: "balance",
              maxWidth: "24ch",
            } as React.CSSProperties}
          >
            We turn communication into{" "}
            <em style={{ fontStyle: "normal", fontWeight: 600, color: "#D9AB88" }}>influence</em>
            {" "}— building{" "}
            <strong style={{ fontWeight: 600, color: "#F5F2EC" }}>credibility</strong>
            {" "}and{" "}
            <strong style={{ fontWeight: 600, color: "#F5F2EC" }}>cultural relevance</strong>
            {" "}across Africa.
          </motion.h1>

          {/* hero-meta row: lede left + explore-link right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
              marginTop: "clamp(1.8rem, 5vh, 3rem)",
            }}
          >
            {/* Lede */}
            <p
              style={{
                maxWidth: "44ch",
                color: "rgba(245,242,236,0.82)",
                fontSize: "clamp(1rem, 1.4vw, 1.18rem)",
                lineHeight: 1.6,
                fontFamily: "var(--font-body, 'Noto Sans', sans-serif)",
              }}
            >
              FID &amp; Co. is a full-service strategic communications and brand experience firm operating across Kenya and Africa.
            </p>

            {/* Explore link */}
            <Link
              href="/#feature"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(217,171,136,0.75)",
                fontWeight: 500,
                whiteSpace: "nowrap",
                textDecoration: "none",
                transition: "color 0.35s, gap 0.35s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#F5F2EC";
                e.currentTarget.style.gap = "0.95rem";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(217,171,136,0.75)";
                e.currentTarget.style.gap = "0.6rem";
              }}
            >
              Explore the firm
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                style={{ flexShrink: 0 }}
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
            style={{ marginTop: "clamp(2rem, 5vh, 3rem)" }}
          >
            <Link
              href="/#feature"
              aria-label="Scroll to explore"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                color: "rgba(217,171,136,0.55)",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D9AB88")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(217,171,136,0.55)")}
            >
              {/* Animated dot/line */}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "1px",
                  height: "34px",
                  background: "linear-gradient(to bottom, #D9AB88, transparent)",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <style>{`
                  @keyframes scrolldown {
                    0%   { transform: translateY(-100%); opacity: 1; }
                    60%  { transform: translateY(100%);  opacity: 1; }
                    100% { transform: translateY(100%);  opacity: 0; }
                  }
                  .scroll-dot-inner {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 40%;
                    background: #D98038;
                    animation: scrolldown 1.9s cubic-bezier(0.4,0,0.2,1) infinite;
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .scroll-dot-inner { animation: none; }
                  }
                `}</style>
                <span className="scroll-dot-inner" />
              </span>
              Scroll to explore
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto 0 0",
          height: "6rem",
          background: "linear-gradient(to top, #1d0202, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
