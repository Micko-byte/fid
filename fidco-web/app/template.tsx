"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Only render overlay client-side to avoid SSR hydration mismatch */}
      {mounted && !reduce && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          style={{
            position: "fixed", inset: 0, zIndex: 200, transformOrigin: "top",
            backgroundColor: "#260000", pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0], y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.02em", color: "#f5f2ec" }}
          >
            FID &amp; Co.
          </motion.span>
        </motion.div>
      )}
      {/* Children render plainly — no opacity wrapper.
          It previously faded in with `initial={reduce ? false : {opacity:0}}`, but
          useReducedMotion() is null on the server and a boolean on the client, so
          the server emitted opacity:0 while the client expected opacity:1 — a
          hydration mismatch that flashed the page in on every navigation.
          Fading unconditionally instead would leave content invisible until rAF
          runs. The overlay above already covers the transition, and dropping the
          0.35s delay makes navigation land noticeably faster. */}
      {children}
    </>
  );
}
