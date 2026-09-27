import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const isShoes = category === 'Shoes';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-vera-black-card border border-white/15 max-w-2xl w-full p-6 md:p-8 relative shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-vera-gray-light hover:text-white transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-ultra-wide text-vera-gray-light mb-1">VÉRA Studio Atelier</p>
          <h3 className="text-2xl font-serif tracking-tight">Size & Measurement Guide</h3>
          <p className="text-sm text-vera-gray-light mt-1">
            All VÉRA garments are designed with relaxed architectural proportions. For a tailored fit, select your true size.
          </p>
        </div>

        {/* Unit Toggle */}
        {!isShoes && (
          <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-wider text-vera-gray-light">Measurement Unit:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit('cm')}
                className={`text-xs uppercase px-3 py-1 border transition-colors ${unit === 'cm' ? 'bg-white text-black border-white' : 'border-white/20 text-white'}`}
              >
                Centimeters (cm)
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`text-xs uppercase px-3 py-1 border transition-colors ${unit === 'in' ? 'bg-white text-black border-white' : 'border-white/20 text-white'}`}
              >
                Inches (in)
              </button>
            </div>
          </div>
        )}

        {/* Tables */}
        <div className="overflow-x-auto">
          {isShoes ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/20 text-vera-gray-light uppercase tracking-wider">
                  <th className="py-2.5">EU Size</th>
                  <th className="py-2.5">UK / India Size</th>
                  <th className="py-2.5">US Men</th>
                  <th className="py-2.5">US Women</th>
                  <th className="py-2.5">Foot Length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                <tr><td className="py-2">EU 38</td><td>5</td><td>6</td><td>7.5</td><td>24.0</td></tr>
                <tr><td className="py-2">EU 39</td><td>6</td><td>6.5</td><td>8.0</td><td>24.7</td></tr>
                <tr><td className="py-2">EU 40</td><td>6.5</td><td>7.5</td><td>9.0</td><td>25.3</td></tr>
                <tr><td className="py-2">EU 41</td><td>7</td><td>8.0</td><td>9.5</td><td>26.0</td></tr>
                <tr><td className="py-2">EU 42</td><td>8</td><td>9.0</td><td>10.5</td><td>26.7</td></tr>
                <tr><td className="py-2">EU 43</td><td>9</td><td>10.0</td><td>11.5</td><td>27.3</td></tr>
                <tr><td className="py-2">EU 44</td><td>10</td><td>11.0</td><td>12.5</td><td>28.0</td></tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/20 text-vera-gray-light uppercase tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Chest / Bust</th>
                  <th className="py-2.5">Waist</th>
                  <th className="py-2.5">Hips</th>
                  <th className="py-2.5">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                <tr>
                  <td className="py-2.5 font-medium">XS</td>
                  <td>{unit === 'cm' ? '82 - 86 cm' : '32 - 34 in'}</td>
                  <td>{unit === 'cm' ? '64 - 68 cm' : '25 - 27 in'}</td>
                  <td>{unit === 'cm' ? '88 - 92 cm' : '34 - 36 in'}</td>
                  <td>{unit === 'cm' ? '41 cm' : '16.1 in'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">S</td>
                  <td>{unit === 'cm' ? '87 - 92 cm' : '34 - 36 in'}</td>
                  <td>{unit === 'cm' ? '69 - 74 cm' : '27 - 29 in'}</td>
                  <td>{unit === 'cm' ? '93 - 98 cm' : '36 - 38 in'}</td>
                  <td>{unit === 'cm' ? '43 cm' : '16.9 in'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">M</td>
                  <td>{unit === 'cm' ? '93 - 98 cm' : '36 - 38 in'}</td>
                  <td>{unit === 'cm' ? '75 - 80 cm' : '29 - 31 in'}</td>
                  <td>{unit === 'cm' ? '99 - 104 cm' : '39 - 41 in'}</td>
                  <td>{unit === 'cm' ? '45 cm' : '17.7 in'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">L</td>
                  <td>{unit === 'cm' ? '99 - 104 cm' : '39 - 41 in'}</td>
                  <td>{unit === 'cm' ? '81 - 86 cm' : '32 - 34 in'}</td>
                  <td>{unit === 'cm' ? '105 - 110 cm' : '41 - 43 in'}</td>
                  <td>{unit === 'cm' ? '47 cm' : '18.5 in'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium">XL</td>
                  <td>{unit === 'cm' ? '105 - 112 cm' : '41 - 44 in'}</td>
                  <td>{unit === 'cm' ? '87 - 94 cm' : '34 - 37 in'}</td>
                  <td>{unit === 'cm' ? '111 - 118 cm' : '43 - 46 in'}</td>
                  <td>{unit === 'cm' ? '49 cm' : '19.3 in'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-widest px-5 py-2.5 bg-white text-black hover:bg-vera-off-white font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
