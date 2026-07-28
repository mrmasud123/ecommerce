"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Phone,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {ModeToggle} from "@/components/toggle-button"; 
import NavLink from "./NavLink";

const navLinks = [
  { label: "Home", hasMenu: false, href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Shop", hasMenu: false, href: "/shop" },
  { label: "Blog", hasMenu: false, href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
 
  


  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm">
      {/* Top utility bar */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p>Fashion Category 25% OFF Today</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-1">
              <span>USD</span>
              <ChevronDown size={12} />
            </div>
            <a href="#" className="flex items-center gap-1 hover:text-accent">
              <Phone size={12} /> (480) 555-0103
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <button
          className="text-ink md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>


          <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-lg font-black text-white">
            M
          </span>
          <span className="text-xl font-extrabold tracking-tight text-ink">
            COMMERCE
          </span>
          </Link>

        {/* Search */}
        <div className="hidden flex-1 max-w-xl items-center rounded-full border border-line bg-background px-4 py-2.5 md:flex">
          <input
            type="text"
            placeholder="Search for the items"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <Search size={18} className="shrink-0 text-muted" />
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-ink hover:text-brand md:hidden"
          >
            <Search size={22} />
          </button>
          <ModeToggle />
          <Link
            href="/login"
            className="hidden items-center gap-2 text-sm font-medium text-ink hover:text-brand md:flex"
          >
            <User size={20} />
            <span>
              Log in / <br /> Sign Up
            </span>
          </Link>
          <a
            href="#"
            className="relative text-ink hover:text-brand"
            aria-label="Wishlist"
          >
            <Heart size={22} />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
              3
            </span>
          </a>
          <Link
            href="/cart"
            className="relative text-ink hover:text-brand"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              1
            </span>
          </Link>
        </div>
      </div>

      {/* Secondary nav row */}
      <nav className="hidden border-t border-line md:block">
        <div className="container-x flex h-12 items-center gap-8 text-sm font-medium text-ink">
          {navLinks.map((link) => (
            // <Link
            //   key={link.label}
            //   href={link.href}
            //   className="flex items-center gap-1 hover:text-brand"
            // >
            //   {link.label}
            //   {link.hasMenu && <ChevronDown size={14} />}
            // </Link>
            <NavLink
              href={link.href}
              key={link.label}
              className="flex items-center gap-1 hover:text-brand"
            >
              {link.label}
              {link.hasMenu && <ChevronDown size={14} />}
            </NavLink>
                 
          ))}
          <span className="ml-auto text-xs text-muted">
            Need Support? Call Us{" "}
            <span className="font-semibold text-brand">(480) 555-0103</span>
          </span>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-extrabold text-ink">Sellzy</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <ul className="space-y-4 text-sm font-medium text-ink">
              {navLinks.map((link) => (
                <li key={link.label} className="flex items-center justify-between border-b border-line pb-3">
                  {link.label}
                  {link.hasMenu && <ChevronDown size={14} />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
