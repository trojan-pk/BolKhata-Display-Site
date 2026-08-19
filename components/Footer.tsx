"use client";

import { motion, useReducedMotion } from "framer-motion";
import Wordmark from "./Wordmark";
import { VIEW, rise, stagger, EASE } from "@/lib/motion";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#scope", label: "Scope" },
  { href: "#record", label: "The record" },
  { href: "#oversight", label: "Oversight" },
  { href: "#access", label: "Early access" },
];

export default function Footer() {
  const still = useReducedMotion();

  return (
    <motion.footer
      initial={still ? undefined : { opacity: 0, y: 15 }}
      whileInView={still ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.7, ease: EASE }}
      className="border-t border-line bg-ground-2"
    >
      <div className="mx-auto grid w-full max-w-page gap-10 px-gutter py-[clamp(2.5rem,1rem+4vw,4rem)] wide:grid-cols-[1fr_auto]">
        <div className="max-w-[36ch]">
          <Wordmark />
          <p className="mt-3.5 text-sm leading-[1.6] text-ink-2">
            A voice agent for small-business bookkeeping. Double-entry,
            auditable, and exportable on request.
          </p>
        </div>

        <nav aria-label="Footer" className="grid gap-2.5 wide:justify-items-end">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={still ? undefined : { x: 3, transition: { duration: 0.15 } }}
              className="text-sm text-ink-2 transition-colors duration-200 ease-ledger hover:text-ink"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-page px-gutter">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line py-5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="label">© 2026 BolKhata</p>
            <span className="text-xs text-ink-3" aria-hidden="true">•</span>
            <p className="text-xs text-ink-2 font-medium">Developed by Trojans</p>
          </div>
          <p className="max-w-[54ch] text-xs leading-[1.6] text-ink-3">
            Figures shown across this site illustrate a single trading day in
            Pakistani rupees. They reconcile, but the business and its parties
            are examples.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
