import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { google } from 'googleapis';

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

// Google Sheets configuration
const SHEET_ID = '1Vv8gYpT0aVqOgqzDFZXhs28y11fZWM5vYyCPnywZzbg';
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'https://mp-pharma.vercel.app',
  'https://mppharmaceuticals.com',
];

// Function to get Google Sheets client
const getSheetsClient = () => {
  try {
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!key) {
      console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment variables');
      throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment variables');
    }

    // Log validation that we have the key (without exposing the entire key)
    console.log(`Google Service Account key found with length ${key.length}`);
    
    let credentials;
    try {
      credentials = JSON.parse(key);
    } catch (e) {
      console.error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY as JSON. Make sure it\'s properly formatted.');
      throw new Error('Invalid service account key format');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error creating Google Sheets client:', error);
    throw error;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for quote request submissions with Google Sheets integration
  app.post('/api/quote-request', async (req, res) => {
    try {
      // Check CORS
      const origin = req.headers.origin || '';
      if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      
      // Validate request body
      const quoteData = quoteRequestSchema.parse(req.body);
      
      // Format data for Google Sheets
      try {
        const { name, company, email, phone, propertyType, rooms, message } = quoteData;
        const sheets = getSheetsClient();
        
        // Get last row in the sheet
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A:A',
        });
        
        const rows = response.data.values || [];
        const lastRow = rows.length;
        
        // Format current date and time
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });
        
        // Append the data to the Google Sheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: `Sheet1!A${lastRow + 1}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[name, company, phone, email, propertyType, rooms || '', message || '', formattedDate]],
          },
        });
        
        // Return success response
        res.status(200).json({ 
          success: true, 
          message: 'Quote request received and saved to Google Sheets',
        });
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError);
        
        // Fall back to local storage if Google Sheets fails
        const result = await storage.createQuoteRequest(quoteData);
        
        res.status(200).json({ 
          success: true, 
          message: 'Quote request received (stored locally)',
          requestId: result.id,
          sheetError: 'Data saved locally due to Google Sheets error'
        });
      }
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

  // Add CORS pre-flight support for the API
  app.options('/api/quote-request', (req, res) => {
    const origin = req.headers.origin || '';
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
