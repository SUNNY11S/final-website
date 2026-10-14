import React from 'react';
import { Leaf, Tag, Home, Smartphone, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Fresh and Healthy Plants',
      description: 'Carefully grown and sourced from local nurseries in Bangladesh. Inspected for healthy roots, pest-free stems, and vigorous green foliage before packing.'
    },
    {
      icon: Tag,
      title: 'Affordable Bundle Pricing',
      description: 'Get 8–10 potted indoor plants for just 999 BDT, or stylish metal stand packages for 500 BDT. Maximum value without compromising on ceramic pot aesthetics.'
    },
    {
      icon: Home,
      title: 'Perfect for Home Decoration',
      description: 'Specially chosen leaf shapes, variegations, and heights to elevate living rooms, work desks, bedroom shelves, and dining corners instantly.'
    },
    {
      icon: Smartphone,
      title: 'Easy Ordering System',
      description: 'Order within 60 seconds with our quick form, direct WhatsApp chat, or a phone call to 01914669550. No complex registration or credit cards required.'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-22 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            The Green Page BD Advantage
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight text-balance">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            We make decorating with real indoor plants accessible, aesthetic, and completely stress-free for plant lovers across Bangladesh.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-stone-50/80 border border-stone-200/90 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="w-3.5 h-3.5" />
                  <span>Guaranteed by Green Page BD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
