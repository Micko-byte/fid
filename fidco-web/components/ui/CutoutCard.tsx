"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";

interface CutoutCardProps {
  /** Background image URL */
  image: string;
  /** Text cutout label — the text shows the image through it */
  label: string;
  /** Sub-label / eyebrow shown below cutout text */
  sublabel?: string;
  /** Link href */
  href?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Cult-UI–style cutout card: giant masked text that reveals the image underneath.
 */
export default function CutoutCard({
  image,
  label,
  sublabel,
  href,
  className = "",
  style,
  children,
}: CutoutCardProps) {
  const inner = (
    <motion.div
      className={`cutout-card ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        cursor: href ? "pointer" : "default",
        ...style,
      }}
      whileHover="hover"
    >
      {/* Background image */}
      <motion.div
        variants={{ hover: { scale: 1.04 } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={label}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Scrim */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.22) 0%, rgba(38,0,0,0.72) 100%)" }} />
      </motion.div>

      {/* Cutout text */}
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(1.4rem,3vw,2.5rem)", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 8vw, 8rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#f5f2ec",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          {label}
        </span>

        {sublabel && (
          <span style={{ display: "block", marginTop: "1rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,242,236,0.8)", fontWeight: 600 }}>
            {sublabel}
          </span>
        )}

        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>;
  }
  return inner;
}
