import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Order, Customer, SavedLook, StylePreferences, OrderStatus } from '../types';
import { storage } from '../services/storage';

interface ToastInfo {
  id: string;
  message: string;
  productImage?: string;
  type: 'cart' | 'wishlist' | 'success' | 'info';
}

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: string, selectedSize: string) => void;
  updateCartQuantity: (productId: string, selectedColor: string, selectedSize: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  customers: Customer[];
  savedLooks: SavedLook[];
  saveLook: (look: Omit<SavedLook, 'id' | 'createdAt'>) => void;
  deleteSavedLook: (id: string) => void;
  preferences: StylePreferences;
  updatePreferences: (prefs: StylePreferences) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toast: ToastInfo | null;
  showToast: (message: string, type?: ToastInfo['type'], productImage?: string) => void;
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => storage.getProducts());
  const [cart, setCart] = useState<CartItem[]>(() => storage.getCart());
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => storage.getWishlist());
  const [orders, setOrders] = useState<Order[]>(() => storage.getOrders());
  const [customers, setCustomers] = useState<Customer[]>(() => storage.getCustomers());
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>(() => storage.getSavedLooks());
  const [preferences, setPreferences] = useState<StylePreferences>(() => storage.getPreferences());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => storage.isAdminAuthenticated());

  // Persist products when modified by admin
  useEffect(() => {
    storage.saveProducts(products);
  }, [products]);

  // Persist cart
  useEffect(() => {
    storage.saveCart(cart);
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    storage.saveWishlist(wishlist);
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    storage.saveOrders(orders);
  }, [orders]);

  // Toast handler
  const showToast = (message: string, type: ToastInfo['type'] = 'info', productImage?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, productImage, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 3800);
  };

  // Cart operations
  const addToCart = (product: Product, selectedColor: string, selectedSize: string, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedColor, selectedSize, quantity }];
      }
    });

    showToast(`Added to your bag: ${product.name}`, 'cart', product.images[0]);
  };

  const removeFromCart = (productId: string, selectedColor: string, selectedSize: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
    ));
  };

  const updateCartQuantity = (productId: string, selectedColor: string, selectedSize: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => {
    const activePrice = item.product.salePrice || item.product.price;
    return acc + (activePrice * item.quantity);
  }, 0);

  // Free shipping over ₹2,999; else ₹150
  const deliveryFee = cartSubtotal >= 2999 || cartSubtotal === 0 ? 0 : 150;
  // Apply a 5% subtle VIP discount on orders above ₹4,000
  const cartDiscount = cartSubtotal >= 4000 ? Math.round(cartSubtotal * 0.05) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.productId === product.id);
      if (exists) {
        showToast(`Removed from wishlist: ${product.name}`, 'wishlist');
        return prev.filter(item => item.productId !== product.id);
      } else {
        showToast(`Saved to wishlist: ${product.name}`, 'wishlist', product.images[0]);
        return [{ productId: product.id, product, addedAt: new Date().toISOString() }, ...prev];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'statusHistory'>): Order => {
    const orderId = `VERA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'Confirmed',
      statusHistory: [
        { status: 'Confirmed', timestamp: new Date().toISOString(), note: 'Order placed successfully' }
      ],
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    clearCart();

    // Check / update customer record
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === newOrder.customer.email.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          ordersCount: c.ordersCount + 1,
          totalSpent: c.totalSpent + newOrder.total
        } : c);
      } else {
        return [{
          id: `cust-${Math.random().toString(36).substr(2, 6)}`,
          name: newOrder.customer.name,
          email: newOrder.customer.email,
          phone: newOrder.customer.phone,
          ordersCount: 1,
          totalSpent: newOrder.total,
          joinedDate: 'Mar 2026',
          status: 'Active'
        }, ...prev];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          statusHistory: [
            ...order.statusHistory,
            { status: newStatus, timestamp: new Date().toISOString() }
          ]
        };
      }
      return order;
    }));
  };

  // Saved looks
  const saveLook = (look: Omit<SavedLook, 'id' | 'createdAt'>) => {
    const newLook: SavedLook = {
      ...look,
      id: `look-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    storage.addSavedLook(newLook);
    setSavedLooks(prev => [newLook, ...prev]);
    showToast(`Saved look: "${newLook.name}"`, 'success');
  };

  const deleteSavedLook = (id: string) => {
    const updated = savedLooks.filter(l => l.id !== id);
    setSavedLooks(updated);
    storage.saveSavedLooks(updated);
    showToast('Look removed from saved', 'info');
  };

  // Preferences
  const updatePreferences = (prefs: StylePreferences) => {
    setPreferences(prefs);
    storage.savePreferences(prefs);
    showToast('Style preferences updated', 'success');
  };

  // Admin Auth
  const loginAdmin = (pass: string): boolean => {
    // Standard secure passcode for VÉRA admin demo
    if (pass === 'vera2026' || pass === 'admin123' || pass === 'nisha2401') {
      setIsAdmin(true);
      storage.setAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    storage.setAdminAuthenticated(false);
  };

  return (
    <ShopContext.Provider value={{
      products,
      setProducts,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      cartDiscount,
      deliveryFee,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      createOrder,
      updateOrderStatus,
      customers,
      savedLooks,
      saveLook,
      deleteSavedLook,
      preferences,
      updatePreferences,
      isSearchOpen,
      setIsSearchOpen,
      toast,
      showToast,
      isAdmin,
      loginAdmin,
      logoutAdmin,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
