"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="container-x pt-4 sm:pt-6">
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.hue} px-6 py-10 sm:px-14 sm:py-16`}
      >
        <div className="flex flex-col items-start gap-5 sm:max-w-lg">
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink">
            {slide.eyebrow} · {slide.badge}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            {slide.title}
          </h1>
          <p className="text-sm text-ink/70 sm:text-base">{slide.subtitle}</p>
          <a
            href="#"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
          >
            {slide.cta}
          </a>
        </div>

        <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 text-[10rem] opacity-40 sm:block lg:text-[14rem]">
          {slide.icon}
        </div>

        <button
          aria-label="Previous slide"
          onClick={() =>
            setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow hover:bg-white sm:flex"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow hover:bg-white sm:flex"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
