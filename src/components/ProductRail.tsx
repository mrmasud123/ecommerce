"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/data";

export default function ProductRail({
  title,
  subtitle,
  products,
  viewAllHref = "/shop",
  draggable = false,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  draggable?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  // Kept in a ref (not state) so pointer-move doesn't trigger re-renders.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateProgress = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
  };

  useEffect(() => {
    if (!draggable) return;
    const el = scroller.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);

  }, [draggable, products.length]);

  const scroll = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || !scroller.current) return;
    drag.current.active = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startScroll = scroller.current.scrollLeft;
    scroller.current.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || !drag.current.active || !scroller.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    scroller.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    drag.current.active = false;
    setIsDragging(false);
    try {
      scroller.current?.releasePointerCapture(e.pointerId);
    } catch {
    }
  };

  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (draggable && drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="container-x py-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs text-muted sm:text-sm">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {draggable && (
            <span className="hidden items-center gap-1 text-xs text-muted sm:flex">
              <Move size={14} /> Drag to browse
            </span>
          )}
          <a
            href={viewAllHref}
            className="hidden text-xs font-semibold text-brand hover:underline sm:block sm:text-sm"
          >
            View All
          </a>
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={draggable ? { touchAction: "pan-y" } : undefined}
        className={`no-scrollbar flex gap-3 overflow-x-auto pb-1 sm:gap-4 ${
          draggable
            ? `select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`
            : "snap-row"
        }`}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className={draggable ? "shrink-0" : "snap-item"}
            draggable={false}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {draggable && (
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${Math.max(8, progress)}%` }}
          />
        </div>
      )}
    </section>
  );
}
