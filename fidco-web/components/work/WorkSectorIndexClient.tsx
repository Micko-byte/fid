"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Footer from "@/components/Footer";
import HoverIcon from "@/components/ui/HoverIcon";
import { WORK_SECTORS, getWorkSectorCount } from "@/components/lib/work-sectors";
import AfricanFootprint from "@/components/sections/AfricanFootprint";

const EASE = [0.16, 1, 0.3, 1] as const;

function SectorCard({ slug, title, intro, cover, accent, Icon, count, index }: {
  slug: string;
  title: string;
  intro: string;
  cover: string;
  accent: string;
  count: number;
  Icon: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={`/work/${slug}`}
        className="group block overflow-hidden"
        style={{
          borderRadius: "22px",
          textDecoration: "none",
          position: "relative",
          minHeight: "clamp(280px, 30vw, 410px)",
          border: "1px solid rgba(38,0,0,0.08)",
          background: "#fff",
          boxShadow: "0 18px 50px rgba(38,0,0,0.08)",
          isolation: "isolate",
        }}
      >
        <img
          src={cover}
          alt={title}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.95) contrast(1.04)",
            transform: "scale(1.01)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(38,0,0,0.08) 0%, rgba(38,0,0,0.14) 38%, ${accent}dd 100%)` }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 16%, rgba(255,255,255,0.26), transparent 28%), radial-gradient(circle at 80% 10%, rgba(217,128,56,0.18), transparent 24%)", mixBlendMode: "screen", opacity: 0.78 }} />

        <div style={{ position: "absolute", inset: 0, padding: "clamp(1.2rem, 2.6vw, 2rem)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", color: "#f5f2ec" }}>
              <HoverIcon icon={Icon} size={26} weight="bold" hoverWeight="fill" color="#f5f2ec" drawOnScroll />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, opacity: 0.9 }}>
                {count} {count === 1 ? "project" : "projects"}
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f5f2ec", opacity: 0.72 }}>
              Explore
            </span>
          </div>

          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "#f5f2ec", margin: 0, maxWidth: "11ch" }}>
              {title}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(245,242,236,0.82)", margin: "0.9rem 0 0", maxWidth: "38ch" }}>
              {intro}
            </p>
          </div>
        </div>

        <style>{`
          .group:hover img {
            transform: scale(1.08);
            transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
          }
          .group:hover {
            transform: translateY(-6px);
            box-shadow: 0 28px 70px rgba(38,0,0,0.16);
            transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease;
          }
        `}</style>
      </Link>
    </motion.div>
  );
}

export default function WorkSectorIndexClient() {
  const introRef = useRef<HTMLDivElement>(null);
  const inView = useInView(introRef, { once: true, margin: "-80px" });

  return (
    <main style={{ background: "#f5f2ec", color: "#1c1c1c", minHeight: "100vh", overflow: "hidden" }}>
      <section style={{ position: "relative", padding: "clamp(5rem, 10vw, 8rem) 0 clamp(4rem, 8vw, 6rem)", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 20%, rgba(217,128,56,0.12), transparent 24%), radial-gradient(circle at 82% 26%, rgba(117,0,6,0.12), transparent 26%), radial-gradient(circle at 50% 80%, rgba(67,212,145,0.08), transparent 28%)" }} />
        <div className="section-shell" style={{ position: "relative", zIndex: 1 }}>
          <motion.p
            ref={introRef}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#750006", margin: "0 0 1rem" }}
          >
            Selected work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.8rem, 7vw, 6.2rem)", lineHeight: 0.94, letterSpacing: "-0.04em", color: "#1c1c1c", maxWidth: "12ch", margin: 0 }}
          >
            Work, organised by sector.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.7, color: "rgba(28,28,28,0.68)", maxWidth: "52ch", margin: "1.2rem 0 0" }}
          >
            Click a sector to open the page that contains the work for that sector. Individual work pages have been removed so the story now lives at sector level.
          </motion.p>
        </div>

        <div className="section-shell" style={{ position: "relative", zIndex: 1, marginTop: "clamp(2rem, 5vw, 3.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "clamp(1rem, 2vw, 1.4rem)" }} className="sector-grid">
            {WORK_SECTORS.map((sector, index) => (
              <SectorCard
                key={sector.slug}
                slug={sector.slug}
                title={sector.title}
                intro={sector.intro}
                cover={sector.cover}
                accent={sector.accent}
                Icon={sector.Icon}
                count={getWorkSectorCount(sector.slug)}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="section-shell" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <AfricanFootprint />
        </div>
      </section>

      <Footer />

      <style>{`
        .sector-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        @media (max-width: 980px) {
          .sector-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .sector-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
