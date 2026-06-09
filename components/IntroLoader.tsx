"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FALLBACK_MS = 20000;

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    let mounted = true;
    let finished = false;
    let fallbackTimer: number | undefined;

    const finish = () => {
      if (!mounted || finished) return;
      finished = true;
      setVisible(false);
      window.dispatchEvent(new Event("fid:intro-done"));
      document.documentElement.dataset.intro = "done";
    };

    finishRef.current = finish;

    document.documentElement.dataset.intro = "playing";

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
    fallbackTimer = window.setTimeout(() => {
      finish();
    }, FALLBACK_MS);

    return () => {
      mounted = false;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[10000] overflow-hidden bg-[#1d0202]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onCanPlay={() => {
              videoRef.current?.play().catch(() => {});
            }}
            onEnded={() => {
              finishRef.current?.();
            }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </motion.video>

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(29,2,2,0.55) 0%, rgba(29,2,2,0.88) 100%), radial-gradient(circle at 75% 20%, rgba(217,128,56,0.28) 0%, transparent 34%)",
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-24 text-[#F5F2EC] md:px-12 md:pb-12">
            <div className="max-w-[1280px]">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#D9AB88]">
                FID &amp; Co.
              </p>
              <p className="mt-3 max-w-[26ch] font-heading text-[clamp(2rem,4vw,3.6rem)] leading-[0.95]">
                Insight. Strategy. Impact.
              </p>
              <p className="mt-4 max-w-[30ch] text-sm leading-[1.65] text-[rgba(245,242,236,0.78)]">
                Loading the experience.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
