"use client";

import { motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/lib/content";
import { EASE, VIEW, flipUp, rise, slideLeft, slideRight, stagger, zoomIn } from "@/lib/motion";

const itemVariants = [zoomIn, rise, flipUp, slideLeft, slideRight, zoomIn, rise, flipUp];

/**
 * Scope Section Capabilities: grid of 8 capabilities with varied stagger,
 * interactive card lifts, and border accent highlights.
 */
export default function Capabilities() {
  const still = useReducedMotion();

  return (
    <motion.ul
      variants={still ? undefined : stagger(0.065, 0.08)}
      initial={still ? undefined : "hidden"}
      whileInView={still ? undefined : "shown"}
      viewport={VIEW}
      className="grid gap-x-[clamp(1.25rem,0.5rem+2vw,2.5rem)] gap-y-8 sm:grid-cols-2 wide:grid-cols-4"
    >
      {capabilities.map((item, i) => (
        <motion.li
          key={item.title}
          variants={still ? undefined : itemVariants[i % itemVariants.length]}
          whileHover={
            still
              ? undefined
              : { y: -4, transition: { duration: 0.2, ease: EASE } }
          }
          className="group min-w-0 rounded-card border-t-2 border-line bg-paper/50 p-4 transition-all duration-300 hover:border-accent hover:bg-paper hover:shadow-md"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="figure text-xs font-bold tracking-[0.06em] text-accent bg-accent-soft px-2 py-0.5 rounded border border-accent-line">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="size-1.5 rounded-full bg-line group-hover:bg-accent transition-colors duration-200" />
          </div>
          <h3 className="mb-1.5 text-body font-bold tracking-[-0.02em] text-ink group-hover:text-accent transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm leading-[1.6] text-ink-2 font-medium">{item.body}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
