import { Product, CartItem, WishlistItem, Order, Customer, SavedLook, StylePreferences, CollectionSlug } from '../types';
import { VERA_PRODUCTS } from '../data/products';

const STORAGE_KEYS = {
  CART: 'vera_cart_v1',
  WISHLIST: 'vera_wishlist_v1',
  ORDERS: 'vera_orders_v1',
  PRODUCTS: 'vera_products_v2',
  SAVED_LOOKS: 'vera_saved_looks_v1',
  PREFERENCES: 'vera_preferences_v1',
  CUSTOMERS: 'vera_customers_v1',
  ADMIN_AUTH: 'vera_admin_auth_v1',
};

// Initial Seed Orders
const SEED_ORDERS: Order[] = [
  {
    id: 'VERA-2026-9812',
    customer: {
      name: 'Pooja Iyer',
      email: 'pooja.iyer@example.com',
      phone: '9845012345'
    },
    shippingAddress: {
      street: '42 Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    items: [
      {
        productId: 'vera-prod-001',
        productName: 'Noir Satin Midi Dress',
        productImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
        price: 2499,
        selectedColor: 'Obsidian Black',
        selectedSize: 'S',
        quantity: 1
      },
      {
        productId: 'vera-prod-170',
        productName: 'Linea Minimalist Brushed Watch',
        productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
        price: 1899,
        selectedColor: 'Charcoal',
        selectedSize: 'One Size',
        quantity: 1
      }
    ],
    subtotal: 4398,
    discount: 300,
    deliveryFee: 0,
    total: 4098,
    status: 'Shipped',
    statusHistory: [
      { status: 'Confirmed', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), note: 'Order validated and accepted' },
      { status: 'Processing', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), note: 'Studio packaging completed' },
      { status: 'Shipped', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), note: 'In transit with Express Logistics' }
    ],
    paymentMethod: 'UPI',
    estimatedDelivery: new Date(Date.now() + 2 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'VERA-2026-7450',
    customer: {
      name: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '9820054321'
    },
    shippingAddress: {
      street: '18 Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400051',
      country: 'India'
    },
    items: [
      {
        productId: 'vera-prod-040',
        productName: 'Atelier Linen Studio Shirt',
        productImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
        price: 1799,
        selectedColor: 'Chalk White',
        selectedSize: 'L',
        quantity: 1
      }
    ],
    subtotal: 1799,
    discount: 0,
    deliveryFee: 150,
    total: 1949,
    status: 'Delivered',
    statusHistory: [
      { status: 'Confirmed', timestamp: new Date(Date.now() - 6 * 86400000).toISOString() },
      { status: 'Processing', timestamp: new Date(Date.now() - 5 * 86400000).toISOString() },
      { status: 'Shipped', timestamp: new Date(Date.now() - 4 * 86400000).toISOString() },
      { status: 'Out for Delivery', timestamp: new Date(Date.now() - 2 * 86400000).toISOString() },
      { status: 'Delivered', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), note: 'Delivered at reception' }
    ],
    paymentMethod: 'Card',
    estimatedDelivery: new Date(Date.now() - 1 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString()
  }
];

// Initial Seed Customers
const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@example.com',
    phone: '9845012345',
    ordersCount: 4,
    totalSpent: 16480,
    joinedDate: 'Jan 2026',
    status: 'VIP'
  },
  {
    id: 'cust-02',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '9820054321',
    ordersCount: 2,
    totalSpent: 6490,
    joinedDate: 'Feb 2026',
    status: 'Active'
  },
  {
    id: 'cust-03',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9711098765',
    ordersCount: 1,
    totalSpent: 4299,
    joinedDate: 'Mar 2026',
    status: 'Active'
  },
  {
    id: 'cust-04',
    name: 'Nisha H',
    email: 'nisha240106@gmail.com',
    phone: '7019875647',
    ordersCount: 5,
    totalSpent: 28900,
    joinedDate: 'Jan 2026',
    status: 'VIP'
  }
];

export const storage = {
  // PRODUCTS
  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return VERA_PRODUCTS;
  },
  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Storage full or error saving products', e);
    }
  },

  // CART
  getCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  },

  // WISHLIST
  getWishlist(): WishlistItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  saveWishlist(wishlist: WishlistItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  },

  // ORDERS
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return SEED_ORDERS;
  },
  saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  },
  addOrder(order: Order): void {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    this.saveOrders(updated);
  },

  // CUSTOMERS
  getCustomers(): Customer[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return SEED_CUSTOMERS;
  },
  saveCustomers(customers: Customer[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch (e) {
      console.error('Error saving customers', e);
    }
  },

  // SAVED LOOKS (AI Stylist / Outfit Builder)
  getSavedLooks(): SavedLook[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_LOOKS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  saveSavedLooks(looks: SavedLook[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_LOOKS, JSON.stringify(looks));
    } catch (e) {
      console.error('Error saving looks', e);
    }
  },
  addSavedLook(look: SavedLook): void {
    const looks = this.getSavedLooks();
    this.saveSavedLooks([look, ...looks]);
  },

  // STYLE PREFERENCES
  getPreferences(): StylePreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return stored ? JSON.parse(stored) : {
        styles: ['Minimal', 'Tailored'],
        colors: ['Black', 'White', 'Charcoal'],
        occasions: ['Casual', 'Office', 'Dinner'],
        budget: '₹3,000–₹5,000'
      };
    } catch {
      return {
        styles: ['Minimal', 'Tailored'],
        colors: ['Black', 'White'],
        occasions: ['Casual', 'Dinner'],
        budget: '₹3,000–₹5,000'
      };
    }
  },
  savePreferences(prefs: StylePreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Error saving preferences', e);
    }
  },

  // ADMIN AUTH
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },
  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }
};
