import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartDiscount, 
    deliveryFee, 
    cartTotal 
  } = useShop();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2999;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-lg font-serif tracking-wider uppercase">Shopping Bag</h2>
              <span className="text-xs text-vera-gray-mid">({cart.length})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-vera-gray-light hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-neutral-900 border-b border-white/5">
            {remainingForFreeShipping === 0 ? (
              <p className="text-xs text-emerald-400 font-medium tracking-wide">
                ✓ You have unlocked Complimentary Express Delivery
              </p>
            ) : (
              <div>
                <p className="text-xs text-vera-gray-light mb-1.5">
                  Add <span className="text-white font-medium">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> for Complimentary Delivery
                </p>
                <div className="w-full h-1 bg-white/10 overflow-hidden rounded-full">
                  <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-white/10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <ShoppingBag className="w-12 h-12 text-vera-gray-dark mb-4" />
                <h3 className="text-xl font-serif text-white mb-2">YOUR BAG IS EMPTY</h3>
                <p className="text-xs text-vera-gray-light max-w-xs mb-8">
                  DISCOVER YOUR NEXT FAVORITE PIECE.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-3 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemPrice = item.product.salePrice || item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="py-4 flex gap-4">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-20 h-24 object-cover border border-white/10 flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link 
                            to={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-sm font-light text-white hover:underline truncate block"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-vera-gray-mid hover:text-rose-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-vera-gray-mid mt-0.5">
                          {item.selectedColor} • Size: {item.selectedSize}
                        </p>
                        <p className="text-xs text-white mt-1">
                          ₹{itemPrice.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-white/20">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, -1)}
                            className="p-1 hover:bg-white/10 text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, 1)}
                            className="p-1 hover:bg-white/10 text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-vera-gray-light font-light ml-auto">
                          ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-neutral-950/95 space-y-3">
              <div className="space-y-1.5 text-xs text-vera-gray-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Editorial Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                <span className="text-sm uppercase tracking-wider text-white">Estimated Total</span>
                <span className="text-lg font-serif text-white">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="btn-vera w-full py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-xl"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
