"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const nav = [
  { href: "#how", label: "How it works" },
  { href: "#scope", label: "Scope" },
  { href: "#record", label: "The record" },
  { href: "#oversight", label: "Oversight" },
];

export default function Header() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-lifted={lifted}
      /* Transparent over the hero's own masthead rule; it only takes on a
         surface once the page has actually scrolled under it. */
      className="sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300 ease-ledger data-[lifted=true]:border-line data-[lifted=true]:bg-ground/85 data-[lifted=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-page items-center gap-6 px-gutter py-3.5">
        <a
          href="#top"
          aria-label="BolKhata, home"
          className="mr-auto flex items-center transition-opacity duration-200 ease-ledger hover:opacity-65"
        >
          <Wordmark />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 wide:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors duration-200 ease-ledger hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#access"
          className="inline-block rounded-ledger bg-ink px-3 py-1.5 text-xs font-medium tracking-[-0.012em] text-paper transition-colors duration-200 ease-ledger hover:bg-ink/88 sm:px-3.5 sm:py-2 sm:text-sm"
        >
          Request access
        </a>
      </div>
    </header>
  );
}
