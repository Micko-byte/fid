"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const OrbitalRings = dynamic(() => import("@/components/graphics/OrbitalRings"), { ssr: false });

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#750006" }}
    >
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(245,242,236,0.03) 0px, rgba(245,242,236,0.03) 1px, transparent 1px, transparent 60px)",
        }}
      />
      <OrbitalRings color="#F5F2EC" opacity={0.07} className="absolute right-0 top-0 h-full w-1/2 hidden md:block" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="md:flex md:items-end md:justify-between gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading leading-none mb-8 md:mb-0"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#F5F2EC",
              letterSpacing: "-0.02em",
              textWrap: "balance",
              maxWidth: "16ch",
            } as React.CSSProperties}
          >
            Let's build something meaningful.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
          >
            <motion.button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.97 }}
              className="font-body text-sm px-10 py-4 transition-colors duration-200 cursor-pointer"
              style={{ backgroundColor: "#F5F2EC", color: "#750006", letterSpacing: "0.05em" }}
            >
              Book us
            </motion.button>
            <a
              href="mailto:info@fidco.africa"
              className="font-body text-sm px-10 py-4 border transition-colors duration-200 text-center"
              style={{ borderColor: "rgba(245,242,236,0.3)", color: "#F5F2EC", letterSpacing: "0.05em" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(245,242,236,0.3)")}
            >
              info@fidco.africa
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
