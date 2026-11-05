import { Product, ProductCategory } from '../types';

export const HERO_SNEAKER_IMG = '/src/assets/images/dravine_hero_sneaker_1793885268066.jpg';
export const FORMAL_OXFORD_IMG = '/src/assets/images/dravine_formal_oxford_1793885269843.jpg';
export const WOMEN_RUNNER_IMG = '/src/assets/images/dravine_women_runner_1793885270696.jpg';
export const URBAN_SNEAKER_IMG = '/src/assets/images/dravine_urban_sneaker_1793885270009.jpg';
export const CRAFT_WORKSHOP_IMG = '/src/assets/images/dravine_about_craft_1793885270588.jpg';

export const PRODUCT_CATEGORIES: { name: ProductCategory; description: string; count: number; image: string }[] = [
  {
    name: "Sneakers",
    description: "Cutting-edge silhouette engineered for street style and all-day energy return.",
    count: 24,
    image: HERO_SNEAKER_IMG
  },
  {
    name: "Formal Shoes",
    description: "Handcrafted full-grain Italian & Ceylon leather oxfords and brogues.",
    count: 18,
    image: FORMAL_OXFORD_IMG
  },
  {
    name: "Sports Shoes",
    description: "Ultralight marathon-grade cushioning and carbon responsiveness.",
    count: 16,
    image: WOMEN_RUNNER_IMG
  },
  {
    name: "Casual Shoes",
    description: "Versatile leather & nubuck slip-ons and low-profile urban daily wear.",
    count: 20,
    image: URBAN_SNEAKER_IMG
  },
  {
    name: "Men's Shoes",
    description: "Executive formals, heritage boots, and modern hybrid dress shoes.",
    count: 32,
    image: FORMAL_OXFORD_IMG
  },
  {
    name: "Women's Shoes",
    description: "Refined heels, supportive court trainers, and ergonomic flats.",
    count: 28,
    image: WOMEN_RUNNER_IMG
  },
  {
    name: "Sandals & Slippers",
    description: "Premium molded cork footbeds, genuine leather straps, and island comfort.",
    count: 14,
    image: URBAN_SNEAKER_IMG
  },
  {
    name: "Kids' Shoes",
    description: "Durable reinforced toe-caps, orthotic support, and flexible soles.",
    count: 12,
    image: HERO_SNEAKER_IMG
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'drv-01',
    name: 'Dravine Apex Kinetic X',
    tagline: 'Precision Carbon-Infused Flight Athletics',
    category: 'Sneakers',
    price: 18500,
    originalPrice: 22000,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 84,
    primaryImage: HERO_SNEAKER_IMG,
    galleryImages: [HERO_SNEAKER_IMG, URBAN_SNEAKER_IMG],
    description: 'The definitive Dravine performance sneaker. Built with breathable dual-density engineered mesh, dynamic responsive foam chamber, and high-visibility Dravine signature orange accents.',
    features: [
      'Carbon-fiber composite shank for torsional rigidity',
      'Dual-compound Dravine Ultra-Bounce midsole',
      'Reflective micro-thread laces for night visibility',
      'Reinforced heel counter with ergonomic Achilles notch'
    ],
    specs: {
      upperMaterial: 'Engineered High-Tensile Jacquard Mesh & TPU Overlays',
      soleType: 'Dravine Ultra-Grip Molded Carbon Rubber Outsole',
      cushioning: 'Nitrogen-Infused Energy Chamber',
      closure: 'Performance Asymmetric Lacing System',
      weight: '280g (UK 8)',
      craftedIn: 'Dravine Studio, Dehiwala, Sri Lanka'
    },
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Obsidian & Flame Orange', hex: '#ff6a00' },
      { name: 'Pitch Black', hex: '#111115' },
      { name: 'Slate Gray', hex: '#4b5563' }
    ],
    inStock: true,
    stockCount: 14,
    isNewArrival: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Dinesh Perera',
        location: 'Colombo 03',
        rating: 5,
        date: '2 days ago',
        title: 'Unbelievable comfort and build quality',
        comment: 'Picked these up from the Dehiwala studio. The orange accents look even better in person. The cushioning is right up there with top global brands.',
        verified: true,
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-2',
        author: 'Kavindu Senanayake',
        location: 'Mount Lavinia',
        rating: 5,
        date: '1 week ago',
        title: 'Best sneaker purchase in Sri Lanka',
        comment: 'Super fast delivery to Mount Lavinia within 24 hours. The fit is snug and the sole grip on wet tarmac is exceptional.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'drv-02',
    name: 'Dravine Sovereign Oxford Brogue',
    tagline: 'Hand-Burnished Artisan Full-Grain Leather',
    category: 'Formal Shoes',
    price: 24500,
    originalPrice: 28000,
    discountPercent: 12,
    rating: 5.0,
    reviewCount: 62,
    primaryImage: FORMAL_OXFORD_IMG,
    galleryImages: [FORMAL_OXFORD_IMG],
    description: 'A timeless bespoke silhouette hand-stitched by master cordwainers at Dravine. Featuring hand-burnished calfskin leather, Goodyear-welted construction, and handcrafted channeled leather soles.',
    features: [
      'Genuine full-grain calfskin with artisanal gradient patina',
      'Closed-channel welted leather sole with rubber heel lift',
      'Memory foam insole wrapped in breathable pigskin lining',
      'Reinforced steel shank providing lasting arch balance'
    ],
    specs: {
      upperMaterial: 'Grade-A Full Grain European Calfskin',
      soleType: 'Hand-Channeled Goodyear Welted Leather Sole',
      cushioning: 'Dual-Layer OrthoLite & Natural Cork Bed',
      closure: 'Waxed Cotton Dress Laces',
      weight: '410g (UK 8)',
      craftedIn: 'Dravine Heritage Atelier, Dehiwala'
    },
    sizes: ['UK 6.5', 'UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Obsidian Burnished', hex: '#1a1818' },
      { name: 'Heritage Cognac Brown', hex: '#5c3317' }
    ],
    inStock: true,
    stockCount: 8,
    isNewArrival: false,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Dr. Ruwan Wickramasinghe',
        location: 'Colombo 07',
        rating: 5,
        date: '2 weeks ago',
        title: 'Masterpiece craftsmanship',
        comment: 'Wore these to a presidential dinner. Pristine finishing, flawless brogue perforations, and comfortable right out of the box without blister break-in.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'drv-03',
    name: 'Dravine Velocity Aerostride',
    tagline: 'Ultralight Women’s Dynamic Road Runner',
    category: 'Women\'s Shoes',
    price: 17200,
    originalPrice: 19500,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 47,
    primaryImage: WOMEN_RUNNER_IMG,
    galleryImages: [WOMEN_RUNNER_IMG, HERO_SNEAKER_IMG],
    description: 'Engineered specifically for female biomechanics with a contoured heel cup, higher arch bridge, and breathable micro-mesh structure with radiant high-contrast orange energy lines.',
    features: [
      'Tailored female foot geometry with narrow heel containment',
      'Ultra-plush tongue and collar preventing pressure hot spots',
      'High-abrasion rubber zones for durability on urban pavements',
      'Antibacterial moisture-wicking sockliner'
    ],
    specs: {
      upperMaterial: 'Engineered Seamless Monofilament Mesh',
      soleType: 'Dravine Dual-Density Road Grip Rubber',
      cushioning: 'Aero-Float High Rebound Foam',
      closure: 'Speed-Tie Eyelet System',
      weight: '230g (UK 5)',
      craftedIn: 'Dravine Studio, Dehiwala'
    },
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: [
      { name: 'Charcoal & Radiant Orange', hex: '#ff6a00' },
      { name: 'Smokey Quartz', hex: '#374151' }
    ],
    inStock: true,
    stockCount: 19,
    isNewArrival: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Nadeesha Fernando',
        location: 'Nugegoda',
        rating: 5,
        date: '3 days ago',
        title: 'Super light and stylish!',
        comment: 'I use these for morning runs around Independence Square. Featherlight and my knees feel zero impact stress.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'drv-04',
    name: 'Dravine Utility Monolith Low',
    tagline: 'Tactical Urban Nubuck Daily Sneaker',
    category: 'Casual Shoes',
    price: 15900,
    originalPrice: 18000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 53,
    primaryImage: URBAN_SNEAKER_IMG,
    galleryImages: [URBAN_SNEAKER_IMG, HERO_SNEAKER_IMG],
    description: 'An aggressive modern silhouette blending architectural suede panels, rugged oiled leather, and an air-cushioned midsole chamber for tireless city walking.',
    features: [
      'Full-grain matte leather combined with velvety suede trims',
      'Visible heel air chamber with orange accent chamber wall',
      'Stitched cupsole for long-lasting structural durability',
      'Gusseted tongue to keep out street dust and debris'
    ],
    specs: {
      upperMaterial: 'Water-Resistant Oiled Leather & Suede',
      soleType: 'All-Terrain Rubber Lug Outsole',
      cushioning: 'Encapsulated Air Cushioning',
      closure: 'Heavy-Duty Textured Laces',
      weight: '340g (UK 8)',
      craftedIn: 'Dravine Studio, Dehiwala'
    },
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Stealth Black & Orange', hex: '#ff6a00' },
      { name: 'Granite Slate', hex: '#1f2937' }
    ],
    inStock: true,
    stockCount: 11,
    isNewArrival: true,
    isBestSeller: false,
    reviews: [
      {
        id: 'rev-5',
        author: 'Malinda Jayawardena',
        location: 'Dehiwala',
        rating: 5,
        date: '5 days ago',
        title: 'Walk into work with these every day',
        comment: 'Lives right near Galle Road in Dehiwala. Walked into the store and walked out wearing these. Looks fantastic with dark jeans.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'drv-05',
    name: 'Dravine Pro Marathon Speeder',
    tagline: 'Carbon Fiber Race Day Elite Weapon',
    category: 'Sports Shoes',
    price: 21900,
    originalPrice: 25000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 39,
    primaryImage: HERO_SNEAKER_IMG,
    galleryImages: [HERO_SNEAKER_IMG, WOMEN_RUNNER_IMG],
    description: 'Designed for personal records and long-distance dominance. Full-length curved carbon plate propels your stride with instant 88% mechanical energy return.',
    features: [
      'Full-length 3K curved carbon fiber plate',
      'Hyper-foam PEBA midsole with extreme bounce',
      'Laser-cut ventilation micro-ports for tropical climate airflow',
      'Weight-saving skeleton rubber outsole'
    ],
    specs: {
      upperMaterial: 'AtomWeave Featherlight Monofilament',
      soleType: 'Zonal High-Traction Carbon Rubber',
      cushioning: 'Supercritical PEBA Foam',
      closure: 'Speed Rib Lacing',
      weight: '198g (UK 8)',
      craftedIn: 'Dravine Performance Lab, Dehiwala'
    },
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Obsidian Blaze', hex: '#ff6a00' },
      { name: 'Pure Carbon', hex: '#000000' }
    ],
    inStock: true,
    stockCount: 7,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: 'drv-06',
    name: 'Dravine Imperial Monk Strap',
    tagline: 'Double-Buckle Sartorial Statement',
    category: 'Men\'s Shoes',
    price: 26000,
    originalPrice: 30000,
    discountPercent: 13,
    rating: 5.0,
    reviewCount: 31,
    primaryImage: FORMAL_OXFORD_IMG,
    galleryImages: [FORMAL_OXFORD_IMG],
    description: 'The epitome of contemporary gentleman dressing. Handcrafted double monk strap featuring brushed gunmetal brass hardware and rich hand-patinated midnight calf leather.',
    features: [
      'Solid antique brass buckle hardware with elastic comfort flex',
      'Hand-painted patina finish with deep obsidian sheen',
      'Goodyear welted construction that can be re-soled for a lifetime',
      'Curved bevelled waist for an athletic bespoke arch profile'
    ],
    specs: {
      upperMaterial: 'Full-Grain Crust Calfskin',
      soleType: 'Bark-Tanned Hand-Finished Leather Sole',
      cushioning: 'Natural Cork Fill & Poron Footbed',
      closure: 'Double Adjustable Buckles',
      weight: '430g (UK 8)',
      craftedIn: 'Dravine Heritage Atelier, Dehiwala'
    },
    sizes: ['UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Midnight Obsidian', hex: '#111115' },
      { name: 'Espresso Patina', hex: '#3d2314' }
    ],
    inStock: true,
    stockCount: 6,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: 'drv-07',
    name: 'Dravine Ceylon Solstice Sandal',
    tagline: 'Anatomical Cork & Full-Grain Leather Slide',
    category: 'Sandals & Slippers',
    price: 8900,
    originalPrice: 10500,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 73,
    primaryImage: URBAN_SNEAKER_IMG,
    galleryImages: [URBAN_SNEAKER_IMG],
    description: 'Crafted for tropical heat and coastal strolls in Mount Lavinia and Galle Face. Features 100% genuine oiled pull-up leather straps over an anatomical natural cork and latex footbed.',
    features: [
      'Deep heel cup and longitudinal arch support',
      'Soft genuine suede insole lining that absorbs foot moisture',
      'Shock-absorbing lightweight EVA ripple sole',
      'Dual adjustable matte black buckle straps'
    ],
    specs: {
      upperMaterial: 'Oiled Heavy-Gauge Pull-Up Leather',
      soleType: 'Lightweight Non-Marking EVA Ripple Sole',
      cushioning: 'Anatomical Natural Cork & Latex Footbed',
      closure: 'Rust-Proof Adjustable Pin Buckles',
      weight: '260g (UK 8)',
      craftedIn: 'Dravine Studio, Dehiwala, Sri Lanka'
    },
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Pitch Black & Dark Cork', hex: '#18181b' },
      { name: 'Rustic Saddle Tan', hex: '#78350f' }
    ],
    inStock: true,
    stockCount: 22,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: 'drv-08',
    name: 'Dravine Little Dynamo Bolt',
    tagline: 'Orthopedic Support & High-Flex Kids’ Trainer',
    category: 'Kids\' Shoes',
    price: 7500,
    originalPrice: 9000,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 42,
    primaryImage: HERO_SNEAKER_IMG,
    galleryImages: [HERO_SNEAKER_IMG],
    description: 'Built for active growing feet. Reinforced rubber toe bumper prevents scuffs, with easy-on hook-and-loop closure and antimicrobial breathable memory insoles.',
    features: [
      'Dual hook-and-loop velcro straps for quick independent fitting',
      'Scuff-resistant rubber toe protection shield',
      'Non-marking gum rubber sole safe for school sports halls',
      'Removable fit-check insole measuring growth'
    ],
    specs: {
      upperMaterial: 'Breathable Eco-Nylon Mesh & Vegan Leather',
      soleType: 'Flex-Groove Non-Marking Natural Rubber',
      cushioning: 'Kids Ortho-Flex Cloud Foam',
      closure: 'Velcro Quick-Lock Dual Straps',
      weight: '160g (UK 12 Kids)',
      craftedIn: 'Dravine Studio, Dehiwala'
    },
    sizes: ['UK 10 Kids', 'UK 11 Kids', 'UK 12 Kids', 'UK 13 Kids', 'UK 1', 'UK 2', 'UK 3'],
    colors: [
      { name: 'Blaze Orange & Black', hex: '#ff6a00' },
      { name: 'Electric Royal Blue', hex: '#2563eb' }
    ],
    inStock: true,
    stockCount: 16,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'drv-09',
    name: 'Dravine Chelsea Nomad Boot',
    tagline: 'Weatherproof Pull-Up Leather Ankle Boot',
    category: 'Men\'s Shoes',
    price: 22500,
    originalPrice: 26000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 38,
    primaryImage: FORMAL_OXFORD_IMG,
    galleryImages: [FORMAL_OXFORD_IMG, URBAN_SNEAKER_IMG],
    description: 'Rugged elegance meets everyday comfort. Clean minimalist Chelsea silhouette with twin heavy-duty elastic gores and a storm-welted lugged commando outsole.',
    features: [
      'Twin high-elasticity nylon stretch gores for smooth slip-on',
      'Reinforced front and rear pull tabs',
      'Commando rubber lug sole with dependable wet-weather traction',
      'Supple full-calf lining for plush temperature regulation'
    ],
    specs: {
      upperMaterial: 'Weatherproof Waxed Nubuck Leather',
      soleType: 'Dravine Commando Lugged Rubber Sole',
      cushioning: 'Removable Dual-Density PU Insole',
      closure: 'Slip-On Elasticated Gores',
      weight: '480g (UK 8)',
      craftedIn: 'Dravine Heritage Atelier, Dehiwala'
    },
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Obsidian Matte', hex: '#171717' },
      { name: 'Earth Tobacco Brown', hex: '#52341b' }
    ],
    inStock: true,
    stockCount: 9,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: 'drv-10',
    name: 'Dravine CloudSlide Recovery Mule',
    tagline: 'Post-Workout Orthotic Comfort Slide',
    category: 'Sandals & Slippers',
    price: 6800,
    originalPrice: 7900,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 51,
    primaryImage: URBAN_SNEAKER_IMG,
    galleryImages: [URBAN_SNEAKER_IMG],
    description: 'Engineered for athletes and everyday leisure. Thick sculpted foam cradle soothes arch fatigue and decompresses joints after strenuous training or long standing.',
    features: [
      'Bio-based closed-cell recovery foam that resists water and odor',
      'Anatomical toe bar and high arch support chamber',
      'Wave-patterned anti-slip drainage outsole',
      'Washable and fast-drying within minutes'
    ],
    specs: {
      upperMaterial: 'One-Piece Sculpted Hydrophobic Foam',
      soleType: 'High-Friction Grip Tread',
      cushioning: '38mm High-Stack Recovery Foam',
      closure: 'Slip-On Open Toe Slide',
      weight: '180g (UK 8)',
      craftedIn: 'Dravine Studio, Dehiwala, Sri Lanka'
    },
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Orange Ember', hex: '#ff6a00' }
    ],
    inStock: true,
    stockCount: 25,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: 'drv-11',
    name: 'Dravine Aria Luxe Platform Sneaker',
    tagline: 'Sculpted Minimalist Clean White & Orange Accent',
    category: 'Women\'s Shoes',
    price: 16800,
    originalPrice: 19000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 34,
    primaryImage: WOMEN_RUNNER_IMG,
    galleryImages: [WOMEN_RUNNER_IMG, URBAN_SNEAKER_IMG],
    description: 'Crisp, contemporary 40mm platform sneaker designed for effortless pairing with linen dresses, wide trousers, or casual denim.',
    features: [
      'Supple full-grain nappa leather upper with subtle grain texture',
      'Subtle 40mm platform height offering flattering silhouette',
      'Padded memory foam heel counter preventing rubbing',
      'Breathable leather sockliner keeping feet fresh in Sri Lankan heat'
    ],
    specs: {
      upperMaterial: 'White Nappa Leather & Orange Heel Trim',
      soleType: 'Lightweight Flatform Rubber Sole',
      cushioning: 'OrthoLite Slow-Recovery Memory Foam',
      closure: 'Flat Organic Cotton Laces',
      weight: '290g (UK 5)',
      craftedIn: 'Dravine Studio, Dehiwala'
    },
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: [
      { name: 'Crisp White & Flame Orange', hex: '#ffffff' },
      { name: 'Onyx Monochrome', hex: '#171717' }
    ],
    inStock: true,
    stockCount: 12,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: 'drv-12',
    name: 'Dravine Junior Blitz Court',
    tagline: 'High-Impact Basketball & Turf Shoe for Kids',
    category: 'Kids\' Shoes',
    price: 8200,
    originalPrice: 9500,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 29,
    primaryImage: HERO_SNEAKER_IMG,
    galleryImages: [HERO_SNEAKER_IMG],
    description: 'High-top ankle protection, responsive court grip, and impact dampening for school athletes and court enthusiasts.',
    features: [
      'Padded high-top collar providing essential lateral ankle stability',
      'Herringbone traction pattern delivering fast cuts and stops',
      'Durable TPU toe bumper protecting against drag wear',
      'Elastic faux-laces with heavy-duty hook-and-loop strap'
    ],
    specs: {
      upperMaterial: 'Synthetic Leather & Ballistic Mesh',
      soleType: 'Non-Marking Court Rubber Outsole',
      cushioning: 'Junior Kinetic Rebound Foam',
      closure: 'Elastic Lace + Power Ankle Strap',
      weight: '210g (UK 1)',
      craftedIn: 'Dravine Studio, Dehiwala'
    },
    sizes: ['UK 12 Kids', 'UK 13 Kids', 'UK 1', 'UK 2', 'UK 3', 'UK 4'],
    colors: [
      { name: 'Black & Flame Orange', hex: '#ff6a00' },
      { name: 'Hyper Teal & Charcoal', hex: '#0d9488' }
    ],
    inStock: true,
    stockCount: 15,
    isNewArrival: false,
    isBestSeller: true
  }
];

export const BRAND_CONTACT = {
  name: 'Dravine',
  tagline: 'Step Into Style. Walk With Confidence.',
  headline: 'Step Into Style. Walk With Confidence.',
  description: 'Discover the latest collection of stylish, comfortable, and high-quality footwear for every occasion.',
  phone: '0718957517',
  phoneFormatted: '071 895 7517',
  phoneInternational: '+94718957517',
  whatsappUrl: 'https://wa.me/94718957517?text=Hello%20Dravine%20Footwear%2C%20I%20am%20interested%20in%20your%20shoes',
  email: 'concierge@dravinefootwear.com',
  location: 'Dehiwala, Sri Lanka',
  address: 'No. 142 Galle Road, Dehiwala 10350, Sri Lanka',
  coordinates: {
    lat: 6.8402,
    lng: 79.8712
  },
  hours: {
    weekdays: '9:30 AM – 8:00 PM',
    saturday: '9:30 AM – 8:30 PM',
    sunday: '10:00 AM – 6:00 PM'
  },
  socials: {
    instagram: 'https://instagram.com/dravinefootwear',
    facebook: 'https://facebook.com/dravinefootwear',
    tiktok: 'https://tiktok.com/@dravinefootwear'
  }
};
