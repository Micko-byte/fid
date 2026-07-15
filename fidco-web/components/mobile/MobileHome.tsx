"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Megaphone, Newspaper, ShareNetwork, ChartLineUp, Confetti,
  Timer, ChartBar, Buildings, GlobeHemisphereEast,
} from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import BrandHero from "@/components/sections/BrandHero";
import Contact from "@/components/sections/Contact";
import {
  MobileSectionHead,
  MobileEyebrow,
  MobileSlider,
  RadialDial,
} from "@/components/mobile/ui";
import { STOCK } from "@/lib/stock-photos";

const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/${id}`;

const PX = "clamp(1.4rem, 6vw, 2rem)";
const PY = "clamp(4.5rem, 16vw, 6.5rem)";
const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  { label: "Strategic\nCommunications", slug: "strategic-communications", dots: ["#750006", "#d98038", "#f5f2ec", "#d9ab88"], Icon: Megaphone, photo: STOCK.pressConf?.[0]?.src },
  { label: "Media\nManagement", slug: "media-management", dots: ["#d98038", "#750006", "#d9ab88", "#f5f2ec"], Icon: Newspaper, photo: STOCK.media?.[0]?.src },
  { label: "Digital &\nInfluencer", slug: "influencer-creator", dots: ["#f5f2ec", "#d98038", "#750006"], Icon: ShareNetwork, photo: STOCK.digital?.[1]?.src },
  { label: "Digital Strategy\n& Social", slug: "digital-strategy", dots: ["#d9ab88", "#750006", "#d98038"], Icon: ChartLineUp, photo: STOCK.strategy?.[0]?.src },
  { label: "Experiential\nMarketing", slug: "experiential-marketing", dots: ["#750006", "#f5f2ec", "#d98038", "#d9ab88"], Icon: Confetti, photo: STOCK.experiential?.[0]?.src },
];

const IG_POSTS = [
  "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe",
  "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/lc-waikiki-influencer",
  "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-gor-mahia",
  "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/utamaduni-day",
  "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/africa-forum-displacement",
];

// All 11 sectors — the phone gets the same reel as desktop.
const WORK = [
  { sectorSlug: "government", sector: "Government", client: "Africa Urban Forum 2026", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/auf-2026", logo: "/logos/executive-office-president.png" },
  { sectorSlug: "retail-fashion", sector: "Retail & Fashion", client: "LC Waikiki Africa", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/lc-waikiki-influencer", logo: "/logos/lc-waikiki.png" },
  { sectorSlug: "corporate", sector: "Corporate", client: "Kansai Plascon", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-plascon-launch", logo: "/logos/kansai-plascon.png" },
  { sectorSlug: "hospitality", sector: "Hospitality", client: "Thrive Hospitality Group", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/glam-hotel", logo: "/logos/thrive-hospitality.png" },
  { sectorSlug: "sports-tourism", sector: "Sports & Tourism", client: "Gor Mahia FC", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/kansai-gor-mahia", logo: "/logos/kansai-plascon.png" },
  { sectorSlug: "healthcare", sector: "Healthcare", client: "Columbia Africa", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/columbia-building", logo: "/logos/columbia-africa.png" },
  { sectorSlug: "social-impact", sector: "Social Impact", client: "UNHCR & Amahoro", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/africa-forum-displacement", logo: "/logos/unhcr.png" },
  { sectorSlug: "finance", sector: "Finance", client: "Elysium Capital", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/elysium-finance", logo: "/logos/elysium-capital.png" },
  { sectorSlug: "lifestyle", sector: "Beauty & Lifestyle", client: "Allso Beauty", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/allso-launch", logo: "/logos/allso-beauty.png" },
  { sectorSlug: "culture-entertainment", sector: "Culture", client: "Talanta Afrika Festival", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/cultural-dancers", logo: undefined },
  { sectorSlug: "owned-ips", sector: "Owned IPs", client: "Tribe Vibe · Suhba · Capital Room", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe", logo: "/logos/tribe-vibe.png" },
];

const PLATFORMS = [
  { slug: "the-tribe-vibe", name: "The Tribe Vibe", num: "01", tag: "Lifestyle · Music · Culture", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe", logo: "/logos/tribe-vibe.png", logoDark: false },
  { slug: "suhba-series", name: "Suhba Series", num: "02", tag: "Curated Conversations", image: cl("suhba-01"), logo: "/logos/suhba-series.png", logoDark: false },
  { slug: "the-capital-room", name: "The Capital Room", num: "03", tag: "Leadership · Business", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/podcast-set", logo: "/logos/capital-room.png", logoDark: true },
];

const STATS = [
  { v: "15+", l: "Years shaping reputation", Icon: Timer },
  { v: "250+", l: "Campaigns delivered", Icon: ChartBar },
  { v: "80+", l: "Brands & institutions", Icon: Buildings },
  { v: "12+", l: "African markets", Icon: GlobeHemisphereEast },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function MobileHome() {
  // Live Instagram images from the Behold feed; falls back to curated tiles.
  const [igPosts, setIgPosts] = useState<string[]>(IG_POSTS);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL ?? "https://feeds.behold.so/yZp6UeHFmPs6YRRfXoGV";
    let active = true;
    (async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list: any[] = Array.isArray(data) ? data : data?.posts ?? [];
        const srcs = list
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((p: any) => p.sizes?.medium?.mediaUrl || p.mediaUrl || p.thumbnailUrl || "")
          .filter(Boolean)
          .slice(0, 6);
        if (active && srcs.length) setIgPosts(srcs);
      } catch {
        /* keep fallback */
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* ── HERO ── */}
      <BrandHero />

      {/* ── WHO WE ARE ── */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}`, position: "relative" }}>
        <FadeUp>
          <MobileEyebrow tone="light" color="#750006">Who we are</MobileEyebrow>
        </FadeUp>
        <FadeUp delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(2.3rem, 10.5vw, 3.1rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: "1.2rem 0 0",
            }}
          >
            A communications partner built for influence at{" "}
            <em style={{ fontStyle: "normal", color: "#750006" }}>scale</em>.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: "rgba(28,28,28,0.66)",
              margin: "1.4rem 0 0",
            }}
          >
            FID &amp; Co. is a full-service strategic communications and brand
            experience firm delivering PR, media, digital storytelling,
            influencer marketing and experiential activations across Africa.
          </p>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem 1rem",
            marginTop: "3rem",
          }}
        >
          {STATS.map((s, i) => (
            <FadeUp key={s.l} delay={0.1 + i * 0.06}>
              <s.Icon size={26} weight="bold" color="#750006" />
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 12vw, 3.4rem)",
                  lineHeight: 0.9,
                  color: "#750006",
                  marginTop: "0.5rem",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  color: "rgba(28,28,28,0.6)",
                  marginTop: "0.6rem",
                }}
              >
                {s.l}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── OUR EXPERTISE (rotating dials, 2-1-2) ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "#750006", color: "#f5f2ec", padding: `${PY} ${PX}` }}>
        <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
        <MobileSectionHead title="Our Expertise" href="/services" tone="dark" />
        {(() => {
          const Dial = (i: number) => {
            const s = SERVICES[i];
            const Icon = s.Icon;
            return (
              <FadeUp key={s.slug} delay={(i % 2) * 0.06}>
                <Link href={`/services/${s.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <RadialDial
                    label={s.label}
                    tone="dark"
                    dots={s.dots}
                    size={150}
                    spin={56 + i * 8}
                    dir={i % 2 === 0 ? 1 : -1}
                    icon={<Icon size={24} weight="bold" />}
                    photo={s.photo}
                  />
                </Link>
              </FadeUp>
            );
          };
          const row: React.CSSProperties = { display: "flex", justifyContent: "center", gap: "0.75rem" };
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div style={row}>{Dial(0)}{Dial(1)}</div>
              <div style={row}>{Dial(2)}</div>
              <div style={row}>{Dial(3)}{Dial(4)}</div>
            </div>
          );
        })()}
        </div>
      </section>

      {/* ── CTA VIDEO BANNER ── */}
      <section style={{ background: "#FFFFFF", padding: `${PY} ${PX}` }}>
        <FadeUp>
          <div
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(15,15,15,0.16)",
              backgroundColor: "#0f0f0f",
              aspectRatio: "16 / 9",
            }}
          >
            <video
              src="/videos/cta-book.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", right: "6%", bottom: "8%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
              <a href="/#contact" style={{ background: "#750006", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", padding: "0.7rem 1.2rem", borderRadius: "999px", textDecoration: "none" }}>Book us</a>
              <a href="mailto:info@fidco.africa" style={{ background: "#FFFFFF", color: "#0f0f0f", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.72rem", padding: "0.7rem 1.2rem", borderRadius: "999px", textDecoration: "none", border: "1px solid rgba(15,15,15,0.15)" }}>info@fidco.africa</a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── SELECTED WORK — full-bleed vertical reel, desktop energy ── */}
      <section className="section-dark" style={{ color: "#f5f2ec", padding: 0 }}>
        <div style={{ padding: `${PY} ${PX} 1.2rem` }}>
          <MobileSectionHead title="Selected Work" href="/work" label="View all" tone="dark" />
        </div>
        <div className="mwr-reel">
          {WORK.slice(0, 3).map((w, i) => (
            <Link key={w.sectorSlug} href={`/work/${w.sectorSlug}`} className="mwr-slide" style={{ textDecoration: "none", display: "block", position: "relative" }}>
              <img src={w.image} alt={w.client} loading={i < 2 ? "eager" : "lazy"} decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,5,5,0.42) 0%, rgba(13,5,5,0.05) 40%, rgba(13,5,5,0.86) 100%)" }} />
              <span style={{ position: "absolute", top: "1.1rem", right: "1.2rem", fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.22em", color: "rgba(245,242,236,0.85)", fontWeight: 700 }}>
                {String(i + 1).padStart(2, "0")} / 03
              </span>
              {w.logo && (
                <span style={{ position: "absolute", top: "1rem", left: "1.2rem", display: "inline-flex", alignItems: "center", padding: "0.45rem 0.65rem", borderRadius: "10px", background: "#f5f2ec" }}>
                  <img src={w.logo} alt={`${w.client} logo`} loading="lazy" style={{ height: "20px", maxWidth: "84px", objectFit: "contain" }} />
                </span>
              )}
              <div style={{ position: "absolute", left: "1.2rem", right: "1.2rem", bottom: "1.4rem" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", margin: 0 }}>({String(i + 1).padStart(2, "0")}) {w.sector}</p>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.9rem, 9vw, 2.6rem)", letterSpacing: "-0.02em", lineHeight: 0.96, color: "#f5f2ec", margin: "0.5rem 0 0", textTransform: "uppercase" }}>{w.client}</h3>
                <span style={{ display: "inline-block", marginTop: "0.8rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,242,236,0.75)", fontWeight: 700, borderBottom: "1px solid rgba(245,242,236,0.4)", paddingBottom: "0.2rem" }}>Open sector</span>
              </div>
            </Link>
          ))}
        </div>
        {/* All Work — animated marquee of the remaining sectors, CTA hovering over it */}
        <Link href="/work" style={{ textDecoration: "none", display: "block", position: "relative", overflow: "hidden", padding: "clamp(5rem,18vw,8rem) 0", background: "#260000" }}>
          <div className="maw-track" aria-hidden>
            {[...WORK.slice(3), ...WORK.slice(3)].map((w, i) => (
              <img key={i} src={w.image} alt="" loading="lazy" className="maw-card" style={{ rotate: i % 2 ? "2.5deg" : "-2.5deg", translate: i % 3 === 1 ? "0 10px" : "0 0" }} />
            ))}
          </div>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 75% 90% at 50% 50%, rgba(38,0,0,0.72) 0%, rgba(38,0,0,0.35) 55%, rgba(38,0,0,0.6) 100%)" }} />
          <div style={{ position: "relative", textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.6rem, 12vw, 3.6rem)", letterSpacing: "-0.03em", color: "#f5f2ec", textShadow: "0 4px 30px rgba(0,0,0,0.45)" }}>
              All Work
              <sup style={{ fontFamily: "var(--font-body)", fontSize: "0.42em", fontWeight: 700, color: "#d98038", marginLeft: "0.2em" }}>(11)</sup>
            </span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,242,236,0.75)", fontWeight: 700, margin: "0.9rem 0 0" }}>
              Every sector, every story →
            </p>
          </div>
        </Link>

        <style>{`
          .mwr-reel { scroll-snap-type: y proximity; }
          .mwr-slide { height: 72svh; scroll-snap-align: start; overflow: hidden; }
          .maw-track {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 4vw;
            width: max-content;
            animation: maw-scroll 28s linear infinite;
          }
          .maw-card {
            flex: 0 0 auto;
            width: 36vw;
            aspect-ratio: 3/4;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 14px 40px rgba(0,0,0,0.45);
          }
          @keyframes maw-scroll {
            from { transform: translateY(-50%) translateX(0); }
            to { transform: translateY(-50%) translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── PLATFORMS (slider) ── */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <MobileSectionHead title="Owned Platforms" href="/events" tone="light" />
        <MobileSlider tone="light">
          {PLATFORMS.map((p) => (
            <Link key={p.slug} href={`/platforms/${p.slug}`} style={{ textDecoration: "none", display: "block", paddingRight: "1px" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: "16px", overflow: "hidden", background: "#260000" }}>
                <img src={p.image} alt={p.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(38,0,0,0.85), transparent 55%)" }} />
                <span style={{ position: "absolute", top: "0.9rem", right: "0.9rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(245,242,236,0.85)", fontWeight: 700 }}>({p.num})</span>
                {p.logo && (
                  <span style={{ position: "absolute", top: "0.9rem", left: "0.9rem", display: "inline-flex", alignItems: "center", padding: "0.4rem 0.6rem", borderRadius: "10px", background: p.logoDark ? "#1c1c1c" : "#f5f2ec" }}>
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" style={{ height: "22px", maxWidth: "90px", objectFit: "contain" }} />
                  </span>
                )}
                <div style={{ position: "absolute", left: "1.2rem", bottom: "1.2rem", right: "1.2rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d98038", margin: 0 }}>{p.tag}</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "-0.01em", color: "#f5f2ec", margin: "0.4rem 0 0" }}>{p.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </MobileSlider>
      </section>

      {/* ── FOUNDER (white) ── */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <FadeUp>
          <MobileEyebrow tone="light">Founder</MobileEyebrow>
        </FadeUp>
        <FadeUp delay={0.06}>
          <img
            src="https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/farida-studio"
            alt="Farida Idris"
            loading="lazy"
            style={{ width: "100%", maxWidth: "320px", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center top", borderRadius: "16px", margin: "1.4rem 0 0", border: "1px solid rgba(117,0,6,0.18)" }}
          />
        </FadeUp>
        <FadeUp delay={0.12}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.2rem, 10vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, margin: "1.6rem 0 0", color: "#1c1c1c" }}>
            Farida Idris
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#750006", margin: "0.7rem 0 0" }}>
            Founder &amp; Lead Strategist
          </p>
        </FadeUp>
        <FadeUp delay={0.18}>
          <blockquote style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.3rem, 6vw, 1.7rem)", lineHeight: 1.32, letterSpacing: "-0.01em", margin: "1.6rem 0 0", color: "#1c1c1c" }}>
            &ldquo;Communication is not simply about visibility. It is about
            shaping understanding and connecting organisations with the people
            they serve.&rdquo;
          </blockquote>
        </FadeUp>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="section-light" style={{ color: "#1c1c1c", padding: `${PY} ${PX}` }}>
        <MobileSectionHead title="Follow the work in motion" href="https://instagram.com/fidpr/" label="@fidpr" tone="light" />
        <FadeUp delay={0.06}>
          <div style={{ display: "flex", gap: "0.7rem", overflowX: "auto", paddingBottom: "0.4rem", marginTop: "1.6rem" }}>
            {igPosts.map((src) => (
              <a
                key={src}
                href="https://instagram.com/fidpr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ flexShrink: 0, width: "108px", aspectRatio: "1 / 1", borderRadius: "12px", overflow: "hidden", border: "3px solid #fff", boxShadow: "0 6px 18px rgba(117,0,6,0.2)" }}
              >
                <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── CONTACT (real form) ── */}
      <Contact />

      <Footer />
    </div>
  );
}
