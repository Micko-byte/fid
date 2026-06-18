"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "@/components/graphics/BrandMark";

const DURATION_MS = 1900;

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.intro = "playing";
    const finish = () => {
      setVisible(false);
      window.dispatchEvent(new Event("fid:intro-done"));
      document.documentElement.dataset.intro = "done";
    };
    const t = window.setTimeout(finish, DURATION_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[10000] overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.6rem" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(60% 50% at 50% 45%, rgba(217,128,56,0.06) 0%, transparent 70%)" }} />

          <BrandMark size={110} color="#1c1c1c" accent="#750006" spin={false} />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.34em", textTransform: "uppercase", color: "rgba(28,28,28,0.5)" }}
          >
            Insight. Strategy. Impact.
          </motion.p>

          {/* progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
            style={{ width: "120px", height: "1px", background: "#1c1c1c", transformOrigin: "left", opacity: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
