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

  const mainDomains = [
    "sellto-merchant.vercel.app",
    "localhost:3000",
    process.env.NEXT_PUBLIC_SERVER_URL,
  ].filter(Boolean);

  console.log("Main Domains:", mainDomains);

  let subdomain = null;

  if (host && !mainDomains.includes(host)) {
    if (host.includes(".")) {
      const hostParts = host.split(".");

      if (host.endsWith(".vercel.app")) {
        if (
          hostParts.length === 4 &&
          hostParts.slice(1).join(".") === "sellto-merchant.vercel.app"
        ) {
          subdomain = hostParts[0];
        } else if (hostParts.length === 3) {
          subdomain = hostParts[0];
        }
      } else {
        for (const mainDomain of mainDomains) {
          if (mainDomain && host.endsWith(`.${mainDomain}`)) {
            subdomain = hostParts[0];
            break;
          }
        }

        if (!subdomain && hostParts.length > 2) {
          subdomain = hostParts[0];
        }
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
