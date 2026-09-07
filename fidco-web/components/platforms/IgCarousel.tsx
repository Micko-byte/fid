"use client";

import { useEffect, useState } from "react";
import { InstagramLogo } from "@phosphor-icons/react";

/* Live Instagram tiles shown under an owned IP. Farida asked for several posts
   visible at once rather than a single square cycling through them, so this is
   a grid: each tile is one image pulled from the platform's Behold feed and
   links out to the account. Carousel albums are expanded so a post that holds
   ten photos contributes several tiles instead of just its cover. */
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
  const [activePhotos, setActivePhotos] = useState<string[]>(photos);
  const [broken, setBroken] = useState<Record<string, true>>({});

  // Only show tiles whose image actually loaded — drop empty/failed ones.
  const visible = activePhotos.filter((src) => !broken[src]).slice(0, 6);

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
        // One tile per image: take a couple of images from each recent post so
        // the grid shows a spread of posts rather than one album's contents.
        const srcs: string[] = [];
        list.slice(0, 6).forEach((p) => {
          const children = Array.isArray(p.children) && p.children.length ? p.children : [p];
          children.slice(0, 2).forEach((m: unknown) => {
            const src = pick(m) || pick(p);
            if (src && !srcs.includes(src)) srcs.push(src);
          });
        });
        if (active && srcs.length) setActivePhotos(srcs.slice(0, 9));
      } catch {
        /* keep fallback */
      }
    })();
    return () => { active = false; };
  }, [feedUrl]);

  if (!visible.length) return null;

  return (
    <div style={{ width: "100%", maxWidth: "380px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "0.5rem" }}>
        {visible.map((src) => (
          <a
            key={src}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
            style={{
              display: "block",
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${accent}33`,
              background: `${accent}12`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              onError={() => setBroken((b) => ({ ...b, [src]: true }))}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </a>
        ))}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: accent, textDecoration: "none" }}
      >
        <InstagramLogo size={16} weight="fill" /> See more on Instagram
      </a>
    </div>
  );
}
