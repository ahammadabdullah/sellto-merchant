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
  console.log("Host Header:", host);

  const mainDomain = process.env.NEXT_PUBLIC_SERVER_URL || "localhost:3000";

  let subdomain = null;
  if (host && host !== mainDomain) {
    if (host.includes(".")) {
      const hostParts = host.split(".");
      const mainDomainParts = mainDomain.split(".");

      if (hostParts.length > mainDomainParts.length) {
        subdomain = hostParts[0];
      } else if (
        host.endsWith(".vercel.app") &&
        !host.startsWith("sellto-merchant")
      ) {
        subdomain = hostParts[0];
      }
    }
  }

  console.log("Extracted subdomain:", subdomain);

  const privateRoutes = ["/dashboard", "/onboarding"];
  const mainDomainRoutes = [
    "/about",
    "/login",
    "/signup",
    "/onboarding",
    "/dashboard",
    "/api",
  ];

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPrivateRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isMainDomainRoute = (pathname: string) => {
    return (
      mainDomainRoutes.includes(pathname) ||
      mainDomainRoutes.some((route) => pathname.startsWith(route + "/"))
    );
  };

  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== "beta" &&
    !isMainDomainRoute(pathname)
  ) {
    const url = nextUrl.clone();
    url.pathname = `/shop/${subdomain}${url.pathname}`;
    console.log("Rewriting URL to:", url.pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
