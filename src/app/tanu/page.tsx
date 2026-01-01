'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Utensils, Plane, Film, Car, Cloud, Calendar, User, Quote, Camera } from 'lucide-react';
import { RotatingText } from '@/components/RotatingText';
import { differenceInDays, isAfter, setYear, getYear } from 'date-fns';

const TANU_BIRTHDAY = new Date(1999, 10, 15); // Nov 15, 1999 (Example)

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

export default function TanuPage() {
  const [daysToBirthday, setDaysToBirthday] = useState(0);

  useEffect(() => {
    const today = new Date();
    let nextBday = setYear(TANU_BIRTHDAY, getYear(today));
    if (isAfter(today, nextBday)) {
      nextBday = setYear(TANU_BIRTHDAY, getYear(today) + 1);
    }
    setDaysToBirthday(differenceInDays(nextBday, today));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans pb-20">
      {/* Static Spotlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-8">
        {/* Entrance Animation */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="text-4xl md:text-7xl font-sans tracking-tighter flex flex-wrap justify-center gap-x-4">
            <span className="text-white/40">Den of</span>
            <RotatingText
              texts={["Tanu", "Aarohi", "Ovi", "Van 83"]}
              mainClassName="text-white"
              staggerDuration={0.025}
              splitBy="characters"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              interval={3000}
            />
          </div>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-xs">A digital sanctuary for her world</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Profile Card - Tall */}
          <BentoCard className="md:row-span-2 flex flex-col justify-between">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 p-0.5 mb-4">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <User className="text-white/50" size={32} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-sans mb-2">Tanuja G.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Creative soul, music enthusiast, and the heartbeat of this journey. Known as Aarohi to some, Ovi to others.
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider">Aarohi</span>
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-wider">Ovi</span>
            </div>
          </BentoCard>

          {/* Birthday Counter */}
          <BentoCard className="md:col-span-3 flex flex-row items-center justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-widest font-medium">Birthday Countdown</span>
              </div>
              <h3 className="text-5xl md:text-6xl font-mono tracking-tighter">
                {daysToBirthday} <span className="text-2xl text-slate-500">Days</span>
              </h3>
              <p className="text-slate-500 text-sm mt-1">Until her special day on Nov 15th</p>
            </div>
            <div className="hidden md:block">
              <motion.div
                animate={{ rotate: 360 }}
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
                   <Music size={12} className="text-green-400" />
                   <span className="text-[10px] uppercase tracking-wider font-medium">Our Song</span>
                </div>
             </div>
          </BentoCard>

          {/* Fav Food */}
          <BentoCard 
            className="relative overflow-hidden group/food"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Utensils className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Favorite Food</p>
              <h4 className="text-xl font-sans text-white group-hover/food:text-green-400 transition-colors">Pizza</h4>
            </div>
          </BentoCard>

          {/* Fav Weather */}
          <BentoCard 
            className="relative overflow-hidden group/weather"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1534067783941-51c9c23eea1b?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Cloud className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Fav Weather</p>
              <h4 className="text-xl font-sans text-white group-hover/weather:text-blue-400 transition-colors">Rainy</h4>
            </div>
          </BentoCard>

          {/* Fav Travel */}
          <BentoCard 
            className="relative overflow-hidden group/travel"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Plane className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Next Trip</p>
              <h4 className="text-xl font-sans text-white group-hover/travel:text-purple-400 transition-colors">Paris</h4>
            </div>
          </BentoCard>

          {/* Fav Movie */}
          <BentoCard 
            className="relative overflow-hidden group/movie"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Film className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Fav Movie</p>
              <h4 className="text-xl font-sans text-white group-hover/movie:text-red-400 transition-colors">La La Land</h4>
            </div>
          </BentoCard>

          {/* Fav Car */}
          <BentoCard 
            className="md:col-span-2 relative overflow-hidden group/car"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Car className="text-white/50 mb-auto" size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Dream Car</p>
              <h4 className="text-2xl font-sans text-white group-hover/car:text-yellow-400 transition-colors">Porsche 911</h4>
            </div>
          </BentoCard>

          {/* Partner Note - Full Width */}
          <BentoCard className="md:col-span-4 md:row-span-2 !bg-white/5 flex flex-col md:flex-row gap-8 overflow-hidden">
             <div className="flex-1 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2 text-white/40">
                   <Quote size={20} />
                   <span className="text-xs uppercase tracking-[0.3em]">A Note from Kichku</span>
                </div>
                <h3 className="text-3xl font-sans leading-tight italic text-slate-200">
                  "To the one who makes every day feel like a masterpiece. Your presence is the most beautiful thing in my world."
                </h3>
                <p className="text-slate-500 font-light max-w-lg">
                  Every moment captured in this den is a reflection of how much you mean to me. You are my favorite adventure and my peaceful home.
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
                    initial={{ rotate: -5, x: -20 }}
                    whileHover={{ rotate: -2, x: 0, zIndex: 30 }}
                    className="absolute top-10 left-10 w-48 h-64 bg-slate-800 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-10"
                  >
                    <img src="https://images.unsplash.com/photo-1516589174184-c68d8e21e482?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ rotate: 5, x: 40, y: 20 }}
                    whileHover={{ rotate: 2, x: 20, zIndex: 30 }}
                    className="absolute top-20 right-10 w-48 h-64 bg-slate-700 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-20"
                  >
                    <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>

                  <motion.div 
                    initial={{ rotate: -2, y: 60, x: 60 }}
                    whileHover={{ rotate: 0, y: 40, zIndex: 30 }}
                    className="absolute bottom-10 left-1/3 w-48 h-64 bg-slate-600 rounded-xl border-4 border-white/10 overflow-hidden shadow-2xl z-25"
                  >
                    <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </motion.div>

                  <div className="absolute top-4 right-4 text-white/10 flex flex-col items-end">
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
