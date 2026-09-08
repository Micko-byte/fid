"use client";

import { useEffect, useState } from "react";
import { InstagramLogo, Play } from "@phosphor-icons/react";

/* Live Instagram tiles for an owned IP, laid out the way Farida asked for:
   a profile header (avatar, handle, bio) above a dense square grid, matching
   the embed style used on the old fidpr.ke pages. Carousel albums contribute a
   couple of images each so the grid shows a spread of posts, not one album. */

interface IgTile {
  src: string;
  isVideo?: boolean;
}

export default function IgCarousel({
  photos,
  href,
  accent,
  feedUrl,
  bio,
}: {
  photos?: string[];
  href: string;
  accent: string;
  feedUrl?: string;
  /** Short line under the handle, e.g. the platform's tagline. */
  bio?: string;
}) {
  const [tiles, setTiles] = useState<IgTile[]>((photos ?? []).map((src) => ({ src })));
  const [broken, setBroken] = useState<Record<string, true>>({});
  const [live, setLive] = useState(false);
  // Behold serves the account's own avatar and bio — use them when present so
  // the header reads like a real profile rather than a generic badge.
  const [profile, setProfile] = useState<{ avatar?: string; bio?: string }>({});

  const visible = tiles.filter((t) => !broken[t.src]).slice(0, 24);
  const handle = href.replace(/\/+$/, "").split("/").pop() || "instagram";

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
        if (active && !Array.isArray(data)) {
          setProfile({
            avatar: data?.profilePictureUrl || undefined,
            bio: typeof data?.biography === "string" ? data.biography.split("\n")[0] : undefined,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pick = (m: any) => m?.sizes?.medium?.mediaUrl || m?.mediaUrl || m?.thumbnailUrl || "";
        const next: IgTile[] = [];
        list.slice(0, 20).forEach((p) => {
          const children = Array.isArray(p.children) && p.children.length ? p.children : [p];
          children.slice(0, 4).forEach((m: unknown) => {
            const src = pick(m) || pick(p);
            if (src && !next.some((t) => t.src === src)) {
              next.push({ src, isVideo: p.mediaType === "VIDEO" });
            }
          });
        });
        if (active && next.length) {
          setTiles(next.slice(0, 32));
          setLive(true);
        }
      } catch {
        /* keep the fallback tiles */
      }
    })();
    return () => { active = false; };
  }, [feedUrl]);

  if (!visible.length) return null;

  return (
    <div style={{ width: "100%", maxWidth: "560px" }}>
      {/* profile header */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: "0.85rem", textDecoration: "none", marginBottom: "1rem" }}
      >
        <span
          style={{
            width: "46px", height: "46px", flexShrink: 0, borderRadius: "999px",
            background: accent, color: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", border: `1px solid ${accent}33`, overflow: "hidden",
          }}
        >
          {profile.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <InstagramLogo size={24} weight="fill" />
          )}
        </span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 700, color: "#1c1c1c" }}>
            {handle}
          </span>
          {(profile.bio || bio) && (
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.45, color: "rgba(28,28,28,0.6)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
              {profile.bio || bio}
            </span>
          )}
        </span>
      </a>

      {/* square grid */}
      <div className="ig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "0.4rem" }}>
        {visible.map((t) => (
          <a
            key={t.src}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Instagram"
            style={{ display: "block", position: "relative", aspectRatio: "1 / 1", overflow: "hidden", background: `${accent}12` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.src}
              alt=""
              loading="lazy"
              onError={() => setBroken((b) => ({ ...b, [t.src]: true }))}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {t.isVideo && (
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))", pointerEvents: "none" }}>
                <Play size={30} weight="fill" />
              </span>
            )}
          </a>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "0.85rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, color: accent, textDecoration: "none" }}
      >
        <InstagramLogo size={16} weight="fill" /> {live ? "Live on Instagram" : "See more on Instagram"}
      </a>

      <style>{`
        @media (max-width: 520px) {
          .ig-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
}
