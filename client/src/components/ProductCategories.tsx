import { motion } from "framer-motion";
import { Check, ArrowRight, ShowerHead, HandHelping, Torus } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Bath & ShowerHead",
    description: "Shampoo, conditioner, body wash, and soap in various sizes and formulations.",
    icon: ShowerHead,
    features: [
      "Signature fragrances",
      "Eco-friendly options",
      "Luxury formulations"
    ]
  },
  {
    id: 2,
    title: "Skincare",
    description: "Moisturizers, hand lotions, and specialty skincare products for guest comfort.",
    icon: HandHelping,
    features: [
      "Hypoallergenic formulas",
      "Nourishing ingredients",
      "Luxury presentation"
    ]
  },
  {
    id: 3,
    title: "Oral Care",
    description: "Toothbrushes, toothpaste, and mouthwash kits for complete guest amenities.",
    icon: Torus,
    features: [
      "Individually packaged",
      "Biodegradable options",
      " quality"
    ]
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

export default function ProductCategories() {
  return (
    <section id="categories" className="py-20 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Product Categories</h2>
          <p className="text-neutral-medium max-w-2xl mx-auto">
            Browse our comprehensive range of hotel amenities designed for different property types and guest expectations.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group p-6"
              variants={itemVariants}
            >
              <div className="mb-4 text-secondary text-4xl">
                <category.icon size={40} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-neutral-medium mb-4">{category.description}</p>
              <ul className="space-y-2 mb-6">
                {category.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="text-accent font-accent font-medium inline-flex items-center group">
                View products <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
