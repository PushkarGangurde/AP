'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Using the access code from .env via a client-side check for now
    // In a real app, this should be an API call, but for this private site,
    // we'll keep it simple.
    if (code === '2020') {
      document.cookie = 'couple_auth=true; path=/; max-age=31536000'; // 1 year
      toast.success('Welcome home!');
      router.push('/');
    } else {
      toast.error('Incorrect code');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-[#e2e2e2]"
      >
        <div className="text-center space-y-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center"
          >
            <Heart className="text-[#ff9a9e] fill-[#ff9a9e]" size={48} />
          </motion.div>
          <h1 className="text-2xl font-serif text-[#4a4a4a]">Our Private Space</h1>
          <p className="text-[#8e8e8e] text-sm">Enter the secret code to enter</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8e8e]" size={18} />
            <Input
              type="password"
              placeholder="Secret Code"
              className="pl-10 h-12 bg-[#fdfdfd] border-[#e2e2e2] rounded-xl focus:ring-[#ff9a9e] focus:border-[#ff9a9e]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-[#ff9a9e] hover:bg-[#ff8a8e] text-white rounded-xl transition-all"
            disabled={loading}
          >
            {loading ? 'Entering...' : 'Enter'}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-[#c4c4c4] text-xs font-serif tracking-widest uppercase italic">
            Forever & Always
          </p>
        </div>
      </motion.div>
    </div>
  );
}
