"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface BrandMarkProps {
  size?: number;
  /** primary stroke color */
  color?: string;
  /** secondary / accent color */
  accent?: string;
  className?: string;
  /** keep slowly rotating after entrance */
  spin?: boolean;
}

/**
 * Animated FID & Co. diamond mark — concentric rhombi (the brand's pattern motif)
 * that draw on, breathe, and slowly rotate. Gold/charcoal by default (no burgundy).
 * Reduced-motion: renders static.
 */
export default function BrandMark({
  size = 120,
  color = "#1C1C1C",
  accent = "#742F14",
  className,
  spin = true,
}: BrandMarkProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();

  // three nested diamonds (rhombi)
  const rings = [
    { d: "M60 6 L114 60 L60 114 L6 60 Z", c: color, w: 1.4 },
    { d: "M60 26 L94 60 L60 94 L26 60 Z", c: accent, w: 1.4 },
    { d: "M60 44 L76 60 L60 76 L44 60 Z", c: color, w: 1.4 },
  ];

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ overflow: "visible" }}
      animate={!reduce && spin && inView ? { rotate: 360 } : {}}
      transition={!reduce && spin ? { duration: 60, repeat: Infinity, ease: "linear" } : {}}
    >
      {rings.map((r, i) => (
        <motion.path
          key={i}
          d={r.d}
          fill="none"
          stroke={r.c}
          strokeWidth={r.w}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: i === 1 ? 1 : 0.55 } : {}}
          transition={{ duration: 1.4, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {/* center pulse */}
      <motion.circle
        cx="60" cy="60" r="3" fill={accent}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 1.3, 1], opacity: 1 } : {}}
        transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "60px 60px" }}
      />
    </motion.svg>
  );
}
