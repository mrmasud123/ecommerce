import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

// Simple brand glyphs (lucide-react no longer ships brand icons)
const socialGlyphs = ["f", "in", "X", "▶", "@"];

const columns = [
  {
    title: "About",
    links: ["About Us", "Terms & Conditions", "Careers", "Latest News", "Contact Us", "Privacy Policy"],
  },
  {
    title: "My Account",
    links: [
      {
        name: "Account",
        href: "/my-account",
      },
      {
        name: "Return Policies",
        href: "#",
      },
      {
        name: "Wishlist",
        href: "#",
      },
      {
        name: "FAQs",
        href: "#",
      }
    ],
  },
  {
    title: "Categories",
    links: ["Healthcare", "Fashion", "Organic", "Beauty", "Groceries", "Fashion"],
  },
];

export default function Footer() {
  return (
      <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-lg font-black text-white">
              M
            </span>
            <span className="text-xl font-extrabold text-white">MCommerce</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Your trusted multipurpose marketplace for health, wellness, and
            everyday essentials — curated brands, fair prices, fast delivery.
          </p>
          <div className="mt-5 flex gap-3">
            {socialGlyphs.map((glyph, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold hover:bg-brand"
              >
                {glyph}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs font-semibold text-white/50">
            Download Our App:
          </p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-lg border border-white/20 px-3 py-2 text-xs">
              Google Play
            </span>
            <span className="rounded-lg border border-white/20 px-3 py-2 text-xs">
              App Store
            </span>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-bold text-white">{col.title}</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {col.links.map((l,index) => (
                <li key={index}>
                  <Link href={typeof l === "string" ? "#" : l.href} className="hover:text-brand">
                    {typeof l === "string" ? l : l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-bold text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              2715 Ash Dr. San Jose, South Dakota 83475
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              (239) 555-0108
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              hello@mcommerce.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>2026 Copyright by MCommerce. All rights reserved.</p>
          <p>Design reference: Themeforest · Rebuilt with Next.js &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
