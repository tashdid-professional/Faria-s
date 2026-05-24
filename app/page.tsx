import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Banner />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
