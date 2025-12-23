'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import MediaCard from '@/components/home/MediaCard';
import { Media } from '@/types';
import { getTrendingMovies, getTrendingAnime } from '@/lib/api';
import { GraduationCap, Smile, BookOpen, Flame } from 'lucide-react';
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

      <div className="pb-32 bg-background/50">

        <Hero />

  

        <div className="container mx-auto px-4 mt-24 space-y-32">

          {sections.map((section, idx) => (

            <motion.section 

              key={idx}

              initial={{ opacity: 0, y: 40 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true, margin: "-100px" }}

              transition={{ duration: 0.8, delay: idx * 0.1 }}

              className="relative"

            >

              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">

                <div className="space-y-2">

                  <div className="flex items-center gap-3">

                     <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-lg shadow-primary/5 border border-slate-100 dark:border-slate-800">

                       {section.icon}

                     </div>

                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Curated Section</span>

                  </div>

                  <h2 className="section-heading !mb-0">{section.title}</h2>

                </div>

                <Link 

                  href={section.title.toLowerCase().includes('movie') ? '/movies' : '/anime'} 

                  className="btn-outline !px-6 !py-2 text-sm !rounded-2xl w-fit"

                >

                  View Library

                </Link>

              </div>

  

              {loading ? (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

                  {[...Array(6)].map((_, i) => (

                    <div key={i} className="aspect-[2/3] bg-white dark:bg-slate-900 animate-pulse rounded-[2.5rem] border border-slate-100 dark:border-slate-800" />

                  ))}

                </div>

              ) : (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

                  {section.items.length > 0 ? (

                    section.items.map((item, i) => (

                      <motion.div

                        key={`${item.mediaType}-${item.id}`}

                        initial={{ opacity: 0, scale: 0.9 }}

                        whileInView={{ opacity: 1, scale: 1 }}

                        transition={{ delay: i * 0.05 }}

                      >

                        <MediaCard media={item} />

                      </motion.div>

                    ))

                  ) : (

                    <div className="col-span-full py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">

                      <p className="text-xl font-bold mb-2">Syncing with Student Cloud...</p>

                      <p className="text-secondary text-sm max-w-xs mx-auto">

                        Check your API keys in the dashboard.

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

  

    

  