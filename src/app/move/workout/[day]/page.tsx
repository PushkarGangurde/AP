'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle2, Circle, Clock, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { workoutPlan, WorkoutDay } from '@/lib/workout-data';
import { AuroraDumbbells } from '@/components/AuroraDumbbells';

export default function WorkoutDetailPage() {
  const { day } = useParams();
  
  const workout = useMemo(() => {
    return workoutPlan.find(d => d.id === day) || workoutPlan[0];
  }, [day]);

  const Section = ({ title, exercises, icon: Icon, color }: { title: string, exercises: any[], icon: any, color: string }) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-slate-400">
        <Icon size={18} className={color} />
        <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
      </div>
      <div className="grid gap-3">
        {exercises.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-slate-500 font-mono">
                {i + 1}
              </div>
              <div>
                <div className="text-white font-medium">{ex.name}</div>
                {ex.sets && <div className="text-xs text-slate-500 uppercase">{ex.sets} Sets</div>}
              </div>
            </div>
            <div className="text-sm font-mono text-[#00ffff]">
              {ex.duration || ex.reps}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-black p-6 md:p-12 pb-32">
      <AuroraDumbbells />
      
      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/move/plan">
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="mr-2" size={20} />
              Plan
            </Button>
          </Link>
          <div className="px-4 py-1 rounded-full bg-[#00ffff1a] border border-[#00ffff33] text-[#00ffff] text-xs font-bold uppercase tracking-tighter">
            {workout.difficulty}
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-sans text-white font-light">
              {workout.day}: <span className="text-[#ff00ff]">{workout.title}</span>
            </h1>
            <p className="text-lg text-slate-400 font-light mt-4 leading-relaxed">
              {workout.description}
            </p>
          </motion.div>

          <div className="flex items-center space-x-6 pt-4">
            <div className="flex items-center text-slate-300">
              <Clock className="mr-2 text-[#00ffff]" size={20} />
              <span className="text-lg">{workout.duration}</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center text-slate-300">
              <Info className="mr-2 text-[#ff00ff]" size={20} />
              <span className="text-lg">No Equipment</span>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <Section 
            title="Warm Up" 
            exercises={workout.warmup} 
            icon={Circle} 
            color="text-[#00ffff]" 
          />
          
          <Section 
            title="Main Workout" 
            exercises={workout.main} 
            icon={Play} 
            color="text-[#ff00ff]" 
          />
          
          <Section 
            title="Cool Down" 
            exercises={workout.cooldown} 
            icon={CheckCircle2} 
            color="text-green-400" 
          />
        </div>

        {/* Floating Start Button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
          <Button className="w-full h-16 bg-white text-black hover:bg-slate-200 rounded-full text-xl font-medium shadow-[0_20px_40px_rgba(0,0,0,0.5)] group">
            Complete Workout
            <CheckCircle2 className="ml-2 group-hover:scale-110 transition-transform" size={24} />
          </Button>
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#ff00ff05] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-[#00ffff05] rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
