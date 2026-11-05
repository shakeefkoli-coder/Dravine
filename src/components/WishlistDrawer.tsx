import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    openProductDetail, 
    addToCart,
    setActiveTab 
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString('en-US')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
            <h3 className="text-lg font-bold text-white font-display">My Wishlist</h3>
            <span className="text-xs text-zinc-400 font-mono bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
              {wishlistedProducts.length} saved
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Your wishlist is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mt-1">
                  Save your favorite athletic runners, loafers, and oxfords to view them later.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveTab('shop');
                }}
                className="px-6 py-3 bg-orange-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-orange-400 transition-colors"
              >
                Browse Footwear
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl group hover:border-zinc-700 transition-colors"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductDetail(product);
                  }}
                  className="w-20 h-20 bg-zinc-950 rounded-lg p-1.5 flex items-center justify-center border border-zinc-800 shrink-0 cursor-pointer"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400">
                        {product.category}
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product);
                      }}
                      className="text-sm font-bold text-white line-clamp-1 cursor-pointer hover:text-orange-400 transition-colors"
                    >
                      {product.name}
                    </h4>

                    <div className="text-sm font-bold text-white tabular-nums font-mono mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        const defaultSize = product.sizes[0] || 'UK 8';
                        const defaultColor = product.colors[0] || { name: 'Standard', hex: '#ff6a00' };
                        addToCart(product, defaultSize, defaultColor, 1);
                      }}
                      className="flex-1 py-1.5 bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                setActiveTab('shop');
              }}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-800 transition-colors uppercase tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
