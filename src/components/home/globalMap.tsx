import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// components
import { Button } from "../ui/button";
import Circles from "@/components/waitlist/Ciecles";
import SectionTitle from "@/components/SecTitle";

// assets
import img_global_map from "@/assets/home/global_map.png";
import img_global_map_light from "@/assets/home/global_map_light.png";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className="container my-[7rem] relative overflow-x-hidden min-[810px]:min-h-[660px]">
      <SectionTitle
        text1="Helping hundreds of businesses"
        text2="reaching clients everywhere."
      ></SectionTitle>
      <Image
        className="max-w-full max-[700px]:mt-[-5rem] max-[490px]:ml-[-3rem] max-[810px]:min-w-[600px] min-[810px]:absolute  right-0 top-0 z-[-1]  hidden dark:block"
        src={img_global_map}
        alt=" "
        placeholder="blur"
        loading="lazy"
      />
      <Image
        className="max-w-full max-[700px]:mt-[-5rem] max-[490px]:ml-[-3rem] max-[810px]:min-w-[600px] min-[810px]:absolute  right-0 top-0 z-[-1] dark:hidden"
        src={img_global_map_light}
        alt=" "
        placeholder="blur"
        loading="lazy"
      />
    </section>
  );
}
