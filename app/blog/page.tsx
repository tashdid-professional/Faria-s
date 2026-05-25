"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { blogs } from "@/public/datas/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Header - Same as Shop Page */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4 ">
            Blog
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">BLOG</span>
          </nav>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 lg:py-26 container mx-auto lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-y-20 gap-y-10">
          {currentBlogs.map((blog) => (
            <article key={blog.id} className="group flex flex-col space-y-6">
              {/* Image Container with Date Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Date Overlay */}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 shadow-sm">
                  <span className="text-[12px] font-bold tracking-widest uppercase font-lato text-black">
                     {blog.month} - {blog.day} - 2024
                  </span>
                </div>
              </div>

              {/* Blog Info */}
              <div className="space-y-4">
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-2xl lg:text-[26px] font-medium font-outfit text-black leading-tight hover:text-[#b6713e] transition-colors mb-3">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-[#666666] font-lato text-base leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link 
                  href={`/blog/${blog.slug}`}
                  className="inline-block text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato border-b border-black/10 hover:border-black transition-all pb-1 w-fit"
                >
                  READ MORE
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-12 h-12 flex items-center justify-center border border-black/10 rounded-full transition-colors ${
                currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-black hover:text-white"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all ${
                    currentPage === i + 1
                      ? "bg-black text-white border-black"
                      : "border-black/10 hover:border-black text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-12 h-12 flex items-center justify-center border border-black/10 rounded-full transition-colors ${
                currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-black hover:text-white"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
