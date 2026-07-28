"use client";

import { useMemo, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import OrderCard from "@/components/account/OrderCard";
import { RevealStagger, RevealItem } from "@/components/RevealStagger";
import { Search, PackageOpen } from "lucide-react";
import { orders, type OrderStatus } from "@/lib/orders";

const TABS: { label: string; value: OrderStatus | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function OrdersPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["value"]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (tab !== "All" && o.status !== tab) return false;
      if (query && !o.id.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [tab, query]);

  return (
    <AccountLayout title="Orders" subtitle="Track, manage, and review your order history.">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                tab === t.value ? "bg-ink text-white" : "bg-white text-gray-500 hover:text-ink"
              } border ${tab === t.value ? "border-ink" : "border-gray-200"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID..."
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Order list */}
      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <PackageOpen size={36} className="text-gray-300" />
          <p className="mt-3 font-semibold text-ink">No orders found</p>
          <p className="mt-1 text-sm text-gray-400">Try a different filter or search term.</p>
        </div>
      ) : (
        <RevealStagger className="mt-6 space-y-4">
          {filtered.map((order) => (
            <RevealItem key={order.id}>
              <OrderCard order={order} />
            </RevealItem>
          ))}
        </RevealStagger>
      )}
    </AccountLayout>
  );
}