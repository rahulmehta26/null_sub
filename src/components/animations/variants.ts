import type { TargetAndTransition, Variants } from "motion/react";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};
