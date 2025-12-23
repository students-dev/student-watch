'use client';

import Link from 'next/link';
import { GraduationCap, Search, Menu, X, Heart, LogIn, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Movies', href: '/movies' },
    { name: 'Anime', href: '/anime' },
    { name: 'Genres', href: '/genres' },
  ];

  return (
    <nav className={`glass-nav ${scrolled ? 'py-2 shadow-2xl shadow-primary/5' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary text-white p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-primary/30">
                <GraduationCap size={28} />
              </div>
              <span className="hidden sm:inline font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                STUDENT WATCH
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-secondary hover:text-primary transition-all font-black text-xs uppercase tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary/20 focus:outline-none focus:ring-8 focus:ring-primary/5 text-sm w-48 lg:w-80 transition-all duration-500 font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            </form>
            
            <div className="flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="User" className="w-6 h-6 rounded-full" />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary hidden lg:inline">
                      {session.user?.name}
                    </span>
                  </div>
                  <button 
                    onClick={() => signOut()}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-secondary hover:text-red-500 transition-all duration-300"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => signIn('github')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <LogIn size={18} />
                  Sign In
                </button>
              )}
              
              <Link href="/credits" className="p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:scale-110 hover:rotate-12 transition-all duration-300">
                <Heart size={20} fill="currentColor" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-secondary hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary/50 text-base"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
              </form>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center py-4 px-4 text-secondary hover:text-primary hover:bg-primary/5 transition-all font-bold rounded-2xl border border-slate-100 dark:border-slate-900"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
