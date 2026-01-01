'use client';

import { motion } from 'motion/react';
import { Heart, Cake, Music, Utensils, Film, Car, CloudSun } from 'lucide-react';
import RotatingText from '@/components/RotatingText';
import MagicBento, { BentoCard } from '@/components/MagicBento';
import ProfileCard from '@/components/ProfileCard';
import AgeCounter from '@/components/AgeCounter';

const TANU_BIRTH_DATE = new Date(2005, 4, 14);

export default function TanuPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      <div className="relative z-10">
        <svg width="0" height="0">
        <defs>
          <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14e818" />
            <stop offset="50%" stopColor="#017ed5" />
            <stop offset="100%" stopColor="#b53dff" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3 flex-wrap">
          <span>Den of</span>
          <RotatingText
            texts={['Tanu', 'Aarohi', 'Ovi', 'Van 83']}
            mainClassName="px-3 py-1 bg-gradient-to-r from-[#14e818] via-[#017ed5] to-[#b53dff] text-black rounded-lg overflow-hidden"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </h1>
      </motion.div>

      <MagicBento
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BentoCard 
            className="lg:col-span-2 lg:row-span-2 p-6 min-h-[400px] flex items-center justify-center"
            enableTilt={false}
            enableMagnetism={false}
            enableStars={false}
          >
            <ProfileCard
              name="Aarohi Bachhav"
              title="The Queen of Everything"
              handle="tanu"
              status="Online"
              contactText="Love"
              avatarUrl="/placeholder-avatar.jpg"
              backgroundImage="/images/tanu-bg.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowColor="rgba(181, 61, 255, 0.4)"
              innerGradient="linear-gradient(145deg, rgba(181, 61, 255, 0.3) 0%, rgba(1, 126, 213, 0.2) 100%)"
            />
          </BentoCard>

          <BentoCard className="lg:col-span-2 p-6 min-h-[180px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Cake size={16} stroke="url(#aurora-gradient)" />
              <span>Living for</span>
            </div>
            <div className="flex-1 flex items-center justify-center py-4">
              <AgeCounter birthDate={TANU_BIRTH_DATE} />
            </div>
            <p className="text-white/40 text-xs text-center">Since May 14, 2005</p>
          </BentoCard>

          <BentoCard className="lg:col-span-2 p-6 min-h-[140px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Music size={16} stroke="url(#aurora-gradient)" />
              <span>Fav Song</span>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/track/1KaNtSpU12ZFyTPc07gTht?utm_source=generator&theme=0"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between border-black/50"
            backgroundImage="/images/biryani.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Utensils size={16} />
              <span>Favorite Food</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Chicken Biryani</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between border-black/50"
            backgroundImage="/images/dark-cloudy.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CloudSun size={16} />
              <span>Favorite Weather</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Dark Cloudy</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between border-black/50"
            backgroundImage="/images/vivah.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Film size={16} />
              <span>Favorite Movie</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Vivah</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between border-black/50"
            backgroundImage="/images/porche-911.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Car size={16} />
              <span>Favorite Car</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Porsche 911</p>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-4 p-8 min-h-[200px] flex flex-col">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <Heart size={16} stroke="url(#aurora-gradient)" />
              <span>Partner's Note</span>
            </div>
            <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <p className="text-white/80 text-lg italic leading-relaxed">
                  "A heartfelt note from your partner will appear here..."
                </p>
                <p className="text-white/40 text-sm mt-4">- From Kichku</p>
              </div>
              <div className="flex gap-2">
                <div className="w-16 h-20 rounded-lg bg-white/5 border border-white/10 rotate-[-5deg]"></div>
                <div className="w-16 h-20 rounded-lg bg-white/5 border border-white/10 rotate-[3deg] -ml-4"></div>
                <div className="w-16 h-20 rounded-lg bg-white/5 border border-white/10 rotate-[-2deg] -ml-4"></div>
              </div>
            </div>
          </BentoCard>
        </div>
        </MagicBento>
      </div>
    </div>
  );
}
