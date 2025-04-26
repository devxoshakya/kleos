import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Schema for quote request
const quoteRequestSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  propertyType: z.string(),
  rooms: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for quote request submissions
  app.post('/api/quote-request', async (req, res) => {
    try {
      // Validate request body
      const quoteData = quoteRequestSchema.parse(req.body);
      
      // Store quote request (in memory for now)
      const result = await storage.createQuoteRequest(quoteData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: 'Quote request received',
        requestId: result.id
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: 'Invalid request data',
          errors: error.errors
        });
      } else {
        // Handle other errors
        console.error('Error processing quote request:', error);
        res.status(500).json({ 
          success: false, 
          message: 'An error occurred while processing your request'
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
