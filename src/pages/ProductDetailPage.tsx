import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getProductBySlug, getRelatedProducts, getCompleteTheLook } from '../data/products';
import { FALLBACK_IMAGE } from '../data/collections';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { ProductCard } from '../components/products/ProductCard';
import { Heart, Star, Check, ShieldCheck, Truck, RotateCcw, Ruler, ArrowRight } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = getProductBySlug(slug || '');

  // Active product selections
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-serif mb-3">CURRENTLY UNAVAILABLE</h2>
        <p className="text-sm text-neutral-400 max-w-sm mb-6">
          The requested VÉRA piece could not be located in our archive.
        </p>
        <Link to="/shop" className="btn-vera px-6 py-3 bg-white text-black text-xs uppercase tracking-widest">
          Return to Collection
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const relatedProducts = getRelatedProducts(product, 4);
  const completeTheLook = getCompleteTheLook(product);

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate('/checkout');
  };

  const images = product.images.length > 0 ? product.images : [FALLBACK_IMAGE];

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-xs uppercase tracking-wider text-neutral-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/collection/${product.category.toLowerCase()}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase: Left Image Gallery + Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Gallery (Thumbnails + Big View) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[700px] flex-shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 sm:w-20 aspect-[3/4] border transition-all flex-shrink-0 overflow-hidden ${
                    selectedImageIndex === idx ? 'border-white ring-1 ring-white' : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 aspect-[3/4] relative bg-neutral-950 border border-white/10 overflow-hidden">
              <img
                src={images[selectedImageIndex] || FALLBACK_IMAGE}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              {product.isSale && discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-white text-black text-xs font-semibold uppercase tracking-wider px-3 py-1 shadow-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Category & Title */}
              <div>
                <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-1">
                  VÉRA Studio Atelier • {product.gender}
                </p>
                <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-xs text-neutral-400 font-mono tracking-wider">
                  CODE: {product.id.toUpperCase()}
                </p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-baseline gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-serif text-white">
                        ₹{product.salePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-base text-neutral-400 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-serif text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Material */}
              <div className="text-xs text-neutral-400 border-l border-white/20 pl-3">
                <span className="text-white font-medium uppercase tracking-wider block">Material Composition</span>
                <span>{product.material}</span>
              </div>

              {/* Color Selector */}
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  Color: <span className="text-white font-medium">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-3.5 py-1.5 border transition-all ${
                        selectedColor === color 
                          ? 'border-white bg-white text-black font-medium' 
                          : 'border-white/20 text-neutral-300 hover:border-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs uppercase tracking-widest text-neutral-400">
                    Size: <span className="text-white font-medium">{selectedSize}</span>
                  </p>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1 underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] py-2 px-3 text-xs uppercase border transition-all text-center ${
                        selectedSize === size 
                          ? 'border-white bg-white text-black font-semibold' 
                          : 'border-white/20 text-neutral-300 hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>In Stock ({product.stock} pieces in atelier) • Ready for Express Dispatch</span>
              </div>

              {/* Actions: Add to Bag, Buy Now, Save */}
              <div className="space-y-3 pt-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToBag}
                    className="btn-vera flex-1 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl text-center"
                  >
                    ADD TO BAG
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`px-5 py-4 border transition-colors flex items-center justify-center ${
                      isFavorite 
                        ? 'border-white bg-white text-black' 
                        : 'border-white/30 text-white hover:border-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-black' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="btn-vera w-full py-3.5 border border-white/40 text-white text-xs uppercase tracking-mega-wide font-medium hover:bg-white/10 transition-all text-center"
                >
                  BUY NOW WITH 1-CLICK
                </button>
              </div>

              {/* Brand Commitments */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center text-[10px] uppercase tracking-wider text-neutral-400">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-white" />
                  <span>Complimentary Shipping over ₹2,999</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span>14-Day Studio Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Original VÉRA Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* COMPLETE THE LOOK SECTION */}
        {/* ---------------------------------------------------- */}
        <section className="mt-28 pt-16 border-t border-white/10">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-1">Coordinated Styling</p>
            <h2 className="text-3xl font-serif text-white">COMPLETE THE LOOK</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Curated by the VÉRA stylist engine to harmonize with your selected silhouette.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(completeTheLook).filter(Boolean).map((lookItem: any) => (
              <ProductCard key={lookItem.id} product={lookItem} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* RELATED PIECES */}
        {/* ---------------------------------------------------- */}
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-white">YOU MAY ALSO APPRECIATE</h2>
            <Link to={`/collection/${product.category.toLowerCase()}`} className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-1">
              <span>View More in {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
