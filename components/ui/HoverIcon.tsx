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
};

export default function HoverIcon({
  icon: IconCmp,
  size = 32,
  color = "#d98038",
  weight = "regular",
  hoverWeight = "fill",
  rotate = 0,
  scale = 1.12,
}: Props) {
  const [hover, setHover] = useState(false);
  return (
    <motion.span
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{ scale: hover ? scale : 1, rotate: hover ? rotate : 0 }}
      transition={{ duration: ICON_DURATION, ease: ICON_EASE }}
      style={{ display: "inline-flex", transformOrigin: "center" }}
    >
      <IconCmp size={size} weight={hover ? hoverWeight : weight} color={color} />
    </motion.span>
  );
}
