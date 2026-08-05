"use client";
import { features } from "@/lib/data";
import { motion } from "framer-motion";

export default function FeatureStrip() {
  return (
    <section className="container-x py-8">
      <motion.div
        className="grid grid-cols-2 gap-4 rounded-2xl bg-surface p-5 shadow-sm sm:grid-cols-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title} className="flex items-start gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-xl">
              {f.icon}
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{f.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
