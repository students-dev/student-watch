'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send, MessageCircle, Play, Info, ShieldCheck, Share2 } from "lucide-react";

export default function PartyPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([
    { user: 'System', text: 'Welcome to the Safe Party! Stay focused and respect others.' }
  ]);
  const [inputText, setInputText] = useState('');

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="font-black uppercase tracking-widest text-slate-400">Please sign in to join a party.</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { user: session.user?.name || 'Student', text: inputText }]);
    setInputText('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 overflow-hidden bg-background">
      {/* Left: Player & Info */}
      <div className="flex-grow flex flex-col p-6 lg:p-10 space-y-6 overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary text-white">
                <Users size={20} />
              </div>
              <h1 className="text-xl font-black uppercase tracking-tight">Party Room: {id?.slice(0, 8)}...</h1>
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
              <ShieldCheck size={14} /> Safe Session
           </div>
        </div>

        <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5">
           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
              <div className="text-center">
                 <Play size={64} className="text-white mx-auto mb-4 opacity-50" />
                 <p className="text-white/50 font-black uppercase tracking-widest text-xs">Waiting for leader to start...</p>
              </div>
           </div>
           {/* In a real app, the iframe would be here */}
        </div>

        <div className="ultra-card p-8">
           <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
              <Info size={18} className="text-primary" /> How it works
           </h2>
           <p className="text-secondary text-sm font-medium leading-relaxed">
              Sync-Watch allows you to watch content simultaneously with other students. 
              The room leader controls play/pause. All content is filtered through our **Safe-Curation** engine.
           </p>
           <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:scale-105 transition-all">
              <Share2 size={14} /> Invite other students
           </button>
        </div>
      </div>

      {/* Right: Chat */}
      <div className="w-full lg:w-96 flex flex-col border-l border-white/10 bg-white/5 dark:bg-slate-900/50 backdrop-blur-3xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
           <MessageCircle size={20} className="text-primary" />
           <span className="font-black uppercase tracking-widest text-xs">Student Chat</span>
        </div>

        <div className="flex-grow p-6 space-y-4 overflow-y-auto scrollbar-hide">
           {messages.map((msg, i) => (
             <div key={i} className={`flex flex-col ${msg.user === session.user?.name ? 'items-end' : 'items-start'}`}>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">{msg.user}</span>
                <div className={`px-4 py-2 rounded-2xl text-xs font-bold ${
                  msg.user === 'System' ? 'bg-primary/10 text-primary italic' : 
                  msg.user === session.user?.name ? 'bg-primary text-white' : 'bg-white/10 text-secondary'
                }`}>
                   {msg.text}
                </div>
             </div>
           ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 flex gap-2">
           <input 
             type="text" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="Type a message..."
             className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary/50 transition-all"
           />
           <button type="submit" className="p-3 rounded-xl bg-primary text-white hover:scale-110 active:scale-95 transition-all">
              <Send size={18} />
           </button>
        </form>
      </div>
    </div>
  );
}
