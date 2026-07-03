"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Service } from "@/components/lib/services";
import Footer from "@/components/Footer";
import IconField from "@/components/motion/IconField";
import { STOCK } from "@/lib/stock-photos";

interface Props {
  service: Service;
}

// Full-bleed project card — Clase bcn style
function ProjectCard({
  bg,
  label,
  textColor = "#000000",
  image,
  imageAlt,
  index,
}: {
  bg: string;
  label: string;
  textColor?: string;
  image?: string;
  imageAlt?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        minHeight: "clamp(260px, 35vw, 500px)",
        backgroundColor: bg,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "clamp(1.2rem, 3vw, 2.4rem)",
        borderRadius: 0,
        overflow: "hidden",
        marginBottom: "clamp(3rem, 6vw, 6rem)",
      }}
    >
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt || label}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(160deg, rgba(38,0,0,0.68) 0%, rgba(38,0,0,0.22) 40%, ${bg} 100%)`,
              mixBlendMode: "multiply",
            }}
          />
        </>
      )}

      {/* Subtle grain texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
      }} />

      {/* Top-left content block — Clase bcn standard */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
          lineHeight: 1.21,
          color: textColor,
          marginBottom: "0.75rem",
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
          lineHeight: 1.17,
          color: textColor === "#ffffff" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
        }}>
          FID &amp; Co. · Communications
        </p>
      </div>

      {/* Corner arrow link */}
      <div style={{
        position: "absolute",
        bottom: "clamp(1.2rem, 3vw, 2.4rem)",
        right: "clamp(1.2rem, 3vw, 2.4rem)",
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
        color: textColor,
      }}>
        →
      </div>
    </motion.div>
  );
}

export default function ServiceDetailClient({ service }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bodyRef, { once: true, margin: "-60px" });

  return (
    <div className="bg-brand-texture" style={{ minHeight: "100vh", position: "relative" }}>
      <IconField tone="light" photo={STOCK.pressConf?.[1]?.src} />
      <div style={{ position: "relative", zIndex: 1 }}>

      {/* ── Top navigation — Clase bcn style ── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        backgroundColor: "rgba(245,242,236,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(117,0,6,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#1c1c1c",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            FID &amp; Co.
          </Link>
          <span style={{ color: "#750006", fontSize: "clamp(1rem, 2vw, 1.25rem)", opacity: 0.5 }}>·</span>
          <Link
            href="/services"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#939393",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#939393")}
          >
            Services
          </Link>
        </div>
        <Link
          href="/#contact"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#939393",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#939393")}
        >
          Contact
        </Link>
      </nav>

      {/* ── Statement headline — Clase bcn opening ── */}
      <div style={{
        paddingTop: "clamp(7rem, 16vh, 11rem)",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        borderBottom: "1px solid rgba(117,0,6,0.15)",
        maxWidth: "1440px",
        margin: "0 auto",
      }}>
        {/* Service number tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
            color: "#d98038",
            marginBottom: "clamp(1rem, 3vw, 2rem)",
          }}
        >
          {service.num} / Services
        </motion.p>

        {/* Main statement — 45px Clase bcn heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            lineHeight: 1.11,
            color: "#260000",
            maxWidth: "18ch",
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          {service.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
            lineHeight: 1.79,
            color: "#1c1c1c",
            maxWidth: "55ch",
          }}
        >
          {service.summary}
        </motion.p>
      </div>

      {/* ── Full-bleed project cards — Clase bcn stack ── */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", paddingTop: "clamp(3rem, 7vw, 6rem)" }}>
        {service.cards.map((card, i) => (
          <div key={i} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <ProjectCard
              bg={card.bg}
              label={card.label}
              textColor={card.textColor}
              image={card.image}
              imageAlt={card.imageAlt}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* ── Capabilities section ── */}
      <div
        ref={bodyRef}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 20px",
          paddingBottom: "clamp(3rem, 7vw, 6rem)",
          borderTop: "1px solid rgba(117,0,6,0.15)",
        }}
      >
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          paddingTop: "clamp(3rem, 5vw, 5rem)",
        }}
          className="service-body-grid"
        >
          {/* Left: body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
              <div className="space-y-5">
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
                  lineHeight: 1.79,
                  color: "#1c1c1c",
                }}>
                  {service.body}
                </p>
                {service.detailParagraphs.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "clamp(0.92rem, 1.35vw, 1.08rem)",
                    lineHeight: 1.79,
                    color: "rgba(28,28,28,0.7)",
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

          {/* Right: capabilities list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              color: "#d98038",
              marginBottom: "1.5rem",
            }}>
              What&apos;s included
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {service.capabilities.map((cap, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                    lineHeight: 1.5,
                    color: "#1c1c1c",
                    padding: "1rem 0",
                    borderBottom: "1px solid rgba(117,0,6,0.15)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {cap}
                  <span style={{ color: "#aaaaaa", flexShrink: 0, marginLeft: "1rem" }}>→</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom CTA — text link with arrow (no button) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: "clamp(4rem, 8vw, 7rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(117,0,6,0.15)",
            paddingTop: "20px",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/services"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#750006",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d98038")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#750006")}
          >
            ← All services
          </Link>
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "#750006",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d98038")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#750006")}
          >
            Start a conversation →
          </Link>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .service-body-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>
    </div>
  );
}
