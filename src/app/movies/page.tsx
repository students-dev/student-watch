'use client';

import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, Film } from 'lucide-react';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { data } = await tmdbClient.get('/movie/popular');
        setMovies(data.results.map((m: any) => ({
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
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Film className="text-primary" size={28} />
        <h1 className="text-3xl font-bold">Popular Movies</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      )}
    </div>
  );
}
