'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Calendar, X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { getPhotos, uploadPhoto, uploadToStorage } from '@/lib/supabase';

interface Photo {
  id: string;
  url: string;
  month: string;
  year: number;
  month_num: number;
  created_at: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function OursPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Upload State
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  useEffect(() => {
    fetchPhotos();
    // Check for admin flag in localStorage
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

  // Group photos by year and month
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
    <div className="min-h-screen pt-12 px-4 pb-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex flex-col items-center space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-[#ff9a9e]"
          >
            <ImageIcon size={24} />
          </motion.div>
          <h1 className="text-3xl font-serif text-[#4a4a4a] italic">Shared Memories</h1>
          
          {/* Admin Toggle (Hidden way to enable upload for testing) */}
          <div 
            className="opacity-0 cursor-default h-2 w-2" 
            onClick={() => {
              const code = prompt('Enter Admin Code');
              if (code === '202020') {
                localStorage.setItem('is_admin', 'true');
                setIsAdmin(true);
                toast.success('Admin mode enabled');
              }
            }}
          />
        </header>

        {isAdmin && (
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-[#ff9a9e] hover:bg-[#ff8a8e] shadow-lg px-8">
                  <Plus className="mr-2" size={18} /> Add Memory
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-[#e2e2e2] bg-white">
                <DialogHeader>
                  <DialogTitle className="font-serif italic text-xl">Capture a Memory</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-[#8e8e8e]">Photo</label>
                    <div className="border-2 border-dashed border-[#e2e2e2] rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 hover:border-[#ff9a9e] transition-colors cursor-pointer relative overflow-hidden">
                      <Input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                      {selectedFile ? (
                        <div className="text-center">
                          <ImageIcon className="mx-auto text-[#ff9a9e] mb-2" size={32} />
                          <p className="text-sm text-[#4a4a4a] truncate max-w-[200px]">{selectedFile.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-[#8e8e8e] mb-2" size={32} />
                          <p className="text-sm text-[#8e8e8e]">Click or drag to upload</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#8e8e8e]">Month</label>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="rounded-xl border-[#e2e2e2]">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-[#e2e2e2]">
                          {months.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-[#8e8e8e]">Year</label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="rounded-xl border-[#e2e2e2]">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-[#e2e2e2]">
                          {[2020, 2021, 2022, 2023, 2024, 2025].map(y => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 bg-[#ff9a9e] hover:bg-[#ff8a8e] rounded-xl shadow-md"
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? <Loader2 className="animate-spin" /> : 'Save Memory'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="space-y-16">
          {loading ? (
            <div className="flex justify-center pt-20">
              <Loader2 className="animate-spin text-[#ff9a9e]" size={32} />
            </div>
          ) : photos.length === 0 ? (
             <div className="text-center py-20 space-y-4">
                <ImageIcon className="mx-auto text-[#e2e2e2]" size={64} />
                <p className="text-[#8e8e8e] font-serif italic">No memories captured yet...</p>
             </div>
          ) : (
            groupKeys.map((key) => (
              <section key={key} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-serif text-[#4a4a4a] italic whitespace-nowrap">{key}</h2>
                  <div className="h-[1px] w-full bg-[#e2e2e2]" />
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
                    >
                      <img 
                        src={photo.url} 
                        alt="Memory" 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
