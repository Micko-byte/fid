"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "@phosphor-icons/react";
import type { ProjectMedia } from "@/components/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

function isHttpUrl(src?: string) {
  return Boolean(src && /^https?:\/\//i.test(src));
}

function MediaPreview({ item }: { item: ProjectMedia }) {
  const playableSrc = item.kind === "video" ? item.playableSrc : undefined;
  const playableEmbed = playableSrc && isHttpUrl(playableSrc);
  const isDocument = item.kind === "document";

  if (playableSrc) {
    if (playableEmbed) {
      return (
        <iframe
          src={playableSrc}
          title={item.title}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          style={{ width: "100%", height: "100%", border: 0, background: "#0f0f0f" }}
        />
      );
    }

    return (
      <video
        src={playableSrc}
        poster={item.preview}
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }

  if (isDocument) {
    return (
      <iframe
        src={item.href}
        title={item.title}
        style={{ width: "100%", height: "100%", border: 0, background: "#fff" }}
      />
    );
  }

  if (item.preview) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.preview} alt={item.title} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }

  return <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #eadfcc, #f7f3eb)" }} />;
}

function MediaRow({
  item,
  active,
  onActivate,
}: {
  item: ProjectMedia;
  active: boolean;
  onActivate: () => void;
}) {
  const kindLabel = item.kind === "video" ? "Watch" : item.kind === "document" ? "PDF" : "Source";

  return (
    <motion.button
      type="button"
      onClick={onActivate}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="pm-row"
      style={{
        width: "100%",
        border: "none",
        background: active ? "rgba(217,128,56,0.06)" : "transparent",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.95rem 0",
          borderBottom: "1px solid rgba(38,0,0,0.1)",
        }}
      >
        <span
          style={{
            flexShrink: 0,
            width: "110px",
            fontFamily: "var(--font-body)",
            fontSize: "0.64rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: active ? "#750006" : "rgba(28,28,28,0.48)",
            fontWeight: 700,
          }}
        >
          {item.source}
        </span>

        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.88rem,1.1vw,0.98rem)",
            lineHeight: 1.55,
            color: "#1c1c1c",
            fontWeight: active ? 700 : 500,
          }}
        >
          {item.title}
        </span>

        <span
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.58rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: active ? "#750006" : "rgba(28,28,28,0.35)",
            fontWeight: 800,
          }}
        >
          {kindLabel}
          <ArrowUpRight size={14} weight="bold" />
        </span>
      </div>
    </motion.button>
  );
}

export default function ProjectMediaShelf({
  items,
  title = "In the press",
  intro = "Live links, press coverage and playable launch assets.",
}: {
  items: ProjectMedia[];
  title?: string;
  intro?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [activeIndex, items]);

  if (!items.length || !activeItem) return null;

  const activeKind = activeItem.kind === "video" ? "watch now" : activeItem.kind === "document" ? "open pdf" : "live source";

  return (
    <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem) 0" }}>
      <div
        style={{
          borderTop: "1px solid rgba(117,0,6,0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.64rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#d98038",
              fontWeight: 800,
              margin: 0,
            }}
          >
            Live media
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem,2.8vw,2.4rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "#1c1c1c",
              margin: "0.55rem 0 0",
            }}
          >
            {title}
          </h2>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(28,28,28,0.64)", maxWidth: "42ch", margin: 0 }}>
          {intro}
        </p>
      </div>

      <div
        className="pm-shell"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
          gap: "clamp(1rem, 2vw, 2rem)",
          alignItems: "start",
          marginTop: "1.5rem",
        }}
      >
        <div>
          {items.map((item, index) => (
            <MediaRow key={`${item.source}-${item.title}`} item={item} active={index === activeIndex} onActivate={() => setActiveIndex(index)} />
          ))}
        </div>

        <div
          style={{
            position: "sticky",
            top: "7rem",
            borderRadius: "22px",
            overflow: "hidden",
            background: "#f5f2ec",
            border: "1px solid rgba(117,0,6,0.12)",
            boxShadow: "0 28px 76px rgba(38,0,0,0.12)",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "16 / 11", background: "#e9dfd2" }}>
            <MediaPreview item={activeItem} />
            <div
              style={{
                position: "absolute",
                left: "0.9rem",
                top: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f5f2ec",
                background: "rgba(38,0,0,0.65)",
                padding: "0.4rem 0.7rem",
                borderRadius: "999px",
                backdropFilter: "blur(6px)",
              }}
            >
              {activeItem.source}
            </div>
            {activeItem.kind === "video" && (
              <div
                style={{
                  position: "absolute",
                  right: "0.9rem",
                  top: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#f5f2ec",
                  background: "rgba(117,0,6,0.85)",
                  padding: "0.4rem 0.7rem",
                  borderRadius: "999px",
                }}
              >
                <PlayCircle size={16} weight="fill" />
                Playable
              </div>
            )}
          </div>

          <div style={{ padding: "1.1rem 1.1rem 1.2rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#d98038",
                fontWeight: 800,
                margin: 0,
              }}
            >
              {activeKind}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.2rem,2vw,1.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "0.55rem 0 0",
                color: "#1c1c1c",
              }}
            >
              {activeItem.title}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(28,28,28,0.66)", margin: "0.85rem 0 0" }}>
              {activeItem.description || "Hover a row to preview it. Open the source to read, watch or share the original coverage."}
            </p>
            <a
              href={activeItem.href}
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
                marginTop: "1.1rem",
              }}
            >
              Open live source <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .pm-row:hover span:nth-child(2) { color: #750006 !important; }
        .pm-row:hover {
          background: rgba(217,128,56,0.05) !important;
        }
        @media (max-width: 980px) {
          .pm-shell { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .pm-row > div {
            flex-wrap: wrap;
            align-items: flex-start;
          }
          .pm-row span:first-child {
            width: 100% !important;
          }
          .pm-row span:last-child {
            margin-left: auto;
          }
        }
      `}</style>
    </section>
  );
}
