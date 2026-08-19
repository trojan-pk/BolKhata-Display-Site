"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { rise, stagger, typeLine } from "@/lib/motion";

import ImageTrail from "./ImageTrail";

/* One container drives the whole introduction, in reading order, so the timing
   lives in one place instead of being scattered across per-element delays. */
const container = stagger(0.085, 0.05);

/* One mask per headline line: the span starts pushed below its own box, so the
   line rises into place rather than fading in. The padding / negative-margin
   pair keeps descenders from being clipped — sized for the italic serif's
   deeper descenders, not the sans's. */
const lineMask =
  "block overflow-visible pb-[0.16em] -mb-[0.16em]";

const action =
  "inline-flex items-center justify-center gap-2 rounded-ledger px-5 py-3 text-sm font-medium tracking-[-0.012em] transition-[background-color,border-color,color] duration-200 ease-ledger w-full sm:w-auto";

/**
 * A single centred statement, held in the middle of the viewport.
 *
 * When the user scrolls, the left side of the headline & CTA split to the left edge,
 * and the right side splits to the right edge, allowing the section directly below
 * to smoothly rise up into view.
 */
export default function Hero() {
  const still = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Left split transformations (Line 1 + Left CTA)
  const leftX = useTransform(scrollYProgress, [0, 0.65], ["0vw", "-100vw"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Right split transformations (Line 2 + Right CTA)
  const rightX = useTransform(scrollYProgress, [0, 0.65], ["0vw", "100vw"]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // With reduced motion the cascade collapses to its final state: same markup,
  // no movement, nothing left hidden waiting on an animation to finish.
  const cascade = still
    ? {}
    : { initial: "hidden" as const, animate: "shown" as const };

  return (
    <div ref={targetRef} className="relative h-[115vh] sm:h-[135vh]">
      <div className="sticky top-16 w-full">
        <ImageTrail>
          <section
            id="top"
            className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 sm:px-gutter py-8 sm:py-12 text-center overflow-hidden"
          >
            <motion.div
              variants={container}
              {...cascade}
              className="flex w-full max-w-[52rem] flex-col items-center"
            >
              <h1 className="mb-6 sm:mb-7 text-center">
                <span className={lineMask}>
                  <motion.span
                    style={still ? undefined : { x: leftX, opacity: leftOpacity }}
                    variants={typeLine}
                    className="block text-center will-change-transform"
                  >
                    Bookkeeping that happens
                  </motion.span>
                </span>
                <span className={lineMask}>
                  <motion.span
                    style={still ? undefined : { x: rightX, opacity: rightOpacity }}
                    variants={typeLine}
                    className="spoken block text-center tracking-[-0.02em] will-change-transform"
                  >
                    as you speak.
                  </motion.span>
                </span>
              </h1>

              <motion.div
                variants={rise}
                className="mt-8 sm:mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center justify-center px-4 sm:px-0"
              >
                <motion.div
                  className="w-full sm:w-auto"
                  style={still ? undefined : { x: leftX, opacity: leftOpacity }}
                >
                  <a
                    href="#access"
                    className={`${action} bg-ink text-paper hover:bg-ink/88`}
                  >
                    Request access
                  </a>
                </motion.div>

                <motion.div
                  className="w-full sm:w-auto"
                  style={still ? undefined : { x: rightX, opacity: rightOpacity }}
                >
                  <a
                    href="#record"
                    className={`${action} group/see border border-line bg-paper text-ink hover:border-ink-3`}
                  >
                    See a day&rsquo;s record
                    <svg
                      viewBox="0 0 16 16"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-ledger group-hover/see:translate-x-0.5"
                    >
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ---- cue: there is something directly below this ---------------- */}
            <motion.p
              aria-hidden="true"
              style={still ? undefined : { opacity: cueOpacity }}
              initial={still ? undefined : { opacity: 0 }}
              animate={still ? undefined : { opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
            >
              <span className="label">One entry, spoken</span>
              <span className="h-6 w-px bg-linear-to-b from-line to-transparent" />
            </motion.p>
          </section>
        </ImageTrail>
      </div>
    </div>
  );
}
