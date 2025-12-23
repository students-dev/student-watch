'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { tmdbClient } from '@/lib/api';
import { Star, ArrowLeft, Share2, Info, ShieldCheck, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      setLoading(false);
    }
    fetchDetails();
  }, [id, type]);

  const embedUrl = type === 'movie' 
    ? `https://vidify.top/embed/movie/${id}`
    : `https://vidify.top/embed/tv/${id}/1/1`;

  if (loading) return (
    <div className="flex-grow flex items-center justify-center py-40">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="flex-grow bg-background/30 pb-32">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-secondary hover:text-primary transition-all shadow-xl shadow-primary/5 font-black text-xs uppercase tracking-widest">
            <ArrowLeft size={16} />
            Back to Browse
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Player Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-10"
          >
            <div className="relative aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white dark:border-slate-800">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-primary/5 border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <h1 className="text-4xl font-black tracking-tighter uppercase">{media?.title}</h1>
                <div className="flex items-center gap-3">
                   <div className="bg-accent/10 text-accent px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-accent/20">
                     <ShieldCheck size={16} /> 100% Safe
                   </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 font-black text-xs border border-yellow-100 dark:border-yellow-500/20">
                  <Star size={16} fill="currentColor" />
                  {media?.voteAverage.toFixed(1)} Rating
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 font-black text-xs border border-blue-100 dark:border-blue-500/20">
                  <Calendar size={16} />
                  {media?.releaseDate.split('-')[0]}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 font-black text-xs border border-slate-200 dark:border-slate-700 uppercase tracking-widest">
                  {type}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Overview</h3>
                <p className="text-secondary leading-relaxed text-lg font-medium">
                  {media?.overview}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {media?.genres.map(genre => (
                  <span key={genre} className="px-4 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-xl bg-accent/10 text-accent">
                   <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-lg font-black tracking-tight uppercase">Safe Space</h3>
              </div>
              <p className="text-sm text-secondary mb-8 font-medium leading-relaxed">
                Every title on **Student-Watch** undergoes a dual-layered filter process. 
                We ensure your study breaks are free from mature content.
              </p>
              <button className="w-full py-4 px-6 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share Resource
              </button>
            </div>

            <div className="p-8 rounded-[3rem] bg-gradient-to-br from-primary to-indigo-600 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform">
                <BookOpen size={64} />
              </div>
              <h3 className="text-xl font-black mb-4 relative z-10 uppercase tracking-tight">Study Hack</h3>
              <p className="text-sm text-white/80 font-medium leading-relaxed relative z-10">
                Did you know? Taking a 15-minute cinematic break can boost your information retention by up to 20%!
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Support</h3>
              <p className="text-xs text-secondary font-bold leading-relaxed">
                Notice something inappropriate? <br />
                <Link href="/about" className="text-primary hover:underline">Report it immediately</Link> and help us keep this space safe.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
