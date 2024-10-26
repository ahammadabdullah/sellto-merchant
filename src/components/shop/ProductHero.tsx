// "use client";
// libraries
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

// functions
// import { useGSAP } from "@gsap/react";
// import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/CustomButton";
import Circles from "@/components/waitlist/Ciecles";
import { ChevronRight } from "lucide-react";

export interface classProps {
  className?: string;
}
export function ProductHero({ className }: classProps) {
  return (
    <div className={cn("pt-5 mb-[-6rem]", className)}>
      <div className="hero_wrapper min-h-[300px] w-full relative  grid place-items-center">
        <section className="min-h-full container flex flex-col justify-center  place-items-center relative text-center">
          <h1 className="font-clash font-medium text-4xl sm:text-5xl w-full text-center">
            Our <span className="text-primary2">Products</span>
          </h1>
          <div className="circel bg_primary_radial_gradient w-[100%] sm:w-[75%] aspect-square rounded-full absolute left-[50%] translate-x-[-50%] pointer-events-none z-[-2] opacity-60"></div>
        </section>
      </div>
    </div>
  );
}
