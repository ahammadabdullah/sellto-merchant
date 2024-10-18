import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig as NextAuthConfig);

export async function middleware(request: any) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const { pathname } = nextUrl;

  const privateRoutes = ["/dashboard", "/dashboard/:path"];

  if (!isLoggedIn && privateRoutes.includes(pathname)) {
    // Handle non-public routes
    return Response.redirect(new URL("/login", nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
