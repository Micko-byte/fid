"use client";

import { motion } from "framer-motion";

interface SwooshTextProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  shadowColors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    glow?: string;
  };
}

export default function SwooshText({
  text = "FID & Co.",
  className = "",
  shadowColors = {
    first:  "#750006",
    second: "#260000",
    third:  "#d98038",
    fourth: "#d9ab88",
    glow:   "#750006",
  },
  style,
}: SwooshTextProps) {
  const withShadow = {
    textShadow: `6px 6px 0px ${shadowColors.first},
                 10px 10px 0px ${shadowColors.second},
                 14px 14px 0px ${shadowColors.third},
                 18px 18px 0px ${shadowColors.fourth},
                 32px 32px 8px ${shadowColors.glow}44`,
  };
  const noShadow = { textShadow: "none" };

  return (
    <motion.div
      className={`swoosh-text ${className}`}
      style={{ ...withShadow, ...style }}
      whileHover={noShadow}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {text}
      <style>{`
        .swoosh-text {
          font-family: var(--font-heading);
          font-weight: 700;
          font-style: italic;
          letter-spacing: -0.02em;
          cursor: default;
          display: inline-block;
          transition: text-shadow 0.22s ease;
          color: #f5f2ec;
        }
      `}</style>
    </motion.div>
  );
}
