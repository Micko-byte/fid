"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

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
      const dc = el.closest("[data-cursor]");
      setLabel(dc ? dc.getAttribute("data-cursor") : null);
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
          backgroundColor: "#750006",
          opacity: visible && !label ? 1 : 0,
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
          borderColor: onLink ? "#750006" : "rgba(255,255,255,0.5)",
          opacity: visible && !label ? 1 : 0,
          mixBlendMode: "difference",
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Orange labelled cursor — shown over [data-cursor] elements (e.g. work pictures) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible && label ? 1 : 0, scale: visible && label ? 1 : 0.3 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <svg width={26} height={31} viewBox="0 0 26 31" fill="none" style={{ display: "block" }}>
          <path fill="#d98038" stroke="#fff" strokeLinecap="square" strokeWidth={2} d="M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z" />
        </svg>
        {label && (
          <span style={{ display: "inline-block", marginLeft: "1rem", marginTop: "0.25rem", borderRadius: "4px", background: "#d98038", color: "#260000", padding: "0.15rem 0.6rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
