"use client";

import { motion, useReducedMotion } from "framer-motion";
import { oversight } from "@/lib/content";
import { VIEW, rise, stagger } from "@/lib/motion";

/**
 * The four oversight guarantees. These carry the most weight of anything on
 * the page — an agent posting to your books is only acceptable if you can see
 * and undo what it did — so they get real surface and room, not a tight grid.
 */
export default function Oversight() {
  const still = useReducedMotion();

  return (
    <motion.ul
      variants={still ? undefined : stagger(0.09, 0.1)}
      initial={still ? undefined : "hidden"}
      whileInView={still ? undefined : "shown"}
      viewport={VIEW}
      className="grid gap-4 md:grid-cols-2"
    >
      {oversight.map((item) => (
        <motion.li
          key={item.title}
          variants={still ? undefined : rise}
          className="group/card min-w-0 rounded-card border border-line bg-paper p-[clamp(1.25rem,0.75rem+1.5vw,1.75rem)] transition-colors duration-300 ease-ledger hover:border-accent-line"
        >
          <span
            aria-hidden="true"
            /* a check that reads as a ledger tick, not a UI affordance */
            className="mb-4 grid size-7 place-items-center rounded-ledger border border-accent-line bg-accent-soft text-accent"
          >
            <svg
              viewBox="0 0 16 16"
              width="11"
              height="11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8.5 6 12l7.5-8" />
            </svg>
          </span>

          <h3 className="mb-2">{item.title}</h3>
          <p className="text-sm leading-[1.62] text-ink-2">{item.body}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
