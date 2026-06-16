"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onLink, setOnLink] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Dot follows cursor with no lag
  const dotX = useSpring(mx, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(my, { stiffness: 1000, damping: 50 });

  // Ring lags behind for the trailing effect
  const ringX = useSpring(mx, { stiffness: 120, damping: 22 });
  const ringY = useSpring(my, { stiffness: 120, damping: 22 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkTarget = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setOnLink(!!el.closest("a, button, [role=button]"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", checkTarget, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkTarget);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mx, my]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringSize = onLink ? 52 : clicking ? 28 : 40;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#742F14",
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
        style={{
          width: ringSize,
          height: ringSize,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: onLink ? "#742F14" : "rgba(255,255,255,0.5)",
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
