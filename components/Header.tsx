"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Wordmark from "./Wordmark";

const nav = [
  { href: "#how", label: "How it works" },
  { href: "#scope", label: "Scope" },
  { href: "#record", label: "The record" },
  { href: "#oversight", label: "Oversight" },
];

/**
 * Ultra High-Class Thinned Pill Navigation Bar.
 * Thinner container height, larger link text (text-sm), and tight padding.
 */
export default function Header() {
  const [lifted, setLifted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.85, 0.32, 1] }}
        className={[
          "pointer-events-auto flex items-center justify-between gap-3 sm:gap-5 px-3 sm:px-4 py-1.5 rounded-full transition-all duration-400 ease-ledger",
          "w-full max-w-[54rem]",
          "bg-paper/85 backdrop-blur-xl border shadow-[0_6px_24px_rgb(0,0,0,0.06)]",
          lifted
            ? "border-accent-line/70 bg-paper/95 shadow-[0_10px_32px_rgba(17,83,62,0.13)] ring-1 ring-accent/15 scale-[0.995]"
            : "border-line hover:border-accent-line/50",
        ].join(" ")}
      >
        {/* Brand / Logo */}
        <a
          href="#top"
          aria-label="BolKhata, home"
          className="flex items-center gap-2 pl-1 pr-1.5 py-0.5 rounded-full transition-transform duration-200 hover:scale-[1.02]"
        >
          <Wordmark size={23} />
        </a>

        {/* Navigation Items with Larger Text and Thinner Padding */}
        <nav
          aria-label="Sections"
          className="hidden md:flex items-center gap-0.5 bg-ground/90 p-0.5 rounded-full border border-line-2/70 relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative px-3.5 py-1 text-sm font-semibold tracking-tight text-ink-2 hover:text-ink transition-colors z-10"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="hover-pill"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="absolute inset-0 bg-paper rounded-full shadow-sm border border-line/80 -z-10"
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <a
            href="#access"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-tight text-paper transition-all duration-300 hover:bg-accent hover:shadow-md hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="relative z-10">Request access</span>
            <span className="relative z-10 size-1.5 rounded-full bg-accent-soft group-hover:bg-paper transition-colors duration-200 animate-pulse" />
          </a>
        </div>
      </motion.div>
    </header>
  );
}
