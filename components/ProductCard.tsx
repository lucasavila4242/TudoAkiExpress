
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  priority?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  priority = false, 
  isWishlisted = false,
  onToggleWishlist 
}) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className={`group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col ${priority ? 'animate-pulse-subtle' : ''}`}>
      {/* Badge Tags */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Mais Vendido</span>
        )}
        {product.deliveryToday && (
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="h-3 w-3" /> Entrega Hoje
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      {onToggleWishlist && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition-all active:scale-90 ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>
      )}

      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden rounded-xl mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">Esgotado</span>
          </div>
        )}
      </Link>

      <div className="flex-grow">
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-[10px] font-bold text-gray-400">{product.rating} ({product.reviewsCount})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <div className="flex flex-wrap items-center gap-x-2">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-red-500 transition-colors">
              {product.name}
            </h3>
            {product.hasFreeShipping && (
              <span className="inline-flex items-center gap-1 text-green-600 font-bold mb-1">
                <Truck className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-tighter">Frete Grátis*</span>
              </span>
            )}
          </div>
        </Link>
        
        <div className="mt-2 flex flex-col">
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through">R$ {product.originalPrice.toFixed(2)}</span>
          )}
          <span className="text-lg font-black text-blue-900">R$ {product.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4">
        {isOutOfStock ? (
          <Link 
            to={`/product/${product.id}`}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            Me avise quando chegar
          </Link>
        ) : (
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-red-500 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-600 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
