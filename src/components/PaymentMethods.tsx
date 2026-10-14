import React from 'react';
import { Banknote, Smartphone, CheckCircle2 } from 'lucide-react';

export const PaymentMethods: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F5] border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            Safe &amp; Flexible
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight text-balance">
            Payment Options
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Choose the most convenient payment method for your home or office order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Option 1: Cash on Delivery */}
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Banknote className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                  Most Popular
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-stone-900">
                  Cash on Delivery (COD)
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Pay cash directly to the delivery rider once your plants arrive at your doorstep in Bangladesh.
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Inspect your plants before making payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Zero upfront payment or card required</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Available across all 64 districts in Bangladesh</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 text-xs text-stone-500 font-semibold">
              Available for all 999 BDT &amp; 500 BDT packages
            </div>
          </div>

          {/* Option 2: bKash */}
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E2136E]/10 text-[#E2136E] flex items-center justify-center font-bold text-xl">
                  <Smartphone className="w-7 h-7 text-[#E2136E]" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-pink-50 text-[#E2136E] px-3 py-1.5 rounded-xl border border-pink-200">
                  Instant Mobile Payment
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-stone-900">
                  bKash Payment
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Convenient bKash mobile payment for contactless delivery or gifting plant bundles directly to loved ones.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200 text-xs space-y-1.5 text-stone-800">
                <p className="font-extrabold text-[#E2136E] text-sm">bKash Number: 01914669550</p>
                <p className="text-stone-600">Send money or make payment with your Mobile Number as reference</p>
              </div>

              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-stone-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Ideal for surprise gifts or office corporate orders</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Instant payment SMS confirmation</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 text-xs text-stone-500 font-semibold">
              Hotline for bKash queries: 01914669550
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
