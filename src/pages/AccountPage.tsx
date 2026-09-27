import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Package, Heart, Sparkles, MapPin, Settings, Check, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, savedLooks, preferences, updatePreferences, deleteSavedLook } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'looks' | 'preferences' | 'addresses'>('profile');

  // Local state for editing preferences
  const [prefForm, setPrefForm] = useState(preferences);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleStyle = (style: string) => {
    setPrefForm(prev => {
      const exists = prev.styles.includes(style);
      return {
        ...prev,
        styles: exists ? prev.styles.filter(s => s !== style) : [...prev.styles, style]
      };
    });
  };

  const handleToggleColor = (color: string) => {
    setPrefForm(prev => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists ? prev.colors.filter(c => c !== color) : [...prev.colors, color]
      };
    });
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(prefForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const styleOptions = ['Minimal', 'Classic', 'Streetwear', 'Old Money', 'Tailored', 'Luxury', 'Casual'];
  const colorOptions = ['Black', 'White', 'Charcoal', 'Ivory', 'Neutral', 'Monochrome'];
  const budgetOptions = ['Under ₹1,500', '₹1,500–₹3,000', '₹3,000–₹5,000', '₹5,000+'];

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Customer Portal</p>
            <h1 className="text-3xl sm:text-4xl font-serif text-white">MY VÉRA</h1>
          </div>
          <div className="text-xs uppercase tracking-wider text-neutral-400">
            Account Status: <span className="text-white font-medium">VIP Tier Member</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 overflow-x-auto mb-10 gap-2 text-xs uppercase tracking-wider">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'looks', label: `Saved Looks (${savedLooks.length})`, icon: Sparkles },
            { id: 'preferences', label: 'Style Preferences', icon: Settings },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-white text-white font-medium'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-neutral-950 border border-white/10 p-8 max-w-2xl animate-fade-in space-y-6">
            <h2 className="text-2xl font-serif text-white">PERSONAL PROFILE</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block uppercase tracking-wider mb-1">Name</label>
                <input
                  type="text"
                  readOnly
                  value="Nisha H"
                  className="w-full bg-black border border-white/15 p-3 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-neutral-400 block uppercase tracking-wider mb-1">Email</label>
                <input
                  type="text"
                  readOnly
                  value="nisha240106@gmail.com"
                  className="w-full bg-black border border-white/15 p-3 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-neutral-400 block uppercase tracking-wider mb-1">Phone</label>
                <input
                  type="text"
                  readOnly
                  value="+91 7019875647"
                  className="w-full bg-black border border-white/15 p-3 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-neutral-400 block uppercase tracking-wider mb-1">Preferred Atelier Currency</label>
                <input
                  type="text"
                  readOnly
                  value="INR (₹) - Indian Rupee"
                  className="w-full bg-black border border-white/15 p-3 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {orders.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 p-8">
                <p className="text-sm text-neutral-400">No orders placed yet.</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-neutral-950 border border-white/10 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div>
                      <span className="text-sm font-mono text-white font-medium">{order.id}</span>
                      <p className="text-xs text-neutral-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-0.5 bg-white text-black font-medium uppercase">
                        {order.status}
                      </span>
                      <Link
                        to={`/order-tracking?id=${order.id}`}
                        className="text-xs uppercase tracking-wider text-neutral-300 hover:text-white underline"
                      >
                        Track Order →
                      </Link>
                    </div>
                  </div>

                  <div className="py-4 space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img src={item.productImage} alt={item.productName} className="w-12 h-14 object-cover border border-white/10" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="text-white truncate font-light">{item.productName}</p>
                          <p className="text-neutral-400">{item.selectedColor} • {item.selectedSize} (Qty: {item.quantity})</p>
                        </div>
                        <span className="text-xs text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between text-xs">
                    <span className="text-neutral-400">Total Charged</span>
                    <span className="text-sm font-serif text-white">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-white">Saved Wishlist Pieces</h2>
              <Link to="/wishlist" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white underline">
                View Full Wardrobe →
              </Link>
            </div>
            {wishlist.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 p-8 text-neutral-400 text-sm">
                Your wishlist is empty.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {wishlist.map(item => (
                  <div key={item.productId} className="bg-neutral-950 border border-white/10 p-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full aspect-[3/4] object-cover mb-2" />
                    <p className="text-xs text-white truncate">{item.product.name}</p>
                    <p className="text-xs text-neutral-400">₹{(item.product.salePrice || item.product.price).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SAVED LOOKS */}
        {activeTab === 'looks' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-serif text-white">Saved AI Looks & Ensembles</h2>
            {savedLooks.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 p-8">
                <p className="text-sm text-neutral-400 mb-4">You have not saved any styling ensembles yet.</p>
                <Link to="/ai-stylist" className="btn-vera px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest">
                  Consult AI Stylist
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedLooks.map(look => (
                  <div key={look.id} className="bg-neutral-950 border border-white/10 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-mega-wide text-neutral-400">{look.occasion}</span>
                          <h3 className="text-lg font-serif text-white">{look.name}</h3>
                        </div>
                        <button onClick={() => deleteSavedLook(look.id)} className="text-neutral-500 hover:text-rose-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {[look.top, look.bottom, look.shoes, look.accessory].filter(Boolean).map((item, idx) => (
                          <img key={idx} src={item?.images[0]} alt="Ensemble piece" className="aspect-[3/4] object-cover border border-white/10" />
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-baseline justify-between text-xs">
                      <span className="text-neutral-400">Look Total:</span>
                      <span className="text-base font-serif text-white">₹{look.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: STYLE PREFERENCES */}
        {activeTab === 'preferences' && (
          <form onSubmit={handleSavePreferences} className="bg-neutral-950 border border-white/10 p-8 max-w-3xl animate-fade-in space-y-8">
            <div>
              <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Personalized Engine Settings</p>
              <h2 className="text-2xl font-serif text-white mb-2">STYLE PREFERENCES</h2>
              <p className="text-xs text-neutral-400 font-light">
                These preferences inform how the VÉRA AI Stylist prioritizes recommendations across the 700 catalog items.
              </p>
            </div>

            {/* Favorite Styles */}
            <div>
              <label className="text-xs uppercase tracking-wider text-white block mb-2">Favorite Aesthetics</label>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map(st => {
                  const selected = prefForm.styles.includes(st);
                  return (
                    <button
                      type="button"
                      key={st}
                      onClick={() => handleToggleStyle(st)}
                      className={`text-xs uppercase px-3 py-1.5 border transition-all ${
                        selected ? 'bg-white text-black border-white font-medium' : 'border-white/20 text-neutral-400 hover:border-white'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Favorite Colors */}
            <div>
              <label className="text-xs uppercase tracking-wider text-white block mb-2">Preferred Palettes</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(col => {
                  const selected = prefForm.colors.includes(col);
                  return (
                    <button
                      type="button"
                      key={col}
                      onClick={() => handleToggleColor(col)}
                      className={`text-xs uppercase px-3 py-1.5 border transition-all ${
                        selected ? 'bg-white text-black border-white font-medium' : 'border-white/20 text-neutral-400 hover:border-white'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Scope */}
            <div>
              <label className="text-xs uppercase tracking-wider text-white block mb-2">Budget Scope</label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map(b => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setPrefForm(prev => ({ ...prev, budget: b }))}
                    className={`text-xs uppercase px-3 py-1.5 border transition-all ${
                      prefForm.budget === b ? 'bg-white text-black border-white font-medium' : 'border-white/20 text-neutral-400 hover:border-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Preferences Updated
                </span>
              ) : <div />}
              <button
                type="submit"
                className="btn-vera px-8 py-3 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl"
              >
                Save Preferences
              </button>
            </div>
          </form>
        )}

        {/* TAB 6: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="bg-neutral-950 border border-white/10 p-8 max-w-2xl animate-fade-in space-y-4">
            <h2 className="text-2xl font-serif text-white mb-4">SAVED ADDRESSES</h2>
            <div className="border border-white/20 p-4 space-y-1 text-xs">
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/10 text-white inline-block mb-2">
                Default Atelier Address
              </span>
              <p className="text-white font-medium">Aarav Sharma</p>
              <p className="text-neutral-300">Plot 45, Lavelle Road</p>
              <p className="text-neutral-300">Bengaluru, Karnataka - 560001, India</p>
              <p className="text-neutral-400 pt-1">Contact: +91 9845012345</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
