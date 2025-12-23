'use client';

import { CUSTOM_GENRES } from '@/lib/api';
import { GraduationCap, Smile, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GenresPage() {
  const genres = [
    { 
      key: 'EXAM_TIME', 
      ...CUSTOM_GENRES.EXAM_TIME, 
      icon: <GraduationCap size={40} />, 
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-indigo-600'
    },
    { 
      key: 'MOOD_OFF', 
      ...CUSTOM_GENRES.MOOD_OFF, 
      icon: <Smile size={40} />, 
      color: 'bg-yellow-500',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      key: 'EDUCATIONAL', 
      ...CUSTOM_GENRES.EDUCATIONAL, 
      icon: <BookOpen size={40} />, 
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-600'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Student-Centric Categories</h1>
        <p className="text-secondary max-w-2xl mx-auto">
          We've curated these special categories to match your academic life and mental well-being.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {genres.map((genre, idx) => (
          <motion.div
            key={genre.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800"
          >
            <div className={`h-32 bg-gradient-to-br ${genre.gradient} flex items-center justify-center text-white`}>
              {genre.icon}
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-3">{genre.name}</h2>
              <p className="text-secondary mb-6 leading-relaxed">
                {genre.description}
              </p>
              <Link 
                href={`/genres/${genre.key.toLowerCase()}`}
                className="inline-flex items-center gap-2 font-semibold text-primary group-hover:gap-4 transition-all"
              >
                Explore Collection <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-20 p-10 bg-primary/5 rounded-3xl border border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="bg-primary/10 p-4 rounded-2xl text-primary">
            <GraduationCap size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Why Custom Genres?</h2>
            <p className="text-secondary">
              Standard movie sites are built for entertainment. **Student-Watch** is built for your lifestyle. 
              Whether you need to focus, cheer up after a tough exam, or learn something outside the syllabus, 
              we've got you covered with 100% student-safe content.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
