import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Plus, Star } from 'lucide-react';
import { FALLBACK_IMAGE } from '../../data/collections';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const secondImage = product.images[1] || product.images[0] || FALLBACK_IMAGE;

  // Calculate discount percent
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0] || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      className="group relative flex flex-col bg-black text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Luxury Aspect Ratio */}
      <Link 
        to={`/product/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-white/5 block"
      >
        {/* Main Image */}
        <img
          src={imgError ? FALLBACK_IMAGE : (isHovered ? secondImage : imgSrc)}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgError(true)}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? 'scale-105 filter brightness-95' : 'scale-100'
          }`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isSale && discountPercent > 0 && (
            <span className="bg-white text-black text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-black/90 text-white border border-white/20 text-[10px] tracking-wider uppercase px-2 py-0.5">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-white fill-white' : 'text-white'
            }`} 
          />
        </button>

        {/* Quick Add overlay button */}
        <div 
          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-vera-gray-mid">
              {product.category}
            </p>
            <Link to={`/product/${product.slug}`} className="block group-hover:underline">
              <h3 className="text-sm font-light tracking-wide text-white mt-0.5 line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-vera-gray-mid flex-shrink-0 pt-0.5">
            <Star className="w-3 h-3 fill-white text-white" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Price display */}
        <div className="mt-1.5 flex items-center gap-2 text-sm">
          {product.salePrice ? (
            <>
              <span className="font-normal text-white">
                ₹{product.salePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-vera-gray-mid line-through font-light">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </>
          ) : (
            <span className="font-normal text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
