"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs } from "@/src/services/api";
import { Blog } from "@/src/types";
import { motion } from "framer-motion";

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await getBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  // Get 3 featured blogs
  const featured = blogs.filter(blog => blog.isFeatured).slice(0, 3);

  return (
    <section className="bg-[#FAF7F2] py-20 lg:py-32 ">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[10px] lg:text-[16px]  tracking-[0.3em] text-[#202020] mb-2 font-lato uppercase">
            Latest
          </p>
          <h2 className="text-4xl lg:text-[43px] font-medium font-outfit text-black leading-tight">
            News & Blogs
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((blog, index) => (
            <motion.div 
              key={blog.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden mb-8">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-[115%] h-full max-w-none object-cover transition-transform duration-700 group-hover:-translate-x-[12%]"
                />
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-[10px] font-bold tracking-widest text-black font-lato uppercase">
                    {blog.month} - {blog.day} - 2026
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl lg:text-2xl font-medium font-outfit text-black leading-snug group-hover:text-[#b6713e] transition-colors">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title.charAt(0).toUpperCase() + blog.title.slice(1).toLowerCase()}
                  </Link>
                </h3>
                <p className="text-gray-600 font-lato text-sm line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block text-[11px] font-bold tracking-[0.2em] text-black border-b border-black pb-1 hover:text-[#b6713e] hover:border-[#b6713e] transition-all font-lato uppercase"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
