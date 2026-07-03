"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react";
import Footer from "@/components/Footer";
import HoverIcon from "@/components/ui/HoverIcon";
import { getPlatformsForWorkSector, getProjectsForWorkSector, getWorkSectorMeta, type WorkSectorSlug } from "@/components/lib/work-sectors";
import { projectGalleryImages } from "@/lib/work-gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

function toSrc(src: string) {
  return src.startsWith("/") ? src : `/${src.replace(/^public\//, "")}`;
}

function projectImages(slug: string) {
  return projectGalleryImages[slug] ?? [];
}

function ItemCard({
  title,
  eyebrow,
  description,
  image,
  imageAlt,
  bullets,
  accent = "#750006",
  index,
}: {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
  imageAlt?: string;
  bullets: string[];
  accent?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(38,0,0,0.08)",
        boxShadow: "0 18px 50px rgba(38,0,0,0.08)",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr" }} className="sector-item-grid">
        <div style={{ position: "relative", minHeight: "clamp(250px, 36vw, 420px)", background: accent }}>
          {image ? (
            <img
              src={image}
              alt={imageAlt || title}
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(38,0,0,0.08) 0%, rgba(38,0,0,0.18) 34%, ${accent}dd 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.24), transparent 30%), radial-gradient(circle at 78% 10%, rgba(217,128,56,0.16), transparent 24%)", mixBlendMode: "screen", opacity: 0.9 }} />
          <div style={{ position: "absolute", inset: 0, padding: "1.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", fontWeight: 700 }}>
                {eyebrow}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", opacity: 0.7 }}>
                Sector work
              </span>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.94, letterSpacing: "-0.03em", color: "#f5f2ec", margin: 0, maxWidth: "10ch" }}>
                {title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(245,242,236,0.86)", margin: "0.8rem 0 0", maxWidth: "35ch" }}>
                {description}
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: "clamp(1.2rem,2.5vw,2rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#d98038", marginBottom: "0.8rem", fontWeight: 700 }}>
              Overview
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.98rem", lineHeight: 1.7, color: "rgba(28,28,28,0.84)", margin: 0 }}>
              {description}
            </p>
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#750006", marginBottom: "0.8rem", fontWeight: 700 }}>
              Key details
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.7rem" }}>
              {bullets.slice(0, 4).map((bullet, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.55, color: "rgba(28,28,28,0.76)", display: "flex", gap: "0.65rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: accent, marginTop: "0.45rem", flexShrink: 0 }} />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PlatformCard({
  name,
  tagline,
  shortDesc,
  intro,
  highlights,
  partnerships,
  image,
  accent,
  index,
}: {
  name: string;
  tagline: string;
  shortDesc: string;
  intro: string;
  highlights: string[];
  partnerships: string[];
  image: string;
  accent: string;
  index: number;
}) {
  return (
    <ItemCard
      index={index}
      title={name}
      eyebrow={tagline}
      description={shortDesc}
      image={image}
      imageAlt={name}
      accent={accent}
      bullets={[intro, ...highlights, ...partnerships].slice(0, 4)}
    />
  );
}

export default function WorkSectorPageClient({ sector }: { sector: WorkSectorSlug }) {
  const meta = getWorkSectorMeta(sector);
  const projects = getProjectsForWorkSector(sector);
  const platforms = getPlatformsForWorkSector(sector);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  if (!meta) return null;

  const firstProjectImages = projects[0] ? projectImages(projects[0].slug) : [];
  const heroImage = meta.cover || firstProjectImages[0]?.src || "";
  const count = sector === "owned-ips" ? platforms.length : projects.length;

  return (
    <main style={{ minHeight: "100vh", background: "#f5f2ec", color: "#1c1c1c" }}>
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(1rem,2.5vw,1.5rem) 0 0" }}>
        <div className="section-shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", position: "relative", zIndex: 1 }}>
          <Link href="/work" style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.45rem", fontWeight: 700 }}>
            <ArrowLeft size={14} weight="bold" />
            Back to sectors
          </Link>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(28,28,28,0.45)" }}>
            FID &amp; Co. · Work
          </span>
        </div>

        <div className="section-shell" style={{ position: "relative", zIndex: 1, marginTop: "clamp(2rem,5vw,3rem)" }}>
          <div ref={heroRef} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(1.5rem, 4vw, 3rem)", alignItems: "center" }} className="sector-hero-grid">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55 }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.28em", textTransform: "uppercase", color: meta.accent, margin: "0 0 1rem", fontWeight: 700 }}
              >
                {count} {count === 1 ? "item" : "items"}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#1c1c1c", margin: 0, maxWidth: "11ch" }}
              >
                {meta.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "rgba(28,28,28,0.68)", maxWidth: "50ch", margin: "1.2rem 0 0" }}
              >
                {meta.intro}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                style={{ transformOrigin: "left", height: "3px", width: "72px", background: meta.accent, borderRadius: "999px", marginTop: "1.8rem" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative", minHeight: "clamp(280px, 38vw, 520px)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 70px rgba(38,0,0,0.15)" }}>
                <img src={heroImage} alt={meta.title} loading="eager" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(38,0,0,0.18) 0%, rgba(38,0,0,0.34) 44%, ${meta.accent}cc 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.24), transparent 28%), radial-gradient(circle at 80% 20%, rgba(217,128,56,0.14), transparent 24%)", mixBlendMode: "screen", opacity: 0.9 }} />
                <div style={{ position: "absolute", left: "1.2rem", bottom: "1.2rem", right: "1.2rem", color: "#f5f2ec" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.65rem" }}>
                    <HoverIcon icon={meta.Icon} size={26} weight="bold" hoverWeight="fill" color="#f5f2ec" drawOnScroll />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
                      Sector overview
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0, maxWidth: "12ch" }}>
                    {meta.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell" style={{ paddingTop: "clamp(2rem, 6vw, 4rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
        <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 1.4rem)" }}>
          {projects.map((project, index) => {
            const images = projectImages(project.slug);
            return (
              <ItemCard
                key={project.slug}
                index={index}
                title={project.client}
                eyebrow={project.title}
                description={project.body || project.desc}
                image={images[0] ? toSrc(images[0].src) : undefined}
                imageAlt={images[0]?.label || project.client}
                accent={meta.accent}
                bullets={[...project.scope, project.impact]}
              />
            );
          })}

          {platforms.length ? (
            <div style={{ marginTop: "clamp(1rem, 2vw, 1.4rem)", paddingTop: "clamp(1rem, 2vw, 1.5rem)", borderTop: "1px solid rgba(117,0,6,0.12)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#750006", fontWeight: 700, margin: "0 0 1rem" }}>
                Owned platforms
              </p>
              <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 1.4rem)" }}>
                {platforms.map((platform, index) => (
                  <PlatformCard
                    key={platform.slug}
                    index={projects.length + index}
                    name={platform.name}
                    tagline={platform.tagline}
                    shortDesc={platform.shortDesc}
                    intro={platform.intro}
                    highlights={platform.highlights}
                    partnerships={platform.partnerships}
                    image={platform.image}
                    accent={platform.accent}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-shell" style={{ paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid rgba(117,0,6,0.12)", paddingTop: "1.4rem" }}>
          <Link href="/work" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
            <ArrowLeft size={14} weight="bold" />
            Back to all sectors
          </Link>
          <Link href="/#contact" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#750006", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 700 }}>
            Work with us
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .sector-hero-grid,
          .sector-item-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
