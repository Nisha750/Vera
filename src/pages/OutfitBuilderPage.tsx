import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, Category } from '../types';
import { Layers, Plus, RefreshCw, Trash2, ShoppingBag, Heart, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type OutfitSlot = 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessories';

export const OutfitBuilderPage: React.FC = () => {
  const { products, addToCart, saveLook } = useShop();

  // Initial defaults
  const [outfit, setOutfit] = useState<{
    top: Product | null;
    bottom: Product | null;
    outerwear: Product | null;
    shoes: Product | null;
    accessories: Product | null;
  }>(() => {
    const tops = products.filter(p => p.category === 'Tops');
    const bottoms = products.filter(p => p.category === 'Bottoms');
    const outerwear = products.filter(p => p.category === 'Outerwear');
    const shoes = products.filter(p => p.category === 'Shoes');
    const accessories = products.filter(p => p.category === 'Accessories');

    return {
      top: tops[0] || null,
      bottom: bottoms[0] || null,
      outerwear: outerwear[0] || null,
      shoes: shoes[0] || null,
      accessories: accessories[0] || null,
    };
  });

  const [activePickerSlot, setActivePickerSlot] = useState<OutfitSlot | null>(null);

  const slotCategoryMap: Record<OutfitSlot, Category> = {
    top: 'Tops',
    bottom: 'Bottoms',
    outerwear: 'Outerwear',
    shoes: 'Shoes',
    accessories: 'Accessories'
  };

  const handleRemoveSlot = (slot: OutfitSlot) => {
    setOutfit(prev => ({ ...prev, [slot]: null }));
  };

  const handleSelectProduct = (product: Product) => {
    if (activePickerSlot) {
      setOutfit(prev => ({ ...prev, [activePickerSlot]: product }));
      setActivePickerSlot(null);
    }
  };

  // Calculate live total
  const outfitTotal = Object.values(outfit).reduce((acc, item) => {
    if (!item) return acc;
    return acc + (item.salePrice || item.price);
  }, 0);

  const handleAddAllToBag = () => {
    Object.values(outfit).forEach(item => {
      if (item) {
        const color = item.colors[0] || 'Black';
        const size = item.sizes[0] || 'M';
        addToCart(item, color, size, 1);
      }
    });
  };

  const handleSaveCurrentLook = () => {
    if (outfitTotal === 0) return;
    saveLook({
      name: `Studio Outfit #${Math.floor(100 + Math.random() * 900)}`,
      occasion: 'Atelier Curated',
      aesthetic: 'Monochrome',
      top: outfit.top || undefined,
      bottom: outfit.bottom || undefined,
      outerwear: outfit.outerwear || undefined,
      shoes: outfit.shoes || undefined,
      accessory: outfit.accessories || undefined,
      totalPrice: outfitTotal
    });
  };

  const slots: { key: OutfitSlot; label: string; category: Category }[] = [
    { key: 'outerwear', label: 'OUTERWEAR', category: 'Outerwear' },
    { key: 'top', label: 'TOP', category: 'Tops' },
    { key: 'bottom', label: 'BOTTOM', category: 'Bottoms' },
    { key: 'shoes', label: 'SHOES', category: 'Shoes' },
    { key: 'accessories', label: 'ACCESSORIES', category: 'Accessories' },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-neutral-400 mb-3">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>Interactive Styling Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-2">
            VÉRA OUTFIT BUILDER
          </h1>
          <p className="text-sm text-neutral-400 font-light">
            Mix, match and architect your silhouette layer by layer.
          </p>
        </div>

        {/* Studio Grid: 5 Interactive Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {slots.map(({ key, label, category }) => {
            const currentItem = outfit[key];

            return (
              <div
                key={key}
                className="bg-neutral-950 border border-white/10 p-4 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-mega-wide text-neutral-400 font-medium">
                      {label}
                    </span>
                    {currentItem && (
                      <button
                        onClick={() => handleRemoveSlot(key)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Slot Image / Empty State */}
                  {currentItem ? (
                    <div className="relative aspect-[3/4] overflow-hidden bg-black border border-white/10 mb-3">
                      <img
                        src={currentItem.images[0]}
                        alt={currentItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setActivePickerSlot(key)}
                      className="aspect-[3/4] border-2 border-dashed border-white/15 hover:border-white/40 flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 bg-black/30"
                    >
                      <Plus className="w-6 h-6 text-neutral-500 mb-1" />
                      <span className="text-xs uppercase tracking-wider text-neutral-500">
                        Add {label}
                      </span>
                    </div>
                  )}

                  {/* Item Details */}
                  {currentItem ? (
                    <div className="space-y-1">
                      <h4 className="text-xs font-light text-white truncate" title={currentItem.name}>
                        {currentItem.name}
                      </h4>
                      <p className="text-xs text-neutral-300 font-medium">
                        ₹{(currentItem.salePrice || currentItem.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 italic">Slot Empty</p>
                  )}
                </div>

                {/* Slot Action Button */}
                <div className="pt-3 border-t border-white/10 mt-3 flex gap-2">
                  <button
                    onClick={() => setActivePickerSlot(key)}
                    className="flex-1 py-1.5 border border-white/20 text-[10px] uppercase tracking-widest text-neutral-300 hover:border-white hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{currentItem ? 'Replace' : 'Choose'}</span>
                  </button>
                  {currentItem && (
                    <button
                      onClick={() => handleRemoveSlot(key)}
                      className="py-1.5 px-2 border border-white/10 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-rose-400 hover:border-rose-400/40"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Ensemble Summary Bar */}
        <div className="bg-neutral-950 border border-white/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-1">
              YOUR VÉRA LOOK
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400">TOTAL:</span>
              <span className="text-3xl font-serif text-white">
                ₹{outfitTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              onClick={handleSaveCurrentLook}
              disabled={outfitTotal === 0}
              className="px-6 py-4 border border-white/30 text-white text-xs uppercase tracking-mega-wide font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>SAVE LOOK</span>
            </button>

            <button
              onClick={handleAddAllToBag}
              disabled={outfitTotal === 0}
              className="btn-vera flex-1 sm:flex-none px-8 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD COMPLETE LOOK TO BAG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Item Picker Modal */}
      {activePickerSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-950 border border-white/20 max-w-4xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-mega-wide text-neutral-400">Atelier Selector</p>
                <h3 className="text-xl font-serif text-white">
                  Select {slotCategoryMap[activePickerSlot]} Piece
                </h3>
              </div>
              <button
                onClick={() => setActivePickerSlot(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Catalog list for this slot */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
              {products
                .filter(p => p.category === slotCategoryMap[activePickerSlot])
                .map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="cursor-pointer border border-white/10 hover:border-white p-2 transition-all group bg-black"
                  >
                    <div className="aspect-[3/4] overflow-hidden mb-2 bg-neutral-900">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-xs text-white truncate font-light">{product.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
