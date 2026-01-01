'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Utensils, Plane, Film, Car, Cloud, Calendar, User, Quote, Camera, Code } from 'lucide-react';
import { RotatingText } from '@/components/RotatingText';
import { differenceInDays, isAfter, setYear, getYear } from 'date-fns';

const KICHKU_BIRTHDAY = new Date(1998, 6, 14); // July 14, 1998

const BentoCard = ({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card group p-6 ${className}`}
      style={{ 
        ...style,
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px` 
      } as any}
    >
      <div className="magnetic-glow" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default function KichkuPage() {
  const [daysToBirthday, setDaysToBirthday] = useState(0);

  useEffect(() => {
    const today = new Date();
    let nextBday = setYear(KICHKU_BIRTHDAY, getYear(today));
    if (isAfter(today, nextBday)) {
      nextBday = setYear(KICHKU_BIRTHDAY, getYear(today) + 1);
    }
    setDaysToBirthday(differenceInDays(nextBday, today));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans pb-20">
      {/* Static Spotlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] right-[20%] w-[35%] h-[35%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-8">
        {/* Entrance Animation */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="text-4xl md:text-7xl font-sans tracking-tighter flex flex-wrap justify-center gap-x-4">
            <span className="text-white/40">Den of</span>
            <RotatingText
              texts={["Kichku", "Shravan", "Shravya", "Van 83"]}
              mainClassName="text-white"
              staggerDuration={0.025}
              splitBy="characters"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              interval={3000}
            />
          </div>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-xs">A digital archive for his world</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Profile Card - Tall */}
          <BentoCard className="md:row-span-2 flex flex-col justify-between">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-0.5 mb-4">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <Code className="text-white/50" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-sans mb-2">Shravan G.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tech enthusiast, dreamer, and the one who built this digital home. Known as Kichku to his favorite person.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider">Kichku</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider">Shravan</span>
            </div>
          </BentoCard>

          {/* Birthday Counter */}
          <BentoCard className="md:col-span-3 flex flex-row items-center justify-between overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-widest font-medium">Birthday Countdown</span>
              </div>
              <h3 className="text-5xl md:text-6xl font-mono tracking-tighter">
                {daysToBirthday} <span className="text-2xl text-slate-500">Days</span>
              </h3>
              <p className="text-slate-500 text-sm mt-1">Until his special day on July 14th</p>
            </div>
            <div className="hidden md:block">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="opacity-20"
              >
                <Calendar size={120} />
              </motion.div>
            </div>
          </BentoCard>

          {/* Spotify Embed */}
          <BentoCard className="md:col-span-2 relative !p-0">
             <iframe 
               src="https://open.spotify.com/embed/track/1di1S6btxkLcOid88Xv77O?utm_source=generator&theme=0" 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
               loading="lazy"
               className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
             />
             <div className="absolute top-4 left-4 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                   <Music size={12} className="text-blue-400" />
                   <span className="text-[10px] uppercase tracking-wider font-medium">Our Song</span>
                </div>
             </div>
          </BentoCard>

          {/* Fav Food */}
          <BentoCard 
            className="relative overflow-hidden group/food"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Utensils className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Favorite Food</p>
              <h4 className="text-xl font-sans text-white group-hover/food:text-blue-400 transition-colors">Burgers</h4>
            </div>
          </BentoCard>

          {/* Fav Weather */}
          <BentoCard 
            className="relative overflow-hidden group/weather"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Cloud className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Fav Weather</p>
              <h4 className="text-xl font-sans text-white group-hover/weather:text-yellow-400 transition-colors">Sunset</h4>
            </div>
          </BentoCard>

          {/* Fav Travel */}
          <BentoCard 
            className="relative overflow-hidden group/travel"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Plane className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Next Trip</p>
              <h4 className="text-xl font-sans text-white group-hover/travel:text-green-400 transition-colors">Bali</h4>
            </div>
          </BentoCard>

          {/* Fav Movie */}
          <BentoCard 
            className="relative overflow-hidden group/movie"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Film className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Fav Movie</p>
              <h4 className="text-xl font-sans text-white group-hover/movie:text-indigo-400 transition-colors">Interstellar</h4>
            </div>
          </BentoCard>

          {/* Fav Car */}
          <BentoCard 
            className="md:col-span-2 relative overflow-hidden group/car"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Car className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Dream Car</p>
              <h4 className="text-2xl font-sans text-white group-hover/car:text-red-400 transition-colors">BMW M4</h4>
            </div>
          </BentoCard>

          {/* Partner Note - Full Width */}
          <BentoCard className="md:col-span-4 md:row-span-2 !bg-white/5 flex flex-col md:flex-row gap-8 overflow-hidden">
             <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                   <Quote size={20} />
                   <span className="text-xs uppercase tracking-[0.3em]">A Note from Tanu</span>
                </div>
                <h3 className="text-3xl font-sans leading-tight italic text-slate-200">
                  "You are the architect of our happiness. Thank you for building a world where I feel so loved and seen."
                </h3>
                <p className="text-slate-500 font-light max-w-lg">
                  Every project you touch and every dream you chase makes me more proud of the man you are. You are my greatest support and my favorite person.
                </p>
                <div className="pt-4 flex items-center gap-4 text-white/60 text-sm">
                   <span className="flex items-center gap-2"><Heart size={14} className="text-red-500" /> Always yours</span>
                   <span className="h-4 w-px bg-white/10" />
                   <span>Jan 1, 2026</span>
                </div>
             </div>

             <div className="flex-1 relative min-h-[300px] flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Floating Image Stack */}
                  <motion.div 
                    initial={{ rotate: 5, x: 20 }}
                    whileHover={{ rotate: 2, x: 0, zIndex: 30 }}
                    className="absolute top-10 right-10 w-48 h-64 bg-slate-800 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-10"
                  >
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ rotate: -5, x: -40, y: 20 }}
                    whileHover={{ rotate: -2, x: -20, zIndex: 30 }}
                    className="absolute top-20 left-10 w-48 h-64 bg-slate-700 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-20"
                  >
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>

                  <motion.div 
                    initial={{ rotate: 2, y: 60, x: -20 }}
                    whileHover={{ rotate: 0, y: 40, zIndex: 30 }}
                    className="absolute bottom-10 right-1/3 w-48 h-64 bg-slate-600 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-25"
                  >
                    <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>

                  <div className="absolute top-4 left-4 text-white/10 flex flex-col items-start">
                     <Camera size={80} />
                     <span className="text-[10px] uppercase tracking-widest mt-2">Captured Moments</span>
                  </div>
                </div>
             </div>
          </BentoCard>
        </div>

        {/* Footer info */}
        <div className="pt-20 pb-10 flex flex-col items-center space-y-4">
           <div className="w-12 h-px bg-white/10" />
           <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em]">Established 2020</p>
        </div>
      </div>
    </div>
  );
}
