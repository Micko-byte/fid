"use client";

import { useEffect } from "react";
import gsap from "gsap";

/**
 * Applies GSAP hover parallax to all .fid-art-panel, .proof-card,
 * .platform-feature-media, and [data-parallax] image containers across the site.
 * Mount this once in SiteChrome / layout.
 */
export default function GlobalImageParallax() {
  useEffect(() => {
    const STRENGTH = 16;
    const SELECTORS = [
      ".fid-art-panel",
      ".proof-card",
      ".platform-feature-media",
      ".work-mosaic-link",
      "[data-parallax]",
    ];

    const containers: Element[] = [];
    const cleanup: (() => void)[] = [];

    const applyTo = (el: HTMLElement) => {
      if (containers.includes(el)) return;
      const img = el.querySelector("img, video");
      if (!img) return;
      containers.push(el);

      el.style.overflow = "hidden";

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = ((e.clientX - rect.left - rect.width / 2) / rect.width) * STRENGTH;
        const dy = ((e.clientY - rect.top - rect.height / 2) / rect.height) * STRENGTH;
        gsap.to(img, { x: -dx, y: -dy, scale: 1.05, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => {
        gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.75, ease: "power3.out", overwrite: "auto" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanup.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };

    // Initial pass
    SELECTORS.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach(applyTo);
    });

    // Watch for DOM mutations (sections that render after mount)
    const mo = new MutationObserver(() => {
      SELECTORS.forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach(applyTo);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup.forEach((fn) => fn());
      mo.disconnect();
    };
  }, []);

  return null;
}
