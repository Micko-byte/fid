"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import CornerBrackets from "@/components/ui/CornerBrackets";

function WorkCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      className="wcard"
      style={{
        flexShrink: 0,
        width: "clamp(290px, 40vw, 440px)",
        scrollSnapAlign: "start",
        display: "block",
        textDecoration: "none",
      }}
    >
      {/* Media placeholder */}
      <div
        className="wcard-media"
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          height: "clamp(300px, 34vw, 440px)",
          overflow: "hidden",
          marginBottom: "1.4rem",
          backgroundColor: "#260000",
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(217,171,136,0.07) 0 2px, transparent 2px 11px)",
          cursor: "pointer",
        }}
      >
        {/* Spotlight glow that follows cursor */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            pointerEvents: "none",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217,171,136,0.22) 0%, transparent 65%)`,
          }}
        />

        {/* Animated corner frame — brightens on hover */}
        <div
          style={{
            position: "absolute",
            inset: "0.7rem",
            border: `1px solid ${hover ? "rgba(217,171,136,0.65)" : "rgba(217,171,136,0.22)"}`,
            boxShadow: hover
              ? "0 0 20px rgba(217,171,136,0.18), inset 0 0 20px rgba(217,171,136,0.06)"
              : "none",
            pointerEvents: "none",
            zIndex: 2,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        />

        {/* Corner accent dots */}
        {hover && (
          <>
            {[
              { top: "0.7rem", left: "0.7rem" },
              { top: "0.7rem", right: "0.7rem" },
              { bottom: "0.7rem", left: "0.7rem" },
              { bottom: "0.7rem", right: "0.7rem" },
            ].map((pos, ci) => (
              <div
                key={ci}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "5px",
                  height: "5px",
                  background: "#D9AB88",
                  zIndex: 3,
                  opacity: 0.8,
                  ...pos,
                }}
              />
            ))}
          </>
        )}

        <span
          style={{
            position: "absolute",
            left: "1rem",
            bottom: "0.9rem",
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: "0.64rem",
            letterSpacing: "0.05em",
            color: "rgba(217,171,136,0.7)",
            textTransform: "uppercase",
            zIndex: 3,
          }}
        >
          {project.sector.toLowerCase()}
        </span>

        {/* Corner brackets on the dark card */}
        <CornerBrackets color="rgba(255,255,255,0.28)" size={20} weight={1.2} inset={11} />

        {/* Number overlay */}
        <div
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.4rem",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(4rem, 8vw, 6rem)",
            lineHeight: 0.85,
            color: hover ? "rgba(117,0,6,0.35)" : "rgba(117,0,6,0.2)",
            zIndex: 1,
            transition: "color 0.4s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Card info */}
      <p
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#D98038",
          marginBottom: "0.6rem",
          fontFamily: "var(--font-body)",
        }}
      >
        {project.sector}
      </p>
      <h3
        className="wcard-title"
        style={{
          fontFamily: "var(--font-heading, 'Oswald')",
          fontWeight: 600,
          textTransform: "uppercase",
          color: "#260000",
          fontSize: "clamp(1.2rem, 1.9vw, 1.6rem)",
          lineHeight: 1.1,
          transition: "color 0.3s",
        }}
      >
        {project.client}
      </h3>
      <p
        style={{
          color: "rgba(33,27,24,0.6)",
          fontSize: "0.92rem",
          lineHeight: 1.5,
          marginTop: "0.7rem",
          maxWidth: "38ch",
          fontFamily: "var(--font-body)",
        }}
      >
        {project.title}
      </p>
      <div
        className="wcard-foot"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginTop: "1rem",
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(33,27,24,0.45)",
          transition: "color 0.3s",
          fontFamily: "var(--font-body)",
        }}
      >
        View case study
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          style={{ transition: "transform 0.3s" }}
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </div>

      <style>{`
        .wcard:hover .wcard-title { color: #750006 !important; }
        .wcard:hover .wcard-foot { color: #750006 !important; }
        .wcard:hover .wcard-foot svg { transform: translate(2px,-2px); }
      `}</style>
    </Link>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  const scroll = useCallback((dir: -1 | 1) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".wcard") as HTMLElement;
    const amt = card ? card.offsetWidth + 24 : 400;
    trackRef.current.scrollBy({ left: dir * amt, behavior: "smooth" });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scroll: trackRef.current.scrollLeft };
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    trackRef.current.scrollLeft =
      dragStart.current.scroll - (e.pageX - dragStart.current.x);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  return (
    <section
      id="work"
      style={{
        backgroundColor: "#FAF8F3",
        paddingTop: "clamp(5.5rem, 12vw, 11rem)",
        paddingBottom: "clamp(5.5rem, 12vw, 11rem)",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            marginBottom: "1.4rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#D98038",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "1px",
                  background: "#D98038",
                  opacity: 0.7,
                }}
              />
              Selected work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              style={{
                fontFamily: "var(--font-heading, 'Oswald')",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "#260000",
                marginTop: "0.8rem",
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              Our Work
            </motion.h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.74rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(33,27,24,0.6)",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(33,27,24,0.6)")
              }
            >
              All case studies
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Prev / Next buttons */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  aria-label={dir === -1 ? "Previous" : "Next"}
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid rgba(38,0,0,0.13)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#260000",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "background 0.3s, color 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "#750006";
                    el.style.color = "#F5F2EC";
                    el.style.borderColor = "#750006";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "transparent";
                    el.style.color = "#260000";
                    el.style.borderColor = "rgba(38,0,0,0.13)";
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {dir === -1 ? (
                      <path d="M15 18l-6-6 6-6" />
                    ) : (
                      <path d="M9 6l6 6-6 6" />
                    )}
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — full width, no padding so cards bleed */}
      <div
        style={{
          position: "relative",
          marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.6rem)",
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            paddingBottom: "0.5rem",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            cursor: "grab",
          } as React.CSSProperties}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.05 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ flexShrink: 0 }}
            >
              <WorkCard project={p} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
