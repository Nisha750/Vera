import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, Heart, Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationToast: React.FC = () => {
  const { toast, setIsCartOpen } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm w-full pointer-events-auto">
      <div className="bg-vera-charcoal/95 border border-white/15 backdrop-blur-xl p-4 shadow-2xl text-white flex items-center gap-4">
        {toast.productImage ? (
          <img 
            src={toast.productImage} 
            alt="Product" 
            className="w-12 h-14 object-cover border border-white/10 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
            {toast.type === 'cart' && <ShoppingBag className="w-5 h-5 text-white" />}
            {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-white fill-white" />}
            {toast.type === 'success' && <Check className="w-5 h-5 text-white" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-vera-gray-light" />}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-ultra-wide text-vera-gray-light font-medium">
            {toast.type === 'cart' ? 'Added to Bag' : toast.type === 'wishlist' ? 'Wishlist Updated' : 'VÉRA Studio'}
          </p>
          <p className="text-sm font-light text-white truncate mt-0.5">
            {toast.message}
          </p>
          {toast.type === 'cart' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="mt-2 text-xs uppercase tracking-wider underline hover:text-vera-gray-light transition-colors"
            >
              View Bag →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
