/**
 * The mark: two ledger rules, and a third that lifts off the page as speech.
 * A ruled line that talks — the whole product in one glyph.
 */
export default function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        aria-hidden="true"
        className="shrink-0 text-accent"
      >
        <path d="M4 12.6c4.6 0 6.9-8.6 11-8.6 3 0 5.1 2.4 5.1 5.4" />
        <path d="M4 19h20" />
        <path d="M4 24h12.5" />
        <circle cx="20.1" cy="9.6" r="1.9" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
        BolKhata
      </span>
    </span>
  );
}
