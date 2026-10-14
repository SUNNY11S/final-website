import React from 'react';
import { ArrowRight, CheckCircle2, Truck, Sparkles, MessageCircle, Phone, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onOpenOrder }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:py-20 lg:py-24 bg-gradient-to-b from-[#F2F6F0] via-[#FAF9F5] to-[#FAF9F5]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[32rem] h-[32rem] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-stone-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean pill-free location & trust marker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold tracking-wide text-emerald-800">
              <span className="uppercase tracking-widest text-[11px] font-extrabold bg-emerald-100/90 text-emerald-900 px-3 py-1 rounded-md">
                Green Page BD · Dhaka, Bangladesh
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-emerald-700" />
                Home Delivery Across Bangladesh
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.1] text-balance">
              Bring Nature <br />
              <span className="text-emerald-800">Into Your Home</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-xl text-balance">
              Affordable Indoor Plant Packages &amp; Stylish Stand Sets
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-stone-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>8–10 Indoor plants per package (999 BDT)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pots &amp; decorative pebbles included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Modern 2-plant metal stand sets (500 BDT)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Cash on Delivery across all 64 districts</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] rounded-2xl shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenOrder}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Order via Form</span>
              </button>

              <a
                href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD,%20I%20want%20to%20order%20indoor%20plant%20bundles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-3 flex items-center gap-4 text-xs text-stone-500 border-t border-stone-200/80">
              <div className="flex items-center gap-1.5 font-bold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Safe Transit Guarantee</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                Direct nursery fresh plants for homes &amp; offices in Bangladesh
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-2xl transition-all duration-300">
                <img
                  src="/src/assets/images/hero_plants_luxury_1791648696765.jpg"
                  alt="Aesthetic apartment with indoor plants and plant stands from Green Page BD"
                  className="w-full h-84 sm:h-96 lg:h-[450px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom glass card banner */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                        Indoor Plant Bundles
                      </p>
                      <p className="text-base sm:text-lg font-extrabold">
                        Ready to Decorate Your Space
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-stone-300 block">Starting at</span>
                      <span className="text-2xl font-black text-amber-300 tabular-nums">
                        500 BDT
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating special tag */}
              <div className="absolute -top-3 -right-3 sm:-right-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-extrabold text-stone-400 block leading-tight">
                    Best Value
                  </span>
                  <span className="text-xs font-black text-stone-900">
                    8–10 Plants: 999 BDT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
