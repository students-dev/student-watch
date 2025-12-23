'use client';

import { motion } from 'framer-motion';
import { Heart, Github, ExternalLink, Database, Cpu, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreditsPage() {
  const credits = [
    {
      name: 'The Movie Database (TMDB)',
      role: 'Movie & TV Data',
      icon: <Database className="text-blue-500" />,
      link: 'https://www.themoviedb.org/',
      desc: 'Providing the world-class metadata and images for all movies and TV shows.'
    },
    {
      name: 'AniList API',
      role: 'Anime Discovery',
      icon: <Cpu className="text-pink-500" />,
      link: 'https://anilist.co/',
      desc: 'The best GraphQL API for searching and fetching anime details.'
    },
    {
      name: 'Vidify.top',
      role: 'Video Player',
      icon: <ExternalLink className="text-orange-500" />,
      link: 'https://vidify.top/',
      desc: 'Seamless video playback integration for our student community.'
    },
    {
      name: 'Unsplash',
      role: 'Visual Assets',
      icon: <ImageIcon className="text-emerald-500" />,
      link: 'https://unsplash.com/',
      desc: 'Providing beautiful placeholder imagery and design inspiration.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 mb-6">
          <Heart size={32} fill="currentColor" />
        </div>
        <h1 className="text-5xl font-black mb-4">Built with Love</h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto font-medium">
          Student-Watch is an open-source project dedicated to providing a safe, 
          focused environment for students to relax.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {credits.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-xs font-black text-primary uppercase tracking-widest">{item.role}</p>
              </div>
            </div>
            <p className="text-secondary mb-6 leading-relaxed">
              {item.desc}
            </p>
            <Link 
              href={item.link} 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
            >
              Visit Platform <ExternalLink size={14} />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 p-12 rounded-[3rem] bg-zinc-900 text-white text-center relative overflow-hidden border border-white/5"
      >
        <h2 className="text-4xl font-black mb-8 relative z-10">THE TEAM</h2>
        <div className="grid md:grid-cols-2 gap-8 relative z-10 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-1">Ramkrishna</h3>
            <p className="text-primary text-sm font-black mb-4 uppercase tracking-widest">Lead Developer</p>
            <Link href="https://github.com/ramkrishna-xyz" className="text-xs text-secondary hover:text-white transition-colors">
              @ramkrishna-xyz
            </Link>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold mb-1">Manjunath</h3>
            <p className="text-primary text-sm font-black mb-4 uppercase tracking-widest">Core Developer</p>
            <Link href="https://github.com/manjunathh-xyz" className="text-xs text-secondary hover:text-white transition-colors">
              @manjunathh-xyz
            </Link>
          </div>
        </div>

        <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10 font-medium">
          Student-Watch is an initiative by <span className="text-white font-bold">students-dev</span>. 
          Built with the goal of creating a safer internet for students globally.
        </p>
        <div className="flex justify-center gap-4 relative z-10">
          <Link href="https://github.com/students-dev" className="btn-primary">
            <Github size={20} />
            students-dev
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
