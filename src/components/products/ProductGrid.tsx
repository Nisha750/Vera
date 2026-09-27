import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  initialCount?: number;
  increment?: number;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  initialCount = 16,
  increment = 16,
  emptyMessage = 'No pieces found matching your criteria.'
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  if (products.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-white/10 my-8">
        <p className="text-xs uppercase tracking-ultra-wide text-vera-gray-mid mb-2">VÉRA Studio Catalog</p>
        <h4 className="text-xl font-serif text-white mb-2">NO PIECES FOUND</h4>
        <p className="text-sm text-vera-gray-light max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
        {displayedProducts.map((product, idx) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            priority={idx < 4}
          />
        ))}
      </div>

      {/* Progressive Load Button */}
      {hasMore && (
        <div className="mt-16 flex flex-col items-center justify-center gap-3">
          <p className="text-xs uppercase tracking-widest text-vera-gray-mid">
            Showing {displayedProducts.length} of {products.length} pieces
          </p>
          <div className="w-48 h-0.5 bg-white/10 overflow-hidden mb-2">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(displayedProducts.length / products.length) * 100}%` }}
            />
          </div>
          <button
            onClick={() => setVisibleCount(prev => prev + increment)}
            className="btn-vera px-8 py-3.5 border border-white/30 text-white text-xs uppercase tracking-mega-wide hover:bg-white hover:text-black transition-all"
          >
            Load More Pieces ({products.length - visibleCount} Remaining)
          </button>
        </div>
      )}
    </div>
  );
};
