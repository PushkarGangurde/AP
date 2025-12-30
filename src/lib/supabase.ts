const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPhotos() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?select=*&order=year.desc,month_num.desc`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    next: { revalidate: 0 }
  });
  return res.json();
}

export async function uploadPhoto(url: string, month: string, year: number, monthNum: number) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/photos`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ url, month, year, month_num: monthNum })
  });
  return res.json();
}

// For storage, we'll use the storage API
export async function uploadToStorage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/memories/${fileName}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': file.type
    },
    body: file
  });
  
  if (!res.ok) throw new Error('Upload failed');
  
  return `${SUPABASE_URL}/storage/v1/object/public/memories/${fileName}`;
}
