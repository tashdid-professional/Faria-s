"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navLinks, socialLinks, topBarData } from "@/public/datas/homepage";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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
    <>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center px-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-black hover:rotate-90 transition-transform duration-300"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            
            <div className="w-full max-w-2xl">
              <p className="text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato text-center mb-8">
                What are you looking for?
              </p>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-black/10 py-4 text-2xl md:text-4xl font-outfit text-black placeholder:text-black/20 focus:outline-none focus:border-black transition-colors text-center"
                />
                <button 
                  type="submit"
                  className="absolute right-0 bottom-4 text-black hover:scale-110 transition-transform"
                >
                  <Search size={28} />
                </button>
              </form>
              <p className="text-[11px] text-gray-400 font-lato text-center mt-6 tracking-wider">
                Press Enter to search or click the icon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar - Homepage PC only (Not sticky) */}
      {isHomePage && (
        <div className="hidden lg:block bg-[#ECDEC2] py-2 text-center relative z-[60]">
          <p className="text-[11px] font-medium tracking-[0.2em] text-black uppercase font-lato">
            {topBarData.text}
          </p>
        </div>
      )}

      <header className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        isHomePage ? (isScrolled ? "top-0" : "lg:top-[37px] top-0") : "top-0"
      }`}>
        <nav
          className={`flex container items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? "bg-[#FCF7EE]/90 lg:py-2 py-4 shadow-sm" 
              : `bg-transparent py-6 ${!isScrolled && isHomePage ? "lg:pt-3" : ""}`
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
        <button 
          onClick={() => {
            setIsSearchOpen(true);
            setIsOpen(false); // Close mobile menu if open
          }}
          className="text-black hover:text-[#b6713e] transition-colors"
        >
          <Search size={20} />
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
    </nav>

    {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#FCF7EE] z-[60] flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
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
    </header>
    </>
  );
}


