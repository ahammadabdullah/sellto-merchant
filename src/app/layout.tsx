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
import MultiLangProvider from "@/components/helpers/MultiLangProvider";
import { ModeToggle } from "@/components/ui/themeButton";
import { interpolate } from "gsap-trial/dist";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Sellto</title>
        <meta
          name="description"
          content={"Your one stop digital store solution."}
        />
        <meta property="og:title" content={"Sellto"} />
        <meta
          property="og:description"
          content={"Your one stop digital store solution."}
        />

        <meta property="og:site_name" content="sellto" />
        <meta property="og:image" content="/og_img2.webp" />
        <meta property="og:image:url" content="/og_img2.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1320" />
        <meta property="og:image:height" content="600" />

        <meta name="twitter:image" content="/og_img2.webp" />
        <meta name="twitter:image:type" content="image/webp" />
        <meta name="twitter:image:width" content="1320" />
        <meta name="twitter:image:height" content="600" />
      </Head>
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
          <MultiLangProvider>
            <Nav />
            {children}
          </MultiLangProvider>
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
