import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const accessCode = process.env.ACCESS_CODE || '2020';

    if (code === accessCode) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('couple_auth', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false, // Set to false so client can read it if needed, or keep true for security
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ success: false, message: 'Incorrect code' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
