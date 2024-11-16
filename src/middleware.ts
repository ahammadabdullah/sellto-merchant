import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse, NextRequest } from "next/server";

const { auth } = NextAuth(authConfig as NextAuthConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const { pathname } = nextUrl;

  const host = request.headers.get("host");
  const subdomain = host?.split(".")[0];
  const privateRoutes = ["/dashboard", "/dashboard/:path*"];
  const mainDomainRoutes = [
    "/",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/onboarding",
    "/dashboard",
    "/api",
  ];

  // Redirect to onboarding if user is logged in but has no shopId
  // if (
  //   isLoggedIn &&
  //   !session.user.shopId &&
  //   !pathname.startsWith("/onboarding")
  // ) {
  //   return NextResponse.redirect(new URL("/onboarding", nextUrl));
  // }

  // Protect private routes for unauthenticated users
  if (
    !isLoggedIn &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    console.log("from middleware");
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  const isMainDomainRoute = (pathname: string) => {
    return (
      mainDomainRoutes.includes(pathname) ||
      mainDomainRoutes.some((route) => pathname.startsWith(route + "/"))
    );
  };

  if (
    subdomain &&
    subdomain !== "localhost" &&
    subdomain !== "beta" &&
    !isMainDomainRoute(pathname)
  ) {
    const url = nextUrl.clone();
    url.pathname = `/shop/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
