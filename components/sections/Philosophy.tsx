"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES    = 121;
const SCROLL_PX_PER_FRAME = 12;   // tighter = faster progress per scroll px
const LERP_FACTOR     = 0.22;     // 0.22 → reaches 95% of target in ~12 RAF ticks (~200ms)
const LERP_THRESHOLD  = 0.0004;   // stop the loop once we're this close

const PILLARS = [
  { word: "INSIGHT",  num: "01", desc: "Deep audience intelligence that uncovers what truly drives perception, behaviour and decision-making." },
  { word: "STRATEGY", num: "02", desc: "Purposeful planning that connects brand truth to cultural moment — across every channel and market." },
  { word: "IMPACT",   num: "03", desc: "Measurable results: earned attention, shifted reputation and enduring cultural relevance." },
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

  const targetProgRef  = useRef(0);
  const currentProgRef = useRef(0);
  const rafLoopRef     = useRef<number | null>(null);
  const lastPillarRef  = useRef(0);

  // ── Draw with cross-dissolve between adjacent frames ──
  const drawAtProg = useCallback((prog: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR at 2 for perf
    const cw  = canvas.offsetWidth;
    const ch  = canvas.offsetHeight;

    const exact  = prog * (TOTAL_FRAMES - 1);
    const frameA = Math.floor(exact);
    const frameB = Math.min(TOTAL_FRAMES - 1, frameA + 1);
    const blend  = exact - frameA;

    const imgA = framesRef.current[frameA];
    if (!imgA || !loadedRef.current[frameA]) return;
    const iw = imgA.naturalWidth;
    const ih = imgA.naturalHeight;
    if (!iw || !ih) return;

    // Fill 94% of canvas, centred
    const scale = Math.min((cw * 0.94) / iw, (ch * 0.94) / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cw * dpr, ch * dpr);

    ctx.globalAlpha = 1;
    ctx.drawImage(imgA, dx * dpr, dy * dpr, dw * dpr, dh * dpr);

    const imgB = framesRef.current[frameB];
    if (imgB && loadedRef.current[frameB] && blend > 0.02) {
      ctx.globalAlpha = blend;
      ctx.drawImage(imgB, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
      ctx.globalAlpha = 1;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${prog * 100}%`;
    }

    const next = getActivePillar(prog);
    if (next !== lastPillarRef.current) {
      lastPillarRef.current = next;
      setActivePillar(next);
    }
  }, []);

  // ── Smooth RAF lerp loop ──
  const startLerpLoop = useCallback(() => {
    if (rafLoopRef.current !== null) return;
    const tick = () => {
      const diff = targetProgRef.current - currentProgRef.current;
      if (Math.abs(diff) < LERP_THRESHOLD) {
        currentProgRef.current = targetProgRef.current;
        drawAtProg(currentProgRef.current);
        rafLoopRef.current = null;
        return;
      }
      currentProgRef.current += diff * LERP_FACTOR;
      drawAtProg(currentProgRef.current);
      rafLoopRef.current = requestAnimationFrame(tick);
    };
    rafLoopRef.current = requestAnimationFrame(tick);
  }, [drawAtProg]);

  // ── Preload frames ──
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

  // ── Canvas resize ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
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

  // ── Scroll handler ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect   = section.getBoundingClientRect();
      const totalH = section.offsetHeight - window.innerHeight;
      const prog   = totalH > 0 ? Math.min(1, Math.max(0, -rect.top) / totalH) : 0;
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
      style={{ height: `calc(${TOTAL_FRAMES * SCROLL_PX_PER_FRAME}px + 200vh)`, position: "relative" }}
    >
      <style>{`
        /* ─ Desktop: 38% text | 62% canvas ─ */
        .phil-grid {
          display: grid;
          grid-template-columns: 38fr 62fr;
          height: 100vh;
        }
        .phil-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem clamp(1.5rem,3vw,3rem) 5rem clamp(1.5rem,5vw,6rem);
          border-right: 1px solid rgba(38,0,0,0.08);
          overflow: hidden;
        }
        .phil-right {
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }
        /* Canvas fills entire right column */
        .phil-canvas-wrap {
          position: absolute;
          inset: 0;
        }

        /* ─ Mobile: full-screen canvas with text overlay ─ */
        @media (max-width: 767px) {
          .phil-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            position: relative;
          }
          /* Left column overlaid at bottom of canvas */
          .phil-left {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            padding: 1.2rem 1.5rem 2rem;
            border-right: none;
            border-top: 1px solid rgba(38,0,0,0.1);
            background: rgba(255,255,255,0.96);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          /* Canvas fills full sticky panel */
          .phil-right {
            position: absolute;
            inset: 0;
          }
          /* Tighten progress bar on mobile */
          .phil-progress { display: none; }
          /* Smaller pillar text on mobile */
          .phil-word { font-size: clamp(1.2rem,5vw,1.8rem) !important; }
          .phil-desc { font-size: 0.75rem !important; max-width: 100% !important; }
        }
      `}</style>

      {/* ── Sticky panel ── */}
      <div
        className="phil-grid"
        style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "#ffffff" }}
      >
        {/* ── Left: pillars ── */}
        <div className="phil-left">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D98038", marginBottom: "clamp(1.5rem,3vw,3rem)" }}>
            Our Approach
          </p>

          <div>
            {PILLARS.map((p, i) => {
              const isActive = activePillar === i;
              return (
                <div key={i}>
                  <div style={{ height: "1px", background: isActive ? "rgba(38,0,0,0.18)" : "rgba(38,0,0,0.08)", transition: "background 0.5s" }} />
                  <div style={{ paddingTop: "clamp(0.8rem,1.8vw,1.6rem)", paddingBottom: "clamp(0.8rem,1.8vw,1.6rem)", display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0.7rem", alignItems: "start" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: isActive ? "#D98038" : "rgba(217,160,56,0.28)", paddingTop: "0.25rem", transition: "color 0.5s" }}>
                      {p.num}
                    </p>
                    <div>
                      <h2
                        className="phil-word"
                        style={{ fontFamily: "var(--font-heading,'Oswald')", fontWeight: isActive ? 600 : 300, fontSize: "clamp(1.5rem,2.8vw,2.8rem)", color: isActive ? "#260000" : "rgba(38,0,0,0.14)", letterSpacing: "-0.02em", lineHeight: 0.95, transition: "color 0.5s, font-weight 0.3s", textTransform: "uppercase", marginBottom: "0.45rem" }}
                      >
                        {p.word}
                      </h2>
                      <p
                        className="phil-desc"
                        style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", lineHeight: 1.55, color: "rgba(38,0,0,0.52)", maxWidth: "28ch", opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.55s, transform 0.55s", pointerEvents: "none" }}
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
          <div className="phil-progress" style={{ marginTop: "clamp(1.2rem,2.5vw,2rem)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(38,0,0,0.08)", position: "relative", overflow: "hidden" }}>
              <div ref={progressBarRef} style={{ position: "absolute", inset: "0 auto 0 0", width: "0%", background: "#750006" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.28)", whiteSpace: "nowrap" }}>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right: full-panel canvas ── */}
        <div className="phil-right">
          <div className="phil-canvas-wrap">
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            />
            {/* Bottom label */}
            <div style={{ position: "absolute", bottom: "1rem", left: "1.2rem", right: "1.2rem", display: "flex", justifyContent: "space-between", zIndex: 2, pointerEvents: "none" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.22)" }}>
                {PILLARS[activePillar].num} / {PILLARS[activePillar].word}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(38,0,0,0.18)" }}>
                FID &amp; Co.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
