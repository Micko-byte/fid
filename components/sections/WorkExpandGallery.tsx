"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Six showcase entries — mix of local + Cloudinary photos */
const cl = (id: string) =>
  `https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/${id}`;

const ITEMS = [
  {
    slug: "africa-urban-forum-2026",
    client: "Africa Urban Forum",
    sector: "Government",
    label: "Continental convening — 2026",
    image: cl("auf-01"),
    accent: "#5A84AC",
    logo: "/logos/executive-office-president.png",
  },
  {
    slug: "kansai-plascon",
    client: "Kansai Plascon",
    sector: "Corporate",
    label: "Gor Mahia partnership launch",
    image: cl("kansai-01"),
    accent: "#750006",
    logo: "",
  },
  {
    slug: "thrive-hospitality-group",
    client: "Chaii Republic",
    sector: "Hospitality",
    label: "Brand launch experience",
    image: "/photos/projects/thrive-hospitality/glam-01.jpg",
    accent: "#d98038",
    logo: "/logos/thrive-hospitality.png",
  },
  {
    slug: "allso-beauty",
    client: "Allso Beauty",
    sector: "Beauty & Lifestyle",
    label: "Campaign & influencer strategy",
    image: cl("allso-01"),
    accent: "#C7AC9F",
    logo: "",
  },
];

export default function WorkExpandGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="work"
      data-nav-dark
      aria-label="Selected work showcase"
      style={{
        background: "#0f0f0f",
        padding: "clamp(5rem, 10vw, 8rem) 0 0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="section-shell"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              color: "#f5f2ec",
              margin: 0,
            }}
          >
            Selected
            <br />
            <em style={{ fontStyle: "italic", color: "#d98038" }}>Work.</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          <Link
            href="/#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(245,242,236,0.45)",
              textDecoration: "none",
              transition: "color 0.25s ease",
              paddingBottom: "0.4rem",
              borderBottom: "1px solid rgba(245,242,236,0.15)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(245,242,236,0.85)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,242,236,0.45)")
            }
          >
            View all cases
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </motion.div>
      </div>

      {/* Expanding accordion gallery — contained with side gutters */}
      <motion.div
        className="section-shell work-accordion"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "3px",
          height: "clamp(300px, 38vw, 500px)",
        }}
      >
        {ITEMS.map((item, i) => {
          const isHovered = hovered === i;
          const isOtherHovered = hovered !== null && hovered !== i;

          return (
            <Link
              key={`${item.slug}-${i}`}
              href={`/work/${item.slug}`}
              className="work-accordion-item"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                flexGrow: isHovered ? 4 : 1,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                overflow: "hidden",
                textDecoration: "none",
                transition:
                  "flex-grow 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
                opacity: isOtherHovered ? 0.55 : 1,
                borderRadius:
                  i === 0
                    ? "10px 0 0 0"
                    : i === ITEMS.length - 1
                    ? "0 10px 0 0"
                    : "0",
              }}
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transform: isHovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                }}
              />

              {/* Always-visible dark scrim at bottom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.3) 40%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />

              {/* Respective brand logo on the picture */}
              {item.logo && (
                <img
                  src={item.logo}
                  alt={`${item.client} logo`}
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: "1.1rem",
                    left: "1.1rem",
                    height: "30px",
                    maxWidth: "100px",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.92,
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Accent top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: item.accent,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />

              {/* Collapsed: vertical sector label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-90deg)",
                  transformOrigin: "center center",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.4)",
                  opacity: isHovered ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                {item.sector}
              </div>

              {/* Expanded: full info */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(1.2rem, 2vw, 2rem)",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(12px)",
                  transition:
                    "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: item.accent,
                    margin: "0 0 0.45rem",
                  }}
                >
                  {item.sector}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: "#f5f2ec",
                    margin: "0 0 0.35rem",
                  }}
                >
                  {item.client}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "rgba(245,242,236,0.5)",
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {item.label}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    marginTop: "1rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "#d98038",
                    letterSpacing: "0.06em",
                  }}
                >
                  View case
                  <ArrowUpRight size={12} weight="bold" />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>

      <style>{`
        @media (max-width: 760px) {
          .work-accordion {
            flex-direction: column !important;
            height: auto !important;
            gap: 0.6rem !important;
          }
          .work-accordion-item {
            flex: none !important;
            width: 100% !important;
            height: 240px !important;
            opacity: 1 !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
