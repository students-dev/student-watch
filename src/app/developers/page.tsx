'use client';

import { motion } from 'framer-motion';
import { Code, Terminal, Database, ShieldCheck, Cpu, Globe, ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export default function DevelopersPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/media/trending',
      desc: 'Fetch filtered student-safe trending movies and anime.',
    },
    {
      method: 'GET',
      path: '/api/media/search?q={query}',
      desc: 'Search across the safe library.',
    },
    {
      method: 'GET',
      path: '/api/media/genres/{id}',
      desc: 'Get content for specific student-centric genres.',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6">
          <Code size={16} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Developer Hub</span>
        </div>
        <h1 className="text-6xl font-black mb-6 tracking-tighter uppercase">API Documentation</h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto font-medium">
          Student-Watch is built for the community. Use our filtered data to build 
          your own safe-space applications.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-black mb-2 uppercase">Safe Data</h3>
          <p className="text-sm text-secondary font-medium leading-relaxed">
            All data served through our API is pre-filtered for student safety.
          </p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
            <Cpu size={24} />
          </div>
          <h3 className="text-xl font-black mb-2 uppercase">Fast Edge</h3>
          <p className="text-sm text-secondary font-medium leading-relaxed">
            Built on Vercel Edge for minimal latency globally.
          </p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-black mb-2 uppercase">Open Source</h3>
          <p className="text-sm text-secondary font-medium leading-relaxed">
            MIT Licensed and developer-friendly documentation.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-3">
          <Terminal size={24} className="text-primary" />
          Core Endpoints
        </h2>
        
        <div className="space-y-4">
          {endpoints.map((ep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-primary text-[10px] font-black uppercase tracking-widest">
                  {ep.method}
                </span>
                <code className="text-sm font-bold text-indigo-300">{ep.path}</code>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{ep.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-24 p-12 rounded-[3rem] bg-primary text-white text-center relative overflow-hidden shadow-2xl shadow-primary/40">
        <h2 className="text-4xl font-black mb-6 relative z-10 uppercase">Start Building</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto relative z-10 font-bold">
          Join students-dev and contribute to the safer internet movement.
        </p>
        <div className="flex justify-center gap-4 relative z-10">
          <Link href="https://github.com/students-dev" className="bg-white text-primary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <Github size={20} />
            GitHub Org
          </Link>
        </div>
      </section>
    </div>
  );
}
