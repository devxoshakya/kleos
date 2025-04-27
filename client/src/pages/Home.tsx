import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import ProductCategories from "@/components/ProductCategories";
import PartnerBenefits from "@/components/PartnerBenefits";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Set page title
  useEffect(() => {
    document.title = "Kleaos Life Sciences |  Hospitality Supplies";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductShowcase />
        <HowItWorks />
        <ProductCategories />
        <PartnerBenefits />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
