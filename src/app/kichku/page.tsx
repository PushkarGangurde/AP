'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock } from 'lucide-react';

export default function KichkuPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 glass rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(20,232,24,0.3)]"
        >
          <Heart stroke="url(#aurora-gradient)" size={40} />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-sans text-white">Kichku's Space</h1>
          <p className="text-slate-400 max-w-md mx-auto">
            A dedicated corner for his thoughts, projects, and favorite things. Coming soon...
          </p>
        </div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Clock stroke="url(#aurora-gradient)" className="opacity-10" size={200} />
          <div className="absolute inset-0 flex items-center justify-center">
             <Sparkles stroke="url(#aurora-gradient)" size={32} />
          </div>
        </motion.div>
    </div>
  );
}
