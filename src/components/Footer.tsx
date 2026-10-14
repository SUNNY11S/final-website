import React from 'react';
import { Logo } from './Logo';
import { Phone, MessageCircle, Facebook, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="md" lightMode={true} />

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Green Page BD is an online plant shop in Bangladesh. We sell indoor plant bundles and stylish plant stand packages for home and office decoration.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1HvCMUe39B/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:01914669550"
                className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Phone Hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Packages &amp; Stand Sets
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition-colors">
                  10 Pcs Mega Pack (White Pebbles) - 1099 BDT
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition-colors">
                  10 Pcs Mega Pack (Color Pebbles) - 1150 BDT
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition-colors">
                  Starter Green Pack (999 BDT)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition-colors">
                  Home Decor Pack (999 BDT)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition-colors">
                  Premium Green Pack (999 BDT)
                </a>
              </li>
              <li>
                <a href="#stands" className="hover:text-emerald-400 transition-colors">
                  Classic Stand Set (500 BDT)
                </a>
              </li>
              <li>
                <a href="#stands" className="hover:text-emerald-400 transition-colors">
                  Mini Stand Decor (500 BDT)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support &amp; Orders
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: <a href="tel:01914669550" className="text-white font-bold hover:underline">01914669550</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: <a href="https://wa.me/8801914669550" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:underline">01914669550</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Serving Dhaka &amp; all 64 Districts in Bangladesh</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                Accepted Payment Options:
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-stone-900 text-stone-300 text-[11px] font-semibold rounded-lg border border-stone-800">
                  Cash on Delivery
                </span>
                <span className="px-2.5 py-1 bg-[#E2136E]/20 text-pink-300 text-[11px] font-semibold rounded-lg border border-pink-900/30">
                  bKash
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Green Page BD. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for plant lovers in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};
