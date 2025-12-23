'use client';

import { useLibrary } from '@/context/LibraryContext';
import MediaCard from '@/components/home/MediaCard';
import { Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LibraryPage() {
  const { library } = useLibrary();

  return (
    <div className="container mx-auto px-4 py-20 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 space-y-4"
      >
        <div className="flex items-center gap-3">
           <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 border border-slate-100 dark:border-slate-800 text-primary">
             <Bookmark size={32} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Personal Space</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
          My Safe <span className="text-primary">Library</span>
        </h1>
        <p className="text-secondary font-medium text-lg max-w-2xl leading-relaxed">
          Your hand-picked collection for study breaks. 
          Everything here is filtered and ready for your next session.
        </p>
      </motion.div>

      {library.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {library.map((item, i) => (
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
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800"
        >
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 mb-6">
            <Sparkles size={40} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Your library is empty</h2>
          <p className="text-secondary font-medium max-w-sm mb-10">
            Start exploring and click the bookmark icon to save items for your study breaks.
          </p>
          <Link href="/" className="btn-premium group">
            Start Exploring
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
