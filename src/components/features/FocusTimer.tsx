'use client';

import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {});
      alert(mode === 'work' ? "Study session finished! Time for a break." : "Break finished! Back to focus.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white dark:bg-slate-900 border-2 border-primary/20 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/20 w-80 mb-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xs uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                <Timer size={16} />
                Focus Timer
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {mode === 'work' ? 'Time to Focus' : 'Taking a Break'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => switchMode('work')}
                className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === 'work' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <BookOpen size={14} />
                Study
              </button>
              <button
                onClick={() => switchMode('break')}
                className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === 'break' 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Coffee size={14} />
                Break
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleTimer}
                className="flex-grow flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={resetTimer}
                className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:rotate-180 transition-transform duration-500"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white p-5 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center relative group"
          >
            <Timer size={28} />
            <span className="absolute left-full ml-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              Focus Timer
            </span>
            {isActive && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
