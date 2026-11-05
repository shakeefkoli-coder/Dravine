import React from 'react';
import { Hero } from './Hero';
import { CategoriesSection } from './CategoriesSection';
import { ProductCard } from './ProductCard';
import { PRODUCTS, CRAFT_WORKSHOP_IMG, BRAND_CONTACT } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Star, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab } = useStore();

  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Full-screen Hero Section with Floating Shoe Animation */}
      <Hero />

      {/* 2. Featured Highlights Grid */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
                Flagship Lineup
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                Featured Footwear
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 font-mono"
            >
              <span>View All Footwear</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Categories Section (8 Categories) */}
      <CategoriesSection />

      {/* 4. Promotional Banner Offer */}
      <section className="py-12 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-widest bg-black text-orange-400 px-3 py-1 rounded-full font-mono">
                Island-Wide Special Offer
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight mt-2 text-black">
                Enjoy 10% Off Your First Dravine Order
              </h3>
              <p className="text-xs sm:text-sm font-medium text-black/80 max-w-xl mt-1">
                Use checkout coupon code <strong className="font-mono bg-black text-white px-2 py-0.5 rounded">DRAVINE10</strong> for instant savings on all sneakers, oxfords, and sandals.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-black hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xl"
              >
                Shop Footwear Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="py-16 sm:py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
                Top Rated by Sri Lankan Customers
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('best-sellers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 font-mono"
            >
              <span>Explore All Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Story & Dehiwala Heritage Teaser */}
      <section className="py-16 sm:py-20 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <img
                src={CRAFT_WORKSHOP_IMG}
                alt="Master shoemaker hands at Dravine Dehiwala workshop"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-xs text-white">
                <span className="font-mono text-orange-400 uppercase tracking-widest text-[11px]">Dehiwala Atelier</span>
                <p className="font-display font-bold text-sm">Where hand-cordwainery meets aerodynamic speed</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-orange-400">
                The Dravine Difference
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight leading-tight">
                Every Pair Told Through Craftsmanship & Comfort
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Whether you are stepping into a corporate boardroom in Colombo 01, training along Mount Lavinia beach, or attending a wedding gala, Dravine guarantees uncompromising arch support, lightweight cushioning, and timeless silhouettes.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xl font-black text-orange-400 font-mono">100%</div>
                  <div className="text-zinc-300 font-semibold mt-1">Genuine Materials</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Full-grain leather & PEBA foam</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xl font-black text-orange-400 font-mono">24-48h</div>
                  <div className="text-zinc-300 font-semibold mt-1">Express Island Delivery</div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">Western Province & Outstations</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl border border-zinc-700 transition-colors uppercase tracking-wider"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews Strip */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
              Verified Sri Lankan Buyers
            </div>
            <h2 className="text-3xl font-bold text-white font-display">
              Walked & Tested with Confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white">"Unbelievable comfort and build quality"</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Picked these up from the Dehiwala studio. The orange accents look even better in person. The cushioning is right up there with top global brands.
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="font-bold text-zinc-200">Dinesh Perera</span>
                <span>Colombo 03</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white">"Masterpiece craftsmanship for formal events"</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Wore the Sovereign Oxfords to a presidential dinner. Pristine finishing, flawless brogue perforations, and comfortable right out of the box without break-in pain.
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="font-bold text-zinc-200">Dr. Ruwan W.</span>
                <span>Colombo 07</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white">"Super fast 24h delivery to Mount Lavinia"</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Ordered via COD and arrived the next morning. The grip on wet tarmac during rain is phenomenal. Dravine is definitely my new go-to shoe brand.
              </p>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="font-bold text-zinc-200">Kavindu Senanayake</span>
                <span>Mount Lavinia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
