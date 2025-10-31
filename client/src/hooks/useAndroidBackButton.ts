import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { App as CapacitorApp } from '@capacitor/app';

export function useAndroidBackButton() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const setupBackButton = async () => {
      // Only set up for mobile (Capacitor) environment
      if (window.location.hostname === 'localhost' && (window as any).Capacitor) {
        await CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          // Home page - exit app
          if (location === '/') {
            CapacitorApp.exitApp();
            return;
          }

          // For all other pages, navigate back
          // Define the back navigation logic
          const backNavigationMap: Record<string, string> = {
            '/categories/tiffins': '/',
            '/categories/snacks': '/',
            '/categories/lunch-dinner': '/',
            '/profile': '/',
            '/help': '/profile',
            '/about': '/profile',
            '/referral': '/profile',
            '/corporate': '/',
            '/orders': '/profile',
            '/checkout': '/',
            '/add-ons': '/checkout',
          };

          // Check if current path matches any specific route
          let navigateTo = backNavigationMap[location];

          // Handle dynamic routes (dishes, planner, etc.)
          if (!navigateTo) {
            if (location.startsWith('/dishes/')) {
              const mealType = location.split('/')[2];
              navigateTo = `/categories/${mealType}`;
            } else if (location.startsWith('/planner/')) {
              const mealType = location.split('/')[2];
              navigateTo = `/categories/${mealType}`;
            } else if (location.startsWith('/categories/')) {
              navigateTo = '/';
            } else {
              // Default: go to home
              navigateTo = '/';
            }
          }

          setLocation(navigateTo);
        });
      }
    };

    setupBackButton();

    // Cleanup
    return () => {
      if (window.location.hostname === 'localhost' && (window as any).Capacitor) {
        CapacitorApp.removeAllListeners();
      }
    };
  }, [location, setLocation]);
}
