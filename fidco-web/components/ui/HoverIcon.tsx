"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Icon, IconWeight } from "@phosphor-icons/react";

/** One unified icon-interaction system: consistent easing + timing everywhere. */
export const ICON_EASE = [0.16, 1, 0.3, 1] as const;
export const ICON_DURATION = 0.26;

type Props = {
  icon: Icon;
  size?: number;
  color?: string;
  weight?: IconWeight;
  /** weight to shift to on hover for the "activate" feel */
  hoverWeight?: IconWeight;
  /** degrees to rotate on hover (0 = none) */
  rotate?: number;
  /** scale on hover */
  scale?: number;
  /** reveal the icon with a smooth radial "drawn on" wipe, driven by the parent's own scroll-in-view state */
  drawOnScroll?: boolean;
  /** when drawOnScroll is set, whether the parent section is currently in view (drives the reveal) */
  revealed?: boolean;
};

export default function HoverIcon({
  icon: IconCmp,
  size = 32,
  color = "#d98038",
  weight = "regular",
  hoverWeight = "fill",
  rotate = 0,
  scale = 1.18,
  drawOnScroll = false,
  revealed = true,
}: Props) {
  const [hover, setHover] = useState(false);
  const icon = (
    <motion.span
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ scale: hover ? scale : 1, rotate: hover ? (rotate || 8) : 0, y: hover ? -2 : 0 }}
      transition={{ duration: 0.34, ease: ICON_EASE }}
      style={{ display: "inline-flex", transformOrigin: "center", position: "relative" }}
    >
      <motion.span
        aria-hidden
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.65 }}
        transition={{ duration: 0.34, ease: ICON_EASE }}
        style={{
          position: "absolute",
          inset: "-0.42rem",
          borderRadius: "999px",
          background: "radial-gradient(circle, rgba(217,128,56,0.26) 0%, rgba(217,128,56,0.08) 46%, transparent 72%)",
          filter: "blur(4px)",
          pointerEvents: "none",
        }}
      />
      <IconCmp size={size} weight={hover ? hoverWeight : weight} color={color} />
    </motion.span>
  );

  if (!drawOnScroll) return icon;

  return (
    <motion.span
      initial={{ clipPath: "circle(0% at 8% 92%)" }}
      animate={{ clipPath: revealed ? "circle(120% at 8% 92%)" : "circle(0% at 8% 92%)" }}
      transition={{ duration: 1.1, ease: ICON_EASE }}
      style={{ display: "inline-flex" }}
    >
      {icon}
    </motion.span>
  );
}
