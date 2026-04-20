import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const user = req.cookies.get('user')?.value ? JSON.parse(req.cookies.get('user').value) : null;

  const path = req.nextUrl.pathname;

  // Si no hay sesión → redirigir a login
  if (!token && path.startsWith('/es/cliente')) {
    return NextResponse.redirect(new URL('/es/login', req.url));
  }

  if (!token && path.startsWith('/es/conductor')) {
    return NextResponse.redirect(new URL('/es/login', req.url));
  }

  if (!token && path.startsWith('/es/supervisor')) {
    return NextResponse.redirect(new URL('/es/login', req.url));
  }

  if (!token && path.startsWith('/es/admin')) {
    return NextResponse.redirect(new URL('/es/login', req.url));
  }

  // Protección por rol
  if (user) {
    if (path.startsWith('/es/cliente') && user.rol !== 'cliente') {
      return NextResponse.redirect(new URL('/es/login', req.url));
    }

    if (path.startsWith('/es/conductor') && user.rol !== 'conductor') {
      return NextResponse.redirect(new URL('/es/login', req.url));
    }

    if (path.startsWith('/es/supervisor') && user.rol !== 'supervisor') {
      return NextResponse.redirect(new URL('/es/login', req.url));
    }

    if (path.startsWith('/es/admin') && user.rol !== 'admin') {
      return NextResponse.redirect(new URL('/es/login', req.url));
    }
  }

  return NextResponse.next();
}
