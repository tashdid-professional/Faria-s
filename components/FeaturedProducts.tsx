"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/src/services/api";
import { Product } from "@/src/types";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

// Helper to fix image paths if they point to old folder
const fixImagePath = (src: string) => {
  if (src.startsWith('/Images')) return src.replace('/Images', '/images');
  return src;
};

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get unique categories that HAVE featured products
  const categories = useMemo(() => {
    const featuredUnique = Array.from(new Set(
      products.filter(p => p.featured).map((p) => p.category)
    ));
    return featuredUnique.length > 0 ? featuredUnique : ["Uncategorized"];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("");

  // Set initial category once products are loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.featured && p.category === activeCategory)
      .slice(0, 4);
  }, [activeCategory, products]);

  if (loading) return (
    <div className="py-24 bg-[#F2E9D4] text-center">
      <div className="animate-pulse">Loading Featured Products...</div>
    </div>
  );

  return (
    <section className="py-24  bg-[#F2E9D4]">
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[16px] tracking-[0.23em] text-[#202020] mb-2 font-lato uppercase">
            PREMIUM BRANDS
          </p>
          <h2 className="text-4xl lg:text-[43px] font-medium font-outfit text-black mb-12">
            Featured Products
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
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
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={`${activeCategory}-${product.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
