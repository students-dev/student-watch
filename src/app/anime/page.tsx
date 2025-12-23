'use client';

import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { fetchFromAniList, ANIME_QUERY } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnimePage() {
  const [anime, setAnime] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await fetchFromAniList(ANIME_QUERY, { page: 1, perPage: 30 });
        setAnime(data.data.Page.media
          .filter((m: any) => !m.isAdult)
          .map((m: any) => ({
            id: m.id,
            title: m.title.english || m.title.romaji,
            overview: m.description,
            posterPath: m.coverImage.extraLarge,
            backdropPath: m.bannerImage || m.coverImage.extraLarge,
            releaseDate: m.startDate.year?.toString() || '',
            voteAverage: m.averageScore / 10,
            mediaType: 'anime',
            adult: false,
            genres: m.genres,
          })));
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 space-y-2"
      >
        <div className="flex items-center gap-3">
           <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800 text-indigo-500">
             <Tv size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Hand-Picked Series</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
          Safe <span className="text-indigo-500">Anime</span>
        </h1>
        <p className="text-secondary font-medium text-lg max-w-2xl">
          Discover the best anime stories, curated for students. 
          Focus on inspiration, creativity, and clean entertainment.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-white dark:bg-slate-900 animate-pulse rounded-[2.5rem] border border-slate-100 dark:border-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {anime.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <MediaCard media={item} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
