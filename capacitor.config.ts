import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.caterplanner.app',
  appName: 'Plattr',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
