import { Product, CollectionSlug, CollectionMeta, Review } from '../types';

// Curated high-resolution editorial fashion images (Unsplash verified editorial CDN)
export const FASHION_IMAGE_SETS: Record<string, [string, string, string]> = {
  // Dresses
  'satin-midi-dress': [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
  ],
  'knit-dress': [
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85'
  ],
  'linen-slip-dress': [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85'
  ],
  'pleated-maxi-dress': [
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85'
  ],
  // Tops
  'draped-top': [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85'
  ],
  'linen-shirt': [
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85'
  ],
  'minimal-tee': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
  ],
  'oversized-poplin': [
    'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
  ],
  // Bottoms
  'wide-leg-trousers': [
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85'
  ],
  'tailored-pants': [
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85'
  ],
  'straight-denim': [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85'
  ],
  // Outerwear
  'tailored-blazer': [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1548624149-f9b31d7be513?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85'
  ],
  'wool-coat': [
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=85'
  ],
  'minimal-trench': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85'
  ],
  // Shoes
  'leather-loafers': [
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
  ],
  'chelsea-boots': [
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85'
  ],
  'sculptural-sandals': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85'
  ],
  // Accessories
  'leather-shoulder-bag': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
  ],
  'minimal-watch': [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=85'
  ],
  'silver-cuff': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1611591475152-a79ad7384b7f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
  ]
};

// Fallback generic high quality luxury fashion image
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85';

export const COLLECTIONS_META: CollectionMeta[] = [
  {
    id: 'women',
    name: 'WOMEN',
    tagline: 'Modern Architectural Silhouettes',
    description: 'Sculptural tailoring, fluid satin, and everyday understated elegance curated for the contemporary woman.',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'men',
    name: 'MEN',
    tagline: 'Refined Contemporary Tailoring',
    description: 'Crisp Japanese cottons, relaxed Italian wool blazers, and clean-cut essentials designed with quiet confidence.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'dresses',
    name: 'DRESSES',
    tagline: 'Effortless Evening & Daytime Form',
    description: 'From fluid silk slips to structured midi silhouettes, created to move with poise and grace.',
    heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'tops',
    name: 'TOPS',
    tagline: 'Architectural Shirts & Elevated Knitwear',
    description: 'Clean poplin shirts, sensual draped jerseys, and minimal tees with deliberate proportions.',
    heroImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'bottoms',
    name: 'BOTTOMS',
    tagline: 'Wide-Leg Trousers & Raw Denim',
    description: 'Precision-cut pleats, fluid high-waisted silhouettes, and modern straight denim.',
    heroImage: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'outerwear',
    name: 'OUTERWEAR',
    tagline: 'Double-Breasted Coats & Structured Blazers',
    description: 'Substantial wool overcoats, crisp lightweight trenches, and sharp single-button blazers.',
    heroImage: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'shoes',
    name: 'SHOES',
    tagline: 'Sculptural Footwear & Refined Loafers',
    description: 'Hand-finished calfskin loafers, minimalist leather sneakers, and sleek evening heels.',
    heroImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    tagline: 'Quiet Luxury Hardware & Fine Leather',
    description: 'Geometric leather bags, brushed sterling jewelry, and subtle silk scarves.',
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'new-arrivals',
    name: 'NEW ARRIVALS',
    tagline: 'The Latest VÉRA Studio Edits',
    description: 'Fresh seasonal drops curated with forward-thinking textures and modern monochrome sensibilities.',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
  {
    id: 'sale',
    name: 'SALE',
    tagline: 'Curated Reductions & Archive Pieces',
    description: 'Selected signature silhouettes and elevated staples at limited-time archive prices.',
    heroImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85',
    itemCount: 70,
  },
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Aarav Sharma',
    rating: 5,
    review: 'The tailoring on the Monolith Structured Blazer is unmatched. The drape feels like Savile Row with a Tokyo minimalist aesthetic.',
    productPurchased: 'Monolith Structured Blazer',
    date: '2 days ago',
    verified: true,
  },
  {
    id: 'rev-2',
    customerName: 'Pooja Iyer',
    rating: 5,
    review: 'The Noir Satin Midi Dress fits like it was made for my body. Subtle sheen, zero stiffness, pure understated luxury.',
    productPurchased: 'Noir Satin Midi Dress',
    date: '1 week ago',
    verified: true,
  },
  {
    id: 'rev-3',
    customerName: 'Rohan Mehta',
    rating: 5,
    review: 'Used the VÉRA AI Stylist for an upcoming gallery opening. Picked out an entire coordinated ensemble that drew countless compliments.',
    productPurchased: 'Atelier Linen Shirt & Forma Trousers',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: 'rev-4',
    customerName: 'Ananya Deshmukh',
    rating: 5,
    review: 'Packaging was museum-grade. Fast delivery in Bangalore, and the Linea Loafers are genuinely comfortable out of the box.',
    productPurchased: 'Linea Leather Loafers',
    date: '3 weeks ago',
    verified: true,
  }
];
