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
 * Characters are grouped by word so lines only break at spaces — never mid-word.
 */
export function TextRoll({ children, duration = 0.5, className, style, once = true }: TextRollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = children.split(" ");
  let charIndex = 0;

  return (
    <motion.span ref={ref} className={className} style={{ display: "inline-block", ...style }} aria-label={children}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((ch) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={i}
                  aria-hidden
                  style={{ display: "inline-block" }}
                  initial={{ y: "0.32em", opacity: 0 }}
                  animate={inView ? { y: "0em", opacity: 1 } : {}}
                  transition={{ duration, delay: i * 0.016, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

export default TextRoll;
