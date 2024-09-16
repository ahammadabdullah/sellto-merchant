import type { Metadata } from "next";
import type { Viewport } from "next";

let siteMetadata = {
  title: "Sellto - The simplest digital store solution",
  description:
    "An effortless digital store experience. Showcase and sell your digital creations hassle-free.",
  canonical: "https://www.sellto.io",
  image: "https://www.sellto.io/og_img2.webp",
  ogUrl: "https://www.sellto.io",
};

export const viewport: Viewport = {
  themeColor: "#875CFF",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  robots: "index, follow", //  { index: false, follow: false }
  publisher: "Sellto.io",
  title: siteMetadata.title,
  description: siteMetadata.description,

  openGraph: {
    type: "website",
    url: siteMetadata.ogUrl,
    siteName: "sellto.io",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: {
      url: siteMetadata.image,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@sellto.io",
    images: siteMetadata.image,
  },
  alternates: {
    canonical: siteMetadata.canonical,
    // types: {
    //   "application/rss+xml": [
    //     { url: "blog.rss", title: "rss" },
    //     { url: "blog/js.rss", title: "js title" },
    //   ],
    // },
  },
  icons: [
    { rel: "icon", url: "https://www.sellto.io/icon.png" },
    { rel: "apple-touch-icon", url: "https://www.sellto.io/apple-icon.png" },
  ],
};

// import "@/styles/fonts.css";
import "@/styles/globals.css";

// utils
import { ThemeProvider } from "@/components/helpers/theme-provider";
import { cn } from "@/lib/utils";

// fonts
import { Inter } from "next/font/google";
import localFont from "next/font/local";
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const ClashDisplay = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});

// components
import Nav from "@/components/Nav";
import Head from "next/head";
import UseClientProvider from "@/components/helpers/UseClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/ui/themeButton";
import { interpolate } from "gsap-trial/dist";
import LandingNav from "@/components/nav/LandingNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head></Head> */}
      <body
        className={cn(
          "min-h-[100dvh] bg-background font-sans antialiased  w-full ",
          fontSans.variable,
          ClashDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UseClientProvider>
            <LandingNav />
            {children}
          </UseClientProvider>
          <ModeToggle />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
