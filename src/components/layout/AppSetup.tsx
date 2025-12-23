'use client';

import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export default function AppSetup() {
  useEffect(() => {
    const setupApp = async () => {
      if (Capacitor.isNativePlatform()) {
        // Set Status Bar
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#020617' });
        
        // Hide Splash Screen
        await SplashScreen.hide();
      }
    };

    setupApp();
  }, []);

  return null; // This component doesn't render anything
}
