"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion";

type ImageComparisonContextType = {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  motionSliderPosition: ReturnType<typeof useSpring>;
};

const ImageComparisonContext = createContext<ImageComparisonContextType | undefined>(undefined);

type ImageComparisonProps = {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

export function ImageComparison({ children, className, enableHover, springOptions }: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? { bounce: 0, duration: 0 });

  const handleDrag = (clientX: number) => {
    if (!isDragging && !enableHover) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    motionValue.set(pct);
    setSliderPosition(pct);
  };

  return (
    <ImageComparisonContext.Provider value={{ sliderPosition, setSliderPosition, motionSliderPosition }}>
      <div
        ref={containerRef}
        className={className}
        style={{ position: "relative", overflow: "hidden", cursor: enableHover ? "ew-resize" : "col-resize", userSelect: "none" }}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => handleDrag(e.clientX)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientX)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

type ImageProps = {
  src: string;
  alt: string;
  position: "left" | "right";
  style?: React.CSSProperties;
};

export function ImageComparisonImage({ src, alt, position, style }: ImageProps) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonImage must be used within ImageComparison");
  const { motionSliderPosition } = ctx;
  const clip = useTransform(motionSliderPosition, (v) =>
    position === "left" ? `inset(0 ${100 - v}% 0 0)` : `inset(0 0 0 ${v}%)`
  );
  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: clip, ...style }}
    />
  );
}

export function ImageComparisonSlider({ className, children }: { className?: string; children?: ReactNode }) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonSlider must be used within ImageComparison");
  const { motionSliderPosition } = ctx;
  const left = useTransform(motionSliderPosition, (v) => `${v}%`);
  return (
    <motion.div
      className={className}
      style={{ position: "absolute", top: 0, bottom: 0, left, transform: "translateX(-50%)", width: "2px", background: "rgba(255,255,255,0.6)" }}
    >
      {children}
    </motion.div>
  );
}
