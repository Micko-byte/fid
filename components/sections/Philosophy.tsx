"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 121;
const PILLARS = [
  { word: "INSIGHT", num: "01", activeFrom: 0, activeTo: 0.4 },
  { word: "STRATEGY", num: "02", activeFrom: 0.33, activeTo: 0.72 },
  { word: "IMPACT", num: "03", activeFrom: 0.65, activeTo: 1 },
];

// Which pillar is "most" active at a given progress
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

  // Preload all 121 frames
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      const idx = i;
      img.onload = () => {
        loadedRef.current[idx] = true;
        // Draw first frame as soon as it loads
        if (idx === 0) drawFrameIndex(0);
      };
      framesRef.current[i] = img;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Size canvas to match its CSS dimensions
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
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

    ctx.clearRect(0, 0, cw * dpr, ch * dpr);

    // Cover-fit the frame into the canvas
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (iw === 0 || ih === 0) return;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
  }, []);

  // Scroll-driven frame playback
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

        // Update progress bar directly (no re-render)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${prog * 100}%`;
        }

        // Active pillar — only setState on change to minimise renders
        const nextPillar = getActivePillar(prog);
        if (nextPillar !== lastPillar) {
          lastPillar = nextPillar;
          setActivePillar(nextPillar);
        }

        // Draw the corresponding frame
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(prog * TOTAL_FRAMES)
        );
        drawFrameIndex(frameIdx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial draw

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
        // Tall enough to give each of the 121 frames ~8px of scroll travel
        // plus extra breathing room at top and bottom
        height: `calc(${TOTAL_FRAMES * 8}px + 200vh)`,
        position: "relative",
      }}
    >
      {/* Sticky viewport-height panel */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#1d0202",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* ── Left column: label + pillars ── */}
        <div
          style={{
            width: "clamp(180px, 26vw, 360px)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "1.5rem",
            paddingTop: "2rem",
            paddingBottom: "5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Section label */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#D98038",
              marginBottom: "3.5rem",
            }}
          >
            Our Approach
          </p>

          {/* Three pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
            {PILLARS.map((p, i) => {
              const isActive = activePillar === i;
              return (
                <div key={i} style={{ position: "relative" }}>
                  {/* Active indicator bar */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "-1.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "2px",
                      height: isActive ? "80%" : "0%",
                      background: "#D9AB88",
                      transition: "height 0.5s ease",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: isActive ? "#D98038" : "rgba(217,160,56,0.3)",
                      marginBottom: "0.45rem",
                      transition: "color 0.6s ease",
                    }}
                  >
                    {p.num}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading, 'Oswald')",
                      fontWeight: isActive ? 600 : 300,
                      fontSize: "clamp(2rem, 4vw, 3.8rem)",
                      color: isActive
                        ? "#F5F2EC"
                        : "rgba(245,242,236,0.18)",
                      letterSpacing: "-0.02em",
                      lineHeight: 0.92,
                      transition: "color 0.6s ease, font-weight 0.4s ease",
                    }}
                  >
                    {p.word}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Scroll progress line */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "clamp(1.5rem, 5vw, 6rem)",
              right: "1.5rem",
            }}
          >
            <div
              style={{
                height: "1px",
                background: "rgba(245,242,236,0.08)",
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
                  background: "linear-gradient(to right, #D9AB88, #D98038)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(245,242,236,0.28)",
                marginTop: "0.6rem",
              }}
            >
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right column: canvas animation ── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
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

          {/* Left fade — canvas blends into the left column */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #1d0202 0%, rgba(29,2,2,0.6) 8%, transparent 22%, transparent 78%, rgba(29,2,2,0.6) 92%, #1d0202 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {/* Top / bottom fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, #1d0202 0%, transparent 12%, transparent 88%, #1d0202 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}
