"use client";

import Image from "next/image";
import { whatWeDoData } from "@/public/datas/homepage";
import { motion } from "framer-motion";

export default function WhatWeDo() {
  const { subtitle, title, leftImage, rightImage, testimonial } = whatWeDoData;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  } as const;

  const fadeInLeft = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeOut" }
  } as const;

  const fadeInRight = {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeOut" }
  } as const;

  return (
    <section className="bg-[#FCF7EE] py-20 lg:py-32 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column */}
          <div className="space-y-12">
            <motion.div 
              {...fadeInUp}
              className="max-w-2xl"
            >
              <p className="text-[10px] lg:text-[16px]  tracking-[0.23em]  mb-2 font-lato text-[#202020] uppercase">
                {subtitle}
              </p>
              <h2 className="text-3xl lg:text-[34px] font-medium font-outfit text-black leading-tight">
                {title}
              </h2>
            </motion.div>
            
            <motion.div 
              {...fadeInLeft}
              className="relative aspect-4/5 w-full overflow-hidden"
            >
              <img
                src={leftImage}
                alt="Spa tools"
                className="w-full h-full object-cover pl-14"
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12 lg:pt-24">
            <motion.div 
              {...fadeInRight}
              className="relative aspect-square w-full overflow-hidden"
            >
              <img
                src={rightImage}
                alt="Facial treatment"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="max-w-md ml-auto lg:ml-0"
            >
              <p className="text-[#202020] font-lato  leading-relaxed text-sm lg:text-base mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-[12px] lg:text-[16px]  tracking-[0.23em] text-black font-lato">
                - {testimonial.author}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
