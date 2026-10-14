import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-22 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            Real Customer Experiences
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight text-balance">
            Customer Testimonials
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            See what customers across Dhaka, Chittagong, and Bangladesh say about our plant packages and delivery service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  {item.packagePurchased}
                </p>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {item.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
