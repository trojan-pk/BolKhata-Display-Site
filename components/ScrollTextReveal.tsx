"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollTextRevealProps {
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  eyebrow?: React.ReactNode;
  id?: string;
}

/**
 * Scroll-based Blacken / Highlight Text Reveal for section titles.
 * Wraps title lines in a sleek black background box (matching the high-contrast
 * block reveal style) and wipes/reveals on scroll into view.
 */
export default function ScrollTextReveal({
  title,
  lead,
  className = "",
  eyebrow,
  id,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  // Track scroll position of the section title relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "start 55%"],
  });

  // Wipes clip-path horizontally as user scrolls: 100% right inset -> 0% inset
  const clipPercent = useTransform(scrollYProgress, [0, 0.85], [100, 0]);
  const clipPathStyle = useTransform(
    clipPercent,
    (val) => `inset(0% ${val}% 0% 0% round 6px)`
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.7], [24, 0]);
  const leadOpacity = useTransform(scrollYProgress, [0.35, 0.9], [0, 1]);
  const leadY = useTransform(scrollYProgress, [0.35, 0.9], [18, 0]);

  if (still) {
    return (
      <div id={id} className={`mb-[clamp(2rem,1rem+2.5vw,3.25rem)] ${className}`}>
        {eyebrow && <div className="mb-3">{eyebrow}</div>}
        <h2 className="mb-4 leading-[1.35]">
          <span className="box-decoration-clone bg-ink text-paper px-3 py-1 rounded-[6px] shadow-sm inline">
            {title}
          </span>
        </h2>
        {lead && <p className="lead mt-4">{lead}</p>}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`mb-[clamp(2rem,1rem+2.5vw,3.25rem)] ${className}`}
    >
      {eyebrow && (
        <motion.div style={{ opacity, y: yOffset }} className="mb-3">
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        style={{ opacity, y: yOffset }}
        className="mb-4 leading-[1.35] tracking-[-0.03em]"
      >
        <span className="relative inline-block">
          {/* Unrevealed ghostly outline / faint text background layer */}
          <span className="box-decoration-clone bg-ink/10 text-ink/30 px-3 py-1 rounded-[6px] inline transition-colors select-none">
            {title}
          </span>

          {/* Animated blacken reveal overlay layer */}
          <motion.span
            style={{ clipPath: clipPathStyle }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            <span className="box-decoration-clone bg-ink text-paper px-3 py-1 rounded-[6px] shadow-md inline font-semibold">
              {title}
            </span>
          </motion.span>
        </span>
      </motion.h2>

      {lead && (
        <motion.p
          style={{ opacity: leadOpacity, y: leadY }}
          className="lead mt-4"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
