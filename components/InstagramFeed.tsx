"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getInstagramData } from "@/src/services/api";
import { InstagramData } from "@/src/types";
import { motion } from "framer-motion";

export default function InstagramFeed() {
  const [data, setData] = useState<InstagramData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instagramData = await getInstagramData();
        setData(instagramData);
      } catch (error) {
        console.error("Error fetching instagram data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const { subtitle, title, images } = data;

  // Double the images for a seamless loop
  const displayImages = [...images, ...images];

  return (
    <section className="py-24 bg-[#FCF7EE] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <p className="text-[16px] tracking-[0.23em] text-[#202020] mb-2 font-lato uppercase">
          {subtitle}
        </p>
        <h2 className="text-4xl lg:text-[43px] font-medium font-outfit text-black mb-12">
          {title}
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative group"
      >
        {/* Scroller Container */}
        <div className="flex w-max animate-scroll grayscale-50 hover:grayscale-0 transition-all duration-700">
          {displayImages.map((image, index) => (
            <Link
              key={`${image.id}-${index}`}
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-70 h-70 lg:w-100 lg:h-100 shrink-0 mx-3 overflow-hidden group/item"
            >
              <Image
                src={image.url}
                alt={`Instagram ${image.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover/item:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.688.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
