"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { bannerData } from "@/public/datas/homepage";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {bannerData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center container ">
            <p className="text-xs lg:text-base font-lato  tracking-[2.3px]  mb-4 animate-fadeIn text-[#202020]">
              {slide.subtitle}
            </p>
            <h1 className="text-4xl lg:text-[43px] font-outfit font-medium text-black mb-6 leading-tight animate-fadeIn">
              {slide.title}
            </h1>
            <p className="text-sm lg:text-base text-[#202020]  mb-10 leading-relaxed font-lato animate-fadeIn animation-delay-300 max-w-2xl">
              {slide.description}
            </p>
            <div className="animate-fadeIn animation-delay-500">
              <Link
                href={slide.buttonLink}
                className="inline-block px-8 py-4 border border-black text-xs font-lato  tracking-widest text-black hover:bg-black hover:text-white transition-all duration-500"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-black w-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
