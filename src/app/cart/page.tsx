import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/product/Breadcrumb";
import CartTable from "@/components/Table";
import OrderSummary from "@/components/OrderSummary";
import Reveal from "@/components/Reveal";
import MobileBottomNav from "@/components/MobileBottomNav";
import Newsletter from "@/components/Newsletter";

const Cart = ()=>{
    return (
        <>
            <Header />
            <main className="flex-1 pb-4">
                <div className="container-x pt-5">
                    <Breadcrumb current="Product Details" />
                </div>
                <section className="container-x py-6">

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

                        <CartTable />
                        <div className="lg:sticky lg:top-6">
                            <OrderSummary />
                        </div>
                    </div>
                </section>
            </main>
            <Reveal>
                <Newsletter />
                <Footer />
            </Reveal>

            <MobileBottomNav />
    </>
    );
}

export default Cart;


