"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getContactData } from "@/src/services/api";
import { ContactData } from "@/src/types";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData = await getContactData();
        setData(contactData);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ready for backend connectivity
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ firstName: "", lastName: "", email: "", mobile: "", message: "" });
  };

  if (!data) return null;

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center pt-20"
        >
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4">
            {data.header.title}
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">CONTACT</span>
          </nav>
        </motion.div>
      </section>

      {/* Meet Us Section */}
      <section className="pb-24 pt-16 bg-[#FCF7EE]/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-[16px]  tracking-[0.23em] text-[#202020] uppercase font-lato block mb-2">
              {data.branch.subtitle}
            </span>
            <h2 className="text-4xl md:text-[43px] font-medium font-outfit text-black">
              {data.branch.title}
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-[#EBD9C1] p-10 md:p-14 text-center md:text-left flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <MapPin className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black max-w-[380px]">
                  {data.branch.info.address}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <Phone className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black">
                  {data.branch.info.phone}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <Mail className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black">
                  {data.branch.info.email}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-center max-w-2xl mx-auto"
          >
            <p className="text-[#202020] leading-loose  font-lato">
              {data.branch.description}
            </p>
            <button className="mt-6 px-10 py-4 bg-[#EBD9C1] text-black font-medium text-[12px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300">
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pt-10 pb-24 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <h2 className="text-[32px] font-medium font-outfit mb-12 text-black">
            {data.form.title}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Inputs */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-[#FCF7EE]/30 border border-neutral-200 px-6 py-3 text-[14px] focus:outline-none focus:border-[#DED0B9] transition-colors"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-[#FCF7EE]/30 border border-neutral-200 px-6 py-3 text-[14px] focus:outline-none focus:border-[#DED0B9] transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#FCF7EE]/30 border border-neutral-200 px-6 py-3 text-[14px] focus:outline-none focus:border-[#DED0B9] transition-colors"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-[#FCF7EE]/30 border border-neutral-200 px-6 py-3 text-[14px] focus:outline-none focus:border-[#DED0B9] transition-colors"
              />
            </div>

            {/* Message Area */}
            <div className="lg:col-span-5 lg:row-span-2">
              <textarea
                name="message"
                placeholder="Message"
                rows={8}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full h-full min-h-[200px] bg-[#FCF7EE]/30 border border-neutral-200 px-6 py-3 text-[14px] focus:outline-none focus:border-[#DED0B9] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-7">
              <button
                type="submit"
                className="w-full py-6 bg-[#EBD9C1] text-black font-bold text-[12px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300"
              >
                {data.form.buttonText}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
