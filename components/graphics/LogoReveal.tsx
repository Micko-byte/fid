"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import FidLogo from "@/components/ui/FidLogo";

/**
 * Reveals the FID & Co. logo artwork itself — the vector mark, not typeset
 * letters — by wiping it open left to right, the way the constellation fills
 * from Nairobi outward. Under reduced motion it fades up in place instead, so
 * the reveal survives without anything travelling across the screen.
 *
 * The reveal is a CSS transition whose end state is assigned from script,
 * rather than a keyframe animation. Both keyframes and requestAnimationFrame
 * are frozen in some embedded webviews, and an animation that never ticks
 * leaves the logo stuck at its invisible starting frame; an assigned end state
 * still lands in computed style, so the mark is always there to be painted.
 */
export default function LogoReveal({
  variant = "maroon",
  trigger = "inView",
  delay = 0,
  duration = 1.1,
  style,
  className,
}: {
  variant?: "dark" | "light" | "maroon";
  trigger?: "load" | "inView";
  /** seconds */
  delay?: number;
  duration?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // start state
    el.style.transition = "none";
    if (reduced) {
      el.style.opacity = "0";
    } else {
      el.style.clipPath = "inset(0 100% 0 0)";
    }

    let played = false;
    let settle = 0;
    const play = () => {
      if (played) return;
      played = true;
      el.style.transition = reduced
        ? `opacity ${duration}s ease-out ${delay}s`
        : `clip-path ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
      el.style.opacity = "1";
      el.style.clipPath = "inset(0 0 0 0)";
      // A transition interpolates against the document clock, which some
      // webviews stop while the page is not being painted — leaving the mark
      // pinned to its opening frame. Once the reveal is due, drop the
      // transition so the finished state stands on its own.
      settle = window.setTimeout(
        () => {
          el.style.transition = "none";
          el.style.opacity = "1";
          el.style.clipPath = "inset(0 0 0 0)";
        },
        (delay + duration) * 1000 + 400,
      );
    };

    if (trigger === "load") {
      const t = window.setTimeout(play, 30);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(settle);
      };
    }

    const host = wrap.current;
    if (!host || typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(host);
    // Backstop: if the observer never fires, reveal it anyway rather than
    // leaving a hole where the logo should be.
    const fallback = window.setTimeout(play, 2600);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(settle);
    };
  }, [trigger, delay, duration]);

  return (
    <div ref={wrap} className={className} style={{ overflow: "hidden", ...style }}>
      <div ref={inner} style={{ willChange: "clip-path, opacity" }}>
        <FidLogo variant={variant} style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  );
}
