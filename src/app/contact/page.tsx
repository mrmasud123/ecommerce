import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import MobileBottomNav from "@/components/MobileBottomNav";
import Newsletter from "@/components/Newsletter";

const info = [
  { icon: MapPin, label: "Address", value: "2715 Ash Dr. San Jose, South Dakota 83475" },
  { icon: Phone, label: "Phone", value: "(239) 555-0108" },
  { icon: Mail, label: "Email", value: "hello@sellzy.example" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–7pm" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-white">
          <div className="container-x py-16 text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Get in touch</p>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">We&apos;d love to hear from you</h1>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
                Questions about an order, a vendor partnership, or just feedback — send it over.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container-x py-16">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Info column */}
            <Reveal direction="right" className="lg:col-span-2">
              <div className="space-y-4">
                {info.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/5">
                      <item.icon size={16} className="text-ink" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.label}</p>
                      <p className="mt-0.5 text-sm text-ink">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="left" className="lg:col-span-3">
              <form className="space-y-4 rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
                />
                <textarea
                  placeholder="Your message"
                  rows={5}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-8"
                >
                  Send message
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      
      <Newsletter />
      <Footer />
      <MobileBottomNav />
    </>
  );
}