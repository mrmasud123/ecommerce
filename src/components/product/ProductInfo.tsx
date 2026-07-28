"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  GitCompareArrows,
  Minus,
  Plus,
  Star,
  Truck,
  Check,
  ShoppingCart,
} from "lucide-react";
import type { featuredProduct } from "@/lib/data";

export default function ProductInfo({
  product,
}: {
  product: typeof featuredProduct;
}) {
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(1);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
          {product.name}
        </h1>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setWishlisted((v) => !v)}
          aria-label="Toggle wishlist"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
        >
          <motion.span
            animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              size={18}
              className={wishlisted ? "fill-secondary text-secondary" : ""}
            />
          </motion.span>
        </motion.button>
      </div>

      <p className="mt-1 text-sm text-muted">{product.shop}</p>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <Star size={15} className="fill-accent text-accent" />
        <span className="font-medium text-ink">{product.rating}</span>
        <span>({product.reviews} reviews)</span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-ink sm:text-3xl">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-base text-muted line-through">
          ${product.oldPrice.toFixed(2)}
        </span>
        <span className="rounded-full bg-sale/10 px-2.5 py-1 text-xs font-semibold text-sale">
          {product.discount}
        </span>
      </div>

      {/* Color */}
      <div className="mt-6">
        <p className="mb-2.5 text-sm font-medium text-ink">
          Color: <span className="text-muted">{product.colors[color].name}</span>
        </p>
        <div className="flex gap-2.5">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setColor(i)}
              aria-label={c.name}
              className="relative flex h-9 w-9 items-center justify-center rounded-full"
            >
              <span
                className="h-7 w-7 rounded-full border border-black/10"
                style={{ backgroundColor: c.swatch }}
              />
              {color === i && (
                <motion.span
                  layoutId="color-ring"
                  className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-brand"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-sm font-medium text-ink">
            Size: <span className="text-muted">{product.sizes[size]}</span>
          </p>
          <button className="text-xs font-semibold text-brand hover:underline">
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button
              key={s}
              onClick={() => setSize(i)}
              className="relative flex h-10 w-12 items-center justify-center rounded-lg border text-sm font-medium transition-colors"
              style={{
                borderColor: size === i ? "var(--color-primary)" : "var(--color-line)",
                color: size === i ? "var(--color-primary)" : "var(--color-ink)",
                zIndex: 0,
              }}
            >
              {size === i && (
                <motion.span
                  layoutId="size-bg"
                  className="absolute inset-0 -z-10 rounded-lg bg-brand-light"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + actions */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-ink hover:text-brand"
          >
            <Minus size={15} />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-ink">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-ink hover:text-brand"
          >
            <Plus size={15} />
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="h-11 flex-1 min-w-[140px] rounded-full bg-ink text-sm font-semibold text-white transition hover:bg-black"
        >
          Buy Now
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className="relative h-11 flex-1 min-w-[160px] overflow-hidden rounded-full bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center gap-1.5"
              >
                <Check size={16} /> Added to Cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={16} /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="mt-4 flex items-center gap-5 text-xs font-medium text-muted">
        <button className="flex items-center gap-1.5 hover:text-brand">
          <Share2 size={14} /> Share
        </button>
        <button className="flex items-center gap-1.5 hover:text-brand">
          <GitCompareArrows size={14} /> Compare
        </button>
      </div>

      <div className="mt-6 space-y-2 rounded-2xl border border-line bg-surface p-4 text-sm">
        <p className="flex items-center gap-2 font-medium text-ink">
          <Truck size={16} className="text-brand" /> Free Shipping
          <span className="font-normal text-muted">
            · Estimated delivery {product.delivery}
          </span>
        </p>
        <p className="text-muted">
          SKU: <span className="text-ink">{product.sku}</span>
        </p>
        <p className="text-muted">
          Categories:{" "}
          <span className="text-ink">{product.categories.join(", ")}</span>
        </p>
      </div>
    </motion.div>
  );
}
