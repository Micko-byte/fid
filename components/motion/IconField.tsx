"use client";

import { motion } from "framer-motion";
import {
  Megaphone, Newspaper, ShareNetwork, ChartLineUp, Confetti,
  Target, Broadcast, Strategy, PenNib, UsersThree,
} from "@phosphor-icons/react";

/**
 * Ambient background graphics for detail pages — a sparse field of floating
 * brand icons + two soft gradient shapes, in brand palette. Decorative only.
 */
const ICONS = [
  { Icon: Megaphone,    x: "8%",  y: "18%", size: 40, dur: 9,  d: 0 },
  { Icon: ChartLineUp,  x: "84%", y: "12%", size: 46, dur: 11, d: 0.4 },
  { Icon: ShareNetwork, x: "72%", y: "62%", size: 38, dur: 10, d: 0.8 },
  { Icon: Newspaper,    x: "14%", y: "70%", size: 42, dur: 12, d: 0.2 },
  { Icon: Confetti,     x: "46%", y: "30%", size: 34, dur: 8,  d: 0.6 },
  { Icon: Target,       x: "90%", y: "40%", size: 36, dur: 13, d: 1.0 },
  { Icon: Broadcast,    x: "30%", y: "48%", size: 32, dur: 10, d: 0.3 },
  { Icon: Strategy,     x: "60%", y: "82%", size: 40, dur: 11, d: 0.9 },
  { Icon: PenNib,       x: "4%",  y: "44%", size: 30, dur: 9,  d: 0.5 },
  { Icon: UsersThree,   x: "52%", y: "8%",  size: 34, dur: 12, d: 0.7 },
];

export default function IconField({ tone = "dark", photo }: { tone?: "dark" | "light"; photo?: string }) {
  const iconColor = tone === "dark" ? "rgba(217,128,56,0.16)" : "rgba(117,0,6,0.12)";
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* atmospheric blurred stock photo (low opacity depth) */}
      {photo && (
        <img
          src={photo}
          alt=""
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(6px) saturate(0.85)", opacity: tone === "dark" ? 0.18 : 0.1, mixBlendMode: "multiply" }}
        />
      )}
      {/* soft brand gradient shapes */}
      <div style={{ position: "absolute", top: "-8%", right: "-6%", width: "42vw", height: "42vw", maxWidth: 560, maxHeight: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,128,56,0.14), transparent 70%)", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: "46vw", height: "46vw", maxWidth: 620, maxHeight: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(117,0,6,0.18), transparent 70%)", filter: "blur(40px)" }} />

      {ICONS.map(({ Icon, x, y, size, dur, d }, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", left: x, top: y, color: iconColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -14, 0], rotate: [0, i % 2 ? 8 : -8, 0] }}
          transition={{
            opacity: { duration: 1, delay: d },
            y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay: d },
            rotate: { duration: dur * 1.3, repeat: Infinity, ease: "easeInOut", delay: d },
          }}
        >
          <Icon size={size} weight="thin" />
        </motion.div>
      ))}
    </div>
  );
}
