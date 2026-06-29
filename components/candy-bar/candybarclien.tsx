'use client';
 
import { useState, useCallback } from 'react';
import { CandyProductRow, CartItem, DbCandyCategory } from '@/types/candy-bar';
import ProductCard from './product-card';
import CartDrawer from './card-drawer';
 
interface CandyBarClientProps {
  grouped: Record<DbCandyCategory, CandyProductRow[]>;
  categories: DbCandyCategory[];
  categoryEmoji: Record<DbCandyCategory, string>;
}
 
export default function CandyBarClient({ grouped, categories, categoryEmoji }: CandyBarClientProps) {
  const [activeCategory, setActiveCategory] = useState<DbCandyCategory | 'Todos'>('Todos');
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map());
  const [drawerOpen, setDrawerOpen] = useState(false);
 
  // ── Helpers carrito ──────────────────────────────────────────────────────
  const addToCart = useCallback((product: CandyProductRow) => {
    setCart((prev) => {
      const next = new Map(prev);
      const existing = next.get(product.id);
      next.set(product.id, {
        product,
        quantity: existing ? existing.quantity + 1 : 1,
      });
      return next;
    });
  }, []);
 
  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => {
      const next = new Map(prev);
      const existing = next.get(productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        next.delete(productId);
      } else {
        next.set(productId, { ...existing, quantity: existing.quantity - 1 });
      }
      return next;
    });
  }, []);
 
  const clearCart = useCallback(() => setCart(new Map()), []);
 
  const cartItems = Array.from(cart.values());
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
 
  // ── Productos a mostrar según filtro ────────────────────────────────────
  const visibleCategories = activeCategory === 'Todos' ? categories : [activeCategory];
 
  return (
    <div className="max-w-6xl mx-auto px-4 pb-24">
      {/* Filtros de categoría */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        <button
          onClick={() => setActiveCategory('Todos')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'Todos'
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{categoryEmoji[cat]}</span>
            {cat}
          </button>
        ))}
      </div>
 
      {/* Grilla de productos por sección */}
      <div className="space-y-10">
        {visibleCategories.map((cat) => {
          const products = grouped[cat];
          if (products.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>{categoryEmoji[cat]}</span>
                {cat}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={cart.get(product.id)?.quantity ?? 0}
                    onAdd={() => addToCart(product)}
                    onRemove={() => removeFromCart(product.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
 
      {/* FAB carrito flotante */}
      {totalItems > 0 && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-3 rounded-full shadow-lg shadow-yellow-500/30 flex items-center gap-2 transition-all hover:scale-105 z-30"
        >
          🛒
          <span>Ver pedido</span>
          <span className="bg-black text-yellow-400 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}
 
      {/* Drawer carrito */}
      <CartDrawer
        items={cartItems}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={(id) => {
          const item = cart.get(id);
          if (item) addToCart(item.product);
        }}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  );
}