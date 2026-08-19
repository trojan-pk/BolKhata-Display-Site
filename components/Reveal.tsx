"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveals its children once, on first scroll into view.
 *
 * Framer Motion owns the viewport detection (`whileInView` + `once`), so there
 * is no observer to wire up by hand. Reduced-motion visitors get the final
 * state immediately — the element is never hidden from them, which matters
 * because these wrap real content, not decoration.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** milliseconds, to match the rest of the page's timing vocabulary */
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();

  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 0.85, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
