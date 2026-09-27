import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product, Category, Gender, CollectionSlug } from '../../types';
import { Plus, Search, Edit2, Trash2, X, Check, ArrowUpDown } from 'lucide-react';
import { FALLBACK_IMAGE } from '../../data/collections';

export const AdminProducts: React.FC = () => {
  const { products, setProducts, showToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    price: number;
    salePrice: string;
    category: Category;
    gender: Gender;
    style: Product['style'];
    occasion: Product['occasion'];
    colors: string;
    sizes: string;
    material: string;
    stock: number;
    imageUrl: string;
    tags: string;
    collections: CollectionSlug[];
  }>({
    name: '',
    description: '',
    price: 1999,
    salePrice: '',
    category: 'Tops',
    gender: 'women',
    style: 'Minimal',
    occasion: 'Casual',
    colors: 'Obsidian Black, Chalk White',
    sizes: 'XS, S, M, L, XL',
    material: '100% Japanese Supima Cotton',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    tags: 'minimal, monochrome, essential',
    collections: ['women', 'tops', 'new-arrivals']
  });

  const allCollectionSlugs: CollectionSlug[] = [
    'women', 'men', 'dresses', 'tops', 'bottoms', 'outerwear', 'shoes', 'accessories', 'new-arrivals', 'sale'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    });
  }, [products, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const displayedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      description: '',
      price: 1999,
      salePrice: '',
      category: 'Tops',
      gender: 'women',
      style: 'Minimal',
      occasion: 'Casual',
      colors: 'Obsidian Black, Chalk White',
      sizes: 'XS, S, M, L, XL',
      material: '100% Japanese Supima Cotton',
      stock: 45,
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      tags: 'minimal, monochrome, essential',
      collections: ['women', 'tops', 'new-arrivals']
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormState({
      name: p.name,
      description: p.description,
      price: p.price,
      salePrice: p.salePrice ? String(p.salePrice) : '',
      category: p.category,
      gender: p.gender,
      style: p.style,
      occasion: p.occasion,
      colors: p.colors.join(', '),
      sizes: p.sizes.join(', '),
      material: p.material,
      stock: p.stock,
      imageUrl: p.images[0] || FALLBACK_IMAGE,
      tags: p.tags.join(', '),
      collections: [...p.collections]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this piece from the VÉRA catalog?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed from catalog', 'info');
    }
  };

  const handleToggleCollection = (slug: CollectionSlug) => {
    setFormState(prev => {
      const exists = prev.collections.includes(slug);
      return {
        ...prev,
        collections: exists ? prev.collections.filter(s => s !== slug) : [...prev.collections, slug]
      };
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const colorsArr = formState.colors.split(',').map(s => s.trim()).filter(Boolean);
    const sizesArr = formState.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const tagsArr = formState.tags.split(',').map(s => s.trim()).filter(Boolean);
    const parsedSale = formState.salePrice ? Number(formState.salePrice) : undefined;

    if (editingProduct) {
      // Update existing
      const updated: Product = {
        ...editingProduct,
        name: formState.name,
        description: formState.description,
        price: Number(formState.price),
        salePrice: parsedSale,
        category: formState.category,
        gender: formState.gender,
        style: formState.style,
        occasion: formState.occasion,
        colors: colorsArr,
        sizes: sizesArr,
        material: formState.material,
        stock: Number(formState.stock),
        images: [formState.imageUrl, editingProduct.images[1] || formState.imageUrl],
        tags: tagsArr,
        collections: formState.collections,
        isSale: !!parsedSale
      };

      setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
      showToast(`Updated product: ${updated.name}`, 'success');
    } else {
      // Create new
      const newId = `vera-prod-${Date.now().toString().slice(-4)}`;
      const newSlug = formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-3)}`;

      const newProduct: Product = {
        id: newId,
        name: formState.name,
        slug: newSlug,
        description: formState.description,
        price: Number(formState.price),
        salePrice: parsedSale,
        category: formState.category,
        gender: formState.gender,
        style: formState.style,
        occasion: formState.occasion,
        colors: colorsArr,
        sizes: sizesArr,
        material: formState.material,
        stock: Number(formState.stock),
        images: [formState.imageUrl, formState.imageUrl],
        tags: tagsArr,
        collections: formState.collections,
        rating: 5.0,
        reviewCount: 1,
        isNew: true,
        isSale: !!parsedSale,
        createdAt: new Date().toISOString()
      };

      setProducts(prev => [newProduct, ...prev]);
      showToast(`Created product: ${newProduct.name}`, 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Catalog Controller</p>
          <h1 className="text-3xl font-serif text-white">PRODUCT MANAGEMENT</h1>
        </div>
        <button
          onClick={openAddModal}
          className="btn-vera px-6 py-3 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Piece</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 border border-white/10">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-white/20 px-3 py-1.5 bg-black">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search piece name or SKU..."
            className="bg-transparent text-xs text-white placeholder:text-neutral-600 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-wider text-neutral-400">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-black text-white border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Dresses">Dresses</option>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-neutral-400 uppercase tracking-wider bg-black">
                <th className="py-3 px-4">Piece</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Regular Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Collections</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {displayedProducts.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.images[0] || FALLBACK_IMAGE} alt={p.name} className="w-10 h-12 object-cover border border-white/10" />
                    <div>
                      <span className="text-white font-medium block truncate max-w-xs">{p.name}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{p.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 font-serif text-white">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4">
                    {p.salePrice ? (
                      <span className="text-emerald-400 font-serif">₹{p.salePrice.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-neutral-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 border text-[10px] uppercase ${
                      p.stock < 15 ? 'border-rose-500/40 text-rose-400' : 'border-white/10 text-neutral-300'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[10px] text-neutral-400 max-w-xs truncate">
                    {p.collections.join(', ')}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 border border-white/20 hover:border-white text-white transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 border border-white/20 hover:border-rose-400 hover:text-rose-400 text-neutral-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Showing {displayedProducts.length} of {filteredProducts.length} pieces</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 border border-white/20 disabled:opacity-30 hover:border-white text-white"
            >
              Previous
            </button>
            <span className="px-2 py-1 text-white">Page {page} of {totalPages || 1}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 border border-white/20 disabled:opacity-30 hover:border-white text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Product Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-950 border border-white/20 max-w-3xl w-full max-h-[90vh] flex flex-col p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
              <h3 className="text-xl font-serif text-white">
                {editingProduct ? `Edit Piece: ${editingProduct.name}` : 'Add New Atelier Piece'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-6 pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Material Composition *</label>
                  <input
                    type="text"
                    required
                    value={formState.material}
                    onChange={(e) => setFormState({ ...formState, material: e.target.value })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Sale Price (₹ Optional)</label>
                  <input
                    type="number"
                    value={formState.salePrice}
                    onChange={(e) => setFormState({ ...formState, salePrice: e.target.value })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as Category })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: Number(e.target.value) })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Image Preview & URL */}
              <div className="flex gap-4 items-center">
                <img src={formState.imageUrl || FALLBACK_IMAGE} alt="Preview" className="w-16 h-20 object-cover border border-white/20 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Primary Image URL (Editorial CDN)</label>
                  <input
                    type="url"
                    required
                    value={formState.imageUrl}
                    onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                    className="w-full bg-black border border-white/20 p-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              {/* Collections Multi-Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                  Assigned Collections (Preloaded Target: 70/collection)
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCollectionSlugs.map(slug => {
                    const isAssigned = formState.collections.includes(slug);
                    return (
                      <button
                        type="button"
                        key={slug}
                        onClick={() => handleToggleCollection(slug)}
                        className={`text-xs uppercase px-3 py-1 border transition-all ${
                          isAssigned ? 'bg-white text-black border-white font-medium' : 'border-white/20 text-neutral-400 hover:border-white'
                        }`}
                      >
                        {slug}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-white/20 text-xs uppercase tracking-wider text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-vera px-6 py-2.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 shadow-xl"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
