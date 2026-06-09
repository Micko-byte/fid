"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Respect reduced-motion preference — keep video paused as a static poster
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // On slow connections or save-data mode, skip autoplay to save bandwidth
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const isConstrained = conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
    if (isConstrained) {
      video.preload = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          // Portrait mobile: favour upper/centre of frame where subject usually is
          objectPosition: isMobile ? "center 25%" : "center center",
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Radial vignette — edges only, keeps centre bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 40%, rgba(0,0,0,0.38) 100%)",
        }}
      />
    </section>
  );
}
