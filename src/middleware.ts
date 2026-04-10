import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || '123456'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }
  const token = request.cookies.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }
    
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error('JWT Verification failed:', error);
    
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
