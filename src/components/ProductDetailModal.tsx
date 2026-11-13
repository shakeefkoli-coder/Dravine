import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Ruler, 
  Check, 
  MessageSquare,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor, ProductReview } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    quickBuy, 
    toggleWishlist, 
    isInWishlist,
    setIsSizeGuideOpen,
    addReviewToProduct
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('UK 8');
  const [selectedColor, setSelectedColor] = useState<ProductColor>({ name: 'Standard', hex: '#ff6a00' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('Colombo');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewFit, setReviewFit] = useState<'True to Size' | 'Runs Small' | 'Runs Large'>('True to Size');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedSize(selectedProduct.sizes[0] || 'UK 8');
      setSelectedColor(selectedProduct.colors[0] || { name: 'Standard', hex: '#ff6a00' });
      setQuantity(1);
      setActiveTab('details');
      setShowReviewForm(false);
    }
  }, [selectedProduct?.id]);

  if (!selectedProduct) return null;

  const wishlisted = isInWishlist(selectedProduct.id);
  const allImages = [selectedProduct.primaryImage, ...(selectedProduct.galleryImages || [])];
  // Deduplicate
  const uniqueImages = Array.from(new Set(allImages));

  const formatPrice = (amount: number) => `Rs. ${amount.toLocaleString('en-US')}`;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    quickBuy(selectedProduct, selectedSize, selectedColor);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addReviewToProduct(selectedProduct.id, {
      author: reviewName.trim(),
      location: reviewLocation.trim() || 'Sri Lanka',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Exceptional craftsmanship',
      comment: reviewComment.trim(),
      fitFeedback: reviewFit
    });
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-20 p-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors border border-zinc-800"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-zinc-900/50 rounded-2xl border border-zinc-800/80 p-8 flex items-center justify-center overflow-hidden">
              <div 
                className="absolute w-64 h-64 rounded-full bg-orange-500/10 blur-[70px] pointer-events-none" 
                aria-hidden="true" 
              />
              <img
                src={uniqueImages[activeImageIndex] || selectedProduct.primaryImage}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {selectedProduct.isNewArrival && (
                  <span className="px-3 py-1 text-xs font-bold bg-orange-500 text-black rounded uppercase font-mono tracking-wider">
                    New Release
                  </span>
                )}
                {selectedProduct.discountPercent && (
                  <span className="px-2.5 py-0.5 text-xs font-bold text-orange-400 bg-orange-950/80 border border-orange-500/40 rounded font-mono">
                    Save {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {uniqueImages.length > 1 && (
              <div className="flex items-center gap-3">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl bg-zinc-900 border p-2 flex items-center justify-center overflow-hidden transition-all ${
                      activeImageIndex === idx 
                        ? 'border-orange-500 ring-2 ring-orange-500/30' 
                        : 'border-zinc-800 hover:border-zinc-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Studio Origin Trust Note */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-3 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-200">Crafted & Quality Checked in Dehiwala:</span>
                <p className="mt-0.5 text-zinc-400">
                  Each pair undergoes a 24-point hand inspection for sole bond strength, stitching integrity, and ergonomic arch alignment before leaving our Dehiwala studio.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono uppercase tracking-wider text-orange-400 font-semibold">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-xs tabular-nums">{selectedProduct.rating}</span>
                  <span className="text-zinc-500 font-mono">({selectedProduct.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-zinc-400 mt-1 font-light">
                {selectedProduct.tagline}
              </p>

              {/* Price Block */}
              <div className="mt-4 pb-4 border-b border-zinc-800 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono tracking-tight">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through tabular-nums font-mono">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock ({selectedProduct.stockCount} pairs in Dehiwala)
                </span>
              </div>

              {/* Color Selection */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Colorway:</span>
                  <span className="text-zinc-200 font-medium font-mono">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor.name === c.name 
                          ? 'border-orange-500 scale-110' 
                          : 'border-zinc-700 hover:border-zinc-500'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Select Size (Standard UK / Sri Lanka):</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide & Measurement</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all tabular-nums ${
                        selectedSize === size
                          ? 'bg-orange-500 text-black border-orange-500 font-bold shadow-md shadow-orange-500/20'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs text-zinc-400">Quantity:</span>
                <div className="inline-flex items-center border border-zinc-800 rounded-lg bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white tabular-nums font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 text-sm font-bold text-black bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Shopping Bag • {formatPrice(selectedProduct.price * quantity)}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl uppercase tracking-wider transition-all"
                  >
                    Buy Now (Fast Checkout)
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                      wishlisted
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                    title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-orange-400' : ''}`} />
                  </button>
                </div>
              </div>

            </div>

            {/* Delivery & Service Assurances */}
            <div className="pt-6 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Express 24-48h dispatch from Dehiwala across Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Cash on Delivery (COD) & Bank Transfer available</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-orange-500 shrink-0" />
                <span>14-Day size exchange policy in-store or by courier</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Tabbed Information Area */}
        <div className="border-t border-zinc-800 bg-zinc-950 px-6 sm:px-10 py-6">
          <div className="flex items-center gap-6 border-b border-zinc-800 pb-3 text-sm">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-1 font-semibold transition-colors ${
                activeTab === 'details' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Description & Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-1 font-semibold transition-colors ${
                activeTab === 'specs' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-1 font-semibold transition-colors ${
                activeTab === 'reviews' ? 'text-orange-400 border-b-2 border-orange-500' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Verified Reviews ({selectedProduct.reviews?.length || 0})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-4 text-sm text-zinc-300">
                <p className="leading-relaxed">{selectedProduct.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {selectedProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Upper Construction</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.upperMaterial}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Outsole Architecture</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.soleType}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Cushioning Technology</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.cushioning}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Closure Type</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.closure}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Weight / Pair Profile</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.weight}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="text-zinc-500 uppercase tracking-wider font-mono">Manufacture & Studio</div>
                  <div className="text-zinc-200 font-medium mt-1">{selectedProduct.specs.craftedIn}</div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <h4 className="text-base font-bold text-white">Customer Reviews</h4>
                    <p className="text-xs text-zinc-400">Share your experience with this pair from Dravine</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold rounded-lg uppercase tracking-wider transition-all"
                  >
                    {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Review Submission Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-5 rounded-xl bg-zinc-900 border border-orange-500/30 space-y-4">
                    <h5 className="text-sm font-bold text-white">Submit Your Review</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Kasun Silva"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">City / Location in Sri Lanka</label>
                        <input
                          type="text"
                          value={reviewLocation}
                          onChange={(e) => setReviewLocation(e.target.value)}
                          placeholder="e.g. Dehiwala, Colombo 03, Kandy"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value={5}>5 Stars - Outstanding</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Below Expectation</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Fit Feedback</label>
                        <select
                          value={reviewFit}
                          onChange={(e) => setReviewFit(e.target.value as any)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        >
                          <option value="True to Size">True to Size (Perfect Fit)</option>
                          <option value="Runs Small">Runs Slightly Small</option>
                          <option value="Runs Large">Runs Slightly Large</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Incredibly light and stylish"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Detailed Review *</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tell others how comfortable they feel, sole grip, materials, etc..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-orange-500 text-black text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-orange-400 transition-colors"
                    >
                      Publish Verified Review
                    </button>
                  </form>
                )}

                {/* Review items */}
                <div className="space-y-4">
                  {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                    selectedProduct.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{rev.author}</span>
                            <span className="text-zinc-500">· {rev.location}</span>
                            {rev.verified && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-500 font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-zinc-200">{rev.title}</span>
                          <span className="text-[11px] text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded font-mono">
                            Fit: {rev.fitFeedback}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-zinc-500 py-4 text-center">
                      No customer reviews yet. Be the first to share your thoughts on this pair!
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
