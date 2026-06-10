"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Service } from "@/lib/services";
import Footer from "@/components/Footer";

interface Props {
  service: Service;
}

// Full-bleed project card — Clase bcn style
function ProjectCard({
  bg,
  label,
  textColor = "#000000",
  index,
}: {
  bg: string;
  label: string;
  textColor?: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        minHeight: "clamp(280px, 35vw, 500px)",
        backgroundColor: bg,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "20px",
        // No border-radius — Clase bcn 0px everywhere
        borderRadius: 0,
        overflow: "hidden",
        marginBottom: "100px",
      }}
    >
      {/* Subtle grain texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
      }} />

      {/* Top-left content block — Clase bcn standard */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "'Noto Sans', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "28px",
          lineHeight: 1.21,
          color: textColor,
          marginBottom: "0.75rem",
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "'Noto Sans', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "24px",
          lineHeight: 1.17,
          color: textColor === "#ffffff" ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
        }}>
          FID &amp; Co. · Communications
        </p>
      </div>

      {/* Corner arrow link */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        fontFamily: "'Noto Sans', system-ui, sans-serif",
        fontWeight: 400,
        fontSize: "24px",
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
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>

      {/* ── Top navigation — Clase bcn style ── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#000000",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            FID &amp; Co.
          </Link>
          <span style={{ color: "#939393", fontSize: "24px" }}>·</span>
          <Link
            href="/services"
            style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#939393",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#939393")}
          >
            Services
          </Link>
        </div>
        <Link
          href="/#contact"
          style={{
            fontFamily: "'Noto Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            color: "#939393",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
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
        borderBottom: "1px solid #000000",
        maxWidth: "1440px",
        margin: "0 auto",
      }}>
        {/* Service number tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Noto Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            color: "#939393",
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
            fontFamily: "'Noto Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 5vw, 45px)",
            lineHeight: 1.11,
            color: "#000000",
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
            fontFamily: "'Noto Sans', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: 1.79,
            color: "#0a0a0a",
            maxWidth: "55ch",
          }}
        >
          {service.summary}
        </motion.p>
      </div>

      {/* ── Full-bleed project cards — Clase bcn stack ── */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", paddingTop: "100px" }}>
        {service.cards.map((card, i) => (
          <div key={i} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <ProjectCard
              bg={card.bg}
              label={card.label}
              textColor={card.textColor}
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
          paddingBottom: "100px",
          borderTop: "1px solid #000000",
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
            <p style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 1.8vw, 24px)",
              lineHeight: 1.79,
              color: "#0a0a0a",
            }}>
              {service.body}
            </p>
          </motion.div>

          {/* Right: capabilities list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#939393",
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
                    fontFamily: "'Noto Sans', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.9rem, 1.4vw, 20px)",
                    lineHeight: 1.5,
                    color: "#000000",
                    padding: "1rem 0",
                    borderBottom: "1px solid #000000",
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
            borderTop: "1px solid #000000",
            paddingTop: "20px",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/services"
            style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            ← All services
          </Link>
          <Link
            href="/#contact"
            style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#000000",
              textDecoration: "none",
            }}
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
  );
}
