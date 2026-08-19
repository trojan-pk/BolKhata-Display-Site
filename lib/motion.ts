import type { Variants } from "framer-motion";

/**
 * The page's motion vocabulary, in one place.
 *
 * Everything shares a single easing curve — the same one CSS uses as --ease —
 * so JS-driven and CSS-driven movement on the page can't drift apart. Motion
 * here is only ever a reveal: nothing loops, nothing draws attention to itself
 * twice, and every animated element is legible in its final state.
 */

export const EASE = [0.22, 0.85, 0.32, 1] as const;

/** Shared viewport rule: reveal once, slightly before the element is centred. */
export const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** A parent that releases its children one after another. */
export const stagger = (each = 0.09, delay = 0.06): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** The default child: up and in. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

/**
 * A line of type rising out of its own mask. The parent must clip overflow,
 * and the offset exceeds 100% so descenders clear the box before they show.
 */
export const typeLine: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};
