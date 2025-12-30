'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image as ImageIcon, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { intervalToDuration } from 'date-fns';
import { getPhotos } from '@/lib/supabase';
import { Aurora } from '@/components/Aurora';
import { JourneySection } from '@/components/JourneySection';
import FlowingMenu from '@/components/FlowingMenu';

const START_DATE = new Date(2020, 0, 7); // Jan 7, 2020

const PLACES_TO_VISIT = [
  { link: '#', text: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000' },
  { link: '#', text: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000' },
  { link: '#', text: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000' },
  { link: '#', text: 'Spain (Madrid)', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000' },
  { link: '#', text: 'Kashmir', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1000' },
  { link: '#', text: 'Ladakh', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1000' },
  { link: '#', text: 'Brooklyn', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000' },
  { link: '#', text: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000' },
  { link: '#', text: 'Darjeeling', image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1000' },
];

export default function HomePage() {
  const [timeSince, setTimeSince] = useState<Duration>({});
  const [photoCount, setPhotoCount] = useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Hero animations based on scroll
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);

  // Background Aurora opacity for the rest of the page
  const bgAuroraOpacity = useTransform(scrollY, [200, 800], [0, 0.3]);

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
    <div className="bg-black relative">
      {/* Global Persistent Aurora Background */}
      <motion.div 
        style={{ opacity: bgAuroraOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Aurora
          colorStops={["#017ed5", "#14e818", "#b53dff"]}
          blend={0.6}
          amplitude={0.8}
          speed={0.2}
        />
      </motion.div>

      {/* Hero Section */}
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-32 pb-12 overflow-hidden">
        {/* New Aurora Hero Background */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-0 opacity-60"
        >
          <Aurora
            colorStops={["#14e818", "#017ed5", "#b53dff"]}
            blend={0.5}
            amplitude={1.2}
            speed={0.4}
          />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="z-10 w-full max-w-4xl flex flex-col items-center space-y-16"
        >
          {/* Introducing 7to14 Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-sans text-white tracking-tighter">
              <span className="block text-slate-400 text-2xl md:text-3xl tracking-[0.2em] uppercase mb-2 opacity-50">Welcome to</span>
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
        </motion.div>
      </div>

      {/* Journey Section */}
      <JourneySection />

      {/* Places to Visit Section */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-sans text-white tracking-tighter mb-4">
            Places to Visit
          </h2>
          <p className="text-slate-500 tracking-[0.2em] uppercase text-xs md:text-sm">
            Our future destination wishlist
          </p>
        </motion.div>

        <div className="h-[900px] relative w-full border-y border-white/5">
          <FlowingMenu 
            items={PLACES_TO_VISIT} 
            textColor="#fff"
            marqueeBgColor="#fff"
            marqueeTextColor="#000"
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Aurora
            colorStops={["#b53dff", "#017ed5", "#14e818"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.4}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center space-y-12 text-center"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-sans text-white tracking-tighter">
              Ready to revisit our moments?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Every photo tells a story of us. Explore the complete collection in our digital archive.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <Link href="/ours">
              <Button size="xl" className="rounded-full bg-white text-black hover:bg-slate-200 border-none shadow-[0_0_30px_rgba(255,255,255,0.2)] px-12 h-16 text-lg font-medium group">
                Explore Memories
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-500 text-xs tracking-widest uppercase">
                 <ImageIcon size={14} />
                 <span>{photoCount} Moments</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center space-x-2 text-slate-500 text-xs tracking-widest uppercase">
                 <Heart size={14} />
                 <span>Always</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
