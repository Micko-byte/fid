"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Extra delay before the first word starts (seconds) */
  delay?: number;
  /** Gap between each word animation (seconds) */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote";
}

export default function TextReveal({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.055,
  as: Tag = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const words = text.split(" ");

  return (
    // @ts-expect-error polymorphic tag
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.28em", verticalAlign: "bottom" }}
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.78,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
