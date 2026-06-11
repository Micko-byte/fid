"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition. template.tsx remounts on every navigation, so we play a
 * one-shot "wipe away" of a burgundy panel revealing the new page, with the
 * FID mark flashing mid-wipe. Reduced-motion = no overlay.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          style={{
            position: "fixed", inset: 0, zIndex: 200, transformOrigin: "top",
            backgroundColor: "#750006", pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.02em", color: "#F5F2EC" }}
          >
            FID &amp; Co.
          </motion.span>
        </motion.div>
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
