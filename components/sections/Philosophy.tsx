"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const PILLARS = [
  {
    word: "INSIGHT",
    num: "01",
    desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making.",
    // Warm parchment editorial plate
    bg: "#f0ece5",
    strip: "#e6dfd5",
    tagline: "Research & Intelligence",
    lines: ["Audience Analysis", "Cultural Mapping", "Media Landscape", "Stakeholder Research"],
  },
  {
    word: "STRATEGY",
    num: "02",
    desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market.",
    // Cool slate editorial plate
    bg: "#e8eced",
    strip: "#dce4e8",
    tagline: "Brand Planning",
    lines: ["Narrative Development", "Channel Architecture", "Campaign Blueprinting", "Market Positioning"],
  },
  {
    word: "IMPACT",
    num: "03",
    desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance.",
    // Deep oxblood wash
    bg: "#2a0a0a",
    strip: "#1d0202",
    tagline: "Cultural Relevance",
    lines: ["Earned Coverage", "Reputation Shift", "Audience Growth", "Legacy Building"],
    dark: true,
  },
];

// How many vh each pillar occupies in the scroll window
const SECTION_VH = 420; // total section vh

function getProgAndPillar(scrolled: number, totalH: number) {
  const prog = totalH > 0 ? Math.min(1, Math.max(0, scrolled / totalH)) : 0;
  const pillar = prog < 0.37 ? 0 : prog < 0.68 ? 1 : 2;
  return { prog, pillar };
}

// ── Editorial image placeholder — each pillar gets its own visual plate ──
function ImagePlate({ data, visible, index }: {
  data: typeof PILLARS[0];
  visible: boolean;
  index: number;
}) {
  const dark = data.dark ?? false;
  const textColor = dark ? "rgba(245,242,236,0.85)" : "rgba(38,0,0,0.6)";
  const dimColor  = dark ? "rgba(245,242,236,0.18)" : "rgba(38,0,0,0.12)";
  const lineColor = dark ? "rgba(245,242,236,0.08)" : "rgba(38,0,0,0.07)";

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: data.bg,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(1.018)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: visible ? "auto" : "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.8rem,3.5vw,3.5rem)",
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`,
      }} />

      {/* Horizontal grid lines for editorial feel */}
      {[20, 38, 56, 74].map((pct) => (
        <div key={pct} aria-hidden="true" style={{
          position: "absolute", left: 0, right: 0, top: `${pct}%`,
          height: "1px", background: lineColor, zIndex: 0,
        }} />
      ))}
      {/* Vertical grid line */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, bottom: 0, left: "62%",
        width: "1px", background: lineColor, zIndex: 0,
      }} />

      {/* Top: plate number + tagline */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 300, fontSize: "clamp(4rem,9vw,10rem)", lineHeight: 0.88, letterSpacing: "-0.04em", color: dark ? "rgba(245,242,236,0.08)" : "rgba(38,0,0,0.06)" }}>
            {data.num}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: dimColor, textAlign: "right", marginTop: "0.4rem" }}>
            FID &amp; Co.<br />Communications
          </span>
        </div>
      </div>

      {/* Middle: the big label */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: dark ? "rgba(217,128,56,0.9)" : "#D98038", marginBottom: "1.2rem" }}>
            {data.tagline}
          </p>
          <h3 style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: 500, fontSize: "clamp(2rem,4.5vw,5rem)", lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", color: dark ? "#F5F2EC" : "#260000", maxWidth: "10ch" }}>
            {data.word}
          </h3>
        </div>
      </div>

      {/* Bottom: scope lines list */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: `1px solid ${dark ? "rgba(245,242,236,0.14)" : "rgba(38,0,0,0.1)"}`, paddingTop: "1.2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem" }}>
          {data.lines.map((line, li) => (
            <p key={li} style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.04em", color: textColor, lineHeight: 1.4 }}>
              — {line}
            </p>
          ))}
        </div>
        <div style={{ marginTop: "1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: dimColor }}>{index + 1} / {PILLARS.length}</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: dimColor }}>Nairobi · Africa</span>
        </div>
      </div>
    </div>
  );
}

export default function Philosophy() {
  const sectionRef     = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect   = section.getBoundingClientRect();
        const totalH = section.offsetHeight - window.innerHeight;
        const { prog: p, pillar } = getProgAndPillar(Math.max(0, -rect.top), totalH);

        if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;
        setActivePillar(pillar);
        setProg(p);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-label="Our approach"
      style={{ height: `${SECTION_VH}vh`, position: "relative" }}
    >
      <style>{`
        .phil-grid {
          display: grid;
          grid-template-columns: 38fr 62fr;
          height: 100vh;
        }
        .phil-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem clamp(1.2rem,2.5vw,2.5rem) 4rem clamp(1.5rem,5vw,5rem);
          border-right: 1px solid rgba(38,0,0,0.08);
          overflow: hidden;
        }
        .phil-right {
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .phil-grid { grid-template-columns: 1fr; grid-template-rows: auto; position: relative; }
          .phil-left {
            position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
            padding: 1rem 1.4rem 1.8rem;
            border-right: none; border-top: 1px solid rgba(38,0,0,0.1);
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          }
          .phil-right { position: absolute; inset: 0; }
          .phil-progress { display: none; }
          .phil-word { font-size: clamp(1.1rem,5vw,1.7rem) !important; }
          .phil-desc { font-size: 0.72rem !important; }
        }
      `}</style>

      <div className="phil-grid" style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "#f0ece5" }}>

        {/* ── Left: pillar text ── */}
        <div className="phil-left" style={{ backgroundColor: "#ffffff" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
            Our Approach
          </p>

          <div>
            {PILLARS.map((p, i) => {
              const isActive = activePillar === i;
              return (
                <div key={i}>
                  <div style={{ height: "1px", background: isActive ? "rgba(38,0,0,0.2)" : "rgba(38,0,0,0.07)", transition: "background 0.55s" }} />
                  <div style={{ paddingTop: "clamp(0.9rem,1.8vw,1.7rem)", paddingBottom: "clamp(0.9rem,1.8vw,1.7rem)", display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0.7rem", alignItems: "start" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: isActive ? "#D98038" : "rgba(217,160,56,0.25)", paddingTop: "0.22rem", transition: "color 0.55s" }}>
                      {p.num}
                    </p>
                    <div>
                      <h2 className="phil-word" style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: isActive ? 600 : 300, fontSize: "clamp(1.5rem,2.6vw,2.6rem)", color: isActive ? "#260000" : "rgba(38,0,0,0.13)", letterSpacing: "-0.02em", lineHeight: 0.95, transition: "color 0.55s, font-weight 0.3s", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                        {p.word}
                      </h2>
                      <p className="phil-desc" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.55, color: "rgba(38,0,0,0.5)", maxWidth: "28ch", opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(7px)", transition: "opacity 0.6s, transform 0.6s", pointerEvents: "none" }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ height: "1px", background: "rgba(38,0,0,0.07)" }} />
          </div>

          {/* Progress bar */}
          <div className="phil-progress" style={{ marginTop: "clamp(1rem,2vw,1.8rem)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(38,0,0,0.07)", position: "relative", overflow: "hidden" }}>
              <div ref={progressBarRef} style={{ position: "absolute", inset: "0 auto 0 0", width: "0%", background: "#750006" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.25)", whiteSpace: "nowrap" }}>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right: crossfading image plates ── */}
        <div className="phil-right">
          {PILLARS.map((pillar, i) => (
            <ImagePlate
              key={i}
              data={pillar}
              visible={activePillar === i}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
