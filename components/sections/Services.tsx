"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

const services = [
  { num: "01", title: "Strategic Communications & PR" },
  { num: "02", title: "Media Management & Buying" },
  { num: "03", title: "Influencer, Creator & Talent" },
  { num: "04", title: "Digital Strategy & Social Media" },
  { num: "05", title: "Experiential Marketing & Events" },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-20">
          <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "#D98038" }}>
            What we do
          </p>
          <Link
            href="/services"
            className="font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 hidden md:block"
            style={{ color: "rgba(38,0,0,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,0,0.4)")}
          >
            All services →
          </Link>
        </div>
        <div>
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex items-baseline justify-between py-8 border-t"
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              <h3
                className="font-heading leading-none"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
                  color: "#260000",
                  letterSpacing: "-0.02em",
                }}
              >
                {svc.title}
              </h3>
              <span className="font-body text-xs ml-8 flex-shrink-0" style={{ color: "rgba(38,0,0,0.25)" }}>
                {svc.num}
              </span>
            </motion.div>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}
