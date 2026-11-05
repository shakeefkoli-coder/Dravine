import React from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetail, 
    addToCart, 
    quickBuy, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const wishlisted = isInWishlist(product.id);

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString('en-US')}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'UK 8';
    const defaultColor = product.colors[0] || { name: 'Standard', hex: '#ff6a00' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div 
      onClick={() => openProductDetail(product)}
      className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-zinc-950 flex items-center justify-center p-6 overflow-hidden">
        
        {/* Subtle orange aura glow on hover */}
        <div 
          className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 blur-2xl transition-all duration-500 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-orange-500 text-black rounded-md uppercase tracking-wider font-mono">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-md uppercase tracking-wider font-mono">
              Best Seller
            </span>
          )}
          {product.discountPercent && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-orange-400 bg-orange-950/70 border border-orange-500/40 rounded font-mono">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            wishlisted 
              ? 'bg-orange-500 text-black' 
              : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Product Photo */}
        <img
          src={product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 bg-zinc-900/90 hover:bg-orange-500 text-white hover:text-black text-xs font-semibold rounded-xl border border-zinc-700/80 hover:border-transparent transition-all flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="px-3 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium rounded-xl border border-zinc-700/80 transition-all flex items-center justify-center shadow-lg backdrop-blur-sm"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-mono uppercase tracking-wider text-orange-400/90 text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-xs tabular-nums">{product.rating}</span>
              <span className="text-zinc-600">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors font-display line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Color swatches & Price */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3.5 h-3.5 rounded-full border border-zinc-700/80"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-zinc-500 ml-1 font-mono">
              {product.sizes.length} sizes
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-base font-bold text-white tabular-nums tracking-tight font-mono">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-zinc-500 line-through tabular-nums font-mono">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
