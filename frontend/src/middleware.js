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

  if (url.pathname === '/') {
    url.pathname = `/${DEFAULT_LOCALE}/home`;
    return NextResponse.redirect(url);
  }

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
