// API Configuration for mobile and web builds

// Production backend URL for mobile access (Capacitor). Must be HTTPS.
// Set VITE_API_URL in your env for builds; fallback is a placeholder that should be replaced.
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

// Detect if running in Capacitor (mobile app)
// Simple detection: if hostname is localhost, we're in Capacitor
// because the web version runs on the actual Replit domain
function isCapacitor(): boolean {
  return window.location.hostname === 'localhost';
}

export function getApiUrl(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // For mobile apps (Capacitor at localhost), use full backend URL
  // For web (replit.dev domain), use relative URLs
  const isMobile = isCapacitor();
  const baseUrl = isMobile ? BACKEND_URL : '';
  
  const fullUrl = `${baseUrl}${cleanPath}`;
  
  console.log('[Plattr API]', fullUrl, 'isMobile:', isMobile);
  
  return fullUrl;
}
