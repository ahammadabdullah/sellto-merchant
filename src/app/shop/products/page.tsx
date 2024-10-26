// libraries
// import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ReactLenisProvider } from "@/components/helpers/LenisProvider";

// components
import { Button as CustomButton } from "@/components/ui/CustomButton";
import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/shop/ProductHero";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Input as IconInput } from "@/components/ui/inputWithIcon";
import { ProductCard } from "@/components/shop/ProductCard";

export default function Home() {
  return (
    <ReactLenisProvider>
      <main className="w-full overflow-x-hidden">
        {/* <h1 className="font-clash font-medium text-3xl sm:text-4xl w-full text-center px-2 py-10 mt-20">
          Our <span className="text-primary2">Products</span>
        </h1> */}
        <ProductHero></ProductHero>
        <section className="mx-auto  max-w-[1024px] max-[1025px]:px-[0.5rem] mb-16">
          <div className="my-10">
            <IconInput
              placeholder="Search a product.."
              className="py-6"
              startIcon={Search}
            ></IconInput>
          </div>

          <div className="flex flex-wrap justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>

            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>

            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>

            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>
            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>
            <ProductCard
              className="sm:basis-[325px]"
              id={"fawfhiwoah"}
              stockCount={23}
              title="Product name"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              price="560"
            ></ProductCard>
          </div>
        </section>
      </main>
    </ReactLenisProvider>
  );
}
