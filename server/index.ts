import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import {
  NODE_ENV,
  FRONTEND_URLS,
  SUPABASE_DATABASE_URL,
  DATABASE_URL,
  SESSION_SECRET,
  PORT,
} from "./config";

const app = express();

// CORS configuration - allow all in development, restrict in production
app.use(cors({
  origin: (origin, callback) => {
    // In development: allow all origins for easier development
    if (NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // In production: allow from configured list and Capacitor scheme
    // FRONTEND_URLS can be a comma-separated list of origins
    const configured = (FRONTEND_URLS || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);

    const defaultAllowed = new Set<string>([
      'capacitor://localhost',
      'ionic://localhost',
    ]);

    if (!origin) {
      // Some native requests may not send an Origin; allow in production
      return callback(null, true);
    }

    if (defaultAllowed.has(origin) || configured.includes(origin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup session management with PostgreSQL store
const PgSession = connectPgSimple(session);
app.use(
  session({
    store: new PgSession({
      conString: SUPABASE_DATABASE_URL || DATABASE_URL || '',
      createTableIfMissing: true,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      sameSite: NODE_ENV === 'production' ? 'strict' : 'lax', // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

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

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in config
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const listenOptions: any = {
    port: PORT,
    host: "0.0.0.0",
  };
  
  // reusePort is not supported on Windows, only enable on Unix-like systems
  if (process.platform !== 'win32') {
    listenOptions.reusePort = true;
  }
  
  server.listen(listenOptions, () => {
    log(`serving on port ${PORT}`);
  });
})();
