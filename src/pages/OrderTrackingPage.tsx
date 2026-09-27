import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, CheckCircle, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const { orders } = useShop();

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return orders.find(o => o.id.toLowerCase() === initialId.toLowerCase()) || orders[0] || null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const found = orders.find(o => o.id.toLowerCase().includes(orderQuery.trim().toLowerCase()));
    setSearchedOrder(found || null);
  };

  const steps: OrderStatus[] = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'Cancelled') return -1;
    return steps.indexOf(status);
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-2">Concierge Services</p>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-2">
            ORDER TRACKING
          </h1>
          <p className="text-sm text-neutral-400 font-light">
            Real-time status updates from our design atelier to your doorstep.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
          <div className="flex border border-white/20 focus-within:border-white transition-colors bg-neutral-950">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. VERA-2026-9812)"
              className="bg-transparent px-4 py-3 text-xs uppercase tracking-wider text-white placeholder:text-neutral-500 flex-1 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </div>
        </form>

        {/* Order Details & Timeline */}
        {searchedOrder ? (
          <div className="bg-neutral-950 border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-ultra-wide text-neutral-400">Order Reference</span>
                <h3 className="text-2xl font-serif text-white font-medium">{searchedOrder.id}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[10px] uppercase tracking-ultra-wide text-neutral-400">Estimated Delivery</span>
                <p className="text-base font-serif text-white">{searchedOrder.estimatedDelivery}</p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-white text-black text-[10px] font-semibold uppercase tracking-wider">
                  Status: {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-6">
              <div className="relative flex items-center justify-between">
                {/* Background line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/15 z-0" />
                {/* Active line */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white transition-all duration-500 z-0"
                  style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((st, i) => {
                  const isDone = i <= currentStepIdx;
                  const isCurrent = i === currentStepIdx;

                  return (
                    <div key={st} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                          isDone 
                            ? 'bg-white text-black border-white' 
                            : 'bg-black text-neutral-500 border-white/20'
                        } ${isCurrent ? 'ring-4 ring-white/20' : ''}`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-[10px] sm:text-xs uppercase tracking-wider mt-3 text-center hidden sm:block ${
                        isDone ? 'text-white font-medium' : 'text-neutral-500'
                      }`}>
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination & Items Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Delivery Destination</span>
                </h4>
                <div className="text-xs text-neutral-300 space-y-1 bg-black p-4 border border-white/10">
                  <p className="text-white font-medium">{searchedOrder.customer.name}</p>
                  <p>{searchedOrder.shippingAddress.street}</p>
                  <p>{searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.postalCode}</p>
                  <p className="text-neutral-400 pt-1">Phone: {searchedOrder.customer.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-white" />
                  <span>Package Contents ({searchedOrder.items.length} items)</span>
                </h4>
                <div className="space-y-3 bg-black p-4 border border-white/10 max-h-48 overflow-y-auto">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.productImage} alt={item.productName} className="w-10 h-12 object-cover border border-white/10" />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="text-white truncate font-light">{item.productName}</p>
                        <p className="text-neutral-400">{item.selectedColor} • {item.selectedSize} (Qty: {item.quantity})</p>
                      </div>
                      <span className="text-xs text-white">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center border border-dashed border-white/10 bg-neutral-950 p-8">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">No Record Located</p>
            <h3 className="text-xl font-serif text-white mb-2">ORDER NOT FOUND</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
              Please check the order number on your confirmation receipt or log into your VÉRA profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
