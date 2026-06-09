"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="founder"
      className="py-24 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "#260000" }}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 font-heading select-none pointer-events-none"
        style={{ fontSize: "clamp(14rem, 32vw, 24rem)", color: "rgba(117,0,6,0.06)", lineHeight: 0.85 }}
      >
        F.I.
      </div>

      <div ref={ref} className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#D98038" }}>
          Founder
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#F5F2EC", letterSpacing: "-0.03em" }}
        >
          Farida Idris
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-xs tracking-[0.2em] uppercase mb-20"
          style={{ color: "#D98038" }}
        >
          Founder & Lead Strategist
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading leading-tight max-w-3xl"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            color: "#F5F2EC",
            letterSpacing: "-0.01em",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          &ldquo;Communication is not simply about visibility. It is about shaping understanding, building credibility and connecting organisations with the people they serve.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
