import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import FeatureStrip from "@/components/FeatureStrip";
import ProductRail from "@/components/ProductRail";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import { featuredProduct, products, reviews } from "@/lib/data";

export const metadata: Metadata = {
  title: `${featuredProduct.name} · Sellzy`,
  description: "Product details, specifications, and customer reviews.",
};

export default function ProductDetailsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 pb-4">
        <div className="container-x pt-5">
          <Breadcrumb current="Product Details" />
        </div>

        <section className="container-x grid gap-10 py-6 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            gallery={featuredProduct.gallery}
            badges={featuredProduct.badges}
          />
          <ProductInfo product={featuredProduct} />
        </section>

        <Reveal>
          <FeatureStrip />
        </Reveal>

        <Reveal>
          <section className="container-x py-6">
            <ProductTabs product={featuredProduct} reviews={reviews} />
          </section>
        </Reveal>

        <Reveal>
          <ProductRail
            title="Related Products"
            subtitle="You may also like"
            products={products.slice(0, 8)}
            draggable
          />
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
