"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";

const articles = [
  { title: "The rise of creator-led marketing in Africa", date: "May 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Why experiential marketing builds cultural relevance", date: "April 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Entering African markets: why local insight matters", date: "March 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "AI, fashion and the future of content production in Africa", date: "February 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "Communicating at scale: lessons from national campaigns", date: "January 2026", href: "https://www.linkedin.com/company/fid-pr/" },
  { title: "How hospitality brands build lifestyle relevance", date: "December 2025", href: "https://www.linkedin.com/company/fid-pr/" },
];

export default function Insights() {
  const ref = useRef(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });

  return (
    <section id="insights" className="py-24 md:py-40" style={{ backgroundColor: "#F5F2EC" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body text-xs tracking-[0.25em] uppercase"
            style={{ color: "#D98038" }}
          >
            Our thinking
          </motion.p>
          <Link
            href="/insights"
            className="font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 hidden md:block"
            style={{ color: "rgba(38,0,0,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#750006")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(38,0,0,0.4)")}
          >
            All articles →
          </Link>
        </div>

        <div>
          {articles.map((a, i) => (
            <motion.a
              key={i}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.05 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between py-7 border-t relative overflow-hidden"
              style={{ borderColor: "rgba(38,0,0,0.1)" }}
            >
              {/* Hover sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundColor: "rgba(117,0,6,0.04)", transformOrigin: "left" }}
              />

              <div className="flex items-baseline gap-8 relative z-10">
                <span className="font-body text-xs flex-shrink-0 hidden md:block" style={{ color: "rgba(38,0,0,0.3)" }}>
                  {a.date}
                </span>
                <h3
                  className="font-heading leading-tight group-hover:text-[#750006] transition-colors duration-200"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#260000", letterSpacing: "-0.01em" }}
                >
                  {a.title}
                </h3>
              </div>
              <motion.div
                className="relative z-10 flex-shrink-0 ml-6"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowUpRight
                  size={16}
                  className="transition-colors duration-200 group-hover:text-[#750006]"
                  style={{ color: "rgba(38,0,0,0.2)" }}
                />
              </motion.div>
            </motion.a>
          ))}
          <div className="border-t" style={{ borderColor: "rgba(38,0,0,0.1)" }} />
        </div>
      </div>
    </section>
  );
}
