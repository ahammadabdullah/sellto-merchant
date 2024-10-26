// import Image from "next/image";
import Link from "next/link";

// functions
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// components
import { Button } from "../ui/CustomButton";
// assets
// import img_global_map from "@/assets/home/global_map.png";

export interface classProps {
  className?: string;
}
export function ShopCtaCard({ className }: classProps) {
  return (
    <div className="card_wrap border rounded-lg relative overflow-hidden p-8 space-y-2 md:flex gap-6 md:justify-between md:place-items-center md:p-10 lg:p-20">
      <h1 className="font-clash text-4xl md:text-6xl md:max-w-[400px] font-medium">
        We’re here to help
      </h1>
      <div className="right_wrap md:max-w-[45%]">
        <p className="pb-6 text-base opacity-85">
          If you’re in need of support for a product you purchased or just want
          to say hi, please contact us by tapping the button below.
        </p>
        <Link href={"/"}>
          <Button className="px-7 font-medium ">Get started</Button>
        </Link>
      </div>
      <div className="gradient_wrap absolute w-full h-full  left-0 right-0 pointer-events-none">
        <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute right-[50%] top-[-144%] sm:right-[50%] sm:top-[-250%] md:right-[-50%] md:top-[-50%] opacity-90"></div>
        <div className="bg_primary_radial_gradient w-[100%]  aspect-square rounded-full absolute left-[40%] bottom-2 sm:left-[50%] sm:bottom-[-60%]  md:left-[-30%]  md:bottom-[-50%] opacity-90"></div>
      </div>
    </div>
  );
}
