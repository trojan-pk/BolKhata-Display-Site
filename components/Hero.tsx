"use client";

import { motion, useReducedMotion } from "framer-motion";
import { rise, stagger, typeLine } from "@/lib/motion";

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
 * The one piece of structure is a hairline that runs the full width of the
 * screen and passes behind the status marker — the marker punches a hole in it
 * with the page's own background. It is the only ornament on the page, and it
 * is the same rule that divides every section below.
 */
export default function Hero() {
  const still = useReducedMotion();

  // With reduced motion the cascade collapses to its final state: same markup,
  // no movement, nothing left hidden waiting on an animation to finish.
  const cascade = still
    ? {}
    : { initial: "hidden" as const, animate: "shown" as const };

  return (
    <section
      id="top"
      /* svh, not vh: on mobile the dynamic browser chrome would otherwise push
         the centred block below the fold. The padding leaves room for the
         header overlaying the top and the cue sitting at the bottom. */
      className="relative flex min-h-svh flex-col items-center justify-center px-gutter pt-28 pb-20 text-center"
    >
      <motion.div
        variants={container}
        {...cascade}
        className="flex w-full max-w-[52rem] flex-col items-center"
      >
        {/* ---- status marker, sitting on a full-bleed rule --------------- */}
        <motion.div
          variants={rise}
          className="relative mb-11 flex w-full items-center justify-center"
        >
          <span
            aria-hidden="true"
            /* w-screen breaks out of the centred column so the rule reaches
               both edges of the viewport, not just this container */
            className="absolute top-1/2 left-1/2 h-px w-screen -translate-x-1/2 bg-line"
          />
          <p className="label relative flex items-center gap-2 bg-ground px-4">
            <span
              aria-hidden="true"
              className="size-1.5 animate-live rounded-full bg-accent"
            />
            Private beta · August 2026
          </p>
        </motion.div>

        <h1 className="mb-7">
          <span className={lineMask}>
            <motion.span variants={typeLine} className="block will-change-transform">
              Bookkeeping that happens
            </motion.span>
          </span>
          <span className={lineMask}>
            {/* The half of the sentence about speaking is set in the same face
                the site uses for every spoken word. The serif needs far less
                negative tracking than the sans to sit at this size. */}
            <motion.span
              variants={typeLine}
              className="spoken block tracking-[-0.02em] will-change-transform"
            >
              as you speak.
            </motion.span>
          </span>
        </h1>

        <motion.p variants={rise} className="lead mx-auto text-balance">
          BolKhata is a voice agent for small businesses. Describe a transaction
          in one sentence — it posts the entry to a double-entry ledger, tracks
          what you are owed, and reconciles the day before you close.
        </motion.p>

        <motion.div
          variants={rise}
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
        initial={still ? undefined : { opacity: 0 }}
        animate={still ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="label">One entry, spoken</span>
        <span className="h-8 w-px bg-linear-to-b from-line to-transparent" />
      </motion.p>
    </section>
  );
}
