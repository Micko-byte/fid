"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo, Heart, ChatCircle, ArrowUpRight } from "@phosphor-icons/react";

const HANDLE = "fidpr";
const PROFILE = "https://instagram.com/fidpr/";

/**
 * Live Instagram feed.
 * Set NEXT_PUBLIC_INSTAGRAM_FEED_URL to a Behold.so (or compatible) JSON feed
 * to render real posts. Falls back to a curated grid until configured.
 *
 * Behold setup: behold.so -> connect @fidpr -> copy the JSON feed URL ->
 * add NEXT_PUBLIC_INSTAGRAM_FEED_URL=... to .env.local / Vercel env.
 */

interface IGPost {
  id: string;
  permalink: string;
  image: string;
  caption?: string;
  isVideo?: boolean;
}

// Fallback tiles (curated) — shown only until a live feed URL is configured
const fallback: IGPost[] = [
  { id: "f1", permalink: PROFILE, image: "/photos/projects/tribe-vibe.jpg" },
  { id: "f2", permalink: PROFILE, image: "/photos/projects/lc-waikiki-influencer.jpg" },
  { id: "f3", permalink: PROFILE, image: "/photos/projects/kansai-gor-mahia.jpg" },
  { id: "f4", permalink: PROFILE, image: "/photos/projects/utamaduni-day.jpg" },
  { id: "f5", permalink: PROFILE, image: "/photos/projects/africa-forum-displacement.jpg" },
  { id: "f6", permalink: PROFILE, image: "/photos/editorial/cultural-festival.jpg" },
];

/* Normalize various feed shapes (Behold v2, Graph API, generic) into IGPost */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(raw: any): IGPost[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list: any[] = Array.isArray(raw) ? raw : raw?.posts ?? raw?.data ?? [];
  return list
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((p: any, i: number): IGPost | null => {
      const image =
        p.sizes?.medium?.mediaUrl ||
        p.sizes?.small?.mediaUrl ||
        p.mediaUrl ||
        p.media_url ||
        p.thumbnailUrl ||
        p.thumbnail_url ||
        p.image ||
        "";
      if (!image) return null;
      return {
        id: p.id ?? String(i),
        permalink: p.permalink ?? p.link ?? PROFILE,
        image,
        caption: p.caption ?? p.prunedCaption ?? "",
        isVideo: (p.mediaType ?? p.media_type ?? "").toString().toUpperCase().includes("VIDEO"),
      };
    })
    .filter((x): x is IGPost => !!x)
    .slice(0, 6);
}

function PostTile({ post, i, inView }: { post: IGPost; i: number; inView: boolean }) {
  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="View"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="ig-tile"
      style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", backgroundColor: "#ece7df", display: "block" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.image} alt={post.caption?.slice(0, 80) || "FID & Co. on Instagram"} loading="lazy" className="ig-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
      <div className="ig-overlay" style={{ position: "absolute", inset: 0, background: "rgba(117,0,6,0.8)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.6rem", opacity: 0, transition: "opacity 0.35s", padding: "1rem", textAlign: "center" }}>
        <ArrowUpRight size={26} weight="bold" color="#fff" />
        {post.caption ? (
          <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-body)", fontSize: "0.72rem", lineHeight: 1.4, maxWidth: "22ch", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.caption}
          </span>
        ) : (
          <span style={{ display: "inline-flex", gap: "1rem", color: "#fff" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600 }}><Heart size={18} weight="fill" /> {120 + i * 37}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600 }}><ChatCircle size={18} weight="fill" /> {8 + i * 3}</span>
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [posts, setPosts] = useState<IGPost[]>(fallback);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL;
    if (!url) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const norm = normalize(data);
        if (active && norm.length) {
          setPosts(norm);
          setLive(true);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
      <div ref={ref} style={{ maxWidth: "1320px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,6rem)", paddingRight: "clamp(1.5rem,5vw,6rem)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3rem)" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
              {live ? "Live from Instagram" : "On the grid"}
            </motion.span>
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#1a1a1a", marginTop: "0.7rem", letterSpacing: "-0.01em" }}
            >
              Follow the work in motion.
            </motion.h2>
          </div>

          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Follow"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#750006", color: "#fff", padding: "0.8rem 1.4rem", fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", borderRadius: "2px", transition: "background 0.25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8a0007")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#750006")}
          >
            <InstagramLogo size={18} weight="fill" /> @{HANDLE}
          </a>
        </div>

        <div className="ig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "clamp(0.5rem,1vw,0.9rem)" }}>
          {posts.map((p, i) => (
            <PostTile key={p.id} post={p} i={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        .ig-tile:hover .ig-overlay { opacity: 1; }
        .ig-tile:hover .ig-img { transform: scale(1.06); }
        @media (max-width: 900px) { .ig-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 480px) { .ig-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
