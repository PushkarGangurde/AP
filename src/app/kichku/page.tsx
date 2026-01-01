'use client';

import { motion } from 'motion/react';
import { Heart, Cake, Music, Utensils, MapPin, Film, Car, CloudSun } from 'lucide-react';
import RotatingText from '@/components/RotatingText';
import MagicBento, { BentoCard } from '@/components/MagicBento';
import ProfileCard from '@/components/ProfileCard';
import AgeCounter from '@/components/AgeCounter';

const KICHKU_BIRTH_DATE = new Date(2005, 10, 28);

export default function KichkuPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4 relative overflow-hidden">
      {/* Background Image Poster */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: 'url("/images/kichku-bg.jpg")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/20 to-black" />

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
            texts={['Kichku', 'Pushkar', 'Dukkar', 'Tharki']}
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
              name="Kichku"
              title="The King of Chaos"
              handle="kichku"
              status="Online"
              contactText="Love"
              avatarUrl="/placeholder-avatar.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowColor="rgba(20, 232, 24, 0.4)"
              innerGradient="linear-gradient(145deg, rgba(20, 232, 24, 0.3) 0%, rgba(1, 126, 213, 0.2) 100%)"
            />
          </BentoCard>

          <BentoCard className="lg:col-span-2 p-6 min-h-[180px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Cake size={16} stroke="url(#aurora-gradient)" />
              <span>Living for</span>
            </div>
            <div className="flex-1 flex items-center justify-center py-4">
              <AgeCounter birthDate={KICHKU_BIRTH_DATE} />
            </div>
            <p className="text-white/40 text-xs text-center">Since November 28, 2005</p>
          </BentoCard>

          <BentoCard className="lg:col-span-2 p-6 min-h-[140px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Music size={16} stroke="url(#aurora-gradient)" />
              <span>Our Song</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white/70 text-center">Spotify embed placeholder</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between"
            backgroundImage="/placeholder-food.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Utensils size={16} />
              <span>Favorite Food</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Coming Soon</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between"
            backgroundImage="/placeholder-weather.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <CloudSun size={16} />
              <span>Favorite Weather</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Coming Soon</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between"
            backgroundImage="/placeholder-travel.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin size={16} />
              <span>Favorite Travel</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Coming Soon</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between"
            backgroundImage="/placeholder-movie.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Film size={16} />
              <span>Favorite Movie</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Coming Soon</p>
            </div>
          </BentoCard>

          <BentoCard 
            className="p-6 min-h-[180px] flex flex-col justify-between"
            backgroundImage="/placeholder-car.jpg"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Car size={16} />
              <span>Favorite Car</span>
            </div>
            <div className="mt-auto">
              <p className="text-white font-semibold">Coming Soon</p>
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
                <p className="text-white/40 text-sm mt-4">- From Tanu</p>
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
