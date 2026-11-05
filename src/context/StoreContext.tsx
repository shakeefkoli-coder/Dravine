import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, CustomerOrder, ActiveTab, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCartItems: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  promoCode: string;
  appliedDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  // Product Detail
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  
  // Quick Buy
  quickBuy: (product: Product, size?: string, color?: ProductColor) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Orders
  lastOrder: CustomerOrder | null;
  placeOrder: (customer: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    paymentMethod: 'cod' | 'card' | 'bank_transfer' | 'koko';
    notes?: string;
  }) => CustomerOrder;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Reviews submission
  addReviewToProduct: (productId: string, review: {
    author: string;
    location: string;
    rating: number;
    title: string;
    comment: string;
    fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
  }) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 15000;
const STANDARD_SHIPPING = 450;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  
  // Persist cart & wishlist in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dravine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dravine_wishlist');
      return saved ? JSON.parse(saved) : ['drv-01'];
    } catch {
      return ['drv-01'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [promoCode, setPromoCode] = useState<string>('DRAVINE10');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(10);
  const [lastOrder, setLastOrder] = useState<CustomerOrder | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Dynamic reviews state
  const [productReviewOverrides, setProductReviewOverrides] = useState<Record<string, Product['reviews']>>({});

  useEffect(() => {
    try {
      localStorage.setItem('dravine_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Unable to persist cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('dravine_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Unable to persist wishlist', e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemKey = `${product.id}-${size}-${color.name}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id: itemKey, product, size, color, quantity }];
      }
    });
    showToast(`Added ${product.name} (${size}) to bag!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DRAVINE10') {
      setPromoCode('DRAVINE10');
      setAppliedDiscountPercent(10);
      showToast('Promo code applied: 10% discount!');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (clean === 'DRAVINE15') {
      setPromoCode('DRAVINE15');
      setAppliedDiscountPercent(15);
      showToast('VIP Promo code applied: 15% discount!');
      return { success: true, message: 'VIP 15% discount applied successfully!' };
    } else if (clean === 'DEHIWALA') {
      setPromoCode('DEHIWALA');
      setAppliedDiscountPercent(20);
      showToast('Dehiwala Resident special: 20% discount applied!');
      return { success: true, message: 'Dehiwala special 20% discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try DRAVINE10 or DRAVINE15.' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setAppliedDiscountPercent(0);
    showToast('Promo code removed', 'info');
  };

  const openProductDetail = (product: Product) => {
    // Merge any locally added reviews
    const mergedProduct = {
      ...product,
      reviews: productReviewOverrides[product.id] || product.reviews
    };
    setSelectedProduct(mergedProduct);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const quickBuy = (product: Product, size?: string, color?: ProductColor) => {
    const chosenSize = size || product.sizes[0] || 'UK 8';
    const chosenColor = color || product.colors[0] || { name: 'Standard', hex: '#ff6a00' };
    addToCart(product, chosenSize, chosenColor, 1);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Calculations
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * appliedDiscountPercent) / 100);
  const cartShipping = cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const placeOrder = (customer: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    paymentMethod: 'cod' | 'card' | 'bank_transfer' | 'koko';
    notes?: string;
  }): CustomerOrder => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `DRV-${randomSuffix}`;
    const newOrder: CustomerOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: customer.customerName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      district: customer.district,
      postalCode: customer.postalCode,
      notes: customer.notes,
      paymentMethod: customer.paymentMethod,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      promoCode: promoCode || undefined
    };

    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const addReviewToProduct = (productId: string, review: {
    author: string;
    location: string;
    rating: number;
    title: string;
    comment: string;
    fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
  }) => {
    const targetProduct = PRODUCTS.find(p => p.id === productId);
    const existing = productReviewOverrides[productId] || targetProduct?.reviews || [];
    const newReviewItem = {
      id: `rev-${Date.now()}`,
      ...review,
      date: 'Just now',
      verified: true
    };
    const updated = [newReviewItem, ...existing];
    setProductReviewOverrides(prev => ({ ...prev, [productId]: updated }));
    
    // Also update selected product if currently open
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, reviews: updated, reviewCount: (prev.reviewCount || 0) + 1 } : null);
    }
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartItems,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        promoCode,
        appliedDiscountPercent,
        applyPromoCode,
        removePromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        quickBuy,
        searchQuery,
        setSearchQuery,
        lastOrder,
        placeOrder,
        toast,
        showToast,
        addReviewToProduct
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
