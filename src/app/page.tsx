'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { intervalToDuration } from 'date-fns';
import { getPhotos } from '@/lib/supabase';
import { Aurora } from '@/components/Aurora';

const START_DATE = new Date(2020, 0, 7); // Jan 7, 2020

export default function HomePage() {
  const [timeSince, setTimeSince] = useState<Duration>({});
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const duration = intervalToDuration({
        start: START_DATE,
        end: now
      });
      setTimeSince(duration);
    };

    updateCounter();
    const timer = setInterval(updateCounter, 1000);

    const fetchCount = async () => {
      try {
        const data = await getPhotos();
        setPhotoCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCount();

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Years', value: timeSince.years },
    { label: 'Months', value: timeSince.months },
    { label: 'Days', value: timeSince.days },
    { label: 'Hours', value: timeSince.hours },
    { label: 'Mins', value: timeSince.minutes },
    { label: 'Secs', value: timeSince.seconds },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-black">
      {/* New Aurora Hero Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Aurora
          colorStops={["#14e818", "#017ed5", "#b53dff"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.4}
        />
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center space-y-16">
        {/* Introducing 7to14 Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <h1 className="text-6xl md:text-8xl font-sans text-white tracking-tighter">
            <span className="block text-slate-400 text-2xl md:text-3xl tracking-[0.2em] uppercase mb-2 opacity-50">Introducing</span>
            7to14
          </h1>
          
          <p className="max-w-md text-slate-400 text-sm md:text-base font-light tracking-wide leading-relaxed">
            A digital archive of our journey, capturing every heartbeat and shared memory since the very beginning.
          </p>
        </motion.div>

        {/* Relationship Counter - Premium Style */}
        <div className="flex flex-col items-center space-y-8 w-full max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-green-300 font-medium">since jan 2020</span>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-3xl">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-2xl flex flex-col items-center justify-center transition-all group-hover:bg-white/10 group-hover:-translate-y-1">
                  <span className="text-3xl font-sans text-white">{unit.value ?? 0}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-1">{unit.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center space-y-6"
        >
          <Link href="/ours">
            <Button size="xl" className="rounded-full bg-white text-black hover:bg-slate-200 border-none shadow-[0_0_30px_rgba(255,255,255,0.2)] px-12 h-16 text-lg font-medium group">
              Explore Memories
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-500 text-xs tracking-widest uppercase">
               <ImageIcon size={14} stroke="url(#aurora-gradient)" />
               <span>{photoCount} Moments</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center space-x-2 text-slate-500 text-xs tracking-widest uppercase">
               <Heart size={14} stroke="url(#aurora-gradient)" />
               <span>Always</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
