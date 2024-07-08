import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sellto",
  description: "Your one stop digital store solution.",
  openGraph: {
    title: "Sellto",
    description: "Your one stop digital store solution.",
  },
};

// import "@/styles/fonts.css";
import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/themeButton";

import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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

import Nav from "@/components/Nav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/appleIcon.png"
          type="image/png"
          sizes="any"
        />

        <meta property="og:image" content="/og_img.webp" />
        <meta property="og:image:type" content="webp" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />

        <meta name="twitter:image" content="/og_img.webp" />
        <meta name="twitter:image:type" content="webp" />
        <meta name="twitter:image:width" content="1910" />
        <meta name="twitter:image:height" content="1080" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
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
          <Nav />
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
