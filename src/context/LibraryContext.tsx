'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Media } from '@/types';

interface LibraryContextType {
  library: Media[];
  addToLibrary: (media: Media) => void;
  removeFromLibrary: (mediaId: string | number) => void;
  isInLibrary: (mediaId: string | number) => boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibrary] = useState<Media[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('student-watch-library');
    if (saved) {
      try {
        setLibrary(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load library', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('student-watch-library', JSON.stringify(library));
  }, [library]);

  const addToLibrary = (media: Media) => {
    if (!isInLibrary(media.id)) {
      setLibrary((prev) => [...prev, media]);
    }
  };

  const removeFromLibrary = (mediaId: string | number) => {
    setLibrary((prev) => prev.filter((m) => m.id !== mediaId));
  };

  const isInLibrary = (mediaId: string | number) => {
    return library.some((m) => m.id === mediaId);
  };

  return (
    <LibraryContext.Provider value={{ library, addToLibrary, removeFromLibrary, isInLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
