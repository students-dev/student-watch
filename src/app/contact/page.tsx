'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Github, Send, MapPin, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
               <Mail size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Connect with us</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter uppercase text-gradient leading-[0.85]">Let's Start a <br /> Conversation.</h1>
            <p className="text-secondary font-medium text-xl max-w-md leading-relaxed">
              Have a suggestion for a new student genre? Found a bug? Just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-8">
             <div className="flex items-center gap-6 group">
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                   <Github size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Open Source</p>
                   <Link href="https://github.com/students-dev" className="text-xl font-black uppercase tracking-tight hover:text-primary transition-colors">students-dev</Link>
                </div>
             </div>
             <div className="flex items-center gap-6 group">
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                   <Mail size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Email Support</p>
                   <p className="text-xl font-black uppercase tracking-tight">hello@students-dev.xyz</p>
                </div>
             </div>
             <div className="flex items-center gap-6 group">
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Privacy First</p>
                   <p className="text-xl font-black uppercase tracking-tight">Secure Communications</p>
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="ultra-card p-12 space-y-8"
        >
          <div className="space-y-2">
             <h2 className="text-3xl font-black uppercase tracking-tighter">Send a message</h2>
             <p className="text-secondary font-medium">Estimated response time: 24-48 hours.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                   <input type="text" placeholder="John Doe" className="w-full px-8 py-4 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                   <input type="email" placeholder="john@university.edu" className="w-full px-8 py-4 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                <input type="text" placeholder="I have a suggestion..." className="w-full px-8 py-4 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Message</label>
                <textarea rows={5} placeholder="Tell us what's on your mind..." className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm resize-none"></textarea>
             </div>
             <button className="btn-ultra w-full py-5">
                <Send size={20} />
                Send Message
             </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
