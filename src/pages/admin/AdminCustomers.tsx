import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, UserCheck, ShieldCheck } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers } = useShop();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">Patron Directory</p>
        <h1 className="text-3xl font-serif text-white">CUSTOMER ACCOUNTS</h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-950 p-4 border border-white/10">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-white/20 px-3 py-1.5 bg-black">
          <Search className="w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer by name or email..."
            className="bg-transparent text-xs text-white placeholder:text-neutral-600 focus:outline-none w-full"
          />
        </div>

        <span className="text-xs uppercase tracking-wider text-neutral-400">
          Showing {filteredCustomers.length} Registered Patrons
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-neutral-400 uppercase tracking-wider bg-black">
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Phone Contact</th>
                <th className="py-3 px-4">Lifetime Orders</th>
                <th className="py-3 px-4">Total Expenditure</th>
                <th className="py-3 px-4">Joined Period</th>
                <th className="py-3 px-4">Atelier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-light">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] uppercase font-mono">
                      {cust.name.slice(0, 2)}
                    </span>
                    <span>{cust.name}</span>
                  </td>
                  <td className="py-3 px-4 text-neutral-300 font-mono text-[11px]">{cust.email}</td>
                  <td className="py-3 px-4 text-neutral-400">{cust.phone}</td>
                  <td className="py-3 px-4 font-mono">{cust.ordersCount} orders</td>
                  <td className="py-3 px-4 font-serif text-white">₹{cust.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-neutral-400">{cust.joinedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 border text-[10px] uppercase tracking-wider ${
                      cust.status === 'VIP' 
                        ? 'bg-white text-black border-white font-semibold' 
                        : 'border-white/20 text-neutral-300'
                    }`}>
                      {cust.status}
                    </span>
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
