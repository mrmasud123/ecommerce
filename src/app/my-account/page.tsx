import AccountLayout from "@/components/account/AccountLayout";
import { Package, Heart, Star, Wallet, ChevronRight } from "lucide-react";
import { initialCartItems } from "@/lib/data";

const stats = [
  { label: "Total orders", value: "18", icon: Package },
  { label: "Wishlist items", value: "7", icon: Heart },
  { label: "Reward points", value: "1,240", icon: Star },
  { label: "Wallet balance", value: "$32.50", icon: Wallet },
];

const recentOrders = [
  { id: "#SLZ-1042", date: "Jul 21, 2026", status: "Delivered", total: 64.98 },
  { id: "#SLZ-1039", date: "Jul 14, 2026", status: "Shipped", total: 27.49 },
  { id: "#SLZ-1031", date: "Jul 02, 2026", status: "Processing", total: 45.99 },
];

const statusStyle: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  Shipped: "bg-sky-50 text-sky-600",
  Processing: "bg-amber-50 text-amber-600",
};

export default function MyAccountPage() {
  return (
    <AccountLayout title="Dashboard" subtitle="Welcome back, here's what's happening with your account.">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5">
              <s.icon size={16} className="text-ink" />
            </div>
            <p className="mt-3 text-xl font-extrabold text-ink">{s.value}</p>
            <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Recent orders</h2>
          <a href="/my-account/orders" className="flex items-center gap-1 text-xs font-medium text-ink hover:underline">
            View all <ChevronRight size={12} />
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-gray-400">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-gray-100">
                  <td className="py-3 font-medium text-ink">{o.id}</td>
                  <td className="py-3 text-gray-500">{o.date}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-semibold text-ink">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved items preview */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="font-semibold text-ink">Recently viewed</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {initialCartItems.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-100 p-3">
              <div className={`flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br ${item.hue} text-3xl`}>
                {item.icon}
              </div>
              <p className="mt-2 line-clamp-2 text-xs font-medium text-ink">{item.name}</p>
              <p className="mt-1 text-xs font-semibold text-ink">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}