'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, Bookmark, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Movies', href: '/movies', icon: <Film size={20} /> },
    { name: 'Anime', href: '/anime', icon: <Tv size={20} /> },
    { name: 'Library', href: '/library', icon: <Bookmark size={20} /> },
    { name: 'Search', href: '/search', icon: <Search size={20} /> },
  ];

  const handlePress = async () => {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 pointer-events-none">
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="pointer-events-auto bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-white/20 dark:border-slate-800/20 rounded-[2rem] shadow-2xl flex items-center justify-around p-2"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handlePress}
              className={`relative flex flex-col items-center gap-1 p-3 transition-all duration-500 ${
                isActive ? 'text-primary scale-110' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
