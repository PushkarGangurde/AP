'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const JOURNEY_DATA = [
  {
    image: '/journey/1.jpg',
    title: 'The Beginning',
    description: "Where our story first sparked into life. Every moment since has been a treasure.",
    year: '2020'
  },
  {
    image: '/journey/2.jpg',
    title: 'Growing Together',
    description: "Finding comfort in each other's presence, building dreams one day at a time.",
    year: '2020'
  },
  {
    image: '/journey/3.jpg',
    title: 'Eternal Bond',
    description: "A love that grows stronger with every passing season, bound by shared memories.",
    year: '2022'
  },
    {
      image: '/journey/4.jpg',
      title: 'Cozy Moments',
      description: "Here's all the kdrama and movie time ✨",
      year: '2023'
    },
    {
      image: '/journey/5.jpg',
      title: 'Warm Hugs',
      description: 'The safest place in the world is within your arms.',
      year: '2023'
    },
    {
      image: '/journey/6.jpg',
      title: 'Heart to Heart',
      description: 'Deep conversations and quiet moments that define our bond.',
      year: '2024'
    },
    {
      image: '/journey/7.jpg',
      title: 'Small Rides',
      description: 'Remember our small rides? Every journey with you is an adventure.',
      year: '2024'
    },
    {
      image: '/journey/8.jpg',
      title: 'That Fragrance',
      description: 'This one alsoo ..... that fragrance 🥰',
      year: '2025'
    },
    {
      image: '/journey/9.jpg',
      title: 'Missing You',
      description: 'I miss this one ☝🏻 Every moment apart only makes me love you more.',
      year: '2025'
    },
    {
      image: '/journey/10.jpg',
      title: 'Same Attitude',
      description: 'And I think we have same attitude level after fight 🤐',
      year: '2025'
    },
    {
    image: '/journey/11.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
    },
    {
    image: '/journey/12.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
    },
    {
    image: '/journey/13.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
    },
    {
    image: '/journey/14.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
    },
    {
    image: '/journey/15.jpg',
    title: 'The Beginning',
    description: 'Where our story first sparked into life. Every moment since has been a treasure.',
    year: '2020'
    },
];

function JourneyItem({ item, index }: { item: typeof JOURNEY_DATA[0], index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

      return (
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 py-24 md:py-32`}
        >
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex-1 space-y-6"
      >
        <div className="space-y-2">
          <span className="text-green-400 font-mono text-sm tracking-[0.3em] uppercase block">
            {item.year}
          </span>
          <h2 className="text-4xl md:text-6xl font-sans text-white tracking-tighter">
            {item.title}
          </h2>
        </div>
        <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed max-w-lg">
          {item.description}
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-green-500/50 to-transparent" />
      </motion.div>

      {/* Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex-1 w-full max-w-md"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-2xl shadow-green-500/5">
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-white/60 tracking-widest uppercase font-medium">
              #{index + 1}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section className="relative bg-black px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pt-32 pb-16 text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/30 text-xs tracking-[0.5em] uppercase font-light"
          >
            Our Journey
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans text-white tracking-tighter"
          >
            Chronicles of Love
          </motion.div>
        </div>

        {/* Journey Items */}
        <div className="space-y-12">
          {JOURNEY_DATA.map((item, index) => (
            <JourneyItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="flex justify-center pb-32">
          <div className="h-24 w-px bg-gradient-to-b from-green-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
