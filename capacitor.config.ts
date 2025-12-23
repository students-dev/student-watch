import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studentsdev.studentwatch',
  appName: 'StudentWatch',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;