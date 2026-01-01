'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const COLORS = ['#14e818', '#017ed5', '#b53dff'];

interface HeartData {
  id: number;
  x: string;
  sway: number;
  size: number;
  scale: number;
  duration: number;
  delay: number;
  color: string;
}

export const AuroraHearts = () => {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      sway: Math.random() * 100 - 50,
      size: Math.random() * 20 + 10,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 30,
      color: COLORS[i % COLORS.length]
    }));
    setHearts(newHearts);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: heart.x }}
          initial={{ 
            y: '110vh', 
            opacity: 0,
            scale: heart.scale
          }}
          animate={{ 
            y: '-15vh', 
            opacity: [0, 0.5, 0.5, 0],
            x: [0, heart.sway, 0, -heart.sway, 0],
            rotate: [0, 20, -20, 0]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "linear"
          }}
        >
          <Heart 
            size={heart.size} 
            fill={heart.color} 
            color={heart.color}
            className="filter blur-[0.5px] drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] opacity-60"
          />
        </motion.div>
      ))}
    </div>
  );
};
