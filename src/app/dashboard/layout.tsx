import type { Metadata } from "next";
import type { Viewport } from "next";
import { cookies } from "next/headers";

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

import SideBar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import LandingNav from "@/components/home/nav/LandingNav";
import Footer from "@/components/home/nav/Footer";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function DahsboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar:state")?.value === "false" ? false : true;
  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={{
          // @ts-ignore
          "--sidebar-width": "12.5rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar />
        <SidebarInset>
          <TopBar SidebarTrigger={SidebarTrigger} />
          <main className="w-[100vw] md:w-[74vw] lg:w-auto relative">
            <div className="z-10 relative">{children}</div>
            <div className="w-full h-full fixed right-0 bottom-0 ">
              <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute right-[-40%] top-0 max-[1200px]:top-[90%]  pointer-events-none z-[-3] opacity-70"></div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
