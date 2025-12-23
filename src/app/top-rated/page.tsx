'use client';

import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient, fetchFromAniList, ANIME_QUERY } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopRatedPage() {
  const [movies, setMovies] = useState<Media[]>([]);
  const [anime, setAnime] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [movieRes, animeRes] = await Promise.all([
          tmdbClient.get('/movie/top_rated'),
          fetchFromAniList(ANIME_QUERY, { page: 1, perPage: 12, genre: "Action" }) // Using a broad genre for variety
        ]);

        setMovies(movieRes.data.results
          .filter((m: any) => !m.adult)
          .slice(0, 12)
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

        setAnime(animeRes.data.Page.media
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
        console.error('Error fetching top rated content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center space-y-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
           <Trophy size={20} />
           <span className="text-[10px] font-black uppercase tracking-widest">Global Hall of Fame</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-gradient">Top Rated</h1>
        <p className="text-secondary font-medium text-lg max-w-2xl mx-auto">
          The absolute best of cinema and anime, as voted by students and fans worldwide. 
          Quality content for quality study breaks.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="animate-spin text-primary" size={64} />
        </div>
      ) : (
        <div className="space-y-32">
          <section>
            <div className="flex items-center gap-4 mb-12">
               <Star className="text-yellow-500" fill="currentColor" size={32} />
               <h2 className="text-4xl font-black tracking-tight uppercase">Legendary Movies</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {movies.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MediaCard media={item} />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-12">
               <Star className="text-indigo-500" fill="currentColor" size={32} />
               <h2 className="text-4xl font-black tracking-tight uppercase">Masterpiece Anime</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {anime.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MediaCard media={item} />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
