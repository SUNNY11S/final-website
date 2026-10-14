import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenOrder: () => void;
  cartCount: number;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenOrder, cartCount }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-3 lg:hidden shadow-xl">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 items-center">
        {/* Call button */}
        <a
          href="tel:01914669550"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-stone-100 active:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-200"
          title="Call Hotline"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="truncate">Call Now</span>
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD,%20I%20would%20like%20to%20order%20indoor%20plants"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
          title="WhatsApp Order"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Primary Order Now button */}
        <button
          onClick={onOpenOrder}
          className="relative flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Order Now</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-900 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
