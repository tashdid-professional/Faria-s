// Product related types
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
  variantType?: string;
  variants?: ProductVariant[];
  featured?: boolean;
}

// Blog related types
export interface Blog {
  id: number;
  slug: string;
  category: string;
  author: string;
  day: string;
  month: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

// Homepage related types
export interface BannerItem {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
}

export interface FooterData {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  socials: { name: string; href: string; icon: string }[];
  center: {
    logo: string;
    description: string;
    links: NavLink[];
  };
  newsletter: {
    description: string;
  };
}

export interface WhatWeDoData {
  subtitle: string;
  title: string;
  leftImage: string;
  rightImage: string;
  testimonial: {
    text: string;
    author: string;
  };
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface StatsData {
  subtitle: string;
  title: string;
  description: string;
  stats: StatItem[];
}

export interface InstagramItem {
  id: number;
  url: string;
  link: string;
}

export interface InstagramData {
  subtitle: string;
  title: string;
  images: InstagramItem[];
}

export interface ShopHeader {
  title: string;
  description: string;
  breadcrumb: string;
  image: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqData {
  subtitle: string;
  title: string;
  image: string;
  faqs: FaqItem[];
}

export interface TopBarData {
  text: string;
}

// About page types
export interface AboutData {
  header: {
    title: string;
    breadcrumb: NavLink[];
  };
  content: {
    subtitle: string;
    title: string;
    description: string;
    features: {
      id: number;
      title: string;
      description: string;
      icon: string;
    }[];
    buttonText: string;
    buttonLink: string;
    mainImage: string;
  };
}

// Contact page types
export interface ContactData {
  header: {
    title: string;
    subtitle: string;
  };
  branch: {
    subtitle: string;
    title: string;
    info: {
      address: string;
      phone: string;
      email: string;
    };
    description: string;
  };
  form: {
    title: string;
    buttonText: string;
  };
}
