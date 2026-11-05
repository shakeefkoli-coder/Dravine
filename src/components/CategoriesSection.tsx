import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCT_CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';

export const CategoriesSection: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const handleCategoryClick = (categoryName: ProductCategory) => {
    setSelectedCategory(categoryName);
    setActiveTab('shop');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
              Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Explore By Category
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            From precision sports athletics to bespoke formal brogues and tropical island sandals, find the perfect silhouette for your lifestyle.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-orange-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono text-zinc-500 group-hover:text-orange-400 transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-xs text-zinc-400 bg-zinc-950/60 px-2.5 py-0.5 rounded-full border border-zinc-800">
                  {cat.count}+ Models
                </span>
              </div>

              {/* Product Category Image Preview */}
              <div className="my-4 relative h-40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Card Bottom Meta */}
              <div className="z-10 pt-2 border-t border-zinc-800/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-display">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-zinc-800/80 group-hover:bg-orange-500 flex items-center justify-center text-zinc-400 group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Subtle Orange Glow highlight at card bottom */}
              <div 
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-orange-500/0 group-hover:bg-orange-500/20 blur-xl transition-all pointer-events-none"
                aria-hidden="true" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
