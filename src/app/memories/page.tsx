'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { InfiniteMenu, MenuItem } from '@/components/InfiniteMenu';
import { AuroraHearts } from '@/components/AuroraHearts';

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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Admin Dialog State
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPhotos = useCallback(async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load memories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
    setIsAdmin(localStorage.getItem('is_admin') === 'true');

    const handleTriggerAdmin = () => {
      if (!isAdmin) {
        setShowAdminDialog(true);
      } else {
        toast.info('You are already in admin mode');
      }
    };

    window.addEventListener('trigger-admin-mode', handleTriggerAdmin);
    return () => window.removeEventListener('trigger-admin-mode', handleTriggerAdmin);
  }, [fetchPhotos, isAdmin]);

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
      console.error('Admin verification error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

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

  const handleDelete = async (photo: Photo) => {
    if (!window.confirm('Are you sure you want to delete this memory?')) return;

    try {
      await deletePhoto(photo.id, photo.url);
      toast.success('Memory deleted');
      setSelectedPhoto(null);
      fetchPhotos();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete memory');
    }
  };

  // Map real photos to MenuItem format if available
  const menuItems: MenuItem[] = useMemo(() => photos.length > 0
    ? photos.map(p => ({
      image: p.url,
      link: '#',
      title: `${p.month} ${p.year}`,
      description: 'A captured moment'
    }))
    : tempItems, [photos]);

  const handleItemDoubleClick = useCallback((index: number) => {
    if (photos.length > 0) {
      setSelectedPhoto(photos[index]);
    }
  }, [photos]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      <AuroraHearts />
      {/* Infinite Gallery */}
      <div className="absolute inset-0 w-full h-full">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader fullScreen={false} size={48} />
          </div>
        ) : (
          <InfiniteMenu
            items={menuItems}
            scale={2}
            onItemDoubleClick={handleItemDoubleClick}
          />
        )}
      </div>

      {/* Admin Controls Overlay */}
      <div className="fixed bottom-24 right-8 z-40">
        {isAdmin && (
          <div className="flex flex-col items-end space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-lg px-6 h-12 border border-white/20">
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
                    <div
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 transition-colors cursor-pointer relative overflow-hidden ${isDragging ? 'border-[#00ffff] bg-[#00ffff]/5' : 'border-slate-800 hover:border-[#00ffff]'
                        }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
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
                          <Upload className={`mx-auto mb-2 ${isDragging ? 'text-[#00ffff]' : 'text-slate-600'}`} size={32} />
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
              className="rounded-full bg-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/20 shadow-lg px-6 h-10 border border-white/10 text-xs uppercase tracking-widest font-medium"
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

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.url}
                alt="Fullscreen"
                className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/80 hover:text-white transition-all backdrop-blur-sm"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={24} />
              </button>
              {isAdmin && (
                <button
                  className="absolute top-3 left-3 p-3 bg-red-500/70 hover:bg-red-600 rounded-full text-white transition-all backdrop-blur-sm"
                  onClick={() => handleDelete(selectedPhoto)}
                >
                  <Trash2 size={22} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
