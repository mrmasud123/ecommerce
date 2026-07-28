import { categories } from "@/lib/data";

export default function CategoryRail() {
  return (
    <section className="container-x py-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-ink sm:text-2xl">
            Shop by Category
          </h2>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Up to 69% discount for limited time 🔥
          </p>
        </div>
        <a
          href="#"
          className="hidden text-xs font-semibold text-brand hover:underline sm:block sm:text-sm"
        >
          View All
        </a>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-7 sm:gap-4 sm:overflow-visible lg:grid-cols-9">
        {categories.map((c) => (
          <a
            key={c.name}
            href="#"
            className="flex w-20 shrink-0 flex-col items-center gap-2 text-center sm:w-auto"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-2xl transition group-hover:bg-brand sm:h-20 sm:w-20 sm:text-3xl">
              {c.icon}
            </span>
            <span className="text-[11px] font-medium leading-tight text-ink sm:text-xs">
              {c.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
