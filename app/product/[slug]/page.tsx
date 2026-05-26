"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import { products } from "@/public/datas/products";
import { shopHeader } from "@/public/datas/homepage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [mainImage, setMainImage] = useState(product?.image || "");

  // Update image when product or variant changes
  React.useEffect(() => {
    if (product) {
      if (selectedVariant) {
        setMainImage(selectedVariant.image);
      } else {
        setMainImage(product.image);
      }
    }
  }, [product, selectedVariant]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-40 text-center">
          <h2 className="text-2xl tracking-[0.08em] uppercase">Product Not Found</h2>
          <Link href="/shop" className="mt-8 inline-block text-sm tracking-[0.08em] uppercase border-b border-black pb-1">Back to Shop</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const activeGallery = selectedVariant ? selectedVariant.gallery : product.gallery;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center pt-20"
        >
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4 ">
            Shop
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <Link href="/shop" className="hover:text-[#b6713e] transition-colors">SHOP</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">{product.name}</span>
          </nav>
        </motion.div>
      </section>

      <div className="container pb-16 md:pb-20 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full max-w-[450px] mx-auto md:mx-0 bg-[#f9e2bf] overflow-hidden">
              {product.oldPrice && (
                <div className="absolute top-4 left-4 w-12 h-12 bg-black rounded-full flex items-center justify-center z-20">
                  <span className="text-white text-xs md:text-[13px] font-bold">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </div>
              )}
              
              <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
              {product.badge && (
                <span className="absolute top-0 right-0 bg-[#f9e2bf] px-6 md:px-8 py-2 text-[10px] md:text-xs font-serif italic tracking-[0.08em] z-10">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {activeGallery.map((img, idx) => (
                <div 
                  key={idx}
                  className={`relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 cursor-pointer border transition-all ${mainImage === img ? 'border-[#d4b1a4]' : 'border-transparent'}`}
                  onClick={() => setMainImage(img)}
                >
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-start max-w-lg"
          >
            <h1 className="text-3xl md:text-[32px] tracking-normal text-black mb-6 font-bold font-outfit">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 md:mb-8 font-serif">
              {product.oldPrice && (
                <span className="font-lato text-[#999] line-through text-lg md:text-xl">
                  ৳ {product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className="font-lato text-black text-xl md:text-[20px]">
                ৳ {product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-[#202020] font-sans text-base  leading-relaxed mb-8 md:mb-10 whitespace-pre-line">
              {product.description}
            </p>

            {/* Variants / Dynamic Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 md:mb-10">
                <span className="text-[12px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold block mb-4">
                  {product.variantType || "Choose Option"}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2.5 border text-[11px] md:text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                        selectedVariant?.name === variant.name
                          ? "bg-[#FCF7EE] border-[#DED0B9] text-black"
                          : "border-neutral-300 text-neutral-500 hover:border-[#DED0B9] hover:bg-[#FCF7EE] hover:text-black"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase */}
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <a 
                href={product.purchaseLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-14 bg-black border border-black text-white h-14 flex items-center justify-center text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-[#FCF7EE] hover:border-[#DED0B9] hover:text-black transition-all duration-500 font-lato"
              >
                Purchase Now
              </a>
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-6 md:pt-8 border-t border-[#eee]">
              <p className="text-[11px] md:text-[13px] tracking-[0.08em]  text-black font-semibold">
                Categories: <span className="font-normal text-[#777] ml-2">{product.category}</span>
              </p>
              <p className="text-[11px] md:text-[13px] tracking-[0.08em]  text-black font-semibold">
                Tags: <span className="font-normal text-[#777] ml-2">{product.tags.join(", ")}</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-12"
        >
          <div className="flex flex-wrap justify-start gap-4 mb-2">
            <button 
              onClick={() => setActiveTab("description")}
              className={`flex-1 md:flex-none px-8 md:px-10 py-3.5 text-[11px] md:text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-300 border ${
                activeTab === 'description' 
                ? 'bg-[#FCF7EE] border-[#DED0B9] text-black' 
                : 'text-neutral-500 border-neutral-300 hover:border-[#DED0B9] hover:bg-[#FCF7EE] hover:text-black'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("videos")}
              className={`flex-1 md:flex-none px-8 md:px-10 py-3.5 text-[11px] md:text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-300 border ${
                activeTab === 'videos' 
                ? 'bg-[#FCF7EE] border-[#DED0B9] text-black' 
                : 'text-neutral-500 border-neutral-300 hover:border-[#DED0B9] hover:bg-[#FCF7EE] hover:text-black'
              }`}
            >
              Videos
            </button>
          </div>

          <div className="py-8 md:py-12">
            {activeTab === "description" ? (
              <div className="animate-fadeIn">
                <p className="text-[#202020] font-lato text-base md:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fadeIn">
                {product.videos.map((vidId, idx) => (
                  <div key={idx} className="relative aspect-video rounded-sm overflow-hidden bg-neutral-100 ring-1 ring-black/5">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube-nocookie.com/embed/${vidId}`}
                      title={`Product Video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    ></iframe>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-center text-[44px] tracking-normal  mb-6 md:mb-10 font-medium font-outfit">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
