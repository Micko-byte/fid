"use client";

import { createElement, useRef, type ElementType, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface SplitRevealProps {
  children: string;
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "word" (default) or "char" */
  by?: "word" | "char";
  once?: boolean;
}

/**
 * Per-word (or per-char) masked reveal. Each token sits in an overflow-hidden
 * wrapper and rises into place with a clip-feel. Degrades to a plain fade
 * when prefers-reduced-motion is set.
 */
export default function SplitReveal({
  children,
  as = "div",
  style,
  className,
  delay = 0,
  stagger = 0.045,
  by = "word",
  once = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });
  const reduce = useReducedMotion();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[as as keyof typeof motion] as any;
  const tokens = by === "char" ? Array.from(children) : children.split(" ");

  if (reduce) {
    return createElement(as, { ref, style, className }, children);
  }

  return (
    <MotionTag ref={ref} style={style} className={className} aria-label={children}>
      {tokens.map((tok: string, i: number) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {tok === " " ? " " : tok}
          </motion.span>
          {by === "word" && i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
