'use client';

import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { fetchFromAniList, ANIME_QUERY } from '@/lib/api';
import MediaCard from '@/components/home/MediaCard';
import { Loader2, Tv } from 'lucide-react';

export default function AnimePage() {
  const [anime, setAnime] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await fetchFromAniList(ANIME_QUERY, { page: 1, perPage: 30 });
        setAnime(data.data.Page.media.map((m: any) => ({
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
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Tv className="text-primary" size={28} />
        <h1 className="text-3xl font-bold">Popular Anime</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {anime.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      )}
    </div>
  );
}
