import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface ProductGridProps {
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onOrderNow,
  onAddToCart,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'indoor-packages' | 'stand-packages'>('all');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab);

  const indoorPackages = PRODUCTS.filter((p) => p.category === 'indoor-packages');
  const standPackages = PRODUCTS.filter((p) => p.category === 'stand-packages');

  return (
    <section id="packages" className="py-14 sm:py-22 bg-[#FAF9F5] border-t border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest font-extrabold text-emerald-800">
            Our Ready-to-Place Collections
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
            Affordable Indoor Plants &amp; Decorative Sets
          </h2>
          <p className="text-sm sm:text-base text-stone-600 text-balance leading-relaxed">
            Every package is pre-assembled with healthy indoor plants, white ceramic pots, and decorative pebbles. Ready to place in your living room, bedroom, or office.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-12 px-2">
          <div className="inline-flex items-center p-1.5 bg-stone-200/80 rounded-2xl shadow-inner max-w-full overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Packages ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveTab('indoor-packages')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                activeTab === 'indoor-packages'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🌿 Indoor Plant Packs ({indoorPackages.length})
            </button>
            <button
              onClick={() => setActiveTab('stand-packages')}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                activeTab === 'stand-packages'
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🪴 Stand Packages ({standPackages.length})
            </button>
          </div>
        </div>

        {/* Category 1: Indoor Plant Packages */}
        {(activeTab === 'all' || activeTab === 'indoor-packages') && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Category 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 flex items-center gap-2">
                  <span>🌿 Indoor Plant Packages</span>
                  <span className="text-sm font-medium text-stone-500">(8–10 plants each)</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Pots &amp; white river pebbles included · Fixed Price: <strong className="text-emerald-800 font-extrabold">999 BDT</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {indoorPackages.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrderNow={onOrderNow}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category 2: Stand Packages */}
        {(activeTab === 'all' || activeTab === 'stand-packages') && (
          <div id="stands" className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Category 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 flex items-center gap-2">
                  <span>🪴 Stand Packages</span>
                  <span className="text-sm font-medium text-stone-500">(2 plants + metal stand)</span>
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Modern gold finish &amp; rainbow pebbles · Fixed Price: <strong className="text-emerald-800 font-extrabold">500 BDT</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {standPackages.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrderNow={onOrderNow}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trust Strip */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">100% Live Plant Guarantee</p>
              <p className="text-xs text-stone-500">Free replacement if damaged during delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">Cash on Delivery</p>
              <p className="text-xs text-stone-500">Inspect plants at your door before paying</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">Ready to Display</p>
              <p className="text-xs text-stone-500">Pots &amp; decorative pebbles included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
