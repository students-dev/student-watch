'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient, fetchFromAniList, ANIME_QUERY, CUSTOM_GENRES } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GenreDetailPage() {
  const { genre } = useParams();
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  const genreKey = (genre as string)?.toUpperCase() as keyof typeof CUSTOM_GENRES;
  const genreInfo = CUSTOM_GENRES[genreKey];

  useEffect(() => {
    async function fetchGenreContent() {
      if (!genreInfo) return;
      setLoading(true);
      try {
        const animeTag = genreInfo.animeTags[0];
        const movieKeyword = genreInfo.movieKeywords[0];

        const [movieRes, animeRes] = await Promise.all([
          tmdbClient.get('/search/movie', { params: { query: movieKeyword } }),
          fetchFromAniList(ANIME_QUERY, { genre: animeTag, perPage: 20 })
        ]);

        const movies = movieRes.data.results.map((m: any) => ({
          id: m.id,
          tmdbId: m.id,
          title: m.title,
          overview: m.overview,
          posterPath: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
          backdropPath: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
          releaseDate: m.release_date || '',
          voteAverage: m.vote_average || 0,
          mediaType: 'movie' as const,
          adult: m.adult,
          genres: [],
        })).filter((m: any) => !m.adult);

        const anime = animeRes.data.Page.media.map((m: any) => ({
          id: m.id,
          title: m.title.english || m.title.romaji,
          overview: m.description,
          posterPath: m.coverImage.extraLarge,
          backdropPath: m.bannerImage || m.coverImage.extraLarge,
          releaseDate: m.startDate.year?.toString() || '',
          voteAverage: m.averageScore / 10,
          mediaType: 'anime' as const,
          adult: false,
          genres: m.genres,
        }));

        setResults([...movies, ...anime].sort((a, b) => b.voteAverage - a.voteAverage));
      } catch (error) {
        console.error('Error fetching genre content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenreContent();
  }, [genreKey]);

  if (!genreInfo) return <div className="p-40 text-center font-black uppercase tracking-widest text-slate-400">Resource not found.</div>;

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 space-y-4"
      >
        <div className="flex items-center gap-3">
           <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800 text-primary">
             <BookOpen size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Curated Genre</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{genreInfo.name}</h1>
        <p className="text-secondary font-medium text-lg max-w-2xl leading-relaxed">
          {genreInfo.description}
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
          {results.map((item, i) => (
            <motion.div
              key={`${item.mediaType}-${item.id}`}
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
