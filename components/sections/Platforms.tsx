"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const platforms = [
  {
    name: "The Tribe Vibe",
    tag: "Lifestyle · Music · Culture",
    href: "#contact",
  },
  {
    name: "Suhba Series",
    tag: "Curated Conversations · Identity · Wellbeing",
    href: "#contact",
  },
  {
    name: "The Capital Room",
    tag: "Leadership · Business · African Perspectives",
    href: "#contact",
  },
];

export default function Platforms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="platforms" className="py-24 md:py-40" style={{ backgroundColor: "#260000" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-16" style={{ color: "#D98038" }}>
          Owned platforms
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading mb-20 max-w-xl"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "#F5F2EC",
            letterSpacing: "-0.02em",
            textWrap: "balance",
          } as React.CSSProperties}
        >
          Culture, conversation and brand experience — on our terms.
        </motion.h2>

        <div>
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-baseline justify-between py-8 border-t"
              style={{ borderColor: "rgba(217,171,136,0.12)" }}
            >
              <div>
                <h3
                  className="font-heading leading-none mb-2"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", color: "#F5F2EC", letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </h3>
                <p className="font-body text-xs" style={{ color: "rgba(217,171,136,0.5)" }}>
                  {p.tag}
                </p>
              </div>
              <a
                href={p.href}
                className="font-body text-xs tracking-[0.15em] uppercase flex-shrink-0 ml-8 transition-colors duration-200"
                style={{ color: "#750006" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D98038")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#750006")}
              >
                Partner →
              </a>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(217,171,136,0.12)" }} />
        </div>
      </div>
    </section>
  );
}
