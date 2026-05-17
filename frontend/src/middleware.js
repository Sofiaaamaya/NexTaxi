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

  // Redirección si el usuario intenta entrar a la raíz sin idioma
  if (url.pathname === '/') {
    const locale = DEFAULT_LOCALE;
    const token = request.cookies.get('token')?.value;
    // Nota: Middleware no lee sessionStorage, por lo que usaremos cookies para persistencia si fuera necesario.
    // Pero por ahora, priorizamos la redirección básica de idioma.
    url.pathname = `/${locale}/home`;
    return NextResponse.redirect(url);
  }

  // Protección de rutas y redirección por rol
  const pathname = url.pathname;
  const segments = pathname.split('/');
  const locale = segments[1];
  const role = segments[2];

  // Si estamos en una ruta de dashboard sin el rol correcto, podrías redirigir aquí.
  // Pero lo ideal es que el cliente maneje la redirección final tras el login.

  const localeMatch = url.pathname.match(/^\/(\w{2})(?:\/?$)/);
  if (localeMatch && LOCALES.includes(localeMatch[1])) {
    url.pathname = `/${localeMatch[1]}/home`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\..*).*)'],
};
