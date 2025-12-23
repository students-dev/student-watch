'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Play, Tv, Bookmark, BookmarkCheck } from 'lucide-react';
import { Media } from '@/types';
import { motion } from 'framer-motion';
import { useLibrary } from '@/context/LibraryContext';

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  const { addToLibrary, removeFromLibrary, isInLibrary } = useLibrary();
  const bookmarked = isInLibrary(media.id);

  const toggleLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeFromLibrary(media.id);
    } else {
      addToLibrary(media);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="ultra-card group h-full flex flex-col"
    >
      <Link href={`/watch/${media.mediaType}/${media.id}`} className="flex-grow flex flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={media.posterPath || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop'}
            alt={media.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          
          {/* Subtle Info Badge */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border border-white/20">
              <Star size={12} fill="currentColor" />
              {media.voteAverage > 0 ? media.voteAverage.toFixed(1) : 'NEW'}
            </div>

            <button 
              onClick={toggleLibrary}
              className={`p-3 rounded-2xl backdrop-blur-2xl border border-white/20 transition-all duration-500 hover:scale-110 active:scale-95 ${
                bookmarked ? 'bg-primary text-white' : 'bg-white/40 dark:bg-slate-900/40 text-secondary hover:text-primary'
              }`}
            >
              {bookmarked ? <BookmarkCheck size={18} fill="currentColor" /> : <Bookmark size={18} />}
            </button>
          </div>

          {/* Hover Play Button Overlay */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center z-0">
             <div className="bg-white text-primary w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
               <Play fill="currentColor" size={28} className="ml-1" />
             </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="font-black text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors duration-500 tracking-tight uppercase leading-tight">
            {media.title}
          </h3>
          <div className="flex items-center gap-3 mt-3">
             <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
               {media.releaseDate ? media.releaseDate.split('-')[0] : 'TBA'}
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
               {media.mediaType}
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
