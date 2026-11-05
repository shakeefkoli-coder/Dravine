import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X, 
  Check, 
  Search, 
  RotateCcw 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory, Product } from '../types';

interface ShopCatalogProps {
  filterMode?: 'all' | 'new-arrivals' | 'best-sellers';
  title?: string;
  subtitle?: string;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ 
  filterMode = 'all', 
  title, 
  subtitle 
}) => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const availableSizes = ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchFilter('');
    setMinPrice(0);
    setMaxPrice(30000);
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Base mode check
      if (filterMode === 'new-arrivals' && !product.isNewArrival) return false;
      if (filterMode === 'best-sellers' && !product.isBestSeller) return false;

      // Category check
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search term
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some(s => product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [filterMode, selectedCategory, searchFilter, minPrice, maxPrice, selectedSizes, inStockOnly, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (searchFilter ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 30000 ? 1 : 0);

  const displayTitle = title || (
    filterMode === 'new-arrivals' ? 'New Arrivals 2026' :
    filterMode === 'best-sellers' ? 'Best Sellers' :
    'Dravine Footwear Catalog'
  );

  const displaySubtitle = subtitle || (
    filterMode === 'new-arrivals' ? 'Freshly engineered silhouettes from our Dehiwala atelier.' :
    filterMode === 'best-sellers' ? 'The most celebrated footwear trusted by athletes and professionals across Sri Lanka.' :
    'Discover our full range of handcrafted leather formals, performance runners, and island sandals.'
  );

  return (
    <section className="py-12 sm:py-16 bg-black min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-zinc-800/80 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-1.5">
              Online Store · Sri Lanka
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
              {displayTitle}
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              {displaySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-semibold text-white flex items-center gap-2"
            >
              <Filter className="w-3.5 h-3.5 text-orange-400" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>
        </div>

        {/* Categories Pills Horizontal Bar (Interactive button-like controls) */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border ${
              selectedCategory === 'All'
                ? 'bg-orange-500 text-black border-orange-500 shadow-md shadow-orange-500/20'
                : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            All Footwear ({PRODUCTS.length})
          </button>
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-orange-500 text-black border-orange-500 shadow-md shadow-orange-500/20'
                    : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 space-y-6 sticky top-24">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  <span>Refine Catalog</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Search Model
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="e.g. Oxford, Speeder..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  <span>Price Range</span>
                  <span className="text-orange-400 tabular-nums">Up to Rs. {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={30000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-1">
                  <span>Rs. 5,000</span>
                  <span>Rs. 30,000</span>
                </div>
              </div>

              {/* Sizes Filter */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Size (UK)
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {availableSizes.map((sz) => {
                    const active = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => handleSizeToggle(sz)}
                        className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                          active
                            ? 'bg-orange-500 text-black border-orange-500 font-bold'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In-stock toggle */}
              <div className="pt-2 border-t border-zinc-800">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-orange-500 focus:ring-orange-500"
                  />
                  <span>In Stock Only ({PRODUCTS.filter(p => p.inStock).length})</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Main Products Grid */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Sorting bar & Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
              <span className="text-xs text-zinc-400">
                Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> of {PRODUCTS.length} footwear styles
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500 whitespace-nowrap">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="featured">Featured & Recommended</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                  <Filter className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No footwear matches your filters</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                    Try adjusting your size, price range or category filter to discover other handcrafted Dravine models.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-orange-500 text-black text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-orange-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </section>
  );
};
