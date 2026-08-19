/**
 * The official BolKhata logo mark loaded from BKS-01.svg with tight cropped viewBox.
 */
export default function Wordmark({ size = 24 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="190 236 248 257"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0 text-accent"
      >
        <g>
          <rect x="195" y="241" width="29.5" height="247.1" />
          <rect x="249.4" y="271.5" width="29.5" height="165.8" />
          <rect x="299.2" y="313.8" width="29.5" height="84.3" />
        </g>
        <g>
          <rect
            x="403.6"
            y="241"
            transform="matrix(-1 -4.506896e-11 4.506896e-11 -1 836.687 729.0545)"
            width="29.5"
            height="247.1"
          />
          <rect
            x="349.2"
            y="271.5"
            transform="matrix(-1 -4.482249e-11 4.482249e-11 -1 727.9123 708.9111)"
            width="29.5"
            height="165.8"
          />
          <rect
            x="299.3"
            y="313.8"
            transform="matrix(-1 -4.506896e-11 4.482249e-11 -1 628.2023 711.9326)"
            width="29.5"
            height="84.3"
          />
        </g>
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
        BolKhata
      </span>
    </span>
  );
}
