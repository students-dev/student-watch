'use client';

import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data } = await tmdbClient.get('/movie/popular');
        setMovies(data.results
          .filter((m: any) => !m.adult)
          .map((m: any) => ({
            id: m.id,
            tmdbId: m.id,
            title: m.title,
            overview: m.overview,
            posterPath: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
            backdropPath: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            releaseDate: m.release_date,
            voteAverage: m.vote_average,
            mediaType: 'movie',
            adult: m.adult,
            genres: [],
          })));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 space-y-2"
      >
        <div className="flex items-center gap-3">
           <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800 text-primary">
             <Film size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Cinematic Collection</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
          Safe <span className="text-primary">Movies</span>
        </h1>
        <p className="text-secondary font-medium text-lg max-w-2xl">
          Hand-picked popular movies filtered to be 100% safe for students. 
          Enjoy the big screen experience without the distractions.
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
          {movies.map((item, i) => (
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
