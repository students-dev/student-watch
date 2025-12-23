'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Media } from '@/types';
import { tmdbClient, fetchFromAniList, ANIME_QUERY } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query) return;
      setLoading(true);
      try {
        const [movieRes, animeRes] = await Promise.all([
          tmdbClient.get('/search/movie', { params: { query } }),
          fetchFromAniList(ANIME_QUERY, { search: query, perPage: 20 })
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

        setResults([...movies, ...anime]);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <SearchIcon className="text-primary" size={28} />
        <h1 className="text-3xl font-bold">
          Results for <span className="text-primary">"{query}"</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-secondary">Searching across movies and anime...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((item) => (
            <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-xl text-secondary mb-2">No results found.</p>
          <p className="text-sm text-secondary/60">Try searching for something else, like "Interstellar" or "Naruto".</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
