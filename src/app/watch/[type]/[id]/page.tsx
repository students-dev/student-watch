'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient } from '@/lib/api';
import { Star, ArrowLeft, Share2, Info } from 'lucide-react';
import Link from 'next/link';

export default function WatchPage() {
  const { type, id } = useParams();
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      if (type === 'movie' || type === 'tv') {
        try {
          const { data } = await tmdbClient.get(`/${type}/${id}`);
          setMedia({
            id: data.id,
            tmdbId: data.id,
            title: data.title || data.name,
            overview: data.overview,
            posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            backdropPath: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            releaseDate: data.release_date || data.first_air_date,
            voteAverage: data.vote_average,
            mediaType: type as 'movie' | 'tv',
            adult: data.adult,
            genres: data.genres.map((g: any) => g.name),
          });
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      }
      // TODO: Handle Anime details from AniList
      setLoading(false);
    }
    fetchDetails();
  }, [id, type]);

  const embedUrl = type === 'movie' 
    ? `https://vidify.top/embed/movie/${id}`
    : `https://vidify.top/embed/tv/${id}/1/1`; // Defaulting to S1E1 for TV

  if (loading) return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex-grow bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h1 className="text-3xl font-bold mb-4">{media?.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-6">
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star size={16} fill="currentColor" />
                  {media?.voteAverage.toFixed(1)}
                </div>
                <span>{media?.releaseDate.split('-')[0]}</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded uppercase tracking-wider text-[10px] font-bold">
                  {type}
                </span>
                {media?.genres.map(genre => (
                  <span key={genre} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-secondary leading-relaxed">
                {media?.overview}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info size={20} className="text-primary" />
                Student Safety
              </h3>
              <p className="text-sm text-secondary mb-4">
                This content has been filtered to ensure it is safe for school environments and free of 18+ material.
              </p>
              <button className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-medium">
                <Share2 size={18} />
                Share with Friends
              </button>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2 text-primary">Pro Tip</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Watching during a study break? Research shows a 15-minute break every hour improves focus!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
