"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/components/lib/projects";
import { getProjectGallery } from "@/lib/work-gallery";
import { ArrowCircleRight, TrendUp } from "@phosphor-icons/react";

interface Props { project: Project }

/* ── Animated corner-bracket border ── */
function CornerBrackets({ color = "#d98038", size = 22, thickness = 2 }: { color?: string; size?: number; thickness?: number }) {
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } };
  const corners = [
    { cx: 0, cy: 0,    d: `M${size} 0 L0 0 L0 ${size}` },
    { cx: 1, cy: 0,    d: `M0 0 L${size} 0 L${size} ${size}`, transform: "scaleX(-1)", origin: "right" },
    { cx: 0, cy: 1,    d: `M0 0 L0 ${size} L${size} ${size}`, transform: "scaleY(-1)", origin: "bottom left" },
    { cx: 1, cy: 1,    d: `M0 0 L${size} 0 L${size} ${size}`, transform: "scale(-1)", origin: "bottom right" },
  ];
  const positions: React.CSSProperties[] = [
    { top: 0, left: 0 },
    { top: 0, right: 0 },
    { bottom: 0, left: 0 },
    { bottom: 0, right: 0 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}
          style={{ position: "absolute", ...positions[i], zIndex: 3, overflow: "visible" }}>
          <motion.path
            d={c.d} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="square"
            variants={draw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      ))}
    </>
  );
}

/* ── Single gallery image ── */
function Img({ src, label, index, style }: { src: string; label: string; index: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-6% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", overflow: "hidden", borderRadius: "14px", background: "#e0d8d0", ...style }}
    >
      <img
        src={src} alt={label}
        loading={index < 2 ? "eager" : "lazy"}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
      />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 55%,rgba(38,0,0,0.5) 100%)", pointerEvents: "none" }} />
      <span style={{ position: "absolute", bottom: "0.85rem", left: "1rem", fontFamily: "var(--font-body)", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.72)" }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ── Scope list item with animated left-border ── */
function ScopeItem({ text, index }: { text: string; index: number }) {
  const ref  = useRef<HTMLLIElement>(null);
  const inV  = useInView(ref, { once: true, margin: "-4% 0px" });
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", padding: "0.85rem 0", listStyle: "none",
               borderBottom: "1px solid rgba(117,0,6,0.1)", position: "relative" }}
    >
      {/* Growing left-border accent */}
      <motion.span
        initial={{ scaleY: 0 }}
        animate={inV ? { scaleY: 1 } : {}}
        transition={{ duration: 0.45, delay: index * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "#d98038", borderRadius: "2px", transformOrigin: "top", transform: "scaleY(0)" }}
      />
      <ArrowCircleRight size={18} weight="light" color="#d98038" style={{ flexShrink: 0, marginTop: "2px" }} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "#1c1c1c", fontWeight: 500 }}>
        {text}
      </span>
    </motion.li>
  );
}

/* ── Property sub-card ── */
function PropertyCard({ name, desc, index }: { name: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderRadius: "14px", background: "#f5f2ec", border: "1px solid rgba(117,0,6,0.1)", padding: "clamp(1.4rem,2.5vw,2rem)", position: "relative" }}
    >
      <CornerBrackets color="#d9ab88" size={16} thickness={1.5} />
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.6rem", fontWeight: 700 }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem,1.8vw,1.5rem)", color: "#1c1c1c", marginBottom: "0.8rem", lineHeight: 1.1 }}>
        {name}
      </h4>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.65, color: "#1c1c1c", fontWeight: 500 }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function WorkDetailClient({ project }: Props) {
  const galleryImages = getProjectGallery(project);
  const hasImages = galleryImages.length > 0;

  return (
    <main className="bg-brand-texture" style={{ color: "#1c1c1c", minHeight: "100vh" }}>

      {/* ── Sticky back bar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem clamp(1.5rem,5vw,4rem)", backgroundColor: "rgba(245,242,236,0.94)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(117,0,6,0.1)" }}>
        <Link href="/#work" style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#260000")}
          onMouseLeave={e => (e.currentTarget.style.color = "#750006")}
        >
          ← All work
        </Link>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,28,28,0.4)" }}>
          FID &amp; Co. — {project.sector}
        </span>
      </div>

      {/* ── HERO: title left + first image right ── */}
      <div style={{ paddingTop: "clamp(5.5rem,12vh,8rem)", maxWidth: "1440px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
        <div className="wd-hero-grid" style={{ display: "grid", gridTemplateColumns: hasImages ? "1fr 1fr" : "1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "center", paddingBottom: "clamp(3rem,6vw,5rem)", borderBottom: "1px solid rgba(117,0,6,0.1)" }}>

          {/* Left: meta + title + desc */}
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: "flex", gap: "0.75rem", marginBottom: "clamp(1.5rem,3vw,2.5rem)", flexWrap: "wrap" }}>
              {[project.sector, project.years].map((tag, i) => (
                <span key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: i === 0 ? "#d98038" : "rgba(28,28,28,0.4)", padding: i === 0 ? "0.35em 0.9em" : "0", background: i === 0 ? "rgba(217,128,56,0.12)" : "transparent", borderRadius: "999px", fontWeight: i === 0 ? 700 : 400 }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2.2rem,5.5vw,5rem)", lineHeight: 0.95, letterSpacing: "-0.025em", color: "#1c1c1c", marginBottom: "1.2rem" }}
            >
              {project.client}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.3vw,1.1rem)", lineHeight: 1.65, color: "#1c1c1c", fontWeight: 500, maxWidth: "44ch" }}
            >
              {project.desc}
            </motion.p>

            {/* Animated amber underline on title */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", height: "3px", width: "60px", background: "#d98038", borderRadius: "2px", marginTop: "1.8rem" }}
            />
          </div>

          {/* Right: hero image */}
          {hasImages && (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative" }}>
              <Img src={galleryImages[0].src} label={galleryImages[0].label} index={0} style={{ height: "clamp(300px,40vw,520px)", borderRadius: "14px" }} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── BODY: overview text + image 2 (if available) ── */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)", paddingTop: "clamp(4rem,8vw,7rem)" }}>
        <div className="wd-body-grid" style={{ display: "grid", gridTemplateColumns: hasImages && galleryImages.length > 1 ? "1fr 1fr" : "1fr", gap: "clamp(3rem,7vw,8rem)", alignItems: "start" }}>

          {/* Overview text block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "1.2rem", fontWeight: 700 }}>
              Overview
            </p>
            {project.body && (
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.15rem,1.9vw,1.65rem)", lineHeight: 1.38, color: "#1c1c1c", marginBottom: "1.5rem" }}>
                {project.body}
              </p>
            )}
            {!project.body && (
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.15rem,1.9vw,1.65rem)", lineHeight: 1.38, color: "#1c1c1c", marginBottom: "1.5rem" }}>
                {project.desc}
              </p>
            )}
          </motion.div>

          {/* Image 2 (offset higher than text) */}
          {hasImages && galleryImages.length > 1 && (
            <div style={{ marginTop: "clamp(2rem,4vw,4rem)" }}>
              <Img src={galleryImages[1].src} label={galleryImages[1].label} index={1} style={{ height: "clamp(260px,34vw,460px)" }} />
            </div>
          )}
        </div>
      </div>

      {/* ── FULL-WIDTH image 3 ── */}
      {hasImages && galleryImages.length > 2 && (
        <div style={{ maxWidth: "1440px", margin: "clamp(3rem,6vw,5rem) auto 0", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
          <Img src={galleryImages[2].src} label={galleryImages[2].label} index={2} style={{ height: "clamp(280px,38vw,520px)" }} />
        </div>
      )}

      {/* ── SCOPE LIST + images 3-4 stacked ── */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)", paddingTop: "clamp(4rem,8vw,7rem)" }}>
        <div className="wd-scope-grid" style={{ display: "grid", gridTemplateColumns: hasImages && galleryImages.length > 3 ? "1.1fr 0.9fr" : "1fr", gap: "clamp(3rem,7vw,8rem)", alignItems: "start" }}>

          {/* Scope list */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "1.2rem", fontWeight: 700 }}
            >
              Scope of work
            </motion.p>
            <ul style={{ padding: 0, margin: "0 0 0 0.6rem" }}>
              {project.scope.map((item, i) => (
                <ScopeItem key={i} text={item} index={i} />
              ))}
            </ul>
          </div>

          {/* Images 4-5 stacked */}
          {hasImages && galleryImages.length > 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2.4rem" }}>
              {galleryImages.slice(3, 5).map((img, i) => (
                <Img key={img.src} src={img.src} label={img.label} index={i + 3} style={{ height: "clamp(180px,22vw,300px)" }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── IMPACT statement ── */}
      <div style={{ maxWidth: "1440px", margin: "clamp(4rem,9vw,8rem) auto 0", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", padding: "clamp(2rem,4vw,3.5rem)", borderRadius: "18px", border: "1px solid rgba(217,128,56,0.25)", background: "rgba(217,128,56,0.06)" }}
        >
          <CornerBrackets color="#d98038" size={24} thickness={2} />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <TrendUp size={16} weight="light" color="#d98038" /> Impact
          </p>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.4rem,2.6vw,2.4rem)", lineHeight: 1.25, color: "#750006", maxWidth: "52ch", margin: 0 }}>
            {project.impact}
          </p>
        </motion.div>
      </div>

      {/* ── Extended gallery: images 6+ in editorial grid ── */}
      {galleryImages.length > 5 && (
        <div style={{ maxWidth: "1440px", margin: "clamp(3rem,6vw,5rem) auto 0", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
          <div className="wd-gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(0.75rem,1.5vw,1.25rem)" }}>
            {galleryImages.slice(5).map((img, i) => (
              <Img key={img.src} src={img.src} label={img.label} index={i + 5}
                style={{ height: "clamp(160px,20vw,280px)", marginTop: i % 3 === 1 ? "clamp(1rem,2.5vw,2rem)" : 0 }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Sub-properties ── */}
      {project.properties && project.properties.length > 0 && (
        <div style={{ maxWidth: "1440px", margin: "clamp(4rem,8vw,7rem) auto 0", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)" }}>
          <div style={{ borderTop: "1px solid rgba(117,0,6,0.12)", paddingTop: "clamp(2rem,4vw,3.5rem)", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.6rem", fontWeight: 700 }}>
              Properties
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.8rem)", color: "#1c1c1c", lineHeight: 1 }}>
              Across the portfolio
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {project.properties.map((prop, i) => (
              <PropertyCard key={prop.name} name={prop.name} desc={prop.desc} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Footer nav ── */}
      <div style={{ maxWidth: "1440px", margin: "clamp(4rem,8vw,7rem) auto clamp(4rem,8vw,7rem)", paddingLeft: "clamp(1.5rem,5vw,5rem)", paddingRight: "clamp(1.5rem,5vw,5rem)", borderTop: "1px solid rgba(117,0,6,0.12)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/#work" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", borderBottom: "1px solid #750006", paddingBottom: "0.15rem", fontWeight: 600 }}>
          ← All projects
        </Link>
        <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#750006", color: "#f5f2ec", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.8rem 1.8rem", borderRadius: "999px", textDecoration: "none" }}>
          Work with us →
        </Link>
      </div>

      {/* Side metadata strip */}
      <div aria-hidden style={{ position: "fixed", right: "1.2rem", top: "50%", transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center", fontFamily: "var(--font-body)", fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(117,0,6,0.2)", pointerEvents: "none", zIndex: 50, whiteSpace: "nowrap" }}>
        {project.sector} · {project.years} · FID &amp; Co.
      </div>

      <style>{`
        @media (max-width: 767px) {
          .wd-hero-grid  { grid-template-columns: 1fr !important; }
          .wd-body-grid  { grid-template-columns: 1fr !important; }
          .wd-scope-grid { grid-template-columns: 1fr !important; }
          .wd-gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .wd-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
