"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Respect reduced-motion: keep the first frame as a static poster
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // On save-data / 2G connections skip autoplay entirely
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
      video.preload = "none";
      return;
    }

    // Attempt play immediately — autoPlay attribute alone is just a hint in some browsers
    video.play().catch(() => {});

    // Pause when scrolled out of view, resume when back in
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
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
        preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: isMobile ? "center 25%" : "center center",
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Radial vignette — edges only, keeps centre bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 40%, rgba(0,0,0,0.38) 100%)",
        }}
      />
    </section>
  );
}
