'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, X, Upload, Trash2 } from 'lucide-react';
import { Loader } from '@/components/Loader';
import { getPhotos, uploadPhoto, uploadToStorage, deletePhoto } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { InfiniteMenu, MenuItem } from '@/components/InfiniteMenu';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface Photo {
  id: string;
  url: string;
  month: string;
  year: number;
  month_num: number;
}

const tempItems: MenuItem[] = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: '#',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: '#',
    title: 'Item 2',
    description: 'Beautiful moments'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: '#',
    title: 'Item 3',
    description: 'Forever together'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: '#',
    title: 'Item 4',
    description: 'Love is in the air'
  },
  {
    image: 'https://picsum.photos/700/700?grayscale',
    link: '#',
    title: 'Item 5',
    description: 'Captured memories'
  }
];

export default function MemoriesPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Triple-tap state
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Admin Dialog State
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  useEffect(() => {
    fetchPhotos();
    setIsAdmin(localStorage.getItem('is_admin') === 'true');
  }, []);

  const handleTripleTap = () => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      const newCount = clickCount + 1;
      if (newCount >= 3) {
        handleAdminToggle();
        setClickCount(0);
      } else {
        setClickCount(newCount);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  const fetchPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      toast.info('You are already in admin mode');
      return;
    }
    setShowAdminDialog(true);
  };

  const handleAdminVerify = async () => {
    if (!adminCodeInput) return;
    setIsVerifying(true);

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCodeInput }),
      });

      if (response.ok) {
        localStorage.setItem('is_admin', 'true');
        setIsAdmin(true);
        setShowAdminDialog(false);
        setAdminCodeInput('');
        toast.success('Admin mode enabled');
      } else {
        toast.error('Incorrect admin code');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(selectedFile);
      const monthNum = months.indexOf(selectedMonth) + 1;
      await uploadPhoto(url, selectedMonth, parseInt(selectedYear), monthNum);
      toast.success('Memory captured!');
      fetchPhotos();
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload');
    } finally {
      setUploading(false);
    }
  };

  // Map real photos to MenuItem format if available
  const menuItems: MenuItem[] = photos.length > 0 
    ? photos.map(p => ({
        image: p.url,
        link: '#',
        title: `${p.month} ${p.year}`,
        description: 'A captured moment'
      }))
    : tempItems;

  return (
    <div 
      className="min-h-screen bg-black overflow-hidden flex flex-col"
      onClick={handleTripleTap}
    >
      {/* Admin Controls Overlay */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50">
        {isAdmin && (
          <div className="flex flex-col items-center space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-white text-black hover:bg-slate-200 shadow-lg px-6 h-10 border-none">
                  <Plus className="mr-2" size={16} /> Add Memory
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-slate-800 bg-slate-950 text-white">
                <DialogHeader>
                  <DialogTitle className="font-sans text-xl">Capture a Memory</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500">Photo</label>
                    <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 hover:border-[#00ffff] transition-colors cursor-pointer relative overflow-hidden">
                      <Input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        accept="image/*"
                      />
                      {selectedFile ? (
                        <div className="text-center">
                          <ImageIcon className="mx-auto mb-2 text-[#00ffff]" size={32} />
                          <p className="text-sm text-slate-300 truncate max-w-[200px]">{selectedFile.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-slate-600 mb-2" size={32} />
                          <p className="text-sm text-slate-600">Click or drag to upload</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500">Month</label>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="rounded-xl border-slate-800 bg-slate-900">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-800 bg-slate-950 text-white">
                          {months.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500">Year</label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="rounded-xl border-slate-800 bg-slate-900">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-800 bg-slate-950 text-white">
                          {[2020, 2021, 2022, 2023, 2024, 2025].map(y => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-xl shadow-md font-medium border-none"
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? <Loader fullScreen={false} size={24} /> : 'Save Memory'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-500 hover:text-red-400"
              onClick={() => {
                localStorage.removeItem('is_admin');
                setIsAdmin(false);
                toast.info('Admin mode disabled');
              }}
            >
              Disable Admin Mode
            </Button>
          </div>
        )}
      </div>

      {/* Infinite Gallery */}
      <div className="flex-1 w-full h-screen relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader fullScreen={false} size={48} />
          </div>
        ) : (
          <div className="w-full h-full">
            <InfiniteMenu items={menuItems} scale={2} />
          </div>
        )}
      </div>

      {/* Admin Verify Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="rounded-3xl border-slate-800 bg-slate-950 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-sans text-xl text-white">Admin Access</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-slate-500">Admin Code</label>
              <Input 
                type="password" 
                placeholder="Enter secret code..."
                value={adminCodeInput}
                onChange={(e) => setAdminCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminVerify()}
                className="rounded-xl border-slate-800 bg-slate-900 text-white"
              />
            </div>
            <Button 
              className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-xl shadow-md font-medium border-none"
              onClick={handleAdminVerify}
              disabled={isVerifying || !adminCodeInput}
            >
              {isVerifying ? <Loader fullScreen={false} size={24} /> : 'Enable Admin Mode'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
