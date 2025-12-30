'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock } from 'lucide-react';

export default function TanuPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 glass rounded-full flex items-center justify-center shadow-lg"
      >
        <Heart className="text-[#ff9a9e] fill-[#ff9a9e]" size={40} />
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-serif text-[#4a4a4a] italic">Tanu's Space</h1>
        <p className="text-[#8e8e8e] max-w-md mx-auto">
          A dedicated corner for her thoughts, dreams, and favorite things. Coming soon...
        </p>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Clock className="text-[#ff9a9e10]" size={200} />
        <div className="absolute inset-0 flex items-center justify-center">
           <Sparkles className="text-[#ff9a9e]" size={32} />
        </div>
      </motion.div>
    </div>
  );
}
