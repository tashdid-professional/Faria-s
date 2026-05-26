"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { bannerData } from "@/public/datas/homepage";
import { motion, AnimatePresence } from "framer-motion";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right-to-left, -1 for left-to-right

  const paginate = (newIndex: number) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Toggle direction each time for alternating "one from right, another from left" effect
      setDirection(currentSlide % 2 === 0 ? 1 : -1);
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  return (
    <div className="relative h-[120vh] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bannerData[currentSlide].backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center container ">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs lg:text-base font-lato  tracking-[2.3px]  mb-4 text-[#202020] uppercase"
            >
              {bannerData[currentSlide].subtitle}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl lg:text-[43px] font-outfit font-medium text-black mb-6 leading-tight"
            >
              {bannerData[currentSlide].title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm lg:text-base text-[#202020]  mb-10 leading-relaxed font-lato max-w-2xl"
            >
              {bannerData[currentSlide].description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link
                href={bannerData[currentSlide].buttonLink}
                className="inline-block px-8 py-3 border border-black text-xs font-lato  tracking-widest text-black hover:bg-black hover:text-white transition-all duration-500"
              >
                {bannerData[currentSlide].buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-black w-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
