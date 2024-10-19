import Image from "next/image";
import Link from "next/link";

// functions
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LargeInfoCard from "@/components/home/components/LargeInfoCard";

import { Button } from "../ui/button";
import Circles from "@/components/waitlist/Ciecles";

export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <section className="container  mt-20 ">
      <div className="LargeInfoCardsWrapper flex flex-wrap  gap-6 justify-between items-center">
        <LargeInfoCard></LargeInfoCard>
        <LargeInfoCard flip={true}></LargeInfoCard>
        <LargeInfoCard></LargeInfoCard>
      </div>
    </section>
  );
}
