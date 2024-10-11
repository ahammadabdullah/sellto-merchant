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

import LandingNav from "@/components/nav/LandingNav";
import Footer from "@/components/nav/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingNav />
      {children}
      <Footer></Footer>
    </>
  );
}
