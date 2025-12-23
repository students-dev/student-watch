'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const missions = [
    {
      title: 'Safety First',
      desc: 'We use advanced server-side filters to ensure zero 18+ or mature content ever reaches your screen.',
      icon: <ShieldCheck className="text-accent" />
    },
    {
      title: 'Mental Health',
      desc: 'Our "Mood Off" and "Exam Time" categories are designed by students to help reduce academic burnout.',
      icon: <Target className="text-primary" />
    },
    {
      title: 'Educational Value',
      desc: 'We curate anime and movies that teach science, history, and philosophy in an engaging way.',
      icon: <BookOpen className="text-indigo-500" />
    },
    {
      title: 'Community Built',
      desc: 'Student-Watch is built by students, for students. We understand the pressure of campus life.',
      icon: <Users className="text-orange-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-black mb-8 leading-[1]">
            THE STREAMING PLATFORM <br />
            <span className="text-primary">YOU DESERVE.</span>
          </h1>
          <p className="text-xl text-secondary mb-8 leading-relaxed font-medium">
            Tired of being distracted by inappropriate content or overwhelmed by infinite choices? 
            Student-Watch is a curated sanctuary designed for your academic journey.
          </p>
          <div className="flex gap-4">
             <div className="text-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex-1">
                <p className="text-3xl font-black text-primary">0%</p>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">Mature Content</p>
             </div>
             <div className="text-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex-1">
                <p className="text-3xl font-black text-accent">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">Student Safe</p>
             </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square bg-gradient-to-br from-primary/10 to-indigo-500/10 rounded-[4rem] flex items-center justify-center p-12 overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-full animate-float opacity-30">
              <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
           </div>
           <div className="text-8xl select-none">🎓</div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {missions.map((m, idx) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
              {m.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{m.title}</h3>
            <p className="text-secondary text-sm leading-relaxed font-medium">
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
