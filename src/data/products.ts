export interface Product {
  id: string;
  name: string;
  category: 'indoor-packages' | 'stand-packages';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  shortDesc: string;
  features: string[];
  plantsIncluded: string[];
  careLevel: 'Easy' | 'Beginner' | 'Moderate';
  lightRequirement: string;
  watering: string;
  image: string;
  idealFor: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'mega-pack-white-pebbles',
    name: '10 Pcs Mega Pack (White Pebbles)',
    category: 'indoor-packages',
    categoryLabel: 'Indoor Plant Package',
    price: 1099,
    originalPrice: 1599,
    badge: '১০ পিস মাত্র ১০৯৯ টাকা · সাদা পাথর সহ',
    shortDesc: '১০ পিস সতেজ ইনডোর প্ল্যান্ট + সাদা কিউট টব + প্রিমিয়াম সাদা পাথর (White Pebbles)। ড্রয়িং রুম, অফিস বা পড়ার টেবিল সাজাতে সেরা কম্বো।',
    features: [
      '১০ পিস বাছাইকৃত আকর্ষণীয় ইনডোর প্ল্যান্ট',
      'সাদা মার্জিত টব সহ রেডি-টু-প্লেস সেট',
      'প্রিমিয়াম সাদা পাথর (White Pebbles) অন্তর্ভুক্ত',
      'ঘরের বাতাস সতেজ রাখে ও মেইনটেন্যান্স খুব সহজ'
    ],
    plantsIncluded: [
      'Calathea Ornata (Pinstripe Calathea)',
      'Syngonium (Arrowhead Plant)',
      'Lucky Bamboo / Green Dracaena',
      'Cordyline (Purple Ti Plant)',
      'Dieffenbachia Compacta',
      'Tradescantia (Boat Lily)',
      'Golden Pothos (Money Plant)',
      'Monstera Adansonii (Swiss Cheese)',
      'Green Heartleaf Pothos',
      'Spider Plant (Chlorophytum)'
    ],
    careLevel: 'Easy',
    lightRequirement: 'ইনডোর লাইট বা ঘরের স্বাভাবিক আলো',
    watering: 'সপ্তাহে ১-২ বার পরিমাণমতো পানি দিন',
    image: '/src/assets/images/combo_10_white_pebbles_1791988986755.jpg',
    idealFor: 'ড্রয়িং রুম, অফিস টেবিল, বেডরুম ও পড়ার টেবিল'
  },
  {
    id: 'mega-pack-color-pebbles',
    name: '10 Pcs Mega Pack (Color Pebbles)',
    category: 'indoor-packages',
    categoryLabel: 'Indoor Plant Package',
    price: 1150,
    originalPrice: 1650,
    badge: '১০ পিস মাত্র ১১৫০ টাকা · কালার পাথর সহ',
    shortDesc: '১০ পিস সতেজ ইনডোর প্ল্যান্ট + সাদা কিউট টব + আকর্ষণীয় রঙিন পাথর (Rainbow Color Pebbles)। ঘর বা টেবিলকে করবে রঙিন ও প্রাণবন্ত।',
    features: [
      '১০ পিস আকর্ষণীয় সবুজ ইনডোর প্ল্যান্ট',
      'সাদা আধুনিক টব সহ ফুল প্যাকেজ',
      'রঙিন মাল্টিকালার পাথর (Color Pebbles) অন্তর্ভুক্ত',
      'সহজে যত্ন নেওয়া যায়, উপহার দেওয়ার জন্যও চমৎকার'
    ],
    plantsIncluded: [
      'Calathea Ornata (Pinstripe Calathea)',
      'Syngonium (Arrowhead Plant)',
      'Lucky Bamboo / Green Dracaena',
      'Cordyline (Purple Ti Plant)',
      'Dieffenbachia Compacta',
      'Tradescantia (Boat Lily)',
      'Golden Pothos (Money Plant)',
      'Monstera Adansonii (Swiss Cheese)',
      'Green Heartleaf Pothos',
      'Spider Plant (Chlorophytum)'
    ],
    careLevel: 'Easy',
    lightRequirement: 'ঘরের সাধারণ আলো ও হালকা বাতাসযুক্ত স্থান',
    watering: 'সপ্তাহে ১-২ বার মাটি শুকালে পানি দিন',
    image: '/src/assets/images/combo_10_color_pebbles_1791988987184.jpg',
    idealFor: 'লিভিং রুম সেন্টার টেবিল, ওয়ার্ক স্টেশন ও উপহার'
  },
  {
    id: 'starter-green-pack',
    name: 'Starter Green Pack',
    category: 'indoor-packages',
    categoryLabel: 'Indoor Plant Package',
    price: 999,
    originalPrice: 1350,
    badge: 'Popular for Beginners',
    shortDesc: '8–10 indoor plants in clean white ceramic pots with decorative river pebbles. Perfect for beginners starting their indoor greenery journey.',
    features: [
      '8–10 healthy indoor plants',
      'Crisp white ceramic pots included',
      'White decorative soil pebbles',
      'Perfect for beginners & low maintenance'
    ],
    plantsIncluded: [
      'Golden Pothos (Money Plant)',
      'Snake Plant (Sansevieria)',
      'Syngonium (Arrowhead Plant)',
      'Spider Plant',
      'Fairy Castle Mini Cactus',
      'Mini Ficus Bush',
      'Dieffenbachia Compacta',
      'ZZ Plant stem / Aglaonema',
      'Aloe Vera succulent pot'
    ],
    careLevel: 'Beginner',
    lightRequirement: 'Low to bright indirect room light',
    watering: 'Water 1–2 times per week',
    image: '/src/assets/images/starter_green_pack_1791648706401.jpg',
    idealFor: 'Bedroom, study table, window sill, first-time plant parents'
  },
  {
    id: 'home-decor-pack',
    name: 'Home Decor Pack',
    category: 'indoor-packages',
    categoryLabel: 'Indoor Plant Package',
    price: 999,
    originalPrice: 1450,
    badge: 'Best for Living Room',
    shortDesc: '8–10 indoor plants curated specifically for living room decoration, shelf styling, and center table aesthetics.',
    features: [
      '8–10 indoor plants',
      'Best for living room decoration',
      'Premium matching white pots',
      'Air-purifying lush foliage selection'
    ],
    plantsIncluded: [
      'Monstera Adansonii (Swiss Cheese)',
      'Calathea Striped Foliage',
      'Golden Pothos Vine',
      'Variegated Snake Plant',
      'Dieffenbachia Tiki',
      'Mini Pilea Peperomioides',
      'Fittonia Nerve Plant',
      'Chinese Evergreen (Aglaonema)',
      'Bird of Paradise juvenile foliage'
    ],
    careLevel: 'Easy',
    lightRequirement: 'Medium indirect room lighting',
    watering: 'Water twice a week or when topsoil feels dry',
    image: '/src/assets/images/home_decor_pack_1791648720341.jpg',
    idealFor: 'Living room center tables, TV consoles, open shelving, corner pedestals'
  },
  {
    id: 'premium-green-pack',
    name: 'Premium Green Pack',
    category: 'indoor-packages',
    categoryLabel: 'Indoor Plant Package',
    price: 999,
    originalPrice: 1550,
    badge: 'Selected Premium Plants',
    shortDesc: '8–10 indoor plants featuring selected exotic foliage varieties and luxury textures for modern interiors.',
    features: [
      '8–10 indoor plants',
      'Selected premium exotic plants',
      'White decorative pebble dressing',
      'Statement foliage for sophisticated rooms'
    ],
    plantsIncluded: [
      'Variegated Monstera Adansonii',
      'Exotic Dieffenbachia Camouflage',
      'Marble Queen Snow Pothos',
      'Maranta Prayer Plant',
      'Alocasia Polly / Bambino',
      'Calathea Zebra',
      'Compact Bamboo Palm',
      'Zamioculcas Raven / Green'
    ],
    careLevel: 'Moderate',
    lightRequirement: 'Bright indirect filtered light',
    watering: 'Keep soil gently moist, avoid waterlogging',
    image: '/src/assets/images/premium_green_pack_1791648732538.jpg',
    idealFor: 'Executive offices, luxury living rooms, reception areas, dining tables'
  },
  {
    id: 'classic-stand-set',
    name: 'Classic Stand Set',
    category: 'stand-packages',
    categoryLabel: 'Plant Stand Package',
    price: 500,
    originalPrice: 750,
    badge: 'Modern Decorative Design',
    shortDesc: '2 indoor plants + metal stand with modern decorative design. Features lucky bamboo and neon pothos in white pots with colorful pebbles.',
    features: [
      '2 indoor plants + durable metal stand',
      'Modern decorative golden finish',
      'White ceramic pots included',
      'Multi-color decorative polished gravel'
    ],
    plantsIncluded: [
      'Lucky Bamboo (Twisted / Straight stems)',
      'Neon Lime Pothos (Money Plant)'
    ],
    careLevel: 'Beginner',
    lightRequirement: 'Indoor light or partial room glow',
    watering: '1 cup of water per week or misting',
    image: '/src/assets/images/classic_stand_set_1791648744167.jpg',
    idealFor: 'Center tables, hallway consoles, bedside tables, gift sets'
  },
  {
    id: 'mini-stand-decor',
    name: 'Mini Stand Decor',
    category: 'stand-packages',
    categoryLabel: 'Plant Stand Package',
    price: 500,
    originalPrice: 700,
    badge: 'Ideal for Desk / Table',
    shortDesc: '2 plants + compact stand. Ideal for your office work desk, computer table, or dining corner with eye-catching colorful stones.',
    features: [
      '2 plants + compact desktop stand',
      'Ideal for desk & table decor',
      'Space-saving elevated geometric design',
      'Vibrant rainbow decorative pebbles'
    ],
    plantsIncluded: [
      'Indoor Lucky Bamboo',
      'Variegated Marble Queen Pothos'
    ],
    careLevel: 'Easy',
    lightRequirement: 'Office light or indirect daylight',
    watering: 'Low water requirement (once weekly)',
    image: '/src/assets/images/mini_stand_decor_1791648756741.jpg',
    idealFor: 'Office work desks, study tables, compact apartment shelves'
  }
];

export const TESTIMONIALS = [
  {
    id: 't0',
    name: 'Farhana Sultana',
    location: 'Bashundhara R/A, Dhaka',
    packagePurchased: '10 Pcs Mega Pack (White Pebbles) - 1099 BDT',
    comment: '১০ পিসের এই সাদা পাথরের প্যাকেজটা সত্যিই দারুণ! সবগুলো গাছ একেবারে তরতাজা আর সতেজ ছিল। টবগুলোর ডিজাইন আর সাদা পাথর বসার ঘরের টেবিলকে একদম বদলে দিয়েছে।'
  },
  {
    id: 't1',
    name: 'Tahmina Akhter',
    location: 'Gulshan-2, Dhaka',
    packagePurchased: '10 Pcs Mega Pack (Color Pebbles) - 1150 BDT',
    comment: '১১৫০ টাকার রঙিন পাথরের ১০ পিসের সেটটা অসাধারণ লেগেছে। প্রতিটি গাছে আলাদা একটা সৌন্দর্য আছে। প্যাকেজিং এতটাই ভালো ছিল যে একটি পাতাও নষ্ট হয়নি। ধন্যবাদ গ্রিন পেজ বিডি!'
  },
  {
    id: 't2',
    name: 'Rafiqul Islam',
    location: 'Uttara Sector 11, Dhaka',
    packagePurchased: 'Classic Stand Set (500 BDT)',
    comment: 'The gold metal stand with lucky bamboo and neon pothos is stunning on my office desk. The colorful stones give it such an aesthetic touch. Received delivery in less than 24 hours!'
  },
  {
    id: 't3',
    name: 'Nusrat Jahan',
    location: 'Mirpur DOHS, Dhaka',
    packagePurchased: 'Starter Green Pack (999 BDT)',
    comment: 'Best deal for indoor plants in Bangladesh! Even local nursery plants cost more without matching pots. Green Page BD called before delivery to confirm my address. Very polite customer service.'
  },
  {
    id: 't4',
    name: 'Sazzad Hossain',
    location: 'Nasirabad, Chittagong',
    packagePurchased: '10 Pcs Mega Pack + Mini Stand Decor',
    comment: 'Was a bit worried about shipping living plants to Chittagong, but their protective packaging was fantastic. The monstera and marble pothos look healthy and alive. Paid via bKash easily.'
  }
];

export const FAQS = [
  {
    question: 'How fast is delivery and what are the delivery charges?',
    answer: 'We deliver within 24 to 48 hours inside Dhaka City. For delivery outside Dhaka (Chittagong, Sylhet, Rajshahi, etc.), it typically takes 2–3 business days. Delivery fee is 80 BDT inside Dhaka and 130 BDT outside Dhaka. All plants are packed securely in damage-proof cushioned boxes.'
  },
  {
    question: 'How do I care for these indoor plants?',
    answer: 'All our bundled packages are chosen specifically for easy indoor living! Place them where they receive bright or indirect natural sunlight (avoid harsh midday direct sun). Water only 1–2 times per week when the topsoil feels dry. The decorative pebbles help retain healthy moisture and keep your tables clean.'
  },
  {
    question: 'What payment options do you support?',
    answer: 'We offer 100% Cash on Delivery (COD) across Bangladesh — you inspect your plant parcel at your door before paying the delivery agent. We also accept secure mobile payments via bKash (01914669550).'
  },
  {
    question: 'What happens if a plant arrives damaged?',
    answer: 'We provide a 100% Transit Safe Guarantee! In the rare event that any pot or plant is damaged during transit, simply share a quick photo with our WhatsApp (01914669550) on delivery day, and we will dispatch a free immediate replacement without hassle.'
  },
  {
    question: 'Do the plants come with pots and stones?',
    answer: 'Yes! Every package comes complete with matching white pots, nutrient-rich soil mix, and decorative surface pebbles (pure white river pebbles for packages or vibrant rainbow gravel for stand sets) exactly as shown in the photos.'
  }
];
