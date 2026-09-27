import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const handleMoveToBag = (item: any) => {
    addToCart(item.product, item.product.colors[0] || 'Black', item.product.sizes[0] || 'M', 1);
    toggleWishlist(item.product);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-2">Private Wardrobe</p>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-2">
            MY WISHLIST
          </h1>
          <p className="text-xs uppercase tracking-wider text-neutral-400">
            {wishlist.length} {wishlist.length === 1 ? 'Saved Piece' : 'Saved Pieces'}
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center max-w-md mx-auto border border-dashed border-white/10 p-12">
            <Heart className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-white mb-2">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-sm text-neutral-400 mb-8 font-light">
              Start saving pieces you love to revisit or add to your bag whenever inspiration strikes.
            </p>
            <Link
              to="/shop"
              className="btn-vera inline-block px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div key={item.productId} className="bg-neutral-950 border border-white/10 p-3 flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-black mb-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => toggleWishlist(item.product)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/product/${item.product.slug}`} className="block hover:underline">
                    <h3 className="text-sm font-light text-white truncate">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-neutral-400 mt-1">
                    ₹{(item.product.salePrice || item.product.price).toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 mt-3 flex gap-2">
                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="btn-vera flex-1 py-2 bg-white text-black text-[11px] uppercase tracking-wider font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
