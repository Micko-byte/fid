"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  // Parallax for the F.I. watermark — floats upward as you scroll through
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="py-24 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "#260000" }}
    >
      {/* Parallax watermark */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 font-heading select-none pointer-events-none"
        style={{
          fontSize: "clamp(14rem, 32vw, 24rem)",
          color: "rgba(117,0,6,0.07)",
          lineHeight: 0.85,
          y: watermarkY,
        }}
      >
        F.I.
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-body text-xs tracking-[0.25em] uppercase mb-16"
          style={{ color: "#D98038" }}
        >
          Founder
        </motion.p>

        <TextReveal
          text="Farida Idris"
          as="h2"
          delay={0.05}
          stagger={0.1}
          className="font-heading leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#F5F2EC", letterSpacing: "-0.03em" }}
        />

        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-xs tracking-[0.2em] uppercase mb-20"
          style={{ color: "#D98038" }}
        >
          Founder &amp; Lead Strategist
        </motion.p>

        <TextReveal
          text="Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve."
          as="blockquote"
          delay={0.45}
          stagger={0.04}
          className="font-heading leading-tight max-w-3xl"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            color: "#F5F2EC",
            letterSpacing: "-0.01em",
          }}
        />
      </div>
    </section>
  );
}
