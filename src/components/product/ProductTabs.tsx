"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown, BadgeCheck } from "lucide-react";
import type { featuredProduct, reviews as reviewsType } from "@/lib/data";

const tabs = ["Description", "Additional Info", "Reviews"] as const;
type Tab = (typeof tabs)[number];

function RatingRow({ stars, pct }: { stars: number; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <span className="w-10 shrink-0">{stars} Star</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
      <span className="w-9 shrink-0 text-right">{pct}%</span>
    </div>
  );
}

export default function ProductTabs({
  product,
  reviews,
}: {
  product: typeof featuredProduct;
  reviews: typeof reviewsType;
}) {
  const [active, setActive] = useState<Tab>("Description");

  return (
    <div>
      <div className="relative flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors sm:px-6 ${
              active === t ? "text-brand" : "text-muted hover:text-ink"
            }`}
          >
            {t}
            {active === t && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand sm:inset-x-5"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative py-7">
        <AnimatePresence mode="wait">
          {active === "Description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              {product.description.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              <ul className="space-y-2 pl-1">
                {product.descriptionBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {active === "Additional Info" && (
            <motion.div
              key="additional-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-line"
            >
              <table className="w-full text-sm">
                <tbody>
                  {product.additionalInfo.map(([label, value], i) => (
                    <tr
                      key={label}
                      className={i % 2 === 0 ? "bg-surface" : "bg-background"}
                    >
                      <td className="w-40 px-4 py-3 font-medium text-ink sm:w-56">
                        {label}
                      </td>
                      <td className="px-4 py-3 text-muted">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {active === "Reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-[280px_1fr]"
            >
              {/* Rating summary */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Average Rating
                </p>
                <p className="mt-1 text-4xl font-extrabold text-ink">
                  {product.rating}
                  <span className="text-lg font-medium text-muted">/5</span>
                </p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(product.rating)
                          ? "fill-accent text-accent"
                          : "text-line"
                      }
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted">
                  ({product.reviews} reviews)
                </p>

                <div className="mt-5 space-y-2.5">
                  {product.ratingBreakdown.map((r) => (
                    <RatingRow key={r.stars} stars={r.stars} pct={r.pct} />
                  ))}
                </div>

                <button className="mt-5 w-full rounded-full bg-brand-light py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white">
                  Write a Review
                </button>
              </div>

              {/* Review list */}
              <div className="space-y-5">
                {reviews.map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="rounded-2xl border border-line p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand-dark">
                          {r.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {r.name}
                          </p>
                          {r.verified && (
                            <p className="flex items-center gap-1 text-[11px] text-brand">
                              <BadgeCheck size={12} /> Verified purchase
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-ink">
                        <Star size={13} className="fill-accent text-accent" />
                        {r.rating}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {r.text}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                      <span>Was this review helpful?</span>
                      <button className="flex items-center gap-1 hover:text-brand">
                        <ThumbsUp size={13} /> Thank ({r.thanks})
                      </button>
                      <button className="flex items-center gap-1 hover:text-sale">
                        <ThumbsDown size={13} /> ({r.dislikes})
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
