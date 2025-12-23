'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, GraduationCap, ArrowRight, Play, CheckCircle, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 mesh-bg">
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-[160px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800/20 shadow-2xl mb-12 animate-glow"
        >
          <div className="bg-primary p-1 rounded-full text-white">
            <Shield size={12} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Certified Secure & Ad-Free
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase text-gradient">
            ELEVATE <br />
            <span className="animate-text-reveal">WATCHING.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-secondary mb-12 md:mb-16 leading-relaxed font-medium tracking-tight px-4">
            The world's most sophisticated streaming platform for students. 
            Curated, filtered, and optimized for your academic and mental well-being.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link href="/genres" className="btn-ultra group">
            Start Experience
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
          <Link href="/movies" className="btn-ultra-outline group">
            <Zap size={18} className="text-primary group-hover:rotate-12 transition-transform" />
            Browse Safe Library
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="mt-32 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-black tracking-tighter">100%</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Safe Content</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-black tracking-tighter">Edge</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Ultra Low Latency</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <span className="text-4xl font-black tracking-tighter">4K+</span>
             <span className="text-[8px] font-black uppercase tracking-widest">Library Titles</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
