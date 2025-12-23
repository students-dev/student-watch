'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/80 backdrop-blur-2xl">
      <div className="relative">
        {/* Outer Pulsing Rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-40px] rounded-full bg-primary/20 blur-2xl"
        />
        
        {/* Spinning Outer Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-b-2 border-primary/30"
        />

        {/* Inner Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 360],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-5 rounded-[2rem] bg-primary text-white shadow-2xl shadow-primary/40"
          >
            <GraduationCap size={40} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-gradient">
          Preparing Session
        </h2>
        <div className="flex gap-1 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}