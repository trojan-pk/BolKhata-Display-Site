"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  "block overflow-hidden pb-[0.16em] -mb-[0.16em] motion-reduce:overflow-visible";

const action =
  "inline-flex items-center justify-center gap-2 rounded-ledger px-5 py-3 text-sm font-medium tracking-[-0.012em] transition-[background-color,border-color,color] duration-200 ease-ledger";

/**
 * A single centred statement, held in the middle of the viewport.
 *
 * When scrolling down, the heading lines and CTA buttons split apart:
 * line 1 moves upward out of view, while line 2 and CTAs move downward and fade,
 * allowing the section directly below to seamlessly reveal itself.
 */
export default function Hero() {
  const still = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of the hero section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll transforms for split exit:
  // Line 1 moves UP & out as user scrolls
  const line1Y = useTransform(scrollYProgress, [0, 0.6], [0, -180]);
  const line1Opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Line 2 moves DOWN & out as user scrolls
  const line2Y = useTransform(scrollYProgress, [0, 0.6], [0, 180]);
  const line2Opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // CTA buttons move DOWN & out as user scrolls
  const ctaY = useTransform(scrollYProgress, [0, 0.6], [0, 240]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Scroll cue fades out quickly on scroll
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // With reduced motion the cascade collapses to its final state
  const cascade = still
    ? {}
    : { initial: "hidden" as const, animate: "shown" as const };

  return (
    <ImageTrail>
      <section
        ref={sectionRef}
        id="top"
        /* Exact viewport height minus sticky header height (~4rem) so content is
           optically and mathematically centered in the visible area below header. */
        className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-gutter py-12 text-center"
      >
        <motion.div
          variants={container}
          {...cascade}
          className="flex w-full max-w-[52rem] flex-col items-center"
        >
          <h1 className="mb-7 text-center">
            <span className={lineMask}>
              <motion.span
                variants={typeLine}
                style={still ? undefined : { y: line1Y, opacity: line1Opacity }}
                className="block text-center will-change-transform"
              >
                Bookkeeping that happens
              </motion.span>
            </span>
            <span className={lineMask}>
              {/* The half of the sentence about speaking is set in the same face
                  the site uses for every spoken word. The serif needs far less
                  negative tracking than the sans to sit at this size. */}
              <motion.span
                variants={typeLine}
                style={still ? undefined : { y: line2Y, opacity: line2Opacity }}
                className="spoken block text-center tracking-[-0.02em] will-change-transform"
              >
                as you speak.
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={rise}
            style={still ? undefined : { y: ctaY, opacity: ctaOpacity }}
            className="mt-10 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href="#access"
              className={`${action} bg-ink text-paper hover:bg-ink/88`}
            >
              Request access
            </a>
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
  );
}
