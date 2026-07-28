import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopClient from "@/components/shop/ShopClient";
import { products } from "@/lib/data";
import Newsletter from "@/components/Newsletter";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function ShopPage() {
  return (
    <>
      <Header />
      <ShopClient products={products} />
      
      <Newsletter />
      <Footer />
      <MobileBottomNav />
    </>
  );
}