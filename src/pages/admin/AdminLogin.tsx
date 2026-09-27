import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { loginAdmin } = useShop();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passcode.trim())) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-neutral-950 border border-white/15 max-w-md w-full p-8 shadow-2xl animate-fade-in text-center">
        <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto mb-4 text-white">
          <Lock className="w-5 h-5" />
        </div>

        <p className="text-[10px] uppercase tracking-mega-wide text-neutral-400 mb-1">Restricted Access</p>
        <h1 className="text-2xl font-serif text-white mb-2">VÉRA STUDIO ADMIN</h1>
        <p className="text-xs text-neutral-400 font-light mb-8">
          Enter your authorized studio administrative key to manage the 700-item catalog, inventory, and order dispatch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
              Administrative Passcode
            </label>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Enter passcode (e.g. vera2026)"
              className="w-full bg-black border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-white tracking-widest text-center"
            />
          </div>

          {error && (
            <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Invalid administrative credentials. Use <code>vera2026</code></span>
            </div>
          )}

          <button
            type="submit"
            className="btn-vera w-full py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-neutral-500 flex justify-between">
          <Link to="/" className="hover:text-white transition-colors">← Return to Storefront</Link>
          <span>VÉRA Studio Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};
