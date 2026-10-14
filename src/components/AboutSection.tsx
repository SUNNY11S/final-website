import React from 'react';
import { Logo } from './Logo';
import { Heart, MapPin, Sparkles, Facebook, Phone, MessageCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-22 bg-[#F2F6F0] border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-7 sm:p-10 lg:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Heart className="w-3.5 h-3.5 text-emerald-700" />
                <span>Our Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                About Green Page BD
              </h2>

              {/* Exact user quote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-stone-900">
                <blockquote className="text-base sm:text-lg font-medium italic text-emerald-950 leading-relaxed">
                  &ldquo;Green Page BD is dedicated to bringing greenery into every home. Our plant packages are carefully selected to make your space fresh, beautiful, and relaxing.&rdquo;
                </blockquote>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                We are an online plant shop in Bangladesh. We believe that incorporating living plants into your everyday life shouldn&apos;t be expensive or complicated. That&apos;s why our bundled packages come with matching white pots, rich potting soil, and decorative pebbles, ready to display immediately without needing repotting.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-stone-800">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Delivering Across Bangladesh</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Curated for Low Maintenance</span>
                </div>
              </div>

              {/* Social and Hotline buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.facebook.com/share/1HvCMUe39B/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Visit Facebook Page
                </a>

                <a
                  href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD,%20I%20would%20like%20to%20learn%20more%20about%20your%20shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:01914669550"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  01914669550
                </a>
              </div>
            </div>

            {/* Right Brand Showcase Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-stone-100/80 border border-stone-200/90 text-center space-y-6">
              <div className="p-5 bg-white rounded-3xl shadow-sm border border-stone-200 inline-block">
                <Logo size="lg" showText={false} />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                  Green Page BD
                </h3>
                <p className="text-xs uppercase tracking-widest text-emerald-800 font-extrabold">
                  Online Plant Shop · Bangladesh
                </p>
              </div>

              <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
                Transform your apartment, living room, office desk, or balcony with effortless natural tranquility.
              </p>

              <div className="w-full pt-5 border-t border-stone-200/80 flex justify-around text-center text-xs">
                <div>
                  <span className="block text-xl font-black text-emerald-800 tabular-nums">999 BDT</span>
                  <span className="text-stone-500 font-medium">8–10 Plant Sets</span>
                </div>
                <div className="border-r border-stone-200" />
                <div>
                  <span className="block text-xl font-black text-emerald-800 tabular-nums">500 BDT</span>
                  <span className="text-stone-500 font-medium">Metal Stand Sets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
