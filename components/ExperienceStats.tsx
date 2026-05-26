"use client";

import { useEffect, useState, useRef } from "react";
import { statsData } from "@/public/datas/homepage";
import { motion } from "framer-motion";

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Handle decimals
      const isDecimal = end % 1 !== 0;
      const currentCount = progress * end;
      
      setCount(isDecimal ? parseFloat(currentCount.toFixed(2)) : Math.floor(currentCount));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function ExperienceStats() {
  const { subtitle, title, description, stats } = statsData;

  return (
    <section className="relative py-24 lg:py-26 px-6 lg:px-24 overflow-hidden bg-[#F7EFE4]">
      {/* Background Floral Pattern Mockup */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-[10px] lg:text-[16px] tracking-[0.23em] text-[#202020] mb-2 font-lato uppercase">
            {subtitle}
          </p>
          <h2 className="text-4xl lg:text-[43px] font-medium font-outfit text-black mb-5 leading-tight">
            {title}
          </h2>
          <p className="text-[#202020] font-lato text-sm lg:text-base leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center w-full mb-4">
                {index !== 0 && (
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:block grow h-px bg-gray-300 mr-8" 
                  />
                )}
                <h3 className="text-4xl lg:text-[53px] font-bold font-lato text-black w-full lg:w-auto">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </h3>
                {index !== stats.length - 1 && (
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:block grow h-px bg-gray-300 ml-8" 
                  />
                )}
              </div>
              <p className="text-sm lg:text-[20px] font-medium font-outfit text-black tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
