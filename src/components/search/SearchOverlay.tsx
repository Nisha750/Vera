import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, X, ArrowUpRight, Clock, Flame, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

const TRENDING_SEARCHES = [
  'black dress',
  'minimal blazer',
  'linen shirt',
  'wide-leg trousers',
  'evening wear',
  'silk gown',
  'shoes under ₹3000',
  'tailored coat'
];

const SUGGESTED_TAGS = [
  'Minimal', 'Tailored', 'Silk', 'Linen', 'Evening', 'Office', 'Party', 'Monochrome'
];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useShop();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('vera_recent_searches');
      return stored ? JSON.parse(stored) : ['satin dress', 'linen shirt'];
    } catch {
      return ['satin dress', 'linen shirt'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isSearchOpen]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  // Natural fashion search filtering
  const searchResults: Product[] = React.useMemo(() => {
    if (!debouncedQuery) return [];

    const q = debouncedQuery.toLowerCase();

    // Check price filters like "under ₹3000" or "under 3000"
    const priceMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    const maxPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;

    // Remove price phrasing for term search
    const cleanTerm = q.replace(/under\s*(?:₹|rs\.?|inr)?\s*\d+/gi, '').trim();

    return products.filter(p => {
      // Price check
      const currentPrice = p.salePrice || p.price;
      if (maxPrice && currentPrice > maxPrice) {
        return false;
      }

      if (!cleanTerm) return true; // If only price search was typed

      const words = cleanTerm.split(/\s+/).filter(Boolean);

      return words.every(word => {
        return (
          p.name.toLowerCase().includes(word) ||
          p.category.toLowerCase().includes(word) ||
          p.style.toLowerCase().includes(word) ||
          p.occasion.toLowerCase().includes(word) ||
          p.material.toLowerCase().includes(word) ||
          p.gender.toLowerCase().includes(word) ||
          p.colors.some(c => c.toLowerCase().includes(word)) ||
          p.tags.some(t => t.toLowerCase().includes(word)) ||
          p.collections.some(c => c.toLowerCase().includes(word))
        );
      });
    });
  }, [debouncedQuery, products]);

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term.trim(), ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('vera_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl text-white overflow-y-auto animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen flex flex-col">
        {/* Top Bar with Close */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="text-xl font-serif tracking-widest text-white">VÉRA</span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-vera-gray-light hover:text-white transition-colors"
          >
            <span>Close [ESC]</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Editorial Search Input */}
        <form onSubmit={handleSubmit} className="mt-8 mb-8">
          <div className="relative border-b-2 border-white/30 focus-within:border-white transition-colors pb-4 flex items-center">
            <Search className="w-8 h-8 text-vera-gray-light mr-4 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, styles, colors, occasions..."
              className="w-full bg-transparent text-2xl sm:text-4xl font-serif text-white placeholder:text-neutral-600 focus:outline-none tracking-tight"
            />
            {query && (
              <button 
                type="button"
                onClick={() => setQuery('')}
                className="text-vera-gray-light hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </form>

        {/* Suggestions / Initial State */}
        {!debouncedQuery ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 pb-12">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  Recent Searches
                </div>
                <div className="flex flex-col space-y-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectTerm(term)}
                      className="text-left text-sm text-neutral-300 hover:text-white transition-colors flex items-center justify-between py-1 border-b border-white/5"
                    >
                      <span>{term}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-vera-gray-mid" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-4">
                <Flame className="w-3.5 h-3.5" />
                Trending Searches
              </div>
              <div className="flex flex-col space-y-2">
                {TRENDING_SEARCHES.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTerm(term)}
                    className="text-left text-sm text-neutral-300 hover:text-white transition-colors flex items-center justify-between py-1 border-b border-white/5"
                  >
                    <span>{term}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-vera-gray-mid" />
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Categories / Tags */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-4">
                <Tag className="w-3.5 h-3.5" />
                Curated Aesthetics
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTerm(tag)}
                    className="text-xs uppercase tracking-wider px-3 py-1.5 border border-white/15 text-neutral-300 hover:border-white hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="flex-1 pb-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
              <p className="text-xs uppercase tracking-widest text-vera-gray-light">
                Found {searchResults.length} {searchResults.length === 1 ? 'piece' : 'pieces'} for "{debouncedQuery}"
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-serif text-white mb-2">NO PIECES FOUND</h3>
                <p className="text-sm text-vera-gray-mid max-w-md mx-auto">
                  Try another style, category or keyword such as "black dress", "linen", or "blazer".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.slice(0, 16).map(product => (
                  <div key={product.id} onClick={() => setIsSearchOpen(false)}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
