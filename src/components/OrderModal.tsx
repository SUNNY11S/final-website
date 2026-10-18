import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { X, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: Product | null;
  cartItems?: CartItem[];
  products?: Product[];
  onOrderSuccess?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  cartItems = [],
  products = PRODUCTS,
  onOrderSuccess
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside-dhaka'>('dhaka');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    total: number;
    items: CartItem[];
    name: string;
    phone: string;
    address: string;
    zone: string;
    payment: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedProduct) {
      setItems([{ product: preselectedProduct, quantity: 1 }]);
    } else if (cartItems.length > 0) {
      setItems([...cartItems]);
    } else {
      setItems(products.length ? [{ product: products[0], quantity: 1 }] : []);
    }
  }, [preselectedProduct, cartItems, isOpen, products]);

  if (!isOpen) return null;

  const deliveryFee = deliveryZone === 'dhaka' ? 80 : 130;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const addItemToOrder = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product: prod, quantity: 1 }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setSubmitError('Please fill in your name, phone number, and delivery address.');
      return;
    }
    if (items.length === 0) {
      setSubmitError('Please select at least one package to order.');
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setSubmitError('Online order saving is not configured yet. Please contact the store or try again later.');
      return;
    }

    setIsSubmitting(true);
    const orderId = `GP-${Date.now().toString().slice(-7)}`;
    const deliveryFeeValue = deliveryZone === 'dhaka' ? 80 : 130;
    const orderItems = items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));
    const { error } = await supabase.from('orders').insert({
      order_code: orderId,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      delivery_address: deliveryAddress.trim(),
      delivery_zone: deliveryZone,
      payment_method: paymentMethod,
      items: orderItems,
      subtotal,
      delivery_fee: deliveryFeeValue,
      total: subtotal + deliveryFeeValue,
      status: 'pending'
    });
    setIsSubmitting(false);
    if (error) {
      setSubmitError('We could not save your order. Please try again. (' + error.message + ')');
      return;
    }

    setCompletedOrder({
      orderId,
      total: subtotal + deliveryFeeValue,
      items,
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: deliveryAddress.trim(),
      zone: deliveryZone === 'dhaka' ? 'Inside Dhaka City' : 'Outside Dhaka (Nationwide)',
      payment: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'bKash Mobile Payment'
    });
    if (onOrderSuccess) onOrderSuccess();
  };

  const getWhatsAppOrderLink = () => {
    if (!completedOrder) return '';
    const itemSummary = completedOrder.items
      .map((item) => `• ${item.product.name} (Qty: ${item.quantity}) - ${item.product.price * item.quantity} BDT`)
      .join('\n');

    const msg = `🌿 *NEW ORDER: ${completedOrder.orderId}*
*Customer:* ${completedOrder.name}
*Phone:* ${completedOrder.phone}
*Address:* ${completedOrder.address} (${completedOrder.zone})
*Payment:* ${completedOrder.payment}

*Items:*
${itemSummary}

*Delivery Fee:* ${deliveryZone === 'dhaka' ? '80 BDT' : '130 BDT'}
*Total Amount:* ${completedOrder.total} BDT

Please confirm my order and inform delivery schedule. Thank you!`;

    return `https://wa.me/8801914669550?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold block">
              Green Page BD
            </span>
            <h3 className="text-lg font-bold">
              {completedOrder ? 'Order Received!' : 'Quick Order Form'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {completedOrder ? (
            /* Success State */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-stone-900">
                  Thank you, {completedOrder.name}!
                </h4>
                <p className="text-xs text-stone-500">
                  Your order has been recorded. Our representative will call you shortly to verify delivery.
                </p>
                <div className="inline-block mt-2 px-3 py-1 bg-stone-100 rounded-lg text-xs font-mono font-bold text-stone-800">
                  Order ID: {completedOrder.orderId}
                </div>
              </div>

              {/* Receipt Box */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-left text-xs space-y-2.5">
                <div className="font-bold text-stone-800 border-b border-stone-200 pb-2">
                  Order Details Summary
                </div>
                {completedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-stone-700">
                    <span>
                      {item.product.name} &times; {item.quantity}
                    </span>
                    <span className="font-bold tabular-nums">
                      {item.product.price * item.quantity} BDT
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-stone-500 pt-1">
                  <span>Delivery ({completedOrder.zone})</span>
                  <span className="tabular-nums font-semibold">{deliveryFee} BDT</span>
                </div>
                <div className="flex justify-between text-stone-900 font-black text-sm border-t border-stone-200 pt-2">
                  <span>Total Payable</span>
                  <span className="text-emerald-800 tabular-nums">{completedOrder.total} BDT</span>
                </div>
                <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-200 space-y-1">
                  <p><strong>Deliver to:</strong> {completedOrder.address}</p>
                  <p><strong>Phone:</strong> {completedOrder.phone}</p>
                  <p><strong>Payment:</strong> {completedOrder.payment}</p>
                </div>
              </div>

              {/* Fast WhatsApp Confirmation CTA */}
              <div className="space-y-2.5">
                <a
                  href={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Order to WhatsApp for Instant Confirmation</span>
                </a>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="tel:01914669550"
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl border border-stone-200 flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-emerald-700" />
                    Call 01914669550
                  </a>
                  <button
                    onClick={() => {
                      setCompletedOrder(null);
                      onClose();
                    }}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl border border-stone-200"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{submitError}</div>}
              {/* Selected Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <span>Selected Package(s)</span>
                  <span className="text-emerald-700 font-semibold lowercase">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-center text-xs text-stone-500">
                    Your order is empty. Please select a package below:
                    <div className="mt-2 flex flex-wrap gap-1.5 justify-center">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addItemToOrder(p.id)}
                          className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[11px] font-semibold text-emerald-800 hover:bg-emerald-50"
                        >
                          + {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-900 truncate">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] text-emerald-800 font-bold tabular-nums">
                              {item.product.price} BDT
                            </p>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    We will call this number to confirm delivery schedule.
                  </p>
                </div>

                {/* Delivery Zone Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Delivery Area <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('dhaka')}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        deliveryZone === 'dhaka'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="block font-bold">Inside Dhaka City</span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        Delivery Charge: 80 BDT (24-48 hrs)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryZone('outside-dhaka')}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        deliveryZone === 'outside-dhaka'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="block font-bold">Outside Dhaka</span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        Delivery Charge: 130 BDT (2-3 days)
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Complete Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Apartment #, Road #, Sector/Area, Thana, District"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 bg-white"
                  />
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Select Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-700'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="block font-bold">Cash on Delivery</span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        Pay at doorstep
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        paymentMethod === 'bkash'
                          ? 'border-[#E2136E] bg-pink-50 text-stone-900 ring-1 ring-[#E2136E]'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="block font-bold text-[#E2136E]">bKash Payment</span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        To 01914669550
                      </span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'bkash' && (
                  <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-xs text-stone-700 space-y-1">
                    <p className="font-bold text-[#E2136E]">bKash Instructions:</p>
                    <p>Send money to <strong>01914669550</strong>. You can provide transaction reference when our representative calls you.</p>
                  </div>
                )}
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold tabular-nums">{subtotal} BDT</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charge</span>
                  <span className="font-bold tabular-nums">{deliveryFee} BDT</span>
                </div>
                <div className="flex justify-between text-stone-900 font-black text-sm border-t border-stone-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-emerald-800 tabular-nums">{total} BDT</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <span>Confirm Order ({total} BDT)</span>
                  )}
                </button>

                <p className="text-[11px] text-stone-500 text-center">
                  🔒 Zero risk · 100% replacement guarantee if damaged in delivery
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
