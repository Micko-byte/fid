"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
}

// Placeholder image grid layout — NotReal editorial gallery style
// Asymmetric two-column grid with sharp-edged rectangles on vellum canvas
const IMAGE_PLACEHOLDERS = [
  { aspect: "4/3", colSpan: 2, height: "clamp(300px, 40vw, 520px)" },
  { aspect: "3/4", colSpan: 1, height: "clamp(280px, 34vw, 480px)" },
  { aspect: "16/9", colSpan: 1, height: "clamp(200px, 22vw, 320px)" },
  { aspect: "1/1", colSpan: 1, height: "clamp(220px, 26vw, 360px)" },
  { aspect: "3/2", colSpan: 1, height: "clamp(220px, 26vw, 360px)" },
];

function ImagePlaceholder({ index, height, colSpan, offset = false }: {
  index: number; height: string; colSpan: number; offset?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `span ${colSpan}`,
        height,
        backgroundColor: index % 3 === 0 ? "#e8e8e8" : index % 3 === 1 ? "#d4d4d4" : "#c8c8c8",
        position: "relative",
        overflow: "hidden",
        marginTop: offset ? "clamp(2rem, 5vw, 5rem)" : 0,
        flexShrink: 0,
      }}
    >
      {/* Grain texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        opacity: 0.6,
        pointerEvents: "none",
      }} />
      {/* Index label — editorial metadata */}
      <span style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        fontFamily: "'Noto Sans', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(41,42,44,0.3)",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function WorkDetailClient({ project }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bodyRef, { once: true, margin: "-80px" });
  const [hovering, setHovering] = useState(false);

  return (
    <main style={{ backgroundColor: "#f2f2f2", color: "#292a2c", minHeight: "100vh" }}>

      {/* ── Top nav strip ── */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
        backgroundColor: "rgba(242,242,242,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <Link
          href="/#work"
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#292a2c",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#292a2c")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
        >
          ← All work
        </Link>
        <span style={{
          fontFamily: "'Noto Sans', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(41,42,44,0.35)",
        }}>
          FID &amp; Co.
        </span>
      </div>

      {/* ── Hero block ── */}
      <div style={{
        paddingTop: "clamp(6rem, 14vh, 10rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        borderBottom: "1px solid #292a2c",
        maxWidth: "1440px",
        margin: "0 auto",
      }}>
        {/* Metadata tags */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            flexWrap: "wrap",
          }}
        >
          {[project.sector, project.years].map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(41,42,44,0.45)",
              }}
            >
              {tag}{i < 1 ? " /" : ""}
            </span>
          ))}
        </motion.div>

        {/* Title — ogg/serif display treatment using Oswald as substitute */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.036em",
            color: "#292a2c",
            maxWidth: "18ch",
          }}
        >
          {project.client}
          <em style={{ fontStyle: "italic", color: "rgba(41,42,44,0.45)" }}> — {project.title}</em>
        </motion.h1>
      </div>

      {/* ── Editorial image gallery ── */}
      <div style={{
        maxWidth: "1440px",
        margin: "0 auto",
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingTop: "clamp(3rem, 5vw, 5rem)",
      }}>
        {/* First: full-width hero image placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            width: "100%",
            height: "clamp(300px, 42vw, 580px)",
            backgroundColor: "#d6d6d6",
            position: "relative",
            overflow: "hidden",
            marginBottom: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, rgba(${project.color === "#750006" ? "117,0,6" : project.color === "#D98038" ? "217,128,56" : "217,171,136"},0.12) 0%, transparent 60%)`,
          }} />
          <span style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            fontFamily: "'Noto Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(41,42,44,0.3)",
          }}>Campaign imagery / 01</span>
        </motion.div>

        {/* Two-column asymmetric grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(0.75rem, 1.5vw, 1.5rem)",
          marginBottom: "clamp(1rem, 2vw, 1.5rem)",
        }}>
          {/* Left — taller, offset down */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              height: "clamp(280px, 36vw, 500px)",
              backgroundColor: "#c8c8c8",
              position: "relative",
              overflow: "hidden",
              marginTop: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "'Noto Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(41,42,44,0.3)" }}>02</span>
          </motion.div>
          {/* Right — shorter */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{
              height: "clamp(200px, 28vw, 380px)",
              backgroundColor: "#e0e0e0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "'Noto Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(41,42,44,0.3)" }}>03</span>
          </motion.div>
        </div>

        {/* Three-column lower row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "clamp(0.75rem, 1.5vw, 1.5rem)",
        }}
          className="gallery-three-col"
        >
          {[{ bg: "#d4d4d4", num: "04" }, { bg: "#c0c0c0", num: "05" }, { bg: "#dadada", num: "06" }].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 + i * 0.07 }}
              style={{
                height: "clamp(160px, 22vw, 300px)",
                backgroundColor: item.bg,
                position: "relative",
                overflow: "hidden",
                marginTop: i === 1 ? "clamp(1rem, 3vw, 2.5rem)" : 0,
              }}
            >
              <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "'Noto Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(41,42,44,0.3)" }}>{item.num}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Vertical running text strip — right edge ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          right: "1.25rem",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center center",
          fontFamily: "'Noto Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(41,42,44,0.18)",
          pointerEvents: "none",
          zIndex: 50,
          whiteSpace: "nowrap",
        }}
      >
        {project.sector} · {project.years} · FID &amp; Co.
      </div>

      {/* ── Body: overview + scope ── */}
      <div
        ref={bodyRef}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingTop: "clamp(5rem, 10vw, 8rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
        }}
      >
        {/* Two-column layout: description left, metadata right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          borderTop: "1px solid #292a2c",
          paddingTop: "clamp(2.5rem, 5vw, 4rem)",
        }}
          className="work-body-grid"
        >
          {/* Left: description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(41,42,44,0.4)",
              marginBottom: "1.5rem",
            }}>Overview</p>
            <p style={{
              fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#292a2c",
            }}>
              {project.desc}
            </p>
          </motion.div>

          {/* Right: scope + impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(41,42,44,0.4)",
              marginBottom: "1.5rem",
            }}>Scope of work</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "3rem" }}>
              {project.scope.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                  style={{
                    fontFamily: "'Noto Sans', sans-serif",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "#292a2c",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(41,42,44,0.12)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ color: "rgba(41,42,44,0.3)", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                  {item}
                </motion.li>
              ))}
            </ul>

            {/* Impact */}
            <p style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(41,42,44,0.4)",
              marginBottom: "1rem",
            }}>Impact</p>
            <p style={{
              fontFamily: "var(--font-heading, 'Oswald', 'Arial Narrow', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              color: "#292a2c",
            }}>
              {project.impact}
            </p>
          </motion.div>
        </div>

        {/* Footer nav */}
        <div style={{
          marginTop: "clamp(4rem, 8vw, 7rem)",
          borderTop: "1px solid rgba(41,42,44,0.12)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <Link
            href="/#work"
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#292a2c",
              textDecoration: "none",
              borderBottom: "1px solid #292a2c",
              paddingBottom: "0.15rem",
            }}
          >
            ← All projects
          </Link>
          <Link
            href="/#contact"
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#292a2c",
              textDecoration: "none",
              borderBottom: "1px solid #292a2c",
              paddingBottom: "0.15rem",
            }}
          >
            Work with us →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gallery-three-col { grid-template-columns: 1fr !important; }
          .work-body-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .gallery-three-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
