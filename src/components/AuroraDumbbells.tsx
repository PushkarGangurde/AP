'use client';

import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { useEffect, useState } from 'react';

const COLORS = ['#00ffff', '#ff00ff', '#ffffff'];

interface DumbbellData {
  id: number;
  x: string;
  sway: number;
  size: number;
  scale: number;
  duration: number;
  delay: number;
  color: string;
}

export const AuroraDumbbells = () => {
  const [dumbbells, setDumbbells] = useState<DumbbellData[]>([]);

  useEffect(() => {
    const newDumbbells = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      sway: Math.random() * 120 - 60,
      size: Math.random() * 20 + 15,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20,
      color: COLORS[i % COLORS.length]
    }));
    setDumbbells(newDumbbells);
  }, []);

  if (dumbbells.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {dumbbells.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{ left: item.x }}
          initial={{ 
            y: '110vh', 
            opacity: 0,
            scale: item.scale
          }}
          animate={{ 
            y: '-15vh', 
            opacity: [0, 0.4, 0.4, 0],
            x: [0, item.sway, 0, -item.sway, 0],
            rotate: [0, 45, -45, 90, 0]
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "linear"
          }}
        >
          <Dumbbell 
            size={item.size} 
            color={item.color}
            className="filter blur-[1px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] opacity-40"
          />
        </motion.div>
      ))}
    </div>
  );
};
