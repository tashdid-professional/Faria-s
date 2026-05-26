"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid, List, ChevronDown, Plus, ChevronLeft, X } from "lucide-react";
import { products } from "@/public/datas/products";
import ProductCard from "@/components/ProductCard";
import { shopHeader } from "@/public/datas/homepage";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchBarQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category");
  
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortOrder, setSortOrder] = useState<string>("a-z");
  const [searchQuery, setSearchQuery] = useState(searchBarQuery);

  // Sync state with URL parameter if it changes
  React.useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(searchBarQuery);
    setCurrentPage(1);
  }, [categoryParam, searchBarQuery]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 9; // 3 rows * 3 columns on desktop
  // Filter products by search and category
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("search", val);
    else params.delete("search");
    
    // Use push instead of reload for better UX
    window.history.pushState(null, "", `?${params.toString()}`);
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  
  // Extract unique categories and their counts
  const categories = Array.from(new Set(products.map(p => p.category))).map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  }));

  const bannerCategories = ["Face", "Hair Styling", "Lips", "Skincare"];

  return (
    <main className="bg-white min-h-screen">
      <Navbar/>
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
            <span className="opacity-50">SHOP</span>
          </nav>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 container lg:py-24">        
        {searchBarQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-6 bg-neutral-50 border border-neutral-100 flex items-center justify-between"
          >
            <p className="text-black text-[15px]">
              Showing results for <span className="font-bold underline underline-offset-4 decoration-black/20">"{searchBarQuery}"</span>
              <span className="text-neutral-400 ml-2">({filteredProducts.length} items found)</span>
            </p>
            <Link 
              href="/shop" 
              className="text-[12px] font-bold uppercase tracking-widest text-[#ef4626] hover:opacity-70 transition-opacity"
            >
              Clear Search
            </Link>
          </motion.div>
        )}        

        <div className=" mx-auto flex flex-col lg:flex-row gap-12 relative lg:static">
          
          {/* Mobile Sticky Toggle Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40"
          >
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#FCF7EE] text-black py-6 px-2.5  shadow-2xl flex flex-col items-center gap-3 active:scale-95 transition-all group"
            >
              <List size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] transform rotate-180 [writing-mode:vertical-lr]">
                Categories
              </span>
            </button>
          </motion.div>

          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/40 z-90 lg:hidden"
                />
                <motion.aside 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[80%] max-w-75 bg-white z-100 lg:hidden p-8 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-100">
                    <h4 className="text-[12px] font-semibold uppercase tracking-widest">
                      Categories
                    </h4>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:rotate-90 transition-transform duration-300">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <ul className="space-y-6 overflow-y-auto">
                    <li 
                      onClick={() => handleCategorySelect(null)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3.5 h-3.5 border transition-colors ${selectedCategory === null ? "bg-black border-black" : "border-neutral-300"}`} />
                        <span className={`text-[13px] font-medium ${selectedCategory === null ? "text-black" : "text-neutral-600"}`}>All Products</span>
                      </div>
                      <span className="text-[12px] text-neutral-400">({products.length})</span>
                    </li>
                    {categories.map((cat) => (
                      <li 
                        key={cat.name} 
                        onClick={() => handleCategorySelect(cat.name)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3.5 h-3.5 border transition-colors ${selectedCategory === cat.name ? "bg-black border-black" : "border-neutral-300"}`} />
                          <span className={`text-[13px] font-medium ${selectedCategory === cat.name ? "text-black" : "text-neutral-600"}`}>{cat.name}</span>
                        </div>
                        <span className="text-[12px] text-neutral-400">({cat.count})</span>
                      </li>
                    ))}
                  </ul>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Sidebar - Desktop Only */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block lg:w-1/4 space-y-12"
          >
            <div className=" space-y-8">
              
              {/* Search Product Widget */}
              <div className="border border-[#DED0B9] p-6">
                <div className="bg-[#FAF4EB] py-3.5 px-6 -mx-6 -mt-6 mb-8">
                  <h4 className="font-outfit font-medium text-[20px] text-black">Search Product</h4>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e.currentTarget.value);
                      }
                    }}
                    className="w-full border border-neutral-300 px-5 py-4 text-[14px] outline-none focus:border-black transition-colors bg-white pr-12 font-lato"
                  />
                  <div 
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => handleSearch(searchQuery)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Product Categories Widget */}
              <div className="border border-[#DED0B9] p-6">
                <div className="bg-[#FAF4EB] py-3.5 px-6 -mx-6 -mt-6 mb-8">
                  <h4 className="font-outfit font-medium text-[20px] text-black">Product categories</h4>
                </div>
                <ul className="space-y-6">
                  <li 
                    onClick={() => handleCategorySelect(null)}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <span className={`text-[16px] transition-colors  font-outfit ${selectedCategory === null ? "text-[#b6713e]" : "text-black group-hover:text-[#b6713e]"}`}>All Products</span>
                    <span className="text-[16px] text-black font-lato">({products.length})</span>
                  </li>
                  {categories.map((cat) => (
                    <li 
                      key={cat.name} 
                      onClick={() => handleCategorySelect(cat.name)}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <span className={`text-[16px] transition-colors  font-outfit ${selectedCategory === cat.name ? "text-[#b6713e]" : "text-black group-hover:text-[#b6713e]"}`}>{cat.name}</span>
                      <span className="text-[16px] text-black font-lato">({cat.count})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/4"
          >
            
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="flex items-center">
                <button 
                  onClick={() => setViewType("grid")}
                  className={`border border-neutral-200 p-2.5 transition-colors ${viewType === "grid" ? "bg-[#f8f8f8] text-black" : "text-neutral-400 hover:text-black"}`}
                >
                  <LayoutGrid size={18} />
                </button>
               
              </div>

              <div className="relative w-full md:w-auto min-w-55">
                <select 
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none border border-neutral-200 px-5 py-2.5 text-[13px] outline-none focus:border-black transition-colors bg-white pr-10 text-neutral-600 cursor-pointer"
                >
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="low-high">Price, low to high</option>
                  <option value="high-low">Price, high to low</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-11 h-11 border border-neutral-300 flex items-center justify-center text-neutral-400 hover:bg-[#FCF7EE] hover:text-black hover:border-[#DED0B9] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-300"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-11 h-11 border text-[13px] font-bold transition-all duration-300 ${
                      currentPage === i + 1 
                      ? "bg-[#FCF7EE] border-[#DED0B9] text-black" 
                      : "border-neutral-300 text-neutral-600 hover:bg-[#FCF7EE] hover:border-[#DED0B9] "
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 border border-neutral-300 flex items-center justify-center text-neutral-400 hover:bg-[#FCF7EE] hover:text-black hover:border-[#DED0B9] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-neutral-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-white text-black font-serif text-2xl animate-pulse uppercase tracking-[0.2em]">
        Loading Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
