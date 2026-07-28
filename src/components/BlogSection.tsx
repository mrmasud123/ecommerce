import { blogPosts } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function BlogSection() {
  return (
    <section className="container-x py-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-lg font-bold text-ink sm:text-2xl">
          Latest Blog
        </h2>
        <a
          href="#"
          className="text-xs font-semibold text-brand hover:underline sm:text-sm"
        >
          View All
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <article key={post.title} className="group">
            <div
              className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${post.hue}`}
            />
            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
              <span className="rounded-full bg-brand-light px-2 py-0.5 font-medium text-brand-dark">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <MessageCircle size={12} /> {post.comments}
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug text-ink group-hover:text-brand">
              {post.title}
            </h3>
            <a
              href="#"
              className="mt-1 inline-block text-xs font-semibold text-brand hover:underline"
            >
              Read More
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
