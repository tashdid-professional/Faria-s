"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { faqData } from "@/public/datas/homepage";
import { motion, AnimatePresence } from "framer-motion";
import InstagramFeed from "@/components/InstagramFeed";

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Header - Same as Shop Page */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center pt-20"
        >
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4 ">
            FAQ
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">FAQ</span>
          </nav>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:pb-32 container  relative overflow-hidden">
        <div className="relative z-10">
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-26"
             >
                <h1 className="text-[12px] lg:text-[16px] tracking-[0.23em] text-[#202020] font-lato uppercase">GET YOUR ANSWERS</h1>
                <h2 className="text-4xl lg:text-[43px] font-bold font-outfit text-black">Common Queries</h2>
            </motion.div>
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-32">
           
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 space-y-12"
            >
              <div className="space-y-6">
                <p className="text-[12px] lg:text-[16px] tracking-[0.23em] text-[#202020] font-lato uppercase">
                  {faqData.subtitle}
                </p>
                <h2 className="text-4xl lg:text-[43px] font-bold font-outfit text-black leading-[1.1]">
                  {faqData.title}
                </h2>
              </div>

              <div className="space-y-0">
                {faqData.faqs.map((faq, index) => (
                  <motion.div 
                    key={faq.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-black/10 py-6 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-start text-left focus:outline-none group"
                    >
                      <span className="text-[18px] font-medium font-outfit text-black mr-4 mt-0.5">
                        {faq.id}.
                      </span>
                      <h3 className={`text-[20px]  font-medium font-outfit transition-colors ${openId === faq.id ? 'text-black' : 'text-black/80 hover:text-black'}`}>
                        {faq.question}
                      </h3>
                    </button>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-10 pt-4">
                            <p className="text-[#666666] leading-relaxed text-[16px] max-w-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[700px] w-full overflow-hidden shadow-2xl">
                <Image
                  src={faqData.image}
                  alt="FAQ Image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    <InstagramFeed/>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
