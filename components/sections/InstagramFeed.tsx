"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo } from "@phosphor-icons/react";
import BounceCards from "@/components/ui/BounceCards";
import { useIsMobile } from "@/components/mobile/useIsMobile";

const HANDLE = "fidpr";
const PROFILE = "https://instagram.com/fidpr/";
const BEHOLD_FEED_ID = "yZp6UeHFmPs6YRRfXoGV";
const BEHOLD_SCRIPT_SRC = "https://w.behold.so/widget.js";
const MAX_VISIBLE_POSTS = 5;

/**
 * Live Instagram feed.
 * The card layout stays custom, while the images are sourced from Behold.
 */

interface IGPost {
  id: string;
  permalink: string;
  image: string;
  caption?: string;
  isVideo?: boolean;
}

// Fallback tiles (curated) — shown until the Behold widget has loaded images
const fallback: IGPost[] = [
  { id: "f1", permalink: PROFILE, image: "/photos/projects/tribe-vibe.jpg" },
  { id: "f2", permalink: PROFILE, image: "/photos/projects/lc-waikiki-influencer.jpg" },
  { id: "f3", permalink: PROFILE, image: "/photos/projects/kansai-gor-mahia.jpg" },
  { id: "f4", permalink: PROFILE, image: "/photos/projects/utamaduni-day.jpg" },
  { id: "f5", permalink: PROFILE, image: "/photos/projects/africa-forum-displacement.jpg" },
  { id: "f6", permalink: PROFILE, image: "/photos/editorial/cultural-festival.jpg" },
];

function ensureBeholdWidgetScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (customElements.get("behold-widget")) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>('script[data-behold-widget-script="true"]');
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = BEHOLD_SCRIPT_SRC;
    script.dataset.beholdWidgetScript = "true";
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

function extractPostsFromWidget(widget: HTMLElement): IGPost[] {
  const unique = new Map<string, IGPost>();

  const visit = (scope: ParentNode | ShadowRoot) => {
    scope.querySelectorAll("img").forEach((img, index) => {
      const element = img as HTMLImageElement;
      const image = element.currentSrc || element.src || element.getAttribute("src") || "";
      if (!image || unique.has(image)) return;

      const permalink = (element.closest("a[href]") as HTMLAnchorElement | null)?.href ?? PROFILE;
      unique.set(image, {
        id: `${index}-${image}`,
        permalink,
        image,
      });
    });

    scope.querySelectorAll("*").forEach((node) => {
      const shadowRoot = (node as HTMLElement).shadowRoot;
      if (shadowRoot) visit(shadowRoot);
    });
  };

  visit(widget);

  return Array.from(unique.values()).slice(0, MAX_VISIBLE_POSTS);
}


export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [posts, setPosts] = useState<IGPost[]>(fallback);
  const [live, setLive] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let active = true;
    const host = document.createElement("div");
    host.setAttribute("aria-hidden", "true");
    host.style.position = "fixed";
    host.style.left = "-9999px";
    host.style.top = "0";
    host.style.width = "1px";
    host.style.height = "1px";
    host.style.overflow = "hidden";
    host.style.pointerEvents = "none";

    const widget = document.createElement("behold-widget");
    widget.setAttribute("feed-id", BEHOLD_FEED_ID);
    host.appendChild(widget);
    document.body.appendChild(host);

    const syncPosts = () => {
      if (!active) return;
      const nextPosts = extractPostsFromWidget(widget);
      if (nextPosts.length) {
        setPosts(nextPosts);
        setLive(true);
      }
    };

    const observer = new MutationObserver(syncPosts);
    observer.observe(widget, { childList: true, subtree: true, attributes: true });

    const pollId = window.setInterval(syncPosts, 500);

    (async () => {
      await ensureBeholdWidgetScript();
      if (!active) return;
      if (customElements.get("behold-widget")) {
        await customElements.whenDefined("behold-widget");
      }
      syncPosts();
    })();

    return () => {
      active = false;
      observer.disconnect();
      window.clearInterval(pollId);
      host.remove();
    };
  }, []);

  return (
    <section style={{ backgroundColor: "#f5f2ec", paddingTop: "clamp(5rem,10vw,9rem)", paddingBottom: "clamp(5rem,10vw,9rem)" }}>
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
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.8rem,3.6vw,2.8rem)", color: "#1c1c1c", marginTop: "0.7rem", letterSpacing: "-0.01em" }}
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

        {/* Bouncing card stack of latest posts — the fan effect uses fixed pixel
            offsets that don't fit a phone width, so mobile gets a simple scroll row */}
        {isMobile ? (
          <div style={{ display: "flex", gap: "0.8rem", overflowX: "auto", paddingBottom: "0.5rem", scrollbarWidth: "none" }}>
            {posts.slice(0, 5).map((p) => (
              <a
                key={p.id}
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flexShrink: 0, width: "128px", aspectRatio: "1 / 1", borderRadius: "14px", overflow: "hidden", border: "4px solid #fff", boxShadow: "0 8px 24px rgba(117,0,6,0.22)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
