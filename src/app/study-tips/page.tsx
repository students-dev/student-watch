'use client';

import { motion } from 'framer-motion';
import { BookOpen, Coffee, Clock, Target, Zap, Brain, Sun, Moon, ShieldCheck, Heart } from 'lucide-react';

export default function StudyTipsPage() {
  const tips = [
    {
      title: "The 50/10 Rule",
      desc: "Study intensely for 50 minutes, then use Student-Watch for a 10-minute short anime break. This maintains high dopamine levels without burnout.",
      icon: <Clock className="text-primary" />,
      color: "bg-primary/5"
    },
    {
      title: "Atmospheric Focus",
      desc: "Use our 'Deep Focus' genre during study sessions. Atmospheric soundtracks can help mask distracting background noise.",
      icon: <Brain className="text-indigo-500" />,
      color: "bg-indigo-500/5"
    },
    {
      title: "Active Learning",
      desc: "Watching a scientific documentary? Try to summarize each chapter in 3 sentences. Active recall is 3x more effective than passive watching.",
      icon: <Target className="text-accent" />,
      color: "bg-accent/5"
    },
    {
      title: "Night Routine",
      desc: "Switch to the 'Deep Focus' theme after 9 PM. Muted colors help your eyes relax and prepare your brain for sleep after a late session.",
      icon: <Moon className="text-yellow-500" />,
      color: "bg-yellow-500/5"
    },
    {
      title: "Hydration & Movement",
      desc: "Every time you finish an episode, stand up, stretch, and drink a glass of water. Physical movement resets your focus.",
      icon: <Heart className="text-red-500" />,
      color: "bg-red-500/5"
    },
    {
      title: "Uplift Your Mood",
      desc: "If an exam didn't go well, head to the 'Mood Off' section. Motivational content can help you bounce back faster.",
      icon: <Sun className="text-orange-500" />,
      color: "bg-orange-500/5"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 space-y-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
           <Zap size={20} />
           <span className="text-[10px] font-black uppercase tracking-widest">Academic Well-being</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-gradient">Study Tips</h1>
        <p className="text-secondary font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          How to master the art of the perfect break. Our curated strategies to help you stay productive while enjoying your favorite content.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`ultra-card p-10 space-y-6 hover:border-primary/30 transition-all duration-500`}
          >
            <div className={`w-16 h-16 rounded-3xl ${tip.color} flex items-center justify-center`}>
               {tip.icon}
            </div>
            <div className="space-y-3">
               <h3 className="text-2xl font-black uppercase tracking-tight">{tip.title}</h3>
               <p className="text-secondary font-medium leading-relaxed">{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-16 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 p-12 opacity-10">
            <BookOpen size={200} />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Mental Health Matters</h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
              Student-Watch isn't just about watching; it's about balance. We believe that a well-rested student is a successful student. Use this platform as a tool for your growth, not just a distraction.
            </p>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
               <ShieldCheck size={20} /> Built for students-dev
            </div>
         </div>
      </motion.div>
    </div>
  );
}
