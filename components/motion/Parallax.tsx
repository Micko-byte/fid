"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionStyle } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /** vertical travel as a fraction of the element height; negative = rises faster */
  speed?: number;
  /** optional opacity fade range */
  fade?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Lightweight scroll parallax. Translates the element on Y as it moves through
 * the viewport. Disabled under reduced-motion.
 */
export default function Parallax({ children, speed = 0.25, fade = false, className, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const travel = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${travel}%`, `${-travel}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const mStyle: MotionStyle = reduce
    ? { ...(style as MotionStyle) }
    : { ...(style as MotionStyle), y, ...(fade ? { opacity } : {}) };

  return (
    <motion.div ref={ref} className={className} style={mStyle}>
      {children}
    </motion.div>
  );
}
