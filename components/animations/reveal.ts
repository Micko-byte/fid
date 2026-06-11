/**
 * Shared Framer Motion animation variants — editorial / premium feel
 */

// Clip-path line wipe: text reveals from bottom (masked)
export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Soft fade + rise (existing pattern, wrapped for consistency)
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Slide in from left
export const slideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Slide in from right
export const slideRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Scale-in reveal (for images / cards)
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Horizontal line draw (for hairlines)
export const lineDraw = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};
