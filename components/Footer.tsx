"use client";

import Link from "next/link";
import Image from "next/image";
import { footerData } from "@/public/datas/homepage";

export default function Footer() {
  const { contact, socials, center, newsletter } = footerData;

  return (
    <footer className="bg-[#FCF7EE] pt-20 lg:pb-10 ">
      <div className="l container ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-start">
          
          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium font-outfit text-black mb-8">Contact</h3>
            <div className="space-y-4  font-lato text-sm lg:text-base">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>{contact.email}</span>
              </div>
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <svg className="w-4 h-4 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="max-w-50 leading-relaxed">{contact.address}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
              {socials.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#EFE4D5] flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                >
                  {social.name === 'facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-3.134c0-2.508 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.043h2.773l-.443 3.667h-2.33v7.981h-2.724z"/></svg>
                  )}
                  {social.name === 'instagram' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.688.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  )}
                  {social.name === 'tiktok' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center">
            <Link href="/" className="relative w-48 h-22 block mb-6">
              <Image 
                src="/images/logo.png" 
                alt="LILAC" 
                fill 
                className="object-contain"
              />
            </Link>
            <p className=" font-lato text-sm lg:text-base text-center max-w-sm leading-relaxed mb-8">
              {center.description}
            </p>
            <div className="flex space-x-6 border-t border-gray-200 pt-6 px-10">
              {center.links.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm lg:text-base font-lato text-black hover:opacity-70">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6 text-center md:text-right">
            <h3 className="text-2xl font-medium font-outfit text-black mb-8">Newsletter</h3>
            <p className=" font-lato text-sm lg:text-base mb-6 leading-relaxed">
              {newsletter.description}
            </p>
            <div className="relative border-b border-gray-300 pb-2 flex items-center">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-transparent border-none outline-none w-full text-sm font-lato py-2 placeholder-gray-400"
              />
              <button className="bg-[#EFE4D5] p-3 ml-2 hover:bg-black hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/></svg>
              </button>
            </div>
            <p className="text-[12px]  font-lato tracking-tight pt-2">
              We do not spam. We send offers instead.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" pt-12 flex flex-col md:row items-center justify-between text-[12px] lg:text-sm  font-lato">
          <p>© 2026 Faria's. Powered by <a href="https://thebigdogdigital.com/" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">BigDog Digital</a>.</p>
        </div>
      </div>
    </footer>
  );
}
