'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'soft' | 'parchment' | 'blueprint' | 'cyber' | 'midnight';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('soft');

  useEffect(() => {
    const savedTheme = localStorage.getItem('student-watch-theme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('student-watch-theme', theme);
    // Apply theme class to html element
    const root = window.document.documentElement;
    root.classList.remove('theme-soft', 'theme-parchment', 'theme-blueprint', 'theme-cyber', 'theme-midnight');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
