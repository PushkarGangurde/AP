'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, X, Upload, Trash2, Maximize2 } from 'lucide-react';
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
  }
];

export default function MemoriesPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin Dialog State
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Full Screen State
  const [fullscreenItem, setFullscreenItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchPhotos();
    setIsAdmin(localStorage.getItem('is_admin') === 'true');

    const handleAdminTrigger = () => {
      if (!isAdmin) {
        setShowAdminDialog(true);
      } else {
        toast.info('You are already in admin mode');
      }
    };

    window.addEventListener('trigger-admin-login', handleAdminTrigger);
    return () => window.removeEventListener('trigger-admin-login', handleAdminTrigger);
  }, [isAdmin]);

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
      const now = new Date();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const monthNum = now.getMonth() + 1;
      
      const url = await uploadToStorage(selectedFile);
      await uploadPhoto(url, month, year, monthNum);
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

  const menuItems: MenuItem[] = useMemo(() => {
    return photos.length > 0 
      ? photos.map(p => ({
          image: p.url,
          link: '#',
          title: `${p.month} ${p.year}`,
          description: 'A captured moment'
        }))
      : tempItems;
  }, [photos]);

  const handleFullscreen = useCallback((item: MenuItem) => {
    setFullscreenItem(item);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      {/* Infinite Gallery - Full Page */}
      <div className="absolute inset-0 z-0">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader fullScreen={false} size={48} />
          </div>
        ) : (
          <InfiniteMenu 
            items={menuItems} 
            scale={1.2} 
            onDoubleClick={handleFullscreen}
          />
        )}
      </div>

      {/* Admin Controls Overlay */}
      <div className="fixed bottom-24 right-8 z-50">
        {isAdmin && (
          <div className="flex flex-col items-end space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-white text-black hover:bg-slate-200 shadow-lg px-6 h-12 border-none font-bold">
                  <Plus className="mr-2" size={18} /> Add Memory
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

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {fullscreenItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDoubleClick={() => setFullscreenItem(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setFullscreenItem(null)}
                className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors z-[101]"
              >
                <X size={32} />
              </button>
              
              <img 
                src={fullscreenItem.image} 
                alt={fullscreenItem.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-white tracking-tight">{fullscreenItem.title}</h3>
                <p className="text-slate-400 mt-1">{fullscreenItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
