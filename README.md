# Sellzy Clone (Next.js + Tailwind CSS)

A homepage clone of the Sellzy multipurpose eCommerce template, rebuilt with
**Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## What's included
- Sticky header: top utility bar, logo, search, account/wishlist/cart, full nav row, mobile drawer
- Auto-playing hero slider (4 promotional slides) with manual controls
- Feature strip (Free Shipping / 24x7 Support / 30 Days Return / Secure Payment)
- Horizontally scrollable product rails (Daily Discount, Best Selling, Top Rated, Newly Launched)
- Shop-by-category rail
- Promo banner grid
- "Hot Deals This Week" section with a live countdown timer
- Blog preview grid
- Newsletter signup
- Footer with link columns and contact info
- Mobile bottom navigation bar

## Notes on assets
This environment could not reach the original `sellzy-preview.netlify.app` image
assets, so product/category/hero imagery uses lightweight color + emoji
placeholders that follow the same layout, sizing, and card structure as the
original. Swap `ProductThumb` (and the hero/category art) for real product
photography whenever you're ready — the component API (`hue`, `icon`) can be
switched to an `<Image />` without touching layout code.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx       Root layout, metadata
    page.tsx          Homepage composition
    globals.css        Design tokens (colors, fonts) + Tailwind
  components/
    Header.tsx
    HeroSlider.tsx
    FeatureStrip.tsx
    CategoryRail.tsx
    ProductCard.tsx
    ProductRail.tsx
    ProductThumb.tsx
    PromoBanners.tsx
    HotDeals.tsx
    BlogSection.tsx
    Newsletter.tsx
    Footer.tsx
    MobileBottomNav.tsx
  lib/
    data.ts            Sample product/category/hero data
```
