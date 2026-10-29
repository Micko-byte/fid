"use client";

import { useEffect, useState } from "react";
import ConstellationMark from "@/components/graphics/ConstellationMark";
import LogoReveal from "@/components/graphics/LogoReveal";

const DURATION_MS = 2300;
const FADE_MS = 550;
const MARK_MS = 1600;

/**
 * First-load intro: the constellation assembles and lights up from Nairobi
 * while the logo artwork wipes open beside it. Runs once per full page load —
 * it is mounted in SiteChrome, which survives client-side route changes.
 *
 * Deliberately free of animation libraries. The exit is a CSS transition and
 * the unmount is on a timer, so a webview that never fires requestAnimationFrame
 * still dismisses the overlay instead of trapping the site behind it.
 */
export default function IntroLoader() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [markSize, setMarkSize] = useState(140);

  useEffect(() => {
    setMarkSize(window.innerWidth < 640 ? 104 : 148);
    document.documentElement.dataset.intro = "playing";

    const done = () => {
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("fid:intro-done"));
    };
    const startExit = window.setTimeout(() => setLeaving(true), DURATION_MS);
    const unmount = window.setTimeout(() => {
      setMounted(false);
      done();
    }, DURATION_MS + FADE_MS);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(unmount);
      done();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="presentation"
      className="fid-intro"
      data-leaving={leaving ? "true" : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        overflow: "hidden",
        backgroundColor: "#f5f2ec",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(1.2rem, 3vw, 2rem)",
        paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.16,1,0.3,1)`,
        opacity: leaving ? 0 : 1,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(60% 50% at 50% 45%, rgba(217,128,56,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "clamp(0.9rem, 3vw, 1.8rem)",
          maxWidth: "100%",
        }}
      >
        <ConstellationMark size={markSize} duration={MARK_MS} color="117,0,6" />

        {/* The logo artwork itself — the same mark that sits below the footer —
            wiped open as the constellation finishes filling. */}
        <LogoReveal
          variant="maroon"
          trigger="load"
          delay={0.8}
          duration={1.0}
          style={{ width: `min(46vw, ${Math.round(markSize * 2.1)}px)` }}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: "relative",
          width: "clamp(120px, 24vw, 200px)",
          height: "1px",
          background: "rgba(117,0,6,0.35)",
          overflow: "hidden",
        }}
      >
        <span className="fid-intro__bar" style={{ display: "block", width: "100%", height: "100%", background: "#750006" }} />
      </div>

      <style>{`
        .fid-intro__bar {
          transform-origin: left;
          animation: fidIntroBar ${DURATION_MS}ms linear both;
        }
        @keyframes fidIntroBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        /* No travelling bar under reduced motion — it just rests at full width. */
        @media (prefers-reduced-motion: reduce) {
          .fid-intro__bar { animation: none; transform: scaleX(1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
