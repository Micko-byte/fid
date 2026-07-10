"use client";

import type { SpringOptions } from "framer-motion";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  onHoverChange?: (hovering: boolean) => void;
}

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.06,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  onHoverChange,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    rotateFigcaption.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
    onHoverChange?.(true);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    onHoverChange?.(false);
  }

  return (
    <figure
      ref={ref}
      className="relative flex flex-col items-center justify-center"
      style={{ height: containerHeight, width: containerWidth, perspective: "800px", margin: 0 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale, transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imageSrc}
          alt={altText}
          style={{ position: "absolute", top: 0, left: 0, width: imageWidth, height: imageHeight, objectFit: "cover", objectPosition: "center top", borderRadius: "16px", willChange: "transform", transform: "translateZ(0)" }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div style={{ position: "absolute", inset: 0, zIndex: 2, willChange: "transform", transform: "translateZ(30px)", pointerEvents: "none" }}>
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="tilted-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption, pointerEvents: "none", position: "absolute", left: 0, top: 0, borderRadius: "4px", background: "#f5f2ec", color: "#260000", padding: "4px 10px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)", fontWeight: 700, zIndex: 3 }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
