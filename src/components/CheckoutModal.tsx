import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  Printer,
  ChevronLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONTACT } from '../data/products';
import { CustomerOrder } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    promoCode, 
    placeOrder,
    lastOrder,
    setActiveTab
  } = useStore();

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  // Form states with realistic defaults
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('071');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dehiwala');
  const [district, setDistrict] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('10350');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank_transfer' | 'koko'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Kurunegala', 'Puttalam', 'Anuradhapura',
    'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle', 'Jaffna',
    'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee'
  ];

  const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString('en-US')}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'customer@dravine.lk',
        address: address.trim(),
        city: city.trim(),
        district,
        postalCode: postalCode.trim(),
        paymentMethod,
        notes: notes.trim()
      });
      setCompletedOrder(order);
      setStep('confirmation');
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400">
                Secure Checkout · Sri Lanka Island-Wide
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Order Delivery & Payment
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Dispatching from our Dehiwala atelier. Delivery in 24–48 hours for Western Province.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ruwan Wickramasinghe"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="071 895 7517"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Email Address (for Receipt)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2">
                  2. Delivery Address in Sri Lanka
                </h3>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Street Address / House No. *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. No. 45/2, Galle Road"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Dehiwala"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">District *</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      {sriLankanDistricts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="10350"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Special Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call upon arrival or leave with security"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-800 pb-2">
                  3. Select Payment Method
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <label 
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Banknote className="w-4 h-4 text-orange-400" />
                        <span>Cash On Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Pay in cash upon doorstep delivery across Sri Lanka.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label 
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer' 
                        ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-1 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Building2 className="w-4 h-4 text-orange-400" />
                        <span>Bank Transfer (CEFT)</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Commercial Bank / Sampath Bank direct deposit.
                      </p>
                    </div>
                  </label>

                  {/* Card Payment */}
                  <label 
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <CreditCard className="w-4 h-4 text-orange-400" />
                        <span>Credit / Debit Card</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Visa & Mastercard secure processing.
                      </p>
                    </div>
                  </label>

                  {/* Koko */}
                  <label 
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'koko' 
                        ? 'bg-orange-950/20 border-orange-500 ring-1 ring-orange-500' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'koko'}
                      onChange={() => setPaymentMethod('koko')}
                      className="mt-1 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <span className="w-4 h-4 rounded bg-purple-500 text-[10px] font-black text-white flex items-center justify-center">K</span>
                        <span>Koko 3 Installments</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        3 interest-free monthly payments.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-3">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Items in order ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="font-mono tabular-nums text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-xs text-orange-400">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono tabular-nums">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Island-wide Delivery</span>
                  <span className="font-mono tabular-nums text-emerald-400">
                    {cartShipping === 0 ? 'FREE' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-base text-orange-400 font-mono tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 text-sm font-bold text-black bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 rounded-xl shadow-lg shadow-orange-500/20 uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order • {formatPrice(cartTotal)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  Authentic Dravine Guarantee
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-orange-500" />
                  Dehiwala Dispatch Center
                </span>
              </div>
            </form>
          </div>
        ) : completedOrder ? (
          /* Confirmation Screen */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400">
                Order Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Thank You, {completedOrder.customerName}!
              </h2>
              <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                Your footwear order has been received at our Dehiwala studio. Our fulfillment team is preparing your package for express dispatch.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="text-left bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4 max-w-lg mx-auto">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 text-xs">
                <div>
                  <span className="text-zinc-500 font-mono">ORDER ID:</span>
                  <div className="font-mono font-bold text-orange-400 text-sm">{completedOrder.orderId}</div>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 font-mono">DATE:</span>
                  <div className="text-zinc-300 font-mono text-[11px]">{completedOrder.date}</div>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 max-h-40 overflow-y-auto divide-y divide-zinc-800/40">
                {completedOrder.items.map((it) => (
                  <div key={it.id} className="pt-2 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-white">{it.product.name}</div>
                      <div className="text-zinc-400 font-mono text-[11px]">{it.size} · {it.color.name} (x{it.quantity})</div>
                    </div>
                    <div className="font-mono tabular-nums text-zinc-200">
                      {formatPrice(it.product.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-zinc-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Payment Method:</span>
                  <span className="uppercase font-mono text-zinc-200 font-medium">
                    {completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : completedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Address:</span>
                  <span className="text-zinc-200 text-right max-w-xs">{completedOrder.address}, {completedOrder.city}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800/60 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-orange-400 font-mono tabular-nums">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <a
                href={`https://wa.me/94718957517?text=Hello%20Dravine%20Footwear%2C%20I%20just%20placed%20order%20${completedOrder.orderId}%20for%20${completedOrder.customerName}.%20Please%20confirm%20dispatch%20from%20Dehiwala.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="py-3 px-5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl border border-zinc-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('shop');
                }}
                className="text-xs text-orange-400 hover:text-orange-300 underline font-mono"
              >
                Continue Browsing Dravine Collection
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
