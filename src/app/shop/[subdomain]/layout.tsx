import type { Metadata } from "next";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import ShopNav from "@/components/shop/nav/ShopNav";
import Footer from "@/components/shop/nav/ShopFooter";
import shopLogo from "@/assets/sellar.png";

type Shop = {
  id: string;
  name: string;
  image: string | null;
  favicon: string | null;
  subTitle: string | null;
  description?: string | null;
  subDomain: string;
};

interface LandingLayoutProps {
  children: React.ReactNode;
  params: { subdomain: string };
}

export async function generateMetadata({
  params,
}: LandingLayoutProps): Promise<Metadata> {
  const { subdomain } = params;

  // Fetch the shop details
  const shop: Shop | null = await prisma.shop.findUnique({
    where: { subDomain: subdomain },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      subDomain: true,
      subTitle: true,
      favicon: true,
    },
  });

  if (!shop) {
    return {
      title: "Shop Not Found - Sellto.io",
      description: "The shop you are looking for does not exist.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${shop.name} - Sellto.io`,
    description: shop.description || "Shop at the best digital store.",
    openGraph: {
      title: shop.name,
      description: shop.description || "Shop at the best digital store.",
      images: shop.image
        ? [{ url: shop.image }]
        : "https://www.sellto.io/og_img2.webp",
      url: `https://${subdomain}.sellto.io`,
    },
    twitter: {
      card: "summary_large_image",
      title: shop.name,
      description: shop.description || "Shop at the best digital store.",
    },
  };
}

// Layout Component
export default async function LandingLayout({
  children,
  params,
}: LandingLayoutProps) {
  const { subdomain } = params;

  // Fetch the shop details
  const shop: Shop | null = await prisma.shop.findUnique({
    where: { subDomain: subdomain },
  });

  if (!shop) {
    notFound();
  }

  // Footer links
  const footerContact = [
    {
      label: "Support",
      url: "mailto:support@sellto.gg",
      visibleUrl: "support@sellto.gg",
    },
    {
      label: "Phone",
      url: "tel:+02200022223",
      visibleUrl: "+02200022223",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ShopNav
        proUser={false}
        shopLogo={shop.image || shopLogo}
        shopName={shop.name}
      />
      <div className="mb-10">{children}</div>
      <div className="mt-auto">
        <Footer
          shortDescription={shop.subTitle || "Your digital store"}
          proUser={false}
          copyright={shop.name}
          contactList={footerContact}
          shopLogo={shop.image || shopLogo}
          shopName={shop.name}
        />
      </div>
    </div>
  );
}
