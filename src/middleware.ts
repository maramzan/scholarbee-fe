import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = new Set(['/login', '/register', '/forgot-password']);
const PROTECTED_ROUTE_PREFIXES = [
  '/create-profile',
  '/dashboard',
  '/settings',
  '/profile',
  '/program-details' // Added program-details to protected routes
];
const IGNORED_PATHS = ['/static', '/_next', '/assets', '/favicon.ico', '/api'];

function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(atob(payload));
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

function redirectToLogin(req: NextRequest): NextResponse {
  const url = new URL('/login', req.url);
  const returnUrl = req.nextUrl.pathname + req.nextUrl.search;
  url.searchParams.set('redirect', returnUrl);
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  if (IGNORED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isComingSoon = false;

  if (pathname === '/coming-soon') {
    if (!isComingSoon) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (isComingSoon) {
    return NextResponse.redirect(new URL('/coming-soon', req.url));
  }

  const token = req.cookies.get('token')?.value;

  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!token && isProtectedRoute) {
    return redirectToLogin(req);
  }

  if (token && isTokenExpired(token)) {
    const response = redirectToLogin(req);
    response.cookies.set('token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return response;
  }

  if (token && PUBLIC_ROUTES.has(pathname)) {
    const redirectTo = req.nextUrl.searchParams.get('redirect') || '/';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
