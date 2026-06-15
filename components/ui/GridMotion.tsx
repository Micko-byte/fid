"use client";

import { useEffect, useRef, type FC, type ReactNode } from "react";
import { gsap } from "gsap";

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = "#ede2ca" }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(typeof window !== "undefined" ? window.innerWidth / 2 : 0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const handleMouseMove = (e: MouseEvent) => { mouseXRef.current = e.clientX; };
    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
          gsap.to(row, { x: moveAmount, duration: baseDuration + inertiaFactors[index % inertiaFactors.length], ease: "power3.out", overwrite: "auto" });
        }
      });
    };
    const remove = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); remove(); };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: `
            radial-gradient(circle at 25% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 22%, transparent 60%),
            radial-gradient(circle at 78% 18%, rgba(241,225,148,0.22) 0%, transparent 28%),
            radial-gradient(circle, ${gradientColor} 0%, transparent 72%)
          `,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(120deg, rgba(26,26,26,0.04) 0, rgba(26,26,26,0.04) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, rgba(26,26,26,0.035) 0, rgba(26,26,26,0.035) 1px, transparent 1px, transparent 64px)",
            opacity: 0.55,
            mixBlendMode: "multiply",
          }}
        />
        <div className="gap-4 flex-none relative w-[130vw] h-[130vh] grid grid-rows-4 grid-cols-1 rotate-[-12deg] origin-center z-[2]">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div key={rowIndex} className="grid gap-4 grid-cols-7" style={{ willChange: "transform, filter" }} ref={(el) => { if (el) rowRefs.current[rowIndex] = el; }}>
              {Array.from({ length: 7 }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div
                      className="relative w-full h-full overflow-hidden rounded-[0px] border border-white/30 bg-[rgba(255,255,255,0.18)] flex items-center justify-center text-[#1a1a1a] text-[1.5rem]"
                      style={{
                        boxShadow: "0 12px 40px rgba(26,26,26,0.08)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {typeof content === "string" && content.startsWith("/") ? (
                        <div className="w-full h-full bg-cover bg-center absolute top-0 left-0" style={{ backgroundImage: `url(${content})` }} />
                      ) : (
                        <div className="p-4 text-center z-[1]">{content}</div>
                      )}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, rgba(91,14,20,0.05) 100%)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GridMotion;
