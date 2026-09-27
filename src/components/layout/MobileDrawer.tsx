import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, Camera, Layers, Heart, User, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { cartCount, wishlist, setIsCartOpen } = useShop();

  if (!isOpen) return null;

  const collections = [
    { name: 'Women', path: '/collection/women' },
    { name: 'Men', path: '/collection/men' },
    { name: 'Dresses', path: '/collection/dresses' },
    { name: 'Tops', path: '/collection/tops' },
    { name: 'Bottoms', path: '/collection/bottoms' },
    { name: 'Outerwear', path: '/collection/outerwear' },
    { name: 'Shoes', path: '/collection/shoes' },
    { name: 'Accessories', path: '/collection/accessories' },
    { name: 'New Arrivals', path: '/collection/new-arrivals' },
    { name: 'Sale', path: '/collection/sale', highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-neutral-950 border-r border-white/10 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="text-xl font-serif tracking-widest">
            VÉRA
          </Link>
          <button onClick={onClose} className="p-1.5 text-vera-gray-light hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI & Studio Quick Features */}
        <div className="p-4 bg-neutral-900 border-b border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider">
          <Link 
            to="/ai-stylist" 
            onClick={onClose} 
            className="p-2 border border-white/10 hover:border-white transition-colors flex flex-col items-center gap-1"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>AI Stylist</span>
          </Link>
          <Link 
            to="/style-camera" 
            onClick={onClose} 
            className="p-2 border border-white/10 hover:border-white transition-colors flex flex-col items-center gap-1"
          >
            <Camera className="w-4 h-4 text-white" />
            <span>Style Cam</span>
          </Link>
          <Link 
            to="/outfit-builder" 
            onClick={onClose} 
            className="p-2 border border-white/10 hover:border-white transition-colors flex flex-col items-center gap-1"
          >
            <Layers className="w-4 h-4 text-white" />
            <span>Builder</span>
          </Link>
        </div>

        {/* Collections Links */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid">Collections (70 Items Each)</p>
          {collections.map(col => {
            const isActive = location.pathname === col.path;
            return (
              <Link
                key={col.path}
                to={col.path}
                onClick={onClose}
                className={`block text-base tracking-wide transition-colors py-1 ${
                  isActive ? 'font-medium text-white underline underline-offset-4' : 'text-neutral-400 hover:text-white'
                } ${col.highlight ? 'text-white font-medium' : ''}`}
              >
                {col.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-6 border-t border-white/10 space-y-3 text-xs uppercase tracking-wider">
          <Link 
            to="/wishlist" 
            onClick={onClose}
            className="flex items-center justify-between text-neutral-300 hover:text-white"
          >
            <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> Wishlist</span>
            <span>({wishlist.length})</span>
          </Link>
          <Link 
            to="/account" 
            onClick={onClose}
            className="flex items-center gap-2 text-neutral-300 hover:text-white"
          >
            <User className="w-4 h-4" /> My VÉRA Account
          </Link>
          <Link 
            to="/admin" 
            onClick={onClose}
            className="flex items-center gap-2 text-vera-gray-mid hover:text-white"
          >
            <ShieldCheck className="w-4 h-4" /> Studio Admin
          </Link>
        </div>
      </div>
    </div>
  );
};
