"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
}

export default function WorkDetailClient({ project }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scopeInView = useInView(contentRef, { once: true, margin: "-60px" });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  // Fire play on the video if present
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F5F2EC" }}>
      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden flex flex-col justify-end"
        style={{ backgroundColor: "#1d0202" }}
      >
        {/* Parallax tinted bg */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 60% 30%, ${project.color ?? "#750006"}26 0%, transparent 65%), linear-gradient(180deg, rgba(29,2,2,0.2) 0%, rgba(29,2,2,0.9) 100%)`,
            y: heroY,
          }}
        />

        {/* Back link */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 pt-28">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.18em] uppercase transition-colors duration-200"
            style={{ color: "#D9AB88" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F2EC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D9AB88")}
          >
            <ArrowLeft size={14} />
            All work
          </Link>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 pb-16 md:pb-24 pt-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "#D98038" }}
          >
            {project.sector} · {project.years}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading leading-tight mb-4 max-w-[16ch]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              color: "#F5F2EC",
              letterSpacing: "-0.03em",
            }}
          >
            {project.client}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg leading-relaxed"
            style={{ color: "#D9AB88", maxWidth: "36ch" }}
          >
            {project.title}
          </motion.p>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        ref={contentRef}
        className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-28"
      >
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={scopeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 border-b pb-20"
          style={{ borderColor: "rgba(38,0,0,0.1)" }}
        >
          <p
            className="font-heading leading-tight mb-8"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#260000",
              letterSpacing: "-0.02em",
              maxWidth: "26ch",
            }}
          >
            Overview
          </p>
          <p
            className="font-body text-base leading-[1.85]"
            style={{ color: "rgba(28,28,28,0.75)", maxWidth: "65ch" }}
          >
            {project.desc}
          </p>
        </motion.div>

        {/* Scope + Impact grid */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-24">
          {/* Scope */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={scopeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-body text-xs tracking-[0.22em] uppercase mb-8"
              style={{ color: "#D98038" }}
            >
              Scope of work
            </p>
            <ul className="space-y-5">
              {project.scope.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={scopeInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                  className="flex gap-4 font-body text-sm leading-relaxed"
                  style={{ color: "rgba(28,28,28,0.72)" }}
                >
                  <span
                    className="mt-[8px] flex-shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#750006" }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={scopeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-body text-xs tracking-[0.22em] uppercase mb-8"
              style={{ color: "#D98038" }}
            >
              Impact
            </p>
            <div
              className="border-l-2 pl-6"
              style={{ borderColor: "#750006" }}
            >
              <p
                className="font-heading leading-tight"
                style={{
                  fontSize: "clamp(1.3rem, 2.4vw, 1.75rem)",
                  color: "#260000",
                  letterSpacing: "-0.015em",
                }}
              >
                {project.impact}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={scopeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 pt-16 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderColor: "rgba(38,0,0,0.1)" }}
        >
          <div>
            <p
              className="font-heading leading-tight mb-2"
              style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", color: "#260000", letterSpacing: "-0.02em" }}
            >
              Ready to work with us?
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "rgba(28,28,28,0.5)" }}
            >
              Let&apos;s shape your influence.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.18em] uppercase font-body transition-colors duration-200"
              style={{ backgroundColor: "#750006", color: "#F5F2EC" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8a0007")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#750006")}
            >
              Book us
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.18em] uppercase font-body border transition-colors duration-200"
              style={{ borderColor: "rgba(38,0,0,0.2)", color: "rgba(38,0,0,0.55)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#750006"; e.currentTarget.style.color = "#750006"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(38,0,0,0.2)"; e.currentTarget.style.color = "rgba(38,0,0,0.55)"; }}
            >
              More work
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
