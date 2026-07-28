"use client";
import { motion, type Variants } from "framer-motion";


import { Heart, Eye, ShoppingCart, Star, Store, Truck, Bell } from "lucide-react";
import type { Product } from "@/lib/data";
import Link from "next/link";
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProductCard({
  product,
  view = "grid",
}: {
  product: Product;
  view?: "grid" | "list";
}) {
  const outOfStock = product.badge === "Out of Stock";
  if (view === "list") {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
      >
        <div className={`relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.hue} text-5xl`}>
          {product.icon}
          {product.badge && <BadgeTag badge={product.badge} discount={product.discount} corner="both" />}
        </div>
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="flex items-center gap-1 text-xs font-medium text-gray-400">
              <Store size={11} /> {product.shop}
            </p>
            <h3 className="mt-1 font-semibold text-ink">{product.name}</h3>
            <RatingRow rating={product.rating} reviews={product.reviews} />
          </div>
          <div className="flex items-end justify-between">
            <PriceBlock price={product.price} oldPrice={product.oldPrice} />
            <div className="flex gap-2">
              <IconButton icon={Heart} label="Add to wishlist" />
              <AddToCartButton outOfStock={outOfStock} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
    >
  
      <div className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${product.hue} text-7xl transition-transform duration-500 group-hover:scale-105`}>
        {product.icon}
        {product.badge && <BadgeTag badge={product.badge} discount={product.discount} />}

        {/* Hover action tray */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2 p-3 transition-transform duration-300 ease-out group-hover:translate-y-0">
            <IconButton icon={Heart} label="Add to wishlist" solid />
            <Link href={`/shop/product-details`}>
                  <IconButton icon={Eye} label="Quick view" solid />
            </Link>
            <IconButton icon={outOfStock ? Bell : ShoppingCart} label={outOfStock ? "Notify me" : "Add to cart"} solid highlight />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
          <Store size={10} /> {product.shop}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-ink">{product.name}</h3>
        <RatingRow rating={product.rating} reviews={product.reviews} />

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between">
            <PriceBlock price={product.price} oldPrice={product.oldPrice} />
            {outOfStock && <span className="text-[11px] font-medium text-gray-400">Out of stock</span>}
          </div>
          {product.delivery && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-400">
              <Truck size={11} /> {product.delivery}
            </p>
          )}
        </div>
      </div>
    
    </motion.div>
  );
  
}

function BadgeTag({
  badge,
  discount,
  corner = "left",
}: {
  badge: NonNullable<Product["badge"]>;
  discount?: string;
  corner?: "left" | "both";
}) {
  const style =
    badge === "Sale"
      ? "bg-rose-500 text-white"
      : badge === "New"
      ? "bg-ink text-white"
      : "bg-gray-500 text-white";

  return (
    <>
      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${style}`}>
        {badge}
      </span>
      {corner === "both" && discount && (
        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">
          {discount}
        </span>
      )}
      {corner === "left" && discount && (
        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">
          {discount}
        </span>
      )}
    </>
  );
}

function RatingRow({ rating, reviews }: { rating: number; reviews: string }) {
  return (
    <div className="mt-1.5 flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.round(rating) ? "fill-brand text-brand" : "fill-gray-200 text-gray-200"}
          />
        ))}
      </div>
      <span className="text-[11px] text-gray-400">
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

function PriceBlock({ price, oldPrice }: { price: number; oldPrice: number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-sm font-bold text-ink">${price.toFixed(2)}</span>
      {oldPrice > price && <span className="text-xs text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
    </div>
  );
}

function AddToCartButton({ outOfStock }: { outOfStock: boolean }) {
  if (outOfStock) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-400"
      >
        <Bell size={14} />
        Notify me
      </button>
    );
  }
  return (
    <button className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95">
      <ShoppingCart size={14} />
      Add to cart
    </button>
  );
}

function IconButton({
  icon: Icon,
  label,
  solid,
  highlight,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  solid?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:-translate-y-0.5 active:scale-90 ${
        solid
          ? highlight
            ? "bg-ink text-white hover:bg-ink/90"
            : "bg-white text-ink shadow-sm hover:bg-gray-50"
          : "border border-gray-200 text-gray-400 hover:border-ink hover:text-ink"
      }`}
    >
      <Icon size={15} />
    </button>
  );
}
