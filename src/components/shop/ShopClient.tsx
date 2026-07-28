"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/data";
import { categories } from "@/lib/data";
import { RevealItem, RevealStagger } from "../RevealStagger";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

const PAGE_SIZE = 12;

export default function ShopClient({ products }: { products: Product[] }) {
  const priceCeiling = useMemo(() => Math.ceil(Math.max(...products.map((p) => p.price), 100)), [products]);
  const shopOptions = useMemo(() => Array.from(new Set(products.map((p) => p.shop))), [products]);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    shops: [],
    maxPrice: priceCeiling,
    minRating: 0,
    inStockOnly: false,
  });

  function updateFilters(next: Filters) {
    setFilters(next);
    setPage(1);
  }

  function clearFilters() {
    setFilters({ shops: [], maxPrice: priceCeiling, minRating: 0, inStockOnly: false });
    setPage(1);
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.shops.length && !filters.shops.includes(p.shop)) return false;
      if (p.price > filters.maxPrice) return false;
      if (p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.badge === "Out of Stock") return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [products, query, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeChips = [
    ...filters.shops.map((s) => ({
      key: `shop-${s}`,
      label: s,
      onRemove: () => updateFilters({ ...filters, shops: filters.shops.filter((x) => x !== s) }),
    })),
    ...(filters.minRating > 0
      ? [{ key: "rating", label: `${filters.minRating}+ stars`, onRemove: () => updateFilters({ ...filters, minRating: 0 }) }]
      : []),
    ...(filters.maxPrice < priceCeiling
      ? [{ key: "price", label: `Under $${filters.maxPrice}`, onRemove: () => updateFilters({ ...filters, maxPrice: priceCeiling }) }]
      : []),
    ...(filters.inStockOnly
      ? [{ key: "stock", label: "In stock", onRemove: () => updateFilters({ ...filters, inStockOnly: false }) }]
      : []),
  ];

  return (
    <div className="bg-gray-50">
      <div className="container-x py-8">
        <p className="text-xs text-gray-400">
          <span className="hover:text-ink">Home</span> / <span className="text-ink">Shop</span>
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">All Products</h1>
          <p className="text-sm text-gray-500">{filtered.length} products found</p>
        </div>

        {/* Category browse strip */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setQuery(cat.name)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-ink hover:text-ink"
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-ink"
            />
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-ink hover:text-ink lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 outline-none focus:border-ink"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>

          <div className="flex shrink-0 rounded-full border border-gray-200 bg-white p-1">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${view === "grid" ? "bg-ink text-white" : "text-gray-400 hover:text-ink"}`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${view === "list" ? "bg-ink text-white" : "text-gray-400 hover:text-ink"}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink hover:bg-ink/10"
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-8">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
                priceCeiling={priceCeiling}
                shopOptions={shopOptions}
              />
            </div>
          </div>

          <div className="flex-1">
            {pageItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20 text-center">
                <PackageSearch size={40} className="text-gray-300" />
                <p className="mt-4 font-semibold text-ink">No products match your filters</p>
                <p className="mt-1 text-sm text-gray-400">Try adjusting or clearing your filters.</p>
                <button onClick={clearFilters} className="mt-4 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ink/90">
                  Clear filters
                </button>
              </div>
            ) : (
                <RevealStagger className={view === "grid" ? "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"}>
                {pageItems.map((product) => (
                  <RevealItem key={product.id}>
                    <ProductCard product={product} view={view} />
                  </RevealItem>
                ))}
              </RevealStagger>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-ink hover:text-ink disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                      page === i + 1 ? "bg-ink text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-ink hover:text-ink disabled:opacity-40"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold text-ink">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              priceCeiling={priceCeiling}
              shopOptions={shopOptions}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}