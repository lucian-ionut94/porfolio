import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

async function handleAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login and OAuth callback without auth
  if (pathname === "/admin/login" || pathname === "/admin/callback") {
    return NextResponse.next();
  }

  // Check Supabase session for all other /admin routes
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes - handle auth
  if (pathname.startsWith("/admin")) {
    return handleAdminAuth(request);
  }

  // API admin routes - let them handle their own auth
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // Everything else - i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Root
    "/",
    // Locale-prefixed paths
    "/(ro|en)/:path*",
    // All other paths except admin, api, Next.js internals and static files
    "/((?!admin|api|_next|_vercel|.*\\..*).*)",
    // Admin routes
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
