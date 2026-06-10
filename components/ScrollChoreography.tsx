"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface ScrollChoreographyProps {
  className?: string;
  images: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

function imageSrc(src: string) {
  return src.replace(/^public\//, "/");
}

function Tile({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const safeSrc = imageSrc(src);
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !safeSrc || failed;
  return (
    <div className={cx("absolute left-1/2 top-1/2 overflow-hidden bg-[#e8e8e8]", className)}>
      {!showPlaceholder ? (
        <img
          src={safeSrc}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-end justify-start bg-[linear-gradient(135deg,#ececec,#f6f6f6)] p-5">
          <div className="max-w-[16ch]">
            <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-[#2a2a2a]/70">Image upload</p>
            <p className="text-[27px] leading-[0.88] text-[#2a2a2a]">{alt}</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 border border-[rgba(42,42,42,0.12)]" />
      <div className="absolute left-4 top-4 rounded-full bg-[#2a2a2a] px-3 py-1 text-[12px] uppercase tracking-[0.18em] text-[#f0f0f0]">
        MORE +
      </div>
    </div>
  );
}

export function ScrollChoreography({ className, images }: ScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 50,
    mass: 1.2,
    restDelta: 0.001,
  });

  const xLeft = "-20vw";
  const xRight = "20vw";
  const yTop = "-14vh";
  const yBottom = "14vh";

  const tlX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const tlY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yBottom, yBottom, "0vh", "0vh"]);

  const brX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const brY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yTop, yTop, "0vh", "0vh"]);

  const blX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"]);
  const blY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yBottom, yBottom, "0vh", "0vh"]);

  const trX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, "0vw", "0vw"]);
  const trY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yTop, yTop, "0vh", "0vh"]);

  const heroWidth = useTransform(smoothProgress, [0.65, 0.7, 0.9, 1], ["36vw", "36vw", "100vw", "100vw"]);
  const heroHeight = useTransform(smoothProgress, [0.65, 0.7, 0.9, 1], ["24vh", "24vh", "100vh", "100vh"]);

  const underImagesOpacity = useTransform(smoothProgress, [0.75, 0.85], [1, 0]);

  const baseImageClasses =
    "h-[24vh] w-[36vw] -translate-x-1/2 -translate-y-1/2 will-change-transform md:h-[24vh] md:w-[36vw]";

  return (
    <div ref={containerRef} className={cx("relative h-[300vh] w-full", className)}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div style={{ x: tlX, y: tlY, opacity: underImagesOpacity }} className={cx("z-10", baseImageClasses)}>
            <Tile src={images.topLeft} alt="Top Left" className="h-full w-full" />
          </motion.div>

          <motion.div style={{ x: brX, y: brY, opacity: underImagesOpacity }} className={cx("z-20", baseImageClasses)}>
            <Tile src={images.bottomRight} alt="Bottom Right" className="h-full w-full" />
          </motion.div>

          <motion.div style={{ x: blX, y: blY, opacity: underImagesOpacity }} className={cx("z-30", baseImageClasses)}>
            <Tile src={images.bottomLeft} alt="Bottom Left" className="h-full w-full" />
          </motion.div>

          <motion.div
            style={{
              x: trX,
              y: trY,
              width: heroWidth,
              height: heroHeight,
            }}
            className={cx("z-40 origin-center", baseImageClasses)}
          >
            <Tile src={images.topRight} alt="Top Right (Hero)" className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
