"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee (adapted from motion-primitives, on framer-motion).
 * Duplicates its children so the loop is seamless; slows to `speedOnHover` on hover.
 */
export function InfiniteSlider({ children, gap = 24, speed = 40, speedOnHover, className }: InfiniteSliderProps) {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const measure = () => setWidth(node.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [node]);

  const current = hovered && speedOnHover !== undefined ? speedOnHover : speed;

  useAnimationFrame((_, delta) => {
    if (!width) return;
    let next = x.get() - (current * delta) / 1000;
    if (next <= -width) next += width;
    x.set(next);
  });

  return (
    <div
      className={className}
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div ref={setNode} style={{ x, display: "flex", gap, width: "max-content" }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default InfiniteSlider;
