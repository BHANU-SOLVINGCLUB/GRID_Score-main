// Central configuration file - all environment variables hardcoded here
// Replace all placeholder values with your actual credentials

export const NODE_ENV = 'production';
export const PORT = 5000;

// Supabase Configuration
export const SUPABASE_URL = 'https://leltckltotobsibixhqo.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHRja2x0b3RvYnNpYml4aHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzc5ODEsImV4cCI6MjA3NTk1Mzk4MX0._IrMgGQDJB7OvKEoT7pwWG9AjN6aeN1ejnj8IViDLyE';
export const SUPABASE_SERVICE_ROLE_KEY: string | undefined = undefined; // Optional: set if needed

// Database URLs (use one or the other)
// Update SUPABASE_DB_PASSWORD with your actual database password to construct the URL
export const SUPABASE_DATABASE_URL = 'postgresql://postgres:your-password@db.leltckltotobsibixhqo.supabase.co:5432/postgres';
export const DATABASE_URL = SUPABASE_DATABASE_URL; // Fallback
export const SUPABASE_DB_PASSWORD = 'your-password'; // Only used if constructing URL dynamically - UPDATE THIS with your actual database password

// CORS Configuration
export const FRONTEND_URLS = ''; // Comma-separated list of allowed origins, e.g., 'https://example.com,https://app.example.com'

// Session Configuration
export const SESSION_SECRET = 'replace-with-a-long-random-secret-key-change-this-in-production';

// SMS Configuration
export const BULK_SMS_API_KEY = ''; // Leave empty to disable real SMS (OTP will be logged in console)
export const BULK_SMS_SENDER_ID = 'CaterPlan';
export const BULK_SMS_API_URL = 'https://api.bulksms.com/v1/messages';

// Stripe Configuration (optional)
export const STRIPE_SECRET_KEY = ''; // Leave empty to disable Stripe payments (server-side)
// Note: Stripe public key (publishable key) is hardcoded in client/src/pages/PaymentPage.tsx

