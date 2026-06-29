'use client';
 
import { CartItem } from '@/types/candy-bar';
 
interface CartDrawerProps {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}
 
export default function CartDrawer({ items, open, onClose, onAdd, onRemove, onClear }: CartDrawerProps) {
  const total = items.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
 
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
 
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900 border-l border-gray-800 z-50 flex flex-col
          transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div>
            <h2 className="font-bold text-white text-lg">Tu pedido</h2>
            <p className="text-gray-400 text-xs">{totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>
 
        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-gray-400 text-sm">Tu carrito está vacío.</p>
              <p className="text-gray-500 text-xs mt-1">Agregá productos del menú.</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
                {product.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{product.name}</p>
                  <p className="text-yellow-400 text-xs font-semibold">
                    ${(product.price_cents / 100).toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => onRemove(product.id)}
                    className="w-6 h-6 rounded-full border border-gray-600 hover:border-red-400 text-gray-300 hover:text-red-400 flex items-center justify-center text-sm font-bold transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white text-sm w-4 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => onAdd(product.id)}
                    className="w-6 h-6 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center text-sm font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
 
        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-white font-bold text-xl">${(total / 100).toFixed(2)}</span>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors text-sm">
              Continuar con la reserva →
            </button>
            <button
              onClick={onClear}
              className="w-full text-gray-500 hover:text-gray-300 text-xs py-1 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}