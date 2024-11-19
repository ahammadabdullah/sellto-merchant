import { notFound } from "next/navigation";
import React from "react";
import { ShopHero } from "@/components/shop/Hero";
import { FeaturedProduct } from "@/components/shop/FeaturedProduct";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopCtaCard } from "@/components/shop/ctaCard";
import prisma from "@/lib/db";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";
import sampleProduct from "@/assets/sample_product.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Button as CustomButton } from "@/components/ui/CustomButton";
import Link from "next/link";

interface ShopPageProps {
  shop: any;
  products: any[];
}

export async function generateStaticParams() {
  const shops = await prisma.shop.findMany({
    select: { subDomain: true },
  });

  return shops.map((shop) => ({
    params: { subdomain: shop.subDomain },
  }));
}

export default async function ShopPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = params;

  const shop = await prisma.shop.findUnique({
    where: { subDomain: subdomain },
    include: {
      products: {
        take: 6,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!shop) {
    notFound();
  }

  return (
    <ReactLenisProvider>
      <main className="w-full overflow-x-hidden">
        <ShopHero
          title={`Welcome to ${shop.name}`}
          sub_title={
            shop.description || "Explore our collection of amazing products!"
          }
          link="/products"
        />
        <div className="mx-auto  max-w-[1024px] max-[1025px]:px-[0.5rem]">
          {/* <section className="py-10">
            <h1 className="font-clash font-medium text-xl md:text-right w-full px-2 mb-3 text-primary2">
              Featured for {subdomain}
            </h1>{" "}
            <div>
              {shop.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  stockCount={product.stock}
                  title={product.productName}
                  subtitle={product.shortDescription}
                  price={product.price.toString()}
                  image={product.image || "/placeholder.png"}
                />
              ))}
            </div>
          </section> */}
          {/* featured products section */}
          <section className="">
            <h1 className="font-clash font-medium text-xl md:text-right w-full px-2 mb-3 text-primary2">
              Featured for {subdomain}
            </h1>
            <FeaturedProduct
              id={"featured-product"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
              image={sampleProduct}
            ></FeaturedProduct>
          </section>

          {/* products section */}

          <section className="py-28 sm:py-20">
            <h1 className="font-clash font-medium text-3xl sm:text-4xl w-full text-center px-2 mb-6">
              Our <span className="text-primary2">Products</span>
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {shop.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  stockCount={product.stock}
                  title={product.productName}
                  subtitle={product.shortDescription}
                  price={product.price.toString()}
                  image={product.image || sampleProduct}
                />
              ))}
              <Skeleton className="w-full min-h-[120px]" />
              <Skeleton className="w-full min-h-[120px] sm:block hidden" />
              <Skeleton className="w-full min-h-[120px] lg:block hidden" />
              <div className="w-full min-h-[10%] sm:min-h-[25%] bg-gradient-to-t from-background to-transparent  absolute bottom-0 grid place-items-center ">
                <CustomButton asChild>
                  <Link href={"/products"}>View all products</Link>
                </CustomButton>
              </div>
            </div>
          </section>
          <section className="py-6 sm:py-20">
            <ShopCtaCard
              title="We’re here to help"
              subtitle="If you’re in need of support for a product you purchased or just want
            to say hi, please contact us by tapping the button below."
            ></ShopCtaCard>
          </section>
        </div>
      </main>
    </ReactLenisProvider>
  );
}

/***
 * 
 * 
   <ReactLenisProvider>
      <main className="w-full overflow-x-hidden">
        <ShopHero
          className=""
          link="/shop/products"
          title={`Welcome to ${subdomain}`}
          sub_title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <div className="mx-auto  max-w-[1024px] max-[1025px]:px-[0.5rem]">
          <section className="">
            <h1 className="font-clash font-medium text-xl md:text-right w-full px-2 mb-3 text-primary2">
              Featured for {subdomain}
            </h1>
            <FeaturedProduct
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
              image={sampleProduct}
            ></FeaturedProduct>
          </section>
          <section className="py-28 sm:py-20">
            <h1 className="font-clash font-medium text-3xl sm:text-4xl w-full text-center px-2 mb-6">
              Our <span className="text-primary2">Products</span>
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">

              <ProductCard
                id={"fawfhiwoah"}
                stockCount={23}
                title="Product name"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                price="560"
                image={sampleProduct}
              ></ProductCard>
              <ProductCard
                id={"fawfhiwoah"}
                stockCount={23}
                title="Product name"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                price="560"
                image={sampleProduct}
              ></ProductCard>
              <ProductCard
                className="lg:block hidden "
                id={"fawfhiwoah"}
                stockCount={23}
                title="Product name"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                price="560"
              ></ProductCard>
              <Skeleton className="w-full min-h-[120px]" />
              <Skeleton className="w-full min-h-[120px] sm:block hidden" />
              <Skeleton className="w-full min-h-[120px] lg:block hidden" />
              <div className="w-full min-h-[10%] sm:min-h-[25%] bg-gradient-to-t from-background to-transparent  absolute bottom-0 grid place-items-center ">
                <CustomButton asChild>
                  <Link href={"/shop/products"}>View all products</Link>
                </CustomButton>
              </div>
            </div>
          </section>
          <section className="py-6 sm:py-20">
            <ShopCtaCard
              title="We’re here to help"
              subtitle="If you’re in need of support for a product you purchased or just want
          to say hi, please contact us by tapping the button below."
            ></ShopCtaCard>
          </section>
        </div>
      </main>
    </ReactLenisProvider>
 * 
 */
