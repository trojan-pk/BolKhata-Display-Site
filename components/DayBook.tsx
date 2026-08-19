"use client";

import { motion, useReducedMotion } from "framer-motion";
import { dayBook, dayTotals, openingBalance, rupees, day } from "@/lib/content";
import { EASE, VIEW } from "@/lib/motion";

const head =
  "px-3 py-2.5 font-mono text-micro font-medium tracking-[0.13em] uppercase text-ink-3";

/* Figures share one treatment wherever they sit in the table, so the columns
   line up on the decimal even across different colours. */
const num = "figure px-3 py-3 text-right text-sm whitespace-nowrap";

const pad = "px-[clamp(1rem,0.5rem+1.5vw,1.5rem)]";

const totals = [
  { label: "Money in", value: dayTotals.in, tone: "text-accent" },
  { label: "Money out", value: dayTotals.out, tone: "text-debit" },
  { label: "On credit", value: dayTotals.receivables, tone: "text-gold" },
  { label: "Closing balance", value: dayTotals.closing, tone: "text-ink" },
];

/**
 * One day, posted. The point is not that the figures are impressive — it is
 * that they reconcile: opening plus money in, less money out, lands exactly on
 * the closing balance, and every row shows whether a person spoke it or the
 * agent posted it on a schedule.
 */
export default function DayBook() {
  const still = useReducedMotion();

  const row = still
    ? undefined
    : {
        hidden: { opacity: 0, y: 8 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <div className="overflow-hidden rounded-card border border-line bg-paper shadow-card">
      {/* ---- opening ---- */}
      <div
        className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-4 ${pad}`}
      >
        <div>
          <p className="label mb-1">Day book</p>
          <p className="text-sm font-medium tracking-[-0.015em]">{day.full}</p>
        </div>
        <div className="text-right">
          <p className="label mb-1">Opening balance</p>
          <p className="figure text-sm text-ink-2">{rupees(openingBalance)}</p>
        </div>
      </div>

      {/* Six columns need more width than a phone has, so the table scrolls
          inside its own box rather than forcing the page sideways. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Every entry posted on {day.full}, with the running cash balance.
            Opening balance {rupees(openingBalance)}; money in{" "}
            {rupees(dayTotals.in)}; money out {rupees(dayTotals.out)}; closing
            balance {rupees(dayTotals.closing)}.
          </caption>

          <thead>
            <tr className="border-b border-line-2 bg-ground-2">
              <th scope="col" className={head}>
                Time
              </th>
              <th scope="col" className={head}>
                Entry
              </th>
              <th scope="col" className={head}>
                Party &amp; account
              </th>
              <th scope="col" className={`${head} text-right`}>
                Out
              </th>
              <th scope="col" className={`${head} text-right`}>
                In
              </th>
              <th scope="col" className={`${head} text-right`}>
                Balance
              </th>
            </tr>
          </thead>

          <motion.tbody
            variants={
              still
                ? undefined
                : {
                    hidden: {},
                    shown: {
                      transition: { staggerChildren: 0.055, delayChildren: 0.1 },
                    },
                  }
            }
            initial={still ? undefined : "hidden"}
            whileInView={still ? undefined : "shown"}
            viewport={VIEW}
          >
            {dayBook.map((entry) => (
              <motion.tr
                key={entry.time}
                variants={row}
                className="border-b border-line-2 transition-colors duration-200 ease-ledger last:border-b-0 hover:bg-ground-2"
              >
                <td className="figure px-3 py-3 text-xs whitespace-nowrap text-ink-3">
                  {entry.time}
                </td>

                <td className="px-3 py-3">
                  <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                    {/* what put this row here: a spoken sentence, or a
                        standing instruction the agent runs on its own */}
                    {entry.voice ? (
                      <svg
                        viewBox="0 0 16 16"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                        className="shrink-0 text-accent"
                      >
                        <path d="M8 2.5v5.5M5 4.5v1.5M11 4.5v1.5M3 9.5a5 5 0 0 0 10 0M8 14.5v-1.5" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                        className="shrink-0 text-ink-3"
                      >
                        <circle cx="8" cy="8" r="5.75" />
                        <path d="M8 5v3l2 1.5" />
                      </svg>
                    )}
                    {entry.kind}
                    <span className="sr-only">
                      {entry.voice ? " — spoken" : " — scheduled"}
                    </span>
                  </span>
                </td>

                <td className="px-3 py-3">
                  <span className="block text-sm">{entry.party}</span>
                  <span className="block text-xs text-ink-3">
                    {entry.account}
                  </span>
                </td>

                <td className={`${num} ${entry.out ? "text-debit" : "text-ink-3"}`}>
                  {entry.out ? rupees(entry.out) : "—"}
                </td>
                <td className={`${num} ${entry.in ? "text-accent" : "text-ink-3"}`}>
                  {entry.in ? rupees(entry.in) : "—"}
                </td>

                {/* a credit sale moves no cash, so its balance is carried
                    forward rather than restated as a new figure */}
                <td
                  className={`${num} font-medium ${entry.noCash ? "text-ink-3" : "text-ink"}`}
                >
                  {rupees(entry.balance)}
                  {entry.noCash && (
                    <span className="ml-1.5 font-sans text-micro tracking-[0.08em] uppercase text-gold">
                      held
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* ---- close ---- */}
      <div
        className={`grid gap-x-6 gap-y-4 border-t border-line bg-ground-2 py-[1.125rem] sm:grid-cols-2 wide:grid-cols-4 ${pad}`}
      >
        {totals.map((total) => (
          <div key={total.label}>
            <p className="label mb-1">{total.label}</p>
            <p
              className={`figure text-[1.0625rem] font-medium tracking-[-0.025em] ${total.tone}`}
            >
              {rupees(total.value)}
            </p>
          </div>
        ))}
      </div>

      <p
        className={`border-t border-line-2 bg-ground-2 py-3 text-xs leading-[1.6] text-ink-3 ${pad}`}
      >
        <span className="figure">{dayTotals.entries}</span> entries ·{" "}
        <span className="figure">{rupees(openingBalance)}</span> opening{" "}
        <span aria-hidden="true">+</span>
        <span className="sr-only">plus</span>{" "}
        <span className="figure">{rupees(dayTotals.in)}</span> in{" "}
        <span aria-hidden="true">−</span>
        <span className="sr-only">minus</span>{" "}
        <span className="figure">{rupees(dayTotals.out)}</span> out{" "}
        <span aria-hidden="true">=</span>
        <span className="sr-only">equals</span>{" "}
        <span className="figure text-ink-2">{rupees(dayTotals.closing)}</span>{" "}
        closing. Reconciled.
      </p>
    </div>
  );
}
