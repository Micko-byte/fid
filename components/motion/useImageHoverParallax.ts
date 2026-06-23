"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Applies a subtle GSAP parallax effect to an image element on mouse hover.
 * The image moves slightly in the opposite direction of the cursor — creating depth.
 */
export function useImageHoverParallax<T extends HTMLElement>(strength = 18) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const img = el.querySelector("img, video");
    if (!img) return;

    // Ensure the container clips overflow
    (el as HTMLElement).style.overflow = "hidden";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / rect.width) * strength;
      const dy = ((e.clientY - cy) / rect.height) * strength;

      gsap.to(img, {
        x: -dx,
        y: -dy,
        scale: 1.06,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(img, {
        x: 0, y: 0, scale: 1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return containerRef;
}
