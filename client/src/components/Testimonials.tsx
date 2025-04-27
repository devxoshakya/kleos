import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "General Manager, Retreat Hotel, Mumbai",
    quote: "Kleaos Lifesciences ne hamari guest experience ko ekdum transform kar diya hai. Quality products aur custom branding mein unki attention to detail ne hamare boutique hotel ko competitors se alag stand out karaya hai.",
    stars: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Operations Director, GreenStay Hotels, Bangalore",
    quote: "The eco-friendly collection has been a game-changer for our sustainability initiatives. Our guests keep telling us how much they appreciate our commitment to the environment while maintaining luxury standards.",
    stars: 5
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Procurement Manager, Top Resorts, Delhi",
    quote: "Consistent quality and on-time delivery have made Kleaos Lifesciences an invaluable partner for our hotel chain. Their customer service team is always ready to help, bahut hi responsive hain.",
    stars: 4.5
  },
  {
    id: 4,
    name: "Ananya Desai",
    role: "Owner, The Parkview Boutique Hotel, Jaipur",
    quote: "We've received countless compliments from guests about our bathroom amenities since partnering with Kleaos Lifesciences. The custom scents have become part of our brand identity and really represent our local heritage.",
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
            Hear from hospitality businesses that have elevated their guest experience with our  toiletries.
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
                      <div className="w-12 h-12 rounded-full bg-neutral-light flex items-center justify-center mr-4">
                        <User size={28} className="text-primary" />
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
