"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
};

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

/**
 * Scrambles into the final text on mount/in-view (motion-primitives style).
 */
export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = DEFAULT_CHARS,
  as: Tag = "span",
  className,
  style,
}: TextScrambleProps) {
  const text = children;
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const steps = duration / speed;
      let step = 0;
      const interval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < (step / steps) * text.length) return text[i];
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join("");
        setDisplay(scrambled);
        step++;
        if (step > steps) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed * 1000);
    };
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && run(),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, duration, speed, characterSet]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {display}
    </Tag>
  );
}

export default TextScramble;
