"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the loading screen once the window is fully loaded
    const handleLoad = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => setIsVisible(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback: hide after 3 seconds in case something blocks 'load' event
    const timeout = setTimeout(() => setIsVisible(false), 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FCF7EE]"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="relative w-40 h-24 mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="LILAC"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Loading Bar */}
          <div className="w-32 h-[1px] bg-black/5 relative overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 bottom-0 w-full bg-black/40"
            />
          </div>
          
          <p className="mt-4 text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase font-lato">
            Cultivating Beauty
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
