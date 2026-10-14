import React from 'react';
import { Product } from '../data/products';
import { X, Check, Droplets, Sun, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderNow,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const isStand = product.category === 'stand-packages';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              {product.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-stone-50 text-center text-xs font-semibold text-stone-600 border-t border-stone-100">
                {isStand ? 'Dual metal stand + 2 ceramic pots + gravel' : 'Complete set with ceramic pots & white river pebbles'}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-2xl font-black text-stone-950 tabular-nums">
                  {product.price} <span className="text-sm font-bold text-stone-600">BDT</span>
                </div>
                {product.originalPrice && (
                  <p className="text-xs text-stone-400 line-through tabular-nums">
                    Regular: {product.originalPrice} BDT
                  </p>
                )}
                <p className="text-xs text-emerald-800 font-bold mt-1">
                  100% Cash on Delivery Available
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.shortDesc}
              </p>

              {/* Care snapshot */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs space-y-2 text-stone-700">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Light:</strong> {product.lightRequirement}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Watering:</strong> {product.watering}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Care:</strong> {product.careLevel} level</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plant items */}
          <div className="border-t border-stone-100 pt-5 space-y-3">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider text-xs">
              {isStand ? 'Included In This Stand Set:' : 'Plants Included in this 8–10 Pack:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {product.plantsIncluded.map((plant, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-semibold">{plant}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal Placement */}
          <div className="border-t border-stone-100 pt-4 text-xs text-stone-600">
            <strong>Ideal Placement:</strong> {product.idealFor}
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOrderNow(product);
              }}
              className="flex-1 py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Now ({product.price} BDT)</span>
            </button>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <a
              href={`https://wa.me/8801914669550?text=${encodeURIComponent(`Hello Green Page BD, I would like to order "${product.name}" (${product.price} BDT)`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-4 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs sm:text-sm rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
