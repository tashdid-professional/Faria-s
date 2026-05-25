"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { contactContent } from "@/public/datas/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: ""
  });

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

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <div className="relative z-10 text-center pt-20">
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4">
            {contactContent.header.title}
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">CONTACT</span>
          </nav>
        </div>
      </section>

      {/* Meet Us Section */}
      <section className="pb-24 bg-[#FCF7EE]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[16px]  tracking-[0.23em] text-[#202020] uppercase font-lato block mb-2">
              {contactContent.branch.subtitle}
            </span>
            <h2 className="text-4xl md:text-[43px] font-medium font-outfit text-black">
              {contactContent.branch.title}
            </h2>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-[#EBD9C1] p-10 md:p-14 text-center md:text-left flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <MapPin className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black max-w-[380px]">
                  {contactContent.branch.info.address}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <Phone className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black">
                  {contactContent.branch.info.phone}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <Mail className="text-black" size={24} />
                </div>
                <p className=" leading-relaxed  text-black">
                  {contactContent.branch.info.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center max-w-2xl mx-auto">
            <p className="text-[#202020] leading-loose  font-lato">
              {contactContent.branch.description}
            </p>
            <button className="mt-6 px-10 py-4 bg-[#EBD9C1] text-black font-medium text-[12px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pt-10 pb-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-[32px] font-medium font-outfit mb-12 text-black">
            {contactContent.form.title}
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
                {contactContent.form.buttonText}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
