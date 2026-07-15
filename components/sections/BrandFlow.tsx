"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  "/logos/executive-office-president.png",
  "/logos/lc-waikiki.png",
  "/logos/unhcr.png",
  "/logos/columbia-africa.png",
  "/logos/state-dept-culture.png",
  "/logos/chloride-exide.png",
  "/logos/thrive-hospitality.png",
  "/logos/amahoro-coalition.png",
  "/logos/bomas-of-kenya.png",
  "/logos/wrc-safari-rally.svg",
  "/logos/elysium-capital.png",
  "/logos/medigah-london-hair.png",
  "/logos/abyan-salon-spa.png",
  "/logos/2nu-kollexion.png",
];

const proof = [
  { label: "Government", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/national-minorities-day" },
  { label: "Culture", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/tribe-vibe" },
  { label: "Healthcare", image: "https://res.cloudinary.com/dnrj0hbpy/image/upload/f_auto,q_auto/FID/columbia-building" },
];

export default function BrandFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const proofGridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!proofGridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = proofGridRef.current!.querySelectorAll<HTMLElement>(".proof-card img");
      // Each card image moves at a different vertical speed — creates depth parallax
      const speeds = [0.55, 0.35, 0.45];
      cards.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: -50 * speeds[i],
            ease: "none",
            scrollTrigger: {
              trigger: proofGridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, proofGridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="fid-section section-light brand-proof" style={{ backgroundColor: "#f5f2ec", position: "relative" }}>
      {/* Brand texture overlay */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(217,128,56,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 100% 0%, rgba(117,0,6,0.06) 0%, transparent 55%)" }} />
      <div aria-hidden className="brand-pattern" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.55 }} />
      <div ref={ref} className="section-shell">
        <div className="fid-editorial-head">
          <span className="fid-section-num">03</span>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="type-eyebrow"
              style={{ color: "#750006" }}
            >
              Trusted by
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="type-h2"
              style={{ maxWidth: "17ch", margin: "1rem 0 0", color: "#1c1c1c" }}
            >
              Proof across public, private and cultural life.
            </motion.h2>
          </div>
        </div>

        <motion.div
          ref={proofGridRef}
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="proof-grid"
        >
          {proof.map((item) => (
            <figure key={item.label} className="fid-art-panel proof-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.label} loading="lazy" className="fid-image" />
              <figcaption className="fid-caption">{item.label}</figcaption>
            </figure>
          ))}
        </motion.div>

        <div className="logo-flow" aria-label="Selected client logos">
          <InfiniteSlider gap={18} speed={32} speedOnHover={16}>
            {logos.map((src, i) => (
              <div key={i} className="logo-chip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>

      <style>{`
        .proof-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: clamp(1rem, 2vw, 1.4rem);
          align-items: stretch;
        }
        .proof-card {
          position: relative;
          min-height: clamp(280px, 32vw, 440px);
          margin: 0;
          background: #260000;
        }
        .proof-card:nth-child(2) { margin-top: clamp(2rem, 5vw, 4rem); }
        .proof-card:nth-child(3) { margin-top: clamp(1rem, 3vw, 2rem); }
        .proof-card img {
          filter: saturate(0.92) contrast(1.04);
          transition: transform 0.8s var(--ease-out), filter 0.8s var(--ease-out);
        }
        .proof-card:hover img {
          transform: scale(1.04);
          filter: saturate(1.06) contrast(1.04);
        }
        .proof-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(38,0,0,0.06), rgba(38,0,0,0.72));
        }
        .proof-card figcaption {
          position: absolute;
          left: clamp(1rem, 2vw, 1.4rem);
          bottom: clamp(1rem, 2vw, 1.4rem);
          z-index: 1;
          color: #f5f2ec;
        }
        .logo-flow {
          margin-top: clamp(2rem, 5vw, 4rem);
          padding: clamp(1rem, 2vw, 1.4rem) 0;
          border-top: 1px solid rgba(117,0,6,0.14);
          border-bottom: 1px solid rgba(117,0,6,0.14);
        }
        .logo-chip {
          flex-shrink: 0;
          height: clamp(60px, 7vw, 82px);
          width: clamp(146px, 16vw, 196px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245,242,236,0.92);
          border: 1px solid rgba(117,0,6,0.08);
          border-radius: 14px;
          padding: 0.9rem 1.2rem;
        }
        .logo-chip img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        @media (max-width: 820px) {
          .proof-grid { grid-template-columns: 1fr; }
          .proof-card:nth-child(n) { margin-top: 0; min-height: 280px; }
        }
      `}</style>
    </section>
  );
}
