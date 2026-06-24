"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Buildings, ChatsCircle, MusicNotes } from "@phosphor-icons/react";
import CutoutCard from "@/components/ui/CutoutCard";

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle / Music / Culture / Community",
    href: "/platforms/the-tribe-vibe",
    desc: "FID & Co.'s flagship experiential lifestyle platform, bringing together music, hospitality, creator culture and socially engaged urban audiences through curated day experiences.",
    num: "01",
    image: "/photos/projects/tribe-vibe.jpg",
    accent: "#d98038",
    Icon: MusicNotes,
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations / Modern Identity / Thoughtful Experiences",
    href: "/platforms/suhba-series",
    desc: "An intimate conversation platform created to foster meaningful dialogue around identity, leadership, wellbeing, finance, faith and modern African experiences.",
    num: "02",
    image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/suhba-01",
    accent: "#d9ab88",
    Icon: ChatsCircle,
  },
  {
    name: "The Capital Room",
    tag: "Leadership / Business / Influence / African Perspectives",
    href: "/platforms/the-capital-room",
    desc: "A conversation-led platform focused on leadership, entrepreneurship, business and the realities of building within African markets, bringing together founders, executives and changemakers.",
    num: "03",
    image: "/photos/editorial/podcast-set.jpg",
    accent: "#d9ab88",
    Icon: Buildings,
  },
];

function FeaturePlatform({ platform: p }: { platform: (typeof platforms)[number] }) {
  const Icon = p.Icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="platform-feature fid-art-panel"
    >
      <Link href={p.href} className="platform-feature-media" data-cursor="Explore">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </Link>

      <div className="platform-feature-copy">
        <div className="platform-meta-row">
          <span>{p.num} / Owned platform</span>
          <Icon size={28} weight="light" />
        </div>

        <Link href={p.href} style={{ color: "inherit", textDecoration: "none" }}>
          <h3 className="platform-feature-title">{p.name}</h3>
        </Link>

        <p className="platform-tag">{p.tag}</p>
        <p className="type-body platform-desc">{p.desc}</p>

        <Link href={p.href} className="platform-link" data-cursor="Explore">
          Explore platform <ArrowUpRight size={17} weight="bold" />
        </Link>
      </div>
    </motion.article>
  );
}

function PlatformTile({ platform: p, index }: { platform: (typeof platforms)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: "clamp(220px, 28vw, 360px)" }}
    >
      <CutoutCard
        image={p.image}
        label={p.name}
        sublabel={`${p.num} · ${p.tag}`}
        href={p.href}
        style={{ height: "100%" }}
      >
        <Link href={p.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "0.8rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: p.accent, textDecoration: "none" }}>
          Explore <ArrowUpRight size={14} weight="bold" />
        </Link>
      </CutoutCard>
    </motion.div>
  );
}

export default function Platforms() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [feature, ...rest] = platforms;

  return (
    <section id="platforms" className="fid-section section-light platforms-section">
      <div aria-hidden className="platforms-bg-word">CULTURE</div>
      <div ref={ref} className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        <div className="platforms-head">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="type-eyebrow"
            >
              Owned platforms &amp; cultural IPs
            </motion.span>

            <motion.h2
              data-skew
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="platforms-title"
            >
              Culture, conversation and brand experience on our terms.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="type-body platforms-intro"
          >
            These are not filler event pages. They are FID-owned audience platforms designed for cultural relevance, commercial partnership and repeatable brand moments.
          </motion.p>
        </div>

        <div className="platforms-layout">
          <FeaturePlatform platform={feature} />
          <div className="platforms-side">
            {rest.map((platform, index) => (
              <PlatformTile key={platform.name} platform={platform} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .platforms-section {
          background: #f5f2ec;
          color: #1c1c1c;
          isolation: isolate;
        }
        .platforms-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23750006' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 40 L40 0 L80 40 L40 80 Z'/%3E%3Cpath d='M10 40 L40 10 L70 40 L40 70 Z'/%3E%3Cpath d='M20 40 L40 20 L60 40 L40 60 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          z-index: -2;
        }
        .platforms-bg-word {
          position: absolute;
          left: -0.08em;
          top: clamp(1rem, 3vw, 2rem);
          z-index: -1;
          font-family: var(--font-heading);
          font-size: clamp(6rem, 18vw, 18rem);
          font-weight: 900;
          line-height: 0.8;
          color: rgba(117,0,6,0.04);
          letter-spacing: 0;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .platforms-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: end;
          margin-bottom: clamp(2rem, 5vw, 4rem);
        }
        .platforms-head .type-eyebrow {
          color: #d98038;
        }
        .platforms-title {
          margin: 1rem 0 0;
          max-width: 12ch;
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 0.86;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
          color: #1c1c1c;
          text-wrap: balance;
        }
        .platforms-intro {
          max-width: 34ch;
          color: #1c1c1c;
          margin: 0;
        }
        .platforms-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.32fr) minmax(320px, 0.68fr);
          gap: clamp(1rem, 2vw, 1.5rem);
          align-items: stretch;
        }
        .platform-feature {
          min-height: clamp(620px, 72vw, 840px);
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          background: #f5f2ec;
          border-color: rgba(117,0,6,0.12);
          box-shadow: 0 24px 80px rgba(38,0,0,0.12);
        }
        .platform-feature-media,
        .platform-tile-media {
          position: relative;
          display: block;
          overflow: hidden;
          min-height: 0;
          background: #260000;
        }
        .platform-feature-media::after,
        .platform-tile-media::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(28,28,28,0.04), rgba(28,28,28,0.42));
          pointer-events: none;
        }
        .platform-feature-media img,
        .platform-tile-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.96) contrast(1.05);
          transition: transform 0.9s var(--ease-out), filter 0.9s var(--ease-out);
        }
        .platform-feature:hover img,
        .platform-tile:hover img {
          transform: scale(1.045);
          filter: saturate(1.08) contrast(1.05);
        }
        .platform-feature-copy {
          padding: clamp(1.5rem, 3.4vw, 3rem);
          background: linear-gradient(135deg, rgba(117,0,6,0.98), rgba(38,0,0,0.98));
          color: #f5f2ec;
        }
        .platform-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: #f5f2ec;
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .platform-feature-title {
          max-width: 10ch;
          margin: clamp(1rem, 2vw, 1.4rem) 0 0;
          font-family: var(--font-heading);
          font-size: clamp(3rem, 7vw, 7.2rem);
          line-height: 0.86;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
          color: #f5f2ec;
        }
        .platform-tag {
          margin: clamp(1rem, 2vw, 1.2rem) 0 0;
          max-width: 54ch;
          color: #d98038;
          font-family: var(--font-body);
          font-size: 0.75rem;
          line-height: 1.55;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }
        .platform-desc {
          max-width: 52ch;
          margin: 1rem 0 0;
          color: #f5f2ec;
        }
        .platform-link,
        .platform-tile-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-top: clamp(1.2rem, 2.5vw, 2rem);
          color: #f5f2ec;
          font-family: var(--font-body);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .platform-link {
          color: #d98038;
        }
        .platforms-side {
          display: grid;
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        .platform-tile {
          min-height: 0;
          display: grid;
          grid-template-rows: minmax(220px, 1fr) auto;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(117,0,6,0.1);
          background: #f5f2ec;
          box-shadow: 0 12px 40px rgba(38,0,0,0.08);
        }
        .platform-tile-copy {
          padding: clamp(1.2rem, 2.4vw, 1.8rem);
        }
        .platform-tile h3 {
          margin: 1rem 0 0;
          color: #1c1c1c;
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 3vw, 2.8rem);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }
        .platform-tile p {
          max-width: 34ch;
          margin: 0.85rem 0 0;
          color: #1c1c1c;
          font-family: var(--font-body);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          line-height: 1.5;
          text-transform: uppercase;
        }
        .platform-tile-link {
          color: var(--tile-accent);
        }
        @media (max-width: 980px) {
          .platforms-head,
          .platforms-layout {
            grid-template-columns: 1fr;
          }
          .platforms-title {
            max-width: 11ch;
          }
          .platforms-intro {
            max-width: 54ch;
          }
          .platform-feature {
            min-height: auto;
          }
          .platform-feature-media {
            min-height: 420px;
          }
          .platforms-side {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 680px) {
          .platforms-side {
            grid-template-columns: 1fr;
          }
          .platform-feature-media {
            min-height: 340px;
          }
          .platforms-title {
            font-size: clamp(3rem, 16vw, 5.4rem);
          }
        }
      `}</style>
    </section>
  );
}
