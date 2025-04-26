import React from 'react';
import HeroSection from '../client/src/components/HeroSection';
import ProductShowcase from '../client/src/components/ProductShowcase';
import HowItWorks from '../client/src/components/HowItWorks';
import ProductCategories from '../client/src/components/ProductCategories';
import PartnerBenefits from '../client/src/components/PartnerBenefits';
import Testimonials from '../client/src/components/Testimonials';
import ContactSection from '../client/src/components/ContactSection';
import Footer from '../client/src/components/Footer';
import Header from '../client/src/components/Header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <HowItWorks />
      <ProductCategories />
      <Testimonials />
      <PartnerBenefits />
      <ContactSection />
      <Footer />
    </main>
  );
}