'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Image as ImageIcon, Mars, Venus, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Memories', href: '/memories', icon: ImageIcon },
  { label: 'Tanu', href: '/tanu', icon: Venus },
  { label: 'Kichku', href: '/kichku', icon: Mars },
  { label: 'MOVE', href: '/move', icon: Dumbbell },
];

export function Navbar() {
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <nav className="glass rounded-2xl px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center p-2 rounded-xl transition-all duration-300",
                  isActive ? "text-white" : "text-slate-500 hover:text-white"
                )}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                    <Icon 
                      size={24} 
                      strokeWidth={2.5}
                      className="mb-1 overflow-visible" 
                      stroke={isActive ? "url(#aurora-gradient)" : "currentColor"} 
                    />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                </motion.div>
              </Link>
            );

        })}
      </nav>
    </div>
  );
}
