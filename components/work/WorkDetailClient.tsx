"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { Project } from "@/components/lib/projects";
import { getProjectGallery } from "@/lib/work-gallery";
import { ArrowCircleRight, TrendUp } from "@phosphor-icons/react";

interface Props {
  project: Project;
}

function GalleryImage({ src, label, index, style }: {
  src: string; label: string; index: number; style?: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "14px",
        background: "#e8e0d8",
        ...style,
      }}
    >
      {!loaded && !error && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #e8e0d8 0%, #d9cfc5 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(28,28,28,0.3)", textTransform: "uppercase" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={label}
          loading={index < 2 ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
      {error && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #f0e8e0 0%, #e0d5c8 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(28,28,28,0.35)", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>
      )}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 50%, rgba(38,0,0,0.55) 100%)",
        pointerEvents: "none",
      }} />
      <span style={{
        position: "absolute", bottom: "0.9rem", left: "1rem",
        fontFamily: "var(--font-body)", fontSize: "0.58rem",
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(245,242,236,0.82)",
      }}>
        {label}
      </span>
      <span style={{
        position: "absolute", bottom: "0.9rem", right: "1rem",
        fontFamily: "var(--font-heading)", fontSize: "0.72rem",
        color: "rgba(245,242,236,0.45)", fontWeight: 700,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function PropertyCard({ name, desc, index }: { name: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: "14px",
        background: "#f5f2ec",
        border: "1px solid rgba(117,0,6,0.1)",
        padding: "clamp(1.4rem, 2.5vw, 2rem)",
      }}
    >
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "0.62rem",
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "#d98038", marginBottom: "0.6rem", fontWeight: 700,
      }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h4 style={{
        fontFamily: "var(--font-heading)", fontWeight: 700,
        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "#1c1c1c",
        marginBottom: "0.8rem", lineHeight: 1.1,
      }}>
        {name}
      </h4>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "0.9rem",
        lineHeight: 1.65, color: "rgba(28,28,28,0.68)",
      }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function WorkDetailClient({ project }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryImages = getProjectGallery(project);
  const inView = useInView(bodyRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0vh", "-8vh"]);
  const leftY   = useTransform(scrollYProgress, [0, 1], ["0vh", "-18vh"]);
  const rightY  = useTransform(scrollYProgress, [0, 1], ["0vh", "-12vh"]);
  const lowerY  = useTransform(scrollYProgress, [0, 1], ["0vh", "-10vh"]);

  return (
    <main style={{ backgroundColor: "#f5f2ec", color: "#1c1c1c", minHeight: "100vh" }}>

      {/* ── Sticky back bar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem clamp(1.5rem,5vw,4rem)",
        backgroundColor: "rgba(245,242,236,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(117,0,6,0.1)",
      }}>
        <Link href="/#work" style={{
          fontFamily: "var(--font-body)", fontSize: "0.75rem",
          letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#750006", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontWeight: 600,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "#260000")}
          onMouseLeave={e => (e.currentTarget.style.color = "#750006")}
        >
          ← All work
        </Link>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: "0.68rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(28,28,28,0.4)",
        }}>
          FID &amp; Co. — {project.sector}
        </span>
      </div>

      {/* ── Hero ── */}
      <div style={{
        paddingTop: "clamp(5.5rem,12vh,8rem)",
        paddingLeft: "clamp(1.5rem,5vw,5rem)",
        paddingRight: "clamp(1.5rem,5vw,5rem)",
        paddingBottom: "clamp(3rem,6vw,5rem)",
        borderBottom: "1px solid rgba(117,0,6,0.12)",
        maxWidth: "1440px", margin: "0 auto",
      }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", gap: "0.75rem", marginBottom: "clamp(1.5rem,4vw,3rem)", flexWrap: "wrap" }}>
          {[project.sector, project.years].map((tag, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-body)", fontSize: "0.66rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: i === 0 ? "#d98038" : "rgba(28,28,28,0.4)",
              padding: i === 0 ? "0.35em 0.9em" : "0",
              background: i === 0 ? "rgba(217,128,56,0.12)" : "transparent",
              borderRadius: "999px", fontWeight: i === 0 ? 700 : 400,
            }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            fontSize: "clamp(2.4rem,6vw,5.8rem)", lineHeight: 0.96,
            letterSpacing: "-0.02em", color: "#1c1c1c", maxWidth: "18ch",
          }}
        >
          {project.client}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 400,
            fontSize: "clamp(1.15rem,2vw,1.75rem)", lineHeight: 1.35,
            color: "rgba(28,28,28,0.52)", marginTop: "1rem", maxWidth: "52ch",
            fontStyle: "italic",
          }}
        >
          {project.title}
        </motion.p>
      </div>

      {/* ── Gallery ── */}
      <div ref={galleryRef} style={{
        maxWidth: "1440px", margin: "0 auto",
        paddingLeft: "clamp(1.5rem,5vw,5rem)",
        paddingRight: "clamp(1.5rem,5vw,5rem)",
        paddingTop: "clamp(2rem,4vw,3.5rem)",
      }}>
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.12 }}
          style={{ y: heroY, marginBottom: "clamp(0.75rem,1.5vw,1.25rem)" }}
        >
          <GalleryImage
            src={galleryImages[0].src} label={galleryImages[0].label} index={0}
            style={{ height: "clamp(300px,42vw,560px)" }}
          />
        </motion.div>

        {/* Two-column */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(0.75rem,1.5vw,1.25rem)",
          marginBottom: "clamp(0.75rem,1.5vw,1.25rem)",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ y: leftY, marginTop: "clamp(1.5rem,4vw,3.5rem)" }}
          >
            <GalleryImage src={galleryImages[1].src} label={galleryImages[1].label} index={1} style={{ height: "clamp(260px,34vw,480px)" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            style={{ y: rightY }}
          >
            <GalleryImage src={galleryImages[2].src} label={galleryImages[2].label} index={2} style={{ height: "clamp(200px,26vw,360px)" }} />
          </motion.div>
        </div>

        {/* Three-column */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "clamp(0.75rem,1.5vw,1.25rem)",
        }} className="gallery-three-col">
          {galleryImages.slice(3, 6).map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.07 }}
              style={{ y: lowerY, marginTop: i === 1 ? "clamp(1rem,2.5vw,2rem)" : 0 }}
            >
              <GalleryImage src={img.src} label={img.label} index={i + 3} style={{ height: "clamp(150px,20vw,280px)" }} />
            </motion.div>
          ))}
        </div>

        {/* Extended gallery — images 6+ */}
        {galleryImages.length > 6 && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "clamp(0.75rem,1.5vw,1.25rem)",
            marginTop: "clamp(0.75rem,1.5vw,1.25rem)",
          }} className="gallery-two-col">
            {galleryImages.slice(6).map((img, i) => (
              <GalleryImage
                key={img.src} src={img.src} label={img.label} index={i + 6}
                style={{ height: "clamp(200px,28vw,380px)" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Body: overview + scope ── */}
      <div ref={bodyRef} style={{
        maxWidth: "1440px", margin: "0 auto",
        paddingLeft: "clamp(1.5rem,5vw,5rem)",
        paddingRight: "clamp(1.5rem,5vw,5rem)",
        paddingTop: "clamp(5rem,10vw,8rem)",
        paddingBottom: "clamp(5rem,10vw,8rem)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem,8vw,8rem)",
          borderTop: "1px solid rgba(117,0,6,0.12)",
          paddingTop: "clamp(2.5rem,5vw,4rem)",
        }} className="work-body-grid">

          {/* Left: description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "1.2rem", fontWeight: 700 }}>
              Overview
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.3rem,2.2vw,1.9rem)", lineHeight: 1.3, color: "#1c1c1c" }}>
              {project.desc}
            </p>
            {project.body && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,1.1vw,1rem)", lineHeight: 1.7, color: "rgba(28,28,28,0.68)", marginTop: "1.5rem" }}>
                {project.body}
              </p>
            )}
          </motion.div>

          {/* Right: scope + impact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "1.2rem", fontWeight: 700 }}>
              Scope of work
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem" }}>
              {project.scope.map((item, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6,
                    color: "#1c1c1c", padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(117,0,6,0.1)",
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  }}
                >
                  <ArrowCircleRight size={18} weight="light" color="#d98038" style={{ flexShrink: 0, marginTop: "2px" }} />
                  {item}
                </motion.li>
              ))}
            </ul>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendUp size={16} weight="light" color="#d98038" /> Impact
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(1.05rem,1.7vw,1.4rem)", lineHeight: 1.35, color: "#750006" }}>
              {project.impact}
            </p>
          </motion.div>
        </div>

        {/* ── Sub-properties (Thrive etc.) ── */}
        {project.properties && project.properties.length > 0 && (
          <div style={{ marginTop: "clamp(4rem,8vw,7rem)" }}>
            <div style={{ borderTop: "1px solid rgba(117,0,6,0.12)", paddingTop: "clamp(2rem,4vw,3.5rem)", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.6rem", fontWeight: 700 }}>
                Properties
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.8rem)", color: "#1c1c1c", lineHeight: 1 }}>
                Across the portfolio
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
              {project.properties.map((prop, i) => (
                <PropertyCard key={prop.name} name={prop.name} desc={prop.desc} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Footer nav ── */}
        <div style={{
          marginTop: "clamp(4rem,8vw,7rem)",
          borderTop: "1px solid rgba(117,0,6,0.12)",
          paddingTop: "2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <Link href="/#work" style={{
            fontFamily: "var(--font-body)", fontSize: "0.8rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#750006", textDecoration: "none",
            borderBottom: "1px solid #750006", paddingBottom: "0.15rem", fontWeight: 600,
          }}>
            ← All projects
          </Link>
          <Link href="/#contact" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "#750006", color: "#f5f2ec",
            fontFamily: "var(--font-body)", fontWeight: 700,
            fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "0.8rem 1.8rem", borderRadius: "999px", textDecoration: "none",
          }}>
            Work with us →
          </Link>
        </div>
      </div>

      {/* Side metadata strip */}
      <div aria-hidden style={{
        position: "fixed", right: "1.2rem", top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "center center",
        fontFamily: "var(--font-body)", fontSize: "0.52rem",
        letterSpacing: "0.22em", textTransform: "uppercase",
        color: "rgba(117,0,6,0.2)", pointerEvents: "none", zIndex: 50, whiteSpace: "nowrap",
      }}>
        {project.sector} · {project.years} · FID &amp; Co.
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gallery-three-col { grid-template-columns: 1fr !important; }
          .gallery-two-col   { grid-template-columns: 1fr !important; }
          .work-body-grid    { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .gallery-three-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
