import Image from "next/image";
import Link from "next/link";
import { aboutData } from "@/public/datas/about";
import { Beaker, ShieldCheck, ClipboardCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ExperienceStats from "@/components/ExperienceStats";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import * as motion from "framer-motion/client";

export default function AboutPage() {
  const { header, content } = aboutData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "formula":
        return <Beaker className="w-8 h-8 text-[#b6713e]" strokeWidth={1} />;
      case "manufactured":
        return <ShieldCheck className="w-8 h-8 text-[#b6713e]" strokeWidth={1} />;
      case "quality":
        return <ClipboardCheck className="w-8 h-8 text-[#b6713e]" strokeWidth={1} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Header */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-[#FCF7EE]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center pt-20"
        >
          <h1 className="text-6xl md:text-[60px] font-bold font-outfit text-black mb-4 ">
            {header.title}
          </h1>
          <nav className="flex items-center justify-center space-x-3 text-[12px] font-bold tracking-[0.2em] text-black uppercase font-lato">
            <Link href="/" className="hover:text-[#b6713e] transition-colors">HOME</Link>
            <span className="text-[#b6713e]">♦</span>
            <span className="opacity-50">ABOUT</span>
          </nav>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 container ">
        <div className=" flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
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
                {content.subtitle}
              </p>
              <h2 className="text-4xl lg:text-[34px] font-medium font-outfit text-black leading-[1.1]">
                {content.title}
              </h2>
              <p className="text-[#202020] font-lato text-base leading-relaxed max-w-lg">
                {content.description}
              </p>
            </div>

            <div className="space-y-10">
              {content.features.map((feature, index) => (
                <motion.div 
                  key={feature.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="shrink-0 pt-1">
                    {getIcon(feature.icon)}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium font-outfit text-black">
                      {feature.title}
                    </h3>
                    <p className="text-[#202020] font-lato text-[16px] leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={content.buttonLink}
                className="inline-block bg-[#EFE4D5] text-black px-10 py-3 text-[12px]  tracking-[0.13em] hover:bg-black hover:text-white transition-all font-lato uppercase"
              >
                {content.buttonText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image with Offset Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-end"
          >
            {/* Decorative Offset Frame */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute top-[40px] right-[40px] w-full h-full border-[10px] border-[#EFE4D5] z-0 pointer-events-none" 
            />
            
            {/* Main Image */}
            <div className="relative z-10 aspect-[4/3] w-full max-w-[600px] overflow-hidden shadow-2xl">
              <Image
                src={content.mainImage}
                alt="Daily Essentials"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>
      <ExperienceStats/>
      <FeaturedBlogs/>
      <Footer />
      <ScrollToTop />
    </main>
  );
}

