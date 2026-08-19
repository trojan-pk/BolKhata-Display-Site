"use client";

import { motion, useReducedMotion } from "framer-motion";
import { capabilities } from "@/lib/content";
import { VIEW, rise, stagger } from "@/lib/motion";

/**
 * Eight capabilities, set as a ruled table rather than eight cards. A rule per
 * cell keeps the list feeling like a schedule of contents — which is what it
 * is — and stops the section competing with the day book below it.
 */
export default function Capabilities() {
  const still = useReducedMotion();

  return (
    <motion.ul
      variants={still ? undefined : stagger(0.055, 0.08)}
      initial={still ? undefined : "hidden"}
      whileInView={still ? undefined : "shown"}
      viewport={VIEW}
      className="grid gap-x-[clamp(1.25rem,0.5rem+2vw,2.5rem)] gap-y-8 sm:grid-cols-2 wide:grid-cols-4"
    >
      {capabilities.map((item, i) => (
        <motion.li
          key={item.title}
          variants={still ? undefined : rise}
          className="min-w-0 border-t border-line pt-4"
        >
          <span className="figure mb-2.5 block text-micro tracking-[0.06em] text-ink-2 font-semibold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-1.5 text-body font-semibold tracking-[-0.02em] text-ink">
            {item.title}
          </h3>
          <p className="text-sm leading-[1.6] text-ink-2 font-medium">{item.body}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
