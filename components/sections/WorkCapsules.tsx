"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, type Project } from "@/components/lib/projects";
import { getWorkSectorMeta, getWorkSectorSlugFromProject } from "@/components/lib/work-sectors";
import { projectGalleryImages } from "@/lib/work-gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

const HOME_WORK_SLUGS = [
  "africa-urban-forum-2026",
  "lc-waikiki-africa",
  "kansai-plascon",
  "thrive-hospitality-group",
  "columbia-africa-healthcare",
  "allso-beauty",
] as const;

function toSrc(src: string) {
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/${src.replace(/^public\//, "")}`;
}

function getProjectAlbum(project: Project, limit = 3) {
  const sectorMeta = getWorkSectorMeta(getWorkSectorSlugFromProject(project));
  const gallery = projectGalleryImages[project.slug] ?? [];
  const album = gallery.map((image) => toSrc(image.src));
  if (sectorMeta?.cover) album.push(toSrc(sectorMeta.cover));
  if (project.logo) album.push(toSrc(project.logo));

  return Array.from(new Set(album)).slice(0, limit);
}

function AlbumFrame({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`work-album-frame ${className}`} style={{ position: "relative", overflow: "hidden", borderRadius: "18px", background: "#e7ddcd", boxShadow: "0 16px 40px rgba(38,0,0,0.08)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.02) 0%, rgba(38,0,0,0) 45%, rgba(38,0,0,0.18) 100%)", pointerEvents: "none" }} />
    </div>
  );
}

function WorkCapsule({ project, index }: { project: Project; index: number }) {
  const sectorSlug = getWorkSectorSlugFromProject(project);
  const sector = getWorkSectorMeta(sectorSlug);
  const album = getProjectAlbum(project, 3);
  const scopeLead = project.scope.slice(0, 2).join(" · ");
  const caseHref = `/work/${project.slug}`;
  const sectorHref = `/work/${sectorSlug}`;

  return (
    <motion.article
      className="work-capsule"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
    >
      <div className="work-capsule-inner">
        <div className="work-capsule-copy">
          <p className="work-capsule-meta">
            <span>{project.years}</span>
            <span>{sector?.title ?? project.sector}</span>
          </p>

          <Link href={caseHref} className="work-capsule-titlelink">
            {project.logo ? (
              <span className="work-capsule-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.logo} alt={`${project.client} logo`} loading="lazy" />
              </span>
            ) : null}
            <h3 className="work-capsule-title">
              {project.client}
            </h3>
            <p className="work-capsule-kicker">{project.title}</p>
          </Link>

          <p className="work-capsule-desc">
            {project.desc}
          </p>

          {scopeLead ? (
            <p className="work-capsule-scope">
              {scopeLead}
            </p>
          ) : null}

          <div className="work-capsule-links">
            <Link href={caseHref} className="work-capsule-link work-capsule-link--solid">
              Open case study
              <ArrowUpRight size={14} weight="bold" />
            </Link>
            <Link href={sectorHref} className="work-capsule-link">
              Open sector
            </Link>
          </div>
        </div>

        <Link href={caseHref} className="work-capsule-album" aria-label={`${project.client} case study`}>
          <div className="work-capsule-album-grid">
            <AlbumFrame src={album[0] ?? ""} alt={project.title} className="work-album-hero" eager={index < 2} />
            <AlbumFrame src={album[1] ?? album[0] ?? ""} alt={`${project.title} image 2`} className="work-album-top" />
            <AlbumFrame src={album[2] ?? album[1] ?? album[0] ?? ""} alt={`${project.title} image 3`} className="work-album-bottom" />
          </div>
        </Link>
      </div>
    </motion.article>
  );
}

export default function WorkCapsules({ limit = HOME_WORK_SLUGS.length }: { limit?: number }) {
  const shown = HOME_WORK_SLUGS
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project))
    .slice(0, limit);

  return (
    <section id="work" className="bg-brand-texture section-light" aria-label="Selected work" style={{ position: "relative", overflow: "hidden", paddingTop: "clamp(5.5rem,12vw,10rem)", paddingBottom: "clamp(5.5rem,12vw,10rem)" }}>
      <div aria-hidden className="brand-pattern-light" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />
      <div className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.35rem", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006" }}
            >
              <span style={{ width: "26px", height: "1px", background: "#750006", opacity: 0.6 }} />
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.4rem,6vw,5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "1rem 0 0", maxWidth: "14ch", textTransform: "uppercase" }}
            >
              Selected projects, in capsules.
            </motion.h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.75, color: "rgba(28,28,28,0.68)", maxWidth: "56ch", margin: "1.2rem auto 0" }}>
              A quicker, cleaner way to scan the work from home: each capsule pairs the story, the gallery and the route into the full case study.
            </p>
          </div>
          <Link
            href="/work"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(28,28,28,0.56)", textDecoration: "none", fontWeight: 700 }}
          >
            All work →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.35rem)" }}>
          {shown.map((project, index) => (
            <WorkCapsule key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .work-capsule {
          border: 1px solid rgba(117, 0, 6, 0.11);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.52);
          box-shadow: 0 18px 50px rgba(38, 0, 0, 0.06);
          overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .work-capsule-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
          gap: clamp(1rem, 2vw, 1.5rem);
          padding: clamp(1.1rem, 2.4vw, 1.8rem);
          align-items: stretch;
        }
        .work-capsule-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }
        .work-capsule-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1rem;
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(28, 28, 28, 0.54);
        }
        .work-capsule-meta span + span::before {
          content: "•";
          margin-right: 0.6rem;
          color: rgba(117, 0, 6, 0.45);
        }
        .work-capsule-titlelink {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.95rem;
          text-decoration: none;
          color: inherit;
          max-width: 34rem;
        }
        .work-capsule-logo {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          width: fit-content;
          padding: 0.45rem 0.7rem;
          border-radius: 999px;
          background: rgba(245, 242, 236, 0.86);
          border: 1px solid rgba(117, 0, 6, 0.08);
        }
        .work-capsule-logo img {
          height: 26px;
          max-width: 110px;
          object-fit: contain;
          display: block;
        }
        .work-capsule-title {
          margin: 0;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(1.9rem, 4.1vw, 3.4rem);
          line-height: 0.96;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .work-capsule-kicker {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #750006;
        }
        .work-capsule-desc {
          margin: 1rem 0 0;
          max-width: 54ch;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.72;
          color: rgba(28, 28, 28, 0.72);
        }
        .work-capsule-scope {
          margin: 0.9rem 0 0;
          max-width: 54ch;
          font-family: var(--font-body);
          font-size: 0.84rem;
          line-height: 1.6;
          color: rgba(28, 28, 28, 0.58);
        }
        .work-capsule-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.2rem;
        }
        .work-capsule-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(117, 0, 6, 0.16);
          background: rgba(255, 255, 255, 0.56);
          color: #1c1c1c;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: transform 0.35s var(--ease-out), background 0.35s var(--ease-out), border-color 0.35s var(--ease-out);
        }
        .work-capsule-link--solid {
          background: #750006;
          color: #f5f2ec;
          border-color: #750006;
        }
        .work-capsule-album {
          display: block;
          min-height: 100%;
          text-decoration: none;
        }
        .work-capsule-album-grid {
          height: 100%;
          min-height: 320px;
          display: grid;
          grid-template-columns: 1.4fr 0.86fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.72rem;
        }
        .work-album-hero {
          grid-row: 1 / span 2;
        }
        .work-album-top,
        .work-album-bottom {
          min-height: 0;
        }
        .work-capsule:hover .work-capsule-link {
          transform: translateY(-1px);
        }
        .work-capsule:hover .work-capsule-link--solid {
          background: #5d0005;
          border-color: #5d0005;
        }
        .work-capsule:hover .work-capsule-album img {
          transform: scale(1.02);
          transition: transform 0.55s var(--ease-out);
        }
        .work-capsule-album img {
          transition: transform 0.55s var(--ease-out);
        }
        @media (max-width: 900px) {
          .work-capsule-inner {
            grid-template-columns: 1fr;
          }
          .work-capsule-album-grid {
            min-height: 280px;
          }
        }
        @media (max-width: 580px) {
          .work-capsule {
            border-radius: 22px;
          }
          .work-capsule-inner {
            padding: 1rem;
          }
          .work-capsule-title {
            font-size: clamp(1.65rem, 10vw, 2.5rem);
          }
          .work-capsule-desc {
            font-size: 0.95rem;
          }
          .work-capsule-album-grid {
            grid-template-columns: 1fr 1fr;
            min-height: 240px;
          }
          .work-album-hero {
            grid-row: 1;
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </section>
  );
}
