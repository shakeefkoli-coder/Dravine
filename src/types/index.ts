export type ProductCategory = 
  | "Men's Shoes"
  | "Women's Shoes"
  | "Sports Shoes"
  | "Sneakers"
  | "Casual Shoes"
  | "Formal Shoes"
  | "Sandals & Slippers"
  | "Kids' Shoes";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: {
    upperMaterial: string;
    soleType: string;
    cushioning: string;
    closure: string;
    weight: string;
    craftedIn: string;
  };
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique combo of productId + size + color
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  notes?: string;
  paymentMethod: 'cod' | 'card' | 'bank_transfer' | 'koko';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCode?: string;
}

export type ActiveTab = 'home' | 'shop' | 'categories' | 'new-arrivals' | 'best-sellers' | 'about' | 'contact';
