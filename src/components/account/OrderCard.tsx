"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Truck,
  MapPin,
  CreditCard,
  Package,
  RotateCcw,
  FileText,
  XCircle,
} from "lucide-react";
import type { Order } from "@/lib/orders";

const statusStyle: Record<Order["status"], string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  Shipped: "bg-sky-50 text-sky-600",
  Processing: "bg-amber-50 text-amber-600",
  Cancelled: "bg-rose-50 text-rose-500",
};

const statusStep: Record<Order["status"], number> = {
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
  Cancelled: 0,
};

export default function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      {/* Summary row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5">
            <Package size={18} className="text-ink" />
          </div>
          <div>
            <p className="font-semibold text-ink">{order.id}</p>
            <p className="text-xs text-gray-400">
              Placed on {order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[order.status]}`}>
            {order.status}
          </span>
          <span className="font-semibold text-ink">${order.total.toFixed(2)}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={16} className="text-gray-400" />
          </motion.span>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-5">
              {/* Tracking progress */}
              {order.status !== "Cancelled" ? (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {["Processing", "Shipped", "Delivered"].map((step, i) => {
                      const stepIndex = i + 1;
                      const reached = stepIndex <= statusStep[order.status];
                      return (
                        <div key={step} className="flex flex-1 items-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                                reached ? "bg-ink text-white" : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {stepIndex}
                            </div>
                            <span className={`text-[11px] font-medium ${reached ? "text-ink" : "text-gray-400"}`}>
                              {step}
                            </span>
                          </div>
                          {i < 2 && (
                            <div className={`mx-2 h-[2px] flex-1 rounded-full ${stepIndex < statusStep[order.status] ? "bg-ink" : "bg-gray-100"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {order.tracking && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                      <Truck size={12} /> Tracking ID: <span className="font-medium text-ink">{order.tracking}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-500">
                  <XCircle size={16} /> This order was cancelled.
                </div>
              )}

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.hue} text-2xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-ink">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.color} · {item.size} · Qty {item.qty}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-ink">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Address + payment */}
              <div className="mt-5 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-xs text-gray-500">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-gray-400" />
                  {order.address}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CreditCard size={13} className="shrink-0 text-gray-400" />
                  {order.payment}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-ink hover:text-ink">
                  <FileText size={13} /> View invoice
                </button>
                <button className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-ink hover:text-ink">
                  <RotateCcw size={13} /> Reorder
                </button>
                {order.status === "Processing" && (
                  <button className="flex items-center gap-1.5 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50">
                    <XCircle size={13} /> Cancel order
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}