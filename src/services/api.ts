import { 
  Product, 
  Blog, 
  BannerItem, 
  AboutData, 
  ContactData, 
  FooterData,
  WhatWeDoData,
  StatsData,
  InstagramData,
  FaqData,
  ShopHeader,
  TopBarData,
  NavLink,
  SocialLinks
} from '../types';

// Mock data imports
import { products } from '@/public/datas/products';
import { blogs } from '@/public/datas/blogs';
import { 
  bannerData, 
  footerData, 
  whatWeDoData, 
  statsData, 
  instagramData, 
  faqData, 
  shopHeader, 
  topBarData,
  navLinks,
  socialLinks
} from '@/public/datas/homepage';
import { aboutData } from '@/public/datas/about';
import { contactContent } from '@/public/datas/contact';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * PRODUCTS SERVICE
 */
export async function getProducts(): Promise<Product[]> {
  // Real implementation example:
  /*
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
  */
  return Promise.resolve(products);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  /*
  const res = await fetch(`${API_URL}/products/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
  */
  return Promise.resolve(products.find(p => p.slug === slug));
}

/**
 * BLOGS SERVICE
 */
export async function getBlogs(): Promise<Blog[]> {
  /*
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
  */
  return Promise.resolve(blogs);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  /*
  const res = await fetch(`${API_URL}/blogs/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
  */
  return Promise.resolve(blogs.find(b => b.slug === slug));
}

/**
 * HOMEPAGE / CONTENT SERVICE
 */
export async function getBannerData(): Promise<BannerItem[]> {
  /*
  const res = await fetch(`${API_URL}/homepage/banner`);
  return res.json();
  */
  return Promise.resolve(bannerData);
}

export async function getWhatWeDoData(): Promise<WhatWeDoData> {
  return Promise.resolve(whatWeDoData);
}

export async function getStatsData(): Promise<StatsData> {
  return Promise.resolve(statsData);
}

export async function getInstagramData(): Promise<InstagramData> {
  return Promise.resolve(instagramData);
}

export async function getFaqData(): Promise<FaqData> {
  return Promise.resolve(faqData);
}

export async function getShopHeader(): Promise<ShopHeader> {
  return Promise.resolve(shopHeader);
}

export async function getTopBarData(): Promise<TopBarData> {
  return Promise.resolve(topBarData);
}

export async function getNavLinks(): Promise<NavLink[]> {
  return Promise.resolve(navLinks);
}

export async function getSocialLinks(): Promise<SocialLinks> {
  return Promise.resolve(socialLinks);
}

/**
 * PAGE SPECIFIC DATA
 */
export async function getAboutData(): Promise<AboutData> {
  return Promise.resolve(aboutData);
}

export async function getContactData(): Promise<ContactData> {
  return Promise.resolve(contactContent as ContactData);
}

export async function getFooterData(): Promise<FooterData> {
  return Promise.resolve(footerData);
}
