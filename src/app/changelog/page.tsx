'use client';

import { motion } from 'framer-motion';
import { GitCommit, Star, Zap, Shield, Sparkles } from 'lucide-react';

export default function ChangelogPage() {
  const updates = [
    {
      version: 'v1.1.0',
      date: 'December 23, 2025',
      title: 'The Visual Overhaul',
      icon: <Sparkles className="text-primary" />,
      changes: [
        'Complete UI redesign with "Soft Study" aesthetic.',
        'Added global loading transitions with animated graduation cap.',
        'New "About", "Credits", and "Privacy" pages.',
        'Enhanced MediaCard with high-resolution hover effects.',
        'Improved responsiveness for tablet and mobile devices.'
      ]
    },
    {
      version: 'v1.0.0',
      date: 'December 22, 2025',
      title: 'Initial Launch',
      icon: <Zap className="text-yellow-500" />,
      changes: [
        'Integrated TMDB and AniList APIs.',
        'Implemented strict 18+ content filtering.',
        'Added custom student genres: Exam Time, Mood Off, Educational.',
        'Embedded Vidify player for seamless watching.',
        'MIT License and Open Source foundation.'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl font-black mb-4 tracking-tight">Changelog</h1>
        <p className="text-secondary text-lg font-medium">
          Tracking the evolution of Student-Watch.
        </p>
      </motion.div>

      <div className="space-y-12 relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

        {updates.map((update, idx) => (
          <motion.div
            key={update.version}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative md:pl-20"
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-[1.35rem] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950 z-10 hidden md:block" />
            
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-900/5">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                    {update.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">{update.title}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{update.date}</p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black">
                  {update.version}
                </span>
              </div>

              <ul className="space-y-4">
                {update.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary font-medium leading-relaxed">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
