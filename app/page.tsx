import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import ExperienceStats from "@/components/ExperienceStats";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhatWeDo from "@/components/WhatWeDo";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Banner />
      <WhatWeDo />
      <FeaturedProducts />
      <FeaturedBlogs />
      <ExperienceStats />
      <InstagramFeed />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
