"use client";

import VoiceLedger from "./VoiceLedger";
import Reveal from "./Reveal";

const assurances = [
  { term: "Double-entry", detail: "Debit and credit on every posting." },
  { term: "Full audit trail", detail: "Each entry cites the sentence behind it." },
  { term: "Exports you keep", detail: "Open formats, on request, at any time." },
];

/**
 * Introducing BolKhata: product reveal section directly following the hero.
 * Features a hero-style statement, product explanation, and live interactive demo.
 */
export default function Demo() {
  return (
    <section
      id="intro"
      aria-labelledby="demo-heading"
      className="border-y border-line bg-ground-2 py-[clamp(4rem,2rem+6vw,7rem)]"
    >
      <div className="mx-auto w-full max-w-page px-gutter">
        {/* ---- Introducing BolKhata Header Block -------------------------- */}
        <Reveal className="mx-auto mb-[clamp(2.5rem,1.5rem+4vw,4.5rem)] max-w-[48rem] text-center">
          <p className="label mb-3 inline-flex items-center justify-center gap-2 text-ink-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Introducing BolKhata
          </p>
          <h2
            id="demo-heading"
            className="mb-5 text-center text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-semibold tracking-[-0.035em] text-ink leading-[1.08]"
          >
            An agentic voice ledger that keeps your books{" "}
            <span className="spoken font-normal">straight as you speak.</span>
          </h2>
          <p className="lead mx-auto text-center text-sm sm:text-base max-w-[44ch] text-ink-2 font-medium">
            Describe any transaction in one spoken sentence. BolKhata identifies the party, posts double-entry journal items, tracks receivables, and reconciles your cash balance before you close.
          </p>
        </Reveal>

        {/* ---- Live Voice Ledger Demo Card ------------------------------- */}
        <Reveal className="mx-auto max-w-[40rem]">
          <VoiceLedger />
        </Reveal>

        {/* ---- Product Assurances --------------------------------------- */}
        <dl className="mx-auto mt-[clamp(2.5rem,1.5rem+2vw,3.5rem)] grid max-w-[52rem] gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
          {assurances.map((item) => (
            <div key={item.term}>
              <dt className="label mb-1.5 text-ink font-semibold">{item.term}</dt>
              <dd className="text-xs leading-[1.55] text-ink-2 font-medium">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
