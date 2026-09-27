import { Product, CollectionSlug, Category, Gender } from '../types';

// High-resolution curated editorial fashion images specifically segmented by gender and category
const WOMEN_DRESS_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85'
  ]
];

const WOMEN_TOP_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85'
  ]
];

const MEN_TOP_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85'
  ]
];

const WOMEN_BOTTOM_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85'
  ]
];

const MEN_BOTTOM_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85'
  ]
];

const WOMEN_OUTERWEAR_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=85'
  ]
];

const MEN_OUTERWEAR_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1548624149-f9b31d7be513?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1548624149-f9b31d7be513?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
  ]
];

const WOMEN_SHOES_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85'
  ]
];

const MEN_SHOES_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85'
  ]
];

const WOMEN_ACCESSORIES_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1611591475152-a79ad7384b7f?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
  ]
];

const MEN_ACCESSORIES_IMAGES: string[][] = [
  [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
  ],
  [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
  ]
];

// 70 Unique Names for Dresses (Women Only)
const DRESS_NAMES_70 = [
  'Noir Satin Midi Dress', 'Luna Draped Slip Dress', 'Forma Pleated Column Gown', 'Atelier Cutout Silk Gown',
  'Monochrome Knit Halter Dress', 'Eclipse Sculptural Maxi Dress', 'Linea Wrap Satin Dress', 'Sculpted Asymmetric Gown',
  'Kuro Minimalist Slip Dress', 'Aura Silk Halter Gown', 'Sora Draped Column Dress', 'Vesper High-Neck Midi Dress',
  'Caelum Backless Satin Gown', 'Oblique Bias-Cut Dress', 'Stature Pleated Maxi Gown', 'Archetype Sculpted Shift Dress',
  'Zenith Column Evening Dress', 'Veritas Fluted Hem Dress', 'Silhouetta Satin Slip Gown', 'Alabaster Tiered Silk Dress',
  'Element Draped Jersey Dress', 'Paragon One-Shoulder Gown', 'Muted Minimalist Linen Dress', 'Pure Architectonic Gown',
  'Aethel Fluid Silk Shirtdress', 'Cinder Strapless Column Dress', 'Elysian Pleated Midi Dress', 'Palais Double-Face Silk Gown',
  'Sovereign High-Slit Gown', 'Vanguard Tailored Blazer Dress', 'Halcyon Minimal Knit Dress', 'Ethereal Satin Slip Dress',
  'Nocturne Draped Evening Gown', 'Zephyr Tiered Midi Dress', 'Sylvan Silk Halter Dress', 'Meridian Column Slip Dress',
  'Solstice Pleated Gown', 'Vespera Cutout Maxi Dress', 'Opulent Bias Silk Gown', 'Reverie Asymmetric Dress',
  'Astral Minimalist Midi Dress', 'Aura Sculpted Knit Gown', 'Illume Silk Halter Dress', 'Mirage Draped Satin Gown',
  'Oasis Tiered Poplin Dress', 'Solitude Linen Midi Dress', 'Bespoke Tailored Shirtdress', 'Elysium High-Neck Column Dress',
  'Noctis Fluted Satin Dress', 'Chroma Minimal Slip Dress', 'Umbra Asymmetric Evening Gown', 'Stratos Pleated Maxi Dress',
  'Radiance Silk Bias Dress', 'Cascade Draped Jersey Gown', 'Seraphic Halter Midi Dress', 'Valence Sculpted Shift Dress',
  'Loom Linen Buttoned Dress', 'Zephyrine Fluid Silk Gown', 'Monolith Structured Midi Dress', 'Verve Pleated Halter Gown',
  'Sylvan Sculpted Knit Dress', 'Opus Minimalist Maxi Dress', 'Calyx Draped Silk Gown', 'Aura High-Neck Midi Dress',
  'Prism Bias Cut Evening Dress', 'Vespera Pleated Silk Slip', 'Solace Relaxed Linen Dress', 'Aethelgard Fluid Satin Gown',
  'Equinox Sculpted Column Dress', 'VÉRA Signature Atelier Gown'
];

// 35 Women Tops + 35 Men Tops = 70 Unique Tops
const WOMEN_TOPS_35 = [
  'Noir Draped Jersey Top', 'Luna Studio Linen Shirt', 'Forma Oversized Poplin Blouse', 'Atelier Asymmetric Silk Camisole',
  'Monochrome Rib Knit Top', 'Eclipse Pleated Poplin Blouse', 'Linea High-Neck Sleeveless Top', 'Sculpted Bodysuit',
  'Kuro Cowl Neck Silk Top', 'Aura Sheer Organza Shirt', 'Sora Fluid Linen Button-Down', 'Vesper Cutout Knit Top',
  'Caelum Boxy Poplin Shirt', 'Oblique Wrap Blouse', 'Stature Minimal Supima Tee', 'Archetype Sculptural Top',
  'Zenith Cropped Poplin Shirt', 'Veritas Tie-Neck Silk Blouse', 'Silhouetta Fine Rib Turtleneck', 'Alabaster Relaxed Linen Shirt',
  'Element Cap-Sleeve Jersey Top', 'Paragon Backless Halter Top', 'Muted Oversized Silk Shirt', 'Pure Asymmetric Ribbed Top',
  'Aethel Drape Neck Knit', 'Cinder Poplin Studio Shirt', 'Elysian Fluted Sleeve Blouse', 'Palais Structured Peplum Top',
  'Sovereign Minimalist Camisole', 'Vanguard Tailored Poplin Shirt', 'Halcyon Pure Linen Blouse', 'Ethereal Open-Back Silk Top',
  'Nocturne Draped Halter Top', 'Zephyr High-Gauge Knit Tee', 'VÉRA Signature Atelier Blouse'
];

const MEN_TOPS_35 = [
  'Atelier Tailored Oxford Shirt', 'Monochrome Minimalist Linen Shirt', 'Forma Relaxed Japanese Cotton Shirt', 'Kuro Structured Band Collar Shirt',
  'Aura Heavyweight Supima Tee', 'Sora Clean Poplin Studio Shirt', 'Linea Relaxed Knit Polo', 'Zenith Fine Merino Turtleneck',
  'Eclipse Minimal Camp Collar Shirt', 'Stature Structured Oversized Shirt', 'Archetype Mercerized Cotton Tee', 'Veritas Tailored Dress Shirt',
  'Oblique Textured Knit Polo', 'Silhouetta Relaxed Linen Button-Down', 'Element Double-Pocket Studio Shirt', 'Paragon Raw Cotton Utility Shirt',
  'Muted Fine Gauge Knit Sweater', 'Pure Minimalist Crewneck', 'Aethel Structured Overshirt', 'Cinder Poplin Spread Collar Shirt',
  'Elysian Relaxed Linen Henley', 'Palais Tailored French Cuff Shirt', 'Sovereign Minimalist Silk Shirt', 'Vanguard Structured Work Shirt',
  'Halcyon Japanese Linen Shirt', 'Ethereal Relaxed Drop-Shoulder Tee', 'Nocturne Black Poplin Shirt', 'Zephyr Fine Supima Cotton Polo',
  'Sylvan Structured Band Collar Shirt', 'Meridian Minimalist Flannel Overshirt', 'Solstice Relaxed Cotton Camp Shirt', 'Vespera Tailored Poplin Shirt',
  'Opulent Minimalist Turtleneck', 'Reverie Pure Wool Knit Crew', 'VÉRA Signature Atelier Men\'s Shirt'
];

// 35 Women Bottoms + 35 Men Bottoms = 70 Unique Bottoms
const WOMEN_BOTTOMS_35 = [
  'Noir Wide-Leg Pleated Trousers', 'Luna High-Rise Straight Denim', 'Forma Tailored Wool Slacks', 'Atelier Fluid Silk Palazzo Pants',
  'Monochrome Column Maxi Skirt', 'Eclipse Sculpted Pleat Trousers', 'Linea Cropped Tailored Pants', 'Sculpted High-Waist Trousers',
  'Kuro Wide-Leg Linen Pants', 'Aura Asymmetric Pleated Skirt', 'Sora Relaxed Straight Denim', 'Vesper Fluid Satin Slip Skirt',
  'Caelum High-Rise Flare Pants', 'Oblique Wrap Column Skirt', 'Stature Minimalist Culottes', 'Archetype Pleated Tailored Slacks',
  'Zenith Straight-Leg Wool Trousers', 'Veritas Wide-Leg Poplin Pants', 'Silhouetta Draped Palazzo Trousers', 'Alabaster Raw Edge Denim',
  'Element Relaxed Utility Trousers', 'Paragon Tailored Cigarette Pants', 'Muted Fluid Linen Trousers', 'Pure Minimalist Pencil Skirt',
  'Aethel High-Waisted Wide Denim', 'Cinder Structured Pleated Pants', 'Elysian Flowing Silk Trousers', 'Palais Double-Face Wool Slacks',
  'Sovereign Fluted Hem Skirt', 'Vanguard Tailored Tuxedo Pants', 'Halcyon Wide Linen Palazzo Pants', 'Ethereal Straight Denim',
  'Nocturne Draped Maxi Skirt', 'Zephyr Pleated Studio Trousers', 'VÉRA Signature Atelier Trousers'
];

const MEN_BOTTOMS_35 = [
  'Forma Tailored Pleated Trousers', 'Atelier Wide-Leg Wool Slacks', 'Monochrome Straight Raw Denim', 'Kuro Minimalist Relaxed Chinos',
  'Aura Tailored Cropped Trousers', 'Sora Japanese Selvedge Denim', 'Linea Double-Pleat Dress Pants', 'Zenith Relaxed Linen Drawstring Pants',
  'Eclipse Structured Wool Slacks', 'Stature Wide-Leg Cargo Trousers', 'Archetype Tailored Formal Pants', 'Veritas Straight-Leg Cotton Chinos',
  'Oblique Minimalist Pleat Slacks', 'Silhouetta Relaxed Wool Pants', 'Element Clean-Cut Denim', 'Paragon High-Rise Tailored Trousers',
  'Muted Japanese Cotton Chinos', 'Pure Minimalist Dress Trousers', 'Aethel Relaxed Linen Trousers', 'Cinder Structured Wool Slacks',
  'Elysian Straight Raw Denim', 'Palais Tailored Tuxedo Trousers', 'Sovereign Wide-Leg Pleated Slacks', 'Vanguard Minimalist Chinos',
  'Halcyon Relaxed Studio Pants', 'Ethereal Clean-Cut Wool Slacks', 'Nocturne Black Straight Denim', 'Zephyr Fine Pleat Trousers',
  'Sylvan Minimalist Tailored Pants', 'Meridian Relaxed Cargo Pants', 'Solstice Studio Linen Trousers', 'Vespera Straight Selvedge Denim',
  'Opulent Double-Pleated Slacks', 'Reverie Tailored Wool Chinos', 'VÉRA Signature Atelier Men\'s Trousers'
];

// 35 Women Outerwear + 35 Men Outerwear = 70 Unique Outerwear
const WOMEN_OUTERWEAR_35 = [
  'Noir Structured Double-Face Blazer', 'Luna Single-Breasted Wool Coat', 'Forma Minimalist Cotton Trench', 'Atelier Cropped Leather Jacket',
  'Monochrome Belted Oversized Overcoat', 'Eclipse Architectural Cape Coat', 'Linea Tailored Tuxedo Blazer', 'Sculpted Cocoon Wool Coat',
  'Kuro Double-Breasted Blazer', 'Aura Fluid Linen Trench Coat', 'Sora Minimalist Wool Bomber', 'Vesper Structured Hourglass Blazer',
  'Caelum Oversized Car Coat', 'Oblique Wrap Wool Overcoat', 'Stature Sharp-Shouldered Blazer', 'Archetype Classic Tailored Trench',
  'Zenith Cropped Tailored Blazer', 'Veritas Longline Cashmere Coat', 'Silhouetta Relaxed Studio Blazer', 'Alabaster Double-Face Coat',
  'Element Lightweight Poplin Trench', 'Paragon Boxy Minimalist Jacket', 'Muted Tailored Wool Blazer', 'Pure Belted Wrap Overcoat',
  'Aethel Architectural Blazer', 'Cinder Single-Button Wool Coat', 'Elysian Structured Leather Trench', 'Palais Double-Breasted Tuxedo Blazer',
  'Sovereign High-Collar Wool Coat', 'Vanguard Tailored Studio Blazer', 'Halcyon Pure Linen Summer Duster', 'Ethereal Belted Trench Coat',
  'Nocturne Black Double-Face Blazer', 'Zephyr Sculpted Cocoon Coat', 'VÉRA Signature Atelier Blazer'
];

const MEN_OUTERWEAR_35 = [
  'Forma Structured Single-Breasted Blazer', 'Atelier Heavyweight Wool Overcoat', 'Monochrome Double-Breasted Tailored Blazer', 'Kuro Minimalist Studio Trench',
  'Aura Japanese Cotton Work Jacket', 'Sora Relaxed Italian Wool Blazer', 'Linea Belted Minimalist Trench Coat', 'Zenith Tailored Tuxedo Jacket',
  'Eclipse Stand-Collar Wool Coat', 'Stature Oversized Studio Overcoat', 'Archetype Single-Breasted Wool Blazer', 'Veritas Modern Mac Coat',
  'Oblique Structured Wool Jacket', 'Silhouetta Relaxed Double-Face Blazer', 'Element Minimalist Harrington Jacket', 'Paragon Tailored Wool Car Coat',
  'Muted Structured Linen Blazer', 'Pure Architectural Overcoat', 'Aethel Double-Breasted Suit Jacket', 'Cinder Classic Tailored Topcoat',
  'Elysian Minimalist Trench', 'Palais Single-Button Tuxedo Blazer', 'Sovereign Structured Wool Overcoat', 'Vanguard Tailored Cotton Blazer',
  'Halcyon Relaxed Duster Coat', 'Ethereal Single-Breasted Blazer', 'Nocturne Black Wool Overcoat', 'Zephyr Tailored Studio Blazer',
  'Sylvan Minimalist Field Jacket', 'Meridian Heavy Wool Overcoat', 'Solstice Studio Linen Blazer', 'Vespera Tailored Wool Trench',
  'Opulent Double-Breasted Overcoat', 'Reverie Structured Blazer', 'VÉRA Signature Atelier Men\'s Overcoat'
];

// 35 Women Shoes + 35 Men Shoes = 70 Unique Shoes
const WOMEN_SHOES_35 = [
  'Noir Sculptural Heel Mules', 'Luna Strappy Block Sandals', 'Forma Squared Toe Leather Loafers', 'Atelier Draped Leather Ankle Boots',
  'Monochrome Ballet Mule Flats', 'Eclipse Minimalist Slingback Heels', 'Linea Polished Calfskin Loafers', 'Sculpted Platform Sandals',
  'Kuro Pointed Toe Leather Mules', 'Aura Minimalist Ankle Boots', 'Sora Strapped Kitten Heels', 'Vesper Sculptural Leather Pumps',
  'Caelum Two-Tone Leather Loafers', 'Oblique Square-Toe Ballet Flats', 'Stature Architectural Block Heels', 'Archetype Minimalist Chelsea Boots',
  'Zenith Polished Leather Loafers', 'Veritas Strappy Stiletto Sandals', 'Silhouetta Minimal Leather Slides', 'Alabaster Draped Heel Mules',
  'Element Low-Heel Leather Loafers', 'Paragon Square-Toe Ankle Boots', 'Muted Strappy Leather Sandals', 'Pure Minimalist Mule Pumps',
  'Aethel Pointed Slingback Heels', 'Cinder Calfskin Leather Loafers', 'Elysian Sculpted Kitten Heels', 'Palais Polished Evening Pumps',
  'Sovereign Minimalist Leather Boots', 'Vanguard Square-Toe Loafers', 'Halcyon Strapped Studio Slides', 'Ethereal Draped Leather Mules',
  'Nocturne Black Calfskin Loafers', 'Zephyr Sculptural Heel Sandals', 'VÉRA Signature Atelier Heels'
];

const MEN_SHOES_35 = [
  'Forma Architectural Leather Loafers', 'Atelier Minimalist Chelsea Boots', 'Monochrome Polished Leather Derbies', 'Kuro Handcrafted Penny Loafers',
  'Aura Minimalist Low-Top Sneakers', 'Sora Calfskin Dress Derbies', 'Linea Polished Tassel Loafers', 'Zenith Leather Chelsea Boots',
  'Eclipse Minimalist Monk Strap Shoes', 'Stature Chunky Sole Leather Loafers', 'Archetype Polished Oxford Shoes', 'Veritas Minimalist Leather Derbies',
  'Oblique Suede Chelsea Boots', 'Silhouetta Refined Penny Loafers', 'Element Low-Top Monochrome Sneakers', 'Paragon Structured Leather Derbies',
  'Muted Polished Loafers', 'Pure Minimalist Chelsea Boots', 'Aethel Classic Dress Oxfords', 'Cinder Hand-Finished Derbies',
  'Elysian Sleek Leather Loafers', 'Palais Formal Patent Leather Derbies', 'Sovereign Minimalist Suede Loafers', 'Vanguard Calfskin Chelsea Boots',
  'Halcyon Studio Leather Loafers', 'Ethereal Minimalist Dress Shoes', 'Nocturne Black Polished Derbies', 'Zephyr Tassel Penny Loafers',
  'Sylvan Structured Leather Boots', 'Meridian Classic Leather Loafers', 'Solstice Studio Chelsea Boots', 'Vespera Polished Derbies',
  'Opulent Handcrafted Oxford Shoes', 'Reverie Clean Leather Loafers', 'VÉRA Signature Atelier Men\'s Loafers'
];

// 35 Women Accessories + 35 Men Accessories = 70 Unique Accessories
const WOMEN_ACCESSORIES_35 = [
  'Noir Geometric Leather Tote', 'Luna Eclipse Shoulder Bag', 'Forma Minimalist Brushed Watch', 'Atelier Sterling Silver Cuff',
  'Monochrome Structured Baguette Bag', 'Eclipse Soft Cashmere Wrap Scarf', 'Linea Square Acetate Sunglasses', 'Sculpted Silver Signet Ring',
  'Kuro Leather Bucket Bag', 'Aura Minimalist Chain Necklace', 'Sora Smooth Calfskin Crossbody', 'Vesper Oval Sunglasses',
  'Caelum Textured Leather Hobo Bag', 'Oblique Chunky Silver Hoops', 'Stature Leather Mini Tote', 'Archetype Fine Silk Scarf',
  'Zenith Minimalist Bangle', 'Veritas Structured Top-Handle Bag', 'Silhouetta Soft Leather Clutch', 'Alabaster Square Silk Foulard',
  'Element Compact Crossbody Bag', 'Paragon Sculpted Silver Pendant', 'Muted Leather Cardholder Wallet', 'Pure Brushed Steel Watch',
  'Aethel Architectural Leather Tote', 'Cinder Structured Shoulder Bag', 'Elysian Cat-Eye Sunglasses', 'Palais Evening Satin Clutch',
  'Sovereign Minimalist Choker', 'Vanguard Leather Envelope Bag', 'Halcyon Oversized Silk Wrap', 'Ethereal Fine Chain Bracelet',
  'Nocturne Black Leather Shoulder Bag', 'Zephyr Sculpted Silver Ring', 'VÉRA Signature Atelier Leather Tote'
];

const MEN_ACCESSORIES_35 = [
  'Forma Heavyweight Brushed Steel Watch', 'Atelier Leather Weekender Duffel', 'Monochrome Sterling Silver Signet Ring', 'Kuro Textured Leather Cardholder',
  'Aura Square Metal Sunglasses', 'Sora Full-Grain Leather Briefcase', 'Linea Minimalist Silver Cuff', 'Zenith Leather Messenger Bag',
  'Eclipse Brushed Chronograph Watch', 'Stature Heavyweight Cashmere Scarf', 'Archetype Polished Leather Belt', 'Veritas Minimalist Silver Chain',
  'Oblique Leather Document Folio', 'Silhouetta Minimalist Aviator Sunglasses', 'Element Slim Leather Wallet', 'Paragon Sterling Silver Ring',
  'Muted Leather Crossbody Pack', 'Pure Monochrome Steel Watch', 'Aethel Minimalist Leather Tote', 'Cinder Brushed Silver Cuff',
  'Elysian Full-Grain Leather Duffle', 'Palais Formal Leather Dress Belt', 'Sovereign Minimalist Leather Backpack', 'Vanguard Textured Card Case',
  'Halcyon Soft Cashmere Scarf', 'Ethereal Square Metal Sunglasses', 'Nocturne Black Leather Portfolio', 'Zephyr Minimalist Signet Ring',
  'Sylvan Polished Steel Watch', 'Meridian Leather Weekender Bag', 'Solstice Fine Silk Pocket Square', 'Vespera Leather Messenger Bag',
  'Opulent Brushed Silver Bangle', 'Reverie Classic Leather Belt', 'VÉRA Signature Atelier Men\'s Watch'
];

const FABRIC_MATERIALS = [
  '100% Japanese Supima Cotton',
  'Heavyweight Mulberry Silk Satin',
  'Pure Normandy Linen',
  'Fine Italian Virgin Wool',
  'Compact Viscose Knit',
  'Sustainably Tanned Full Grain Calfskin',
  'Recycled Wool Blend',
  'Brushed Sterling Silver (925)'
];

const COLOR_PALETTES = [
  ['Obsidian Black', 'Chalk White'],
  ['Pure Black', 'Charcoal Gray', 'Off-White'],
  ['Charcoal', 'Alabaster White', 'Dark Graphite'],
  ['Ivory', 'Soft Black', 'Stone Gray'],
  ['Monochrome Noir', 'Raw Ecru']
];

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const SHOE_SIZES_WOMEN = ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'];
const SHOE_SIZES_MEN = ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'];
const ACC_SIZES = ['One Size'];

const PRICE_TIERS: Record<Category, number[]> = {
  Dresses: [1999, 2499, 2999, 3499, 3999, 4499],
  Tops: [899, 1199, 1499, 1799, 1999, 2499],
  Bottoms: [1499, 1799, 1999, 2499, 2799, 2999],
  Outerwear: [2799, 3299, 3799, 4299, 4799, 5499],
  Shoes: [1799, 2199, 2699, 3199, 3599, 3999],
  Accessories: [699, 999, 1299, 1599, 1899, 2499]
};

// Generates the comprehensive, strictly segmented, non-repeating 420-piece product catalog
export function generateStrictVeraCatalog(): Product[] {
  const products: Product[] = [];
  let idCounter = 1;

  const makeProduct = (
    name: string,
    category: Category,
    gender: Gender,
    imageSets: string[][],
    index: number
  ): Product => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${idCounter}`;
    const priceOptions = PRICE_TIERS[category];
    const price = priceOptions[index % priceOptions.length];
    const isSale = index % 3 === 0;
    const salePrice = isSale ? Math.round(price * 0.75 / 100) * 100 - 1 : undefined;

    const colors = COLOR_PALETTES[index % COLOR_PALETTES.length];
    const sizes = category === 'Shoes' 
      ? (gender === 'women' ? SHOE_SIZES_WOMEN : SHOE_SIZES_MEN)
      : (category === 'Accessories' ? ACC_SIZES : STANDARD_SIZES);

    const material = FABRIC_MATERIALS[index % FABRIC_MATERIALS.length];
    const images = imageSets[index % imageSets.length];

    const styles: Product['style'][] = ['Minimal', 'Tailored', 'Classic', 'Streetwear', 'Luxury', 'Old Money', 'Casual'];
    const style = styles[(index + idCounter) % styles.length];

    const occasions: Product['occasion'][] = ['Casual', 'Office', 'Party', 'Dinner', 'Vacation', 'Wedding', 'Travel'];
    const occasion = occasions[(index + idCounter) % occasions.length];

    const description = `The ${name} epitomizes VÉRA's architectural luxury ethos. Cut from ${material.toLowerCase()}, this piece delivers a refined silhouette crafted specifically for ${gender === 'women' ? 'women' : 'men'}. Meticulously designed in our studio with flawless tailoring and enduring drape.`;

    const product: Product = {
      id: `vera-prod-${String(idCounter).padStart(3, '0')}`,
      name,
      slug,
      description,
      price,
      salePrice,
      category,
      gender,
      collections: [], // assigned deterministically below
      style,
      occasion,
      colors,
      sizes,
      material,
      rating: Number((4.6 + ((index % 4) * 0.1)).toFixed(1)),
      reviewCount: 18 + ((index * 9) % 72),
      stock: 20 + ((index * 13) % 55),
      images,
      tags: [style.toLowerCase(), occasion.toLowerCase(), 'monochrome', gender, category.toLowerCase()],
      isNew: index % 4 === 0,
      isSale,
      createdAt: new Date(Date.now() - (index * 86400000 * 2)).toISOString()
    };

    idCounter++;
    return product;
  };

  // 1. 70 DRESSES (Women only)
  const dressesList: Product[] = [];
  DRESS_NAMES_70.forEach((name, i) => {
    const p = makeProduct(name, 'Dresses', 'women', WOMEN_DRESS_IMAGES, i);
    dressesList.push(p);
    products.push(p);
  });

  // 2. 70 TOPS (35 Women, 35 Men)
  const womenTopsList: Product[] = [];
  const menTopsList: Product[] = [];
  WOMEN_TOPS_35.forEach((name, i) => {
    const p = makeProduct(name, 'Tops', 'women', WOMEN_TOP_IMAGES, i);
    womenTopsList.push(p);
    products.push(p);
  });
  MEN_TOPS_35.forEach((name, i) => {
    const p = makeProduct(name, 'Tops', 'men', MEN_TOP_IMAGES, i);
    menTopsList.push(p);
    products.push(p);
  });

  // 3. 70 BOTTOMS (35 Women, 35 Men)
  const womenBottomsList: Product[] = [];
  const menBottomsList: Product[] = [];
  WOMEN_BOTTOMS_35.forEach((name, i) => {
    const p = makeProduct(name, 'Bottoms', 'women', WOMEN_BOTTOM_IMAGES, i);
    womenBottomsList.push(p);
    products.push(p);
  });
  MEN_BOTTOMS_35.forEach((name, i) => {
    const p = makeProduct(name, 'Bottoms', 'men', MEN_BOTTOM_IMAGES, i);
    menBottomsList.push(p);
    products.push(p);
  });

  // 4. 70 OUTERWEAR (35 Women, 35 Men)
  const womenOuterwearList: Product[] = [];
  const menOuterwearList: Product[] = [];
  WOMEN_OUTERWEAR_35.forEach((name, i) => {
    const p = makeProduct(name, 'Outerwear', 'women', WOMEN_OUTERWEAR_IMAGES, i);
    womenOuterwearList.push(p);
    products.push(p);
  });
  MEN_OUTERWEAR_35.forEach((name, i) => {
    const p = makeProduct(name, 'Outerwear', 'men', MEN_OUTERWEAR_IMAGES, i);
    menOuterwearList.push(p);
    products.push(p);
  });

  // 5. 70 SHOES (35 Women, 35 Men)
  const womenShoesList: Product[] = [];
  const menShoesList: Product[] = [];
  WOMEN_SHOES_35.forEach((name, i) => {
    const p = makeProduct(name, 'Shoes', 'women', WOMEN_SHOES_IMAGES, i);
    womenShoesList.push(p);
    products.push(p);
  });
  MEN_SHOES_35.forEach((name, i) => {
    const p = makeProduct(name, 'Shoes', 'men', MEN_SHOES_IMAGES, i);
    menShoesList.push(p);
    products.push(p);
  });

  // 6. 70 ACCESSORIES (35 Women, 35 Men)
  const womenAccList: Product[] = [];
  const menAccList: Product[] = [];
  WOMEN_ACCESSORIES_35.forEach((name, i) => {
    const p = makeProduct(name, 'Accessories', 'women', WOMEN_ACCESSORIES_IMAGES, i);
    womenAccList.push(p);
    products.push(p);
  });
  MEN_ACCESSORIES_35.forEach((name, i) => {
    const p = makeProduct(name, 'Accessories', 'men', MEN_ACCESSORIES_IMAGES, i);
    menAccList.push(p);
    products.push(p);
  });

  // ========================================================
  // DETERMINISTIC COLLECTION ASSIGNMENTS: EXACTLY 70 IN EACH!
  // ========================================================

  // 1. DRESSES COLLECTION: Exactly 70 dresses (All 70 Dresses)
  dressesList.forEach(p => p.collections.push('dresses'));

  // 2. TOPS COLLECTION: Exactly 70 tops (35 Women Tops + 35 Men Tops)
  womenTopsList.forEach(p => p.collections.push('tops'));
  menTopsList.forEach(p => p.collections.push('tops'));

  // 3. BOTTOMS COLLECTION: Exactly 70 bottoms (35 Women Bottoms + 35 Men Bottoms)
  womenBottomsList.forEach(p => p.collections.push('bottoms'));
  menBottomsList.forEach(p => p.collections.push('bottoms'));

  // 4. OUTERWEAR COLLECTION: Exactly 70 outerwear (35 Women Outerwear + 35 Men Outerwear)
  womenOuterwearList.forEach(p => p.collections.push('outerwear'));
  menOuterwearList.forEach(p => p.collections.push('outerwear'));

  // 5. SHOES COLLECTION: Exactly 70 shoes (35 Women Shoes + 35 Men Shoes)
  womenShoesList.forEach(p => p.collections.push('shoes'));
  menShoesList.forEach(p => p.collections.push('shoes'));

  // 6. ACCESSORIES COLLECTION: Exactly 70 accessories (35 Women Acc + 35 Men Acc)
  womenAccList.forEach(p => p.collections.push('accessories'));
  menAccList.forEach(p => p.collections.push('accessories'));

  // 7. WOMEN COLLECTION: EXACTLY 70 100% PURE WOMEN'S PIECES (ZERO MEN'S CLOTHING!)
  // 20 Dresses + 10 Tops + 10 Bottoms + 10 Outerwear + 10 Shoes + 10 Accessories = 70
  const pureWomen70: Product[] = [
    ...dressesList.slice(0, 20),
    ...womenTopsList.slice(0, 10),
    ...womenBottomsList.slice(0, 10),
    ...womenOuterwearList.slice(0, 10),
    ...womenShoesList.slice(0, 10),
    ...womenAccList.slice(0, 10)
  ];
  pureWomen70.forEach(p => p.collections.push('women'));

  // 8. MEN COLLECTION: EXACTLY 70 100% PURE MEN'S PIECES (ZERO WOMEN'S CLOTHING OR DRESSES!)
  // 14 Tops + 14 Bottoms + 14 Outerwear + 14 Shoes + 14 Accessories = 70
  const pureMen70: Product[] = [
    ...menTopsList.slice(0, 14),
    ...menBottomsList.slice(0, 14),
    ...menOuterwearList.slice(0, 14),
    ...menShoesList.slice(0, 14),
    ...menAccList.slice(0, 14)
  ];
  pureMen70.forEach(p => p.collections.push('men'));

  // 9. NEW ARRIVALS: EXACTLY 70 PRODUCTS (35 Women, 35 Men)
  const newArrivals70: Product[] = [
    ...dressesList.slice(20, 30),
    ...womenTopsList.slice(10, 18),
    ...womenBottomsList.slice(10, 18),
    ...womenOuterwearList.slice(10, 19),
    ...menTopsList.slice(14, 23),
    ...menBottomsList.slice(14, 23),
    ...menOuterwearList.slice(14, 22),
    ...menShoesList.slice(14, 23)
  ].slice(0, 70);

  newArrivals70.forEach(p => {
    p.isNew = true;
    p.collections.push('new-arrivals');
  });

  // 10. SALE: EXACTLY 70 PRODUCTS (35 Women, 35 Men) with real discounts
  const sale70: Product[] = [
    ...dressesList.slice(30, 42), // 12
    ...womenTopsList.slice(18, 26), // 8
    ...womenBottomsList.slice(18, 26), // 8
    ...womenOuterwearList.slice(20, 22), // 2
    ...womenShoesList.slice(10, 17), // 7
    ...menTopsList.slice(23, 31), // 8
    ...menBottomsList.slice(23, 31), // 8
    ...menOuterwearList.slice(22, 30), // 8
    ...menAccList.slice(14, 23) // 9
  ].slice(0, 70); // 12+8+8+2+7+8+8+8+9 = 70!

  sale70.forEach(p => {
    p.isSale = true;
    if (!p.salePrice) {
      p.salePrice = Math.round(p.price * 0.75 / 100) * 100 - 1;
    }
    p.collections.push('sale');
  });

  return products;
}

// Master preloaded dataset instance (420 distinct, unique original silhouettes)
export const VERA_PRODUCTS: Product[] = generateStrictVeraCatalog();

// Helper accessor methods
export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return VERA_PRODUCTS.filter(p => p.collections.includes(slug));
}

export function getProductBySlug(slug: string): Product | undefined {
  return VERA_PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getTrendingProducts(limit: number = 8): Product[] {
  return [...VERA_PRODUCTS]
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, limit);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return VERA_PRODUCTS
    .filter(p => p.collections.includes('new-arrivals'))
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return VERA_PRODUCTS
    .filter(p => p.id !== product.id && p.gender === product.gender && (p.category === product.category || p.style === product.style))
    .slice(0, limit);
}

export function getCompleteTheLook(product: Product): {
  top?: Product;
  bottom?: Product;
  shoes?: Product;
  accessories?: Product;
} {
  const targetGender = product.gender;

  const findMatch = (cat: Category) => 
    VERA_PRODUCTS.find(p => p.category === cat && p.gender === targetGender && p.id !== product.id)
    || VERA_PRODUCTS.find(p => p.category === cat && p.id !== product.id);

  return {
    top: product.category !== 'Tops' ? findMatch('Tops') : undefined,
    bottom: product.category !== 'Bottoms' ? findMatch('Bottoms') : undefined,
    shoes: product.category !== 'Shoes' ? findMatch('Shoes') : undefined,
    accessories: product.category !== 'Accessories' ? findMatch('Accessories') : undefined,
  };
}
