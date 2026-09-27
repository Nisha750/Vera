import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sparkles, Camera, Heart, User, ShoppingBag, Menu, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MobileDrawer } from './MobileDrawer';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
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
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-xl' 
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 text-white hover:text-neutral-300"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link 
              to="/" 
              className="font-serif text-2xl sm:text-3xl tracking-widest text-white hover:opacity-90 transition-opacity flex items-baseline gap-1"
            >
              <span>VÉRA</span>
              <span className="text-[9px] font-sans tracking-mega-wide text-vera-gray-mid hidden sm:inline-block">
                STUDIO
              </span>
            </Link>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[11px] uppercase tracking-mega-wide font-medium">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 relative ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-neutral-300 hover:text-white'
                  } ${link.highlight ? 'text-white' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-px bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-white">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-neutral-300 transition-colors"
              aria-label="Search collection"
              title="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Stylist */}
            <Link
              to="/ai-stylist"
              className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 hover:border-white transition-all text-neutral-200 hover:text-white"
              title="AI Stylist Consultation"
            >
              <Sparkles className="w-3 h-3 text-white" />
              <span>AI Stylist</span>
            </Link>

            {/* Style Camera */}
            <Link
              to="/style-camera"
              className="p-1.5 hover:text-neutral-300 transition-colors hidden sm:block"
              aria-label="Style Camera"
              title="Style with Camera / Upload"
            >
              <Camera className="w-4 h-4" />
            </Link>

            {/* Outfit Builder */}
            <Link
              to="/outfit-builder"
              className="p-1.5 hover:text-neutral-300 transition-colors hidden md:block"
              aria-label="Outfit Builder"
              title="Outfit Builder"
            >
              <Layers className="w-4 h-4" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-1.5 hover:text-neutral-300 transition-colors relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-1.5 hover:text-neutral-300 transition-colors hidden sm:block"
              aria-label="My Account"
              title="My Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:text-neutral-300 transition-colors relative flex items-center"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};
