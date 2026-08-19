"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UNSPLASH_IMAGES = [
  // Classic accounting ledger book & fountain pen
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80",
  // Financial calculation ledger sheets & calculator
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=500&q=80",
  // Bookkeeping record book & document audit
  "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=500&q=80",
  // Business financial balance ledger & figures
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
  // Auditing ledger journal notebook
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
  // Handwritten receipts & shop sales journal
  "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=500&q=80",
  // Cash ledger close & currency counting
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=500&q=80",
  // Trade store counter point-of-sale receipt ledger
  "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=500&q=80",
];

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

export default function ImageTrail({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<TrailImage[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const imageIndex = useRef(0);
  const counter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnImage = useCallback((x: number, y: number) => {
    if (
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches)
    ) {
      return;
    }

    if (lastPos.current) {
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      if (dist < 55) return;
    }

    lastPos.current = { x, y };

    const newImage: TrailImage = {
      id: counter.current++,
      x,
      y,
      src: UNSPLASH_IMAGES[imageIndex.current % UNSPLASH_IMAGES.length],
      rotation: Math.floor(Math.random() * 26) - 13,
    };

    imageIndex.current++;

    setImages((prev) => [...prev.slice(-7), newImage]);

    setTimeout(() => {
      setImages((prev) => prev.filter((img) => img.id !== newImage.id));
    }, 1100);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches)
      ) {
        return;
      }
      if (!containerRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, [data-no-trail]")) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      spawnImage(e.clientX - rect.left, e.clientY - rect.top);
    },
    [spawnImage],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches)
      ) {
        return;
      }
      if (!containerRef.current || e.touches.length === 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, select, [data-no-trail]")) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      spawnImage(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [spawnImage],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full overflow-hidden select-none"
    >
      {children}

      <div className="hidden md:block pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.5, rotate: img.rotation - 12 }}
              animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
              exit={{ opacity: 0, scale: 0.6, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 0.85, 0.32, 1] }}
              style={{
                position: "absolute",
                left: img.x - 65,
                top: img.y - 65,
                width: "130px",
                height: "130px",
              }}
              className="shadow-md"
            >
              <img
                src={img.src}
                alt="Unsplash Trail Item"
                className="size-full rounded-none object-cover"
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
