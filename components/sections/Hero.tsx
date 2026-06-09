"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Raw normalised cursor (0–1)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Spring-smoothed so the parallax feels physical, not snappy
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 22, restDelta: 0.0005 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 22, restDelta: 0.0005 });

  // Video shifts up to ±2.5% in the OPPOSITE direction of the cursor
  const videoX = useTransform(smoothX, [0, 1], ["2.5%", "-2.5%"]);
  const videoY = useTransform(smoothY, [0, 1], ["2.5%", "-2.5%"]);

  // Spotlight — raw position for the radial gradient (CSS % works here)
  const spotX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    const video = videoRef.current;
    if (video) video.play().catch(() => {});

    const section = sectionRef.current;
    if (!section || mobile) return; // skip parallax on touch devices

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => section.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/*
        The video wrapper is 5% larger on every side so the ±2.5% shift
        never exposes the black edges of the container.
      */}
      <motion.div
        className="absolute"
        style={{
          inset: "-5%",
          x: videoX,
          y: videoY,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: isMobile ? "center 25%" : "center center",
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cursor spotlight — a soft light that follows the mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(circle 380px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.055) 0%, transparent 68%)`
          ),
        }}
      />

      {/* Vignette — edges only, keeps centre bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 40%, rgba(0,0,0,0.42) 100%)",
        }}
      />
    </section>
  );
}
