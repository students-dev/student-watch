'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Plus, Minus, BookOpen, ShieldCheck, Users, Zap } from 'lucide-react';

const faqs = [
  {
    question: "Is Student-Watch actually free?",
    answer: "Yes, 100%. We are an open-source project built by students for students. There are no subscription fees, and all our data comes from community-driven APIs.",
    icon: <Zap size={20} className="text-yellow-500" />
  },
  {
    question: "How do you filter 18+ content?",
    answer: "We use a dual-layered filtering system. First, we enable strict adult filters on the TMDB and AniList API calls. Second, we have a manual blacklist of genres and tags that are not suitable for a focused study environment.",
    icon: <ShieldCheck size={20} className="text-emerald-500" />
  },
  {
    question: "Can I watch movies with my friends?",
    answer: "Absolutely! Use our 'Sync-Watch Party' feature. Just click the button on any movie page to create a private room and share the link with your classmates.",
    icon: <Users size={20} className="text-primary" />
  },
  {
    question: "What are 'Student Genres'?",
    answer: "Standard genres focus on categories like 'Action' or 'Drama'. Our custom genres like 'Exam Time' or 'Mood Off' are curated based on the emotional and academic needs of students.",
    icon: <BookOpen size={20} className="text-indigo-500" />
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 space-y-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
           <HelpCircle size={20} />
           <span className="text-[10px] font-black uppercase tracking-widest">Support Center</span>
        </div>
        <h1 className="text-6xl font-black tracking-tighter uppercase text-gradient">Frequently Asked</h1>
        <p className="text-secondary font-medium text-lg max-w-2xl mx-auto">
          Everything you need to know about the platform and our mission to create a safe sanctuary for students.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="ultra-card !rounded-[2rem] overflow-hidden"
          >
            <button 
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-6">
                 <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800">
                    {faq.icon}
                 </div>
                 <span className="text-xl font-black uppercase tracking-tight">{faq.question}</span>
              </div>
              <div className={`p-2 rounded-full transition-transform duration-500 ${activeIndex === i ? 'rotate-180 bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                 <ChevronDown size={20} />
              </div>
            </button>
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-24 pb-10 text-secondary font-medium leading-relaxed text-lg">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[3rem] bg-indigo-500 text-white text-center shadow-2xl shadow-indigo-500/20">
         <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Still have questions?</h2>
         <p className="font-bold opacity-80 mb-8">Our team is always here to help you navigate your academic breaks.</p>
         <button className="btn-ultra !bg-white !text-indigo-500 mx-auto">Contact Support</button>
      </div>
    </div>
  );
}
