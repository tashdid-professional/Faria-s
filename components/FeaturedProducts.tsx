"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/public/datas/products";
import ProductCard from "./ProductCard";

// Helper to fix image paths if they point to old folder
const fixImagePath = (src: string) => {
  if (src.startsWith('/Images')) return src.replace('/Images', '/images');
  return src;
};

export default function FeaturedProductsSection() {
  // Get unique categories and add "All" at the beginning
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return unique.length > 0 ? unique : ["Uncategorized"];
  }, []);

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === activeCategory).slice(0, 4);
  }, [activeCategory]);

  return (
    <section className="py-24  bg-[#F2E9D4]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[16px] tracking-[0.23em] text-[#202020] mb-2 font-lato uppercase">
            PREMIUM BRANDS
          </p>
          <h2 className="text-4xl lg:text-[43px] font-medium font-outfit text-black mb-12">
            Featured Products
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 border flex items-center gap-2 ${
                activeCategory === cat
                  ? "bg-black border-black text-white"
                  : "bg-white border-white text-black hover:border-black/10"
              } shadow-sm`}
            >
              {activeCategory === cat && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
