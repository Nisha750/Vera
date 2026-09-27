import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Compass, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-2">The VÉRA Atelier Manifesto</p>
          <h1 className="text-5xl sm:text-7xl font-serif tracking-tight text-white mb-6">
            FASHION, REIMAGINED.
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed">
            VÉRA combines fashion discovery, personalization and technology to help people discover pieces and create looks that feel uniquely theirs.
          </p>
        </div>

        {/* Large Editorial Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
              alt="Editorial Atelier"
              className="w-full h-full object-cover filter contrast-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
            <h2 className="text-3xl font-serif text-white">Quiet Luxury Meets Architectural Form</h2>
            <p>
              Founded on the belief that clothing should function as personal architecture, VÉRA rejects ephemeral fast-fashion trends in favor of disciplined monochrome tailoring, generous proportions, and uncompromised natural textiles.
            </p>
            <p>
              From Japanese Supima cottons to pure Normandy linen and sculpted Mulberry silk satins, every garment is engineered with meticulous attention to line, drape, and seam structure.
            </p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest text-neutral-400">Design Studio</span>
              <span className="text-white font-medium">Bengaluru • Tokyo • Milan</span>
            </div>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-white/10 mb-20">
          <div className="space-y-3">
            <Sparkles className="w-6 h-6 text-white" />
            <h3 className="text-lg font-serif text-white">Algorithmic Harmony</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Our proprietary style engine pairs garments based on geometric lines and textile weight, offering personalized discovery without vanity metrics.
            </p>
          </div>
          <div className="space-y-3">
            <Shield className="w-6 h-6 text-white" />
            <h3 className="text-lg font-serif text-white">Material Integrity</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              We exclusively commission high-grade, sustainable natural fibers and certified full-grain calfskin with lifetime durability guarantees.
            </p>
          </div>
          <div className="space-y-3">
            <Compass className="w-6 h-6 text-white" />
            <h3 className="text-lg font-serif text-white">Transparent Privacy</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Camera feeds and uploaded silhouettes are rendered strictly on client hardware, giving you total agency over your digital reflection.
            </p>
          </div>
        </div>

        {/* Founder / Creator Section */}
        <div className="bg-neutral-950 border border-white/10 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
          <span className="text-[10px] uppercase tracking-mega-wide text-neutral-400 mb-1 block">Founder & Creator</span>
          <h2 className="text-3xl font-serif text-white mb-2">Nisha H</h2>
          <p className="text-xs uppercase tracking-ultra-wide text-neutral-400 mb-6">
            VÉRA — AI FASHION STUDIO
          </p>
          <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
            "VÉRA was born from a desire to bridge high-fashion editorial craftsmanship with intelligent styling algorithms. We believe everyone deserves to discover pieces that feel uniquely, unmistakably theirs."
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
          >
            <span>Connect with our Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
