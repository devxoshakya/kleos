// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  quoteRequests;
  currentId;
  currentQuoteId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.quoteRequests = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.currentQuoteId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createQuoteRequest(request) {
    const id = this.currentQuoteId++;
    const quoteRequest = {
      ...request,
      id,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.quoteRequests.set(id, quoteRequest);
    return quoteRequest;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";
import { google } from "googleapis";
var quoteRequestSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  propertyType: z.string(),
  rooms: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean()
});
var SHEET_ID = "1Vv8gYpT0aVqOgqzDFZXhs28y11fZWM5vYyCPnywZzbg";
var ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5000",
  "https://mp-pharma.vercel.app",
  "https://mppharmaceuticals.com"
];
var getSheetsClient = () => {
  try {
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!key) {
      console.error("Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment variables");
      throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment variables");
    }
    console.log(`Google Service Account key found with length ${key.length}`);
    let credentials;
    try {
      credentials = JSON.parse(key);
    } catch (e) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY as JSON. Make sure it's properly formatted.");
      throw new Error("Invalid service account key format");
    }
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });
    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("Error creating Google Sheets client:", error);
    throw error;
  }
};
async function registerRoutes(app2) {
  app2.post("/api/quote-request", async (req, res) => {
    try {
      const origin = req.headers.origin || "";
      if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      const quoteData = quoteRequestSchema.parse(req.body);
      try {
        const { name, company, email, phone, propertyType, rooms, message } = quoteData;
        const sheets = getSheetsClient();
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: SHEET_ID,
          range: "Sheet1!A:A"
        });
        const rows = response.data.values || [];
        const lastRow = rows.length;
        const now = /* @__PURE__ */ new Date();
        const formattedDate = now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        });
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: `Sheet1!A${lastRow + 1}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[name, company, phone, email, propertyType, rooms || "", message || "", formattedDate]]
          }
        });
        res.status(200).json({
          success: true,
          message: "Quote request received and saved to Google Sheets"
        });
      } catch (sheetError) {
        console.error("Google Sheets error:", sheetError);
        const result = await storage.createQuoteRequest(quoteData);
        res.status(200).json({
          success: true,
          message: "Quote request received (stored locally)",
          requestId: result.id,
          sheetError: "Data saved locally due to Google Sheets error"
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid request data",
          errors: error.errors
        });
      } else {
        console.error("Error processing quote request:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });
  app2.options("/api/quote-request", (req, res) => {
    const origin = req.headers.origin || "";
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).end();
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import dotenv from "dotenv";
dotenv.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
