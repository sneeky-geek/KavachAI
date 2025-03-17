import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors"; // Import cors
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { connectDB } from "./db"; // MongoDB connection function

const app = express();

// Enable CORS for all routes
app.use(cors());

// Global middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request/Response Logger Middleware (for /api routes)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Async IIFE to bootstrap the server
(async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // 2. Register API Routes (Proctoring, Users, etc.)
    const server = await registerRoutes(app);
    console.log("✅ Routes registered");

    // 3. Global Error Handler (Must come after routes)
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("❌ Error:", message);
      res.status(status).json({ message });
    });

    // 4. Setup Frontend Serving
    if (app.get("env") === "development") {
      console.log("🛠️ Setting up Vite for development");
      await setupVite(app, server);
    } else {
      console.log("🚀 Serving static files in production");
      serveStatic(app);
    }

    // 5. Start the HTTP Server
    const PORT = 5003; // Unified port for API + Frontend
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
})();