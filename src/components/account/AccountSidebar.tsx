"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/my-account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/my-account/orders", label: "Orders", icon: Package },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/my-account/addresses", label: "Addresses", icon: MapPin },
  { href: "/my-account/payments", label: "Payment methods", icon: CreditCard },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-2xl border border-gray-100 bg-white p-3">
        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-ink text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} className={active ? "text-brand" : "text-gray-400"} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-2 border-t border-gray-100 pt-2">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}