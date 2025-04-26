import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emma Richardson",
    role: "General Manager, Coastal Retreat Hotel",
    quote: "LuxeAmenities has transformed our guest experience. The quality of their products and attention to detail in custom branding has made our boutique hotel stand out among competitors.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stars: 5
  },
  {
    id: 2,
    name: "David Martinez",
    role: "Operations Director, GreenStay Hotels",
    quote: "The eco-friendly collection has been a game-changer for our sustainability initiatives. Our guests frequently comment on the quality and our environmental commitment.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stars: 5
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Procurement Manager, Luxury Suites Group",
    quote: "The consistent quality and reliable delivery have made LuxeAmenities an invaluable partner for our hotel chain. Their customer service is exceptional and responsive.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stars: 4.5
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Owner, The Parkview Boutique Hotel",
    quote: "We've received countless compliments from guests about our bathroom amenities since partnering with LuxeAmenities. The custom scents have become part of our brand identity.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    stars: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(100);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update slide width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideWidth(33.333);
      } else {
        setSlideWidth(100);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Navigate carousel
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-accent text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-accent" />
          <Star className="absolute top-0 left-0 fill-accent text-accent overflow-hidden w-[50%]" />
        </div>
      );
    }
    
    return (
      <div className="flex text-accent mb-4">
        {stars}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">What Our Partners Say</h2>
          <p className="text-neutral-medium max-w-2xl mx-auto">
            Hear from hospitality businesses that have elevated their guest experience with our premium toiletries.
          </p>
        </motion.div>
        
        <div className="relative testimonial-carousel">
          <div className="overflow-hidden" ref={sliderRef}>
            <motion.div 
              className="flex transition-all duration-500"
              animate={{
                x: `-${currentIndex * slideWidth}%`
              }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full lg:min-w-[33.333%] px-4"
                >
                  <div className="bg-neutral-lightest p-8 rounded-lg shadow-md h-full">
                    {renderStars(testimonial.stars)}
                    <p className="italic text-neutral-dark mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-neutral-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Carousel Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-accent' : 'bg-neutral-light'}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow Navigation (for larger screens) */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-neutral-lightest transition-colors hidden md:flex"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary" />
          </button>
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-neutral-lightest transition-colors hidden md:flex"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
