import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BRAND_CONTACT, PRODUCT_CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ActiveTab, ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCat = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      {/* Top Banner strip */}
      <div className="border-b border-zinc-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg font-display">
              D
            </div>
            <div>
              <div className="text-white font-bold text-base font-display">DRAVINE FOOTWEAR</div>
              <div className="text-zinc-500 text-xs">Step Into Style. Walk With Confidence.</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300">
            <a 
              href={`tel:${BRAND_CONTACT.phone}`} 
              className="flex items-center gap-2 hover:text-orange-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{BRAND_CONTACT.phoneFormatted}</span>
            </a>
            <span className="text-zinc-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Dehiwala, Sri Lanka</span>
            </div>
            <span className="text-zinc-700 hidden sm:inline">·</span>
            <a
              href={BRAND_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-1.5"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px] font-mono">Top</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase font-mono tracking-wider">
              About Dravine
            </h4>
            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              Dravine is an independent luxury and performance footwear brand founded and operated in Dehiwala, Sri Lanka. We craft bespoke leather dress shoes, marathon-grade running trainers, and modern urban sneakers designed for supreme comfort and lasting durability.
            </p>
            <div className="pt-2 text-zinc-400 space-y-1 font-mono text-[11px]">
              <div>Studio: No. 142 Galle Road, Dehiwala 10350</div>
              <div>Telephone: <a href={`tel:${BRAND_CONTACT.phone}`} className="text-orange-400 hover:underline">{BRAND_CONTACT.phoneFormatted}</a></div>
              <div>Email: {BRAND_CONTACT.email}</div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase font-mono tracking-wider">
              Explore Site
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-orange-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-orange-400 transition-colors">
                  Shop Footwear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-orange-400 transition-colors">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('new-arrivals')} className="hover:text-orange-400 transition-colors">
                  New Arrivals 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('best-sellers')} className="hover:text-orange-400 transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-orange-400 transition-colors">
                  About Our Studio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-orange-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase font-mono tracking-wider">
              Footwear Categories
            </h4>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.name}>
                  <button onClick={() => handleCat(c.name)} className="hover:text-orange-400 transition-colors">
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handleCat("Sandals & Slippers")} className="hover:text-orange-400 transition-colors">
                  Sandals & Slippers
                </button>
              </li>
              <li>
                <button onClick={() => handleCat("Kids' Shoes")} className="hover:text-orange-400 transition-colors">
                  Kids' Shoes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Sri Lanka Delivery */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase font-mono tracking-wider">
              Customer Concierge
            </h4>
            <ul className="space-y-2">
              <li className="text-zinc-400">Island-wide Express Dispatch</li>
              <li className="text-zinc-400">Cash on Delivery (COD)</li>
              <li className="text-zinc-400">14-Day Free Size Exchange</li>
              <li className="text-zinc-400">Dehiwala Studio Fittings</li>
              <li className="text-zinc-400">Bespoke Leather Sizing</li>
              <li className="pt-2">
                <a
                  href={`tel:${BRAND_CONTACT.phone}`}
                  className="inline-block py-1 px-2.5 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded font-mono font-semibold"
                >
                  Call Hotline: 0718957517
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment methods */}
        <div className="pt-8 mt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Dravine Footwear (Private) Limited · Dehiwala, Sri Lanka. All rights reserved.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Cash on Delivery</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Bank Transfer</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Visa / Master</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">Koko Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
