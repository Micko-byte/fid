"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "100%"]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Parallax bg grain */}
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(245,242,236,0.015) 0 1px, transparent 1px 72px)",
          }}
        />
      </motion.div>

      {/* Radial glow */}
      <motion.div
        style={{ opacity, scale }}
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          style={{
            width: "80vw",
            height: "80vw",
            maxWidth: 900,
            maxHeight: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(117,0,6,0.18) 0%, rgba(217,128,56,0.07) 45%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Centre content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Top line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            marginBottom: "clamp(1.6rem, 3vw, 2.8rem)",
          }}
        >
          <motion.div
            style={{ width: lineWidth, height: "1px", background: "#d98038" }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(245,242,236,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Impact · Insight · Strategy
          </span>
          <motion.div
            style={{ width: lineWidth, height: "1px", background: "#750006" }}
          />
        </div>

        {/* Large statement */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.8rem, 7vw, 7rem)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#f5f2ec",
            margin: "0 0 clamp(1.4rem, 2.5vw, 2.2rem)",
          }}
        >
          Africa's story,
          <br />
          <em style={{ fontStyle: "italic", color: "#d98038" }}>
            told with precision.
          </em>
        </h2>

        {/* Sub line */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 1.35vw, 1.05rem)",
            color: "rgba(245,242,236,0.4)",
            letterSpacing: "0.04em",
            maxWidth: "46ch",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Strategic communications built for the continent's most important moments.
        </p>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, #d98038, transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
