export type Product = {
  id: string;
  name: string;
  shop: string;
  price: number;
  oldPrice: number;
  discount?: string;
  rating: number;
  reviews: string;
  hue: string;
  icon: string;
  badge?: "Sale" | "New" | "Out of Stock";
  delivery?: string;
};

const hues = [
  "from-emerald-100 to-emerald-50",
  "from-orange-100 to-orange-50",
  "from-sky-100 to-sky-50",
  "from-rose-100 to-rose-50",
  "from-amber-100 to-amber-50",
  "from-lime-100 to-lime-50",
  "from-teal-100 to-teal-50",
  "from-fuchsia-100 to-fuchsia-50",
];

const icons = ["💊", "🧴", "🩺", "🧃", "🥗", "🧪", "🍯", "🧼", "🩹", "🌿"];

const names = [
  "VitaLife Omega-3 Softgels Heart Support",
  "Fresh Basket Immunity Fruit Box",
  "Hand Sanitizer Gel 500ml",
  "Digital BP Monitor Machine",
  "Non-Contact Infrared Thermometer",
  "Vitamin C Effervescent Tablets",
  "Herbal Ground Nuts Cooking Oil",
  "Matcha Green Tea Wellness Blend",
  "Power C Immunity Booster",
  "Daily Multivitamin Capsules",
  "Aloe Vera Soothing Body Lotion",
  "Probiotic Digestive Gummies",
];

const shops = [
  "GreenLeaf Pharmacy",
  "Wellness Hub",
  "CareFirst Store",
  "NutriMart",
  "PureLiving Shop",
];

function makeProduct(i: number): Product {
  const name = names[i % names.length];
  const price = 27.49 + (i % 5) * 3.5;
  const oldPrice = price + 12.5;
  return {
    id: `p-${i}`,
    name,
    shop: shops[i % shops.length],
    price: Number(price.toFixed(2)),
    oldPrice: Number(oldPrice.toFixed(2)),
    discount: i % 4 === 0 ? "15% OFF" : undefined,
    rating: 4 + ((i % 5) * 0.1),
    reviews: `${(i * 37 + 120) % 900}`,
    hue: hues[i % hues.length],
    icon: icons[i % icons.length],
    badge: i % 7 === 0 ? "Out of Stock" : i % 5 === 0 ? "New" : "Sale",
    delivery:undefined,
  };
}

export const products: Product[] = Array.from({ length: 24 }, (_, i) =>
    makeProduct(i)
);

export const categories = [
  { name: "Personal Care", icon: "🧴" },
  { name: "Diet & Nutrition", icon: "🥗" },
  { name: "Diabetes Care", icon: "🩸" },
  { name: "Wellness", icon: "🌿" },
  { name: "Skincare", icon: "🧴" },
  { name: "Supplements", icon: "💊" },
  { name: "Natural Care", icon: "🍃" },
  { name: "Breakfast", icon: "🥣" },
  { name: "Dairy & Desserts", icon: "🍦" },
  { name: "Digestive & Vitality", icon: "🌡️" },
  { name: "Elderly Care", icon: "🧓" },
  { name: "Gym Supplements", icon: "🏋️" },
  { name: "Immunity Boosters", icon: "🍊" },
  { name: "Haircare", icon: "💇" },
];

export const heroSlides = [
  {
    eyebrow: "Exclusive offer",
    badge: "25% OFF",
    title: "Everything you need for wellness in one place.",
    subtitle:
        "Discover your favorite brands, latest trends, and exclusive discounts in one place.",
    cta: "Shop Now",
    hue: "from-emerald-200 via-emerald-100 to-white",
    icon: "🧴",
  },
  {
    eyebrow: "Exclusive offer",
    badge: "25% OFF",
    title: "Boost your health with trusted supplements.",
    subtitle:
        "Discover your favorite brands, latest trends, and exclusive discounts in one place.",
    cta: "Shop Now",
    hue: "from-amber-200 via-amber-100 to-white",
    icon: "💊",
  },
  {
    eyebrow: "Exclusive offer",
    badge: "25% OFF",
    title: "Top brands for skincare, haircare, and more.",
    subtitle:
        "Discover your favorite brands, latest trends, and exclusive discounts in one place.",
    cta: "Shop Now",
    hue: "from-rose-200 via-rose-100 to-white",
    icon: "🧴",
  },
  {
    eyebrow: "Exclusive offer",
    badge: "25% OFF",
    title: "BP monitors, glucometers, nebulizers & more.",
    subtitle:
        "Discover your favorite brands, latest trends, and exclusive discounts in one place.",
    cta: "Shop Now",
    hue: "from-sky-200 via-sky-100 to-white",
    icon: "🩺",
  },
];

export const features = [
  {
    title: "Free Shipping",
    desc: "Enjoy the Convenience of Free Shipping on Every Order",
    icon: "🚚",
  },
  {
    title: "24x7 Support",
    desc: "Round-the-Clock Assistance, Anytime You Need It",
    icon: "🎧",
  },
  {
    title: "30 Days Return",
    desc: "Your Satisfaction is Our Priority: Return Within 30 Days",
    icon: "↩️",
  },
  {
    title: "Secure Payment",
    desc: "Seamless Shopping Backed by Safe and Secure Payment Options",
    icon: "🔒",
  },
];

export const blogPosts = [
  {
    title: "The Future of Industrial Design",
    category: "Wellness",
    date: "09 Feb 2027",
    comments: 10,
    hue: "from-emerald-100 to-emerald-50",
  },
  {
    title: "5 Supplements Worth Adding to Your Routine",
    category: "Nutrition",
    date: "03 Feb 2027",
    comments: 6,
    hue: "from-amber-100 to-amber-50",
  },
  {
    title: "How to Build a Simple Skincare Routine",
    category: "Skincare",
    date: "28 Jan 2027",
    comments: 14,
    hue: "from-rose-100 to-rose-50",
  },
  {
    title: "Understanding At-Home Health Devices",
    category: "Devices",
    date: "21 Jan 2027",
    comments: 4,
    hue: "from-sky-100 to-sky-50",
  },
];

// ---------------------------------------------------------------------------
// Product details page data
// ---------------------------------------------------------------------------

export const featuredProduct = {
  name: "VitaLife Omega-3 Softgels Heart Support Max Strength",
  shop: "GreenLeaf Pharmacy",
  price: 39.99,
  oldPrice: 62.97,
  discount: "15% OFF",
  rating: 4.6,
  reviews: "11.78k",
  sku: "SKU-001",
  categories: ["Wellness", "Supplements", "Heart Health"],
  delivery: "5-7 Days",
  badges: ["Sale", "New Arrival"] as const,
  gallery: [
    { hue: "from-emerald-100 to-emerald-50", icon: "💊" },
    { hue: "from-teal-100 to-teal-50", icon: "🫙" },
    { hue: "from-lime-100 to-lime-50", icon: "🌿" },
    { hue: "from-amber-100 to-amber-50", icon: "📦" },
    { hue: "from-sky-100 to-sky-50", icon: "🧪" },
  ],
  colors: [
    { name: "Green", swatch: "#159457" },
    { name: "Amber", swatch: "#ffb020" },
    { name: "Charcoal", swatch: "#16302a" },
    { name: "Rose", swatch: "#e6432b" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  description: [
    "Carefully unpack the product and ensure all necessary components are included. Place the softgel jar on a clean, dry surface before first use.",
    "Take as directed on the label, ideally with a meal, to support absorption. Store in a cool, dry place away from direct sunlight to preserve potency.",
  ],
  descriptionBullets: [
    "Sourced from sustainably-harvested, molecularly distilled fish oil",
    "Third-party tested for purity — no heavy metals or contaminants",
    "Supports heart, joint, and cognitive health with daily use",
  ],
  additionalInfo: [
    ["Product Type", "Omega-3 Softgel Supplement"],
    ["Brand", "VitaLife"],
    ["Servings", "90 Softgels / 45 Day Supply"],
    ["Serving Size", "2 Softgels"],
    ["EPA / DHA", "650mg / 450mg per serving"],
    ["Diet", "Non-GMO, Gluten Free"],
    ["Storage", "Cool, dry place, out of direct sunlight"],
    ["Warranty", "30-Day Satisfaction Guarantee"],
    ["Certification", "GMP Certified, Third-Party Tested"],
  ],
  ratingBreakdown: [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 19 },
    { stars: 3, pct: 8 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 2 },
  ],
};

export const reviews = [
  {
    name: "Robert Fox",
    rating: 4.5,
    verified: true,
    text: "Very nice! Noticeably easier to swallow than other fish oil softgels I've tried, and no fishy aftertaste at all.",
    thanks: 234,
    dislikes: 12,
  },
  {
    name: "Jenny Wilson",
    rating: 4.5,
    verified: true,
    text: "Been taking these for six weeks as part of my morning routine — genuinely feel a difference in my energy levels.",
    thanks: 198,
    dislikes: 8,
  },
  {
    name: "Brooklyn Simmons",
    rating: 5,
    verified: true,
    text: "Great value for the dose strength. Shipping was fast and the packaging arrived well sealed.",
    thanks: 156,
    dislikes: 4,
  },
];

// ---------------------------------------------------------------------------
// Cart page data
// ---------------------------------------------------------------------------

export type CartItem = {
  id: string;
  name: string;
  shop: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  oldPrice: number;
  hue: string;
  icon: string;
  inStock: boolean;
};

export const initialCartItems: CartItem[] = [
  {
    id: "c-1",
    name: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    shop: "GreenLeaf Pharmacy",
    color: "Green",
    size: "250 ML",
    qty: 2,
    price: 27.49,
    oldPrice: 39.99,
    hue: "from-emerald-100 to-emerald-50",
    icon: "💊",
    inStock: true,
  },
  {
    id: "c-2",
    name: "Fresh Basket Immunity Fruit Box",
    shop: "Wellness Hub",
    color: "Black",
    size: "1 Box",
    qty: 1,
    price: 22.0,
    oldPrice: 28.5,
    hue: "from-amber-100 to-amber-50",
    icon: "🥗",
    inStock: true,
  },
  {
    id: "c-3",
    name: "Digital BP Monitor Machine",
    shop: "CareFirst Store",
    color: "White",
    size: "Standard",
    qty: 1,
    price: 45.99,
    oldPrice: 59.99,
    hue: "from-sky-100 to-sky-50",
    icon: "🩺",
    inStock: false,
  },
  {
    id: "c-4",
    name: "Hand Sanitizer Gel 500ml",
    shop: "PureLiving Shop",
    color: "Clear",
    size: "500 ML",
    qty: 3,
    price: 6.49,
    oldPrice: 8.99,
    hue: "from-rose-100 to-rose-50",
    icon: "🧴",
    inStock: true,
  },
];