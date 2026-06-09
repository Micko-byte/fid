"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);

    const video = videoRef.current;
    if (!video) return;

    // Explicit play call — autoPlay prop alone is a hint some browsers ignore
    video.play().catch(() => {});
  }, []);

  return (
    <section
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
