import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Tag, Paintbrush, Truck, Headset } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: " Quality",
    description: "All our products are sourced from top manufacturers ensuring exceptional quality and guest satisfaction.",
    icon: Award
  },
  {
    id: 2,
    title: "Competitive Pricing",
    description: "Direct manufacturer relationships allow us to offer  products at competitive wholesale rates.",
    icon: Tag
  },
  {
    id: 3,
    title: "Custom Branding",
    description: "Personalize your toiletries with custom labels, packaging, and formulations to reflect your brand identity.",
    icon: Paintbrush
  },
  {
    id: 4,
    title: "Reliable Supply Chain",
    description: "Consistent inventory management and timely deliveries ensure you never run out of essential amenities.",
    icon: Truck
  },
  {
    id: 5,
    title: "Dedicated Support",
    description: "Personal account management and responsive customer service to address all your needs promptly.",
    icon: Headset
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function PartnerBenefits() {
  return (
    <section id="benefits" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
          <p className="opacity-80 max-w-2xl mx-auto">
            Discover the advantages of choosing LuxeAmenities as your dedicated toiletry supplier.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.id}
              className="bg-primary-light bg-opacity-20 rounded-lg p-6 hover:bg-opacity-30 transition-colors"
              variants={itemVariants}
            >
              <div className="mb-4 text-accent text-3xl">
                <benefit.icon size={32} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="opacity-80">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#contact">
            <Button className="bg-accent hover:bg-accent-dark text-white font-accent font-medium px-8 py-6 h-auto">
              Become a Partner
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
