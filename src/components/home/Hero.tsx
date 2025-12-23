'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, GraduationCap, ArrowRight, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const floatingIcons = [
    { icon: <BookOpen size={24} />, x: '-10%', y: '10%', delay: 0 },
    { icon: <GraduationCap size={30} />, x: '15%', y: '-15%', delay: 1 },
    { icon: <Sparkles size={20} />, x: '-20%', y: '-20%', delay: 2 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.08),transparent_70%)]" />
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: item.delay }}
            className="absolute text-primary/20 hidden lg:block"
            style={{ left: `calc(50% + ${item.x})`, top: `calc(50% + ${item.y})` }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-primary/5 mb-10"
        >
          <CheckCircle size={16} className="text-accent" />
          <span className="text-sm font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
            100% Student Verified & Safe
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85]"
        >
          STUDY HARD. <br />
          <span className="animate-text-reveal">WATCH EASY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-xl md:text-2xl text-secondary mb-12 leading-relaxed font-medium"
        >
          The ultimate sanctuary for students. High-quality movies and anime, 
          filtered for your peace of mind. No 18+, no clutter, just inspiration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link href="/genres" className="btn-premium group">
            Start Exploring
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/movies" className="btn-outline">
            <Play size={20} />
            Browse Movies
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: 'SAFE CONTENT', value: '100%' },
            { label: 'CURATED GENRES', value: '12+' },
            { label: 'COMMUNITY', value: '1k+' },
            { label: 'STUDY FOCUS', value: '10/10' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-[2rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20">
              <p className="text-3xl font-black text-primary mb-1">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
