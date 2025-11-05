// API Configuration for mobile and web builds

// Backend URL - can be set via VITE_API_URL environment variable
// For Vercel: Set this in Project Settings → Environment Variables
// For local dev: Create .env file with VITE_API_URL=http://localhost:5000
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://your-backend.example.com';

// Detect if running in Capacitor (mobile app)
// Proper detection: check for Capacitor object, not just hostname
function isCapacitor(): boolean {
  return !!(window as any).Capacitor;
}

export function getApiUrl(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Determine base URL:
  // - For mobile apps (Capacitor), use full backend URL
  // - For web development (localhost in browser), use localhost:5000
  // - For web production, use VITE_API_URL or BACKEND_URL
  const isMobile = isCapacitor();
  const isLocalDev = window.location.hostname === 'localhost' && !isMobile;
  
  let baseUrl = '';
  if (isMobile) {
    // Mobile: use full backend URL (must be HTTPS in production)
    baseUrl = BACKEND_URL;
  } else if (isLocalDev) {
    // Web development: use localhost:5000 (same as server port)
    baseUrl = 'http://localhost:5000';
  } else {
    // Web production: use BACKEND_URL (from VITE_API_URL env var or hardcoded)
    baseUrl = BACKEND_URL;
  }
  
  const fullUrl = `${baseUrl}${cleanPath}`;
  
  console.log('[Plattr API]', fullUrl, 'isMobile:', isMobile, 'isLocalDev:', isLocalDev);
  
  return fullUrl;
}
