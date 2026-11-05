import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    openProductDetail 
  } = useStore();

  const [localQuery, setLocalQuery] = useState(searchQuery);

  const quickSearches = [
    'Sneakers', 
    'Oxford', 
    'Running', 
    'Sandals', 
    'Full Grain Leather', 
    'Carbon Plate',
    'Kids'
  ];

  const searchResults = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs.upperMaterial.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    });
  }, [localQuery]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleQuickSearchClick = (term: string) => {
    setLocalQuery(term);
    setSearchQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-orange-500 absolute left-4 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search footwear by model, leather, sport, or category..."
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
          />
          {localQuery ? (
            <button
              onClick={() => setLocalQuery('')}
              className="absolute right-12 p-1 text-zinc-500 hover:text-white"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3 p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-500 font-mono">Trending:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearchClick(term)}
              className="px-2.5 py-1 text-xs rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-orange-400 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto space-y-2 divide-y divide-zinc-900">
          {localQuery.trim() === '' ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              Type keywords above to instantly browse the Dravine footwear catalog.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm font-semibold text-white">No footwear found matching "{localQuery}"</p>
              <p className="text-xs text-zinc-500">Try searching for "Sneakers", "Oxford", "Running", or "Sandals"</p>
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="pt-2 flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900/60 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-zinc-900 rounded-lg p-1 border border-zinc-800 flex items-center justify-center shrink-0">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">
                      {product.category}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-zinc-300 font-mono font-semibold tabular-nums">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 text-zinc-500 group-hover:text-orange-400 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
