'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-secondary font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Data Collection</h2>
            <p>
              Student-Watch is designed with privacy in mind. We do not require account registration, 
              and we do not collect personal information like your name, email, or address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Cookies</h2>
            <p>
              We use minimal local storage to remember your preferences (like theme settings) 
              locally on your device. We do not use tracking cookies for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Third-Party APIs</h2>
            <p>
              Our application communicates with TMDB and AniList to fetch media data. 
              These services may see your IP address as part of the standard HTTP request, 
              but we do not send any identifiable student data to them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Safe Content</h2>
            <p>
              Our primary goal is safety. We strictly filter all API results to exclude 18+ content. 
              If you ever find a title that bypasses our filters, please report it via our GitHub.
            </p>
          </section>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 mt-12">
            <p className="text-sm">
              Last Updated: December 23, 2025. This policy is subject to change as the platform evolves.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
