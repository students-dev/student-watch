import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import AuthProvider from "@/components/layout/AuthProvider";
import { LibraryProvider } from "@/context/LibraryContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student-Watch | Safe Streaming for Students",
  description: "A curated, 18+ free movie and anime streaming platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      return (
        <html lang="en">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="theme-color" content="#6366f1" />
          </head>
    
                    <body
                      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
                    >
                      <AuthProvider>
                        <ThemeProvider>
                          <LibraryProvider>
                            <Navbar />
                            <main className="flex-grow">
                              <PageTransition>
                                {children}
                              </PageTransition>
                            </main>
                          </LibraryProvider>
                        </ThemeProvider>
                      </AuthProvider>
                          
                      <footer className="bg-black border-t border-white/5 pt-20 pb-10">

                  <div className="max-w-7xl mx-auto px-4">

                    <div className="grid md:grid-cols-4 gap-12 mb-16">

                      <div className="col-span-2">

                        <div className="flex items-center gap-2 text-primary font-black text-2xl tracking-tighter mb-6">

                          <div className="bg-primary text-white p-1.5 rounded-md">

                            <GraduationCap size={24} />

                          </div>

                          <span className="text-white">STUDENT WATCH</span>

                        </div>

                        <p className="text-secondary max-w-sm font-medium leading-relaxed">

                          Powered by <span className="text-white font-bold">students-dev</span>. 

                          A sanctuary for student entertainment, free from mature content and distractions.

                        </p>

                        <div className="mt-6 flex gap-4 text-xs font-bold text-secondary uppercase tracking-widest">

                          <span>Dev: Ramkrishna</span>

                          <span>Dev: Manjunath</span>

                        </div>

                      </div>

        

              

                            <div>

        

              

                              <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Explore</h4>

        

              

                              <ul className="space-y-4 text-sm font-bold text-secondary">

        

              

                                <li><Link href="/movies" className="hover:text-primary transition-colors">Movies</Link></li>

        

              

                                <li><Link href="/anime" className="hover:text-primary transition-colors">Anime</Link></li>

        

              

                                <li><Link href="/top-rated" className="hover:text-primary transition-colors">Top Rated</Link></li>

        

              

                                <li><Link href="/genres" className="hover:text-primary transition-colors">Custom Genres</Link></li>

        

              

                              </ul>

        

              

                            </div>

        

              

              

        

              

                            <div>

        

              

                              <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Support</h4>

        

              

                              <ul className="space-y-4 text-sm font-bold text-secondary">

        

              

                                <li><Link href="/study-tips" className="hover:text-primary transition-colors">Study Tips</Link></li>

        

              

                                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>

        

              

                                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>

        

              

                                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>

        

              

                              </ul>

        

              

                            </div>

        

              

              

        

              

                            <div>

        

              

                              <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Platform</h4>

        

              

                              <ul className="space-y-4 text-sm font-bold text-secondary">

        

              

                                <li><Link href="/credits" className="hover:text-primary transition-colors">Credits</Link></li>

        

              

                                <li><Link href="/developers" className="hover:text-primary transition-colors">Developers</Link></li>

        

              

                                <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>

        

              

                                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>

        

              

                              </ul>

        

              

                            </div>

        

              

              



                            



              

            </div>



            <div className="border-t border-slate-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">

              <p>&copy; 2025 Student-Watch Project. MIT License.</p>

              <div className="flex items-center gap-6">

                 <span>No 18+ Content</span>

                 <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />

                 <span>Community Driven</span>

              </div>

            </div>

          </div>

        </footer>

      </body>

    </html>

  );

}
