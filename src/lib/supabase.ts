const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPhotos() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/photos?select=*&order=year.desc,month_num.desc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch photos:', await res.text());
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error in getPhotos:', error);
    return [];
  }
}

export async function uploadPhoto(url: string, month: string, year: number, monthNum: number) {
  try {
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

    if (!res.ok) {
      throw new Error(`Failed to upload photo to DB: ${await res.text()}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    throw error;
  }
}

export async function deletePhoto(id: string, url: string) {
  try {
    // Extract filename from URL
    const fileName = url.split('/').pop();
    
    // Delete from DB
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/photos?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      }
    });

    if (!dbRes.ok) {
      console.error('Failed to delete from DB:', await dbRes.text());
    }
  
    // Delete from Storage
    if (fileName) {
      const storageRes = await fetch(`${SUPABASE_URL}/storage/v1/object/memories/${fileName}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });
      
      if (!storageRes.ok) {
        console.error('Failed to delete from storage:', await storageRes.text());
      }
    }
  } catch (error) {
    console.error('Error in deletePhoto:', error);
    throw error;
  }
}

export async function uploadToStorage(file: File) {
  try {
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
      throw new Error(`Failed to upload image: ${await res.text()}`);
    }

    return `${SUPABASE_URL}/storage/v1/object/public/memories/${filePath}`;
  } catch (error) {
    console.error('Error in uploadToStorage:', error);
    throw error;
  }
}
