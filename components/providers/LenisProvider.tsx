"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    // Expose for LenisTextSkew velocity reader
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis smooth scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Track the live frame id. Previously only the first id was kept, so the
    // cleanup cancelled a frame that had already run and the loop carried on
    // against a destroyed Lenis — one orphaned loop per remount.
    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Lenis caches the scroll limit at startup. On a client-side route change —
    // or when images and fonts land and the page grows — that cache goes stale
    // and scrolling stops short of the bottom. Re-measure whenever the document
    // actually changes height.
    const ro = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
