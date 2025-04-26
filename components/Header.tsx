'use client';
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full bg-white bg-opacity-95 shadow-md z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            <span className="text-accent">Luxe</span>Amenities
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="font-accent text-sm font-medium hover:text-accent transition-colors">Home</a>
          <a href="#products" className="font-accent text-sm font-medium hover:text-accent transition-colors">Products</a>
          <a href="#how-it-works" className="font-accent text-sm font-medium hover:text-accent transition-colors">How It Works</a>
          <a href="#categories" className="font-accent text-sm font-medium hover:text-accent transition-colors">Categories</a>
          <a href="#testimonials" className="font-accent text-sm font-medium hover:text-accent transition-colors">Testimonials</a>
          <a href="#contact" className="font-accent text-sm font-medium hover:text-accent transition-colors">Contact</a>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-primary text-xl" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        
        <a href="#contact" className="hidden md:inline-block">
          <Button className="bg-accent hover:bg-accent-dark text-white font-accent font-medium">
            Request a Quote
          </Button>
        </a>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-inner">
          <nav className="flex flex-col space-y-3">
            <a href="#home" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">Home</a>
            <a href="#products" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">Products</a>
            <a href="#how-it-works" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">How It Works</a>
            <a href="#categories" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">Categories</a>
            <a href="#testimonials" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">Testimonials</a>
            <a href="#contact" onClick={handleLinkClick} className="font-accent text-sm font-medium hover:text-accent transition-colors">Contact</a>
            <a href="#contact" onClick={handleLinkClick} className="bg-accent text-white font-accent font-medium px-4 py-2 rounded-md text-center transition-colors">
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}