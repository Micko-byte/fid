"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface TiltProps {
  children: ReactNode;
  max?: number;       // max rotation in deg
  scale?: number;     // hover scale
  style?: CSSProperties;
  className?: string;
}

/** 3D pointer-tilt wrapper. Disabled on touch / reduced-motion. */
export default function Tilt({ children, max = 9, scale = 1.02, style, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const ss = useSpring(s, { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
    s.set(scale);
  };
  const reset = () => { rx.set(0); ry.set(0); s.set(1); };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{
        ...style,
        rotateX: srx,
        rotateY: sry,
        scale: ss,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
