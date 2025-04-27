import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <Logo color="white" size="md" />
            </div>
            <p className="opacity-80 mb-4">
              Elevating hospitality experiences with premium toiletries sourced directly from manufacturers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#products" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Products</a></li>
              <li><a href="#how-it-works" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Categories</a></li>
              <li><a href="#testimonials" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Bath & Shower</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Skincare</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Oral Care</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Room Fragrances</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Guest Amenities</a></li>
              <li><a href="#categories" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Eco-Friendly Line</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="opacity-80 mt-1 mr-3">📍</span>
                <span className="opacity-80">20, Vidya Nagar, Ambala Cantt, Haryana, 133004</span>
              </li>
              <li className="flex items-center">
                <span className="opacity-80 mr-3">📞</span>
                <span className="opacity-80">+91-7056267847</span>
              </li>
              <li className="flex items-center">
                <span className="opacity-80 mr-3">✉️</span>
                <span className="opacity-80">info@kleaos.com</span>
              </li>
              <li className="flex items-center">
                <span className="opacity-80 mr-3">🕒</span>
                <span className="opacity-80">Mon-Fri: 9AM-5PM IST</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-light pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Kleaos Life Sciences. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
