"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogs } from "@/public/datas/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const blogIndex = blogs.findIndex((b) => b.slug === slug);
  const blog = blogs[blogIndex];
  const prevBlog = blogIndex > 0 ? blogs[blogIndex - 1] : null;
  const nextBlog = blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-[#ef4626] border-b border-[#ef4626] pb-1 uppercase tracking-widest text-[12px] font-bold">Back to News</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Header - Same as Shop Page */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-4xl md:text-[50px] font-bold font-outfit text-black mb-4 uppercase">
            {blog.title}
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <Link href="/blog" className="hover:text-[#b6713e] transition-colors">BLOG</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50 truncate max-w-[200px]">{blog.slug}</span>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-32 container pt-20">
        <div className=" flex flex-col lg:flex-row gap-16">
          
         

          {/* Main Content */}
          <div className="w-full  order-1 lg:order-2">
            <div className="relative aspect-video overflow-hidden mb-8 bg-neutral-50">
              <Image
                src={blog.image.startsWith('/') ? (blog.image.startsWith('/Images') ? blog.image.replace('/Images', '/images') : blog.image) : blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Author, Date, and Category Section */}
            <div className="  mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                {/* Author Info */}
                <div className="flex flex-col">
                  <span className="text-[12px] text-gray-500 font-lato mb-1">Written by</span>
                  <span className="text-[16px] font-bold text-black font-outfit lowercase tracking-tight">
                    {blog.author}
                  </span>
                </div>

                {/* Date with lines */}
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-gray-300"></div>
                  <span className="text-[14px] font-bold text-black font-lato uppercase tracking-[0.1em]">
                    {blog.month} - {blog.day} - 2024
                  </span>
                  <div className="h-[1px] w-8 bg-gray-300"></div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="h-[1px] w-full bg-gray-200 mt-8 mb-6"></div>

              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#EFE4D5] text-black px-6 py-2 text-[12px] font-bold tracking-[0.15em] font-lato uppercase">
                  {blog.category}
                </span>
                <span className="bg-[#EFE4D5] text-black px-6 py-2 text-[12px] font-bold tracking-[0.15em] font-lato uppercase">
                  BEAUTY
                </span>
              </div>
            </div>

            <div className="">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit text-black mb-4 leading-tight uppercase">
                {blog.title}
              </h1>
            </div>

            <div className="prose prose-neutral max-w-none">
              <p className="text-[#202020] text-[16px]  leading-[1.8] mb-8">
                {blog.description}
              </p>
              
              {/* This space is for future-proofing with more content if needed */}
              <div className="mt-12 pt-12 border-t border-neutral-100 hidden">
                 <div className="flex items-center gap-4">
                    <span className="text-[12px] font-bold uppercase tracking-widest">Tags:</span>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-neutral-100 text-[10px] uppercase font-bold tracking-tighter text-neutral-500">{blog.category}</span>
                       <span className="px-3 py-1 bg-neutral-100 text-[10px] uppercase font-bold tracking-tighter text-neutral-500">Beauty</span>
                    </div>
                 </div>
              </div>

              
            </div>

            {/* Newsletter/Navigation Section */}
            <div className="mt-20 border border-black/10 flex flex-col md:flex-row bg-[#FCF7EE]">
              {/* Previous Story */}
              <div className="flex-1 p-8 md:p-12 md:border-r border-black/10 flex items-center justify-between group transition-colors hover:bg-[#EFE4D5]">
                <div className="flex flex-col space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-lato">
                    PREVIOUS STORY
                  </span>
                  {prevBlog ? (
                    <Link href={`/blog/${prevBlog.slug}`}>
                      <h4 className="text-[18px] md:text-[20px] font-bold font-outfit text-black leading-tight group-hover:text-[#b6713e] transition-colors">
                        {prevBlog.title}
                      </h4>
                    </Link>
                  ) : (
                    <h4 className="text-[18px] font-bold font-outfit text-black">
                      No story to show!
                    </h4>
                  )}
                </div>
                {prevBlog && (
                  <div className="hidden sm:block relative w-16 h-16 shrink-0 ml-4 overflow-hidden rounded-sm">
                    <Image
                      src={prevBlog.image}
                      alt={prevBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Next Story */}
              <div className="flex-1 p-8 md:p-12 text-right flex items-center justify-between group transition-colors hover:bg-[#EFE4D5]">
                {nextBlog && (
                  <div className="hidden sm:block relative w-16 h-16 shrink-0 mr-4 overflow-hidden rounded-sm text-left">
                    <Image
                      src={nextBlog.image}
                      alt={nextBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-2 flex-grow">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase font-lato">
                    NEXT STORY
                  </span>
                  {nextBlog ? (
                    <Link href={`/blog/${nextBlog.slug}`}>
                      <h4 className="text-[18px] md:text-[20px] font-bold font-outfit text-black leading-tight group-hover:text-[#b6713e] transition-colors">
                        {nextBlog.title}
                      </h4>
                    </Link>
                  ) : (
                    <h4 className="text-[18px] font-bold font-outfit text-black">
                      No story to show!
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
