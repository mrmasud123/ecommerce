"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";

function useCountdown(hours: number) {
  const [remaining, setRemaining] = useState(hours * 3600);

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.floor(remaining / 86400);
  const h = Math.floor((remaining % 86400) / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return { d, h, m, s };
}

export default function HotDeals() {
  const { d, h, m, s } = useCountdown(72);
  const deals = products.slice(4, 10);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-ink py-10 text-white">
      <div className="container-x">
        <div className="mb-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Limited Time Offer
            </p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              Hot Deals This Week
            </h2>
            <p className="mt-1 max-w-md text-sm text-white/60">
              Weekly deals are back and better than ever. Don&apos;t miss out
              on these limited-time savings!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              ["Days", d],
              ["Hours", h],
              ["Min", m],
              ["Sec", s],
            ].map(([label, val]) => (
              <div
                key={label as string}
                className="flex w-16 flex-col items-center rounded-xl bg-white/10 py-2"
              >
                <span className="text-xl font-bold">{pad(val as number)}</span>
                <span className="text-[10px] text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="self-start rounded-full bg-brand px-5 py-2.5 text-sm font-semibold hover:bg-brand-dark sm:self-center"
          >
            View All Products
          </a>
        </div>

        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 sm:gap-4">
          {deals.map((p) => (
            <div key={p.id} className="shrink-0 [&>div]:bg-white/95">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
