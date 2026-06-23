"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Reads Lenis scroll velocity and applies a subtle skewY + scale to
 * elements with [data-skew] or the class .lenis-skew.
 * Mount once in SiteChrome.
 */
export default function LenisTextSkew() {
  useEffect(() => {
    // Wait for Lenis to be available on window
    let lenis: { velocity: number; on: (event: string, cb: () => void) => void } | null = null;
    let raf: number;

    const tick = () => {
      if (!lenis) {
        // Lenis attaches itself to window.__lenis in LenisProvider
        lenis = (window as unknown as { __lenis?: typeof lenis }).__lenis ?? null;
      }

      if (lenis) {
        const v = lenis.velocity;
        const skew = Math.min(Math.max(v * 0.22, -8), 8);
        const scale = 1 - Math.abs(v) * 0.0008;

        document.querySelectorAll<HTMLElement>("[data-skew], .lenis-skew").forEach((el) => {
          gsap.to(el, {
            skewY: skew,
            scaleY: Math.max(scale, 0.97),
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
