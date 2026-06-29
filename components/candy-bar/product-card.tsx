'use client';
 
import { CandyProductRow } from '@/types/candy-bar';
 
interface ProductCardProps {
  product: CandyProductRow;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}
 
export default function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  const price = (product.price_cents / 100).toFixed(2);
 
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-yellow-500/40 transition-colors group flex flex-col">
      {/* Imagen */}
      <div className="relative h-44 overflow-hidden bg-gray-800">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🍿</div>
        )}
        {/* Badge categoría */}
        <span className="absolute top-2 left-2 bg-black/60 text-yellow-400 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {product.category}
        </span>
      </div>
 
      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-white text-sm mb-1 leading-tight">{product.name}</h3>
        {product.description && (
          <p className="text-gray-400 text-xs leading-relaxed flex-1 mb-3">
            {product.description}
          </p>
        )}
 
        <div className="flex items-center justify-between mt-auto">
          <span className="text-yellow-400 font-bold text-base">${price}</span>
 
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              Agregar
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                className="w-7 h-7 rounded-full border border-gray-600 hover:border-yellow-500 text-white hover:text-yellow-400 flex items-center justify-center text-lg font-bold transition-colors"
              >
                −
              </button>
              <span className="text-white font-semibold text-sm w-4 text-center">{quantity}</span>
              <button
                onClick={onAdd}
                className="w-7 h-7 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center text-lg font-bold transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 