'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Media } from '@/types';
import { getMediaDetails } from '@/lib/api';
import { Star, ArrowLeft, Share2, Info, ShieldCheck, Calendar, BookOpen, Users, Clock, Languages, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MediaCard from '@/components/home/MediaCard';
import Image from 'next/image';

export default function WatchPage() {
  const { type, id } = useParams();
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const data = await getMediaDetails(type as string, id as string);
      if (data) setMedia(data);
      setLoading(false);
    }
    fetchDetails();
  }, [id, type]);

  const embedUrl = type === 'movie' 
    ? `https://vidify.top/embed/movie/${id}`
    : `https://vidify.top/embed/tv/${id}/1/1`;

  if (loading) return (
    <div className="flex-grow flex items-center justify-center py-40">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-8 border-primary/10 rounded-full" />
        <div className="absolute inset-0 border-8 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (!media) return <div className="p-40 text-center font-black uppercase tracking-[0.5em] text-slate-400">Content not found.</div>;

  return (
    <div className="flex-grow pb-32">
      {/* Dynamic Backdrop */}
      <div className="absolute top-0 left-0 w-full h-[70vh] -z-10 opacity-20 blur-3xl">
         {media.backdropPath && <Image src={media.backdropPath} alt="backdrop" fill className="object-cover" />}
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <Link href="/" className="btn-ultra-outline !px-6 !py-3">
            <ArrowLeft size={18} />
            Back to Discovery
          </Link>
          <div className="flex items-center gap-4">
             <button className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 hover:text-primary transition-all">
                <Share2 size={20} />
             </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video bg-black rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border-[12px] border-white dark:border-slate-800"
            >
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </motion.div>

            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                   <span className="px-4 py-1.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest">{type}</span>
                   {media.tagline && <span className="text-secondary font-bold italic text-sm">"{media.tagline}"</span>}
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-gradient leading-[0.85]">{media.title}</h1>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 text-center">
                    <Star className="mx-auto mb-2 text-gold" size={24} fill="currentColor" />
                    <p className="text-xl font-black tracking-tighter">{media.voteAverage.toFixed(1)}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">TMDB Rating</p>
                 </div>
                 <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 text-center">
                    <Clock className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-xl font-black tracking-tighter">{media.runtime}m</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Duration</p>
                 </div>
                 <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 text-center">
                    <Calendar className="mx-auto mb-2 text-accent" size={24} />
                    <p className="text-xl font-black tracking-tighter">{media.releaseDate.split('-')[0]}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Release Year</p>
                 </div>
                 <div className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 text-center">
                    <ShieldCheck className="mx-auto mb-2 text-emerald-500" size={24} />
                    <p className="text-xl font-black tracking-tighter">Safe</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Content Status</p>
                 </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-primary">The Narrative</h3>
                <p className="text-xl text-secondary leading-relaxed font-medium">
                  {media.overview}
                </p>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-primary">Top Billing Cast</h3>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                   {media.cast?.map((person: any) => (
                     <div key={person.id} className="min-w-[120px] text-center space-y-3">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                           <Image 
                             src={person.profilePath || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'} 
                             alt={person.name} 
                             fill 
                             className="object-cover" 
                           />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">{person.name}</p>
                           <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{person.character}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="ultra-card p-10 space-y-8"
            >
              <div className="space-y-2">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Sync-Watch</h2>
                 <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Start a shared session</p>
              </div>
              <p className="text-sm text-secondary leading-relaxed font-medium">
                Host a virtual study break! Watch together with friends in a safe, ad-free environment.
              </p>
              <button 
                onClick={() => window.location.href = `/party/${Math.random().toString(36).substring(7)}?type=${type}&id=${id}`}
                className="btn-ultra w-full !py-5"
              >
                <Users size={20} />
                Launch Party Room
              </button>
            </motion.div>

            <div className="space-y-8">
               <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 px-4">Recommendations</h3>
               <div className="grid grid-cols-2 gap-6">
                  {media.recommendations?.map((item: any) => (
                    <div key={item.id} className="scale-90">
                       <MediaCard media={item} />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}