import { Heart, GitCompareArrows, Eye, Star } from "lucide-react";
import ProductThumb from "./ProductThumb";
import type { Product } from "@/lib/data";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.badge === "Out of Stock";

  return (
    <div className="group relative flex w-50 shrink-0 flex-col rounded-2xl border border-line bg-surface p-2.5 transition hover:shadow-lg hover:shadow-brand/5 sm:w-70 sm:p-3">
      <div className="relative">
        <ProductThumb
          hue={product.hue}
          icon={product.icon}
          className="aspect-square w-full"
        />

        {product.badge && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${
              outOfStock
                ? "bg-ink/60"
                : product.badge === "New"
                ? "bg-brand"
                : "bg-sale"
            }`}
          >
            {product.badge}
          </span>
        )}

        <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition group-hover:opacity-100">
          <button
            aria-label="Add to wishlist"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow hover:bg-brand hover:text-white"
          >
            <Heart size={13} />
          </button>
          <button
            aria-label="Compare"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow hover:bg-brand hover:text-white"
          >
            <GitCompareArrows size={13} />
          </button>
          <Link
            href={`/shop/product-details`}
            aria-label="Quick view"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow hover:bg-brand hover:text-white"
          >
            <Eye size={13} />
          </Link>
        </div>
      </div>

      {product.delivery && (
        <p className="mt-2 text-[11px] font-medium text-brand">
          {product.delivery}
        </p>
      )}
      <p className="mt-1 truncate text-[11px] text-muted">{product.shop}</p>

      <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-tight text-ink">
        <Link href={`/shop/product-details`}>{product.name}</Link>
      </h3>

      <div className="mt-1 flex items-center gap-1 text-[11px] text-muted">
        <Star size={12} className="fill-accent text-accent" />
        <span>{product.rating.toFixed(1)}</span>
        <span>({product.reviews})</span>
      </div>

      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-[15px] font-bold text-ink">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-[12px] text-muted line-through">
          ${product.oldPrice.toFixed(2)}
        </span>
      </div>

      <button
        disabled={outOfStock}
        className={`mt-2.5 w-full rounded-full py-1.5 text-[12px] font-semibold transition ${
          outOfStock
            ? "cursor-not-allowed bg-line text-muted"
            : "bg-brand-light text-brand-dark hover:bg-brand hover:text-white"
        }`}
      >
        {outOfStock ? "Notify Me" : "Add to Cart"}
      </button>
    </div>
  );
}
