"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type TextRollProps = {
  children: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
};

/**
 * Per-character roll-in on scroll (motion-primitives style), on framer-motion.
 * Each letter rotates + blurs up into place with a stagger.
 */
export function TextRoll({ children, duration = 0.5, className, style, once = true }: TextRollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const letters = children.split("");

  return (
    <motion.span ref={ref} className={className} style={{ display: "inline-block", ...style }} aria-label={children}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block", transformOrigin: "bottom", whiteSpace: "pre" }}
          initial={{ rotateX: 90, y: "40%", opacity: 0, filter: "blur(4px)" }}
          animate={inView ? { rotateX: 0, y: "0%", opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default TextRoll;
