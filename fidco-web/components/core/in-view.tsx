"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useInView,
  type Variant,
  type Transition,
} from "framer-motion";

type InViewProps = {
  children: ReactNode;
  variants?: { hidden: Variant; visible: Variant };
  transition?: Transition;
  viewOptions?: Parameters<typeof useInView>[1];
  className?: string;
  style?: React.CSSProperties;
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Scroll-reveal wrapper (adapted from motion-primitives, on framer-motion).
 * Children with their own `variants` are staggered when the container's
 * transition sets staggerChildren.
 */
export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  className,
  style,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default InView;
