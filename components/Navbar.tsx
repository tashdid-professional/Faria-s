"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, socialLinks } from "@/public/datas/homepage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex container items-center justify-between  transition-all duration-300 ${
        isScrolled ? "bg-[#FCF7EE]/90  lg:py-2 py-4 shadow-sm" : "bg-transparent py-6 container"
      }`}
    >
      
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="relative w-20 md:h-16 h-12 block">
          <Image 
            src="/images/logo.png" 
            alt="LILAC" 
            fill 
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-[12px] font-medium tracking-[2.3px] text-black hover:text-[#b6713e] transition-opacity font-lato "
          >
            {link.name.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Search Icon & Mobile Menu Toggle */}
      <div className="flex items-center space-x-4">
        <button className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#FCF7EE] z-60 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-black"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-2xl font-outfit font-medium tracking-[4px] text-black transition-all duration-500 delay-${index * 100} ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.name.toUpperCase()}
          </Link>
        ))}

        {/* Mobile Socials */}
        <div className={`flex space-x-6 pt-8 transition-all duration-700 delay-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}>
          <Link href={socialLinks.facebook} target="_blank" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <span className="text-[10px] font-bold">FB</span>
          </Link>
          <Link href={socialLinks.instagram} target="_blank" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <span className="text-[10px] font-bold">IG</span>
          </Link>
          <Link href={socialLinks.tiktok} target="_blank" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
            <span className="text-[10px] font-bold">TK</span>
          </Link>
        </div>
      </div>
      
    </nav>
  );
}


