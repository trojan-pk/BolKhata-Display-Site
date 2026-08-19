import type { Variants } from "framer-motion";

/**
 * The page's motion vocabulary, offering distinct, varied Framer Motion animations.
 * Shared easing curve matching the design system token `--ease-ledger`.
 */

export const EASE = [0.22, 0.85, 0.32, 1] as const;

/** Shared viewport rule: reveal once, slightly before the element is centered. */
export const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** A parent that releases its children one after another. */
export const stagger = (each = 0.085, delay = 0.04): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Standard rise up reveal */
export const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

/** Zoom & scale reveal */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

/** Slide in from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.72, ease: EASE } },
};

/** Slide in from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.72, ease: EASE } },
};

/** 3D Perspective tilt rise reveal */
export const flipUp: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 12 },
  shown: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.78, ease: EASE },
  },
};

/** Headline line reveal rising out of mask */
export const typeLine: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};
