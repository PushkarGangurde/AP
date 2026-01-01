'use client';

import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight, Activity, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuroraHearts } from '@/components/AuroraHearts';

export default function MovePage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      <AuroraHearts />
      
      <div className="relative z-10 max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Activity className="text-[#00ffff]" size={16} />
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase">Home Fitness Sanctuary</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-sans text-white font-light tracking-tight">
            Move with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">Purpose.</span>
          </h1>
          
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
            Clean, calm, and equipment-free workouts designed for daily consistency. 
            Start your journey to a stronger, more balanced you today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={`/move/workout/${today}`}>
            <Button className="h-14 px-8 bg-white text-black hover:bg-slate-200 rounded-full text-lg font-medium group transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start Today's Workout
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
          
          <Link href="/move/plan">
            <Button variant="ghost" className="h-14 px-8 text-white hover:bg-white/5 rounded-full text-lg font-light border border-white/10">
              <Calendar className="mr-2" size={20} />
              Weekly Plan
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12 grid grid-cols-3 gap-8 border-t border-white/5"
        >
          <div className="space-y-1">
            <div className="text-white font-medium">No Equipment</div>
            <div className="text-xs text-slate-500 uppercase tracking-tighter">Bodyweight Only</div>
          </div>
          <div className="space-y-1 border-x border-white/5">
            <div className="text-white font-medium">20-40 Min</div>
            <div className="text-xs text-slate-500 uppercase tracking-tighter">Small Space Friendly</div>
          </div>
          <div className="space-y-1">
            <div className="text-white font-medium">All Levels</div>
            <div className="text-xs text-slate-500 uppercase tracking-tighter">Progressive Plan</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Aurora Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#00ffff1a] to-transparent rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ff00ff0a] rounded-full blur-[100px] -z-10" />
    </div>
  );
}
