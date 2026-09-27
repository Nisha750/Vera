import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, AlertTriangle, CheckCircle, XCircle, Save } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, setProducts, showToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<'All' | 'Low' | 'Out'>('All');
  const [stockEdits, setStockEdits] = useState<Record<string, number>>({});

  const handleStockChange = (productId: string, val: number) => {
    setStockEdits(prev => ({ ...prev, [productId]: Math.max(0, val) }));
  };

  const handleSaveStock = (productId: string) => {
    const newVal = stockEdits[productId];
    if (newVal === undefined) return;

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: newVal };
      }
      return p;
    }));

    setStockEdits(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

    showToast(`Inventory updated for ${productId}`, 'success');
  };

  const filteredProducts = products.filter(p => {
    if (stockFilter === 'Low' && p.stock >= 30) return false;
    if (stockFilter === 'Out' && p.stock > 0) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Atelier Stockroom</p>
        <h1 className="text-3xl font-serif text-white">INVENTORY CONTROL</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 border border-white/10">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-white/20 px-3 py-1.5 bg-black">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search piece or SKU..."
            className="bg-transparent text-xs text-white placeholder:text-neutral-600 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-neutral-400">Stock Status:</span>
          {(['All', 'Low', 'Out'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStockFilter(tab)}
              className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${
                stockFilter === tab ? 'bg-white text-black border-white font-medium' : 'border-white/20 text-neutral-400 hover:border-white'
              }`}
            >
              {tab === 'All' ? 'All Stock' : tab === 'Low' ? 'Low Stock (<30)' : 'Out of Stock'}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-neutral-400 uppercase tracking-wider bg-black">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status Indicator</th>
                <th className="py-3 px-4">Adjust Stock Level</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {filteredProducts.map(p => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock < 30;
                const currentEditVal = stockEdits[p.id] !== undefined ? stockEdits[p.id] : p.stock;
                const hasModified = stockEdits[p.id] !== undefined && stockEdits[p.id] !== p.stock;

                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover border border-white/10" />
                      <span className="text-white font-medium truncate max-w-xs">{p.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400">{p.id.toUpperCase()}</td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4 font-serif text-white">{p.stock} units</td>
                    <td className="py-3 px-4">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 text-rose-400 border border-rose-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                          <XCircle className="w-3 h-3" /> Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                          <CheckCircle className="w-3 h-3" /> Optimum
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={currentEditVal}
                          onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                          className="w-20 bg-black border border-white/20 px-2 py-1 text-white text-xs focus:outline-none focus:border-white"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {hasModified && (
                        <button
                          onClick={() => handleSaveStock(p.id)}
                          className="px-3 py-1 bg-white text-black text-[11px] font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Save className="w-3 h-3" />
                          <span>Commit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
