"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 121;
// More scroll travel per frame = smoother, more controlled scrubbing
const SCROLL_PX_PER_FRAME = 22;

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
  const sectionRef    = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const framesRef     = useRef<HTMLImageElement[]>([]);
  const loadedRef     = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState(0);

  // ── Smooth lerp state (RAF-based, not tied to scroll events) ──
  const targetProgRef  = useRef(0);
  const currentProgRef = useRef(0);
  const rafLoopRef     = useRef<number | null>(null);
  const lastPillarRef  = useRef(0);

  // ── Draw with cross-dissolve interpolation between adjacent frames ──
  const drawAtProg = useCallback((prog: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw  = canvas.offsetWidth;
    const ch  = canvas.offsetHeight;

    // Exact fractional frame position
    const exactFrame = prog * (TOTAL_FRAMES - 1);
    const frameA     = Math.floor(exactFrame);
    const frameB     = Math.min(TOTAL_FRAMES - 1, frameA + 1);
    const blend      = exactFrame - frameA; // 0→1 cross-dissolve factor

    const imgA = framesRef.current[frameA];
    const imgB = framesRef.current[frameB];
    if (!imgA || !loadedRef.current[frameA]) return;

    const iw = imgA.naturalWidth;
    const ih = imgA.naturalHeight;
    if (!iw || !ih) return;

    // Cover-fit: fill 96% of canvas, centred
    const scale = Math.min((cw * 0.96) / iw, (ch * 0.96) / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw * dpr, ch * dpr);

    // Draw frame A
    ctx.globalAlpha = 1;
    ctx.drawImage(imgA, dx * dpr, dy * dpr, dw * dpr, dh * dpr);

    // Cross-dissolve to frame B at blend factor
    if (imgB && loadedRef.current[frameB] && blend > 0.001) {
      ctx.globalAlpha = blend;
      ctx.drawImage(imgB, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
      ctx.globalAlpha = 1;
    }

    // Update progress bar (direct DOM, no re-render)
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${prog * 100}%`;
    }

    // Update active pillar if changed (triggers single React re-render)
    const nextPillar = getActivePillar(prog);
    if (nextPillar !== lastPillarRef.current) {
      lastPillarRef.current = nextPillar;
      setActivePillar(nextPillar);
    }
  }, []);

  // ── RAF lerp loop — runs until currentProg converges to targetProg ──
  const startLerpLoop = useCallback(() => {
    if (rafLoopRef.current !== null) return; // already running

    const tick = () => {
      const diff = targetProgRef.current - currentProgRef.current;

      if (Math.abs(diff) < 0.00015) {
        // Converged — snap and stop
        currentProgRef.current = targetProgRef.current;
        drawAtProg(currentProgRef.current);
        rafLoopRef.current = null;
        return;
      }

      // Ease factor: 0.10 = smooth cinematic, 0.18 = snappier
      currentProgRef.current += diff * 0.10;
      drawAtProg(currentProgRef.current);
      rafLoopRef.current = requestAnimationFrame(tick);
    };

    rafLoopRef.current = requestAnimationFrame(tick);
  }, [drawAtProg]);

  // ── Preload all 121 frames ──
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
      const idx = i;
      img.onload = () => {
        loadedRef.current[idx] = true;
        if (idx === 0) drawAtProg(0);
      };
      framesRef.current[i] = img;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Canvas resize — keeps DPR-correct buffer ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;
    const wPx = Math.round(w * dpr);
    const hPx = Math.round(h * dpr);
    if (canvas.width !== wPx || canvas.height !== hPx) {
      canvas.width  = wPx;
      canvas.height = hPx;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      drawAtProg(currentProgRef.current);
    }
  }, [drawAtProg]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Scroll handler — updates targetProg, kicks off lerp loop ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect    = section.getBoundingClientRect();
      const totalH  = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const prog    = totalH > 0 ? Math.min(1, scrolled / totalH) : 0;

      targetProgRef.current = prog;
      startLerpLoop();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafLoopRef.current !== null) cancelAnimationFrame(rafLoopRef.current);
    };
  }, [startLerpLoop]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-label="Our approach"
      style={{
        height: `calc(${TOTAL_FRAMES * SCROLL_PX_PER_FRAME}px + 200vh)`,
        position: "relative",
      }}
    >
      <style>{`
        /* Left 38% text | Right 62% canvas */
        .philosophy-grid {
          display: grid;
          grid-template-columns: 38fr 62fr;
        }
        .philosophy-canvas-col {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
        }
        /* Canvas fills the ENTIRE right column — edge to edge */
        .philosophy-canvas-inner {
          position: absolute;
          inset: 0;
          background-color: #ffffff;
        }
        /* Mobile: stack vertically, canvas below at 60vw height */
        @media (max-width: 767px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto 60vw;
            height: 100vh;
          }
          .philosophy-canvas-col {
            height: 60vw;
          }
        }
      `}</style>

      {/* ── Sticky viewport panel ── */}
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
        {/* ── Left: label + pillar rows ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft:  "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 3vw, 3rem)",
            paddingTop:    "2rem",
            paddingBottom: "5rem",
            borderRight: "1px solid rgba(38,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#D98038",
              marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Our Approach
          </p>

          <div>
            {PILLARS.map((p, i) => {
              const isActive = activePillar === i;
              return (
                <div key={i}>
                  <div style={{ height: "1px", background: isActive ? "rgba(38,0,0,0.18)" : "rgba(38,0,0,0.08)", transition: "background 0.6s ease" }} />
                  <div
                    style={{
                      paddingTop: "clamp(1rem, 2vw, 1.8rem)",
                      paddingBottom: "clamp(1rem, 2vw, 1.8rem)",
                      display: "grid",
                      gridTemplateColumns: "2.2rem 1fr",
                      gap: "0.8rem",
                      alignItems: "start",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: isActive ? "#D98038" : "rgba(217,160,56,0.3)",
                        paddingTop: "0.3rem",
                        transition: "color 0.6s ease",
                      }}
                    >
                      {p.num}
                    </p>
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-heading, 'Oswald')",
                          fontWeight: isActive ? 600 : 300,
                          fontSize: "clamp(1.6rem, 3vw, 3rem)",
                          color: isActive ? "#260000" : "rgba(38,0,0,0.15)",
                          letterSpacing: "-0.02em",
                          lineHeight: 0.95,
                          transition: "color 0.6s ease, font-weight 0.3s ease",
                          textTransform: "uppercase",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {p.word}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          lineHeight: 1.55,
                          color: "rgba(38,0,0,0.55)",
                          maxWidth: "30ch",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.65s ease, transform 0.65s ease",
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
            <div style={{ height: "1px", background: "rgba(38,0,0,0.08)" }} />
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(38,0,0,0.08)", position: "relative", overflow: "hidden" }}>
              <div
                ref={progressBarRef}
                style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "0%", background: "#750006", transition: "none" }}
              />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.28)", whiteSpace: "nowrap", flexShrink: 0 }}>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right: full-column canvas ── */}
        <div className="philosophy-canvas-col">
          <div className="philosophy-canvas-inner">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            />

            {/* Bottom label strip */}
            <div
              style={{
                position: "absolute",
                bottom: "1.2rem",
                left: "1.5rem",
                right: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.25)" }}>
                {PILLARS[activePillar].num} / {PILLARS[activePillar].word}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.2)" }}>
                FID &amp; Co.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
