import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="pt-28 pb-20 md:pt-40 md:pb-32 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2 
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
           Amenities for <br className="hidden md:block" /> Exceptional Hospitality
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Elevate your guest experience with our luxury toiletry solutions sourced directly from  manufacturers.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#products">
            <Button className="bg-accent hover:bg-[#D97706] text-white font-accent font-medium px-8 py-6 h-auto">
              Explore Products
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="bg-white  hover:bg-neutral-light text-primary font-accent font-medium px-8 py-6 h-auto">
              Request a Quote
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
