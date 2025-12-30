'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const JOURNEY_DATA = [
  {
    image: '/journey/1.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
  },
  {
    image: '/journey/2.jpg',
    title: 'Growing Together',
    description: 'Finding comfort in each other\'s presence, building dreams one day at a time.',
    year: '2021'
  },
  {
    image: '/journey/3.jpg',
    title: 'Eternal Bond',
    description: 'A love that grows stronger with every passing season, bound by shared memories.',
    year: '2022'
  }
];

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {JOURNEY_DATA.map((item, index) => {
          const start = index / JOURNEY_DATA.length;
          const end = (index + 1) / JOURNEY_DATA.length;
          
          // Animations for each card
          const opacity = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
          const scale = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.9]);
          const y = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [100, 0, 0, -100]);
          const rotate = useTransform(smoothProgress, [start, end], [2, -2]);

          return (
            <motion.div
              key={index}
              style={{ opacity, scale, y, rotate }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            >
              <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  priority={index === 0}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-green-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                      {item.year}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-sans text-white mb-4 tracking-tighter">
                      {item.title}
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg max-w-xl font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Corner Label */}
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                   <span className="text-[10px] text-white/60 tracking-widest uppercase font-medium">
                     Memory {index + 1} / {JOURNEY_DATA.length}
                   </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
           <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
           <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-light">Scroll to Re-live</span>
        </div>
      </div>
    </div>
  );
}
