'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import MediaCard from '@/components/home/MediaCard';
import { Media } from '@/types';
import { getTrendingMovies, getTrendingAnime } from '@/lib/api';
import { GraduationCap, Smile, BookOpen, Flame, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [movies, anime] = await Promise.all([
        getTrendingMovies(),
        getTrendingAnime(),
      ]);
      setTrendingMovies(movies);
      setTrendingAnime(anime);
      setLoading(false);
    }
    loadData();
  }, []);

  const sections = [
    { title: 'Trending Movies', icon: <Flame className="text-orange-500" />, items: trendingMovies },
    { title: 'Trending Anime', icon: <Flame className="text-orange-500" />, items: trendingAnime },
    { title: 'Exam Time', icon: <GraduationCap className="text-blue-500" />, items: trendingAnime.slice(0, 6) },
    { title: 'Scientific Journey', icon: <BookOpen className="text-emerald-500" />, items: trendingAnime.slice(6, 12) },
    { title: 'Mood Off', icon: <Smile className="text-yellow-500" />, items: trendingMovies.slice(5, 11) },
  ];

  return (
    <div className="pb-32 mesh-bg min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 mt-12 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-[3rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-slate-800/20 shadow-2xl flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex flex-col items-center lg:items-start gap-1 w-full lg:w-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">State of Mind</span>
            <h3 className="text-xl font-black uppercase tracking-tight">Quick Filter</h3>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: 'Exam Ready', color: 'bg-blue-500', href: '/genres/exam_time', icon: <GraduationCap size={14} /> },
              { name: 'Mood Off', color: 'bg-yellow-500', href: '/genres/mood_off', icon: <Smile size={14} /> },
              { name: 'Educational', color: 'bg-green-500', href: '/genres/educational', icon: <BookOpen size={14} /> },
              { name: 'Deep Focus', color: 'bg-indigo-500', href: '/genres/deep_focus', icon: <Zap size={14} /> },
            ].map((mood) => (
              <Link 
                key={mood.name}
                href={mood.href}
                className="group flex items-center gap-4 px-8 py-4 rounded-[1.5rem] bg-white/50 dark:bg-slate-800/50 hover:bg-primary transition-all duration-500 hover:scale-105 active:scale-95 border border-white/20 shadow-xl shadow-primary/5"
              >
                <div className={`p-2 rounded-lg ${mood.color} text-white group-hover:bg-white group-hover:text-primary transition-colors`}>
                  {mood.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-white transition-colors">{mood.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 space-y-40">
        {sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="p-4 rounded-[1.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl shadow-2xl border border-white/20 dark:border-slate-800/20 text-primary">
                     {section.icon}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Premium Curation</span>
                     <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-gradient leading-none">{section.title}</h2>
                   </div>
                </div>
              </div>
              <Link 
                href={section.title.toLowerCase().includes('movie') ? '/movies' : '/anime'} 
                className="btn-ultra-outline !px-10 !py-4 w-fit"
              >
                View Library
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] bg-white/40 dark:bg-slate-900/40 animate-pulse rounded-[3rem] border border-white/20" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
                {section.items.length > 0 ? (
                  section.items.map((item, i) => (
                    <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
                  ))
                ) : (
                  <div className="col-span-full py-32 bg-white/20 dark:bg-slate-900/20 backdrop-blur-3xl rounded-[4rem] border-4 border-dashed border-white/10 dark:border-slate-800/10 flex flex-col items-center justify-center text-center">
                    <Zap className="text-primary mb-6 animate-pulse" size={64} />
                    <p className="text-3xl font-black uppercase tracking-tight mb-3">Initializing Content...</p>
                    <p className="text-secondary font-bold max-w-sm mx-auto opacity-60">
                      Syncing with our student-safe database. 
                      Please ensure your keys are active.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}