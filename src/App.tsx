import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopCatalog } from './components/ShopCatalog';
import { CategoriesSection } from './components/CategoriesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useStore();

  return (
    <main className="min-h-screen bg-black text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main View Router */}
      <div className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'shop' && <ShopCatalog filterMode="all" />}
        {activeTab === 'categories' && (
          <div className="space-y-0">
            <CategoriesSection />
            <ShopCatalog title="Explore All Shoes By Category" />
          </div>
        )}
        {activeTab === 'new-arrivals' && (
          <ShopCatalog 
            filterMode="new-arrivals" 
            title="New Arrivals 2026" 
            subtitle="The latest cutting-edge athletic runners and contemporary footwear styles just released in Sri Lanka."
          />
        )}
        {activeTab === 'best-sellers' && (
          <ShopCatalog 
            filterMode="best-sellers" 
            title="Best Sellers" 
            subtitle="Our most celebrated dress shoes, daily sneakers, and island sandals trusted across Sri Lanka."
          />
        )}
        {activeTab === 'about' && (
          <div className="space-y-0">
            <AboutSection />
            <ContactSection />
          </div>
        )}
        {activeTab === 'contact' && <ContactSection />}
      </div>

      {/* Global Interactive Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <SizeGuideModal />
      <Toast />

      {/* Global Brand Footer */}
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
