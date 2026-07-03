"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Applies GSAP hover parallax + scroll parallax to all media containers
 * across the site. Mount once in SiteChrome.
 */
export default function GlobalImageParallax() {
  useEffect(() => {
    // No parallax on touch/mobile — saves GPU and avoids janky transforms
    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── Hover parallax ─────────────────────────────────────────── */
    const STRENGTH = 16;
    const HOVER_SEL = [
      ".fid-art-panel",
      ".proof-card",
      ".platform-feature-media",
      "[data-parallax]",
    ];

    const hoverDone = new WeakSet<Element>();
    const hoverCleanup: (() => void)[] = [];

    const applyHover = (el: HTMLElement) => {
      if (hoverDone.has(el)) return;
      const media = el.querySelector<HTMLElement>("img, video");
      if (!media) return;
      hoverDone.add(el);
      el.style.overflow = "hidden";

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = ((e.clientX - r.left - r.width / 2) / r.width) * STRENGTH;
        const dy = ((e.clientY - r.top - r.height / 2) / r.height) * STRENGTH;
        gsap.to(media, { x: -dx, y: -dy, scale: 1.05, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(media, { x: 0, y: 0, scale: 1, duration: 0.75, ease: "power3.out", overwrite: "auto" });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      hoverCleanup.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };

    /* ── Scroll parallax ─────────────────────────────────────────── */
    const SCROLL_SEL = [
      ".fid-art-panel",
      ".platform-feature-media",
      ".platform-tile-media",
      "[data-scroll-parallax]",
    ];

    const scrollDone = new WeakSet<Element>();
    const scrollCtxs: gsap.Context[] = [];

    const applyScroll = (el: HTMLElement) => {
      if (scrollDone.has(el)) return;
      const media = el.querySelector<HTMLElement>("img, video");
      if (!media) return;
      scrollDone.add(el);
      el.style.overflow = "hidden";

      // Scale up the image so the y-shift doesn't reveal edges
      gsap.set(media, { scale: 1.12 });

      const ctx = gsap.context(() => {
        gsap.fromTo(
          media,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
      scrollCtxs.push(ctx);
    };

    // ── Initial pass ──
    const runAll = () => {
      HOVER_SEL.forEach(sel => document.querySelectorAll<HTMLElement>(sel).forEach(applyHover));
      SCROLL_SEL.forEach(sel => document.querySelectorAll<HTMLElement>(sel).forEach(applyScroll));
    };
    runAll();

    // ── Watch for late-rendered elements (debounced — slideshow mutations must not spam refresh) ──
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mo = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runAll, 800);
    });
    mo.observe(document.body, { childList: true, subtree: false });

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      hoverCleanup.forEach(fn => fn());
      scrollCtxs.forEach(ctx => ctx.revert());
      mo.disconnect();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return null;
}
