"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { featuredProduct } from "@/lib/data";

type GalleryItem = (typeof featuredProduct)["gallery"][number];

export default function ProductGallery({
  gallery,
  badges,
}: {
  gallery: GalleryItem[];
  badges: readonly string[];
}) {
  const [active, setActive] = useState(0);
  const item = gallery[active];

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Thumbnails */}
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
        {gallery.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${g.hue} transition`}
          >
            <span className="text-xl">{g.icon}</span>
            {active === i && (
              <motion.div
                layoutId="thumb-ring"
                className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-brand"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-surface h-125">
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold text-white ${
                b === "Sale" ? "bg-sale" : "bg-brand"
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow">
          <ZoomIn size={15} />
        </span>

        <div className="relative aspect-square w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${item.hue}`}
            >
              <span style={{ fontSize: "7rem" }}>{item.icon}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
