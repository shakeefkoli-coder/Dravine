import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    promoCode, 
    appliedDiscountPercent, 
    applyPromoCode, 
    removePromoCode, 
    setIsCheckoutOpen,
    setActiveTab
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_TARGET = 15000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_TARGET) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_TARGET - cartSubtotal);

  const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString('en-US')}`;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyPromoCode(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-bold text-white font-display">Shopping Bag</h3>
            <span className="text-xs text-zinc-400 font-mono bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
              {cart.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-zinc-900/60 border-b border-zinc-800 text-xs">
          <div className="flex items-center justify-between text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-orange-400" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-400 font-semibold">You unlocked Free Island-wide Delivery!</span>
              ) : (
                <span>
                  Add <span className="font-bold text-orange-400 tabular-nums">{formatPrice(remainingForFreeShipping)}</span> for Free Delivery
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-zinc-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Your bag is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mt-1">
                  Explore our handcrafted footwear collection and find your perfect pair today.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('shop');
                }}
                className="px-6 py-3 bg-orange-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-orange-400 transition-colors"
              >
                Explore Footwear Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl relative group hover:border-zinc-700 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-zinc-950 rounded-lg p-1.5 flex items-center justify-center border border-zinc-800 shrink-0">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 font-mono">
                      <span>{item.size}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-zinc-700" 
                          style={{ backgroundColor: item.color.hex }} 
                        />
                        <span className="text-[11px]">{item.color.name}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                    {/* Stepper */}
                    <div className="inline-flex items-center border border-zinc-800 rounded bg-zinc-950">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-white tabular-nums font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-sm font-bold text-white tabular-nums font-mono">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
            
            {/* Promo Code Box */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-xs">
                  <div className="flex items-center gap-2 text-orange-400 font-mono">
                    <Tag className="w-4 h-4" />
                    <span>Coupon <strong>{promoCode}</strong> applied ({appliedDiscountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-zinc-400 hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. DRAVINE10)"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
              )}
            </div>

            {/* Price lines */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200 tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-orange-400">
                  <span>Discount ({appliedDiscountPercent}%)</span>
                  <span className="font-mono tabular-nums">- {formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Island-wide Delivery</span>
                <span className="font-mono text-zinc-200 tabular-nums">
                  {cartShipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : formatPrice(cartShipping)}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span className="font-mono tabular-nums text-orange-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-zinc-500">
              Cash on Delivery (COD) · Bank Transfer · Card Payment available
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
