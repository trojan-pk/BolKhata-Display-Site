"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VIEW, rise, stagger } from "@/lib/motion";

import ScrollTextReveal from "./ScrollTextReveal";

const ADDRESS = "teamtrojans08@gmail.com";

/**
 * The closing ask.
 *
 * There is no backend behind this site, so the form does the honest thing: it
 * composes the message in the visitor's own mail client rather than pretending
 * to have stored their address. The note under the field says so plainly — a
 * signup that silently goes nowhere would be worse than no signup at all.
 */
export default function Access() {
  const still = useReducedMotion();
  const [email, setEmail] = useState("");

  const compose = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `I would like early access to BolKhata.\n\nEmail: ${email}\n`;
    window.location.href = `mailto:${ADDRESS}?subject=${encodeURIComponent(
      "Early access request",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-[44rem]">
      <ScrollTextReveal
        title="Request early access."
        lead="BolKhata is opening to a limited number of businesses at a time so that every early ledger can be reviewed properly. Tell us what you trade in and we will set you up."
        className="mb-8"
      />

      <motion.form
        variants={still ? undefined : rise}
        onSubmit={compose}
        className="flex flex-col gap-2.5 sm:flex-row"
      >
        <label htmlFor="email" className="sr-only">
          Your email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourshop.pk"
          autoComplete="email"
          className="min-w-0 flex-1 rounded-ledger border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors duration-200 ease-ledger placeholder:text-ink-3 hover:border-ink-3 focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-ledger bg-ink px-5 py-3 text-sm font-medium tracking-[-0.012em] whitespace-nowrap text-paper transition-colors duration-200 ease-ledger hover:bg-ink/88"
        >
          Request access
        </button>
      </motion.form>

      <motion.p
        variants={still ? undefined : rise}
        className="mt-4 text-xs leading-[1.6] text-ink-3"
      >
        This opens your own mail app with the message ready to send — nothing is
        collected on this page. You can also write to{" "}
        <a
          href={`mailto:${ADDRESS}`}
          className="text-ink-2 underline decoration-line underline-offset-3 transition-colors duration-200 ease-ledger hover:text-accent hover:decoration-accent"
        >
          {ADDRESS}
        </a>{" "}
        directly.
      </motion.p>
    </div>
  );
}
