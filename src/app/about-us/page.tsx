import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import MobileBottomNav from "@/components/MobileBottomNav";

const stats = [
  { value: "50K+", label: "Happy customers" },
  { value: "1.2K+", label: "Products listed" },
  { value: "300+", label: "Trusted vendors" },
  { value: "8", label: "Years in business" },
];

const values = [
  { icon: Heart, title: "Wellness first", desc: "Every product is chosen with your health in mind, not just margins." },
  { icon: ShieldCheck, title: "Verified vendors", desc: "Every shop on Sellzy is vetted before their first listing goes live." },
  { icon: Truck, title: "Fast, honest delivery", desc: "Real delivery windows, no surprise delays hidden in fine print." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-ink text-white">
          <div className="container-x py-20 text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">About Sellzy</p>
              <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
                A marketplace built around one idea: shopping for your health shouldn&apos;t be hard.
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
                We connect trusted local vendors with people looking for honest wellness,
                beauty, and everyday essentials — all in one place.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="container-x -mt-10 pb-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-ink">{s.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Story */}
        <section className="container-x pb-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-8xl">
                🌿
              </div>
            </Reveal>
            <Reveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Our story</p>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">Started in a small pharmacy, grown into a marketplace</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Sellzy began as a single neighborhood pharmacy that couldn&apos;t keep up with demand
                for reliable, well-priced wellness products. Today it&apos;s a home for hundreds of
                independent vendors — but the standard hasn&apos;t changed: real products, real
                reviews, real people behind every order.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50 py-16">
          <div className="container-x">
            <Reveal>
              <h2 className="text-center text-2xl font-extrabold text-ink">What we stand for</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                      <v.icon size={20} className="text-ink" />
                    </div>
                    <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        <section className="container-x py-16 text-center">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink">Ready to shop with people you can trust?</h2>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Browse the shop
            </Link>
          </Reveal>
        </section>
      </main>
      
      <Newsletter />
      <Footer />
      <MobileBottomNav />
    </>
  );
}