"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
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
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      spawnImage(e.clientX - rect.left, e.clientY - rect.top);
    },
    [spawnImage],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!containerRef.current || e.touches.length === 0) return;
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

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
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
