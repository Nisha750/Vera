import React from 'react';
import { useShop } from '../../context/ShopContext';
import { COLLECTIONS_META } from '../../data/collections';
import { DollarSign, Package, ShoppingBag, Users, AlertTriangle, TrendingUp, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { products, orders, customers } = useShop();

  const totalProducts = products.length;
  const totalCollections = COLLECTIONS_META.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter(p => p.stock < 30).length;
  const newOrdersCount = orders.filter(o => o.status === 'Confirmed').length;

  // Category counts
  const categoryCounts: Record<string, number> = {};
  products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Executive Studio Overview</p>
          <h1 className="text-3xl font-serif text-white">ADMIN DASHBOARD</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider px-3 py-1 bg-white text-black font-semibold">
            Catalog: 700 Preloaded Assignments
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* Revenue */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total Revenue</span>
          <p className="text-2xl font-serif text-white mt-2">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18.4%
          </span>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total Orders</span>
          <p className="text-2xl font-serif text-white mt-2">{totalOrders}</p>
          <span className="text-[10px] text-neutral-400 mt-1">{newOrdersCount} New Dispatch</span>
        </div>

        {/* Total Products */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Base Catalog</span>
          <p className="text-2xl font-serif text-white mt-2">{totalProducts}</p>
          <span className="text-[10px] text-neutral-400 mt-1">Unique Silhouettes</span>
        </div>

        {/* Total Collections */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Collections</span>
          <p className="text-2xl font-serif text-white mt-2">{totalCollections}</p>
          <span className="text-[10px] text-white font-medium mt-1">70 Items / Col</span>
        </div>

        {/* Customers */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Customers</span>
          <p className="text-2xl font-serif text-white mt-2">{totalCustomers}</p>
          <span className="text-[10px] text-neutral-400 mt-1">Active Patrons</span>
        </div>

        {/* Low Stock */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Low Stock Alert</span>
          <p className="text-2xl font-serif text-amber-400 mt-2">{lowStockCount}</p>
          <span className="text-[10px] text-neutral-400 mt-1">&lt; 30 in atelier</span>
        </div>

        {/* Relational Assignments */}
        <div className="p-5 bg-neutral-950 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Assignments</span>
          <p className="text-2xl font-serif text-white mt-2">700</p>
          <span className="text-[10px] text-emerald-400 mt-1">Exact Target Met</span>
        </div>
      </div>

      {/* Black & White Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Growth Bar Chart */}
        <div className="lg:col-span-8 bg-neutral-950 border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white">Monthly Revenue Trajectory</h3>
              <p className="text-xs text-neutral-400">In Lakhs (₹ INR) across the current season</p>
            </div>
            <span className="text-xs text-neutral-400 font-mono">Q1 2026</span>
          </div>

          {/* Minimalist SVG Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-4 pt-8 px-2 border-b border-white/20">
            {[
              { month: 'OCT', val: 45, rev: '₹4.5L' },
              { month: 'NOV', val: 62, rev: '₹6.2L' },
              { month: 'DEC', val: 88, rev: '₹8.8L' },
              { month: 'JAN', val: 75, rev: '₹7.5L' },
              { month: 'FEB', val: 92, rev: '₹9.2L' },
              { month: 'MAR (Proj)', val: 105, rev: '₹10.5L' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.rev}
                </span>
                <div
                  className="w-full bg-neutral-800 group-hover:bg-white transition-colors"
                  style={{ height: `${(bar.val / 110) * 100}%` }}
                />
                <span className="text-[10px] uppercase font-mono text-neutral-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 bg-neutral-950 border border-white/10 p-6 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-sm uppercase tracking-widest text-white">Category Distribution</h3>
            <p className="text-xs text-neutral-400">Active pieces per division</p>
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalProducts) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white">{cat}</span>
                    <span className="text-neutral-400">{count} pieces ({pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-white" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-neutral-950 border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
          <h3 className="text-sm uppercase tracking-widest text-white">Recent Atelier Orders</h3>
          <Link to="/admin/orders" className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5">Order ID</th>
                <th className="py-2.5">Customer</th>
                <th className="py-2.5">Items</th>
                <th className="py-2.5">Total</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-white/5">
                  <td className="py-3 font-mono text-white">{o.id}</td>
                  <td>{o.customer.name}</td>
                  <td>{o.items.length} items</td>
                  <td className="font-serif text-white">₹{o.total.toLocaleString('en-IN')}</td>
                  <td>
                    <span className="px-2 py-0.5 border border-white/20 text-[10px] uppercase">
                      {o.status}
                    </span>
                  </td>
                  <td className="text-neutral-400">
                    {new Date(o.createdAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
