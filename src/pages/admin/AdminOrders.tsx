import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Order, OrderStatus } from '../../types';
import { Search, Eye, X, Check, MapPin, Package } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.customer.email.toLowerCase().includes(q);
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
    showToast(`Order ${orderId} updated to ${newStatus}`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Logistics & Fulfillment</p>
        <h1 className="text-3xl font-serif text-white">ORDER MANAGEMENT</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 border border-white/10">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-white/20 px-3 py-1.5 bg-black">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID or customer name..."
            className="bg-transparent text-xs text-white placeholder:text-neutral-600 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs uppercase tracking-wider text-neutral-400">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black text-white border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {statuses.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-neutral-400 uppercase tracking-wider bg-black">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status & Action</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono text-white font-medium">{order.id}</td>
                  <td className="py-3 px-4">
                    <span className="text-white block">{order.customer.name}</span>
                    <span className="text-[10px] text-neutral-500">{order.customer.email}</span>
                  </td>
                  <td className="py-3 px-4">{order.items.length} items</td>
                  <td className="py-3 px-4 font-serif text-white">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-[11px] text-neutral-300">{order.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-black text-white border border-white/20 px-2 py-1 text-[11px] uppercase focus:outline-none"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 border border-white/20 hover:border-white text-white transition-colors"
                      title="Inspect Order Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-950 border border-white/20 max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400">Order Inspection</span>
                <h3 className="text-xl font-serif text-white">{selectedOrder.id}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-black border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Customer Info</span>
                <p className="text-white font-medium">{selectedOrder.customer.name}</p>
                <p className="text-neutral-300">{selectedOrder.customer.email}</p>
                <p className="text-neutral-400">{selectedOrder.customer.phone}</p>
              </div>

              <div className="p-3 bg-black border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider block mb-1">Shipping Address</span>
                <p className="text-neutral-300">{selectedOrder.shippingAddress.street}</p>
                <p className="text-neutral-300">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.postalCode}</p>
              </div>
            </div>

            {/* Items */}
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">Order Items:</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-black border border-white/10">
                    <img src={item.productImage} alt={item.productName} className="w-10 h-12 object-cover border border-white/10" />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="text-white truncate">{item.productName}</p>
                      <p className="text-neutral-400">{item.selectedColor} • {item.selectedSize} (Qty: {item.quantity})</p>
                    </div>
                    <span className="text-xs text-white">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-400 block">Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="bg-black text-white border border-white/30 px-2.5 py-1 text-xs uppercase"
                >
                  {statuses.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <span className="text-neutral-400 block">Total Billed:</span>
                <span className="text-lg font-serif text-white">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
