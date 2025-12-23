'use client';

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send, MessageCircle, Play, Info, ShieldCheck, Share2, Loader2, ArrowLeft } from "lucide-react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import { getMediaDetails } from "@/lib/api";
import Link from "next/link";
import { toast } from "sonner";

function PartyContent() {
  const { id: roomId } = useParams();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get('type');
  const mediaId = searchParams.get('id');
  
  const { data: session } = useSession();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([
    { user: 'System', text: 'Welcome to the Safe Party! Stay focused and respect others.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [media, setMedia] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return;

    const channel = pusherClient.subscribe(`party-${roomId}`);
    
    channel.bind("message", (data: { text: string; user: string }) => {
      setMessages((prev) => [...prev, { user: data.user, text: data.text }]);
    });

    return () => {
      pusherClient.unsubscribe(`party-${roomId}`);
    };
  }, [roomId]);

  useEffect(() => {
    async function fetchMedia() {
      if (mediaType && mediaId) {
        const data = await getMediaDetails(mediaType, mediaId);
        setMedia(data);
      }
    }
    fetchMedia();
  }, [mediaType, mediaId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    try {
      await axios.post("/api/party/message", {
        roomId,
        message: inputText,
        user: session?.user?.name || "Guest Student",
      });
      setInputText('');
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setIsSending(false);
    }
  };

  const embedUrl = mediaType === 'movie' 
    ? `https://vidify.top/embed/movie/${mediaId}`
    : `https://vidify.top/embed/tv/${mediaId}/1/1`;

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 overflow-hidden bg-background">
      {/* Left: Player & Info */}
      <div className="flex-grow flex flex-col p-6 lg:p-10 space-y-6 overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-3">
              <Link href={`/watch/${mediaType}/${mediaId}`} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-secondary hover:text-primary transition-all">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Sync-Watch</span>
                <h1 className="text-xl font-black uppercase tracking-tight">{media?.title || 'Loading...'}</h1>
              </div>
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
              <ShieldCheck size={14} /> Room ID: {(roomId as string)?.slice(0, 6)}
           </div>
        </div>

        <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 dark:border-slate-800">
           {mediaId ? (
             <iframe
               src={embedUrl}
               className="absolute inset-0 w-full h-full border-0"
               allowFullScreen
               allow="autoplay; encrypted-media"
             />
           ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
                <div className="text-center">
                   <Play size={64} className="text-white mx-auto mb-4 opacity-50" />
                   <p className="text-white/50 font-black uppercase tracking-widest text-xs">Waiting for leader to start...</p>
                </div>
             </div>
           )}
        </div>

        <div className="ultra-card p-8">
           <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
              <Users size={18} className="text-primary" /> Student Social
           </h2>
           <p className="text-secondary text-sm font-medium leading-relaxed">
              You are watching **{media?.title}** with other students. 
              The Sync-Watch system ensures everyone is on the same page. 
              Use the chat to discuss key scenes or study concepts!
           </p>
           <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Invite link copied to clipboard!");
                }}
                className="btn-ultra !px-6 !py-3 !text-[8px]"
              >
                <Share2 size={14} /> Copy Invite Link
              </button>
           </div>
        </div>
      </div>

      {/* Right: Chat */}
      <div className="w-full lg:w-96 flex flex-col border-l border-white/10 bg-white/5 dark:bg-slate-900/50 backdrop-blur-3xl">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
           <MessageCircle size={20} className="text-primary" />
           <span className="font-black uppercase tracking-widest text-xs">Student Chat</span>
        </div>

        <div className="flex-grow p-6 space-y-4 overflow-y-auto scrollbar-hide">
           {messages.map((msg, i) => {
             const isMe = msg.user === (session?.user?.name || "Guest Student");
             return (
               <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">{msg.user}</span>
                  <div className={`px-4 py-2 rounded-2xl text-xs font-bold ${
                    msg.user === 'System' ? 'bg-primary/10 text-primary italic' : 
                    isMe ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/10 dark:bg-slate-800 text-secondary border border-white/5'
                  }`}>
                     {msg.text}
                  </div>
               </div>
             );
           })}
           <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10 flex gap-2">
           <input 
             type="text" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="Type a message..."
             className="flex-grow bg-white/5 dark:bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary/50 transition-all text-foreground"
           />
           <button 
             type="submit" 
             disabled={isSending}
             className="p-3 rounded-xl bg-primary text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
           >
              {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
           </button>
        </form>
      </div>
    </div>
  );
}

export default function PartyPage() {
  return (
    <Suspense fallback={<div className="p-40 text-center uppercase tracking-widest font-black">Joining Session...</div>}>
      <PartyContent />
    </Suspense>
  );
}
