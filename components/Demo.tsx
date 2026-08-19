"use client";

import VoiceLedger from "./VoiceLedger";
import Reveal from "./Reveal";
import ScrollTextReveal from "./ScrollTextReveal";

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
        <ScrollTextReveal
          id="demo-heading"
          eyebrow={
            <p className="label flex items-center justify-center gap-2 text-ink-2">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Introducing BolKhata
            </p>
          }
          title={
            <>
              An agentic voice ledger that keeps your books{" "}
              <span className="spoken font-normal">straight as you speak.</span>
            </>
          }
          lead="Describe any transaction in one spoken sentence. BolKhata identifies the party, posts double-entry journal items, tracks receivables, and reconciles your cash balance before you close."
          className="mx-auto text-center max-w-[48rem]"
        />

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
