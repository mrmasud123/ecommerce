import { HeartPulse, Shirt, Leaf, Sparkles, ShoppingBasket } from "lucide-react";

const chips = [
  { icon: HeartPulse, label: "Healthcare", className: "top-[14%] left-[18%] animate-float-a" },
  { icon: Shirt, label: "Fashion", className: "top-[8%] right-[16%] animate-float-b", delay: "1.2s" },
  { icon: Leaf, label: "Organic", className: "top-[46%] left-[8%] animate-float-c", delay: "0.6s" },
  { icon: Sparkles, label: "Beauty", className: "bottom-[18%] right-[12%] animate-float-a", delay: "2s" },
  { icon: ShoppingBasket, label: "Groceries", className: "bottom-[10%] left-[24%] animate-float-b", delay: "0.3s" },
];

export default function AuthVisual() {
  return (
    <div className="relative hidden overflow-hidden bg-ink lg:flex lg:w-[45%] lg:flex-col lg:justify-between lg:p-12">
      {/* Ambient glow */}
      <div className="animate-blob-pulse pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      <div
        className="animate-blob-pulse pointer-events-none absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      {/* Floating category chips */}
      {chips.map(({ icon: Icon, label, className, delay }) => (
        <div
          key={label}
          className={`absolute flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm ${className}`}
          style={delay ? { animationDelay: delay } : undefined}
        >
          <Icon size={16} className="text-brand" />
          <span className="text-xs font-medium text-white/80">{label}</span>
        </div>
      ))}

      {/* Brand */}
      <a href="/" className="relative z-10 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-lg font-black text-white">
          M
        </span>
        <span className="text-xl font-extrabold text-white">MCommerce</span>
      </a>

      {/* Headline */}
      <div className="relative z-10 max-w-sm">
        <h1 className="text-3xl font-extrabold leading-tight text-white">
          Everything for everyday life, in one basket.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Health, beauty, groceries and more — curated brands, fair prices,
          delivered fast.
        </p>
      </div>
    </div>
  );
}