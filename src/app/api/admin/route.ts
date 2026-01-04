import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const adminCode = process.env.ADMIN_CODE || 'kichku_tanu_2020';

    if (code === adminCode) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Incorrect admin code' }, { status: 401 });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
