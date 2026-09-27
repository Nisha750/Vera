import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CollectionSlug, Product } from '../types';
import { COLLECTIONS_META } from '../data/collections';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useShop();

  // Find meta
  const currentCollection = COLLECTIONS_META.find(c => c.id === slug) || COLLECTIONS_META[0];

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Get products for this collection from the current product catalog with strict purity guards
  const collectionProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.collections.includes(currentCollection.id as CollectionSlug)) return false;
      // Strict safety guards
      if (currentCollection.id === 'women' && p.gender !== 'women') return false;
      if (currentCollection.id === 'men' && p.gender !== 'men') return false;
      if (currentCollection.id === 'dresses' && p.category !== 'Dresses') return false;
      if (currentCollection.id === 'tops' && p.category !== 'Tops') return false;
      if (currentCollection.id === 'bottoms' && p.category !== 'Bottoms') return false;
      if (currentCollection.id === 'outerwear' && p.category !== 'Outerwear') return false;
      if (currentCollection.id === 'shoes' && p.category !== 'Shoes') return false;
      if (currentCollection.id === 'accessories' && p.category !== 'Accessories') return false;
      return true;
    });
  }, [products, currentCollection.id]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    return collectionProducts.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;
      if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) return false;
      if (selectedColor !== 'All' && !p.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
    });
  }, [collectionProducts, selectedCategory, selectedStyle, selectedSize, selectedColor, sortBy]);

  const allCategories = ['All', ...Array.from(new Set(collectionProducts.map(p => p.category)))];
  const allStyles = ['All', ...Array.from(new Set(collectionProducts.map(p => p.style)))];
  const allSizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'EU 40', 'EU 41', 'EU 42'];
  const allColors = ['All', 'Black', 'White', 'Charcoal', 'Ivory'];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStyle('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSortBy('recommended');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedStyle !== 'All' || selectedSize !== 'All' || selectedColor !== 'All';

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      {/* Editorial Collection Hero Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden border-b border-white/10">
        <img 
          src={currentCollection.heroImage} 
          alt={currentCollection.name}
          className="w-full h-full object-cover filter grayscale contrast-110 brightness-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs uppercase tracking-mega-wide text-neutral-400">
              VÉRA COLLECTION
            </span>
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs uppercase tracking-wider px-2 py-0.5 bg-white text-black font-semibold">
              {collectionProducts.length} PIECES PRELOADED
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-white mb-2">
            {currentCollection.name}
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl">
            {currentCollection.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          {/* Left stats & drawer trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterDrawerOpen(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white text-xs uppercase tracking-widest transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-white ml-1" />
              )}
            </button>

            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Showing {filteredProducts.length} of {collectionProducts.length} Pieces
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Right Sort dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs uppercase tracking-widest text-neutral-400">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black text-white border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider focus:outline-none focus:border-white cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterDrawerOpen && (
          <div className="mb-10 p-6 bg-neutral-950 border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
            {/* Category */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/15 text-neutral-300 hover:border-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Aesthetic Style */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Aesthetic Style</p>
              <div className="flex flex-wrap gap-1.5">
                {allStyles.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStyle(st)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      selectedStyle === st 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/15 text-neutral-300 hover:border-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Size</p>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      selectedSize === sz 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/15 text-neutral-300 hover:border-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Color Tone</p>
              <div className="flex flex-wrap gap-1.5">
                {allColors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${
                      selectedColor === col 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/15 text-neutral-300 hover:border-white'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} initialCount={16} increment={16} />
      </div>
    </div>
  );
};
