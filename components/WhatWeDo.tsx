"use client";

import Image from "next/image";
import { whatWeDoData } from "@/public/datas/homepage";

export default function WhatWeDo() {
  const { subtitle, title, leftImage, rightImage, testimonial } = whatWeDoData;

  return (
    <section className="bg-[#FCF7EE] py-20 lg:py-32 ">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column */}
          <div className="space-y-12">
            <div className="max-w-2xl">
              <p className="text-[10px] lg:text-[16px]  tracking-[0.23em]  mb-2 font-lato text-[#202020] uppercase">
                {subtitle}
              </p>
              <h2 className="text-3xl lg:text-[34px] font-medium font-outfit text-black leading-tight">
                {title}
              </h2>
            </div>
            
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <img
                src={leftImage}
                alt="Spa tools"
                className="w-full h-full object-cover pl-14"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12 lg:pt-24">
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={rightImage}
                alt="Facial treatment"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-md ml-auto lg:ml-0">
              <p className="text-[#202020] font-lato  leading-relaxed text-sm lg:text-base mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-[12px] lg:text-[16px]  tracking-[0.23em] text-black font-lato">
                - {testimonial.author}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
