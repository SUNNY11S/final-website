import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenOrder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all duration-200">
      {/* 
        Clean, modern 1-row navigation bar
        (Notice: The previous top banner is completely removed as requested)
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Given Brand Logo & Name */}
        <a href="#" className="flex items-center shrink-0 group py-1" aria-label="Green Page BD Home">
          <Logo size="md" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-700">
          <a href="#packages" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            Plant Packages
          </a>
          <a href="#stands" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            Stand Sets
          </a>
          <a href="#why-us" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            Why Choose Us
          </a>
          <a href="#process" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            How to Order
          </a>
          <a href="#about" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            About Us
          </a>
          <a href="#reviews" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            Reviews
          </a>
          <a href="#faq" className="hover:text-emerald-800 transition-colors whitespace-nowrap">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Direct Actions & Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Direct Hotline button */}
          <a
            href="tel:01914669550"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200/80 whitespace-nowrap"
            title="Call 01914669550"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span className="tabular-nums">01914669550</span>
          </a>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenOrder}
            className="hidden sm:inline-flex items-center justify-center px-4.5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Order Now
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-5 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-stone-800">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              🌿 Indoor Plant Packages (8–10 plants)
            </a>
            <a
              href="#stands"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              🪴 Stand Packages (Metal Stand Sets)
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              Why Choose Us
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              How to Order &amp; Delivery
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              About Green Page BD
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              Customer Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-800"
            >
              Frequently Asked Questions
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs"
            >
              Fill Quick Order Form
            </button>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:01914669550"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 text-stone-800 font-bold rounded-xl"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                01914669550
              </a>
              <a
                href="https://wa.me/8801914669550?text=Hello%20Green%20Page%20BD,%20I%20would%20like%20to%20order%20plants"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 text-white font-bold rounded-xl"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
