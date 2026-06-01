export interface ProductVariant {
  name: string;
  image: string;
  gallery: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "Sale" | "New";
  description: string;
  slug: string;
  tags: string[];
  gallery: string[];
  videos: string[]; // YouTube video IDs
  purchaseLink?: string;
  variantType?: string; // e.g., "Colors", "Flavors", "Sizes"
  variants?: ProductVariant[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Film Eyeshadow",
    category: "Lip Gloss",
    price: 23.0,
    oldPrice: 27.0,
    image: "https://picsum.photos/seed/hnaqp9bs/800/600",
    badge: "Sale",
    featured: true,
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec. Eu has vide putent, dico option nominati no eam. Ea erant impetus consequuntur eos, velit congue vidisse eos ne.",
    slug: "film-eyeshadow",
    tags: ["Cosmetic", "Make Up"],
    gallery: ["https://picsum.photos/seed/4yz0eifj/800/600", "https://picsum.photos/seed/bjc08rwn/800/600", "https://picsum.photos/seed/d5c8x0t4/800/600"],
    variantType: "Colors",
    variants: [
      {
        name: "Classic Pink",
        image: "https://picsum.photos/seed/en669vfh/800/600",
        gallery: ["https://picsum.photos/seed/9ahpbeqj/800/600", "https://picsum.photos/seed/qcoks50r/800/600", "https://picsum.photos/seed/81sbz12j/800/600"]
      },
      {
        name: "Velvet Red",
        image: "https://picsum.photos/seed/tuqlxs70/800/600",
        gallery: ["https://picsum.photos/seed/ulcqa18f/800/600", "https://picsum.photos/seed/66vke1fu/800/600"]
      },
      {
        name: "Deep Ocean",
        image: "https://picsum.photos/seed/7w9ztuse/800/600",
        gallery: ["https://picsum.photos/seed/gaa9ii3n/800/600", "https://picsum.photos/seed/1ajh1p4n/800/600"]
      }
    ],
    videos: ["EngW7tLk6R8", "a3ICNMQW7Ok"],
    purchaseLink: "#"
  },
  {
    id: 2,
    name: "WILD PALETTES",
    category: "Lip Gloss",
    price: 25.0,
    image: "https://picsum.photos/seed/gnelhr9i/800/600",
    featured: true,
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec. Eu has vide putent, dico option nominati no eam.",
    slug: "wild-palettes",
    tags: ["Cosmetic", "Palettes"],
    gallery: ["https://picsum.photos/seed/r42h1nd2/800/600", "https://picsum.photos/seed/c3k2nu7j/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 3,
    name: "ROSE SAFARI",
    category: "Lip Gloss",
    featured: true,
    price: 35.0,
    image: "https://picsum.photos/seed/wlrkp9tv/800/600",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec.",
    slug: "rose-safari",
    tags: ["Classic", "Lipstick"],
    gallery: ["https://picsum.photos/seed/b75yfac2/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 4,
    name: "SUMMER MIRAGE",
    category: "Lip Gloss",
    featured: true,
    price: 32.0,
    image: "https://picsum.photos/seed/3hfk9wna/800/600",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "summer-mirage",
    tags: ["Summer", "Limited"],
    gallery: ["https://picsum.photos/seed/guykcomh/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 5,
    name: "SUMMER DRAMA",
    category: "Lip Gloss",
    price: 32.0,
    image: "https://picsum.photos/seed/tb26kyod/800/600",
    featured: true,
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "summer-drama",
    tags: ["Drama", "Intense"],
    gallery: ["https://picsum.photos/seed/nkdcq032/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 6,
    name: "VELVET MATTE",
    category: "Lipstick",
    price: 18.0,
    image: "https://picsum.photos/seed/d7lerfam/800/600",
    featured: true,
    badge: "Sale",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "velvet-matte",
    tags: ["Matte", "Velvet"],
    gallery: ["https://picsum.photos/seed/ld99rdhi/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 7,
    name: "GLOW SERUM",
    category: "Skin Care",
    price: 45.0,
    image: "https://picsum.photos/seed/xcsztg31/800/600",
    featured: true,
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "glow-serum",
    tags: ["Serum", "Glow"],
    gallery: ["https://picsum.photos/seed/r5mp3ja9/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 8,
    name: "SILK FOUNDATION",
    category: "Skin Care",
    price: 38.0,
    image: "https://picsum.photos/seed/ypc496e3/800/600",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "silk-foundation",
    tags: ["Foundation", "Silk"],
    gallery: ["https://picsum.photos/seed/bmca8m8t/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured : true
  },
  {
    id: 9,
    name: "EYELASH CURLER",
    category: "Eye Care",
    featured: true,
    price: 12.0,
    image: "https://picsum.photos/seed/taftxpt2/800/600",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "eyelash-curler",
    tags: ["Tools", "Curler"],
    gallery: ["https://picsum.photos/seed/laf3ut2u/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 10,
    name: "BROW GEL",
    category: "Eye Care",
    price: 15.0,
    image: "https://picsum.photos/seed/b1jycqab/800/600",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "brow-gel",
    tags: ["Brows", "Gel"],
    gallery: ["https://picsum.photos/seed/koszir86/800/600","https://picsum.photos/seed/blf9bolx/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 11,
    name: "PEACH BLUSH",
    category: "Cheek",
    price: 22.0,
    featured: true,
    image: "https://picsum.photos/seed/fw4glpgp/800/600",
    badge: "Sale",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "peach-blush",
    tags: ["Blush", "Peach"],
    gallery: ["https://picsum.photos/seed/xn86y5ok/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
  {
    id: 12,
    name: "MATTE BRONZER",
    category: "Cheek",
    price: 28.0,
    image: "https://picsum.photos/seed/0ih1068n/800/600",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "matte-bronzer",
    tags: ["Bronzer", "Matte"],
    gallery: ["https://picsum.photos/seed/eky72tg1/800/600"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#"
  },
];
