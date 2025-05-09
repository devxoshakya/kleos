import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Essential Collection",
    description: " shampoo, conditioner, and body wash in elegant recyclable packaging.",
    image: "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    name: "Spa Collection",
    description: "Aromatherapy-infused bath products for a luxurious spa-like experience.",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ProductShowcase() {
  return (
    <section id="products" className="py-20 bg-neutral-lightest">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <motion.div 
          className="text-center mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Our  Collections</h2>
          <p className="text-neutral-medium mx-auto">
            Discover our curated selection of luxury toiletries designed to enhance your guests' stay and reflect your brand's commitment to quality.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              variants={itemVariants}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-neutral-medium mb-4">{product.description}</p>
                <a href="#contact" className="text-accent font-accent font-medium inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#contact">
            <Button className="bg-primary hover:bg-primary-light text-white font-accent font-medium px-8 py-6 h-auto">
              View Full Catalog
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
