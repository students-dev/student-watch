'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Star, Zap, Shield, Sparkles, ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const updates = [
  {
    version: 'v1.2.0',
    date: 'December 23, 2025',
    title: 'The Productivity Update',
    icon: <Timer className="text-primary" />,
    description: 'Introducing tools to help students balance entertainment and academic focus.',
    changes: [
      'Added Pomodoro Focus Timer with Work/Break cycles.',
      'Enhanced Engineer’s Grid background for a sharper scholarly look.',
      'Integrated GitHub OAuth2 for secure student sessions.',
      'Refined all major library pages with staggered animations.',
      'Improved 18+ filtering with double-layered validation.'
    ],
    technical: 'Next.js 15, Auth.js v5, Tailwind CSS 4, Framer Motion.'
  },
  {
    version: 'v1.1.0',
    date: 'December 23, 2025',
    title: 'The Visual Overhaul',
    icon: <Sparkles className="text-primary" />,
    description: 'A complete redesign focusing on a premium scholarly aesthetic.',
    changes: [
      'Complete UI redesign with "Soft Study" aesthetic.',
      'Added global loading transitions with animated graduation cap.',
      'New "About", "Credits", and "Privacy" pages.',
      'Enhanced MediaCard with high-resolution hover effects.',
      'Improved responsiveness for tablet and mobile devices.'
    ],
    technical: 'Framer Motion, Lucide Icons, Custom CSS Grids.'
  },
  {
    version: 'v1.0.0',
    date: 'December 22, 2025',
    title: 'Initial Launch',
    icon: <Zap className="text-yellow-500" />,
    description: 'The foundation of a safer streaming space for students.',
    changes: [
      'Integrated TMDB and AniList APIs.',
      'Implemented strict 18+ content filtering.',
      'Added custom student genres: Exam Time, Mood Off, Educational.',
      'Embedded Vidify player for seamless watching.',
      'MIT License and Open Source foundation.'
    ],
    technical: 'Next.js App Router, TMDB API, AniList GraphQL.'
  }
];

import { Timer } from 'lucide-react';

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState(updates[0].version);
  const currentUpdate = updates.find(u => u.version === selectedVersion) || updates[0];

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-black mb-4 tracking-tight uppercase">Platform Evolution</h1>
        <p className="text-secondary text-lg font-medium">
          Detailed logs of every improvement made to Student-Watch.
        </p>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* Version Selector */}
        <div className="relative max-w-xs mx-auto w-full">
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="w-full appearance-none bg-white dark:bg-slate-900 border-2 border-primary/20 rounded-2xl px-6 py-4 font-black text-sm uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer shadow-xl shadow-primary/5 transition-all"
          >
            {updates.map(u => (
              <option key={u.version} value={u.version}>Version {u.version}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={20} />
        </div>

        {/* Detail View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVersion}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-primary/5 text-primary">
                  {currentUpdate.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">{currentUpdate.title}</h2>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                    <Calendar size={14} />
                    {currentUpdate.date}
                  </div>
                </div>
              </div>
              <div className="px-6 py-2 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest">
                {currentUpdate.version}
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Summary</h3>
                <p className="text-xl text-secondary font-medium leading-relaxed">
                  {currentUpdate.description}
                </p>
              </section>

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Key Changes</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {currentUpdate.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm font-bold text-secondary">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0 shadow-lg shadow-primary/40" />
                      {change}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pt-10 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Stack Information</h3>
                    <p className="text-xs font-black text-secondary">{currentUpdate.technical}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                    Commit Verified <Shield size={14} />
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
