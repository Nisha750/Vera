import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { AdminLogin } from './AdminLogin';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Boxes, 
  Users, 
  LogOut, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAdmin, logoutAdmin } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdmin) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Collections', path: '/admin/collections', icon: Layers },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Customers', path: '/admin/customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-950 border-r border-white/10 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand & Admin Badge */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="font-serif text-2xl tracking-widest text-white">
              VÉRA
            </Link>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-white/20 text-neutral-400">
              ADMIN
            </span>
          </div>

          {/* Admin Nav */}
          <nav className="p-4 space-y-1">
            <p className="text-[10px] uppercase tracking-mega-wide text-neutral-500 px-3 py-2">
              Studio Management
            </p>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <button
            onClick={() => {
              logoutAdmin();
              navigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
