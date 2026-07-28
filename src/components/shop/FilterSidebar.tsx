"use client";

import { Star, Store } from "lucide-react";

export type Filters = {
  shops: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
};

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  priceCeiling,
  shopOptions,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
  priceCeiling: number;
  shopOptions: string[];
}) {
  function toggleShop(name: string) {
    const exists = filters.shops.includes(name);
    onChange({
      ...filters,
      shops: exists ? filters.shops.filter((s) => s !== name) : [...filters.shops, name],
    });
  }

  const hasActiveFilters =
    filters.shops.length > 0 || filters.minRating > 0 || filters.inStockOnly || filters.maxPrice < priceCeiling;

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink">Filters</h3>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-xs font-medium text-gray-400 hover:text-ink">
            Clear all
          </button>
        )}
      </div>

      {/* Shop */}
      <div className="mt-6">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Store</h4>
        <div className="space-y-1">
          {shopOptions.map((name) => {
            const active = filters.shops.includes(name);
            return (
              <button
                key={name}
                onClick={() => toggleShop(name)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-ink text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Store size={15} className={active ? "text-brand" : "text-gray-400"} />
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="mt-7">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Max price</h4>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={1}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-ink"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>$0</span>
          <span className="font-semibold text-ink">${filters.maxPrice}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-7">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Minimum rating</h4>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                filters.minRating === r
                  ? "border-ink bg-ink text-white"
                  : "border-gray-200 text-gray-500 hover:border-ink hover:text-ink"
              }`}
            >
              {r}
              <Star size={11} className={filters.minRating === r ? "fill-brand text-brand" : "fill-gray-300 text-gray-300"} />
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mt-7">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-ink focus:ring-ink"
          />
          In stock only
        </label>
      </div>
    </aside>
  );
}