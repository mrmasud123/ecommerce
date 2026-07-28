const banners = [
  {
    title: "Your Health, Our Priority",
    desc: "Comprehensive Healthcare Solutions Delivered with Care and Precision",
    hue: "from-emerald-100 to-emerald-50",
    icon: "💊",
  },
  {
    title: "Healthy Eating & Nutritional Wellness",
    desc: "Get Extra 50% Off",
    hue: "from-amber-100 to-amber-50",
    icon: "🥗",
    tag: "Premium",
  },
  {
    title: "Healthy Food Habits for Everyday",
    desc: "Get Extra 50% Off",
    hue: "from-rose-100 to-rose-50",
    icon: "🍯",
    tag: "Premium",
  },
];

export default function PromoBanners() {
  return (
    <section className="container-x grid gap-4 py-8 sm:grid-cols-3">
      {banners.map((b) => (
        <div
          key={b.title}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.hue} p-6`}
        >
          {b.tag && (
            <span className="mb-3 inline-block rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink">
              {b.tag}
            </span>
          )}
          <h3 className="max-w-[10rem] text-lg font-bold leading-snug text-ink">
            {b.title}
          </h3>
          <p className="mt-1 text-xs text-ink/70">{b.desc}</p>
          <a
            href="#"
            className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-brand"
          >
            Shop Now
          </a>
          <span className="pointer-events-none absolute -right-2 -bottom-2 text-7xl opacity-30">
            {b.icon}
          </span>
        </div>
      ))}
    </section>
  );
}
