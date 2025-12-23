'use client';

import { useSession } from "next-auth/react";
import { useLibrary } from "@/context/LibraryContext";
import { useTheme, ThemeType } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { User, Settings, Bookmark, Trophy, Shield, Palette } from "lucide-react";
import MediaCard from "@/components/home/MediaCard";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { library } = useLibrary();
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeType; name: string; color: string }[] = [
    { id: 'soft', name: 'Soft Study', color: 'bg-indigo-500' },
    { id: 'parchment', name: 'Old Library', color: 'bg-amber-600' },
    { id: 'blueprint', name: 'Engineer', color: 'bg-blue-700' },
    { id: 'cyber', name: 'Cyber Lab', color: 'bg-fuchsia-500' },
    { id: 'midnight', name: 'Deep Focus', color: 'bg-slate-900' },
  ];

  if (!session) return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <p className="text-secondary font-black uppercase tracking-widest">Please sign in to view your profile.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="ultra-card p-10 text-center">
            <div className="relative inline-block mb-6">
              <img 
                src={session.user?.image || ''} 
                alt="Profile" 
                className="w-32 h-32 rounded-[2.5rem] border-4 border-primary shadow-2xl mx-auto" 
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-2xl shadow-xl">
                <Shield size={20} />
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">{session.user?.name}</h1>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">{session.user?.email}</p>
            
            <div className="mt-10 grid grid-cols-2 gap-4">
               <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10">
                  <p className="text-2xl font-black text-primary">{library.length}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Bookmarks</p>
               </div>
               <div className="p-4 rounded-3xl bg-accent/5 border border-accent/10">
                  <p className="text-2xl font-black text-accent">1</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Sessions</p>
               </div>
            </div>
          </div>

          <div className="ultra-card p-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-8 flex items-center gap-2">
              <Palette size={16} /> Appearance
            </h3>
            <div className="space-y-3">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    theme === t.id ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.name}</span>
                  <div className={`w-4 h-4 rounded-full ${t.color} border-2 border-white`} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-12"
        >
          <section className="ultra-card p-10">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-8 flex items-center gap-3">
              <Trophy className="text-gold" /> Study Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 opacity-50">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">🎓</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Early Bird</p>
                    <p className="text-[10px] text-slate-400 font-bold">Watch 5 educational titles</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 opacity-50">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">🔬</div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Scientist</p>
                    <p className="text-[10px] text-slate-400 font-bold">Finish 3 scientific documentaries</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
                <Bookmark className="text-primary" /> My Collection
              </h2>
            </div>
            
            {library.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {library.map((item) => (
                  <MediaCard key={item.id} media={item} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center ultra-card">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Your library is currently empty.</p>
              </div>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  );
}
