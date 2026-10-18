import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OrderProcess } from './components/OrderProcess';
import { AboutSection } from './components/AboutSection';
import { PaymentMethods } from './components/PaymentMethods';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { OrderModal, CartItem } from './components/OrderModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Product, PRODUCTS } from './data/products';
import { supabase, type ProductRow } from './lib/supabase';

export function App() {
  const [dbProducts, setDbProducts] = useState<ProductRow[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('products').select('*').then(({ data }) => {
      if (data) setDbProducts(data as ProductRow[]);
    });
  }, []);

  const catalogProducts = useMemo(() => {
    const mapped = dbProducts.filter((p) => p.is_active).map((p): Product => ({
      id: p.id, name: p.name, category: p.category, categoryLabel: p.category_label,
      price: p.price, originalPrice: p.original_price ?? undefined, badge: p.badge ?? undefined,
      shortDesc: p.short_desc, features: p.features ?? [], plantsIncluded: p.plants_included ?? [],
      careLevel: p.care_level, lightRequirement: p.light_requirement, watering: p.watering,
      image: p.image_url, idealFor: p.ideal_for
    }));
    if (!dbProducts.length) return PRODUCTS;
    const overrides = new Map(mapped.map((p) => [p.id, p]));
    const merged = PRODUCTS.map((p) => overrides.get(p.id) ?? p);
    const existing = new Set(PRODUCTS.map((p) => p.id));
    return [...merged.filter((p) => !dbProducts.some((row) => row.id === p.id && !row.is_active)), ...mapped.filter((p) => !existing.has(p.id))];
  }, [dbProducts]);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setOrderNotification(`Added "${product.name}" to cart!`);
    setTimeout(() => {
      setOrderNotification(null);
    }, 2800);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderNow = (product: Product) => {
    setPreselectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleOpenGeneralOrderModal = () => {
    setPreselectedProduct(null);
    setIsOrderModalOpen(true);
  };

  const handleProceedToCheckout = () => {
    setPreselectedProduct(null);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleShopNow = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-800">
      {/* Header with GP Logo (No top banner) */}
      <Header
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={handleOpenGeneralOrderModal}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onShopNow={handleShopNow}
          onOpenOrder={handleOpenGeneralOrderModal}
        />

        {/* 2. Product Section (8–10 plant bundles & metal stand sets) */}
        <ProductGrid
          products={catalogProducts}
          onOrderNow={handleOrderNow}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />

        {/* 3. Why Choose Us (4 pillars) */}
        <WhyChooseUs />

        {/* 4. Order Process (4 steps) */}
        <OrderProcess onStartOrder={handleOpenGeneralOrderModal} />

        {/* 5. About Section */}
        <AboutSection />

        {/* 6. Payment Options (COD & bKash) */}
        <PaymentMethods />

        {/* 7. Customer Reviews */}
        <Testimonials />

        {/* 8. FAQ Accordion */}
        <FaqSection />

        {/* 9. Contact & Social Channels */}
        <ContactSection />
      </main>

      {/* Footer with GP Logo */}
      <Footer />

      {/* Bottom Sticky Mobile Quick Bar */}
      <MobileQuickBar
        onOpenOrder={handleOpenGeneralOrderModal}
        cartCount={cartTotalItems}
      />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Instant Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedProduct={preselectedProduct}
        products={catalogProducts}
        cartItems={cart}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onOrderNow={handleOrderNow}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      {orderNotification && (
        <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-slide-up text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{orderNotification}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-emerald-400 underline font-bold"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
