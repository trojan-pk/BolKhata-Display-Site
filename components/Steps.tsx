"use client";

import { motion, useReducedMotion } from "framer-motion";
import { steps } from "@/lib/content";
import { EASE, VIEW, flipUp, slideLeft, slideRight, stagger } from "@/lib/motion";

const stepVariants = [slideLeft, flipUp, slideRight];

/**
 * Method sequence steps: enhanced with varied motion, glowing step nodes,
 * and interactive card hover micro-interactions.
 */
export default function Steps() {
  const still = useReducedMotion();

  return (
    <div className="relative pt-2">
      {/* Sequence connecting line with animated glow path */}
      <div
        aria-hidden="true"
        className="absolute top-[0.3125rem] bottom-[0.3125rem] left-[5px] w-0.5 overflow-hidden bg-line md:inset-x-0 md:top-[5px] md:bottom-auto md:h-0.5 md:w-auto"
      >
        <motion.span
          initial={still ? undefined : { scale: 0 }}
          whileInView={still ? undefined : { scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.25, ease: EASE, delay: 0.15 }}
          className="block size-full origin-top-left bg-gradient-to-r from-accent via-accent-hover to-accent"
        />
      </div>

      <motion.ol
        variants={still ? undefined : stagger(0.18, 0.15)}
        initial={still ? undefined : "hidden"}
        whileInView={still ? undefined : "shown"}
        viewport={VIEW}
        className="grid gap-8 md:grid-cols-3 md:gap-[clamp(1.5rem,0.5rem+2.5vw,2.75rem)]"
      >
        {steps.map((item, i) => (
          <motion.li
            key={item.step}
            variants={still ? undefined : stepVariants[i % stepVariants.length]}
            whileHover={
              still
                ? undefined
                : { y: -5, transition: { duration: 0.25, ease: EASE } }
            }
            className="group relative min-w-0 rounded-card border border-transparent p-5 md:pt-8 md:px-5 transition-all duration-300 hover:border-accent-line hover:bg-paper hover:shadow-card"
          >
            {/* Pulsing Step Node Dot */}
            <span
              aria-hidden="true"
              className="absolute top-[0.3125rem] left-0 size-3 rounded-full border-2 border-accent bg-paper shadow-[0_0_0_4px_var(--ground)] md:top-0 md:left-5 group-hover:scale-125 transition-transform duration-300"
            >
              <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping opacity-75" />
            </span>

            <div className="mb-4 flex items-center gap-3">
              <span className="figure text-xs font-bold tracking-[0.06em] text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-accent-line">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="label text-ink font-bold tracking-wider">{item.step}</span>
            </div>

            <h3 className="mb-2.5 text-ink font-semibold text-lg group-hover:text-accent transition-colors duration-200">
              {item.title}
            </h3>
            <p className="max-w-[34ch] text-sm leading-[1.65] text-ink-2 font-medium">
              {item.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
