'use client';
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const steps = [
  {
    step: 1,
    title: "Consultation",
    description: "Schedule a consultation to discuss your needs and brand requirements."
  },
  {
    step: 2,
    title: "Product Selection",
    description: "Choose from our premium collections or customize to your specifications."
  },
  {
    step: 3,
    title: "Sampling",
    description: "Receive product samples to evaluate quality and guest experience."
  },
  {
    step: 4,
    title: "Order & Delivery",
    description: "Place your order and receive timely delivery to your properties."
  },
  {
    step: 5,
    title: "Ongoing Support",
    description: "Enjoy continuous support and easy reordering for your business."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-neutral-medium max-w-2xl mx-auto">
            Our streamlined process makes it easy to source premium toiletries for your hospitality business.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Connected line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-neutral-light -translate-y-1/2 z-0"></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {steps.map((step) => (
              <motion.div 
                key={step.step}
                className="flex flex-col items-center text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5
                    }
                  }
                }}
              >
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4 lg:mb-6">
                  {step.step}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-medium">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#contact">
            <Button className="bg-accent hover:bg-accent-dark text-white font-accent font-medium px-8 py-6 h-auto">
              Start the Process
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}