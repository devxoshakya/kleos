import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, RectangleEllipsis, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  rooms: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive information",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      propertyType: "",
      rooms: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // EmailJS service configuration - replace with your actual EmailJS IDs
      const serviceId = 'service_iu9ox8d';
      const templateId = 'template_0au7r3h';
      const publicKey = '16-M14MGxj5ajs5bj';
      
      // Prepare template parameters from form data
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        to_email: 'kumarakshay94280@gmail.com', // Adding recipient email address
        company_name: data.company,
        phone_number: data.phone,
        property_type: data.propertyType,
        room_count: data.rooms || 'Not specified',
        message: data.message || 'No additional information provided',
        to_name: 'Kleaos Lifescience',
        reply_to: data.email, // Adding reply-to for better email responses
      };

      console.log('Sending email with params:', templateParams);

      // Send the email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', response);
      
      toast({
        title: "Quote Request Submitted",
        description: "Your information has been sent. Our team will contact you shortly!",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Rest of the component remains unchanged
  return (
    <section id="contact" className="py-20 bg-neutral-lightest">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Request a Quote</h2>
            <p className="text-neutral-medium mb-6">
              Interested in elevating your guest experience with our premium toiletries? Fill out the form to get a customized quote for your property.
            </p>
            
            <div className="mb-8">
              <h3 className="font-heading text-xl font-semibold mb-3">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-secondary mt-1 mr-3 h-5 w-5" />
                  <span>Direct manufacturer relationships ensure competitive pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary mt-1 mr-3 h-5 w-5" />
                  <span>Custom branding options to match your property's identity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary mt-1 mr-3 h-5 w-5" />
                  <span>Eco-friendly and sustainable product lines available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary mt-1 mr-3 h-5 w-5" />
                  <span>Reliable supply chain with on-time delivery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-secondary mt-1 mr-3 h-5 w-5" />
                  <span>Dedicated account manager for personalized service</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading text-xl font-semibold mb-3">Contact Information</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <RectangleEllipsis className="text-primary mr-3 h-5 w-5" />
                  <a href="mailto:info@kleaos.com" className="hover:text-accent transition-colors">info@kleaos.com</a>
                </p>
                <p className="flex items-center">
                  <Phone className="text-primary mr-3 h-5 w-5" />
                  <a href="tel:+917056267847" className="hover:text-accent transition-colors">+91-7056267847</a>
                </p>
                <p className="flex items-center">
                  <MapPin className="text-primary mr-3 h-5 w-5" />
                  <span>20, Vidya Nagar, Ambala Cantt, Haryana, 133004</span>
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-dark font-medium">Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-dark font-medium">Company/Property Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company or property" 
                          {...field}
                          className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-dark font-medium">Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your email" 
                            {...field}
                            className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-dark font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Your phone number" 
                            {...field}
                            className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-dark font-medium">Property Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <SelectValue placeholder="Select your property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="luxury-hotel">Luxury Hotel</SelectItem>
                          <SelectItem value="boutique-hotel">Boutique Hotel</SelectItem>
                          <SelectItem value="resort">Resort</SelectItem>
                          <SelectItem value="vacation-rental">Vacation Rental</SelectItem>
                          <SelectItem value="bed-breakfast">Bed & Breakfast</SelectItem>
                          <SelectItem value="hostel">Hostel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-dark font-medium">Number of Rooms</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Optional" 
                          {...field}
                          className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-dark font-medium">Additional Information</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your specific needs" 
                          rows={4} 
                          {...field}
                          className="px-4 py-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-neutral-dark font-medium">
                          I agree to receive information about products and services. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent-dark text-white font-accent font-medium px-6 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
