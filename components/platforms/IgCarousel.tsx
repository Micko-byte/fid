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
  feedUrl,
}: {
  photos: string[];
  href: string;
  accent: string;
  feedUrl?: string;
}) {
  const [i, setI] = useState(0);
  const [activePhotos, setActivePhotos] = useState<string[]>(photos);
  const [broken, setBroken] = useState<Record<string, true>>({});

  // Only show buckets whose image actually loaded — drop empty/failed ones.
  const visible = activePhotos.filter((src) => !broken[src]);

  useEffect(() => {
    if (!feedUrl) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(feedUrl, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list: any[] = Array.isArray(data) ? data : data?.posts ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pick = (m: any) => m?.sizes?.medium?.mediaUrl || m?.mediaUrl || m?.thumbnailUrl || "";
        // Expand carousel albums so the carousel cycles through several images
        // per post, not just each post's cover.
        const srcs = list
          .slice(0, 5)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .flatMap((p: any) => (Array.isArray(p.children) && p.children.length ? p.children : [p]))
          .map(pick)
          .filter(Boolean)
          .slice(0, 10);
        if (active && srcs.length) setActivePhotos(srcs);
      } catch {
        /* keep fallback */
      }
    })();
    return () => { active = false; };
  }, [feedUrl]);

  useEffect(() => {
    if (visible.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % visible.length), 3200);
    return () => clearInterval(t);
  }, [visible.length]);

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
      {visible.map((src, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          onError={() => setBroken((b) => ({ ...b, [src]: true }))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: k === i % visible.length ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
      <span style={{ position: "absolute", top: "0.6rem", right: "0.6rem", display: "inline-flex", color: "#fff", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}>
        <InstagramLogo size={20} weight="fill" />
      </span>
      <div style={{ position: "absolute", bottom: "0.65rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "5px" }}>
        {visible.map((_, k) => (
          <span key={k} style={{ width: "6px", height: "6px", borderRadius: "999px", background: k === i % visible.length ? "#fff" : "rgba(255,255,255,0.45)", transition: "background 0.3s" }} />
        ))}
      </div>
    </a>
  );
}
