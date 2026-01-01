'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BarChart3, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { workoutPlan } from '@/lib/workout-data';
import { AuroraHearts } from '@/components/AuroraHearts';

export default function PlanPage() {
  return (
    <div className="relative min-h-screen bg-black p-6 md:p-12">
      <AuroraHearts />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/move">
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="mr-2" size={20} />
              Back
            </Button>
          </Link>
          <div className="text-right">
            <h1 className="text-3xl font-sans text-white font-light">Weekly <span className="text-[#00ffff]">Journey</span></h1>
            <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">Foundation Plan</p>
          </div>
        </div>

        <div className="grid gap-4">
          {workoutPlan.map((day, index) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/move/workout/${day.id}`}>
                <div className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold text-[#ff00ff] uppercase tracking-tighter">{day.day}</span>
                        <h2 className="text-xl text-white font-medium">{day.title}</h2>
                      </div>
                      <p className="text-sm text-slate-500 max-w-md">{day.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center text-slate-300 text-sm">
                          <Clock className="mr-1 text-[#00ffff]" size={14} />
                          {day.duration}
                        </div>
                        <div className="flex items-center text-slate-500 text-xs mt-1">
                          <BarChart3 className="mr-1" size={12} />
                          {day.difficulty}
                        </div>
                      </div>
                      <ChevronRight className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00ffff08] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff00ff08] rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
