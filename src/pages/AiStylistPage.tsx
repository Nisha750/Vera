import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag, Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 'occasion',
    title: 'QUESTION 01',
    subtitle: 'What are you dressing for?',
    options: ['Casual', 'College', 'Office', 'Party', 'Wedding', 'Vacation', 'Dinner', 'Travel']
  },
  {
    id: 'aesthetic',
    title: 'QUESTION 02',
    subtitle: 'Choose your aesthetic.',
    options: ['Minimal', 'Classic', 'Streetwear', 'Old Money', 'Y2K', 'Boho', 'Luxury', 'Vintage']
  },
  {
    id: 'color',
    title: 'QUESTION 03',
    subtitle: 'Preferred color palette.',
    options: ['Black', 'White', 'Neutral', 'Pastel', 'Dark', 'Any']
  },
  {
    id: 'budget',
    title: 'QUESTION 04',
    subtitle: 'Select your budget scope.',
    options: ['Under ₹1,500', '₹1,500–₹3,000', '₹3,000–₹5,000', '₹5,000+']
  }
];

export const AiStylistPage: React.FC = () => {
  const { products, addToCart, saveLook, updatePreferences } = useShop();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    occasion: 'Dinner',
    aesthetic: 'Minimal',
    color: 'Black',
    budget: '₹3,000–₹5,000'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<{
    top: Product;
    bottom: Product;
    shoes: Product;
    accessory: Product;
  } | null>(null);

  const handleSelectOption = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateStylistLook();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateStylistLook = () => {
    setIsGenerating(true);

    // Save preferences
    updatePreferences({
      styles: [answers.aesthetic],
      colors: [answers.color],
      occasions: [answers.occasion],
      budget: answers.budget
    });

    setTimeout(() => {
      // Rule-based algorithmic matching based on answers
      const tops = products.filter(p => p.category === 'Tops');
      const bottoms = products.filter(p => p.category === 'Bottoms');
      const shoes = products.filter(p => p.category === 'Shoes');
      const accessories = products.filter(p => p.category === 'Accessories');

      const findBest = (list: Product[]) => {
        // Match style or occasion
        return list.find(p => p.style.toLowerCase() === answers.aesthetic.toLowerCase())
          || list.find(p => p.occasion.toLowerCase() === answers.occasion.toLowerCase())
          || list[Math.floor(Math.random() * list.length)];
      };

      const top = findBest(tops) || tops[0];
      const bottom = findBest(bottoms) || bottoms[0];
      const shoe = findBest(shoes) || shoes[0];
      const accessory = findBest(accessories) || accessories[0];

      setGeneratedOutfit({ top, bottom, shoes: shoe, accessory });
      setIsGenerating(false);
      setCurrentStep(QUESTIONS.length); // Results step
    }, 1200);
  };

  const handleAddFullLookToBag = () => {
    if (!generatedOutfit) return;
    addToCart(generatedOutfit.top, generatedOutfit.top.colors[0] || 'Black', 'M');
    addToCart(generatedOutfit.bottom, generatedOutfit.bottom.colors[0] || 'Black', 'M');
    addToCart(generatedOutfit.shoes, generatedOutfit.shoes.colors[0] || 'Black', 'EU 41');
    addToCart(generatedOutfit.accessory, generatedOutfit.accessory.colors[0] || 'Black', 'One Size');
  };

  const handleSaveLook = () => {
    if (!generatedOutfit) return;
    const total = (generatedOutfit.top.salePrice || generatedOutfit.top.price) +
                  (generatedOutfit.bottom.salePrice || generatedOutfit.bottom.price) +
                  (generatedOutfit.shoes.salePrice || generatedOutfit.shoes.price) +
                  (generatedOutfit.accessory.salePrice || generatedOutfit.accessory.price);

    saveLook({
      name: `${answers.aesthetic} ${answers.occasion} Ensemble`,
      occasion: answers.occasion,
      aesthetic: answers.aesthetic,
      top: generatedOutfit.top,
      bottom: generatedOutfit.bottom,
      shoes: generatedOutfit.shoes,
      accessory: generatedOutfit.accessory,
      totalPrice: total
    });
  };

  const totalOutfitPrice = generatedOutfit 
    ? (generatedOutfit.top.salePrice || generatedOutfit.top.price) +
      (generatedOutfit.bottom.salePrice || generatedOutfit.bottom.price) +
      (generatedOutfit.shoes.salePrice || generatedOutfit.shoes.price) +
      (generatedOutfit.accessory.salePrice || generatedOutfit.accessory.price)
    : 0;

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-neutral-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Algorithmic Atelier Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-3">
            MEET YOUR VÉRA STYLIST
          </h1>
          <p className="text-sm text-neutral-400 font-light max-w-lg mx-auto">
            Our stylist curation engine maps architectural silhouettes, textile weights, and tonal palettes to compose your definitive personal aesthetic.
          </p>
        </div>

        {/* Questionnaire Stage */}
        {currentStep < QUESTIONS.length && (
          <div className="bg-neutral-950 border border-white/10 p-8 sm:p-12 shadow-2xl relative">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                STEP {currentStep + 1} OF {QUESTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 transition-colors ${
                      i <= currentStep ? 'bg-white' : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-ultra-wide text-vera-gray-mid mb-1">
                {QUESTIONS[currentStep].title}
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                {QUESTIONS[currentStep].subtitle}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
              {QUESTIONS[currentStep].options.map(option => {
                const isSelected = answers[QUESTIONS[currentStep].id] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(QUESTIONS[currentStep].id, option)}
                    className={`p-4 sm:p-5 border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      isSelected
                        ? 'border-white bg-white text-black font-medium shadow-lg'
                        : 'border-white/15 text-neutral-300 hover:border-white/50 bg-black/40'
                    }`}
                  >
                    <span className="text-sm tracking-wide">{option}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 text-xs uppercase tracking-widest py-2.5 px-4 transition-colors ${
                  currentStep === 0 ? 'opacity-30 cursor-not-allowed text-neutral-500' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={isGenerating}
                className="btn-vera flex items-center gap-2 py-3 px-8 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Curating Atelier...</span>
                  </>
                ) : currentStep === QUESTIONS.length - 1 ? (
                  <>
                    <span>Generate Look</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Screen: YOUR VÉRA LOOK */}
        {currentStep === QUESTIONS.length && generatedOutfit && (
          <div className="space-y-12 animate-fade-in">
            <div className="bg-neutral-950 border border-white/10 p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-1">
                    Atelier Synthesis
                  </p>
                  <h2 className="text-3xl font-serif text-white">YOUR VÉRA LOOK</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Aesthetic: {answers.aesthetic} • Occasion: {answers.occasion} • Palette: {answers.color}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-white/20 text-xs uppercase tracking-wider text-neutral-300 hover:border-white hover:text-white"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restart Consultation</span>
                  </button>
                  <button
                    onClick={handleSaveLook}
                    className="flex items-center gap-1.5 px-4 py-2 border border-white/20 text-xs uppercase tracking-wider text-neutral-300 hover:border-white hover:text-white"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Save Look</span>
                  </button>
                </div>
              </div>

              {/* 4-Item Coordinated Outfit Grid: TOP, BOTTOM, SHOES, ACCESSORY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                {/* Top */}
                <div className="bg-black border border-white/10 p-3 flex flex-col justify-between">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-neutral-900">
                    <img src={generatedOutfit.top.images[0]} alt={generatedOutfit.top.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid">01 • TOP</span>
                    <h4 className="text-sm font-light text-white truncate">{generatedOutfit.top.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1">₹{(generatedOutfit.top.salePrice || generatedOutfit.top.price).toLocaleString('en-IN')}</p>
                    <Link to={`/product/${generatedOutfit.top.slug}`} className="mt-2 block text-[11px] uppercase tracking-wider text-white underline">
                      View Product →
                    </Link>
                  </div>
                </div>

                {/* Bottom */}
                <div className="bg-black border border-white/10 p-3 flex flex-col justify-between">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-neutral-900">
                    <img src={generatedOutfit.bottom.images[0]} alt={generatedOutfit.bottom.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid">02 • BOTTOM</span>
                    <h4 className="text-sm font-light text-white truncate">{generatedOutfit.bottom.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1">₹{(generatedOutfit.bottom.salePrice || generatedOutfit.bottom.price).toLocaleString('en-IN')}</p>
                    <Link to={`/product/${generatedOutfit.bottom.slug}`} className="mt-2 block text-[11px] uppercase tracking-wider text-white underline">
                      View Product →
                    </Link>
                  </div>
                </div>

                {/* Shoes */}
                <div className="bg-black border border-white/10 p-3 flex flex-col justify-between">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-neutral-900">
                    <img src={generatedOutfit.shoes.images[0]} alt={generatedOutfit.shoes.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid">03 • SHOES</span>
                    <h4 className="text-sm font-light text-white truncate">{generatedOutfit.shoes.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1">₹{(generatedOutfit.shoes.salePrice || generatedOutfit.shoes.price).toLocaleString('en-IN')}</p>
                    <Link to={`/product/${generatedOutfit.shoes.slug}`} className="mt-2 block text-[11px] uppercase tracking-wider text-white underline">
                      View Product →
                    </Link>
                  </div>
                </div>

                {/* Accessory */}
                <div className="bg-black border border-white/10 p-3 flex flex-col justify-between">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-neutral-900">
                    <img src={generatedOutfit.accessory.images[0]} alt={generatedOutfit.accessory.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid">04 • ACCESSORY</span>
                    <h4 className="text-sm font-light text-white truncate">{generatedOutfit.accessory.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1">₹{(generatedOutfit.accessory.salePrice || generatedOutfit.accessory.price).toLocaleString('en-IN')}</p>
                    <Link to={`/product/${generatedOutfit.accessory.slug}`} className="mt-2 block text-[11px] uppercase tracking-wider text-white underline">
                      View Product →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Ensemble Total & Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">Complete 4-Piece Look Total</p>
                  <p className="text-2xl font-serif text-white">₹{totalOutfitPrice.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                  <button
                    onClick={handleAddFullLookToBag}
                    className="btn-vera flex-1 sm:flex-none px-8 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE LOOK TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
