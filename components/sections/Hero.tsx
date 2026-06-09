"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const rawX = useMotionValue(0.72);
  const rawY = useMotionValue(0.28);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 22, restDelta: 0.0005 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 22, restDelta: 0.0005 });

  const spotlight = useTransform([smoothX, smoothY], ([x, y]) => {
    const px = Math.round((x as number) * 100);
    const py = Math.round((y as number) * 100);
    return [
      `radial-gradient(circle 420px at ${px}% ${py}%, rgba(217,171,136,0.18) 0%, transparent 62%)`,
      `radial-gradient(circle 620px at 82% 18%, rgba(217,128,56,0.16) 0%, transparent 54%)`,
      `radial-gradient(circle 780px at 20% 86%, rgba(117,0,6,0.18) 0%, transparent 50%)`,
      "linear-gradient(180deg, rgba(29,2,2,0.2) 0%, rgba(29,2,2,0.55) 100%)",
    ].join(", ");
  });

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      rawX.set((event.clientX - rect.left) / rect.width);
      rawY.set((event.clientY - rect.top) / rect.height);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    const introState = document.documentElement.dataset.intro;
    setIntroDone(introState === "done");

    const onIntroDone = () => setIntroDone(true);
    window.addEventListener("fid:intro-done", onIntroDone);

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);

    const section = sectionRef.current;
    if (!prefersReducedMotion && !mobile && section) {
      section.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      window.removeEventListener("fid:intro-done", onIntroDone);
      section?.removeEventListener("pointermove", onPointerMove);
    };
  }, [onPointerMove, prefersReducedMotion]);

  const intro = useMemo(
    () => [
      {
        title: "We shape ",
        emphasis: "influence",
        suffix: " not just ",
        accent: "visibility.",
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#1d0202] text-[#F5F2EC]"
    >
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: prefersReducedMotion
            ? "linear-gradient(180deg, rgba(29,2,2,0.7) 0%, rgba(29,2,2,0.95) 100%)"
            : spotlight,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 72% 24%, rgba(255, 138, 61, 0.14) 0%, transparent 44%), radial-gradient(120% 92% at 16% 84%, rgba(117,0,6,0.18) 0%, transparent 44%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(29,2,2,0.42) 0%, rgba(29,2,2,0.08) 30%, rgba(29,2,2,0.72) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1320px] flex-col px-6 pb-10 pt-28 md:px-12 md:pb-12 md:pt-32 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between gap-6 text-[0.72rem] tracking-[0.28em] uppercase text-[#D9AB88] md:text-[0.78rem]"
        >
          <span className="max-w-[22ch] leading-relaxed">Strategic communications &amp; brand experience</span>
          <span className="text-right">Nairobi · Africa</span>
        </motion.div>

        <div className="flex flex-1 flex-col justify-end pb-0 pt-14 md:pt-10">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[10ch] font-heading text-[clamp(3rem,9.5vw,9.6rem)] leading-[0.92] tracking-[-0.03em] text-[#F5F2EC]"
              >
                {intro[0].title}
                <em className="font-normal italic text-[#D9AB88]">{intro[0].emphasis}</em>
                {intro[0].suffix}
                <span className="text-[#D98038]">{intro[0].accent}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-[34ch] font-body text-[1rem] leading-[1.72] text-[rgba(245,242,236,0.82)] md:text-[1.08rem]"
              >
                A full-service strategic communications and brand experience firm, building credibility and cultural relevance for Africa&apos;s most ambitious organisations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-[#750006] px-6 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#F5F2EC] transition-colors duration-300 hover:bg-[#8a0007]"
                >
                  Book us
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center border border-[rgba(217,171,136,0.24)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#D9AB88] transition-colors duration-300 hover:border-[rgba(245,242,236,0.32)] hover:text-[#F5F2EC]"
                >
                  View work
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col justify-between gap-10 pt-4 lg:pt-0"
            >
              <p className="max-w-[20ch] font-body text-[clamp(1.25rem,2.2vw,2rem)] italic leading-[1.25] text-[#D9AB88]">
                Insight. Strategy. Impact.
              </p>

              <div className="border-l border-[rgba(217,171,136,0.24)] pl-4">
                <span className="block text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(217,171,136,0.72)]">
                  Scroll to explore
                </span>
                <span className="mt-3 block h-10 w-px bg-gradient-to-b from-[#D9AB88] to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1d0202] to-transparent"
      />

      {!prefersReducedMotion && !isMobile && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[18%] h-[34vw] w-[34vw] max-h-[520px] max-w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          animate={{ opacity: [0.35, 0.58, 0.35], scale: [0.94, 1.04, 0.94] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(217,128,56,0.24) 0%, rgba(117,0,6,0.12) 35%, transparent 72%)",
          }}
        />
      )}
      </motion.div>
    </section>
  );
}
