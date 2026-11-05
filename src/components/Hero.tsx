import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Eye, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HERO_SNEAKER_IMG, PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { setActiveTab, openProductDetail, quickBuy } = useStore();
  const heroProduct = PRODUCTS[0]; // Dravine Apex Kinetic X

  return (
    <section className="relative overflow-hidden bg-black pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-zinc-900">
      {/* Background ambient lighting effects */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[110px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Grid line subtle backdrop pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b15_1px,transparent_1px),linear-gradient(to_bottom,#18181b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 z-10">
            
            {/* Brand Kicker / Location Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 w-fit backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="font-semibold text-orange-400">DRAVINE FOOTWEAR</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Dehiwala, Sri Lanka</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-display text-balance">
              Step Into Style. <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Walk With Confidence.
              </span>
            </h1>

            {/* User Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              Discover the latest collection of stylish, comfortable, and high-quality footwear for every occasion.
              Engineered with ergonomic precision and crafted with master heritage at our Dehiwala studio.
            </p>

            {/* Prominent Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-bold text-black bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 hover:from-orange-400 hover:to-orange-500 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('categories');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-orange-500/50 rounded-xl transition-all duration-200"
              >
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Adjacency Trust Bar */}
            <div className="pt-8 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>100% Genuine Materials</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Island-wide Express Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-orange-500 shrink-0" />
                <span>14-Day Easy Exchange</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Dehiwala Atelier Craft</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Shoe Showcase with Subtle Ambient Glow */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Radial orange glow directly behind the floating shoe */}
            <div 
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-500/20 blur-[80px] pointer-events-none -z-0"
              aria-hidden="true" 
            />

            {/* Floating Shoe Container with keyframe animation */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              
              <div className="animate-shoe-float w-full h-full flex items-center justify-center relative z-10 cursor-pointer"
                   onClick={() => openProductDetail(heroProduct)}
                   title="Click to view Dravine Apex Kinetic X"
              >
                <img
                  src={HERO_SNEAKER_IMG}
                  alt="Dravine Apex Kinetic X Floating Shoe"
                  referrerPolicy="no-referrer"
                  className="w-[90%] sm:w-[95%] h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-300"
                />

                {/* Interactive Floating Product Tag */}
                <div className="absolute -bottom-2 right-4 sm:right-6 bg-zinc-950/90 border border-zinc-800 hover:border-orange-500/80 p-3 sm:p-4 rounded-2xl backdrop-blur-md shadow-2xl transition-all group max-w-[240px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400">Flagship Runner</span>
                      <h4 className="text-sm font-bold text-white leading-tight">Apex Kinetic X</h4>
                      <p className="text-xs font-semibold text-zinc-300 tabular-nums mt-0.5">Rs. 18,500</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        quickBuy(heroProduct);
                      }}
                      className="p-2 bg-orange-500 hover:bg-orange-400 text-black rounded-lg transition-transform hover:scale-110 shadow-sm"
                      title="Quick Buy"
                      aria-label="Buy Apex Kinetic X Now"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      In Stock
                    </span>
                    <span className="text-orange-400 group-hover:underline flex items-center gap-0.5">
                      Details <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

              </div>

              {/* Shadow underneath floating shoe that pulses with the float cycle */}
              <div 
                className="absolute -bottom-4 w-3/4 h-8 bg-black/80 rounded-[100%] blur-md animate-shadow-pulse pointer-events-none"
                aria-hidden="true" 
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
