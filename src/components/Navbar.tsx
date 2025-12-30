'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Image as ImageIcon, User, Users, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Pushkar Ji', href: 'https://pushkarji.com', icon: ExternalLink, external: true },
  { label: 'Ours', href: '/ours', icon: Users },
  { label: 'Tanu', href: '/tanu', icon: User },
  { label: 'Pushkar', href: '/pushkar', icon: User },
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
              target={item.external ? '_blank' : undefined}
              className={cn(
                "relative flex flex-col items-center p-2 rounded-xl transition-all duration-300",
                isActive ? "text-[#ff9a9e]" : "text-[#8e8e8e] hover:text-[#ff9a9e]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-[#ff9a9e15] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={20} className="mb-1" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
