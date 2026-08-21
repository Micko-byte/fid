"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

// Farida's brief: drop the video, use a premium image hero like the reference
// site. A curated set of the strongest shots from the FID Cloudinary library —
// editorial studio, fashion, hospitality, glam and government — cross-faded
// with a slow Ken-Burns drift behind the headline.
const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto,c_fill,g_auto,w_1920,h_1200/FID/${id}`;

const HERO_IMAGES = [
  cl("hero-auf-01"),
  cl("hero-allso-01"),
  cl("hero-glam-01"),
  cl("hero-cafenbo-01"),
  cl("hero-people-03"),
];

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_MS = 5000;

export default function BrandHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((n) => (n + 1) % HERO_IMAGES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      data-nav-dark
      aria-label="FID & Co."
      className="brand-hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#5d0010",
      }}
    >
      {/* ── Cross-fading image slideshow ── */}
      {HERO_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          loading="eager"
          className="brand-hero-slide"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1.06)" : "scale(1)",
            transition: "opacity 1.2s ease, transform 6s ease-out",
          }}
        />
      ))}

      {/* Editorial scrim — darker toward the lower-left so the headline reads,
          lighter across the middle so the photography stays vivid. */}
      <div
        aria-hidden
        className="brand-hero-scrim"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(93,0,16,0.52) 0%, rgba(93,0,16,0.12) 24%, rgba(47,127,122,0.10) 52%, rgba(93,0,16,0.84) 100%)",
        }}
      />

      {/* ── Yeshi-style oversized editorial headline ── */}
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

        {/* Slide indicators */}
        <div className="brand-hero-dots" aria-hidden>
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={i === active ? "is-active" : ""}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
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
          padding-bottom: clamp(2.6rem, 6vw, 5rem);
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
          color: #f3e6d8;
        }
        .brand-hero-kicker-rule {
          width: 34px; height: 1px; background: #2f7f7a; opacity: 0.95;
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
          text-shadow: 0 2px 40px rgba(38,0,0,0.38);
        }
        .brand-hero-headline em {
          font-style: italic;
          color: #2f7f7a;
        }
        .brand-hero-intro {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.4vw, 1.18rem);
          line-height: 1.6;
          color: rgba(245,242,236,0.92);
          max-width: 46ch;
          text-shadow: 0 1px 24px rgba(38,0,0,0.5);
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
        .brand-hero-btn--solid { background: #2f7f7a; color: #f5f2ec; }
        .brand-hero-btn--solid:hover { background: #3d918c; }
        .brand-hero-btn--ghost {
          background: rgba(245,242,236,0.08);
          color: #f5f2ec;
          border: 1px solid rgba(245,242,236,0.45);
          backdrop-filter: blur(4px);
        }
        .brand-hero-btn--ghost:hover { background: rgba(245,242,236,0.16); }
        .brand-hero-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.6rem;
        }
        .brand-hero-dots button {
          width: 28px; height: 3px;
          border: none; padding: 0; cursor: pointer;
          border-radius: 999px;
          background: rgba(245,242,236,0.35);
          transition: background 0.3s ease, width 0.3s ease;
        }
        .brand-hero-dots button.is-active {
          background: #2f7f7a;
          width: 44px;
        }

        @media (max-width: 900px) {
          .brand-hero-section {
            height: 88dvh !important;
            min-height: 520px !important;
          }
          .brand-hero-scrim {
            background: linear-gradient(to bottom, rgba(93,0,16,0.42) 0%, rgba(93,0,16,0.25) 40%, rgba(93,0,16,0.9) 100%) !important;
          }
          .brand-hero-content {
            padding: clamp(1.6rem, 7vw, 2.4rem);
            padding-bottom: clamp(2rem, 8vw, 3rem);
          }
          .brand-hero-headline {
            font-size: clamp(2.2rem, 12vw, 3.6rem);
          }
        }
      `}</style>
    </section>
  );
}
