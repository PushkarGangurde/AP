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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        toast.success('Welcome home!');
        router.push('/');
        router.refresh();
      } else {
        toast.error('Incorrect code');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 glass p-10 rounded-3xl"
      >
        <div className="text-center space-y-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center"
          >
            <Heart stroke="url(#aurora-gradient)" size={48} />
          </motion.div>
          <h1 className="text-2xl font-sans text-white">Our Private Space</h1>
          <p className="text-slate-400 text-sm">Enter the secret code to enter</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input
              type="password"
              placeholder="Secret Code"
              className="pl-10 h-12 bg-slate-900 border-slate-800 rounded-xl focus:ring-green-500 focus:border-green-500 text-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-xl transition-all font-medium border-none"
            disabled={loading}
          >
            {loading ? 'Entering...' : 'Enter'}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-slate-600 text-xs font-sans tracking-widest uppercase">
            Forever & Always
          </p>
        </div>
      </motion.div>
    </div>
  );
}
