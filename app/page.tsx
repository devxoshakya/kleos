import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductShowcase from '../components/ProductShowcase';
import HowItWorks from '../components/HowItWorks';
import ProductCategories from '../components/ProductCategories';
import Testimonials from '../components/Testimonials';
import PartnerBenefits from '../components/PartnerBenefits';
import ContactSection from '../components/ContactSection';

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
    </main>
  );
}