import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import FeatureStrip from "@/components/FeatureStrip";
import CategoryRail from "@/components/CategoryRail";
import ProductRail from "@/components/ProductRail";
import PromoBanners from "@/components/PromoBanners";
import HotDeals from "@/components/HotDeals";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 pb-4">
        {/* Hero is above the fold, so it animates on first paint, not on scroll */}
        <Reveal>
          <HeroSlider />
        </Reveal>

        <Reveal>
          <FeatureStrip />
        </Reveal>

        <Reveal>
          <ProductRail
            title="Daily Discount You'll Love"
            subtitle="Fresh picks, refreshed every day"
            products={products.slice(0, 8)}
            draggable
          />
        </Reveal>

        <Reveal>
          <ProductRail
            title="Best Selling Products"
            subtitle="Up to 69% discount for limited time 🔥"
            products={products.slice(6, 14)}
            draggable
          />
        </Reveal>

        <Reveal>
          <CategoryRail />
        </Reveal>

        <Reveal>
          <PromoBanners />
        </Reveal>

        <Reveal>
          <ProductRail
            title="Top Rated"
            subtitle="Loved by our customers"
            products={products.slice(2, 8)}
            draggable
          />
        </Reveal>

        <Reveal>
          <HotDeals />
        </Reveal>

        <Reveal>
          <ProductRail
            title="Newly Launched Products"
            subtitle="Fresh arrivals, straight to your cart"
            products={products.slice(10, 18)}
            draggable
          />
        </Reveal>

        <Reveal>
          <PromoBanners />
        </Reveal>

        <Reveal>
          <BlogSection />
        </Reveal>

      </main>

      <Reveal>
          <Newsletter />
        <Footer />
      </Reveal>

      <MobileBottomNav />
    </>
  );
}
