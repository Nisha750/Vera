import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-3xl font-serif tracking-widest text-white block">
              VÉRA
            </Link>
            <p className="text-xs uppercase tracking-ultra-wide text-vera-gray-mid">
              DEFINE YOUR STYLE.
            </p>
            <p className="text-sm font-light text-neutral-400 max-w-sm leading-relaxed">
              VÉRA merges modern high-street editorial fashion with intelligent AI curation. Architectural tailoring, pure natural textiles, and effortless monochrome styling.
            </p>

            {/* Newsletter */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-mega-wide text-white mb-2">The Studio Gazette</p>
              <p className="text-xs text-vera-gray-mid mb-3">
                Receive private capsule previews and curated editorial style guides.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm border-b border-white/30 focus-within:border-white transition-colors pb-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none flex-1 py-1"
                  required
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-widest text-white hover:text-neutral-400 transition-colors flex items-center gap-1 pl-2"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2">
                  ✓ Welcome to VÉRA Atelier.
                </p>
              )}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra-wide text-white mb-4">Collections</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/collection/women" className="hover:text-white transition-colors">Women's Edit (70)</Link></li>
              <li><Link to="/collection/men" className="hover:text-white transition-colors">Men's Edit (70)</Link></li>
              <li><Link to="/collection/dresses" className="hover:text-white transition-colors">Dresses (70)</Link></li>
              <li><Link to="/collection/tops" className="hover:text-white transition-colors">Tops & Shirts (70)</Link></li>
              <li><Link to="/collection/bottoms" className="hover:text-white transition-colors">Trousers & Denim (70)</Link></li>
              <li><Link to="/collection/outerwear" className="hover:text-white transition-colors">Coats & Blazers (70)</Link></li>
              <li><Link to="/collection/shoes" className="hover:text-white transition-colors">Footwear (70)</Link></li>
              <li><Link to="/collection/accessories" className="hover:text-white transition-colors">Accessories (70)</Link></li>
              <li><Link to="/collection/new-arrivals" className="hover:text-white transition-colors">New Arrivals (70)</Link></li>
              <li><Link to="/collection/sale" className="hover:text-white transition-colors text-white font-medium">Archive Sale (70)</Link></li>
            </ul>
          </div>

          {/* Studio Tech & AI */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra-wide text-white mb-4">Studio Tech</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/ai-stylist" className="hover:text-white transition-colors">AI Stylist Engine</Link></li>
              <li><Link to="/style-camera" className="hover:text-white transition-colors">VÉRA Style Camera</Link></li>
              <li><Link to="/outfit-builder" className="hover:text-white transition-colors">Interactive Outfit Builder</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">My VÉRA Profile</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors text-vera-gray-mid">Studio Admin Portal</Link></li>
            </ul>
          </div>

          {/* Brand & Creator Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra-wide text-white mb-4">Brand & Creator</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light tracking-wide">
              <li><Link to="/about" className="hover:text-white transition-colors">About VÉRA</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Studio</Link></li>
              <li className="pt-2 border-t border-white/5">
                <span className="block text-vera-gray-mid text-[11px] uppercase tracking-wider">Founder / Creator</span>
                <span className="text-white font-medium">Nisha H</span>
              </li>
              <li>
                <span className="block text-vera-gray-mid text-[11px] uppercase tracking-wider">Email Inquiry</span>
                <a href="mailto:nisha240106@gmail.com" className="text-white hover:underline">
                  nisha240106@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-vera-gray-mid text-[11px] uppercase tracking-wider">Client Concierge</span>
                <a href="tel:7019875647" className="text-white hover:underline">
                  +91 7019875647
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} VÉRA — AI FASHION STUDIO.</span>
            <span className="hidden sm:inline">•</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Shipping</Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
