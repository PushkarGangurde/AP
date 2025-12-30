'use client';

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

export default function OursPage() {
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
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  useEffect(() => {
    fetchPhotos();
    setIsAdmin(localStorage.getItem('is_admin') === 'true');
  }, []);

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

  const handleDelete = async (photo: Photo) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    setDeleting(photo.id);
    try {
      await deletePhoto(photo.id, photo.url);
      toast.success('Memory deleted');
      fetchPhotos();
      if (selectedPhoto?.id === photo.id) setSelectedPhoto(null);
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
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

  const groupedPhotos = photos.reduce((acc, photo) => {
    const key = `${photo.month} ${photo.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  const groupKeys = Object.keys(groupedPhotos).sort((a, b) => {
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');
    if (yearA !== yearB) return parseInt(yearB) - parseInt(yearA);
    return months.indexOf(monthB) - months.indexOf(monthA);
  });

  return (
    <div className="min-h-screen pt-12 px-4 pb-32 bg-black">
      <div className="max-w-4xl mx-auto space-y-12">
          <header className="flex flex-col items-center space-y-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleAdminToggle}
              className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_0_20px_rgba(20,232,24,0.3)]"
            >
              <ImageIcon stroke="url(#aurora-gradient)" size={24} />
            </motion.div>
            <h1 className="text-3xl font-sans text-white">Shared Memories</h1>
          </header>

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

          {isAdmin && (
            <div className="flex justify-center flex-col items-center space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-white text-black hover:bg-slate-200 shadow-lg px-8 h-12 border-none group">
                    <Plus stroke="url(#aurora-gradient)" className="mr-2" size={18} /> Add Memory
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl border-slate-800 bg-slate-950 text-white">
                  <DialogHeader>
                    <DialogTitle className="font-sans text-xl">Capture a Memory</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-500">Photo</label>
                      <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 hover:border-green-500 transition-colors cursor-pointer relative overflow-hidden">
                        <Input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          accept="image/*"
                        />
                        {selectedFile ? (
                          <div className="text-center">
                            <ImageIcon stroke="url(#aurora-gradient)" className="mx-auto mb-2" size={32} />
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

        <div className="space-y-16">
          {loading ? (
            <div className="flex justify-center pt-20">
              <Loader fullScreen={false} size={48} />
            </div>
            ) : photos.length === 0 ? (
               <div className="text-center py-20 space-y-4">
                  <ImageIcon stroke="url(#aurora-gradient)" className="mx-auto" size={64} />
                  <p className="text-slate-500 font-sans">No memories captured yet...</p>
               </div>
            ) : (
              groupKeys.map((key) => (
                <section key={key} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-sans text-white whitespace-nowrap">{key}</h2>
                    <div className="h-[1px] w-full bg-slate-800" />
                  </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {groupedPhotos[key].map((photo, idx) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="aspect-square relative group cursor-pointer overflow-hidden rounded-3xl"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img 
                        src={photo.url} 
                        alt="Memory" 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                           <Maximize2 stroke="url(#aurora-gradient)" className="opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                        </div>
                        
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(photo);
                            }}
                            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-900/60 text-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={deleting === photo.id}
                          >
                            {deleting === photo.id ? <Loader fullScreen={false} size={16} /> : <Trash2 stroke="url(#aurora-gradient)" size={16} />}
                          </button>
                        )}
                    </motion.div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                alt="Full memory" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
                <div className="mt-6 text-center text-white space-y-1">
                  <p className="font-sans text-xl">{selectedPhoto.month} {selectedPhoto.year}</p>
                  <p className="text-white/50 text-xs uppercase tracking-widest">A captured moment together</p>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
