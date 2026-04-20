// middleware.js
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { LOCALES, DEFAULT_LOCALE } from './lib/constants/locales';

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export function middleware(request) {
  const url = request.nextUrl;
  const path = url.pathname;

  // 1. Redirección inicial
  if (path === '/') {
    url.pathname = `/${DEFAULT_LOCALE}/home`;
    return NextResponse.redirect(url);
  }

  // 2. Redirección automatica /es a /es/home
  const localeMatch = path.match(/^\/(\w{2})(?:\/?$)/);
  if (localeMatch && LOCALES.includes(localeMatch[1])) {
    url.pathname = `/${localeMatch[1]}/home`;
    return NextResponse.redirect(url);
  }

  // 3. Ejecutar next-intl
  const response = intlMiddleware(request);

  // 4. Autenticación y roles
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const locale = path.split('/')[1]; // es / en

  // Rutas por rol
  const roleRoutes = {
    cliente: `/${locale}/cliente`,
    conductor: `/${locale}/conductor`,
    supervisor: `/${locale}/supervisor`,
    admin: `/${locale}/admin`,
  };

  const isProtected = Object.values(roleRoutes).some((route) =>
    path.startsWith(route)
  );

  // 4.1 Si intenta entrar a ruta protegida sin token → login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // 4.2 Si hay usuario pero intenta entrar a ruta de otro rol → login
  if (user) {
    for (const role in roleRoutes) {
      const route = roleRoutes[role];

      if (path.startsWith(route) && user.rol !== role) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)'],
};
