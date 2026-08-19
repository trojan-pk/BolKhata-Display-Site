"use client";

import { motion, useReducedMotion } from "framer-motion";
import { oversight } from "@/lib/content";
import { EASE, VIEW, slideLeft, slideRight, stagger } from "@/lib/motion";

const cardVariants = [slideLeft, slideRight, slideLeft, slideRight];

/**
 * Oversight Section: 4 audit guarantee cards animated with alternating lateral
 * slide-ins, animated ledger checkmarks, and hover micro-interactions.
 */
export default function Oversight() {
  const still = useReducedMotion();

  return (
    <motion.ul
      variants={still ? undefined : stagger(0.12, 0.1)}
      initial={still ? undefined : "hidden"}
      whileInView={still ? undefined : "shown"}
      viewport={VIEW}
      className="grid gap-5 md:grid-cols-2"
    >
      {oversight.map((item, i) => (
        <motion.li
          key={item.title}
          variants={still ? undefined : cardVariants[i % cardVariants.length]}
          whileHover={
            still
              ? undefined
              : { y: -5, scale: 1.015, transition: { duration: 0.25, ease: EASE } }
          }
          className="group/card relative min-w-0 rounded-card border border-line bg-paper p-[clamp(1.25rem,0.75rem+1.5vw,1.75rem)] transition-all duration-300 ease-ledger hover:border-accent hover:shadow-card"
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-ledger border border-accent-line bg-accent-soft text-accent group-hover/card:scale-110 group-hover/card:bg-accent group-hover/card:text-paper transition-all duration-300"
            >
              <svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 8.5 6 12l7.5-8" />
              </svg>
            </span>
            <span className="figure text-micro font-bold tracking-[0.06em] text-accent opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
              AUDIT GUARANTEE
            </span>
          </div>

          <h3 className="mb-2 text-ink font-semibold text-lg group-hover/card:text-accent transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm leading-[1.65] text-ink-2 font-medium">{item.body}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
