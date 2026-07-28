import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { RevealStagger, RevealItem } from "@/components/RevealStagger";
import { MessageCircle, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Newsletter from "@/components/Newsletter";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-white">
          <div className="container-x py-16 text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">Sellzy Journal</p>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Notes on wellness, worth reading</h1>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
                Short, honest reads on health, skincare, and everyday habits from our team.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="container-x py-16">
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <RevealItem key={post.title}>
                <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]">
                  <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${post.hue} text-5xl`}>
                    📝
                  </div>
                  <div className="p-5">
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-semibold text-ink">
                      {post.category}
                    </span>
                    <h2 className="mt-3 font-semibold text-ink transition-colors group-hover:text-brand">
                      {post.title}
                    </h2>
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={12} /> {post.comments} comments
                      </span>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>
      </main>
      
      <Newsletter />  
      <Footer />
      <MobileBottomNav />
    </>
  );
}