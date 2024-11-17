"use client";
// libraries
// import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";

// components
import { Button as CustomButton } from "@/components/ui/CustomButton";
import { ShopHero } from "@/components/shop/Hero";
import { FeaturedProduct } from "@/components/shop/FeaturedProduct";
import { ProductCard } from "@/components/shop/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopCtaCard } from "@/components/shop/ctaCard";
import sampleProduct from "@/assets/sample_product.png";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const subdomain = params.subdomain;
  return (
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
            {/* title max length 55chr subtitle max lenght 85chr  */}
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
              {/* title max length 55chr subtitle max lenght 85chr  */}

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
            {/* title max lenght 20chr  subtitle max lenght 150chr*/}
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
