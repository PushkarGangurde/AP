'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { intervalToDuration, formatDuration } from 'date-fns';

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

    // Fetch real photo count
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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#ff9a9e15] blur-3xl rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#fbc2eb15] blur-3xl rounded-full"
        />
      </div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center space-y-12">
        {/* Logo / Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="w-16 h-16 glass rounded-full flex items-center justify-center shadow-lg mb-4">
            <Heart className="text-[#ff9a9e] fill-[#ff9a9e]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#4a4a4a] text-center italic tracking-tight">
            Our Love Story
          </h1>
          <p className="text-[#8e8e8e] font-serif tracking-[0.2em] uppercase text-xs">Since 7 Jan 2020</p>
        </motion.div>

        {/* 3D-ish Floating Element */}
        <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 10, -10, 0],
              rotateX: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            <div className="w-48 h-64 md:w-56 md:h-72 glass rounded-[2rem] shadow-2xl flex items-center justify-center p-8 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#ff9a9e20] to-[#fbc2eb20]" />
               <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <Heart className="text-[#ff9a9e] opacity-30 fill-[#ff9a9e]" size={120} />
               </motion.div>
               <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                 <p className="text-[10px] uppercase tracking-widest text-[#8e8e8e] mb-1">Together For</p>
                 <p className="text-2xl font-serif text-[#4a4a4a] italic">Infinity</p>
               </div>
            </div>
            {/* Floating Sparks */}
            <motion.div 
              animate={{ y: [0, -40], opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="text-[#ff9a9e]" size={24} />
            </motion.div>
          </motion.div>
        </div>

        {/* Relationship Counter */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full">
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 rounded-2xl flex flex-col items-center justify-center shadow-sm"
            >
              <span className="text-2xl font-serif text-[#ff9a9e]">{unit.value ?? 0}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8e8e8e] mt-1">{unit.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-4 pt-4"
        >
          <Link href="/ours">
            <Button size="xl" className="rounded-full bg-[#ff9a9e] hover:bg-[#ff8a8e] shadow-xl px-10 h-16 text-lg group">
              Open Gallery
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-[#8e8e8e] text-sm">
             <ImageIcon size={14} />
             <span>{photoCount} Memories Captured</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
