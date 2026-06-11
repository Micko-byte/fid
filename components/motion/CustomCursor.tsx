"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Minimal custom cursor: a small dot + a trailing ring that grows over
 * interactive elements and shows an optional label via [data-cursor].
 * Desktop / fine-pointer only. Hidden on touch + reduced-motion.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest("a,button,[data-cursor]") as HTMLElement | null;
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
          x, y, translateX: "-50%", translateY: "-50%",
          width: 6, height: 6, borderRadius: "50%", backgroundColor: "#750006",
          mixBlendMode: "multiply",
        }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
          x: rx, y: ry, translateX: "-50%", translateY: "-50%",
          borderRadius: "999px",
          border: "1px solid rgba(117,0,6,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        animate={{
          width: hovering ? (label ? 76 : 46) : 30,
          height: hovering ? (label ? 76 : 46) : 30,
          backgroundColor: hovering && label ? "#750006" : "rgba(117,0,6,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {label && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", fontWeight: 600 }}>
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
