"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

// q_auto + vc_auto let Cloudinary pick the best quality/codec per browser —
// substantially smaller than the raw upload, same visual quality.
// e_gamma:50 lifts the source video out of its heavy baked-in darkness (Farida
// asked for a brighter landing) without washing it out — gamma raises the
// shadows/midtones far more naturally than a flat brightness offset.
const HERO_VIDEO =
  "https://res.cloudinary.com/drpsrkmbk/video/upload/q_auto,vc_auto,w_1920,e_gamma:50/v1784533901/enhanced-video_1_dhyv6f.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BrandHero() {
  return (
    <section
      data-nav-dark
      aria-label="FID & Co."
      className="brand-hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "560px",
        overflow: "hidden",
        background: "#260000",
      }}
    >
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/photos/hero-poster.jpg"
        aria-hidden
        className="brand-hero-video"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      {/* Editorial scrim — darker toward the lower-left so the headline reads,
          lighter across the middle so the footage stays visible. */}
      <div
        aria-hidden
        className="brand-hero-scrim"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(38,0,0,0.4) 0%, rgba(38,0,0,0.08) 26%, rgba(38,0,0,0.12) 55%, rgba(38,0,0,0.78) 100%)",
        }}
      />

      {/* ── Yeshi-style oversized editorial headline over the footage ── */}
      <div className="brand-hero-content">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="brand-hero-kicker"
        >
          <span className="brand-hero-kicker-rule" /> FID &amp; Co. · Strategic Communications
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.24 }}
          className="brand-hero-headline"
        >
          Africa&rsquo;s stories,
          <br />
          told with <em>intent</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
          className="brand-hero-intro"
        >
          We build reputations and cultural relevance for brands across the continent —
          through strategic communications, media and experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.56 }}
          className="brand-hero-cta"
        >
          <Link href="/#work" className="brand-hero-btn brand-hero-btn--solid">
            See our work <ArrowUpRight size={16} weight="bold" />
          </Link>
          <Link href="/#contact" className="brand-hero-btn brand-hero-btn--ghost">
            Start a conversation
          </Link>
        </motion.div>
      </div>

      <style>{`
        .brand-hero-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: clamp(1rem, 1.8vw, 1.5rem);
          padding: clamp(2rem, 6vw, 5.5rem);
          padding-bottom: clamp(3rem, 7vw, 6rem);
          max-width: 1240px;
          margin: 0 auto;
          left: 0; right: 0;
        }
        .brand-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: var(--font-body);
          font-size: clamp(0.62rem, 1vw, 0.74rem);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 600;
          color: #f0d9c4;
        }
        .brand-hero-kicker-rule {
          width: 34px; height: 1px; background: #d98038; opacity: 0.85;
        }
        .brand-hero-headline {
          margin: 0;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: clamp(2.6rem, 8vw, 6.6rem);
          line-height: 0.94;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: #f5f2ec;
          max-width: 16ch;
          text-shadow: 0 2px 40px rgba(38,0,0,0.45);
        }
        .brand-hero-headline em {
          font-style: italic;
          color: #d98038;
        }
        .brand-hero-intro {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.18rem);
          line-height: 1.6;
          color: rgba(245,242,236,0.9);
          max-width: 46ch;
          text-shadow: 0 1px 20px rgba(38,0,0,0.4);
        }
        .brand-hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 0.4rem;
        }
        .brand-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.76rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 0.95rem 1.7rem;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
        }
        .brand-hero-btn:hover { transform: translateY(-2px); }
        .brand-hero-btn--solid { background: #d98038; color: #260000; }
        .brand-hero-btn--solid:hover { background: #e8924a; }
        .brand-hero-btn--ghost {
          background: rgba(245,242,236,0.08);
          color: #f5f2ec;
          border: 1px solid rgba(245,242,236,0.45);
          backdrop-filter: blur(4px);
        }
        .brand-hero-btn--ghost:hover { background: rgba(245,242,236,0.16); }

        @media (max-width: 900px) {
          .brand-hero-section {
            height: auto !important;
            min-height: 0 !important;
            /* nav bar first, then the video, then the headline block below it */
            padding-top: 64px !important;
            display: flex;
            flex-direction: column;
          }
          .brand-hero-video {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }
          .brand-hero-scrim { display: none !important; }
          .brand-hero-content {
            position: relative !important;
            inset: auto !important;
            padding: clamp(1.6rem, 7vw, 2.4rem);
            padding-bottom: clamp(2.4rem, 9vw, 3.2rem);
            background: #260000;
          }
          .brand-hero-headline {
            text-shadow: none;
            font-size: clamp(2.2rem, 11vw, 3.4rem) !important;
          }
          .brand-hero-intro { text-shadow: none; }
        }
      `}</style>
    </section>
  );
}
