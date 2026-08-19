import VoiceLedger from "./VoiceLedger";
import Reveal from "./Reveal";

const assurances = [
  { term: "Double-entry", detail: "Debit and credit on every posting." },
  { term: "Full audit trail", detail: "Each entry cites the sentence behind it." },
  { term: "Exports you keep", detail: "Open formats, on request, at any time." },
];

/**
 * The product, working, directly under the claim that it does. Set on the
 * page's second paper stock and framed by the same hairline as every section,
 * so it reads as evidence rather than as a screenshot dropped into a page.
 */
export default function Demo() {
  return (
    <section
      aria-labelledby="demo-heading"
      className="border-y border-line bg-ground-2"
    >
      <h2 id="demo-heading" className="sr-only">
        A spoken sentence becoming a ledger entry
      </h2>

      <div className="mx-auto w-full max-w-page px-gutter py-[clamp(3rem,1.5rem+4vw,5rem)]">
        <Reveal className="mx-auto max-w-[38rem]">
          <p className="label mb-4 text-center">Spoken, then posted</p>
          <VoiceLedger />
        </Reveal>

        <dl className="mx-auto mt-[clamp(2.5rem,1.5rem+2vw,3.5rem)] grid max-w-[52rem] gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
          {assurances.map((item) => (
            <div key={item.term}>
              <dt className="label mb-1.5 text-ink-2">{item.term}</dt>
              <dd className="text-xs leading-[1.55] text-ink-3">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
