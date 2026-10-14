import React from 'react';
import { Product } from '../data/products';
import { Check, ShoppingBag, Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOrderNow,
  onAddToCart,
  onQuickView,
}) => {
  const isStand = product.category === 'stand-packages';

  return (
    <article className="group flex flex-col bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Product Image Area */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Category tag */}
        <div className="absolute top-3.5 left-3.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-stone-900 px-3 py-1.5 rounded-xl shadow-xs border border-stone-100">
            {isStand ? '🪴 Metal Stand Set' : '🌿 8–10 Plants Bundle'}
          </span>
        </div>

        {/* Savings tag */}
        {product.originalPrice && (
          <div className="absolute top-3.5 right-3.5">
            <span className="text-[11px] font-bold bg-emerald-800 text-white px-2.5 py-1 rounded-xl shadow-xs">
              Save {product.originalPrice - product.price} BDT
            </span>
          </div>
        )}

        {/* Hover quick-view overlay */}
        <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-stone-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Quick View Details
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {product.badge || (isStand ? 'Stand Package' : 'Indoor Bundle')}
              </p>
              <h3 className="text-xl font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {product.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-stone-950 tabular-nums">
                {product.price} <span className="text-xs font-bold text-stone-600">BDT</span>
              </div>
              {product.originalPrice && (
                <div className="text-xs text-stone-400 line-through tabular-nums">
                  {product.originalPrice} BDT
                </div>
              )}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Key Features List */}
          <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buy Actions */}
        <div className="pt-6 mt-4 border-t border-stone-100 space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onOrderNow(product)}
              className="w-full py-3 px-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Order Now</span>
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-3 px-3 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-stone-800 text-xs font-bold rounded-xl border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
            <button
              onClick={() => onQuickView(product)}
              className="text-stone-600 hover:text-emerald-800 underline font-semibold cursor-pointer"
            >
              See all plants inside
            </button>
            <a
              href={`https://wa.me/8801914669550?text=${encodeURIComponent(`Hello Green Page BD, I want to order "${product.name}" (${product.price} BDT). Please let me know how to proceed.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold"
            >
              <MessageCircle className="w-3 h-3" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
