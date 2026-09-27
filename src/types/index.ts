export type Gender = 'women' | 'men' | 'unisex';

export type Category = 
  | 'Dresses' 
  | 'Tops' 
  | 'Bottoms' 
  | 'Outerwear' 
  | 'Shoes' 
  | 'Accessories';

export type CollectionSlug = 
  | 'women'
  | 'men'
  | 'dresses'
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'new-arrivals'
  | 'sale';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in INR
  salePrice?: number; // in INR if on sale
  category: Category;
  gender: Gender;
  collections: CollectionSlug[];
  style: 'Minimal' | 'Classic' | 'Streetwear' | 'Old Money' | 'Tailored' | 'Boho' | 'Luxury' | 'Casual';
  occasion: 'Casual' | 'Office' | 'Party' | 'Dinner' | 'Vacation' | 'Wedding' | 'Travel' | 'Any';
  colors: string[];
  sizes: string[];
  material: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  createdAt: string;
}

export interface CollectionMeta {
  id: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type OrderStatus = 
  | 'Confirmed' 
  | 'Processing' 
  | 'Shipped' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Cancelled';

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery';
  estimatedDelivery: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'VIP' | 'Inactive';
}

export interface StylePreferences {
  gender?: Gender;
  styles: string[];
  colors: string[];
  occasions: string[];
  budget: string;
}

export interface SavedLook {
  id: string;
  name: string;
  occasion: string;
  aesthetic: string;
  top?: Product;
  bottom?: Product;
  outerwear?: Product;
  shoes?: Product;
  accessory?: Product;
  totalPrice: number;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}

export interface FilterState {
  category?: string;
  gender?: string;
  style?: string;
  occasion?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy: 'recommended' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
