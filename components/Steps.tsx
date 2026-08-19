"use client";

import { motion, useReducedMotion } from "framer-motion";
import { steps } from "@/lib/content";
import { EASE, VIEW, rise, stagger } from "@/lib/motion";

/**
 * The three steps are a genuine sequence, so they get a sequence's treatment:
 * one rule running through all three, drawing itself as the section arrives,
 * with a node where each step sits on it.
 */
export default function Steps() {
  const still = useReducedMotion();

  return (
    <div className="relative">
      {/* The rule is a sibling of the list, not a child — an <ol> may only
          contain list items. Vertical while the steps are stacked, horizontal
          once they line up, so the sequence never loses its thread. */}
      <div
        aria-hidden="true"
        className="absolute top-[0.3125rem] bottom-[0.3125rem] left-[3px] w-px overflow-hidden bg-line md:inset-x-0 md:top-[3px] md:bottom-auto md:h-px md:w-auto"
      >
        {/* Scaled uniformly rather than on one axis, so the same animation
            draws the rule downward while it is vertical and rightward once it
            is horizontal. The off-axis growth is 0 → 1px, imperceptible. */}
        <motion.span
          initial={still ? undefined : { scale: 0 }}
          whileInView={still ? undefined : { scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.15, ease: EASE, delay: 0.1 }}
          className="block size-full origin-top-left bg-accent-line"
        />
      </div>

      <motion.ol
        variants={still ? undefined : stagger(0.14, 0.12)}
        initial={still ? undefined : "hidden"}
        whileInView={still ? undefined : "shown"}
        viewport={VIEW}
        className="grid gap-10 md:grid-cols-3 md:gap-[clamp(1.5rem,0.5rem+2.5vw,2.75rem)]"
      >
        {steps.map((item, i) => (
          <motion.li
            key={item.step}
            variants={still ? undefined : rise}
            className="relative min-w-0 pl-7 md:pt-7 md:pl-0"
          >
            {/* the ring punches the rule out around the node, so they never touch */}
            <span
              aria-hidden="true"
              className="absolute top-[0.3125rem] left-0 size-[7px] rounded-full border border-accent bg-paper shadow-[0_0_0_4px_var(--ground)] md:top-0"
            />

            <p className="mb-3.5 flex items-baseline gap-2.5">
              <span className="figure text-micro font-medium tracking-[0.06em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="label text-ink-2">{item.step}</span>
            </p>

            <h3 className="mb-2.5">{item.title}</h3>
            <p className="max-w-[34ch] text-sm leading-[1.62] text-ink-2">
              {item.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
