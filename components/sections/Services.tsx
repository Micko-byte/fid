"use client";

import { useRef, type MutableRefObject } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import FallingText from "@/components/ui/FallingText";
import VariableProximity from "@/components/ui/VariableProximity";
import ScrollVideo from "@/components/ui/ScrollVideo";

const services = [
  {
    num: "01",
    title: "Strategic Communications & PR",
    slug: "strategic-communications",
    image: "/illustrations/svc-strategic-comms.png",
    video: "/illustrations/svc-strategic-comms.mp4",
    description: "Building reputation through strategic storytelling and media relations.",
    points: ["Media relations", "Reputation & narrative", "Crisis & issues"],
  },
  {
    num: "02",
    title: "Media Management & Buying",
    slug: "media-management",
    image: "/illustrations/svc-media-mgmt-b.png",
    video: "/illustrations/svc-media-mgmt.mp4",
    description: "Amplifying reach through targeted media planning and buying.",
    points: ["Media planning", "Buying & negotiation", "Performance tracking"],
  },
  {
    num: "03",
    title: "Influencer, Creator & Talent",
    slug: "influencer-creator",
    image: "/illustrations/svc-influencer.png",
    video: "/illustrations/svc-influencer.mp4",
    description: "Connecting brands with Africa's most influential voices.",
    points: ["Talent matching", "Creator campaigns", "Cultural relevance"],
  },
  {
    num: "04",
    title: "Digital Strategy & Social Media",
    slug: "digital-strategy",
    image: "/illustrations/svc-digital-strategy.png",
    video: "/illustrations/svc-digital-strategy.mp4",
    description: "Driving engagement through digital-first strategies and content.",
    points: ["Content & social", "Always-on strategy", "Community growth"],
  },
  {
    num: "05",
    title: "Experiential Marketing & Events",
    slug: "experiential-marketing",
    image: "/illustrations/svc-experiential.png",
    video: "/illustrations/svc-experiential.mp4",
    description: "Creating immersive brand moments that leave lasting impressions.",
    points: ["Activations & events", "Brand worlds", "Live experiences"],
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const illoLeft = index % 2 === 0;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "clamp(2rem, 6vw, 6rem)",
        alignItems: "center",
      }}
      className="svc-row"
    >
      <motion.div
        initial={{ opacity: 0, x: illoLeft ? -64 : 64 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{
          position: "relative",
          gridColumn: illoLeft ? "1 / 2" : "2 / 3",
          gridRow: 1,
        }}
        className="svc-illo-col"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "92%",
              height: "92%",
              borderRadius: "20px",
              overflow: "hidden",
              background: "transparent",
            }}
          >
            <ScrollVideo
              src={service.video}
              poster={service.image}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
                filter: "saturate(1.02) contrast(1.04)",
              }}
            />
          </div>
        </div>
      </motion.div>

      <div
        style={{
          position: "relative",
          gridColumn: illoLeft ? "2 / 3" : "1 / 2",
          gridRow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        className="svc-text-col"
      >
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          style={{
            position: "absolute",
            top: "-0.35em",
            left: illoLeft ? "-0.06em" : "auto",
            right: illoLeft ? "auto" : "-0.06em",
            fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
            fontWeight: 700,
            fontSize: "clamp(7rem, 16vw, 13rem)",
            lineHeight: 0.8,
            color: "rgba(116,47,20,0.07)",
            letterSpacing: "-0.02em",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
          className="svc-watermark"
        >
          {service.num}
        </motion.span>

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#742F14",
              marginBottom: "0.9rem",
            }}
          >
            {service.num} - Expertise
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            style={{
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)",
              lineHeight: 1.04,
              color: "#5C3C2C",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            <FallingText text={service.title} className="svc-title-fall" />
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.26, ease }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              lineHeight: 1.55,
              color: "#1c1c1c",
              maxWidth: "40ch",
              marginTop: "1.1rem",
              marginBottom: 0,
            }}
          >
            {service.description}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.34, ease }}
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem 0.8rem",
              padding: 0,
              margin: "1.6rem 0 0",
            }}
          >
            {service.points.map((p) => (
              <li
                key={p}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.74rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#742F14",
                  border: "1px solid rgba(116,47,20,0.25)",
                  borderRadius: "999px",
                  padding: "0.45rem 0.95rem",
                  background: "rgba(116,47,20,0.04)",
                  whiteSpace: "nowrap",
                }}
              >
                {p}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.42, ease }}
            style={{ marginTop: "2rem" }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="svc-explore"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5C3C2C",
                textDecoration: "none",
                transition: "gap 0.3s ease, color 0.3s ease",
              }}
            >
              Explore
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        .svc-title-fall { display: inline-flex; flex-wrap: wrap; gap: 0.14em 0.18em; }
        .svc-title-fall span { will-change: transform, opacity, filter; }
        .svc-explore:hover { gap: 1rem !important; color: #742F14 !important; }
      `}</style>

      <section
        id="services"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          color: "#211b18",
          paddingTop: "clamp(5.5rem, 12vw, 11rem)",
          paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
        }}
      >
        <div
          ref={ref}
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
              marginBottom: "clamp(1.6rem, 3vw, 2.6rem)",
            }}
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#742F14",
                }}
              >
                <span style={{ width: "26px", height: "1px", background: "#742F14", opacity: 0.7, flexShrink: 0 }} />
                What we do
              </motion.span>

              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
                  fontWeight: 800,
                  fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                  color: "#5C3C2C",
                  marginTop: "0.8rem",
                  letterSpacing: 0,
                  lineHeight: 1,
                }}
              >
                <VariableProximity
                  label="Our Expertise"
                  containerRef={ref as MutableRefObject<HTMLElement | null>}
                  radius={110}
                  falloff="gaussian"
                  fromFontVariationSettings="'wght' 500, 'opsz' 16"
                  toFontVariationSettings="'wght' 900, 'opsz' 42"
                  style={{
                    fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
                    textTransform: "uppercase",
                    color: "#1a1a1a",
                    fontSize: "clamp(2.2rem, 5vw, 4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                />
              </motion.h2>
            </div>

            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#1c1c1c",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#742F14")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1c1c1c")}
            >
              All services
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "clamp(3rem, 6vw, 5rem)",
  }}
>
  <motion.p
    initial={{ opacity: 0, y: 12 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: 0.7,
      delay: 0.22,
      ease: [0.16, 1, 0.3, 1],
    }}
    style={{
      maxWidth: "48ch",
      color: "#1c1c1c",
      fontSize: "clamp(1.05rem, 1.6vw, 1.4rem)",
      lineHeight: 1.5,
      fontFamily: "var(--font-body)",
      textAlign: "center",
      margin: 0,
    }}
  >
    FID &amp; Co. is a 360 degree communications partner, bringing strategic
    counsel, cultural fluency and cut-through creativity to deliver ideas
    that move audiences, shape perception and earn lasting credibility
    across Africa.
  </motion.p>
</div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(5rem, 9vw, 8rem)",
            }}
            className="svc-rows"
          >
            <div
              aria-hidden
              className="svc-spine"
              style={{
                position: "absolute",
                top: "2%",
                bottom: "2%",
                left: "50%",
                width: "1px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(116,47,20,0.22) 12%, rgba(116,47,20,0.22) 88%, transparent 100%)",
                zIndex: 0,
              }}
            />

            {services.map((service, i) => (
              <ServiceRow key={service.slug} service={service} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: "center",
              fontFamily: '"Nohemi", var(--font-heading, "Oswald")',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
              color: "rgba(92,60,44,0.78)",
              letterSpacing: "0.01em",
              marginTop: "clamp(5rem, 9vw, 8rem)",
              marginBottom: 0,
            }}
          >
            Insight. Strategy. Impact.
          </motion.p>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .svc-spine { display: none; }
            .svc-row { grid-template-columns: 1fr !important; }
            .svc-illo-col {
              grid-column: 1 / 2 !important;
              grid-row: 1 !important;
              margin-bottom: 1.8rem;
            }
            .svc-text-col {
              grid-column: 1 / 2 !important;
              grid-row: 2 !important;
            }
            .svc-illo-col .svc-illo-inner { max-width: 420px; margin: 0 auto; }
          }
        `}</style>
      </section>
    </>
  );
}
