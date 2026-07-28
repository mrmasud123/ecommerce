"use client";

import { Home, ShoppingBag, Heart, User } from "lucide-react";

const items = [
  { label: "Home", icon: Home },
  { label: "My Order", icon: ShoppingBag },
  { label: "Wishlist", icon: Heart },
  { label: "Account", icon: User },
];

export default function MobileBottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 flex h-16 items-center justify-around border-t border-line bg-surface md:hidden">
      {items.map(({ label, icon: Icon }) => (
        <a
          key={label}
          href="#"
          className="flex flex-col items-center gap-1 text-[10px] font-medium text-muted hover:text-brand"
        >
          <Icon size={20} />
          {label}
        </a>
      ))}
    </nav>
  );
}
