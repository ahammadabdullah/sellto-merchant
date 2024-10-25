import type { Metadata } from "next";
import type { Viewport } from "next";

let siteMetadata = {
  title: "Seller Name",
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
  },
  icons: [
    { rel: "icon", url: "https://www.sellto.io/icon.png" },
    { rel: "apple-touch-icon", url: "https://www.sellto.io/apple-icon.png" },
  ],
};

import ShopNav from "@/components/shop/nav/ShopNav";
import Footer from "@/components/shop/nav/ShopFooter";

import { LinkType } from "@/types/types";
let footerContact: LinkType[] = [
  {
    label: "Support",
    url: "mailto:support@sellto.gg",
    visibleUrl: "support@sellto.gg",
  },
  {
    label: "General Inquiry",
    url: "mailto:support@sellto.gg",
    visibleUrl: "support@sellto.gg",
  },
  { label: "Phone", url: "tel:+02200022223", visibleUrl: "+02200022223" },
];

import shopLogo from "@/assets/sellar.png";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex flex-col border">
      <ShopNav proUser={false} shopLogo={shopLogo} shopName="Short name" />
      <div className="mb-10">{children}</div>

      <div className="mt-auto">
        <Footer
          shortDescription="Easy digital store solution for everyone"
          proUser={false}
          copyright="SellarName"
          contactList={footerContact}
          shopLogo={shopLogo}
          shopName="Short name"
        ></Footer>
      </div>
    </div>
  );
}
