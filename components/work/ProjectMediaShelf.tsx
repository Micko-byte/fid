"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, PlayCircle, X } from "@phosphor-icons/react";
import type { ProjectMedia } from "@/components/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function MediaCard({
  item,
  onOpen,
}: {
  item: ProjectMedia;
  onOpen: () => void;
}) {
  const playable = item.kind === "video" && Boolean(item.playableSrc);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="pm-card"
      style={{
        border: "1px solid rgba(117,0,6,0.1)",
        borderRadius: "18px",
        background: "#fbfaf8",
        overflow: "hidden",
        textAlign: "left",
        cursor: "pointer",
        padding: 0,
        boxShadow: "0 20px 54px rgba(38,0,0,0.08)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden", background: "#e9dfd2" }}>
        {item.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.preview}
            alt={item.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)", filter: "saturate(0.95)" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #eadfcc, #f7f3eb)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(38,0,0,0.02) 0%, rgba(38,0,0,0.12) 48%, rgba(38,0,0,0.7) 100%)" }} />
        <div
          style={{
            position: "absolute",
            left: "0.85rem",
            top: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.58rem",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f5f2ec",
            background: "rgba(38,0,0,0.62)",
            padding: "0.44rem 0.7rem",
            borderRadius: "999px",
            backdropFilter: "blur(6px)",
          }}
        >
          {item.source}
        </div>
        <div
          style={{
            position: "absolute",
            right: "0.85rem",
            top: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            borderRadius: "999px",
            color: "#f5f2ec",
            background: playable ? "#750006" : "rgba(38,0,0,0.56)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
          }}
        >
          {playable ? <PlayCircle size={18} weight="fill" /> : <ArrowUpRight size={16} weight="bold" />}
        </div>
        {item.kind === "video" && (
          <div
            style={{
              position: "absolute",
              left: "0.85rem",
              bottom: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#f5f2ec",
              background: "rgba(38,0,0,0.72)",
              padding: "0.4rem 0.7rem",
              borderRadius: "999px",
            }}
          >
            Playable media
          </div>
        )}
      </div>

      <div style={{ padding: "1rem 1rem 1.1rem" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#d98038", fontWeight: 800, margin: "0 0 0.45rem" }}>
          {item.kind === "video" ? "Watch now" : "Live source"}
        </p>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1rem,1.4vw,1.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1c1c1c", margin: 0, fontWeight: 700 }}>
          {item.title}
        </h3>
        {item.description ? (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(28,28,28,0.62)", margin: "0.65rem 0 0" }}>
            {item.description}
          </p>
        ) : null}
      </div>
    </motion.button>
  );
}

export default function ProjectMediaShelf({
  items,
  title = "In the media",
  intro = "Live links, press coverage and playable launch assets.",
}: {
  items: ProjectMedia[];
  title?: string;
  intro?: string;
}) {
  const [active, setActive] = useState<ProjectMedia | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!items.length) return null;

  const activeVideo = active?.kind === "video" ? active.playableSrc : undefined;

  return (
    <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem) 0" }}>
      <div style={{ borderTop: "1px solid rgba(117,0,6,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.64rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 800, margin: 0 }}>
            Live media
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,2.8vw,2.4rem)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#1c1c1c", margin: "0.55rem 0 0" }}>
            {title}
          </h2>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(28,28,28,0.64)", maxWidth: "38ch", margin: 0 }}>
          {intro}
        </p>
      </div>

      <div className="pm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)", marginTop: "1.4rem" }}>
        {items.map((item) => (
          <MediaCard key={`${item.source}-${item.title}`} item={item} onOpen={() => setActive(item)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(18,8,4,0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1rem,4vw,2.5rem)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "min(980px, 100%)",
                maxHeight: "92vh",
                overflow: "auto",
                borderRadius: "24px",
                background: "#f5f2ec",
                boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
                border: "1px solid rgba(117,0,6,0.14)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem 1.1rem", borderBottom: "1px solid rgba(117,0,6,0.1)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#d98038", fontWeight: 800, margin: 0 }}>
                    {active.source}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem,2vw,1.8rem)", lineHeight: 1.1, margin: "0.5rem 0 0", color: "#1c1c1c" }}>
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close media"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "999px",
                    border: "1px solid rgba(117,0,6,0.16)",
                    background: "#fff",
                    color: "#750006",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div style={{ padding: "1.1rem" }}>
                <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", background: "#e9dfd2", aspectRatio: "16 / 9" }}>
                  {activeVideo ? (
                    <video
                      src={activeVideo}
                      poster={active.preview}
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="metadata"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : active.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={active.preview}
                      alt={active.title}
                      referrerPolicy="no-referrer"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #eadfcc, #f7f3eb)" }} />
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(28,28,28,0.72)", margin: 0, maxWidth: "58ch" }}>
                    {active.description || "Open the live source and keep the media playback in the modal."}
                  </p>
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: "#f5f2ec",
                      background: "#750006",
                      padding: "0.85rem 1.2rem",
                      borderRadius: "999px",
                      fontWeight: 800,
                    }}
                  >
                    Open live source <ArrowUpRight size={14} weight="bold" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pm-card:hover img { transform: scale(1.05); }
        .pm-card:hover { transform: translateY(-4px); box-shadow: 0 30px 70px rgba(38,0,0,0.14); }
        @media (max-width: 980px) {
          .pm-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .pm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
