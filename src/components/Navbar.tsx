'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Image as ImageIcon, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Memories', href: '/memories', icon: ImageIcon },
  {
    label: 'Tanu',
    href: '/tanu',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <path d="M12 15v7M9 19h6" />
      </svg>
    )
  },
  {
    label: 'Kichku',
    href: '/kichku',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="14" r="6" />
        <path d="M14 10l7-7M16 3h5v5" />
      </svg>
    )
  },
  { label: 'MOVE', href: '/move', icon: Dumbbell },
];

export function Navbar() {
  const pathname = usePathname();
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePointerDown = (label: string) => {
    if (label === 'Memories') {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('trigger-admin-mode'));
      }, 5000);
      setPressTimer(timer);
    }
  };

  const handlePointerUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

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
              onPointerDown={() => handlePointerDown(item.label)}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
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
                <div className="relative w-8 h-8 flex items-center justify-center mb-1">
                  <Icon
                    size={24}
                    strokeWidth={2.5}
                    className="overflow-visible transition-all duration-300"
                    stroke={isActive ? "url(#aurora-gradient)" : "currentColor"}
                  />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </motion.div>
            </Link>
          );

        })}
      </nav>
    </div>
  );
}
