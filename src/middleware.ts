import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig as NextAuthConfig);

import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const { pathname } = nextUrl;

  const host = request.headers.get("host");
  const subdomain = host?.split(".")[0];
  // const privateRoutes = ["/dashboard", "/dashboard/:path"];
  const privateRoutes = [""];
  // if (
  //   !isLoggedIn &&
  //   privateRoutes.some((route) => pathname.startsWith(route))
  // ) {
  //   return NextResponse.redirect(new URL("/login", nextUrl));
  // }
  if (subdomain && subdomain !== "localhost:3000") {
    const url = nextUrl.clone();
    url.pathname = `/shop/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
