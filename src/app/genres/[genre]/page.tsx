'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient, fetchFromAniList, ANIME_QUERY, CUSTOM_GENRES } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2 } from 'lucide-react';

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
        // In a real app, we would use sophisticated queries. 
        // For now, we search by the keywords/tags defined in CUSTOM_GENRES.
        
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

  if (!genreInfo) return <div className="p-20 text-center">Genre not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{genreInfo.name}</h1>
        <p className="text-secondary text-lg max-w-3xl">
          {genreInfo.description}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary mb-4" size={48} />
          <p className="text-secondary">Curating the best content for your needs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map((item) => (
            <MediaCard key={`${item.mediaType}-${item.id}`} media={item} />
          ))}
        </div>
      )}
    </div>
  );
}
