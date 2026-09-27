import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CollectionSlug, Product } from '../../types';
import { COLLECTIONS_META } from '../../data/collections';
import { AlertTriangle, CheckCircle, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminCollections: React.FC = () => {
  const { products, setProducts, showToast } = useShop();
  const [selectedSlug, setSelectedSlug] = useState<CollectionSlug>('women');

  // Compute live counts
  const collectionCounts: Record<CollectionSlug, number> = {
    women: 0, men: 0, dresses: 0, tops: 0, bottoms: 0,
    outerwear: 0, shoes: 0, accessories: 0, 'new-arrivals': 0, sale: 0
  };

  products.forEach(p => {
    p.collections.forEach(slug => {
      if (collectionCounts[slug] !== undefined) {
        collectionCounts[slug]++;
      }
    });
  });

  const activeCollectionProducts = products.filter(p => p.collections.includes(selectedSlug));
  const currentCount = collectionCounts[selectedSlug] || 0;
  const isBelowTarget = currentCount < 70;

  const handleRemoveFromCollection = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          collections: p.collections.filter(s => s !== selectedSlug)
        };
      }
      return p;
    }));
    showToast(`Removed item from ${selectedSlug} collection`, 'info');
  };

  const handleAddRandomItem = () => {
    // Find a product not in this collection
    const unassigned = products.find(p => !p.collections.includes(selectedSlug));
    if (unassigned) {
      setProducts(prev => prev.map(p => {
        if (p.id === unassigned.id) {
          return {
            ...p,
            collections: [...p.collections, selectedSlug]
          };
        }
        return p;
      }));
      showToast(`Assigned ${unassigned.name} to ${selectedSlug}`, 'success');
    } else {
      showToast('All catalog items are already assigned to this collection', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Curatorial Inspector</p>
          <h1 className="text-3xl font-serif text-white">COLLECTION MANAGEMENT</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-white text-black font-semibold">
            Standard: 70 Items / Collection
          </span>
        </div>
      </div>

      {/* 10 Collections Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {COLLECTIONS_META.map(col => {
          const count = collectionCounts[col.id];
          const isSelected = selectedSlug === col.id;
          const warning = count < 70;

          return (
            <div
              key={col.id}
              onClick={() => setSelectedSlug(col.id)}
              className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-white bg-white/10' 
                  : 'border-white/15 bg-neutral-950 hover:border-white/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">{col.id}</span>
                  {warning ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <h3 className="text-sm font-serif text-white">{col.name}</h3>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-baseline justify-between">
                <span className="text-lg font-serif text-white">{count}</span>
                <span className={`text-[10px] uppercase tracking-wider ${warning ? 'text-amber-400' : 'text-neutral-400'}`}>
                  {count >= 70 ? '70 Target' : `${70 - count} Deficit`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning banner if selected collection drops below 70 */}
      {isBelowTarget && (
        <div className="p-4 bg-amber-950/40 border border-amber-500/50 text-amber-300 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Warning:</strong> The <strong>{selectedSlug.toUpperCase()}</strong> collection has {currentCount} items, which is below the required 70-product preloaded standard.
            </span>
          </div>
          <button
            onClick={handleAddRandomItem}
            className="px-3 py-1 bg-amber-400 text-black font-semibold uppercase text-[10px] tracking-wider"
          >
            Assign Piece to Meet 70
          </button>
        </div>
      )}

      {/* Selected Collection Inspector */}
      <div className="bg-neutral-950 border border-white/10 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-2xl font-serif text-white uppercase">
              {selectedSlug} COLLECTION ({activeCollectionProducts.length} PIECES)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live relational associations in database memory.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddRandomItem}
              className="px-4 py-2 border border-white/20 hover:border-white text-xs uppercase tracking-wider text-white flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign More Pieces</span>
            </button>
            <Link
              to={`/collection/${selectedSlug}`}
              target="_blank"
              className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1"
            >
              <span>View Storefront</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Products in this collection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {activeCollectionProducts.map(p => (
            <div key={p.id} className="bg-black border border-white/10 p-2.5 flex flex-col justify-between group relative">
              <div>
                <img src={p.images[0]} alt={p.name} className="w-full aspect-[3/4] object-cover mb-2" />
                <p className="text-xs text-white truncate font-light">{p.name}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">₹{(p.salePrice || p.price).toLocaleString('en-IN')}</p>
              </div>

              <button
                onClick={() => handleRemoveFromCollection(p.id)}
                className="mt-2 text-[10px] uppercase tracking-wider text-neutral-500 hover:text-rose-400 text-left flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
