"use client";

import { useEffect, useState } from "react";
import { InstagramLogo } from "@phosphor-icons/react";

/* Small Instagram-style carousel shown under an owned IP — a few square photos
   that auto-advance and link out to the platform's Instagram (Farida's brief).
   Images are stacked and cross-faded by opacity (no mount/unmount) to avoid the
   AnimatePresence exit-transition stalls we've hit elsewhere. */
export default function IgCarousel({
  photos,
  href,
  accent,
}: {
  photos: string[];
  href: string;
  accent: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % photos.length), 3200);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Instagram"
      style={{
        display: "block",
        position: "relative",
        width: "clamp(190px, 24vw, 240px)",
        aspectRatio: "1 / 1",
        borderRadius: "18px",
        overflow: "hidden",
        border: `1px solid ${accent}33`,
        boxShadow: `0 14px 34px ${accent}26`,
      }}
    >
      {photos.map((src, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: k === i ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
      <span style={{ position: "absolute", top: "0.6rem", right: "0.6rem", display: "inline-flex", color: "#fff", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}>
        <InstagramLogo size={20} weight="fill" />
      </span>
      <div style={{ position: "absolute", bottom: "0.65rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "5px" }}>
        {photos.map((_, k) => (
          <span key={k} style={{ width: "6px", height: "6px", borderRadius: "999px", background: k === i ? "#fff" : "rgba(255,255,255,0.45)", transition: "background 0.3s" }} />
        ))}
      </div>
    </a>
  );
}
