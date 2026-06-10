"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";
import CountUp from "@/components/animations/CountUp";

const stats = [
  { value: "15+", label: "Years" },
  { value: "10+", label: "Industries" },
  { value: "8+", label: "Markets" },
  { value: "100+", label: "Campaigns" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#1d0202" }}
    >
      {/* Video background */}
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18 }}
      />

      {/* Dark overlay so text remains legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(29,2,2,0.55) 0%, rgba(29,2,2,0.7) 60%, rgba(29,2,2,0.88) 100%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-16"
          style={{ color: "#D98038" }}
        >
          Who we are
        </motion.p>

        <TextReveal
          text="We treat communication as influence — not a function."
          as="h2"
          delay={0.1}
          stagger={0.05}
          className="font-heading leading-tight mb-24 max-w-4xl"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            color: "#F5F2EC",
            letterSpacing: "-0.02em",
          }}
        />

        <div
          className="grid grid-cols-2 md:grid-cols-4 border-t"
          style={{ borderColor: "rgba(217,171,136,0.18)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 pb-4 pr-8"
            >
              <p
                className="font-heading leading-none mb-2"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: "#D98038",
                  letterSpacing: "-0.03em",
                }}
              >
                <CountUp value={s.value} duration={1.8} />
              </p>
              <p
                className="font-body text-xs uppercase tracking-[0.15em]"
                style={{ color: "rgba(217,171,136,0.6)" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
