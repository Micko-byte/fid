"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WireframeOrb = dynamic(() => import("@/components/graphics/WireframeOrb"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { word: "INSIGHT", num: "01" },
  { word: "STRATEGY", num: "02" },
  { word: "IMPACT", num: "03" },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      pillarsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-24 md:py-40 relative overflow-hidden"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <WireframeOrb
        color="#750006"
        accentColor="#D98038"
        opacity={0.06}
        speed={0.6}
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[480px] h-[480px] hidden md:block"
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16">
        <p className="font-body text-xs tracking-[0.25em] uppercase mb-20" style={{ color: "#D98038" }}>
          Our approach
        </p>

        <div className="relative flex gap-8 md:gap-20">
          <div className="hidden md:block relative w-px self-stretch flex-shrink-0" style={{ backgroundColor: "rgba(38,0,0,0.08)" }}>
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full origin-top"
              style={{ backgroundColor: "#D9AB88", height: "100%", transform: "scaleY(0)" }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-16 md:gap-24">
            {pillars.map((p, i) => (
              <div
                key={i}
                ref={(el) => { pillarsRef.current[i] = el; }}
              >
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#D98038" }}>
                  {p.num}
                </p>
                <h2
                  className="font-heading leading-none"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 7rem)",
                    color: "#260000",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {p.word}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
