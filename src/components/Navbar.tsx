import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONTACT } from '../data/products';
import { ActiveTab } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    totalCartItems, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: ActiveTab; categoryFilter?: string }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Shop', tab: 'shop' },
    { label: 'Categories', tab: 'categories' },
    { label: 'New Arrivals', tab: 'new-arrivals' },
    { label: 'Best Sellers', tab: 'best-sellers' },
    { label: 'About Us', tab: 'about' },
    { label: 'Contact Us', tab: 'contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Promotional & Contact Utility Bar */}
      <div className="bg-zinc-950 border-b border-zinc-900 text-xs text-zinc-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Island-wide Express Delivery in Sri Lanka
            </span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:inline text-orange-400 font-medium">
              10% Off with Code: <span className="underline decoration-orange-500 font-mono tracking-wider font-semibold">DRAVINE10</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${BRAND_CONTACT.phone}`} 
              className="flex items-center gap-1 text-zinc-300 hover:text-orange-400 transition-colors"
              title="Call Dravine Dehiwala"
            >
              <Phone className="w-3 h-3 text-orange-500" />
              <span>{BRAND_CONTACT.phoneFormatted}</span>
            </a>
            <span className="text-zinc-700">·</span>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span>Dehiwala Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header (Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="group flex items-center gap-2.5 text-left shrink-0 focus:outline-none"
            aria-label="Dravine Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-black text-xl tracking-tighter shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white font-display uppercase group-hover:text-orange-400 transition-colors">
                DRAVINE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 -mt-1 font-mono">
                Dehiwala · LK
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`relative py-1 text-sm whitespace-nowrap shrink-0 transition-colors ${
                    isActive 
                      ? 'text-orange-400 font-semibold' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances & Primary Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative"
              aria-label="Search footwear catalog"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative"
              aria-label="View Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-800 text-orange-400 border border-orange-500/50 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative flex items-center gap-2"
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-black rounded-full text-[11px] font-extrabold flex items-center justify-center orange-glow">
                    {totalCartItems}
                  </span>
                )}
              </div>
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={() => handleNavClick('shop')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 rounded-lg shadow-sm shadow-orange-500/20 hover:shadow-orange-500/40 transition-all uppercase tracking-wider whitespace-nowrap shrink-0"
            >
              <span>Shop Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    activeTab === link.tab
                      ? 'bg-zinc-900 text-orange-400 font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.tab && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2.5">
              <a
                href={`tel:${BRAND_CONTACT.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-zinc-200 bg-zinc-900 rounded-lg hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>Call Studio: {BRAND_CONTACT.phoneFormatted}</span>
              </a>
              <button
                onClick={() => handleNavClick('shop')}
                className="w-full py-2.5 text-sm font-semibold text-black bg-orange-500 rounded-lg uppercase tracking-wider"
              >
                Explore Footwear Collection
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
