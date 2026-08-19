/**
 * The page's vertical rhythm and its asymmetric spine: a narrow mono gutter
 * carrying a real label, content to its right. The label is what a ledger's
 * own margin would carry — a name for the record below, not a decorative
 * number. Once there is room, it sticks and rides along the margin as the
 * record scrolls past.
 */
export default function Section({
  id,
  label,
  children,
  tone = "plain",
  bordered = true,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
  tone?: "plain" | "deep";
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "py-section",
        bordered ? "border-t border-line" : "",
        tone === "deep" ? "bg-ground-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto grid w-full max-w-page grid-cols-[minmax(0,1fr)] gap-8 px-gutter wide:grid-cols-[8.5rem_minmax(0,1fr)] wide:gap-[clamp(2rem,0.5rem+4vw,4.5rem)]">
        <p className="label pt-[0.4rem] wide:sticky wide:top-26 wide:self-start">
          {label}
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
