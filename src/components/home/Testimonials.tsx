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
    <section className="container  ">
      <SectionTitle
        text1="What our customers"
        text2="think about us."
      ></SectionTitle>
    </section>
  );
}
