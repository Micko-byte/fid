"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ConstellationMark from "@/components/graphics/ConstellationMark";

const DURATION_MS = 2100;
const MARK_MS = 1500;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * First-load intro: the brand constellation lights up from Nairobi while the
 * name sets itself beside it. Runs once per full page load - it is mounted in
 * SiteChrome, which survives client-side route changes.
 */
export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [markSize, setMarkSize] = useState(132);

  useEffect(() => {
    setMarkSize(window.innerWidth < 640 ? 104 : 148);
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
          style={{
            backgroundColor: "#f5f2ec",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.8rem",
            paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
            paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "radial-gradient(60% 50% at 50% 45%, rgba(217,128,56,0.07) 0%, transparent 70%)",
            }}
          />

          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "clamp(0.9rem, 3vw, 1.8rem)" }}>
            <ConstellationMark size={markSize} duration={MARK_MS} color="117,0,6" />

            {/* a hairline that draws down as the mark fills, separating the two */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
              style={{
                width: "1px",
                height: markSize * 0.52,
                background: "rgba(117,0,6,0.28)",
                transformOrigin: "top",
                display: "block",
              }}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  display: "flex",
                  fontFamily: "var(--font-heading)",
                  fontSize: `${markSize * 0.46}px`,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#750006",
                }}
              >
                {/* each letter settles in turn, trailing the pulse across the map */}
                {["F", "I", "D"].map((ch, i) => (
                  <motion.span
                    key={ch}
                    initial={{ opacity: 0, y: "0.4em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, delay: 0.42 + i * 0.13, ease: EASE }}
                    style={{ display: "block" }}
                  >
                    {ch}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.92, ease: EASE }}
                  style={{ display: "block", fontSize: "0.46em", alignSelf: "flex-end", paddingBottom: "0.18em", paddingLeft: "0.18em" }}
                >
                  &amp; Co.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
                style={{
                  margin: "0.7rem 0 0",
                  fontFamily: "var(--font-body)",
                  fontSize: `${Math.max(9, markSize * 0.072)}px`,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(38,0,0,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                Insight. Strategy. Impact.
              </motion.p>
            </div>
          </div>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
            style={{
              position: "relative",
              width: "clamp(120px, 24vw, 200px)",
              height: "1px",
              background: "#750006",
              transformOrigin: "left",
              opacity: 0.35,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
