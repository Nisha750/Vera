import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products } = useShop();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'newest' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Set query if present
  useEffect(() => {
    if (queryParam) {
      if (queryParam.toLowerCase() === 'minimal') setSelectedStyle('Minimal');
      else if (queryParam.toLowerCase() === 'evening') setSelectedOccasion('Party');
      else if (queryParam.toLowerCase() === 'casual') setSelectedOccasion('Casual');
      else if (queryParam.toLowerCase().includes('1999')) setMaxPrice(1999);
    }
  }, [queryParam]);

  // Categories & Options
  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
  const genders = ['All', 'women', 'men', 'unisex'];
  const styles = ['All', 'Minimal', 'Tailored', 'Classic', 'Streetwear', 'Luxury', 'Old Money', 'Casual'];
  const occasions = ['All', 'Casual', 'Office', 'Party', 'Dinner', 'Vacation', 'Wedding'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43'];
  const colors = ['All', 'Black', 'White', 'Charcoal', 'Ivory', 'Stone'];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const activePrice = p.salePrice || p.price;
      if (activePrice > maxPrice) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'unisex') return false;
      if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;
      if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;
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
  }, [products, selectedCategory, selectedGender, selectedStyle, selectedOccasion, selectedSize, selectedColor, maxPrice, inStockOnly, sortBy]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedGender !== 'All' || selectedStyle !== 'All' || selectedOccasion !== 'All' || selectedSize !== 'All' || selectedColor !== 'All' || maxPrice < 6000 || inStockOnly;

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedStyle('All');
    setSelectedOccasion('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setMaxPrice(6000);
    setInStockOnly(false);
    setSortBy('recommended');
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-2">VÉRA Editorial Catalog</p>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-white mb-3">SHOP</h1>
          <p className="text-sm text-neutral-400 font-light">
            Discover the complete collection of minimalist tailoring, relaxed silhouettes, and luxury essentials.
          </p>
        </div>

        {/* Toolbar Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/20 text-xs uppercase tracking-widest"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Showing {filteredProducts.length} of {products.length} pieces
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

          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-xs uppercase tracking-widest text-neutral-400">Sort by:</label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black text-white border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider focus:outline-none focus:border-white cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content: Left Filter Sidebar + Right Grid */}
        <div className="flex gap-10">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 pr-6 border-r border-white/10">
            {/* Category */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">Category</h3>
              <div className="space-y-1.5 text-xs text-neutral-400">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left py-1 hover:text-white transition-colors ${selectedCategory === cat ? 'text-white font-medium underline' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">Gender</h3>
              <div className="flex flex-wrap gap-2">
                {genders.map(gen => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGender(gen)}
                    className={`text-xs uppercase px-3 py-1 border transition-colors ${selectedGender === gen ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white'}`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs uppercase tracking-widest text-white">Max Price</h3>
                <span className="text-xs text-neutral-300">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="999"
                max="6000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                <span>₹999</span>
                <span>₹6,000+</span>
              </div>
            </div>

            {/* Aesthetic Style */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">Style</h3>
              <div className="flex flex-wrap gap-1.5">
                {styles.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStyle(st)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${selectedStyle === st ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">Occasion</h3>
              <div className="flex flex-wrap gap-1.5">
                {occasions.map(occ => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${selectedOccasion === occ ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white'}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">Size</h3>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-xs px-2.5 py-1 border transition-colors ${selectedSize === sz ? 'bg-white text-black border-white' : 'border-white/15 text-neutral-300 hover:border-white'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-neutral-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-white cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="flex-1">
            <ProductGrid products={filteredProducts} initialCount={16} increment={16} />
          </main>
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter Interface */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-neutral-950 border-t border-white/15 text-white flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-base font-serif uppercase tracking-wider">Refine Collection</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'border-white/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">Max Price: ₹{maxPrice}</p>
                <input
                  type="range"
                  min="999"
                  max="6000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>

              {/* Size */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mb-2">Size</p>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-3 py-1.5 border ${selectedSize === sz ? 'bg-white text-black border-white' : 'border-white/20'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex gap-4">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-white/30 text-xs uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-white text-black text-xs uppercase tracking-wider font-medium"
              >
                View ({filteredProducts.length}) Pieces
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
