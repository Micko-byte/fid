"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 121;
const PILLARS = [
  {
    word: "INSIGHT",
    num: "01",
    desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making.",
  },
  {
    word: "STRATEGY",
    num: "02",
    desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market.",
  },
  {
    word: "IMPACT",
    num: "03",
    desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance.",
  },
];

function getActivePillar(prog: number): number {
  if (prog < 0.37) return 0;
  if (prog < 0.68) return 1;
  return 2;
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);

  // Preload 121 frames
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      const idx = i;
      img.onload = () => {
        loadedRef.current[idx] = true;
        if (idx === 0) drawFrameIndex(0);
      };
      framesRef.current[i] = img;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Size canvas on mount + resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const drawFrameIndex = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[frameIndex];
    if (!img || !loadedRef.current[frameIndex]) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    // White background then frame (contain-fit — show full logo)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw * dpr, ch * dpr);

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (iw === 0 || ih === 0) return;

    // Contain-fit: show entire logo frame centred
    const scale = Math.min((cw * 0.88) / iw, (ch * 0.88) / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(img, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    let lastPillar = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const totalH = section.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const prog = totalH > 0 ? Math.min(1, scrolled / totalH) : 0;

        // Update progress bar directly
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${prog * 100}%`;
        }

        const nextPillar = getActivePillar(prog);
        if (nextPillar !== lastPillar) {
          lastPillar = nextPillar;
          setActivePillar(nextPillar);
        }

        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(prog * TOTAL_FRAMES));
        drawFrameIndex(frameIdx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrameIndex]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-label="Our approach"
      style={{
        // 600vh gives each frame ~13px of scroll travel — smooth & followable
        height: `calc(${TOTAL_FRAMES * 13}px + 200vh)`,
        position: "relative",
      }}
    >
      <style>{`
        .philosophy-grid {
          display: grid;
          grid-template-columns: 42fr 58fr;
        }
        .philosophy-canvas-col {
          position: relative;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .philosophy-canvas-inner {
          position: relative;
          width: min(88%, 88vh);
          aspect-ratio: 1 / 1;
          border: 1px solid rgba(38,0,0,0.1);
          border-radius: 2px;
          overflow: hidden;
          background-color: #ffffff;
        }
        @media (max-width: 767px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 55vw;
          }
          .philosophy-canvas-col {
            height: 55vw;
          }
          .philosophy-canvas-inner {
            width: min(92%, 92vw);
          }
        }
      `}</style>
      {/* Sticky viewport panel — white background */}
      <div
        className="philosophy-grid"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        {/* ── Left column: label + pillar rows with hairline separators ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(2rem, 4vw, 4rem)",
            paddingTop: "2rem",
            paddingBottom: "5rem",
            borderRight: "1px solid rgba(38,0,0,0.08)",
          }}
        >
          {/* Section label — 14islands eyebrow style */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#D98038",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Our Approach
          </p>

          {/* Pillar rows with hairline separators */}
          <div>
            {PILLARS.map((p, i) => {
              const isActive = activePillar === i;
              return (
                <div key={i}>
                  {/* Hairline top rule — 14islands separator */}
                  <div
                    style={{
                      height: "1px",
                      background: isActive
                        ? "rgba(38,0,0,0.18)"
                        : "rgba(38,0,0,0.08)",
                      transition: "background 0.5s ease",
                    }}
                  />

                  <div
                    style={{
                      paddingTop: "clamp(1.2rem, 2.5vw, 2rem)",
                      paddingBottom: "clamp(1.2rem, 2.5vw, 2rem)",
                      display: "grid",
                      gridTemplateColumns: "2.5rem 1fr",
                      gap: "1rem",
                      alignItems: "start",
                    }}
                  >
                    {/* Number */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: isActive ? "#D98038" : "rgba(217,160,56,0.3)",
                        paddingTop: "0.3rem",
                        transition: "color 0.55s ease",
                      }}
                    >
                      {p.num}
                    </p>

                    <div>
                      {/* Pillar word */}
                      <h2
                        style={{
                          fontFamily: "var(--font-heading, 'Oswald')",
                          fontWeight: isActive ? 600 : 300,
                          fontSize: "clamp(1.8rem, 3.5vw, 3.4rem)",
                          color: isActive ? "#260000" : "rgba(38,0,0,0.18)",
                          letterSpacing: "-0.02em",
                          lineHeight: 0.95,
                          transition: "color 0.55s ease, font-weight 0.3s ease",
                          textTransform: "uppercase",
                          marginBottom: "0.6rem",
                        }}
                      >
                        {p.word}
                      </h2>

                      {/* Descriptor — only shown when active */}
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.85rem",
                          lineHeight: 1.55,
                          color: "rgba(38,0,0,0.55)",
                          maxWidth: "34ch",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(6px)",
                          transition: "opacity 0.55s ease, transform 0.55s ease",
                          pointerEvents: "none",
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Final hairline */}
            <div style={{ height: "1px", background: "rgba(38,0,0,0.08)" }} />
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: "clamp(2rem, 4vw, 3rem)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(38,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                ref={progressBarRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "0%",
                  background: "#750006",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(38,0,0,0.28)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right column: large centred canvas animation ── */}
        <div className="philosophy-canvas-col">
          {/* Canvas container — large square centered in right panel, aligned with Strategy */}
          <div className="philosophy-canvas-inner">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />

            {/* Active pillar label chip — bottom of canvas */}
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                right: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(38,0,0,0.3)",
                }}
              >
                {PILLARS[activePillar].num} / {PILLARS[activePillar].word}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(38,0,0,0.25)",
                }}
              >
                FID & Co.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
