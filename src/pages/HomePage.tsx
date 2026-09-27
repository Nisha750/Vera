import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxuryHeroScene } from '../components/3d/LuxuryHeroScene';
import { ProductCard } from '../components/products/ProductCard';
import { useShop } from '../context/ShopContext';
import { getNewArrivals, getTrendingProducts } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/collections';
import { ArrowRight, Sparkles, Camera, Layers, Star, ChevronDown } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const newArrivals = getNewArrivals(8);
  const trendingNow = getTrendingProducts(8);

  const categories = [
    { name: 'WOMEN', slug: 'women', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'MEN', slug: 'men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'DRESSES', slug: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'TOPS', slug: 'tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'BOTTOMS', slug: 'bottoms', image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'OUTERWEAR', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'SHOES', slug: 'shoes', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
    { name: 'ACCESSORIES', slug: 'accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', count: '70 Pieces' },
  ];

  const editorialEdits = [
    { title: 'THE MINIMAL EDIT', query: 'minimal', desc: 'Monochrome precision, unembellished tailoring.' },
    { title: 'THE EVENING EDIT', query: 'evening', desc: 'Mulberry silk satin and sculpted silhouettes.' },
    { title: 'EVERYDAY LUXURY', query: 'casual', desc: 'Japanese Supima cottons & relaxed drapery.' },
    { title: 'WEEKEND STYLE', query: 'vacation', desc: 'Effortless linen sets and understated knitwear.' },
    { title: 'UNDER ₹1,999', query: 'under ₹1999', desc: 'Accessible luxury essentials without compromise.' },
    { title: 'NEW SEASON', query: 'new', desc: 'Forward-thinking silhouettes straight from the studio.' },
  ];

  const instagramGallery = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC 3D HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* 3D Interactive Three.js Scene */}
        <LuxuryHeroScene />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-xs uppercase tracking-mega-wide text-neutral-400 mb-6 font-light animate-fade-in">
            VÉRA — AI FASHION STUDIO
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tight text-white leading-[0.95] mb-6 select-none">
            DEFINE<br />
            YOUR<br />
            STYLE.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-light max-w-md mx-auto mb-10 tracking-wide">
            Discover pieces that feel uniquely you.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="btn-vera w-full sm:w-auto px-8 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-2xl text-center"
            >
              EXPLORE COLLECTION
            </Link>

            <Link
              to="/ai-stylist"
              className="btn-vera w-full sm:w-auto px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-mega-wide font-medium hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              MEET YOUR AI STYLIST
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center pointer-events-none text-neutral-500 animate-pulse-subtle">
          <span className="text-[10px] uppercase tracking-mega-wide mb-1">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. NEW ARRIVALS */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-2">Curated Drops</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">NEW ARRIVALS</h2>
            <p className="text-sm text-neutral-400 font-light mt-1">The latest pieces curated by VÉRA.</p>
          </div>
          <Link
            to="/collection/new-arrivals"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View All 70 New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. TRENDING NOW */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-neutral-950 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-2">Algorithmically Ranked</p>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">TRENDING NOW</h2>
              <p className="text-sm text-neutral-400 font-light mt-1">
                Curated by real-time customer views, wishlist frequency, and atelier purchases.
              </p>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingNow.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. SHOP BY CATEGORY (8 Large Editorial Tiles) */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-2">The Directory</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">SHOP BY CATEGORY</h2>
          <p className="text-sm text-neutral-400 font-light mt-2">
            Explore our 10 primary collections, each preloaded with 70 original designer silhouettes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/collection/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10 block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-mega-wide text-neutral-400 mb-1">
                  {cat.count}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif tracking-wider text-white group-hover:translate-x-1 transition-transform">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. AI STYLIST HERO TEASER */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-neutral-950 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Intelligent Style Assistant</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-white leading-tight">
              YOUR STYLE.<br />CURATED BY VÉRA.
            </h2>
            <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed max-w-lg">
              Tell VÉRA what you're looking for and discover a complete 4-piece coordinated ensemble curated around your aesthetic, occasion and budget.
            </p>
            <div>
              <Link
                to="/ai-stylist"
                className="btn-vera inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-2xl"
              >
                START AI STYLIST
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Editorial Visual Collage */}
          <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full border border-white/10 p-4 bg-black">
            <div className="grid grid-cols-2 gap-3 h-full">
              <img 
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" 
                alt="AI Look Element" 
                className="h-full w-full object-cover filter contrast-105"
              />
              <div className="flex flex-col gap-3 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80" 
                  alt="Shoes Element" 
                  className="h-1/2 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" 
                  alt="Bag Element" 
                  className="h-1/2 w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 p-4 bg-black/90 backdrop-blur-md border border-white/20 text-center">
              <p className="text-[10px] uppercase tracking-widest text-vera-gray-mid">Curated Ensemble</p>
              <p className="text-sm font-serif text-white">The Monochrome Gallery Edit</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. STYLE CAMERA TEASER */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center p-8">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" 
              alt="Style Camera Preview" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 opacity-70"
            />
            {/* Viewfinder brackets overlay */}
            <div className="relative z-10 w-full h-full border-2 border-dashed border-white/30 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/70">
                <span>[CAMERA VIEWPORT]</span>
                <span>ISO 400 • F/2.8</span>
              </div>
              <div className="text-center">
                <span className="inline-block p-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white">
                  <Camera className="w-6 h-6" />
                </span>
              </div>
              <div className="text-center text-[11px] font-mono tracking-wider text-white/70">
                AI FASHION MATCHING READY
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-neutral-300">
              <Camera className="w-3.5 h-3.5 text-white" />
              <span>Vision Matching</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-white leading-tight">
              STYLE WITH YOUR PHOTO.
            </h2>
            <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed">
              Upload a photo or use your device camera to explore personalized fashion recommendations matching your personal shape, aesthetic and color tone.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/style-camera?mode=upload"
                className="btn-vera px-6 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl"
              >
                UPLOAD PHOTO
              </Link>
              <Link
                to="/style-camera?mode=camera"
                className="btn-vera px-6 py-3.5 border border-white/30 text-white text-xs uppercase tracking-mega-wide font-medium hover:bg-white/10 transition-all"
              >
                USE CAMERA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. OUTFIT BUILDER TEASER */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-neutral-950 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Layers className="w-10 h-10 text-white mx-auto mb-4" />
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-4">
            CREATE YOUR LOOK.
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg max-w-xl mx-auto mb-8">
            Mix, match and build your perfect VÉRA outfit across Tops, Bottoms, Outerwear, Shoes, and Accessories with real-time price calculations.
          </p>
          <Link
            to="/outfit-builder"
            className="btn-vera inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-2xl"
          >
            START BUILDING
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. EDITORIAL FASHION SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-2">Editorial Portfolios</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">CURATED EDITS</h2>
          <p className="text-sm text-neutral-400 font-light mt-2">
            Thematic mood boards curated for every wardrobe mood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialEdits.map((edit, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/shop?query=${encodeURIComponent(edit.query)}`)}
              className="group cursor-pointer p-8 bg-neutral-900/60 border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col justify-between h-64"
            >
              <div>
                <p className="text-[10px] uppercase tracking-mega-wide text-vera-gray-mid mb-2">Edit {String(idx + 1).padStart(2, '0')}</p>
                <h3 className="text-2xl font-serif text-white group-hover:underline tracking-tight">
                  {edit.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-3 leading-relaxed">
                  {edit.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-300 group-hover:text-white pt-4 border-t border-white/5">
                <span>Explore Edit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. CUSTOMER REVIEWS */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 bg-neutral-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-2">Client Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">VOICES OF VÉRA</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CUSTOMER_REVIEWS.map(rev => (
              <div key={rev.id} className="p-6 bg-black border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-xs font-light text-neutral-300 italic leading-relaxed mb-4">
                    "{rev.review}"
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs font-medium text-white">{rev.customerName}</p>
                  <p className="text-[10px] text-vera-gray-mid uppercase tracking-wider mt-0.5">
                    Verified Purchase: {rev.productPurchased}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 10. INSTAGRAM / VISUAL FASHION GALLERY */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-mega-wide text-vera-gray-mid mb-1">Visual Atelier</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">#VERASTUDIO</h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-neutral-400">@vera.fashion</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramGallery.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-neutral-900 border border-white/10">
              <img 
                src={img} 
                alt={`Instagram gallery ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-75" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                <span className="text-xs font-serif tracking-widest text-white border border-white/30 px-2 py-1">
                  VÉRA
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
