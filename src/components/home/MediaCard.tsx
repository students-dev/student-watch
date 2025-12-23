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
      whileHover={{ y: -8 }}
      className="premium-card group h-full flex flex-col"
    >
      <Link href={`/watch/${media.mediaType}/${media.id}`} className="flex-grow flex flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={media.posterPath || 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop'}
            alt={media.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          
          {/* Subtle Info Badge */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 border border-white/20">
              <Star size={12} fill="currentColor" />
              {media.voteAverage > 0 ? media.voteAverage.toFixed(1) : 'NEW'}
            </div>

            <button 
              onClick={toggleLibrary}
              className={`p-2 rounded-xl backdrop-blur-md border border-white/20 transition-all ${
                bookmarked ? 'bg-primary text-white' : 'bg-white/80 dark:bg-slate-900/80 text-secondary hover:text-primary'
              }`}
            >
              {bookmarked ? <BookmarkCheck size={16} fill="currentColor" /> : <Bookmark size={16} />}
            </button>
          </div>

          {/* Hover Play Button Overlay */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
             <div className="bg-white text-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
               <Play fill="currentColor" size={24} className="ml-1" />
             </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-black text-sm md:text-base line-clamp-1 group-hover:text-primary transition-colors duration-300 tracking-tight uppercase">
            {media.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               {media.releaseDate ? media.releaseDate.split('-')[0] : 'TBA'}
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-200" />
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
               {media.mediaType}
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
