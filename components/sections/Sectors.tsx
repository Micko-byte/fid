"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sectors = [
  { name: "Government & Public Institutions", icon: "○" },
  { name: "Retail & Fashion", icon: "◇" },
  { name: "Manufacturing & Corporate Brands", icon: "△" },
  { name: "Hospitality & Lifestyle", icon: "□" },
  { name: "Healthcare & Medical Institutions", icon: "+" },
  { name: "Finance & Investment", icon: "◎" },
  { name: "Sports & Tourism", icon: "◈" },
  { name: "Social Impact & Development", icon: "◉" },
  { name: "Beauty & Lifestyle", icon: "◆" },
  { name: "Culture & Entertainment", icon: "◐" },
];

export default function Sectors() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="sectors" className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div ref={ref} className="mb-16">
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#D98038" }}>
            Industries we serve
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#260000", letterSpacing: "-0.02em" }}
          >
            10+ industries
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }}>
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group p-6 border-r border-b cursor-default transition-all duration-300 hover:bg-[#750006]"
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              <div className="font-body text-xl mb-3 transition-colors duration-300 group-hover:text-[#F5F2EC]" style={{ color: "#D98038" }}>
                {s.icon}
              </div>
              <p className="font-body text-xs leading-snug transition-colors duration-300 group-hover:text-[#F5F2EC]" style={{ color: "#260000" }}>
                {s.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-8 md:p-12 border-l-4"
          style={{ backgroundColor: "#260000", borderLeftColor: "#750006" }}
        >
          <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#D98038" }}>
            African footprint
          </p>
          <h3
            className="font-heading mb-3"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F5F2EC", letterSpacing: "-0.01em", textWrap: "balance" } as React.CSSProperties}
          >
            Operating across Kenya, Uganda, Tanzania, Ghana, South Sudan and beyond
          </h3>
          <p className="font-body text-sm" style={{ color: "rgba(217,171,136,0.6)" }}>
            Kenya · Uganda · Rwanda · Ethiopia · South Sudan · Zambia · Ghana · Tanzania
          </p>
        </motion.div>
      </div>
    </section>
  );
}
