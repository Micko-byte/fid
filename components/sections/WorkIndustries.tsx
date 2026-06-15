"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import Tilt from "@/components/motion/Tilt";
import AfricanFootprint from "@/components/sections/AfricanFootprint";
import { InstitutionsGraphic } from "@/components/graphics/AbstractGraphics";
import VariableProximity from "@/components/ui/VariableProximity";

const assets: Record<string, { logo?: string; image?: string }> = {
  "national-minorities-day": { logo: "/logos/executive-office-president.png", image: "/photos/projects/national-minorities-day.jpg" },
  "africa-urban-forum-2026": { logo: "/logos/executive-office-president.png", image: "/photos/projects/cultural-dancers.jpg" },
  "utamaduni-day": { logo: "/logos/state-dept-culture.png", image: "/photos/projects/utamaduni-day.jpg" },
  "lc-waikiki-africa": { logo: "/logos/lc-waikiki.png", image: "/photos/projects/lc-waikiki-influencer.jpg" },
  "kansai-plascon": { logo: undefined, image: "/photos/projects/kansai-gor-mahia.jpg" },
  "thrive-hospitality-group": { logo: "/logos/thrive-hospitality.png", image: "/photos/projects/cosmo-market.jpg" },
  "africa-forum-on-displacements": { logo: "/logos/unhcr.png", image: "/photos/projects/africa-forum-displacement.jpg" },
  "columbia-africa-healthcare": { logo: "/logos/columbia-africa.png", image: "/photos/projects/columbia-building.jpg" },
  "wrc-safari-rally": { logo: "/logos/wrc-safari-rally.png", image: "/photos/projects/healthcare-storytelling.jpg" },
};

const storyOrder = [
  "national-minorities-day",
  "utamaduni-day",
  "lc-waikiki-africa",
  "thrive-hospitality-group",
  "africa-forum-on-displacements",
];

const storyLeads = storyOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean) as Project[];

function StoryChapter({ p, index }: { p: Project; index: number }) {
  const a = assets[p.slug] ?? {};
  const reversed = index % 2 === 1;
  const note =
    index === 0
      ? "A national moment framed with accuracy and scale."
      : index === 1
        ? "Culture translated into a public-facing visual language."
        : index === 2
          ? "Multi-market brand storytelling with consistency across audiences."
          : index === 3
            ? "Distinct launches with distinct atmospheres."
            : "Regional and multilateral messaging with clarity.";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)",
        gap: "clamp(1.4rem, 3vw, 3rem)",
        alignItems: "center",
        padding: "clamp(1rem, 2vw, 1.3rem)",
        borderRadius: "16px",
        border: "1px solid rgba(26,26,26,0.06)",
        background: "rgba(247,236,196,0.2)",
        backdropFilter: "blur(10px)",
      }}
      className="work-chapter"
    >
      <div style={{ order: reversed ? 2 : 1 }}>
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.64rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#5B0E14",
            marginBottom: "0.8rem",
          }}
        >
          <span style={{ width: "18px", height: "1px", background: "#5B0E14", opacity: 0.65 }} />
          Chapter {String(index + 1).padStart(2, "0")} - {p.sector}
        </p>

        <h3
          style={{
            fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
            fontWeight: 700,
            fontSize: "clamp(1.45rem, 2.5vw, 2.3rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            margin: 0,
            maxWidth: "16ch",
          }}
        >
          {p.client}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-heading,'Oswald')",
            fontWeight: 500,
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            lineHeight: 1.22,
            color: "#5B0E14",
            marginTop: "0.85rem",
            maxWidth: "22ch",
          }}
        >
          {p.title}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.92rem",
            lineHeight: 1.7,
            color: "rgba(26,26,26,0.64)",
            maxWidth: "48ch",
            marginTop: "1rem",
          }}
        >
          {p.impact}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            lineHeight: 1.6,
            color: "rgba(26,26,26,0.52)",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginTop: "1.2rem",
            maxWidth: "36ch",
          }}
        >
          {note}
        </p>

        <Link
          href={`/work/${p.slug}`}
          data-cursor="View"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            textDecoration: "none",
            marginTop: "1.4rem",
            fontWeight: 600,
          }}
        >
          Read the story
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <Tilt
        className="work-chapter-media"
        style={{
          position: "relative",
          order: reversed ? 1 : 2,
          aspectRatio: "16/10",
          overflow: "hidden",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(91,14,20,0.08), rgba(241,225,148,0.16))",
        }}
      >
        {a.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={a.image}
            alt={p.client}
            loading="lazy"
            className="work-card-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)", mixBlendMode: "multiply" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, backgroundColor: p.color ?? "#2a0508", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 600, fontSize: "2rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
              {p.client.split(" ")[0]}
            </span>
          </div>
        )}

        {a.logo && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backgroundColor: "rgba(247,236,196,0.88)",
              padding: "0.45rem 0.7rem",
              height: "38px",
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              border: "1px solid rgba(91,14,20,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.logo} alt="" style={{ maxHeight: "100%", maxWidth: "110px", objectFit: "contain" }} />
          </div>
        )}

        <span
          style={{
            position: "absolute",
            bottom: "0.7rem",
            right: "0.9rem",
            fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
            fontWeight: 700,
            fontSize: "1rem",
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </Tilt>
    </motion.article>
  );
}

export default function WorkIndustries() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lead = storyLeads[0];
  const rest = storyLeads.slice(1);

  const leadFacts = useMemo(
    () => [
      "National launches",
      "Regional storytelling",
      "Multi-market campaigns",
      "Cultural and institutional work",
    ],
    []
  );

  if (!lead) return null;

  return (
    <section
      id="work"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f7ecc4",
        paddingTop: "clamp(5.5rem,12vw,11rem)",
        paddingBottom: "clamp(5.5rem,12vw,11rem)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(3rem,7vw,6rem)",
          right: "-7%",
          width: "min(42vw, 520px)",
          opacity: 0.42,
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="work-deco-graphic"
      >
        <InstitutionsGraphic />
      </div>

      <div
        ref={ref}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem,5vw,6rem)",
          paddingRight: "clamp(1.5rem,5vw,6rem)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "end" }}>
          <div style={{ maxWidth: "760px" }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#5B0E14",
              }}
            >
              <span style={{ width: "26px", height: "1px", background: "#5B0E14", opacity: 0.6 }} />
              Our work
            </motion.span>

            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: "0.8rem",
                fontFamily: "var(--font-heading,'Oswald')",
                fontWeight: 600,
                fontSize: "clamp(2.2rem,5vw,4rem)",
                color: "#1a1a1a",
                lineHeight: 1,
              }}
            >
              <VariableProximity
                label="Stories shaped by culture, institutions and public attention."
                containerRef={ref as import("react").MutableRefObject<HTMLElement | null>}
                radius={130}
                falloff="gaussian"
                fromFontVariationSettings="'wght' 500, 'opsz' 16"
                toFontVariationSettings="'wght' 900, 'opsz' 42"
                style={{
                  fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  fontSize: "clamp(2.2rem,5vw,4rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                marginTop: "1rem",
                maxWidth: "60ch",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.95rem,1.35vw,1.1rem)",
                lineHeight: 1.65,
                color: "rgba(26,26,26,0.62)",
              }}
            >
              Communication is not a gallery of assets. It is a sequence of public moments, each with a purpose, an audience and a point of view. These selected projects show how FID & Co. moves from national observation to cultural platform building, and from brand launches to sustained reputation work.
            </motion.p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "0.7rem",
              minWidth: "220px",
              justifyItems: "start",
              alignSelf: "stretch",
              paddingTop: "0.5rem",
            }}
          >
            {leadFacts.map((fact) => (
              <div
                key={fact}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,26,0.6)",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(91,14,20,0.12)",
                  background: "rgba(247,236,196,0.55)",
                }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "left",
            height: "1px",
            background: "rgba(26,26,26,0.1)",
            marginTop: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        />

        <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 1.4rem)" }}>
          <StoryChapter p={lead} index={0} />
          {rest.map((p, index) => (
            <StoryChapter key={p.slug} p={p} index={index + 1} />
          ))}
        </div>

        <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <AfricanFootprint />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-deco-graphic { opacity: 0.18 !important; width: 60vw !important; right: -20% !important; }
          .work-chapter { grid-template-columns: 1fr !important; }
          .work-chapter-media { order: 1 !important; aspect-ratio: 16/9 !important; }
          .work-chapter > div { order: 2 !important; }
        }
        .work-chapter:hover .work-card-img { transform: scale(1.05); }
        .work-chapter:hover h3 { color: #5B0E14 !important; }
      `}</style>
    </section>
  );
}
