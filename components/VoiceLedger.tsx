"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { utterances, rupees, day } from "@/lib/content";
import { VIEW, EASE } from "@/lib/motion";

type Phase = "listening" | "resolving" | "posted";

/** A speech-like amplitude profile. Fixed, so server and client agree. */
const AMPS = [
  0.24, 0.5, 0.34, 0.7, 0.95, 0.6, 0.4, 0.82, 1, 0.55, 0.3, 0.66, 0.86, 0.44,
  0.72, 0.35, 0.9, 0.6, 0.26, 0.76, 1, 0.5, 0.38, 0.8, 0.3, 0.62, 0.94, 0.46,
  0.7, 0.34, 0.56, 0.28,
];

/** Eases a number toward its target over `ms`, in whole rupees. */
function useCountUp(target: number, ms: number, enabled: boolean) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    if (from === target) return;

    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / ms, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, enabled]);

  return value;
}

/* Shared by both mono lines in the card's title bar. */
const chromeType = "font-mono text-micro font-medium tracking-[0.13em] uppercase";

/* Each field's own row. It lands as the entry posts, staggered by --d. */
const fieldRow =
  "grid grid-cols-[5rem_minmax(0,1fr)] items-baseline gap-3 border-b border-line-2 pb-2.5 group-data-[phase=posted]/card:animate-land group-data-[phase=posted]/card:[animation-delay:calc(var(--d)*90ms)]";

const dt = "font-mono text-micro tracking-[0.1em] uppercase text-ink-3";
const dd = "m-0 flex flex-wrap items-center gap-2 text-sm text-ink";

export default function VoiceLedger() {
  const [index, setIndex] = useState(0);
  // Pre-hydration and for reduced motion we show a completed entry, so the
  // card is meaningful without JS and reserves its own height.
  const [phase, setPhase] = useState<Phase>("posted");
  const [typed, setTyped] = useState(utterances[0].speech);
  const [animate, setAnimate] = useState(false);

  const current = utterances[index];

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!animate) return;

    const timers: number[] = [];
    const speech = current.speech;

    setPhase("listening");
    setTyped("");

    let i = 0;
    const typing = window.setInterval(() => {
      i += 1;
      setTyped(speech.slice(0, i));
      if (i >= speech.length) {
        window.clearInterval(typing);
        timers.push(window.setTimeout(() => setPhase("resolving"), 440));
        timers.push(window.setTimeout(() => setPhase("posted"), 1340));
        timers.push(
          window.setTimeout(
            () => setIndex((n) => (n + 1) % utterances.length),
            5400,
          ),
        );
      }
    }, 29);

    return () => {
      window.clearInterval(typing);
      timers.forEach(window.clearTimeout);
    };
  }, [index, animate, current.speech]);

  const posted = phase === "posted";
  const balance = useCountUp(
    posted ? current.balanceTo : current.balanceFrom,
    760,
    animate,
  );

  const { entry } = current;
  const sign =
    entry.direction === "in" ? "+" : entry.direction === "out" ? "−" : "";

  return (
    <div className="relative">
      {/* The animation would machine-gun a screen reader, so the card is
          hidden from assistive tech and described in prose instead. */}
      <p className="sr-only">
        A demonstration: the spoken sentence “{utterances[0].speech}” becomes a
        receipt of {rupees(utterances[0].entry.amount)} against{" "}
        {utterances[0].entry.party}, moving the cash balance from{" "}
        {rupees(utterances[0].balanceFrom)} to{" "}
        {rupees(utterances[0].balanceTo)}.
      </p>

      {/* data-phase on this one element is the switch every child reads. */}
      <motion.div
        initial={animate ? { opacity: 0, y: 25, scale: 0.96 } : undefined}
        whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
        whileHover={animate ? { y: -4, transition: { duration: 0.25, ease: EASE } } : undefined}
        viewport={VIEW}
        transition={{ duration: 0.7, ease: EASE }}
        data-phase={phase}
        aria-hidden="true"
        className="group/card relative flex min-h-[24rem] flex-col overflow-hidden rounded-card border border-line bg-paper shadow-card transition-shadow duration-300 hover:shadow-glow hover:border-accent-line"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line-2 px-5 py-3">
          <span className={`${chromeType} inline-flex items-center gap-2 text-ink-2`}>
            <span className="size-1.5 shrink-0 rounded-full bg-ink-3 transition-colors duration-300 ease-ledger group-data-[phase=listening]/card:animate-live group-data-[phase=listening]/card:bg-accent group-data-[phase=posted]/card:bg-accent group-data-[phase=resolving]/card:bg-gold" />
            {phase === "listening"
              ? "Listening"
              : phase === "resolving"
                ? "Resolving"
                : "Posted"}
          </span>
          <span className={`${chromeType} text-ink-3`}>
            Day book · {day.short}
          </span>
        </div>

        <div className="border-b border-line-2 px-5 pt-5 pb-4">
          <div className="mb-4 flex h-6 items-center gap-[2px]">
            {AMPS.map((amp, i) => (
              <span
                key={i}
                style={{ "--amp": amp, "--i": i } as React.CSSProperties}
                /* At rest each bar is a flat rule — the ledger line before it
                   is spoken. Speaking lifts it to its own amplitude, with the
                   negative delay spreading the crest along the row so the
                   voice appears to arrive left to right. */
                className="h-[2px] min-w-0 flex-1 origin-center rounded-[1px] bg-accent opacity-25 transition-[height,opacity] duration-[450ms] ease-ledger group-data-[phase=listening]/card:h-[calc(3px+var(--amp)*20px)] group-data-[phase=listening]/card:animate-talk group-data-[phase=listening]/card:opacity-80 group-data-[phase=listening]/card:[animation-delay:calc(var(--i)*-47ms)] group-data-[phase=resolving]/card:h-[3px] group-data-[phase=resolving]/card:opacity-35"
              />
            ))}
          </div>

          {/* two lines held open, so the card never resizes mid-sentence */}
          <p className="spoken min-h-[3em] text-lead leading-[1.5] text-ink">
            {typed}
            <span className="ml-[2px] inline-block h-[1.05em] w-px bg-accent align-[-0.16em] opacity-0 group-data-[phase=listening]/card:animate-blink" />
          </p>
        </div>

        {/* Until it posts, the posting is not yet a fact — so it reads pending. */}
        <div className="flex flex-1 flex-col px-5 pt-4 pb-5 opacity-35 transition-opacity duration-500 ease-ledger group-data-[phase=posted]/card:opacity-100">
          <div className="mb-3.5 flex items-baseline justify-between gap-4">
            <span className="label">Resolved entry</span>
            <span className="rounded-ledger border border-accent-line bg-accent-soft px-2 py-[0.1875rem] text-xs font-medium tracking-[-0.01em] whitespace-nowrap text-accent">
              {entry.kind}
            </span>
          </div>

          <dl className="grid gap-2.5">
            <div className={fieldRow} style={{ "--d": 0 } as React.CSSProperties}>
              <dt className={dt}>Party</dt>
              <dd className={dd}>{entry.party}</dd>
            </div>
            <div className={fieldRow} style={{ "--d": 1 } as React.CSSProperties}>
              <dt className={dt}>Account</dt>
              <dd className={dd}>{entry.account}</dd>
            </div>
            <div className={fieldRow} style={{ "--d": 2 } as React.CSSProperties}>
              <dt className={dt}>Amount</dt>
              <dd className={dd}>
                {/* a credit sale moves no cash, so its figure stays neutral */}
                <span
                  data-dir={entry.direction}
                  className="figure text-[0.9375rem] font-medium data-[dir=in]:text-accent data-[dir=out]:text-debit data-[dir=receivable]:text-ink"
                >
                  {sign} {rupees(entry.amount)}
                </span>
                {entry.direction === "receivable" && (
                  <span className="rounded-ledger border border-gold/35 px-1.5 py-0.5 font-mono text-micro tracking-[0.08em] uppercase text-gold">
                    on credit
                  </span>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex items-baseline justify-between gap-4 pt-5">
            <span className="label">Cash balance</span>
            <span className="figure text-[1.375rem] font-medium tracking-[-0.03em] text-ink">
              {rupees(balance)}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-[1.5] text-ink-3">{entry.note}</p>
        </div>

        <div className="flex gap-1 px-5 pb-5">
          {utterances.map((_, i) => (
            <span
              key={i}
              data-on={i === index}
              className="h-[2px] w-5 rounded-[1px] bg-line transition-colors duration-400 ease-ledger data-[on=true]:bg-accent"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
