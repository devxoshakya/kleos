import { users, type User, type InsertUser } from "@shared/schema";

// Type for quote requests
export type QuoteRequest = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  propertyType: string;
  rooms?: string;
  message?: string;
  consent: boolean;
  timestamp: Date;
};

export type InsertQuoteRequest = Omit<QuoteRequest, 'id' | 'timestamp'>;

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quoteRequests: Map<number, QuoteRequest>;
  currentId: number;
  currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
    this.currentId = 1;
    this.currentQuoteId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = this.currentQuoteId++;
    const quoteRequest: QuoteRequest = { 
      ...request, 
      id,
      timestamp: new Date() 
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
}

export const storage = new MemStorage();
