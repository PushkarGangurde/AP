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

export async function deletePhoto(id: string, url: string) {
  // Extract filename from URL
  const fileName = url.split('/').pop();
  
  // Delete from DB
  await fetch(`${SUPABASE_URL}/rest/v1/photos?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
  });

  // Delete from Storage
  if (fileName) {
    await fetch(`${SUPABASE_URL}/storage/v1/object/memories/${fileName}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    });
  }
}

export async function uploadToStorage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/memories/${filePath}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY!,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': file.type,
    },
    body: file
  });

  if (!res.ok) {
    throw new Error('Failed to upload image');
  }

  return `${SUPABASE_URL}/storage/v1/object/public/memories/${filePath}`;
}
