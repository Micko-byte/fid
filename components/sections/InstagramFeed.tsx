"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo } from "@phosphor-icons/react";
import BounceCards from "@/components/ui/BounceCards";

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

        {/* Bouncing card stack of latest posts */}
        <a href={PROFILE} target="_blank" rel="noopener noreferrer" data-cursor="View" style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>
          <BounceCards
            images={posts.slice(0, 5).map((p) => p.image)}
            containerWidth={560}
            containerHeight={300}
            animationDelay={0.4}
            animationStagger={0.09}
            easeType="elastic.out(1, 0.6)"
            transformStyles={[
              "rotate(7deg) translate(-200px)",
              "rotate(-4deg) translate(-100px)",
              "rotate(2deg)",
              "rotate(-7deg) translate(100px)",
              "rotate(5deg) translate(200px)",
            ]}
            enableHover
            className="ig-bounce"
          />
        </a>
      </div>
    </section>
  );
}
