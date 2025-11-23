import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/profile", "/admin"];

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, favicon.ico, and .png files
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)",
  ],
};
