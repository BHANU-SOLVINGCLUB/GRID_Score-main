// API Configuration for mobile and web builds

// Production backend URL for mobile access (Capacitor). Must be HTTPS.
// Hardcoded backend URL - update this with your actual backend URL
const BACKEND_URL = 'https://your-backend.example.com'; // Replace with your actual backend URL

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
  // - For web production (other domains), use relative URLs (same origin)
  const isMobile = isCapacitor();
  const isLocalDev = window.location.hostname === 'localhost' && !isMobile;
  
  let baseUrl = '';
  if (isMobile) {
    // Mobile: use full backend URL (must be HTTPS in production)
    baseUrl = BACKEND_URL;
  } else if (isLocalDev) {
    // Web development: use localhost:5000 (same as server port)
    baseUrl = 'http://localhost:5000';
  }
  // Web production: baseUrl stays empty (relative URLs)
  
  const fullUrl = `${baseUrl}${cleanPath}`;
  
  console.log('[Plattr API]', fullUrl, 'isMobile:', isMobile, 'isLocalDev:', isLocalDev);
  
  return fullUrl;
}
