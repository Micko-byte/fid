"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FallingTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export default function FallingText({ text, className = "", highlightWords = [] }: FallingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.12em] ${className}`}>
      {words.map((word, i) => {
        const highlighted = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()));
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: -26, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-block",
              color: highlighted ? "#742F14" : "inherit",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
