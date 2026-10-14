import React from 'react';
import { Package, FileText, PhoneCall, Truck, ArrowRight } from 'lucide-react';

interface OrderProcessProps {
  onStartOrder: () => void;
}

export const OrderProcess: React.FC<OrderProcessProps> = ({ onStartOrder }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose your package',
      description: 'Select your preferred 8–10 indoor plant bundle (999 BDT) or stylish metal stand set (500 BDT).',
      icon: Package
    },
    {
      step: '02',
      title: 'Fill out order form',
      description: 'Provide your name, phone number, and delivery address in Dhaka or anywhere in Bangladesh.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Confirm via phone call',
      description: 'Our customer support team calls you from 01914669550 to verify your order details before dispatch.',
      icon: PhoneCall
    },
    {
      step: '04',
      title: 'Home delivery',
      description: 'Receive fresh, safely packaged plants at your doorstep. Inspect your plants and pay with Cash on Delivery or bKash.',
      icon: Truck
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-22 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            Simple 4-Step Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight text-balance">
            How to Order
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Zero hassle. No advance card registration needed. Order in less than two minutes with complete peace of mind.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-stone-50/80 p-7 rounded-3xl border border-stone-200/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-emerald-900/25 tabular-nums">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-200/50 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartOrder}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <span>Start Your Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
